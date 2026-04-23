"use client"

import { useState, useCallback, useMemo } from "react"
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  MarkerType,
  type Node,
  type Edge,
  type NodeProps,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AegisFooter } from "@/components/shared"
import {
  Network,
  AlertTriangle,
  Shield,
  Activity,
  ArrowRight,
  Lock,
  ChevronDown,
  ChevronUp,
  Filter,
  Brain,
  BarChart3,
  Zap,
  Users,
  Server,
  Code,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import integrationsData from "@/data/integrations.json"
import toolsData from "@/data/tools.json"

// Types
interface Integration {
  id: string
  name: string
  sourceToolId: string
  targetToolId: string
  integrationType: string
  protocol: string
  authMethod: string
  endpoint: string
  dataDirection: string
  dataTypes: string[]
  syncFrequency: string
  lastSyncTime: string
  status: string
  healthScore: number
  errorRate: number
  avgLatencyMs: number
  dataClassification: string
  encryptionInTransit: boolean
  encryptionAtRest: boolean
  auditLogging: boolean
  owner: string
  lastReviewDate: string
}

interface Tool {
  id: string
  name: string
  vendor: string
  category: string
  subcategory: string
  dataClassification: string
  fedrampStatus: string
  // ... other fields
}

interface SecurityAlert {
  id: string
  type: "unencrypted" | "missing_auth" | "cui_public" | "deprecated"
  severity: "critical" | "high" | "medium" | "low"
  title: string
  description: string
  affectedIntegrations: string[]
  clusterIds: string[]
}

interface ClusterData {
  id: string
  name: string
  icon: typeof Brain
  tools: Tool[]
  integrations: Integration[]
  connectionCount: number
  cuiFlows: number
  healthScore: number
  color: string
}

// Category mapping
const categoryConfig: Record<string, { icon: typeof Brain; color: string; label: string }> = {
  "AI/ML": { icon: Brain, color: "#A78BFA", label: "AI/ML Platform" },
  Analytics: { icon: BarChart3, color: "#3B82F6", label: "Analytics" },
  Automation: { icon: Zap, color: "#E68A3F", label: "Automation" },
  Collaboration: { icon: Users, color: "#60A5FA", label: "Collaboration" },
  Security: { icon: Shield, color: "#22C55E", label: "Security" },
  Developer: { icon: Code, color: "#F472B6", label: "Developer Tools" },
  "Core Systems": { icon: Server, color: "#FBBF24", label: "Core Systems" },
}

// Build clusters from data
function buildClusters(): ClusterData[] {
  const tools = toolsData as Tool[]
  const integrations = integrationsData as Integration[]

  const clusterMap = new Map<string, ClusterData>()

  // Group tools by category
  tools.forEach((tool) => {
    const config = categoryConfig[tool.category]
    if (!config) return

    if (!clusterMap.has(tool.category)) {
      clusterMap.set(tool.category, {
        id: tool.category.toLowerCase().replace(/\//g, "-"),
        name: config.label,
        icon: config.icon,
        tools: [],
        integrations: [],
        connectionCount: 0,
        cuiFlows: 0,
        healthScore: 0,
        color: config.color,
      })
    }
    clusterMap.get(tool.category)!.tools.push(tool)
  })

  // Add a Core Systems cluster for SAP, Oracle, etc.
  clusterMap.set("Core Systems", {
    id: "core-systems",
    name: "Core Systems",
    icon: Server,
    tools: [
      { id: "ERP-001", name: "SAP ERP", vendor: "SAP", category: "Core Systems", subcategory: "ERP", dataClassification: "CUI", fedrampStatus: "authorized" },
      { id: "CRM-001", name: "Salesforce CRM", vendor: "Salesforce", category: "Core Systems", subcategory: "CRM", dataClassification: "CUI", fedrampStatus: "authorized" },
    ] as Tool[],
    integrations: [],
    connectionCount: 0,
    cuiFlows: 0,
    healthScore: 97,
    color: "#FBBF24",
  })

  // Assign integrations to clusters and count connections
  integrations.forEach((integration) => {
    const sourceTool = tools.find((t) => t.id === integration.sourceToolId)
    const sourceCategory = sourceTool?.category || "Core Systems"

    if (clusterMap.has(sourceCategory)) {
      clusterMap.get(sourceCategory)!.integrations.push(integration)
      clusterMap.get(sourceCategory)!.connectionCount++
      if (integration.dataClassification === "CUI" || integration.dataClassification === "Secret") {
        clusterMap.get(sourceCategory)!.cuiFlows++
      }
    }
  })

  // Calculate health scores
  clusterMap.forEach((cluster) => {
    if (cluster.integrations.length > 0) {
      cluster.healthScore = Math.round(
        cluster.integrations.reduce((sum, i) => sum + i.healthScore, 0) / cluster.integrations.length
      )
    } else {
      cluster.healthScore = 100
    }
  })

  return Array.from(clusterMap.values())
}

// Generate security alerts from integration data
function generateSecurityAlerts(): SecurityAlert[] {
  const integrations = integrationsData as Integration[]
  const alerts: SecurityAlert[] = []

  // Check for missing encryption
  const unencrypted = integrations.filter((i) => !i.encryptionInTransit)
  if (unencrypted.length > 0) {
    alerts.push({
      id: "alert-001",
      type: "unencrypted",
      severity: "critical",
      title: "Unencrypted Data in Transit",
      description: `${unencrypted.length} integration(s) transmitting data without TLS encryption`,
      affectedIntegrations: unencrypted.map((i) => i.id),
      clusterIds: [],
    })
  }

  // Check for CUI over public APIs (simulated based on auth method)
  const cuiPublic = integrations.filter(
    (i) => (i.dataClassification === "CUI" || i.dataClassification === "Secret") && i.authMethod === "API Key"
  )
  if (cuiPublic.length > 0) {
    alerts.push({
      id: "alert-002",
      type: "cui_public",
      severity: "high",
      title: "CUI Data via API Key Auth",
      description: `${cuiPublic.length} CUI flow(s) using API key authentication instead of OAuth2/mTLS`,
      affectedIntegrations: cuiPublic.map((i) => i.id),
      clusterIds: ["security", "ai-ml"],
    })
  }

  // Check for high error rates
  const highErrors = integrations.filter((i) => i.errorRate > 1.0)
  if (highErrors.length > 0) {
    alerts.push({
      id: "alert-003",
      type: "deprecated",
      severity: "medium",
      title: "High Error Rate Integrations",
      description: `${highErrors.length} integration(s) with error rate above 1%`,
      affectedIntegrations: highErrors.map((i) => i.id),
      clusterIds: ["automation"],
    })
  }

  // Missing audit logging check
  const noAudit = integrations.filter((i) => !i.auditLogging)
  if (noAudit.length > 0) {
    alerts.push({
      id: "alert-004",
      type: "missing_auth",
      severity: "medium",
      title: "Missing Audit Logging",
      description: `${noAudit.length} integration(s) without audit logging enabled`,
      affectedIntegrations: noAudit.map((i) => i.id),
      clusterIds: [],
    })
  }

  return alerts
}

// Supernode data type
interface SupernodeData extends Record<string, unknown> {
  label: string
  icon: typeof Brain
  color: string
  cluster: ClusterData
  isExpanded: boolean
}

// Custom supernode component
function SupernodeComponent({ data, selected }: NodeProps<Node<SupernodeData>>) {
  const Icon = data.icon as typeof Brain
  const isExpanded = data.isExpanded as boolean
  const cluster = data.cluster as ClusterData
  const color = data.color as string

  return (
    <div
      className={`relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer min-w-[160px] ${
        selected ? "shadow-lg shadow-pharos-blue/30" : ""
      } ${isExpanded ? "min-w-[280px]" : ""}`}
      style={{
        backgroundColor: "#FDFCF8",
        borderColor: selected ? color : `${color}55`,
        boxShadow: selected ? `0 12px 28px ${color}18` : "0 1px 2px rgba(15,15,14,0.06)",
      }}
    >
      <Handle type="target" position={Position.Left} className="!bg-pharos-blue !w-3 !h-3" />
      <Handle type="source" position={Position.Right} className="!bg-pharos-blue !w-3 !h-3" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink">{data.label}</h3>
          <p className="text-xs text-muted-foreground">
            {cluster.tools.length} tools • {cluster.connectionCount} connections
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-2 mt-3">
        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-[var(--ph-surface-sunk)] text-xs">
          <Activity className="w-3 h-3 text-pass" />
          <span className="text-ink">{cluster.healthScore}%</span>
        </div>
        {cluster.cuiFlows > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-pharos-purple/10 text-xs">
            <Lock className="w-3 h-3 text-pharos-purple" />
            <span className="text-pharos-purple">{cluster.cuiFlows} CUI</span>
          </div>
        )}
      </div>

      {/* Expanded tools list */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-pharos-border">
          <p className="text-xs text-muted-foreground mb-2">Tools:</p>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {cluster.tools.slice(0, 6).map((tool) => (
              <div key={tool.id} className="flex items-center justify-between text-xs px-2 py-1 rounded bg-[var(--ph-surface-sunk)]">
                <span className="text-ink truncate">{tool.name}</span>
                {tool.dataClassification === "CUI" && (
                  <Lock className="w-3 h-3 text-pharos-purple flex-shrink-0 ml-1" />
                )}
              </div>
            ))}
            {cluster.tools.length > 6 && (
              <p className="text-xs text-muted-foreground text-center">+{cluster.tools.length - 6} more</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const nodeTypes = {
  supernode: SupernodeComponent,
}

// Classification badge component
function ClassificationBadge({ classification }: { classification: string }) {
  const config: Record<string, { color: string; bg: string }> = {
    CUI: { color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
    Secret: { color: "text-red-500", bg: "bg-red-600/10 border-red-600/20" },
    PII: { color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
    Sensitive: { color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
    Public: { color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
    Internal: { color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  }
  const c = config[classification] || config.Internal
  return (
    <Badge variant="outline" className={`${c.bg} ${c.color} border text-xs`}>
      {classification === "CUI" || classification === "Secret" ? (
        <Lock className="w-3 h-3 mr-1" />
      ) : null}
      {classification}
    </Badge>
  )
}

// Severity badge component
function SeverityBadge({ severity }: { severity: string }) {
  const config: Record<string, { color: string; bg: string; icon: typeof AlertCircle }> = {
    critical: { color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", icon: XCircle },
    high: { color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", icon: AlertTriangle },
    medium: { color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", icon: AlertCircle },
    low: { color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", icon: AlertCircle },
  }
  const c = config[severity] || config.medium
  const Icon = c.icon
  return (
    <Badge variant="outline" className={`${c.bg} ${c.color} border text-xs capitalize`}>
      <Icon className="w-3 h-3 mr-1" />
      {severity}
    </Badge>
  )
}

export default function IntegrationMappingPage() {
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null)
  const [classificationFilter, setClassificationFilter] = useState<string | null>(null)
  const [securityPanelOpen, setSecurityPanelOpen] = useState(true)

  const clusters = useMemo(() => buildClusters(), [])
  const securityAlerts = useMemo(() => generateSecurityAlerts(), [])
  const integrations = integrationsData as Integration[]
  const tools = toolsData as Tool[]

  // Build flow diagram nodes
  const initialNodes: Node[] = useMemo(() => {
    const positions = [
      { x: 100, y: 50 },
      { x: 400, y: 50 },
      { x: 700, y: 50 },
      { x: 100, y: 250 },
      { x: 400, y: 250 },
      { x: 700, y: 250 },
      { x: 400, y: 450 },
    ]

    return clusters.map((cluster, i) => ({
      id: cluster.id,
      type: "supernode",
      position: positions[i % positions.length],
      data: {
        label: cluster.name,
        icon: cluster.icon,
        color: cluster.color,
        cluster,
        isExpanded: selectedCluster === cluster.id,
      },
      selected: selectedCluster === cluster.id,
    }))
  }, [clusters, selectedCluster])

  // Build edges between clusters based on integrations
  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = []
    const edgeMap = new Map<string, { count: number; cuiCount: number; healthSum: number }>()

    integrations.forEach((integration) => {
      const sourceTool = tools.find((t) => t.id === integration.sourceToolId)
      const targetTool = tools.find((t) => t.id === integration.targetToolId)

      const sourceCluster = clusters.find((c) => c.tools.some((t) => t.id === integration.sourceToolId))
      let targetCluster = clusters.find((c) => c.tools.some((t) => t.id === integration.targetToolId))

      // Handle external targets
      if (!targetCluster) {
        targetCluster = clusters.find((c) => c.id === "core-systems")
      }

      if (sourceCluster && targetCluster && sourceCluster.id !== targetCluster.id) {
        const edgeKey = `${sourceCluster.id}-${targetCluster.id}`
        const existing = edgeMap.get(edgeKey) || { count: 0, cuiCount: 0, healthSum: 0 }
        existing.count++
        if (integration.dataClassification === "CUI" || integration.dataClassification === "Secret") {
          existing.cuiCount++
        }
        existing.healthSum += integration.healthScore
        edgeMap.set(edgeKey, existing)
      }
    })

    edgeMap.forEach((data, key) => {
      const [source, target] = key.split("-")
      const avgHealth = data.healthSum / data.count

      let strokeColor = "#22C55E" // green
      if (data.cuiCount > 0) {
        strokeColor = "#A78BFA" // purple for CUI
      }
      if (avgHealth < 90) {
        strokeColor = "#F59E0B" // amber for warning
      }
      if (avgHealth < 80) {
        strokeColor = "#EF4444" // red for concern
      }

      edges.push({
        id: key,
        source,
        target,
        type: "smoothstep",
        animated: data.cuiCount > 0,
        style: {
          stroke: strokeColor,
          strokeWidth: Math.min(2 + data.count, 6),
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: strokeColor,
        },
        label: `${data.count}`,
        labelStyle: { fill: "#fff", fontSize: 10 },
        labelBgStyle: { fill: "#14181C", stroke: strokeColor },
        labelBgPadding: [4, 4] as [number, number],
        labelBgBorderRadius: 4,
      })
    })

    return edges
  }, [clusters, integrations, tools])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedCluster((prev) => (prev === node.id ? null : node.id))
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          data: { ...n.data, isExpanded: n.id === node.id && selectedCluster !== node.id },
          selected: n.id === node.id && selectedCluster !== node.id,
        }))
      )
    },
    [selectedCluster, setNodes]
  )

  // Filter data flows
  const filteredIntegrations = useMemo(() => {
    let filtered = integrations
    if (classificationFilter) {
      filtered = filtered.filter((i) => i.dataClassification === classificationFilter)
    }
    return filtered.slice(0, 10) // Show top 10
  }, [integrations, classificationFilter])

  // Summary stats
  const stats = useMemo(() => {
    const cuiCount = integrations.filter(
      (i) => i.dataClassification === "CUI" || i.dataClassification === "Secret"
    ).length
    return {
      totalIntegrations: integrations.length,
      activeFlows: integrations.filter((i) => i.status === "active").length,
      securityAlerts: securityAlerts.length,
      cuiTouchpoints: cuiCount,
    }
  }, [integrations, securityAlerts])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pharos-blue/10">
              <Network className="h-6 w-6 text-pharos-blue" />
            </div>
            Integration Mapping
          </h1>
          <p className="text-muted-foreground mt-1">
            API connections, data flows, and integration health monitoring
          </p>
        </div>
        <Badge variant="outline" className="bg-pharos-blue/10 text-pharos-blue border-pharos-blue/20">
          <Activity className="w-3 h-3 mr-1" />
          Live Monitoring
        </Badge>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-pharos-card border-pharos-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Integrations</CardTitle>
            <Network className="h-4 w-4 text-pharos-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ink">{stats.totalIntegrations}</div>
            <p className="text-xs text-muted-foreground mt-1">Across {clusters.length} clusters</p>
          </CardContent>
        </Card>

        <Card className="bg-pharos-card border-pharos-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Data Flows</CardTitle>
            <Activity className="h-4 w-4 text-pass" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pass">{stats.activeFlows}</div>
            <p className="text-xs text-muted-foreground mt-1">Real-time synchronized</p>
          </CardContent>
        </Card>

        <Card className="bg-pharos-card border-pharos-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Security Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning flex items-center gap-2">
              {stats.securityAlerts}
              {stats.securityAlerts > 0 && (
                <Badge className="bg-warning/20 text-warning border-0 text-xs">Action Required</Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Requiring review</p>
          </CardContent>
        </Card>

        <Card className="bg-pharos-card border-pharos-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">CUI Touchpoints</CardTitle>
            <Lock className="h-4 w-4 text-pharos-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pharos-purple">{stats.cuiTouchpoints}</div>
            <p className="text-xs text-muted-foreground mt-1">Governed by Aegis</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Connection Diagram */}
        <Card className="lg:col-span-2 bg-pharos-card border-pharos-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-ink">Connection Diagram</CardTitle>
                <CardDescription>Click clusters to expand and see individual tools</CardDescription>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-1 bg-pass rounded" />
                  <span className="text-muted-foreground">Healthy</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-1 bg-pharos-purple rounded" />
                  <span className="text-muted-foreground">CUI Data</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-1 bg-warning rounded" />
                  <span className="text-muted-foreground">Warning</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] border border-pharos-border rounded-lg overflow-hidden bg-pharos-bg">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                nodeTypes={nodeTypes}
                fitView
                attributionPosition="bottom-left"
                proOptions={{ hideAttribution: true }}
                style={{ backgroundColor: "#F8F5EF" }}
              >
                <Background color="rgba(15, 15, 14, 0.08)" gap={20} />
                <Controls className="!bg-pharos-card !border-pharos-border !rounded-lg [&_button]:!bg-pharos-card [&_button]:!border-pharos-border [&_button]:!fill-[#0F0F0E]" />
                <MiniMap
                  className="!bg-pharos-card !border-pharos-border !rounded-lg"
                  nodeColor={(node) => (node.data?.color as string) || "#3B82F6"}
                  maskColor="rgba(246, 244, 238, 0.7)"
                />
              </ReactFlow>
            </div>
          </CardContent>
        </Card>

        {/* Data Flow Panel */}
        <Card className="bg-pharos-card border-pharos-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-ink">Data Flows</CardTitle>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  className="bg-[var(--ph-surface-sunk)] border border-pharos-border rounded px-2 py-1 text-xs text-ink"
                  value={classificationFilter || ""}
                  onChange={(e) => setClassificationFilter(e.target.value || null)}
                >
                  <option value="">All Classifications</option>
                  <option value="CUI">CUI Only</option>
                  <option value="Secret">Secret Only</option>
                  <option value="Public">Public Only</option>
                </select>
              </div>
            </div>
            <CardDescription>Source → Destination data movements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[440px] overflow-y-auto pr-1">
              {filteredIntegrations.map((flow) => (
                <div
                  key={flow.id}
                  className="p-3 rounded-lg bg-[var(--ph-surface-sunk)] border border-pharos-border hover:border-pharos-blue/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-ink truncate">
                      {flow.name.split("→")[0]?.trim() || flow.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-pharos-blue flex-shrink-0" />
                    <span className="text-sm font-medium text-ink truncate">
                      {flow.name.split("→")[1]?.trim() || "Target"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ClassificationBadge classification={flow.dataClassification} />
                      {flow.healthScore >= 95 ? (
                        <CheckCircle2 className="w-4 h-4 text-pass" />
                      ) : flow.healthScore >= 90 ? (
                        <AlertCircle className="w-4 h-4 text-warning" />
                      ) : (
                        <XCircle className="w-4 h-4 text-fail" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{flow.syncFrequency}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Showing {filteredIntegrations.length} of {integrations.length} flows
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Security Alerts Panel */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardHeader
          className="pb-2 cursor-pointer"
          onClick={() => setSecurityPanelOpen(!securityPanelOpen)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-warning" />
              <CardTitle className="text-ink">Security Alerts</CardTitle>
              {securityAlerts.length > 0 && (
                <Badge className="bg-fail/20 text-fail border-0">{securityAlerts.length} Issues</Badge>
              )}
            </div>
            {securityPanelOpen ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <CardDescription>Security concerns requiring attention</CardDescription>
        </CardHeader>
        {securityPanelOpen && (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {securityAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] ${
                    alert.severity === "critical"
                      ? "bg-red-500/5 border-red-500/30 hover:border-red-500/50"
                      : alert.severity === "high"
                      ? "bg-orange-500/5 border-orange-500/30 hover:border-orange-500/50"
                      : "bg-yellow-500/5 border-yellow-500/30 hover:border-yellow-500/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-semibold text-ink">{alert.title}</h4>
                    <SeverityBadge severity={alert.severity} />
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{alert.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Affects {alert.affectedIntegrations.length} integration(s)
                    </span>
                  </div>
                </div>
              ))}
              {securityAlerts.length === 0 && (
                <div className="col-span-2 text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-pass mx-auto mb-3" />
                  <p className="text-ink font-medium">All Clear</p>
                  <p className="text-sm text-muted-foreground">No security concerns detected</p>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Aegis Governance Footer */}
      <AegisFooter />
    </div>
  )
}
