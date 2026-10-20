export type Writer = "wanjiru" | "malik"
export type AgentId = "harlem" | "nairobi"
export type Lang = "en" | "sw"
export type Band = "settled" | "needs-confirmation" | "unsupported"
export type Phase = "solo" | "exchanged" | "reconciled"
export type TV = [number, number]

export type SessionEvent =
  | { type: "exchange" }
  | { type: "reconcile" }
  | { type: "contest"; record: string; by: Writer; reason: string }
  | { type: "withdraw-contest"; record: string }
  | { type: "sign"; writer: Writer; name: string; at: string }
  | { type: "pack"; agent: AgentId; version: "split-v1" | "split-v0" }

export interface Evidence {
  id: string
  record: string
  kind: string
  author: Writer
  claimed_role: string
  pol: "pos" | "neg"
  rule: string
  rule_tv: TV
  tv: TV
}

export interface Statement {
  role: "originated" | "developed" | "generated"
  writer: Writer | "ai"
  tv: TV
  band: Band
  evidence: Evidence[]
  revision: TV[]
}

export interface ElementRow {
  element: string
  right: string
  weight: number
  originators: Writer[]
  developers: Writer[]
  shares: Record<Writer, number | null>
  contributions: Record<Writer, number | null>
  blocked: boolean
  ai_generated?: boolean
  ai_points?: number
  statements: Statement[]
  claimed?: Record<Writer, "o" | "d" | "-">
}

export interface ProofBody {
  kind: "draft" | "reconciliation"
  song: string
  pack: string
  omega?: string
  lib_nal_sha256?: string
  elements: ElementRow[]
  totals: Record<Writer, number | null>
  ai_points?: number
  withdrawn?: {
    id: string
    record: string
    element: string
    role: string
    writer: Writer
    pol: string
    kind: string
  }[]
  contests?: { record: string; by: Writer; reason: string }[]
}

export interface Proof {
  body: ProofBody
  hash: string
}

export interface MemoryEntry {
  type: string
  record?: string
  kind?: string
  author?: Writer
  at?: number | string
  received?: string[]
  by?: Writer
  reason?: string
  writer?: Writer
  name?: string
  agent?: AgentId
  version?: string
}

export interface AgentView {
  agent: AgentId
  owner: Writer
  pack: string
  draft: Proof
  holds: number
  memory: MemoryEntry[]
  result?: Proof
  hash: string
}

export interface Disputed {
  element: string
  harlem: Record<Writer, string>
  nairobi: Record<Writer, string>
}

export interface AiDisclosure {
  record: string
  tool: string
  element: string | null
  used_by: Writer
  use: "generated" | "assistive" | "voice-model"
  detail: string
  voice_of?: Writer
  consent?: string | null
}

export interface Explanation {
  elements: Record<string, Record<Lang, string>>
  evidence: Record<string, Record<Lang, string>>
  rules: Record<string, Record<Lang, string>>
  bands: Record<Band, Record<Lang, string>>
  element_names: Record<string, Record<Lang, string>>
}

export interface SignedRecord {
  body: {
    song: string
    title: string
    composition: Record<Writer, number>
    master: Record<Writer, number>
    policy: string
    pack: string
    omega: string
    proof_hash: string
    stems: { file: string; hash: string }[]
    ai_points?: number
    ai_disclosure?: AiDisclosure[]
    writers: Record<Writer, { name: string; city: string; role: string }>
    signatures: Record<Writer, { name: string; at: string }>
  }
  sha256: string
}

export interface SessionState {
  song_id: string
  phase: Phase
  converged: boolean
  can_sign: boolean
  blocked: string[]
  disputed: Disputed[]
  agents: Record<AgentId, AgentView>
  signatures: Partial<Record<Writer, { name: string; at: string }>>
  record: SignedRecord | null
  explanation: Explanation | null
  ai_disclosure: AiDisclosure[]
  headline: Record<Lang, string>
  contests: { record: string; by: Writer; reason: string }[]
  engine: { omega: string; hyperon: string }
}

export interface SongRecord {
  id: string
  kind: "artefact" | "message" | "co-edit" | "claim" | "dispute" | "ai-generation" | "ai-assist" | "ai-voice" | "consent"
  author: Writer
  to?: Writer
  at: number
  holders: AgentId[]
  element?: string
  title?: string
  file?: string
  detail?: string
  detail_sw?: string
  hash?: string
  text?: string
  text_sw?: string
  translation?: string
  credits?: { element: string; role: string; writer: Writer }[]
  confirmed_by?: Writer
  attachment?: { record: string; element: string }
  tool?: string
  prompt?: string
  voice_of?: Writer
  consent?: string
}

export interface Song {
  id: string
  title: string
  subtitle: string
  bpm: number
  key: string
  made: string
  campaign: string
  writers: Writer[]
  elements: {
    id: string
    weight: number
    right: string
    en: string
    sw: string
  }[]
  records: SongRecord[]
  policy: {
    id: string
    title: string
    signed: string
    master: Record<Writer, number>
    master_note: string
    master_note_sw: string
  }
  stems: { file: string; hash: string }[]
  writer_info: Record<
    Writer,
    { name: string; city: string; role: string; agent: AgentId; lang: Lang }
  >
}

export interface JevReading {
  mode: "jev" | "manual"
  choice: string
  confidence: number | null
  probabilities: Record<string, number> | null
  model: string | null
  request_id: string | null
  latency_ms: number | null
  needs_review?: boolean
}
