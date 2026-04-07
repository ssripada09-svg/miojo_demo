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
} from 'recharts';
import { Users, Clock, AlertTriangle, Shield, FileText, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MetricCard, MetricCardGrid } from '@/components/shared/MetricCard';
import { ChartContainer } from '@/components/shared/ChartContainer';
import { DataTable } from '@/components/shared/DataTable';
import type { Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { AegisFooter } from '@/components/shared';

// --- Data ---

const approvalTimeline = [
  { phase: 'Package Build', min: 4, max: 8 },
  { phase: 'COR Review', min: 2, max: 3 },
  { phase: 'CO / Program Review', min: 2, max: 4 },
  { phase: 'DCAA Audit', min: 4, max: 12 },
  { phase: 'Negotiation', min: 2, max: 4 },
  { phase: 'Legal / Signature', min: 1, max: 2 },
];

// Transform for stacked bar: offset (invisible) + range (visible)
const chartData = approvalTimeline.map((d) => ({
  phase: d.phase,
  offset: d.min,
  range: d.max - d.min,
}));

interface EvidencePillarRow {
  pillar: string;
  detail: string;
  strength: string;
  [key: string]: unknown;
}

const evidencePillars: EvidencePillarRow[] = [
  { pillar: 'Workload Evidence', detail: 'Historical labor-hour actuals, WBS analysis, task-order backlog, utilization above 90-95%, deliverable slippage', strength: 'Critical' },
  { pillar: 'Skill Gap Analysis', detail: 'Role capability mapping, certification / clearance gaps, build-vs-buy, labor market scarcity', strength: 'Critical' },
  { pillar: 'Peer Staffing Benchmarks', detail: 'A-76 data, BLS data, APQC ratios, IGCE historicals, peer contractor comparisons', strength: 'High' },
  { pillar: 'Mission Alignment Narrative', detail: 'Changed mission scope, surge events, technology transitions, continuity risk', strength: 'Critical' },
  { pillar: 'IGCE Alignment', detail: 'Labor categories, hours, indirect rates, escalation assumptions, payroll/timesheet support, 10% contingency rationale', strength: 'High' },
];

const evidenceColumns: Column<EvidencePillarRow>[] = [
  { key: 'pillar', header: 'Pillar', sortable: true },
  { key: 'detail', header: 'Detail' },
  {
    key: 'strength',
    header: 'Strength',
    render: (value) => {
      const v = value as string;
      return (
        <StatusBadge variant={v === 'Critical' ? 'error' : 'warning'}>
          {v}
        </StatusBadge>
      );
    },
  },
];

interface ReviewChainRow {
  reviewer: string;
  role: string;
  focus: string;
  [key: string]: unknown;
}

const reviewChain: ReviewChainRow[] = [
  { reviewer: 'COR', role: 'First-line technical reviewer', focus: 'Workload evidence, mission alignment, CPARS history' },
  { reviewer: 'Program Office', role: 'Customer advocate', focus: 'Mission impact of understaffing vs. expansion cost' },
  { reviewer: 'Contracting Officer', role: 'Only authority to modify contract', focus: 'Price reasonableness, FAR compliance, scope authority' },
  { reviewer: 'DCAA', role: 'Cost/pricing audit if triggered', focus: 'Proposal adequacy, labor rate accuracy, accounting integrity' },
  { reviewer: 'DCMA / ACO', role: 'Administrative oversight', focus: 'Modification management, EVMS compliance, change board coordination' },
  { reviewer: 'Legal Counsel', role: 'Policy review for high-dollar actions', focus: 'Scope creep risk, competition requirements, protest exposure' },
];

const reviewColumns: Column<ReviewChainRow>[] = [
  { key: 'reviewer', header: 'Reviewer', sortable: true },
  { key: 'role', header: 'Role' },
  { key: 'focus', header: 'Focus Area' },
];

// Custom tooltip for approval timeline chart
function TimelineTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ dataKey: string; value: number }>;
  label?: string;
}) {
  if (!active || !payload || !payload.length) return null;
  const offset = payload.find((p) => p.dataKey === 'offset');
  const range = payload.find((p) => p.dataKey === 'range');
  const min = offset?.value ?? 0;
  const max = min + (range?.value ?? 0);
  return (
    <div className="rounded-lg border border-pharos-border bg-pharos-card p-3 shadow-lg">
      <p className="text-sm font-medium text-white mb-1">{label}</p>
      <p className="text-sm text-muted-foreground">
        {min} &ndash; {max} weeks
      </p>
    </div>
  );
}

export default function HeadcountJustificationPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pharos-teal/10">
              <Users className="h-6 w-6 text-pharos-teal" />
            </div>
            Headcount Justification
          </h1>
          <p className="text-muted-foreground mt-1">
            Expansion requests / labor category justification
          </p>
        </div>
        <Badge variant="outline" className="bg-pharos-teal/10 text-pharos-teal border-pharos-teal/20">
          Crew Brief
        </Badge>
      </div>

      {/* Metric Cards - 8 metrics across 2 rows */}
      <MetricCardGrid columns={4}>
        <MetricCard
          label="Package Build Time"
          value="4-8 weeks"
          icon={<FileText className="h-5 w-5" />}
        />
        <MetricCard
          label="Approval (no audit)"
          value="6-12 weeks"
          icon={<CheckCircle className="h-5 w-5" />}
        />
        <MetricCard
          label="Approval (DCAA audit)"
          value="16-32 weeks"
          icon={<Shield className="h-5 w-5" />}
        />
        <MetricCard
          label="Revision Rate"
          value="40-60%"
          icon={<AlertTriangle className="h-5 w-5" />}
        />
        <MetricCard
          label="Secret Hire Timeline"
          value="41-60 days"
          icon={<Clock className="h-5 w-5" />}
        />
        <MetricCard
          label="TS/SCI Hire Timeline"
          value="12-18 months"
          icon={<Shield className="h-5 w-5" />}
        />
        <MetricCard
          label="Unfilled Clearance Positions"
          value="500K-700K"
          icon={<Users className="h-5 w-5" />}
        />
        <MetricCard
          label="DoD Block Change Goal"
          value="120 days"
          icon={<Clock className="h-5 w-5" />}
        />
      </MetricCardGrid>

      {/* Wow Moment Callout */}
      <Card className="bg-pharos-card border-pharos-teal/30">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-pharos-teal/10">
              <AlertTriangle className="h-5 w-5 text-pharos-teal" />
            </div>
            <p className="text-sm font-medium text-white">
              A well-documented staffing action can still take{' '}
              <span className="text-pharos-teal font-bold">16-32 weeks</span>{' '}
              if DCAA is triggered.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Approval Timeline Chart */}
      <ChartContainer
        title="Approval Timeline by Phase"
        subtitle="Minimum to maximum duration in weeks"
        height={360}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2E3338" horizontal={false} />
            <XAxis
              type="number"
              stroke="#8A929C"
              fontSize={12}
              tickLine={false}
              label={{ value: 'Weeks', position: 'insideBottomRight', offset: -5, fill: '#8A929C', fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey="phase"
              stroke="#8A929C"
              fontSize={12}
              tickLine={false}
              width={140}
            />
            <Tooltip content={<TimelineTooltip />} cursor={{ fill: 'rgba(31,182,184,0.06)' }} />
            {/* Invisible offset bar */}
            <Bar dataKey="offset" stackId="timeline" fill="transparent" />
            {/* Visible range bar */}
            <Bar
              dataKey="range"
              stackId="timeline"
              fill="#1FB6B8"
              radius={[0, 4, 4, 0]}
              name="Duration Range"
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Evidence Pillar Table */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardHeader>
          <CardTitle className="text-white">Evidence Pillars</CardTitle>
          <CardDescription>
            Key documentation areas required for a successful headcount justification package
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={evidencePillars}
            columns={evidenceColumns}
            searchable={false}
            pageSize={10}
          />
        </CardContent>
      </Card>

      {/* Review Chain Table */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardHeader>
          <CardTitle className="text-white">Review Chain</CardTitle>
          <CardDescription>
            Stakeholders involved in the headcount approval process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={reviewChain}
            columns={reviewColumns}
            searchable={false}
            pageSize={10}
          />
        </CardContent>
      </Card>

      {/* Aegis Governance Footer */}
      <AegisFooter />
    </div>
  );
}
