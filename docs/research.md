# Research Log And Evidence Library: Sawa

> **What this file is.** Everything we found, where we found it, and how sure we are. The other docs cite this file. Labels: **VERIFIED** (we ran it or read the primary source), **REPORTED** (a credible secondary source), **ESTIMATE** (a widely repeated figure without a primary source), **UNVERIFIED** (could not confirm).
>
> **When:** Tuesday 20 October 2026, 11:57 to 12:40 EAT. **How:** three parallel research streams run as Claude Code subagents (technology; domain, judges and partners; our previous winning playbook), plus our own reading of every official document, live tests of Omega's NAL library, and TypeSafe Jev scoring of candidate ideas. Raw notes were kept in the session scratchpad; this file is the curated result.

---

## Table Of Contents

1. [Research Questions](#1-research-questions)
2. [The Hackathon: Official Sources Compared](#2-the-hackathon-official-sources-compared)
3. [Omega, MeTTa, Hyperon, PeTTa](#3-omega-metta-hyperon-petta)
4. [Music Rights: Splits, Disputes, Royalties](#4-music-rights-splits-disputes-royalties)
5. [Judges And Partners](#5-judges-and-partners)
6. [BASIX.MARKET Today](#6-basixmarket-today)
7. [Alternatives Researched: Art Provenance And Peace Mediation](#7-alternatives-researched-art-provenance-and-peace-mediation)
8. [Our Previous Win: What We Reuse](#8-our-previous-win-what-we-reuse)
9. [Jev Scoring Runs](#9-jev-scoring-runs)
10. [Gaps And Limits](#10-gaps-and-limits)

---

## 1. Research Questions

| # | Question | Answer in |
|---|---|---|
| Q1 | What exactly must be submitted, by when, judged how? | Section 2 |
| Q2 | Which challenge and brief give the strongest fit? | Section 2.4; problem.md |
| Q3 | Can Omega's reasoning run reliably tonight, and how? | Section 3 |
| Q4 | Is the split-dispute problem real and costly, especially across Harlem and Nairobi? | Section 4 |
| Q5 | What do the judges and partners care about? | Section 5 |
| Q6 | What did we do last time that won, and what can we reuse honestly? | Section 8 |

---

## 2. The Hackathon: Official Sources Compared

### 2.1 Sources

| Source | Date | Notes |
|---|---|---|
| Hacker Pack PDF (11 pp.) | Oct 2026 | In `docs/` |
| Deck PDF, "261009_BASIX_State-of-the-Art-Hackathon_2026" (20 slides) | 9 Oct 2026 | In `docs/` |
| Platform page https://www.basix.market/lms/hackathon/2 | read 20 Oct 12:00 EAT | VERIFIED |
| Starter repo https://github.com/BASIXmarket-io/hackathon-starter (`BRIEF.md` v1.1 of 18 Oct, `tracks/track-02-builders.md`, `SUBMISSION.md`, `AGENTS.md`) | read 20 Oct | VERIFIED; no licence file, no code |

### 2.2 Where they disagree

| Item | Pack / deck | Platform | Starter `BRIEF.md` | Our plan |
|---|---|---|---|---|
| Deadline | 17:59 EAT, 20 Oct | **23:59 EAT, 20 Oct** (countdown) | "Entries lock Wed 21 Oct" | Entry saved by 17:30; final by 23:00 EAT, 20 Oct |
| Team size | Solo or up to 4 | "form a team of 3 to 4" | Solo or up to 4 | Confirm with organisers if needed |
| Prize | USD 560 | "$1000" in text, USD 560 in sidebar | USD 560 "across 28 teams" | USD 560 |
| Rubric | Execution 30, video 25, fit 25, docs 20 | Same | Innovation 25, technical 25, impact 20, hard requirements 15, presentation 15 | Optimise for the track rubric, cover both |

### 2.3 Requirements we must meet (VERIFIED, `SUBMISSION.md`)

- Track and challenge recorded in `README.md`.
- Repo shared with BASIX.MARKET; "the commit history shows the team's work".
- `README.md` covers what it does, setup, how to run, how to test, team members; "setup steps were tested on a clean clone".
- `AI_DISCLOSURE.md` "lists every AI tool used and what it was used for".
- No secrets or personal data; partner data only with documented permission; placeholder data labelled.
- Reused code credited, licences kept.
- 3-minute video showing it working and what's next.

### 2.4 Track 02 file extras (VERIFIED)

- "Also judged: **would a real business, or a real artist, trust this?**"
- "For challenges 1, 4, and 7, **a judge should be able to see why the system decided what it did**."
- "Partner briefs are proposals until the partner confirms them. Say so if the team builds around one."

### 2.5 History (VERIFIED, platform)

The previous BASIX hackathon (30 Sept to 3 Oct 2026): "6 winning teams", "fewer than half submitted projects that met the qualifying requirements." The homepage lists the winners: **Mizani** (Technetians, ours, two Omega agents reconcile a maternal referral), HelixMind, TrustDeal Agent ("Every Decision Has a Reason. Every Reason Has Proof."), Venture Route (MeTTa rules routing briefs to builders), AgriGuide (auditable farm decisions), ActionDesk. **Pattern: auditable, proof-carrying decision agents for real (often African) use cases.**

### 2.6 A separate event (VERIFIED)

"AI Omega Agent Dev Buildathon", https://basix.market/lms/buildathon/4, 23 to 30 October 2026, registration closes 22 October 18:59 EAT. No rules published. This repository's folder carries that name; **this submission is for the State of the Art Hackathon** (to confirm with Eugene).

---

## 3. Omega, MeTTa, Hyperon, PeTTa

### 3.1 State of play (VERIFIED, 20 Oct)

| Component | Version | Notes |
|---|---|---|
| `singnet/Omega` (Apache-2.0) | **v0.1.20** (6 Oct 2026); last push 19 Oct | README: "neural-symbolic agent framework built on the Hyperon AGI stack ... auditable inference, autonomous self-improvement, and long-term persistence." Docs: answers "come with a mathematical receipt" |
| `lib_nal.metta` | unchanged since 13 Apr 2026 | Deduction, revision and more via `|-nal` |
| `lib_pln.metta` | unchanged since 13 Apr 2026 | `|~pln`; modus ponens needs premise first |
| Commits since 1 Oct | maintenance only | Memory export/import, sandbox policy, tool-call fixes, an injection fix, rename OmegaClaw to Omega |
| PeTTa (MIT) | v1.0.6 (2 Mar 2026) | Needs SWI-Prolog 10.0.2+ and `janus-swi` |
| `hyperon` (pip, MIT) | 0.2.10 | CPython 3.12 wheels; repo frozen since Feb |

### 3.2 Live tests on this machine (VERIFIED)

Omega's current `lib_nal.metta` loaded unmodified into `hyperon` 0.2.10 with a two-line `min`/`max` shim:

| Call | Result |
|---|---|
| Deduction `(A (stv 1.0 0.9))`, `((==> A B) (stv 0.9 0.9))` | `(B (stv 0.9 0.729))` correct |
| Revision of (1.0, 0.9) with (0.0, 0.5) | `(stv 0.9 0.909)` correct; hyperon also returns junk matches, which must be filtered (our engine already does) |
| **Sawa:** memo (1.0, 0.80) revised with Malik's message (1.0, 0.70) | `(stv 1.0 0.864)` |
| **Sawa:** then revised with Malik's recollection against (0.0, 0.45) | **`(stv 0.886 0.877)`**: settled (act band) |
| **Sawa:** Malik withdraws his message (memo plus recollection only) | **`(stv 0.830 0.828)`**: still settled |
| **Sawa:** defeater, `(midi-after-receipt)` (1.0, 0.9) with rule (1.0, 0.9) | `(midi development) (stv 1.0 0.81)` |

Script: session scratchpad `sawa_nal_check.py`.

### 3.3 Decision: Hyperon for the agents

Fastest reliable path tonight: Python 3.12, `hyperon==0.2.10`, Omega's unmodified `lib_nal.metta` pinned to v0.1.20, called directly through `|-nal`. PeTTa is Omega's own runtime but needs SWI-Prolog and does not run on Vercel's Python functions; our previous deployment proved the Hyperon path works serverless.

### 3.4 What Omega's docs tell us to do (VERIFIED, `docs/tutorial-08`)

Keep inference chains to two or three hops; revise to restore confidence; ground premises externally (primary source c ≈ 0.9, secondary 0.7, tertiary 0.4); gate actions on (f, c) thresholds. **Sawa's evidence confidences follow this ladder**: contemporaneous artefact 0.80, the other party's statement 0.70, own recollection 0.45.

### 3.5 Messaging to echo (REPORTED)

- Goertzel, "Wild Times in the AGI Lab" (26 May 2026): OmegaClaw is "the first thing out of our long-brewing Hyperon AGI research initiative"; MeTTa "was designed for self-modification"; AtomSpace "as long-term and working memory". https://bengoertzel.substack.com/p/wild-times-in-the-agi-lab
- Goertzel, "OpenClaw: Amazing Hands for a Brain That Doesn't Yet Exist" (3 Feb 2026): "progressively migrating from LLM-mediated inference to symbolic reasoning"; memory "with provenance tracking"; "the open and decentralized AI community could establish a lead that matters". https://bengoertzel.substack.com/p/openclaw-amazing-hands-for-a-brain
- Third-party review (6 Sep 2026): "OmegaClaw puts the language model underneath a symbolic layer rather than in charge of it." https://openclawdatabase.com/news/videos/2026-09-06-omegaclaw-symbolic-agent-docker-test/

---

## 4. Music Rights: Splits, Disputes, Royalties

### 4.1 Size of the unmatched and disputed pot

| Fact | Label | Source |
|---|---|---|
| The MLC received USD 424,384,787 of historical unmatched US mechanical royalties from 20 DSPs (Feb 2021), later revised to about USD 397 million; about USD 225 million matched and paid since | REPORTED | https://www.themlc.com/news/billboard-mlc-receives-over-424m-unmatched-black-box-streaming-royalties ; https://interspacemusic.com/blog/the-mlc-has-paid-out-billion-the-money-stuck-in-its-black-box-gets-split-by-market-share/ |
| Global creator collections EUR 13.97 billion in 2024 (+6.6%); CISAC warns generative AI could divert up to 25% of creators' royalties | REPORTED | https://www.cisac.org/cisac-global-collections-report-2025 |
| "About 25% of songwriting revenue is lost to bad metadata" | **ESTIMATE, not used** | No primary study found |
| Share of songs registered without agreed splits | **UNVERIFIED, not used** | No audited statistic found |

### 4.2 How split sheets work and why they are disputed

- A split sheet lists every writer, their share of the composition (and sometimes master points), society and IPI; shares must total exactly 100% (REPORTED). https://www.soundcharts.com/en/blog/what-is-split-sheet
- **Conflicting registrations freeze money**: when co-writers register different shares, societies flag the conflict and hold all of the money until it is resolved (REPORTED). https://help.songtrust.com/knowledge/what-are-common-mistakes-creators-make-when-registering-music
- Without a written agreement the default is often equal shares regardless of contribution (REPORTED). https://www.usemogul.com/post/what-are-split-sheets-in-music
- Typical causes: memory decay after sessions; verbal or intermediary deals; producer against topliner (is a beat "writing"?); uncredited contributors; late additions (REPORTED).
- Composition and master are separate rights with separate royalties; the hackathon's Brief B requires they be "tracked apart" (VERIFIED, pack p.5).

### 4.3 Recent disputes (REPORTED)

| Case | Issue | Source |
|---|---|---|
| Tyla, "Water" | Co-writers allege the producer took full production credit and offered them 10% each | https://capitalfm.africa/tyla-faces-legal-battle-over-hit-song-water-amid-production-credit-dispute/ |
| Offset and ChaseTheMoney, "Worth It" (2025) | Deal through an intermediary, then a demand for more | https://www.complex.com/music/a/jaelaniturnerwilliams/offset-worth-it-drama-producer-sues-rapper-second-time |
| Chad Hugo and Pharrell | About USD 1 million and omitted credits on 8 songs | https://www.blackenterprise.com/chad-hugo-amends-pharrell-williams-lawsuit |
| Lola Young and Carter Lang | Songwriting credit; settled Nov 2025 | https://bravo-www.soapcentral.com/entertainment/what-s-latest-lola-young-s-songwriting-credit-lawsuit-pop-star-producer-carter-lang-reach-confidential-resolution |
| Missy Elliott, 1994 songs | Co-writing claim; settled April 2025 | https://www.courthousenews.com/missy-elliott-reaches-last-minute-settlement-in-songwriting-suit/ |

### 4.4 Kenya (REPORTED)

| Fact | Source |
|---|---|
| Collecting societies: MCSK (composers, about 16,000 members), KAMP (producers), PRiSK then PAVRISK (performers); regulator KECOBO | https://www.musicinafrica.net/node/182590 |
| KECOBO audit: KAMP under-distributed about KSh 75.7 million (2020 to 2022); PRiSK owed members about KSh 83.6 million | https://nation.africa/kenya/life-and-style/showbiz/is-kecobo-favouring-pavrisk-in-artistes-royalty-collections--5585212 |
| June 2025: KECOBO denied MCSK a licence; Nov 2025: petition for about 16,000 MCSK members dismissed | https://thestandard.ke/business/amp/national/article/2001522100/copyright-board-denies-mcsk-operating-licence ; https://www.standardmedia.co.ke/crime-and-justice/article/2001539412/blow-to-16000-musicians-as-court-dismisses-petition-in-mcsk-licence-battle |
| Some musicians received KSh 2,500 for 2018 royalties; only 40 of 260 broadcasters paid royalties in 2019 | https://peopledaily.digital/news/broke-pockets-enterprise |
| Copyright (Amendment) Act 2021 (assented 4 Apr 2022): artists guaranteed 52% of ring-back-tone revenue | https://spoor.com/kenya-2021-changes-to-copyright-law/ |

### 4.5 Cross-border (structural point, no case found)

A Harlem writer typically registers with ASCAP or BMI and a Nairobi writer with MCSK: different societies, different metadata, more room for conflicting registrations. **We found no documented Harlem and Nairobi split dispute** and do not claim one.

### 4.6 Licensing depends on splits (REPORTED)

Incantio (Seattle; CEO Danny Newcomb) is an artist-owned sync licensing marketplace; artists self-license, set prices, reportedly keep 80%; open beta from 18 February 2026; partners include APM Music and AudioShake (stems). Its self-licensing framework pays out automatically based on song splits. https://musicbusinessworldwide.com/sony-and-universal-owned-production-music-firm-apm-music-partners-with-ai-recommendations-startup-incantio ; https://news.a2im.org/blog/member-spotlight-incantio

---

## 5. Judges And Partners

| Person or organisation | What they publicly care about | Label and source |
|---|---|---|
| **Ben Goertzel** (SingularityNET) | Neural-symbolic AGI; LLMs as one component under a symbolic layer; memory with provenance; open, decentralised, beneficial AGI | REPORTED, section 3.5; https://bengoertzel.substack.com/p/a-bgi-manifesto |
| **Haley Lowy** (SingularityNET) | Alignment and coordination systems, including reputation systems; explaining technology to the community | REPORTED, https://lifeboat.com/ex/bios.haley.lowy |
| **Yeabesera Derese, Samuel Wondimagegnehu, Surafel Fikru** (iCog Labs and SingularityNET) | Run the 18-challenge MeTTa track on BASIX; will judge idiomatic, working MeTTa | REPORTED, https://www.basix.market |
| **XRAgency / BASIX** (Nefertiti Strong, Saskia Betz) | "Global South first"; "Consent, ownership and royalty splits are written into the contract before anything is built"; artworks and archives that keep earning; DICE co-ownership | REPORTED, https://xragency.org |
| **Richard E. Pelzer II** (Harlem CLX; GM, Harlem Fine Arts Festival) | Artists and entrepreneurs earning revenue; Harlem as a living arts ecosystem; partnerships with XRAgency | REPORTED, https://amsterdamnews.com/news/2026/01/29/black-new-yorker-how-richard-e-pelzer-ii-is-working-to-maintain-harlem-as-an-arts-ecosystem/ |
| **Harlem Fine Arts Show** | HFAS18, 20 to 22 Feb 2026, "Art as Healing. History as Power. Legacy in Motion."; 70+ African-diaspora artists | REPORTED, https://www.wbgo.org/podcast/art-of-the-story/2026-02-20/the-18th-harlem-fine-arts-show-runs-february-20-22-at-the-glasshouse |
| **Incantio** | Split-driven payouts; artist ownership; stems | Section 4.6 |
| **AI for Peace Africa** | Collection of works by young Kenyan artists made with AI (organiser-supplied) | No public web presence found; UNVERIFIED |
| Rafael Presa, Rosy Salutem, Luvai Darwajawala | No public information found | UNVERIFIED |

---

## 6. BASIX.MARKET Today (REPORTED, public pages)

"BASIX Omniversity Incubator: the learn-and-earn engine of BASIX: blockchain-verifiable IP, DICE-owned" (Developers, Investors, Creators, Entrepreneurs co-own labour and IP). Features: developer LMS, an 18-challenge MeTTa track, Open Badges v2, live cohorts (including Kenyatta University), an IP marketplace where builds become licensable assets, hackathons. Auth via Clerk. **No public API found**, so any BASIX integration in Sawa is shown as a concept. 24 listed partners include SingularityNET, iCog Labs, Incantio, HarlemCLX, HFAS, Cardano Foundation, Fetch.ai.

---

## 7. Alternatives Researched: Art Provenance And Peace Mediation

### 7.1 Art provenance (REPORTED)

- The "50% of art is fake" claim is disputed; the 70 to 90% figure applied only to works submitted for testing. https://news.artnet.com/art-world/50-percent-art-forgery-estimate-may-be-exaggerated-duh-137444
- 90 to 95% of sub-Saharan Africa's cultural heritage is held outside the continent (Sarr-Savoy, 2018). https://hyperallergic.com/474573/a-french-report-on-repatriating-african-cultural-heritage-stirs-the-pot/
- The International Inventories Programme catalogued 32,321 Kenyan objects in 30 institutions in 7 countries, with common mislabelling of origin. https://inventoriesprogramme.org/

### 7.2 Peace mediation (REPORTED)

- Kenya's TJRC named "historical grievances over land" as the single most important driver of conflict. https://www.news24.com/africa/news/kenya-truth-report-killings-graft-20130522
- Wagalla massacre (1984): official toll 57; Wagalla Foundation 475; other estimates 1,000 to 5,000; TJRC "possibly close to a thousand". https://www.prio.org/publications/10421
- AI in mediation: UN DPPA with Remesh (Libya, Yemen, Iraq); Akord.ai for Sudan; practitioners remain cautious. https://www.c-r.org/accord/still-time-talk/ai-and-future-mediation
- **Design lesson taken into Sawa:** mediators want agreed facts plus an explicit record of what remains disputed, not a forced single narrative. Sawa always separates settled, needs-confirmation and withdrawn premises, and blocks signing rather than forcing a share.

---

## 8. Our Previous Win: What We Reuse

### 8.1 Mizani (VERIFIED, `/Users/eugenius/Work/Basix-Hackathon`)

First place, BASIX Omniversity Hackathon, October 2026. Repository https://github.com/CodeWithEugene/Basix-Hackathon ; live https://mizani.codewitheugene.top. Two Omega agents reconcile a maternal referral with NAL revision, defeaters and memory; contestable proof in English and Swahili; Jev reads Swahili and Sheng notes; FastAPI, Hyperon on Vercel serverless; Next.js with shadcn/ui.

### 8.2 Engine reuse verdict (VERIFIED by reading the code)

| Mizani part | Reuse in Sawa |
|---|---|
| `engine_hyperon.py` (one `MeTTa()` per agent, loads Omega `lib_nal.metta`, filters unreduced results) | **Reuse**, parameterised (credited) |
| `reason.metta` rule-as-NAL-deduction-chain firing (`eliminate`, `fire-rule`), ephemeral staging | **Reuse the pattern** (credited) |
| Append-only memory log replayed into the atom space | **Reuse the pattern** (credited) |
| `evidence.metta`, `reasoner.py`, explanations, UI, data | **Not reused.** Clinical; all rewritten for creative provenance |

### 8.3 The winning process (VERIFIED, from the Mizani session transcript)

1. Parallel research streams, then Jev-scored idea choice.
2. Full docs (info, problem, research, solution, build) **before** building; the demo script in `build.md` drives the build.
3. Build and deploy to Vercel (in-memory, seeded scenario).
4. Video: narration written first; edge-tts voice `en-KE-ChilembaNeural` at +4%; Playwright screen capture of a clean local copy at 1920x1080; OpenCV virtual camera (smooth zoom to key results); captions rendered as image pills; Pixabay "Minimal Tech" music ducked under the voice; normalised to -16 LUFS; 2:45 total; 7 takes. Pipeline at `~/Tools/OpenMontage/projects/mizani-demo/scripts/`.
5. Paste-ready submission text.

---

## 9. Jev Scoring Runs

| Run | Request | Model | Result |
|---|---|---|---|
| 1, full context | `req_01a1588b65947345854aa89dda9203e0` | jev-1.13.0 | Split sheet 3.56; one story 2.45; royalty 2.26; provenance 2.13; licence guard 1.66; borderless 1.43 |
| 2, without the "organisers repeat split sheets" sentence | `req_01a1588b86207d0194ad2fa4f1ec2b1d` | jev-1.13.0 | Split sheet 3.45; one story 2.53; royalty 2.20; provenance 2.10; licence guard 1.57; borderless 1.44 |

Method and full table: [problem.md](problem.md) section 5.

---

## 10. Gaps And Limits

- About forty five minutes of parallel research on deadline day; secondary sources for most music-industry facts.
- No primary source for the "25% lost to metadata" figure; no statistic on songs without agreed splits; neither is used.
- No documented Harlem and Nairobi split dispute; the cross-border point is structural.
- No public BASIX.MARKET or Incantio API; integrations are concepts pending partner confirmation.
- The deadline, team size and prize differ across official sources (section 2.2).
