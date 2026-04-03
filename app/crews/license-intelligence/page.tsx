'use client';

import React, { useState, useMemo } from 'react';
import { 
  FileSearch, 
  Shield, 
  DollarSign, 
  Activity, 
  Package,
  X,
  CheckCircle,
  AlertTriangle,
  Users,
  Calendar,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DataTable, 
  MetricCard, 
  MetricCardGrid,
  FedRAMPBadge,
  ComplianceBadge,
  AegisFooter
} from '@/components/shared';
import type { Column } from '@/components/shared/DataTable';
import { 
  getTools, 
  getLatestUsageByTool,
  getIntegrationsByTool,
  calculateTotalSpend,
  calculateFedRAMPCoverage
} from '@/lib/data';
import { formatCurrency, formatPercentage, formatDate } from '@/lib/formatters';
import type { Tool, ToolCategory } from '@/types/data';

// Categories for filtering
const CATEGORIES: ToolCategory[] = ['AI/ML', 'Analytics', 'Automation', 'Collaboration', 'Security', 'Developer'];

// Calculate average utilization from usage data
function calculateAverageUtilization(tools: Tool[]): number {
  let totalUtil = 0;
  let count = 0;
  
  tools.forEach(tool => {
    const usage = getLatestUsageByTool(tool.id);
    if (usage) {
      totalUtil += usage.utilizationRate;
      count++;
    }
  });
  
  return count > 0 ? totalUtil / count : 0;
}

// Get compliance summary
function getComplianceSummary(tools: Tool[]) {
  const certCounts: Record<string, number> = {};
  
  tools.forEach(tool => {
    tool.certifications.forEach(cert => {
      // Normalize certification names
      const normalizedCert = cert.includes('SOC 2') ? 'SOC 2' 
        : cert.includes('ISO 27001') ? 'ISO 27001'
        : cert.includes('HIPAA') ? 'HIPAA'
        : cert.includes('FedRAMP') ? 'FedRAMP'
        : cert.includes('NIST') ? 'NIST 800-53'
        : cert;
      certCounts[normalizedCert] = (certCounts[normalizedCert] || 0) + 1;
    });
  });
  
  return certCounts;
}

// Tool row type with computed fields - using index signature for DataTable compatibility
interface ToolRow extends Tool {
  utilization: number;
  activeUsers: number;
  monthlyCost: number;
  [key: string]: unknown;
}

// Modal component for tool details
function ToolDetailModal({ 
  tool, 
  onClose 
}: { 
  tool: ToolRow | null; 
  onClose: () => void;
}) {
  if (!tool) return null;
  
  const usage = getLatestUsageByTool(tool.id);
  const integrations = getIntegrationsByTool(tool.id);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-pharos-card border border-pharos-border rounded-lg shadow-xl m-4">
        {/* Header */}
        <div className="sticky top-0 bg-pharos-card border-b border-pharos-border p-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {tool.name}
              <FedRAMPBadge status={tool.fedrampStatus} />
            </h2>
            <p className="text-muted-foreground mt-1">{tool.vendor} • {tool.category}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-muted-foreground hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-pharos-bg border border-pharos-border">
              <p className="text-xs text-muted-foreground">Monthly Cost</p>
              <p className="text-lg font-bold text-white">{formatCurrency(tool.monthlyCost, { compact: true })}</p>
            </div>
            <div className="p-4 rounded-lg bg-pharos-bg border border-pharos-border">
              <p className="text-xs text-muted-foreground">Utilization</p>
              <p className={`text-lg font-bold ${
                tool.utilization >= 70 ? 'text-pass' : 
                tool.utilization >= 30 ? 'text-warning' : 
                'text-fail'
              }`}>
                {formatPercentage(tool.utilization, { decimals: 0 })}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-pharos-bg border border-pharos-border">
              <p className="text-xs text-muted-foreground">Active Users</p>
              <p className="text-lg font-bold text-white">{tool.activeUsers.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-lg bg-pharos-bg border border-pharos-border">
              <p className="text-xs text-muted-foreground">Integrations</p>
              <p className="text-lg font-bold text-pharos-teal">{integrations.length}</p>
            </div>
          </div>
          
          {/* License Details */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-pharos-teal" />
              License Details
            </h3>
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-pharos-bg border border-pharos-border">
              <div>
                <p className="text-xs text-muted-foreground">License Model</p>
                <p className="text-sm text-white capitalize">{tool.licenseModel.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="text-sm text-white">{formatCurrency(tool.pricePerUnit, { showCents: true })} / {tool.pricingUnit.split('/')[0]}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Licenses</p>
                <p className="text-sm text-white">{tool.totalLicenses.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Assigned</p>
                <p className="text-sm text-white">{tool.assignedLicenses.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          {/* Contract Info */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-pharos-teal" />
              Contract Information
            </h3>
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-pharos-bg border border-pharos-border">
              <div>
                <p className="text-xs text-muted-foreground">Contract Start</p>
                <p className="text-sm text-white">{formatDate(tool.contractStartDate)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Contract End</p>
                <p className="text-sm text-white">{formatDate(tool.contractEndDate)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Business Owner</p>
                <p className="text-sm text-white">{tool.businessOwner}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Technical Owner</p>
                <p className="text-sm text-white">{tool.technicalOwner}</p>
              </div>
            </div>
          </div>
          
          {/* Features Used */}
          {usage?.featuresUsed && usage.featuresUsed.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-pharos-teal" />
                Features Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {usage.featuresUsed.map((feature) => (
                  <Badge 
                    key={feature}
                    variant="outline"
                    className="bg-pharos-teal/10 text-pharos-teal border-pharos-teal/20"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Compliance Certifications */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-pharos-teal" />
              Compliance Certifications
            </h3>
            <div className="flex flex-wrap gap-2">
              {tool.certifications.map((cert) => (
                <ComplianceBadge 
                  key={cert}
                  certification={cert}
                  status="authorized"
                />
              ))}
              {tool.certifications.length === 0 && (
                <p className="text-sm text-muted-foreground">No certifications on record</p>
              )}
            </div>
          </div>
          
          {/* Security Settings */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3">Security Configuration</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                {tool.ssoEnabled ? (
                  <CheckCircle className="h-4 w-4 text-pass" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-warning" />
                )}
                <span className="text-sm text-muted-foreground">SSO</span>
              </div>
              <div className="flex items-center gap-2">
                {tool.mfaRequired ? (
                  <CheckCircle className="h-4 w-4 text-pass" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-warning" />
                )}
                <span className="text-sm text-muted-foreground">MFA</span>
              </div>
              <div className="flex items-center gap-2">
                {tool.apiAvailable ? (
                  <CheckCircle className="h-4 w-4 text-pass" />
                ) : (
                  <X className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm text-muted-foreground">API</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LicenseIntelligencePage() {
  const [selectedTool, setSelectedTool] = useState<ToolRow | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Get tools with computed fields
  const toolsWithUsage: ToolRow[] = useMemo(() => {
    return getTools().map(tool => {
      const usage = getLatestUsageByTool(tool.id);
      const monthlyCost = usage?.monthlyCost ?? (tool.pricePerUnit * tool.assignedLicenses);
      
      return {
        ...tool,
        utilization: usage?.utilizationRate ?? (tool.assignedLicenses / tool.totalLicenses * 100),
        activeUsers: usage?.activeUsers ?? tool.assignedLicenses,
        monthlyCost
      };
    });
  }, []);
  
  // Filter by category
  const filteredTools = useMemo(() => {
    if (categoryFilter === 'all') return toolsWithUsage;
    return toolsWithUsage.filter(t => t.category === categoryFilter);
  }, [toolsWithUsage, categoryFilter]);
  
  // Calculate metrics
  const totalSpend = useMemo(() => calculateTotalSpend(), []);
  const avgUtilization = useMemo(() => calculateAverageUtilization(toolsWithUsage), [toolsWithUsage]);
  const fedrampCoverage = useMemo(() => calculateFedRAMPCoverage(), []);
  const complianceSummary = useMemo(() => getComplianceSummary(toolsWithUsage), [toolsWithUsage]);
  
  // Table columns
  const columns: Column<ToolRow>[] = [
    {
      key: 'name',
      header: 'Tool Name',
      sortable: true,
      render: (_, row) => (
        <div>
          <span className="font-medium text-white">{row.name}</span>
          <p className="text-xs text-muted-foreground">{row.vendor}</p>
        </div>
      )
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      render: (value) => (
        <Badge variant="outline" className="bg-pharos-teal/10 text-pharos-teal border-pharos-teal/20">
          {String(value)}
        </Badge>
      )
    },
    {
      key: 'licenseModel',
      header: 'License Type',
      sortable: true,
      render: (value) => (
        <span className="text-muted-foreground capitalize">{String(value).replace('_', ' ')}</span>
      )
    },
    {
      key: 'monthlyCost',
      header: 'Monthly Cost',
      sortable: true,
      render: (value) => (
        <span className="text-white font-medium">{formatCurrency(Number(value), { compact: true })}</span>
      )
    },
    {
      key: 'activeUsers',
      header: 'Active Users',
      sortable: true,
      render: (value) => (
        <span className="text-muted-foreground">{Number(value).toLocaleString()}</span>
      )
    },
    {
      key: 'utilization',
      header: 'Utilization',
      sortable: true,
      render: (value) => {
        const util = Number(value);
        const colorClass = util >= 70 ? 'text-pass' : util >= 30 ? 'text-warning' : 'text-fail';
        return (
          <span className={`font-medium ${colorClass}`}>
            {formatPercentage(util, { decimals: 0 })}
          </span>
        );
      }
    },
    {
      key: 'fedrampStatus',
      header: 'Compliance',
      sortable: true,
      render: (_, row) => (
        <FedRAMPBadge status={row.fedrampStatus} />
      )
    }
  ];
  
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
      
      {/* Compliance Dashboard - Metric Cards */}
      <MetricCardGrid columns={4}>
        <MetricCard
          label="Total Tools"
          value={toolsWithUsage.length}
          icon={<Package className="h-5 w-5" />}
          subtitle="Across 6 categories"
        />
        <MetricCard
          label="FedRAMP Authorized"
          value={`${Math.round((fedrampCoverage.authorized / fedrampCoverage.total) * 100)}%`}
          icon={<Shield className="h-5 w-5" />}
          subtitle={`${fedrampCoverage.authorized} of ${fedrampCoverage.total} tools`}
          trend={{
            value: 4,
            direction: 'up',
            label: 'vs last quarter'
          }}
        />
        <MetricCard
          label="Average Utilization"
          value={`${Math.round(avgUtilization)}%`}
          icon={<Activity className="h-5 w-5" />}
          subtitle={avgUtilization < 50 ? 'Optimization opportunity' : 'Healthy usage'}
          valueClassName={avgUtilization < 50 ? 'text-warning' : 'text-pass'}
        />
        <MetricCard
          label="Monthly Spend"
          value={formatCurrency(totalSpend, { compact: true })}
          icon={<DollarSign className="h-5 w-5" />}
          subtitle="All tools combined"
        />
      </MetricCardGrid>
      
      {/* Compliance Badges Summary */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-sm">Compliance Coverage</CardTitle>
          <CardDescription>Certification coverage across tool portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {Object.entries(complianceSummary)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 8)
              .map(([cert, count]) => (
                <div 
                  key={cert}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-pharos-bg border border-pharos-border"
                >
                  <Shield className="h-4 w-4 text-pharos-teal" />
                  <span className="text-sm text-white">{cert}</span>
                  <Badge variant="outline" className="bg-pass/10 text-pass border-pass/20 text-xs">
                    {count} tools
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Category Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground">Filter by category:</span>
        <Button
          variant={categoryFilter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCategoryFilter('all')}
          className={categoryFilter === 'all' ? 'bg-pharos-teal text-white' : ''}
        >
          All
        </Button>
        {CATEGORIES.map(cat => (
          <Button
            key={cat}
            variant={categoryFilter === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategoryFilter(cat)}
            className={categoryFilter === cat ? 'bg-pharos-teal text-white' : ''}
          >
            {cat}
          </Button>
        ))}
      </div>
      
      {/* Tool Inventory Table */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardHeader>
          <CardTitle className="text-white">Tool Inventory</CardTitle>
          <CardDescription>
            Click on any row to view detailed tool information
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={filteredTools}
            columns={columns}
            pageSize={10}
            searchable={true}
            searchPlaceholder="Search by tool name, vendor, or category..."
            onRowClick={(row) => setSelectedTool(row)}
            emptyMessage="No tools found matching your criteria"
          />
        </CardContent>
      </Card>
      
      {/* Tool Detail Modal */}
      {selectedTool && (
        <ToolDetailModal 
          tool={selectedTool} 
          onClose={() => setSelectedTool(null)} 
        />
      )}

      {/* Aegis Governance Footer */}
      <AegisFooter />
    </div>
  );
}
