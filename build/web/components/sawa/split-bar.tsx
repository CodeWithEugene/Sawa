import { cn } from "@/lib/utils"
import { pct } from "@/lib/format"

type Props = {
  wanjiru: number | null
  malik: number | null
  className?: string
  showLabels?: boolean
  thin?: boolean
}

/** One horizontal bar per split. Terracotta for Wanjiru, indigo for Malik. */
export function SplitBar({ wanjiru, malik, className, showLabels = true, thin }: Props) {
  const known = wanjiru !== null && malik !== null
  const w = known ? wanjiru : 50
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative flex overflow-hidden rounded-full bg-muted",
          thin ? "h-1.5" : "h-2.5",
          !known && "bg-[repeating-linear-gradient(45deg,var(--muted)_0_6px,var(--rule)_6px_8px)]"
        )}
      >
        {known && (
          <>
            <div
              className="h-full bg-nairobi transition-[width] duration-1000 ease-[var(--ease-sawa)]"
              style={{ width: `${w}%` }}
            />
            <div className="h-full flex-1 bg-harlem" />
          </>
        )}
      </div>
      {showLabels && (
        <div className="mt-1.5 flex justify-between font-mono text-[0.72rem] tabular text-muted-foreground">
          <span className="text-nairobi-ink">Wanjiru {pct(wanjiru)}</span>
          <span className="text-harlem-ink">Malik {pct(malik)}</span>
        </div>
      )}
    </div>
  )
}
