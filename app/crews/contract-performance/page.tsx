'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { BarChart3, AlertTriangle, CheckCircle, TrendingDown, Activity, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MetricCard, MetricCardGrid } from '@/components/shared/MetricCard';
import { ChartContainer } from '@/components/shared/ChartContainer';
import { DataTable } from '@/components/shared/DataTable';
import type { Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { AegisFooter } from '@/components/shared';

// --- Data ---

const cparsData = [
  { rating: 'Exceptional', count: 18, color: '#22C55E' },
  { rating: 'Very Good', count: 18, color: '#1FB6B8' },
  { rating: 'Satisfactory', count: 11, color: '#F59E0B' },
  { rating: 'Marginal', count: 2, color: '#EF4444' },
  { rating: 'Pending', count: 1, color: '#5B6470' },
];

interface RiskContractRow {
  contract: string;
  type: string;
  tcv: string;
  cpi: number;
  spi: number;
  otd: string;
  coRate: string;
  cpars: string;
  [key: string]: unknown;
}

const riskContracts: RiskContractRow[] = [
  { contract: 'PHOENIX Recon Platform', type: 'CPFF', tcv: '$22.1M', cpi: 0.83, spi: 0.82, otd: '76.8%', coRate: '2.2%', cpars: 'Satisfactory' },
  { contract: 'POSEIDON Undersea Systems', type: 'CPFF', tcv: '$18.7M', cpi: 0.88, spi: 0.92, otd: '51.5%', coRate: '0.8%', cpars: 'Satisfactory' },
  { contract: 'NEXUS Cloud Migration', type: 'CPFF', tcv: '$51.4M', cpi: 0.88, spi: 0.92, otd: '61.3%', coRate: '2.0%', cpars: 'Exceptional' },
  { contract: 'CONDOR UAS Maintenance', type: 'FFP', tcv: '$40.0M', cpi: 0.89, spi: 0.79, otd: '83.3%', coRate: '1.8%', cpars: 'Very Good' },
  { contract: 'CERBERUS Cyber Defense', type: 'CPFF', tcv: '$101.6M', cpi: 0.95, spi: 0.92, otd: '74.0%', coRate: '11.1%', cpars: 'Very Good' },
];

function getCpiSpiColor(value: number): string {
  if (value < 0.85) return 'text-red-500';
  if (value < 0.95) return 'text-yellow-500';
  return 'text-green-500';
}

function getCparsVariant(rating: string): 'success' | 'info' | 'warning' | 'error' | 'neutral' {
  switch (rating) {
    case 'Exceptional': return 'success';
    case 'Very Good': return 'info';
    case 'Satisfactory': return 'warning';
    case 'Marginal': return 'error';
    default: return 'neutral';
  }
}

const riskColumns: Column<RiskContractRow>[] = [
  { key: 'contract', header: 'Contract', sortable: true },
  { key: 'type', header: 'Type', sortable: true },
  { key: 'tcv', header: 'TCV', sortable: true },
  {
    key: 'cpi',
    header: 'CPI',
    sortable: true,
    render: (value) => {
      const v = value as number;
      return <span className={`font-semibold ${getCpiSpiColor(v)}`}>{v.toFixed(2)}</span>;
    },
  },
  {
    key: 'spi',
    header: 'SPI',
    sortable: true,
    render: (value) => {
      const v = value as number;
      return <span className={`font-semibold ${getCpiSpiColor(v)}`}>{v.toFixed(2)}</span>;
    },
  },
  { key: 'otd', header: 'OTD', sortable: true },
  { key: 'coRate', header: 'CO Rate', sortable: true },
  {
    key: 'cpars',
    header: 'CPARS',
    render: (value) => {
      const v = value as string;
      return <StatusBadge variant={getCparsVariant(v)}>{v}</StatusBadge>;
    },
  },
];

// Custom tooltip for CPARS pie chart
function CparsTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { color: string } }>;
}) {
  if (!active || !payload || !payload.length) return null;
  const entry = payload[0];
  return (
    <div className="rounded-lg border border-pharos-border bg-pharos-card p-3 shadow-lg">
      <div className="flex items-center gap-2 mb-1">
        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.payload.color }} />
        <p className="text-sm font-medium text-white">{entry.name}</p>
      </div>
      <p className="text-sm text-muted-foreground">{entry.value} contracts</p>
    </div>
  );
}

export default function ContractPerformancePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pharos-teal/10">
              <BarChart3 className="h-6 w-6 text-pharos-teal" />
            </div>
            Contract Performance
          </h1>
          <p className="text-muted-foreground mt-1">
            Contract health / CPI / SPI / CPARS portfolio monitoring
          </p>
        </div>
        <Badge variant="outline" className="bg-pharos-teal/10 text-pharos-teal border-pharos-teal/20">
          Crew Brief
        </Badge>
      </div>

      {/* Metric Cards - Row 1 */}
      <MetricCardGrid columns={4}>
        <MetricCard
          label="Portfolio Size"
          value="50 contracts"
          icon={<Activity className="h-5 w-5" />}
        />
        <MetricCard
          label="Total Contract Value"
          value="$1,420M"
          icon={<Target className="h-5 w-5" />}
        />
        <MetricCard
          label="Average CPI"
          value="0.99"
          icon={<CheckCircle className="h-5 w-5" />}
        />
        <MetricCard
          label="Average SPI"
          value="0.96"
          icon={<TrendingDown className="h-5 w-5" />}
        />
      </MetricCardGrid>

      {/* Metric Cards - Row 2 */}
      <MetricCardGrid columns={4}>
        <MetricCard
          label="Average OTD"
          value="79.8%"
          icon={<CheckCircle className="h-5 w-5" />}
        />
        <MetricCard
          label="CPI < 0.90"
          value="13 contracts"
          valueClassName="text-yellow-500"
          icon={<AlertTriangle className="h-5 w-5" />}
        />
        <MetricCard
          label="SPI < 0.90"
          value="11 contracts"
          valueClassName="text-yellow-500"
          icon={<AlertTriangle className="h-5 w-5" />}
        />
        <MetricCard
          label="Recompetes within 12mo"
          value="18"
          icon={<BarChart3 className="h-5 w-5" />}
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
              Only <span className="text-pharos-teal font-bold">3.4%</span> of the portfolio is at CPI/SPI risk — but{' '}
              <span className="text-pharos-teal font-bold">36%</span> is already inside the 12-month recompete window.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* RAG Distribution */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-pharos-card border-red-500/30">
          <CardContent className="pt-6 text-center">
            <p className="text-sm font-medium text-red-400 mb-1">RED</p>
            <p className="text-4xl font-bold text-red-500">11</p>
            <p className="text-xs text-muted-foreground mt-1">Contracts</p>
          </CardContent>
        </Card>
        <Card className="bg-pharos-card border-yellow-500/30">
          <CardContent className="pt-6 text-center">
            <p className="text-sm font-medium text-yellow-400 mb-1">AMBER</p>
            <p className="text-4xl font-bold text-yellow-500">23</p>
            <p className="text-xs text-muted-foreground mt-1">Contracts</p>
          </CardContent>
        </Card>
        <Card className="bg-pharos-card border-green-500/30">
          <CardContent className="pt-6 text-center">
            <p className="text-sm font-medium text-green-400 mb-1">GREEN</p>
            <p className="text-4xl font-bold text-green-500">16</p>
            <p className="text-xs text-muted-foreground mt-1">Contracts</p>
          </CardContent>
        </Card>
      </div>

      {/* CPARS Distribution + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartContainer
          title="CPARS Rating Distribution"
          subtitle="Portfolio-wide contractor performance ratings"
          height={320}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={cparsData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={110}
                dataKey="count"
                nameKey="rating"
                paddingAngle={2}
              >
                {cparsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<CparsTooltip />} />
              <Legend
                formatter={(value: string) => (
                  <span className="text-sm text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        <Card className="bg-pharos-card border-pharos-border">
          <CardHeader>
            <CardTitle className="text-white">Portfolio Health Summary</CardTitle>
            <CardDescription>Key takeaways from current performance data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="text-white font-medium">72%</span> of contracts rated Exceptional or Very Good in CPARS.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="text-white font-medium">13 contracts</span> are below the CPI 0.90 threshold requiring corrective action plans.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <TrendingDown className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="text-white font-medium">Average OTD at 79.8%</span> — below the 85% target, driven by 3 outlier programs.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Activity className="h-5 w-5 text-pharos-teal mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="text-white font-medium">18 recompetes</span> within 12 months representing $510M in at-risk revenue.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Contracts Table */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardHeader>
          <CardTitle className="text-white">Highest-Risk Contracts</CardTitle>
          <CardDescription>
            Contracts flagged for CPI, SPI, or OTD performance below threshold
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={riskContracts}
            columns={riskColumns}
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
