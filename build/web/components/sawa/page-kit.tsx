import Link from "next/link"

import { SawaMark } from "./brand"
import { SiteNav } from "./landing-nav"
import { DEMO_HREF } from "@/lib/site"
import { cn } from "@/lib/utils"

/**
 * Shared building blocks for every product page, so all pages read as one
 * product. Tones: "light" (canvas), "dark" (ink), "orange" (accent).
 * Each section sets data-nav so the sticky navbar recolours over it.
 */

export type Tone = "light" | "dark" | "orange"

const TONE_BG: Record<Tone, string> = {
  light: "bg-background text-foreground",
  dark: "bg-ink text-white",
  orange: "bg-nairobi text-white",
}

export const PAD = "px-6 md:px-10 lg:px-16 2xl:px-24"

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main>{children}</main>
      <SiteFooterFull />
    </>
  )
}

export function PageHero({
  eyebrow,
  title,
  accent,
  lead,
  tone = "light",
  actions,
  aside,
}: {
  eyebrow: string
  title: string
  /** words of the title to colour orange (light tone) or keep white (other tones) */
  accent?: string
  lead: string
  tone?: Tone
  actions?: React.ReactNode
  aside?: React.ReactNode
}) {
  const parts = accent ? title.split(accent) : [title]
  // Without anything on the right, the hero is centred.
  const centred = !aside
  return (
    <section data-nav={tone} className={cn(TONE_BG[tone], "w-full", PAD, "pt-20 pb-20 md:pt-28 md:pb-24")}>
      <div className={cn("grid items-center gap-14", aside && "lg:grid-cols-[1.15fr_1fr]")}>
        <div className={cn(centred && "mx-auto flex max-w-5xl flex-col items-center text-center")}>
          <p className={cn("text-sm font-medium", tone === "light" ? "text-nairobi-ink" : "text-white/80")}>{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.6rem,5.6vw,5.4rem)] leading-[1.02] font-medium tracking-[-0.045em]">
            {accent ? (
              <>
                {parts[0]}
                <span className={tone === "light" ? "text-nairobi" : tone === "dark" ? "text-nairobi" : "text-ink"}>{accent}</span>
                {parts[1]}
              </>
            ) : (
              title
            )}
          </h1>
          <p className={cn("mt-6 max-w-2xl text-[1.2rem] leading-relaxed", tone === "light" ? "text-foreground/75" : "text-white/80")}>
            {lead}
          </p>
          {actions && <div className={cn("mt-9 flex flex-wrap gap-4", centred && "justify-center")}>{actions}</div>}
        </div>
        {aside && <div>{aside}</div>}
      </div>
    </section>
  )
}

export function Section({
  id,
  tone = "light",
  eyebrow,
  title,
  lead,
  children,
  className,
}: {
  id?: string
  tone?: Tone
  eyebrow?: string
  title?: string
  lead?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} data-nav={tone} className={cn(TONE_BG[tone], "w-full scroll-mt-14", PAD, "py-20 md:py-28", className)}>
      {(eyebrow || title || lead) && (
        <div className="mx-auto mb-14 max-w-3xl text-center">
          {eyebrow && (
            <p className={cn("text-sm font-medium", tone === "light" ? "text-nairobi-ink" : tone === "dark" ? "text-nairobi" : "text-white/80")}>
              {eyebrow}
            </p>
          )}
          {title && <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.06] font-medium tracking-[-0.04em]">{title}</h2>}
          {lead && (
            <p className={cn("mt-5 text-lg leading-relaxed", tone === "light" ? "text-muted-foreground" : "text-white/75")}>{lead}</p>
          )}
        </div>
      )}
      {children}
    </section>
  )
}

/** A card that adapts to the section tone it sits in. */
export function Card({
  tone = "light",
  className,
  children,
}: {
  tone?: "light" | "dark" | "orange" | "white"
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-7",
        tone === "light" && "border border-border bg-card",
        tone === "white" && "bg-white text-foreground",
        tone === "dark" && "bg-ink text-white",
        tone === "orange" && "bg-nairobi text-white",
        className
      )}
    >
      {children}
    </div>
  )
}

export function PrimaryButton({ href, children, onDark }: { href: string; children: React.ReactNode; onDark?: "orange" }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-[52px] items-center rounded-[10px] px-8 text-[1.02rem] text-white transition-colors",
        onDark === "orange" ? "bg-ink hover:bg-ink/85" : "bg-nairobi hover:bg-nairobi/90"
      )}
    >
      {children}
    </Link>
  )
}

export function SecondaryButton({ href, children, onColor }: { href: string; children: React.ReactNode; onColor?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-[52px] items-center rounded-[10px] px-8 text-[1.02rem] transition-colors",
        onColor ? "border border-white/30 text-white hover:bg-white/10" : "bg-white text-foreground shadow-xs hover:bg-white/80"
      )}
    >
      {children}
    </Link>
  )
}

/** Closing call to action: an ink card on an orange band. */
export function CtaBand({
  title = "See It Settle A Real Split.",
  lead = "Follow Wanjiru and Malik as their agents work out who wrote “Amani Ni Sisi”.",
  href = DEMO_HREF,
  label = "Try The Demo",
}: {
  title?: string
  lead?: string
  href?: string
  label?: string
}) {
  return (
    <section data-nav="orange" className={cn("w-full bg-nairobi py-20 md:py-24", PAD)}>
      <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-16 text-center text-white md:px-16 md:py-20">
        <SawaMark size={46} tone="dark" className="mx-auto mb-6 opacity-90" />
        <h2 className="mx-auto max-w-3xl text-[clamp(2rem,4vw,3.4rem)] leading-[1.06] font-medium tracking-[-0.04em]">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">{lead}</p>
        <Link
          href={href}
          className="mt-9 inline-flex h-[52px] items-center rounded-[10px] bg-nairobi px-8 text-[1.02rem] text-white transition-colors hover:bg-nairobi/90"
        >
          {label}
        </Link>
      </div>
    </section>
  )
}

const FOOTER = [
  {
    title: "Product",
    links: [
      ["Overview", "/product"],
      ["Try The Demo", DEMO_HREF],
      ["Technology", "/technology"],
      ["Trust And Safety", "/trust"],
    ],
  },
  {
    title: "Who It's For",
    links: [
      ["Songwriters And Producers", "/artists"],
      ["Licensing Platforms", "/platforms"],
      ["Collecting Societies", "/platforms#societies"],
    ],
  },
  {
    title: "Developers",
    links: [
      ["API Docs", "/developers"],
      ["Quickstart", "/developers#quickstart"],
      ["Source On GitHub", "https://github.com/CodeWithEugene/Sawa"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Roadmap", "/about#roadmap"],
      ["AI Disclosure", "/about#ai-disclosure"],
    ],
  },
]

export function SiteFooterFull() {
  return (
    <footer data-nav="dark" className={cn("w-full bg-ink pt-20 pb-10 text-white/60", PAD)}>
      <div className="grid gap-12 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-white">
            <SawaMark size={24} tone="dark" />
            <span className="text-xl font-semibold tracking-[-0.04em]">sawa</span>
          </Link>
          <p className="mt-4 max-w-xs leading-relaxed">Fair credit for every song, settled by two agents and signed by the people who made it.</p>
        </div>
        {FOOTER.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-medium text-white">{col.title}</p>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  {href.startsWith("http") ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                      {label}
                    </a>
                  ) : (
                    <Link href={href} className="transition-colors hover:text-white">
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm md:flex-row md:items-center md:justify-between">
        <p>Built on SingularityNET Omega. All people, songs and files in the demo are fictional.</p>
        <p>State of the Art Hackathon 2026 · Team Technetians</p>
      </div>
    </footer>
  )
}
