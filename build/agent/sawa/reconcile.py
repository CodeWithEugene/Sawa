"""The reconciliation pipeline for one agent.

replay memory -> derive (NAL deduction, defeaters) -> revise (NAL revision)
-> band (Omega thresholds) -> resolve shares (policy atoms) -> proof -> hash.
Every truth value comes from MeTTa calls into Omega's lib_nal.metta.
"""
from __future__ import annotations

import hashlib
import json
from collections import defaultdict

from . import memory
from .engine import OMEGA_RELEASE, Engine, lib_nal_sha
from .sexpr import parse, stv

ROLES = ("originated", "developed")
CLAIMED_TV = {"o": "originated", "d": "developed"}


def _r(x: float) -> float:
    return round(float(x), 4)


def _tv(t: tuple[float, float]) -> list[float]:
    return [_r(t[0]), _r(t[1])]


def _fmt(t: tuple[float, float]) -> str:
    return f"(stv {t[0]!r} {t[1]!r})"


def proof_hash(body: dict) -> str:
    canonical = json.dumps(body, sort_keys=True, separators=(",", ":"), ensure_ascii=False)
    return hashlib.sha256(canonical.encode()).hexdigest()


def _resolve(engine: Engine, song: dict) -> dict[str, dict]:
    out: dict[str, dict] = {}
    for res in (r for el in [e[0] for e in song["elements"]] for r in engine.run(f"!(resolve {el})")):
        node = parse(res)
        _, el, weight, os_, ds, shares = node
        share_map: dict[str, float | None] = {}
        for w, s in shares:
            share_map[w] = None if s == "blocked" else _r(s)
        out[el] = dict(
            weight=float(weight), originators=sorted(os_), developers=sorted(ds),
            shares=share_map, blocked=any(v is None for v in share_map.values()))
    return out


def _elements_out(song: dict, resolved: dict[str, dict], statements: dict) -> list[dict]:
    rows = []
    for el, weight, right, *_ in song["elements"]:
        r = resolved[el]
        contrib = {w: (None if s is None else _r(weight * s / 100.0)) for w, s in r["shares"].items()}
        human = sum(v for v in contrib.values() if v is not None)
        ai_points = _r(weight - human) if not r["blocked"] and not r["originators"] else 0.0
        rows.append(dict(element=el, right=right, weight=weight, originators=r["originators"],
                         developers=r["developers"], shares=r["shares"], contributions=contrib,
                         blocked=r["blocked"], ai_generated=ai_points > 0, ai_points=ai_points,
                         statements=statements.get(el, [])))
    return rows


def _totals(rows: list[dict], writers: list[str]) -> dict[str, float | None]:
    """Each writer's share of the human-authored composition.

    AI-generated material is owned by no one, so it is left out and the
    writers' contributions are scaled to 100. The excluded points are
    reported separately (``ai_points``) and disclosed on the record.
    """
    if any(r["blocked"] for r in rows):
        return {w: None for w in writers}
    raw = {w: sum(r["contributions"][w] for r in rows) for w in writers}
    human = sum(raw.values())
    return {w: _r(round(100.0 * v / human, 1)) for w, v in raw.items()}


def _ai_points(rows: list[dict]) -> float:
    return _r(sum(r.get("ai_points", 0.0) for r in rows))


def draft(song: dict, owner: str, pack: str) -> dict:
    """The owner's own account: shares computed from their claimed roles."""
    claim = next(r for r in song["records"] if r["kind"] == "claim" and r["author"] == owner)
    engine = Engine(pack)
    atoms, _ = memory.atoms(song, [], pack, set())
    engine.add(atoms)
    for el, roles in claim["roles"].items():
        for w, letter in roles.items():
            for role in ROLES:
                if CLAIMED_TV.get(letter) == role:
                    engine.add(f"(stmt {role} {el} {w} (stv 1.0 0.9)) (stmt-band {role} {el} {w} settled)")
    rows = _elements_out(song, _resolve(engine, song), {})
    for row in rows:
        row["claimed"] = {w: claim["roles"][row["element"]][w] for w in song["writers"]}
    body = dict(kind="draft", song=song["id"], pack=pack, author=owner, claim=claim["id"],
                elements=[{k: v for k, v in r.items() if k != "statements"} for r in rows],
                totals=_totals(rows, song["writers"]))
    return dict(body=body, hash=proof_hash(body))


def reconcile(song: dict, records: list[dict], pack: str, contests: tuple[dict, ...]) -> dict:
    """Full reconciliation over the records this agent holds."""
    withdrawn = {c["record"] for c in contests}
    engine = Engine(pack)
    atoms, index = memory.atoms(song, records, pack, withdrawn)
    engine.add(atoms)
    by_id = {it["id"]: it for it in index}

    derived: dict[tuple, list[dict]] = defaultdict(list)
    engine.run("!(collapse (index-records))")
    for res in (r for it in index for r in engine.run(f"!(derive {it['id']})")):
        _, eid, kind, (role, el, w), pol, rid, rtv, tv = parse(res)
        it = by_id[eid]
        derived[(role, el, w)].append(dict(
            id=eid, record=it["record"], kind=kind, author=it["author"], at=it["at"],
            claimed_role=it["role"], pol=pol, rule=rid, rule_tv=_tv(stv(rtv)), tv=stv(tv)))

    statements: dict[str, list[dict]] = defaultdict(list)
    for (role, el, w), evs in sorted(derived.items()):
        evs.sort(key=lambda e: (e["at"], e["id"]))
        acc = evs[0]["tv"]
        steps = [_tv(acc)]
        for e in evs[1:]:
            out = engine.run(f"!(revise ({role} {el} {w}) {_fmt(acc)} {_fmt(e['tv'])})")
            acc = stv(parse(out[0]))
            steps.append(_tv(acc))
        band = engine.run(f"!(band {_fmt(acc)})")[0]
        engine.add(f"(stmt {role} {el} {w} {_fmt(acc)}) (stmt-band {role} {el} {w} {band})")
        for e in evs:
            e["tv"] = _tv(e["tv"])
            e.pop("at")
        statements[el].append(dict(role=role, writer=w, tv=_tv(acc), band=band,
                                   evidence=evs, revision=steps))

    withdrawn_items = sorted(
        (dict(id=it["id"], record=it["record"], element=it["element"], role=it["role"],
              writer=it["writer"], pol=it["pol"], kind=it["kind"])
         for it in index if it["record"] in withdrawn),
        key=lambda d: d["id"])
    rows = _elements_out(song, _resolve(engine, song), statements)
    body = dict(
        kind="reconciliation", song=song["id"], pack=pack, omega=OMEGA_RELEASE,
        lib_nal_sha256=lib_nal_sha(), elements=rows, totals=_totals(rows, song["writers"]),
        ai_points=_ai_points(rows),
        voice_without_consent=sorted(parse(engine.run("!(voice-without-consent)")[0])),
        withdrawn=withdrawn_items,
        contests=[dict(record=c["record"], by=c["by"], reason=c["reason"]) for c in contests])
    return dict(body=body, hash=proof_hash(body))
