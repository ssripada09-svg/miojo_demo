"use client"

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
    // Auto-expand the suite that contains the current crew
    const initial: Record<string, boolean> = {}
    for (const suite of suites) {
      initial[suite.id] = suite.crews.some(c => pathname === `/crews/${c.slug}`)
    }
    // If none matched, expand all
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
    'pharos-teal': { bg: 'bg-pharos-teal/10', text: 'text-pharos-teal', dot: 'bg-pharos-teal' },
    'pharos-gold': { bg: 'bg-pharos-gold/10', text: 'text-pharos-gold', dot: 'bg-pharos-gold' },
  }

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-pharos-card border-r border-pharos-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center h-16 px-4 border-b border-pharos-border">
        <Link href="/" className="flex items-center gap-3" onClick={handleNavClick}>
          <div className="w-8 h-8 rounded-lg bg-pharos-teal flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-white text-sm truncate">Pharos Helm</span>
              <span className="text-xs text-muted-foreground truncate">CACI Demo</span>
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
              ? "bg-pharos-teal/10 text-pharos-teal"
              : "text-muted-foreground hover:bg-pharos-border/50 hover:text-white"
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
                    "flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors",
                    hasActiveCrew
                      ? `${styles.text}`
                      : "text-muted-foreground hover:text-white"
                  )}
                >
                  <div className={cn("w-2 h-2 rounded-full flex-shrink-0", styles.dot)} />
                  <span className="truncate flex-1 text-left">{suite.name}</span>
                  <span className="text-[10px] font-normal normal-case tracking-normal text-muted-foreground mr-1">
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
                        ? `${styles.bg} ${styles.text}`
                        : "text-muted-foreground hover:bg-pharos-border/50 hover:text-white"
                    )}
                    title={collapsed ? crew.name : undefined}
                  >
                    <crew.icon className="w-4 h-4 flex-shrink-0" />
                    {!collapsed && (
                      <div className="flex flex-col min-w-0">
                        <span className="truncate">{crew.name}</span>
                        <span className="text-xs text-muted-foreground truncate">
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

        {/* Governance - separate, purple */}
        <div className="pt-2">
          <Link
            href="/governance"
            onClick={handleNavClick}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
              pathname === "/governance"
                ? "bg-pharos-purple/10 text-pharos-purple"
                : "text-muted-foreground hover:bg-pharos-border/50 hover:text-white"
            )}
            title={collapsed ? "Governance" : undefined}
          >
            <Shield className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="truncate">Governance</span>}
          </Link>
        </div>
      </nav>

      {/* Collapse toggle - hidden on mobile */}
      <div className="p-2 border-t border-pharos-border hidden lg:block">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 text-muted-foreground hover:text-white transition-colors rounded-lg hover:bg-pharos-border/50"
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
