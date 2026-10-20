import Link from "next/link"
import { ArrowRight, FileAudio, GitMerge, Languages, PenLine, ScanSearch, ShieldCheck } from "lucide-react"

import { SawaMark } from "@/components/sawa/brand"
import { SiteFooter, SiteHeader } from "@/components/sawa/site-header"
import { Vinyl } from "@/components/sawa/vinyl"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const SESSION = "/session/amani-ni-sisi"

const steps = [
  {
    n: "01",
    title: "Remember",
    body: "Each writer has an Omega agent that holds only their side of the session: files with hashes and timestamps, chat messages, document edits, their own account.",
    icon: FileAudio,
  },
  {
    n: "02",
    title: "Reconcile",
    body: "The agents exchange evidence as atoms, never audio. Each one reasons on its own with Omega's NAL: defeaters, revision, truth values. Same evidence, same rules, same proof hash.",
    icon: GitMerge,
  },
  {
    n: "03",
    title: "Sign",
    body: "Every share explains itself in English or Swahili. Either writer can contest any premise. Nothing counts until both sign, and the signed sheet is hashed.",
    icon: PenLine,
  },
]

const trust = [
  ["The AI will side with whoever paid for it.", "Each writer has their own agent. The answer only counts when both agents reach the same proof hash."],
  ["It will make up who wrote what.", "Shares come only from evidence the writers supplied and confirmed. Every share shows its sources."],
  ["I can't argue with it.", "Contest any premise with a reason. It is recorded, and both agents recompute in front of you."],
  ["It's not in my language.", "Every explanation in English and Swahili, rendered from the same proof."],
]

const RULE = `;; D1 received-before-created
;; A file made after its maker received the other
;; writer's version of the same part is evidence
;; of developing that part, not starting it.
(= (select artefact $by $t $el $role)
   (if (and (== $role originated)
            (received-before $by $el $t))
       (received-before-created developed)
       (artefact $role)))

;; every truth value is one Omega deduction
(|-nal ((observed $id) (stv 1.0 0.9))
       ((==> (observed $id) ($role $el $w)) $rule-tv))`

export default function Home() {
  return (
    <>
      <SiteHeader>
        <span className="hidden font-mono text-[0.7rem] tracking-[0.14em] text-muted-foreground uppercase md:inline">
          Omega · MeTTa · Two Agents
        </span>
        <Link href={SESSION} className={cn(buttonVariants({ size: "lg" }), "rounded-full px-4")}>
          Open The Session <ArrowRight data-icon="inline-end" />
        </Link>
      </SiteHeader>

      <main>
        {/* hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-[1320px] gap-10 px-5 pt-14 pb-20 md:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:pt-20 lg:pb-28">
            <div className="relative z-10 flex flex-col justify-center">
              <p className="eyebrow animate-rise">Two Agents, One Truth · Harlem and Nairobi</p>
              <h1 className="font-display mt-5 text-[clamp(2.9rem,6.4vw,6.2rem)] leading-[0.92] font-[520] tracking-[-0.035em] text-balance animate-rise [animation-delay:80ms]">
                Two creators.
                <br />
                Two memories.
                <br />
                <span className="font-display-wonk italic text-truth-ink">One split sheet.</span>
              </h1>
              <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-muted-foreground animate-rise [animation-delay:160ms]">
                Every co-written song has two memories of how it was made, and they never match. Sawa gives each
                writer a SingularityNET Omega agent that remembers their side. The agents start in disagreement and
                reason, on their own, to the same split sheet, with a proof both writers can read, contest and sign.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3 animate-rise [animation-delay:240ms]">
                <Link href={SESSION} className={cn(buttonVariants({ size: "lg" }), "h-11 rounded-full px-6 text-[0.95rem]")}>
                  Settle &ldquo;Amani Ni Sisi&rdquo; <ArrowRight data-icon="inline-end" />
                </Link>
                <a href="#how" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 rounded-full px-5 text-[0.95rem]")}>
                  How Sawa Works
                </a>
              </div>
            </div>

            {/* the sleeve */}
            <div className="relative mx-auto h-[440px] w-full max-w-[560px] animate-rise [animation-delay:200ms] lg:h-[520px]">
              <div className="absolute top-4 right-2 left-10 h-[380px] rotate-[2.5deg] rounded-[1.4rem] border border-border bg-card shadow-xl lg:h-[440px]">
                <div className="flex h-full flex-col justify-between p-7">
                  <div>
                    <p className="eyebrow">Liner Notes · Synthetic</p>
                    <p className="font-display mt-3 text-4xl font-[560] tracking-tight">Amani Ni Sisi</p>
                    <p className="font-display text-lg italic text-muted-foreground">Peace Is Us</p>
                  </div>
                  <dl className="grid max-w-[15rem] gap-2 text-sm">
                    <div className="flex justify-between gap-4 border-b border-dashed border-border pb-1.5">
                      <dt className="text-muted-foreground">Written by</dt>
                      <dd className="font-medium">?</dd>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-dashed border-border pb-1.5">
                      <dt className="text-muted-foreground">Recorded</dt>
                      <dd>Harlem · Nairobi</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Split</dt>
                      <dd className="font-mono text-xs">unsigned</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="absolute top-[150px] -left-2 rotate-[-8deg] lg:top-[170px]">
                <Vinyl wanjiru={35} malik={65} size={250} label="Harlem draft" />
              </div>
              <div className="absolute top-[40px] right-[-10px] rotate-[6deg] lg:top-[30px]">
                <Vinyl wanjiru={60} malik={40} size={230} label="Nairobi draft" />
              </div>
              <div className="absolute right-6 bottom-0 flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 shadow-md backdrop-blur lg:bottom-4">
                <span className="size-2 rounded-full bg-nairobi" />
                <span className="text-sm">Wanjiru, Nairobi</span>
                <span className="mx-1 text-muted-foreground">×</span>
                <span className="size-2 rounded-full bg-harlem" />
                <span className="text-sm">Malik, Harlem</span>
              </div>
            </div>
          </div>
        </section>

        {/* the problem, as a pull quote */}
        <section className="border-y border-border/70 bg-paper-deep/60">
          <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-16 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
            <p className="font-display text-3xl leading-tight font-[480] tracking-tight text-balance md:text-[2.6rem]">
              When co-writers register different splits, the money is{" "}
              <span className="font-display-wonk italic text-nairobi-ink">held until they agree.</span>
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                ["US$424M", "historical unmatched US royalties handed to the MLC in 2021"],
                ["KSh 75.7M", "under-distributed by one Kenyan collecting society, 2020 to 2022"],
                ["10%", "what co-writers of Tyla's \"Water\" say they were offered"],
              ].map(([num, text]) => (
                <div key={num} className="border-t-2 border-ink pt-3">
                  <p className="font-display tabular text-3xl font-[600] tracking-tight">{num}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* how */}
        <section id="how" className="mx-auto max-w-[1320px] scroll-mt-20 px-5 py-20 md:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="font-display text-4xl font-[520] tracking-tight md:text-5xl">How Sawa Works</h2>
            <p className="max-w-md text-muted-foreground">
              Jev reads. Omega decides. The writers confirm, contest and sign.
            </p>
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
            {steps.map(({ n, title, body, icon: Icon }) => (
              <li key={n} className="group relative bg-card p-8 transition-colors hover:bg-background">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">{n}</span>
                  <Icon className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                </div>
                <h3 className="font-display mt-10 text-3xl font-[560] tracking-tight">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* why omega */}
        <section className="mx-auto max-w-[1320px] px-5 pb-20 md:px-8">
          <div className="grid gap-8 overflow-hidden rounded-[1.6rem] bg-ink p-8 text-paper md:p-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col justify-between gap-8">
              <div>
                <p className="font-mono text-[0.7rem] tracking-[0.18em] text-paper/60 uppercase">Why Omega</p>
                <h2 className="font-display mt-4 text-4xl leading-tight font-[500] tracking-tight">
                  A split is a disagreement about facts. Omega was built to reason through those.
                </h2>
              </div>
              <ul className="grid gap-3 text-paper/80">
                {[
                  [ScanSearch, "Defeaters: a MIDI made after receiving a voice memo counts as development."],
                  [GitMerge, "NAL revision merges independent evidence into one truth value."],
                  [ShieldCheck, "Omega's act threshold decides what is settled enough to sign."],
                  [Languages, "Every sentence in English and Swahili, filled only from the proof."],
                ].map(([Icon, text], i) => {
                  const I = Icon as typeof ScanSearch
                  return (
                    <li key={i} className="flex gap-3">
                      <I className="mt-0.5 size-4 shrink-0 text-gold" />
                      <span>{text as string}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
            <pre className="overflow-x-auto rounded-xl border border-paper/10 bg-black/30 p-6 font-mono text-[0.8rem] leading-relaxed text-paper/85">
              <code>{RULE}</code>
            </pre>
          </div>
        </section>

        {/* trust */}
        <section className="mx-auto max-w-[1320px] px-5 pb-24 md:px-8">
          <h2 className="font-display text-4xl font-[520] tracking-tight md:text-5xl">Would A Real Artist Trust This?</h2>
          <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {trust.map(([fear, answer]) => (
              <div key={fear} className="grid grid-cols-[auto_1fr] gap-4 border-t border-border pt-5">
                <SawaMark size={18} className="mt-1" />
                <div>
                  <p className="font-display text-xl italic">&ldquo;{fear}&rdquo;</p>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{answer}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14 flex justify-center">
            <Link href={SESSION} className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-7 text-base")}>
              Open The Session <ArrowRight data-icon="inline-end" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
