# Build Spec: Sawa

> **What this file is.** The engineering plan: scope, the demo script that drives the build, architecture, the MeTTa atoms and rules, the API, the screens, data, tests, deployment and the time plan. Product reasoning is in [solution.md](solution.md).
>
> **Status:** v1.0 for review, Tuesday 20 October 2026, about 12:45 EAT. **Nothing in `build/` exists yet.** All code goes in `build/` after Eugene approves these docs.

---

## Table Of Contents

0. [The One Feature](#0-the-one-feature)
1. [Scope](#1-scope)
2. [The Demo Script That Drives The Build](#2-the-demo-script-that-drives-the-build)
3. [System Architecture](#3-system-architecture)
4. [Repository Layout](#4-repository-layout)
5. [Tech Stack And Pinned Versions](#5-tech-stack-and-pinned-versions)
6. [The Omega Agent Core (MeTTa)](#6-the-omega-agent-core-metta)
7. [The Reconciliation Pipeline](#7-the-reconciliation-pipeline)
8. [Backend API](#8-backend-api)
9. [Jev Integration](#9-jev-integration)
10. [Explanations In English And Swahili](#10-explanations-in-english-and-swahili)
11. [Frontend](#11-frontend)
12. [Design System](#12-design-system)
13. [Screens In Detail](#13-screens-in-detail)
14. [Synthetic Data](#14-synthetic-data)
15. [Testing](#15-testing)
16. [Deployment](#16-deployment)
17. [Video Production](#17-video-production)
18. [Time Plan](#18-time-plan)
19. [Risks And Fallbacks](#19-risks-and-fallbacks)
20. [Definition Of Done](#20-definition-of-done)

---

## 0. The One Feature

> **Two Omega agents with different memories of one co-write start in disagreement and independently reach the same split sheet, proven by equal proof hashes, with a clause trail per share that either writer can contest, in English and Swahili, signed by both.**

Everything that does not serve this sentence is cut.

---

## 1. Scope

### 1.1 P0: must ship (this is the submission)

1. Two agents (Harlem, Nairobi), each with its own Hyperon atom space, Omega `lib_nal.metta` loaded unmodified, its own append-only memory, and the shared rule pack `split-v1`.
2. **Solo view**: each agent's draft split from its own memory only (the disagreement).
3. **Exchange**: each agent ingests the other's evidence packet; logged in both memories.
4. **Reconcile**: each agent independently runs defeat, revise, decide, compute; returns split, premises, proof, and **proof hash**. UI shows "One truth" only when the hashes are equal.
5. **Clause trail** per element: share, premises (status: used, revised, defeated, withdrawn, needs confirmation), sources, truth values, the rule that fired, NAL derivation steps.
6. **Contest**: withdraw any premise with a reason; both agents recompute.
7. **Sign**: both writers sign; canonical record hashed (SHA-256); signed record view with parties on record, composition and master apart, stem hashes.
8. **English and Swahili** toggle for every explanation.
9. **Audit**: both agents' memory logs, in order.
10. Deployed at a public URL; README, docs, AI disclosure; tests green.

### 1.2 P1: ship if P0 is green by 17:00 EAT

1. **Jev reads the chat**: the evidence screen shows each chat message with Jev's typed reading ("credits Wanjiru with originating the hook melody", probability), confirm button. Without a key, shows the pre-confirmed seeded reading and a "manual" badge.
2. **Rule-version mismatch** demo (Journey B): toggle one agent to `split-v0`; hashes differ; signing blocked.
3. **Needs-confirmation** demo (Journey C) on a second seeded song.

### 1.3 P2: only in "What's Next", not built

More than two writers; audio similarity evidence; live session capture; royalty statement reconciliation; collecting-society export; on-device agents; governed policy learning; real Incantio or BASIX integration.

### 1.4 Cut list

User accounts and auth; file uploads; real audio; payments; blockchain minting; multi-song management beyond the seeded songs; mobile-specific layout beyond responsive.

---

## 2. The Demo Script That Drives The Build

Target length **2:45** (hard limit 3:00). Narration written first; every click lands on the words. Light mode, visible cursor, Kenyan English voice, captions, minimal upbeat music.

| # | Time | Screen | On screen | Narration (draft) |
|---|---|---|---|---|
| 1 | 0:00 | Title card | "Sawa. Two creators. Two memories. One split sheet." | "Meet Sawa. Two creators, two memories, one split sheet." |
| 2 | 0:05 | Home | Song card "Amani Ni Sisi", Wanjiru (Nairobi) and Malik (Harlem) | "Wanjiru in Nairobi and Malik in Harlem co-wrote a peace song over WhatsApp. Now a sync buyer wants it, and they need a split sheet. Their memories don't match." |
| 3 | 0:20 | Session, solo | Two agent panels: Harlem 65/35, Nairobi 60/40; banner "The agents disagree about 2 facts" | "Each writer has an Omega agent with its own memory. Malik's agent says sixty five, thirty five. Wanjiru's says sixty, forty. They disagree about two facts: who started the hook, and who wrote the chorus." |
| 4 | 0:38 | Evidence | Timeline: memo 12 Sep, chat, stems, doc edits, MIDI 14 Sep; Jev reading on Malik's message | "Here is what each agent remembers. Every file has a hash and a timestamp. Jev reads the chat in Sheng, Swahili or English, and the writer confirms what their message meant." |
| 5 | 0:58 | Session | Click "Exchange evidence" | "The agents exchange evidence, as atoms, never the audio." |
| 6 | 1:05 | Session | Click "Reconcile"; bars animate to 50/50 in both panels; equal hashes; "One truth" | "Each agent reconciles on its own, with Omega's reasoning. Both reach fifty, fifty. Same proof, same hash. One truth." |
| 7 | 1:20 | Split sheet | Hook melody row expanded: memo premise revised, MIDI defeated to "developed", rule `received-before-created` | "Why? The hook. Wanjiru's memo predates Malik's MIDI, and he received it before he made his. So Omega reads his MIDI as developing her hook, not starting it. Seventy five, twenty five." |
| 8 | 1:40 | Split sheet | Chorus row: doc edit history for both, recollection defeated (after dispute) | "The chorus. The edit history shows both of them writing it. Her memory, written after the dispute began, counts for less. Fifty, fifty." |
| 9 | 1:55 | Split sheet | Toggle Kiswahili | "Every line explains itself in English or Swahili, from the same proof." |
| 10 | 2:03 | Split sheet | Malik contests his message: "It was hype, not a credit"; recompute; hook stays; truth (0.89, 0.88) to (0.83, 0.83) | "Malik contests his own message. Both agents recompute. The hook stays with Wanjiru, because the memo still came first. His contest is on the record, and it didn't win by being loud." |
| 11 | 2:20 | Sign | Both sign; record hash; parties; composition and master apart; stems hashed | "Both sign, in the session. The record is hashed. The stems never leave the vault." |
| 12 | 2:30 | Outro card | What's next list | "Next: more writers, audio evidence, and payouts checked against the split, ready for Incantio and BASIX. Sawa. Agreed." |

Every number above must match the running app; final numbers are taken from the engine, not this table.

---

## 3. System Architecture

```
 Browser (Next.js, shadcn/ui)
   │  session event log kept client-side (and in localStorage)
   │  POST /api/session/run {song, events[]}
   ▼
 FastAPI (Python 3.12, one serverless function)
   │
   ├── Agent "harlem"  ── own hyperon.MeTTa() atom space
   │      memory = seed events for Malik + session events
   │      loads: shims, Omega lib_nal.metta (unmodified, v0.1.20), sawa/*.metta, pack split-v1
   │
   ├── Agent "nairobi" ── own hyperon.MeTTa() atom space
   │      memory = seed events for Wanjiru + session events
   │
   └── Reconciler (per agent): collect evidence → defeat (|-nal deduction) →
         revise (|-nal revision) → band (Omega thresholds) → shares (policy atoms)
         → proof → canonical JSON → SHA-256
 Optional: TypeSafe Jev (server-side only) for reading chat messages
```

**Event-sourced memory.** Each agent's memory is an append-only list of events (`artefact`, `message`, `claim`, `exchange`, `contest`, `confirm`, `sign`). On every request the agent replays its memory into a fresh atom space, exactly like Omega's episodic history replay, then reasons. Consequences: deterministic results, no server state, safe on serverless, and the audit log *is* the memory.

**Independence.** The two agents never share an atom space. Before `exchange`, each sees only its owner's events. After `exchange`, each holds a copy of the other's packet. Each reconciles separately; the API returns both results and both hashes. Equal hashes are a property we test.

---

## 4. Repository Layout

```
build/
  agent/
    pyproject.toml            # uv; python 3.12; hyperon 0.2.10; fastapi; typesafe-sdk
    sawa/
      __init__.py
      engine.py               # hyperon host (adapted from Mizani, credited)
      memory.py               # event types, replay into atoms
      seed.py                 # synthetic songs, people, artefacts (labelled)
      reconcile.py            # pipeline: defeat, revise, band, shares, proof, hash
      explain.py              # EN and SW templates filled from proof only
      jev.py                  # chat reader (optional, gated)
      app.py                  # FastAPI routes
      schemas.py              # pydantic models
    metta/
      shims.metta             # min/max for hyperon
      evidence.metta          # evidence kinds, provenance, truth ladder
      defeaters.metta         # received-before-created, recollection-after-dispute
      split.metta             # policy atoms, element weights, share rules
      reason.metta            # NAL deduction-chain firing (pattern from Mizani)
      packs/split-v1.metta    # rule pack (versioned)
      packs/split-v0.metta    # older pack for the mismatch demo (P1)
    vendor/omega/lib_nal.metta  # Omega v0.1.20, unmodified, Apache-2.0 NOTICE kept
    tests/                    # pytest
  api/index.py                # Vercel entry (mounts sawa.app)
  web/                        # Next.js 16, shadcn/ui, pnpm
    app/(routes)...
    components/sawa/...
    lib/api.ts, lib/types.ts, lib/i18n.ts
  vercel.json
  Makefile                    # make dev, make test, make seed
README.md, docs/, AI_DISCLOSURE.md (root)
```

---

## 5. Tech Stack And Pinned Versions

| Layer | Choice | Version |
|---|---|---|
| Reasoning | Omega `lib_nal.metta` | v0.1.20 (unmodified) |
| MeTTa runtime | `hyperon` (pip) | 0.2.10 |
| Python | CPython | 3.12 |
| API | FastAPI, pydantic, uvicorn | as in Mizani (0.142.x, 2.13.x, 0.54.x) |
| Language reading | `typesafe-sdk`, model `jev-latest` | 0.7.2 |
| Web | Next.js, React, Tailwind v4, shadcn/ui (Base UI), lucide | Next 16.3, React 19.2 |
| Package managers | uv (Python), pnpm (web) | |
| Hosting | Vercel (Python function + Next.js) | |
| Tests | pytest; Playwright smoke | |

---

## 6. The Omega Agent Core (MeTTa)

### 6.1 Design principles

1. **Atoms carry provenance.** Every evidence atom names its source event, author, time and kind.
2. **Truth values come from the evidence ladder**, never from a model.
3. **Every defeat is a NAL deduction** through Omega's `|-nal`, so it has a truth value and a derivation step.
4. **Every merge is NAL revision** through `|-nal`.
5. **Policy is data.** Element weights and origination splits are atoms the writers agreed.
6. **Rule packs are versioned atoms**; the version is part of the proof and of the hash.

### 6.2 Atom vocabulary

```metta
;; people and song
(writer wanjiru nairobi)          (writer malik harlem)
(song amani-ni-sisi)
(element amani-ni-sisi hook-melody composition)
(weight split-v1 hook-melody 20)  ; from the agreed policy "jua-2025"

;; evidence (one per artefact or message, after replay)
(evidence <id> (originated hook-melody wanjiru) artefact (by wanjiru) (at 1757700240) (stv 1.0 0.80))
(evidence <id> (originated hook-melody wanjiru) other-party-statement (by malik) (at ...) (stv 1.0 0.70))
(evidence <id> (originated hook-melody malik) recollection (by malik) (at ...) (stv 1.0 0.45))
(evidence <id> (originated hook-melody wanjiru) recollection (by malik) (at ...) (stv 0.0 0.45))

;; facts used by defeaters
(received malik <artefact-id> (at ...))
(created <artefact-id> hook-melody malik (at ...))
(dispute-began amani-ni-sisi (at ...))

;; session
(withdrawn <evidence-id> (by malik) (reason "..."))
(signed wanjiru (at ...))
```

Truth ladder (from Omega tutorial 08 grounding guidance):

| Kind | stv |
|---|---|
| `artefact` (hash and timestamp) | (1.0 0.80) |
| `other-party-statement` (against own interest, confirmed by its author) | (1.0 0.70) |
| `co-edit` (document edit history line) | (1.0 0.75) |
| `recollection` (own favour) | (1.0 0.45) |
| `recollection-after-dispute` | weakened by defeater |

### 6.3 Defeaters (`defeaters.metta`), fired as NAL deduction

```metta
;; D1 received-before-created: an artefact for element E made by X after X
;; received another writer's artefact for E is evidence of development, not origination.
(rule split-v1 received-before-created v1
  (==> (∧ created-after-receipt same-element) develops-not-originates) (stv 1.0 0.9))

;; D2 recollection-after-dispute: a recollection written after the dispute began
;; is discounted relative to contemporaneous records.
(rule split-v1 recollection-after-dispute v1
  (==> (∧ written-after-dispute contemporaneous-record-exists) discount-recollection) (stv 1.0 0.9))
```

When D1 fires for an evidence item, the item is re-targeted from `(originated E X)` to `(developed E X)` with the deduced truth value, and the proof records the step. When D2 fires, the item's confidence is multiplied by a discount atom `(discount split-v1 recollection-after-dispute 0.5)` and the proof records it.

### 6.4 Revision and bands

For each statement `(originated E W)`, `(developed E W)`, `(co-originated E)`: fold all surviving evidence with `|-nal` revision. Band with Omega's thresholds: **settled** if f ≥ 0.6 and c ≥ 0.5; **needs confirmation** if f ≥ 0.3 and c ≥ 0.2; else **unsupported**.

### 6.5 Shares (`split.metta`)

Per element, from settled statements:

| Settled statements | Share |
|---|---|
| One originator, no developer | originator 100 |
| One originator, one developer | 75 / 25 (policy atoms) |
| Both originated (co-written) | 50 / 50 |
| Anything needs confirmation | element **blocked**; signing disabled; question generated |

Composition share of writer = Σ over elements (element weight × writer's share in element) / 100. Master split is a separate policy (50 / 50 in the demo, from the "jua-2025" agreement in memory).

### 6.6 Proof and hash

Proof JSON per agent: pack version, Omega release and lib hash, per-element statements with final stv, band, contributing evidence (status, stv, source event), defeater steps, revision steps, shares. Canonical serialisation (sorted keys, fixed float rounding to 4 dp), then SHA-256. Agent identity is **excluded** from the hashed body, so two agents with the same evidence and rules produce the same hash.

---

## 7. The Reconciliation Pipeline

```
replay(memory) → atoms
collect: (evidence ...) for this agent's visible events
defeat:  for each evidence, check D1/D2 conditions in MeTTa; fire via |-nal; retarget or discount
withdraw: drop evidence with (withdrawn id ...) → status "withdrawn", kept in proof
revise:  per statement, fold surviving stv with |-nal revision
band:    settled / needs-confirmation / unsupported
shares:  per element from policy atoms; totals per writer; master separately
proof:   steps, premises, sources, rule versions
hash:    sha256(canonical(proof without agent id))
```

The **solo draft** (before exchange) is the owner's own claimed split from their `claim` event, plus what their agent can reconcile from only their own evidence, shown as "your agent's view".

---

## 8. Backend API

| Method | Path | Body | Returns |
|---|---|---|---|
| GET | `/api/health` | | Omega release, lib hash, pack versions, hyperon version, Jev availability |
| GET | `/api/songs` | | Seeded songs |
| GET | `/api/songs/{id}` | | Song, writers, elements, policy, seed events per agent |
| POST | `/api/session/run` | `{song_id, events[]}` | For each agent: memory, draft, reconciliation (if exchanged), proof, hash; `converged: bool`; `can_sign: bool`; `blocked_reasons[]` |
| POST | `/api/jev/read` | `{message_id}` | Jev's typed reading (or seeded fallback with `mode: manual`) |
| POST | `/api/record` | `{song_id, events[]}` | Signed record (only if converged and both signed): canonical JSON, SHA-256 |

Session events from the client: `exchange`, `contest {evidence_id, by, reason}`, `confirm {message_id, by}`, `sign {writer, name}`, `pack {agent, version}` (P1). Validated with pydantic; unknown ids rejected with 422; reasons limited to 280 characters; no free text reaches MeTTa except as quoted strings escaped by the host.

---

## 9. Jev Integration

- Model `jev-latest`, server-side only, key from `TYPESAFE_API_KEY` (never shipped to the browser).
- One request per message with a **Choice** per (element, writer): "According to `message`, does the sender credit `writer` with originating, developing, or nothing about `element`?" plus a "not about credit" option.
- Gate: confidence below 0.6 becomes "needs the author's confirmation".
- Jev output never becomes evidence until the message's **author** confirms it (the seeded scenario has both chat readings confirmed so the demo is deterministic; the live Jev call is shown on the evidence screen).
- Any failure falls back to the seeded reading with a "manual" badge.

---

## 10. Explanations In English And Swahili

Templates keyed by proof step type, filled only with proof values. Examples:

| Key | English | Kiswahili |
|---|---|---|
| `originated` | "{writer} started the {element}." | "{writer} ndiye alianzisha {element}." |
| `developed` | "{writer} developed the {element} after receiving {other}'s {artefact}." | "{writer} aliendeleza {element} baada ya kupokea {artefact} ya {other}." |
| `d1` | "{artefact} was made after its maker received {other}'s earlier version, so it counts as development." | "{artefact} ilitengenezwa baada ya mtengenezaji kupokea toleo la awali la {other}, kwa hivyo inahesabiwa kama maendeleo." |
| `d2` | "This recollection was written after the dispute began, so it counts for less than records made at the time." | "Kumbukumbu hii iliandikwa baada ya mzozo kuanza, kwa hivyo ina uzito mdogo kuliko rekodi za wakati huo." |
| `withdrawn` | "Withdrawn by {by}: \"{reason}\"" | "Imeondolewa na {by}: \"{reason}\"" |
| `converged` | "Both agents reached the same answer from the same evidence." | "Mawakala wote wawili wamefikia jibu moja kutoka kwa ushahidi uleule." |

Swahili strings to be reviewed by Eugene (fluent) before recording. No dashes in any user-facing string; Title Case for titles and buttons.

---

## 11. Frontend

- Next.js 16 App Router, pnpm, Tailwind v4, **pure shadcn/ui** components (same setup as Mizani's `web/`, copied and cleaned).
- State: the session event log lives in React state, mirrored to `localStorage` (try/catch); every change calls `/api/session/run`.
- "Reset Demo" button clears the log.
- Light and dark mode; light for the video.

---

## 12. Design System

- Calm, editorial, music-industry feel: off-white background, ink text, one accent per writer (Nairobi: warm terracotta; Harlem: deep indigo), neutral greys for system states.
- Type: Geist Sans for UI, Geist Mono for hashes and truth values.
- **Split bar**: a single horizontal bar per agent, two colours, animated on change (the "splits you can watch" moment).
- Status semantics: settled (green check), needs confirmation (amber), withdrawn (grey strikethrough), defeated (slate with reason chip), revised (blue merge icon).
- Every colour paired with an icon and a label (accessibility).

---

## 13. Screens In Detail

### 13.1 `/` Home

Song card ("Amani Ni Sisi", synthetic data badge), the two writers with city and role, one line on the dispute, Start Session button, "How Sawa Works" three-step strip (Remember, Reconcile, Sign).

### 13.2 `/session/[songId]` Session (hero)

- Header: song, step indicator (Disagree, Exchange, Reconcile, Sign), language toggle, Reset Demo.
- Two agent cards side by side: agent name, owner, memory count, split bar, composition percentages, hash (after reconcile), status.
- Disagreement banner listing the disputed facts, or the convergence banner "One Truth" with both hashes.
- Primary actions: Exchange Evidence, Reconcile, Open Split Sheet.

### 13.3 `/session/[songId]/evidence` Evidence

Timeline grouped by day; each item: kind icon, author, time (both time zones), hash (short), which agents hold it, the statement it supports and its truth value. Chat messages show Jev's reading with Confirm.

### 13.4 `/session/[songId]/sheet` Split Sheet

Table of elements: weight, share per writer, band. Expand a row: the clause trail (premises with status chips, source, stv, defeater or revision steps, rule and version), Contest button per premise (dialog: reason). Composition and master tabs. Sign panel at the bottom: two signature boxes, disabled until converged and nothing blocked.

### 13.5 `/session/[songId]/record` Record

Signed record: parties on record (writers; builders; BASIX.MARKET and GTM broker as "concept" roles), composition split, master split, rule pack, Omega release, proof hash, record SHA-256, stem hashes, "Ready For Licensing" status with "Incantio / BASIX listing: concept pending partner confirmation".

### 13.6 `/session/[songId]/audit` Audit

Two columns, Harlem memory and Nairobi memory, each event in order with type, author, time.

---

## 14. Synthetic Data

All labelled **synthetic** in the UI. Song A "Amani Ni Sisi" (hero, section 4 of solution.md). Song B (P1) "Jua Kali Remix", where the bass line has only two opposing recollections, producing **needs confirmation** and a question.

Seed artefact hashes are SHA-256 of fixed placeholder byte strings, generated in `seed.py` so they are reproducible.

---

## 15. Testing

- **Unit (pytest):** NAL revision and deduction match hand-computed values (section 3.2 of research.md); D1 fires on the MIDI and not on the memo; D2 discounts only post-dispute recollections; shares sum to 100; withdrawn evidence never contributes.
- **Property:** with the same events, Harlem and Nairobi hashes are equal; with different pack versions they differ; before exchange they differ.
- **Scenario:** the demo script end to end through the API (draft 65/35 and 60/40; reconciled 50/50; contest keeps the hook; signing allowed only after both sign).
- **Web smoke (Playwright):** home loads; session flow clicks through; language toggle changes text.
- Target coverage for `sawa/` above 80%.

---

## 16. Deployment

- Vercel: Python function `build/api/index.py` (HOME=/tmp for hyperon, as in Mizani) and the Next.js app; web calls the API by URL env var.
- Domain: a subdomain of codewitheugene.top if available (to confirm with Eugene), otherwise the vercel.app URL.
- Secrets: `TYPESAFE_API_KEY` as a Vercel env var only; `.env.example` committed.
- Clean-clone test of README setup before submission.

---

## 17. Video Production

Reuse the Mizani pipeline (`~/Tools/OpenMontage/projects/mizani-demo/scripts/`) in a new project folder `~/Tools/OpenMontage/projects/sawa-demo/`: narration JSON from section 2, edge-tts `en-KE-ChilembaNeural` at +4%, voice-anchored Playwright capture of a clean local copy at 1920x1080, OpenCV virtual camera, caption pills, Pixabay music ducked, -16 LUFS, under 3:00. Change the hardcoded paths listed in research.md section 8.3. Upload as the platform allows (direct MP4 last time).

---

## 18. Time Plan (Tuesday 20 October, EAT)

| Time | Work |
|---|---|
| 12:00 to 13:00 | Research and docs (this) |
| 13:00 | **Eugene reviews the docs; go or changes** |
| +0:00 to +1:30 | Agent core: engine, memory, seed, MeTTa rules, reconcile, tests green |
| +1:30 to +2:15 | API and explanations |
| +2:15 to +4:30 | Web: home, session, sheet, record, audit, evidence |
| +4:30 to +5:00 | Deploy; clean-clone test; **create the platform entry with repo, docs, live link (by 17:30)** |
| +5:00 to +5:30 | P1 items if green |
| +5:30 to +8:30 | Video (narration, capture, render, mix, QA) |
| by 23:00 | Final entry update (video, description); submission checklist |

---

## 19. Risks And Fallbacks

| Risk | Fallback |
|---|---|
| Hyperon behaviour differs in a new rule | Keep rules as two-hop deductions (tested pattern); compute in Python with the same `|-nal` calls |
| Vercel Python function size or cold start | Same packaging as Mizani (worked); fallback: record the video locally and deploy API to Railway (Dockerfile pattern exists) |
| Jev unavailable | Seeded readings with "manual" badge (P1 only) |
| Time runs short | Drop P1; drop audit page to a panel; never drop contest, convergence or sign |
| Deadline is 17:59 after all | Entry with repo, docs and live link saved by 17:30; video appended later if allowed |

---

## 20. Definition Of Done

- [ ] Demo script runs end to end on the deployed URL with the numbers in section 2
- [ ] Equal hashes after reconcile; different before; tested
- [ ] Contest recomputes and is logged in both memories
- [ ] English and Swahili for every explanation
- [ ] Tests pass; coverage above 80% for the agent package
- [ ] README: what, track and challenge, setup tested on a clean clone, run, test, team, AI disclosure, credits, licence, what's next
- [ ] `AI_DISCLOSURE.md` complete
- [ ] Video at most 3:00, captions, says what's next
- [ ] Platform entry submitted; checklist in [info.md](info.md) section 19 all ticked
