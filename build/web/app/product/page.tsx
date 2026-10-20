import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Code2,
  Disc3,
  Fingerprint,
  Handshake,
  Languages,
  MessageSquareWarning,
  MicVocal,
  ScrollText,
  Store,
  Users,
} from "lucide-react"

import { DraftsToAnswer, SHEET_CALLOUTS, SignedSheetMock } from "@/components/sawa/product-sheet"
import { ComparisonTable } from "@/components/sawa/product-compare"
import { DEMO_HREF } from "@/lib/site"
import { Card, CtaBand, PageHero, PageShell, PrimaryButton, SecondaryButton, Section } from "@/components/sawa/page-kit"

export const metadata: Metadata = {
  title: "Product: Sawa",
  description:
    "Sawa gives each co-writer an agent that remembers their side of the session. The two agents reason to one split sheet that both writers can read, challenge and sign.",
}

const DEMO = DEMO_HREF

const STEPS = [
  {
    title: "Bring Your Side",
    body: "Each writer brings what they already have, plus their own account of who wrote what. Each writer's agent holds only that writer's memory.",
    points: [
      "Voice memos and project files",
      "Lyric document edit history",
      "Chats in English, Swahili or Sheng",
      "The split policy you agreed before",
    ],
  },
  {
    title: "Share Evidence, Never Audio",
    body: "The agents exchange small records about each file, not the files. Your stems and memos stay in your vault.",
    points: [
      "SHA-256 fingerprints of each file",
      "When it was made, and by whom",
      "Who received what, and when",
      "Messages, once their author confirms what they mean",
    ],
  },
  {
    title: "Two Agents Agree Or Say So",
    body: "Each agent weighs the shared evidence on its own, using SingularityNET Omega's reasoning. Agreement is two equal proof hashes, never a claim on screen.",
    points: [
      "Later recollections count for less",
      "Work made after receiving a part counts as developing it",
      "Weak evidence is flagged, never guessed",
      "Different rule versions mean no agreement yet",
    ],
  },
  {
    title: "See Why, Challenge, Sign",
    body: "Every share comes with its reasons. Disagree with one, withdraw it with a reason, and both agents recompute in front of you.",
    points: [
      "Reasons in English and Swahili",
      "Challenges recorded in both memories",
      "Signing opens only when both agents agree",
      "Nothing counts until both writers sign",
    ],
  },
]

const FEATURES = [
  {
    icon: Fingerprint,
    title: "Evidence Over Arguments",
    body: "Shares come from timestamped files, edit history and messages. A recollection written after a dispute counts for less than a record made at the time.",
  },
  {
    icon: Handshake,
    title: "Two Independent Agents",
    body: "Each writer has an agent with their own memory. The split counts only when both agents reach it on their own.",
  },
  {
    icon: BadgeCheck,
    title: "Agreement ID",
    body: "Each agent hashes its full proof with SHA-256. When both hashes match, that hash is the agreement ID, and anyone can check it.",
  },
  {
    icon: MessageSquareWarning,
    title: "Challenge Anything",
    body: "Withdraw any premise with a reason. The challenge is kept on the record and the split is recalculated, so a challenge never wins by being loud.",
  },
  {
    icon: Languages,
    title: "English And Swahili",
    body: "Every reason is filled in from the proof itself, in both languages. No language model writes an explanation or a share.",
  },
  {
    icon: MicVocal,
    title: "AI Disclosure And Voice Consent",
    body: "AI-generated parts are disclosed and owned by no one. A voice model of a writer needs that writer's recorded consent, or signing stays closed.",
  },
  {
    icon: Disc3,
    title: "Composition And Master Apart",
    body: "The song and the recording each get their own split under their own policy, the way collecting societies and labels already treat them.",
  },
  {
    icon: ScrollText,
    title: "Every Rights Holder On The Record",
    body: "The signed record names every writer with their role and city, both signatures, the rule version and the fingerprints of the stems.",
  },
]

const AUDIENCES = [
  {
    icon: Users,
    title: "Songwriters And Producers",
    body: "Get credited for what you made, in your language, before the song is pitched. See how the beat and the topline are weighed before you start.",
    href: "/artists",
    cta: "For Artists",
  },
  {
    icon: Store,
    title: "Licensing Platforms",
    body: "List and pay out only songs whose splits are signed, with every rights holder named and AI use disclosed. Partner integrations are concepts pending partner confirmation.",
    href: "/platforms",
    cta: "For Platforms",
  },
  {
    icon: Code2,
    title: "Developers",
    body: "Run a session from your own product and store the signed record. Plain JSON in, a proof and a record hash out.",
    href: "/developers",
    cta: "Read The Docs",
  },
]

export default function ProductPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Product"
        title="One Signed Split Sheet, Agreed By Both Writers."
        accent="Agreed By Both Writers."
        lead="Sawa gives each co-writer of a song an agent that remembers their side of the session. The two agents start from different memories, weigh the same evidence, and reach one split sheet that both writers can read, challenge and sign."
        actions={
          <>
            <PrimaryButton href={DEMO}>Try The Demo</PrimaryButton>
            <SecondaryButton href="/developers">For Developers</SecondaryButton>
          </>
        }
        aside={<DraftsToAnswer />}
      />

      <Section
        id="how"
        tone="dark"
        eyebrow="How It Works"
        title="From Two Memories To One Signed Sheet"
        lead="Four steps, in one session. Each writer keeps control of their own files and their own signature the whole way through."
      >
        <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex flex-col rounded-2xl bg-white/[0.06] p-7 ring-1 ring-white/10">
              <span className="grid size-10 place-items-center rounded-full bg-nairobi text-sm font-medium text-white">
                {i + 1}
              </span>
              <h3 className="mt-8 text-2xl font-medium tracking-[-0.03em]">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-white/70">{s.body}</p>
              <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-[0.95rem] text-white/80">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-nairobi" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="features"
        eyebrow="Features"
        title="Built To Be Trusted By Both Sides"
        lead="A split sheet only works if both writers believe it. Every feature exists to earn that."
      >
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="transition-colors hover:border-nairobi/50">
              <Icon className="size-9 text-nairobi" strokeWidth={1.3} aria-hidden />
              <h3 className="mt-6 text-xl font-medium tracking-[-0.025em]">{title}</h3>
              <p className="mt-2.5 leading-relaxed text-muted-foreground">{body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="record" tone="orange">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div className="lg:sticky lg:top-24">
            <p className="text-sm font-medium text-white/80">What You Get</p>
            <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.06] font-medium tracking-[-0.04em]">
              A Split Sheet That Explains Itself
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
              This is the signed sheet from the demo song, &ldquo;Amani Ni Sisi&rdquo;. Wanjiru hummed the hook in
              Nairobi; Malik built the beat in Harlem. Their drafts disagreed. Here is what they signed.
            </p>
            <ol className="mt-10 space-y-6">
              {SHEET_CALLOUTS.map((c, i) => (
                <li key={c.title} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-sm font-medium text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium">{c.title}</h3>
                    <p className="mt-1 leading-relaxed text-white/80">{c.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <SignedSheetMock />
        </div>
      </Section>

      <Section
        id="audiences"
        eyebrow="Who It's For"
        title="One Record, Three Kinds Of User"
        lead="Writers settle the split. Platforms rely on it. Developers connect the two."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {AUDIENCES.map(({ icon: Icon, title, body, href, cta }) => (
            <Link
              key={title}
              href={href}
              className="group flex flex-col rounded-2xl border border-border bg-card p-8 transition-colors hover:border-nairobi/60"
            >
              <Icon className="size-9 text-nairobi" strokeWidth={1.3} aria-hidden />
              <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em]">{title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{body}</p>
              <span className="mt-8 inline-flex items-center gap-2 font-medium text-nairobi-ink">
                {cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        id="compare"
        tone="dark"
        eyebrow="How It Compares"
        title="An Honest Comparison"
        lead="Sawa does one job: helping co-writers reach a split they both sign. Here is how that compares with what writers use today, including what Sawa does not do."
      >
        <ComparisonTable />
        <p className="mt-6 flex items-start gap-2 text-sm text-white/55">
          <Bot className="mt-0.5 size-4 shrink-0" aria-hidden />
          Sawa records an agreement between writers. It is not legal advice and it is not an arbitrator.
        </p>
      </Section>

      <CtaBand title="See It Settle A Real Split." />
    </PageShell>
  )
}
