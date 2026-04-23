'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Truck, CheckCircle, AlertTriangle, TrendingUp, Clock, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MetricCard, MetricCardGrid } from '@/components/shared/MetricCard';
import { ChartContainer } from '@/components/shared/ChartContainer';
import { DataTable } from '@/components/shared/DataTable';
import type { Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { AegisFooter } from '@/components/shared';

// --- Data ---

interface FollowOnRow {
  contract: string;
  type: string;
  tcv: string;
  cpars: string;
  followOnScore: number;
  recompeteMonths: number;
  otd: string;
  [key: string]: unknown;
}

const followOnData: FollowOnRow[] = [
  { contract: 'MINERVA Intel Analysis', type: 'CPFF', tcv: '$24.2M', cpars: 'Very Good', followOnScore: 7.1, recompeteMonths: 10, otd: '94.9%' },
  { contract: 'IRON SHIELD Armor', type: 'FFP', tcv: '$6.8M', cpars: 'Exceptional', followOnScore: 7.0, recompeteMonths: 20, otd: '90.9%' },
  { contract: 'JERICHO Radar Array', type: 'CPFF', tcv: '$15.0M', cpars: 'Exceptional', followOnScore: 6.9, recompeteMonths: 5, otd: '80.6%' },
  { contract: 'ATLAS C2 Systems', type: 'CPFF', tcv: '$43.9M', cpars: 'Very Good', followOnScore: 6.7, recompeteMonths: 31, otd: '96.8%' },
  { contract: 'FALCON Avionics BPA', type: 'FPIF', tcv: '$5.2M', cpars: 'Exceptional', followOnScore: 6.6, recompeteMonths: 2, otd: '87.5%' },
  { contract: 'KNIGHT Cyber Training', type: 'FFP', tcv: '$8.7M', cpars: 'Exceptional', followOnScore: 6.7, recompeteMonths: 9, otd: '85.2%' },
];

interface ScopeExpansionRow {
  contract: string;
  coValue: string;
  cpars: string;
  followOnScore: number;
  [key: string]: unknown;
}

const scopeExpansion: ScopeExpansionRow[] = [
  { contract: 'ATLAS C2 Systems', coValue: '45.0%', cpars: 'Very Good', followOnScore: 6.7 },
  { contract: 'COBALT Space Sensor', coValue: '18.3%', cpars: 'Satisfactory', followOnScore: 5.5 },
  { contract: 'IRON SHIELD Armor', coValue: '15.8%', cpars: 'Exceptional', followOnScore: 7.0 },
  { contract: 'CERBERUS Cyber Defense', coValue: '11.1%', cpars: 'Very Good', followOnScore: 5.2 },
  { contract: 'JERICHO Radar Array', coValue: '23.4%', cpars: 'Exceptional', followOnScore: 6.9 },
];

const deliveryBands = [
  { band: 'Exemplary', threshold: 95, fill: '#22C55E' },
  { band: 'Acceptable', threshold: 88, fill: '#1FB6B8' },
  { band: 'Watch', threshold: 75, fill: '#F59E0B' },
  { band: 'At Risk', threshold: 74, fill: '#EF4444' },
];

// --- Helpers ---

function getCparsVariant(rating: string): 'success' | 'info' | 'warning' | 'error' | 'neutral' {
  switch (rating) {
    case 'Exceptional': return 'success';
    case 'Very Good': return 'info';
    case 'Satisfactory': return 'warning';
    case 'Marginal': return 'error';
    default: return 'neutral';
  }
}

function getOtdColor(otdStr: string): string {
  const v = parseFloat(otdStr);
  if (v >= 95) return 'text-green-500';
  if (v >= 88) return 'text-yellow-500';
  if (v >= 75) return 'text-orange-500';
  return 'text-red-500';
}

function getCoColor(coStr: string): string {
  const v = parseFloat(coStr);
  if (v > 20) return 'text-red-500';
  if (v > 10) return 'text-yellow-500';
  return 'text-muted-foreground';
}

// --- Column Definitions ---

const followOnColumns: Column<FollowOnRow>[] = [
  { key: 'contract', header: 'Contract', sortable: true },
  { key: 'type', header: 'Type', sortable: true },
  { key: 'tcv', header: 'TCV', sortable: true },
  {
    key: 'cpars',
    header: 'CPARS',
    render: (value) => {
      const v = value as string;
      return <StatusBadge variant={getCparsVariant(v)}>{v}</StatusBadge>;
    },
  },
  {
    key: 'followOnScore',
    header: 'Follow-On Score',
    sortable: true,
    render: (value) => {
      const v = value as number;
      return <span className="font-semibold text-ink">{v.toFixed(1)}</span>;
    },
  },
  {
    key: 'recompeteMonths',
    header: 'Recompete (months)',
    sortable: true,
    render: (value) => {
      const v = value as number;
      return (
        <span className={`font-semibold ${v <= 6 ? 'text-red-500' : 'text-muted-foreground'}`}>
          {v}
        </span>
      );
    },
  },
  {
    key: 'otd',
    header: 'OTD',
    sortable: true,
    render: (value) => {
      const v = value as string;
      return <span className={`font-semibold ${getOtdColor(v)}`}>{v}</span>;
    },
  },
];

const scopeColumns: Column<ScopeExpansionRow>[] = [
  { key: 'contract', header: 'Contract', sortable: true },
  {
    key: 'coValue',
    header: 'Change-Order Rate',
    sortable: true,
    render: (value) => {
      const v = value as string;
      return <span className={`font-semibold ${getCoColor(v)}`}>{v}</span>;
    },
  },
  {
    key: 'cpars',
    header: 'CPARS',
    render: (value) => {
      const v = value as string;
      return <StatusBadge variant={getCparsVariant(v)}>{v}</StatusBadge>;
    },
  },
  {
    key: 'followOnScore',
    header: 'Follow-On Score',
    sortable: true,
    render: (value) => {
      const v = value as number;
      return <span className="font-semibold text-ink">{v.toFixed(1)}</span>;
    },
  },
];

// --- Custom Tooltip ---

function DeliveryTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { band: string; fill: string } }>;
}) {
  if (!active || !payload || !payload.length) return null;
  const entry = payload[0];
  return (
    <div className="rounded-lg border border-pharos-border bg-pharos-card p-3 shadow-lg">
      <div className="flex items-center gap-2 mb-1">
        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.payload.fill }} />
        <p className="text-sm font-medium text-ink">{entry.payload.band}</p>
      </div>
      <p className="text-sm text-muted-foreground">{entry.value}% threshold</p>
    </div>
  );
}

// --- Page ---

export default function ContractDeliveryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pharos-gold/10">
              <Truck className="h-6 w-6 text-pharos-gold" />
            </div>
            Contract Delivery
          </h1>
          <p className="text-muted-foreground mt-1">
            On-time delivery / follow-on readiness / scope expansion
          </p>
        </div>
        <Badge variant="outline" className="bg-pharos-gold/10 text-pharos-gold border-pharos-gold/20">
          Crew Brief
        </Badge>
      </div>

      {/* Metric Cards - Row 1 */}
      <MetricCardGrid columns={4}>
        <MetricCard
          label="Exemplary OTD"
          value=">=95%"
          subtitle="Top-tier delivery"
          icon={<CheckCircle className="h-5 w-5" />}
        />
        <MetricCard
          label="Acceptable OTD"
          value="88-94%"
          subtitle="Within tolerance"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard
          label="Watch OTD"
          value="75-87%"
          subtitle="Needs attention"
          icon={<AlertTriangle className="h-5 w-5" />}
          valueClassName="text-yellow-500"
        />
        <MetricCard
          label="At-Risk OTD"
          value="<75%"
          subtitle="Corrective action required"
          icon={<AlertTriangle className="h-5 w-5" />}
          valueClassName="text-red-500"
        />
      </MetricCardGrid>

      {/* Metric Cards - Row 2 */}
      <MetricCardGrid columns={4}>
        <MetricCard
          label="Cost-Plus Avg Cost Growth"
          value="45%"
          icon={<TrendingUp className="h-5 w-5" />}
          valueClassName="text-yellow-500"
        />
        <MetricCard
          label="Fixed-Price Avg Cost Growth"
          value="25%"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard
          label="Cost-Plus CO Rate"
          value="~35%"
          icon={<Target className="h-5 w-5" />}
          valueClassName="text-yellow-500"
        />
        <MetricCard
          label="Fixed-Price CO Rate"
          value="~15%"
          icon={<Clock className="h-5 w-5" />}
        />
      </MetricCardGrid>

      {/* Wow Moment Callout */}
      <Card className="bg-pharos-card border-pharos-gold/30">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-pharos-gold/10">
              <AlertTriangle className="h-5 w-5 text-pharos-gold" />
            </div>
            <p className="text-sm font-medium text-ink">
              ATLAS C2 is running at a <span className="text-pharos-gold font-bold">45.0%</span> change-order rate — a delivery risk and a follow-on capture signal at the same time.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Confidence Chart */}
      <ChartContainer
        title="Delivery Confidence Bands"
        subtitle="OTD thresholds defining contract delivery health tiers"
        height={320}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={deliveryBands} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey="band" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} width={90} />
            <Tooltip content={<DeliveryTooltip />} />
            <Bar dataKey="threshold" radius={[0, 6, 6, 0]}>
              {deliveryBands.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Follow-On Readiness Table */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardHeader>
          <CardTitle className="text-ink">Follow-On Readiness</CardTitle>
          <CardDescription>
            Contract delivery posture for recompete and follow-on capture
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={followOnData}
            columns={followOnColumns}
            searchable={false}
            pageSize={10}
          />
        </CardContent>
      </Card>

      {/* Scope Expansion Hotspots Table */}
      <Card className="bg-pharos-card border-pharos-border">
        <CardHeader>
          <CardTitle className="text-ink">Scope Expansion Hotspots</CardTitle>
          <CardDescription>
            Contracts with elevated change-order rates signaling scope growth or delivery risk
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={scopeExpansion}
            columns={scopeColumns}
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
