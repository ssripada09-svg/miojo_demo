import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google"
import "./globals.css"
import { Shell } from "@/components/navigation"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

// Fraunces: variable font; enable italic for the signature v72 accent.
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Pharos Helm | AI Workforce Command Center",
  description: "Enterprise AI governance and tool management platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable}`}
      data-theme="light"
    >
      <body className="font-sans antialiased bg-bg text-ink">
        <Shell>{children}</Shell>
      </body>
    </html>
  )
}
