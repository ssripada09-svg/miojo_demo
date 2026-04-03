import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Network, AlertTriangle, Shield, Activity, ArrowRight, Lock } from "lucide-react"

const kpiCards = [
  {
    title: "Active Integrations",
    value: "247",
    subtitle: "Across 50 tools",
    icon: Network,
  },
  {
    title: "CUI Data Flows",
    value: "12",
    subtitle: "Monitored by Aegis",
    icon: Shield,
    status: "warning",
  },
  {
    title: "API Health",
    value: "97.2%",
    subtitle: "4 need attention",
    icon: Activity,
    status: "pass",
  },
  {
    title: "Security Flags",
    value: "3",
    subtitle: "Unencrypted flows",
    icon: AlertTriangle,
    status: "fail",
  },
]

const dataFlows = [
  {
    source: "Salesforce",
    target: "Power BI",
    type: "API",
    frequency: "Daily",
    dataType: "CRM Data",
    classification: "Internal",
    status: "healthy",
  },
  {
    source: "Jira",
    target: "Slack",
    type: "Webhook",
    frequency: "Real-time",
    dataType: "Project Updates",
    classification: "Internal",
    status: "healthy",
  },
  {
    source: "OpenAI",
    target: "Internal App",
    type: "API",
    frequency: "On-demand",
    dataType: "LLM Queries",
    classification: "CUI",
    status: "monitoring",
  },
  {
    source: "AWS S3",
    target: "Snowflake",
    type: "File",
    frequency: "Hourly",
    dataType: "Analytics",
    classification: "CUI",
    status: "healthy",
  },
  {
    source: "GitHub",
    target: "Jenkins",
    type: "Webhook",
    frequency: "Real-time",
    dataType: "Code Changes",
    classification: "Internal",
    status: "warning",
  },
]

const integrationClusters = [
  { name: "AI/ML", tools: 8, connections: 24, cuiFlows: 4 },
  { name: "Analytics", tools: 7, connections: 31, cuiFlows: 2 },
  { name: "DevOps", tools: 11, connections: 67, cuiFlows: 1 },
  { name: "Collaboration", tools: 8, connections: 42, cuiFlows: 0 },
  { name: "Security", tools: 10, connections: 56, cuiFlows: 3 },
  { name: "CRM/ERP", tools: 6, connections: 27, cuiFlows: 2 },
]

export default function IntegrationMappingPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pharos-teal/10">
              <Network className="h-6 w-6 text-pharos-teal" />
            </div>
            Integration Mapping
          </h1>
          <p className="text-muted-foreground mt-1">
            API connections, data flows, and integration health monitoring
          </p>
        </div>
        <Badge variant="outline" className="bg-pharos-teal/10 text-pharos-teal border-pharos-teal/20">
          Last scan: 15m ago
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title} className="bg-pharos-card border-pharos-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className={`h-4 w-4 ${
                kpi.status === "pass" ? "text-pass" : 
                kpi.status === "warning" ? "text-warning" :
                kpi.status === "fail" ? "text-fail" :
                "text-muted-foreground"
              }`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${
                kpi.status === "pass" ? "text-pass" : 
                kpi.status === "warning" ? "text-warning" :
                kpi.status === "fail" ? "text-fail" :
                "text-white"
              }`}>
                {kpi.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{kpi.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Connection Diagram Placeholder */}
        <Card className="lg:col-span-2 bg-pharos-card border-pharos-border">
          <CardHeader>
            <CardTitle className="text-white">Integration Graph</CardTitle>
            <CardDescription>
              Interactive visualization of tool connections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 border border-dashed border-pharos-border rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Placeholder graph visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-16">
                  {integrationClusters.slice(0, 6).map((cluster, i) => (
                    <div 
                      key={cluster.name}
                      className="flex flex-col items-center"
                    >
                      <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center ${
                        cluster.cuiFlows > 0 
                          ? "border-pharos-purple bg-pharos-purple/10" 
                          : "border-pharos-teal bg-pharos-teal/10"
                      }`}>
                        <span className="text-xs font-medium text-white">{cluster.tools}</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-2">{cluster.name}</span>
                      <span className="text-xs text-pharos-teal">{cluster.connections} links</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-muted-foreground">
                <span>React Flow visualization coming soon</span>
                <span>Click cluster to expand</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Clusters */}
        <Card className="bg-pharos-card border-pharos-border">
          <CardHeader>
            <CardTitle className="text-white">By Category</CardTitle>
            <CardDescription>
              Integration density per tool category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {integrationClusters.map((cluster) => (
                <div 
                  key={cluster.name} 
                  className="p-3 rounded-lg bg-pharos-bg border border-pharos-border hover:border-pharos-teal/30 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">{cluster.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {cluster.tools} tools • {cluster.connections} connections
                      </p>
                    </div>
                    {cluster.cuiFlows > 0 && (
                      <Badge variant="outline" className="bg-pharos-purple/10 text-pharos-purple border-pharos-purple/20">
                        <Lock className="w-3 h-3 mr-1" />
                        {cluster.cuiFlows} CUI
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Flow Table */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardHeader>
          <CardTitle className="text-white">Active Data Flows</CardTitle>
          <CardDescription>
            Real-time data movement between systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border border-pharos-border rounded-lg overflow-hidden">
            <div className="grid grid-cols-7 gap-4 p-3 bg-pharos-bg text-xs font-medium text-muted-foreground">
              <span>Source</span>
              <span>Direction</span>
              <span>Target</span>
              <span>Type</span>
              <span>Frequency</span>
              <span>Classification</span>
              <span>Status</span>
            </div>
            {dataFlows.map((flow, i) => (
              <div key={i} className="grid grid-cols-7 gap-4 p-3 border-t border-pharos-border text-sm items-center">
                <span className="text-white font-medium">{flow.source}</span>
                <span className="text-pharos-teal">
                  <ArrowRight className="w-4 h-4" />
                </span>
                <span className="text-white font-medium">{flow.target}</span>
                <span className="text-muted-foreground">{flow.type}</span>
                <span className="text-muted-foreground">{flow.frequency}</span>
                <span>
                  {flow.classification === "CUI" ? (
                    <Badge variant="outline" className="bg-pharos-purple/10 text-pharos-purple border-pharos-purple/20">
                      <Lock className="w-3 h-3 mr-1" />
                      CUI
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-pharos-border/50 text-muted-foreground border-pharos-border">
                      Internal
                    </Badge>
                  )}
                </span>
                <span>
                  {flow.status === "healthy" ? (
                    <Badge variant="outline" className="bg-pass/10 text-pass border-pass/20">
                      Healthy
                    </Badge>
                  ) : flow.status === "warning" ? (
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                      Warning
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-pharos-purple/10 text-pharos-purple border-pharos-purple/20">
                      Monitored
                    </Badge>
                  )}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Showing 5 of 247 active data flows
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
