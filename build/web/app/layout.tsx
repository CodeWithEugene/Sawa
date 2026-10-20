import type { Metadata } from "next"
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["SOFT", "WONK", "opsz"],
})
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans" })
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Sawa: One Split Sheet",
  description:
    "Two creators. Two memories. One split sheet. Two SingularityNET Omega agents reason from conflicting memories of a co-write to one signed split sheet, in English and Swahili.",
  metadataBase: new URL("https://sawa.codewitheugene.top"),
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Sawa: One Split Sheet",
    description: "Two creators. Two memories. One split sheet.",
    images: ["/og.png"],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", display.variable, sans.variable, mono.variable)}
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
