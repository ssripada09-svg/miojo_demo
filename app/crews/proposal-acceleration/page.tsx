'use client';

import React from 'react';
import {
  Rocket,
  Clock,
  FileCheck,
  Users,
  Target,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AegisFooter } from '@/components/shared';
import { ChartContainer } from '@/components/shared/ChartContainer';
import { MetricCard, MetricCardGrid } from '@/components/shared/MetricCard';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';

// --- Data ---

const timelineData = [
  { phase: 'RFP Shred', baseline: 2.5, ai: 0.5 },
  { phase: 'Outline', baseline: 1.5, ai: 0.5 },
  { phase: 'SME Tasking', baseline: 2.5, ai: 1.0 },
  { phase: 'First Draft', baseline: 7.0, ai: 2.5 },
  { phase: 'Reviews', baseline: 4.0, ai: 2.5 },
  { phase: 'Production', baseline: 1.5, ai: 0.75 },
];

interface RFPRow {
  [key: string]: unknown;
  opportunity: string;
  contractValue: string;
  phase: string;
  draftComplete: number | null;
  compliance: number | null;
  daysToSubmission: number;
  lead: string;
  risk: string;
}

const rfpTracker: RFPRow[] = [
  { opportunity: 'SOCOM C4ISR IDIQ', contractValue: '$125M', phase: 'Red Team Review', draftComplete: 88, compliance: 97, daysToSubmission: 6, lead: 'J. Martinez', risk: 'High' },
  { opportunity: 'Army Logistics SETA', contractValue: '$45M', phase: 'First Draft', draftComplete: 62, compliance: 84, daysToSubmission: 11, lead: 'R. Singh', risk: 'Medium' },
  { opportunity: 'NAVAIR Maintenance Support', contractValue: '$18M', phase: 'Pink Team', draftComplete: 74, compliance: 91, daysToSubmission: 9, lead: 'A. Thompson', risk: 'Medium' },
  { opportunity: 'DLA Supply Chain Analytics', contractValue: '$32M', phase: 'Outline/Shred', draftComplete: 31, compliance: 62, daysToSubmission: 17, lead: 'K. Patel', risk: 'Low' },
  { opportunity: 'DISA Cybersecurity Services', contractValue: '$78M', phase: 'SME Input', draftComplete: 47, compliance: 73, daysToSubmission: 13, lead: 'L. Chen', risk: 'Medium' },
  { opportunity: 'USAF Logistics Services', contractValue: '$220M', phase: 'Capture Phase', draftComplete: 8, compliance: 18, daysToSubmission: 41, lead: 'J. Martinez', risk: 'Low' },
  { opportunity: 'DoJ IT Modernization', contractValue: '$14M', phase: 'Final Production', draftComplete: 95, compliance: 99, daysToSubmission: 2, lead: 'R. Singh', risk: 'High' },
  { opportunity: 'HHS Healthcare IT', contractValue: '$29M', phase: 'No-Bid Review', draftComplete: null, compliance: null, daysToSubmission: 21, lead: 'Team Lead', risk: 'Decision' },
];

interface ComplianceRow {
  [key: string]: unknown;
  category: string;
  mapped: string;
  compliant: number | string;
  gaps: number;
  status: string;
}

const complianceData: ComplianceRow[] = [
  { category: 'Section L \u2014 Instructions', mapped: '34 of 34', compliant: 32, gaps: 2, status: 'Action Required' },
  { category: 'Section M \u2014 Evaluation Criteria', mapped: '18 of 18', compliant: 18, gaps: 0, status: 'Clear' },
  { category: 'Section C \u2014 SOW/PWS Requirements', mapped: '47 of 51', compliant: 43, gaps: 8, status: 'Critical' },
  { category: 'Section H \u2014 Special Requirements', mapped: '12 of 12', compliant: 11, gaps: 1, status: 'Action Required' },
  { category: 'DFARS Clauses (252.204-7012, 7019, 7021)', mapped: '3 of 3', compliant: 3, gaps: 0, status: 'Clear' },
  { category: 'CMMC Level 2 Documentation', mapped: 'Required', compliant: 'On File', gaps: 0, status: 'Clear' },
  { category: 'Small Business Subcontracting Plan', mapped: 'Required', compliant: 'Draft', gaps: 0, status: 'Review Needed' },
  { category: 'Certifications / Sec. K', mapped: '22 of 22', compliant: 22, gaps: 0, status: 'Clear' },
];

// --- Helpers ---

function getRiskVariant(risk: string): 'success' | 'warning' | 'error' | 'info' {
  switch (risk) {
    case 'High':
      return 'error';
    case 'Medium':
      return 'warning';
    case 'Low':
      return 'success';
    case 'Decision':
      return 'info';
    default:
      return 'info';
  }
}

function getComplianceStatusVariant(status: string): 'success' | 'warning' | 'error' | 'info' {
  switch (status) {
    case 'Clear':
      return 'success';
    case 'Action Required':
      return 'warning';
    case 'Critical':
      return 'error';
    case 'Review Needed':
      return 'info';
    default:
      return 'info';
  }
}

function getDraftColor(value: number | null): string {
  if (value === null) return 'text-muted-foreground';
  if (value >= 80) return 'text-green-500';
  if (value >= 50) return 'text-yellow-500';
  return 'text-red-500';
}

// --- Chart Tooltip ---

function TimelineTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ dataKey: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-lg border border-pharos-border bg-pharos-card p-3 shadow-lg">
      <p className="text-sm font-medium text-white mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-sm text-muted-foreground">
          <span style={{ color: entry.color }} className="font-medium">
            {entry.dataKey === 'baseline' ? 'Baseline' : 'AI-Assisted'}:
          </span>{' '}
          {entry.value} days
        </p>
      ))}
    </div>
  );
}

// --- Columns ---

const rfpColumns: Column<RFPRow>[] = [
  {
    key: 'opportunity',
    header: 'Opportunity',
    sortable: true,
    className: 'min-w-[200px]',
    render: (value) => <span className="font-medium text-white">{String(value)}</span>,
  },
  {
    key: 'contractValue',
    header: 'Contract Value',
    sortable: true,
    render: (value) => <span className="font-medium text-white">{String(value)}</span>,
  },
  {
    key: 'phase',
    header: 'Phase',
    sortable: true,
  },
  {
    key: 'draftComplete',
    header: 'Draft Complete (%)',
    sortable: true,
    render: (value) => {
      if (value === null || value === undefined) return <span className="text-muted-foreground">-</span>;
      const num = Number(value);
      return <span className={`font-semibold ${getDraftColor(num)}`}>{num}%</span>;
    },
  },
  {
    key: 'compliance',
    header: 'Compliance (%)',
    sortable: true,
    render: (value) => {
      if (value === null || value === undefined) return <span className="text-muted-foreground">-</span>;
      const num = Number(value);
      return <span className={`font-semibold ${getDraftColor(num)}`}>{num}%</span>;
    },
  },
  {
    key: 'daysToSubmission',
    header: 'Days to Submission',
    sortable: true,
    render: (value) => {
      const days = Number(value);
      const color = days <= 5 ? 'text-red-500 font-bold' : days <= 10 ? 'text-yellow-500 font-semibold' : 'text-white';
      return <span className={color}>{days}</span>;
    },
  },
  {
    key: 'lead',
    header: 'Lead',
    sortable: true,
  },
  {
    key: 'risk',
    header: 'Risk',
    sortable: true,
    render: (value) => {
      const risk = String(value);
      return <StatusBadge variant={getRiskVariant(risk)} size="sm">{risk}</StatusBadge>;
    },
  },
];

const complianceColumns: Column<ComplianceRow>[] = [
  {
    key: 'category',
    header: 'Category',
    sortable: true,
    className: 'min-w-[280px]',
    render: (value) => <span className="font-medium text-white">{String(value)}</span>,
  },
  {
    key: 'mapped',
    header: 'Mapped',
    sortable: true,
  },
  {
    key: 'compliant',
    header: 'Compliant',
    sortable: true,
    render: (value) => <span className="text-white">{String(value)}</span>,
  },
  {
    key: 'gaps',
    header: 'Gaps',
    sortable: true,
    render: (value) => {
      const gaps = Number(value);
      const color = gaps === 0 ? 'text-green-500' : gaps >= 5 ? 'text-red-500 font-bold' : 'text-yellow-500 font-semibold';
      return <span className={color}>{gaps}</span>;
    },
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (value) => {
      const status = String(value);
      return <StatusBadge variant={getComplianceStatusVariant(status)} size="sm">{status}</StatusBadge>;
    },
  },
];

// --- Page ---

export default function ProposalAccelerationPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pharos-teal/10">
              <Rocket className="h-6 w-6 text-pharos-teal" />
            </div>
            Proposal Acceleration
          </h1>
          <p className="text-muted-foreground mt-1">
            AI-assisted proposal operations and RFP pipeline management
          </p>
        </div>
        <Badge variant="outline" className="bg-pharos-teal/10 text-pharos-teal border-pharos-teal/20">
          Live Tracking
        </Badge>
      </div>

      {/* Top Metrics - Row 1 */}
      <MetricCardGrid columns={4}>
        <MetricCard
          label="Median RFP Turnaround"
          value="24 days"
          icon={<Clock className="h-5 w-5" />}
        />
        <MetricCard
          label="Time to First Draft Reduction"
          value="70%"
          icon={<FileCheck className="h-5 w-5" />}
          valueClassName="text-pharos-teal"
        />
        <MetricCard
          label="Cycle Time Reduction"
          value="30-40%"
          icon={<Target className="h-5 w-5" />}
        />
        <MetricCard
          label="Capacity Increase"
          value="+30%"
          subtitle="Without more headcount"
          icon={<Users className="h-5 w-5" />}
          valueClassName="text-pharos-teal"
        />
      </MetricCardGrid>

      {/* Top Metrics - Row 2 */}
      <MetricCardGrid columns={4}>
        <MetricCard
          label="Active RFPs in Pipeline"
          value="12"
          icon={<Rocket className="h-5 w-5" />}
        />
        <MetricCard
          label="RFPs in Active Writing"
          value="5"
          icon={<FileCheck className="h-5 w-5" />}
        />
        <MetricCard
          label="Proposals Submitted QTD"
          value="8"
          icon={<CheckCircle className="h-5 w-5" />}
        />
        <MetricCard
          label="Pipeline Value"
          value="$847M"
          icon={<Target className="h-5 w-5" />}
          valueClassName="text-pharos-teal"
        />
      </MetricCardGrid>

      {/* Wow Moment Callout */}
      <Card className="bg-pharos-card border-pharos-teal/30">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-pharos-teal/10 shrink-0">
              <Rocket className="h-6 w-6 text-pharos-teal" />
            </div>
            <p className="text-white text-lg font-medium">
              AI compresses a{' '}
              <span className="text-pharos-teal font-bold">19-22 day</span>{' '}
              proposal cycle to{' '}
              <span className="text-pharos-teal font-bold">~7-10 days</span>.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Baseline vs AI Timeline Chart */}
      <ChartContainer
        title="Baseline vs AI-Assisted Timeline"
        subtitle="Days per proposal phase - side by side comparison"
        height={360}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={timelineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2E3338" />
            <XAxis
              dataKey="phase"
              stroke="#8A929C"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#8A929C"
              fontSize={12}
              tickLine={false}
              label={{ value: 'Days', angle: -90, position: 'insideLeft', style: { fill: '#8A929C', fontSize: 12 } }}
            />
            <Tooltip content={<TimelineTooltip />} />
            <Legend
              wrapperStyle={{ color: '#8A929C', fontSize: 12 }}
            />
            <Bar dataKey="baseline" name="Baseline" fill="#5B6470" radius={[4, 4, 0, 0]} />
            <Bar dataKey="ai" name="AI-Assisted" fill="#1FB6B8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* RFP Tracker Table */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardHeader>
          <CardTitle className="text-white">Active RFP Tracker</CardTitle>
          <CardDescription className="text-muted-foreground">
            Real-time status of all active proposals in the pipeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable<RFPRow>
            data={rfpTracker}
            columns={rfpColumns}
            pageSize={10}
            searchable
            searchPlaceholder="Search RFPs..."
          />
        </CardContent>
      </Card>

      {/* Compliance Panel */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-pharos-teal" />
            Compliance Matrix
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            RFP compliance tracking across all required sections and clauses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable<ComplianceRow>
            data={complianceData}
            columns={complianceColumns}
            pageSize={10}
            searchable
            searchPlaceholder="Search compliance items..."
          />
        </CardContent>
      </Card>

      {/* Aegis Footer */}
      <AegisFooter />
    </div>
  );
}
