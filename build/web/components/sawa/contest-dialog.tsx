"use client"

import * as React from "react"
import { Flag } from "lucide-react"

import { useSession } from "./session-provider"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FIRST } from "@/lib/format"
import { t } from "@/lib/i18n"
import type { Writer } from "@/lib/types"
import { cn } from "@/lib/utils"

type Props = { record: string; recordLabel: string; defaultBy: Writer }

export function ContestDialog({ record, recordLabel, defaultBy }: Props) {
  const { contest, busy, lang } = useSession()
  const [open, setOpen] = React.useState(false)
  const [by, setBy] = React.useState<Writer>(defaultBy)
  const [reason, setReason] = React.useState("")

  async function submit() {
    if (!reason.trim()) return
    setOpen(false)
    await contest(record, by, reason.trim())
    setReason("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="xs"
            className="text-muted-foreground hover:text-destructive"
            data-testid={`contest-${record}`}
          >
            <Flag data-icon="inline-start" /> {t(lang, "contest")}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-[540]">
            {lang === "en" ? "Contest This Premise" : "Pinga Msingi Huu"}
          </DialogTitle>
          <DialogDescription>
            {lang === "en"
              ? `Withdraw "${recordLabel}" from the evidence. Your reason is recorded in both agents' memories, and both recompute.`
              : `Ondoa "${recordLabel}" kutoka kwa ushahidi. Sababu yako inarekodiwa katika kumbukumbu za mawakala wote wawili, na wote wanakokotoa upya.`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>
              {lang === "en" ? "Who Is Contesting" : "Nani Anapinga"}
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {(["malik", "wanjiru"] as Writer[]).map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setBy(w)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-sm transition-colors",
                    by === w
                      ? w === "wanjiru"
                        ? "border-nairobi bg-nairobi-soft text-nairobi-ink"
                        : "border-harlem bg-harlem-soft text-harlem-ink"
                      : "border-border hover:bg-muted"
                  )}
                >
                  {FIRST[w]}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contest-reason">
              {lang === "en" ? "Reason" : "Sababu"}
            </Label>
            <Textarea
              id="contest-reason"
              data-testid="contest-reason"
              value={reason}
              maxLength={280}
              onChange={(e) => setReason(e.target.value)}
              placeholder={
                lang === "en"
                  ? "Why should this not count?"
                  : "Kwa nini hii isihesabiwe?"
              }
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline">
                {lang === "en" ? "Cancel" : "Ghairi"}
              </Button>
            }
          />
          <Button
            onClick={() => void submit()}
            disabled={!reason.trim() || !!busy}
            data-testid="contest-submit"
          >
            {lang === "en" ? "Withdraw And Recompute" : "Ondoa Na Kokotoa Upya"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
