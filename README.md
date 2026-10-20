# Sawa

**Make it together. Split it fairly.**

Sawa helps co-writers settle who wrote what, fairly and on the record, so the music they make together can be licensed and paid. Each writer gets a SingularityNET **Omega** agent that remembers their side of the session. The two agents start in disagreement, weigh the evidence (voice memos, project files, lyric edits, chats), and **each independently reaches the same split sheet**, proven by matching agreement IDs. Every share explains itself in English and Kiswahili, either writer can challenge any piece of evidence, AI-generated parts are disclosed and owned by no one, and nothing counts until both writers sign.

| | |
|---|---|
| **Live product** | **https://sawa.codewitheugene.top** |
| **Guided demo** | https://sawa.codewitheugene.top/session/amani-ni-sisi |
| **API docs (with live console)** | https://sawa.codewitheugene.top/developers |
| **Hackathon** | BASIX State of the Art Hackathon, 18 to 21 October 2026 |
| **Track** | Track 2: MeTTa and Omega (Builders), **Omega AI Agents** |
| **Challenge** | **Two Agents, One Truth**: "two agents disagree about a fact and reason to a shared answer" |
| **Art brief** | AI for Peace: "two communities' accounts of one event, mediated to one story" (here: a Harlem producer's and a Nairobi songwriter's accounts of one co-write). Partner briefs are proposals until partners confirm them |
| **Team** | Technetians: Eugene Mutembei (solo) |
| **Video** | 2:50 demo, narrated in the builder's cloned voice, uploaded with the BASIX entry |
| **Slides** | [docs/Sawa Pitch Deck.pdf](docs/Sawa%20Pitch%20Deck.pdf) |
| **Data** | 100% synthetic. No partner catalogue, recording or real person is used |

---

## What It Does

Wanjiru (Nairobi) hummed a hook into a voice memo and sent it to Malik (Harlem), who built a beat around it. Weeks later a buyer wants to license the song. Malik's version gives him 77.5%; Wanjiru's gives her 40%. Until they agree, nobody gets paid.

1. **Their versions differ.** Each writer's agent knows only its owner's side.
2. **Share evidence.** The agents exchange file fingerprints and messages, never audio.
3. **Find the fair split.** Each agent, on its own atom space, applies defeaters ("received before created", "memory written after the dispute", "edited after the AI made it"), merges evidence with NAL revision, and keeps only what passes Omega's action threshold. Both reach **Wanjiru 39.7% / Malik 60.3%** with the **same agreement ID**.
4. **See why, and challenge it.** Every share has plain-language reasons in English and Kiswahili; a switch reveals truth values, defeaters and revision steps. Malik challenges his own chat message; both agents recalculate; the answer holds because the memo still came first.
5. **AI, on the record.** The drum groove came out of an AI generator: it is disclosed, Malik is credited only for his edit, and 15 points of the song belong to no one. A voice model of Wanjiru was used for a demo, so signing requires her recorded consent (present: "demo only").
6. **Sign in the session.** Both sign; the signed split sheet keeps the recording (master) split apart, names every rights holder, carries the AI disclosure and a SHA-256 record ID.

## The Product

| Page | For | What |
|---|---|---|
| [Home](https://sawa.codewitheugene.top) | Everyone | The promise, the problem, how it works, AI music, technology |
| [Product](https://sawa.codewitheugene.top/product) | Evaluators | Features, the signed record, comparison |
| [For Artists](https://sawa.codewitheugene.top/artists) | Songwriters and producers | What to bring, how splits are weighed, FAQ |
| [For Platforms](https://sawa.codewitheugene.top/platforms) | Licensing platforms, labels, collecting societies | The signed record, integration |
| [Developers](https://sawa.codewitheugene.top/developers) | Integrators | API reference, events, schema, live console, SDK examples |
| [Technology](https://sawa.codewitheugene.top/technology) | Technical reviewers | Omega agents, MeTTa rules, NAL worked example, proof hashes |
| [Trust And Safety](https://sawa.codewitheugene.top/trust) | Everyone | Consent, privacy, AI policy, fairness, limitations |
| [About](https://sawa.codewitheugene.top/about) | Everyone | Team, hackathon, roadmap, credits, AI disclosure |
| [Demo](https://sawa.codewitheugene.top/session/amani-ni-sisi) | Everyone | Guided, interactive, English and Kiswahili |

The site map comes from user-journey research: [docs/user-journeys.md](docs/user-journeys.md).

## How It Uses Omega

| Omega capability | In Sawa |
|---|---|
| `lib_nal.metta` (v0.1.20, unmodified) | Every piece of evidence gets its truth value from one NAL deduction; evidence is merged by NAL revision (`|-nal`) |
| Rules as atoms, versioned | Reliability rules, defeaters D1 to D3, and the writers' split policy are atoms in `split-v1`; a version mismatch blocks agreement |
| Memory with episodic replay | Each agent's append-only memory is replayed into its own MeTTa atom space on every request |
| Action thresholds (f ≥ 0.6, c ≥ 0.5) | Only settled statements produce shares |
| Auditable inference | Reasons per share, a reasoning-details view, and SHA-256 proof hashes that must match across both agents |

> **Jev reads. Omega decides. The writers confirm, challenge and sign.** TypeSafe Jev only reads chat messages (Sheng, Swahili, English) into typed credit statements that the message's author confirms. No language model decides or explains a share.

## Architecture

```
Browser (Next.js 16, shadcn/ui, WebGL hero)
   │  session event log (client-held), POST /api/session/run
   ▼
FastAPI on Vercel (Python 3.12)
   ├── Harlem agent   own hyperon MeTTa space, own memory
   └── Nairobi agent  own hyperon MeTTa space, own memory
         Omega lib_nal.metta (v0.1.20) + metta/sawa.metta + packs/split-v1.metta
   └── TypeSafe Jev (server-side, optional)
```

## Run It

Prerequisites: Python 3.12, [uv](https://docs.astral.sh/uv/), Node 20+, pnpm.

```bash
git clone https://github.com/CodeWithEugene/Sawa.git
cd Sawa/build
cp .env.example .env          # TYPESAFE_API_KEY is optional
make setup                    # uv sync + pnpm install
make dev                      # API on :8000, web on :3100
```

Open http://localhost:3100.

## Test It

```bash
cd build && make test         # 22 pytest tests (NAL math, defeaters, convergence, AI, consent, API), typecheck, lint
```

The tests pin the reasoning: hand-checked NAL deduction and revision, each defeater firing only where it should, equal hashes after exchange and different hashes before, rule-version mismatch never converging, AI parts owned by no one, signing blocked without voice consent, and validation of every API input.

## Repository Map

| Path | What |
|---|---|
| `build/agent/metta/` | MeTTa: `sawa.metta` (derivation, defeaters, bands, shares, consent), rule packs |
| `build/agent/vendor/omega/` | Omega `lib_nal.metta`, unmodified, with its licence |
| `build/agent/sawa/` | Python host: engine, memory replay, reconciliation, session, explanations, Jev, API |
| `build/agent/tests/` | pytest suite |
| `build/web/` | Next.js product site and demo |
| `build/api/index.py` | Vercel entry |
| `docs/` | Hackathon info, problem, research (including music industry research), solution, build plan, user journeys |
| `AI_DISCLOSURE.md` | Every AI tool used and what for |

## AI Disclosure

AI tools were used to research, plan, write, design and build Sawa, and to voice the demo video in the builder's own cloned voice. Full list: [AI_DISCLOSURE.md](AI_DISCLOSURE.md).

## What's Next

More than two writers; audio evidence as truth-valued input; live capture during the session; royalty statements checked against the signed split; collecting-society export (KAMP, PAVRISK, ASCAP, BMI formats); on-device agents; governed policy presets (room split, custom agreements) with visible diffs; Incantio and BASIX.MARKET integration (concepts pending partner confirmation).

## Limitations

Sawa records an agreement between writers; it is not legal advice or arbitration. It cannot judge audio similarity. The prototype has no authentication. All demo data is synthetic.

## Credits

- **SingularityNET Omega** (`singnet/Omega`, Apache-2.0): `lib_nal.metta`, used unmodified.
- **Hyperon** (MIT): MeTTa runtime.
- **TypeSafe Jev**: reading chat messages into typed credit statements.
- **Prior work, our own:** the engine host pattern (Omega NAL on Hyperon, append-only memory) is adapted from **Mizani**, our entry to the previous BASIX hackathon (https://github.com/CodeWithEugene/Basix-Hackathon). Everything specific to music credit is new work in this hackathon, visible in the commit history.
- shadcn/ui (MIT), Next.js (MIT), FastAPI (MIT), Geist (OFL), lucide (ISC).

## License

[MIT](LICENSE.md). Third-party components keep their own licences.
