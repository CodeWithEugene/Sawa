"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { SawaMark } from "./brand"
import { cn } from "@/lib/utils"

type Tone = "light" | "dark" | "orange"

export const NAV = [
  { href: "/product", label: "Product" },
  { href: "/artists", label: "For Artists" },
  { href: "/platforms", label: "For Platforms" },
  { href: "/developers", label: "Developers" },
  { href: "/technology", label: "Technology" },
]

// On the home page, the section in view lights up the matching page link.
const HOME_SECTIONS: Record<string, string> = {
  artists: "/artists",
  how: "/product",
  ai: "/product",
  omega: "/technology",
}

export const DEMO_HREF = "/session/amani-ni-sisi"
const HEIGHT = 56

/**
 * Sticky site navbar. Its colour follows whatever sits just below it (any
 * element marked data-nav="light|dark|orange"; the deepest match wins), and
 * the current page (or, on the home page, the section in view) is bold.
 */
export function SiteNav() {
  const pathname = usePathname()
  const [tone, setTone] = React.useState<Tone>("light")
  const [section, setSection] = React.useState<string | null>(null)

  React.useEffect(() => {
    let frame = 0
    function update() {
      frame = 0
      const probe = HEIGHT + 2
      let next: Tone = "light"
      document.querySelectorAll<HTMLElement>("[data-nav]").forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top <= probe && r.bottom > probe) next = el.dataset.nav as Tone
      })
      setTone(next)
      const line = HEIGHT + window.innerHeight * 0.3
      let current: string | null = null
      for (const id of Object.keys(HOME_SECTIONS)) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= line && r.bottom > line) current = id
      }
      setSection(current)
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [pathname])

  const activeHref = pathname === "/" ? (section ? HOME_SECTIONS[section] : null) : pathname
  const onColor = tone !== "light"

  return (
    <header
      className={cn(
        "sticky top-0 z-40 backdrop-blur-lg transition-colors duration-300",
        tone === "light" && "bg-background/80 text-foreground",
        tone === "dark" && "bg-ink/85 text-white",
        tone === "orange" && "bg-nairobi/90 text-white"
      )}
      style={{ height: HEIGHT }}
    >
      <div className="flex h-full w-full items-center gap-8 px-6 md:px-10 lg:px-16 2xl:px-24">
        <Link
          href="/"
          aria-label="Sawa home"
          className="inline-flex items-center gap-2 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
        >
          <SawaMark size={22} tone={tone} />
          <span className="text-[1.25rem] leading-none font-semibold tracking-[-0.04em]">sawa</span>
        </Link>
        <nav aria-label="Main" className="hidden flex-1 justify-center gap-8 lg:flex">
          {NAV.map((n) => {
            const active = activeHref === n.href
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-[0.92rem] transition-[color,font-weight] duration-200",
                  active ? "font-semibold" : "font-normal",
                  onColor
                    ? active
                      ? "text-white"
                      : "text-white/75 hover:text-white"
                    : active
                      ? "text-foreground"
                      : "text-foreground/70 hover:text-foreground"
                )}
              >
                {n.label}
              </Link>
            )
          })}
        </nav>
        <div className="ml-auto lg:ml-0">
          <Link
            href={DEMO_HREF}
            className={cn(
              "inline-flex h-9 items-center rounded-lg px-4 text-[0.92rem] font-medium text-white shadow-xs transition-colors duration-300",
              tone === "orange" ? "bg-ink hover:bg-ink/85" : "bg-nairobi hover:bg-nairobi/90"
            )}
          >
            Try The Demo
          </Link>
        </div>
      </div>
    </header>
  )
}

/** Backwards-compatible name used by the home page. */
export function LandingNav(props: { demoHref?: string }) {
  void props
  return <SiteNav />
}
