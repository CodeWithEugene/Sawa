import { ArrowDown, ArrowLeftRight, Monitor, Server, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"

/** The system as boxes and arrows, drawn in HTML and CSS. */

function Box({
  icon: Icon,
  title,
  sub,
  className,
  children,
}: {
  icon?: typeof Monitor
  title: string
  sub: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-5", className)}>
      <div className="flex items-center gap-3">
        {Icon && <Icon className="size-5 shrink-0 text-nairobi" strokeWidth={1.6} aria-hidden />}
        <p className="font-medium">{title}</p>
      </div>
      <p className="mt-1.5 text-sm leading-snug text-muted-foreground">{sub}</p>
      {children}
    </div>
  )
}

function Down({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-3 text-xs text-muted-foreground">
      <ArrowDown className="size-4 text-nairobi" aria-hidden />
      <span>{label}</span>
    </div>
  )
}

const LAYERS = [
  { file: "shims.metta", note: "min and max for Hyperon" },
  { file: "lib_nal.metta", note: "Omega v0.1.20, unmodified", omega: true },
  { file: "sawa.metta", note: "derive, defeaters, revise, band, shares" },
  { file: "packs/split-v1.metta", note: "rule reliabilities and policy" },
]

function AgentSpace({ city, owner, tone }: { city: string; owner: string; tone: "harlem" | "nairobi" }) {
  return (
    <div
      className={cn(
        "rounded-2xl border-2 p-5",
        tone === "nairobi" ? "border-nairobi/60 bg-nairobi-soft/50" : "border-harlem/50 bg-harlem-soft/60"
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className={cn("size-2.5 rounded-full", tone === "nairobi" ? "bg-nairobi" : "bg-harlem")} aria-hidden />
        <p className="font-medium">{city} Agent</p>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Its own Hyperon atom space and {owner}&apos;s memory, replayed on every request
      </p>
      <ul className="mt-4 space-y-1.5">
        {LAYERS.map((l) => (
          <li
            key={l.file}
            className={cn(
              "flex flex-wrap items-baseline justify-between gap-x-3 rounded-lg px-3 py-2 text-sm",
              l.omega ? "bg-ink text-white" : "bg-background/80"
            )}
          >
            <span className="font-mono text-[0.8rem]">{l.file}</span>
            <span className={cn("text-xs", l.omega ? "text-white/65" : "text-muted-foreground")}>{l.note}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 rounded-lg border border-dashed border-border bg-background/60 px-3 py-2 font-mono text-xs">
        proof hash: SHA-256 of the canonical proof
      </p>
    </div>
  )
}

export function ArchitectureDiagram() {
  return (
    <div className="rounded-3xl bg-muted/50 p-5 md:p-8">
      <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
        <div>
          <Box icon={Monitor} title="Browser" sub="Next.js and shadcn/ui on Vercel. Holds the session as an append-only list of events." />
          <Down label="POST the session events" />
          <Box
            icon={Server}
            title="API"
            sub="FastAPI on Python 3.12. Folds the events into a state and asks each agent, separately, for its answer."
          />
          <Down label="one call per agent, no shared state" />

          <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
            <AgentSpace city="Harlem" owner="Malik" tone="harlem" />
            <div className="flex flex-row items-center justify-center gap-2 py-2 text-center text-xs text-muted-foreground md:w-28 md:flex-col">
              <ArrowLeftRight className="size-5 text-nairobi" aria-hidden />
              <span>Evidence packets: fingerprints, times, who received what. Never audio.</span>
            </div>
            <AgentSpace city="Nairobi" owner="Wanjiru" tone="nairobi" />
          </div>

          <Down label="both hashes return to the API" />
          <div className="rounded-2xl bg-ink p-5 text-white">
            <p className="font-medium">Converged When The Hashes Are Equal</p>
            <p className="mt-1.5 text-sm text-white/65">
              Equal hashes open signing. Different hashes show &ldquo;No shared answer yet&rdquo; and say why.
            </p>
          </div>
        </div>

        <aside className="flex flex-col gap-4 lg:pt-[7.5rem]">
          <Box icon={Sparkles} title="TypeSafe Jev" sub="Called by the API to read chat messages into typed credit statements.">
            <ul className="mt-4 space-y-2 text-sm">
              <li className="rounded-lg bg-muted px-3 py-2">Reads English, Swahili and Sheng</li>
              <li className="rounded-lg bg-muted px-3 py-2">The message&apos;s author confirms the reading</li>
              <li className="rounded-lg bg-muted px-3 py-2">Never produces a share, a rule or a reason</li>
            </ul>
          </Box>
          <div className="rounded-2xl border border-dashed border-border p-5 text-sm leading-relaxed text-muted-foreground">
            Without an API key, or if Jev is unreachable, Sawa uses the seeded reading and marks it as manual. The page
            never fails because of it.
          </div>
        </aside>
      </div>
    </div>
  )
}
