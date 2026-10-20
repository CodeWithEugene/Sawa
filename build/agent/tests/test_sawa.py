"""Sawa reasoning, convergence and API tests."""
from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

from sawa import memory, reconcile, session
from sawa.app import app
from sawa.engine import Engine
from sawa.seed import song
from sawa.sexpr import parse, stv

SONG = "amani-ni-sisi"
S = song(SONG)
FULL = ("exchange", "reconcile")


def events(*kinds: str) -> list[dict]:
    return [{"type": k} for k in kinds]


@pytest.fixture(scope="module")
def client() -> TestClient:
    return TestClient(app)


@pytest.fixture(scope="module")
def harlem() -> dict:
    return reconcile.reconcile(S, memory.visible_records(S, "harlem", True), "split-v1", ())


def element(result: dict, el: str) -> dict:
    return next(r for r in result["body"]["elements"] if r["element"] == el)


def statement(row: dict, role: str, writer: str) -> dict:
    return next(s for s in row["statements"] if s["role"] == role and s["writer"] == writer)


# ---------------------------------------------------------------- NAL core

def test_omega_deduction_matches_hand_computation() -> None:
    e = Engine()
    out = e.run("!(|-nal ((observed x) (stv 1.0 0.9)) ((==> (observed x) (originated a b)) (stv 1.0 0.9)))")
    f, c = stv(parse(out[0])[1])
    assert (f, round(c, 4)) == (1.0, 0.81)


def test_omega_revision_matches_hand_computation() -> None:
    e = Engine()
    f, c = stv(parse(e.run("!(revise (s a b) (stv 1.0 0.81) (stv 1.0 0.702))")[0]))
    # w1 = .81/.19, w2 = .702/.298, c = w / (w + 1)
    w = 0.81 / 0.19 + 0.702 / 0.298
    assert f == 1.0 and c == pytest.approx(w / (w + 1), abs=1e-6)


def test_bands_follow_omega_thresholds() -> None:
    e = Engine()
    assert e.run("!(band (stv 0.6 0.5))") == ["settled"]
    assert e.run("!(band (stv 0.5 0.42))") == ["needs-confirmation"]
    assert e.run("!(band (stv 0.0 0.9))") == ["unsupported"]


# ---------------------------------------------------------------- defeaters

def test_d1_midi_counts_as_development_not_origination(harlem: dict) -> None:
    hook = element(harlem, "hook-melody")
    dev = statement(hook, "developed", "malik")
    midi = next(ev for ev in dev["evidence"] if ev["record"] == "midi-hook")
    assert midi["rule"] == "received-before-created"
    orig = statement(hook, "originated", "malik")
    assert all(ev["record"] != "midi-hook" for ev in orig["evidence"])


def test_d1_does_not_fire_on_the_earlier_memo(harlem: dict) -> None:
    orig = statement(element(harlem, "hook-melody"), "originated", "wanjiru")
    memo = next(ev for ev in orig["evidence"] if ev["record"] == "memo-hook")
    assert memo["rule"] == "artefact" and memo["tv"] == [1.0, 0.81]


def test_d2_discounts_only_post_dispute_recollections(harlem: dict) -> None:
    for row in harlem["body"]["elements"]:
        for st in row["statements"]:
            for ev in st["evidence"]:
                if ev["kind"] == "recollection":
                    assert ev["rule"] == "recollection-after-dispute"
                    assert ev["tv"][1] == 0.27
                else:
                    assert ev["rule"] != "recollection-after-dispute"


# ---------------------------------------------------------------- shares

def test_drafts_reproduce_each_writers_account() -> None:
    assert reconcile.draft(S, "malik", "split-v1")["body"]["totals"] == {"wanjiru": 35.0, "malik": 65.0}
    assert reconcile.draft(S, "wanjiru", "split-v1")["body"]["totals"] == {"wanjiru": 60.0, "malik": 40.0}


def test_reconciled_split_and_element_resolution(harlem: dict) -> None:
    assert harlem["body"]["totals"] == {"wanjiru": 53.2, "malik": 46.8}
    assert harlem["body"]["ai_points"] == 6.0
    hook = element(harlem, "hook-melody")
    assert hook["originators"] == ["wanjiru"] and hook["developers"] == ["malik"]
    assert hook["shares"] == {"wanjiru": 75.0, "malik": 25.0}
    chorus = element(harlem, "chorus-lyrics")
    assert chorus["originators"] == ["malik", "wanjiru"]
    assert chorus["shares"] == {"wanjiru": 50.0, "malik": 50.0}


def test_shares_sum_to_100_per_human_element(harlem: dict) -> None:
    for row in harlem["body"]["elements"]:
        if not row["ai_generated"]:
            assert sum(row["shares"].values()) == pytest.approx(100.0)


def test_ai_generated_drums_are_owned_by_no_one(harlem: dict) -> None:
    drums = element(harlem, "drum-groove")
    assert drums["ai_generated"] and drums["originators"] == [] and drums["developers"] == ["malik"]
    assert drums["shares"] == {"wanjiru": 0.0, "malik": 25.0} and drums["ai_points"] == 6.0
    gen = statement(drums, "generated", "ai")
    assert gen["band"] == "settled" and gen["evidence"][0]["rule"] == "ai-generation"
    dev = statement(drums, "developed", "malik")
    assert dev["evidence"][0]["rule"] == "generated-before-edited"


def test_voice_model_without_consent_blocks_signing(monkeypatch: pytest.MonkeyPatch) -> None:
    import copy
    from sawa import seed
    original = seed.SONGS["amani-ni-sisi"]
    patched = copy.deepcopy(original)
    patched["records"] = [r for r in patched["records"] if r["kind"] != "consent"]
    patched["id"] = "amani-no-consent"
    monkeypatch.setitem(seed.SONGS, "amani-no-consent", patched)
    out = session.run("amani-no-consent", events(*FULL))
    assert out["converged"] is True and out["can_sign"] is False
    assert "voice-consent-wanjiru" in out["blocked"]


# ---------------------------------------------------------------- convergence

def test_agents_converge_to_the_same_hash_after_exchange() -> None:
    out = session.run(SONG, events(*FULL))
    assert out["converged"] is True
    assert out["agents"]["harlem"]["hash"] == out["agents"]["nairobi"]["hash"]


def test_agents_differ_before_exchange() -> None:
    out = session.run(SONG, [])
    assert out["phase"] == "solo" and out["converged"] is False
    assert out["agents"]["harlem"]["hash"] != out["agents"]["nairobi"]["hash"]
    assert {d["element"] for d in out["disputed"]} == {"hook-melody", "chorus-lyrics"}


def test_different_rule_versions_never_converge() -> None:
    out = session.run(SONG, [{"type": "pack", "agent": "nairobi", "version": "split-v0"}, *events(*FULL)])
    assert out["converged"] is False and out["can_sign"] is False


def test_agents_hold_only_their_own_records_before_exchange() -> None:
    harlem = {r["id"] for r in memory.visible_records(S, "harlem", False)}
    nairobi = {r["id"] for r in memory.visible_records(S, "nairobi", False)}
    assert "memo-hook" not in harlem and "midi-hook" not in nairobi


# ---------------------------------------------------------------- contest and sign

def test_contest_is_recorded_and_hook_still_holds() -> None:
    contest = {"type": "contest", "record": "msg-fire", "by": "malik", "reason": "It was hype, not a credit"}
    out = session.run(SONG, [*events(*FULL), contest])
    res = out["agents"]["harlem"]["result"]
    assert out["converged"] is True
    assert res["body"]["totals"] == {"wanjiru": 53.2, "malik": 46.8}
    orig = statement(element(res, "hook-melody"), "originated", "wanjiru")
    assert orig["tv"] == [0.9261, 0.8334] and orig["band"] == "settled"
    assert any(w["record"] == "msg-fire" for w in res["body"]["withdrawn"])


def test_signing_requires_both_and_a_contest_reopens_it() -> None:
    sign_w = {"type": "sign", "writer": "wanjiru", "name": "Wanjiru Kamau", "at": "t1"}
    sign_m = {"type": "sign", "writer": "malik", "name": "Malik Johnson", "at": "t2"}
    one = session.run(SONG, [*events(*FULL), sign_w])
    assert one["record"] is None
    both = session.run(SONG, [*events(*FULL), sign_w, sign_m])
    assert both["record"] and len(both["record"]["sha256"]) == 64
    contest = {"type": "contest", "record": "msg-fire", "by": "malik", "reason": "hype"}
    reopened = session.run(SONG, [*events(*FULL), sign_w, sign_m, contest])
    assert reopened["record"] is None and reopened["signatures"] == {}


def test_signing_closed_before_reconcile() -> None:
    sign = {"type": "sign", "writer": "wanjiru", "name": "Wanjiru Kamau", "at": "t1"}
    out = session.run(SONG, [sign])
    assert out["can_sign"] is False and out["signatures"] == {}


# ---------------------------------------------------------------- explanations

def test_explanations_exist_in_both_languages_without_dashes() -> None:
    out = session.run(SONG, events(*FULL))
    exp = out["explanation"]
    for texts in list(exp["elements"].values()) + list(exp["evidence"].values()):
        for lang in ("en", "sw"):
            assert texts[lang] and "—" not in texts[lang] and "–" not in texts[lang]


# ---------------------------------------------------------------- API

def test_api_health(client: TestClient) -> None:
    body = client.get("/api/health").json()
    assert body["omega"] == "v0.1.20" and body["hyperon"] == "0.2.10"


def test_api_run_and_validation(client: TestClient) -> None:
    ok = client.post("/api/session/run", json={"song_id": SONG, "events": events(*FULL)})
    assert ok.status_code == 200 and ok.json()["converged"] is True
    bad_id = client.post("/api/session/run", json={"song_id": "x; drop", "events": []})
    assert bad_id.status_code == 422
    bad_rec = client.post("/api/session/run", json={"song_id": SONG, "events": [
        *events(*FULL), {"type": "contest", "record": "nope", "by": "malik", "reason": "x"}]})
    assert bad_rec.status_code == 422
    unknown = client.post("/api/session/run", json={"song_id": "nosong", "events": []})
    assert unknown.status_code == 404


def test_api_song_and_jev_fallback(client: TestClient, monkeypatch: pytest.MonkeyPatch) -> None:
    assert client.get(f"/api/songs/{SONG}").json()["title"] == "Amani Ni Sisi"
    assert client.get("/api/songs/nope").status_code == 404
    monkeypatch.delenv("TYPESAFE_API_KEY", raising=False)
    body = client.post("/api/jev/read", json={"record": "msg-fire"}).json()
    assert body["mode"] == "manual" and body["choice"] == "wanjiru__originated__hook-melody"
    assert client.post("/api/jev/read", json={"record": "memo-hook"}).status_code == 404
