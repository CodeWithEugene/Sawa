import type { JevReading, SessionEvent, SessionState, Song } from "./types"

async function call<T>(
  path: string,
  init?: RequestInit,
  retries = 1
): Promise<T> {
  let res: Response
  try {
    res = await fetch(path, {
      ...init,
      headers: { "content-type": "application/json", ...(init?.headers ?? {}) },
      cache: "no-store",
    })
  } catch (e) {
    // a dropped connection on a slow network: try once more
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, 800))
      return call<T>(path, init, retries - 1)
    }
    throw e
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Request failed (${res.status}) ${text.slice(0, 160)}`)
  }
  return (await res.json()) as T
}

export const api = {
  song: (id: string) => call<Song>(`/api/songs/${id}`),
  run: (songId: string, events: SessionEvent[]) =>
    call<SessionState>("/api/session/run", {
      method: "POST",
      body: JSON.stringify({ song_id: songId, events }),
    }),
  jev: (record: string) =>
    call<JevReading>("/api/jev/read", {
      method: "POST",
      body: JSON.stringify({ record }),
    }),
  health: () =>
    call<{
      ok: boolean
      omega: string
      hyperon: string
      lib_nal_sha256: string
      jev: boolean
    }>("/api/health"),
}
