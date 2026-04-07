'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  LayoutDashboard,
  DollarSign,
  TrendingUp,
  Users,
  Shield,
  Target,
  Activity,
  Briefcase,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MetricCard, MetricCardGrid } from '@/components/shared/MetricCard';
import { ChartContainer } from '@/components/shared/ChartContainer';
import { DataTable } from '@/components/shared/DataTable';
import type { Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { AegisFooter } from '@/components/shared';

// --- Data ---

const financialData = [
  { metric: 'Revenue', value: 8.6 },
  { metric: 'Qualified Pipeline', value: 15.0 },
  { metric: 'Funded Backlog', value: 11.4 },
  { metric: 'New Awards YTD', value: 6.8 },
];

const workforceData = [
  { metric: 'Billable Utilization', value: 76.3 },
  { metric: 'OTD Rate', value: 91.2 },
  { metric: 'Cleared Workforce %', value: 64 },
  { metric: 'Critical Skill Vacancy', value: 4.8 },
];

function getWorkforceBarColor(metric: string): string {
  switch (metric) {
    case 'OTD Rate':
      return '#22C55E';
    case 'Billable Utilization':
      return '#E68A3F';
    case 'Cleared Workforce %':
      return '#3B82F6';
    case 'Critical Skill Vacancy':
      return '#EF4444';
    default:
      return '#E68A3F';
  }
}

interface ExecutiveModuleRow {
  module: string;
  headline: string;
  status: string;
  detail: string;
  [key: string]: unknown;
}

const executiveModules: ExecutiveModuleRow[] = [
  { module: 'Financial Performance', headline: '$6.23B vs $6.18B plan', status: 'Green', detail: '11.4% EBITDA, 8.3% operating margin, 51 DSO' },
  { module: 'Pipeline & Business Development', headline: '$15.0B qualified pipeline', status: 'Green', detail: '1.09x B2B, 31% new-business win, 74% recompete win' },
  { module: 'Contract Portfolio Health', headline: '523 active contracts', status: 'Green', detail: '18 at risk, 91.2% OTD, 4.1/5 CPARS quality' },
  { module: 'Workforce & Clearance', headline: '24,847 vs 25,100 plan', status: 'Amber', detail: '76.3% utilization, 15,902 cleared, 318 pending investigations' },
  { module: 'Competitive Position', headline: '4.2% estimated DoD IT share', status: 'Amber', detail: '14 major IDIQ vehicles, 3.2% protest rate, 4.6% new-agency diversification' },
];

const moduleColumns: Column<ExecutiveModuleRow>[] = [
  { key: 'module', header: 'Module', sortable: true },
  { key: 'headline', header: 'Headline', sortable: false },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (value) => {
      const v = value as string;
      return (
        <StatusBadge variant={v === 'Green' ? 'success' : 'warning'}>
          {v}
        </StatusBadge>
      );
    },
  },
  { key: 'detail', header: 'Detail', sortable: false },
];

// --- Page ---

export default function ExecutiveCommandPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E68A3F]/10">
              <LayoutDashboard className="h-5 w-5 text-[#E68A3F]" />
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">Executive Command</h1>
              <Badge className="bg-[#E68A3F]/10 text-[#E68A3F] border-[#E68A3F]/20 hover:bg-[#E68A3F]/20">
                CEO-CFO-COO-BD Rollup
              </Badge>
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Unified executive dashboard consolidating financial performance, pipeline health, contract delivery, workforce readiness, and competitive positioning.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Metric Row 1 - Financial */}
        <MetricCardGrid columns={4}>
          <MetricCard
            label="Revenue"
            value="$8.60B"
            icon={<DollarSign className="h-5 w-5" />}
          />
          <MetricCard
            label="Adjusted EBITDA"
            value="$712M"
            subtitle="11.4%"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <MetricCard
            label="Operating Margin"
            value="8.3%"
            icon={<Activity className="h-5 w-5" />}
          />
          <MetricCard
            label="Cash Flow from Ops"
            value="$524M"
            subtitle="YTD"
            icon={<DollarSign className="h-5 w-5" />}
          />
        </MetricCardGrid>

        {/* Metric Row 2 - Pipeline & BD */}
        <MetricCardGrid columns={4}>
          <MetricCard
            label="Book-to-Bill"
            value="1.09x"
            icon={<Target className="h-5 w-5" />}
          />
          <MetricCard
            label="Funded Backlog"
            value="$11.4B"
            icon={<Briefcase className="h-5 w-5" />}
          />
          <MetricCard
            label="New Business Win Rate"
            value="31%"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <MetricCard
            label="Recompete Win Rate"
            value="74%"
            icon={<Shield className="h-5 w-5" />}
          />
        </MetricCardGrid>

        {/* Metric Row 3 - Workforce & Delivery */}
        <MetricCardGrid columns={4}>
          <MetricCard
            label="Active Contracts"
            value="523"
            icon={<Briefcase className="h-5 w-5" />}
          />
          <MetricCard
            label="Headcount vs Plan"
            value="24,847 / 25,100"
            icon={<Users className="h-5 w-5" />}
          />
          <MetricCard
            label="Billable Utilization"
            value="76.3%"
            icon={<Activity className="h-5 w-5" />}
          />
          <MetricCard
            label="Cleared Workforce"
            value="15,902"
            subtitle="64%"
            icon={<Shield className="h-5 w-5" />}
          />
        </MetricCardGrid>

        {/* Wow Moment Callout */}
        <Card className="border-[#E68A3F]/30 bg-[#E68A3F]/5">
          <CardContent className="flex items-start gap-3 py-4">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E68A3F]/10">
              <Target className="h-4 w-4 text-[#E68A3F]" />
            </div>
            <div>
              <p className="font-semibold text-[#E68A3F]">Executive Insight</p>
              <p className="text-sm text-muted-foreground">
                The business is healthy on growth and backlog, but workforce + clearance friction is the executive bottleneck.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Charts Side by Side */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Financial / Pipeline Chart */}
          <ChartContainer title="Financial & Pipeline Overview" subtitle="Key financial metrics ($B)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="metric"
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickLine={false}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickLine={false}
                  tickFormatter={(v: number) => `$${v}B`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value) => [`$${value}B`, 'Value']}
                />
                <Bar dataKey="value" fill="#E68A3F" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Workforce / Delivery Chart */}
          <ChartContainer title="Workforce & Delivery Metrics" subtitle="Operational performance (%)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workforceData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="metric"
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickLine={false}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickLine={false}
                  tickFormatter={(v: number) => `${v}%`}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value) => [`${value}%`, 'Value']}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {workforceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getWorkforceBarColor(entry.metric)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Executive Module Summary Table */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Executive Module Summary</h2>
          <DataTable
            data={executiveModules}
            columns={moduleColumns}
            searchable={false}
            pageSize={10}
          />
        </div>

        {/* Footer */}
        <AegisFooter />
      </div>
    </div>
  );
}
