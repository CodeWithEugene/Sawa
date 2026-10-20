"use client"

import { useState } from "react"
import { Check, Copy, Send } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/* Code block with a copy button                                       */
/* ------------------------------------------------------------------ */

const COPY_RESET_MS = 1600

export function CodeBlock({ code, label, className }: { code: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), COPY_RESET_MS)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-ink text-white/85", className)}>
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="font-mono text-xs text-white/50">{label ?? ""}</span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[0.83rem] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* SDK examples                                                        */
/* ------------------------------------------------------------------ */

export type SdkExample = { id: string; label: string; file: string; code: string }

export function SdkTabs({ examples }: { examples: SdkExample[] }) {
  return (
    <Tabs defaultValue={examples[0]?.id}>
      <TabsList className="mb-3">
        {examples.map((ex) => (
          <TabsTrigger key={ex.id} value={ex.id} className="px-3">
            {ex.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {examples.map((ex) => (
        <TabsContent key={ex.id} value={ex.id}>
          <CodeBlock code={ex.code} label={ex.file} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

/* ------------------------------------------------------------------ */
/* Live console                                                        */
/* ------------------------------------------------------------------ */

type Method = "GET" | "POST"

type Preset = {
  id: string
  label: string
  method: Method
  path: string
  body?: unknown
}

const SONG = "amani-ni-sisi"

const PRESETS: Preset[] = [
  { id: "health", label: "Health", method: "GET", path: "/api/health" },
  { id: "song", label: "Song", method: "GET", path: `/api/songs/${SONG}` },
  { id: "solo", label: "Solo Session", method: "POST", path: "/api/session/run", body: { song_id: SONG, events: [] } },
  {
    id: "reconcile",
    label: "Reconcile",
    method: "POST",
    path: "/api/session/run",
    body: { song_id: SONG, events: [{ type: "exchange" }, { type: "reconcile" }] },
  },
  {
    id: "contest",
    label: "Reconcile And Contest",
    method: "POST",
    path: "/api/session/run",
    body: {
      song_id: SONG,
      events: [
        { type: "exchange" },
        { type: "reconcile" },
        { type: "contest", record: "msg-fire", by: "malik", reason: "I was praising the vibe, not crediting the melody." },
      ],
    },
  },
  {
    id: "sign",
    label: "Sign Both",
    method: "POST",
    path: "/api/session/run",
    body: {
      song_id: SONG,
      events: [
        { type: "exchange" },
        { type: "reconcile" },
        { type: "sign", writer: "wanjiru", name: "Wanjiru Kamau", at: "2026-10-01T10:00:00Z" },
        { type: "sign", writer: "malik", name: "Malik Johnson", at: "2026-10-01T10:05:00Z" },
      ],
    },
  },
]

const REQUEST_TIMEOUT_MS = 60_000

type Outcome =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "done"; status: number; ok: boolean; ms: number; text: string }
  | { kind: "error"; message: string; ms: number }

function pretty(body: unknown): string {
  return body === undefined ? "" : JSON.stringify(body, null, 2)
}

function formatResponse(raw: string): string {
  try {
    return JSON.stringify(JSON.parse(raw) as unknown, null, 2)
  } catch {
    return raw
  }
}

export function DevConsole() {
  const [presetId, setPresetId] = useState(PRESETS[0].id)
  const preset = PRESETS.find((p) => p.id === presetId) ?? PRESETS[0]
  const [body, setBody] = useState(pretty(preset.body))
  const [outcome, setOutcome] = useState<Outcome>({ kind: "idle" })

  function choose(id: string) {
    const next = PRESETS.find((p) => p.id === id) ?? PRESETS[0]
    setPresetId(next.id)
    setBody(pretty(next.body))
    setOutcome({ kind: "idle" })
  }

  async function send() {
    let payload: string | undefined
    if (preset.method === "POST") {
      try {
        payload = JSON.stringify(JSON.parse(body) as unknown)
      } catch {
        setOutcome({ kind: "error", message: "The request body is not valid JSON.", ms: 0 })
        return
      }
    }
    setOutcome({ kind: "loading" })
    const started = performance.now()
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
    try {
      const res = await fetch(preset.path, {
        method: preset.method,
        headers: payload ? { "content-type": "application/json" } : undefined,
        body: payload,
        signal: controller.signal,
      })
      const text = await res.text()
      setOutcome({
        kind: "done",
        status: res.status,
        ok: res.ok,
        ms: Math.round(performance.now() - started),
        text: formatResponse(text),
      })
    } catch (err) {
      const aborted = err instanceof DOMException && err.name === "AbortError"
      setOutcome({
        kind: "error",
        message: aborted
          ? "The request timed out. Try again; a warm instance answers much faster."
          : "The request did not reach the API. Check your connection and try again.",
        ms: Math.round(performance.now() - started),
      })
    } finally {
      window.clearTimeout(timer)
    }
  }

  const loading = outcome.kind === "loading"

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex flex-wrap items-end gap-4 border-b border-border p-5">
        <label className="flex min-w-56 flex-col gap-1.5 text-sm">
          <span className="font-medium">Request</span>
          <select
            value={presetId}
            onChange={(e) => choose(e.target.value)}
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
          >
            {PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
        <div className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-lg bg-muted px-3 font-mono text-sm">
          <span className={cn("font-semibold", preset.method === "GET" ? "text-truth-ink" : "text-nairobi-ink")}>
            {preset.method}
          </span>
          <span className="truncate">{preset.path}</span>
        </div>
        <button
          type="button"
          onClick={send}
          disabled={loading}
          className="inline-flex h-10 items-center gap-2 rounded-[10px] bg-nairobi px-5 text-sm text-white transition-colors hover:bg-nairobi/90 disabled:opacity-60"
        >
          <Send className="size-4" />
          {loading ? "Sending" : "Send Request"}
        </button>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="border-b border-border p-5 lg:border-r lg:border-b-0">
          <p className="mb-2 text-sm font-medium">Body</p>
          {preset.method === "POST" ? (
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              spellCheck={false}
              aria-label="Request body as JSON"
              className="h-[420px] w-full resize-y rounded-xl bg-ink p-4 font-mono text-[0.83rem] leading-relaxed text-white/85 outline-none focus-visible:ring-2 focus-visible:ring-nairobi"
            />
          ) : (
            <p className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">This is a GET request, so it has no body.</p>
          )}
        </div>
        <div className="min-w-0 p-5">
          <div className="mb-2 flex items-center gap-3 text-sm">
            <span className="font-medium">Response</span>
            {outcome.kind === "done" && (
              <>
                <span
                  className={cn(
                    "rounded-md px-2 py-0.5 font-mono text-xs",
                    outcome.ok ? "bg-truth-ink/10 text-truth-ink" : "bg-destructive/10 text-destructive"
                  )}
                >
                  {outcome.status}
                </span>
                <span className="font-mono text-xs text-muted-foreground">{outcome.ms} ms</span>
              </>
            )}
          </div>
          <div aria-live="polite">
            {outcome.kind === "idle" && (
              <p className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">
                Choose a request and press Send Request. The response from the live API appears here.
              </p>
            )}
            {outcome.kind === "loading" && (
              <p className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">
                Waiting for the agents. A fresh reconciliation can take a few seconds.
              </p>
            )}
            {outcome.kind === "error" && (
              <p className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive">{outcome.message}</p>
            )}
            {outcome.kind === "done" && (
              <pre className="max-h-[420px] overflow-auto rounded-xl bg-ink p-4 font-mono text-[0.8rem] leading-relaxed text-white/85">
                <code>{outcome.text}</code>
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
