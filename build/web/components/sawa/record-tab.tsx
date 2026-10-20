"use client"

import * as React from "react"
import { BadgeCheck, Lock, PenLine } from "lucide-react"

import { SawaMark } from "./brand"
import { useSession } from "./session-provider"
import { SplitBar } from "./split-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FIRST, pct, shortHash } from "@/lib/format"
import { t } from "@/lib/i18n"
import type { Writer } from "@/lib/types"
import { cn } from "@/lib/utils"

function SignBox({ writer }: { writer: Writer }) {
  const { state, song, sign, busy, lang } = useSession()
  const info = song?.writer_info[writer]
  const [name, setName] = React.useState(info?.name ?? "")
  const [agree, setAgree] = React.useState(false)
  const signed = state?.signatures[writer]
  const canSign = !!state?.can_sign
  const accent = writer === "wanjiru" ? "nairobi" : "harlem"

  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-5 transition-colors",
        signed ? "border-truth/50 bg-truth-soft/40" : "border-border"
      )}
      data-testid={`signbox-${writer}`}
    >
      <div className="flex items-center justify-between">
        <p
          className={cn(
            "eyebrow",
            accent === "nairobi" ? "text-nairobi-ink" : "text-harlem-ink"
          )}
        >
          {info?.city} · {info?.role}
        </p>
        {signed && <BadgeCheck className="size-5 text-truth" />}
      </div>
      {signed ? (
        <div className="mt-3">
          <p className="font-display-wonk text-3xl italic">{signed.name}</p>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {t(lang, "signed")}{" "}
            {new Date(signed.at).toLocaleString("en-GB", {
              timeZone: "Africa/Nairobi",
            })}{" "}
            EAT
          </p>
        </div>
      ) : (
        <div className="mt-3 space-y-3">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!canSign}
            aria-label={`${FIRST[writer]} name`}
          />
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              className="mt-0.5 size-4 accent-[var(--ink)]"
              checked={agree}
              disabled={!canSign}
              onChange={(e) => setAgree(e.target.checked)}
              data-testid={`agree-${writer}`}
            />
            <span>
              {lang === "en"
                ? "I agree to this split sheet for composition and master."
                : "Nakubali karatasi hii ya mgao kwa utunzi na master."}
            </span>
          </label>
          <Button
            className="w-full"
            disabled={!canSign || !agree || name.trim().length < 2 || !!busy}
            onClick={() => void sign(writer, name.trim())}
            data-testid={`sign-${writer}`}
          >
            <PenLine data-icon="inline-start" /> {t(lang, "signAs")}{" "}
            {FIRST[writer]}
          </Button>
        </div>
      )}
    </div>
  )
}

function Certificate() {
  const { state, song, lang } = useSession()
  const rec = state?.record
  if (!rec || !song) return null
  const b = rec.body
  return (
    <article
      className="animate-rise relative overflow-hidden rounded-[1.6rem] border border-ink/15 bg-card p-8 shadow-xl md:p-10"
      data-testid="certificate"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full border-[18px] border-nairobi/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-20 size-72 rounded-full border-[18px] border-harlem/10"
      />
      <div className="relative flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="eyebrow">
            {lang === "en"
              ? "Split Sheet · Signed In The Session"
              : "Karatasi Ya Mgao · Imesainiwa Kikaoni"}
          </p>
          <h3 className="mt-3 text-5xl font-medium tracking-[-0.045em]">
            {b.title}
          </h3>
          <p className="text-xl text-muted-foreground">
            {song.subtitle}
          </p>
        </div>
        <SawaMark size={44} />
      </div>

      <div className="relative mt-8 grid gap-8 md:grid-cols-2">
        {(
          [
            ["composition", b.composition],
            ["master", b.master],
          ] as const
        ).map(([k, split]) => (
          <div key={k}>
            <p className="eyebrow">{t(lang, k)}</p>
            <p className="tabular mt-2 text-3xl font-medium tracking-[-0.03em]">
              <span className="text-nairobi-ink">{pct(split.wanjiru)}</span>
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-harlem-ink">{pct(split.malik)}</span>
            </p>
            <SplitBar
              className="mt-3"
              wanjiru={split.wanjiru}
              malik={split.malik}
            />
          </div>
        ))}
      </div>

      <div className="relative mt-8 grid gap-4 border-t border-dashed border-border pt-6 md:grid-cols-2">
        {(["wanjiru", "malik"] as Writer[]).map((w) => (
          <div key={w}>
            <p className="text-sm text-muted-foreground">
              {b.writers[w].role}, {b.writers[w].city}
            </p>
            <p className="font-display-wonk text-2xl italic">
              {b.signatures[w]?.name}
            </p>
          </div>
        ))}
      </div>

      <dl className="relative mt-8 grid gap-x-8 gap-y-2 rounded-xl bg-muted/50 p-5 font-mono text-xs md:grid-cols-2">
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">record sha256</dt>
          <dd data-testid="record-hash">{shortHash(rec.sha256, 12)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">proof hash</dt>
          <dd>{shortHash(b.proof_hash, 12)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">rule pack</dt>
          <dd>{b.pack}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">omega</dt>
          <dd>{b.omega} lib_nal</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">policy</dt>
          <dd>{b.policy}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">stems</dt>
          <dd>
            {b.stems.length}{" "}
            {lang === "en"
              ? "hashes, files stay in the vault"
              : "hash, faili zinabaki kwenye hifadhi"}
          </dd>
        </div>
      </dl>

      {b.ai_disclosure && b.ai_disclosure.length > 0 && (
        <div className="relative mt-6 rounded-xl border border-border p-5" data-testid="ai-disclosure">
          <p className="font-medium">{lang === "en" ? "AI Disclosure" : "Ufichuzi Wa AI"}</p>
          <ul className="mt-3 space-y-2.5 text-sm">
            {b.ai_disclosure.map((d) => (
              <li key={d.record} className="flex gap-3">
                <span className="mt-0.5 h-fit rounded-md bg-ink px-1.5 py-0.5 text-[0.65rem] font-medium text-white">AI</span>
                <span>
                  <span className="font-medium">{d.tool}</span>{" "}
                  <span className="text-muted-foreground">
                    {d.use === "generated"
                      ? lang === "en"
                        ? `generated the drum groove from Malik's prompt. ${b.ai_points} points owned by no one.`
                        : `ilitengeneza mdundo wa ngoma kutoka kwa maelezo ya Malik. Pointi ${b.ai_points} hazimilikiwi na mtu.`
                      : d.use === "voice-model"
                        ? lang === "en"
                          ? "used for a demo guide vocal, with Wanjiru's consent, not in the release."
                          : "ilitumika kwa sauti ya demo, kwa ridhaa ya Wanjiru, si kwenye toleo la mwisho."
                        : lang === "en"
                          ? "used for mastering only. No effect on authorship."
                          : "ilitumika kwa mastering tu. Haiathiri uandishi."}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="relative mt-6 flex flex-wrap items-center gap-2 text-sm">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-truth px-3 py-1 text-paper">
          <BadgeCheck className="size-4" />{" "}
          {lang === "en" ? "Ready For Licensing" : "Tayari Kwa Leseni"}
        </span>
        <span className="text-muted-foreground">
          {lang === "en"
            ? "Incantio and BASIX.MARKET listing: concept, pending partner confirmation."
            : "Kuorodheshwa Incantio na BASIX.MARKET: dhana, inasubiri uthibitisho wa washirika."}
        </span>
      </div>
    </article>
  )
}

export function RecordTab() {
  const { state, song, lang } = useSession()
  if (!state) return null
  return (
    <div className="space-y-6">
      {!state.can_sign && (
        <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          <Lock className="size-4 shrink-0" />
          {state.phase !== "reconciled"
            ? lang === "en"
              ? "Signing opens when both agents reach the same answer."
              : "Kusaini kunafunguka mawakala wote wawili wanapofikia jibu moja."
            : lang === "en"
              ? "Signing is closed: the agents have not reached the same answer."
              : "Kusaini kumefungwa: mawakala hawajafikia jibu moja."}
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        <SignBox key={`w-${song?.id}`} writer="wanjiru" />
        <SignBox key={`m-${song?.id}`} writer="malik" />
      </div>
      <Certificate />
    </div>
  )
}
