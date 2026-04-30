'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { MapPin } from 'lucide-react';
import { CrewHeader } from '@/components/miojo/CrewHeader';
import { Section, KpiRow, RecsList } from '@/components/miojo/Section';
import { TrustFooter } from '@/components/shared/AegisFooter';
import {
  EXPERIENCE_KPIS,
  EXPERIENCE_RESIDENCIES,
  EXPERIENCE_PACKAGE_MIX,
  EXPERIENCE_BOOKING_PACE,
  EXPERIENCE_GUEST_SEGMENTS,
  EXPERIENCE_RECOMMENDATIONS,
} from '@/data/miojo-mock';

const PACKAGE_COLORS = [
  'var(--ph-teal-deep)',
  'var(--ph-teal)',
  'var(--ph-gold-strong)',
  'var(--ph-gold)',
  'var(--ph-ink)',
  'var(--ph-ink-muted)',
];

const KIND_COLOR: Record<string, string> = {
  'Chef Residency': 'var(--ph-gold-strong)',
  'Wellness Stay': 'var(--ph-teal-deep)',
  Residency: 'var(--ph-ink)',
  'Editorial Series': 'var(--ph-teal)',
};

export default function ExperienceEnginePage() {
  return (
    <div className="max-w-[1280px] mx-auto">
      <CrewHeader
        eyebrow="Crew 04 · Experience Engine"
        title="Experience Engine"
        italicWord="Experience"
        subtitle="Hospitality, wellness, and editorial commerce — in one operating surface."
        mission="Manages the chef residencies, wellness stays, and culinary storytelling that translate the Mi Ojo brand world into sensory experience. The slow-compounding asset layer."
        icon={MapPin}
        accent="clay"
        pillar="Peppers and Beli + Residences"
        liveValue="11 / 12 slots booked"
      />

      <Section eyebrow="Engine status">
        <KpiRow kpis={EXPERIENCE_KPIS} columns={4} />
      </Section>

      {/* RESIDENCY CALENDAR */}
      <Section
        eyebrow="Residency calendar"
        title="What's on, what's next"
        description="Twelve residency and wellness slots across Brooklyn, Marrakesh, Tulum, London, and the coast — booked, in window, and forecast."
      >
        <div className="rounded-2xl border border-[var(--ph-border)] bg-surface overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--ph-border)] bg-[var(--ph-surface-sunk)]">
                <Th>Slot</Th>
                <Th>Programming</Th>
                <Th>Kind</Th>
                <Th>Window</Th>
                <Th>Sell-through</Th>
                <Th>Package</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--ph-border)]">
              {EXPERIENCE_RESIDENCIES.map((r) => (
                <tr key={r.id} className="hover:bg-[var(--ph-surface-sunk)] transition-colors">
                  <td className="px-4 py-3 text-xs ph-mono text-ink-muted">{r.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-ink">{r.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className="text-[10px] ph-mono uppercase tracking-[0.16em] px-2 py-1 rounded-full"
                      style={{
                        background: 'var(--ph-surface-sunk)',
                        color: KIND_COLOR[r.kind] || 'var(--ph-ink-muted)',
                      }}
                    >
                      {r.kind}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-ink-muted whitespace-nowrap">
                    {r.start} – {r.end}
                  </td>
                  <td className="px-4 py-3 min-w-[140px]">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-[var(--ph-surface-sunk)]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${r.booked}%`,
                            background:
                              r.booked >= 90
                                ? 'var(--ph-success)'
                                : r.booked >= 75
                                  ? 'var(--ph-teal-deep)'
                                  : 'var(--ph-gold-strong)',
                          }}
                        />
                      </div>
                      <span className="text-xs ph-mono text-ink-muted">{r.booked}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-ink-muted">{r.package}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* BOOKING PACE + PACKAGE MIX */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
        <div className="lg:col-span-3">
          <Section
            eyebrow="Booking pace"
            title="Sell-through curve"
            description="Cumulative bookings by week before residency open. Strong residencies cross 70% before W-4."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6" style={{ height: 320 }}>
              <ResponsiveContainer>
                <LineChart data={EXPERIENCE_BOOKING_PACE} margin={{ top: 16, right: 16, bottom: 8, left: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--ph-hairline)" />
                  <XAxis dataKey="week" stroke="var(--ph-ink-muted)" fontSize={11} />
                  <YAxis stroke="var(--ph-ink-muted)" fontSize={11} unit="%" />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--ph-surface)',
                      border: '1px solid var(--ph-border-strong)',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Line type="monotone" dataKey="brooklyn" stroke="var(--ph-gold-strong)" strokeWidth={2.5} dot={false} name="Brooklyn" />
                  <Line type="monotone" dataKey="mexico" stroke="var(--ph-teal-deep)" strokeWidth={2.5} dot={false} name="Mexico City" />
                  <Line type="monotone" dataKey="marrakesh" stroke="var(--ph-ink)" strokeWidth={2.5} dot={false} name="Marrakesh" />
                  <Line type="monotone" dataKey="tulum" stroke="var(--ph-teal)" strokeWidth={2.5} dot={false} name="Tulum" />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 mt-4 text-xs">
                {[
                  { label: 'Brooklyn', color: 'var(--ph-gold-strong)' },
                  { label: 'Mexico City', color: 'var(--ph-teal-deep)' },
                  { label: 'Marrakesh', color: 'var(--ph-ink)' },
                  { label: 'Tulum', color: 'var(--ph-teal)' },
                ].map((l) => (
                  <span key={l.label} className="inline-flex items-center gap-1.5 text-ink-muted">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                    {l.label}
                  </span>
                ))}
              </div>
            </div>
          </Section>
        </div>

        <div className="lg:col-span-2">
          <Section
            eyebrow="Package mix"
            title="What guests choose"
            description="Share of bookings by package, with quarter-over-quarter growth signal."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6">
              <div style={{ height: 220 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={EXPERIENCE_PACKAGE_MIX}
                      dataKey="share"
                      nameKey="package"
                      innerRadius={48}
                      outerRadius={86}
                      stroke="var(--ph-bg-raised)"
                      strokeWidth={2}
                    >
                      {EXPERIENCE_PACKAGE_MIX.map((_, i) => (
                        <Cell key={i} fill={PACKAGE_COLORS[i % PACKAGE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: 'var(--ph-surface)',
                        border: '1px solid var(--ph-border-strong)',
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                      formatter={(v) => `${v}%`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="mt-2 space-y-2">
                {EXPERIENCE_PACKAGE_MIX.map((p, i) => (
                  <li key={p.package} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: PACKAGE_COLORS[i % PACKAGE_COLORS.length] }}
                      />
                      <span className="text-ink-soft">{p.package}</span>
                    </span>
                    <span className="ph-mono text-xs text-ink-muted">
                      {p.share}% · <span className="text-pass">+{p.growth}%</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </div>
      </div>

      {/* GUEST SEGMENTS */}
      <Section
        eyebrow="Guest segments"
        title="Who Mi Ojo is hosting"
        description="Segment mix across the year. Founder + BeautyDays member overlap is the strongest cross-pillar signal."
      >
        <div className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6">
          <div className="space-y-3">
            {EXPERIENCE_GUEST_SEGMENTS.map((s, i) => (
              <div key={s.segment}>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-sm font-medium text-ink">{s.segment}</span>
                  <span className="text-xs ph-mono text-ink-muted">{s.share}%</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--ph-surface-sunk)] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${s.share * 2.5}%`,
                      background:
                        i < 2
                          ? 'linear-gradient(90deg, var(--ph-teal-deep), var(--ph-teal))'
                          : 'linear-gradient(90deg, var(--ph-gold-strong), var(--ph-gold))',
                      maxWidth: '100%',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Concierge recommendations"
        title="What the engine suggests next"
      >
        <RecsList items={EXPERIENCE_RECOMMENDATIONS} />
      </Section>

      <TrustFooter />
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-[10px] ph-mono uppercase tracking-[0.18em] text-ink-muted whitespace-nowrap">
      {children}
    </th>
  );
}
