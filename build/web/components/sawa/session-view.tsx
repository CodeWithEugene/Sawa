"use client"

import * as React from "react"
import { AlertTriangle, Check, RotateCcw, Settings2 } from "lucide-react"

import { EvidenceTab } from "./evidence-tab"
import { MemoryTab } from "./memory-tab"
import { RecordTab } from "./record-tab"
import { useSession } from "./session-provider"
import { SiteHeader } from "./site-header"
import { SplitSheet } from "./split-sheet"
import { Stage } from "./stage"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { t } from "@/lib/i18n"
import type { Lang } from "@/lib/types"
import { cn } from "@/lib/utils"

function Stepper() {
  const { state, lang } = useSession()
  const signed = !!state?.record
  const phase = state?.phase ?? "solo"
  const steps = [
    { key: "disagree", label: t(lang, "disagree"), done: phase !== "solo" },
    {
      key: "exchange",
      label: t(lang, "exchange"),
      done: phase === "reconciled",
    },
    {
      key: "reconcile",
      label: t(lang, "reconcile"),
      done: phase === "reconciled" && !!state?.converged,
    },
    { key: "sign", label: t(lang, "sign"), done: signed },
  ]
  const current = steps.findIndex((s) => !s.done)
  return (
    <ol className="hidden items-center gap-1 md:flex" aria-label="Progress">
      {steps.map((s, i) => (
        <li key={s.key} className="flex items-center gap-1">
          {i > 0 && (
            <span
              className={cn(
                "h-px w-5",
                s.done || i <= current ? "bg-ink/40" : "bg-border"
              )}
            />
          )}
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-colors",
              s.done && "bg-truth-soft text-truth-ink",
              i === current && "bg-ink text-paper",
              !s.done && i !== current && "text-muted-foreground"
            )}
            aria-current={i === current ? "step" : undefined}
          >
            {s.done ? (
              <Check className="size-3" />
            ) : (
              <span className="font-mono">{i + 1}</span>
            )}
            {s.label}
          </span>
        </li>
      ))}
    </ol>
  )
}

function LangToggle() {
  const { lang, setLang } = useSession()
  return (
    <div
      className="flex rounded-full border border-border bg-card p-0.5 text-xs font-medium"
      role="group"
      aria-label="Language"
    >
      {(["en", "sw"] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          data-testid={`lang-${l}`}
          className={cn(
            "rounded-full px-3 py-1 transition-colors",
            lang === l
              ? "bg-ink text-paper"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-pressed={lang === l}
        >
          {l === "en" ? "English" : "Kiswahili"}
        </button>
      ))}
    </div>
  )
}

function SessionMenu() {
  const { reset, setPack, busy, lang, state } = useSession()
  const mismatch = state?.agents.nairobi.pack === "split-v0"
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="Session options">
            <Settings2 />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            {lang === "en" ? "Session" : "Kikao"}
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => void reset()} disabled={!!busy}>
            <RotateCcw /> {t(lang, "reset")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              void setPack("nairobi", mismatch ? "split-v1" : "split-v0")
            }
            disabled={!!busy}
          >
            <AlertTriangle />
            {mismatch
              ? lang === "en"
                ? "Restore Nairobi To split-v1"
                : "Rejesha Nairobi Kwa split-v1"
              : lang === "en"
                ? "Run Nairobi On Old Rules (v0)"
                : "Endesha Nairobi Kwa Sheria Za Zamani"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function SessionView() {
  const { song, state, error, lang, busy } = useSession()
  const [tab, setTab] = React.useState("sheet")
  const tabsRef = React.useRef<HTMLDivElement>(null)

  function openSheet() {
    setTab("sheet")
    requestAnimationFrame(() =>
      tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    )
  }

  return (
    <>
      <SiteHeader>
        <Stepper />
        <LangToggle />
        <SessionMenu />
      </SiteHeader>
      <main className="w-full px-6 pt-8 pb-24 md:px-10 lg:px-16 2xl:px-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm text-muted-foreground">
              {lang === "en" ? "Demo song · all people and files are fictional" : "Wimbo wa mfano · watu na faili zote ni za kubuni"}
            </p>
            <h1 className="mt-2 text-5xl leading-none font-medium tracking-[-0.045em] md:text-6xl">
              {song ? song.title : <Skeleton className="h-12 w-72" />}
            </h1>
            {song && (
              <p className="mt-2 text-lg text-muted-foreground">
                &ldquo;{song.subtitle}&rdquo; · {lang === "en" ? "written by Wanjiru in Nairobi and Malik in Harlem, over WhatsApp" : "imeandikwa na Wanjiru Nairobi na Malik Harlem, kupitia WhatsApp"}
              </p>
            )}
          </div>
          <p className="max-w-md text-muted-foreground">
            {lang === "en"
              ? "A buyer wants to license the song. First, the two writers need to agree who wrote what."
              : "Mnunuzi anataka leseni ya wimbo. Kwanza, waandishi wawili wanahitaji kukubaliana nani aliandika nini."}
          </p>
        </div>

        {error && (
          <div
            className="mb-6 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
            role="alert"
          >
            {lang === "en"
              ? "The agents could not be reached. "
              : "Mawakala hawakupatikana. "}
            <span className="font-mono text-xs">{error}</span>
          </div>
        )}

        {state ? (
          <Stage onOpenSheet={openSheet} />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[330px_1fr_330px]">
            <Skeleton className="h-[440px] rounded-[1.4rem]" />
            <Skeleton className="h-[440px] rounded-[1.4rem] opacity-50" />
            <Skeleton className="h-[440px] rounded-[1.4rem]" />
          </div>
        )}

        <div ref={tabsRef} className="scroll-mt-20 pt-14">
          <Tabs value={tab} onValueChange={(v) => setTab(String(v))}>
            <TabsList className="mb-6 h-11 rounded-full bg-paper-deep p-1">
              {[
                ["sheet", t(lang, "splitSheet")],
                ["evidence", t(lang, "evidence")],
                ["record", t(lang, "sign")],
                ["memory", t(lang, "agentMemory")],
              ].map(([v, label]) => (
                <TabsTrigger
                  key={v}
                  value={v}
                  className="rounded-full px-4 data-active:bg-card data-active:shadow-sm"
                  data-testid={`tab-${v}`}
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent
              value="sheet"
              className={cn(
                busy === "contest" && "opacity-60 transition-opacity"
              )}
            >
              <SplitSheet />
            </TabsContent>
            <TabsContent value="evidence">
              <EvidenceTab />
            </TabsContent>
            <TabsContent value="record">
              <RecordTab />
            </TabsContent>
            <TabsContent value="memory">
              <MemoryTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}
