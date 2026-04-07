import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Zap,
  ArrowRight,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { suites } from "@/lib/suites"

const suiteMetrics: Record<string, { stats: { label: string; value: string }[]; description: string }> = {
  'license-optimization': {
    description: 'Enterprise tool governance, spend optimization, and compliance monitoring for federal IT portfolios.',
    stats: [
      { label: 'FedRAMP', value: '72%' },
      { label: 'Identified Savings', value: '$720K' },
      { label: 'Compliance', value: '94%' },
    ],
  },
  'proposal-optimization': {
    description: 'AI-powered pipeline intelligence, proposal acceleration, and competitive analysis for federal BD.',
    stats: [
      { label: 'Under Evaluation', value: '$16B' },
      { label: 'New-Biz Win Rate', value: '31%' },
      { label: 'Median Response', value: '24 days' },
    ],
  },
  'operational-excellence': {
    description: 'Workforce management, contract delivery, and institutional knowledge activation at scale.',
    stats: [
      { label: 'Active Contracts', value: '523' },
      { label: 'Billable Util.', value: '76.3%' },
      { label: 'Cleared Employees', value: '15,902' },
    ],
  },
}

const recentActivity = [
  {
    id: 1,
    type: "success",
    icon: CheckCircle2,
    title: "Pipeline coverage recalculated",
    description: "Weighted pipeline at 3.84x vs 3.0x floor — healthy coverage",
    time: "1 hour ago",
    crew: "Opportunity Intelligence",
    suite: "Proposal Optimization",
  },
  {
    id: 2,
    type: "warning",
    icon: AlertTriangle,
    title: "ATLAS C2 change-order alert",
    description: "45.0% CO rate flagged — delivery risk and capture signal",
    time: "3 hours ago",
    crew: "Contract Delivery",
    suite: "Operational Excellence",
  },
  {
    id: 3,
    type: "info",
    icon: Activity,
    title: "Bench cost model updated",
    description: "1,000-person bench at $3.9M/week — utilization at 76.3%",
    time: "5 hours ago",
    crew: "Workforce Utilization",
    suite: "Operational Excellence",
  },
  {
    id: 4,
    type: "success",
    icon: Zap,
    title: "Proposal compliance check passed",
    description: "DoJ IT Modernization — 99% compliant, final production phase",
    time: "6 hours ago",
    crew: "Proposal Acceleration",
    suite: "Proposal Optimization",
  },
  {
    id: 5,
    type: "info",
    icon: TrendingUp,
    title: "License audit completed",
    description: "Identified 3 unused Salesforce licenses — $48K savings",
    time: "1 day ago",
    crew: "License Intelligence",
    suite: "License Optimization",
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
              AI Workforce Management — 3 Suites &middot; 14 Crews
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Suite Cards - Takes 2 columns on xl */}
        <div className="xl:col-span-2 space-y-4">
          <h2 className="text-lg md:text-xl font-semibold text-white">AI Suites</h2>
          <div className="space-y-4">
            {suites.map((suite) => {
              const meta = suiteMetrics[suite.id]
              return (
                <Card key={suite.id} className="bg-pharos-card border-pharos-border">
                  <CardHeader className="p-4 md:p-6 pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-8 rounded-full flex-shrink-0"
                          style={{ backgroundColor: suite.color }}
                        />
                        <div>
                          <CardTitle className="text-white text-base md:text-lg">{suite.name}</CardTitle>
                          <CardDescription className="mt-0.5 text-xs md:text-sm">
                            {meta?.description || suite.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge variant="outline" className="text-xs border-pharos-border text-muted-foreground">
                          {suite.audience}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs"
                          style={{
                            backgroundColor: `${suite.color}15`,
                            color: suite.color,
                            borderColor: `${suite.color}30`,
                          }}
                        >
                          {suite.crews.length} crews
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0 space-y-4">
                    {/* Suite-level metrics */}
                    {meta && (
                      <div className="grid grid-cols-3 gap-3">
                        {meta.stats.map((stat) => (
                          <div key={stat.label} className="bg-pharos-bg rounded-lg p-3 border border-pharos-border">
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                            <p className="text-lg font-bold text-white">{stat.value}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Crew links */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {suite.crews.map((crew) => (
                        <Link
                          key={crew.slug}
                          href={`/crews/${crew.slug}`}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-pharos-bg border border-pharos-border hover:border-opacity-60 transition-colors group"
                          style={{ ['--suite-color' as string]: suite.color }}
                        >
                          <crew.icon className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" style={{ color: undefined }} />
                          <span className="text-sm text-muted-foreground group-hover:text-white transition-colors flex-1">{crew.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
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
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
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

          {/* Quick Stats Footer */}
          <Card className="bg-pharos-card border-pharos-border">
            <CardContent className="p-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Revenue (FY)</span>
                  <span className="text-white font-medium">$8.63B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Backlog</span>
                  <span className="text-white font-medium">$31.4B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Book-to-Bill</span>
                  <span className="text-pass font-medium">1.09x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shadow AI</span>
                  <span className="text-warning font-medium">71%</span>
                </div>
                <Link
                  href="/governance"
                  className="text-pharos-teal hover:underline whitespace-nowrap block pt-1 text-xs"
                >
                  View Aegis Governance →
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
