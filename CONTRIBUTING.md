# Contributing To Sawa

Thank you for helping. Sawa is a prototype that helps co-writers reach a split sheet with two SingularityNET Omega agents. Because it touches people's credit and income, contributions follow a few extra rules on top of the usual ones.

## Ground Rules

1. **Synthetic data only.** Never commit real recordings, real chat logs, real names of private people, or any partner catalogue (Incantio, AI for Peace, HFAS, Harlem CLxR) without documented permission. Use the synthetic songs in `build/agent/sawa/seed.py` or add invented ones, labelled as synthetic.
2. **No LLM decisions.** Language models (including Jev) may only read messages into typed credit statements that the message's author confirms. They must never produce a share, a percentage, a rule or an explanation.
3. **Policy is the writers', not ours.** Element weights and origination splits live as atoms in the rule pack and must stay visible and editable. Do not hardcode shares in Python.
4. **Omega stays unmodified.** `build/agent/vendor/omega/lib_nal.metta` is Omega's file as released. Shims go in `build/agent/metta/shims.metta`.
5. **Every rule change bumps the pack version** (`split-v1` to `split-v1.1`) and comes with a test.
6. **Copy rules for the UI.** Title Case for page titles, headings, card titles and buttons. Sentence case for body and helper text. No em dashes or en dashes in any user-facing text.
7. **Pure shadcn/ui.** UI uses shadcn/ui components, Tailwind utilities and lucide icons. Generated components in `build/web/components/ui/` are not hand-edited; compositions live in `build/web/components/sawa/`.

## Development Setup

Prerequisites: Python 3.12, `uv`, Node 20+, `pnpm`.

```bash
git clone <repo-url>
cd AI-OMEGA-AGENT-DEV-BUILDATHON/build
cp .env.example .env
make setup
make dev
```

Package managers: **uv** for Python and **pnpm** for JavaScript. Do not use npm or yarn, and do not commit `package-lock.json` or `yarn.lock`.

## Tests

```bash
cd build && make test
```

- Reasoning changes need tests that pin shares, statement bands, premise statuses and truth values.
- The convergence property (same evidence and pack, same hash) must always hold.
- Aim for 80% or more coverage of `build/agent/sawa/`.

## Commits And Pull Requests

- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`, `perf:`, `ci:`.
- One logical change per pull request, with what changed, why, and how it was tested.

## Reporting Problems

- Bugs and ideas: open a GitHub issue with steps to reproduce.
- Fairness concerns (a rule that could systematically under-credit a kind of contributor): open an issue with the label `fairness`.
- Security: see [SECURITY.md](SECURITY.md). Conduct: see [CODE-OF-CONDUCT.md](CODE-OF-CONDUCT.md).

## License

By contributing you agree that your contributions are licensed under the [MIT License](LICENSE.md).
