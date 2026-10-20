import Link from "next/link"

import { SawaLogo } from "./brand"
import { cn } from "@/lib/utils"

const NAV = [
  { href: "/#how", label: "How It Works" },
  { href: "/#artists", label: "For Artists" },
  { href: "/#ai", label: "AI Music" },
  { href: "/#omega", label: "Technology" },
]

export function SiteHeader({
  children,
  className,
  nav = false,
}: {
  children?: React.ReactNode
  className?: string
  nav?: boolean
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-background/80 backdrop-blur-lg",
        className
      )}
    >
      <div className="mx-auto flex h-14 w-full items-center gap-8 px-6 md:px-10 lg:px-16 2xl:px-24">
        <Link
          href="/"
          className="rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
          aria-label="Sawa home"
        >
          <SawaLogo size={26} />
        </Link>
        {nav && (
          <nav
            aria-label="Main"
            className="hidden flex-1 justify-center gap-10 md:flex"
          >
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-[0.95rem] text-foreground/80 transition-colors hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
        )}
        <div
          className={cn(
            "flex items-center justify-end gap-3",
            !nav && "flex-1"
          )}
        >
          {children}
        </div>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer data-nav="dark" className="bg-ink text-white/60">
      <div className="flex w-full flex-col gap-4 px-6 py-10 text-sm md:flex-row md:items-center md:justify-between md:px-10 lg:px-16 2xl:px-24">
        <p>
          Built on SingularityNET Omega. All people, songs and files in the demo
          are fictional.
        </p>
        <p>State of the Art Hackathon 2026 · Team Technetians</p>
      </div>
    </footer>
  )
}
