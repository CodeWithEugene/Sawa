import Link from "next/link"

import { SawaLogo } from "./brand"
import { cn } from "@/lib/utils"

export function SiteHeader({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <header className={cn("sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md", className)}>
      <div className="mx-auto flex h-16 max-w-[1320px] items-center gap-6 px-5 md:px-8">
        <Link href="/" className="rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/40" aria-label="Sawa home">
          <SawaLogo size={26} />
        </Link>
        <div className="flex flex-1 items-center justify-end gap-3">{children}</div>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-3 px-5 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          Built on SingularityNET <span className="font-medium text-foreground">Omega</span> (lib_nal.metta v0.1.20, unmodified) and MeTTa on Hyperon. Synthetic data only.
        </p>
        <p className="font-mono text-xs tracking-wide">
          State of the Art Hackathon 2026 · Team Technetians
        </p>
      </div>
    </footer>
  )
}
