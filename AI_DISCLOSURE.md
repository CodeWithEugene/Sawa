# AI Disclosure

Using AI is allowed in this hackathon; hiding it is not (rule 3). This file lists every AI tool used to make Sawa and what each was used for. It is updated as the work continues.

## Tools Used

| Tool | Provider | Used for |
|---|---|---|
| **Claude Code** (model Claude Opus 5.5) | Anthropic | Reading the official hackathon documents; running three parallel research subagents (technology, domain and judges, our previous playbook); writing the docs in `docs/` and the root markdown files; writing and testing the code in `build/` (after approval); scripting the video pipeline |
| **TypeSafe Jev** (`jev-1.13.0` via `jev-latest`) | TypeSafe | (1) Scoring six candidate ideas against the rubric as an independent check (requests `req_01a1588b65947345854aa89dda9203e0` and `req_01a1588b86207d0194ad2fa4f1ec2b1d`, see `docs/problem.md` section 5). (2) In the product: reading chat messages into typed credit statements that the message's author confirms. Jev never produces a share, a rule or an explanation |
| **Claude Code subagents** (same model) | Parallel research streams (hackathon and judges, Omega and MeTTa, music industry practice and AI rules, our previous playbook), and building individual product pages (Developers, Product, Technology, For Artists, For Platforms, Trust And Safety, About) against a shared design system; every page was reviewed and integrated by the lead session |
| **KittenTTS 2** (`KittenML/kitten-tts-2`, emb4 weights), run locally | Narration of the demo video in **the builder's own cloned voice**, from a 20-second reference recording Eugene made of himself for this purpose |
| **Pixabay music** via OpenMontage's `pixabay_music` tool | Background music for the video (Pixabay licence) |

## What AI Did Not Do

- No AI model decides or explains any share in Sawa. Shares come from Omega's NAL reasoning over evidence the writers supplied, under the writers' own agreed policy; explanations are templates filled only from the proof.
- No partner data, artwork, recording or real person's data was given to any AI tool.

## Human Responsibility

Eugene Mutembei (Team Technetians) chose the problem, reviewed and approved the plan before any code was written, directed the design (including the visual direction, the reference layout and every revision of the site), reviews the Swahili text, recorded the voice reference, and is accountable for everything submitted.

## Prior Work

The engine host pattern is adapted from our previous entry, Mizani (https://github.com/CodeWithEugene/Basix-Hackathon), which was also built with Claude Code and disclosed there.
