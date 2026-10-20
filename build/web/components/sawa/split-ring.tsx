"use client"

import { cn } from "@/lib/utils"

type Props = {
  wanjiru: number | null
  malik: number | null
  size?: number
  agreed?: boolean
  busy?: boolean
  caption?: string
  className?: string
}

const R = 44
const C = 2 * Math.PI * R
const GAP = 1.2 // small gap between the two arcs, in percent

/** A split as a clean ring: orange for Wanjiru, indigo for Malik. */
export function SplitRing({ wanjiru, malik, size = 200, agreed, busy, caption, className }: Props) {
  const known = wanjiru !== null && malik !== null
  const w = known ? wanjiru : 0
  const m = known ? (malik ?? 0) : 0
  const wLen = Math.max(0, ((w - GAP) / 100) * C)
  const mLen = Math.max(0, ((m - GAP) / 100) * C)
  const transition = "stroke-dasharray 1.2s cubic-bezier(0.22,1,0.36,1), stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)"

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={known ? `Wanjiru ${w} percent, Malik ${m} percent` : "Split not settled yet"}
    >
      <svg viewBox="0 0 100 100" className={cn("size-full -rotate-90", busy && "animate-pulse")}>
        <circle cx="50" cy="50" r={R} fill="none" stroke="var(--muted)" strokeWidth="6" />
        {known && (
          <>
            <circle
              cx="50"
              cy="50"
              r={R}
              fill="none"
              stroke="var(--nairobi)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${wLen} ${C}`}
              style={{ transition }}
            />
            <circle
              cx="50"
              cy="50"
              r={R}
              fill="none"
              stroke="var(--harlem)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${mLen} ${C}`}
              strokeDashoffset={-(w / 100) * C}
              style={{ transition }}
            />
          </>
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="tabular leading-none font-medium tracking-[-0.04em]" style={{ fontSize: size * 0.16 }}>
          {known ? (
            <>
              <span className="text-nairobi-ink">{Math.round(w * 10) / 10}</span>
              <span className="mx-[0.1em] text-muted-foreground/60">/</span>
              <span className="text-harlem-ink">{Math.round(m * 10) / 10}</span>
            </>
          ) : (
            <span className="text-muted-foreground">?</span>
          )}
        </p>
        {caption && (
          <p
            className={cn("mt-2 font-medium", agreed ? "text-truth-ink" : "text-muted-foreground")}
            style={{ fontSize: Math.max(11, size * 0.06) }}
          >
            {caption}
          </p>
        )}
      </div>
    </div>
  )
}
