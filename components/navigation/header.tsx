"use client"

import { Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function Header() {
  return (
    <header className="h-14 border-b border-pharos-border bg-pharos-card flex items-center justify-between px-6">
      {/* Left: Page context */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">CACI Demo Environment</span>
      </div>

      {/* Right: Aegis compliance pulse + user */}
      <div className="flex items-center gap-4">
        {/* Aegis Governance Pulse - always visible per UX critique */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-pharos-bg border border-pharos-border">
          <Shield className="w-4 h-4 text-pass" />
          <span className="text-xs text-muted-foreground">Aegis</span>
          <Badge variant="outline" className="text-xs bg-pass/10 text-pass border-pass/20">
            94%
          </Badge>
        </div>

        {/* Demo user avatar */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-pharos-purple flex items-center justify-center">
            <span className="text-white text-xs font-medium">DC</span>
          </div>
        </div>
      </div>
    </header>
  )
}
