"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Halftone hills drawn on the GPU. Every pixel finds its dot on a staggered
// grid, works out how dark the landscape is there, and draws an
// anti-aliased dot. The hills breathe gently in place; dots near the cursor
// warm to orange and cool off as it moves on.

const TRAIL = 24 // remembered cursor points
const TRAIL_MS = 900 // how long a dot stays warm

const VERT = `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uDpr;
uniform float uTime;
uniform vec3 uTrail[${TRAIL}];
uniform vec3 uPaper;
uniform vec3 uInk;
uniform vec3 uHot;

const float CELL = 5.0;
const float HOVER_R = 56.0;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float wave(float x, float amp, float freq, float ph, float i, float li) {
  float f = freq / 1000.0 * 6.2831853;
  float breathe = 1.0 + 0.18 * sin(uTime * 0.5 + i * 2.1 + ph + li);
  return amp * breathe * sin(f * x + ph);
}

float ridge(float li, float x, float H) {
  float y;
  if (li < 0.5) {
    y = 0.30 + wave(x, 0.060, 1.1, 0.4, 0.0, li) + wave(x, 0.025, 2.9, 1.7, 1.0, li);
  } else if (li < 1.5) {
    y = 0.43 + wave(x, 0.050, 1.5, 2.0, 0.0, li) + wave(x, 0.028, 3.6, 0.3, 1.0, li);
  } else if (li < 2.5) {
    y = 0.57 + wave(x, 0.055, 0.9, 3.3, 0.0, li) + wave(x, 0.022, 3.1, 1.1, 1.0, li);
  } else {
    y = 0.74 + wave(x, 0.040, 1.2, 0.9, 0.0, li) + wave(x, 0.022, 4.2, 2.4, 1.0, li);
  }
  y += 0.006 * sin(uTime * 0.45 + li * 1.3);
  return y * H;
}

float darkness(vec2 p, float H) {
  float d = 0.0;
  for (int l = 0; l < 4; l++) {
    float li = float(l);
    float d0 = li < 0.5 ? 0.06 : li < 1.5 ? 0.16 : li < 2.5 ? 0.30 : 0.55;
    float d1 = li < 0.5 ? 0.34 : li < 1.5 ? 0.55 : li < 2.5 ? 0.80 : 1.00;
    float top = ridge(li, p.x, H);
    float w = smoothstep(top - 5.0, top + 5.0, p.y);
    float depth = pow(clamp((p.y - top) / (0.26 * H), 0.0, 1.0), 0.8);
    float v = mix(d0, d1, depth);
    d = mix(d, max(d * 0.2, v), w);
  }
  float bottom = clamp((p.y / H - 0.86) / 0.14, 0.0, 1.0);
  return max(d, bottom);
}

void main() {
  vec2 res = uRes / uDpr;
  float H = res.y;
  vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uDpr;

  // nearest dot on a staggered grid
  float r = floor(p.y / CELL + 0.5);
  float stagger = mod(r, 2.0) * CELL * 0.5;
  float c = floor((p.x - stagger) / CELL + 0.5);
  vec2 center = vec2(c * CELL + stagger, r * CELL);

  float d = darkness(center, H);
  d = clamp(d + (hash(vec2(c, r)) - 0.5) * 0.08, 0.0, 1.0);

  float heat = 0.0;
  for (int i = 0; i < ${TRAIL}; i++) {
    vec3 t = uTrail[i];
    if (t.z < 1.0) {
      float k = 1.0 - smoothstep(0.0, HOVER_R, distance(center, t.xy));
      heat = max(heat, k * (1.0 - t.z) * (1.0 - t.z));
    }
  }

  float base = CELL * 0.5 * sqrt(max(d, 0.0));
  float rad = base + (max(base, CELL * 0.4) - base) * heat;
  float aa = 0.75;
  float dotA = 1.0 - smoothstep(rad - aa, rad + aa, distance(p, center));
  if (rad < 0.12) dotA = 0.0;

  float top0 = ridge(0.0, p.x, H);
  float bgA = smoothstep(top0 - 1.0, top0 + 1.0, p.y);

  vec3 dotC = mix(uInk, uHot, smoothstep(0.05, 0.9, heat));
  vec3 col = dotC * dotA + uPaper * bgA * (1.0 - dotA);
  float alpha = dotA + bgA * (1.0 - dotA);
  gl_FragColor = vec4(col, alpha);
}
`

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "")
  const n = parseInt(h.length === 3 ? h.split("").map((x) => x + x).join("") : h, 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const sh = gl.createShader(type)
  if (!sh) return null
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh)
    return null
  }
  return sh
}

export function HalftoneDunes({ className }: { className?: string }) {
  const ref = React.useRef<HTMLCanvasElement>(null)
  const trail = React.useRef<{ x: number; y: number; t: number }[]>([])
  const [fallback, setFallback] = React.useState(false)

  React.useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false })
    const vs = gl && compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = gl && compile(gl, gl.FRAGMENT_SHADER, FRAG)
    const prog = gl && vs && fs ? gl.createProgram() : null
    if (!gl || !vs || !fs || !prog) {
      requestAnimationFrame(() => setFallback(true))
      return
    }
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      requestAnimationFrame(() => setFallback(true))
      return
    }
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, "a")
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, "uRes")
    const uDpr = gl.getUniformLocation(prog, "uDpr")
    const uTime = gl.getUniformLocation(prog, "uTime")
    const uTrail = gl.getUniformLocation(prog, "uTrail")
    const styles = getComputedStyle(document.documentElement)
    gl.uniform3fv(gl.getUniformLocation(prog, "uPaper"), hexToRgb(styles.getPropertyValue("--paper").trim() || "#f4f4f2"))
    gl.uniform3fv(gl.getUniformLocation(prog, "uInk"), hexToRgb("#131315"))
    gl.uniform3fv(gl.getUniformLocation(prog, "uHot"), hexToRgb("#f07a2b"))
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const start = performance.now()
    const trailData = new Float32Array(TRAIL * 3)
    let raf = 0
    let visible = true

    function resize() {
      if (!canvas || !gl) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uDpr, dpr)
    }

    function frame(now: number) {
      if (!gl) return
      const pts = trail.current
      while (pts.length && now - pts[0].t > TRAIL_MS) pts.shift()
      for (let i = 0; i < TRAIL; i++) {
        const pt = pts[pts.length - 1 - i]
        trailData[i * 3] = pt ? pt.x : -9999
        trailData[i * 3 + 1] = pt ? pt.y : -9999
        trailData[i * 3 + 2] = pt ? (now - pt.t) / TRAIL_MS : 2
      }
      gl.uniform3fv(uTrail, trailData)
      gl.uniform1f(uTime, reduce ? 0 : (now - start) / 1000)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      if (visible) raf = requestAnimationFrame(frame)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(frame)
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
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const now = performance.now()
    const pts = trail.current
    const last = pts[pts.length - 1]
    // fill gaps when the cursor moves fast, so the trail stays continuous
    if (last) {
      const dist = Math.hypot(x - last.x, y - last.y)
      const steps = Math.min(6, Math.floor(dist / 18))
      for (let s = 1; s <= steps; s++) {
        const f = s / (steps + 1)
        pts.push({ x: last.x + (x - last.x) * f, y: last.y + (y - last.y) * f, t: now })
      }
    }
    pts.push({ x, y, t: now })
    if (pts.length > TRAIL) pts.splice(0, pts.length - TRAIL)
  }

  if (fallback) {
    return (
      <div
        aria-hidden
        className={cn("bg-[url('/hero-dunes.png')] bg-[length:100%_100%] bg-bottom", className)}
      />
    )
  }

  return <canvas ref={ref} aria-hidden onPointerMove={onMove} className={cn("block size-full", className)} />
}
