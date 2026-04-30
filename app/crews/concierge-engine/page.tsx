'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import {
  ConciergeBell,
  Sparkles,
  Heart,
  Users,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Pencil,
  Send,
  Clock,
  AlertTriangle,
  TrendingDown,
} from 'lucide-react';
import { CrewHeader } from '@/components/miojo/CrewHeader';
import { Section, KpiRow } from '@/components/miojo/Section';
import { TrustFooter } from '@/components/shared/AegisFooter';
import {
  CONCIERGE_PULSE,
  CONCIERGE_KPIS,
  CONCIERGE_MEMBERS,
  CONCIERGE_ARCHETYPES,
  CONCIERGE_QUEUE,
  CONCIERGE_ITINERARIES,
  CROSS_PILLAR_TRANSITIONS,
  CONCIERGE_AT_RISK,
  CONCIERGE_OCCASIONS,
} from '@/data/miojo-mock';

const PILLAR_TINT: Record<string, string> = {
  'Peppers & Beli': 'var(--mj-clay)',
  Residences: 'var(--mj-sage-deep)',
  BeautyDays: 'var(--mj-sage)',
  Studio: 'var(--mj-forest)',
  Concierge: 'var(--mj-peach-strong)',
  Founder: 'var(--mj-forest)',
  Membership: 'var(--mj-clay-strong)',
};

const STATUS_STYLE: Record<string, { bg: string; fg: string; icon: React.ReactNode }> = {
  'AI Draft': { bg: 'bg-[var(--ph-surface-sunk)]', fg: 'text-ink-muted', icon: <Sparkles className="w-3 h-3" /> },
  'Pending Review': { bg: 'bg-peach-tint', fg: 'text-clay-strong', icon: <Clock className="w-3 h-3" /> },
  'Edited by Concierge': { bg: 'bg-sage-tint', fg: 'text-sage-deep', icon: <Pencil className="w-3 h-3" /> },
  Sent: { bg: 'bg-clay-tint', fg: 'text-clay', icon: <Send className="w-3 h-3" /> },
  Booked: { bg: 'bg-forest-tint', fg: 'text-forest', icon: <CheckCircle2 className="w-3 h-3" /> },
};

const TIER_STYLE: Record<string, string> = {
  'Founders Circle': 'bg-forest-tint text-forest',
  House: 'bg-sage-tint text-sage-deep',
  Resident: 'bg-clay-tint text-clay',
  New: 'bg-[var(--ph-surface-sunk)] text-ink-muted',
};

export default function ConciergeEnginePage() {
  return (
    <div className="max-w-[1280px] mx-auto">
      <CrewHeader
        eyebrow="Crew 06 · Concierge Engine"
        title="Concierge Engine"
        italicWord="Concierge"
        subtitle="The relationship layer of Mi Ojo OS."
        mission="Guest memory, occasion detection, and AI-drafted invitations that human concierges refine. Where one booking compounds into repeat behavior, higher spend, and cross-pillar loyalty."
        icon={ConciergeBell}
        accent="peach"
        pillar="Cross-pillar"
        liveValue={`${CONCIERGE_PULSE.pendingApprovals} approvals · ${CONCIERGE_PULSE.arrivalsNext7} arrivals`}
      />

      {/* 1 — COMMAND STRIP / SYSTEM PULSE */}
      <Section
        eyebrow="System pulse"
        title="The room, right now"
        description="Live posture across active members, approvals waiting on a human, and arrivals on the calendar."
      >
        <div className="rounded-2xl border border-[var(--ph-border)] bg-surface px-5 py-4 md:px-7 md:py-5">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Pulse label="Active members" value={CONCIERGE_PULSE.activeMembers.toLocaleString()} />
            <PulseDivider />
            <Pulse label="High-fit guests" value={CONCIERGE_PULSE.highFitGuests} accent="forest" />
            <PulseDivider />
            <Pulse label="Pending approvals" value={CONCIERGE_PULSE.pendingApprovals} accent="peach" />
            <PulseDivider />
            <Pulse label="Arrivals · next 7" value={CONCIERGE_PULSE.arrivalsNext7} />
            <PulseDivider />
            <Pulse label="Concierge revenue (q/q)" value={CONCIERGE_PULSE.conciergeRevenueDelta} accent="clay" />
            <div className="flex-1" />
            <div className="flex items-center gap-3 ph-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-pass opacity-60 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-pass" />
                </span>
                Last sync · {CONCIERGE_PULSE.lastSync}
              </span>
              <span className="text-ink-ghost">·</span>
              <span>{CONCIERGE_PULSE.operator}</span>
            </div>
          </div>
        </div>
      </Section>

      {/* 2 — KPI ROW */}
      <Section eyebrow="Relationship metrics" title="What the engine optimizes for">
        <KpiRow kpis={CONCIERGE_KPIS} columns={3} />
      </Section>

      {/* 3 — GUEST MEMORY WALL */}
      <Section
        eyebrow="Guest Memory"
        title="What Mi Ojo remembers"
        description="Stated facts. Observed patterns. Predicted moves. Every member is a living record — not a row in a CRM."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {CONCIERGE_MEMBERS.slice(0, 12).map((m) => (
            <article
              key={m.id}
              className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 hover:border-[var(--ph-border-strong)] hover:-translate-y-0.5 hover:shadow-md transition-all flex flex-col"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, var(--mj-forest-soft), var(--mj-forest))',
                    color: 'var(--mj-peach)',
                  }}
                >
                  {m.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink truncate">{m.name}</p>
                  <p className="text-[11px] ph-mono uppercase tracking-[0.16em] text-ink-faint">
                    {m.archetype}
                  </p>
                </div>
                <span
                  className={`text-[10px] ph-mono uppercase tracking-[0.16em] px-2 py-1 rounded-full whitespace-nowrap ${TIER_STYLE[m.tier] || ''}`}
                >
                  {m.tier}
                </span>
              </div>

              {m.flags && m.flags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {m.flags.map((f) => (
                    <span
                      key={f}
                      className={`text-[10px] ph-mono uppercase tracking-[0.14em] px-2 py-0.5 rounded-full ${
                        f === 'Founder Watch'
                          ? 'bg-forest-tint text-forest'
                          : f === 'High LTV'
                            ? 'bg-clay-tint text-clay'
                            : f === 'At Risk'
                              ? 'bg-[rgba(180,83,9,0.10)] text-warning'
                              : f === 'Investor'
                                ? 'bg-sage-tint text-sage-deep'
                                : 'bg-peach-tint text-clay-strong'
                      }`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-sm text-ink-soft leading-relaxed mb-3">{m.memorySnapshot}</p>

              {/* Memory triplet — stated / observed / predicted */}
              <div className="space-y-2 mb-4 pb-4 border-b border-[var(--ph-border)]">
                <MemoryRow label="Stated" items={m.stated} tint="forest" />
                <MemoryRow label="Observed" items={m.observed} tint="sage" />
                <MemoryRow label="Predicted" items={m.predicted} tint="peach" />
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {m.preferences.map((p) => (
                  <span
                    key={p}
                    className="text-[10px] ph-mono uppercase tracking-[0.14em] px-2 py-1 rounded-full bg-[var(--ph-surface-sunk)] text-ink-muted"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-3 border-t border-[var(--ph-border)] flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] ph-mono uppercase tracking-[0.16em] text-clay-strong mb-1">
                    Next-best action
                  </p>
                  <p className="text-xs text-ink leading-snug">{m.nextBest}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        m.health >= 85 ? 'bg-pass' : m.health >= 70 ? 'bg-sage' : 'bg-warning'
                      }`}
                    />
                    <span className="text-xs ph-mono text-ink-muted">{m.health}</span>
                  </div>
                  <p className="text-[10px] ph-mono uppercase tracking-[0.14em] text-ink-faint mt-1">
                    {m.ltv}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 text-[10px] ph-mono uppercase tracking-[0.14em] text-ink-faint">
                <span>Last touch · {m.lastTouch}</span>
                <span style={{ color: PILLAR_TINT[m.lastTouchPillar] || 'var(--ph-ink-muted)' }}>
                  {m.lastTouchPillar}
                </span>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 4 — CONCIERGE INTELLIGENCE QUEUE */}
      <Section
        eyebrow="Recommendation Queue"
        title="AI drafts. Concierge approves."
        description="Every recommendation carries a rationale, a confidence score, and a status. Nothing leaves without a human in the loop."
      >
        <div className="rounded-2xl border border-[var(--ph-border)] bg-surface divide-y divide-[var(--ph-border)] overflow-hidden">
          {CONCIERGE_QUEUE.map((rec) => {
            const status = STATUS_STYLE[rec.status];
            return (
              <div
                key={rec.id}
                className="px-5 py-4 md:px-6 md:py-5 hover:bg-[var(--ph-surface-sunk)] transition-colors"
              >
                <div className="flex flex-wrap items-start gap-x-6 gap-y-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-semibold mt-0.5"
                      style={{
                        background: 'linear-gradient(135deg, var(--mj-forest-soft), var(--mj-forest))',
                        color: 'var(--mj-peach)',
                      }}
                    >
                      {rec.memberInitials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] ph-mono uppercase tracking-[0.18em] text-ink-faint">
                          {rec.member}
                        </span>
                        <span
                          className="text-[10px] ph-mono uppercase tracking-[0.16em] px-2 py-0.5 rounded-full bg-peach-tint text-clay-strong"
                        >
                          {rec.type}
                        </span>
                        <span
                          className="text-[10px] ph-mono uppercase tracking-[0.16em] text-ink-faint"
                          style={{ color: PILLAR_TINT[rec.pillar] || 'var(--ph-ink-muted)' }}
                        >
                          · {rec.pillar}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-ink mb-1.5 leading-snug">{rec.title}</p>
                      <p className="text-xs text-ink-muted leading-relaxed">{rec.rationale}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 min-w-[150px]">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] ph-mono uppercase tracking-[0.16em] px-2.5 py-1 rounded-full ${status.bg} ${status.fg}`}
                    >
                      {status.icon}
                      {rec.status}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] ph-mono uppercase tracking-[0.14em] text-ink-faint">
                        Confidence
                      </span>
                      <span className="text-xs ph-mono font-semibold text-ink">{rec.confidence}</span>
                    </div>
                    <span className="text-[10px] ph-mono text-ink-faint">{rec.draftedAt}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 5 — ITINERARY BUILDER */}
      <Section
        eyebrow="Itinerary"
        title="Proposed journeys"
        description="Multi-pillar guest journeys composed by the engine and refined by a relationship manager. Status progresses from AI Proposed → RM Refined → Sent → Accepted."
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {CONCIERGE_ITINERARIES.map((it) => (
            <article
              key={it.id}
              className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6 flex flex-col"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-[10px] ph-mono uppercase tracking-[0.18em] text-ink-faint">
                    {it.id}
                  </p>
                  <p className="text-base font-semibold text-ink mt-1 leading-snug">{it.guest}</p>
                  <p className="text-xs text-ink-muted mt-0.5">{it.occasion}</p>
                </div>
                <span
                  className={`text-[10px] ph-mono uppercase tracking-[0.16em] px-2 py-1 rounded-full whitespace-nowrap ${
                    it.status === 'Accepted'
                      ? 'bg-forest-tint text-forest'
                      : it.status === 'Sent'
                        ? 'bg-clay-tint text-clay'
                        : it.status === 'RM Refined'
                          ? 'bg-sage-tint text-sage-deep'
                          : 'bg-peach-tint text-clay-strong'
                  }`}
                >
                  {it.status}
                </span>
              </div>

              {/* Status progression rail */}
              <div className="flex items-center gap-1 mb-5">
                {(['AI Proposed', 'RM Refined', 'Sent', 'Accepted'] as const).map((s, i, arr) => {
                  const reachedIdx = arr.indexOf(it.status);
                  const isPast = i <= reachedIdx;
                  return (
                    <div key={s} className="flex items-center gap-1 flex-1 last:flex-none">
                      <div
                        className={`h-1 flex-1 rounded-full ${
                          isPast ? 'bg-clay' : 'bg-[var(--ph-surface-sunk)]'
                        }`}
                      />
                      {i === arr.length - 1 && (
                        <div
                          className={`w-2 h-2 rounded-full ${
                            isPast ? 'bg-clay' : 'bg-[var(--ph-surface-sunk)]'
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <ol className="space-y-3 flex-1">
                {it.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ background: PILLAR_TINT[item.pillar] || 'var(--ph-ink-muted)' }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2 mb-0.5">
                        <span className="text-[10px] ph-mono uppercase tracking-[0.16em] text-ink-faint">
                          {item.time}
                        </span>
                        {item.value && (
                          <span className="text-[10px] ph-mono text-ink-muted">{item.value}</span>
                        )}
                      </div>
                      <p className="text-sm text-ink font-medium leading-snug">{item.title}</p>
                      <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">{item.detail}</p>
                      <p
                        className="text-[10px] ph-mono uppercase tracking-[0.14em] mt-1"
                        style={{ color: PILLAR_TINT[item.pillar] || 'var(--ph-ink-muted)' }}
                      >
                        {item.pillar}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-5 pt-4 border-t border-[var(--ph-border)] flex items-baseline justify-between">
                <span className="text-[10px] ph-mono uppercase tracking-[0.18em] text-ink-faint">
                  Itinerary value
                </span>
                <span className="text-lg font-semibold text-ink ph-mono">{it.total}</span>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 6 — CROSS-PILLAR FLOW + AT-RISK */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
        <div className="lg:col-span-3">
          <Section
            eyebrow="Cross-Pillar Flow"
            title="One booking, four lifetimes"
            description="How members move from a single touchpoint into multi-pillar loyalty. Width = members converting in the last 90 days."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6" style={{ height: 320 }}>
              <ResponsiveContainer>
                <BarChart
                  data={CROSS_PILLAR_TRANSITIONS}
                  layout="vertical"
                  margin={{ top: 8, right: 24, bottom: 8, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--ph-hairline)" horizontal={false} />
                  <XAxis type="number" stroke="var(--ph-ink-muted)" fontSize={11} />
                  <YAxis
                    type="category"
                    dataKey="from"
                    stroke="var(--ph-ink-muted)"
                    fontSize={11}
                    width={120}
                    tickFormatter={(v: string) => v}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--ph-surface)',
                      border: '1px solid var(--ph-border-strong)',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    formatter={(v, _, item) => {
                      const p = item?.payload as { to?: string } | undefined;
                      return [`${v} members → ${p?.to ?? ''}`, 'Crossover'];
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                    {CROSS_PILLAR_TRANSITIONS.map((t, i) => (
                      <Cell
                        key={i}
                        fill={
                          i === 0
                            ? 'var(--mj-clay)'
                            : i === 1
                              ? 'var(--mj-sage-deep)'
                              : i === 2
                                ? 'var(--mj-forest)'
                                : i === 3
                                  ? 'var(--mj-sage)'
                                  : 'var(--mj-peach-strong)'
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-4 pt-4 border-t border-[var(--ph-border)] grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                {CROSS_PILLAR_TRANSITIONS.slice(0, 3).map((t) => (
                  <div key={t.from} className="flex items-start gap-2">
                    <ArrowRight className="w-3 h-3 mt-1 text-clay-strong flex-shrink-0" />
                    <div>
                      <span className="ph-mono uppercase tracking-[0.14em] text-ink-faint">
                        {t.from}
                      </span>
                      <span className="text-ink"> → {t.to}</span>
                      <p className="text-ink-muted mt-0.5">
                        {t.count} members · {t.share}% of crossings
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>

        <div className="lg:col-span-2">
          <Section
            eyebrow="Relationship Health"
            title="Win-back queue"
            description="Members whose engagement has declined. Each gets a suggested win-back action."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface divide-y divide-[var(--ph-border)]">
              {CONCIERGE_AT_RISK.map((m) => (
                <div key={m.name} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-semibold"
                        style={{
                          background: 'var(--ph-surface-sunk)',
                          color: 'var(--ph-ink-muted)',
                        }}
                      >
                        {m.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ink truncate">{m.name}</p>
                        <p className="text-[10px] ph-mono uppercase tracking-[0.14em] text-ink-faint">
                          {m.lastTouch}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end flex-shrink-0">
                      <span className="inline-flex items-center gap-1 text-xs ph-mono text-warning">
                        <TrendingDown className="w-3 h-3" />
                        {m.delta}
                      </span>
                      <span className="text-[10px] ph-mono text-ink-faint">health · {m.health}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 pl-12 pt-2">
                    <Sparkles className="w-3 h-3 text-clay-strong mt-1 flex-shrink-0" />
                    <p className="text-xs text-ink-muted leading-relaxed">{m.suggested}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* OCCASIONS + ARCHETYPES */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
        <div className="lg:col-span-3">
          <Section
            eyebrow="Occasion detection"
            title="What's coming up that matters"
            description="Anniversaries, birthdays, launches, returns — surfaced from stated facts and pattern detection. Concierge confirms before activation."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface divide-y divide-[var(--ph-border)]">
              {CONCIERGE_OCCASIONS.map((o, i) => (
                <div key={i} className="px-5 py-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-peach-tint text-clay-strong flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-3 mb-0.5">
                      <p className="text-sm font-medium text-ink">{o.member}</p>
                      <span className="text-[10px] ph-mono uppercase tracking-[0.16em] text-clay-strong whitespace-nowrap">
                        {o.date}
                      </span>
                    </div>
                    <p className="text-xs text-ink-soft">{o.occasion}</p>
                    <p className="text-[10px] ph-mono uppercase tracking-[0.14em] text-ink-faint mt-1">
                      Source · {o.source}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <div className="lg:col-span-2">
          <Section
            eyebrow="Segment cohorts"
            title="Who Mi Ojo serves"
            description="Member archetypes, share of base, average LTV."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6">
              <ul className="space-y-4">
                {CONCIERGE_ARCHETYPES.map((a) => (
                  <li key={a.name}>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-sm font-medium text-ink">{a.name}</span>
                      <span className="text-xs ph-mono text-ink-muted">
                        {a.share}% · {a.ltv}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--ph-surface-sunk)] overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min(a.share * 3, 100)}%`,
                          background: 'linear-gradient(90deg, var(--mj-forest), var(--mj-clay))',
                        }}
                      />
                    </div>
                    <p className="text-[11px] text-ink-faint mt-1">{a.notes}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </div>
      </div>

      <TrustFooter />
    </div>
  );
}

// -------- helpers --------

function Pulse({
  label,
  value,
  accent = 'sage',
}: {
  label: string;
  value: string | number;
  accent?: 'sage' | 'clay' | 'forest' | 'peach';
}) {
  const accentClass =
    accent === 'clay'
      ? 'text-clay'
      : accent === 'forest'
        ? 'text-forest'
        : accent === 'peach'
          ? 'text-clay-strong'
          : 'text-sage-deep';
  return (
    <div className="flex flex-col gap-1 min-w-0">
      <span className="text-[10px] ph-mono uppercase tracking-[0.18em] text-ink-faint">{label}</span>
      <span className={`text-xl font-semibold ph-mono ${accentClass}`}>{value}</span>
    </div>
  );
}

function PulseDivider() {
  return <span className="hidden md:inline-block w-px h-8 bg-[var(--ph-border)]" />;
}

function MemoryRow({
  label,
  items,
  tint,
}: {
  label: string;
  items: string[];
  tint: 'forest' | 'sage' | 'peach';
}) {
  if (!items || items.length === 0) return null;
  const dotClass =
    tint === 'forest' ? 'bg-forest' : tint === 'peach' ? 'bg-clay-strong' : 'bg-sage';
  return (
    <div className="flex items-start gap-2.5">
      <div className="flex items-center gap-1.5 min-w-[80px] pt-0.5">
        <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
        <span className="text-[10px] ph-mono uppercase tracking-[0.16em] text-ink-faint">
          {label}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        {items.map((it, i) => (
          <p key={i} className="text-xs text-ink-soft leading-snug">
            {it}
          </p>
        ))}
      </div>
    </div>
  );
}
