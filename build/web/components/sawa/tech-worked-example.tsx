import { ArrowDown, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * The hook melody, worked through by hand. Values follow from split-v1's
 * rule truth values, Omega's NAL deduction and revision, rounded to two
 * places. The agent's tests pin the memo (1.0, 0.81) and the post-challenge (0.9261, 0.8334).
 */

const F_MIN = 0.6
const C_MIN = 0.5

function Meter({ label, value, min }: { label: string; value: number; min: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-3 font-mono text-[0.7rem] text-muted-foreground">{label}</span>
      <div className="relative h-1.5 flex-1 rounded-full bg-muted">
        <div className="absolute inset-y-0 left-0 rounded-full bg-nairobi" style={{ width: `${value * 100}%` }} />
        <div className="absolute -inset-y-1 w-px bg-ink/60" style={{ left: `${min * 100}%` }} aria-hidden />
      </div>
    </div>
  )
}

/** A truth value with two small meters; the tick marks Omega's act threshold. */
export function TruthValue({ f, c, className }: { f: number; c: number; className?: string }) {
  const settled = f >= F_MIN && c >= C_MIN
  return (
    <div className={cn("w-40 shrink-0", className)}>
      <div className="flex items-baseline justify-between">
        <span className="tabular font-mono text-sm">
          ({f.toFixed(2)}, {c.toFixed(2)})
        </span>
        <span className={cn("text-[0.7rem] font-medium", settled ? "text-truth-ink" : "text-muted-foreground")}>
          {settled ? "Settled" : "Not settled"}
        </span>
      </div>
      <div className="mt-1.5 space-y-1">
        <Meter label="f" value={f} min={F_MIN} />
        <Meter label="c" value={c} min={C_MIN} />
      </div>
    </div>
  )
}

type Ev = { when: string; what: string; rule: string; f: number; c: number; muted?: boolean }

const HOOK_EVIDENCE: Ev[] = [
  { when: "12 Sep, 21:04", what: "Wanjiru's voice memo, hook-idea.m4a", rule: "File with a fingerprint", f: 1.0, c: 0.81 },
  {
    when: "12 Sep, 21:20",
    what: "Malik: “yo this hum is fire, imma build the beat around it”",
    rule: "The other writer's own words",
    f: 1.0,
    c: 0.7,
  },
  { when: "29 Sep, 12:00", what: "Malik's account denies it", rule: "Memory after the dispute (D2)", f: 0.0, c: 0.27 },
  { when: "29 Sep, 13:00", what: "Wanjiru's account affirms it", rule: "Memory after the dispute (D2)", f: 1.0, c: 0.27 },
]

const REVISION = [
  { label: "Memo", f: 1.0, c: 0.81 },
  { label: "+ Malik's message", f: 1.0, c: 0.87 },
  { label: "+ Malik's account", f: 0.95, c: 0.87 },
  { label: "+ Wanjiru's account", f: 0.95, c: 0.88 },
]

function Panel({ step, title, children, className }: { step: string; title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-6 md:p-8", className)}>
      <p className="text-sm font-medium text-nairobi-ink">{step}</p>
      <h3 className="mt-2 text-2xl font-medium tracking-[-0.03em]">{title}</h3>
      {children}
    </div>
  )
}

export function WorkedExample() {
  return (
    <div className="space-y-5">
      <Panel step="Step 1" title="Who Started The Hook Melody?">
        <p className="mt-2 font-mono text-sm text-muted-foreground">(originated hook-melody wanjiru)</p>
        <ul className="mt-6 divide-y divide-border">
          {HOOK_EVIDENCE.map((e) => (
            <li key={e.what} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{e.when}</p>
                <p className="mt-0.5">{e.what}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{e.rule}</p>
              </div>
              <TruthValue f={e.f} c={e.c} />
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-xl bg-muted/60 p-5">
          <p className="text-sm font-medium">NAL Revision, In Time Order</p>
          <ol className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
            {REVISION.map((r, i) => (
              <li key={r.label} className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="rounded-lg bg-background p-3">
                  <p className="mb-2 text-xs text-muted-foreground">{r.label}</p>
                  <TruthValue f={r.f} c={r.c} />
                </div>
                {i < REVISION.length - 1 && (
                  <>
                    <ArrowRight className="hidden size-4 shrink-0 text-nairobi md:block" aria-hidden />
                    <ArrowDown className="size-4 shrink-0 self-center text-nairobi md:hidden" aria-hidden />
                  </>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Agreeing sources raise confidence; the denial pulls frequency down a little. The result, about (0.95, 0.88),
            clears Omega&apos;s act threshold, so Wanjiru is settled as the originator.
          </p>
        </div>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel step="Step 2" title="Malik's MIDI Becomes Development">
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Malik exported hook_v1.mid on 14 Sep at 22:40. He had received Wanjiru&apos;s memo on 12 Sep at 21:10. D1,
            received before created, replaces the artefact rule: the MIDI is evidence that he developed the hook, not
            that he started it.
          </p>
          <div className="mt-6 space-y-3">
            <div className="flex flex-col gap-3 rounded-xl bg-muted/60 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-sm">(developed hook-melody malik)</p>
              <TruthValue f={1.0} c={0.81} />
            </div>
            <div className="flex flex-col gap-3 rounded-xl bg-muted/60 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-sm">(originated hook-melody malik)</p>
                <p className="mt-1 text-xs text-muted-foreground">Only the two accounts remain, and they cancel out</p>
              </div>
              <TruthValue f={0.5} c={0.43} />
            </div>
          </div>
        </Panel>

        <Panel step="Step 3" title="Policy Turns Roles Into Points">
          <p className="mt-3 leading-relaxed text-muted-foreground">
            The hook melody is worth 15 points under the writers&apos; own agreement. One writer started it and the
            other developed it, so origination takes 75 and development 25.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl">
            <div className="flex h-12 text-sm font-medium text-white">
              <div className="flex items-center bg-nairobi px-4" style={{ width: "75%" }}>
                Wanjiru 11.25
              </div>
              <div className="flex flex-1 items-center justify-end bg-harlem px-4">Malik 3.75</div>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Started 75 / developed 25, of 15 points.</p>
        </Panel>
      </div>

      <Panel step="Step 4" title="Malik Withdraws His Message" className="border-nairobi/50">
        <div className="mt-4 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
          <p className="leading-relaxed text-muted-foreground">
            Malik challenges his own message: &ldquo;It was hype, not a credit.&rdquo; The premise is marked withdrawn,
            with his reason, in both agents&apos; memories, and both recompute. Without it, the memo and the two accounts
            still revise to about (0.93, 0.83). The hook stays with Wanjiru, because the evidence still clears the
            threshold, not because anyone argued louder.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="rounded-lg bg-muted/60 p-3">
              <p className="mb-2 text-xs text-muted-foreground">Before</p>
              <TruthValue f={0.95} c={0.88} />
            </div>
            <ArrowRight className="size-4 text-nairobi" aria-hidden />
            <div className="rounded-lg bg-muted/60 p-3">
              <p className="mb-2 text-xs text-muted-foreground">After the challenge</p>
              <TruthValue f={0.93} c={0.83} />
            </div>
          </div>
        </div>
      </Panel>
    </div>
  )
}
