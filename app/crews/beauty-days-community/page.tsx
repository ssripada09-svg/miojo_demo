'use client';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import { Users, MapPin } from 'lucide-react';
import { CrewHeader } from '@/components/miojo/CrewHeader';
import { Section, KpiRow, RecsList } from '@/components/miojo/Section';
import { TrustFooter } from '@/components/shared/AegisFooter';
import {
  BEAUTY_DAYS_KPIS,
  BEAUTY_DAYS_FUNNEL,
  BEAUTY_DAYS_CITIES,
  BEAUTY_DAYS_GROWTH,
  BEAUTY_DAYS_INTERESTS,
  BEAUTY_DAYS_SPONSORS,
  BEAUTY_DAYS_AMBASSADORS,
  BEAUTY_DAYS_RECOMMENDATIONS,
} from '@/data/miojo-mock';

const STATUS_COLOR: Record<string, string> = {
  Anchor: 'var(--ph-teal-deep)',
  Scaling: 'var(--ph-teal)',
  Launching: 'var(--ph-gold-strong)',
  Building: 'var(--ph-ink-muted)',
};

export default function BeautyDaysPage() {
  const maxDensity = Math.max(...BEAUTY_DAYS_CITIES.map((c) => c.density));

  return (
    <div className="max-w-[1280px] mx-auto">
      <CrewHeader
        eyebrow="Crew 03 · Beauty Days Community"
        title="Beauty Days"
        italicWord="Days"
        subtitle="The IRL-to-digital community OS — Miojo’s scaling wedge."
        mission="Turns Beauty Days events into a recurring community, sponsor, and first-party data engine. Where audience capital becomes platform equity."
        icon={Users}
        accent="teal"
        pillar="Beauty Days · Launching"
        liveValue="11.4K members · 7 cities"
      />

      {/* KPIs */}
      <Section eyebrow="Community at a glance">
        <KpiRow kpis={BEAUTY_DAYS_KPIS} columns={4} />
      </Section>

      {/* GROWTH + FUNNEL */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
        <div className="lg:col-span-3">
          <Section
            eyebrow="Member growth"
            title="From event audience to year-round community"
            description="Cumulative members captured into the digital layer over the last seven months."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6" style={{ height: 320 }}>
              <ResponsiveContainer>
                <AreaChart data={BEAUTY_DAYS_GROWTH} margin={{ top: 16, right: 16, bottom: 8, left: 8 }}>
                  <defs>
                    <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--ph-teal)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--ph-teal)" stopOpacity={0.04} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--ph-hairline)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--ph-ink-muted)" fontSize={11} />
                  <YAxis stroke="var(--ph-ink-muted)" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--ph-surface)',
                      border: '1px solid var(--ph-border-strong)',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="members"
                    stroke="var(--ph-teal-deep)"
                    strokeWidth={2}
                    fill="url(#growthFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </div>

        <div className="lg:col-span-2">
          <Section
            eyebrow="The funnel"
            title="RSVP → 90-day active"
            description="What turns into recurring members."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6">
              <ul className="space-y-4">
                {BEAUTY_DAYS_FUNNEL.map((f) => (
                  <li key={f.stage}>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-sm font-medium text-ink">{f.stage}</span>
                      <span className="text-xs ph-mono text-ink-muted">
                        {f.count.toLocaleString()} · {f.share}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--ph-surface-sunk)] overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${f.share}%`,
                          background: 'linear-gradient(90deg, var(--ph-teal-deep), var(--ph-teal))',
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-ink-muted mt-5 leading-relaxed pt-4 border-t border-[var(--ph-border)]">
                Beauty Days isn’t a single event — it’s the 90-day loop. The crew watches every step
                and recommends interventions before drop-off.
              </p>
            </div>
          </Section>
        </div>
      </div>

      {/* CITY MAP */}
      <Section
        eyebrow="City heat"
        title="Where the community lives"
        description="Membership density and growth across active cities. Density is illustrative, scaled 0–92."
      >
        <div className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {BEAUTY_DAYS_CITIES.map((c) => {
              const intensity = c.density / maxDensity;
              return (
                <div
                  key={c.city}
                  className="rounded-xl border border-[var(--ph-border)] p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{
                    background: `linear-gradient(135deg, rgba(31,182,184,${0.04 + intensity * 0.16}) 0%, var(--ph-surface) 100%)`,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-teal-deep mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-ink">{c.city}</p>
                        <p className="text-xs text-ink-muted mt-0.5">
                          {c.members.toLocaleString()} members · +{c.growth}% q/q
                        </p>
                      </div>
                    </div>
                    <span
                      className="text-[10px] ph-mono uppercase tracking-[0.16em] px-2 py-1 rounded-full whitespace-nowrap"
                      style={{
                        background: 'var(--ph-surface)',
                        color: STATUS_COLOR[c.status] || 'var(--ph-ink-muted)',
                        border: '1px solid var(--ph-border)',
                      }}
                    >
                      {c.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--ph-border)]">
                    <div className="flex-1 mr-3">
                      <div className="text-[10px] ph-mono uppercase tracking-[0.16em] text-ink-faint mb-1">
                        Density
                      </div>
                      <div className="h-1.5 rounded-full bg-[var(--ph-surface-sunk)]">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${c.density}%`, background: 'var(--ph-teal-deep)' }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] ph-mono uppercase tracking-[0.16em] text-ink-faint">
                        Next
                      </div>
                      <div className="text-xs font-medium text-ink">{c.nextEvent}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* INTERESTS + SPONSORS */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
        <div className="lg:col-span-2">
          <Section
            eyebrow="Interest clusters"
            title="What the community comes for"
            description="Member interest distribution — input for sponsor matching, programming, and concept testing."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6" style={{ minHeight: 320 }}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={BEAUTY_DAYS_INTERESTS} layout="vertical" margin={{ top: 4, right: 8, bottom: 4, left: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--ph-hairline)" horizontal={false} />
                  <XAxis type="number" stroke="var(--ph-ink-muted)" fontSize={10} />
                  <YAxis type="category" dataKey="cluster" stroke="var(--ph-ink-muted)" fontSize={10} width={130} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--ph-surface)',
                      border: '1px solid var(--ph-border-strong)',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    formatter={(v) => `${v}%`}
                  />
                  <Bar dataKey="share" radius={[0, 6, 6, 0]}>
                    {BEAUTY_DAYS_INTERESTS.map((_, i) => (
                      <Cell
                        key={i}
                        fill={i === 0 ? 'var(--ph-teal-deep)' : i === 1 ? 'var(--ph-teal)' : 'var(--ph-gold-strong)'}
                        fillOpacity={i < 3 ? 1 : 0.7 - i * 0.05}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </div>

        <div className="lg:col-span-3">
          <Section
            eyebrow="Sponsor ledger"
            title="Brand partner performance"
            description="Dwell, opt-in rate, re-engagement intent. The data sponsors stay for."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--ph-border)] bg-[var(--ph-surface-sunk)]">
                    <Th>Brand</Th>
                    <Th>Tier</Th>
                    <Th>Dwell (min)</Th>
                    <Th>Opt-in %</Th>
                    <Th>Re-engage</Th>
                    <Th>Crew note</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--ph-border)]">
                  {BEAUTY_DAYS_SPONSORS.map((s) => (
                    <tr key={s.brand} className="hover:bg-[var(--ph-surface-sunk)] transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-ink">{s.brand}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-[10px] ph-mono uppercase tracking-[0.16em] px-2 py-1 rounded-full ${
                            s.tier === 'Anchor'
                              ? 'bg-teal-tint text-teal-deep'
                              : s.tier === 'Activation'
                                ? 'bg-gold-tint text-gold-deep'
                                : 'bg-[var(--ph-surface-sunk)] text-ink-muted'
                          }`}
                        >
                          {s.tier}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-ink ph-mono">{s.dwell}</td>
                      <td className="px-4 py-3 text-sm text-ink ph-mono">{s.optin}%</td>
                      <td className="px-4 py-3 text-sm text-ink-muted">{s.reengage}</td>
                      <td className="px-4 py-3 text-xs text-ink-muted max-w-[260px]">{s.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>
      </div>

      {/* AMBASSADORS */}
      <Section
        eyebrow="Ambassadors & creators"
        title="The voices activating the community"
        description="Active creators by city — last touch, audience scale, voice signature."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {BEAUTY_DAYS_AMBASSADORS.map((a) => (
            <div
              key={a.name}
              className="rounded-xl border border-[var(--ph-border)] bg-surface p-4 hover:-translate-y-0.5 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{a.name}</p>
                  <p className="text-xs text-ink-muted mt-0.5">{a.city}</p>
                </div>
                <span
                  className={`text-[10px] ph-mono uppercase tracking-[0.16em] px-2 py-1 rounded-full ${
                    a.lastActive === 'Today' ? 'bg-teal-tint text-teal-deep' : 'bg-[var(--ph-surface-sunk)] text-ink-muted'
                  }`}
                >
                  {a.lastActive}
                </span>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--ph-border)] text-xs text-ink-muted">
                <span>{(a.followers / 1000).toFixed(0)}K followers</span>
                <span className="ph-mono uppercase tracking-[0.14em]">{a.vibe}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* RECOMMENDATIONS */}
      <Section
        eyebrow="Crew recommendations"
        title="Three plays the community OS suggests next"
      >
        <RecsList items={BEAUTY_DAYS_RECOMMENDATIONS} />
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
