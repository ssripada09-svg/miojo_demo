'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ShieldCheck, Users, AlertTriangle, Clock, DollarSign, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MetricCard, MetricCardGrid } from '@/components/shared/MetricCard';
import { ChartContainer } from '@/components/shared/ChartContainer';
import { DataTable } from '@/components/shared/DataTable';
import type { Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { AegisFooter } from '@/components/shared';

// --- Data ---

const clearancePopulation = [
  { level: 'Secret', count: 12500, color: '#3B82F6' },
  { level: 'Top Secret', count: 7500, color: '#E68A3F' },
  { level: 'TS/SCI', count: 3750, color: '#A78BFA' },
  { level: 'Other', count: 1250, color: '#5B6470' },
];

interface QueueRow {
  queue: string;
  count: string;
  avgDays: string;
  [key: string]: unknown;
}

const queueData: QueueRow[] = [
  { queue: 'Initial Secret (new hires)', count: '150-250', avgDays: '60-90 days' },
  { queue: 'Initial TS (new hires)', count: '75-125', avgDays: '90-180 days' },
  { queue: 'Initial TS/SCI (new hires)', count: '50-75', avgDays: '9-18 months' },
  { queue: 'CV alert adjudications', count: '20-50 per month', avgDays: '30-60 days' },
  { queue: 'Reciprocity transfers in process', count: '30-80', avgDays: '5-15 days' },
  { queue: 'Interim clearances in use', count: '100-200', avgDays: 'Until final granted' },
];

const queueColumns: Column<QueueRow>[] = [
  { key: 'queue', header: 'Queue', sortable: true },
  { key: 'count', header: 'Volume' },
  { key: 'avgDays', header: 'Avg Processing Time' },
];

const riskWindows = [
  { window: '30 Days', count: 50 },
  { window: '60 Days', count: 100 },
  { window: '90 Days', count: 185 },
  { window: 'CV Unenrolled', count: 40 },
  { window: '18+ Month Break', count: 40 },
];

// Custom tooltip for clearance pie chart
function ClearanceTooltip({
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
      <p className="text-sm font-medium text-white mb-1">{entry.name}</p>
      <p className="text-sm text-muted-foreground">
        {entry.value.toLocaleString()} personnel
      </p>
    </div>
  );
}

// Custom tooltip for risk window bar chart
function RiskTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-lg border border-pharos-border bg-pharos-card p-3 shadow-lg">
      <p className="text-sm font-medium text-white mb-1">{label}</p>
      <p className="text-sm text-muted-foreground">
        {payload[0].value} clearances at risk
      </p>
    </div>
  );
}

export default function TalentClearancePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#E68A3F]/10">
              <ShieldCheck className="h-6 w-6 text-pharos-gold" />
            </div>
            Talent &amp; Clearance
          </h1>
          <p className="text-muted-foreground mt-1">
            Cleared workforce / DISS / CV / investigation pipeline
          </p>
        </div>
        <Badge variant="outline" className="bg-[#E68A3F]/10 text-pharos-gold border-[#E68A3F]/20">
          Crew Brief
        </Badge>
      </div>

      {/* Metric Cards - 8 metrics across 2 rows */}
      <MetricCardGrid columns={4}>
        <MetricCard
          label="Workforce Modeled"
          value="25,000"
          icon={<Users className="h-5 w-5" />}
        />
        <MetricCard
          label="Secret Cleared"
          value="12,500"
          icon={<Shield className="h-5 w-5" />}
        />
        <MetricCard
          label="Top Secret"
          value="7,500"
          icon={<Shield className="h-5 w-5" />}
        />
        <MetricCard
          label="TS/SCI"
          value="3,750"
          icon={<ShieldCheck className="h-5 w-5" />}
        />
        <MetricCard
          label="Quarterly FSO Attention"
          value="900-1,100"
          icon={<AlertTriangle className="h-5 w-5" />}
        />
        <MetricCard
          label="Annual CV Cost"
          value="~$855K"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <MetricCard
          label="DISS Grace Period"
          value="45 Days"
          icon={<Clock className="h-5 w-5" />}
        />
        <MetricCard
          label="Lapsed TS/SCI Event Cost"
          value="$80K-$150K"
          valueClassName="text-red-400"
          icon={<AlertTriangle className="h-5 w-5" />}
        />
      </MetricCardGrid>

      {/* Wow Moment Callout */}
      <Card className="bg-pharos-card border-[#E68A3F]/30">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-[#E68A3F]/10">
              <AlertTriangle className="h-5 w-5 text-pharos-gold" />
            </div>
            <p className="text-sm font-medium text-white">
              A single lapsed TS/SCI clearance can create an{' '}
              <span className="text-pharos-gold font-bold">$80K-$150K event</span>{' '}
              before contract impact is counted.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Charts Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Clearance Population Pie Chart */}
        <ChartContainer
          title="Clearance Population"
          subtitle="Distribution across clearance levels"
          height={360}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={clearancePopulation}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={3}
                dataKey="count"
                nameKey="level"
              >
                {clearancePopulation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<ClearanceTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value: string) => (
                  <span className="text-sm text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Risk Window Bar Chart */}
        <ChartContainer
          title="Clearance Risk Windows"
          subtitle="Clearances approaching expiration or gap"
          height={360}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={riskWindows}
              margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2E3338" vertical={false} />
              <XAxis
                dataKey="window"
                stroke="#8A929C"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#8A929C"
                fontSize={12}
                tickLine={false}
              />
              <Tooltip content={<RiskTooltip />} cursor={{ fill: 'rgba(230,138,63,0.06)' }} />
              <Bar
                dataKey="count"
                fill="#E68A3F"
                radius={[4, 4, 0, 0]}
                name="At Risk"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Queue DataTable */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardHeader>
          <CardTitle className="text-white">Investigation &amp; Processing Queues</CardTitle>
          <CardDescription>
            Active clearance investigations and processing pipelines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={queueData}
            columns={queueColumns}
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
