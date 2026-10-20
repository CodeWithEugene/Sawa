"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Layered ridges, back to front: base height (0..1 of the canvas), sine
// amplitudes, spatial frequencies (cycles per 1000px), phases, and the
// darkness at the crest and deep below it.
const LAYERS = [
  { base: 0.3, amps: [0.06, 0.025], freqs: [1.1, 2.9], phases: [0.4, 1.7], d0: 0.06, d1: 0.34 },
  { base: 0.43, amps: [0.05, 0.028], freqs: [1.5, 3.6], phases: [2.0, 0.3], d0: 0.16, d1: 0.55 },
  { base: 0.57, amps: [0.055, 0.022], freqs: [0.9, 3.1], phases: [3.3, 1.1], d0: 0.3, d1: 0.8 },
  { base: 0.74, amps: [0.04, 0.022], freqs: [1.2, 4.2], phases: [0.9, 2.4], d0: 0.55, d1: 1.0 },
]

const CELL = 5 // px between dots
const SPEED = 22 // px per second, drifting right
const HOVER_R = 120 // px, hover influence radius

function hash(x: number, y: number): number {
  let h = (x * 374761393 + y * 668265263) | 0
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295
}

function ridgeY(layer: (typeof LAYERS)[number], x: number, height: number, t: number): number {
  let y = layer.base
  for (let i = 0; i < layer.amps.length; i++) {
    const f = (layer.freqs[i] / 1000) * 2 * Math.PI
    // a gentle swell on top of the drift, so it reads as a wave
    const swell = 1 + 0.12 * Math.sin(t * 0.35 + i * 1.7 + layer.phases[i])
    y += layer.amps[i] * swell * Math.sin(f * x + layer.phases[i])
  }
  return y * height
}

export function HalftoneDunes({ className }: { className?: string }) {
  const ref = React.useRef<HTMLCanvasElement>(null)
  const mouse = React.useRef({ x: -9999, y: -9999, tx: -9999, ty: -9999, k: 0, tk: 0 })

  React.useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const styles = getComputedStyle(document.documentElement)
    const paper = styles.getPropertyValue("--paper").trim() || "#f4f4f2"
    const ink = "#131315"
    const accent = "#f07a2b"
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0
    let visible = true
    const start = performance.now()

    function resize() {
      if (!canvas || !ctx) return
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw(now: number) {
      if (!ctx) return
      const t = reduce ? 0 : (now - start) / 1000
      const offset = t * SPEED // terrain moves right
      const m = mouse.current
      m.x += (m.tx - m.x) * 0.18
      m.y += (m.ty - m.y) * 0.18
      m.k += (m.tk - m.k) * 0.08

      ctx.clearRect(0, 0, width, height)
      const cols = Math.ceil(width / CELL) + 2
      const rows = Math.ceil(height / CELL) + 1

      // ridge heights for this frame
      const ridges = LAYERS.map((layer) => {
        const arr = new Float32Array(cols)
        for (let c = 0; c < cols; c++) arr[c] = ridgeY(layer, c * CELL - offset, height, t)
        return arr
      })

      // solid canvas below the first ridge hides whatever sits behind the hills
      ctx.fillStyle = paper
      ctx.beginPath()
      ctx.moveTo(0, height)
      for (let c = 0; c < cols; c++) ctx.lineTo(c * CELL, ridges[0][c])
      ctx.lineTo(width, height)
      ctx.closePath()
      ctx.fill()

      const inkPath = new Path2D()
      const hotPath = new Path2D()
      const shift = offset / CELL
      const shiftCol = Math.floor(shift)
      const frac = (shift - shiftCol) * CELL

      for (let r = 0; r < rows; r++) {
        const y = r * CELL
        const stagger = r % 2 ? CELL / 2 : 0
        for (let c = -1; c < cols; c++) {
          const x = c * CELL + stagger + frac
          const ci = Math.min(cols - 1, Math.max(0, c))
          let d = 0
          for (let l = 0; l < LAYERS.length; l++) {
            const top = ridges[l][ci]
            if (y >= top) {
              const depth = Math.pow(Math.min(1, (y - top) / (0.26 * height)), 0.8)
              const v = LAYERS[l].d0 + (LAYERS[l].d1 - LAYERS[l].d0) * depth
              d = Math.max(d * 0.2, v)
            }
          }
          const bottom = Math.min(1, Math.max(0, (y / height - 0.86) / 0.14))
          d = Math.max(d, bottom)
          if (d < 0.04) continue
          // grain that travels with the terrain
          d = Math.min(1, Math.max(0, d + (hash(c - shiftCol, r) - 0.5) * 0.08))

          let px = x
          let py = y
          let rad = CELL * 0.56 * Math.sqrt(d)
          let hot = false
          if (m.k > 0.01) {
            const dx = x - m.x
            const dy = y - m.y
            const dist = Math.hypot(dx, dy)
            if (dist < HOVER_R) {
              // sound-wave ripples expanding from the cursor
              const q = dist / HOVER_R
              const p1 = (t * 0.75) % 1
              const p2 = (p1 + 0.5) % 1
              const ring = (p: number) => Math.exp(-((q - p) ** 2) / 0.006)
              const wave = Math.max(ring(p1), ring(p2)) * (1 - q * 0.7) * m.k
              px += (dx / (dist || 1)) * wave * 5
              py += (dy / (dist || 1)) * wave * 5
              rad = Math.min(CELL * 0.62, rad * (1 + wave * 0.7) + wave * 0.6)
              hot = wave > 0.45
            }
          }
          const path = hot ? hotPath : inkPath
          path.moveTo(px + rad, py)
          path.arc(px, py, rad, 0, Math.PI * 2)
        }
      }
      ctx.fillStyle = ink
      ctx.fill(inkPath)
      ctx.fillStyle = accent
      ctx.fill(hotPath)

      if (!reduce && visible) raf = requestAnimationFrame(draw)
    }

    resize()
    const ro = new ResizeObserver(() => {
      resize()
      if (reduce) draw(performance.now())
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(raf)
      if (visible || reduce) raf = requestAnimationFrame(draw)
    })
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  function onMove(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const m = mouse.current
    m.tx = e.clientX - rect.left
    m.ty = e.clientY - rect.top
    if (m.tk === 0) {
      m.x = m.tx
      m.y = m.ty
    }
    m.tk = 1
  }

  function onLeave() {
    mouse.current.tk = 0
  }

  return (
    <canvas
      ref={ref}
      aria-hidden
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("block size-full", className)}
    />
  )
}
