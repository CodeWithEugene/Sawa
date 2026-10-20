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
def _reconcile_core(agent: str, song_id: str, pack: str, withdrawn_key: str) -> str:
    """The expensive part: depends only on which records were withdrawn."""
    s = get_song(song_id)
    contests = tuple(dict(record=r, by="", reason="") for r in json.loads(withdrawn_key))
    records = memory.visible_records(s, agent, exchanged=True)
    return json.dumps(reconcile.reconcile(s, records, pack, contests))


def _reconcile(agent: str, song_id: str, pack: str, contests: list[dict]) -> dict:
    """Attach who contested and why, then hash the full proof."""
    withdrawn_key = json.dumps(sorted({c["record"] for c in contests}))
    res = json.loads(_reconcile_core(agent, song_id, pack, withdrawn_key))
    res["body"]["contests"] = [dict(record=c["record"], by=c["by"], reason=c["reason"]) for c in contests]
    res["hash"] = reconcile.proof_hash(res["body"])
    return res


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


def ai_disclosure(s: dict) -> list[dict]:
    """Every AI tool that touched the song, and for what."""
    out = []
    for r in s["records"]:
        if r["kind"] == "ai-generation":
            out.append(dict(record=r["id"], tool=r["tool"], element=r["element"], used_by=r["author"],
                            use="generated", detail=r["prompt"]))
        elif r["kind"] == "ai-assist":
            out.append(dict(record=r["id"], tool=r["tool"], element=None, used_by=r["author"],
                            use="assistive", detail=r["detail"]))
        elif r["kind"] == "ai-voice":
            consent = next((c["id"] for c in s["records"]
                            if c["kind"] == "consent" and c["author"] == r["voice_of"]), None)
            out.append(dict(record=r["id"], tool=r["tool"], element=None, used_by=r["author"],
                            use="voice-model", voice_of=r["voice_of"], consent=consent, detail=r["detail"]))
    return out


def _record(s: dict, result: dict, signatures: dict) -> dict:
    body = dict(
        song=s["id"], title=s["title"],
        composition=result["body"]["totals"],
        master=s["policy"]["master"],
        policy=s["policy"]["id"],
        pack=result["body"]["pack"], omega=OMEGA_RELEASE,
        proof_hash=result["hash"],
        stems=s["stems"],
        ai_points=result["body"]["ai_points"],
        ai_disclosure=ai_disclosure(s),
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
    contests = sorted(st.contests, key=lambda c: c["record"])
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
            res = _reconcile(a, song_id, packs[a], contests)
            view["result"] = res
            view["hash"] = res["hash"]
        else:
            view["hash"] = drafts[a]["hash"]
        agents[a] = view

    converged = st.reconciled and agents["harlem"]["hash"] == agents["nairobi"]["hash"]
    blocked = []
    if st.reconciled:
        hb = agents["harlem"]["result"]["body"]
        blocked = [r["element"] for r in hb["elements"] if r["blocked"]]
        blocked += [f"voice-consent-{w}" for w in hb["voice_without_consent"]]
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
        record=record, explanation=explanation, ai_disclosure=ai_disclosure(s),
        headline={lang: explain.headline(converged, phase, lang) for lang in ("en", "sw")},
        contests=[dict(record=c["record"], by=c["by"], reason=c["reason"]) for c in st.contests],
        engine=dict(omega=OMEGA_RELEASE, hyperon=HYPERON_VERSION),
    )
