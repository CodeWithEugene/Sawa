"use client"

import * as React from "react"
import Link from "next/link"

import { SawaMark } from "./brand"
import { cn } from "@/lib/utils"

type Tone = "light" | "dark" | "orange"

const NAV = [
  { id: "artists", label: "The Problem" },
  { id: "how", label: "How It Works" },
  { id: "ai", label: "AI Music" },
  { id: "omega", label: "Technology" },
]

const HEIGHT = 56

/**
 * Sticky landing navbar. Its colour follows the section underneath it
 * (any element marked data-nav="light|dark|orange"; the deepest match
 * wins), and the link for the section in view is bold.
 */
export function LandingNav({ demoHref }: { demoHref: string }) {
  const [tone, setTone] = React.useState<Tone>("light")
  const [active, setActive] = React.useState<string | null>(null)

  React.useEffect(() => {
    let frame = 0
    function update() {
      frame = 0
      const probe = HEIGHT + 2 // just below the bar
      let next: Tone = "light"
      document.querySelectorAll<HTMLElement>("[data-nav]").forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top <= probe && r.bottom > probe) next = el.dataset.nav as Tone
      })
      setTone(next)

      const line = HEIGHT + window.innerHeight * 0.3
      let current: string | null = null
      for (const { id } of NAV) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= line && r.bottom > line) current = id
      }
      setActive(current)
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
  }, [])

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
          <span className="text-[1.25rem] leading-none font-semibold tracking-[-0.04em]">
            sawa
          </span>
        </Link>
        <nav
          aria-label="Main"
          className="hidden flex-1 justify-center gap-9 md:flex"
        >
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={active === n.id ? "location" : undefined}
              className={cn(
                "text-[0.92rem] transition-[color,font-weight] duration-200",
                active === n.id ? "font-semibold" : "font-normal",
                onColor
                  ? active === n.id
                    ? "text-white"
                    : "text-white/75 hover:text-white"
                  : active === n.id
                    ? "text-foreground"
                    : "text-foreground/70 hover:text-foreground"
              )}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto md:ml-0">
          <Link
            href={demoHref}
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
