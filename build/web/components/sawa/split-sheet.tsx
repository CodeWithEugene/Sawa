"use client"

import * as React from "react"
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CircleDashed,
  GitMerge,
  ShieldOff,
  Undo2,
} from "lucide-react"

import { ContestDialog } from "./contest-dialog"
import { useSession } from "./session-provider"
import { SplitBar } from "./split-bar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  claimWord,
  elementName,
  FIRST,
  fmtTV,
  pct,
  roleWord,
} from "@/lib/format"
import { t } from "@/lib/i18n"
import type {
  ElementRow,
  Evidence,
  Lang,
  SessionState,
  Song,
  SongRecord,
  Statement,
  Writer,
} from "@/lib/types"
import { cn } from "@/lib/utils"

const DEFEATERS = new Set([
  "received-before-created",
  "recollection-after-dispute",
])

function recordLabel(rec: SongRecord | undefined): string {
  if (!rec) return ""
  if (rec.file) return rec.file
  if (rec.text)
    return rec.text.length > 48 ? `${rec.text.slice(0, 46)}…` : rec.text
  return rec.id
}

function BandChip({
  band,
  lang,
  state,
}: {
  band: Statement["band"]
  lang: Lang
  state: SessionState
}) {
  const label = state.explanation?.bands[band][lang] ?? band
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.7rem] font-medium",
        band === "settled" && "bg-truth-soft text-truth-ink",
        band === "needs-confirmation" &&
          "bg-gold-soft text-[oklch(0.45_0.1_70)]",
        band === "unsupported" && "bg-muted text-muted-foreground"
      )}
    >
      {band === "settled" ? (
        <CheckCircle2 className="size-3" />
      ) : (
        <CircleDashed className="size-3" />
      )}
      {label}
    </span>
  )
}

function EvidenceLine({
  ev,
  song,
  state,
  lang,
}: {
  ev: Evidence
  song: Song
  state: SessionState
  lang: Lang
}) {
  const rec = song.records.find((r) => r.id === ev.record)
  const sentence = state.explanation?.evidence[ev.id]?.[lang]
  const rule = state.explanation?.rules[ev.rule]?.[lang] ?? ev.rule
  const defeater = DEFEATERS.has(ev.rule)
  const contestable = rec && rec.kind !== "dispute"
  return (
    <li className="grid grid-cols-[auto_1fr_auto] items-start gap-3 py-2.5">
      <span
        className={cn(
          "mt-1 size-2 rounded-full",
          ev.author === "wanjiru" ? "bg-nairobi" : "bg-harlem",
          ev.pol === "neg" &&
            "bg-transparent text-muted-foreground ring-2 ring-current ring-inset"
        )}
      />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge
            variant="outline"
            className={cn(
              "rounded-md font-mono text-[0.65rem]",
              defeater && "border-gold bg-gold-soft text-[oklch(0.42_0.1_70)]"
            )}
          >
            {defeater && <ShieldOff className="size-3" />} {rule}
          </Badge>
          <span
            className={cn(
              "text-xs",
              ev.pol === "neg" ? "text-destructive/80" : "text-truth-ink"
            )}
          >
            {ev.pol === "neg"
              ? lang === "en"
                ? "against"
                : "dhidi"
              : lang === "en"
                ? "supports"
                : "inaunga mkono"}
          </span>
        </div>
        <p className="mt-1 text-sm leading-relaxed">{sentence}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <code className="tabular font-mono text-[0.7rem] text-muted-foreground">
          {fmtTV(ev.tv)}
        </code>
        {contestable && rec && ev.kind !== "recollection" && (
          <ContestDialog
            record={rec.id}
            recordLabel={recordLabel(rec)}
            defaultBy={rec.author}
          />
        )}
      </div>
    </li>
  )
}

function StatementBlock({
  st,
  song,
  state,
  lang,
}: {
  st: Statement
  song: Song
  state: SessionState
  lang: Lang
}) {
  const [open, setOpen] = React.useState(st.band === "settled")
  const steps = st.revision
  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="rounded-xl border border-border bg-background/60"
    >
      <CollapsibleTrigger className="flex w-full items-center gap-3 px-4 py-3 text-left">
        <span
          className={cn(
            "size-2.5 rounded-full",
            st.writer === "wanjiru" ? "bg-nairobi" : "bg-harlem"
          )}
        />
        <span className="flex-1 text-sm font-medium">
          {FIRST[st.writer]} {roleWord(st.role, lang)}
        </span>
        <code className="hidden font-mono text-xs text-muted-foreground sm:inline">
          {fmtTV(st.tv)}
        </code>
        <BandChip band={st.band} lang={lang} state={state} />
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="border-t border-dashed border-border px-4 pb-3">
          {steps.length > 1 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-3 font-mono text-[0.7rem] text-muted-foreground">
              <GitMerge className="size-3.5" />
              <span>
                {lang === "en" ? "NAL revision" : "Marekebisho ya NAL"}
              </span>
              {steps.map((s, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <ArrowRight className="size-3" />}
                  <span
                    className={cn(i === steps.length - 1 && "text-foreground")}
                  >
                    {s[0].toFixed(2)}, {s[1].toFixed(2)}
                  </span>
                </React.Fragment>
              ))}
            </div>
          )}
          <ul className="divide-y divide-dashed divide-border">
            {st.evidence.map((ev) => (
              <EvidenceLine
                key={ev.id}
                ev={ev}
                song={song}
                state={state}
                lang={lang}
              />
            ))}
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function ElementCard({
  row,
  song,
  state,
  lang,
  disputed,
}: {
  row: ElementRow
  song: Song
  state: SessionState
  lang: Lang
  disputed: boolean
}) {
  const [open, setOpen] = React.useState(false)
  const [showAll, setShowAll] = React.useState(false)
  const key = (s: Statement) => s.band !== "unsupported"
  const rank = (s: Statement) =>
    ({ settled: 0, "needs-confirmation": 1, unsupported: 2 })[s.band] * 4 +
    (s.role === "originated" ? 0 : 2) +
    (s.writer === "wanjiru" ? 0 : 1)
  const ordered = [...row.statements].sort((a, b) => rank(a) - rank(b))
  const visible = showAll ? ordered : ordered.filter(key)
  const hidden = row.statements.length - row.statements.filter(key).length
  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={cn(
        "rounded-2xl border bg-card transition-shadow",
        open ? "border-ink/20 shadow-md" : "border-border"
      )}
    >
      <CollapsibleTrigger
        className="grid w-full grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 px-5 py-4 text-left md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_auto]"
        data-testid={`element-${row.element}`}
      >
        <div>
          <div className="flex items-center gap-2">
            <p className="font-display text-lg font-[560] tracking-tight">
              {elementName(song, row.element, lang)}
            </p>
            <span className="font-mono text-[0.68rem] text-muted-foreground">
              {row.weight} pts
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            {disputed ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-gold-soft px-2 py-0.5 text-[0.68rem] font-medium text-[oklch(0.42_0.1_70)]">
                {lang === "en" ? "Was disputed" : "Ilibishaniwa"}
              </span>
            ) : (
              <span className="text-[0.72rem] text-muted-foreground">
                {lang === "en"
                  ? "Both accounts agreed"
                  : "Maelezo yote yalikubaliana"}
              </span>
            )}
          </div>
        </div>
        <div className="col-span-2 md:col-span-1">
          <SplitBar wanjiru={row.shares.wanjiru} malik={row.shares.malik} />
        </div>
        <ChevronDown
          className={cn(
            "row-start-1 size-5 text-muted-foreground transition-transform md:col-start-3",
            open && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-3 border-t border-border px-5 pt-4 pb-5">
          <p className="eyebrow">{t(lang, "clauseTrail")}</p>
          <p
            className="font-display text-xl leading-snug font-[460] text-balance"
            data-testid={`summary-${row.element}`}
          >
            {state.explanation?.elements[row.element]?.[lang]}
          </p>
          <div className="grid gap-2">
            {visible.map((st) => (
              <StatementBlock
                key={`${st.role}-${st.writer}`}
                st={st}
                song={song}
                state={state}
                lang={lang}
              />
            ))}
          </div>
          {hidden > 0 && (
            <Button
              variant="link"
              size="xs"
              className="px-0 text-muted-foreground"
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll
                ? lang === "en"
                  ? "Hide unsupported statements"
                  : "Ficha kauli zisizo na msingi"
                : lang === "en"
                  ? `Show ${hidden} unsupported statements`
                  : `Onyesha kauli ${hidden} zisizo na msingi`}
            </Button>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function DraftComparison({
  state,
  song,
  lang,
}: {
  state: SessionState
  song: Song
  lang: Lang
}) {
  const h = state.agents.harlem.draft.body.elements
  const n = state.agents.nairobi.draft.body.elements
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="grid grid-cols-[1.1fr_1fr_1fr] gap-4 border-b border-border bg-muted/50 px-5 py-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        <span>{lang === "en" ? "Part" : "Sehemu"}</span>
        <span className="text-harlem-ink">
          {lang === "en" ? "Malik's account" : "Maelezo ya Malik"}
        </span>
        <span className="text-nairobi-ink">
          {lang === "en" ? "Wanjiru's account" : "Maelezo ya Wanjiru"}
        </span>
      </div>
      {h.map((row, i) => {
        const other = n[i]
        const differ =
          JSON.stringify(row.claimed) !== JSON.stringify(other.claimed)
        return (
          <div
            key={row.element}
            className={cn(
              "grid grid-cols-[1.1fr_1fr_1fr] items-center gap-4 border-b border-dashed border-border px-5 py-3.5 last:border-0",
              differ && "bg-gold-soft/50"
            )}
          >
            <div>
              <p className="font-medium">
                {elementName(song, row.element, lang)}
              </p>
              <p className="font-mono text-[0.68rem] text-muted-foreground">
                {row.weight} pts
              </p>
            </div>
            {[row, other].map((r, j) => (
              <div key={j} className="space-y-1.5">
                <p className="text-xs text-muted-foreground">
                  {(["wanjiru", "malik"] as Writer[])
                    .filter((w) => r.claimed?.[w] !== "-")
                    .map(
                      (w) =>
                        `${FIRST[w]} ${claimWord(r.claimed?.[w] ?? "-", lang)}`
                    )
                    .join(", ")}
                </p>
                <SplitBar
                  wanjiru={r.shares.wanjiru}
                  malik={r.shares.malik}
                  thin
                  showLabels={false}
                />
              </div>
            ))}
          </div>
        )
      })}
      <div className="grid grid-cols-[1.1fr_1fr_1fr] gap-4 bg-muted/40 px-5 py-4">
        <p className="font-display text-lg font-[560]">
          {t(lang, "composition")}
        </p>
        {[state.agents.harlem.draft, state.agents.nairobi.draft].map((d, j) => (
          <p key={j} className="tabular font-display text-2xl">
            <span className="text-nairobi-ink">
              {pct(d.body.totals.wanjiru)}
            </span>
            <span className="mx-1 text-muted-foreground">/</span>
            <span className="text-harlem-ink">{pct(d.body.totals.malik)}</span>
          </p>
        ))}
      </div>
    </div>
  )
}

export function SplitSheet() {
  const { state, song, lang, withdrawContest, busy } = useSession()
  if (!state || !song) return null
  if (state.phase !== "reconciled") {
    return (
      <div className="space-y-4">
        <p className="max-w-2xl text-muted-foreground">
          {lang === "en"
            ? "Before the agents reconcile, each split is only its owner's account. Highlighted rows are where the accounts disagree."
            : "Kabla mawakala hawajapatanisha, kila mgao ni maelezo ya mwenyewe tu. Mistari iliyoangaziwa ni pale maelezo yanapotofautiana."}
        </p>
        <DraftComparison state={state} song={song} lang={lang} />
      </div>
    )
  }
  const result = state.agents.harlem.result!
  const disputed = new Set(state.disputed.map((d) => d.element))
  return (
    <div className="space-y-5">
      {state.contests.length > 0 && (
        <div
          className="rounded-2xl border border-gold bg-gold-soft/60 p-4"
          data-testid="contests"
        >
          <p className="eyebrow text-[oklch(0.42_0.1_70)]">
            {t(lang, "contested")}
          </p>
          {state.contests.map((c) => {
            const rec = song.records.find((r) => r.id === c.record)
            return (
              <div
                key={c.record}
                className="mt-2 flex flex-wrap items-center justify-between gap-2"
              >
                <p className="text-sm">
                  <span className="font-medium">{FIRST[c.by]}</span>{" "}
                  {lang === "en" ? "withdrew" : "aliondoa"} &ldquo;
                  {recordLabel(rec)}&rdquo;:{" "}
                  <span className="italic">&ldquo;{c.reason}&rdquo;</span>
                </p>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => void withdrawContest(c.record)}
                  disabled={!!busy}
                >
                  <Undo2 data-icon="inline-start" />{" "}
                  {lang === "en" ? "Restore" : "Rejesha"}
                </Button>
              </div>
            )
          })}
        </div>
      )}
      <div className="grid gap-3">
        {result.body.elements.map((row) => (
          <ElementCard
            key={row.element}
            row={row}
            song={song}
            state={state}
            lang={lang}
            disputed={disputed.has(row.element)}
          />
        ))}
      </div>
      <div className="grid gap-4 rounded-2xl bg-ink p-6 text-paper md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-mono text-[0.7rem] tracking-[0.18em] text-paper/60 uppercase">
            {t(lang, "composition")}
          </p>
          <p
            className="tabular mt-1 font-display text-4xl font-[560]"
            data-testid="totals"
          >
            <span className="text-[oklch(0.78_0.12_45)]">
              Wanjiru {pct(result.body.totals.wanjiru)}
            </span>
            <span className="mx-3 text-paper/40">/</span>
            <span className="text-[oklch(0.78_0.09_268)]">
              Malik {pct(result.body.totals.malik)}
            </span>
          </p>
        </div>
        <p className="max-w-xs text-sm text-paper/70">
          {lang === "en"
            ? `Master tracked apart: ${pct(song.policy.master.wanjiru)} / ${pct(song.policy.master.malik)} from the "Jua" agreement. ${song.policy.master_note}`
            : `Master inafuatiliwa kando: ${pct(song.policy.master.wanjiru)} / ${pct(song.policy.master.malik)} kutoka makubaliano ya "Jua". ${song.policy.master_note_sw}`}
        </p>
      </div>
    </div>
  )
}
