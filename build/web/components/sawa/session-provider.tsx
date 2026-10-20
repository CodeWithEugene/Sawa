"use client"

import * as React from "react"

import { api } from "@/lib/api"
import type { Lang, SessionEvent, SessionState, Song, Writer } from "@/lib/types"

const STORE_KEY = "sawa:session:v1"
const LANG_KEY = "sawa:lang"

interface SessionContextValue {
  song: Song | null
  state: SessionState | null
  events: SessionEvent[]
  busy: string | null
  error: string | null
  lang: Lang
  setLang: (lang: Lang) => void
  exchange: () => Promise<void>
  reconcile: () => Promise<void>
  contest: (record: string, by: Writer, reason: string) => Promise<void>
  withdrawContest: (record: string) => Promise<void>
  sign: (writer: Writer, name: string) => Promise<void>
  setPack: (agent: "harlem" | "nairobi", version: "split-v1" | "split-v0") => Promise<void>
  reset: () => Promise<void>
}

const SessionContext = React.createContext<SessionContextValue | null>(null)

function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeStored(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage blocked: the session still works for this page view
  }
}

// Minimum time the "agents are reasoning" state stays visible, so the
// reconcile moment reads clearly on screen even when results are cached.
const MIN_REASONING_MS = 1400

export function SessionProvider({ songId, children }: { songId: string; children: React.ReactNode }) {
  const [song, setSong] = React.useState<Song | null>(null)
  const [state, setState] = React.useState<SessionState | null>(null)
  const [events, setEvents] = React.useState<SessionEvent[]>([])
  const [busy, setBusy] = React.useState<string | null>("load")
  const [error, setError] = React.useState<string | null>(null)
  const [lang, setLangState] = React.useState<Lang>("en")

  const run = React.useCallback(
    async (next: SessionEvent[], label: string, minMs = 0) => {
      setBusy(label)
      setError(null)
      const started = Date.now()
      try {
        const result = await api.run(songId, next)
        const wait = minMs - (Date.now() - started)
        if (wait > 0) await new Promise((r) => setTimeout(r, wait))
        setEvents(next)
        setState(result)
        writeStored(STORE_KEY, { songId, events: next })
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong")
      } finally {
        setBusy(null)
      }
    },
    [songId]
  )

  React.useEffect(() => {
    const storedLang = readStored<Lang>(LANG_KEY, "en")
    const stored = readStored<{ songId: string; events: SessionEvent[] } | null>(STORE_KEY, null)
    const initial = stored && stored.songId === songId ? stored.events : []
    api
      .song(songId)
      .then((s) => {
        setSong(s)
        setLangState(storedLang)
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Could not load the song"))
    api
      .run(songId, initial)
      .then((result) => {
        setEvents(initial)
        setState(result)
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "The agents could not be reached"))
      .finally(() => setBusy(null))
  }, [songId])

  const value: SessionContextValue = {
    song,
    state,
    events,
    busy,
    error,
    lang,
    setLang: (l) => {
      setLangState(l)
      writeStored(LANG_KEY, l)
    },
    exchange: () => run([...events, { type: "exchange" }], "exchange", 900),
    reconcile: () => run([...events, { type: "reconcile" }], "reconcile", MIN_REASONING_MS),
    contest: (record, by, reason) =>
      run([...events, { type: "contest", record, by, reason }], "contest", MIN_REASONING_MS),
    withdrawContest: (record) => run([...events, { type: "withdraw-contest", record }], "contest", 600),
    sign: (writer, name) =>
      run([...events, { type: "sign", writer, name, at: new Date().toISOString() }], `sign-${writer}`, 500),
    setPack: (agent, version) => run([...events, { type: "pack", agent, version }], "pack"),
    reset: () => run([], "reset"),
  }

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession(): SessionContextValue {
  const ctx = React.useContext(SessionContext)
  if (!ctx) throw new Error("useSession must be used inside SessionProvider")
  return ctx
}
