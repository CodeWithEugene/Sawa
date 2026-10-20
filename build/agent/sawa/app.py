"""Sawa API: two Omega agents behind one FastAPI app."""
from __future__ import annotations

import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from . import jev, session
from .engine import HYPERON_VERSION, OMEGA_RELEASE, PACKS, lib_nal_sha
from .schemas import JevRequest, RunRequest
from .seed import SONGS, WRITERS, song as get_song


def create_app() -> FastAPI:
    app = FastAPI(title="Sawa", version="0.1.0",
                  description="Two Omega agents reason from conflicting memories of a co-write to one split sheet.")
    origins = [o for o in os.environ.get("SAWA_CORS", "http://localhost:3000").split(",") if o]
    app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["GET", "POST"],
                       allow_headers=["content-type"])

    @app.get("/api/health")
    def health() -> dict:
        return dict(ok=True, omega=OMEGA_RELEASE, lib_nal_sha256=lib_nal_sha(), hyperon=HYPERON_VERSION,
                    packs=list(PACKS), agents=list(session.AGENTS),
                    jev=bool(os.environ.get("TYPESAFE_API_KEY")))

    @app.get("/api/songs")
    def songs() -> list[dict]:
        return [dict(id=s["id"], title=s["title"], subtitle=s["subtitle"]) for s in SONGS.values()]

    @app.get("/api/songs/{song_id}")
    def song(song_id: str) -> dict:
        try:
            s = get_song(song_id)
        except KeyError:
            raise HTTPException(404, "unknown song")
        return dict(
            **{k: v for k, v in s.items() if k not in ("elements",)},
            elements=[dict(id=e[0], weight=e[1], right=e[2], en=e[3], sw=e[4]) for e in s["elements"]],
            writer_info={w: WRITERS[w] for w in s["writers"]},
        )

    @app.post("/api/session/run")
    def run(req: RunRequest) -> dict:
        try:
            get_song(req.song_id)
        except KeyError:
            raise HTTPException(404, "unknown song")
        events = [e.model_dump() for e in req.events]
        records = {r["id"] for r in get_song(req.song_id)["records"]}
        for e in events:
            if e["type"] in ("contest", "withdraw-contest") and e["record"] not in records:
                raise HTTPException(422, f"unknown record {e['record']}")
        return session.run(req.song_id, events)

    @app.post("/api/jev/read")
    async def jev_read(req: JevRequest) -> dict:
        rec = next((r for s in SONGS.values() for r in s["records"] if r["id"] == req.record), None)
        if rec is None or rec["kind"] != "message":
            raise HTTPException(404, "unknown message")
        song = next(s for s in SONGS.values() if rec in s["records"])
        msgs = [r for r in song["records"] if r["kind"] == "message" and r["at"] < rec["at"]
                and r["author"] == rec.get("to")]
        previous = max(msgs, key=lambda r: r["at"]) if msgs else None
        return await jev.read(rec, previous)

    return app


app = create_app()
