"use client"

import { useSession } from "./session-provider"
import { AGENT_WRITER, CITY, FIRST, fmtDay, fmtTime } from "@/lib/format"
import type { AgentId, Lang, MemoryEntry } from "@/lib/types"
import { cn } from "@/lib/utils"

function describe(e: MemoryEntry, lang: Lang): { kind: string; text: string } {
  switch (e.type) {
    case "record":
      return { kind: e.kind ?? "record", text: `${e.record} (${FIRST[e.author ?? "malik"]})` }
    case "exchange":
      return {
        kind: "exchange",
        text: lang === "en"
          ? `Received ${e.received?.length ?? 0} records from the other agent: ${e.received?.join(", ")}`
          : `Imepokea rekodi ${e.received?.length ?? 0} kutoka kwa wakala mwingine: ${e.received?.join(", ")}`,
      }
    case "reconcile":
      return { kind: "reconcile", text: lang === "en" ? "Reconciled on its own atom space" : "Imepatanisha kwenye nafasi yake ya atomu" }
    case "contest":
      return { kind: "contest", text: `${FIRST[e.by ?? "malik"]} withdrew ${e.record}: "${e.reason}"` }
    case "withdraw-contest":
      return { kind: "restore", text: `${e.record} restored` }
    case "sign":
      return { kind: "sign", text: `${e.name} signed` }
    case "pack":
      return { kind: "pack", text: `${e.agent} switched to ${e.version}` }
    default:
      return { kind: e.type, text: "" }
  }
}

function Column({ agent }: { agent: AgentId }) {
  const { state, lang } = useSession()
  if (!state) return null
  const log = state.agents[agent].memory
  return (
    <section className="rounded-2xl border border-border bg-card">
      <header className={cn("flex items-center justify-between rounded-t-2xl px-5 py-3", agent === "nairobi" ? "bg-nairobi-soft" : "bg-harlem-soft")}>
        <p className="font-display text-lg font-[560]">
          {CITY[agent]} {lang === "en" ? "Agent" : "Wakala"} · {FIRST[AGENT_WRITER[agent]]}
        </p>
        <span className="font-mono text-xs text-muted-foreground">{log.length} {lang === "en" ? "entries" : "maingizo"}</span>
      </header>
      <ol className="divide-y divide-dashed divide-border font-mono text-[0.78rem]" data-testid={`memory-${agent}`}>
        {log.map((e, i) => {
          const d = describe(e, lang)
          return (
            <li key={i} className="grid grid-cols-[2.2rem_6.5rem_1fr] gap-2 px-5 py-2">
              <span className="text-muted-foreground tabular">{String(i + 1).padStart(2, "0")}</span>
              <span className={cn("truncate", d.kind === "contest" && "text-destructive", d.kind === "exchange" && "text-truth-ink", d.kind === "sign" && "text-truth-ink")}>
                {d.kind}
              </span>
              <span className="min-w-0 break-words text-foreground/85">
                {d.text}
                {typeof e.at === "number" && (
                  <span className="ml-2 text-muted-foreground">
                    {fmtDay(e.at)} {fmtTime(e.at)}
                  </span>
                )}
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export function MemoryTab() {
  const { lang } = useSession()
  return (
    <div className="space-y-4">
      <p className="max-w-2xl text-muted-foreground">
        {lang === "en"
          ? "Each agent's memory is an append-only log, replayed into its own MeTTa atom space on every request, the way Omega replays episodic history. This log is the audit trail."
          : "Kumbukumbu za kila wakala ni orodha inayoongezwa tu, inayochezwa upya kwenye nafasi yake ya atomu za MeTTa kila ombi, kama Omega inavyocheza historia. Orodha hii ndiyo rekodi ya ukaguzi."}
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        <Column agent="harlem" />
        <Column agent="nairobi" />
      </div>
    </div>
  )
}
