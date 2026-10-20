import type { Metadata } from "next"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { BookLock, Bot, CircleAlert, Flag, Handshake, History, ScanEye, ShieldCheck } from "lucide-react"

import { CtaBand, PAD, PageHero, PageShell } from "@/components/sawa/page-kit"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Trust And Safety: Sawa",
  description:
    "How Sawa handles consent, privacy, AI, fairness and auditability, what it cannot do, and how to report a problem.",
}

const ADVISORIES = "https://github.com/CodeWithEugene/Sawa/security/advisories/new"
const ISSUES = "https://github.com/CodeWithEugene/Sawa/issues"

type Block = {
  id: string
  icon: LucideIcon
  title: string
  summary: string
  points: React.ReactNode[]
}

const BLOCKS: Block[] = [
  {
    id: "consent",
    icon: Handshake,
    title: "Consent First",
    summary: "Nothing is used unless the person it belongs to has agreed.",
    points: [
      "Evidence counts only when the writer who owns it chooses to bring it.",
      "A chat message only becomes evidence after the person who wrote it confirms what it means.",
      "A voice model of a singer can only be used with that singer's recorded consent, and the consent record is linked on the split sheet.",
      "Nothing is signed on anyone's behalf. Each writer signs for themselves.",
    ],
  },
  {
    id: "privacy",
    icon: BookLock,
    title: "Privacy",
    summary: "Your audio stays with you.",
    points: [
      "Voice memos, stems and project files stay with the writer. Sawa shares a fingerprint and a timestamp, never the audio.",
      "The only text that is shared is the text a writer selects, such as a chat message they choose to bring.",
      "Each agent holds only its own writer's memory until that writer shares evidence with the other side.",
      "Everything in this demo is synthetic. No real person's data, recording or catalogue is used.",
    ],
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI Policy",
    summary: "No AI model decides or explains anyone's share.",
    points: [
      "Shares come from rules applied to evidence by the two Omega agents, under the writers' own agreement.",
      "Explanations, in English and Kiswahili, are filled in only from that reasoning. No chatbot writes them.",
      "TypeSafe Jev is used for one job: reading a chat message into a plain statement, which counts only after the message's author confirms it.",
      "Nothing writers bring to Sawa is used to train any AI model.",
    ],
  },
  {
    id: "fairness",
    icon: ShieldCheck,
    title: "Fairness",
    summary: "The rules belong to the writers, and both sides must agree.",
    points: [
      "The weights come from the writers' own agreement. It is visible to both of them, and every version is kept.",
      "Each agent works the split out on its own. Signing opens only when both reach the same answer.",
      "Sawa never fakes agreement. If the agents differ, it says so and shows which line is still open.",
      "Either writer can challenge any piece of evidence, and both agents recompute in front of them.",
    ],
  },
  {
    id: "auditability",
    icon: History,
    title: "Auditability",
    summary: "Every step can be checked afterwards.",
    points: [
      "Each agent keeps an append-only memory. Entries are added, never edited or removed.",
      "Each signed record carries the agreement ID, the rule version and a proof hash from the reasoning.",
      "The whole record is hashed with SHA-256, so any later change to it is visible.",
    ],
  },
  {
    id: "limitations",
    icon: CircleAlert,
    title: "Limitations",
    summary: "What Sawa is not, stated plainly.",
    points: [
      "Sawa records an agreement between writers. It is not legal advice and it is not arbitration.",
      "Sawa cannot judge whether two pieces of audio sound alike.",
      "Sawa is a prototype built for a hackathon. It settles songs between two writers today.",
      "Integrations with Incantio and BASIX.MARKET are concepts pending partner confirmation.",
    ],
  },
]

function TrustBlock({ block, index }: { block: Block; index: number }) {
  const dark = index % 2 === 1
  const Icon = block.icon
  return (
    <section
      id={block.id}
      data-nav={dark ? "dark" : "light"}
      className={cn("w-full scroll-mt-14 py-16 md:py-20", PAD, dark ? "bg-ink text-white" : "bg-background text-foreground")}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div>
          <Icon className="size-10 text-nairobi" strokeWidth={1.3} aria-hidden />
          <h2 className="mt-6 text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.08] font-medium tracking-[-0.04em]">{block.title}</h2>
          <p className={cn("mt-3 text-lg leading-relaxed", dark ? "text-white/70" : "text-muted-foreground")}>{block.summary}</p>
        </div>
        <ul className="space-y-0">
          {block.points.map((p, i) => (
            <li
              key={i}
              className={cn(
                "border-t py-5 text-[1.08rem] leading-relaxed",
                dark ? "border-white/15 text-white/80" : "border-border text-foreground/80"
              )}
            >
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function TrustPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Trust And Safety"
        title="Built To Be Trusted By Both Sides."
        accent="Both Sides."
        lead="Sawa asks two writers to trust a result about their own work. Here is how it earns that: consent first, audio that stays with you, rules you can read, and limits we state openly."
        aside={
          <nav aria-label="On this page" className="rounded-2xl border border-border bg-card p-7">
            <p className="text-sm font-medium text-muted-foreground">On This Page</p>
            <ul className="mt-4 grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
              {[...BLOCKS.map((b) => ({ id: b.id, title: b.title })), { id: "report", title: "Report A Problem" }].map((b) => (
                <li key={b.id}>
                  <a href={`#${b.id}`} className="block rounded-lg py-1.5 text-[1.05rem] transition-colors hover:text-nairobi">
                    {b.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      {BLOCKS.map((b, i) => (
        <TrustBlock key={b.id} block={b} index={i + 1} />
      ))}

      <section id="report" data-nav="dark" className={cn("w-full scroll-mt-14 bg-ink py-16 text-white md:py-20", PAD)}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <Flag className="size-10 text-nairobi" strokeWidth={1.3} aria-hidden />
            <h2 className="mt-6 text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.08] font-medium tracking-[-0.04em]">Report A Problem</h2>
            <p className="mt-3 text-lg leading-relaxed text-white/70">If something looks wrong, we want to know.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={ADVISORIES}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl bg-nairobi p-7 text-white transition-colors hover:bg-nairobi/90"
            >
              <ScanEye className="size-8 text-white" strokeWidth={1.3} aria-hidden />
              <h3 className="mt-5 text-xl font-medium tracking-[-0.02em]">Report A Security Issue</h3>
              <p className="mt-2 leading-relaxed text-white/85">
                Use a private GitHub security advisory, so the details stay private until the issue is fixed.
              </p>
            </a>
            <a
              href={ISSUES}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-white/15 p-7 transition-colors hover:border-nairobi"
            >
              <Flag className="size-8 text-nairobi" strokeWidth={1.3} aria-hidden />
              <h3 className="mt-5 text-xl font-medium tracking-[-0.02em]">Report Anything Else</h3>
              <p className="mt-2 leading-relaxed text-white/65">
                For a wrong explanation, a confusing result or a bug, open an issue on GitHub.
              </p>
            </a>
          </div>
        </div>
        <p className="mt-10 text-white/60">
          Read how AI was used to build Sawa in our <Link href="/about#ai-disclosure" className="text-white underline underline-offset-4 hover:text-nairobi">AI disclosure</Link>.
        </p>
      </section>

      <CtaBand title="See It Settle A Real Split." />
    </PageShell>
  )
}
