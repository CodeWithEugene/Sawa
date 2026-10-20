import { cn } from "@/lib/utils"

/**
 * Stylised views of the demo's numbers for the product page. Every figure
 * here matches the agent's seeded demo ("Amani Ni Sisi"); nothing is live.
 */

type Writer = "wanjiru" | "malik"

const WRITER_NAME: Record<Writer, string> = { wanjiru: "Wanjiru", malik: "Malik" }

/** Two coloured segments: Wanjiru (Nairobi, orange) then Malik (Harlem, blue). */
export function SplitBar({ wanjiru, className }: { wanjiru: number; className?: string }) {
  return (
    <div className={cn("flex h-2.5 w-full overflow-hidden rounded-full", className)} aria-hidden>
      <div className="bg-nairobi" style={{ width: `${wanjiru}%` }} />
      <div className="flex-1 bg-harlem" />
    </div>
  )
}

const DRAFTS = [
  { label: "Malik's Draft", agent: "Harlem agent", wanjiru: 22.5, malik: 77.5 },
  { label: "Wanjiru's Draft", agent: "Nairobi agent", wanjiru: 40, malik: 60 },
]

/** Hero aside: two drafts that disagree, then the reconciled split. */
export function DraftsToAnswer() {
  return (
    <div className="rounded-2xl border border-border bg-card p-7 shadow-xs">
      <p className="text-sm text-muted-foreground">Amani Ni Sisi, composition</p>
      <div className="mt-5 space-y-5">
        {DRAFTS.map((d) => (
          <div key={d.label}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-medium">{d.label}</span>
              <span className="text-muted-foreground">{d.agent}</span>
            </div>
            <SplitBar wanjiru={d.wanjiru} className="mt-2 opacity-60" />
            <p className="tabular mt-1.5 text-sm text-muted-foreground">
              Wanjiru {d.wanjiru} / Malik {d.malik}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-xl bg-ink p-5 text-white">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-medium">Reconciled By Both Agents</span>
          <span className="text-white/60">Same proof hash</span>
        </div>
        <SplitBar wanjiru={39.7} className="mt-3" />
        <div className="tabular mt-3 flex justify-between text-2xl font-medium tracking-[-0.03em]">
          <span>
            <span className="text-nairobi">Wanjiru</span> 39.7
          </span>
          <span>
            60.3 <span className="text-[oklch(0.75_0.12_268)]">Malik</span>
          </span>
        </div>
        <p className="mt-2 text-sm text-white/60">15 points of AI-generated drums are owned by no one.</p>
      </div>
    </div>
  )
}

type Row = { element: string; points: number; wanjiru: number; malik: number; note: string }

/** Element points out of 100; AI-generated drum points go to no one. */
const ROWS: Row[] = [
  { element: "Chords and bass", points: 30, wanjiru: 0, malik: 30, note: "Malik" },
  { element: "Drum groove", points: 20, wanjiru: 0, malik: 5, note: "AI generated, Malik developed" },
  { element: "Hook melody", points: 15, wanjiru: 11.25, malik: 3.75, note: "Wanjiru started, Malik developed" },
  { element: "Verse melody", points: 10, wanjiru: 10, malik: 0, note: "Wanjiru" },
  { element: "Chorus lyrics", points: 10, wanjiru: 5, malik: 5, note: "Written together" },
  { element: "Verse 1 lyrics", points: 7.5, wanjiru: 7.5, malik: 0, note: "Wanjiru" },
  { element: "Verse 2 lyrics", points: 7.5, wanjiru: 0, malik: 7.5, note: "Malik" },
]

function Marker({ n }: { n: number }) {
  return (
    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-nairobi text-xs font-medium text-white">
      {n}
    </span>
  )
}

/** A stylised signed split sheet with numbered markers that match the callouts. */
export function SignedSheetMock() {
  return (
    <div className="rounded-2xl bg-white p-6 text-ink shadow-2xl shadow-black/20 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/10 pb-5">
        <div>
          <p className="text-xs font-medium tracking-wide text-black/50">SPLIT SHEET</p>
          <p className="mt-1 text-2xl font-medium tracking-[-0.03em]">Amani Ni Sisi</p>
          <p className="text-sm text-black/55">Peace Is Us · 92 BPM · A minor</p>
        </div>
        <span className="rounded-full bg-[oklch(0.94_0.05_155)] px-3 py-1 text-xs font-medium text-truth-ink">
          Signed By Both Writers
        </span>
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-2">
          <Marker n={1} />
          <p className="text-sm font-medium">Composition</p>
        </div>
        <SplitBar wanjiru={39.7} className="mt-3 h-3" />
        <div className="tabular mt-2 flex justify-between text-sm">
          <span>
            <span className="font-medium">Wanjiru Kamau</span> <span className="text-black/50">Nairobi</span> 39.7%
          </span>
          <span>
            60.3% <span className="text-black/50">Harlem</span> <span className="font-medium">Malik Johnson</span>
          </span>
        </div>
        <table className="tabular mt-4 w-full text-[0.82rem]">
          <thead>
            <tr className="text-left text-black/45">
              <th className="py-1 font-normal">Element</th>
              <th className="py-1 text-right font-normal">Points</th>
              <th className="py-1 text-right font-normal">{WRITER_NAME.wanjiru}</th>
              <th className="py-1 text-right font-normal">{WRITER_NAME.malik}</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.element} className="border-t border-black/5">
                <td className="py-1.5">
                  {r.element}
                  <span className="hidden text-black/45 sm:inline"> · {r.note}</span>
                </td>
                <td className="py-1.5 text-right text-black/60">{r.points}</td>
                <td className="py-1.5 text-right">{r.wanjiru || "0"}</td>
                <td className="py-1.5 text-right">{r.malik || "0"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-black/50">
          People share the 85 human-authored points, scaled to 100.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-black/[0.03] p-4">
          <div className="flex items-center gap-2">
            <Marker n={2} />
            <p className="text-sm font-medium">Master</p>
          </div>
          <p className="tabular mt-2 text-sm">Wanjiru 50% · Malik 50%</p>
          <p className="mt-1 text-xs text-black/50">From their 2025 &ldquo;Jua&rdquo; agreement</p>
        </div>
        <div className="rounded-xl bg-black/[0.03] p-4">
          <div className="flex items-center gap-2">
            <Marker n={3} />
            <p className="text-sm font-medium">AI Disclosure</p>
          </div>
          <ul className="mt-2 space-y-1 text-xs leading-snug text-black/70">
            <li>Drum groove generated by an AI music tool; 15 points owned by no one</li>
            <li>AI mastering on the final mix, assistive only</li>
            <li>AI guide vocal of Wanjiru, with her consent, demo only</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 border-t border-black/10 pt-5">
        <div className="flex items-center gap-2">
          <Marker n={4} />
          <p className="text-sm font-medium">On The Record</p>
        </div>
        <dl className="mt-3 grid gap-x-6 gap-y-1.5 text-xs sm:grid-cols-2">
          {[
            ["Signed", "Wanjiru Kamau, Malik Johnson"],
            ["Rule pack", "split-v1 on Omega v0.1.20"],
            ["Agreement ID", "Proof hash, equal on both agents"],
            ["Record ID", "SHA-256 of the signed sheet"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3 border-b border-black/5 py-1">
              <dt className="text-black/50">{k}</dt>
              <dd className="text-right font-mono">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

export const SHEET_CALLOUTS = [
  {
    title: "Composition, Explained",
    body: "Each writer's share of the song, built element by element. Every line links to the evidence and the rule that decided it, in English and Swahili.",
  },
  {
    title: "Master, Tracked Apart",
    body: "The recording has its own split under its own policy. In the demo, both writers paid for their own sessions, so their earlier agreement sets it at 50/50.",
  },
  {
    title: "AI Use, Disclosed",
    body: "Every AI tool that touched the song is listed with what it did. Generated parts are owned by no one, and a voice model needs the writer's recorded consent.",
  },
  {
    title: "A Record Platforms Can Check",
    body: "Both signatures, the rule version, the agreement ID and the stem fingerprints are hashed into one record ID. The stems themselves stay in your vault.",
  },
]
