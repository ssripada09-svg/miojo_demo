'use client';

import React from 'react';
import {
  BookOpen,
  Brain,
  Search,
  Users,
  Clock,
  AlertTriangle,
  TrendingUp,
  Zap,
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
import { DataTable } from '@/components/shared/DataTable';
import type { Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';

// --- Data ---

const productivityImpact = [
  { metric: 'Hours per RFP', baseline: 70, withAI: 42 },
  { metric: 'Compliance Matrix Hours', baseline: 6, withAI: 0.25 },
  { metric: 'Past Performance Search', baseline: 3, withAI: 0.1 },
  { metric: 'SME Early Draft Load', baseline: 100, withAI: 20 },
];

interface KnowledgeHealthRow {
  [key: string]: unknown;
  category: string;
  value: string;
  implication: string;
}

const knowledgeHealth: KnowledgeHealthRow[] = [
  { category: 'Project knowledge lost during staff turnover', value: '42%', implication: 'Institutional memory leaves with personnel' },
  { category: 'Lessons learned applied to future projects', value: '30%', implication: 'Most captured lessons never shape future execution' },
  { category: 'LLIS usage by project managers', value: '57%', implication: 'Repository underused during project lifecycle' },
  { category: 'LLIS contribution rate', value: '43%', implication: 'Knowledge capture remains inconsistent' },
  { category: 'Knowledge worker time wasted', value: '5.3 hrs/week', implication: 'Search + recreation tax is persistent' },
  { category: 'Large-org productivity loss', value: '$47M/year', implication: 'Knowledge friction is a material cost center' },
];

interface RetrievalCapabilityRow {
  [key: string]: unknown;
  capability: string;
  impact: string;
}

const retrievalCapabilities: RetrievalCapabilityRow[] = [
  { capability: 'Semantic + BM25 hybrid search', impact: 'Improves Precision@5 by 12-19% over pure vector search' },
  { capability: 'Proposal-ready summary generation', impact: 'Turns raw past performance into section-ready content in minutes' },
  { capability: 'Cross-program lessons learned synthesis', impact: 'Supports up to 34% reduction in safety incidents when surfaced proactively' },
  { capability: 'SME expertise mapping', impact: 'Reduces dependence on informal networks for proposal staffing' },
  { capability: 'Role-based retrieval and citations', impact: 'Grounds output and preserves auditability / access control' },
];

// --- Chart Tooltip ---

function ProductivityTooltip({
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
            {entry.dataKey === 'baseline' ? 'Baseline' : 'With AI'}:
          </span>{' '}
          {entry.value} hrs
        </p>
      ))}
    </div>
  );
}

// --- Columns ---

const knowledgeHealthColumns: Column<KnowledgeHealthRow>[] = [
  {
    key: 'category',
    header: 'Category',
    sortable: true,
    className: 'min-w-[280px]',
    render: (value) => <span className="font-medium text-white">{String(value)}</span>,
  },
  {
    key: 'value',
    header: 'Value',
    sortable: true,
    render: (value) => <span className="font-semibold text-pharos-gold">{String(value)}</span>,
  },
  {
    key: 'implication',
    header: 'Implication',
    sortable: false,
    className: 'min-w-[300px]',
  },
];

const retrievalColumns: Column<RetrievalCapabilityRow>[] = [
  {
    key: 'capability',
    header: 'Capability',
    sortable: true,
    className: 'min-w-[280px]',
    render: (value) => <span className="font-medium text-white">{String(value)}</span>,
  },
  {
    key: 'impact',
    header: 'Impact',
    sortable: false,
    className: 'min-w-[360px]',
  },
];

// --- Page ---

export default function KnowledgeActivationPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pharos-gold/10">
              <BookOpen className="h-6 w-6 text-pharos-gold" />
            </div>
            Knowledge Activation
          </h1>
          <p className="text-muted-foreground mt-1">
            Institutional knowledge retrieval, lessons learned, and proposal memory
          </p>
        </div>
        <Badge variant="outline" className="bg-pharos-gold/10 text-pharos-gold border-pharos-gold/20">
          Knowledge Crew
        </Badge>
      </div>

      {/* Top Metrics - Row 1 */}
      <MetricCardGrid columns={4}>
        <MetricCard
          label="Employees"
          value="27,000"
          icon={<Users className="h-5 w-5" />}
        />
        <MetricCard
          label="Revenue"
          value="$8.63B"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard
          label="Knowledge Lost (Turnover)"
          value="42%"
          icon={<AlertTriangle className="h-5 w-5" />}
          valueClassName="text-red-500"
        />
        <MetricCard
          label="Lessons Learned Applied"
          value="30%"
          icon={<Brain className="h-5 w-5" />}
          valueClassName="text-yellow-500"
        />
      </MetricCardGrid>

      {/* Top Metrics - Row 2 */}
      <MetricCardGrid columns={4}>
        <MetricCard
          label="Hours per RFP"
          value="60-80 hrs"
          icon={<Clock className="h-5 w-5" />}
        />
        <MetricCard
          label="Knowledge Worker Time Wasted"
          value="5.3 hrs/week"
          icon={<Search className="h-5 w-5" />}
        />
        <MetricCard
          label="Productivity Loss"
          value="$47M/year"
          icon={<AlertTriangle className="h-5 w-5" />}
          valueClassName="text-red-500"
        />
        <MetricCard
          label="RAG Market CAGR"
          value="49.1%"
          icon={<Zap className="h-5 w-5" />}
          valueClassName="text-pharos-gold"
        />
      </MetricCardGrid>

      {/* Wow Moment Callout */}
      <Card className="bg-pharos-card border-pharos-gold/30">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-pharos-gold/10 shrink-0">
              <Brain className="h-6 w-6 text-pharos-gold" />
            </div>
            <p className="text-white text-lg font-medium">
              Knowledge friction costs large organizations about{' '}
              <span className="text-pharos-gold font-bold">$47M/year</span>{' '}
              — before proposal capacity loss is counted.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Productivity Impact Chart */}
      <ChartContainer
        title="Productivity Impact: Baseline vs AI-Assisted"
        subtitle="Hours per task — current state versus AI-augmented workflow"
        height={360}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={productivityImpact} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2E3338" />
            <XAxis
              dataKey="metric"
              stroke="#8A929C"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#8A929C"
              fontSize={12}
              tickLine={false}
              label={{ value: 'Hours', angle: -90, position: 'insideLeft', style: { fill: '#8A929C', fontSize: 12 } }}
            />
            <Tooltip content={<ProductivityTooltip />} />
            <Legend
              wrapperStyle={{ color: '#8A929C', fontSize: 12 }}
            />
            <Bar dataKey="baseline" name="Baseline" fill="#5B6470" radius={[4, 4, 0, 0]} />
            <Bar dataKey="withAI" name="With AI" fill="#E68A3F" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Knowledge Health Table */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-pharos-gold" />
            Knowledge Health
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Current state of institutional knowledge capture and reuse
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable<KnowledgeHealthRow>
            data={knowledgeHealth}
            columns={knowledgeHealthColumns}
            pageSize={10}
            searchable
            searchPlaceholder="Search knowledge metrics..."
          />
        </CardContent>
      </Card>

      {/* Retrieval Capabilities Table */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Search className="h-5 w-5 text-pharos-gold" />
            Retrieval Capabilities
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            AI-powered retrieval features and their measurable impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable<RetrievalCapabilityRow>
            data={retrievalCapabilities}
            columns={retrievalColumns}
            pageSize={10}
            searchable
            searchPlaceholder="Search capabilities..."
          />
        </CardContent>
      </Card>

      {/* Aegis Footer */}
      <AegisFooter />
    </div>
  );
}
