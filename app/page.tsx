import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  DollarSign, 
  Package, 
  TrendingDown, 
  Shield,
  FileSearch,
  TrendingUp,
  MessageSquare,
  Network,
} from "lucide-react"
import Link from "next/link"

const kpiCards = [
  {
    title: "Total Monthly Spend",
    value: "$2.4M",
    change: "+12%",
    changeType: "neutral" as const,
    icon: DollarSign,
    description: "Across 50 tools",
  },
  {
    title: "Tools Managed",
    value: "50",
    change: "6 categories",
    changeType: "neutral" as const,
    icon: Package,
    description: "Full inventory mapped",
  },
  {
    title: "Savings Identified",
    value: "$720K",
    change: "30% of spend",
    changeType: "positive" as const,
    icon: TrendingDown,
    description: "Annual waste identified",
  },
  {
    title: "Compliance Score",
    value: "94%",
    change: "+8%",
    changeType: "positive" as const,
    icon: Shield,
    description: "NIST AI RMF aligned",
  },
]

const crewCards = [
  {
    title: "License Intelligence",
    description: "Map your tool portfolio, identify overlaps, and ensure compliance",
    icon: FileSearch,
    href: "/crews/license-intelligence",
    stats: "50 tools • 72% FedRAMP",
    color: "pharos-teal",
  },
  {
    title: "Tool Optimization",
    description: "Monitor usage, optimize spend, and consolidate redundant tools",
    icon: TrendingUp,
    href: "/crews/tool-optimization",
    stats: "$720K savings • 43% utilization",
    color: "pharos-gold",
  },
  {
    title: "Operator Assistant",
    description: "Natural language interface for tool management operations",
    icon: MessageSquare,
    href: "/crews/operator-assistant",
    stats: "50+ commands • Audit-logged",
    color: "pharos-purple",
  },
  {
    title: "Integration Mapping",
    description: "Visualize API connections, data flows, and identify redundancies",
    icon: Network,
    href: "/crews/integration-mapping",
    stats: "247 flows • 12 CUI-sensitive",
    color: "pharos-teal",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Command Center</h1>
        <p className="text-muted-foreground mt-1">
          Your AI workforce at a glance
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title} className="bg-pharos-card border-pharos-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{kpi.value}</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant="outline" 
                  className={
                    kpi.changeType === "positive" 
                      ? "bg-pass/10 text-pass border-pass/20" 
                      : "bg-pharos-border/50 text-muted-foreground border-pharos-border"
                  }
                >
                  {kpi.change}
                </Badge>
                <span className="text-xs text-muted-foreground">{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Crew Cards */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">AI Crews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {crewCards.map((crew) => (
            <Link key={crew.title} href={crew.href}>
              <Card className="bg-pharos-card border-pharos-border hover:border-pharos-teal/50 transition-colors cursor-pointer h-full">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div 
                    className={`p-2 rounded-lg ${
                      crew.color === "pharos-teal" 
                        ? "bg-pharos-teal/10 text-pharos-teal" 
                        : crew.color === "pharos-gold"
                        ? "bg-pharos-gold/10 text-pharos-gold"
                        : "bg-pharos-purple/10 text-pharos-purple"
                    }`}
                  >
                    <crew.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-white">{crew.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {crew.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {crew.stats}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Stats Footer */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-muted-foreground">Shadow AI Usage: </span>
                <span className="text-warning font-medium">71%</span>
              </div>
              <div>
                <span className="text-muted-foreground">Unused Licenses: </span>
                <span className="text-fail font-medium">$174K/mo</span>
              </div>
              <div>
                <span className="text-muted-foreground">FedRAMP Coverage: </span>
                <span className="text-pass font-medium">72%</span>
              </div>
            </div>
            <Link 
              href="/governance" 
              className="text-pharos-teal hover:underline"
            >
              View Aegis Governance →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
