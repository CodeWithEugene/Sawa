import type { Metadata } from "next"
import {
  AudioLines,
  Bot,
  FileAudio,
  FileText,
  Fingerprint,
  Handshake,
  MessageSquareWarning,
  MessagesSquare,
  MicVocal,
  RefreshCw,
  Signature,
  UserRound,
  WandSparkles,
} from "lucide-react"

import { ArtistsFaq } from "@/components/sawa/artists-faq"
import { DEMO_HREF } from "@/lib/site"
import { Card, CtaBand, PageHero, PageShell, PrimaryButton, SecondaryButton, Section } from "@/components/sawa/page-kit"

export const metadata: Metadata = {
  title: "For Artists: Sawa",
  description:
    "For songwriters and producers: bring your voice memos, project files and chats, see how your split is weighed, and sign one split sheet you both agree on.",
}

const BRING = [
  { icon: MicVocal, title: "Voice Memos", body: "The hum, the hook, the first take. Your phone already knows when you made it." },
  { icon: FileAudio, title: "Project Files", body: "FL Studio, Ableton or Logic sessions, MIDI and bounces, with the dates they were saved." },
  { icon: FileText, title: "Lyric Documents", body: "Shared docs and notes, with the edit history that shows who typed which line." },
  { icon: MessagesSquare, title: "Chats", body: "The WhatsApp or DM thread where the song came together. You choose which messages count." },
  { icon: UserRound, title: "Your Own Account", body: "What you remember, in your own words. It counts too, just less than records made at the time." },
]

const RULES = [
  {
    title: "Started It Or Developed It",
    body: "Whoever started a part takes 75 of its points and whoever developed it takes 25, unless your agreement says otherwise.",
  },
  {
    title: "Written Together",
    body: "When the evidence shows you wrote a part together, it is shared equally.",
  },
  {
    title: "Records Made At The Time Count More",
    body: "A timestamped file or an edit in a shared document outweighs anyone's memory of it.",
  },
  {
    title: "Memories After A Dispute Count For Less",
    body: "An account written after you started disagreeing still counts, but with less weight than what was recorded before.",
  },
  {
    title: "Your Agreement, Your Rules",
    body: "The weights come from an agreement you both signed. Change them together, and every version is kept.",
  },
  {
    title: "The Master Is Tracked Apart",
    body: "Who owns the recording is a separate question from who wrote the song, so the split sheet keeps them apart.",
  },
]

const DISAGREE = [
  {
    icon: MessageSquareWarning,
    title: "Challenge Any Evidence",
    body: "Think a file or a message is being read the wrong way? Challenge it and give your reason.",
  },
  {
    icon: RefreshCw,
    title: "Both Agents Recompute",
    body: "Each agent works the split out again on its own, in front of you, with the challenged item set aside.",
  },
  {
    icon: Signature,
    title: "Nothing Counts Until Both Sign",
    body: "If the agents do not reach the same answer, signing stays closed and Sawa tells you which line is still open.",
  },
]

const AI = [
  {
    icon: Bot,
    title: "Generated Parts Are Owned By No One",
    body: "Anything an AI tool generated is disclosed on the split sheet and left out of everyone's share.",
  },
  {
    icon: WandSparkles,
    title: "You Are Credited For What You Changed",
    body: "Rework an AI loop, add your own parts, and you are credited for developing it.",
  },
  {
    icon: AudioLines,
    title: "Voice Models Need Consent",
    body: "A model of someone's voice can only be used with that singer's recorded consent, and the sheet says so.",
  },
]

function PolicyBar() {
  const parts = [
    { label: "Beat", value: 50, className: "bg-ink text-white" },
    { label: "Melody", value: 25, className: "bg-nairobi text-white" },
    { label: "Lyrics", value: 25, className: "bg-nairobi-soft text-nairobi-ink" },
  ]
  return (
    <div>
      <div className="flex h-24 overflow-hidden rounded-2xl" role="img" aria-label="Beat 50, melody 25, lyrics 25">
        {parts.map((p) => (
          <div key={p.label} style={{ width: `${p.value}%` }} className={`flex flex-col justify-end p-4 ${p.className}`}>
            <span className="tabular text-2xl font-medium tracking-[-0.03em]">{p.value}</span>
            <span className="text-sm opacity-80">{p.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex text-sm text-muted-foreground">
        <span className="w-1/2">The beat half</span>
        <span className="w-1/2">The topline half</span>
      </div>
    </div>
  )
}

function HeroSplit() {
  return (
    <Card tone="dark" className="p-8">
      <p className="text-sm text-white/60">&ldquo;Amani Ni Sisi&rdquo;, composition</p>
      <div className="mt-6 space-y-5">
        {[
          { name: "Wanjiru", city: "Nairobi", share: 39.7, color: "bg-nairobi" },
          { name: "Malik", city: "Harlem", share: 60.3, color: "bg-harlem" },
        ].map((w) => (
          <div key={w.name}>
            <div className="flex items-baseline justify-between">
              <p className="text-lg">
                {w.name} <span className="text-white/50">{w.city}</span>
              </p>
              <p className="tabular text-3xl font-medium tracking-[-0.03em]">{w.share}</p>
            </div>
            <div className="mt-2 h-2 rounded-full bg-white/10">
              <div className={`h-2 rounded-full ${w.color}`} style={{ width: `${w.share}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 border-t border-white/10 pt-4 text-sm leading-relaxed text-white/60">
        15 points of AI-generated drums are disclosed and owned by no one. The writers, the song and the files in this example
        are fictional.
      </p>
    </Card>
  )
}

export default function ArtistsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="For Songwriters And Producers"
        title="Get Credited For What You Made."
        accent="What You Made."
        lead="Bring what you already have from the session. Your agent and your co-writer's agent weigh it, explain every share in English or Kiswahili, and nothing counts until you both sign."
        actions={
          <>
            <PrimaryButton href={DEMO_HREF}>Try The Demo</PrimaryButton>
            <SecondaryButton href="#weighed">How Splits Are Weighed</SecondaryButton>
          </>
        }
        aside={<HeroSplit />}
      />

      <Section
        tone="dark"
        eyebrow="What To Bring"
        title="Bring What The Session Left Behind."
        lead="You do not need a contract or a lawyer to start. The things you already have on your phone and laptop are the evidence."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {BRING.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-white/10 p-7">
              <Icon className="size-9 text-nairobi" strokeWidth={1.3} aria-hidden />
              <h3 className="mt-6 text-xl font-medium tracking-[-0.02em]">{title}</h3>
              <p className="mt-2 leading-relaxed text-white/65">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-5 rounded-2xl bg-nairobi p-8 text-white md:flex-row md:items-center">
          <Fingerprint className="size-12 shrink-0" strokeWidth={1.2} aria-hidden />
          <div>
            <h3 className="text-2xl font-medium tracking-[-0.03em]">Your Audio Never Leaves Your Phone.</h3>
            <p className="mt-2 max-w-3xl text-lg leading-relaxed text-white/85">
              Sawa shares a fingerprint of each file and the time it was made, never the file itself. Your stems and memos stay
              with you.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="weighed"
        eyebrow="How Splits Are Weighed"
        title="Clear Rules You Can Read Before You Start."
        lead="By default the beat is half the song and the topline is the other half, split equally between melody and lyrics. That is a common starting point in hip hop, Afrobeats and amapiano co-writes, and you can agree on different weights."
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <PolicyBar />
            <p className="mt-8 leading-relaxed text-muted-foreground">
              Each half is broken into parts, like the chords, the drum groove, the hook melody and each verse. Every part is
              credited on its own, then the parts add up to your share.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {RULES.map((r) => (
              <Card key={r.title}>
                <h3 className="text-lg font-medium tracking-[-0.02em]">{r.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{r.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section
        tone="orange"
        eyebrow="When You Disagree"
        title="Disagreeing Is Part Of The Process."
        lead="Sawa starts from the fact that you remember it differently. It never fakes agreement and never signs for you."
      >
        <ol className="grid gap-4 md:grid-cols-3">
          {DISAGREE.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className="rounded-2xl bg-ink p-8 text-white">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-full bg-white text-sm font-medium text-ink">{i + 1}</span>
                <Icon className="size-8 text-nairobi" strokeWidth={1.3} aria-hidden />
              </div>
              <h3 className="mt-8 text-2xl font-medium tracking-[-0.03em]">{title}</h3>
              <p className="mt-3 leading-relaxed text-white/65">{body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        tone="dark"
        eyebrow="Using AI In Your Session"
        title="Use AI Openly. Get Credited For Your Part."
        lead="Many producers already use AI to separate stems, clean up a phone recording or sketch a loop. Sawa records it plainly, so nobody has to guess later."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {AI.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-white/10 p-8">
              <Icon className="size-9 text-nairobi" strokeWidth={1.3} aria-hidden />
              <h3 className="mt-6 text-xl font-medium tracking-[-0.02em]">{title}</h3>
              <p className="mt-2 leading-relaxed text-white/65">{body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl leading-relaxed text-white/65">
          Assistive tools like stem separation or mastering are disclosed too, but they do not change who wrote what. In the
          demo, an AI drum loop that Malik reworked leaves 15 points owned by no one, and his own changes are credited to him.
        </p>
      </Section>

      <Section
        eyebrow="In Your Language"
        title="Every Explanation, In English And Kiswahili."
        lead="Each share comes with a plain sentence that says why. Switch languages at any point. Both versions are written from the same reasoning, so they always say the same thing."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-8">
            <p className="text-sm font-medium text-muted-foreground">English</p>
            <p className="mt-4 text-[1.35rem] leading-snug tracking-[-0.02em]">
              Hook melody: Wanjiru started it and Malik developed it, so Wanjiru takes 75 and Malik takes 25 under your agreed
              policy.
            </p>
          </Card>
          <Card tone="orange" className="p-8">
            <p className="text-sm font-medium text-white/80" lang="sw">
              Kiswahili
            </p>
            <p className="mt-4 text-[1.35rem] leading-snug tracking-[-0.02em]" lang="sw">
              Melodia ya kiitikio: Wanjiru aliianzisha na Malik akaiendeleza, kwa hivyo Wanjiru anapata 75 na Malik anapata 25
              kwa sera mliyokubaliana.
            </p>
          </Card>
        </div>
        <div className="mt-6 flex items-center gap-3 text-muted-foreground">
          <Handshake className="size-5 shrink-0 text-nairobi" aria-hidden />
          <p>Explanations come from the reasoning itself, never from a chatbot, and a person reviews the Kiswahili text.</p>
        </div>
      </Section>

      <Section tone="dark" eyebrow="Questions" title="Questions Writers Ask.">
        <ArtistsFaq />
      </Section>

      <CtaBand
        title="See How Your Split Would Be Weighed."
        lead="Walk through a fictional co-write between Wanjiru in Nairobi and Malik in Harlem, then challenge anything you disagree with."
      />
    </PageShell>
  )
}
