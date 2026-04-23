'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Activity, 
  Users, 
  Settings,
  Download,
  AlertCircle,
  Lock,
  Server,
  ExternalLink,
  ChevronRight,
  Search,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// =============================================================================
// TYPES
// =============================================================================

type AuditFilterType = 'all' | 'user_actions' | 'system_events' | 'policy_changes' | 'alerts';

interface AuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  actorType: 'user' | 'system' | 'agent';
  action: string;
  target: string;
  targetType: string;
  status: 'success' | 'warning' | 'failed' | 'pending';
  category: AuditFilterType;
  details?: string;
}

interface PolicyItem {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'pending' | 'draft';
  violations: number;
  lastUpdated: string;
  updatedBy: string;
}

interface Certification {
  name: string;
  shortName: string;
  status: 'compliant' | 'in_progress' | 'gap';
  lastAudit: string;
  nextAudit: string;
  coverage: number;
  description: string;
}

interface Risk {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  affectedSystems: number;
  mitigationStatus: string;
}

// =============================================================================
// MOCK DATA
// =============================================================================

const complianceScore = 94;

const nistRmfFunctions = [
  {
    name: 'GOVERN',
    description: 'Policy engine & oversight',
    score: 96,
    icon: Settings,
    details: '23 active policies, 2 pending approval',
    color: 'pharos-purple',
  },
  {
    name: 'MAP',
    description: 'Context & stakeholder mapping',
    score: 92,
    icon: Users,
    details: '47 integrations mapped, 3 pending review',
    color: 'pharos-purple',
  },
  {
    name: 'MEASURE',
    description: 'Metrics & testing',
    score: 94,
    icon: Activity,
    details: '156 metrics tracked, 12 tests scheduled',
    color: 'pharos-purple',
  },
  {
    name: 'MANAGE',
    description: 'Risk mitigation',
    score: 91,
    icon: Shield,
    details: '8 active mitigations, 2 critical risks',
    color: 'pharos-purple',
  },
];

const auditEntries: AuditEntry[] = [
  {
    id: 'AUD-001',
    timestamp: '2026-04-03T04:58:00Z',
    actor: 'admin@caci.com',
    actorType: 'user',
    action: 'Policy Updated',
    target: 'AI-003: Shadow AI Detection',
    targetType: 'Policy',
    status: 'success',
    category: 'policy_changes',
    details: 'Enabled real-time monitoring for unapproved AI tools',
  },
  {
    id: 'AUD-002',
    timestamp: '2026-04-03T04:45:00Z',
    actor: 'Aegis Agent',
    actorType: 'agent',
    action: 'Compliance Scan Complete',
    target: 'All Systems',
    targetType: 'System',
    status: 'success',
    category: 'system_events',
    details: 'Scanned 50 tools, 247 data flows, 0 critical issues',
  },
  {
    id: 'AUD-003',
    timestamp: '2026-04-03T04:32:00Z',
    actor: 'john.smith@caci.com',
    actorType: 'user',
    action: 'Access Revoked',
    target: 'OpenAI GPT-4 API',
    targetType: 'Tool',
    status: 'success',
    category: 'user_actions',
    details: 'User offboarded, removed from 14 AI tools',
  },
  {
    id: 'AUD-004',
    timestamp: '2026-04-03T04:15:00Z',
    actor: 'Aegis Agent',
    actorType: 'agent',
    action: 'Security Alert',
    target: 'claude.ai (Unapproved)',
    targetType: 'Tool',
    status: 'warning',
    category: 'alerts',
    details: 'Shadow AI usage detected: 3 users accessing unapproved tool',
  },
  {
    id: 'AUD-005',
    timestamp: '2026-04-03T03:55:00Z',
    actor: 'ciso@caci.com',
    actorType: 'user',
    action: 'Audit Report Exported',
    target: 'Q1 2026 Compliance Report',
    targetType: 'Report',
    status: 'success',
    category: 'user_actions',
    details: 'PDF export for board review',
  },
  {
    id: 'AUD-006',
    timestamp: '2026-04-03T03:30:00Z',
    actor: 'devops@caci.com',
    actorType: 'user',
    action: 'Integration Added',
    target: 'Snowflake → Anthropic API',
    targetType: 'Integration',
    status: 'pending',
    category: 'system_events',
    details: 'New data flow pending CUI classification review',
  },
  {
    id: 'AUD-007',
    timestamp: '2026-04-03T03:12:00Z',
    actor: 'Aegis Agent',
    actorType: 'agent',
    action: 'Policy Violation',
    target: 'SEC-001: FedRAMP Requirements',
    targetType: 'Policy',
    status: 'failed',
    category: 'alerts',
    details: 'Non-FedRAMP tool detected with CUI access: Notion',
  },
  {
    id: 'AUD-008',
    timestamp: '2026-04-03T02:45:00Z',
    actor: 'System',
    actorType: 'system',
    action: 'Certificate Renewal',
    target: 'SOC 2 Type II',
    targetType: 'Certification',
    status: 'success',
    category: 'system_events',
    details: 'Automated renewal initiated, auditor notified',
  },
  {
    id: 'AUD-009',
    timestamp: '2026-04-03T02:30:00Z',
    actor: 'security@caci.com',
    actorType: 'user',
    action: 'MFA Enforced',
    target: 'GitHub Enterprise',
    targetType: 'Tool',
    status: 'success',
    category: 'policy_changes',
    details: 'Hardware key requirement enabled for all engineers',
  },
  {
    id: 'AUD-010',
    timestamp: '2026-04-03T02:00:00Z',
    actor: 'Aegis Agent',
    actorType: 'agent',
    action: 'Risk Assessment Update',
    target: 'Data Exfiltration Risk',
    targetType: 'Risk',
    status: 'warning',
    category: 'alerts',
    details: 'Risk score increased from medium to high based on tool behavior',
  },
];

const policies: PolicyItem[] = [
  { id: 'POL-001', name: 'AI-001: Approved AI Tools List', category: 'AI Usage', status: 'active', violations: 0, lastUpdated: '2026-03-28', updatedBy: 'ciso@caci.com' },
  { id: 'POL-002', name: 'AI-002: CUI Data Handling', category: 'Data Classification', status: 'active', violations: 0, lastUpdated: '2026-03-25', updatedBy: 'admin@caci.com' },
  { id: 'POL-003', name: 'AI-003: Shadow AI Detection', category: 'AI Usage', status: 'active', violations: 3, lastUpdated: '2026-04-03', updatedBy: 'admin@caci.com' },
  { id: 'POL-004', name: 'SEC-001: FedRAMP Requirements', category: 'Compliance', status: 'active', violations: 8, lastUpdated: '2026-03-20', updatedBy: 'security@caci.com' },
  { id: 'POL-005', name: 'SEC-002: Data Classification', category: 'Data Classification', status: 'active', violations: 2, lastUpdated: '2026-03-15', updatedBy: 'admin@caci.com' },
  { id: 'POL-006', name: 'ACC-001: Role-Based Access', category: 'Access Control', status: 'active', violations: 0, lastUpdated: '2026-03-10', updatedBy: 'security@caci.com' },
  { id: 'POL-007', name: 'AUD-001: Activity Logging', category: 'Audit', status: 'active', violations: 0, lastUpdated: '2026-03-05', updatedBy: 'ciso@caci.com' },
  { id: 'POL-008', name: 'AI-004: Model Governance', category: 'AI Usage', status: 'pending', violations: 0, lastUpdated: '2026-04-01', updatedBy: 'admin@caci.com' },
  { id: 'POL-009', name: 'SEC-003: Encryption Standards', category: 'Compliance', status: 'pending', violations: 0, lastUpdated: '2026-04-02', updatedBy: 'security@caci.com' },
];

const certifications: Certification[] = [
  {
    name: 'FedRAMP Moderate',
    shortName: 'FedRAMP',
    status: 'compliant',
    lastAudit: '2026-01-15',
    nextAudit: '2026-07-15',
    coverage: 92,
    description: 'Federal Risk and Authorization Management Program - Moderate Impact Level',
  },
  {
    name: 'SOC 2 Type II',
    shortName: 'SOC 2',
    status: 'compliant',
    lastAudit: '2026-02-20',
    nextAudit: '2027-02-20',
    coverage: 100,
    description: 'Service Organization Control 2 - Security, Availability, Confidentiality',
  },
  {
    name: 'HIPAA',
    shortName: 'HIPAA',
    status: 'in_progress',
    lastAudit: '2025-11-01',
    nextAudit: '2026-05-01',
    coverage: 78,
    description: 'Health Insurance Portability and Accountability Act Compliance',
  },
  {
    name: 'ISO 27001',
    shortName: 'ISO 27001',
    status: 'compliant',
    lastAudit: '2025-12-10',
    nextAudit: '2026-12-10',
    coverage: 95,
    description: 'Information Security Management System International Standard',
  },
  {
    name: 'NIST 800-53',
    shortName: 'NIST 800-53',
    status: 'compliant',
    lastAudit: '2026-03-01',
    nextAudit: '2026-09-01',
    coverage: 89,
    description: 'Security and Privacy Controls for Information Systems',
  },
  {
    name: 'CMMC Level 2',
    shortName: 'CMMC',
    status: 'in_progress',
    lastAudit: '2026-02-01',
    nextAudit: '2026-06-01',
    coverage: 72,
    description: 'Cybersecurity Maturity Model Certification for DoD Contractors',
  },
];

const risks: Risk[] = [
  {
    id: 'RISK-001',
    severity: 'critical',
    title: 'Non-FedRAMP Tool with CUI Access',
    description: 'Notion workspace contains CUI documents but lacks FedRAMP authorization. Immediate remediation required.',
    affectedSystems: 3,
    mitigationStatus: 'In Progress - Migration to Confluence planned',
  },
  {
    id: 'RISK-002',
    severity: 'high',
    title: 'Shadow AI Usage Detected',
    description: '3 employees using unapproved AI tools (Claude.ai, Perplexity) for work tasks.',
    affectedSystems: 2,
    mitigationStatus: 'Blocking policies being drafted',
  },
  {
    id: 'RISK-003',
    severity: 'high',
    title: 'Expired SSL Certificates',
    description: '2 internal tools have SSL certificates expiring within 7 days.',
    affectedSystems: 2,
    mitigationStatus: 'Renewal scheduled for April 5',
  },
  {
    id: 'RISK-004',
    severity: 'medium',
    title: 'Underutilized Security Tools',
    description: 'CrowdStrike and Splunk showing <40% feature utilization, leaving gaps in coverage.',
    affectedSystems: 2,
    mitigationStatus: 'Training sessions scheduled',
  },
  {
    id: 'RISK-005',
    severity: 'low',
    title: 'MFA Not Enforced on 2 Tools',
    description: 'Jira and Confluence allow password-only authentication for legacy accounts.',
    affectedSystems: 2,
    mitigationStatus: 'Policy update pending approval',
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

function getStatusIcon(status: AuditEntry['status']) {
  switch (status) {
    case 'success': return <CheckCircle className="h-3.5 w-3.5 text-pass" />;
    case 'warning': return <AlertTriangle className="h-3.5 w-3.5 text-warning" />;
    case 'failed': return <XCircle className="h-3.5 w-3.5 text-fail" />;
    case 'pending': return <Clock className="h-3.5 w-3.5 text-pharos-teal" />;
  }
}

function getActionIcon(action: string) {
  if (action.includes('Policy')) return <FileText className="h-3.5 w-3.5" />;
  if (action.includes('Access')) return <Lock className="h-3.5 w-3.5" />;
  if (action.includes('Alert') || action.includes('Violation')) return <AlertCircle className="h-3.5 w-3.5" />;
  if (action.includes('Scan') || action.includes('Assessment')) return <Search className="h-3.5 w-3.5" />;
  if (action.includes('Export') || action.includes('Report')) return <Download className="h-3.5 w-3.5" />;
  if (action.includes('Integration')) return <Server className="h-3.5 w-3.5" />;
  if (action.includes('MFA') || action.includes('Certificate')) return <Shield className="h-3.5 w-3.5" />;
  return <Activity className="h-3.5 w-3.5" />;
}

function getSeverityColor(severity: Risk['severity']) {
  switch (severity) {
    case 'critical': return 'bg-fail/10 text-fail border-fail/20';
    case 'high': return 'bg-warning/10 text-warning border-warning/20';
    case 'medium': return 'bg-pharos-gold/10 text-pharos-gold border-pharos-gold/20';
    case 'low': return 'bg-pharos-teal/10 text-pharos-teal border-pharos-teal/20';
  }
}

function getCertStatusColor(status: Certification['status']) {
  switch (status) {
    case 'compliant': return 'bg-pass/10 text-pass border-pass/20';
    case 'in_progress': return 'bg-warning/10 text-warning border-warning/20';
    case 'gap': return 'bg-fail/10 text-fail border-fail/20';
  }
}

// =============================================================================
// COMPONENTS
// =============================================================================

function AuditFilterButton({ 
  filter, 
  activeFilter, 
  onClick, 
  label, 
  count 
}: { 
  filter: AuditFilterType; 
  activeFilter: AuditFilterType; 
  onClick: () => void; 
  label: string; 
  count: number;
}) {
  const isActive = filter === activeFilter;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
        isActive 
          ? 'bg-pharos-purple/20 text-pharos-purple border border-pharos-purple/30'
          : 'bg-[var(--ph-surface-sunk)] text-muted-foreground border border-pharos-border hover:border-pharos-purple/30 hover:text-ink'
      }`}
    >
      {label}
      <span className={`text-xs ${isActive ? 'text-pharos-purple' : 'text-muted-foreground'}`}>
        {count}
      </span>
    </button>
  );
}

function CertificationCard({ cert }: { cert: Certification }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card 
      className="bg-pharos-card border-pharos-border hover:border-pharos-purple/30 transition-all cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <CardContent className="pt-4 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-pharos-purple" />
            <span className="font-bold text-ink">{cert.shortName}</span>
          </div>
          <Badge variant="outline" className={getCertStatusColor(cert.status)}>
            {cert.status === 'compliant' ? 'Compliant' : cert.status === 'in_progress' ? 'In Progress' : 'Gap'}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Coverage</span>
            <span className={`font-medium ${
              cert.coverage >= 90 ? 'text-pass' : cert.coverage >= 70 ? 'text-warning' : 'text-fail'
            }`}>
              {cert.coverage}%
            </span>
          </div>
          <div className="w-full bg-pharos-border rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full transition-all ${
                cert.coverage >= 90 ? 'bg-pass' : cert.coverage >= 70 ? 'bg-warning' : 'bg-fail'
              }`}
              style={{ width: `${cert.coverage}%` }}
            />
          </div>
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-muted-foreground">Last Audit</span>
            <p className="text-ink">{formatDate(cert.lastAudit)}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Next Audit</span>
            <p className="text-ink">{formatDate(cert.nextAudit)}</p>
          </div>
        </div>
        
        {expanded && (
          <div className="mt-3 pt-3 border-t border-pharos-border">
            <p className="text-xs text-muted-foreground">{cert.description}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 text-xs"
              onClick={(e) => { e.stopPropagation(); }}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              View Details
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function GovernancePage() {
  const [auditFilter, setAuditFilter] = useState<AuditFilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [policyCategory, setPolicyCategory] = useState<string>('all');
  const [exportToast, setExportToast] = useState<string | null>(null);

  // Handle export button clicks with mock toast
  const handleExport = useCallback((reportType: string) => {
    setExportToast(`${reportType} queued — report will be delivered to your email within 5 minutes`);
    setTimeout(() => setExportToast(null), 4000);
  }, []);
  
  // Filter audit entries
  const filteredAuditEntries = useMemo(() => {
    let entries = auditEntries;
    if (auditFilter !== 'all') {
      entries = entries.filter(e => e.category === auditFilter);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      entries = entries.filter(e => 
        e.action.toLowerCase().includes(query) ||
        e.target.toLowerCase().includes(query) ||
        e.actor.toLowerCase().includes(query) ||
        (e.details?.toLowerCase().includes(query))
      );
    }
    return entries;
  }, [auditFilter, searchQuery]);
  
  // Calculate audit counts per category
  const auditCounts = useMemo(() => ({
    all: auditEntries.length,
    user_actions: auditEntries.filter(e => e.category === 'user_actions').length,
    system_events: auditEntries.filter(e => e.category === 'system_events').length,
    policy_changes: auditEntries.filter(e => e.category === 'policy_changes').length,
    alerts: auditEntries.filter(e => e.category === 'alerts').length,
  }), []);
  
  // Filter policies
  const filteredPolicies = useMemo(() => {
    if (policyCategory === 'all') return policies;
    return policies.filter(p => p.category === policyCategory);
  }, [policyCategory]);
  
  // Calculate policy stats
  const policyStats = useMemo(() => ({
    active: policies.filter(p => p.status === 'active').length,
    pending: policies.filter(p => p.status === 'pending').length,
    totalViolations: policies.reduce((sum, p) => sum + p.violations, 0),
  }), []);
  
  // Calculate risk counts
  const riskCounts = useMemo(() => ({
    critical: risks.filter(r => r.severity === 'critical').length,
    high: risks.filter(r => r.severity === 'high').length,
    medium: risks.filter(r => r.severity === 'medium').length,
    low: risks.filter(r => r.severity === 'low').length,
  }), []);
  
  const policyCategories = ['all', 'Access Control', 'Data Classification', 'AI Usage', 'Audit', 'Compliance'];
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pharos-purple/10">
              <Shield className="h-6 w-6 text-pharos-purple" />
            </div>
            Aegis Governance
          </h1>
          <p className="text-muted-foreground mt-1">
            NIST AI RMF compliance, policy enforcement, and continuous audit trail
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
      <Card className="bg-gradient-to-br from-pharos-card to-pharos-purple/5 border-pharos-purple/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Overall Compliance Score</p>
              <div className="flex items-baseline gap-3">
                <span className="text-6xl font-bold text-pharos-purple">{complianceScore}%</span>
                <Badge variant="outline" className="bg-pass/10 text-pass border-pass/20">
                  <Activity className="w-3 h-3 mr-1" />
                  +8% this quarter
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                NIST AI RMF aligned • FedRAMP Moderate ready • Continuous monitoring active
              </p>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-ink">50</p>
                <p className="text-xs text-muted-foreground">Tools Governed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-ink">247</p>
                <p className="text-xs text-muted-foreground">Data Flows</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-warning">{policyStats.totalViolations}</p>
                <p className="text-xs text-muted-foreground">Policy Violations</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-pharos-teal">{auditEntries.length}</p>
                <p className="text-xs text-muted-foreground">Audit Events Today</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* NIST AI RMF Functions */}
      <div>
        <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-pharos-purple" />
          NIST AI RMF Functions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {nistRmfFunctions.map((func) => (
            <Card 
              key={func.name} 
              className="bg-pharos-card border-pharos-border hover:border-pharos-purple/30 transition-colors"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-pharos-purple/10">
                    <func.icon className="h-4 w-4 text-pharos-purple" />
                  </div>
                  <Badge variant="outline" className="bg-pass/10 text-pass border-pass/20 text-xs">
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-bold text-ink text-lg">{func.name}</h3>
                <p className="text-xs text-muted-foreground">{func.description}</p>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Compliance</span>
                    <span className={`font-bold ${
                      func.score >= 90 ? 'text-pass' : func.score >= 70 ? 'text-warning' : 'text-fail'
                    }`}>
                      {func.score}%
                    </span>
                  </div>
                  <div className="w-full bg-pharos-border rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        func.score >= 90 ? 'bg-pharos-purple' : func.score >= 70 ? 'bg-warning' : 'bg-fail'
                      }`}
                      style={{ width: `${func.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{func.details}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content Grid: Audit Trail + Policy Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Audit Trail - 2 columns */}
        <Card className="lg:col-span-2 bg-pharos-card border-pharos-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-ink flex items-center gap-2">
                  <Clock className="h-4 w-4 text-pharos-purple" />
                  Audit Trail
                </CardTitle>
                <CardDescription>
                  Comprehensive activity log with full traceability
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => handleExport('Audit Log export')}
              >
                <Download className="h-4 w-4" />
                Export Log
              </Button>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <AuditFilterButton 
                filter="all" 
                activeFilter={auditFilter} 
                onClick={() => setAuditFilter('all')} 
                label="All" 
                count={auditCounts.all} 
              />
              <AuditFilterButton 
                filter="user_actions" 
                activeFilter={auditFilter} 
                onClick={() => setAuditFilter('user_actions')} 
                label="User Actions" 
                count={auditCounts.user_actions} 
              />
              <AuditFilterButton 
                filter="system_events" 
                activeFilter={auditFilter} 
                onClick={() => setAuditFilter('system_events')} 
                label="System Events" 
                count={auditCounts.system_events} 
              />
              <AuditFilterButton 
                filter="policy_changes" 
                activeFilter={auditFilter} 
                onClick={() => setAuditFilter('policy_changes')} 
                label="Policy Changes" 
                count={auditCounts.policy_changes} 
              />
              <AuditFilterButton 
                filter="alerts" 
                activeFilter={auditFilter} 
                onClick={() => setAuditFilter('alerts')} 
                label="Alerts" 
                count={auditCounts.alerts} 
              />
            </div>
            
            {/* Search */}
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search audit entries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[var(--ph-surface-sunk)] border border-pharos-border rounded-lg text-sm text-ink placeholder:text-muted-foreground focus:outline-none focus:border-pharos-purple/50"
              />
            </div>
          </CardHeader>
          <CardContent className="max-h-[500px] overflow-y-auto">
            <div className="space-y-2">
              {filteredAuditEntries.map((entry) => (
                <div 
                  key={entry.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[var(--ph-surface-sunk)] border border-pharos-border hover:border-pharos-purple/20 transition-colors"
                >
                  <div className={`p-1.5 rounded-lg ${
                    entry.status === 'success' ? 'bg-pass/10 text-pass' :
                    entry.status === 'warning' ? 'bg-warning/10 text-warning' :
                    entry.status === 'failed' ? 'bg-fail/10 text-fail' :
                    'bg-pharos-teal/10 text-pharos-teal'
                  }`}>
                    {getActionIcon(entry.action)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-ink">{entry.action}</p>
                        {getStatusIcon(entry.status)}
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatTimestamp(entry.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-pharos-teal mt-0.5 truncate">{entry.target}</p>
                    {entry.details && (
                      <p className="text-xs text-muted-foreground mt-1">{entry.details}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        entry.actorType === 'user' ? 'bg-pharos-teal/10 text-pharos-teal' :
                        entry.actorType === 'agent' ? 'bg-pharos-purple/10 text-pharos-purple' :
                        'bg-pharos-border text-muted-foreground'
                      }`}>
                        {entry.actorType === 'agent' ? '🤖' : entry.actorType === 'user' ? '👤' : '⚙️'} {entry.actor}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {filteredAuditEntries.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No audit entries match your filters</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Policy Status Panel */}
        <Card className="bg-pharos-card border-pharos-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-ink flex items-center gap-2">
              <FileText className="h-4 w-4 text-pharos-purple" />
              Policy Status
            </CardTitle>
            <CardDescription>
              {policyStats.active} active policies, {policyStats.pending} pending approval
            </CardDescription>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="p-2 rounded-lg bg-pass/10 text-center">
                <p className="text-lg font-bold text-pass">{policyStats.active}</p>
                <p className="text-[10px] text-muted-foreground">Active</p>
              </div>
              <div className="p-2 rounded-lg bg-warning/10 text-center">
                <p className="text-lg font-bold text-warning">{policyStats.pending}</p>
                <p className="text-[10px] text-muted-foreground">Pending</p>
              </div>
              <div className="p-2 rounded-lg bg-fail/10 text-center">
                <p className="text-lg font-bold text-fail">{policyStats.totalViolations}</p>
                <p className="text-[10px] text-muted-foreground">Violations</p>
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-1 mt-3">
              {policyCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPolicyCategory(cat)}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    policyCategory === cat
                      ? 'bg-pharos-purple/20 text-pharos-purple'
                      : 'bg-[var(--ph-surface-sunk)] text-muted-foreground hover:text-ink'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-y-auto">
            <div className="space-y-2">
              {filteredPolicies.map((policy) => (
                <div 
                  key={policy.id}
                  className="p-2.5 rounded-lg bg-[var(--ph-surface-sunk)] border border-pharos-border hover:border-pharos-purple/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-ink truncate">{policy.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant="outline" 
                          className={`text-[10px] ${
                            policy.status === 'active' 
                              ? 'bg-pass/10 text-pass border-pass/20'
                              : 'bg-warning/10 text-warning border-warning/20'
                          }`}
                        >
                          {policy.status}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">{policy.category}</span>
                      </div>
                    </div>
                    {policy.violations > 0 && (
                      <Badge variant="outline" className="bg-fail/10 text-fail border-fail/20 text-xs">
                        {policy.violations}
                      </Badge>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1.5">
                    Updated {formatDate(policy.lastUpdated)} by {policy.updatedBy.split('@')[0]}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Certifications Grid */}
      <div>
        <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-pharos-purple" />
          Compliance Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert) => (
            <CertificationCard key={cert.shortName} cert={cert} />
          ))}
        </div>
      </div>

      {/* Risk Summary */}
      <div>
        <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-pharos-purple" />
          Risk Summary
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Risk Counts */}
          <Card className="bg-pharos-card border-pharos-border">
            <CardContent className="pt-4">
              <h3 className="text-sm font-medium text-ink mb-3">Active Risks by Severity</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded bg-fail/10">
                  <span className="text-xs text-fail font-medium">Critical</span>
                  <span className="text-lg font-bold text-fail">{riskCounts.critical}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-warning/10">
                  <span className="text-xs text-warning font-medium">High</span>
                  <span className="text-lg font-bold text-warning">{riskCounts.high}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-pharos-gold/10">
                  <span className="text-xs text-pharos-gold font-medium">Medium</span>
                  <span className="text-lg font-bold text-pharos-gold">{riskCounts.medium}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-pharos-teal/10">
                  <span className="text-xs text-pharos-teal font-medium">Low</span>
                  <span className="text-lg font-bold text-pharos-teal">{riskCounts.low}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Top Risks */}
          <Card className="lg:col-span-3 bg-pharos-card border-pharos-border">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-ink">Top Priority Risks</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-pharos-teal hover:text-ink"
                  onClick={() => window.location.href = '/crews/integration-mapping'}
                >
                  View Integration Mapping
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              <div className="space-y-3">
                {risks.slice(0, 3).map((risk) => (
                  <div 
                    key={risk.id}
                    className="p-3 rounded-lg bg-[var(--ph-surface-sunk)] border border-pharos-border"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={`text-xs ${getSeverityColor(risk.severity)}`}>
                            {risk.severity.toUpperCase()}
                          </Badge>
                          <span className="text-sm font-medium text-ink">{risk.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{risk.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-muted-foreground">
                            <Server className="h-3 w-3 inline mr-1" />
                            {risk.affectedSystems} systems affected
                          </span>
                          <span className="text-xs text-pharos-teal">
                            {risk.mitigationStatus}
                          </span>
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

      {/* Footer CTA */}
      <Card className="bg-pharos-card border-pharos-purple/20">
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-pass" />
                <span className="text-sm text-muted-foreground">
                  Last full audit: <span className="text-ink font-medium">March 15, 2026</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-pharos-purple" />
                <span className="text-sm text-muted-foreground">
                  Next scheduled: <span className="text-ink font-medium">April 15, 2026</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-pharos-teal" />
                <span className="text-sm text-muted-foreground">
                  Monitoring: <span className="text-pass font-medium">Active</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => handleExport('Audit Log export')}
              >
                <Download className="h-4 w-4" />
                Export Audit Log
              </Button>
              <Button 
                className="bg-pharos-purple hover:bg-pharos-purple/80 gap-2"
                onClick={() => handleExport('Compliance Report')}
              >
                <FileText className="h-4 w-4" />
                Generate Compliance Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Toast Notification */}
      {exportToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="bg-pharos-card border border-pass/30 rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-md">
            <div className="p-2 rounded-full bg-pass/10">
              <CheckCircle className="h-5 w-5 text-pass" />
            </div>
            <div>
              <p className="text-sm font-medium text-ink">Export Started</p>
              <p className="text-xs text-muted-foreground">{exportToast}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
