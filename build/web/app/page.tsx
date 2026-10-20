import Link from "next/link"
import {
  ArrowRight,
  AudioWaveform,
  BadgeCheck,
  FileCheck2,
  Handshake,
  Languages,
  MicVocal,
  Scale,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from "lucide-react"

import { HalftoneDunes } from "@/components/sawa/halftone-dunes"
import { SiteFooter, SiteHeader } from "@/components/sawa/site-header"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const DEMO = "/session/amani-ni-sisi"

const FEATURES = [
  {
    icon: Scale,
    title: "Fair By Evidence",
    body: "Shares come from the files, messages and edits, not from who argues loudest.",
  },
  {
    icon: Handshake,
    title: "Both Sides Agree",
    body: "Each writer has their own agent. Nothing counts until both reach the same answer.",
  },
  {
    icon: Languages,
    title: "Clear In Your Language",
    body: "Every share is explained in plain English or Swahili.",
  },
  {
    icon: FileCheck2,
    title: "Ready To License",
    body: "Signed in the session, with any AI use disclosed.",
  },
]

const STEPS = [
  {
    n: "1",
    title: "Each writer brings their side",
    body: "Voice memos, project files, lyric edits and chats. Each writer's agent remembers only what that writer made and saw.",
  },
  {
    n: "2",
    title: "The agents weigh the evidence",
    body: "They share what they hold and work through it on their own. Both must land on the same split, or Sawa says so.",
  },
  {
    n: "3",
    title: "Everyone sees why, then signs",
    body: "Every percentage comes with a reason. Disagree with something? Challenge it, and the split is recalculated in front of you.",
  },
]

function Rings({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 300" className={className} aria-hidden>
      <defs>
        <clipPath id="hero-l">
          <circle cx="180" cy="150" r="128" />
        </clipPath>
      </defs>
      <circle
        cx="180"
        cy="150"
        r="128"
        fill="none"
        stroke="var(--nairobi)"
        strokeWidth="14"
      />
      <circle
        cx="300"
        cy="150"
        r="128"
        fill="none"
        stroke="var(--harlem)"
        strokeWidth="14"
      />
      <circle
        cx="300"
        cy="150"
        r="121"
        fill="var(--ink)"
        clipPath="url(#hero-l)"
      />
    </svg>
  )
}

export default function Home() {
  return (
    <>
      <main>
        {/* hero: one screen, like a poster */}
        <section className="relative flex min-h-svh flex-col overflow-hidden">
          <SiteHeader nav className="static bg-transparent backdrop-blur-none">
            <Link
              href={DEMO}
              className="text-[1.05rem] text-foreground/85 transition-colors hover:text-foreground"
            >
              Try The Demo
            </Link>
          </SiteHeader>

          <div className="relative z-10 grid w-full items-center gap-10 px-6 pt-10 md:px-10 md:pt-16 lg:grid-cols-[1fr_auto] lg:px-16 2xl:px-24">
            <div>
              <h1 className="animate-rise text-[clamp(2.9rem,6.3vw,6.6rem)] leading-[1.02] font-medium tracking-[-0.045em] text-[#3a3a3c]">
                Two Memories.
                <br />
                <span className="text-nairobi">One</span> Agreement.
              </h1>
              <p className="animate-rise mt-6 max-w-[40rem] text-[1.2rem] leading-snug text-[#3a3a3c] [animation-delay:90ms]">
                Sawa helps co-writers settle who wrote what, fairly and on the
                record, so the music they make together can be licensed and
                paid.
              </p>
              <div className="animate-rise mt-9 flex flex-wrap gap-6 [animation-delay:170ms]">
                <Link
                  href={DEMO}
                  className="inline-flex h-[52px] items-center rounded-[10px] bg-nairobi px-11 text-[1.05rem] font-light text-white transition-colors hover:bg-nairobi/90"
                >
                  Try The Demo
                </Link>
                <a
                  href="#how"
                  className="inline-flex h-[52px] items-center rounded-[10px] bg-white/80 px-10 text-[1.05rem] text-foreground transition-colors hover:bg-white"
                >
                  See How It Works
                </a>
              </div>
            </div>
            <Rings className="hidden w-[300px] md:block lg:w-[380px] xl:w-[440px]" />
          </div>

          {/* landscape: hills fill the rest of the screen, features sit in the black */}
          <div className="relative mt-10 min-h-[480px] flex-1">
            <HalftoneDunes className="absolute inset-0" />
            <div className="absolute inset-x-0 bottom-[9%] grid gap-x-8 gap-y-10 px-6 sm:grid-cols-2 md:px-10 lg:grid-cols-4 lg:px-24 2xl:px-32">
              {FEATURES.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-5">
                  <span className="grid size-[50px] shrink-0 place-items-center rounded-[10px] border border-nairobi/60 text-white">
                    <Icon className="size-[22px]" strokeWidth={1.7} />
                  </span>
                  <div className="pt-0.5">
                    <p className="text-[1.15rem] text-white">{title}</p>
                    <p className="mt-1.5 max-w-[16rem] text-[0.95rem] leading-snug text-white/60">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* the problem */}
        <section
          id="artists"
          className="w-full scroll-mt-20 px-6 py-24 md:px-10 md:py-32 lg:px-16 2xl:px-24"
        >
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow text-nairobi-ink">The problem</p>
              <h2 className="mt-4 text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.05] font-medium tracking-[-0.04em]">
                When co-writers remember it differently, the money stops.
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              A producer in Harlem and a singer in Nairobi make a song over
              WhatsApp. Weeks later, someone wants to license it, and each of
              them remembers a different split. Until they agree, collecting
              societies hold the royalties and licensing platforms can&apos;t
              pay anyone.
            </p>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {[
              [
                "$424M",
                "in unmatched US streaming royalties handed to the Mechanical Licensing Collective in 2021",
              ],
              [
                "KSh 75.7M",
                "under-distributed by one Kenyan collecting society between 2020 and 2022",
              ],
              [
                "10%",
                'what co-writers of Tyla\'s hit "Water" say they were offered for their work',
              ],
            ].map(([num, text]) => (
              <div key={num} className="bg-card p-8">
                <p className="tabular text-4xl font-medium tracking-[-0.04em]">
                  {num}
                </p>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* how it works */}
        <section
          id="how"
          className="scroll-mt-20 bg-ink text-white"
        >
          <div className="w-full px-6 py-24 md:px-10 md:py-32 lg:px-16 2xl:px-24">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-[0.78rem] font-medium text-nairobi">How it works</p>
                <h2 className="mt-4 max-w-2xl text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.05] font-medium tracking-[-0.04em]">
                  From two stories to one signed split sheet.
                </h2>
              </div>
              <Link
                href={DEMO}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 rounded-xl border-white/20 bg-transparent px-6 text-base font-normal text-white hover:bg-white/10 hover:text-white"
                )}
              >
                Walk Through The Demo <ArrowRight data-icon="inline-end" />
              </Link>
            </div>
            <ol className="mt-16 grid gap-6 md:grid-cols-3">
              {STEPS.map((s) => (
                <li
                  key={s.n}
                  className="rounded-2xl bg-nairobi p-8 text-white"
                >
                  <span className="grid size-10 place-items-center rounded-full bg-white text-sm font-medium text-nairobi-ink">
                    {s.n}
                  </span>
                  <h3 className="mt-8 text-2xl font-medium tracking-[-0.03em]">
                    {s.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-white/85">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* AI music */}
        <section
          id="ai"
          className="w-full scroll-mt-20 bg-nairobi text-white px-6 py-24 md:px-10 md:py-32 lg:px-16 2xl:px-24"
        >
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-[0.78rem] font-medium text-white/80">
                Made for how music is made now
              </p>
              <h2 className="mt-4 text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.05] font-medium tracking-[-0.04em]">
                AI in the session. On the record.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/85">
                Producers generate drum loops. Singers lend their voice to a
                model for a demo. Sawa keeps track of all of it, so the people
                get the credit and the machine gets disclosed.
              </p>
            </div>
            <ul className="grid gap-4">
              {[
                [
                  AudioWaveform,
                  "AI parts are disclosed, and owned by no one",
                  "A generated groove is recorded with the tool and the prompt. No person gets a share for what the machine made.",
                ],
                [
                  SlidersHorizontal,
                  "You are credited for what you changed",
                  "Rework a generated part and Sawa credits you for that work, nothing more and nothing less.",
                ],
                [
                  MicVocal,
                  "Voices need consent",
                  "If a voice model of a singer was used, Sawa will not let anyone sign until that singer's consent is on the record.",
                ],
              ].map(([Icon, title, body]) => {
                const I = Icon as typeof AudioWaveform
                return (
                  <li
                    key={title as string}
                    className="flex items-start gap-6 rounded-2xl bg-ink p-7 text-white"
                  >
                    <I
                      className="mt-0.5 size-9 shrink-0 text-nairobi"
                      strokeWidth={1.4}
                      aria-hidden
                    />
                    <div>
                      <p className="text-lg font-medium tracking-[-0.02em]">
                        {title as string}
                      </p>
                      <p className="mt-1.5 leading-relaxed text-white/65">
                        {body as string}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        {/* technology */}
        <section id="omega" className="scroll-mt-20 bg-ink text-white">
          <div className="grid w-full gap-14 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-[1.1fr_1fr] lg:px-16 2xl:px-24">
            <div>
              <p className="text-[0.78rem] font-medium text-nairobi">
                Technology
              </p>
              <h2 className="mt-4 text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.05] font-medium tracking-[-0.04em]">
                Built on SingularityNET Omega.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
                Each writer&apos;s agent runs on Omega, an open agent framework
                that remembers, reasons about uncertain evidence, and shows its
                work. No chatbot decides who wrote what. The agents work it out
                with logic you can inspect, and prove they agree.
              </p>
            </div>
            <ul className="grid gap-px self-center overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              {[
                [
                  Users,
                  "Two independent agents",
                  "Each keeps its own memory. Neither can see the other's evidence until it is shared.",
                ],
                [
                  ShieldCheck,
                  "Same evidence, same answer",
                  "Both agents compute the split separately. A matching agreement ID proves they reached the same result.",
                ],
                [
                  BadgeCheck,
                  "Every number has a reason",
                  "Each share traces back to the files and messages behind it, with how sure the agents are.",
                ],
              ].map(([Icon, title, body]) => {
                const I = Icon as typeof Users
                return (
                  <li key={title as string} className="flex gap-4 bg-ink p-6">
                    <I
                      className="mt-0.5 size-5 shrink-0 text-nairobi"
                      strokeWidth={1.8}
                    />
                    <div>
                      <p className="font-medium">{title as string}</p>
                      <p className="mt-1 leading-relaxed text-white/60">
                        {body as string}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full px-6 py-24 text-center md:px-10 md:py-32 lg:px-16 2xl:px-24">
          <h2 className="mx-auto max-w-3xl text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.05] font-medium tracking-[-0.04em]">
            Settle the split before it settles you.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Follow Wanjiru and Malik as their agents work out who wrote
            &ldquo;Amani Ni Sisi&rdquo;.
          </p>
          <Link
            href={DEMO}
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-9 h-13 rounded-xl bg-nairobi px-8 text-[1.02rem] font-normal text-white hover:bg-nairobi/90"
            )}
          >
            Try The Demo
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
