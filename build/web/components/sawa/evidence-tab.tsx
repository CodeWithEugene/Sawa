"use client"

import * as React from "react"
import {
  AudioLines,
  Bot,
  Check,
  FileMusic,
  FileText,
  Hash,
  Loader2,
  MessageCircle,
  Mic,
  MicVocal,
  ScrollText,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { useSession } from "./session-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import {
  CITY,
  elementName,
  FIRST,
  fmtDay,
  fmtNY,
  fmtTime,
  shortHash,
  WRITER_AGENT,
} from "@/lib/format"
import { t } from "@/lib/i18n"
import type { JevReading, Lang, Song, SongRecord } from "@/lib/types"
import { cn } from "@/lib/utils"

const KIND_ICON: Record<string, typeof FileMusic> = {
  artefact: FileMusic,
  message: MessageCircle,
  "co-edit": FileText,
  claim: ScrollText,
  dispute: AudioLines,
  "ai-generation": Bot,
  "ai-assist": Bot,
  "ai-voice": MicVocal,
  consent: ShieldCheck,
}

function choiceText(choice: string, song: Song, lang: Lang): string {
  if (choice === "none")
    return lang === "en" ? "No credit given" : "Hakuna sifa iliyotolewa"
  const [writer, role, el] = choice.split("__")
  const who = FIRST[writer as "wanjiru" | "malik"] ?? writer
  const verb =
    role === "originated"
      ? lang === "en"
        ? "started"
        : "alianzisha"
      : lang === "en"
        ? "developed"
        : "aliendeleza"
  return `${who} ${verb} ${elementName(song, el, lang).toLowerCase()}`
}

function JevPanel({
  rec,
  song,
  lang,
}: {
  rec: SongRecord
  song: Song
  lang: Lang
}) {
  const [reading, setReading] = React.useState<JevReading | null>(null)
  const [loading, setLoading] = React.useState(false)
  const credit = rec.credits?.[0]
  if (!credit) return null
  const seeded = `${credit.writer}__${credit.role}__${credit.element}`

  async function read() {
    setLoading(true)
    try {
      setReading(await api.jev(rec.id))
    } catch {
      setReading({
        mode: "manual",
        choice: seeded,
        confidence: null,
        probabilities: null,
        model: null,
        request_id: null,
        latency_ms: null,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-3 rounded-xl border border-dashed border-border bg-background/70 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 text-xs font-medium">
          <Sparkles className="size-3.5 text-gold" />
          {lang === "en"
            ? "What this message credits"
            : "Ujumbe huu unampa nani sifa"}
        </p>
        <Button
          variant="outline"
          size="xs"
          onClick={() => void read()}
          disabled={loading}
          data-testid={`jev-${rec.id}`}
        >
          {loading ? (
            <Loader2 className="animate-spin" data-icon="inline-start" />
          ) : (
            <Sparkles data-icon="inline-start" />
          )}
          {t(lang, "readWithJev")}
        </Button>
      </div>
      <p className="mt-2 font-display text-lg">
        {choiceText(reading?.choice ?? seeded, song, lang)}
      </p>
      {reading?.probabilities && (
        <div className="mt-2 space-y-1">
          {Object.entries(reading.probabilities).map(([k, p]) => (
            <div
              key={k}
              className="grid grid-cols-[1fr_auto] items-center gap-3 text-xs"
            >
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gold transition-[width] duration-700"
                  style={{ width: `${Math.round(p * 100)}%` }}
                />
              </div>
              <span className="w-56 truncate font-mono text-muted-foreground">
                {Math.round(p * 100)}% {choiceText(k, song, lang)}
              </span>
            </div>
          ))}
          <p className="pt-1 font-mono text-[0.65rem] text-muted-foreground">
            {reading.model} · {reading.latency_ms} ms ·{" "}
            {reading.request_id?.slice(0, 18)}
          </p>
        </div>
      )}
      {reading?.mode === "manual" && (
        <p className="mt-1 font-mono text-[0.65rem] text-muted-foreground">
          {lang === "en"
            ? "Manual reading (Jev unavailable)"
            : "Usomaji wa mkono (Jev haipatikani)"}
        </p>
      )}
      <p className="mt-2 inline-flex items-center gap-1 text-xs text-truth-ink">
        <Check className="size-3.5" /> {t(lang, "confirmedBy")}{" "}
        {FIRST[rec.confirmed_by ?? rec.author]}.{" "}
        {lang === "en"
          ? "Jev reads, Omega decides."
          : "Jev inasoma, Omega inaamua."}
      </p>
    </div>
  )
}

function RecordCard({
  rec,
  song,
  lang,
  exchanged,
}: {
  rec: SongRecord
  song: Song
  lang: Lang
  exchanged: boolean
}) {
  const Icon =
    rec.kind === "artefact" && rec.file?.endsWith(".m4a")
      ? Mic
      : (KIND_ICON[rec.kind] ?? FileText)
  const agent = WRITER_AGENT[rec.author]
  const both = rec.holders.length === 2
  const isMsg = rec.kind === "message"
  const title =
    rec.title ??
    (rec.kind === "claim"
      ? lang === "en"
        ? `${FIRST[rec.author]}'s Account`
        : `Maelezo Ya ${FIRST[rec.author]}`
      : lang === "en"
        ? "Chat Message"
        : "Ujumbe")
  return (
    <li
      className="relative grid grid-cols-[auto_1fr] gap-4"
      data-testid={`record-${rec.id}`}
    >
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "grid size-9 place-items-center rounded-full border-2 bg-card",
            agent === "nairobi"
              ? "border-nairobi text-nairobi-ink"
              : "border-harlem text-harlem-ink"
          )}
        >
          <Icon className="size-4" />
        </span>
        <span className="w-px flex-1 bg-border" />
      </div>
      <div className="pb-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="font-medium">{title}</p>
          <span className="font-mono text-xs text-muted-foreground">
            {fmtTime(rec.at)}
            {rec.author === "malik" && (
              <span className="hidden sm:inline"> · {fmtNY(rec.at)}</span>
            )}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {FIRST[rec.author]}, {CITY[agent]}
          {rec.element && <> · {elementName(song, rec.element, lang)}</>}
        </p>

        {isMsg && (
          <div
            className={cn(
              "mt-2 max-w-md rounded-2xl px-4 py-2.5 text-[0.95rem] shadow-xs",
              agent === "nairobi"
                ? "rounded-tl-sm bg-nairobi-soft"
                : "rounded-tl-sm bg-harlem-soft"
            )}
          >
            <p>{rec.text}</p>
            {rec.translation && (
              <p className="mt-1 text-xs text-muted-foreground italic">
                {rec.translation}
              </p>
            )}
            {rec.attachment && (
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-background/70 px-2.5 py-1 text-xs">
                <Mic className="size-3" /> hook-idea.m4a
              </p>
            )}
          </div>
        )}
        {rec.kind === "co-edit" && (
          <p className="mt-2 border-l-2 border-border pl-3 text-lg">
            &ldquo;{rec.text}&rdquo;
          </p>
        )}
        {rec.kind === "artefact" && (
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            <code className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs">
              {rec.file}
            </code>
            <span className="text-muted-foreground">
              {lang === "en" ? rec.detail : rec.detail_sw}
            </span>
            {rec.hash && (
              <span className="inline-flex items-center gap-1 font-mono text-[0.68rem] text-muted-foreground">
                <Hash className="size-3" /> {shortHash(rec.hash, 10)}
              </span>
            )}
          </div>
        )}
        {(rec.kind === "ai-generation" || rec.kind === "ai-assist" || rec.kind === "ai-voice") && (
          <div className="mt-2 max-w-xl rounded-xl border border-border bg-card px-4 py-3 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-ink px-2 py-0.5 text-[0.7rem] font-medium text-white">AI</span>
              <span className="font-medium">{rec.tool}</span>
            </div>
            {rec.prompt && (
              <p className="mt-2 text-muted-foreground">
                {lang === "en" ? "Prompt" : "Maelezo"}: <span className="text-foreground italic">&ldquo;{rec.prompt}&rdquo;</span>
              </p>
            )}
            <p className="mt-1 text-muted-foreground">{lang === "en" ? rec.detail : rec.detail_sw}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {rec.kind === "ai-generation"
                ? lang === "en"
                  ? "Recorded and disclosed. No person owns what the machine made."
                  : "Imerekodiwa na kuwekwa wazi. Hakuna mtu anayemiliki kilichotengenezwa na mashine."
                : rec.kind === "ai-voice"
                  ? lang === "en"
                    ? "Allowed only because Wanjiru gave consent, for the demo only."
                    : "Imeruhusiwa kwa sababu Wanjiru alitoa ridhaa, kwa demo tu."
                  : lang === "en"
                    ? "Assistive only. Disclosed, with no effect on who wrote what."
                    : "Msaada tu. Imewekwa wazi, haiathiri nani aliandika nini."}
            </p>
          </div>
        )}
        {rec.kind === "consent" && (
          <div className="mt-2 max-w-xl rounded-xl border border-truth/30 bg-truth-soft/50 px-4 py-3 text-sm">
            <p className="font-medium">{rec.text}</p>
            {rec.translation && <p className="mt-1 text-xs text-muted-foreground italic">{rec.translation}</p>}
          </div>
        )}
        {(rec.kind === "claim" || rec.kind === "dispute") && (
          <div className="mt-2 max-w-xl rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm">
            <p>{lang === "sw" && rec.text_sw ? rec.text_sw : rec.text}</p>
            {rec.translation && (
              <p className="mt-1 text-xs text-muted-foreground italic">
                {rec.translation}
              </p>
            )}
            {rec.kind === "claim" && (
              <p className="mt-1.5 text-xs text-[oklch(0.45_0.1_70)]">
                {lang === "en"
                  ? "Written after the dispute began."
                  : "Iliandikwa baada ya mzozo kuanza."}
              </p>
            )}
          </div>
        )}
        {isMsg && rec.credits && rec.credits.length > 0 && (
          <JevPanel rec={rec} song={song} lang={lang} />
        )}

        <div className="mt-2 flex flex-wrap gap-1.5">
          {both ? (
            <Badge variant="outline" className="rounded-full text-[0.68rem]">
              {lang === "en"
                ? "Both agents hold this"
                : "Mawakala wote wawili wanayo"}
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className={cn(
                "rounded-full text-[0.68rem]",
                agent === "nairobi"
                  ? "border-nairobi/50 text-nairobi-ink"
                  : "border-harlem/50 text-harlem-ink"
              )}
            >
              {lang === "en"
                ? `Only the ${CITY[agent]} agent`
                : `Wakala wa ${CITY[agent]} pekee`}
            </Badge>
          )}
          {!both && exchanged && (
            <Badge className="rounded-full bg-truth-soft text-[0.68rem] text-truth-ink">
              {lang === "en" ? "Exchanged" : "Imebadilishwa"}
            </Badge>
          )}
        </div>
      </div>
    </li>
  )
}

export function EvidenceTab() {
  const { song, state, lang } = useSession()
  if (!song || !state) return null
  const records = [...song.records].sort((a, b) => a.at - b.at)
  const days = new Map<string, SongRecord[]>()
  for (const r of records) {
    const d = fmtDay(r.at)
    days.set(d, [...(days.get(d) ?? []), r])
  }
  return (
    <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-4 text-sm text-muted-foreground lg:sticky lg:top-24 lg:self-start">
        <p className="text-sm font-medium text-foreground">
          {lang === "en" ? "How much each kind counts" : "Kila aina ina uzito gani"}
        </p>
        {[
          [lang === "en" ? "File with a fingerprint and timestamp" : "Faili yenye alama na muhuri wa wakati", 81],
          [lang === "en" ? "Shared lyric document edit" : "Uhariri wa hati ya maneno", 75],
          [lang === "en" ? "The other writer's own words" : "Maneno ya mwandishi mwingine", 70],
          [lang === "en" ? "Your own memory" : "Kumbukumbu yako", 45],
          [lang === "en" ? "Memory written after the dispute" : "Kumbukumbu baada ya mzozo", 27],
        ].map(([label, v]) => (
          <div key={label as string}>
            <div className="flex justify-between gap-3">
              <span>{label}</span>
              <span className="tabular font-medium text-foreground">{v}%</span>
            </div>
            <div className="mt-1 h-1 rounded-full bg-muted">
              <div className="h-full rounded-full bg-foreground/70" style={{ width: `${v}%` }} />
            </div>
          </div>
        ))}
        <p className="pt-2 text-xs leading-relaxed">
          {lang === "en"
            ? "Records made at the time count more than memories made later. The agents combine all of it before deciding."
            : "Rekodi za wakati huo zina uzito zaidi kuliko kumbukumbu za baadaye. Mawakala wanaunganisha yote kabla ya kuamua."}
        </p>
      </aside>
      <div className="space-y-6">
        {[...days.entries()].map(([day, recs]) => (
          <section key={day}>
            <p className="mb-4 font-display text-2xl font-[540] tracking-tight">
              {day}
            </p>
            <ol>
              {recs.map((r) => (
                <RecordCard
                  key={r.id}
                  rec={r}
                  song={song}
                  lang={lang}
                  exchanged={state.phase !== "solo"}
                />
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  )
}
