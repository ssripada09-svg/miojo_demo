'use client';

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Compass, AlertTriangle, Lightbulb, Layers, ArrowRight } from 'lucide-react';
import { CrewHeader } from '@/components/miojo/CrewHeader';
import { Section, KpiRow } from '@/components/miojo/Section';
import { TrustFooter } from '@/components/shared/AegisFooter';
import {
  COMMAND_KPIS,
  COMMAND_TIMELINE,
  COMMAND_INVESTOR_TRACKS,
  COMMAND_DECISIONS,
  COMMAND_PILLAR_HEALTH,
  FOUNDER_BRIEF,
  RECENT_ACTIVITY,
} from '@/data/miojo-mock';

const PILLAR_COLORS: Record<string, string> = {
  'Mi Ojo': '#C87730',
  'Beauty Days': '#1FB6B8',
  'Peppers & Bellies': '#0F7A7C',
  'Residences': '#0F0F0E',
};

const TIMELINE_KIND_COLOR: Record<string, string> = {
  milestone: 'var(--ph-ink)',
  decision: 'var(--ph-gold-strong)',
  activation: 'var(--ph-teal)',
};

export default function FounderCommandPage() {
  return (
    <div className="max-w-[1280px] mx-auto">
      <CrewHeader
        eyebrow="Crew 01 · Founder Command"
        title="Founder Command"
        italicWord="Command"
        subtitle="The executive home for the Miojo platform."
        mission="Cross-pillar intelligence — every morning brief, every priority decision, every investor relationship in one place. Built so Ciarra spends her time on judgement, not coordination."
        icon={Compass}
        accent="teal"
        pillar="Cross-pillar"
        liveValue="14 active threads"
      />

      {/* KPI ROW */}
      <Section eyebrow="Health right now">
        <KpiRow kpis={COMMAND_KPIS} columns={4} />
      </Section>

      {/* FOUNDER BRIEF MISSION */}
      <Section
        eyebrow="Active mission"
        title="Today's brief"
        description="The crew composed this 6:48 AM. Sources logged. Awaiting your read before 10 AM."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BriefCell
            icon={<Lightbulb className="w-4 h-4" />}
            label="Top Opportunity"
            color="teal"
            headline={FOUNDER_BRIEF.topOpportunity.headline}
            detail={FOUNDER_BRIEF.topOpportunity.detail}
          />
          <BriefCell
            icon={<AlertTriangle className="w-4 h-4" />}
            label="Top Risk"
            color="warn"
            headline={FOUNDER_BRIEF.topRisk.headline}
            detail={FOUNDER_BRIEF.topRisk.detail}
          />
          <BriefCell
            icon={<Compass className="w-4 h-4" />}
            label="Top Decision"
            color="gold"
            headline={FOUNDER_BRIEF.topDecision.headline}
            detail={FOUNDER_BRIEF.topDecision.detail}
          />
          <BriefCell
            icon={<Layers className="w-4 h-4" />}
            label="Cross-Pillar Insight"
            color="ink"
            headline={FOUNDER_BRIEF.topCrossPillar.headline}
            detail={FOUNDER_BRIEF.topCrossPillar.detail}
          />
        </div>
      </Section>

      {/* TIMELINE + PILLAR MIX */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2">
          <Section
            eyebrow="30 / 60 / 90 day horizon"
            title="The activation timeline"
            description="Every milestone, decision, and activation — colored by kind, anchored to a pillar."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6">
              <ol className="space-y-4">
                {COMMAND_TIMELINE.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="flex flex-col items-center pt-1">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: TIMELINE_KIND_COLOR[item.kind] || 'var(--ph-ink)' }}
                      />
                      {i < COMMAND_TIMELINE.length - 1 && (
                        <div className="w-px flex-1 bg-[var(--ph-border)] mt-1.5" style={{ minHeight: 24 }} />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-baseline justify-between gap-3 flex-wrap">
                        <p className="text-sm font-medium text-ink">{item.label}</p>
                        <span className="text-[10px] ph-mono uppercase tracking-[0.16em] text-ink-muted whitespace-nowrap">
                          {item.day}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] ph-mono uppercase tracking-[0.16em] text-ink-faint">
                          {item.kind}
                        </span>
                        <span className="text-[10px] text-ink-faint">·</span>
                        <span className="text-[10px] ph-mono uppercase tracking-[0.16em] text-teal-deep">
                          {item.pillar}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Section>
        </div>

        <div>
          <Section
            eyebrow="Pillar mix"
            title="Where revenue compounds"
            description="Effort and revenue allocation across the four pillars."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6">
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={COMMAND_PILLAR_HEALTH}
                      dataKey="share"
                      nameKey="pillar"
                      innerRadius={50}
                      outerRadius={86}
                      stroke="var(--ph-bg-raised)"
                      strokeWidth={2}
                    >
                      {COMMAND_PILLAR_HEALTH.map((p) => (
                        <Cell key={p.pillar} fill={PILLAR_COLORS[p.pillar] || '#999'} />
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
              <ul className="space-y-3 mt-4">
                {COMMAND_PILLAR_HEALTH.map((p) => (
                  <li key={p.pillar} className="flex items-start gap-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: PILLAR_COLORS[p.pillar] }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-ink">{p.pillar}</span>
                        <span className="text-xs ph-mono text-ink-muted">{p.share}%</span>
                      </div>
                      <p className="text-xs text-ink-faint mt-0.5">{p.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </div>
      </div>

      {/* INVESTOR PIPELINE */}
      <Section
        eyebrow="Investor pipeline"
        title="Capital tracks"
        description="Family-office and strategic conversations — ranked by signal, scored against thesis fit."
      >
        <div className="rounded-2xl border border-[var(--ph-border)] bg-surface overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--ph-border)] bg-[var(--ph-surface-sunk)]">
                <Th>Partner</Th>
                <Th>Archetype</Th>
                <Th>Stage</Th>
                <Th>Signal</Th>
                <Th>Last touch</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--ph-border)]">
              {COMMAND_INVESTOR_TRACKS.map((t) => (
                <tr key={t.partner} className="hover:bg-[var(--ph-surface-sunk)] transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-ink">{t.partner}</td>
                  <td className="px-4 py-3 text-sm text-ink-muted">{t.archetype}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] ph-mono uppercase tracking-[0.16em] text-ink-muted px-2 py-1 rounded-full bg-[var(--ph-surface-sunk)]">
                      {t.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-[10px] ph-mono uppercase tracking-[0.16em] px-2 py-1 rounded-full ${
                        t.signal === 'High'
                          ? 'bg-teal-tint text-teal-deep'
                          : t.signal === 'Medium'
                            ? 'bg-gold-tint text-gold-deep'
                            : 'bg-[var(--ph-surface-sunk)] text-ink-muted'
                      }`}
                    >
                      {t.signal}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-ink-muted">{t.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* DECISIONS QUEUE + ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2">
          <Section
            eyebrow="Awaiting your call"
            title="Priority decisions"
            description="Five threads where the crew has done the work and needs Ciarra to choose."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface divide-y divide-[var(--ph-border)]">
              {COMMAND_DECISIONS.map((d, i) => (
                <div key={i} className="px-5 py-4 flex items-center justify-between gap-3 hover:bg-[var(--ph-surface-sunk)] transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink">{d.label}</p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      <span className="ph-mono uppercase tracking-[0.16em]">{d.owner}</span> · due {d.due}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                      className={`text-[10px] ph-mono uppercase tracking-[0.16em] px-2 py-1 rounded-full ${
                        d.priority === 'High' ? 'bg-[rgba(180,83,9,0.10)] text-warning' : 'bg-[var(--ph-surface-sunk)] text-ink-muted'
                      }`}
                    >
                      {d.priority}
                    </span>
                    <ArrowRight className="w-4 h-4 text-ink-muted" />
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <div>
          <Section
            eyebrow="Recent activity"
            title="The signal feed"
            description="Cross-crew events from the last day."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface divide-y divide-[var(--ph-border)]">
              {RECENT_ACTIVITY.slice(0, 5).map((a) => (
                <div key={a.id} className="px-5 py-4">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] ph-mono uppercase tracking-[0.16em] text-teal-deep">
                      {a.crew}
                    </span>
                    <span className="text-[10px] ph-mono text-ink-faint">{a.time}</span>
                  </div>
                  <p className="text-sm text-ink font-medium leading-snug">{a.title}</p>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed">{a.detail}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* PILLAR HEALTH BAR */}
      <Section
        eyebrow="Pillar health"
        title="Cross-pillar revenue snapshot"
        description="Trailing-quarter contribution by pillar (illustrative)."
      >
        <div className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6" style={{ height: 320 }}>
          <ResponsiveContainer>
            <BarChart data={COMMAND_PILLAR_HEALTH} layout="vertical" margin={{ top: 8, right: 16, bottom: 8, left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--ph-hairline)" horizontal={false} />
              <XAxis type="number" stroke="var(--ph-ink-muted)" fontSize={11} />
              <YAxis type="category" dataKey="pillar" stroke="var(--ph-ink-muted)" fontSize={11} width={110} />
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
                {COMMAND_PILLAR_HEALTH.map((p) => (
                  <Cell key={p.pillar} fill={PILLAR_COLORS[p.pillar]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Section>

      <TrustFooter />
    </div>
  );
}

function BriefCell({
  icon,
  label,
  color,
  headline,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  color: 'teal' | 'gold' | 'warn' | 'ink';
  headline: string;
  detail: string;
}) {
  const c = {
    teal: { bg: 'bg-teal-tint', fg: 'text-teal-deep' },
    gold: { bg: 'bg-gold-tint', fg: 'text-gold-deep' },
    warn: { bg: 'bg-[rgba(180,83,9,0.10)]', fg: 'text-warning' },
    ink: { bg: 'bg-[var(--ph-surface-sunk)]', fg: 'text-ink' },
  }[color];

  return (
    <div className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6">
      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] ph-mono uppercase tracking-[0.16em] ${c.bg} ${c.fg} mb-3`}>
        {icon}
        {label}
      </div>
      <p className="text-base font-semibold text-ink mb-2 leading-snug">{headline}</p>
      <p className="text-sm text-ink-muted leading-relaxed">{detail}</p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-[10px] ph-mono uppercase tracking-[0.18em] text-ink-muted">
      {children}
    </th>
  );
}
