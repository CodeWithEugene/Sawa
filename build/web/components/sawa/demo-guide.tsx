"use client"

import * as React from "react"
import { Lightbulb, RotateCcw, X } from "lucide-react"

import { useSession } from "./session-provider"
import { cn } from "@/lib/utils"

type Step = { title: { en: string; sw: string }; body: { en: string; sw: string } }

const STEPS: Step[] = [
  {
    title: { en: "Their Versions Differ", sw: "Matoleo Yao Yanatofautiana" },
    body: {
      en: "Malik and Wanjiru each have an agent that only knows their own side. Malik's version gives him 77.5%, Wanjiru's gives her 40%. See where they disagree, then press Share Evidence.",
      sw: "Malik na Wanjiru kila mmoja ana wakala anayejua upande wake tu. Toleo la Malik linampa 77.5%, la Wanjiru linampa 40%. Ona wanapotofautiana, kisha bonyeza Shiriki Ushahidi.",
    },
  },
  {
    title: { en: "Find The Fair Split", sw: "Tafuta Mgao Wa Haki" },
    body: {
      en: "Both agents now hold every file, message and edit. Press Find The Fair Split. Each agent works it out on its own, so you can check they agree.",
      sw: "Mawakala wote sasa wana kila faili, ujumbe na uhariri. Bonyeza Tafuta Mgao Wa Haki. Kila wakala anafanya kazi peke yake, ili uweze kuhakikisha wanakubaliana.",
    },
  },
  {
    title: { en: "See Why, And Challenge It", sw: "Ona Kwa Nini, Na Upinge" },
    body: {
      en: "Same evidence, same rules, same answer. Open the Hook Melody below to see why Wanjiru gets the larger share, and the Drum Groove to see how AI is handled. Try challenging Malik's message: the answer is recalculated in front of you.",
      sw: "Ushahidi uleule, sheria zilezile, jibu lilelile. Fungua Melodia Ya Kiitikio kuona kwa nini Wanjiru anapata mgao mkubwa, na Mdundo Wa Ngoma kuona jinsi AI inavyoshughulikiwa. Jaribu kupinga ujumbe wa Malik: jibu linakokotolewa upya mbele yako.",
    },
  },
  {
    title: { en: "Sign In The Session", sw: "Saini Kikaoni" },
    body: {
      en: "When both writers are happy, open the Sign tab. Nothing counts until both sign. The signed split sheet records every rights holder, the recording split and the AI disclosure.",
      sw: "Waandishi wote wakiridhika, fungua kichupo cha Kusaini. Hakuna kinachohesabiwa hadi wote wasaini. Karatasi iliyosainiwa inarekodi kila mwenye haki, mgao wa rekodi na ufichuzi wa AI.",
    },
  },
  {
    title: { en: "Signed And Ready To License", sw: "Imesainiwa Na Tayari Kwa Leseni" },
    body: {
      en: "Done. Scroll to the signed split sheet. Want to see what happens when the agents can't agree? Use the settings menu at the top to run Wanjiru's agent on older rules.",
      sw: "Imekamilika. Shuka hadi karatasi iliyosainiwa. Unataka kuona kinachotokea mawakala wasipokubaliana? Tumia menyu ya mipangilio juu kuendesha wakala wa Wanjiru kwa sheria za zamani.",
    },
  },
]

export function DemoGuide() {
  const { state, lang, reset, busy } = useSession()
  const [hidden, setHidden] = React.useState(false)
  if (!state || hidden) return null

  const signedBoth = !!state.record
  const index =
    state.phase === "solo"
      ? 0
      : state.phase === "exchanged"
        ? 1
        : signedBoth
          ? 4
          : Object.keys(state.signatures).length > 0
            ? 3
            : 2
  const step = STEPS[index]

  return (
    <aside
      aria-label={lang === "en" ? "Demo guide" : "Mwongozo wa demo"}
      data-testid="demo-guide"
      className="mb-8 flex flex-col gap-4 rounded-2xl bg-ink p-5 text-white md:flex-row md:items-center md:gap-6 md:p-6"
    >
      <div className="flex items-center gap-4 md:w-56 md:shrink-0">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-nairobi">
          <Lightbulb className="size-5" strokeWidth={1.8} />
        </span>
        <div>
          <p className="text-xs text-white/60">
            {lang === "en" ? "Step" : "Hatua"} {Math.min(index + 1, 4)} {lang === "en" ? "of" : "kati ya"} 4
          </p>
          <div className="mt-1.5 flex gap-1.5" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={cn("h-1 w-7 rounded-full", i <= Math.min(index, 3) ? "bg-nairobi" : "bg-white/20")} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-lg font-medium tracking-[-0.02em]">{step.title[lang]}</p>
        <p className="mt-1 leading-relaxed text-white/75">{step.body[lang]}</p>
      </div>
      <div className="flex gap-2 md:flex-col">
        {state.phase !== "solo" && (
          <button
            type="button"
            onClick={() => void reset()}
            disabled={!!busy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-sm text-white/85 transition-colors hover:bg-white/10 disabled:opacity-50"
          >
            <RotateCcw className="size-3.5" /> {lang === "en" ? "Start Over" : "Anza Upya"}
          </button>
        )}
        <button
          type="button"
          onClick={() => setHidden(true)}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-white/60 transition-colors hover:text-white"
        >
          <X className="size-3.5" /> {lang === "en" ? "Hide Guide" : "Ficha Mwongozo"}
        </button>
      </div>
    </aside>
  )
}
