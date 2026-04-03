import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileSearch, Shield, AlertTriangle, CheckCircle, Package } from "lucide-react"

const kpiCards = [
  {
    title: "Total Tools",
    value: "50",
    subtitle: "Across 6 categories",
    icon: Package,
  },
  {
    title: "FedRAMP Coverage",
    value: "72%",
    subtitle: "36 tools authorized",
    icon: Shield,
    status: "pass",
  },
  {
    title: "Compliance Gaps",
    value: "8",
    subtitle: "Tools need attention",
    icon: AlertTriangle,
    status: "warning",
  },
  {
    title: "AI/ML Tools",
    value: "12",
    subtitle: "$480K annual spend",
    icon: FileSearch,
  },
]

const categories = [
  { name: "AI/ML Platforms", count: 8, spend: "$240K/mo" },
  { name: "Analytics", count: 7, spend: "$180K/mo" },
  { name: "Automation", count: 6, spend: "$120K/mo" },
  { name: "Collaboration", count: 8, spend: "$210K/mo" },
  { name: "Security", count: 10, spend: "$350K/mo" },
  { name: "Developer", count: 11, spend: "$280K/mo" },
]

export default function LicenseIntelligencePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pharos-teal/10">
              <FileSearch className="h-6 w-6 text-pharos-teal" />
            </div>
            License Intelligence
          </h1>
          <p className="text-muted-foreground mt-1">
            Tool inventory, compliance mapping, and feature overlap analysis
          </p>
        </div>
        <Badge variant="outline" className="bg-pharos-teal/10 text-pharos-teal border-pharos-teal/20">
          Last scanned: 2h ago
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
                "text-muted-foreground"
              }`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${
                kpi.status === "pass" ? "text-pass" : 
                kpi.status === "warning" ? "text-warning" : 
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
        {/* Tool Inventory Table - Placeholder */}
        <Card className="lg:col-span-2 bg-pharos-card border-pharos-border">
          <CardHeader>
            <CardTitle className="text-white">Tool Inventory</CardTitle>
            <CardDescription>
              Complete inventory of enterprise software tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Placeholder table rows */}
              <div className="border border-pharos-border rounded-lg overflow-hidden">
                <div className="grid grid-cols-5 gap-4 p-3 bg-pharos-bg text-xs font-medium text-muted-foreground">
                  <span>Tool</span>
                  <span>Category</span>
                  <span>Cost/mo</span>
                  <span>Utilization</span>
                  <span>Compliance</span>
                </div>
                {[
                  { name: "OpenAI Enterprise", category: "AI/ML", cost: "$30K", util: "93%", compliant: true },
                  { name: "Power BI Pro", category: "Analytics", cost: "$28K", util: "67%", compliant: true },
                  { name: "Slack Business+", category: "Collaboration", cost: "$30K", util: "89%", compliant: true },
                  { name: "GitHub Enterprise", category: "Developer", cost: "$42K", util: "78%", compliant: true },
                  { name: "Tableau Creator", category: "Analytics", cost: "$15K", util: "34%", compliant: false },
                ].map((tool, i) => (
                  <div key={i} className="grid grid-cols-5 gap-4 p-3 border-t border-pharos-border text-sm">
                    <span className="text-white font-medium">{tool.name}</span>
                    <span className="text-muted-foreground">{tool.category}</span>
                    <span className="text-white">{tool.cost}</span>
                    <span className={parseInt(tool.util) < 50 ? "text-warning" : "text-pass"}>
                      {tool.util}
                    </span>
                    <span>
                      {tool.compliant ? (
                        <Badge variant="outline" className="bg-pass/10 text-pass border-pass/20">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          FedRAMP
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-fail/10 text-fail border-fail/20">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Review
                        </Badge>
                      )}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Showing 5 of 50 tools • Full table coming soon
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="bg-pharos-card border-pharos-border">
          <CardHeader>
            <CardTitle className="text-white">By Category</CardTitle>
            <CardDescription>
              Tool distribution across categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">{cat.name}</p>
                    <p className="text-xs text-muted-foreground">{cat.count} tools</p>
                  </div>
                  <span className="text-sm text-pharos-teal font-medium">{cat.spend}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Dashboard */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardHeader>
          <CardTitle className="text-white">Compliance Overview</CardTitle>
          <CardDescription>
            Certification coverage across tool portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "FedRAMP Moderate", coverage: "72%", status: "pass" },
              { name: "SOC 2 Type II", coverage: "88%", status: "pass" },
              { name: "HIPAA", coverage: "45%", status: "warning" },
              { name: "ISO 27001", coverage: "65%", status: "pass" },
            ].map((cert) => (
              <div key={cert.name} className="p-4 rounded-lg bg-pharos-bg border border-pharos-border">
                <p className="text-xs text-muted-foreground">{cert.name}</p>
                <p className={`text-2xl font-bold ${
                  cert.status === "pass" ? "text-pass" : "text-warning"
                }`}>
                  {cert.coverage}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
