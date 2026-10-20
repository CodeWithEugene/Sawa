"""Run both agents over one session and assemble what the UI needs.

The two agents never share an atom space. Each one replays only the records
it holds (all of them after the exchange) and reconciles on its own. Results
are cached per agent and input, never across agents.
"""
from __future__ import annotations

import hashlib
import json
from functools import lru_cache

from . import explain, memory, reconcile
from .engine import HYPERON_VERSION, OMEGA_RELEASE
from .seed import AGENT_OF, WRITERS, song as get_song

AGENTS = ("harlem", "nairobi")
OWNER = {v: k for k, v in AGENT_OF.items()}


@lru_cache(maxsize=256)
def _draft(agent: str, song_id: str, pack: str) -> str:
    return json.dumps(reconcile.draft(get_song(song_id), OWNER[agent], pack))


@lru_cache(maxsize=256)
def _reconcile(agent: str, song_id: str, pack: str, contests_key: str) -> str:
    s = get_song(song_id)
    contests = tuple(json.loads(contests_key))
    records = memory.visible_records(s, agent, exchanged=True)
    return json.dumps(reconcile.reconcile(s, records, pack, contests))


def _disputed(drafts: dict[str, dict]) -> list[dict]:
    """Elements where the two writers' own accounts differ."""
    rows = {a: {r["element"]: r for r in drafts[a]["body"]["elements"]} for a in AGENTS}
    out = []
    for el in rows["harlem"]:
        h, n = rows["harlem"][el], rows["nairobi"][el]
        if h["claimed"] != n["claimed"]:
            out.append(dict(element=el, harlem=h["claimed"], nairobi=n["claimed"],
                            harlem_shares=h["shares"], nairobi_shares=n["shares"]))
    return out


def _memory_log(s: dict, agent: str, events: list[dict]) -> list[dict]:
    log = [dict(type="record", record=r["id"], kind=r["kind"], author=r["author"], at=r["at"])
           for r in memory.visible_records(s, agent, exchanged=False)]
    mine = {r["id"] for r in memory.visible_records(s, agent, exchanged=False)}
    exchanged = False
    for ev in events:
        entry = {k: v for k, v in ev.items()}
        if ev["type"] == "exchange" and not exchanged:
            exchanged = True
            entry["received"] = [r["id"] for r in memory.visible_records(s, agent, True) if r["id"] not in mine]
        log.append(entry)
    return log


def _record(s: dict, result: dict, signatures: dict) -> dict:
    body = dict(
        song=s["id"], title=s["title"],
        composition=result["body"]["totals"],
        master=s["policy"]["master"],
        policy=s["policy"]["id"],
        pack=result["body"]["pack"], omega=OMEGA_RELEASE,
        proof_hash=result["hash"],
        stems=s["stems"],
        writers={w: dict(name=WRITERS[w]["name"], city=WRITERS[w]["city"], role=WRITERS[w]["role"])
                 for w in s["writers"]},
        signatures={w: dict(name=sig["name"], at=sig["at"]) for w, sig in sorted(signatures.items())},
    )
    canonical = json.dumps(body, sort_keys=True, separators=(",", ":"), ensure_ascii=False)
    return dict(body=body, sha256=hashlib.sha256(canonical.encode()).hexdigest())


def run(song_id: str, events: list[dict]) -> dict:
    s = get_song(song_id)
    st = memory.session_state(events)
    packs = {a: st.packs.get(a, "split-v1") for a in AGENTS}
    contests_key = json.dumps([dict(record=c["record"], by=c["by"], reason=c["reason"])
                               for c in sorted(st.contests, key=lambda c: c["record"])])
    phase = "reconciled" if st.reconciled else ("exchanged" if st.exchanged else "solo")
    records = {r["id"]: r for r in s["records"]}

    agents: dict[str, dict] = {}
    drafts: dict[str, dict] = {}
    for a in AGENTS:
        drafts[a] = json.loads(_draft(a, song_id, packs[a]))
        view = dict(agent=a, owner=OWNER[a], pack=packs[a], draft=drafts[a],
                    holds=len(memory.visible_records(s, a, st.exchanged)),
                    memory=_memory_log(s, a, events))
        if st.reconciled:
            res = json.loads(_reconcile(a, song_id, packs[a], contests_key))
            view["result"] = res
            view["hash"] = res["hash"]
        else:
            view["hash"] = drafts[a]["hash"]
        agents[a] = view

    converged = st.reconciled and agents["harlem"]["hash"] == agents["nairobi"]["hash"]
    blocked = []
    if st.reconciled:
        blocked = [r["element"] for r in agents["harlem"]["result"]["body"]["elements"] if r["blocked"]]
    can_sign = converged and not blocked
    signatures = st.signatures if can_sign else {}
    record = None
    if can_sign and set(signatures) == set(s["writers"]):
        record = _record(s, agents["harlem"]["result"], signatures)

    explanation = None
    if st.reconciled:
        explanation = explain.explain(agents["harlem"]["result"]["body"], records)

    return dict(
        song_id=song_id, phase=phase, converged=converged, can_sign=can_sign,
        blocked=blocked, disputed=_disputed(drafts), agents=agents,
        signatures={w: dict(name=v["name"], at=v["at"]) for w, v in signatures.items()},
        record=record, explanation=explanation,
        headline={lang: explain.headline(converged, phase, lang) for lang in ("en", "sw")},
        contests=[dict(record=c["record"], by=c["by"], reason=c["reason"]) for c in st.contests],
        engine=dict(omega=OMEGA_RELEASE, hyperon=HYPERON_VERSION),
    )
