import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, AlertTriangle, Clock, FileText, Activity, Users, Settings } from "lucide-react"

const complianceScore = 94

const nistRmfFunctions = [
  {
    name: "GOVERN",
    description: "Policy engine & oversight",
    status: "active",
    score: 96,
    icon: Settings,
  },
  {
    name: "MAP",
    description: "Context & stakeholder mapping",
    status: "active",
    score: 92,
    icon: Users,
  },
  {
    name: "MEASURE",
    description: "Metrics & testing",
    status: "active",
    score: 94,
    icon: Activity,
  },
  {
    name: "MANAGE",
    description: "Risk mitigation",
    status: "active",
    score: 91,
    icon: Shield,
  },
]

const recentActivity = [
  {
    action: "Policy Update",
    description: "AI-003: Shadow AI Detection policy activated",
    user: "System",
    timestamp: "2 hours ago",
    type: "policy",
  },
  {
    action: "Access Revoked",
    description: "john.smith@caci.com removed from 14 tools",
    user: "admin@caci.com",
    timestamp: "4 hours ago",
    type: "action",
  },
  {
    action: "Compliance Alert",
    description: "3 tools flagged for FedRAMP review",
    user: "System",
    timestamp: "6 hours ago",
    type: "alert",
  },
  {
    action: "Audit Export",
    description: "Q1 2026 compliance report generated",
    user: "ciso@caci.com",
    timestamp: "1 day ago",
    type: "report",
  },
  {
    action: "Integration Added",
    description: "New data flow: OpenAI → Internal App (CUI monitored)",
    user: "devops@caci.com",
    timestamp: "2 days ago",
    type: "integration",
  },
]

const activePolicies = [
  { name: "AI-001: Approved AI Tools List", status: "enforced", violations: 0 },
  { name: "AI-002: CUI Data Handling", status: "enforced", violations: 0 },
  { name: "AI-003: Shadow AI Detection", status: "enforced", violations: 3 },
  { name: "SEC-001: FedRAMP Requirements", status: "enforced", violations: 8 },
  { name: "SEC-002: Data Classification", status: "monitoring", violations: 2 },
  { name: "OPS-001: License Utilization", status: "advisory", violations: 12 },
]

export default function GovernancePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pass/10">
              <Shield className="h-6 w-6 text-pass" />
            </div>
            Aegis Governance
          </h1>
          <p className="text-muted-foreground mt-1">
            NIST AI RMF compliance, policy enforcement, and audit trail
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-pass/10 text-pass border-pass/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            All systems monitored
          </Badge>
        </div>
      </div>

      {/* Compliance Score Hero */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Overall Compliance Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-pass">{complianceScore}%</span>
                <Badge variant="outline" className="bg-pass/10 text-pass border-pass/20">
                  +8% this quarter
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                NIST AI RMF aligned • Continuous monitoring active
              </p>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">50</p>
                <p className="text-xs text-muted-foreground">Tools Governed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">247</p>
                <p className="text-xs text-muted-foreground">Data Flows</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">25</p>
                <p className="text-xs text-muted-foreground">Policy Violations</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* NIST AI RMF Functions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">NIST AI RMF Functions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {nistRmfFunctions.map((func) => (
            <Card key={func.name} className="bg-pharos-card border-pharos-border">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-pass/10">
                    <func.icon className="h-4 w-4 text-pass" />
                  </div>
                  <Badge variant="outline" className="bg-pass/10 text-pass border-pass/20">
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-bold text-white">{func.name}</h3>
                <p className="text-xs text-muted-foreground">{func.description}</p>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Score</span>
                    <span className="text-pass font-medium">{func.score}%</span>
                  </div>
                  <div className="w-full bg-pharos-border rounded-full h-1.5 mt-1">
                    <div 
                      className="bg-pass h-1.5 rounded-full transition-all" 
                      style={{ width: `${func.score}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Audit Trail */}
        <Card className="lg:col-span-2 bg-pharos-card border-pharos-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Audit Trail
            </CardTitle>
            <CardDescription>
              Recent governance activity and system events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <div 
                  key={i} 
                  className="flex items-start gap-3 p-3 rounded-lg bg-pharos-bg border border-pharos-border"
                >
                  <div className={`p-1.5 rounded-lg ${
                    activity.type === "policy" ? "bg-pharos-teal/10 text-pharos-teal" :
                    activity.type === "action" ? "bg-pharos-purple/10 text-pharos-purple" :
                    activity.type === "alert" ? "bg-warning/10 text-warning" :
                    activity.type === "report" ? "bg-pharos-gold/10 text-pharos-gold" :
                    "bg-pass/10 text-pass"
                  }`}>
                    {activity.type === "policy" ? <Settings className="w-3 h-3" /> :
                     activity.type === "action" ? <Users className="w-3 h-3" /> :
                     activity.type === "alert" ? <AlertTriangle className="w-3 h-3" /> :
                     activity.type === "report" ? <FileText className="w-3 h-3" /> :
                     <Activity className="w-3 h-3" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">{activity.action}</p>
                      <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.description}</p>
                    <p className="text-xs text-pharos-teal mt-1">by {activity.user}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm text-pharos-teal hover:underline">
              View full audit trail →
            </button>
          </CardContent>
        </Card>

        {/* Active Policies */}
        <Card className="bg-pharos-card border-pharos-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Active Policies
            </CardTitle>
            <CardDescription>
              {activePolicies.length} policies configured
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {activePolicies.map((policy, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-pharos-bg transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white truncate">{policy.name}</p>
                    <Badge 
                      variant="outline" 
                      className={`text-[10px] mt-1 ${
                        policy.status === "enforced" 
                          ? "bg-pass/10 text-pass border-pass/20"
                          : policy.status === "monitoring"
                          ? "bg-warning/10 text-warning border-warning/20"
                          : "bg-pharos-border/50 text-muted-foreground border-pharos-border"
                      }`}
                    >
                      {policy.status}
                    </Badge>
                  </div>
                  {policy.violations > 0 && (
                    <Badge 
                      variant="outline" 
                      className="bg-fail/10 text-fail border-fail/20 text-xs"
                    >
                      {policy.violations}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer CTA */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-pass" />
                <span className="text-sm text-muted-foreground">
                  Last full audit: <span className="text-white">March 15, 2026</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-pharos-teal" />
                <span className="text-sm text-muted-foreground">
                  Next scheduled: <span className="text-white">April 15, 2026</span>
                </span>
              </div>
            </div>
            <button className="px-4 py-2 bg-pharos-teal text-white rounded-lg text-sm font-medium hover:bg-pharos-teal/80 transition-colors">
              Export Compliance Report
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
