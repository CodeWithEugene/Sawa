import type { AgentId, Lang, Song, TV, Writer } from "./types"

export const WRITER_AGENT: Record<Writer, AgentId> = {
  wanjiru: "nairobi",
  malik: "harlem",
}
export const AGENT_WRITER: Record<AgentId, Writer> = {
  nairobi: "wanjiru",
  harlem: "malik",
}
export const FIRST: Record<Writer, string> = {
  wanjiru: "Wanjiru",
  malik: "Malik",
}
export const CITY: Record<AgentId, string> = {
  nairobi: "Nairobi",
  harlem: "Harlem",
}

export function fmtTV(tv: TV): string {
  return `(stv ${tv[0].toFixed(2)} ${tv[1].toFixed(2)})`
}

export function pct(n: number | null | undefined): string {
  if (n === null || n === undefined) return "?"
  return Number.isInteger(n) ? `${n}` : n.toFixed(1)
}

export function shortHash(h: string, n = 6): string {
  return `${h.slice(0, n)}…${h.slice(-4)}`
}

export function elementName(song: Song | null, id: string, lang: Lang): string {
  const el = song?.elements.find((e) => e.id === id)
  return el ? el[lang] : id
}

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Nairobi",
  weekday: "short",
  day: "numeric",
  month: "short",
})
const timeFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Nairobi",
  hour: "2-digit",
  minute: "2-digit",
})
const nyFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour: "numeric",
  minute: "2-digit",
})

export function fmtDay(unix: number): string {
  return dateFmt.format(new Date(unix * 1000))
}

export function fmtTime(unix: number): string {
  return `${timeFmt.format(new Date(unix * 1000))} EAT`
}

export function fmtNY(unix: number): string {
  return `${nyFmt.format(new Date(unix * 1000))} in Harlem`
}

export function roleWord(role: string, lang: Lang): string {
  const words: Record<string, Record<Lang, string>> = {
    originated: { en: "started", sw: "alianzisha" },
    developed: { en: "developed", sw: "aliendeleza" },
  }
  return words[role]?.[lang] ?? role
}

export function claimWord(letter: string, lang: Lang): string {
  if (letter === "o") return lang === "en" ? "started it" : "aliianzisha"
  if (letter === "d") return lang === "en" ? "developed it" : "aliiendeleza"
  return lang === "en" ? "no part" : "hakuna sehemu"
}

/** "Wanjiru started it", "Both wrote it together", "Wanjiru started it, Malik developed it". */
export function accountText(
  claimed: Record<string, string>,
  lang: Lang
): string {
  const ws = (["wanjiru", "malik"] as const).filter((w) => claimed[w] !== "-")
  if (ws.length === 2 && claimed.wanjiru === "o" && claimed.malik === "o") {
    return lang === "en" ? "both wrote it together" : "waliiandika pamoja"
  }
  return ws.map((w) => `${FIRST[w]} ${claimWord(claimed[w], lang)}`).join(", ")
}
