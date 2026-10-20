"use client"

import { ArrowLeftRight, ArrowRight, Check, CircleSlash, Loader2, Scale } from "lucide-react"

import { useSession } from "./session-provider"
import { SplitRing } from "./split-ring"
import { Button } from "@/components/ui/button"
import { accountText, AGENT_WRITER, CITY, elementName, FIRST, pct, shortHash } from "@/lib/format"
import { t } from "@/lib/i18n"
import type { AgentView } from "@/lib/types"
import { cn } from "@/lib/utils"

function AgentCard({ view }: { view: AgentView }) {
  const { state, song, busy, lang } = useSession()
  const agent = view.agent
  const owner = AGENT_WRITER[agent]
  const info = song?.writer_info[owner]
  const reconciled = !!view.result
  const totals = (view.result ?? view.draft).body.totals
  const converged = !!state?.converged
  const working = busy === "reconcile" || busy === "contest"
  const accent = agent === "nairobi" ? "bg-nairobi" : "bg-harlem"

  return (
    <article
      data-testid={`agent-${agent}`}
      className={cn(
        "flex flex-col rounded-2xl border bg-card p-6 transition-colors duration-700",
        converged ? "border-truth/40" : "border-border"
      )}
    >
      <header className="flex items-center gap-3">
        <span className={cn("grid size-10 place-items-center rounded-full text-sm font-medium text-white", accent)}>
          {FIRST[owner][0]}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">
            {lang === "en" ? `${FIRST[owner]}'s Agent` : `Wakala Wa ${FIRST[owner]}`}
          </p>
          <p className="truncate text-sm text-muted-foreground">
            {info?.name}, {info?.role.toLowerCase()} in {CITY[agent]}
          </p>
        </div>
      </header>

      <div className="my-7 flex justify-center">
        <SplitRing
          size={196}
          wanjiru={totals.wanjiru}
          malik={totals.malik}
          busy={working}
          agreed={converged}
          caption={reconciled ? t(lang, "reconciled") : lang === "en" ? `${FIRST[owner]}'s version` : `Toleo la ${FIRST[owner]}`}
        />
      </div>

      <dl className="space-y-2.5 border-t border-border pt-4 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">{lang === "en" ? `${FIRST[owner]} remembered` : `${FIRST[owner]} alikumbuka`}</dt>
          <dd className="tabular font-medium">
            <span className="text-nairobi-ink">{pct(view.draft.body.totals.wanjiru)}</span>
            <span className="text-muted-foreground"> / </span>
            <span className="text-harlem-ink">{pct(view.draft.body.totals.malik)}</span>
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">{lang === "en" ? "What this agent knows" : "Anachojua wakala huyu"}</dt>
          <dd className="tabular font-medium">
            {view.holds} {t(lang, "records")}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-muted-foreground">{t(lang, "proofHash")}</dt>
          <dd>
            <code
              data-testid={`hash-${agent}`}
              className={cn(
                "rounded-md px-2 py-0.5 font-mono text-xs transition-colors duration-700",
                converged ? "bg-truth-soft text-truth-ink" : "bg-muted text-muted-foreground"
              )}
            >
              {shortHash(view.hash, 6)}
            </code>
          </dd>
        </div>
        {view.pack !== "split-v1" && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {lang === "en" ? `Running older rules (${view.pack})` : `Inatumia sheria za zamani (${view.pack})`}
          </p>
        )}
      </dl>
    </article>
  )
}

function Center({ onOpenSheet }: { onOpenSheet: () => void }) {
  const { state, song, busy, lang, exchange, reconcile } = useSession()
  if (!state) return null
  const phase = state.phase
  const working = busy === "reconcile" || busy === "contest"
  const sharing = busy === "exchange"

  if (working) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center" aria-live="polite">
        <Loader2 className="size-7 animate-spin text-nairobi" />
        <p className="text-2xl font-medium tracking-[-0.03em]">{t(lang, "reasoning")}</p>
        <p className="max-w-xs text-muted-foreground">
          {lang === "en"
            ? "Each agent checks the files, messages and edits on its own."
            : "Kila wakala anakagua faili, jumbe na mabadiliko peke yake."}
        </p>
      </div>
    )
  }

  if (phase === "reconciled" && state.converged) {
    return (
      <div className="animate-rise flex flex-col items-center gap-5 text-center" aria-live="polite">
        <span className="inline-flex items-center gap-2 rounded-full bg-truth px-4 py-1.5 text-sm font-medium text-white">
          <Check className="size-4" /> {t(lang, "oneTruth")}
        </span>
        <p className="max-w-sm text-[1.75rem] leading-tight font-medium tracking-[-0.035em] text-balance">
          {lang === "en"
            ? "Same evidence. Same rules. Same answer."
            : "Ushahidi uleule. Sheria zilezile. Jibu lilelile."}
        </p>
        <p className="max-w-sm text-muted-foreground">
          {lang === "en"
            ? "Both agents worked it out separately and got the same result. Their matching agreement IDs prove it."
            : "Mawakala wote wawili walifanya kazi kando na kupata jibu lilelile. Vitambulisho vyao vinavyolingana vinathibitisha."}
        </p>
        <Button size="lg" className="h-12 rounded-xl bg-nairobi px-6 text-base font-normal text-white hover:bg-nairobi/90" onClick={onOpenSheet} data-testid="open-sheet">
          {lang === "en" ? "See Why" : "Ona Kwa Nini"} <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    )
  }

  if (phase === "reconciled") {
    return (
      <div className="animate-rise flex flex-col items-center gap-4 text-center" aria-live="polite">
        <span className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-1.5 text-sm font-medium text-destructive">
          <CircleSlash className="size-4" /> {t(lang, "noTruth")}
        </span>
        <p className="max-w-sm text-2xl font-medium tracking-[-0.03em] text-balance">
          {lang === "en" ? "The agents got different answers." : "Mawakala walipata majibu tofauti."}
        </p>
        <p className="max-w-sm text-muted-foreground">
          {lang === "en"
            ? "One of them is using older rules, so their results don't match. Sawa never pretends there is agreement, so signing stays closed."
            : "Mmoja wao anatumia sheria za zamani, kwa hivyo matokeo hayalingani. Sawa haijifanyi kuna makubaliano, kwa hivyo kusaini kumefungwa."}
        </p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center gap-5 text-center" aria-live="polite">
      <p className="max-w-md text-[1.75rem] leading-tight font-medium tracking-[-0.035em] text-balance">
        {phase === "solo"
          ? lang === "en"
            ? `They remember ${state.disputed.length} things differently.`
            : `Wanakumbuka mambo ${state.disputed.length} tofauti.`
          : lang === "en"
            ? "Evidence shared. Ready to find the fair split."
            : "Ushahidi umeshirikiwa. Tayari kutafuta mgao wa haki."}
      </p>
      <ul className="w-full max-w-md space-y-2.5 text-left">
        {state.disputed.map((d) => (
          <li key={d.element} className="rounded-xl border border-border bg-card px-4 py-3">
            <p className="font-medium">{elementName(song, d.element, lang)}</p>
            <div className="mt-1.5 grid grid-cols-2 gap-4 text-sm">
              <p>
                <span className="block text-xs text-muted-foreground">{lang === "en" ? "Malik says" : "Malik anasema"}</span>
                <span className="text-harlem-ink">{accountText(d.harlem, lang)}</span>
              </p>
              <p>
                <span className="block text-xs text-muted-foreground">{lang === "en" ? "Wanjiru says" : "Wanjiru anasema"}</span>
                <span className="text-nairobi-ink">{accountText(d.nairobi, lang)}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
      {phase === "solo" ? (
        <Button size="lg" className="h-12 rounded-xl px-6 text-base font-normal" onClick={() => void exchange()} disabled={!!busy} data-testid="exchange">
          {sharing ? <Loader2 className="animate-spin" data-icon="inline-start" /> : <ArrowLeftRight data-icon="inline-start" />}
          {t(lang, "exchangeEvidence")}
        </Button>
      ) : (
        <Button
          size="lg"
          className="h-12 rounded-xl bg-nairobi px-6 text-base font-normal text-white hover:bg-nairobi/90"
          onClick={() => void reconcile()}
          disabled={!!busy}
          data-testid="reconcile"
        >
          <Scale data-icon="inline-start" /> {t(lang, "reconcileNow")}
        </Button>
      )}
      <p className="max-w-sm text-sm text-muted-foreground">
        {phase === "solo"
          ? lang === "en"
            ? "Right now each agent only knows its own writer's side. Sharing sends file fingerprints and messages, never the audio."
            : "Kwa sasa kila wakala anajua upande wa mwandishi wake tu. Kushiriki kunatuma alama za faili na jumbe, si sauti."
          : lang === "en"
            ? "Both agents now hold everything. Each will work out the split on its own."
            : "Mawakala wote sasa wana kila kitu. Kila mmoja atatafuta mgao peke yake."}
      </p>
    </div>
  )
}

export function Stage({ onOpenSheet }: { onOpenSheet: () => void }) {
  const { state } = useSession()
  if (!state) return null
  return (
    <section aria-label="The two agents" className="grid items-center gap-6 lg:grid-cols-[minmax(0,360px)_1fr_minmax(0,360px)] xl:gap-10">
      <AgentCard view={state.agents.harlem} />
      <Center onOpenSheet={onOpenSheet} />
      <AgentCard view={state.agents.nairobi} />
    </section>
  )
}
