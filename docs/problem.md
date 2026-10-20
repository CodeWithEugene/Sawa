# Problem: What We Could Solve, What We Chose, And Why

> **What this file is.** The problem we solve, the alternatives we considered, how we chose, and why the choice wins this hackathon. The solution is in [solution.md](solution.md). Every number has a source in [research.md](research.md); estimates are labelled as estimates.
>
> **Status:** v1.0 for review, Tuesday 20 October 2026, about 12:35 EAT.

---

## Table Of Contents

1. [The Problem In One Paragraph](#1-the-problem-in-one-paragraph)
2. [How We Chose](#2-how-we-chose)
3. [What The Organisers Asked For](#3-what-the-organisers-asked-for)
4. [Six Problems We Could Solve](#4-six-problems-we-could-solve)
5. [Scoring And Decision](#5-scoring-and-decision)
6. [The Chosen Problem In Depth](#6-the-chosen-problem-in-depth)
7. [Why Two Agents, One Truth (And Not Another Challenge)](#7-why-two-agents-one-truth-and-not-another-challenge)
8. [Why Existing Solutions Do Not Solve It](#8-why-existing-solutions-do-not-solve-it)
9. [Why This Problem Wins This Hackathon](#9-why-this-problem-wins-this-hackathon)
10. [The Hard Questions (And Our Answers)](#10-the-hard-questions-and-our-answers)
11. [What We Are Deliberately Not Solving](#11-what-we-are-deliberately-not-solving)
12. [Key Sources](#12-key-sources)

---

## 1. The Problem In One Paragraph

**Co-writers remember the making of a song differently, and that difference freezes the song's money.** A producer in Harlem and a songwriter in Nairobi co-write over WhatsApp and shared drives; weeks later, when someone wants to license the song, each drafts a split sheet in their own favour. Nobody has a shared, trusted way to weigh the evidence (a voice memo, a MIDI file, an edit history, a chat message) and reach an answer both will sign. When co-writers register conflicting shares, collecting societies **hold all of the money until it is resolved**; licensing platforms such as Incantio **cannot pay out without agreed splits**; and the fights that follow (producer against topliner, recollection against recollection) end friendships and go to court. The organisers of this hackathon wrote the fix into their own principles: **"splits are agreed before anything is built"** and **"one split sheet for every co-writer, signed in the session."**

---

## 2. How We Chose

### 2.1 The goal

First place, on a rubric of execution 30%, video clarity 25%, fit to track 25%, collaboration and documentation 20%, plus the Track 02 test "**would a real business, or a real artist, trust this?**", with about nine hours left on deadline day.

### 2.2 Criteria (weighted to the rubric)

| Criterion | Weight | Rubric line it serves |
|---|---|---|
| Technical showcase of Omega (NAL, memory, two agents) | 25% | Execution 30% |
| Fit to the challenge and its art brief | 25% | Fit to track 25% |
| Video clarity (a visible before and after) | 20% | Video 25% |
| Incubation potential for BASIX and partners | 10% | "Would a real business trust this?" |
| Novelty to judges | 10% | Execution, video |
| Buildability in about nine hours | 10% | "Usability and completeness over ideas" |

### 2.3 Method

1. Read every official source: the hacker pack (11 pages), the deck (20 slides), the live platform page, the starter repo (`BRIEF.md`, `tracks/track-02-builders.md`, `SUBMISSION.md`, `AGENTS.md`).
2. Three parallel research streams: technology (Omega, PeTTa, Hyperon, starter repo), domain and judges (music rights, art provenance, peace mediation, every judge and partner), and our previous winning playbook (Mizani, its process and video pipeline).
3. Six candidate ideas, each written as one balanced paragraph (one strength, one weakness), scored by **TypeSafe Jev** on the six criteria, then re-scored with the strongest hint removed from the context to test for bias.
4. Final decision by us, with the reasoning below.

---

## 3. What The Organisers Asked For

The single most repeated idea in the official material is **recording who made what and who is owed what, with consent, across Harlem and Nairobi**:

| Where | Exact wording |
|---|---|
| Track 1, Incantio | "License-ready from day one: finish a track with stems, metadata and **split sheet**." |
| Track 1, Incantio | "**The split sheet in the session**: co-write live while an agent records who wrote what." |
| Track 1, Incantio | "**A song across borders**: a Harlem and Nairobi co-write with co-writer splits recorded." |
| Track 2, Challenge 2 | "A composing agent that learns a style and **writes the split sheet**." |
| Track 2, Challenge 4 | "**Two agents disagree about a fact and reason to a shared answer.** AI for Peace brief: two communities' accounts of one event, mediated to one story." |
| Track 2, Challenge 8 | "A band-mate who remembers every co-write and **who is owed what**." |
| Where to build | "**The living split sheet**: an agent in the session remembers who wrote what and proposes fair splits." "**Splits you can watch**." "A deal explainer in plain language **or Swahili**." |
| Track 4, Brief B | "Earn: **one split sheet for every co-writer, signed in the session**." "**Splits are agreed before anything is built.**" "Master and composition are tracked apart." |
| XRAgency (organiser) website | "Consent, ownership and royalty splits are written into the contract before anything is built." |
| Track 02 file | "Would a real business, or a real artist, trust this?" and, for Challenge 4, "a judge should be able to see why the system decided what it did." |

---

## 4. Six Problems We Could Solve

| # | Idea | Challenge | One strength | One weakness |
|---|---|---|---|---|
| **P1** | **Split-sheet reconciliation**: two agents, one per co-writer, each with its own memory of the session, reason from conflicting accounts to one contestable split sheet both sign | Two Agents, One Truth | Hits the challenge and at least six briefs; the outcome is a concrete number | Credit is partly a human judgement that rules cannot fully settle |
| P2 | **One story from two communities**: two agents each hold one community's testimony of a contested event (for example a water-point clash) and produce a shared account with agreed and disputed facts separated | Two Agents, One Truth | The literal AI for Peace brief; emotionally powerful | Sensitive testimony; mostly text; hard to show success in three minutes |
| P3 | **Royalty statement reconciliation**: agents reconcile a distributor's and a collecting society's statements and find missing money | Two Agents, One Truth / Trusted With Money | Concrete money outcome | Weak tie to art, peace, Harlem and Nairobi; needs realistic statements |
| P4 | **Provenance reconciliation** of an artwork's records, then a phigital twin | BASIX.MARKET Mature Build | Direct marketplace fit | Common idea; mild drama |
| P5 | **Artist statements across borders**: claims-preserving translation between English and Swahili | The Agent Without Borders | Clean challenge fit | Looks like translation, which LLMs already do |
| P6 | **Licence guard**: one agent remembers every licence and flags uncleared uses | (Brief B, Protect) | Very buildable | One agent; rules checker; low novelty |

Detail for P2, because it is the literal brief: Kenyan history is full of irreconcilable accounts (the 1984 Wagalla massacre has an official toll of 57 and survivor estimates of 475 to over 1,000; Kenya's truth commission named land grievances as the main driver of ethnic conflict). Mediators want **agreed facts plus an explicit record of what remains disputed**, not a forced single narrative. We took that design lesson into P1 (settled, needs confirmation, and disputed are always shown separately), and we frame P1 as the AI for Peace brief applied to a creative community: two communities' accounts of one creative event, mediated to one story of who made it.

---

## 5. Scoring And Decision

### 5.1 Jev rubric scoring (independent check)

Each idea was written as one balanced paragraph and scored by TypeSafe Jev (`jev-1.13.0`, request `req_01a1588b65947345854aa89dda9203e0`) on the six criteria, five ordered levels (0 very weak to 4 very strong), expected value from Jev's probabilities, weighted as in section 2.2.

| Idea | Technical | Video | Fit | Incubation | Novelty | Build | **Weighted (0 to 4)** |
|---|---|---|---|---|---|---|---|
| **P1 Split sheet** | **3.67** | **3.39** | **3.78** | **3.65** | **3.44** | **3.13** | **3.56** |
| P2 One story | 3.36 | 1.17 | 3.57 | 1.16 | 2.62 | 1.03 | 2.45 |
| P3 Royalty reconciliation | 2.98 | 2.59 | 1.29 | 2.72 | 1.48 | 2.50 | 2.26 |
| P4 Provenance | 2.29 | 1.76 | 2.39 | 2.90 | 0.93 | 2.26 | 2.13 |
| P6 Licence guard | 0.97 | 1.85 | 1.32 | 3.16 | 1.15 | 2.85 | 1.66 |
| P5 Borderless statement | 0.70 | 1.56 | 1.97 | 1.57 | 1.07 | 1.90 | 1.43 |

**Bias check.** The first context told Jev that the organisers repeat split sheets. We removed that sentence and re-ran (request `req_01a1588b86207d0194ad2fa4f1ec2b1d`): **P1 3.45**, P2 2.53, P3 2.20, P4 2.10, P6 1.57, P5 1.44. Ranking unchanged; P1 still leads on every criterion.

Caveat: a model scoring paragraphs is a sanity check, not the decision.

### 5.2 What the scoring told us

1. P1 leads on **every** criterion, including buildability, because the hardest technical part (two Omega agents with NAL revision, defeaters, memory and proofs) already works from our previous entry.
2. P2, the literal AI for Peace brief, is close on technical and fit but collapses on video, incubation and buildability. Its best idea (separate agreed from disputed facts) moves into P1.
3. Every non-reconciliation idea scores low on technical showcase: **Omega's strengths (revision, defeat, memory) only shine when two sources disagree.**

### 5.3 Decision

> **We build P1, "Sawa": two Omega agents, one per co-writer, reason from conflicting memories of a Harlem and Nairobi co-write to one split sheet, converge to the same proof, explain every share in English and Swahili, accept contests, and are signed by both writers in the session. Track 2, Omega AI Agents, Challenge 4, "Two Agents, One Truth", with the AI for Peace brief.**

---

## 6. The Chosen Problem In Depth

### 6.1 Problem statement

> When two creators co-write, each keeps a different memory and a different set of evidence of who contributed what. There is no shared, trusted procedure for weighing that evidence and reaching a split both will sign. So splits are settled late, by whoever pushes hardest, or not at all; conflicting registrations freeze royalties; licensing platforms cannot pay; and the dispute damages the collaboration.

### 6.2 Who suffers, and who acts

| Who | How they suffer | What they need |
|---|---|---|
| Topliners and lyricists (often the less powerful party) | Under-credited when the producer drafts the split | Their evidence weighed, in their language |
| Producers | Long, personal split fights that freeze the song | A fast, fair, defensible answer |
| Licensing platforms (Incantio, BASIX.MARKET) | Cannot list or pay without agreed splits | A signed sheet with every rights holder on the record |
| Collecting societies (MCSK, KAMP, ASCAP, BMI) | Hold money on conflicting registrations | Clean, consistent registrations |

### 6.3 The evidence chain

1. **Conflicts freeze money.** When co-writers register different shares, collecting societies flag the conflict and hold all of the money until it is resolved (Songtrust help centre; industry guides).
2. **The pot is large.** The MLC received about **USD 424 million** of historical unmatched US mechanical royalties in 2021; global creator collections were **EUR 13.97 billion** in 2024 (CISAC). Unmatched and disputed money is a structural feature of the industry. (We found **no audited figure** for the share of songs registered without agreed splits, and the often-repeated "25% lost to bad metadata" has **no primary source**; we do not use it.)
3. **Disputes are about memory and evidence.** Recent cases turn on who did what in the room: Offset and ChaseTheMoney ("Worth It", 2025), Chad Hugo and Pharrell, Lola Young and Carter Lang (settled November 2025), Missy Elliott's 1994 co-writing claim (settled April 2025), and **Tyla's "Water"**, where co-writers allege the producer took full credit and offered them 10% each.
4. **Kenya's royalty system is fragile.** The regulator found KAMP under-distributed about **KSh 75.7 million (2020 to 2022)** and PRiSK owed members about **KSh 83.6 million**; MCSK, representing about 16,000 composers, was denied a licence in 2025; some musicians received **KSh 2,500** for a year's royalties. Writers who cannot rely on the system need their own clean records.
5. **Cross-border makes it worse.** A Harlem writer registers with ASCAP or BMI and a Nairobi writer with MCSK; different societies, different metadata, more room for mismatch (structural point; no documented Harlem and Nairobi dispute found).
6. **Licensing depends on splits.** Incantio's self-licensing model pays out automatically from song splits; no agreed split, no payout.

### 6.4 What "solved" looks like (measurable, for a pilot)

| Metric | Target in a pilot |
|---|---|
| Co-writes with a signed split before first licensing | Above 90% |
| Median time from first draft to both signatures | Under 24 hours |
| Splits later disputed after signing | Under 2% |
| Writers who say they understood why they got their share (in their language) | Above 85% |
| Agent pairs that converge to the same proof hash on the same evidence | 100% (a correctness property, tested) |

---

## 7. Why Two Agents, One Truth (And Not Another Challenge)

| Challenge | Why not, or why |
|---|---|
| **Two Agents, One Truth** | **Chosen.** A split dispute *is* two parties disagreeing about facts. Two agents with two memories is the honest model of it, and convergence to one proof is the literal "one truth" |
| The Agent That Grows Up (Incantio split-sheet brief) | Learning a style is a weaker demo than resolving a dispute; we keep "governed policy updates with a diff" in What's Next |
| The NPC That Won't Break Character (Incantio band-mate brief) | Advanced track for character consistency; our agents do remember every co-write, but the challenge's test is persona consistency, not reconciliation |
| The Agent Without Borders | Bilingual explanations are a feature of Sawa, not its core |
| BASIX.MARKET Mature Build | Needs a marketplace API we could not find publicly; we show the integration as a concept |
| Trusted With Money | Advanced; payouts come after splits, which is our What's Next |

---

## 8. Why Existing Solutions Do Not Solve It

| Category | Examples | Gap |
|---|---|---|
| Split-sheet templates and apps | PDF templates, split-sheet and registration apps | Record an agreed answer; do not help reach one or explain it |
| Collecting-society portals | MCSK, ASCAP, BMI registration | Detect conflicts and freeze money; do not resolve |
| On-chain royalty splitters | Smart-contract payout tools | Pay a fixed split; the split is decided off-chain first |
| Lawyers and mediators | Entertainment lawyers | Slow and expensive; rarely in Swahili; after the damage |
| LLM chat assistants | General chatbots | Fluent but not verifiable, not consistent, can be argued into either side; two writers will not sign because a chatbot said so |

---

## 9. Why This Problem Wins This Hackathon

1. **It is the literal challenge.** Two agents disagree about a fact (who originated the hook) and reason to a shared answer (the same proof hash).
2. **It carries the art brief, not just the challenge.** Harlem and Nairobi, a peace song, two communities' accounts of one creative event mediated to one story. Most builder entries will ignore the art briefs added this round.
3. **It hits the organisers' most repeated phrase** (split sheets, who is owed what, splits first, signed in the session) and XRAgency's own stated principle.
4. **Omega is essential, not decorative.** Revision, defeaters, thresholds and memory are exactly the tools a disagreement needs.
5. **It answers the track's trust question directly** ([solution.md](solution.md) section 8).
6. **It is concrete on video.** Two versions (Malik's gives him 77.5%, Wanjiru's gives her 40%) become one answer, Wanjiru 39.7 / Malik 60.3, with two equal agreement IDs, and AI-generated drums disclosed and owned by no one; a contest is recorded and the answer holds for a reason you can read.
7. **It is incubatable.** Incantio and BASIX both need signed splits before they can list or pay.
8. **It is buildable tonight**, because the reasoning engine is proven.

---

## 10. The Hard Questions (And Our Answers)

| Question | Answer |
|---|---|
| "Isn't this Mizani again?" | Same proven engine (credited as prior work), entirely new problem, evidence model, rules, convergence proof, contest, signing and interface, all built during this hackathon and visible in the commit history. Mizani reconciled two observations into one clinical decision; Sawa makes two agents with **opposed interests** reach a **verifiably identical** answer that both humans sign |
| "Can rules decide who wrote a song?" | No, and Sawa does not claim to. The writers' own agreed policy decides how credit is weighted; Sawa weighs the evidence they supply, shows its working, blocks anything unsettled, and nothing counts until both sign |
| "What if the evidence is fake?" | Artefacts carry hashes and device timestamps; a writer can contest any artefact; a real deployment would anchor artefact hashes when they are created (the "Register" stage) |
| "Why not just split 50 / 50?" | Many writers do, and Sawa supports it as a policy. Disputes arise exactly when one side believes contributions were unequal; Sawa makes that argument evidence-based instead of personal |
| "Is it legal advice?" | No. It records an agreement between the writers. Escalation to lawyers or collecting-society dispute processes remains |
| "Did you use partner data?" | No. All people, songs, files and messages are synthetic and labelled |

---

## 11. What We Are Deliberately Not Solving

- Audio similarity or plagiarism detection between recordings.
- Payment of royalties (we compute and sign splits; payouts are What's Next).
- Registration with real collecting societies or a live Incantio or BASIX integration (concepts pending partner confirmation).
- Disputes with more than two writers (What's Next).
- Legal arbitration.

---

## 12. Key Sources

Full citations with URLs in [research.md](research.md) section 4.

- The MLC: USD 424 million historical unmatched royalties received (2021).
- CISAC Global Collections Report 2025: EUR 13.97 billion collected in 2024.
- Songtrust help centre: conflicting registrations are held until resolved.
- Kenya Copyright Board audit reporting (KAMP KSh 75.7 million, PRiSK KSh 83.6 million); MCSK licence denial (The Standard, 2025).
- Capital FM: Tyla "Water" production-credit dispute.
- Incantio: artist-owned sync licensing with split-driven payouts.
- XRAgency: "Consent, ownership and royalty splits are written into the contract before anything is built."
- Kenya TJRC and Wagalla massacre accounts (design lesson for P2 and P1).
