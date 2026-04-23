'use client';

import React from 'react';
import {
  Target,
  DollarSign,
  TrendingUp,
  Shield,
  Eye,
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

const competitorRevenue = [
  { competitor: 'Leidos', revenue: 17.2, backlog: 46.3 },
  { competitor: 'Booz Allen', revenue: 10.7, backlog: 41.0 },
  { competitor: 'CACI', revenue: 8.63, backlog: 32.4 },
  { competitor: 'SAIC', revenue: 7.48, backlog: 22.6 },
  { competitor: 'ManTech', revenue: 2.99, backlog: 0 },
];

interface CompetitorRow {
  [key: string]: unknown;
  contractor: string;
  revenue: string;
  growth: string;
  backlog: string;
  b2b: string;
  newWin: string;
  recompeteWin: string;
}

const competitors: CompetitorRow[] = [
  { contractor: 'Leidos', revenue: '$17.2B', growth: '+3%', backlog: '$46.3B', b2b: '1.3x', newWin: 'N/D', recompeteWin: 'N/D' },
  { contractor: 'Booz Allen Hamilton', revenue: '$10.7B', growth: '+15%', backlog: '$41.0B', b2b: '1.72x', newWin: '63%', recompeteWin: '92%' },
  { contractor: 'CACI', revenue: '$8.63B', growth: '+12.6%', backlog: '$32.4B', b2b: '~1.0+', newWin: 'N/D', recompeteWin: 'N/D' },
  { contractor: 'SAIC', revenue: '$7.48B', growth: '+3.1% organic', backlog: '$22.6B', b2b: '1.1x FY26', newWin: 'High on new', recompeteWin: 'Target 90%+' },
  { contractor: 'ManTech', revenue: '$2.99B', growth: 'Private', backlog: 'Private', b2b: 'Private', newWin: 'Private', recompeteWin: 'Private' },
];

interface VehicleRow {
  [key: string]: unknown;
  vehicle: string;
  ceiling: string;
  primes: string;
  note: string;
}

const vehicles: VehicleRow[] = [
  { vehicle: 'OASIS+', ceiling: 'No ceiling', primes: 'BAH, Leidos, SAIC, CACI, ManTech', note: '10-year, 13 service domains' },
  { vehicle: 'SeaPort-NxG', ceiling: '$4B', primes: 'Leidos, SAIC, ManTech, BAH', note: 'Navy support services' },
  { vehicle: 'GSA ASTRO', ceiling: 'Multi-pool', primes: 'BAH, SAIC, others', note: 'BAH holds all 10 pools' },
  { vehicle: 'RS3', ceiling: 'Army services', primes: 'SAIC, Leidos, ManTech', note: 'Engineering / RDT&E / logistics' },
  { vehicle: 'SHIELD', ceiling: '$151B', primes: 'Leidos, others', note: 'MDA missile defense' },
];

// --- Chart Tooltip ---

function RevenueTooltip({ active, payload }: { active?: boolean; payload?: Array<{ dataKey: string; value: number; color: string; payload: { competitor: string } }> }) {
  if (!active || !payload || !payload.length) return null;
  const name = payload[0].payload.competitor;
  return (
    <div className="rounded-lg border border-pharos-border bg-pharos-card p-3 shadow-lg">
      <p className="text-sm font-medium text-ink">{name}</p>
      {payload.map((entry, idx) => (
        <p key={idx} className="text-sm text-muted-foreground">
          <span style={{ color: entry.color }}>{entry.dataKey === 'revenue' ? 'Revenue' : 'Backlog'}</span>: ${entry.value}B
        </p>
      ))}
    </div>
  );
}

// --- Columns ---

const competitorColumns: Column<CompetitorRow>[] = [
  {
    key: 'contractor',
    header: 'Contractor',
    sortable: true,
    className: 'min-w-[180px]',
    render: (value, row) => {
      const isCaci = String(value) === 'CACI';
      return <span className={isCaci ? 'font-bold text-pharos-teal' : 'font-medium text-ink'}>{String(value)}</span>;
    },
  },
  {
    key: 'revenue',
    header: 'Revenue',
    sortable: true,
    render: (value) => <span className="font-medium text-ink">{String(value)}</span>,
  },
  {
    key: 'growth',
    header: 'Growth',
    sortable: true,
  },
  {
    key: 'backlog',
    header: 'Backlog',
    sortable: true,
    render: (value) => <span className="text-ink">{String(value)}</span>,
  },
  {
    key: 'b2b',
    header: 'Book-to-Bill',
    sortable: true,
  },
  {
    key: 'newWin',
    header: 'New Business Win Rate',
    sortable: true,
  },
  {
    key: 'recompeteWin',
    header: 'Recompete Win Rate',
    sortable: true,
    render: (value) => {
      const val = String(value);
      const isHigh = val === '92%';
      return <span className={isHigh ? 'font-semibold text-green-500' : ''}>{val}</span>;
    },
  },
];

const vehicleColumns: Column<VehicleRow>[] = [
  {
    key: 'vehicle',
    header: 'Vehicle',
    sortable: true,
    className: 'min-w-[140px]',
    render: (value) => <span className="font-medium text-ink">{String(value)}</span>,
  },
  {
    key: 'ceiling',
    header: 'Ceiling',
    sortable: true,
  },
  {
    key: 'primes',
    header: 'Key Primes',
    sortable: false,
    className: 'min-w-[220px]',
  },
  {
    key: 'note',
    header: 'Notes',
    sortable: false,
    className: 'min-w-[200px]',
  },
];

// --- Page ---

export default function CompetitiveIntelligencePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pharos-teal/10">
              <Target className="h-6 w-6 text-pharos-teal" />
            </div>
            Competitive Intelligence
          </h1>
          <p className="text-muted-foreground mt-1">
            Competitor benchmarking, win-loss analysis &amp; vehicle coverage
          </p>
        </div>
        <Badge variant="outline" className="bg-pharos-teal/10 text-pharos-teal border-pharos-teal/20">
          FY2025 data
        </Badge>
      </div>

      {/* Top Metrics - Row 1 */}
      <MetricCardGrid columns={3}>
        <MetricCard
          label="Federal IT Market"
          value="~$130B"
          subtitle="FY2025"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <MetricCard
          label="DoD Cyber Spend"
          value=">$14B"
          icon={<Shield className="h-5 w-5" />}
        />
        <MetricCard
          label="GovWin Pre-SAM Visibility"
          value="73%"
          icon={<Eye className="h-5 w-5" />}
        />
      </MetricCardGrid>

      {/* Top Metrics - Row 2 */}
      <MetricCardGrid columns={3}>
        <MetricCard
          label="GovWin Labor Rate Records"
          value="16M+"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard
          label="GAO Protest Cases (FY2024)"
          value="1,803"
          icon={<AlertTriangle className="h-5 w-5" />}
        />
        <MetricCard
          label="Protest Effectiveness Rate"
          value="52%"
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
              Booz Allen&apos;s <span className="text-pharos-teal font-bold">92% recompete win rate</span> is a structural moat &mdash; any takeover pursuit must be sharply differentiated.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Competitor Revenue Chart */}
      <ChartContainer
        title="Competitor Revenue & Backlog"
        subtitle="Annual revenue vs. total backlog ($B)"
        height={380}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={competitorRevenue} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2E3338" />
            <XAxis
              dataKey="competitor"
              stroke="#8A929C"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#8A929C"
              fontSize={12}
              tickLine={false}
              tickFormatter={(v) => `$${v}B`}
            />
            <Tooltip content={<RevenueTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '12px', color: '#8A929C' }}
            />
            <Bar dataKey="revenue" name="Revenue" fill="#1FB6B8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="backlog" name="Backlog" fill="#A78BFA" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Competitor Table */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardHeader>
          <CardTitle className="text-ink">Competitor Benchmarking</CardTitle>
          <CardDescription>Revenue, growth, backlog and win rates across top federal IT contractors</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable<CompetitorRow>
            data={competitors}
            columns={competitorColumns}
            pageSize={10}
            searchable
            searchPlaceholder="Search competitors..."
          />
        </CardContent>
      </Card>

      {/* IDIQ / Vehicle Table */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardHeader>
          <CardTitle className="text-ink">IDIQ / Vehicle Coverage</CardTitle>
          <CardDescription>Major contract vehicles and prime positioning</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable<VehicleRow>
            data={vehicles}
            columns={vehicleColumns}
            pageSize={10}
            searchable
            searchPlaceholder="Search vehicles..."
          />
        </CardContent>
      </Card>

      {/* Aegis Footer */}
      <AegisFooter />
    </div>
  );
}
