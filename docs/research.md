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
11. [How Artists Actually Make Music And Split Credit](#11-how-artists-actually-make-music-and-split-credit)

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


---

## 11. How Artists Actually Make Music And Split Credit

> Added 20 October 2026, about 14:00 EAT, from a dedicated research stream (Claude Code subagent, web sources cited inline). It changed Sawa's default split policy to beat 50 / topline 50, added assistive AI disclosure and voice consent, and shaped the demo story and the site copy.

Prepared 20 October 2026. Every claim has a source URL. Where sources disagree or are weak (vendor blogs, forums), that is flagged. "UNVERIFIED" marks things I could not confirm from a primary source.

---

### 0. Executive summary (the ten things that matter most for Sawa)

1. **Artists think in two halves, not seven parts.** In hip-hop, Afrobeats, amapiano, gengetone and most beat-first pop, the working mental model is **"the beat/track" vs "the topline" (melody + lyrics)**, usually **50/50**, with the topline half then split among the topliners. A common forum formulation: "50/50 topline/music. Then of the topline 50/50 again is lyrics/melody" ([Gearspace via search](https://gearspace.com/threads/song-split-advice.1070514/); [Amuse](https://www.amuse.io/en/content/how-to-split-royalties-between-artists-and-producers); [Ari Herstand](https://aristake.com/producer-splits/)). Sawa's current default gives the person who made the whole beat (chords+bass 12 + drums 8) **20%** of the composition. **That is the single thing most likely to make a producer laugh.**
2. **Pop and Nashville rooms split equally by head count**, regardless of who did what ("one word, one third"; BMI: splits "are not based on the writers' contributions") ([APRA AMCOS](https://www.apraamcos.com.au/resources/member-tools/co-writing-splits-and-registering-your-works); [Ari Herstand](https://aristake.com/producer-splits/)). Sawa needs at least three switchable policies: **Room split (equal)**, **Beat/Topline (50/50)**, **Contribution-weighted (current model)**.
3. **Lyrics are not weighted above melody anywhere.** Sawa's weights give lyrics 50 and melody 30. Industry customs are equal "words and music", or 50/50 lyrics/melody within the topline. Herstand: co-written songs are "usually split equally, not by lyrics versus music" ([Ari's Take](https://aristake.com/producer-splits/)).
4. **"Started it 75 / developed it 25" has no industry basis.** Nobody uses it. It is defensible as a configurable Sawa house rule, but the real norm is the opposite of granular: either everyone in the room is equal, or the parties negotiate. What *is* a real norm is a **materiality threshold**: changing a word does not earn a third (see "The Pact", 2021: no credit to anyone who did not "create or change the lyric or melody" ([Stereogum](https://stereogum.com/2122638/prominent-songwriters-sign-letter-calling-for-artists-to-stop-demanding-credit-for-songs-they-didnt-write/news))).
5. **Master is a different conversation with different vocabulary**: whoever **paid** for the recording owns it (label, artist, or in Kenya often "the funder"), and producers get **points** (3 to 5 on a major deal; 15 to 25% of net on indie) or a **fee**, or a fee plus points ([Ari Herstand](https://aristake.com/producer-splits/); [Hypebot](https://www.hypebot.com/music-producer-points-what-are-they/)). Sawa's "master 50/50 from a prior agreement because each paid for their own sessions" is realistic for an indie co-owned record. Keep it, but model "who paid" as evidence and support points.
6. **AI: Sawa's "owned by no one" stance is correct and now matches every authority** (US Copyright Office Part 2, Jan 2025; ASCAP/BMI/SOCAN Oct 2025 accept partially AI works but not fully AI ones; Kenya's Copyright Tribunal in 2026 said AI works need real human creative input beyond prompting; KECOBO's Sharon Wata: "with purely AI-generated content, you would not claim copyright"). But the realistic AI use in a session is mostly **assistive** (stem separation, mastering, cleanup): Tracklib's 1,734-producer survey found 32% use AI tools, mostly assistive, and only **6%** use fully generative tools ([MusicTech](https://musictech.com/news/industry/music-producers-are-rejecting-ai-study-reveals-over-80-of-producers-are-against-ai-generated-songs)). Assistive AI should not move splits at all; Sawa should say so.
7. **AI disclosure is now a metadata field, not a vibe.** DDEX's AI disclosure extension (Sept 2025) lets a release declare AI per element (vocals, instrumentation, composition, lyrics, post-production); Spotify shows AI credits (beta live April 2026); Apple Music has "Transparency Tags" ([Interspace](https://interspacemusic.com/blog/ai-disclosure-just-became-a-delivery-field-your-distributors-ddex-pipeline-is-now-the-referee/); [Spotify support](https://support.spotify.com/article/ai-credits/)). Sawa's `ai_points` disclosure should map to those DDEX categories.
8. **Samples, interpolations and loops come off the top before anyone splits.** Sawa has no part type for third-party material. In hip-hop/trap, loop makers commonly take half of the producer's side on a placement. This is a big realism gap.
9. **Evidence: timeline and access decide real disputes.** The Kenyan *Mpishi (Aiyaya)* case (Matata vs DJ Keville, Copyright Tribunal, Aug 2025) turned on whether Matata had **access** to the beat and the fact the track was "conceived, recorded, and finalized months before" the alleged December 2024 exchange ([Capital FM](https://capitalfm.africa/tribunal-clears-matata-in-copyright-row-over-mpishi-aiyaya-hit-song/)). Ed Sheeran's "Shape of You" trial was argued over **session voice memos** ([BOOM](https://www.boomlive.in/explainers/ed-sheeran-shape-of-you-copyright-trial-high-court-17103)). Sawa's evidence-first framing is exactly right; sharpen it with time zones, file-hash caveats (WhatsApp re-encodes audio), and "who paid".
10. **Kenya is a paperwork desert, which is Sawa's opportunity.** Kenyan producers describe deals "based on trust", "No one was keen on contracts", no split sheets, and ownership going to whoever funded the session ([Daily Nation, 2023](https://nation.africa/kenya/news/lamentations-of-music-producers-who-are-missing-out-on-royalties-of-kenyan-oldies-for-lack-of-contracts-4248804)). Collective management is in flux: KECOBO licensed only **KAMP** (producers/master owners) and **PAVRISK** (performers) from Nov 2025, MCSK (composers/publishers) is unlicensed and litigating, and royalties are being routed via **e-Citizen** with a 70% minimum payout ([People Daily](https://peopledaily.digital/insights/what-rutos-e-citizen-royalties-directive-means-for-musicians); [Citizen Digital](https://citizen.digital/news/court-directs-full-hearing-in-royalty-collection-case-against-mcsk-n374485)). A demo that says "register with MCSK and get paid" would make a Kenyan artist roll their eyes.

---

### 1. How songs are actually made today

#### 1a. Pop / R&B sessions and writing camps

- **Shape of the room**: a producer (or "track guy") plus one to three **topliners** (people who write vocal melody and lyrics over an existing instrumental). Camps pair "topliners, lyricists, vocalists, and composers with producers", and a topliner is "writing the vocal melody and lyrics of a song, working on top of an existing instrumental or beat" ([Wisseloord](https://wisseloord.org/?p=57405)).
- **Splits are typically agreed in the room at the time of writing** at camps ([Wisseloord via search](https://wisseloord.org/?p=57404)). Example camps in Africa: Ultra Music Publishing's three-day Lagos camp (~20 producers, writers, artists, incl. Burna Boy's producers Chopstiix and Leriq) ([CMU](https://archive.completemusicupdate.com/article/ultra-international-music-publishing-launches-lagos-based-creative-hub/)); Afrocroiser (Mavin, SACEM, French Embassy) pairing French and Nigerian writers ([BusinessDay](https://businessday.ng/?p=1074730)).
- **Equal split by head count is the default ethic** in many pop rooms; one working writer: it's "about all of you being in a room and being part of that songwriting session" ([The Songwriting Academy](https://thesongwritingacademy.co.uk/video-tips/how-does-a-song-get-split-when-collaborating/)).
- **Artist "cut-ins"** are a known pop pathology: management asks writers for a share of publishing as a condition of release ("Add a word, get a third"). In March 2021 a coalition of hit writers ("The Pact") refused to give credit to anyone who did not "create or change the lyric or melody" ([Stereogum](https://stereogum.com/2122638/prominent-songwriters-sign-letter-calling-for-artists-to-stop-demanding-credit-for-songs-they-didnt-write/news); [Switched On Pop / Emily Warren](https://switchedonpop.com/episodes/pops-worst-kept-secret-emily-warren)).

#### 1b. Hip-hop / trap (beat-first)

- **Workflow**: producer makes beats (FL Studio is widely described as the default DAW for hip-hop/trap, though I found no rigorous survey; [audeobox](https://www.audeobox.com/learn/compare/best-daw-for-hip-hop/)), sends **beat packs** (3 to 5 beats, tagged MP3s, then WAV/stems on request) by email, DM, or tracked-link tools (e.g. SendBeatsTo, which notifies when an email is opened or a file downloaded) ([Capterra listing](https://www.capterra.co.uk/software/1095887/SendBeatsTo); [BeatSyncPro](https://beatsyncpro.ai/blog/how-to-get-placements-2026.html)). Rapper/artist writes and records over the beat; producer may never be in the room.
- **Leasing vs exclusive**: online beats are sold as **non-exclusive leases** (cheap, capped streams, beat stays on the market) or **exclusives**; templates commonly specify a **50/50 publishing split** for the instrumental as a starting point ([search summary of beat-lease templates](https://blog.songtrust.com/music-publishing-tips-beat-selling-and-music-publishing)). Rights can change hands under the artist: Blaqbonez's "ACL" vanished from DSPs in April 2026 after the beat was sold, because he only had a limited non-exclusive licence ([Afrocritik](https://afrocritik.com/beat-licences-publishing-rights-what-african-artistes-keep-getting-wrong/)).
- **Loops / co-producers**: many beats are built on purchased or traded **loops**. Loop sellers frequently require a **50/50 split of the producer's side on placements** ("you agree to splitting all profits, including publishing, mechanicals, points, and advance fees equally"), plus co-production credit ([prodwest terms](https://prodwest.gumroad.com/l/scivq); [bankrollmadethisbeat](https://bankrollmadethisbeat.gumroad.com/l/warimg)). Splice samples are sold as royalty-free ([Rolling Stone](https://www.rollingstone.com/pro/features/future-25-steve-martocci-889065/)).

#### 1c. Afrobeats, amapiano, Bongo Flava, gengetone and Kenyan urban music

- **Producer-led, fast, in-person when possible**: a ThisDay studio visit watched DJ Maphorisa build a track "from the ground up, layering melodies, beats, and rhythms," then the singer Wurld "jumped on the beat and spun lyrics on the spot within minutes" ([ThisDay](https://www.thisdaylive.com/2023/04/09/from-townships-to-the-world-exploring-the-global-phenomenon-of-amapiano-with-spotify/)). The vocalist often freestyles melody and words over the beat; the "writing" is captured as the vocal take itself. Amapiano's defining log drum is commonly made with FL Studio's FLEX/DX10 ([Sound On Sound](https://www.soundonsound.com/people/talkback-teno-afrika)).
- **Bedroom and home studios**: amapiano spread via producers "crafting tracks in Internet cafes and sharing them on YouTube and Facebook" ([Sound On Sound](https://www.soundonsound.com/node/4929484)). In Tanzania, Diamond Platnumz, Harmonize and Marioo have home studios; "artists often receive beats and tracks from producers, and then sessions are scheduled to polish the songs" ([The Citizen TZ](https://www.thecitizen.co.tz/tanzania/magazines/homegrown-hits-tanzania-s-home-studios-challenging-standards-4626068)).
- **Gengetone** grew from 2000s genge rap with reggaeton/dancehall, in neighbourhood studios (e.g. Kibera); early videos shot on handheld devices ([Pan African Music](https://pan-african-music.com/en/long-live-gengetone/); [Norient](https://norient.com/raphael-kariuki/gengepress); [Wakilisha](https://wakilisha.africa/?p=20379)).
- **Beats moving over DMs without terms is the African default**: "Many deals happen on credit: a producer shares a beat, the artiste records over it, and terms are 'sorted out later'"; "Beats are frequently sent over direct messages, with no written terms" ([Afrocritik](https://afrocritik.com/beat-licences-publishing-rights-what-african-artistes-keep-getting-wrong/)). Producers historically were paid for **session time or a beat fee**, not royalties ([BusinessDay NG](https://businessday.ng/?p=616748)).
- **Kenya specifically**:
  - 1990s/2000s producers (Tedd Josiah, Clemmo, Eric Musyoka) say deals were trust-based; Musyoka's Homeboyz work was "work for hire" with no split sheets; ownership went to whoever **funded** the session, who could become "executive producer" and own the song ([Daily Nation, May 2023](https://nation.africa/kenya/news/lamentations-of-music-producers-who-are-missing-out-on-royalties-of-kenyan-oldies-for-lack-of-contracts-4248804)).
  - Kenyans talk about "the **audio**" (vs "the video"), and producers price "audio production" per song; Magix Enga drew mockery for a reported **Sh 50,000** audio price ([Nairobi News](https://nairobinews.co.ke/netizens-troll-magix-enga-after-claiming-he-charges-sh-50k-for-audio-production-kiburii)). So the culture is still largely **fee-for-beat**, which matters for whether a Nairobi artist expects to give a producer publishing at all.
  - IP lawyer David Katee (Nation): artists often skip crediting the beat maker, signing a split sheet or agreeing royalty percentages before release, which drives YouTube claims and strikes ([Nation, via search](https://nation.africa/kenya/life-and-style/buzz/how-youtube-copyright-loopholes-cost-kenyan-artists-millions-5009010)).
  - AI is already in Nairobi workflows, especially gospel: creators draft lyrics with ChatGPT/Gemini, generate with Suno, edit in CapCut/Premiere; one spends ~USD 150/month; output "breaks down after about 30 seconds"; distributors re-uploaded viral AI songs under their own names ([Citizen Digital, July 2026](https://citizen.digital/article/kenyan-creators-betting-on-ai-models-to-produce-hit-songs-as-copyright-puzzle-lingers-n386143)).
  - Cross-border collabs are often hybrid: Bien (Sauti Sol) did sessions in London then flew producer Carson Hayes to Kenya ([Nairobi News](https://nairobinews.nation.africa/?p=237498)); *Midnight Train* was recorded across South Africa and Los Angeles ([Pulse UG](https://www.pulse.ug/articles/entertainment/sauti-sol-reveal-that-they-have-featured-burna-boy-and-sho-madjozi-in-midnight-track-2024082321553823960)). Collaborations commonly start over WhatsApp (e.g. Tenny Eddy and Mwuana's "Komaro" began with music sent on WhatsApp) ([Clash](https://www.clashmusic.com/?p=33530)).
  - I found **no** rigorous source describing a "standard" Nairobi session workflow or WhatsApp voice-note practice; the WhatsApp-heavy workflow is common knowledge in the scene but UNVERIFIED by a citable study.

#### 1d. Remote / cross-border collaboration and the digital traces it leaves

- **Stems are the lingua franca across DAWs**: Splice's own guidance is to export stems when a Live user works with a Logic user or plugins differ, save a copy before stemming, delete muted tracks ([Splice blog](https://splice.com/blog/exporting-stems-collaboration-splice/)). Splice's project sharing only helps within the same DAW ([Orphiq](https://orphiq.com/resources/splice-collaboration-platforms)). Typical flow: export WAV stems labelled with BPM and key, share via Dropbox/Drive/WeTransfer, collaborator uploads their parts back ([musicproductionwiki, May 2026](https://musicproductionwiki.com/articles/how-to-collab-online-as-a-producer)).
- **BandLab** (browser/mobile DAW, 100M+ registered users by March 2024, US ~30%) is the mobile-first option ([MBW](https://www.musicbusinessworldwide.com/music-making-app-bandlab-surpasses-100-million-users/)); no Africa breakdown found.
- **Ed Sheeran now records all writing sessions** to defend against copying claims ([BOOM](https://www.boomlive.in/explainers/ed-sheeran-shape-of-you-copyright-trial-high-court-17103)).

**Digital traces a real session leaves (what Sawa's agents could actually hold):**

| Trace | Where it lives | What it proves | Caveats |
|---|---|---|---|
| Phone voice memo (iPhone Voice Memos .m4a, Android recorder) | Writer's phone/iCloud | Melody/lyric idea existed at time T | Moving the file off the phone can replace the original date with file-creation date; filename clock vs in-app UTC timestamp can differ ([Apple Community](https://discussions.apple.com/thread/251773275); [Forensic Focus](https://www.forensicfocus.com/forums/general/iphone-audio-recording-display-different-times-to-ui/paged/2/)) |
| WhatsApp voice note (.opus) and chat | Both phones, chat export | Who sent what to whom, when; "access" | WhatsApp **re-encodes audio on forward/export/backup, so the hash changes even when content is identical**, and forwarding strips origin metadata ([TrueScreen](https://truescreen.io/insights/whatsapp-voice-notes-court-evidence/)). In Kenya, electronic evidence generally needs an Evidence Act s.106B certificate ([Florence Mueni Mbuvi v Faustina Holdings](https://new.kenyalaw.org/akn/ke/judgment/keelc/2021/265/eng@2021-12-15)) |
| DAW project (FL Studio .flp, Ableton .als, Logic .logicx) + autosave/backup folders | Producer's machine | Arrangement, MIDI patterns, which sounds/loops, version history | Each DAW keeps automatic backups (FL Studio "Backup" folder, Ableton "Backup" folder, Logic project alternatives/backups); timestamps in the producer's local time zone |
| MIDI files | Producer's machine | Exact melody/chord notes | Easy to create after the fact; a MIDI hook made *after* a sung memo is development, not origination |
| Bounces / reference mixes ("v1", "v2_final_FINAL") | Email, Drive, WhatsApp | Snapshot of the song at a date | Filenames lie; upload timestamps in the sharing service are better |
| Stems (.wav zip) | Drive/Dropbox/WeTransfer | What each person delivered | Hash identity breaks if re-exported |
| Lyric doc (Google Docs, Apple Notes) | Cloud | Per-line authorship with version history | Google Docs version history attributes edits by account, a strong source |
| Loop/sample licence, Splice download history, beat lease PDF | Accounts, email | Third-party material and its terms | Often missing |
| Payments (M-Pesa, Cash App, studio invoice) | Phones, email | **Who paid for the session, hence master ownership** | In Kenya the funder historically owns the master |
| AI tool history (Suno/Udio library, prompts, export logs) | Account | Which material was generated, when, on which plan | Tool terms matter (see section 5) |

---

### 2. Song parts and how the industry thinks about contribution

- **Legal baseline (US)**: a "song" (musical work, the composition) is **lyrics + melody** (and in practice harmony/arrangement that is original). "Song = Words + Melody" ([CD Baby DIY Musician](https://diymusician.cdbaby.com/music-rights/does-my-producer-deserve-publishing-and-songwriting-credit/)). A beat is not automatically a "song", so a producer's composition share is **negotiated**, not automatic.
- **Practical test** from CD Baby: imagine performing the song solo on voice and guitar years later; if you must recreate a producer's riff or hook, that producer probably deserves writing credit ([CD Baby](https://diymusician.cdbaby.com/music-rights/does-my-producer-deserve-publishing-and-songwriting-credit/)). This is a better heuristic than fixed weights, and it maps nicely to Sawa's "does this part survive in the final?" logic.
- **Songwriting vs production** (Downtown Music Africa): songwriting covers "melody, lyrics, chord progression, and original musical elements"; production covers "beat programming, sound selection, recording direction, arrangement, vocal production, and session execution". "He did the beat" is not a usable credit; specify role, split, master position (fee, points, both, neither), credit wording, approval path; mark unresolved splits as **"unresolved"** rather than releasing them as settled ([Downtown Music Africa](https://downtownmusic.africa/producer-credits-avoid-the-he-did-the-beat-problem-roles-splits-and-pre-release-agreements/)). Sawa should adopt that "unresolved" state verbatim.
- **Hooks**: widely treated as the song's identity (contains the title, repeated) ([American Songwriter](https://americansongwriter.com/measure-for-measure-hooked/)); Songtrust notes hip-hop and dance producers "often ask for a higher share" because "their hooks and melodies are central to a song's success" ([Songtrust](https://blog.songtrust.com/how-split-sheets-work)). But I found **no** source documenting a standard "hook premium" percentage. Weighting the hook more heavily is a defensible configurable choice, not a norm.
- **Samples and interpolations**: a sample needs clearance of both the **composition** (publisher) and the **master** (label); permission is often traded for a share of publishing and/or a fee ([Songtrust](https://blog.songtrust.com/how-split-sheets-work)). An interpolation (re-sung/re-played melody) needs only the composition. Split sheets have a "sampled songs" field for this reason.
- **Two rights, two pies**:
  - **Composition / publishing**: writers' share + publisher's share; collected by PROs/CMOs (ASCAP, BMI, PRS; in Kenya MCSK historically) and mechanicals (MLC in the US).
  - **Master / sound recording**: owned by whoever financed it (label, artist, funder); producer points; neighbouring rights for performers and master owners (SoundExchange/PPL; in Kenya KAMP for producers of sound recordings, PAVRISK/PRiSK for performers) ([CIPIT Strathmore](https://cipit.strathmore.edu/the-collective-management-organisations-in-kenyas-creative-market/)).
  - The two splits need not match: "A vocalist who wrote the topline might hold a share of the composition but none of the master if the producers paid for the session" ([MN2S](https://mn2s.com/news/label-services-resources/how-to-use-a-split-sheet-when-you-collaborate-on-a-dance-track/)).
- **Producer points**: 1 point = 1% of the master royalty (usually out of the artist's share). Majors: 3 for developing producers, 4 to 5 for recognisable names, 5+ superstars; indie: 15 to 25% of net royalties, often with a fee; if the artist has no money upfront, a **50/50** royalty split with shared ownership is common ([Ari Herstand, updated Sept 2025](https://aristake.com/producer-splits/); [Hypebot](https://www.hypebot.com/music-producer-points-what-are-they/); [Orphiq](https://orphiq.com/resources/producer-royalties-explained)). Producers collect neighbouring-rights shares via a **Letter of Direction** to SoundExchange/PPL ([Ari Herstand](https://aristake.com/producer-splits/)).

---

### 3. Split customs and norms

| Custom | Where | What it says | Source |
|---|---|---|---|
| **Equal by head count** ("one word, one third"; Nashville rule) | Pop, country, many camps, bands (Coldplay 4 ways) | Everyone who contributed in the room gets an equal share, regardless of amount | [APRA AMCOS](https://www.apraamcos.com.au/resources/member-tools/co-writing-splits-and-registering-your-works); [Ari Herstand](https://aristake.com/producer-splits/); [Saving Country Music](https://savingcountrymusic.com/big-names-cash-in-on-third-for-a-word-songwriting-rule/) |
| **Beat 50 / lyricists 50** | Hip-hop | RZA (Wu-Tang dispute): the producer gets 50% of the composition, the lyricists, "no matter how many", share the other 50% | [Clash](https://www.clashmusic.com/?p=199410); [Ari Herstand](https://aristake.com/producer-splits/) |
| **Track 50 / topline 50**, then topline 50/50 lyrics/melody | Hip-hop, pop, EDM, Afro genres | "50/50 topline/music. Then of the topline 50/50 again is lyrics/melody" | [Amuse](https://www.amuse.io/en/content/how-to-split-royalties-between-artists-and-producers); [Gearspace](https://gearspace.com/threads/song-split-advice.1070514/) |
| **Producer 30 / topliner 70** | When topline is the main creative contribution | Negotiated alternative | [Orphiq](https://orphiq.com/resources/split-sheets) |
| **Producer gets no writing share, only master points/fee** | Traditional pop/rock; most of Kenya's history | Producer paid via points or fee; or work-for-hire | [CD Baby](https://diymusician.cdbaby.com/music-rights/does-my-producer-deserve-publishing-and-songwriting-credit/); [Nation](https://nation.africa/kenya/news/lamentations-of-music-producers-who-are-missing-out-on-royalties-of-kenyan-oldies-for-lack-of-contracts-4248804) |
| **Words-and-music, not lyrics-vs-melody** | General | Co-written songs "usually split equally, not by lyrics versus music"; even a producer who wrote no lyrics is registered under "Words and Music" | [Ari Herstand](https://aristake.com/producer-splits/) |
| **Remixer = flat fee, no publishing** | All | Work-for-hire, sometimes a small backend | [Ari Herstand](https://aristake.com/producer-splits/) |
| **Loop maker takes half of producer side on placement** | Trap/online beat economy | Per individual loop-kit licences | [prodwest](https://prodwest.gumroad.com/l/scivq) |
| Individual producer rate cards | Online | e.g. 50% for full songwriting, 20 to 25% for co-writes or hooks, 10% for a featured verse | [CD Baby search results / Afrocritik](https://afrocritik.com/?p=28483) (individual, not norms) |

**When splits are negotiated**: advice is uniform: at the session, "once everyone agrees a song is finished" ([Songtrust](https://blog.songtrust.com/how-split-sheets-work)), or "immediately after a writing session" ([ONErpm](https://blog.onerpm.com/onepublishing/talent-and-creativity-are-part-of-the-journey-to-success/)), ideally early ([BreakOut West](https://breakoutwest.ca/blog/what-constitutes-songwriting)). Reality: "We'll sort it out later" becomes costly "once the record gains traction and each party remembers the session differently" ([Downtown Music Africa](https://downtownmusic.africa/producer-credits-avoid-the-he-did-the-beat-problem-roles-splits-and-pre-release-agreements/)). This sentence is basically Sawa's pitch.

**Typical disputes (with real examples)**:
- **Claims add up to more than 100%** (e.g. 70% + 40%): pay sources and publishers hold royalties until resolved ([Songtrust](https://blog.songtrust.com/how-split-sheets-work)). Sawa's two diverging drafts are exactly this.
- **Cut-ins / "add a word get a third"** ([Stereogum](https://stereogum.com/2122638/prominent-songwriters-sign-letter-calling-for-artists-to-stop-demanding-credit-for-songs-they-didnt-write/news)).
- **Beat ownership/licence changes** pull songs from DSPs: Blaqbonez "ACL" (2026); MOG Beatz pulled Shatta Wale tracks from Apple Music over credit/payment until settlement; Ren's "Sick Boi" removed in a dispute with producer Kujo ([Afrocritik](https://afrocritik.com/beat-licences-publishing-rights-what-african-artistes-keep-getting-wrong/)).
- **Kenya**:
  - *Mpishi (Aiyaya)*: DJ Keville claimed his "Bum Dum Riddim" instrumental, allegedly shared with Matata in Dec 2024, was used; the Copyright Tribunal (Aug 2025) found no access and noted both derive from I Wayne's "Can't Satisfy Her"; it ordered the YouTube takedown withdrawn within 48 hours and permanently barred further claims ([Capital FM](https://capitalfm.africa/tribunal-clears-matata-in-copyright-row-over-mpishi-aiyaya-hit-song/)).
  - Clemmo (producer) got nothing after Nonini won a copyright case over "We Kamu": "there is no contract between the two of us" ([Nation](https://nation.africa/kenya/news/lamentations-of-music-producers-who-are-missing-out-on-royalties-of-kenyan-oldies-for-lack-of-contracts-4248804)).
  - Magix Enga vs Harmonize (2019): beat from "Dundaing" allegedly used in "Uno"; fought via YouTube claims ([The Citizen TZ](https://www.thecitizen.co.tz/tanzania/news/entertainment/kenyan-producer-accuses-harmonize-of-stealing-uno-beats-2697094)).
  - Fathermoh and Harry Craze vs Black Market Records (2025/26) over royalties and catalogue control (label vs artist, master side) ([Nation](https://nation.africa/kenya/life-and-style/fathermoh-sues-record-label-over-sh87-6m-royalties-and-copyright-dispute-5475154)).
- **AI misuse**: Timbaland (Suno adviser) uploaded producer K Fresh's song into Suno for a "remix" demo without permission (June 2025), then apologised within hours ([Stereogum](https://stereogum.com/2312616/timbaland-apologizes-to-producer-amid-ai-record-label-controversy/news)).

#### Kenya / East Africa specifics

- **Who collects what**: MCSK = authors, composers, publishers (composition); **KAMP** = producers of sound recordings (master owners); **PRiSK** (now **PAVRISK**) = performers ([CIPIT](https://cipit.strathmore.edu/the-collective-management-organisations-in-kenyas-creative-market/)).
- **MCSK status**: KECOBO refused MCSK's licence; on 14 Oct 2025 it licensed only PAVRISK and KAMP (one year from 5 Nov 2025); the High Court declined to stay and set a full hearing for 21 July 2026 ([Citizen Digital](https://citizen.digital/news/court-directs-full-hearing-in-royalty-collection-case-against-mcsk-n374485); [Interspace](https://interspacemusic.com/blog/nairobi-has-africas-youngest-streaming-audience-kenyas-royalty-system-spent-the-year-in-court/)). Outcome of that hearing: UNVERIFIED (not found).
- **e-Citizen**: Ruto directed (16 Aug 2025) that all music royalties go through e-Citizen with a **70% minimum payout to artists**; KECOBO signed SLAs with e-Citizen, PAVRISK and KAMP; April 2026 Ruto cited a CMO that collected Sh109m and distributed Sh13m ([People Daily](https://peopledaily.digital/insights/what-rutos-e-citizen-royalties-directive-means-for-musicians); [The Star](https://www.the-star.co.ke/news/2026-04-17-ruto-e-citizen-to-curb-cartels-exploiting-artistes); [The Standard](https://standardmedia.co.ke/business/national/article/2001553864/government-moves-copyright-royalties-to-ecitizen-platform)).
- **Ringback (Skiza) tunes**: the Copyright (Amendment) Act (2022, Wanga bill) sets the artist/copyright owner at **not less than 52%** of ringback revenue (telco 39.5%, premium-rate provider 8.5%) and creates a national registry of copyright works ([Nairobi News](https://nairobinews.nation.africa/?p=185187); [Capital FM](https://capitalfm.africa/artistes-copyright-owners-register-big-win-as-house-passes-copyright-amendment-bill/)). Skiza is a real Kenyan revenue line a split sheet should anticipate (it flows to the master/copyright owner).
- **Writing requirement**: Kenya's Copyright Act requires assignments and licences in writing ([Afrocritik](https://afrocritik.com/beat-licences-publishing-rights-what-african-artistes-keep-getting-wrong/)), which is why WhatsApp-only beat deals are fragile.
- **New law coming**: KECOBO released the **Copyright and Related Rights Bill, 2026** (March 2026) for consultation, addressing ownership of "AI generated, commissioned and employment created works" and tighter CMO regulation ([Mondaq](https://www.mondaq.com/copyright/1796350/kenya-introduces-new-copyright-bill)). Final text and status: UNVERIFIED.

---

### 4. Split sheet practice

**Fields a real split sheet has** (merged from Songtrust, Bay Eight, Orphiq, Downtown Music Africa, IPI guides):

- Song title (+ working/alternate titles), date of session(s), place (or "remote")
- For each writer: **legal name**, stage name, role/contribution (e.g. "topline: hook melody and chorus lyrics"), **PRO/CMO**, **IPI/CAE number**, **publisher** (or "self-published") and publisher IPI, **composition share %**, contact, **signature and date**
- **Samples/interpolations** used and their clearance status
- Separate **master** section: master owner(s) %, **producer points** or fee, featured artist terms; ISRC once assigned (ISWC for the composition later) ([Songtrust](https://blog.songtrust.com/how-split-sheets-work); [Songtrust template](https://www.songtrust.com/en/the-ultimate-split-sheet-for-songwriters); [Bay Eight](https://bayeight.com/what-are-split-sheets/); [Orphiq IPI](https://orphiq.com/resources/ipi-number-explained); [Wikipedia ISWC](https://en.wikipedia.org/wiki/International_Standard_Musical_Work_Code))
- Notes: a split sheet "is not a copyright"; note whether it covers publishing or recording ([Songtrust](https://blog.songtrust.com/how-split-sheets-work)). Without IPIs, PROs have to guess which writer is which ([search summary](https://help.interspacemusic.com/article/what-is-an-ipi-cae-number)).
- New in 2025-26: an **AI disclosure** section (per DDEX categories) and, for voice models, a **voice consent** record.

**Tools in use**:

| Tool | What it does | What it does not do |
|---|---|---|
| Songtrust (free template + publishing admin) | Template; registers works with societies worldwide | Does not resolve disagreement; assumes agreed numbers |
| DistroKid Splits | Auto-splits **distribution (master-side) earnings** by email invite; each collaborator sees only their own % | Does not handle songwriting/publishing, ownership, or disputes ([RouteNote](https://routenote.com/radar/?p=3883); [loop.fans](https://music.loop.fans/blog/distrokid-distribution)) |
| Jammber Splits | Tracks contributors and %, split sheets for composition and recording, PDF export, audio uploads, chat, PRO registration ([Billboard via search](https://www.billboard.com/?p=8541041); [RightsTech](https://rightstech.com/2019/10/jammbers-new-splits-app-helps-songwriters-divide-up-royalties/)) | Older product; current status UNVERIFIED |
| Divisi, SplitChord, TrackStage (DocuSeal), Unchained, ONErpm "Our Split Sheet" | Generate, send, e-sign, audit-trail split sheets; some auto-pay | Record agreement; none reconcile conflicting memories or weigh evidence |
| Muso.ai | Verified credits profiles, credit corrections pushed to partners; ISNI agency | Credits, not ownership % |
| Sound Credit | Credits capture; new **AI Credits** tie each AI contribution to a role and tool, shown distinctly from human credits ([Sound Credit](https://soundcredit.com/blog/sound-credit-introduces-ai-credits)) | Not a split negotiator |
| Spotify AI credits (beta) | Shows AI use for lyrics, vocals, instrumentals, production when delivered via distributor; absence ≠ no AI ([Spotify](https://support.spotify.com/article/ai-credits/)) | Display only |

**Gap Sawa fills**: every existing tool assumes the humans already agree. None ingests session evidence, none normalises timestamps across devices and time zones, none explains a split clause-by-clause, none separates AI-generated material from human authorship.

---

### 5. AI in music creation, 2025-2026

#### Adoption (surveys disagree because of definitions and samples)
- **Tracklib "Music Producers & AI 2025"** (n=1,734): **32%** use AI tools, mostly assistive (stem separation, EQ, mastering); **6%** use fully generative tools; 82% oppose full song generation from prompts; 81% want AI music labelled; 83% want producers to disclose ([MusicTech](https://musictech.com/news/industry/music-producers-are-rejecting-ai-study-reveals-over-80-of-producers-are-against-ai-generated-songs)).
- **LANDR** (n=1,200, its own users, Sept-Oct 2025): **87%** use AI somewhere; 79% for technical tasks (mixing/mastering/restoration); 66% for creative tasks; 29% generate vocals/drums/instrumentals; **13%** made an entire song with a tool ([Ari's Take](https://aristake.com/ai-tools-musicians-study/)).
- **Ditto**: 48% of artists used AI, down from 59.5% in 2023 ([Ditto](https://press.dittomusic.com/48-of-artists-use-ai-to-make-music-fewer-than-in-2023)).
- **Deezer** uploads: AI tracks 10% (Jan 2025) → 28% (Sept 2025) → 44% (~75k/day, April 2026) → **>50% (~90k/day, July 2026)**, but only 1 to 3% of streams; 85% of AI-track streams flagged fraudulent and demonetised; fully AI tracks tagged and excluded from algorithmic and editorial playlists ([DJ Mag](https://djmag.com/news/ai-generated-music-surpasses-50-of-daily-uploads-deezer); [Engadget](https://engadget.com/entertainment/music/deezer-says-ai-made-songs-make-up-44-percent-of-daily-uploads-163642921.html)).

#### Realistic uses (what a co-writer would actually have done)
- **Stem separation** (pull a vocal off a phone memo, sample a record) and **AI mastering** are the most common; Suno itself offers up to 12-stem separation ([Suno hub](https://suno.com/hub/best-stem-separation-software)).
- **Generative sketches as raw material**: "BBL Drizzy": comedian King Willonius wrote lyrics, generated the soul track with Udio, Metro Boomin sampled it; because the **lyrics were human-authored**, Drake/Sexyy Red's side had to clear that portion, and Willonius got an advance plus publishing ([Fortune](https://fortune.com/2024/06/06/metro-boomin-bbl-drizzy-drake-kendrick-ai-beats-pay)). This is the best real-world precedent for Sawa's rule: AI-generated audio is unowned, the human parts inside it are not.
- **AI "artists" with human writers**: Xania Monet (Telisha Jones writes lyrics, Suno supplies vocals) signed a reported $3M deal with Hallwood (Sept 2025) ([The Decoder](https://the-decoder.com/ai-artist-xania-monet-signs-3-million-record-deal-with-hallwood-media/)).

#### Label / platform settlements and policies
- **UMG + Udio**: settled 29-30 Oct 2025; licensed platform launching 2026; Udio immediately disabled downloads (walled garden) ([MBW](https://www.musicbusinessworldwide.com/universal-music-settles-udio-lawsuit-strikes-deal-for-licensed-ai-music-platform); [AP via News4Jax](https://www.news4jax.com/business/2025/10/30/universal-music-and-ai-song-generator-udio-settle-lawsuit-and-partner-on-new-ai-music-platform/)). Warner also settled with Udio ([Hollywood Reporter](https://www.hollywoodreporter.com/music/music-industry-news/warner-music-group-settles-lawsuit-udio-1236431207/)).
- **WMG + Suno**: settled 25 Nov 2025; Suno to launch licensed models in 2026 and retire current ones; **opt-in** for artists' names, likeness, voices and compositions; download caps for paid users, free users stream/share only; Suno bought Songkick ([Music Week](https://www.musicweek.com/public_html/index.php/labels/read/warner-music-group-settles-lawsuit-and-signs-ai-licensing-deal-with-suno/093129); [Campos Thomaz](https://camposthomaz.com/en/conhecimento-ct/warner-music-ends-u-s-lawsuit-and-reaches-deal-with-suno-for-licensed-ai-models-starting-in-2026/)). Suno launched "Voice Model" soundalike support under the Warner deal in late March 2026 ([DMN](https://www.digitalmusicnews.com/2026/04/09/suno-universal-music-lawsuit-settlement-impasse/)).
- **UMG and Sony vs Suno**: still litigating; talks at a "hard impasse" (April 2026) over distributing generated tracks off-platform; labels sought to add 61,000 works ([DMN](https://www.digitalmusicnews.com/2026/04/09/suno-universal-music-lawsuit-settlement-impasse/); [MBW](https://www.musicbusinessworldwide.com/umg-and-sony-seek-to-add-61000-copyrighted-works-to-suno-lawsuit-after-discovery-reveals/)). **Sony vs Udio**: Sony filed a second suit (20 July 2026, SDNY, 30,000+ recordings) ([Music Connection](https://www.musicconnection.com/sony-sues-udio-again/)). Status after July 2026: UNVERIFIED.
- **Spotify** (25 Sept 2025): vocal impersonation allowed only with the artist's authorisation; spam filter; supports DDEX AI disclosures; removed 75M spammy tracks in 12 months ([Spotify newsroom](https://newsroom.spotify.com/2025-09-25/spotify-strengthens-ai-protections/)). 16 Oct 2025: "artist-first" AI products with Sony, UMG, WMG, Merlin, Believe on principles of upfront licensing, artist choice, fair pay and credit ([Billboard](https://www.billboard.com/pro/spotify-ai-music-tools-plan-major-label-partnerships/); [MediaNama](https://www.medianama.com/2025/10/223-spotify-ai-partnership-global-labels-artist-first-ai-products/)).
- **DDEX AI disclosure** (Sept 2025): per-element declarations (vocals, instrumentation, composition, lyrics, post-production), not a single checkbox; Spotify AI credits beta live April 2026; Apple Music Transparency Tags (Artwork, Track, Composition, Music Video) ([Interspace](https://interspacemusic.com/blog/ai-disclosure-just-became-a-delivery-field-your-distributors-ddex-pipeline-is-now-the-referee/); [MBW](https://www.musicbusinessworldwide.com/spotify-to-show-ai-tags-in-song-credits-where-artists-have-chosen-to-disclose-through-their-label-or-distributor/)). EU AI Act transparency obligations apply from 2 Aug 2026 ([Sound Credit](https://soundcredit.com/blog/sound-credit-introduces-ai-credits)). Exact DDEX field names: UNVERIFIED (spec not retrieved).
- **Distributor rules** (DistroKid, TuneCore, CD Baby): I could not retrieve a primary source (LabelGrid's 2026 overview returned 403). UNVERIFIED; check each distributor's help pages. Spotify notes disclosure only reaches it through the distributor.

#### Copyright and collecting societies
- **US Copyright Office, Part 2 (29 Jan 2025)**: prompts alone are not authorship ("re-rolling the dice"); human expression perceptible in the output, and human selection/arrangement/modification of AI output, can be protected; case-by-case on degree of human control; no new sui generis right ([Copyright Alliance summary](https://copyrightalliance.org/ai-report-part-2-copyrightability/); [IPWatchdog](https://ipwatchdog.com/2025/01/29/part-two-copyright-office-ai-report-says-creative-prompting-doesnt-constitute-authorship/)). Registration guidance (March 2023) requires disclosing and **excluding** more-than-de-minimis AI material ("Material Excluded") ([Pryor Cashman](https://www.pryorcashman.com/publications/copyright-office-issues-guidance-on-copyrightability-of-ai-generated-content); [Rimon Law](https://www.rimonlaw.com/how-copyright-office-guidance-applies-to-music-that-includes-ai-generated-material/)).
- **ASCAP, BMI, SOCAN (28 Oct 2025)**: accept registration of **partially** AI-generated works ("combines elements of AI-generated musical content with elements of human authorship"); **fully** AI works not eligible; unlicensed training "is not fair use, but theft" ([BMI](https://www.bmi.com/news/entry/ascap-bmi-and-socan-announce-alignment-on-ai-registration-policies); [MBW](https://www.musicbusinessworldwide.com/ascap-bmi-and-socan-will-now-accept-registrations-of-partially-ai-generated-musical-works)). Note: there is **no "AI share" line**; writers' shares still total 100%. Sawa's rescaling of human contributions to 100 is consistent with this.
- **GEMA**: registration form has an AI checkbox confirming the work was "not created exclusively by AI", to stop payouts for content needing no creative work ([GEMA](https://www.gema.de/en/w/help/creators/works-repertoire/submit-a-notification-for-your-works/confirm-work-not-created-exclusively-by-ai)). **SACEM**: no published registration rule found; stresses transparency and trust in members ([Paperjam](https://en.paperjam.lu/article/sacem-tries-to-protect-those-who-create)).
- **CISAC** (Dec 2024): music creators could lose **24%** of revenues by 2028 (€10bn cumulative) under unchanged rules ([CISAC](https://www.cisac.org/Newsroom/news-releases/global-economic-study-shows-human-creators-future-risk-generative-ai)).
- **Kenya**: no AI-specific statute; KECOBO's Sharon Wata: AI-assisted works may be copyrightable with enough human creativity, but "with purely AI-generated content, you would not claim copyright" ([Citizen Digital](https://citizen.digital/article/kenyan-creators-betting-on-ai-models-to-produce-hit-songs-as-copyright-puzzle-lingers-n386143)). The Copyright Tribunal (*Aryeh Movement v Akoth*, reported Sept 2026, literary works) held AI works need real human creative input beyond prompting, under s.22(3) originality and fixation ([Techweez](https://techweez.com/2026/09/08/ai-generated-content-copyright-kenya/)). No MCSK AI policy found.
- **Tool terms matter**: whether the user even owns the output depends on the plan (Suno's published terms have historically given free-tier output ownership to Suno and paid-tier to the user; Udio blocked downloads after the UMG deal). Sawa should record the **tool and plan** with each AI generation. Suno plan terms: UNVERIFIED for current 2026 version.

---

### 6. Voice cloning and consent norms

- **Grimes / Elf.Tech** (May 2023): anyone may use her AI voice; **50% of master royalties** in exchange for a Grimes feature credit; publishing not included; no violent/discriminatory lyrics; register the song on her site; informal, not a signed contract ([Mixmag](https://mixmag.net/read/grimes-software-elftech-mimic-voice-percent-royalties-news); [MusicTech](https://musictech.com/news/grimes-ai-software-mimic-elftech/)). Useful as a template: voice use is a **master-side** deal (feature + master share), not a composition share.
- **ELVIS Act** (Tennessee, effective 1 July 2024): adds **voice** (actual or simulated, "sound attributable to" a person) to right-of-publicity; civil action plus Class A misdemeanour; liability for distributing tools whose "primary purpose" is unauthorised voice/likeness facsimiles; post-mortem rights ([Proskauer](https://www.proskauer.com/blog/the-king-is-back-in-the-digital-era-the-elvis-act-generative-ai-and-right-of-publicity); [Sheppard](https://www.sheppard.com/insights/blogs/tennessees-elvis-act-incorporates-ai-considerations-into-right-of-publicity-protections)).
- **NO FAKES Act**: reintroduced 9 April 2025 (S.1367, Coons/Blackburn; House: Salazar/Dean), backed by RIAA, SAG-AFTRA, UMG, WMG, YouTube; criticised by EFF; Senate subcommittee hearing 21 May 2025 ([YouTube blog](https://blog.youtube/news-and-events/youtube-supports-the-no-fakes-act/); [Grammy.com](https://www.grammy.com/advocacy/issues-policy/no-fakes-act/)). Not enacted as far as I found; current status UNVERIFIED.
- **Platform rules**: Spotify bans unauthorised vocal impersonation ([Spotify](https://newsroom.spotify.com/2025-09-25/spotify-strengthens-ai-protections/)); Warner/Suno is opt-in for voices; Kenyan creator Ndwaru sought singer Rozy Ohon's consent before an AI version of her song ([Citizen Digital](https://citizen.digital/article/kenyan-creators-betting-on-ai-models-to-produce-hit-songs-as-copyright-puzzle-lingers-n386143)).
- Norm emerging across all of these: **consent is scoped** (demo vs release, which song, which platform), **credited** (feature), and **paid** (master share or fee). Sawa's "demo only, not the final song" consent record is realistic and good.

---

### 7. Recommendations for Sawa

#### 7.1 Split policy: make it a choice of real-world presets, configurable per genre/agreement

Ship three named presets the agents can cite, plus "custom from prior agreement":

1. **Beat and Topline (default for hip-hop, Afrobeats, amapiano, gengetone, bongo, beat-first R&B)**
   - Composition = **Beat 50 / Topline 50**.
   - Topline = **Melody 50 / Lyrics 50** (within that, hook vs verses can be weighted, e.g. hook 50 / verses 50 for each of melody and lyrics, but call this a Sawa house choice).
   - The beat side is shared among whoever made the beat (producer, co-producer, loop maker per their licence). Chords/bass/drums detail stays *inside* the beat half as provenance, not as separate composition weights.
   - Example of how the current seven elements map: Beat 50 = chords-bass + drum-groove (+ any loops); Topline 50 = hook melody 12.5, verse melody 12.5, chorus lyrics 12.5, verse 1 lyrics 6.25, verse 2 lyrics 6.25 (or keep hook-heavy ratios inside the topline).
2. **Room Split (pop, Nashville, camps, bands)**: equal share to every person who made a **material** contribution to melody or lyrics (or to the beat if the producer is treated as a writer), regardless of size. Materiality test: did they create or change a lyric or melody that survives in the final (The Pact standard), or would you have to recreate their part playing it solo on guitar (CD Baby test)?
3. **Contribution-Weighted (current Sawa model)**: keep, but rebalance (see 7.2) and label it explicitly as "Sawa contribution weights", not "industry standard".
4. **Prior Agreement**: an earlier signed policy (like "Jua 2025") overrides presets. This is how real collaborators work: the second song follows the first song's deal.

Always also allow: **producer takes no composition share, master points/fee only** (traditional; still common in Kenya's fee-for-beat culture).

#### 7.2 Things in the current model that would make a real artist or producer roll their eyes

| Current | Why it reads wrong | Fix |
|---|---|---|
| Producer who made the whole beat gets 20% of composition (chords+bass 12, drums 8) | In beat-first genres the beat is half the song (RZA, Herstand, Amuse). A Harlem producer would walk out | Beat/Topline 50/50 preset as default for this genre |
| Lyrics 50 vs melody 30 | No custom weights lyrics above melody; "words and music" are equal or 50/50 | Melody = lyrics within topline |
| Drum groove as a separate composition element | Drums are usually production (master) unless distinctive; in hip-hop/amapiano they're just part of "the beat" | Fold into the beat half; mention the log-drum/drum pattern as provenance |
| "Started 75 / developed 25" presented as the rule | No industry basis; real norms are equal-in-the-room or negotiated | Keep as a configurable Sawa clause; add a **materiality floor** (a one-word tweak earns nothing; changing a line earns development) and consider 60/40 or 50/50 as alternatives |
| No samples / loops / interpolations | Every hip-hop/Afro session lives on loops and references; third-party shares come off the top | Add `third-party` element type with clearance status; take its % first, split the rest |
| MIDI hook file as evidence of origination | Producers routinely transcribe a sung hook to MIDI; MIDI after a memo is development | Already handled by time order; make the explanation say "transcribed" |
| Same file hash on both devices | A memo sent over WhatsApp is re-encoded (.m4a → .opus), so hashes **will not** match | Match by audio fingerprint / duration + chat attachment link; treat hash match as "same export", not "same content" |
| All timestamps in EAT in the seed | Malik's DAW and phone are in New York time (EDT, UTC-4 until 1 Nov 2026, then EST UTC-5); Nairobi is UTC+3 with no DST: a 7-hour gap. Real disputes hinge on "who was first" | Store UTC + device time zone per record; make a time-zone trap part of the demo story (see 7.4) |
| Master 50/50 "because each paid for their own sessions" | Realistic for an indie co-owned record, good. But real masters are about **who paid** and producer **points** | Model payments as evidence; support "owner %" + "producer points" + "feature" separately; mention KAMP (Kenya master/producer CMO) and SoundExchange letter of direction |
| AI-generated material "owned by no one", editor gets development share | Correct direction (USCO, ASCAP/BMI/SOCAN, Kenya Tribunal). But a human who only re-arranged a generated loop does not "develop" the generated notes into his own authorship; only his perceptible additions count | Keep the rule; phrase it as "only the human additions are authored"; disclose excluded material using DDEX categories (composition, instrumentation, vocals, lyrics, post-production); record tool + plan (ownership depends on tier) |
| Assistive AI not distinguished | Stem separation, mastering, noise cleanup are what most producers actually use; they never affect splits | Add an `ai-assist` kind that is disclosed (post-production) but has zero effect on authorship |
| "MCSK registration" (if anywhere in UI/copy) | MCSK has no operating licence since late 2025; royalties go via e-Citizen; KAMP and PAVRISK are the licensed CMOs | Say "register with your collecting society (in Kenya, check KECOBO's current list)"; show composition vs master vs performer CMOs separately |

#### 7.3 Evidence types, ranked by how much they should move a decision

1. **Contemporaneous, independently timestamped artefacts with a link between people**: a WhatsApp/iMessage message with an attachment (proves both creation-before-T and **access**), cloud-hosted lyric doc version history (per-account attribution), Drive/Dropbox upload times.
2. **Signed prior agreements and licences** (split policy, beat lease, loop licence, voice consent). These override presets.
3. **Payments** (M-Pesa, Cash App, studio invoice): decide **master**, not composition.
4. **Device-local artefacts** (voice memo, DAW project + autosave backups, MIDI, bounces): strong for "what existed", weaker for "when" (local clocks, time zones, metadata lost on copy).
5. **Admissions in chat** ("this hum is fire, imma build the beat around it"; "verse two is yours"): very strong, since they're statements against interest. Sawa already uses these well.
6. **Recollections / claims made after a dispute starts**: weakest; only break ties.
7. **AI tool logs** (prompt, generation time, plan): decide what is unowned.

Also model **access** explicitly (Mpishi turned on it): a claim that B copied A requires evidence B received A's material before B's own earliest artefact.

#### 7.4 A realistic demo story (Harlem producer + Nairobi singer-songwriter)

Keep Wanjiru and Malik; make these details true to life:

- **Malik (Harlem)**: makes beats in **FL Studio** (more typical for a Harlem hip-hop/afro-swing producer than Ableton, though either is fine), sells leases online, sends **beat packs** of tagged MP3s by email/IG DM, stems on request. He sometimes starts from a **Splice loop** or a purchased loop kit, and he used **AI stem separation** to clean Wanjiru's phone memo (assistive) and an **AI generator for a drum loop** (generative, disclosed).
- **Wanjiru (Nairobi)**: singer-songwriter, writes in **Swahili, Sheng and English**, hums ideas into her **phone's voice recorder**, sends them as **WhatsApp voice notes**, keeps lyrics in a **shared Google Doc**, tracks vocals at a Nairobi studio she pays per session (receipt via **M-Pesa**).
- **How it starts**: Malik's beat pack hits her WhatsApp ("biti hii ni moto"); she records a 40-second hook hum over it the same night; he replies "imma build the beat around it". This is how the scene actually works.
- **The trap** (great for showing the agents' reasoning): on 12 September, Malik's FL Studio autosave shows a lead-synth hook pattern at "4:00 PM" and Wanjiru's memo shows "9:40 PM". Read naively, his came first. But his laptop is on EDT (UTC-4) and her phone on EAT (UTC+3): normalised, her hum is 18:40 UTC and his pattern is 20:00 UTC, so she was first, and his pattern (made 80 minutes after her WhatsApp voice note arrived) is a transcription, i.e. development. Also show the hash mismatch: her .m4a vs his WhatsApp-received .opus, matched by duration/fingerprint + the chat attachment.
- **The dispute trigger**: a sync request or a distributor needing splits before release (both realistic), or Malik's lease paperwork saying "producer retains 50% publishing" while Wanjiru thought she bought the beat outright (very realistic Kenya/US mismatch: fee-for-beat vs publishing-share cultures).
- **Outcome shown on the sheet**: Composition under "Beat and Topline" (or the Jua prior agreement); master per who paid (her vocal sessions, his beat production), with producer points if they chose that; AI disclosure: "instrumentation: AI-generated drum loop, edited by Malik (excluded from authorship); post-production: AI stem separation"; voice consent: "AI voice of Wanjiru for demo only"; registrations: Malik with ASCAP/BMI (IPI), Wanjiru with her Kenyan CMO subject to KECOBO licensing, master/neighbouring rights via SoundExchange and KAMP/PAVRISK; status "signed" or "**unresolved**".

#### 7.5 Plain-language terms artists actually use (put these in the UI)

- **Beat** / **track** / **instrumental**; **topline** (melody + lyrics over a beat); **hook** (chorus or catchy repeated line); **verse**; **bridge**; **ad-libs** (usually no writing credit).
- **Split** / **split sheet** / "**splits**"; "**the room**" ("everyone in the room splits equal"); "**one word, one third**".
- **Pub** / **publishing** / **writer's share** / **publisher's share**; **PRO** (ASCAP, BMI); **IPI**; "**words and music**".
- **Master** / **masters**; **points** ("3 points"); **backend**; **fee**; **work for hire**; **letter of direction**.
- **Lease** vs **exclusive**; **beat pack**; **placement**; **tagged** beat; **stems**; **bounce**; **reference**/**demo**; **session**; **voice note** / **voice memo**.
- **Sample** (cleared/uncleared), **interpolation**, **loop**, **loop kit**, **co-prod**.
- **Feature** ("feat."), **cut-in**.
- Kenya: "the **audio**" (the recorded song, vs the video), "**producer**" also means the studio engineer, **Skiza** tune, **e-Citizen** royalties, **KECOBO**, **KAMP**, **PAVRISK**, **MCSK**. Sheng like "biti" (beat), "ngoma" (song), "kolabo" (collab) are common in conversation but use sparingly and let a Kenyan check them.

#### 7.6 Copy and product guardrails

- Never present a percentage as "the industry standard"; say "the usual starting point in hip-hop" or "your Jua agreement".
- Always produce **two** outputs: composition split (sums to 100% of human authorship) and master split (owners + points), plus an AI disclosure block and a consent block.
- Support an explicit **"unresolved"** state and show what evidence would resolve it.
- Say clearly Sawa is not legal advice; real deals often get a lawyer's long-form agreement (Herstand, CD Baby both say this).

---

### Source list (main)

- Songtrust, How split sheets work: https://blog.songtrust.com/how-split-sheets-work
- Ari Herstand, Producer splits (updated Sept 2025): https://aristake.com/producer-splits/
- CD Baby DIY Musician, Producer publishing: https://diymusician.cdbaby.com/music-rights/does-my-producer-deserve-publishing-and-songwriting-credit/
- Amuse, artist/producer splits: https://www.amuse.io/en/content/how-to-split-royalties-between-artists-and-producers
- Orphiq, split sheets / producer royalties: https://orphiq.com/resources/split-sheets , https://orphiq.com/resources/producer-royalties-explained
- Hypebot, producer points: https://www.hypebot.com/music-producer-points-what-are-they/
- APRA AMCOS, co-writing splits: https://www.apraamcos.com.au/resources/member-tools/co-writing-splits-and-registering-your-works
- Stereogum, The Pact letter: https://stereogum.com/2122638/prominent-songwriters-sign-letter-calling-for-artists-to-stop-demanding-credit-for-songs-they-didnt-write/news
- MN2S split sheets: https://mn2s.com/news/label-services-resources/how-to-use-a-split-sheet-when-you-collaborate-on-a-dance-track/
- Downtown Music Africa, producer credits: https://downtownmusic.africa/producer-credits-avoid-the-he-did-the-beat-problem-roles-splits-and-pre-release-agreements/
- Afrocritik, beat licences: https://afrocritik.com/beat-licences-publishing-rights-what-african-artistes-keep-getting-wrong/
- Daily Nation, Kenyan producers and contracts: https://nation.africa/kenya/news/lamentations-of-music-producers-who-are-missing-out-on-royalties-of-kenyan-oldies-for-lack-of-contracts-4248804
- Capital FM, Mpishi ruling: https://capitalfm.africa/tribunal-clears-matata-in-copyright-row-over-mpishi-aiyaya-hit-song/
- CIPIT Strathmore, Kenyan CMOs: https://cipit.strathmore.edu/the-collective-management-organisations-in-kenyas-creative-market/
- Citizen Digital, MCSK hearing: https://citizen.digital/news/court-directs-full-hearing-in-royalty-collection-case-against-mcsk-n374485
- People Daily, e-Citizen directive: https://peopledaily.digital/insights/what-rutos-e-citizen-royalties-directive-means-for-musicians
- Citizen Digital, Kenyan creators and AI: https://citizen.digital/article/kenyan-creators-betting-on-ai-models-to-produce-hit-songs-as-copyright-puzzle-lingers-n386143
- Techweez, Kenyan Tribunal on AI works: https://techweez.com/2026/09/08/ai-generated-content-copyright-kenya/
- Mondaq, Kenya Copyright Bill 2026: https://www.mondaq.com/copyright/1796350/kenya-introduces-new-copyright-bill
- Copyright Alliance, USCO Part 2 summary: https://copyrightalliance.org/ai-report-part-2-copyrightability/
- BMI, ASCAP/BMI/SOCAN AI registration: https://www.bmi.com/news/entry/ascap-bmi-and-socan-announce-alignment-on-ai-registration-policies
- GEMA AI checkbox: https://www.gema.de/en/w/help/creators/works-repertoire/submit-a-notification-for-your-works/confirm-work-not-created-exclusively-by-ai
- CISAC AI study: https://www.cisac.org/Newsroom/news-releases/global-economic-study-shows-human-creators-future-risk-generative-ai
- Spotify AI protections: https://newsroom.spotify.com/2025-09-25/spotify-strengthens-ai-protections/
- Spotify AI credits: https://support.spotify.com/article/ai-credits/
- Interspace, DDEX AI disclosure: https://interspacemusic.com/blog/ai-disclosure-just-became-a-delivery-field-your-distributors-ddex-pipeline-is-now-the-referee/
- MBW, UMG/Udio: https://www.musicbusinessworldwide.com/universal-music-settles-udio-lawsuit-strikes-deal-for-licensed-ai-music-platform
- Music Week, WMG/Suno: https://www.musicweek.com/public_html/index.php/labels/read/warner-music-group-settles-lawsuit-and-signs-ai-licensing-deal-with-suno/093129
- DMN, Suno/UMG impasse: https://www.digitalmusicnews.com/2026/04/09/suno-universal-music-lawsuit-settlement-impasse/
- Music Connection, Sony sues Udio again: https://www.musicconnection.com/sony-sues-udio-again/
- MusicTech, Tracklib 2025 survey: https://musictech.com/news/industry/music-producers-are-rejecting-ai-study-reveals-over-80-of-producers-are-against-ai-generated-songs
- Ari's Take, LANDR 2025 survey: https://aristake.com/ai-tools-musicians-study/
- DJ Mag, Deezer >50%: https://djmag.com/news/ai-generated-music-surpasses-50-of-daily-uploads-deezer
- Fortune, BBL Drizzy: https://fortune.com/2024/06/06/metro-boomin-bbl-drizzy-drake-kendrick-ai-beats-pay
- Stereogum, Timbaland/K Fresh: https://stereogum.com/2312616/timbaland-apologizes-to-producer-amid-ai-record-label-controversy/news
- Mixmag, Grimes Elf.Tech: https://mixmag.net/read/grimes-software-elftech-mimic-voice-percent-royalties-news
- Proskauer, ELVIS Act: https://www.proskauer.com/blog/the-king-is-back-in-the-digital-era-the-elvis-act-generative-ai-and-right-of-publicity
- YouTube, NO FAKES Act: https://blog.youtube/news-and-events/youtube-supports-the-no-fakes-act/
- BOOM, Ed Sheeran trial: https://www.boomlive.in/explainers/ed-sheeran-shape-of-you-copyright-trial-high-court-17103
- TrueScreen, WhatsApp voice notes as evidence: https://truescreen.io/insights/whatsapp-voice-notes-court-evidence/
- Splice, exporting stems: https://splice.com/blog/exporting-stems-collaboration-splice/
- Sound Credit, AI credits: https://soundcredit.com/blog/sound-credit-introduces-ai-credits
