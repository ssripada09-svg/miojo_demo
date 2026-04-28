"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"
import { CREWS, TRUST_LAYER } from "@/lib/miojo"

interface SidebarProps {
  onNavigate?: () => void
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const handleNavClick = () => {
    if (onNavigate) onNavigate()
  }

  const accentClass = (accent: string) => {
    switch (accent) {
      case 'gold':
        return 'text-gold-strong'
      case 'ink':
        return 'text-ink'
      default:
        return 'text-teal-deep'
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-bg-raised border-r border-[var(--ph-border)] transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header / wordmark */}
      <div className="flex items-center h-16 px-4 border-b border-[var(--ph-border)] bg-bg-raised">
        <Link href="/" className="flex items-center gap-3 min-w-0" onClick={handleNavClick}>
          <div className="flex items-center justify-center flex-shrink-0">
            <span
              className="font-serif italic text-3xl leading-none"
              style={{ color: 'var(--ph-teal-deep)' }}
            >
              m
            </span>
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-ink text-sm uppercase tracking-[0.18em] truncate">Miojo</span>
              <span className="text-[10px] text-ink-muted uppercase tracking-[0.2em] truncate">OS \u00b7 Founder Demo</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {/* Home */}
        <Link
          href="/"
          onClick={handleNavClick}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
            pathname === "/"
              ? "bg-teal-tint text-teal-deep font-medium"
              : "text-ink-muted hover:bg-[var(--ph-surface-sunk)] hover:text-ink"
          )}
          title={collapsed ? "Home" : undefined}
        >
          <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="truncate">Home</span>}
        </Link>

        {/* Crews label */}
        {!collapsed && (
          <div className="pt-5 pb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-faint font-mono">
            Crews
          </div>
        )}

        {CREWS.map((crew) => {
          const href = `/crews/${crew.slug}`
          const isActive = pathname === href
          return (
            <Link
              key={crew.slug}
              href={href}
              onClick={handleNavClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-teal-tint text-teal-deep font-medium"
                  : "text-ink-muted hover:bg-[var(--ph-surface-sunk)] hover:text-ink"
              )}
              title={collapsed ? crew.name : undefined}
            >
              <crew.icon
                className={cn(
                  "w-4 h-4 flex-shrink-0",
                  !isActive && accentClass(crew.accent)
                )}
              />
              {!collapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="truncate">{crew.name}</span>
                  <span className="text-[11px] text-ink-faint truncate">{crew.description}</span>
                </div>
              )}
            </Link>
          )
        })}

        {/* Trust Layer */}
        {!collapsed && (
          <div className="pt-5 pb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-faint font-mono">
            Foundation
          </div>
        )}
        <Link
          href="/trust"
          onClick={handleNavClick}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
            pathname === "/trust"
              ? "bg-pharos-purple/10 text-pharos-purple font-medium"
              : "text-ink-muted hover:bg-[var(--ph-surface-sunk)] hover:text-ink"
          )}
          title={collapsed ? TRUST_LAYER.name : undefined}
        >
          <TRUST_LAYER.icon className="w-5 h-5 flex-shrink-0" />
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="truncate">{TRUST_LAYER.name}</span>
              <span className="text-[11px] text-ink-faint truncate">{TRUST_LAYER.description}</span>
            </div>
          )}
        </Link>
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-[var(--ph-border)] hidden lg:block">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 text-ink-muted hover:text-ink transition-colors rounded-lg hover:bg-[var(--ph-surface-sunk)]"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </div>
  )
}
