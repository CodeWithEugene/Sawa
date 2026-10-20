"use client"

import {
  ArrowLeftRight,
  Check,
  CircleSlash,
  FileSignature,
  Loader2,
  Sparkles,
} from "lucide-react"

import { useSession } from "./session-provider"
import { Vinyl } from "./vinyl"
import { Button } from "@/components/ui/button"
import {
  accountText,
  AGENT_WRITER,
  CITY,
  elementName,
  FIRST,
  pct,
  shortHash,
} from "@/lib/format"
import { t } from "@/lib/i18n"
import type { AgentId, AgentView } from "@/lib/types"
import { cn } from "@/lib/utils"

function AgentCard({
  view,
  side,
}: {
  view: AgentView
  side: "left" | "right"
}) {
  const { state, song, busy, lang } = useSession()
  const agent = view.agent
  const owner = AGENT_WRITER[agent]
  const info = song?.writer_info[owner]
  const reconciled = !!view.result
  const totals = (view.result ?? view.draft).body.totals
  const converged = !!state?.converged
  const reasoning = busy === "reconcile" || busy === "contest"
  const accent = agent === "nairobi" ? "nairobi" : "harlem"

  return (
    <article
      data-testid={`agent-${agent}`}
      className={cn(
        "relative flex flex-col items-center rounded-[1.4rem] border bg-card px-6 pt-6 pb-5 shadow-md transition-all duration-700",
        converged ? "border-truth/40" : "border-border",
        side === "left" ? "lg:rotate-[-0.6deg]" : "lg:rotate-[0.6deg]"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-6 top-0 h-1 rounded-b-full",
          accent === "nairobi" ? "bg-nairobi" : "bg-harlem"
        )}
      />
      <div className="flex w-full items-start justify-between gap-3">
        <div>
          <p
            className={cn(
              "eyebrow",
              accent === "nairobi" ? "text-nairobi-ink" : "text-harlem-ink"
            )}
          >
            {CITY[agent]} {lang === "en" ? "Agent" : "Wakala"}
          </p>
          <p className="mt-1 font-display text-xl font-[560] tracking-tight">
            {info?.name ?? FIRST[owner]}
          </p>
          <p className="text-sm text-muted-foreground">{info?.role}</p>
        </div>
        <div className="text-right font-mono text-[0.7rem] leading-relaxed text-muted-foreground">
          <p>
            {t(lang, "memory")}:{" "}
            <span className="tabular text-foreground">{view.holds}</span>{" "}
            {t(lang, "records")}
          </p>
          <p>
            pack{" "}
            <span
              className={cn(
                "text-foreground",
                view.pack !== "split-v1" && "text-destructive"
              )}
            >
              {view.pack}
            </span>
          </p>
        </div>
      </div>

      <Vinyl
        className="my-5"
        size={208}
        wanjiru={totals.wanjiru}
        malik={totals.malik}
        spinning={reasoning}
        state={converged ? "truth" : "draft"}
        label={reconciled ? t(lang, "reconciled") : t(lang, "draft")}
      />

      <div className="w-full space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{t(lang, "draft")}</span>
          <span className="tabular font-mono">
            <span className="text-nairobi-ink">
              {pct(view.draft.body.totals.wanjiru)}
            </span>
            {" / "}
            <span className="text-harlem-ink">
              {pct(view.draft.body.totals.malik)}
            </span>
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-dashed border-border pt-2">
          <span className="font-mono text-[0.7rem] tracking-wide text-muted-foreground uppercase">
            {t(lang, "proofHash")}
          </span>
          <code
            data-testid={`hash-${agent}`}
            className={cn(
              "rounded-md px-2 py-0.5 font-mono text-xs transition-colors duration-700",
              converged
                ? "bg-truth-soft text-truth-ink"
                : "bg-muted text-muted-foreground"
            )}
          >
            {shortHash(view.hash, 8)}
          </code>
        </div>
      </div>
    </article>
  )
}

function Center({ onOpenSheet }: { onOpenSheet: () => void }) {
  const { state, song, busy, lang, exchange, reconcile } = useSession()
  if (!state) return null
  const phase = state.phase
  const reasoning = busy === "reconcile" || busy === "contest"
  const exchanging = busy === "exchange"

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-2 py-4 text-center">
      {/* connector */}
      <div className="relative hidden h-px w-full lg:block">
        <div
          className={cn(
            "rule-dotted absolute inset-0",
            (exchanging || reasoning) && "opacity-40"
          )}
        />
        {(exchanging || phase !== "solo") && (
          <div className="absolute inset-0 overflow-hidden">
            <span
              className={cn(
                "absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-nairobi",
                exchanging && "animate-[packet-l_1.1s_linear_infinite]"
              )}
              style={{ left: exchanging ? undefined : "45%" }}
            />
            <span
              className={cn(
                "absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-harlem",
                exchanging && "animate-[packet-r_1.1s_linear_infinite]"
              )}
              style={{ left: exchanging ? undefined : "55%" }}
            />
          </div>
        )}
      </div>

      {reasoning ? (
        <div className="flex flex-col items-center gap-3" aria-live="polite">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
          <p className="font-display text-2xl font-[500]">
            {t(lang, "reasoning")}
          </p>
          <p className="font-mono text-xs tracking-wide text-muted-foreground">
            derive · defeat · revise · decide · prove
          </p>
        </div>
      ) : phase === "reconciled" ? (
        state.converged ? (
          <div
            className="animate-rise flex flex-col items-center gap-3"
            aria-live="polite"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-truth px-4 py-1.5 text-sm font-medium text-paper shadow-md">
              <Check className="size-4" /> {t(lang, "oneTruth")}
            </span>
            <p className="max-w-xs font-display text-2xl leading-snug font-[500] text-balance">
              {state.headline[lang]}
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              {shortHash(state.agents.harlem.hash, 8)} ={" "}
              {shortHash(state.agents.nairobi.hash, 8)}
            </p>
            <Button
              size="lg"
              className="mt-1 h-10 rounded-full px-5"
              onClick={onOpenSheet}
              data-testid="open-sheet"
            >
              <FileSignature data-icon="inline-start" />{" "}
              {lang === "en"
                ? "Open The Split Sheet"
                : "Fungua Karatasi Ya Mgao"}
            </Button>
          </div>
        ) : (
          <div
            className="animate-rise flex flex-col items-center gap-3"
            aria-live="polite"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-1.5 text-sm font-medium text-destructive">
              <CircleSlash className="size-4" /> {t(lang, "noTruth")}
            </span>
            <p className="max-w-xs font-display text-xl leading-snug text-balance">
              {state.headline[lang]}
            </p>
            <p className="max-w-xs text-sm text-muted-foreground">
              {lang === "en"
                ? `The agents run different rule packs (${state.agents.harlem.pack} and ${state.agents.nairobi.pack}). Sawa never fakes agreement.`
                : `Mawakala wanatumia vifurushi tofauti vya sheria (${state.agents.harlem.pack} na ${state.agents.nairobi.pack}). Sawa haidanganyi makubaliano.`}
            </p>
          </div>
        )
      ) : (
        <div
          className="flex w-full flex-col items-center gap-4"
          aria-live="polite"
        >
          <p className="font-display text-[1.7rem] leading-tight font-[520] text-balance">
            {phase === "solo"
              ? lang === "en"
                ? `The agents disagree about ${state.disputed.length} facts.`
                : `Mawakala hawakubaliani kuhusu mambo ${state.disputed.length}.`
              : state.headline[lang]}
          </p>
          <ul className="w-full max-w-sm space-y-2 text-left">
            {state.disputed.map((d) => (
              <li
                key={d.element}
                className="rounded-xl border border-dashed border-border bg-background/70 px-3.5 py-2.5"
              >
                <p className="text-sm font-medium">
                  {elementName(song, d.element, lang)}
                </p>
                <div className="mt-1.5 grid grid-cols-2 gap-3 text-xs leading-snug">
                  <p className="text-harlem-ink">
                    <span className="block font-mono text-[0.62rem] tracking-wider text-muted-foreground uppercase">
                      {lang === "en" ? "Malik says" : "Malik anasema"}
                    </span>
                    {accountText(d.harlem, lang)}
                  </p>
                  <p className="text-nairobi-ink">
                    <span className="block font-mono text-[0.62rem] tracking-wider text-muted-foreground uppercase">
                      {lang === "en" ? "Wanjiru says" : "Wanjiru anasema"}
                    </span>
                    {accountText(d.nairobi, lang)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          {phase === "solo" ? (
            <Button
              size="lg"
              className="h-11 rounded-full px-6"
              onClick={() => void exchange()}
              disabled={!!busy}
              data-testid="exchange"
            >
              {exchanging ? (
                <Loader2 className="animate-spin" data-icon="inline-start" />
              ) : (
                <ArrowLeftRight data-icon="inline-start" />
              )}
              {t(lang, "exchangeEvidence")}
            </Button>
          ) : (
            <Button
              size="lg"
              className="h-11 rounded-full bg-truth px-6 text-paper hover:bg-truth/90"
              onClick={() => void reconcile()}
              disabled={!!busy}
              data-testid="reconcile"
            >
              <Sparkles data-icon="inline-start" /> {t(lang, "reconcileNow")}
            </Button>
          )}
          <p className="max-w-xs text-xs text-muted-foreground">
            {phase === "solo"
              ? lang === "en"
                ? "Each agent sees only its owner's memory. Exchange sends atoms and hashes, never audio."
                : "Kila wakala anaona kumbukumbu za mwenyewe tu. Kubadilishana kunatuma atomu na hash, si sauti."
              : lang === "en"
                ? "Each agent now holds both memories. Each will reason on its own."
                : "Kila wakala sasa ana kumbukumbu zote mbili. Kila mmoja atafikiri peke yake."}
          </p>
        </div>
      )}
    </div>
  )
}

export function Stage({ onOpenSheet }: { onOpenSheet: () => void }) {
  const { state } = useSession()
  if (!state) return null
  const order: AgentId[] = ["harlem", "nairobi"]
  return (
    <section
      aria-label="The two agents"
      className="grid items-center gap-6 lg:grid-cols-[minmax(0,330px)_1fr_minmax(0,330px)]"
    >
      <AgentCard view={state.agents[order[0]]} side="left" />
      <Center onOpenSheet={onOpenSheet} />
      <AgentCard view={state.agents[order[1]]} side="right" />
    </section>
  )
}
