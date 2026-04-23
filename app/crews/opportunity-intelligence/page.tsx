'use client';

import React from 'react';
import {
  Search,
  DollarSign,
  Target,
  TrendingUp,
  Briefcase,
  AlertTriangle,
} from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AegisFooter } from '@/components/shared';
import { ChartContainer } from '@/components/shared/ChartContainer';
import { MetricCard, MetricCardGrid } from '@/components/shared/MetricCard';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';

// --- Data ---

const stageData = [
  { stage: 'Watch', value: 24, color: '#5B6470' },
  { stage: 'Qualified', value: 18, color: '#1FB6B8' },
  { stage: 'Capture', value: 14, color: '#14B8A6' },
  { stage: 'Pre-Proposal', value: 9, color: '#2DD4BF' },
  { stage: 'Proposal', value: 7, color: '#99F6E4' },
  { stage: 'Submitted', value: 5, color: '#A78BFA' },
];

const pipelineCoverage = [
  { label: 'Revenue Target', value: 1.0 },
  { label: 'Weighted Pipeline', value: 3.84 },
  { label: 'Best Practice Floor', value: 3.0 },
  { label: 'Best Practice Ceiling', value: 4.0 },
];

interface OpportunityRow {
  [key: string]: unknown;
  opportunity: string;
  agency: string;
  type: string;
  estValue: string;
  stage: string;
  pWin: number;
  weightedValue: string;
  incumbent: string;
  posture: string;
}

const opportunities: OpportunityRow[] = [
  { opportunity: 'DISA ENCORE IV Recompete', agency: 'DISA', type: 'IDIQ Recompete', estValue: '$7.5B', stage: 'Capture', pWin: 35, weightedValue: '$2.6B', incumbent: 'CACI (partial)', posture: 'Prime - Aggressive' },
  { opportunity: 'Army Intelligence Cloud', agency: 'INSCOM', type: 'Single Award', estValue: '$650M', stage: 'Pre-Proposal', pWin: 55, weightedValue: '$358M', incumbent: 'SAIC', posture: 'Prime - Aggressive' },
  { opportunity: 'NSA Analyst Framework II', agency: 'NSA', type: 'Task Order', estValue: '$420M', stage: 'Proposal', pWin: 65, weightedValue: '$273M', incumbent: 'CACI (incumbent)', posture: 'Prime - Aggressive' },
  { opportunity: 'DHS CBP IT Modernization', agency: 'CBP', type: 'IDIQ TO', estValue: '$315M', stage: 'Submitted', pWin: 70, weightedValue: '$220M', incumbent: 'Peraton', posture: 'Prime - Aggressive' },
  { opportunity: 'Space Force SATCOM Ops', agency: 'SSC', type: 'Task Order', estValue: '$210M', stage: 'Capture', pWin: 40, weightedValue: '$84M', incumbent: 'Leidos', posture: 'Sub (40% share)' },
  { opportunity: 'NRO Mission Support', agency: 'NRO', type: 'Single Award', estValue: '$185M', stage: 'Qualified', pWin: 25, weightedValue: '$46M', incumbent: 'BAH', posture: 'Prime - Monitor' },
  { opportunity: 'SOCOM C2 Modernization', agency: 'USSOCOM', type: 'Task Order', estValue: '$150M', stage: 'Pre-Proposal', pWin: 50, weightedValue: '$75M', incumbent: 'L3Harris', posture: 'Prime - Aggressive' },
  { opportunity: 'Pentagon IT Help Desk', agency: 'OSD', type: 'Recompete', estValue: '$95M', stage: 'Capture', pWin: 60, weightedValue: '$57M', incumbent: 'CACI (incumbent)', posture: 'Prime - Aggressive' },
  { opportunity: 'Army CMMC Compliance', agency: 'HQDA', type: 'New Business', estValue: '$75M', stage: 'Watch', pWin: 15, weightedValue: '$11M', incumbent: 'None', posture: 'Monitor' },
  { opportunity: 'IC Cyber Hunt Team', agency: 'IC Customer', type: 'Sole Source', estValue: '$65M', stage: 'Pre-Proposal', pWin: 75, weightedValue: '$49M', incumbent: 'CACI (incumbent)', posture: 'Prime - Aggressive' },
  { opportunity: 'DIA Open Source Intel', agency: 'DIA', type: 'Task Order', estValue: '$55M', stage: 'Watch', pWin: 20, weightedValue: '$11M', incumbent: 'PAE', posture: 'Sub' },
  { opportunity: 'Air Force EITaaS Ext.', agency: 'USAF', type: 'Mod/Extension', estValue: '$120M', stage: 'Qualified', pWin: 45, weightedValue: '$54M', incumbent: 'CACI', posture: 'Prime - Aggressive' },
];

// --- Helpers ---

function getStageVariant(stage: string): 'success' | 'info' | 'warning' | 'neutral' {
  switch (stage) {
    case 'Submitted':
      return 'success';
    case 'Proposal':
    case 'Pre-Proposal':
      return 'info';
    case 'Capture':
      return 'warning';
    case 'Qualified':
    case 'Watch':
    default:
      return 'neutral';
  }
}

function getPWinColor(pWin: number): string {
  if (pWin >= 60) return 'text-green-500';
  if (pWin >= 40) return 'text-yellow-500';
  return 'text-red-500';
}

// --- Chart Tooltips ---

function StageTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { stage: string; value: number } }> }) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;
  return (
    <div className="rounded-lg border border-pharos-border bg-pharos-card p-3 shadow-lg">
      <p className="text-sm font-medium text-ink">{data.stage}</p>
      <p className="text-sm text-muted-foreground">{data.value} opportunities</p>
    </div>
  );
}

function CoverageTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { label: string; value: number } }> }) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;
  return (
    <div className="rounded-lg border border-pharos-border bg-pharos-card p-3 shadow-lg">
      <p className="text-sm font-medium text-ink">{data.label}</p>
      <p className="text-sm text-muted-foreground">{data.value}x</p>
    </div>
  );
}

// --- Columns ---

const columns: Column<OpportunityRow>[] = [
  {
    key: 'opportunity',
    header: 'Opportunity',
    sortable: true,
    className: 'min-w-[200px]',
    render: (value) => <span className="font-medium text-ink">{String(value)}</span>,
  },
  {
    key: 'agency',
    header: 'Agency',
    sortable: true,
  },
  {
    key: 'type',
    header: 'Type',
    sortable: true,
  },
  {
    key: 'estValue',
    header: 'Est. Value',
    sortable: true,
    render: (value) => <span className="font-medium text-ink">{String(value)}</span>,
  },
  {
    key: 'stage',
    header: 'Stage',
    sortable: true,
    render: (value) => {
      const stage = String(value);
      return <StatusBadge variant={getStageVariant(stage)} size="sm">{stage}</StatusBadge>;
    },
  },
  {
    key: 'pWin',
    header: 'P(Win)',
    sortable: true,
    render: (value) => {
      const pWin = Number(value);
      return <span className={`font-semibold ${getPWinColor(pWin)}`}>{pWin}%</span>;
    },
  },
  {
    key: 'weightedValue',
    header: 'Weighted Value',
    sortable: true,
    render: (value) => <span className="text-ink">{String(value)}</span>,
  },
  {
    key: 'incumbent',
    header: 'Incumbent',
    sortable: true,
  },
  {
    key: 'posture',
    header: 'Posture',
    sortable: true,
    render: (value) => {
      const posture = String(value);
      const isAggressive = posture.includes('Aggressive');
      return (
        <span className={isAggressive ? 'text-pharos-teal font-medium' : 'text-muted-foreground'}>
          {posture}
        </span>
      );
    },
  },
];

// --- Page ---

export default function OpportunityIntelligencePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pharos-teal/10">
              <Search className="h-6 w-6 text-pharos-teal" />
            </div>
            Opportunity Intelligence
          </h1>
          <p className="text-muted-foreground mt-1">
            Federal BD pipeline intelligence and procurement monitoring
          </p>
        </div>
        <Badge variant="outline" className="bg-pharos-teal/10 text-pharos-teal border-pharos-teal/20">
          Pipeline updated: Today
        </Badge>
      </div>

      {/* Top Metrics - Row 1 */}
      <MetricCardGrid columns={4}>
        <MetricCard
          label="Annual Revenue"
          value="$8.63B"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <MetricCard
          label="Contract Awards"
          value="$10.0B"
          icon={<Briefcase className="h-5 w-5" />}
        />
        <MetricCard
          label="Book-to-Bill"
          value="1.2x"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard
          label="Total Backlog"
          value="$31.4B"
          icon={<Target className="h-5 w-5" />}
        />
      </MetricCardGrid>

      {/* Top Metrics - Row 2 */}
      <MetricCardGrid columns={4}>
        <MetricCard
          label="Bids Under Evaluation"
          value="$16.0B"
          icon={<AlertTriangle className="h-5 w-5" />}
        />
        <MetricCard
          label="Expected Submissions (2Q)"
          value="$11.0B"
          icon={<Briefcase className="h-5 w-5" />}
        />
        <MetricCard
          label="New Business Share"
          value="80%"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard
          label="Pipeline Coverage"
          value="3.84x"
          icon={<Target className="h-5 w-5" />}
          valueClassName="text-pharos-teal"
        />
      </MetricCardGrid>

      {/* Wow Moment Callout */}
      <Card className="bg-pharos-card border-pharos-teal/30">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-pharos-teal/10 shrink-0">
              <Target className="h-6 w-6 text-pharos-teal" />
            </div>
            <p className="text-ink text-lg font-medium">
              <span className="text-pharos-teal font-bold">$27B-$38B</span>{' '}
              qualified pipeline floor required to support a{' '}
              <span className="text-pharos-teal font-bold">$9.2B-$9.4B</span>{' '}
              FY2026 revenue plan.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stage Distribution */}
        <ChartContainer
          title="Pipeline by Stage"
          subtitle="Number of opportunities per stage"
          height={320}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stageData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2E3338" />
              <XAxis
                dataKey="stage"
                stroke="#8A929C"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#8A929C"
                fontSize={12}
                tickLine={false}
              />
              <Tooltip content={<StageTooltip />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {stageData.map((entry, index) => (
                  <Cell key={`stage-cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Pipeline Coverage */}
        <ChartContainer
          title="Pipeline Coverage Ratio"
          subtitle="Weighted pipeline vs. revenue target (x)"
          height={320}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={pipelineCoverage}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2E3338" />
              <XAxis
                type="number"
                stroke="#8A929C"
                fontSize={12}
                tickLine={false}
                tickFormatter={(v) => `${v}x`}
              />
              <YAxis
                type="category"
                dataKey="label"
                stroke="#8A929C"
                fontSize={12}
                tickLine={false}
                width={140}
              />
              <Tooltip content={<CoverageTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {pipelineCoverage.map((entry, index) => {
                  let fill = '#5B6470';
                  if (entry.label === 'Weighted Pipeline') fill = '#1FB6B8';
                  else if (entry.label === 'Best Practice Floor') fill = '#2DD4BF';
                  else if (entry.label === 'Best Practice Ceiling') fill = '#14B8A6';
                  return <Cell key={`cov-cell-${index}`} fill={fill} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Opportunity Table */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardHeader>
          <CardTitle className="text-ink">Active Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable<OpportunityRow>
            data={opportunities}
            columns={columns}
            pageSize={12}
            searchable
            searchPlaceholder="Search opportunities..."
          />
        </CardContent>
      </Card>

      {/* Aegis Footer */}
      <AegisFooter />
    </div>
  );
}
