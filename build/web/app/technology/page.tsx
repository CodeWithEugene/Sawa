import type { Metadata } from "next"
import { Check, Equal, GitCompareArrows, X } from "lucide-react"

import { ArchitectureDiagram } from "@/components/sawa/tech-architecture"
import { CodeBlock, SNIPPETS } from "@/components/sawa/tech-code"
import { WorkedExample } from "@/components/sawa/tech-worked-example"
import { Card, CtaBand, PageHero, PageShell, PrimaryButton, SecondaryButton, Section } from "@/components/sawa/page-kit"
import { DEMO_HREF, GITHUB_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Technology: Sawa",
  description:
    "Two SingularityNET Omega agents reason with NAL over each writer's memory and reach the same split sheet, proven by equal SHA-256 proof hashes.",
}

type Snippet = keyof typeof SNIPPETS

const STEPS: { title: string; body: string; file: string; code: Snippet }[] = [
  {
    title: "Derive: One NAL Deduction Per Piece Of Evidence",
    body: "Every piece of evidence becomes a truth-valued statement through one call to Omega's |-nal. The event is on record at (1.0, 0.9); the selected rule says how reliable that kind of evidence is. A counter-claim is negated with Omega's own Truth_Negation. Withdrawn premises are skipped.",
    file: "metta/sawa.metta",
    code: "derive",
  },
  {
    title: "D1: Received Before Created",
    body: "If a writer made an artefact for a part after receiving the other writer's version of it, the artefact is evidence of developing that part, not starting it. The defeater replaces the reliability rule; it does not delete the evidence.",
    file: "metta/sawa.metta",
    code: "d1",
  },
  {
    title: "D2: Recollection After Dispute",
    body: "A recollection written after the dispute began, about a part that has a record made at the time, is weighed with the weaker rule. The rule only applies when the active pack carries it, which is how rule versions can differ.",
    file: "metta/sawa.metta",
    code: "d2",
  },
  {
    title: "D3: Generated Before Edited",
    body: "An AI generator's export is evidence that a part was generated, never that a person wrote it. A person who edits generated material is credited with developing it. The generated remainder is owned by no one and disclosed.",
    file: "metta/sawa.metta",
    code: "d3",
  },
  {
    title: "Revise: Merge Independent Evidence",
    body: "Evidence about the same statement is folded together with NAL revision, in time order, so every intermediate truth value is in the proof. Agreeing sources raise confidence; conflicting sources pull frequency toward the middle.",
    file: "metta/sawa.metta",
    code: "revise",
  },
  {
    title: "Decide: Omega's Act Thresholds",
    body: "A statement is settled only at frequency 0.6 or more and confidence 0.5 or more, Omega's documented thresholds. Only settled statements produce shares. A part with no settled originator blocks signing and asks the writers to confirm.",
    file: "metta/sawa.metta",
    code: "band",
  },
  {
    title: "Policy Atoms: Rules And Agreement As Data",
    body: "Reliabilities follow Omega's grounding guidance: primary sources about 0.9, secondary 0.7, tertiary 0.4. Deduction from (1.0, 0.9) gives the truth ladder: hashed file 0.81, document edit 0.75, the other writer's words 0.70, own memory 0.45, memory after the dispute 0.27. The 75/25 policy is the writers' own earlier agreement.",
    file: "metta/packs/split-v1.metta",
    code: "pack",
  },
  {
    title: "Proof Hash: The Whole Proof, Canonically",
    body: "Each agent serialises its proof with sorted keys and fixed separators, then hashes it with SHA-256. The proof includes the rule pack, the Omega release, the SHA-256 of lib_nal.metta, every statement with its evidence and revision steps, every share and every withdrawn premise.",
    file: "sawa/reconcile.py",
    code: "hash",
  },
]

const STACK = [
  ["Reasoning", "SingularityNET Omega v0.1.20, lib_nal.metta loaded unmodified"],
  ["Runtime", "Hyperon 0.2.10 (MeTTa), one atom space per agent"],
  ["Agent host", "Python 3.12 and FastAPI"],
  ["Reading chats", "TypeSafe Jev (jev-latest), with a seeded fallback"],
  ["Web", "Next.js, React 19, Tailwind CSS and shadcn/ui"],
  ["Hosting", "Vercel"],
]

const TESTS = [
  "Omega deduction and revision match hand computation",
  "Bands follow Omega's thresholds",
  "D1 makes the MIDI development, and does not fire on the earlier memo",
  "D2 discounts only recollections written after the dispute",
  "AI-generated drums are owned by no one",
  "A voice model without consent blocks signing",
  "Agents differ before the exchange and converge after it",
  "Different rule versions never converge",
  "A challenge is recorded and the hook still holds",
  "Explanations exist in both languages, with no dashes",
]

export default function TechnologyPage() {
  return (
    <PageShell>
      <PageHero
        tone="dark"
        eyebrow="Technology"
        title="Built On SingularityNET Omega."
        accent="SingularityNET Omega."
        lead="No chatbot decides who wrote what. Two Omega agents, one per writer, reason over evidence with logic you can inspect, and prove they agree with matching hashes."
        actions={
          <>
            <PrimaryButton href={DEMO_HREF}>Try The Demo</PrimaryButton>
            <SecondaryButton href={GITHUB_URL} onColor>
              Read The Source
            </SecondaryButton>
          </>
        }
      />

      <Section
        id="architecture"
        eyebrow="Architecture"
        title="Two Atom Spaces That Never Touch"
        lead="Each agent runs in its own Hyperon atom space with its own memory. They share only the evidence their writers choose to exchange, and each one reaches its answer alone."
      >
        <ArchitectureDiagram />
      </Section>

      <Section
        id="reasoning"
        tone="dark"
        eyebrow="The Reasoning, Step By Step"
        title="Every Truth Value Comes From Omega"
        lead="Sawa's rules are written in MeTTa and run on Omega's own NAL. The code below is copied from the repository as it runs."
      >
        <ol className="space-y-14">
          {STEPS.map((s, i) => (
            <li key={s.title} className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
              <div>
                <span className="font-mono text-sm text-nairobi">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-2xl font-medium tracking-[-0.03em]">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-white/70">{s.body}</p>
              </div>
              <CodeBlock file={s.file} code={SNIPPETS[s.code]} />
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="example"
        eyebrow="Worked Example"
        title="The Hook Melody, By The Numbers"
        lead="Malik's draft says he made the hook. Wanjiru's says she did. Here is how both agents reach the same answer from the same evidence."
      >
        <WorkedExample />
      </Section>

      <Section
        id="convergence"
        tone="dark"
        eyebrow="Two Agents, One Answer"
        title="Agreement Is Two Equal Hashes"
        lead="Both agents run the full reconciliation independently. If they used the same evidence and the same rules, their canonical proofs are byte for byte identical, and so are their SHA-256 hashes."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <Card tone="dark" className="bg-white/[0.06] ring-1 ring-white/10">
            <X className="size-7 text-white/50" aria-hidden />
            <h3 className="mt-5 text-xl font-medium">Before The Exchange</h3>
            <p className="mt-2 leading-relaxed text-white/70">
              Each agent holds only its own writer&apos;s records. Their proofs differ, so their hashes differ. Sawa shows
              the two drafts and names the disputed parts.
            </p>
          </Card>
          <Card tone="orange">
            <Equal className="size-7" aria-hidden />
            <h3 className="mt-5 text-xl font-medium">After The Exchange</h3>
            <p className="mt-2 leading-relaxed text-white/90">
              Same evidence, same rule pack, same Omega library. Both hashes match, and that hash becomes the agreement
              ID. Only then does signing open.
            </p>
          </Card>
          <Card tone="dark" className="bg-white/[0.06] ring-1 ring-white/10">
            <GitCompareArrows className="size-7 text-white/50" aria-hidden />
            <h3 className="mt-5 text-xl font-medium">Different Rule Versions</h3>
            <p className="mt-2 leading-relaxed text-white/70">
              If one agent runs split-v0, which has no D2 rule, the proofs differ. Sawa shows &ldquo;No shared answer
              yet&rdquo; and keeps signing closed. Agreement is never faked.
            </p>
          </Card>
        </div>
      </Section>

      <Section
        id="jev"
        eyebrow="Jev Reads, Omega Decides"
        title="A Language Model Reads. It Never Decides."
        lead="Chat messages are where credit is often given, in Sheng, Swahili or English. TypeSafe Jev reads each message into one typed choice, and the message's author confirms it before it counts as evidence."
      >
        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-2xl border border-border bg-card p-7">
            <p className="text-sm text-muted-foreground">Malik to Wanjiru, 12 Sep</p>
            <p className="mt-2 text-xl tracking-[-0.02em]">&ldquo;yo this hum is fire 🔥 imma build the beat around it&rdquo;</p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex flex-col gap-1 rounded-lg bg-muted px-4 py-3 sm:flex-row sm:justify-between">
                <span className="text-muted-foreground">Jev reads</span>
                <span className="font-mono">wanjiru__originated__hook-melody</span>
              </div>
              <div className="flex flex-col gap-1 rounded-lg bg-muted px-4 py-3 sm:flex-row sm:justify-between">
                <span className="text-muted-foreground">Author confirms</span>
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 text-truth-ink" aria-hidden /> Malik
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-lg bg-ink px-4 py-3 text-white sm:flex-row sm:justify-between">
                <span className="text-white/60">Omega weighs it as</span>
                <span>The other writer&apos;s own words, (1.0, 0.70)</span>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              ["Jev Does", "Reads a message, with the message it replies to, into one of a fixed set of credit statements, with probabilities. A reading below 0.6 confidence is flagged for review."],
              ["Jev Never Does", "Produce a share, a percentage, a rule or an explanation. If it is unavailable, Sawa uses the seeded reading and marks it as manual."],
              ["Omega Does", "Everything else: evidence, defeaters, revision, thresholds, shares, proofs and memory."],
            ].map(([t, b]) => (
              <Card key={t}>
                <h3 className="text-lg font-medium">{t}</h3>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">{b}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="memory"
        tone="orange"
        eyebrow="Memory"
        title="The Audit Log Is The Memory"
        lead="Sawa keeps no hidden state. Each agent's memory is event-sourced and append-only, and it is replayed into a fresh atom space on every request, following Omega's episodic replay pattern."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            ["1. Append", "Exchanges, reconciliations, challenges, rule changes and signatures are appended to the session log. Nothing is edited in place."],
            ["2. Replay", "Each agent replays only the records it holds into its own atom space: who wrote what, when, who received what, and which premises were withdrawn."],
            ["3. Reason", "The agent runs the rules over that space and returns a proof. Run the same log again and you get the same proof and the same hash."],
          ].map(([t, b]) => (
            <Card key={t} tone="dark">
              <h3 className="text-xl font-medium">{t}</h3>
              <p className="mt-2 leading-relaxed text-white/70">{b}</p>
            </Card>
          ))}
        </div>
        <CodeBlock file="metta/sawa.metta" code={SNIPPETS.atoms} className="mt-5" />
      </Section>

      <Section
        id="engineering"
        eyebrow="Engineering"
        title="Small, Tested, Reproducible"
        lead="The reasoning layer is a few hundred lines of MeTTa and Python on top of Omega's library, with tests for every rule the demo depends on."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full text-left text-[0.95rem]">
              <caption className="sr-only">Technology stack</caption>
              <tbody>
                {STACK.map(([k, v]) => (
                  <tr key={k} className="border-b border-border last:border-0">
                    <th scope="row" className="w-36 px-6 py-4 align-top font-normal text-muted-foreground">
                      {k}
                    </th>
                    <td className="px-6 py-4">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Card>
            <div className="flex items-baseline gap-3">
              <p className="tabular text-5xl font-medium tracking-[-0.04em] text-nairobi">22</p>
              <h3 className="text-xl font-medium">Passing Tests</h3>
            </div>
            <ul className="mt-5 space-y-2 text-[0.95rem]">
              {TESTS.map((t) => (
                <li key={t} className="flex gap-2.5">
                  <Check className="mt-1 size-4 shrink-0 text-truth-ink" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Card>
            <h3 className="text-lg font-medium">Deterministic Across Machines</h3>
            <p className="mt-1.5 leading-relaxed text-muted-foreground">
              Truth values are rounded to four places and proofs are serialised with sorted keys, so the same session
              produces the same hash on any machine. The proof also carries the SHA-256 of
              lib_nal.metta, so a changed library cannot pass as the same reasoning.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-medium">Prior Work, Credited</h3>
            <p className="mt-1.5 leading-relaxed text-muted-foreground">
              The engine host pattern (loading Omega&apos;s NAL on Hyperon and the append-only memory) is adapted from
              Mizani, our entry to the previous BASIX hackathon. Everything specific to songs, splits, defeaters,
              convergence and signing is new work.
            </p>
          </Card>
        </div>
      </Section>

      <CtaBand
        title="See The Reasoning Live."
        lead="Open the demo, reconcile the two agents, then open any share to read its proof."
      />
    </PageShell>
  )
}
