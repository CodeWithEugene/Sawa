# Solution: Sawa

> **What this file is.** The full solution for the problem in [problem.md](problem.md): what it is, who it is for, the experience end to end, how it works, why Omega, what is new, how it is governed, and what comes next. Engineering detail lives in [build.md](build.md). Evidence lives in [research.md](research.md).
>
> **Status:** v1.0 for review, Tuesday 20 October 2026, about 12:40 EAT. **Nothing is built yet.** Every capability below is a plan until [build.md](build.md) marks it done.

---

## Table Of Contents

1. [Sawa In One Screen](#1-sawa-in-one-screen)
2. [The Core Idea: Two Memories, One Split Sheet](#2-the-core-idea-two-memories-one-split-sheet)
3. [People](#3-people)
4. [The Demo Story: "Amani Ni Sisi"](#4-the-demo-story-amani-ni-sisi)
5. [The Experience End To End](#5-the-experience-end-to-end)
6. [How It Works](#6-how-it-works)
7. [Why Omega And MeTTa (And Where Jev Fits)](#7-why-omega-and-metta-and-where-jev-fits)
8. [Would A Real Artist Trust This?](#8-would-a-real-artist-trust-this)
9. [Rights, Consent And Governance](#9-rights-consent-and-governance)
10. [What Is New, And An Honest Comparison](#10-what-is-new-and-an-honest-comparison)
11. [How It Maps To The Hackathon](#11-how-it-maps-to-the-hackathon)
12. [SWOT](#12-swot)
13. [Path To BASIX.MARKET And Incantio](#13-path-to-basixmarket-and-incantio)
14. [What's Next](#14-whats-next)
15. [Pitch Library](#15-pitch-library)

---

## 1. Sawa In One Screen

| | |
|---|---|
| **Name** | **Sawa** (Swahili: "equal", "fair", and the everyday word for "agreed") |
| **One line** | **Two creators. Two memories. One split sheet.** |
| **What it is** | Two SingularityNET **Omega** agents, one for each co-writer of a song, each holding its own memory of the session. They **disagree** about who wrote what. They exchange evidence, reason with Omega's **NAL** (revision, defeaters, truth values), and each **independently arrives at the same split sheet**, proven by matching proof hashes. Every percentage carries a **clause trail** in **English and Swahili** that either writer can **contest**. Both writers sign in the session, and the signed sheet is registered as a hash so the stems never leave the vault. |
| **For** | Independent songwriters and producers who co-write across borders (our demo: Harlem and Nairobi), and the platforms that license their music (Incantio, BASIX.MARKET) |
| **Challenge** | Track 2, Omega AI Agents, **Two Agents, One Truth**: "two agents disagree about a fact and reason to a shared answer." Art brief: **AI for Peace**, "two communities' accounts of one event, mediated to one story." |
| **Built with** | Omega's `lib_nal.metta` (unmodified, pinned) on Hyperon; MeTTa rule packs; FastAPI; Next.js with shadcn/ui; TypeSafe **Jev** to read chat messages in Sheng, Swahili and English into typed credit statements that the writers confirm |
| **Data** | 100% synthetic. No partner catalogue, artwork, recording or person is used. Labelled in the app, the README and the video |

---

## 2. The Core Idea: Two Memories, One Split Sheet

Every co-written song has two (or more) memories of how it was made, and they never match.

```
   HARLEM AGENT (Malik's memory)                     NAIROBI AGENT (Wanjiru's memory)
   ─────────────────────────────                     ────────────────────────────────
   hook_v1.mid, 14 Sep (hash)                        voice memo "hook idea", 12 Sep (hash)
   beat stems, 13 Sep (hash)                         lyric doc edits, 13 Sep
   chat: "this hum is fire, imma                     chat: "verse ya pili ni yako Malik"
          build the beat around it"                  her recollection: "I wrote the chorus"
   Malik's draft: Malik 65 / Wanjiru 35              Wanjiru's draft: Wanjiru 60 / Malik 40
            │                                                     │
            │  DISAGREE about two facts:                          │
            │  1. Who originated the hook melody?                 │
            │  2. Who wrote the chorus lyrics?                    │
            └──────────────── exchange evidence ──────────────────┘
                                     │
          each agent reconciles the union of evidence on its own, with Omega NAL
                                     │
                ┌────────────────────┴────────────────────┐
                ▼                                         ▼
        Harlem agent: 50 / 50                     Nairobi agent: 50 / 50
        proof hash 7f3a…c21                       proof hash 7f3a…c21
                └──────────────  ONE TRUTH  ──────────────┘
   Hook: Wanjiru originated (memo predates MIDI; Malik's own message credits her hum),
         Malik developed it (his MIDI came after he received the memo). 75 / 25.
   Chorus: co-written (the edit history shows both; a recollection made after the
         dispute began is weaker than a contemporaneous record). 50 / 50.
   Every line in English and Swahili. Either writer can contest any premise.
```

Three things make this more than a calculator:

1. **Two agents with two memories.** Neither agent sees the other's evidence until they exchange it. Each starts confident in its owner's account. That is the honest starting point of every split dispute.
2. **Reasoning, not voting.** Omega's NAL **revision** merges independent evidence about the same statement; **defeater** rules discount evidence for stated reasons; Omega's own **act threshold** decides whether a statement is settled enough to put on a signed document.
3. **Convergence you can verify.** Both agents run the same reconciliation independently. If they reach the same split, their canonical proofs hash to the same value. "One truth" is not a slogan on screen; it is two equal hashes.

---

## 3. People

All people, songs, recordings and messages are fictional composites. No real person is represented.

### 3.1 Wanjiru, songwriter and vocalist, Nairobi

- 26, writes in Swahili and English, records voice memos on her phone when a melody comes to her, works from a home studio in Kilimani.
- **Jobs to be done:** get credited for what she wrote, understand the split in her language, sign before the song is pitched for sync.
- **Pains:** verbal agreements that change later; producers who treat the topline as "just vocals"; contracts and split sheets only in English.

### 3.2 Malik, producer, Harlem

- 31, makes beats in his Harlem apartment, works with artists in five countries over WhatsApp and shared drives.
- **Jobs to be done:** close the split quickly so the song can be licensed, be credited for production and for what he developed, avoid a fight with a collaborator he likes.
- **Pains:** split conversations that turn personal; no shared record of who sent what first; disputes that freeze royalties.

### 3.3 The licensor (Incantio, a sync buyer, BASIX.MARKET)

- Cannot list or license a song until every rights holder is on the record with agreed shares.
- **What Sawa gives them:** a signed split sheet with a verifiable hash, composition and master tracked apart, and a clause trail that explains every share.

### 3.4 Who is not a user in this version

Collecting societies (MCSK, KAMP, ASCAP, BMI) receive the result, they do not use Sawa. Lawyers and arbitrators are an escalation path, not users.

---

## 4. The Demo Story: "Amani Ni Sisi"

Wanjiru (Nairobi) and Malik (Harlem) co-write **"Amani Ni Sisi"** ("Peace Is Us") for an AI for Peace campaign, remotely, over three days in September 2026. Two weeks later a sync buyer wants the song. They need a split sheet. Their memories disagree.

| Date | What happened | Whose agent remembers it |
|---|---|---|
| Fri 12 Sep, 21:04 EAT | Wanjiru records a 40-second voice memo of a hook idea | Nairobi |
| Fri 12 Sep, 21:10 EAT | She sends the memo to Malik on WhatsApp | Both (sent and received) |
| Fri 12 Sep, 14:20 EDT (21:20 EAT) | Malik replies: "yo this hum is fire, imma build the beat around it" | Both |
| Sat 13 Sep | Malik uploads beat stems (chords, bass, drums) | Harlem |
| Sat 13 Sep | Both edit the shared lyric document. Wanjiru types the chorus line "Amani ni sisi"; Malik types "we the peace we been waiting for" | Both (edit history) |
| Sun 14 Sep | Malik exports `hook_v1.mid`, his MIDI version of the hook | Harlem |
| Sun 14 Sep | Wanjiru messages: "verse ya pili ni yako Malik" ("verse two is yours, Malik") | Both |
| Mon 29 Sep | A sync buyer asks for the split sheet. Malik drafts **65 / 35** in his favour; Wanjiru drafts **60 / 40** in hers. The dispute begins | Both |
| Mon 29 Sep | Wanjiru writes from memory: "I wrote the whole chorus" | Nairobi |
| Earlier, 2025 | They co-wrote "Jua" and signed a **split policy**: lyrics 50, music 50; origination 75 and development 25 when one writer starts an element and the other develops it | Both (memory) |

---

## 5. The Experience End To End

| Step | Screen | What the user does | What Sawa does |
|---|---|---|---|
| 1 | **Session** | Opens the song | Shows two agent panels side by side, Harlem and Nairobi, each with its owner's draft split and its own memory. A banner: **"The agents disagree about 2 facts."** The two disputed facts are named: hook melody origin, chorus authorship |
| 2 | **Evidence** | Opens each agent's evidence | A timeline of every artefact with provenance: who, when, which device, file hash, who has seen it. Chat messages are read by **Jev** into typed credit statements ("this message credits Wanjiru with originating the hook melody", probability 0.91) that the message's author confirms |
| 3 | **Session** | Clicks **Exchange evidence** | Each agent receives the other's evidence packet (atoms, never audio files) and logs the exchange in its memory |
| 4 | **Session** | Clicks **Reconcile** | Each agent reconciles **independently**. The split bars animate from the two drafts to the reconciled split. Both panels show **50 / 50** and the same proof hash: **"One truth. Both agents agree."** |
| 5 | **Split sheet** | Reads the clause trail | Every element (hook melody, verse melody, harmony and groove, chorus lyrics, verse 1, verse 2) shows who gets what share and **why**: the premises, their sources, their truth values, which were revised, which were defeated, and the rule that decided. Toggle **English / Kiswahili** |
| 6 | **Split sheet** | Malik contests a premise: "My message was hype, not a credit" | The premise moves to **withdrawn by Malik, with his reason**. Both agents recompute. **The hook stays with Wanjiru**, because the memo predates the MIDI and Malik had received it before he made the MIDI; the truth value falls from (stv 0.89 0.88) to (stv 0.83 0.83), still above Omega's act threshold, and the proof says so. A contest is recorded, not ignored, and it does not win by being loud |
| 7 | **Split sheet** | Both sign in the session | Each writer ticks "I agree to this split sheet", types their name; the sheet is locked, timestamped and hashed |
| 8 | **Record** | Views the registered record | The signed sheet's SHA-256, the stems' hashes (the stems stay in the vault), composition and master tracked apart, every party named on the record, and a "Ready for licensing" status (Incantio and BASIX listing shown as a **concept, pending partner confirmation**) |
| 9 | **Audit** | Opens the log | Both agents' append-only memories: every artefact, exchange, reconciliation, contest and signature, replayable |

### Journey B: the two agents never converge (honesty case)

If one agent runs an older rule pack, the proof hashes differ. Sawa shows **"No shared answer yet: the agents use different rule versions (split-v1 vs split-v1.1)"** and refuses to offer signing. Agreement is never faked.

### Journey C: a fact nobody can settle

If an element's evidence stays below Omega's act threshold (for example, two self-reports and no artefact), Sawa marks it **"Needs your confirmation"** and asks the specific question that would settle it ("Did Malik write the bass line?"). Signing is blocked until both writers answer. It never guesses a share.

---

## 6. How It Works

Concepts here; exact atoms and code in [build.md](build.md).

### 6.1 Two agents, two memories

Two Omega agents (Harlem and Nairobi), each with its own MeTTa atom space, its own append-only memory log (the pattern of Omega's `memory/history.metta`), and a copy of the shared, versioned rule pack. They share nothing except the **evidence packets** they choose to exchange.

### 6.2 The song as elements, under an agreed policy

A song's **composition** is split into elements with weights from the writers' **agreed split policy** (remembered from their previous co-write, "Jua", or set before the session; "splits first", as the organisers' ownership principles ask):

| Element | Weight |
|---|---|
| Hook melody | 20 |
| Verse melody | 10 |
| Harmony and groove (chords, bass, drum pattern) | 20 |
| Chorus lyrics | 20 |
| Verse 1 lyrics | 15 |
| Verse 2 lyrics | 15 |

Within an element: if one writer **originated** it and the other **developed** it, origination takes 75 and development 25; if both originated it (co-written), 50 and 50; a sole writer takes 100. The **master** is tracked apart under its own policy (in the demo: each writer financed their own sessions, so 50 / 50 per the "Jua" agreement).

These numbers are the writers' policy, not Sawa's opinion. They are atoms, visible, and editable before the session.

### 6.3 Evidence with provenance and truth values

Each artefact becomes evidence for a statement such as `(originated hook-melody wanjiru)`, with an Omega truth value `(stv frequency confidence)`:

| Evidence kind | Example | Truth value |
|---|---|---|
| Contemporaneous artefact with hash and timestamp | Voice memo, MIDI, stems, document edit | (stv 1.0 0.80) |
| Statement by the other writer against their own interest | Malik's "this hum is fire, imma build the beat around it" | (stv 1.0 0.70) |
| Recollection by a writer in their own favour | "I wrote the whole chorus" | (stv 1.0 0.45) |

Jev only proposes what a message says; the author of the message confirms it before it becomes evidence.

### 6.4 Reconciliation: defeat, revise, decide, converge

1. **Defeat.** Defeater rules discount evidence for a stated reason, fired as NAL deduction through Omega's `|-nal`:
   - **Received before created**: an artefact for an element made *after* its maker received another writer's artefact for the same element is evidence of **development**, not origination. (Malik's MIDI on 14 Sep, after the memo on 12 Sep.)
   - **Recollection after dispute**: a recollection written after the dispute began is weaker than any contemporaneous record of the same element.
2. **Revise.** Surviving evidence about the same statement is merged with NAL **revision**: agreeing sources raise confidence, conflicting sources pull frequency toward the middle.
3. **Decide.** Omega's documented thresholds turn each statement into a band: **settled** (frequency at least 0.6 and confidence at least 0.5), **needs confirmation**, or **unsupported**. Only settled statements produce shares; anything else blocks signing and names the missing evidence.
4. **Compute.** Shares follow from settled statements and the policy atoms.
5. **Converge.** Each agent serialises its proof canonically and hashes it (SHA-256). Equal hashes mean both agents reached the same answer from the same evidence under the same rules.

### 6.5 Contest

Either writer can withdraw any premise with a reason. It moves to **withdrawn (by whom, why)** and both agents recompute. The contest and its effect are written to both memories.

### 6.6 Explanations in two languages

Every share's explanation is a template filled **only from the proof**, in English and Swahili. Nothing in an explanation can claim more than the proof contains. No LLM writes explanations.

### 6.7 The record

When both sign: the canonical split sheet, both signatures (name, time), the rule pack version, the Omega commit, and the proof hash are hashed together. Stems are referenced only by their hashes ("the original never moves; proof, permissions and income travel").

---

## 7. Why Omega And MeTTa (And Where Jev Fits)

### 7.1 Why not a form or a spreadsheet

A split-sheet form records an answer; it cannot **produce** one from conflicting evidence, cannot say **how sure** it is, cannot **discount** a claim for a stated reason, and cannot show **two independent parties reaching the same answer**.

### 7.2 Why not an LLM mediator

An LLM asked "who wrote the hook?" will answer fluently and differently each time, cannot produce a verifiable proof, and can be argued into either side. Two writers will not sign a share because a chatbot said so. In Sawa, **no LLM decides or explains a share.**

### 7.3 What Omega contributes

| Omega capability | How Sawa uses it |
|---|---|
| `lib_nal.metta` deduction and revision with `(stv f c)` | Defeater rules and every merge of evidence; loaded unmodified from Omega v0.1.20 |
| Persistent memory (episodic log replayed into the atom space) | Each agent's memory of its owner's artefacts, the previous co-write's policy, every exchange, contest and signature |
| Atoms as rules (`add-atom`, `remove-atom`) | Split policy and rule pack as versioned atoms; a rule version mismatch blocks convergence |
| Action thresholds (act at f ≥ 0.6 and c ≥ 0.5) | Settled vs needs confirmation |
| Auditable inference ("a mathematical receipt") | The clause trail and the proof hash |

### 7.4 The neural-symbolic split

> **Jev reads. Omega decides. The writers confirm, contest and sign.**

| Layer | Does | Never does |
|---|---|---|
| **Jev** (TypeSafe System One) | Reads chat messages in Sheng, Swahili or English into typed credit statements with probabilities | Produce a share, a percentage, a rule, or an explanation |
| **Omega / MeTTa** | Evidence, provenance, defeat, revision, thresholds, shares, proofs, memory, convergence | Read free text |
| **The writers** | Confirm what their own messages meant; contest premises; sign | Get overruled silently |

This matches the way Ben Goertzel describes Omega: the language model sits underneath the symbolic layer rather than in charge of it ([research.md](research.md) section 3).

---

## 8. Would A Real Artist Trust This?

The Track 02 file asks judges this directly. Our answers:

| Fear | Sawa's answer |
|---|---|
| "The AI will side with whoever paid for it" | Both writers have their own agent with their own memory; the result only counts when both agents converge to the same proof hash |
| "It will make up who wrote what" | Shares come only from evidence the writers supplied and confirmed; every share shows its sources |
| "The rules are rigged" | The split policy is the writers' own, agreed in advance and visible as atoms; the rule pack is versioned |
| "I can't argue with it" | Any premise can be contested with a reason; the contest is recorded and the result recomputes in front of both writers |
| "It's in a language I don't read well" | Every explanation in English and Swahili from the same proof |
| "My stems will leak" | Stems never leave the vault; only hashes travel |
| "It will decide for me" | Nothing is final until both writers sign; unsettled elements block signing and ask a specific question |

---

## 9. Rights, Consent And Governance

Mapped to the organisers' **ownership principles** (pack p.5; deck slide 13):

| Principle | In Sawa |
|---|---|
| "Nothing is used or trained on without consent" | Each writer chooses which artefacts their agent shares; no data trains any model; Jev requests are sent only for messages the writer selects |
| "Builders, BASIX.MARKET and GTM brokers are each named on the record" | The registered record has a "parties on record" list with roles |
| "Provenance registration requires permission" | Registration needs both signatures |
| "Splits are agreed before anything is built" | The split policy is agreed (or remembered from the last co-write) before evidence is weighed |
| "Master and composition are tracked apart" | Two separate splits, two policies, two records |
| "Stems stay in a private vault" | Only stem hashes leave the device |

Legal note for a real deployment: Kenya's Copyright Act (as amended 2019) and the US Copyright Act both treat co-written works as jointly owned unless agreed otherwise; a signed split sheet is the industry's way of recording that agreement. Sawa records an agreement between the writers; it is not legal advice and not an arbitrator. Details in [research.md](research.md) section 4.

---

## 10. What Is New, And An Honest Comparison

| Existing approach | What it does | What it does not do |
|---|---|---|
| Paper or PDF split sheets | Record an agreed split | Help reach it; show why; handle conflicting memories |
| Split-sheet apps and registration portals | Collect names and percentages, e-sign | Weigh evidence; explain shares; resolve disputes |
| Blockchain royalty splitting | Pay out by a fixed split | Decide the split; anything happens off-chain first |
| Mediation and lawyers | Resolve disputes | Fast, cheap, in Swahili, at the moment of creation |
| LLM chat assistants | Draft a split sheet | Verifiable reasoning; two-party convergence; consistent answers |

**What is new in Sawa:** two agents, each with its owner's memory, that start in disagreement and reach a **verifiably identical** answer through truth-valued reasoning, with defeasible rules about creative provenance ("received before created", "recollection after dispute"), and a contestable, bilingual clause trail, before the split sheet is signed.

**Prior work, credited.** Sawa reuses the engine host pattern from our previous entry, Mizani (loading Omega's `lib_nal.metta` on Hyperon, the NAL deduction-chain firing, the append-only memory log). Everything domain-specific is new work in this hackathon: the creative-provenance evidence model, the split policy and share computation, the defeater rules, two-party convergence with proof hashing, contest, signing and registration, and the whole interface. The commit history shows it.

---

## 11. How It Maps To The Hackathon

| Requirement or brief | How Sawa meets it |
|---|---|
| **Two Agents, One Truth**: "two agents disagree about a fact and reason to a shared answer" | Two agents, two disputed facts (hook origin, chorus authorship), one shared answer with matching proof hashes |
| **AI for Peace brief**: "two communities' accounts of one event, mediated to one story" | Harlem's and Nairobi's accounts of one co-writing session, mediated into one credit story, for a peace song |
| Challenge 4 guidance: "a judge should be able to see why the system decided what it did" | Clause trail per share, premises with sources and truth values, defeats and revisions shown |
| "Would a real business, or a real artist, trust this?" | [Section 8](#8-would-a-real-artist-trust-this) |
| Incantio: "the split sheet in the session"; "a band-mate who remembers every co-write and who is owed what" | Signed in the session; agents remember the previous co-write's policy |
| Track 1: "a song across borders: a Harlem and Nairobi co-write with co-writer splits recorded" | Exactly the demo story |
| Brief B, Earn: "one split sheet for every co-writer, signed in the session" | Exactly the output |
| Music business: "a deal explainer in plain language or Swahili" | Every share explained in English and Swahili |
| "Splits you can watch" | Split bars move from two drafts to one answer, live |
| Rule 5, data with permission | Synthetic data only, labelled |

---

## 12. SWOT

| Strengths | Weaknesses |
|---|---|
| Literal fit to the challenge and its art brief; concrete numeric outcome; genuine Omega use; bilingual; proven engine | Who-wrote-what is partly a human judgement; Sawa cannot hear audio similarity; demo data is synthetic |
| **Opportunities** | **Threats** |
| Incantio and BASIX listing pipeline; collecting societies need clean splits; diaspora co-writes are growing | Writers may refuse any automated mediation; disputes over large sums will still go to lawyers; partner integrations are concepts until confirmed |

Mitigations: Sawa never decides alone (both sign); unresolvable elements are handed back to the humans with a specific question; legal escalation stays available.

---

## 13. Path To BASIX.MARKET And Incantio

All partner integrations are **concepts pending partner confirmation**.

1. **Incantio listing gate.** A song can be listed when its Sawa record is signed and every rights holder is on it.
2. **BASIX.MARKET phigital record.** The registered hash becomes the provenance anchor of a phigital edition; royalty terms reference the signed split.
3. **Brief B pipeline.** Sawa is the **Earn** stage; it plugs into Register (hash), Prove (who made it, with which AI tools), License (rights as rules) and Protect (an agent that remembers every licence).
4. **Business model (for incubation discussion only):** free for writers; a per-registration fee paid by the licensing platform; or bundled into BASIX.MARKET listing.

---

## 14. What's Next

1. **More than two writers**: N agents, pairwise convergence.
2. **Audio evidence**: melodic similarity features as evidence with truth values (never as a final judge).
3. **Live session mode**: the agent records contributions during the session, so the split is ready when the song is ("the living split sheet").
4. **Royalty reconciliation**: when statements arrive, agents check payouts against the signed split and find missing money.
5. **On-device agents** for low connectivity, and USSD summaries.
6. **Collecting society export**: MCSK and KAMP registration formats.
7. **Governed policy learning**: writers' corrections propose policy updates with a visible diff, approved by both ("the agent that grows up").

---

## 15. Pitch Library

- **Five words:** Two memories. One split sheet.
- **One sentence:** Sawa gives each co-writer an Omega agent that remembers their side of the session, and the two agents reason from disagreement to the same split sheet, with matching proofs both writers can read in English or Swahili, contest, and sign.
- **Thirty seconds:** Every co-written song has two memories of how it was made, and they never match. Wanjiru in Nairobi hummed the hook; Malik in Harlem built the beat around it. Two weeks later, his draft says 65 / 35 and hers says 60 / 40. Sawa gives each of them an Omega agent with their own memory. The agents exchange evidence, weigh it with Omega's reasoning, and each one independently reaches the same answer, with the same proof hash. Every share explains itself in English and Swahili, either writer can contest it, and nothing counts until both sign.
- **For Ben Goertzel:** Two Omega agents with separate memories reach a shared truth by NAL revision and defeasible rules, and prove it with matching proof hashes. The language model only reads chat messages; Omega decides.
- **For BASIX and Incantio:** No song can be licensed until every rights holder is on the record. Sawa gets the split signed in the session, with a clause trail and a hash ready for listing.
- **For Harlem CLxR and AI for Peace:** A Harlem producer and a Nairobi songwriter make a peace song, and the credit for it is settled fairly, in both their languages.
