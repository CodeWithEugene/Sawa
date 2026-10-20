import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"

import { GITHUB_URL as GITHUB } from "@/lib/site"
import { Card, CtaBand, PageHero, PageShell, PrimaryButton, SecondaryButton, Section } from "@/components/sawa/page-kit"

export const metadata: Metadata = {
  title: "About: Sawa",
  description:
    "Why Sawa exists, how it was built for the BASIX State of the Art Hackathon 2026, who built it, what comes next, and how AI was used to make it.",
}


const STORY = [
  { label: "Hackathon", value: "BASIX State of the Art Hackathon 2026" },
  { label: "Track", value: "Track 2, Omega AI Agents" },
  { label: "Challenge", value: "Two Agents, One Truth" },
  { label: "Art Brief", value: "AI for Peace" },
]

const ROADMAP = [
  { title: "More Than Two Writers", body: "Sessions for three or more co-writers, each with their own agent." },
  { title: "Audio Evidence", body: "Recordings weighed as evidence with their own level of confidence, not only as fingerprints." },
  { title: "Live Session Capture", body: "A split sheet that records who did what while the session is still happening." },
  { title: "Royalty Statement Checks", body: "Statements compared against the signed split, so a wrong payout is easy to spot." },
  { title: "Collecting Society Export", body: "A registration file each writer can take to their own society." },
  { title: "On-Device Agents", body: "Each writer's agent running on their own phone or laptop." },
  { title: "Governed Policy Updates", body: "Changes to the rules proposed, shown as a clear difference, and agreed by both writers." },
]

const CREDITS = [
  { name: "SingularityNET Omega", note: "Apache-2.0. Its NAL library is used unmodified for the agents' reasoning." },
  { name: "Hyperon", note: "The MeTTa runtime the agents run on." },
  { name: "TypeSafe Jev", note: "Reads chat messages into statements that their authors confirm." },
  { name: "shadcn/ui", note: "Interface components." },
  { name: "Next.js", note: "The website and demo." },
  { name: "FastAPI", note: "The API that hosts the two agents." },
  { name: "Mizani", note: "Our earlier hackathon project. Sawa's engine pattern is adapted from it." },
]

const AI_USE = [
  {
    tool: "Claude Code",
    by: "Anthropic",
    use: "Used to research the problem, plan the product, write the documents and build the code, with every step reviewed by the builder.",
  },
  {
    tool: "TypeSafe Jev",
    by: "TypeSafe",
    use: "Used to score candidate ideas as an independent check while choosing the problem, and inside Sawa to read chat messages. It never produces a share, a rule or an explanation.",
  },
  {
    tool: "KittenTTS",
    by: "Open source",
    use: "Used for the demo video's narration, in a clone of the builder's own voice.",
  },
]

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Sawa"
        title="Fair Credit, Agreed By The People Who Made It."
        accent="Agreed"
        lead="Sawa means equal, fair and agreed in Kiswahili. Our mission is simple: every person who helps write a song should be credited for their part, on the record, before the money moves."
        actions={
          <>
            <PrimaryButton href="#story">Read The Story</PrimaryButton>
            <SecondaryButton href={GITHUB}>View On GitHub</SecondaryButton>
          </>
        }
      />

      <Section
        id="story"
        tone="dark"
        eyebrow="The Story"
        title="Two Accounts Of One Event, Mediated To One Story."
      >
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-5 text-lg leading-relaxed text-white/75">
            <p>
              Sawa was built for the BASIX State of the Art Hackathon 2026, in Track 2 for Omega AI agents. The challenge, called
              Two Agents, One Truth, asked for two agents that disagree about a fact and reason their way to a shared answer.
            </p>
            <p>
              The AI for Peace art brief asked for two communities&apos; accounts of one event, mediated to one story. We found
              that story in a co-write between a producer in Harlem and a singer in Nairobi, who each remember making the same
              song differently.
            </p>
            <p>
              So Sawa gives each of them an agent that remembers their side. The agents exchange evidence, reason on their own,
              and only settle when both reach the same split. Wanjiru, Malik and their song &ldquo;Amani Ni Sisi&rdquo; are
              fictional, and every file in the demo is synthetic.
            </p>
          </div>
          <dl className="grid content-start gap-3">
            {STORY.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 p-6">
                <dt className="text-sm text-white/50">{s.label}</dt>
                <dd className="mt-1 text-xl font-medium tracking-[-0.02em]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section eyebrow="The Team" title="Who Built Sawa.">
        <Card className="flex max-w-2xl flex-col gap-6 p-8 sm:flex-row sm:items-center">
          <div
            aria-hidden
            className="grid size-20 shrink-0 place-items-center rounded-full bg-nairobi text-2xl font-medium tracking-[-0.03em] text-white"
          >
            EM
          </div>
          <div>
            <h3 className="text-2xl font-medium tracking-[-0.03em]">Eugene Mutembei</h3>
            <p className="mt-1 text-muted-foreground">Builder, Team Technetians, Nairobi</p>
            <p className="mt-3 leading-relaxed text-foreground/75">
              Chose the problem, approved the plan before any code was written, reviews the Kiswahili text, and is accountable for
              everything in Sawa.
            </p>
          </div>
        </Card>
      </Section>

      <Section
        id="roadmap"
        tone="orange"
        eyebrow="Roadmap"
        title="What Comes Next."
        lead="Sawa is a prototype. These are the next things we want to build, roughly in order."
      >
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ROADMAP.map((r, i) => (
            <li key={r.title} className="rounded-2xl bg-ink p-7 text-white">
              <span className="tabular text-sm text-nairobi">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-xl font-medium tracking-[-0.02em]">{r.title}</h3>
              <p className="mt-2 leading-relaxed text-white/65">{r.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Credits" title="Built On Open Work." lead="Third-party components keep their own licences.">
        <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {CREDITS.map((c) => (
            <li key={c.name} className="border-t border-border py-5">
              <p className="text-lg font-medium tracking-[-0.02em]">{c.name}</p>
              <p className="mt-1 leading-relaxed text-muted-foreground">{c.note}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="ai-disclosure"
        tone="dark"
        eyebrow="AI Disclosure"
        title="How AI Was Used To Make Sawa."
        lead="Using AI was allowed in this hackathon; hiding it was not. Here is every AI tool we used and what it did."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {AI_USE.map((a) => (
            <div key={a.tool} className="rounded-2xl border border-white/10 p-8">
              <p className="text-sm text-white/50">{a.by}</p>
              <h3 className="mt-1 text-2xl font-medium tracking-[-0.03em]">{a.tool}</h3>
              <p className="mt-3 leading-relaxed text-white/70">{a.use}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-nairobi p-8 text-white">
            <h3 className="text-xl font-medium tracking-[-0.02em]">What AI Did Not Do</h3>
            <p className="mt-2 leading-relaxed text-white/85">
              No AI model decides or explains any share in Sawa. No partner data, artwork, recording or real person&apos;s data
              was given to any AI tool.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 p-8">
            <h3 className="text-xl font-medium tracking-[-0.02em]">Read The Full Disclosure</h3>
            <p className="mt-2 leading-relaxed text-white/70">
              The complete list, kept up to date as the work continues, is in the repository.
            </p>
            <a
              href={`${GITHUB}/blob/main/AI_DISCLOSURE.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-white underline underline-offset-4 hover:text-nairobi"
            >
              Open AI Disclosure <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </Section>

      <CtaBand
        title="See Sawa At Work."
        lead="Watch two agents settle a fictional co-write, or read every line of the source on GitHub."
      />
    </PageShell>
  )
}
