"use client"

import { cn } from "@/lib/utils"

type Props = {
  wanjiru: number | null
  malik: number | null
  spinning?: boolean
  size?: number
  state?: "draft" | "truth" | "split"
  label?: string
  className?: string
}

const R = 40.5
const C = 2 * Math.PI * R

/**
 * A split as a record: a vinyl disc whose two-colour ring is the split.
 * Nairobi (Wanjiru) in terracotta, Harlem (Malik) in indigo. The ring
 * animates when the split changes: "splits you can watch".
 */
export function Vinyl({
  wanjiru,
  malik,
  spinning,
  size = 220,
  state = "draft",
  label,
  className,
}: Props) {
  const w = wanjiru ?? 0
  const known = wanjiru !== null && malik !== null
  const wLen = (w / 100) * C
  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={
        known
          ? `Wanjiru ${w} percent, Malik ${malik} percent`
          : "Split not settled"
      }
    >
      {state === "truth" && (
        <span
          className="animate-pulse-ring absolute inset-[6%] rounded-full"
          aria-hidden
        />
      )}
      <svg
        viewBox="0 0 100 100"
        className={cn(
          "size-full drop-shadow-[0_14px_22px_oklch(0.2_0.02_60/0.28)]",
          spinning && "animate-spin-slow"
        )}
      >
        <defs>
          <radialGradient id="vinyl-sheen" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="oklch(0.38 0.01 60)" />
            <stop offset="55%" stopColor="oklch(0.17 0.01 60)" />
            <stop offset="100%" stopColor="oklch(0.12 0.01 60)" />
          </radialGradient>
          <pattern
            id="vinyl-grooves"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            {Array.from({ length: 14 }, (_, i) => (
              <circle
                key={i}
                cx="50"
                cy="50"
                r={23 + i * 1.5}
                fill="none"
                stroke="oklch(1 0 0 / 0.06)"
                strokeWidth="0.35"
              />
            ))}
          </pattern>
        </defs>
        <circle cx="50" cy="50" r="49" fill="url(#vinyl-sheen)" />
        <circle cx="50" cy="50" r="49" fill="url(#vinyl-grooves)" />
        {/* the split ring */}
        <g transform="rotate(-90 50 50)">
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke={known ? "var(--harlem)" : "oklch(0.4 0.01 60)"}
            strokeWidth="7"
          />
          {known && (
            <circle
              cx="50"
              cy="50"
              r={R}
              fill="none"
              stroke="var(--nairobi)"
              strokeWidth="7"
              strokeDasharray={`${wLen} ${C}`}
              style={{
                transition: "stroke-dasharray 1.4s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          )}
        </g>
        <circle
          cx="50"
          cy="50"
          r={R + 3.9}
          fill="none"
          stroke="oklch(1 0 0 / 0.12)"
          strokeWidth="0.4"
        />
        <circle
          cx="50"
          cy="50"
          r={R - 3.9}
          fill="none"
          stroke="oklch(0 0 0 / 0.35)"
          strokeWidth="0.4"
        />
        {/* label */}
        <circle
          cx="50"
          cy="50"
          r="22"
          fill={state === "truth" ? "var(--truth-soft)" : "var(--paper)"}
          style={{ transition: "fill 0.8s" }}
        />
        <circle
          cx="50"
          cy="50"
          r="22"
          fill="none"
          stroke="oklch(0 0 0 / 0.08)"
          strokeWidth="0.6"
        />
        <circle
          cx="50"
          cy="50"
          r="19.6"
          fill="none"
          stroke="oklch(0 0 0 / 0.06)"
          strokeWidth="0.3"
          strokeDasharray="0.6 0.9"
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        {label && (
          <span
            className="eyebrow mb-1 leading-none"
            style={{
              fontSize: Math.max(8, size * 0.036),
              letterSpacing: "0.12em",
            }}
          >
            {label}
          </span>
        )}
        <span
          className="tabular font-display leading-none text-foreground"
          style={{ fontSize: size * 0.1, fontWeight: 620 }}
        >
          {known ? (
            <>
              <span className="text-nairobi-ink">{Math.round(w)}</span>
              <span className="mx-[0.12em] text-muted-foreground">/</span>
              <span className="text-harlem-ink">{Math.round(malik ?? 0)}</span>
            </>
          ) : (
            <span className="text-muted-foreground">?</span>
          )}
        </span>
      </div>
    </div>
  )
}
