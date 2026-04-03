'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  AlertTriangle, 
  Calendar,
  ArrowRight,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AegisFooter } from '@/components/shared';
import { ChartContainer } from '@/components/shared/ChartContainer';
import { MetricCard, MetricCardGrid } from '@/components/shared/MetricCard';
import {
  getTools,
  calculateTotalSpend,
  calculateSpendByCategory,
  calculateToolMonthlySpend
} from '@/lib/data';
import { formatCurrency, formatDate } from '@/lib/formatters';
import type { Tool } from '@/types/data';

// Pharos color palette
const PHAROS_COLORS = {
  teal: '#1FB6B8',
  gold: '#E68A3F',
  purple: '#A78BFA',
  pass: '#22C55E',
  fail: '#EF4444',
  warning: '#F59E0B',
  muted: '#8A929C',
};

// Category colors
const CATEGORY_COLORS: Record<string, string> = {
  'AI/ML': PHAROS_COLORS.teal,
  'Analytics': PHAROS_COLORS.gold,
  'Automation': PHAROS_COLORS.purple,
  'Collaboration': '#60A5FA',
  'Security': '#F472B6',
  'Developer': '#34D399',
};

// Generate 12-month spend trend data
function generateSpendTrend() {
  const baseMonthlySpend = 2_400_000; // $2.4M
  const months = [
    'Apr 25', 'May 25', 'Jun 25', 'Jul 25', 'Aug 25', 'Sep 25',
    'Oct 25', 'Nov 25', 'Dec 25', 'Jan 26', 'Feb 26', 'Mar 26'
  ];
  
  // Simulate slight growth over time with some variation
  return months.map((month, index) => {
    const growthFactor = 1 + (index * 0.008); // ~1% monthly growth
    const variation = 1 + (Math.sin(index * 0.5) * 0.03); // ±3% variation
    const spend = Math.round(baseMonthlySpend * growthFactor * variation);
    
    // AI spend is about 20% of total
    const aiSpend = Math.round(spend * 0.20 * (1 + index * 0.02));
    
    return {
      month,
      total: spend,
      aiTools: aiSpend,
      traditional: spend - aiSpend,
    };
  });
}

// Calculate metrics from data
function calculateOptimizationMetrics() {
  const tools = getTools();
  const totalSpend = calculateTotalSpend();
  
  // Calculate AI/ML spend
  const aiTools = tools.filter(t => t.category === 'AI/ML');
  const aiSpend = aiTools.reduce((sum, tool) => sum + calculateToolMonthlySpend(tool), 0);
  
  // Calculate waste from underutilized licenses
  let identifiedWaste = 0;
  tools.forEach(tool => {
    if (tool.licenseModel !== 'consumption' && tool.licenseModel !== 'enterprise') {
      const unusedLicenses = tool.totalLicenses - tool.assignedLicenses;
      const wastePerLicense = tool.pricingUnit.includes('year') 
        ? tool.pricePerUnit / 12 
        : tool.pricePerUnit;
      identifiedWaste += unusedLicenses * wastePerLicense;
    }
  });
  
  // Add estimated waste from low utilization
  identifiedWaste += totalSpend * 0.15; // Assume 15% additional waste from low engagement
  
  // Calculate average utilization
  let totalUtil = 0;
  let countUtil = 0;
  tools.forEach(tool => {
    if (tool.licenseModel !== 'consumption' && tool.licenseModel !== 'enterprise') {
      totalUtil += (tool.assignedLicenses / tool.totalLicenses) * 100;
      countUtil++;
    }
  });
  const avgUtilization = countUtil > 0 ? Math.round(totalUtil / countUtil) : 0;
  
  return {
    totalSpend,
    aiSpend,
    identifiedWaste,
    avgUtilization,
    aiSpendPercent: Math.round((aiSpend / totalSpend) * 100),
    wastePercent: Math.round((identifiedWaste / totalSpend) * 100),
  };
}

// Generate optimization recommendations
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateRecommendations(_tools: Tool[]) {
  // In production, analyze tools to generate dynamic recommendations
  const recommendations = [
    {
      id: 1,
      title: 'Consolidate BI Tools',
      description: 'You have 3 overlapping BI tools (Power BI, Tableau, Looker). Standardize on Power BI with existing Microsoft licensing.',
      savings: 180000,
      effort: 'Medium' as const,
      priority: 'High' as const,
      category: 'Consolidation',
    },
    {
      id: 2,
      title: 'Reclaim Unused Tableau Licenses',
      description: '52 Creator licenses inactive for 90+ days. Downgrade to Viewer or reclaim.',
      savings: 47000,
      effort: 'Low' as const,
      priority: 'High' as const,
      category: 'License Optimization',
    },
    {
      id: 3,
      title: 'Right-size Automation Platforms',
      description: 'Running both UiPath and Automation Anywhere. Consolidate RPA to single platform.',
      savings: 156000,
      effort: 'High' as const,
      priority: 'Medium' as const,
      category: 'Consolidation',
    },
    {
      id: 4,
      title: 'Switch to Annual Billing',
      description: '12 tools on monthly billing could save 15-20% with annual commitment.',
      savings: 35000,
      effort: 'Low' as const,
      priority: 'Medium' as const,
      category: 'Contract Terms',
    },
    {
      id: 5,
      title: 'Eliminate Overlapping Project Tools',
      description: 'Asana, Monday.com, and Jira all used for project management. Standardize on Jira.',
      savings: 85000,
      effort: 'Medium' as const,
      priority: 'Medium' as const,
      category: 'Consolidation',
    },
    {
      id: 6,
      title: 'Renegotiate Slack Contract',
      description: 'Current pricing above market rate. Leverage Teams overlap for negotiation.',
      savings: 72000,
      effort: 'Low' as const,
      priority: 'High' as const,
      category: 'Contract Terms',
    },
  ];
  
  return recommendations.sort((a, b) => {
    const priorityOrder = { High: 0, Medium: 1, Low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

// Get upcoming renewals
function getUpcomingRenewals(tools: Tool[]) {
  const now = new Date();
  const ninetyDaysLater = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
  
  const renewals = tools
    .filter(tool => {
      const endDate = new Date(tool.contractEndDate);
      return endDate >= now && endDate <= ninetyDaysLater;
    })
    .map(tool => {
      const monthlySpend = calculateToolMonthlySpend(tool);
      const annualValue = monthlySpend * 12;
      const utilization = tool.licenseModel !== 'consumption' && tool.licenseModel !== 'enterprise'
        ? (tool.assignedLicenses / tool.totalLicenses) * 100
        : 100;
      
      let action: 'Renew' | 'Renegotiate' | 'Consolidate' | 'Cancel' = 'Renew';
      if (utilization < 50) action = 'Cancel';
      else if (utilization < 70) action = 'Renegotiate';
      else if (tool.category === 'Analytics' || tool.category === 'Collaboration') action = 'Consolidate';
      
      return {
        tool: tool.name,
        date: tool.contractEndDate,
        amount: annualValue,
        action,
        utilization: Math.round(utilization),
      };
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return renewals.slice(0, 6);
}

// Custom tooltip for charts
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload || !payload.length) return null;
  
  return (
    <div className="rounded-lg border border-pharos-border bg-pharos-card p-3 shadow-lg">
      <p className="text-sm font-medium text-white mb-2">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div 
            className="h-3 w-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-medium text-white">
            {formatCurrency(entry.value, { compact: true })}
          </span>
        </div>
      ))}
    </div>
  );
}

// Effort badge component
function EffortBadge({ effort }: { effort: 'Low' | 'Medium' | 'High' }) {
  const colors = {
    Low: 'bg-pass/10 text-pass border-pass/20',
    Medium: 'bg-warning/10 text-warning border-warning/20',
    High: 'bg-fail/10 text-fail border-fail/20',
  };
  
  return (
    <Badge variant="outline" className={colors[effort]}>
      {effort} Effort
    </Badge>
  );
}

// Priority badge component
function PriorityBadge({ priority }: { priority: 'High' | 'Medium' | 'Low' }) {
  const colors = {
    High: 'bg-fail/10 text-fail border-fail/20',
    Medium: 'bg-warning/10 text-warning border-warning/20',
    Low: 'bg-pharos-border/50 text-muted-foreground border-pharos-border',
  };
  
  return (
    <Badge variant="outline" className={colors[priority]}>
      {priority}
    </Badge>
  );
}

// Action badge component
function ActionBadge({ action }: { action: 'Renew' | 'Renegotiate' | 'Consolidate' | 'Cancel' }) {
  const colors = {
    Renew: 'bg-pass/10 text-pass border-pass/20',
    Renegotiate: 'bg-warning/10 text-warning border-warning/20',
    Consolidate: 'bg-pharos-gold/10 text-pharos-gold border-pharos-gold/20',
    Cancel: 'bg-fail/10 text-fail border-fail/20',
  };
  
  const icons = {
    Renew: <CheckCircle className="h-3 w-3" />,
    Renegotiate: <AlertTriangle className="h-3 w-3" />,
    Consolidate: <Zap className="h-3 w-3" />,
    Cancel: <TrendingDown className="h-3 w-3" />,
  };
  
  return (
    <Badge variant="outline" className={`flex items-center gap-1 ${colors[action]}`}>
      {icons[action]}
      {action}
    </Badge>
  );
}

export default function ToolOptimizationPage() {
  const [exportToast, setExportToast] = useState<string | null>(null);

  // Handle export/report button clicks with mock toast
  const handleExport = useCallback((reportType: string) => {
    setExportToast(`${reportType} queued — report will be delivered to your email within 5 minutes`);
    setTimeout(() => setExportToast(null), 4000);
  }, []);

  // Calculate all data
  const tools = useMemo(() => getTools(), []);
  const metrics = useMemo(() => calculateOptimizationMetrics(), []);
  const spendTrend = useMemo(() => generateSpendTrend(), []);
  const categorySpend = useMemo(() => calculateSpendByCategory(), []);
  const recommendations = useMemo(() => generateRecommendations(tools), [tools]);
  const renewals = useMemo(() => getUpcomingRenewals(tools), [tools]);
  
  // Transform category spend for pie chart
  const categoryData = useMemo(() => {
    return Object.entries(categorySpend).map(([category, spend]) => ({
      name: category,
      value: spend,
      color: CATEGORY_COLORS[category] || PHAROS_COLORS.muted,
    }));
  }, [categorySpend]);
  
  // Calculate total potential savings
  const totalSavings = recommendations.reduce((sum, r) => sum + r.savings, 0);
  const quickWins = recommendations
    .filter(r => r.effort === 'Low')
    .reduce((sum, r) => sum + r.savings, 0);
  
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

      {/* Spend Overview Cards */}
      <MetricCardGrid columns={4}>
        <MetricCard
          label="Total Monthly Spend"
          value={formatCurrency(metrics.totalSpend, { compact: true })}
          icon={<DollarSign className="h-5 w-5" />}
          trend={{
            value: 12,
            direction: 'up',
            label: 'YoY'
          }}
        />
        <MetricCard
          label="AI Tool Spend"
          value={formatCurrency(metrics.aiSpend, { compact: true })}
          icon={<Zap className="h-5 w-5" />}
          subtitle={`${metrics.aiSpendPercent}% of total`}
          valueClassName="text-pharos-teal"
        />
        <MetricCard
          label="Identified Waste"
          value={formatCurrency(metrics.identifiedWaste, { compact: true })}
          icon={<TrendingDown className="h-5 w-5" />}
          subtitle={`${metrics.wastePercent}% recoverable`}
          valueClassName="text-warning"
        />
        <MetricCard
          label="Average Utilization"
          value={`${metrics.avgUtilization}%`}
          icon={<AlertTriangle className="h-5 w-5" />}
          subtitle="vs 60% target"
          valueClassName={metrics.avgUtilization < 50 ? 'text-warning' : 'text-pass'}
        />
      </MetricCardGrid>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spend Trend Chart */}
        <ChartContainer
          title="Spend Trend (12 months)"
          subtitle="Monthly software spend breakdown"
          className="lg:col-span-2"
          height={320}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={spendTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2E3338" />
              <XAxis 
                dataKey="month" 
                stroke="#8A929C" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#8A929C" 
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: 10 }}
                iconType="circle"
              />
              <Line
                type="monotone"
                dataKey="total"
                name="Total Spend"
                stroke={PHAROS_COLORS.gold}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: PHAROS_COLORS.gold }}
              />
              <Line
                type="monotone"
                dataKey="aiTools"
                name="AI Tools"
                stroke={PHAROS_COLORS.teal}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: PHAROS_COLORS.teal }}
              />
              <Line
                type="monotone"
                dataKey="traditional"
                name="Traditional"
                stroke={PHAROS_COLORS.purple}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: PHAROS_COLORS.purple }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Category Breakdown */}
        <ChartContainer
          title="Spend by Category"
          subtitle="Monthly distribution"
          height={320}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null;
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-pharos-border bg-pharos-card p-3 shadow-lg">
                      <p className="text-sm font-medium text-white">{data.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(data.value, { compact: true })}
                      </p>
                    </div>
                  );
                }}
              />
              <Legend
                layout="vertical"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 20 }}
                formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Recommendations and Renewals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Optimization Recommendations */}
        <Card className="lg:col-span-2 bg-pharos-card border-pharos-border">
          <CardHeader>
            <CardTitle className="text-white">Optimization Recommendations</CardTitle>
            <CardDescription>
              AI-identified opportunities for cost savings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.slice(0, 5).map((rec) => (
                <div 
                  key={rec.id} 
                  className="p-4 rounded-lg bg-pharos-bg border border-pharos-border hover:border-pharos-gold/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-medium text-white">{rec.title}</h3>
                        <PriorityBadge priority={rec.priority} />
                        <EffortBadge effort={rec.effort} />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs">
                        <span className="text-muted-foreground">
                          Category: <span className="text-white">{rec.category}</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-bold text-pass">
                        {formatCurrency(rec.savings, { compact: true })}
                        <span className="text-xs font-normal text-muted-foreground">/yr</span>
                      </p>
                      <p className="text-xs text-muted-foreground">potential savings</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {recommendations.length > 5 && (
              <button className="w-full mt-4 py-2 text-sm text-pharos-teal hover:text-pharos-teal/80 flex items-center justify-center gap-1">
                View all {recommendations.length} recommendations
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
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
              {renewals.length > 0 ? (
                renewals.map((renewal, i) => (
                  <div 
                    key={i} 
                    className="p-3 rounded-lg bg-pharos-bg border border-pharos-border hover:border-pharos-border/80 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-white font-medium">{renewal.tool}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">
                            {formatDate(renewal.date, { format: 'medium' })}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Utilization: {renewal.utilization}%
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-white">
                          {formatCurrency(renewal.amount, { compact: true })}
                        </p>
                        <div className="mt-1">
                          <ActionBadge action={renewal.action} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-8 w-8 text-pass mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No renewals in next 90 days</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Card */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-pass" />
                <span className="text-muted-foreground">Total Savings Identified:</span>
                <span className="text-pass font-bold">{formatCurrency(totalSavings, { compact: true })}/year</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-pharos-gold" />
                <span className="text-muted-foreground">Quick Wins (Low Effort):</span>
                <span className="text-white font-medium">{formatCurrency(quickWins, { compact: true })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-pharos-teal" />
                <span className="text-muted-foreground">Renewals This Quarter:</span>
                <span className="text-white font-medium">{renewals.length}</span>
              </div>
            </div>
            <button 
              className="px-4 py-2 bg-pharos-gold text-white rounded-lg text-sm font-medium hover:bg-pharos-gold/80 transition-colors"
              onClick={() => handleExport('Optimization Report')}
            >
              Generate Report
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Aegis Governance Footer */}
      <AegisFooter />

      {/* Export Toast Notification */}
      {exportToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="bg-pharos-card border border-pass/30 rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-md">
            <div className="p-2 rounded-full bg-pass/10">
              <CheckCircle className="h-5 w-5 text-pass" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Report Started</p>
              <p className="text-xs text-muted-foreground">{exportToast}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
