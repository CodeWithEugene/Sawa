"""Synthetic songs, writers and session records.

SYNTHETIC DATA. Every person, song, file, hash and message here is invented
for the demo. No partner catalogue, recording or real person is used.

Each record is something a writer's device or account holds: a file, a
chat message, a document edit, a recollection. ``holders`` says which
agent remembers it before the agents exchange evidence.
"""
from __future__ import annotations

import hashlib
from datetime import datetime, timedelta, timezone

EAT = timezone(timedelta(hours=3))

AGENT_OF = {"wanjiru": "nairobi", "malik": "harlem"}


def _t(iso: str) -> int:
    return int(datetime.fromisoformat(iso).replace(tzinfo=EAT).timestamp())


def _hash(label: str) -> str:
    """Reproducible placeholder hash (stands in for the file's SHA-256)."""
    return hashlib.sha256(f"sawa-synthetic::{label}".encode()).hexdigest()


ELEMENTS = [
    # id, weight, right, English label, Swahili label
    ("hook-melody", 20, "composition", "Hook melody", "Melodia ya kiitikio"),
    ("verse-melody", 10, "composition", "Verse melody", "Melodia ya beti"),
    ("harmony-groove", 20, "composition", "Harmony and groove", "Upatanisho na mdundo"),
    ("chorus-lyrics", 20, "composition", "Chorus lyrics", "Maneno ya kiitikio"),
    ("verse1-lyrics", 15, "composition", "Verse 1 lyrics", "Maneno ya ubeti wa kwanza"),
    ("verse2-lyrics", 15, "composition", "Verse 2 lyrics", "Maneno ya ubeti wa pili"),
]

WRITERS = {
    "wanjiru": {
        "name": "Wanjiru Kamau",
        "city": "Nairobi",
        "role": "Songwriter and vocalist",
        "agent": "nairobi",
        "lang": "sw",
    },
    "malik": {
        "name": "Malik Johnson",
        "city": "Harlem",
        "role": "Producer",
        "agent": "harlem",
        "lang": "en",
    },
}

# Roles per element claimed in each writer's recollection.
# "o" originated, "d" developed, "-" no part.
MALIK_CLAIM = {
    "hook-melody": {"malik": "o", "wanjiru": "-"},
    "verse-melody": {"malik": "-", "wanjiru": "o"},
    "harmony-groove": {"malik": "o", "wanjiru": "-"},
    "chorus-lyrics": {"malik": "o", "wanjiru": "o"},
    "verse1-lyrics": {"malik": "-", "wanjiru": "o"},
    "verse2-lyrics": {"malik": "o", "wanjiru": "-"},
}
WANJIRU_CLAIM = {
    "hook-melody": {"malik": "-", "wanjiru": "o"},
    "verse-melody": {"malik": "-", "wanjiru": "o"},
    "harmony-groove": {"malik": "o", "wanjiru": "-"},
    "chorus-lyrics": {"malik": "d", "wanjiru": "o"},
    "verse1-lyrics": {"malik": "-", "wanjiru": "o"},
    "verse2-lyrics": {"malik": "o", "wanjiru": "-"},
}

BOTH = ["harlem", "nairobi"]

RECORDS: list[dict] = [
    {
        "id": "memo-hook", "kind": "artefact", "author": "wanjiru", "at": _t("2026-09-12T21:04:00"),
        "holders": ["nairobi"], "element": "hook-melody",
        "title": "Voice Memo: Hook Idea", "file": "hook-idea.m4a", "detail": "0:40, recorded on her phone",
        "detail_sw": "Sekunde 40, imerekodiwa kwa simu yake",
        "hash": _hash("hook-idea.m4a"),
    },
    {
        "id": "msg-memo", "kind": "message", "author": "wanjiru", "to": "malik", "at": _t("2026-09-12T21:10:00"),
        "holders": BOTH, "text": "Nimeimba hook hii leo usiku, sikiliza 🎧",
        "translation": "I sang this hook tonight, listen.",
        "attachment": {"record": "memo-hook", "element": "hook-melody"},
        "credits": [],
    },
    {
        "id": "msg-fire", "kind": "message", "author": "malik", "to": "wanjiru", "at": _t("2026-09-12T21:20:00"),
        "holders": BOTH, "text": "yo this hum is fire 🔥 imma build the beat around it",
        "credits": [{"element": "hook-melody", "role": "originated", "writer": "wanjiru"}],
        "confirmed_by": "malik",
    },
    {
        "id": "stems-beat", "kind": "artefact", "author": "malik", "at": _t("2026-09-13T19:30:00"),
        "holders": ["harlem"], "element": "harmony-groove",
        "title": "Beat Stems", "file": "amani-beat-stems.zip", "detail": "Chords, bass and drums, 92 BPM",
        "detail_sw": "Kodi, besi na ngoma, BPM 92",
        "hash": _hash("amani-beat-stems.zip"),
    },
    {
        "id": "edit-chorus-w", "kind": "co-edit", "author": "wanjiru", "at": _t("2026-09-13T20:05:00"),
        "holders": BOTH, "element": "chorus-lyrics",
        "title": "Lyric Doc Edit", "text": "Amani ni sisi, sisi ni amani",
    },
    {
        "id": "edit-chorus-m", "kind": "co-edit", "author": "malik", "at": _t("2026-09-13T20:12:00"),
        "holders": BOTH, "element": "chorus-lyrics",
        "title": "Lyric Doc Edit", "text": "We the peace we been waiting for",
    },
    {
        "id": "edit-verse1", "kind": "co-edit", "author": "wanjiru", "at": _t("2026-09-13T20:30:00"),
        "holders": BOTH, "element": "verse1-lyrics",
        "title": "Lyric Doc Edit", "text": "Mtaa wangu ulilia, leo tunaimba pamoja",
    },
    {
        "id": "guide-verse", "kind": "artefact", "author": "wanjiru", "at": _t("2026-09-14T18:00:00"),
        "holders": ["nairobi"], "element": "verse-melody",
        "title": "Vocal Guide Take", "file": "verse-guide.wav", "detail": "Verse melody, sung over the beat",
        "detail_sw": "Melodia ya beti, imeimbwa juu ya mdundo",
        "hash": _hash("verse-guide.wav"),
    },
    {
        "id": "midi-hook", "kind": "artefact", "author": "malik", "at": _t("2026-09-14T22:40:00"),
        "holders": ["harlem"], "element": "hook-melody",
        "title": "Hook MIDI", "file": "hook_v1.mid", "detail": "Hook melody as MIDI, 8 bars",
        "detail_sw": "Melodia ya kiitikio kama MIDI, mizani 8",
        "hash": _hash("hook_v1.mid"),
    },
    {
        "id": "edit-verse2", "kind": "co-edit", "author": "malik", "at": _t("2026-09-14T23:00:00"),
        "holders": BOTH, "element": "verse2-lyrics",
        "title": "Lyric Doc Edit", "text": "Harlem to Nairobi, one song, one sky",
    },
    {
        "id": "msg-verse2", "kind": "message", "author": "wanjiru", "to": "malik", "at": _t("2026-09-14T23:15:00"),
        "holders": BOTH, "text": "Verse ya pili ni yako Malik, iko fire 🔥",
        "translation": "Verse two is yours, Malik, it's fire.",
        "credits": [{"element": "verse2-lyrics", "role": "originated", "writer": "malik"}],
        "confirmed_by": "wanjiru",
    },
    {
        "id": "dispute", "kind": "dispute", "author": "malik", "at": _t("2026-09-29T10:00:00"),
        "holders": BOTH, "title": "Sync Request",
        "text": "A sync buyer asks for the split sheet. The writers' drafts disagree.",
        "text_sw": "Mnunuzi wa sync anaomba karatasi ya mgao. Rasimu za waandishi hazikubaliani.",
    },
    {
        "id": "claim-malik", "kind": "claim", "author": "malik", "at": _t("2026-09-29T12:00:00"),
        "holders": ["harlem"], "roles": MALIK_CLAIM,
        "text": "I made the hook in MIDI and the whole beat. The chorus we wrote together.",
    },
    {
        "id": "claim-wanjiru", "kind": "claim", "author": "wanjiru", "at": _t("2026-09-29T13:00:00"),
        "holders": ["nairobi"], "roles": WANJIRU_CLAIM,
        "text": "Niliimba hook kwanza. Kiitikio ni changu, Malik aliongeza mstari mmoja.",
        "translation": "I sang the hook first. The chorus is mine, Malik added one line.",
    },
]

POLICY = {
    "id": "jua-2025",
    "title": "Split Policy From \"Jua\" (2025)",
    "signed": "Signed by both writers on 3 March 2025",
    "master": {"wanjiru": 50.0, "malik": 50.0},
    "master_note": "Each writer paid for their own sessions, so the master is split equally.",
    "master_note_sw": "Kila mwandishi alilipia vipindi vyake, kwa hivyo master inagawanywa sawa.",
}

SONGS = {
    "amani-ni-sisi": {
        "id": "amani-ni-sisi",
        "title": "Amani Ni Sisi",
        "subtitle": "Peace Is Us",
        "bpm": 92,
        "key": "A minor",
        "made": "12 to 14 September 2026, remote",
        "campaign": "AI for Peace campaign (synthetic)",
        "writers": ["wanjiru", "malik"],
        "elements": ELEMENTS,
        "records": RECORDS,
        "policy": POLICY,
        "stems": [
            {"file": "amani-beat-stems.zip", "hash": _hash("amani-beat-stems.zip")},
            {"file": "verse-guide.wav", "hash": _hash("verse-guide.wav")},
            {"file": "hook-idea.m4a", "hash": _hash("hook-idea.m4a")},
        ],
    }
}


def song(song_id: str) -> dict:
    if song_id not in SONGS:
        raise KeyError(song_id)
    return SONGS[song_id]
