"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Shield,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import { useState } from "react"
import { suites } from "@/lib/suites"

interface SidebarProps {
  onNavigate?: () => void
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [expandedSuites, setExpandedSuites] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    for (const suite of suites) {
      initial[suite.id] = suite.crews.some(c => pathname === `/crews/${c.slug}`)
    }
    if (!Object.values(initial).some(Boolean)) {
      for (const suite of suites) initial[suite.id] = true
    }
    return initial
  })

  const handleNavClick = () => {
    if (onNavigate) onNavigate()
  }

  const toggleSuite = (suiteId: string) => {
    setExpandedSuites(prev => ({ ...prev, [suiteId]: !prev[suiteId] }))
  }

  const colorStyles: Record<string, { bg: string; text: string; dot: string }> = {
    'pharos-blue': { bg: 'bg-pharos-blue/10', text: 'text-pharos-blue', dot: 'bg-pharos-blue' },
    'pharos-teal': { bg: 'bg-teal-tint',      text: 'text-teal-deep',    dot: 'bg-teal' },
    'pharos-gold': { bg: 'bg-gold-tint',      text: 'text-gold-deep',    dot: 'bg-gold' },
  }

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-bg-raised border-r border-[var(--ph-border)] transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center h-16 px-4 border-b border-[var(--ph-border)] bg-bg-raised">
        <Link href="/" className="flex items-center gap-3 min-w-0" onClick={handleNavClick}>
          <div className="w-8 h-8 rounded-lg bg-[#0F0F0E] flex items-center justify-center flex-shrink-0 shadow-sm">
            <Image
              src="/brand/pharos-mark-white.png"
              alt="Pharos"
              width={24}
              height={24}
              className="w-5 h-5 object-contain"
              priority
            />
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-ink text-sm uppercase tracking-[0.06em] truncate">Pharos</span>
              <span className="text-[11px] text-ink-muted truncate">Helm · CACI Demo</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {/* Dashboard */}
        <Link
          href="/"
          onClick={handleNavClick}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
            pathname === "/"
              ? "bg-teal-tint text-teal-deep font-medium"
              : "text-ink-muted hover:bg-[var(--ph-surface-sunk)] hover:text-ink"
          )}
          title={collapsed ? "Dashboard" : undefined}
        >
          <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="truncate">Dashboard</span>}
        </Link>

        {/* Suite Groups */}
        {suites.map((suite) => {
          const styles = colorStyles[suite.tailwindColor] || colorStyles['pharos-teal']
          const isExpanded = expandedSuites[suite.id]
          const hasActiveCrew = suite.crews.some(c => pathname === `/crews/${c.slug}`)

          return (
            <div key={suite.id} className="space-y-0.5">
              {!collapsed ? (
                <button
                  onClick={() => toggleSuite(suite.id)}
                  className={cn(
                    "flex items-center gap-2 w-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] rounded-lg transition-colors font-mono",
                    hasActiveCrew
                      ? `${styles.text}`
                      : "text-ink-faint hover:text-ink"
                  )}
                >
                  <div className={cn("w-2 h-2 rounded-full flex-shrink-0", styles.dot)} />
                  <span className="truncate flex-1 text-left">{suite.name}</span>
                  <span className="text-[9px] font-normal normal-case tracking-normal text-ink-faint mr-1">
                    {suite.audience}
                  </span>
                  <ChevronDown className={cn(
                    "w-3.5 h-3.5 transition-transform flex-shrink-0",
                    !isExpanded && "-rotate-90"
                  )} />
                </button>
              ) : (
                <div
                  className="flex items-center justify-center py-2"
                  title={suite.name}
                >
                  <div className={cn("w-2.5 h-2.5 rounded-full", styles.dot)} />
                </div>
              )}

              {/* Crew links */}
              {(collapsed || isExpanded) && suite.crews.map((crew) => {
                const isActive = pathname === `/crews/${crew.slug}`
                return (
                  <Link
                    key={crew.slug}
                    href={`/crews/${crew.slug}`}
                    onClick={handleNavClick}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                      !collapsed && "pl-7",
                      isActive
                        ? `${styles.bg} ${styles.text} font-medium`
                        : "text-ink-muted hover:bg-[var(--ph-surface-sunk)] hover:text-ink"
                    )}
                    title={collapsed ? crew.name : undefined}
                  >
                    <crew.icon className="w-4 h-4 flex-shrink-0" />
                    {!collapsed && (
                      <div className="flex flex-col min-w-0">
                        <span className="truncate">{crew.name}</span>
                        <span className="text-xs text-ink-faint truncate">
                          {crew.description}
                        </span>
                      </div>
                    )}
                  </Link>
                )
              })}
            </div>
          )
        })}

        {/* Governance — Aegis-scoped purple */}
        <div className="pt-2">
          <Link
            href="/governance"
            onClick={handleNavClick}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
              pathname === "/governance"
                ? "bg-pharos-purple/10 text-pharos-purple font-medium"
                : "text-ink-muted hover:bg-[var(--ph-surface-sunk)] hover:text-ink"
            )}
            title={collapsed ? "Governance" : undefined}
          >
            <Shield className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="truncate">Governance</span>}
          </Link>
        </div>
      </nav>

      {/* Collapse toggle — hidden on mobile */}
      <div className="p-2 border-t border-[var(--ph-border)] hidden lg:block">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 text-ink-muted hover:text-ink transition-colors rounded-lg hover:bg-[var(--ph-surface-sunk)]"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  )
}
