import type { Metadata } from "next"

import { CodeBlock, DevConsole, SdkTabs, type SdkExample } from "@/components/sawa/dev-console"
import { CtaBand, PageHero, PageShell, PAD, PrimaryButton, SecondaryButton } from "@/components/sawa/page-kit"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Developers: The Sawa API",
  description:
    "Run two Omega agents over a co-write and get back one split sheet, a proof hash and a signed record. Quickstart, endpoints, events and a live console.",
}

const BASE = "https://sawa.codewitheugene.top/api"
const GITHUB = "https://github.com/CodeWithEugene/Sawa"

const TOC = [
  ["quickstart", "Quickstart"],
  ["concepts", "Concepts"],
  ["endpoints", "Endpoints"],
  ["events", "Events"],
  ["responses", "Responses"],
  ["record", "The Signed Record"],
  ["errors", "Errors"],
  ["console", "Live Console"],
  ["sdk", "SDK Examples"],
] as const

/* ------------------------------------------------------------------ */
/* Code samples (field names match build/agent/sawa)                   */
/* ------------------------------------------------------------------ */

const QS_HEALTH = `curl ${BASE}/health`

const QS_HEALTH_RES = `{
  "ok": true,
  "omega": "v0.1.20",
  "lib_nal_sha256": "3f2894d9b1bc4e39fd7d0384aa6c8503b847eed38826222941ffa14dc0610283",
  "hyperon": "0.2.10",
  "packs": ["split-v1", "split-v0"],
  "agents": ["harlem", "nairobi"],
  "jev": true
}`

const QS_RUN = `curl -X POST ${BASE}/session/run \\
  -H "content-type: application/json" \\
  -d '{
    "song_id": "amani-ni-sisi",
    "events": [{ "type": "exchange" }, { "type": "reconcile" }]
  }'`

const QS_RUN_RES = `{
  "song_id": "amani-ni-sisi",
  "phase": "reconciled",
  "converged": true,
  "can_sign": true,
  "blocked": [],
  "agents": {
    "harlem":  { "hash": "5900a9ca050d9fdc...", "result": { "body": { "totals": { "wanjiru": 39.7, "malik": 60.3 } } } },
    "nairobi": { "hash": "5900a9ca050d9fdc...", "result": { "body": { "totals": { "wanjiru": 39.7, "malik": 60.3 } } } }
  },
  "headline": {
    "en": "Both agents reached the same answer from the same evidence.",
    "sw": "Mawakala wote wawili wamefikia jibu moja kutoka kwa ushahidi uleule."
  }
}`

const SONGS_RES = `[
  { "id": "amani-ni-sisi", "title": "Amani Ni Sisi", "subtitle": "Peace Is Us" }
]`

const SONG_RES = `{
  "id": "amani-ni-sisi",
  "title": "Amani Ni Sisi",
  "subtitle": "Peace Is Us",
  "bpm": 92,
  "key": "A minor",
  "writers": ["wanjiru", "malik"],
  "records": [
    { "id": "memo-hook", "kind": "artefact", "author": "wanjiru", "at": 1789236240,
      "holders": ["nairobi"], "element": "hook-melody", "file": "hook-idea.m4a", "hash": "a141e419..." }
  ],
  "policy": { "id": "jua-2025", "master": { "wanjiru": 50.0, "malik": 50.0 } },
  "stems": [{ "file": "amani-beat-stems.zip", "hash": "c4b6768b..." }],
  "elements": [
    { "id": "chords-bass", "weight": 30, "right": "composition", "en": "Chords and bass", "sw": "Kodi na besi" }
  ],
  "writer_info": { "wanjiru": { "name": "Wanjiru Kamau", "city": "Nairobi", "agent": "nairobi" } }
}`

const RUN_REQ = `{
  "song_id": "amani-ni-sisi",
  "events": [
    { "type": "exchange" },
    { "type": "reconcile" },
    { "type": "sign", "writer": "wanjiru", "name": "Wanjiru Kamau", "at": "2026-10-01T10:00:00Z" }
  ]
}`

const JEV_REQ = `{ "record": "msg-fire" }`

const JEV_RES = `{
  "mode": "jev",
  "choice": "wanjiru__originated__hook-melody",
  "confidence": 0.83,
  "probabilities": { "wanjiru__originated__hook-melody": 0.84, "none": 0.07 },
  "model": "jev-1.13.0",
  "request_id": "req_01a158fc...",
  "latency_ms": 93,
  "needs_review": false
}`

const RECORD_EXAMPLE = `{
  "body": {
    "song": "amani-ni-sisi",
    "title": "Amani Ni Sisi",
    "composition": { "wanjiru": 39.7, "malik": 60.3 },
    "master": { "wanjiru": 50.0, "malik": 50.0 },
    "policy": "jua-2025",
    "pack": "split-v1",
    "omega": "v0.1.20",
    "proof_hash": "5900a9ca050d9fdc51a6677bafbbae18dc13dba91b6977ce2cb2f3bc4d6bad6e",
    "stems": [{ "file": "amani-beat-stems.zip", "hash": "c4b6768b..." }],
    "ai_points": 15.0,
    "ai_disclosure": [
      { "record": "ai-drums", "tool": "AI music generator (synthetic)", "element": "drum-groove",
        "used_by": "malik", "use": "generated", "detail": "warm afrobeats drum groove with boom bap swing, 92 BPM" }
    ],
    "writers": {
      "malik": { "name": "Malik Johnson", "city": "Harlem", "role": "Producer" },
      "wanjiru": { "name": "Wanjiru Kamau", "city": "Nairobi", "role": "Songwriter and vocalist" }
    },
    "signatures": {
      "malik": { "name": "Malik Johnson", "at": "2026-10-01T10:05:00Z" },
      "wanjiru": { "name": "Wanjiru Kamau", "at": "2026-10-01T10:00:00Z" }
    }
  },
  "sha256": "fe05aa3fa48c8dc7b7c9bd78eb129c1a8fcf2a3ae06f777a11698809aa3c7a0d"
}`

const ERR_404 = `{ "detail": "unknown song" }`

const ERR_422 = `{
  "detail": [{
    "type": "string_pattern_mismatch",
    "loc": ["body", "song_id"],
    "msg": "String should match pattern '^[A-Za-z0-9_-]{1,40}$'"
  }]
}`

const ERR_422_RECORD = `{ "detail": "unknown record nope" }`

const EVENTS: { type: string; summary: string; fields: string; example: string }[] = [
  {
    type: "exchange",
    summary: "Both agents share what they hold. Before this, each agent sees only its own writer's records.",
    fields: "No fields.",
    example: `{ "type": "exchange" }`,
  },
  {
    type: "reconcile",
    summary: "Each agent reasons over everything it now holds and produces a result and a proof hash. Ignored until an exchange has happened.",
    fields: "No fields.",
    example: `{ "type": "reconcile" }`,
  },
  {
    type: "contest",
    summary: "A writer withdraws one record from the evidence. Both agents reason again without it, and any signatures are cleared.",
    fields: "record: a record id from the song. by: wanjiru or malik. reason: 1 to 280 characters.",
    example: `{ "type": "contest", "record": "msg-fire", "by": "malik", "reason": "I was praising the vibe, not crediting the melody." }`,
  },
  {
    type: "withdraw-contest",
    summary: "Puts a contested record back into the evidence. Signatures are cleared.",
    fields: "record: the contested record id.",
    example: `{ "type": "withdraw-contest", "record": "msg-fire" }`,
  },
  {
    type: "sign",
    summary: "A writer signs the sheet. Counted only after reconcile, and only while both agents agree and nothing is blocked.",
    fields: "writer: wanjiru or malik. name: 2 to 80 characters. at: a timestamp string, up to 40 characters.",
    example: `{ "type": "sign", "writer": "wanjiru", "name": "Wanjiru Kamau", "at": "2026-10-01T10:00:00Z" }`,
  },
  {
    type: "pack",
    summary: "Switches one agent's rule pack. Agents on different packs can disagree, which is how a mismatch is shown. Signatures are cleared.",
    fields: "agent: harlem or nairobi. version: split-v1 (default) or split-v0.",
    example: `{ "type": "pack", "agent": "nairobi", "version": "split-v0" }`,
  },
]

const ENDPOINTS: { method: "GET" | "POST"; path: string; summary: string }[] = [
  { method: "GET", path: "/api/health", summary: "Engine versions, rule packs and agents. Use it as a liveness check." },
  { method: "GET", path: "/api/songs", summary: "The songs available to run a session on." },
  { method: "GET", path: "/api/songs/{id}", summary: "One song: its parts, records, writers, policy and stems." },
  { method: "POST", path: "/api/session/run", summary: "Replays a session's events through both agents and returns the full state." },
  { method: "POST", path: "/api/jev/read", summary: "Reads one chat message into a typed credit statement with TypeSafe Jev." },
]

const RESPONSE_FIELDS: [string, string][] = [
  ["phase", "solo, exchanged or reconciled. Where the session is, given its events."],
  ["converged", "True when both agents reconciled and produced the same proof hash."],
  ["can_sign", "True when the agents converged and nothing is blocked. Signatures count only then."],
  ["blocked", "Parts that cannot be settled, for example voice-consent-wanjiru if a voice model was used without consent."],
  ["disputed", "Parts where the two writers' own accounts differ, with each side's claimed roles and shares."],
  ["agents.{harlem,nairobi}.draft", "The writer's own account before any reasoning: claimed roles and the shares they imply."],
  ["agents.{harlem,nairobi}.result", "Present after reconcile. The full reasoning: per part evidence, truth values, bands and totals."],
  ["agents.{harlem,nairobi}.hash", "The proof hash of the result, or of the draft before reconcile."],
  ["agents.{harlem,nairobi}.memory", "What that agent has seen, in order: its own records, then the events you sent."],
  ["agents.{harlem,nairobi}.holds", "How many records the agent holds right now."],
  ["agents.{harlem,nairobi}.pack", "The rule pack the agent reasoned with."],
  ["explanation", "Present after reconcile. Plain sentences for every part and every piece of evidence, in en and sw."],
  ["record", "The signed record, once both writers have signed. Otherwise null."],
  ["ai_disclosure", "Every AI tool that touched the song, and how it was used."],
  ["headline", "A one line status in en and sw."],
  ["contests, signatures, engine", "The active contests, the counted signatures, and the Omega and Hyperon versions."],
]

const RECORD_FIELDS: [string, string][] = [
  ["song, title", "Which song this record settles."],
  ["composition", "Each writer's share of the composition, in percent of the human-written work."],
  ["master", "The master recording split, taken from the writers' signed policy."],
  ["policy, pack, omega", "The split policy, the rule pack and the Omega release that produced the result."],
  ["proof_hash", "The agreement ID: the hash both agents produced. Anyone can rerun the session and compare."],
  ["stems", "The files the record refers to, each with its SHA-256."],
  ["ai_points", "Points of the song written by AI. They belong to no one, so they are left out of the shares and disclosed."],
  ["ai_disclosure", "Each AI tool, what it did, who used it and, for voice models, the consent record."],
  ["writers, signatures", "Who the writers are, and the name and time each one signed with."],
  ["sha256", "SHA-256 of the canonical JSON of body (sorted keys, no spaces). Store it and use it to detect tampering."],
]

/* ------------------------------------------------------------------ */
/* SDK examples                                                        */
/* ------------------------------------------------------------------ */

const SDK: SdkExample[] = [
  {
    id: "curl",
    label: "curl",
    file: "run.sh",
    code: `curl -s -X POST ${BASE}/session/run \\
  -H "content-type: application/json" \\
  -d '{"song_id":"amani-ni-sisi","events":[{"type":"exchange"},{"type":"reconcile"}]}' \\
  | jq '{converged, can_sign, blocked, totals: .agents.harlem.result.body.totals}'`,
  },
  {
    id: "js",
    label: "JavaScript",
    file: "run.mjs",
    code: `const BASE = "${BASE}"

async function runSession(events) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(\`\${BASE}/session/run\`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ song_id: "amani-ni-sisi", events }),
    })
    if (res.ok) return res.json()
    if (res.status < 500) throw new Error(\`\${res.status}: \${await res.text()}\`)
    await new Promise((r) => setTimeout(r, 500 * attempt))
  }
  throw new Error("API unavailable")
}

const events = [{ type: "exchange" }, { type: "reconcile" }]
const s = await runSession(events)

if (s.converged && s.can_sign) {
  console.log("Agreement ID:", s.agents.harlem.hash)
  console.log("Split:", s.agents.harlem.result.body.totals)
} else {
  console.log("Not settled:", s.headline.en, s.blocked)
}`,
  },
  {
    id: "python",
    label: "Python",
    file: "run.py",
    code: `import httpx

BASE = "${BASE}"

events = [{"type": "exchange"}, {"type": "reconcile"}]

transport = httpx.HTTPTransport(retries=3)  # retries failed connections
with httpx.Client(base_url=BASE, timeout=60, transport=transport) as client:
    res = client.post("/session/run", json={"song_id": "amani-ni-sisi", "events": events})
    res.raise_for_status()
    s = res.json()

if s["converged"] and s["can_sign"]:
    print("Agreement ID:", s["agents"]["harlem"]["hash"])
    print("Split:", s["agents"]["harlem"]["result"]["body"]["totals"])
else:
    print("Not settled:", s["headline"]["en"], s["blocked"])`,
  },
]

/* ------------------------------------------------------------------ */
/* Layout helpers                                                      */
/* ------------------------------------------------------------------ */

function DocSection({ id, title, lead, children }: { id: string; title: string; lead?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-16 first:border-t-0 first:pt-4">
      <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1] font-medium tracking-[-0.035em]">{title}</h2>
      {lead && <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{lead}</p>}
      <div className="mt-8 space-y-6">{children}</div>
    </section>
  )
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="pt-4 text-xl font-medium tracking-[-0.02em]">{children}</h3>
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="max-w-3xl leading-relaxed text-foreground/80">{children}</p>
}

function C({ children }: { children: React.ReactNode }) {
  return <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.88em]">{children}</code>
}

function MethodTag({ method }: { method: "GET" | "POST" }) {
  return (
    <span
      className={cn(
        "inline-flex w-14 justify-center rounded-md px-2 py-0.5 font-mono text-xs font-semibold",
        method === "GET" ? "bg-truth-ink/10 text-truth-ink" : "bg-nairobi-soft text-nairobi-ink"
      )}
    >
      {method}
    </span>
  )
}

function FieldTable({ rows, head = "Field" }: { rows: [string, string][]; head?: string }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/60 text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">{head}</th>
            <th className="px-4 py-3 font-medium">Meaning</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([field, meaning]) => (
            <tr key={field} className="border-t border-border align-top">
              <td className="px-4 py-3 font-mono text-[0.82rem] whitespace-nowrap">{field}</td>
              <td className="px-4 py-3 leading-relaxed text-foreground/80">{meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Endpoint({
  method,
  path,
  children,
}: {
  method: "GET" | "POST"
  path: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <MethodTag method={method} />
        <span className="font-mono text-[0.95rem]">{path}</span>
      </div>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function DevelopersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Developers"
        title="Build Fair Splits Into Your Product."
        accent="Fair Splits"
        lead="One HTTP call runs both writers' agents over a co-write and returns the split, the reasons in English and Swahili, and a proof hash anyone can check. No SDK to install, just JSON."
        actions={
          <>
            <PrimaryButton href="#quickstart">Read The Quickstart</PrimaryButton>
            <SecondaryButton href={GITHUB}>View On GitHub</SecondaryButton>
          </>
        }
      />

      <div data-nav="light" className={cn("w-full bg-background pb-24", PAD)}>
        <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-24 pt-4">
              <p className="mb-3 text-sm font-medium">On This Page</p>
              <ul className="space-y-1 border-l border-border text-[0.95rem]">
                {TOC.map(([id, label]) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="-ml-px block border-l border-transparent py-1 pl-4 text-muted-foreground transition-colors hover:border-nairobi hover:text-foreground"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-xl bg-muted p-4 text-sm leading-relaxed text-muted-foreground">
                Base URL
                <span className="mt-1 block font-mono text-[0.8rem] break-all text-foreground">{BASE}</span>
              </div>
            </nav>
          </aside>

          <div className="min-w-0">
            <DocSection
              id="quickstart"
              title="Quickstart"
              lead="Two requests: check the API is up, then run a full session. The prototype has no authentication, so you can try this right now."
            >
              <H3>1. Check Health</H3>
              <CodeBlock code={QS_HEALTH} label="shell" />
              <CodeBlock code={QS_HEALTH_RES} label="200 OK" />
              <H3>2. Run A Session</H3>
              <P>
                Send the events of a session. Here, both agents exchange what they hold and then reconcile. The API is
                stateless: you keep the events list and send all of it each time.
              </P>
              <CodeBlock code={QS_RUN} label="shell" />
              <H3>3. Read The Result</H3>
              <P>
                Check <C>converged</C> first. It is true only when both agents produced the same proof hash on their own.
                The split is in <C>agents.harlem.result.body.totals</C>, and the hash is the agreement ID.
              </P>
              <CodeBlock code={QS_RUN_RES} label="200 OK (trimmed)" />
            </DocSection>

            <DocSection id="concepts" title="Concepts" lead="Six ideas explain the whole API.">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  [
                    "Two Agents",
                    "Each writer has an agent: harlem works for Malik, nairobi works for Wanjiru. Each one replays only the records its writer holds, until an exchange.",
                  ],
                  [
                    "Events Are The Session",
                    "A session is an ordered list of events that your client holds. The API keeps no session state, so the same events always give the same answer.",
                  ],
                  [
                    "Proof Hash",
                    "Each agent hashes its full reasoning. When both hashes match, that hash is the agreement ID, and anyone can rerun the events to check it.",
                  ],
                  [
                    "Convergence",
                    "The agents converge when they reach the same hash from the same evidence. If they do not, Sawa says so instead of picking a side.",
                  ],
                  [
                    "Contests And Signing",
                    "A writer can contest a record to take it out of the evidence. Signatures count only while both agents agree and nothing is blocked.",
                  ],
                  [
                    "AI Disclosure",
                    "Every AI tool that touched the song is listed. AI written material belongs to no one, so it is left out of the shares and disclosed.",
                  ],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="text-lg font-medium tracking-[-0.02em]">{title}</h3>
                    <p className="mt-2 leading-relaxed text-foreground/75">{body}</p>
                  </div>
                ))}
              </div>
            </DocSection>

            <DocSection
              id="endpoints"
              title="Endpoints"
              lead="Five endpoints, all JSON. Request bodies are validated strictly, and invalid input is rejected before any reasoning runs."
            >
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/60 text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Method</th>
                      <th className="px-4 py-3 font-medium">Path</th>
                      <th className="px-4 py-3 font-medium">What It Does</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ENDPOINTS.map((e) => (
                      <tr key={e.path} className="border-t border-border align-top">
                        <td className="px-4 py-3">
                          <MethodTag method={e.method} />
                        </td>
                        <td className="px-4 py-3 font-mono text-[0.82rem] whitespace-nowrap">{e.path}</td>
                        <td className="px-4 py-3 leading-relaxed text-foreground/80">{e.summary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Endpoint method="GET" path="/api/health">
                <P>
                  Returns the Omega release, the SHA-256 of the NAL rule library the agents load, the Hyperon version,
                  the rule packs, the agents, and whether Jev is configured.
                </P>
                <CodeBlock code={QS_HEALTH_RES} label="200 OK" />
              </Endpoint>

              <Endpoint method="GET" path="/api/songs">
                <CodeBlock code={SONGS_RES} label="200 OK" />
              </Endpoint>

              <Endpoint method="GET" path="/api/songs/{id}">
                <P>
                  Everything about one song. <C>records</C> lists each file, message and edit, with <C>holders</C>{" "}
                  saying which agent remembers it before the exchange. Returns 404 for an unknown id.
                </P>
                <CodeBlock code={SONG_RES} label="200 OK (trimmed)" />
              </Endpoint>

              <Endpoint method="POST" path="/api/session/run">
                <P>
                  Replays the events through both agents and returns the session. Rules: <C>song_id</C> must match{" "}
                  <C>^[A-Za-z0-9_-]{"{1,40}"}$</C>, <C>events</C> holds at most 60 items, and a contest or
                  withdraw-contest naming a record the song does not have returns 422.
                </P>
                <CodeBlock code={RUN_REQ} label="Request body" />
                <P>
                  See <a className="text-nairobi-ink underline-offset-4 hover:underline" href="#responses">Responses</a> for
                  the fields that come back.
                </P>
              </Endpoint>

              <Endpoint method="POST" path="/api/jev/read">
                <P>
                  Reads a chat message from the song into a typed credit statement using TypeSafe Jev. Jev only reads;
                  Omega decides. A reading counts as evidence only after the message&apos;s author confirms it. If Jev is
                  unavailable, the response falls back to the seeded reading with <C>mode</C> set to <C>manual</C>.
                  Returns 404 if the record is not a message.
                </P>
                <CodeBlock code={JEV_REQ} label="Request body" />
                <CodeBlock code={JEV_RES} label="200 OK" />
              </Endpoint>
            </DocSection>

            <DocSection
              id="events"
              title="Events"
              lead="Six event types, told apart by type. Order matters: the API folds them from first to last, and an event that comes too early is ignored."
            >
              {EVENTS.map((ev) => (
                <div key={ev.type} className="grid gap-4 rounded-2xl border border-border bg-card p-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                  <div>
                    <p className="font-mono text-[0.95rem] font-semibold">{ev.type}</p>
                    <p className="mt-2 leading-relaxed text-foreground/80">{ev.summary}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{ev.fields}</p>
                  </div>
                  <CodeBlock code={ev.example} label="json" />
                </div>
              ))}
            </DocSection>

            <DocSection
              id="responses"
              title="Responses"
              lead="POST /api/session/run returns the whole session every time, so your client can render straight from it."
            >
              <FieldTable rows={RESPONSE_FIELDS} />
            </DocSection>

            <DocSection
              id="record"
              title="The Signed Record"
              lead="Once both writers sign, record holds the final split sheet: a body you can store or hand to a licensing platform, and its SHA-256."
            >
              <FieldTable rows={RECORD_FIELDS} head="record.body field" />
              <CodeBlock code={RECORD_EXAMPLE} label="record" />
              <P>
                Partner integrations, such as sending the record to Incantio or BASIX, are concepts pending partner
                confirmation. Today the record is returned to you to store.
              </P>
            </DocSection>

            <DocSection
              id="errors"
              title="Errors"
              lead="Errors use standard HTTP status codes with a JSON detail field."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <H3>404 Not Found</H3>
                  <P>The song or message does not exist.</P>
                  <CodeBlock code={ERR_404} label="404" />
                </div>
                <div className="space-y-3">
                  <H3>422 Unprocessable</H3>
                  <P>The body failed validation, or a contest names an unknown record.</P>
                  <CodeBlock code={ERR_422_RECORD} label="422" />
                </div>
              </div>
              <CodeBlock code={ERR_422} label="422 (validation)" />
              <H3>Retries And Latency</H3>
              <P>
                Retry network errors and 5xx responses with a short backoff. Requests are safe to repeat: the same events
                always return the same result. A fresh reconciliation can take a few seconds on serverless while an
                instance warms up. Results are cached per agent, so repeat calls come back much faster.
              </P>
              <H3>Authentication</H3>
              <P>
                The prototype has no authentication and uses synthetic data only. A production API would require an API
                key on every request.
              </P>
            </DocSection>

            <DocSection
              id="console"
              title="Live Console"
              lead="Send real requests to the API from this page. Pick a preset, edit the body if you like, and send."
            >
              <DevConsole />
            </DocSection>

            <DocSection
              id="sdk"
              title="SDK Examples"
              lead="There is no SDK to install. These examples run a session and check convergence with the tools you already use."
            >
              <SdkTabs examples={SDK} />
            </DocSection>
          </div>
        </div>
      </div>

      <CtaBand
        title="Ready To Integrate?"
        lead="Read the source, run the tests and open an issue. Or watch a full session settle in the demo first."
        href={GITHUB}
        label="View On GitHub"
      />
    </PageShell>
  )
}
