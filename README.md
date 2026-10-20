# Sawa

**Two creators. Two memories. One split sheet.**

Sawa gives each co-writer of a song an Omega agent that remembers their side of the session. The two agents start in disagreement about who wrote what, exchange evidence, reason with Omega's NAL, and **each independently reaches the same split sheet**, proven by matching proof hashes. Every share explains itself in English and Swahili, either writer can contest any premise, and nothing counts until both sign.

> **Status (20 October 2026, 12:45 EAT): planning complete, build not started.** This README describes the planned submission. Sections marked *(after build)* are filled in once the code in `build/` exists. See [docs/build.md](docs/build.md) for the plan.

| | |
|---|---|
| **Hackathon** | BASIX State of the Art Hackathon, 18 to 21 October 2026 |
| **Track** | Track 2: MeTTa and Omega (Builders), **Omega AI Agents** |
| **Challenge** | **Two Agents, One Truth**: "two agents disagree about a fact and reason to a shared answer" |
| **Art brief** | AI for Peace: "two communities' accounts of one event, mediated to one story" (partner brief, a proposal until the partner confirms it) |
| **Team** | Technetians: Eugene Mutembei |
| **Live demo** | *(after build)* |
| **Video** | *(after build)* |
| **Data** | 100% synthetic. No partner catalogue, artwork, recording or real person is used |

---

## The Problem

Co-writers remember the making of a song differently, and that difference freezes the song's money. When co-writers register conflicting shares, collecting societies hold all of the money until it is resolved, and licensing platforms cannot pay out without agreed splits. Producer against topliner, recollection against recollection: the fights end collaborations and go to court (Tyla's "Water" is a recent African example). The hackathon's own principles say the fix: **"splits are agreed before anything is built"** and **"one split sheet for every co-writer, signed in the session."** Full argument: [docs/problem.md](docs/problem.md).

## The Solution

Wanjiru (Nairobi) hummed a hook into a voice memo and sent it to Malik (Harlem), who built a beat around it. Two weeks later his draft split says 65 / 35 and hers says 60 / 40.

1. **Disagree.** Each writer's Omega agent holds only its owner's memory and drafts a split from it.
2. **Exchange.** The agents swap evidence as atoms (hashes, timestamps, who received what), never the audio.
3. **Reconcile.** Each agent, on its own, applies defeater rules ("received before created", "recollection after dispute"), merges evidence with NAL revision, and keeps only statements in Omega's act band. Both reach the same split and the same proof hash: **one truth**.
4. **Explain and contest.** Every share has a clause trail in English and Swahili. Either writer can withdraw a premise with a reason; both agents recompute.
5. **Sign.** Both writers sign in the session; the record is hashed; composition and master are tracked apart; stems stay in the vault.

Full design: [docs/solution.md](docs/solution.md).

## How It Uses Omega

| Omega capability | In Sawa |
|---|---|
| `lib_nal.metta` (v0.1.20, unmodified) | Defeaters as NAL deduction; evidence merged by NAL revision; truth values on every statement |
| Memory with episodic replay | Each agent's append-only memory replayed into its own atom space |
| Rules as atoms | Versioned rule pack and the writers' agreed split policy |
| Action thresholds (f ≥ 0.6, c ≥ 0.5) | Only settled statements produce shares; others block signing |
| Auditable inference | Clause trail and proof hash |

> **Jev reads. Omega decides. The writers confirm, contest and sign.** TypeSafe Jev only reads chat messages into typed credit statements that the message's author confirms.

## Architecture

```
Browser (Next.js, shadcn/ui) ── session event log ──▶ FastAPI
                                                     ├── Harlem agent  (own MeTTa space, own memory)
                                                     └── Nairobi agent (own MeTTa space, own memory)
                                                           Omega lib_nal.metta on Hyperon 0.2.10
```

Details: [docs/build.md](docs/build.md) section 3.

## Run It *(after build)*

```bash
git clone <repo-url>
cd AI-OMEGA-AGENT-DEV-BUILDATHON/build
cp .env.example .env        # TYPESAFE_API_KEY is optional
make setup
make dev                    # API on :8000, web on :3000
```

## Test It *(after build)*

```bash
cd build && make test
```

## Repository Map

| Path | What |
|---|---|
| `docs/info.md` | Everything about the hackathon, with sources |
| `docs/problem.md` | The problem, the alternatives, how we chose |
| `docs/research.md` | Evidence library and verified technical tests |
| `docs/solution.md` | The product and why it works |
| `docs/build.md` | Engineering spec, demo script, time plan |
| `AI_DISCLOSURE.md` | Every AI tool used and what for |
| `build/` | All code *(after build)* |

## AI Disclosure

AI tools were used to research, plan, write and build this project. Full list: [AI_DISCLOSURE.md](AI_DISCLOSURE.md).

## What's Next

More than two writers; audio evidence as truth-valued input; a live "split sheet in the session" that records contributions as they happen; royalty statements checked against the signed split; collecting-society export; on-device agents; governed policy updates with a visible diff.

## Limitations

Sawa records an agreement between writers; it is not legal advice or arbitration. It cannot judge audio similarity. All data is synthetic. Incantio and BASIX.MARKET integrations are concepts pending partner confirmation.

## Credits

- **SingularityNET Omega** (`singnet/Omega`, Apache-2.0): `lib_nal.metta`, used unmodified.
- **Hyperon** (`hyperon` on PyPI, MIT): MeTTa runtime.
- **Prior work, our own:** the engine host pattern (loading Omega's NAL on Hyperon, firing rules as NAL deduction chains, append-only memory) is adapted from **Mizani**, our entry to the previous BASIX hackathon (https://github.com/CodeWithEugene/Basix-Hackathon). Everything domain-specific is new work in this hackathon.
- **shadcn/ui** (MIT), **Next.js** (MIT), **FastAPI** (MIT), **TypeSafe** SDK.

## License

[MIT](LICENSE.md). Third-party components keep their own licences.
