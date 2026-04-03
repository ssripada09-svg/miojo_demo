import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Shell } from "@/components/navigation"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="font-sans antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  )
}
