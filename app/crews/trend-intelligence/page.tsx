'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';
import { Radar } from 'lucide-react';
import { CrewHeader } from '@/components/miojo/CrewHeader';
import { Section, KpiRow, RecsList } from '@/components/miojo/Section';
import { TrustFooter } from '@/components/shared/AegisFooter';
import {
  TREND_KPIS,
  TREND_CLUSTERS,
  TREND_VELOCITY_SERIES,
  TREND_OPPORTUNITIES,
  TREND_CONCEPT_FORECASTS,
  TREND_RECOMMENDATIONS,
} from '@/data/miojo-mock';

const KIND_COLORS: Record<string, string> = {
  Chef: 'var(--ph-gold-strong)',
  Founder: 'var(--ph-teal-deep)',
  Retailer: 'var(--ph-ink)',
  Creator: 'var(--ph-teal)',
  Capital: 'var(--ph-gold-deep)',
  Brand: 'var(--ph-teal-strong)',
  Property: 'var(--ph-ink-muted)',
  'Capital / Network': 'var(--ph-gold)',
  Network: 'var(--ph-teal)',
  Cultural: 'var(--ph-ink)',
};

export default function TrendIntelligencePage() {
  return (
    <div className="max-w-[1280px] mx-auto">
      <CrewHeader
        eyebrow="Crew 05 · Trend Intelligence"
        title="Trend Intelligence"
        italicWord="Intelligence"
        subtitle="Foresight, opportunities, and signal — amplified."
        mission="Continuous radar across beauty, wellness, fashion, hospitality, and culture. Watches what would otherwise slip past, and ranks it against thesis fit and signal velocity."
        icon={Radar}
        accent="teal"
        pillar="Cross-pillar"
        liveValue="9 trend clusters · +34% w/w"
      />

      <Section eyebrow="Radar status">
        <KpiRow kpis={TREND_KPIS} columns={4} />
      </Section>

      {/* VELOCITY + CONFIDENCE MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
        <div className="lg:col-span-3">
          <Section
            eyebrow="Signal velocity"
            title="Trend acceleration over seven weeks"
            description="Four representative clusters. Longevity × beauty just crossed the velocity threshold."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6" style={{ height: 320 }}>
              <ResponsiveContainer>
                <LineChart data={TREND_VELOCITY_SERIES} margin={{ top: 16, right: 16, bottom: 8, left: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--ph-hairline)" />
                  <XAxis dataKey="week" stroke="var(--ph-ink-muted)" fontSize={11} />
                  <YAxis stroke="var(--ph-ink-muted)" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--ph-surface)',
                      border: '1px solid var(--ph-border-strong)',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Line type="monotone" dataKey="longevity" stroke="var(--ph-teal-deep)" strokeWidth={2.5} dot={false} name="Longevity × beauty" />
                  <Line type="monotone" dataKey="texture" stroke="var(--ph-gold-strong)" strokeWidth={2.5} dot={false} name="Texture-first hair" />
                  <Line type="monotone" dataKey="chef" stroke="var(--ph-teal)" strokeWidth={2.5} dot={false} name="Chef-led fragrance" />
                  <Line type="monotone" dataKey="hospitality" stroke="var(--ph-ink)" strokeWidth={2.5} dot={false} name="Restored-home hospitality" />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 mt-4 text-xs">
                {[
                  { label: 'Longevity × beauty', color: 'var(--ph-teal-deep)' },
                  { label: 'Texture-first hair', color: 'var(--ph-gold-strong)' },
                  { label: 'Chef-led fragrance', color: 'var(--ph-teal)' },
                  { label: 'Restored-home hospitality', color: 'var(--ph-ink)' },
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
            eyebrow="Confidence matrix"
            title="Velocity × fit"
            description="Each cluster plotted by velocity (X) and Miojo-fit (Y). Bubble size scales with crew confidence."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6" style={{ height: 320 }}>
              <ResponsiveContainer>
                <ScatterChart margin={{ top: 16, right: 16, bottom: 16, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--ph-hairline)" />
                  <XAxis
                    type="number"
                    dataKey="velocity"
                    name="Velocity"
                    stroke="var(--ph-ink-muted)"
                    fontSize={11}
                    domain={[30, 100]}
                  />
                  <YAxis
                    type="number"
                    dataKey="fit"
                    name="Fit"
                    stroke="var(--ph-ink-muted)"
                    fontSize={11}
                    domain={[60, 100]}
                  />
                  <ZAxis type="number" dataKey="confidence" range={[60, 360]} />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{
                      background: 'var(--ph-surface)',
                      border: '1px solid var(--ph-border-strong)',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    formatter={(v, k) => [String(v), String(k)]}
                    labelFormatter={(_, items) => {
                      const p = items?.[0]?.payload as { name?: string } | undefined;
                      return p?.name || '';
                    }}
                  />
                  <Scatter data={TREND_CLUSTERS} fill="var(--ph-teal)" fillOpacity={0.55} stroke="var(--ph-teal-deep)" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </div>
      </div>

      {/* OPPORTUNITY LEADERBOARD */}
      <Section
        eyebrow="Opportunity radar"
        title="Twelve people, brands, and places worth meeting"
        description="Each opportunity ranked against thesis fit and current signal. Use as a meeting prep + outreach queue."
      >
        <div className="rounded-2xl border border-[var(--ph-border)] bg-surface overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--ph-border)] bg-[var(--ph-surface-sunk)]">
                <Th>Match</Th>
                <Th>Name</Th>
                <Th>Kind</Th>
                <Th>Vertical</Th>
                <Th>Signal</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--ph-border)]">
              {TREND_OPPORTUNITIES.map((o) => (
                <tr key={o.name} className="hover:bg-[var(--ph-surface-sunk)] transition-colors">
                  <td className="px-4 py-3 min-w-[120px]">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-ink ph-mono">{o.match}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-[var(--ph-surface-sunk)]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${o.match}%`,
                            background:
                              o.match >= 85
                                ? 'var(--ph-teal-deep)'
                                : o.match >= 75
                                  ? 'var(--ph-teal)'
                                  : 'var(--ph-gold-strong)',
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-ink">{o.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className="text-[10px] ph-mono uppercase tracking-[0.16em] px-2 py-1 rounded-full"
                      style={{
                        background: 'var(--ph-surface-sunk)',
                        color: KIND_COLORS[o.kind] || 'var(--ph-ink-muted)',
                      }}
                    >
                      {o.kind}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-ink-muted whitespace-nowrap">{o.vertical}</td>
                  <td className="px-4 py-3 text-xs text-ink-muted max-w-[420px]">{o.signal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* CONCEPT FORECAST */}
      <Section
        eyebrow="Concept forecast"
        title="Six concepts — scored against thesis fit"
        description="The crew runs these scorecards weekly. Green = greenlight; gold = refine; muted = hold."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TREND_CONCEPT_FORECASTS.map((c) => (
            <div
              key={c.concept}
              className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 hover:-translate-y-0.5 hover:shadow-md transition-all"
            >
              <p className="text-base font-semibold text-ink mb-3">{c.concept}</p>
              <div className="space-y-2 mb-4">
                {[
                  { label: 'Velocity', value: c.velocity },
                  { label: 'Confidence', value: c.confidence },
                  { label: 'Fit', value: c.fit },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] ph-mono uppercase tracking-[0.16em] text-ink-muted">
                        {m.label}
                      </span>
                      <span className="text-xs ph-mono text-ink-muted">{m.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[var(--ph-surface-sunk)]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${m.value}%`,
                          background: 'linear-gradient(90deg, var(--ph-teal-deep), var(--ph-teal))',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-ink-muted leading-relaxed pt-3 border-t border-[var(--ph-border)]">
                <span className="ph-mono uppercase tracking-[0.14em] text-teal-deep mr-1.5">Crew:</span>
                {c.recommendation}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Crew recommendations" title="What the radar suggests next">
        <RecsList items={TREND_RECOMMENDATIONS} />
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
