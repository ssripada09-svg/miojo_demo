'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Activity, Users, DollarSign, AlertTriangle, TrendingDown, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MetricCard, MetricCardGrid } from '@/components/shared/MetricCard';
import { ChartContainer } from '@/components/shared/ChartContainer';
import { DataTable } from '@/components/shared/DataTable';
import type { Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { AegisFooter } from '@/components/shared';

// --- Data ---

const workforceDistribution = [
  { status: 'Fully Billable', percent: 84, headcount: 21000, color: '#22C55E' },
  { status: 'Overhead - Productive', percent: 8, headcount: 2000, color: '#3B82F6' },
  { status: 'G&A / Management', percent: 4, headcount: 1000, color: '#A78BFA' },
  { status: 'Bench', percent: 4, headcount: 1000, color: '#E68A3F' },
  { status: 'Awaiting Clearance / Onboarding', percent: 1.5, headcount: 375, color: '#5B6470' },
];

interface BenchCostRow {
  level: string;
  salary: string;
  burdened: string;
  dailyBenchCost: string;
  weeklyBenchCost: string;
  [key: string]: unknown;
}

const benchCosts: BenchCostRow[] = [
  { level: 'Junior analyst / associate', salary: '$65,000', burdened: '$117,000', dailyBenchCost: '$532', weeklyBenchCost: '$2,660' },
  { level: 'Mid-level consultant / engineer', salary: '$110,000', burdened: '$198,000', dailyBenchCost: '$900', weeklyBenchCost: '$4,500' },
  { level: 'Senior consultant / PM', salary: '$155,000', burdened: '$279,000', dailyBenchCost: '$1,268', weeklyBenchCost: '$6,340' },
  { level: 'Principal / technical director', salary: '$195,000', burdened: '$351,000', dailyBenchCost: '$1,595', weeklyBenchCost: '$7,975' },
];

const benchCostColumns: Column<BenchCostRow>[] = [
  { key: 'level', header: 'Level', sortable: true },
  { key: 'salary', header: 'Base Salary' },
  { key: 'burdened', header: 'Burdened Cost' },
  { key: 'dailyBenchCost', header: 'Daily Bench Cost' },
  { key: 'weeklyBenchCost', header: 'Weekly Bench Cost' },
];

interface BenchTriggerRow {
  trigger: string;
  duration: string;
  path: string;
  [key: string]: unknown;
}

const benchTriggers: BenchTriggerRow[] = [
  { trigger: 'Between task orders (IDIQ)', duration: '1-4 weeks', path: 'Assign to next task under same vehicle' },
  { trigger: 'Contract completion (re-compete won)', duration: '2-6 weeks', path: 'Transition to successor contract' },
  { trigger: 'Contract loss (re-compete lost)', duration: '4-12 weeks', path: 'Internal match or severance review' },
  { trigger: 'Awaiting clearance / adjudication', duration: '8-16+ weeks', path: 'Expensive pipeline bench; TS positions average 241 days to fill' },
  { trigger: 'Post-program cancellation / cut', duration: '12-24+ weeks', path: 'Redeploy or RIF' },
];

const benchTriggerColumns: Column<BenchTriggerRow>[] = [
  { key: 'trigger', header: 'Trigger Event', sortable: true },
  { key: 'duration', header: 'Typical Duration' },
  { key: 'path', header: 'Resolution Path' },
];

// Custom tooltip for workforce distribution pie chart
function DistributionTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { color: string; percent: number } }>;
}) {
  if (!active || !payload || !payload.length) return null;
  const entry = payload[0];
  return (
    <div className="rounded-lg border border-pharos-border bg-pharos-card p-3 shadow-lg">
      <p className="text-sm font-medium text-white mb-1">{entry.name}</p>
      <p className="text-sm text-muted-foreground">
        {entry.value.toLocaleString()} personnel ({entry.payload.percent}%)
      </p>
    </div>
  );
}

export default function WorkforceUtilizationPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#E68A3F]/10">
              <Activity className="h-6 w-6 text-pharos-gold" />
            </div>
            Workforce Utilization
          </h1>
          <p className="text-muted-foreground mt-1">
            Billable utilization / bench / indirect-rate pressure
          </p>
        </div>
        <Badge variant="outline" className="bg-[#E68A3F]/10 text-pharos-gold border-[#E68A3F]/20">
          Crew Brief
        </Badge>
      </div>

      {/* Metric Cards - 8 metrics across 2 rows */}
      <MetricCardGrid columns={4}>
        <MetricCard
          label="Target Utilization"
          value="85-90%"
          icon={<Activity className="h-5 w-5" />}
        />
        <MetricCard
          label="Typical Achieved"
          value="80-86%"
          icon={<TrendingDown className="h-5 w-5" />}
        />
        <MetricCard
          label="Current Billable"
          value="76.3%"
          valueClassName="text-warning"
          icon={<AlertTriangle className="h-5 w-5" />}
        />
        <MetricCard
          label="Bench Population"
          value="750-1,250"
          icon={<Users className="h-5 w-5" />}
        />
        <MetricCard
          label="Bench Ratio Target"
          value="<4%"
          icon={<Activity className="h-5 w-5" />}
        />
        <MetricCard
          label="Weekly Bench Carry"
          value="$3,865/employee"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <MetricCard
          label="Total Weekly Bench Cost"
          value="$2.9M-$5.6M"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <MetricCard
          label="Monthly Assignment Churn"
          value="5-8%"
          icon={<Clock className="h-5 w-5" />}
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
              A 1,000-person bench at $3,865/week burns roughly{' '}
              <span className="text-pharos-gold font-bold">$3.9M every week</span>{' '}
              before lost revenue.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Workforce Distribution Pie Chart */}
      <ChartContainer
        title="Workforce Distribution"
        subtitle="Headcount allocation across utilization categories"
        height={400}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={workforceDistribution}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={130}
              paddingAngle={3}
              dataKey="headcount"
              nameKey="status"
            >
              {workforceDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<DistributionTooltip />} />
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

      {/* Bench Cost by Level DataTable */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardHeader>
          <CardTitle className="text-white">Bench Cost by Level</CardTitle>
          <CardDescription>
            Fully burdened bench cost per employee by seniority level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={benchCosts}
            columns={benchCostColumns}
            searchable={false}
            pageSize={10}
          />
        </CardContent>
      </Card>

      {/* Bench Trigger Duration DataTable */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardHeader>
          <CardTitle className="text-white">Bench Trigger &amp; Duration</CardTitle>
          <CardDescription>
            Common bench triggers, expected durations, and resolution paths
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={benchTriggers}
            columns={benchTriggerColumns}
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
