"use client"

import * as React from "react"
import { ArrowRight, Bot, CheckCircle2, ChevronDown, CircleDashed, GitMerge, Undo2 } from "lucide-react"

import { ContestDialog } from "./contest-dialog"
import { useSession } from "./session-provider"
import { SplitBar } from "./split-bar"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Switch } from "@/components/ui/switch"
import { claimWord, elementName, FIRST, fmtTV, pct } from "@/lib/format"
import type { ElementRow, Evidence, Lang, SessionState, Song, SongRecord, Statement, Writer } from "@/lib/types"
import { cn } from "@/lib/utils"

const BEAT = new Set(["chords-bass", "drum-groove"])
const DEFEATERS = new Set(["received-before-created", "recollection-after-dispute", "generated-before-edited"])

const DetailsContext = React.createContext(false)

function recordLabel(rec: SongRecord | undefined): string {
  if (!rec) return ""
  if (rec.file) return rec.file
  if (rec.text) return rec.text.length > 48 ? `${rec.text.slice(0, 46)}…` : rec.text
  return rec.id
}

function who(st: Statement): string {
  return st.writer === "ai" ? "AI" : FIRST[st.writer as Writer]
}

function statementTitle(st: Statement, lang: Lang): string {
  if (st.role === "generated") return lang === "en" ? "An AI generator made it" : "Kitengenezaji cha AI kiliitengeneza"
  const verb =
    st.role === "originated" ? (lang === "en" ? "started it" : "aliianzisha") : lang === "en" ? "developed it" : "aliiendeleza"
  return `${who(st)} ${verb}`
}

function StatusChip({ st, lang }: { st: Statement; lang: Lang }) {
  const settled = st.band === "settled"
  const label = settled
    ? lang === "en" ? "Confirmed" : "Imethibitishwa"
    : st.band === "needs-confirmation"
      ? lang === "en" ? "Not proven" : "Haijathibitishwa"
      : lang === "en" ? "No support" : "Haina msingi"
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        settled ? "bg-truth-soft text-truth-ink" : "bg-muted text-muted-foreground"
      )}
    >
      {settled ? <CheckCircle2 className="size-3.5" /> : <CircleDashed className="size-3.5" />}
      {label}
    </span>
  )
}

function Confidence({ tv }: { tv: [number, number] }) {
  // how strongly the evidence supports the statement: frequency times confidence
  const v = Math.round(tv[0] * tv[1] * 100)
  return (
    <div className="flex items-center gap-2" title="How strongly the evidence supports this">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-foreground/70" style={{ width: `${v}%` }} />
      </div>
      <span className="tabular w-9 text-xs text-muted-foreground">{v}%</span>
    </div>
  )
}

function EvidenceLine({ ev, song, state, lang }: { ev: Evidence; song: Song; state: SessionState; lang: Lang }) {
  const details = React.useContext(DetailsContext)
  const rec = song.records.find((r) => r.id === ev.record)
  const sentence = state.explanation?.evidence[ev.id]?.[lang]
  const rule = state.explanation?.rules[ev.rule]?.[lang] ?? ev.rule
  const defeater = DEFEATERS.has(ev.rule)
  const contestable = rec && rec.kind !== "dispute" && ev.kind !== "recollection"
  const against = ev.pol === "neg"
  return (
    <li className="grid grid-cols-[auto_1fr_auto] items-start gap-3 py-3">
      <span
        className={cn(
          "mt-1.5 size-2 rounded-full",
          ev.author === "wanjiru" ? "bg-nairobi" : "bg-harlem",
          against && "bg-transparent ring-2 ring-muted-foreground/40 ring-inset"
        )}
      />
      <div className="min-w-0">
        <p className="text-[0.95rem] leading-relaxed">{sentence}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className={cn(against ? "text-destructive/80" : "text-truth-ink")}>
            {against ? (lang === "en" ? "Counts against" : "Inapinga") : lang === "en" ? "Supports" : "Inaunga mkono"}
          </span>
          {(defeater || details) && (
            <span
              className={cn(
                "rounded-md px-1.5 py-0.5",
                defeater ? "bg-gold-soft text-[oklch(0.42_0.1_70)]" : "bg-muted"
              )}
            >
              {rule}
            </span>
          )}
          {details && <code className="font-mono">{ev.rule} {fmtTV(ev.tv)}</code>}
        </div>
      </div>
      <div className="pt-0.5">
        {contestable && rec && <ContestDialog record={rec.id} recordLabel={recordLabel(rec)} defaultBy={rec.author} />}
      </div>
    </li>
  )
}

function StatementBlock({ st, song, state, lang }: { st: Statement; song: Song; state: SessionState; lang: Lang }) {
  const details = React.useContext(DetailsContext)
  const [open, setOpen] = React.useState(st.band === "settled")
  const dot = st.writer === "ai" ? "bg-ink" : st.writer === "wanjiru" ? "bg-nairobi" : "bg-harlem"
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="rounded-xl border border-border bg-background">
      <CollapsibleTrigger className="flex w-full items-center gap-3 px-4 py-3 text-left">
        <span className={cn("size-2.5 shrink-0 rounded-full", dot)} />
        <span className="flex-1 font-medium">{statementTitle(st, lang)}</span>
        <span className="hidden sm:block">
          <Confidence tv={st.tv} />
        </span>
        <StatusChip st={st} lang={lang} />
        <ChevronDown className={cn("size-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="border-t border-border px-4 pb-2">
          {details && st.revision.length > 1 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-3 font-mono text-xs text-muted-foreground">
              <GitMerge className="size-3.5" />
              <span>Omega NAL revision</span>
              {st.revision.map((s, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <ArrowRight className="size-3" />}
                  <span className={cn(i === st.revision.length - 1 && "text-foreground")}>
                    ({s[0].toFixed(2)}, {s[1].toFixed(2)})
                  </span>
                </React.Fragment>
              ))}
            </div>
          )}
          <ul className="divide-y divide-border">
            {st.evidence.map((ev) => (
              <EvidenceLine key={ev.id} ev={ev} song={song} state={state} lang={lang} />
            ))}
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function PartRow({ row, song, state, lang, disputed }: { row: ElementRow; song: Song; state: SessionState; lang: Lang; disputed: boolean }) {
  const [open, setOpen] = React.useState(false)
  const [showAll, setShowAll] = React.useState(false)
  const rank = (s: Statement) =>
    ({ settled: 0, "needs-confirmation": 1, unsupported: 2 })[s.band] * 6 +
    ({ generated: 0, originated: 1, developed: 3 })[s.role] +
    (s.writer === "wanjiru" ? 0 : 1)
  const ordered = [...row.statements].sort((a, b) => rank(a) - rank(b))
  const shown = showAll ? ordered : ordered.filter((s) => s.band !== "unsupported")
  const hidden = ordered.length - ordered.filter((s) => s.band !== "unsupported").length

  return (
    <Collapsible open={open} onOpenChange={setOpen} className={cn("rounded-2xl border bg-card transition-shadow", open ? "border-foreground/15 shadow-md" : "border-border")}>
      <CollapsibleTrigger
        className="grid w-full grid-cols-[1fr_auto] items-center gap-x-8 gap-y-3 px-6 py-5 text-left md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_auto]"
        data-testid={`element-${row.element}`}
      >
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-lg font-medium tracking-[-0.02em]">{elementName(song, row.element, lang)}</p>
            {row.ai_generated && (
              <span className="inline-flex items-center gap-1 rounded-md bg-ink px-1.5 py-0.5 text-[0.7rem] font-medium text-white">
                <Bot className="size-3" /> AI
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {row.weight}% {lang === "en" ? "of the song" : "ya wimbo"}
            {disputed && <span className="text-[oklch(0.5_0.12_60)]"> · {lang === "en" ? "was disputed" : "ilibishaniwa"}</span>}
          </p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <SplitBar wanjiru={row.shares.wanjiru} malik={row.shares.malik} />
          {row.ai_generated && (
            <p className="mt-1 text-xs text-muted-foreground">
              {lang === "en"
                ? `${row.ai_points} points made by AI, owned by no one`
                : `Pointi ${row.ai_points} zimetengenezwa na AI, hazimilikiwi na mtu`}
            </p>
          )}
        </div>
        <ChevronDown className={cn("col-start-2 row-start-1 size-5 justify-self-end text-muted-foreground transition-transform md:col-start-3", open && "rotate-180")} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-4 border-t border-border px-6 pt-5 pb-6">
          <p className="text-xl leading-snug font-medium tracking-[-0.02em] text-balance" data-testid={`summary-${row.element}`}>
            {state.explanation?.elements[row.element]?.[lang]}
          </p>
          <div className="grid gap-2">
            {shown.map((st) => (
              <StatementBlock key={`${st.role}-${st.writer}`} st={st} song={song} state={state} lang={lang} />
            ))}
          </div>
          {hidden > 0 && (
            <Button variant="link" size="xs" className="px-0 text-muted-foreground" onClick={() => setShowAll((v) => !v)}>
              {showAll
                ? lang === "en" ? "Hide claims with no support" : "Ficha madai yasiyo na msingi"
                : lang === "en"
                  ? `Show ${hidden} ${hidden === 1 ? "claim" : "claims"} with no support`
                  : `Onyesha madai ${hidden} yasiyo na msingi`}
            </Button>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function DraftComparison({ state, song, lang }: { state: SessionState; song: Song; lang: Lang }) {
  const h = state.agents.harlem.draft.body.elements
  const n = state.agents.nairobi.draft.body.elements
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="grid grid-cols-[1.1fr_1fr_1fr] gap-6 border-b border-border px-6 py-3.5 text-sm text-muted-foreground">
        <span>{lang === "en" ? "Part of the song" : "Sehemu ya wimbo"}</span>
        <span className="text-harlem-ink">{lang === "en" ? "Malik remembers" : "Malik anakumbuka"}</span>
        <span className="text-nairobi-ink">{lang === "en" ? "Wanjiru remembers" : "Wanjiru anakumbuka"}</span>
      </div>
      {h.map((row, i) => {
        const other = n[i]
        const differ = JSON.stringify(row.claimed) !== JSON.stringify(other.claimed)
        return (
          <div key={row.element} className={cn("grid grid-cols-[1.1fr_1fr_1fr] items-center gap-6 border-b border-border px-6 py-4 last:border-0", differ && "bg-gold-soft/60")}>
            <div>
              <p className="font-medium">{elementName(song, row.element, lang)}</p>
              <p className="text-xs text-muted-foreground">{row.weight}% {lang === "en" ? "of the song" : "ya wimbo"}</p>
            </div>
            {[row, other].map((r, j) => (
              <div key={j} className="space-y-1.5">
                <p className="text-sm text-muted-foreground">
                  {(["wanjiru", "malik"] as Writer[])
                    .filter((w) => r.claimed?.[w] !== "-")
                    .map((w) => `${FIRST[w]} ${claimWord(r.claimed?.[w] ?? "-", lang)}`)
                    .join(", ")}
                </p>
                <SplitBar wanjiru={r.shares.wanjiru} malik={r.shares.malik} thin showLabels={false} />
              </div>
            ))}
          </div>
        )
      })}
      <div className="grid grid-cols-[1.1fr_1fr_1fr] gap-6 bg-muted/60 px-6 py-5">
        <p className="text-lg font-medium">{lang === "en" ? "Their versions" : "Matoleo yao"}</p>
        {[state.agents.harlem.draft, state.agents.nairobi.draft].map((d, j) => (
          <p key={j} className="tabular text-2xl font-medium tracking-[-0.03em]">
            <span className="text-nairobi-ink">{pct(d.body.totals.wanjiru)}</span>
            <span className="mx-1 text-muted-foreground/60">/</span>
            <span className="text-harlem-ink">{pct(d.body.totals.malik)}</span>
          </p>
        ))}
      </div>
    </div>
  )
}

export function SplitSheet() {
  const { state, song, lang, withdrawContest, busy } = useSession()
  const [details, setDetails] = React.useState(false)
  if (!state || !song) return null

  if (state.phase !== "reconciled") {
    return (
      <div className="space-y-5">
        <p className="max-w-2xl text-lg text-muted-foreground">
          {lang === "en"
            ? "Before the agents compare notes, each split is only one writer's memory. Highlighted parts are where they disagree."
            : "Kabla mawakala hawajalinganisha, kila mgao ni kumbukumbu ya mwandishi mmoja tu. Sehemu zilizoangaziwa ndizo wanatofautiana."}
        </p>
        <DraftComparison state={state} song={song} lang={lang} />
      </div>
    )
  }

  const result = state.agents.harlem.result!
  const disputed = new Set(state.disputed.map((d) => d.element))
  const rows = result.body.elements
  const groups: [string, ElementRow[]][] = [
    [lang === "en" ? "The beat" : "Mdundo", rows.filter((r) => BEAT.has(r.element))],
    [lang === "en" ? "The topline: melody and lyrics" : "Juu ya mdundo: melodia na maneno", rows.filter((r) => !BEAT.has(r.element))],
  ]

  return (
    <DetailsContext.Provider value={details}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-2xl text-muted-foreground">
            {lang === "en"
              ? "Open any part to see why each person got their share. Disagree with a piece of evidence? Challenge it."
              : "Fungua sehemu yoyote kuona kwa nini kila mtu alipata mgao wake. Hukubaliani na ushahidi? Upinge."}
          </p>
          <label className="flex items-center gap-2.5 text-sm">
            <Switch checked={details} onCheckedChange={setDetails} data-testid="details-toggle" />
            {lang === "en" ? "Show Reasoning Details" : "Onyesha Undani Wa Hoja"}
          </label>
        </div>

        {state.contests.length > 0 && (
          <div className="rounded-2xl border border-gold bg-gold-soft/60 p-5" data-testid="contests">
            {state.contests.map((c) => {
              const rec = song.records.find((r) => r.id === c.record)
              return (
                <div key={c.record} className="flex flex-wrap items-center justify-between gap-3">
                  <p>
                    <span className="font-medium">{FIRST[c.by]}</span> {lang === "en" ? "challenged" : "alipinga"}{" "}
                    &ldquo;{recordLabel(rec)}&rdquo;: <span className="italic">&ldquo;{c.reason}&rdquo;</span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {lang === "en"
                        ? "It no longer counts. Both agents recalculated."
                        : "Haihesabiwi tena. Mawakala wote walikokotoa upya."}
                    </span>
                  </p>
                  <Button variant="outline" size="sm" onClick={() => void withdrawContest(c.record)} disabled={!!busy}>
                    <Undo2 data-icon="inline-start" /> {lang === "en" ? "Restore" : "Rejesha"}
                  </Button>
                </div>
              )
            })}
          </div>
        )}

        {groups.map(([title, list]) => (
          <section key={title} className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            {list.map((row) => (
              <PartRow key={row.element} row={row} song={song} state={state} lang={lang} disputed={disputed.has(row.element)} />
            ))}
          </section>
        ))}

        <div className="grid gap-6 rounded-2xl bg-ink p-8 text-white md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm text-white/60">{lang === "en" ? "Songwriting split" : "Mgao wa utunzi"}</p>
            <p className="tabular mt-1 text-4xl font-medium tracking-[-0.04em]" data-testid="totals">
              <span className="text-nairobi">Wanjiru {pct(result.body.totals.wanjiru)}%</span>
              <span className="mx-3 text-white/30">/</span>
              <span className="text-[oklch(0.78_0.1_268)]">Malik {pct(result.body.totals.malik)}%</span>
            </p>
            {!!result.body.ai_points && (
              <p className="mt-2 text-sm text-white/60">
                {lang === "en"
                  ? `${result.body.ai_points} points of the song were made by AI and belong to no one, so the writers' shares are scaled to 100%.`
                  : `Pointi ${result.body.ai_points} za wimbo zilitengenezwa na AI na si za mtu yeyote, kwa hivyo migao ya waandishi imepimwa hadi 100%.`}
              </p>
            )}
          </div>
          <p className="max-w-xs text-sm text-white/60">
            {lang === "en"
              ? `Recording (master): ${pct(song.policy.master.wanjiru)} / ${pct(song.policy.master.malik)}. ${song.policy.master_note}`
              : `Rekodi (master): ${pct(song.policy.master.wanjiru)} / ${pct(song.policy.master.malik)}. ${song.policy.master_note_sw}`}
          </p>
        </div>
      </div>
    </DetailsContext.Provider>
  )
}
