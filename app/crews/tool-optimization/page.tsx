import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, TrendingDown, AlertCircle, CheckCircle, Calendar } from "lucide-react"

const kpiCards = [
  {
    title: "Total Monthly Spend",
    value: "$2.4M",
    change: "+12% YoY",
    icon: DollarSign,
  },
  {
    title: "AI Tool Spend",
    value: "$480K",
    change: "20% of total",
    icon: TrendingUp,
    highlight: true,
  },
  {
    title: "Identified Waste",
    value: "$720K",
    change: "30% recoverable",
    icon: TrendingDown,
    status: "warning",
  },
  {
    title: "Utilization Rate",
    value: "43%",
    change: "vs 60% target",
    icon: AlertCircle,
    status: "warning",
  },
]

const recommendations = [
  {
    title: "Consolidate BI Tools",
    description: "3 overlapping BI tools (Tableau, Looker, Power BI) → standardize on Power BI",
    savings: "$180K/yr",
    effort: "Medium",
    priority: "High",
  },
  {
    title: "Reclaim Unused Tableau Licenses",
    description: "47 licenses unused in past 90 days",
    savings: "$42K/yr",
    effort: "Low",
    priority: "High",
  },
  {
    title: "Migrate OpenAI → Claude",
    description: "40% cost savings for equivalent performance on internal use cases",
    savings: "$72K/yr",
    effort: "Medium",
    priority: "Medium",
  },
  {
    title: "Right-size Salesforce Licenses",
    description: "120 users with Enterprise licenses only need Professional",
    savings: "$96K/yr",
    effort: "Low",
    priority: "Medium",
  },
]

const renewals = [
  { tool: "Salesforce Enterprise", date: "Apr 15, 2026", amount: "$840K", action: "Negotiate" },
  { tool: "Tableau", date: "May 1, 2026", amount: "$180K", action: "Consolidate" },
  { tool: "Slack Business+", date: "Jun 1, 2026", amount: "$360K", action: "Review" },
  { tool: "GitHub Enterprise", date: "Jul 15, 2026", amount: "$504K", action: "Renew" },
]

export default function ToolOptimizationPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pharos-gold/10">
              <TrendingUp className="h-6 w-6 text-pharos-gold" />
            </div>
            Tool Optimization
          </h1>
          <p className="text-muted-foreground mt-1">
            Usage analytics, spend optimization, and consolidation recommendations
          </p>
        </div>
        <Badge variant="outline" className="bg-pharos-gold/10 text-pharos-gold border-pharos-gold/20">
          Analysis updated: Today
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title} className={`bg-pharos-card border-pharos-border ${
            kpi.highlight ? "ring-1 ring-pharos-gold/20" : ""
          }`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className={`h-4 w-4 ${
                kpi.status === "warning" ? "text-warning" : 
                kpi.highlight ? "text-pharos-gold" :
                "text-muted-foreground"
              }`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${
                kpi.status === "warning" ? "text-warning" : 
                kpi.highlight ? "text-pharos-gold" :
                "text-white"
              }`}>
                {kpi.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommendations Panel */}
        <Card className="lg:col-span-2 bg-pharos-card border-pharos-border">
          <CardHeader>
            <CardTitle className="text-white">Optimization Recommendations</CardTitle>
            <CardDescription>
              AI-identified opportunities for cost savings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, i) => (
                <div 
                  key={i} 
                  className="p-4 rounded-lg bg-pharos-bg border border-pharos-border hover:border-pharos-gold/30 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">{rec.title}</h3>
                        <Badge variant="outline" className={
                          rec.priority === "High" 
                            ? "bg-fail/10 text-fail border-fail/20"
                            : "bg-warning/10 text-warning border-warning/20"
                        }>
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs">
                        <span className="text-muted-foreground">
                          Effort: <span className="text-white">{rec.effort}</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-pass">{rec.savings}</p>
                      <p className="text-xs text-muted-foreground">potential savings</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Renewal Calendar */}
        <Card className="bg-pharos-card border-pharos-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming Renewals
            </CardTitle>
            <CardDescription>
              Contracts expiring in next 90 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {renewals.map((renewal, i) => (
                <div key={i} className="p-3 rounded-lg bg-pharos-bg border border-pharos-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white font-medium">{renewal.tool}</p>
                      <p className="text-xs text-muted-foreground">{renewal.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">{renewal.amount}</p>
                      <Badge variant="outline" className={
                        renewal.action === "Negotiate" || renewal.action === "Consolidate"
                          ? "bg-warning/10 text-warning border-warning/20"
                          : "bg-pharos-border/50 text-muted-foreground border-pharos-border"
                      }>
                        {renewal.action}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Trend Chart Placeholder */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardHeader>
          <CardTitle className="text-white">Spend Trend (12 months)</CardTitle>
          <CardDescription>
            Monthly software spend with category breakdown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border border-dashed border-pharos-border rounded-lg">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Chart component coming soon</p>
              <p className="text-xs text-muted-foreground mt-1">Recharts integration pending</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-pass" />
                <span className="text-muted-foreground">Total Savings Identified:</span>
                <span className="text-pass font-bold">$720K/year</span>
              </div>
              <div>
                <span className="text-muted-foreground">Quick Wins:</span>
                <span className="text-white font-medium ml-2">$138K (this month)</span>
              </div>
            </div>
            <button className="px-4 py-2 bg-pharos-gold text-white rounded-lg text-sm font-medium hover:bg-pharos-gold/80 transition-colors">
              Generate Report
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
