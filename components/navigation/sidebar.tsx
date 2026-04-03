"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileSearch,
  TrendingUp,
  MessageSquare,
  Network,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Crews",
    items: [
      {
        name: "License Intelligence",
        href: "/crews/license-intelligence",
        icon: FileSearch,
        description: "Tool inventory & compliance",
      },
      {
        name: "Tool Optimization",
        href: "/crews/tool-optimization",
        icon: TrendingUp,
        description: "Spend analysis & savings",
      },
      {
        name: "Operator Assistant",
        href: "/crews/operator-assistant",
        icon: MessageSquare,
        description: "Natural language operations",
      },
      {
        name: "Integration Mapping",
        href: "/crews/integration-mapping",
        icon: Network,
        description: "API connections & data flows",
      },
    ],
  },
  {
    name: "Governance",
    href: "/governance",
    icon: Shield,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-pharos-card border-r border-pharos-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center h-16 px-4 border-b border-pharos-border">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-pharos-teal flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-white text-sm">Pharos Helm</span>
              <span className="text-xs text-muted-foreground">CACI Demo</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          if (item.items) {
            // Crew section with sub-items
            return (
              <div key={item.name} className="space-y-1">
                {!collapsed && (
                  <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {item.name}
                  </div>
                )}
                {item.items.map((subItem) => {
                  const isActive = pathname === subItem.href
                  return (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                        isActive
                          ? "bg-pharos-teal/10 text-pharos-teal"
                          : "text-muted-foreground hover:bg-pharos-border/50 hover:text-white"
                      )}
                      title={collapsed ? subItem.name : undefined}
                    >
                      <subItem.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex flex-col">
                          <span>{subItem.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {subItem.description}
                          </span>
                        </div>
                      )}
                    </Link>
                  )
                })}
              </div>
            )
          }

          // Regular nav item
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href!}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-pharos-teal/10 text-pharos-teal"
                  : "text-muted-foreground hover:bg-pharos-border/50 hover:text-white"
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-pharos-border">
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
