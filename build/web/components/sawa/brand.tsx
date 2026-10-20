import { cn } from "@/lib/utils"

/**
 * The Sawa mark: two rings, Nairobi and Harlem. Where they overlap is filled
 * solid: the one truth both agents reach.
 */
export function SawaMark({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 48 32"
      width={(size * 48) / 32}
      height={size}
      className={className}
      role="img"
      aria-label="Sawa"
    >
      <defs>
        <clipPath id="sawa-left">
          <circle cx="17" cy="16" r="12.5" />
        </clipPath>
      </defs>
      <circle cx="17" cy="16" r="12.5" fill="none" stroke="var(--nairobi)" strokeWidth="3.4" />
      <circle cx="31" cy="16" r="12.5" fill="none" stroke="var(--harlem)" strokeWidth="3.4" />
      <circle cx="31" cy="16" r="10.8" fill="var(--ink)" clipPath="url(#sawa-left)" />
    </svg>
  )
}

export function SawaLogo({ className, size = 30 }: { className?: string; size?: number }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <SawaMark size={size} />
      <span
        className="font-display-wonk leading-none tracking-tight text-foreground"
        style={{ fontSize: size * 0.95, fontWeight: 560 }}
      >
        sawa
      </span>
    </span>
  )
}

/** A city chip: colour, name and the writer it belongs to. */
export function CityDot({ agent, className }: { agent: "harlem" | "nairobi"; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-2.5 rounded-full ring-2 ring-background",
        agent === "nairobi" ? "bg-nairobi" : "bg-harlem",
        className
      )}
    />
  )
}
