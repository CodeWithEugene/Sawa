# User Journeys And Information Architecture: Sawa

> **What this file is.** Who comes to Sawa, what they are trying to get done, where they arrive from, what they need to see to trust it, and where each journey ends. The site map follows from these journeys. Personas are composites built from the music research in [research.md](research.md) and the industry report in the session scratchpad (split-sheet customs, beat and topline norms, Kenyan collecting-society context, AI disclosure rules). No real person is represented.
>
> **Status:** v1.0, Tuesday 20 October 2026, about 14:15 EAT.

---

## 1. Audiences

| # | Audience | Who | Primary job to be done | What would make them leave |
|---|---|---|---|---|
| A1 | **Songwriter / topliner** | Wanjiru, 26, Nairobi; writes in Swahili, Sheng and English; voice memos on her phone | "Make sure I'm credited for what I wrote before the song is pitched" | Jargon; English only; feeling the tool sides with the producer |
| A2 | **Producer** | Malik, 31, Harlem; FL Studio; sends beat packs to five countries | "Close the split fast so the song can be licensed, without a fight" | Slow; pushes him to give up the beat's half; no way to argue |
| A3 | **Licensing platform / label / collecting society** | Incantio, BASIX.MARKET, a sync buyer, KAMP or MCSK staff | "Only list or pay out songs whose splits are agreed and on the record" | No machine-readable record; no API; no audit trail |
| A4 | **Developer / integrator** | Engineer at a platform or a distributor | "Call Sawa from our product and store the signed record" | No docs; no examples; unclear schema |
| A5 | **Evaluator** | Hackathon judges (SingularityNET engineers, BASIX and XRAgency founders, Harlem CLX) | "Is this real, does it use Omega properly, would an artist trust it, could BASIX incubate it?" | Demo-only site; reasoning hidden; no product thinking |

---

## 2. Journeys

### J1. Songwriter: "Was I credited fairly?" (A1)

| Stage | Doing | Thinking / feeling | What Sawa shows | Page |
|---|---|---|---|---|
| Discover | Producer sends a Sawa link; or she hears of it from a writing camp | "Another app that will side with the producer?" | Plain promise: each writer has their own agent; nothing counts until both agree | Home |
| Understand | Reads how it works | "What do I need to bring? Will my memos leak?" | What to bring; audio never leaves your phone, only fingerprints | For Artists |
| Try | Opens the demo | "Show me" | Guided demo with Wanjiru as the example | Demo |
| Trust | Reads why her share is what it is, in Swahili | "It shows my memo came first" | Reasons per share, in her language; challenge button | Demo (split sheet) |
| Act | Signs | Relief | Signed split sheet with AI disclosure | Demo (sign) |
| After | Shares the signed sheet with a platform | "Now it can be licensed" | Record ID, ready for licensing | Demo (record) |

### J2. Producer: "Settle it fast, credit my beat" (A2)

Discover (Home) → sees that the beat is half the song by default (For Artists, "How splits are weighed") → tries the demo → sees his MIDI counted as developing her hook, reads why, challenges his own message, sees the result hold → signs. Key need: **transparency about the rules before he starts** and **AI parts handled fairly** (his edit of AI drums is credited).

### J3. Licensing platform: "Can we gate listings on this?" (A3)

Home → **For Platforms** (what a signed record contains; composition and master apart; AI disclosure; why both agents must agree) → **Developers** (API, record schema) → **Trust & Safety** (consent, audit log) → contact. Needs an integration path and proof the record is tamper-evident.

### J4. Developer: "Integrate in an afternoon" (A4)

**Developers** page directly (from For Platforms or GitHub) → quickstart (`curl` health, run a session) → event model → response schema → live console that calls the real API → GitHub. Needs copy-paste examples in curl, JavaScript and Python.

### J5. Evaluator: "Score this in ten minutes" (A5)

Home (clear problem and promise) → **Demo** with guided steps (2 minutes) → **Technology** (Omega agents, MeTTa rules shown as code, NAL truth values, proof hashes, tests) → **About** (team, hackathon fit, what's next, credits, AI disclosure) → GitHub. Needs: the reasoning visible on demand, a direct map to the rubric and the challenge, honest limitations.

---

## 3. Information Architecture

```
Home  /
├── Product            /product          what it is, how it works, features, the signed record
├── For Artists        /artists          songwriters and producers: what to bring, how splits are weighed, FAQ
├── For Platforms      /platforms        licensing platforms, labels, collecting societies: the record, integration
├── Developers         /developers       API quickstart, endpoints, events, schema, live console
├── Technology         /technology       Omega agents, MeTTa rules, NAL, proof hashes, Jev, tests
├── Trust & Safety     /trust            consent, privacy, AI policy, fairness, limitations
├── About              /about            team, hackathon, roadmap, credits, AI disclosure
└── Demo               /session/amani-ni-sisi   guided, interactive demo
```

**Global navigation:** Product · For Artists · For Platforms · Developers · Technology, and a filled **Try The Demo** button. **Footer:** Product, Audiences, Developers, Company columns; GitHub; hackathon line.

---

## 4. Design Implications

1. **Lead with the outcome, not the technology.** Home and audience pages use plain language; Technology and Developers carry the depth.
2. **Every page ends in a next step** (demo, docs, contact), matching the journey's next stage.
3. **The demo teaches itself:** a step guide that says what to click and why, for first-time visitors and judges.
4. **Language is a feature,** not a toggle hidden in a menu: Swahili is shown on artist-facing surfaces.
5. **Trust is designed in:** consent, "audio never leaves your phone", "nothing counts until both agree", and honest limitations are stated where people decide.
