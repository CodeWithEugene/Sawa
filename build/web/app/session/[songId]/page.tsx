import type { Metadata } from "next"

import { SessionProvider } from "@/components/sawa/session-provider"
import { SessionView } from "@/components/sawa/session-view"

export const metadata: Metadata = {
  title: "Session: Amani Ni Sisi · Sawa",
}

export default async function SessionPage({ params }: { params: Promise<{ songId: string }> }) {
  const { songId } = await params
  return (
    <SessionProvider songId={songId}>
      <SessionView />
    </SessionProvider>
  )
}
