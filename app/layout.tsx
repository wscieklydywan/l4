import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ScrollBehaviorInit } from "@/components/scroll-behavior-init"
import { PageTransition } from "@/components/page-transition"
import { Navigation } from "@/components/navigation"

const _inter = Inter({ subsets: ["latin", "latin-ext"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "L4 Club Żory | Najlepsze noce w mieście",
  description: "Klub dyskotekowy L4 w Żorach - muzyka, imprezy, niezapomniane noce. Rezerwuj stolik i bilety online.",
  keywords: ["klub nocny Żory", "dyskoteka Żory", "L4 klub", "imprezy Żory", "club Żory"],
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#1a1a24",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" className="dark">
      <body className={`font-sans antialiased`}>
        <ScrollBehaviorInit />
        <Navigation />
        <PageTransition>{children}</PageTransition>
        <Analytics />
      </body>
    </html>
  )
}
