"""Explanations in English and Swahili, filled only from the proof.

No language model writes these. Each sentence is a template keyed by a proof
step, so an explanation can never claim more than the proof contains.
No dashes in any user-facing string.
"""
from __future__ import annotations

from .seed import ELEMENTS, WRITERS

EL_NAME = {e[0]: {"en": e[3], "sw": e[4]} for e in ELEMENTS}
FIRST = {w: v["name"].split()[0] for w, v in WRITERS.items()}

RULE_NAME = {
    "artefact": {"en": "Hashed file", "sw": "Faili yenye hash"},
    "co-edit": {"en": "Shared document edit", "sw": "Uhariri wa hati ya pamoja"},
    "other-party-statement": {"en": "Statement by the other writer", "sw": "Kauli ya mwandishi mwingine"},
    "recollection": {"en": "Own recollection", "sw": "Kumbukumbu binafsi"},
    "received-before-created": {"en": "Defeater: received before created", "sw": "Kizuizi: ilipokelewa kabla ya kutengenezwa"},
    "recollection-after-dispute": {"en": "Defeater: recollection after dispute", "sw": "Kizuizi: kumbukumbu baada ya mzozo"},
}

BAND_NAME = {
    "settled": {"en": "Settled", "sw": "Imethibitishwa"},
    "needs-confirmation": {"en": "Not established", "sw": "Haijathibitishwa"},
    "unsupported": {"en": "Unsupported", "sw": "Haina msingi"},
}


def _names(ws: list[str], lang: str) -> str:
    names = [FIRST[w] for w in ws]
    joiner = " and " if lang == "en" else " na "
    return joiner.join(names)


def element_summary(row: dict, lang: str) -> str:
    el = EL_NAME[row["element"]][lang]
    os_, ds = row["originators"], row["developers"]
    if row["blocked"] or not os_:
        return (f"{el}: no writer is settled as its originator yet, so this line needs both of you to confirm."
                if lang == "en" else
                f"{el}: hakuna mwandishi aliyethibitishwa kuwa mwanzilishi, kwa hivyo mstari huu unahitaji uthibitisho wenu wote wawili.")
    if len(os_) > 1:
        return (f"{el}: written together by {_names(os_, lang)}, so it is shared equally."
                if lang == "en" else
                f"{el}: imeandikwa pamoja na {_names(os_, lang)}, kwa hivyo inagawanywa sawa.")
    if ds:
        o, d = FIRST[os_[0]], FIRST[ds[0]]
        return (f"{el}: {o} started it and {d} developed it, so {o} takes 75 and {d} takes 25 under your agreed policy."
                if lang == "en" else
                f"{el}: {o} aliianzisha na {d} akaiendeleza, kwa hivyo {o} anapata 75 na {d} anapata 25 kwa sera mliyokubaliana.")
    o = FIRST[os_[0]]
    return (f"{el}: the evidence settles {o} as its only writer."
            if lang == "en" else
            f"{el}: ushahidi unathibitisha kuwa {o} ndiye mwandishi pekee.")


def evidence_sentence(ev: dict, records: dict[str, dict], lang: str) -> str:
    rec = records[ev["record"]]
    who = FIRST[ev["author"]]
    rule = ev["rule"]
    if rule == "received-before-created":
        return (f"{rec.get('file', rec['id'])} was made after {who} received the other writer's earlier version, so it counts as developing the part, not starting it."
                if lang == "en" else
                f"{rec.get('file', rec['id'])} ilitengenezwa baada ya {who} kupokea toleo la awali la mwandishi mwingine, kwa hivyo inahesabiwa kama kuendeleza sehemu hii, si kuianzisha.")
    if rule == "recollection-after-dispute":
        return (f"{who}'s account was written after the dispute began, so it counts for less than records made at the time."
                if lang == "en" else
                f"Maelezo ya {who} yaliandikwa baada ya mzozo kuanza, kwa hivyo yana uzito mdogo kuliko rekodi za wakati huo.")
    if rule == "artefact":
        return (f"{rec.get('file')} by {who}, hashed and timestamped."
                if lang == "en" else
                f"{rec.get('file')} ya {who}, yenye hash na muhuri wa wakati.")
    if rule == "co-edit":
        return (f"{who} typed \"{rec.get('text')}\" in the shared lyric document."
                if lang == "en" else
                f"{who} aliandika \"{rec.get('text')}\" katika hati ya maneno ya pamoja.")
    if rule == "other-party-statement":
        return (f"{who} wrote \"{rec.get('text')}\", crediting the other writer. {who} confirmed what the message meant."
                if lang == "en" else
                f"{who} aliandika \"{rec.get('text')}\", akimpa sifa mwandishi mwingine. {who} alithibitisha maana ya ujumbe huo.")
    return (f"{who}'s own account."
            if lang == "en" else f"Maelezo binafsi ya {who}.")


def headline(converged: bool, phase: str, lang: str) -> str:
    if phase == "solo":
        return ("The agents disagree." if lang == "en" else "Mawakala hawakubaliani.")
    if phase == "exchanged":
        return ("Evidence exchanged. Ready to reconcile." if lang == "en"
                else "Ushahidi umebadilishwa. Tayari kupatanisha.")
    if converged:
        return ("Both agents reached the same answer from the same evidence."
                if lang == "en" else
                "Mawakala wote wawili wamefikia jibu moja kutoka kwa ushahidi uleule.")
    return ("The agents have not reached the same answer. Signing is closed."
            if lang == "en" else
            "Mawakala hawajafikia jibu moja. Kusaini kumefungwa.")


def explain(body: dict, records: dict[str, dict]) -> dict:
    """Per element summaries and per evidence sentences, in both languages."""
    out: dict = {"elements": {}, "evidence": {}, "rules": RULE_NAME, "bands": BAND_NAME,
                 "element_names": EL_NAME}
    for row in body["elements"]:
        out["elements"][row["element"]] = {lang: element_summary(row, lang) for lang in ("en", "sw")}
        for st in row.get("statements", []):
            for ev in st["evidence"]:
                out["evidence"][ev["id"]] = {lang: evidence_sentence(ev, records, lang) for lang in ("en", "sw")}
    return out
