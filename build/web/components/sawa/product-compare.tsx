import { Check, Minus, X } from "lucide-react"

import { cn } from "@/lib/utils"

type Mark = "yes" | "no" | "partly"
type Cell = { mark: Mark; text: string }

const COLUMNS = ["Sawa", "Paper Split Sheet", "Split-Sheet Apps", "Lawyers And Mediators", "Chatbots"] as const

const ROWS: { label: string; cells: [Cell, Cell, Cell, Cell, Cell] }[] = [
  {
    label: "Records an agreed split",
    cells: [
      { mark: "yes", text: "Signed in the session" },
      { mark: "yes", text: "Once both agree" },
      { mark: "yes", text: "With e-signatures" },
      { mark: "yes", text: "In a settlement" },
      { mark: "partly", text: "Drafts one, no signing" },
    ],
  },
  {
    label: "Helps reach a split from conflicting memories",
    cells: [
      { mark: "yes", text: "Weighs the evidence" },
      { mark: "no", text: "Blank form" },
      { mark: "no", text: "Collects numbers" },
      { mark: "yes", text: "Through negotiation" },
      { mark: "partly", text: "Answers differ each time" },
    ],
  },
  {
    label: "Shows why each share is what it is",
    cells: [
      { mark: "yes", text: "Evidence and rule per share" },
      { mark: "no", text: "Numbers only" },
      { mark: "no", text: "Numbers only" },
      { mark: "partly", text: "In a written opinion" },
      { mark: "partly", text: "Fluent, not checkable" },
    ],
  },
  {
    label: "Both sides can verify the same answer",
    cells: [
      { mark: "yes", text: "Matching proof hashes" },
      { mark: "no", text: "No" },
      { mark: "no", text: "No" },
      { mark: "partly", text: "Each side has its own counsel" },
      { mark: "no", text: "No" },
    ],
  },
  {
    label: "Explains in Swahili",
    cells: [
      { mark: "yes", text: "Every reason, both languages" },
      { mark: "partly", text: "If you write it so" },
      { mark: "partly", text: "Depends on the app" },
      { mark: "partly", text: "Depends on the lawyer" },
      { mark: "partly", text: "Varies by model" },
    ],
  },
  {
    label: "Discloses AI use and checks voice consent",
    cells: [
      { mark: "yes", text: "Required to sign" },
      { mark: "no", text: "Not covered" },
      { mark: "partly", text: "Varies by app" },
      { mark: "partly", text: "If someone raises it" },
      { mark: "no", text: "Not covered" },
    ],
  },
  {
    label: "Time and cost",
    cells: [
      { mark: "yes", text: "Minutes, in the session" },
      { mark: "yes", text: "Free and fast" },
      { mark: "yes", text: "Fast" },
      { mark: "no", text: "Weeks, often costly" },
      { mark: "yes", text: "Fast" },
    ],
  },
  {
    label: "Gives legal advice",
    cells: [
      { mark: "no", text: "No, it records an agreement" },
      { mark: "no", text: "No" },
      { mark: "no", text: "No" },
      { mark: "yes", text: "Yes" },
      { mark: "no", text: "No" },
    ],
  },
]

const ICON = { yes: Check, no: X, partly: Minus } as const
const LABEL = { yes: "Yes", no: "No", partly: "Partly" } as const

function MarkCell({ cell, highlight }: { cell: Cell; highlight: boolean }) {
  const Icon = ICON[cell.mark]
  return (
    <td className={cn("px-4 py-4 align-top", highlight && "bg-nairobi/[0.12]")}>
      <span className="flex items-start gap-2">
        <Icon
          className={cn(
            "mt-0.5 size-4 shrink-0",
            cell.mark === "yes" ? "text-nairobi" : cell.mark === "no" ? "text-white/35" : "text-white/60"
          )}
          aria-label={LABEL[cell.mark]}
        />
        <span className={cn("text-[0.92rem] leading-snug", highlight ? "text-white" : "text-white/70")}>{cell.text}</span>
      </span>
    </td>
  )
}

/** Sawa against what co-writers use today, including what Sawa does not do. */
export function ComparisonTable() {
  return (
    <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
      <table className="w-full min-w-[920px] border-collapse text-left">
        <thead>
          <tr className="border-b border-white/15">
            <th className="w-[22%] px-4 py-4 text-sm font-normal text-white/50">
              <span className="sr-only">Capability</span>
            </th>
            {COLUMNS.map((c, i) => (
              <th
                key={c}
                scope="col"
                className={cn(
                  "px-4 py-4 text-[0.95rem] font-medium",
                  i === 0 ? "rounded-t-xl bg-nairobi text-white" : "text-white/85"
                )}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.label} className="border-b border-white/10">
              <th scope="row" className="px-4 py-4 align-top text-[0.95rem] font-normal text-white">
                {r.label}
              </th>
              {r.cells.map((cell, i) => (
                <MarkCell key={COLUMNS[i]} cell={cell} highlight={i === 0} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
