import type { Metadata } from "next"
import { Ban, Clock, FileWarning, Link2, ListChecks, PenLine, ShieldCheck, Store } from "lucide-react"

import { DEMO_HREF } from "@/lib/site"
import { Card, CtaBand, PageHero, PageShell, PrimaryButton, SecondaryButton, Section } from "@/components/sawa/page-kit"

export const metadata: Metadata = {
  title: "For Platforms: Sawa",
  description:
    "For licensing platforms, labels, distributors and collecting societies: list and pay out only songs whose splits are agreed, signed and on the record.",
}

const PROBLEMS = [
  {
    icon: Ban,
    title: "Conflicting Registrations Freeze Money",
    body: "When co-writers register shares that do not add up, collecting societies hold the royalties until the conflict is resolved.",
  },
  {
    icon: FileWarning,
    title: "Payouts Depend On Splits",
    body: "A platform cannot pay a licence fee to the writers of a song until it knows how the song is split.",
  },
  {
    icon: Clock,
    title: "Split Sheets Arrive Late Or Never",
    body: "Remote co-writes happen over chat and file links. The paperwork, if it exists, is written long after anyone remembers clearly.",
  },
]

const ANATOMY = [
  { field: "Composition", body: "Each writer's share of the song, adding up to 100 points of human authorship." },
  { field: "Master", body: "Who owns the recording, tracked apart from the composition." },
  { field: "Rights Holders", body: "Every writer named, with city and role, and each signature with its time." },
  { field: "AI Disclosure", body: "Every AI tool that touched the song: generated, assistive, or a voice model with its consent record." },
  { field: "Rule Version", body: "The exact version of the rules both agents applied." },
  { field: "Agreement ID", body: "The writers' own split policy that the rules were weighted by." },
  { field: "Record SHA-256", body: "A hash of the whole record, so any change to it is visible." },
  { field: "Stems", body: "Referenced by fingerprint only. The audio stays with the writers." },
]

const STEPS = [
  {
    title: "Open A Session",
    body: "Your product sends Sawa the song and its writers. Each writer gets their own agent.",
  },
  {
    title: "Writers Bring Their Side",
    body: "Each writer adds their evidence through Sawa. You never handle their files.",
  },
  {
    title: "Both Agents Agree, Both Writers Sign",
    body: "Sawa returns a signed record only when both agents reach the same split and both writers sign.",
  },
  {
    title: "Store The Record, Check The Hash",
    body: "Keep the record and its SHA-256. Check it before you list a song or release a payout.",
  },
]

const PARTNERS = [
  {
    icon: Store,
    name: "Incantio",
    title: "A Listing Gate",
    body: "A song is listed for licensing only once a signed Sawa record exists for it, so every licence starts with settled splits.",
  },
  {
    icon: Link2,
    name: "BASIX.MARKET",
    title: "A Phigital Record",
    body: "The signed record travels with a physical and digital release as its credits and ownership record.",
  },
]

function RecordSample() {
  const rows: [string, string][] = [
    ["song", "amani-ni-sisi"],
    ["composition", "wanjiru 39.7 · malik 60.3"],
    ["master", "wanjiru 50 · malik 50"],
    ["ai_points", "15 (drum groove, owned by no one)"],
    ["rules", "split-v1"],
    ["agreement", "jua-2025"],
    ["stems", "3 fingerprints, no audio"],
    ["signatures", "2 of 2"],
    ["sha256", "9f2c…e41a"],
  ]
  return (
    <div className="rounded-2xl bg-white/5 p-7 font-mono text-[0.9rem]">
      <p className="mb-4 font-sans text-sm text-white/50">Signed record, fictional example</p>
      <dl className="space-y-2.5">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-3">
            <dt className="text-nairobi">{k}</dt>
            <dd className="break-words text-white/85">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default function PlatformsPage() {
  return (
    <PageShell>
      <PageHero
        tone="dark"
        eyebrow="For Licensing Platforms, Labels And Societies"
        title="List Only Songs Whose Splits Are Settled."
        accent="Splits Are Settled."
        lead="Sawa gives you one signed record per song: who wrote what, who owns the master, what AI was used, and proof that both writers agreed. Check it before you list, license or pay."
        actions={
          <>
            <PrimaryButton href="/developers">Read The API Docs</PrimaryButton>
            <SecondaryButton href={DEMO_HREF} onColor>
              Try The Demo
            </SecondaryButton>
          </>
        }
      />

      <Section
        eyebrow="The Problem"
        title="Unsettled Splits Stop The Money."
        lead="Disagreements about who wrote what rarely start as disputes. They start as two honest memories of the same session."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {PROBLEMS.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="p-8">
              <Icon className="size-9 text-nairobi" strokeWidth={1.3} aria-hidden />
              <h3 className="mt-6 text-xl font-medium tracking-[-0.02em]">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        tone="dark"
        eyebrow="The Signed Record"
        title="Everything You Need To License, In One Record."
        lead="A machine-readable record that both writers signed, built so you can check it rather than trust it."
      >
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {ANATOMY.map((a) => (
              <div key={a.field} className="border-t border-white/15 pt-4">
                <h3 className="text-lg font-medium tracking-[-0.02em]">{a.field}</h3>
                <p className="mt-1.5 leading-relaxed text-white/65">{a.body}</p>
              </div>
            ))}
          </div>
          <RecordSample />
        </div>
      </Section>

      <Section
        eyebrow="How Integration Works"
        title="Four Steps From Session To Signed Record."
        lead="Sawa runs as an API beside your product. Writers do the agreeing; your system stores the result."
      >
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-2xl bg-ink p-8 text-white">
              <span className="grid size-10 place-items-center rounded-full bg-nairobi text-sm font-medium text-white">{i + 1}</span>
              <h3 className="mt-8 text-xl font-medium tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-white/65">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <PrimaryButton href="/developers">See The API</PrimaryButton>
        </div>
      </Section>

      <Section
        id="societies"
        tone="orange"
        eyebrow="For Collecting Societies"
        title="Registrations That Match From The Start."
        lead="When every writer registers from the same signed record, the shares agree before they reach you."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Card tone="dark" className="p-8">
            <ListChecks className="size-9 text-nairobi" strokeWidth={1.3} aria-hidden />
            <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em]">Clean, Consistent Registrations</h3>
            <ul className="mt-4 space-y-3 leading-relaxed text-white/70">
              <li>Composition and master are kept apart, so each goes to the society that handles it.</li>
              <li>Shares add up to 100 for every right, with every rights holder named.</li>
              <li>AI-generated material is declared, so it is not registered as human authorship.</li>
              <li>Writers still register their own works. An export for societies is on our roadmap.</li>
            </ul>
          </Card>
          <Card tone="white" className="p-8">
            <ShieldCheck className="size-9 text-nairobi" strokeWidth={1.3} aria-hidden />
            <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em]">The Kenyan Context</h3>
            <div className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
              <p>
                Collective management in Kenya is changing. In October 2025 the Kenya Copyright Board (KECOBO) licensed KAMP,
                for producers of sound recordings, and PAVRISK, for performers, each for one year.
              </p>
              <p>
                MCSK, which has represented composers and publishers, was not licensed, and the matter went before the High
                Court. The government has also directed that music royalties be paid through e-Citizen.
              </p>
              <p>
                Because this is still moving, Sawa does not tell writers where to register. We point them to KECOBO&apos;s
                current list.
              </p>
            </div>
          </Card>
        </div>
      </Section>

      <Section
        tone="dark"
        eyebrow="Partner Concepts"
        title="Where The Signed Record Could Go Next."
        lead="These are ideas we have designed for, not live integrations. Both are pending confirmation from the partners named."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {PARTNERS.map(({ icon: Icon, name, title, body }) => (
            <div key={name} className="rounded-2xl border border-white/10 p-8">
              <div className="flex items-start justify-between gap-4">
                <Icon className="size-9 text-nairobi" strokeWidth={1.3} aria-hidden />
                <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70">
                  Concept Pending Partner Confirmation
                </span>
              </div>
              <p className="mt-6 text-sm text-white/50">{name}</p>
              <h3 className="mt-1 text-2xl font-medium tracking-[-0.03em]">{title}</h3>
              <p className="mt-2 leading-relaxed text-white/65">{body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 flex items-center gap-2 text-white/60">
          <PenLine className="size-4 text-nairobi" aria-hidden />
          Interested in building this with us? Start with the API and the source on GitHub.
        </p>
      </Section>

      <CtaBand
        title="Build On The Signed Record."
        lead="The API, the record schema and copy-paste examples are on the developer page."
        href="/developers"
        label="Read The API Docs"
      />
    </PageShell>
  )
}
