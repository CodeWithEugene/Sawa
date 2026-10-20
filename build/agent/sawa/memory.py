"""Agent memory: event-sourced, append-only, replayed into atoms.

Each agent's memory is the list of records it holds plus the session events
it has seen. On every request the agent replays its memory into a fresh atom
space (the pattern of Omega's episodic history replay). Nothing else is kept,
so the audit log *is* the memory.
"""
from __future__ import annotations

from dataclasses import dataclass, field

from .seed import AGENT_OF

ROLE_LETTER = {"originated": "o", "developed": "d"}


@dataclass(frozen=True)
class SessionState:
    exchanged: bool
    reconciled: bool
    contests: tuple[dict, ...]
    signatures: dict
    packs: dict = field(default_factory=dict)


def session_state(events: list[dict]) -> SessionState:
    """Fold the client's session events into a state. Order matters."""
    exchanged = reconciled = False
    contests: list[dict] = []
    signatures: dict = {}
    packs: dict = {}
    for ev in events:
        kind = ev["type"]
        if kind == "exchange":
            exchanged = True
        elif kind == "reconcile" and exchanged:
            reconciled = True
        elif kind == "contest" and reconciled:
            contests.append(ev)
            signatures = {}  # a contest reopens the sheet
        elif kind == "withdraw-contest" and reconciled:
            contests = [c for c in contests if c["record"] != ev["record"]]
            signatures = {}
        elif kind == "sign" and reconciled:
            signatures[ev["writer"]] = ev
        elif kind == "pack":
            packs[ev["agent"]] = ev["version"]
            signatures = {}
    return SessionState(exchanged, reconciled, tuple(contests), signatures, packs)


def visible_records(song: dict, agent: str, exchanged: bool) -> list[dict]:
    recs = [r for r in song["records"] if exchanged or agent in r["holders"]]
    return sorted(recs, key=lambda r: (r["at"], r["id"]))


def evidence_items(record: dict, writers: list[str], elements: list[str]) -> list[dict]:
    """The evidence atoms a record contributes, before any reasoning."""
    rid, kind, author, at = record["id"], record["kind"], record["author"], record["at"]
    items: list[dict] = []
    if kind in ("artefact", "co-edit"):
        items.append(dict(id=rid, record=rid, kind=kind, author=author, at=at,
                          element=record["element"], role="originated", writer=author, pol="pos"))
    elif kind == "message" and record.get("confirmed_by") == author:
        for i, credit in enumerate(record.get("credits", [])):
            k = "other-party-statement" if credit["writer"] != author else "recollection"
            items.append(dict(id=f"{rid}--{i}", record=rid, kind=k, author=author, at=at,
                              element=credit["element"], role=credit["role"],
                              writer=credit["writer"], pol="pos"))
    elif kind == "claim":
        for el in elements:
            for w in writers:
                claimed = record["roles"][el][w]
                for role, letter in ROLE_LETTER.items():
                    items.append(dict(
                        id=f"{rid}--{el}--{w}--{letter}", record=rid, kind="recollection",
                        author=author, at=at, element=el, role=role, writer=w,
                        pol="pos" if claimed == letter else "neg"))
    return items


def atoms(song: dict, records: list[dict], pack: str, withdrawn: set[str]) -> tuple[str, list[dict]]:
    """MeTTa atoms for an agent's replayed memory, and the evidence index."""
    writers = song["writers"]
    elements = [e[0] for e in song["elements"]]
    lines: list[str] = []
    for w in writers:
        lines.append(f"(writer {w} {AGENT_OF[w]})")
    for el, weight, right, *_ in song["elements"]:
        lines.append(f"(element {el} {right})")
        lines.append(f"(weight {pack} {el} {weight})")
    index: list[dict] = []
    for r in records:
        if r["kind"] == "dispute":
            lines.append(f"(dispute-began {r['at']})")
        att = r.get("attachment")
        if att:
            lines.append(f"(received {r['to']} {att['element']} {r['at']})")
        for it in evidence_items(r, writers, elements):
            lines.append(
                f"(ev {it['id']} {it['kind']} {it['author']} {it['at']} "
                f"{it['element']} {it['role']} {it['writer']} {it['pol']})")
            if it["record"] in withdrawn:
                lines.append(f"(withdrawn {it['id']})")
            index.append(it)
    return "\n".join(lines), index
