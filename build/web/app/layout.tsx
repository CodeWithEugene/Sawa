import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const sans = Geist({ subsets: ["latin"], variable: "--font-sans" })
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Sawa: Fair Credit For Every Song",
  description:
    "Sawa helps co-writers agree who wrote what, fairly and on the record, so their music can be licensed and paid.",
  metadataBase: new URL("https://sawa.codewitheugene.top"),
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Sawa: Fair Credit For Every Song",
    description: "Two creators. Two memories. One split sheet.",
    images: ["/og.png"],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", sans.variable, mono.variable)}
    >
      <body className="min-h-dvh font-sans">
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
