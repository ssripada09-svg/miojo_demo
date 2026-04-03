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
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Zap,
} from "lucide-react"
import Link from "next/link"

const kpiCards = [
  {
    title: "Total Tools",
    value: "50",
    change: "6 categories",
    changeType: "neutral" as const,
    icon: Package,
    description: "Full inventory mapped",
  },
  {
    title: "Monthly Spend",
    value: "$2.4M",
    change: "+12% YoY",
    changeType: "neutral" as const,
    icon: DollarSign,
    description: "Across all tools",
  },
  {
    title: "Identified Savings",
    value: "$720K",
    change: "30% of spend",
    changeType: "positive" as const,
    icon: TrendingDown,
    description: "Annual waste identified",
  },
  {
    title: "Compliance Score",
    value: "94%",
    change: "+8% this quarter",
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
    status: "Active",
  },
  {
    title: "Tool Optimization",
    description: "Monitor usage, optimize spend, and consolidate redundant tools",
    icon: TrendingUp,
    href: "/crews/tool-optimization",
    stats: "$720K savings • 43% utilization",
    color: "pharos-gold",
    status: "Active",
  },
  {
    title: "Operator Assistant",
    description: "Natural language interface for tool management operations",
    icon: MessageSquare,
    href: "/crews/operator-assistant",
    stats: "50+ commands • Audit-logged",
    color: "pharos-purple",
    status: "Active",
  },
  {
    title: "Integration Mapping",
    description: "Visualize API connections, data flows, and identify redundancies",
    icon: Network,
    href: "/crews/integration-mapping",
    stats: "247 flows • 12 CUI-sensitive",
    color: "pharos-teal",
    status: "Active",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "success",
    icon: CheckCircle2,
    title: "License audit completed",
    description: "Identified 3 unused Salesforce licenses",
    time: "2 hours ago",
    crew: "License Intelligence",
  },
  {
    id: 2,
    type: "warning",
    icon: AlertTriangle,
    title: "Compliance drift detected",
    description: "ServiceNow module missing FedRAMP authorization",
    time: "4 hours ago",
    crew: "License Intelligence",
  },
  {
    id: 3,
    type: "info",
    icon: Activity,
    title: "Cost analysis complete",
    description: "$48K monthly savings opportunity in collaboration tools",
    time: "6 hours ago",
    crew: "Tool Optimization",
  },
  {
    id: 4,
    type: "success",
    icon: Zap,
    title: "Integration mapped",
    description: "Discovered 12 new API connections to Salesforce",
    time: "1 day ago",
    crew: "Integration Mapping",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Demo Environment Banner */}
      <div className="bg-gradient-to-r from-pharos-teal/20 to-pharos-purple/20 border border-pharos-teal/30 rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-pharos-teal/20 text-pharos-teal border-pharos-teal/30">
                CACI Demo Environment
              </Badge>
              <Badge variant="outline" className="border-pharos-gold/30 text-pharos-gold">
                Deploy360
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Pharos Command Center</h1>
            <p className="text-muted-foreground mt-1">
              AI Workforce Management for Enterprise Tool Governance
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-pass animate-pulse" />
              <span className="text-muted-foreground">All systems operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title} className="bg-pharos-card border-pharos-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 md:p-6 md:pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground hidden sm:block" />
            </CardHeader>
            <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
              <div className="text-xl md:text-2xl font-bold text-white">{kpi.value}</div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                <Badge 
                  variant="outline" 
                  className={`text-xs w-fit ${
                    kpi.changeType === "positive" 
                      ? "bg-pass/10 text-pass border-pass/20" 
                      : "bg-pharos-border/50 text-muted-foreground border-pharos-border"
                  }`}
                >
                  {kpi.change}
                </Badge>
                <span className="text-xs text-muted-foreground hidden md:inline">{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Crew Cards - Takes 2 columns on xl */}
        <div className="xl:col-span-2 space-y-4">
          <h2 className="text-lg md:text-xl font-semibold text-white">AI Crews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crewCards.map((crew) => (
              <Link key={crew.title} href={crew.href}>
                <Card className="bg-pharos-card border-pharos-border hover:border-pharos-teal/50 transition-colors cursor-pointer h-full">
                  <CardHeader className="flex flex-row items-start gap-3 md:gap-4 p-4 md:p-6">
                    <div 
                      className={`p-2 rounded-lg flex-shrink-0 ${
                        crew.color === "pharos-teal" 
                          ? "bg-pharos-teal/10 text-pharos-teal" 
                          : crew.color === "pharos-gold"
                          ? "bg-pharos-gold/10 text-pharos-gold"
                          : "bg-pharos-purple/10 text-pharos-purple"
                      }`}
                    >
                      <crew.icon className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <CardTitle className="text-white text-sm md:text-base">{crew.title}</CardTitle>
                        <Badge variant="outline" className="bg-pass/10 text-pass border-pass/20 text-xs flex-shrink-0">
                          {crew.status}
                        </Badge>
                      </div>
                      <CardDescription className="mt-1 text-xs md:text-sm line-clamp-2">
                        {crew.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                    <div className="text-xs md:text-sm text-muted-foreground">
                      {crew.stats}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity - Takes 1 column on xl */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg md:text-xl font-semibold text-white">Recent Activity</h2>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
          <Card className="bg-pharos-card border-pharos-border">
            <CardContent className="p-0">
              <div className="divide-y divide-pharos-border">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="p-3 md:p-4 hover:bg-pharos-border/20 transition-colors">
                    <div className="flex gap-3">
                      <div className={`flex-shrink-0 mt-0.5 ${
                        activity.type === "success" ? "text-pass" :
                        activity.type === "warning" ? "text-warning" :
                        "text-pharos-teal"
                      }`}>
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-medium truncate">{activity.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Badge variant="outline" className="text-xs bg-pharos-border/30 border-pharos-border">
                            {activity.crew}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardContent className="p-4 md:pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <div>
                <span className="text-muted-foreground">Shadow AI: </span>
                <span className="text-warning font-medium">71%</span>
              </div>
              <div>
                <span className="text-muted-foreground">Unused Licenses: </span>
                <span className="text-fail font-medium">$174K/mo</span>
              </div>
              <div>
                <span className="text-muted-foreground">FedRAMP: </span>
                <span className="text-pass font-medium">72%</span>
              </div>
            </div>
            <Link 
              href="/governance" 
              className="text-pharos-teal hover:underline whitespace-nowrap"
            >
              View Aegis Governance →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
