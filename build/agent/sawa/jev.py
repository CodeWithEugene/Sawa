"""TypeSafe Jev reads a chat message into a typed credit statement.

Jev reads; Omega decides. Jev never produces a share, a rule or an
explanation. Its reading becomes evidence only after the message's author
confirms it. Any failure falls back to the seeded reading (mode "manual").
"""
from __future__ import annotations

import os
import time

from .seed import ELEMENTS, WRITERS

MODEL = "jev-latest"
CONFIDENCE_FLOOR = 0.6

EL_DEF = {e[0]: e[3].lower() for e in ELEMENTS}


def _options() -> dict[str, str]:
    opts: dict[str, str] = {}
    for el, name in EL_DEF.items():
        for w, info in WRITERS.items():
            first = info["name"].split()[0]
            opts[f"{w}__originated__{el}"] = f"The message credits {first} with starting (originating) the {name}."
            opts[f"{w}__developed__{el}"] = f"The message credits {first} with developing the {name} that someone else started."
    opts["none"] = "The message does not credit anyone with writing any part of the song."
    return opts


def seeded(record: dict) -> dict:
    credits = record.get("credits", [])
    choice = "none" if not credits else f"{credits[0]['writer']}__{credits[0]['role']}__{credits[0]['element']}"
    return dict(mode="manual", choice=choice, confidence=None, probabilities=None,
                model=None, request_id=None, latency_ms=None)


async def read(record: dict, previous: dict | None = None) -> dict:
    key = os.environ.get("TYPESAFE_API_KEY")
    if not key or record.get("kind") != "message":
        return seeded(record)
    try:
        from typesafe_sdk import AsyncTypeSafeClient, Choice  # type: ignore

        client = AsyncTypeSafeClient(api_key=key, model=MODEL, timeout=8.0)
        sender = WRITERS[record["author"]]["name"].split()[0]
        receiver = WRITERS[record["to"]]["name"].split()[0]
        question = Choice(
            instructions={
                "context": (
                    f"`message` is a chat message from {sender} to {receiver}, two co-writers of a song. "
                    "It may be in English, Swahili or Sheng. The song's parts are: hook melody, verse melody, "
                    "chords and bass, drum groove, chorus lyrics, verse 1 lyrics, verse 2 lyrics."
                ),
                "question": (
                    "Which credit for writing a part of the song does `message` give, if any? "
                    "Use `previous_message` (what the sender is replying to, with any attachment) to resolve "
                    "words like 'this' or 'it'."
                ),
            },
            criteria=_options(),
        )
        t0 = time.perf_counter()
        ctx = {"message": record["text"]}
        if previous:
            prev_from = WRITERS[previous["author"]]["name"].split()[0]
            att = previous.get("attachment")
            ctx["previous_message"] = {
                "from": prev_from,
                "text": previous.get("text"),
                "attachment": (f"voice memo of a {EL_DEF[att['element']]} idea recorded by {prev_from}"
                               if att else None),
            }
        resp = await client.system_one(ctx, {"credit": question})
        latency = round((time.perf_counter() - t0) * 1000)
        raw = resp.raw_http_response.json()
        ans = raw["answers"]["credit"]
        probs = ans.get("probabilities") or {}
        top = dict(sorted(probs.items(), key=lambda kv: -kv[1])[:3])
        return dict(mode="jev", choice=ans.get("choice"), confidence=ans.get("confidence"),
                    probabilities=top, model=raw.get("model", MODEL), request_id=resp.request_id,
                    latency_ms=latency, needs_review=(ans.get("confidence") or 0) < CONFIDENCE_FLOOR)
    except Exception as exc:  # network, auth, schema: fall back, never fail the page
        out = seeded(record)
        out["error"] = type(exc).__name__
        return out
