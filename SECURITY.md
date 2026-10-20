# Security Policy

Sawa is a hackathon prototype that helps co-writers reach a split sheet. It handles **synthetic data only**. This policy covers how to report problems and how the project protects data, secrets and people's credit.

## Supported Versions

| Version | Supported |
|---|---|
| `main` (hackathon prototype, October 2026) | Yes |
| Anything else | No |

## Reporting A Vulnerability

Please **do not open a public issue** for security problems.

1. Use GitHub's private vulnerability reporting on this repository (**Security** tab, then **Report a vulnerability**).
2. Include what you found, how to reproduce it, the impact you expect, and any suggested fix.
3. You will get an acknowledgement within 72 hours and a status update within 7 days.

Integrity issues (a way to make the two agents report agreement when they did not reach it, or to change a share without a recorded reason) are treated with the same priority as security issues.

## What We Protect And How

### Secrets

- The only secret is `TYPESAFE_API_KEY` (optional). It lives in a git-ignored `.env` or server environment variables, never in code, never in the browser, never in logs.
- `.env.example` contains placeholders only.
- A committed secret is treated as exposed: rotate it, then remove it from history.

### Data

- No real recordings, chat logs, or private persons' data in the repository, the demo, screenshots or the video.
- Stems and audio never leave a writer's vault; only SHA-256 hashes are exchanged.
- Jev requests carry only the text of a message the writer selected; request ids are logged, message bodies are not.

### Reasoning Integrity

- User input never enters MeTTa as code. Ids are validated against `^[A-Za-z0-9_-]{1,40}$`; event types and writers are enums; free-text reasons are stored as escaped strings outside rule bodies.
- Each agent's memory is an append-only event log replayed on every request; the audit view is that log.
- "One truth" is shown only when the two agents' proof hashes are equal; the hash covers the evidence, the rule pack version and every step.
- Omega's `lib_nal.metta` is vendored unmodified at a pinned release.

### Web App

- The browser calls only the Sawa API; no authentication in the prototype (writers are a labelled demo switcher). A real deployment needs authentication, per-writer keys for signing, and rate limiting.

## Scope

In scope: this repository's code and configuration. Out of scope: vulnerabilities in upstream projects (report those to Omega, Hyperon, shadcn/ui or TypeSafe), and social engineering.
