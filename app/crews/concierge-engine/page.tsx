'use client';

import {
  ConciergeBell,
  Sparkles,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Pencil,
  Send,
  Clock,
  TrendingDown,
  Quote,
  TrendingUp,
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
  CONCIERGE_FEATURED_MEMBER,
  CONCIERGE_AI_PROOF,
} from '@/data/miojo-mock';

const PILLAR_TINT: Record<string, string> = {
  'Peppers and Beli': 'var(--mj-clay)',
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

      {/* 2 — KPI ROW (simplified to relationship / spend / retention / proof) */}
      <Section
        eyebrow="What the engine optimizes for"
        title="Three questions, one answer"
        description="Are we deepening the relationship? Are we increasing spend? Are we improving retention? — and is the engine paying for itself?"
      >
        <KpiRow kpis={CONCIERGE_KPIS} columns={4} />
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

      {/* 4 — CONCIERGE INTELLIGENCE QUEUE — revenue/relationship engine, not a CRM list */}
      <Section
        eyebrow="Recommendation Queue"
        title="AI drafts. Concierge owns. Ciarra approves."
        description="Every recommendation carries an expected value, a 'why now' trigger, and a named human owner. Nothing leaves without a human in the loop."
      >
        <div className="rounded-2xl border border-[var(--ph-border)] bg-surface divide-y divide-[var(--ph-border)] overflow-hidden">
          {CONCIERGE_QUEUE.map((rec) => {
            const status = STATUS_STYLE[rec.status];
            return (
              <div
                key={rec.id}
                className="px-5 py-4 md:px-6 md:py-5 hover:bg-[var(--ph-surface-sunk)] transition-colors"
              >
                {/* Top row: member badge + title + status */}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-semibold mt-0.5"
                    style={{
                      background: 'linear-gradient(135deg, var(--mj-forest-soft), var(--mj-forest))',
                      color: 'var(--mj-peach)',
                    }}
                  >
                    {rec.memberInitials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-[10px] ph-mono uppercase tracking-[0.18em] text-ink-faint">
                        {rec.member}
                      </span>
                      <span className="text-[10px] ph-mono uppercase tracking-[0.16em] px-2 py-0.5 rounded-full bg-peach-tint text-clay-strong">
                        {rec.type}
                      </span>
                      <span
                        className="text-[10px] ph-mono uppercase tracking-[0.16em]"
                        style={{ color: PILLAR_TINT[rec.pillar] || 'var(--ph-ink-muted)' }}
                      >
                        · {rec.pillar}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-ink leading-snug">{rec.title}</p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] ph-mono uppercase tracking-[0.16em] px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${status.bg} ${status.fg}`}
                  >
                    {status.icon}
                    {rec.status}
                  </span>
                </div>

                {/* Rationale */}
                <p className="text-xs text-ink-muted leading-relaxed mb-4 ml-13" style={{ marginLeft: '52px' }}>
                  {rec.rationale}
                </p>

                {/* Bottom rail: expected value · why now · owner · confidence · drafted-at */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-[var(--ph-border)]" style={{ marginLeft: '52px' }}>
                  <RecField
                    label="Expected value"
                    value={rec.expectedValue}
                    accent="clay"
                  />
                  <RecField label="Why now" value={rec.whyNow} icon={<Clock className="w-3 h-3" />} />
                  <RecField label="Owner" value={rec.owner} />
                  <div className="flex items-center justify-between md:justify-end gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] ph-mono uppercase tracking-[0.14em] text-ink-faint">
                        Confidence
                      </span>
                      <span className="text-sm ph-mono font-semibold text-forest">
                        {rec.confidence}
                      </span>
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

      {/* MONEY SHOT — featured member profile drill-in */}
      <Section
        eyebrow="Featured profile"
        title={`Inside the engine — ${CONCIERGE_FEATURED_MEMBER.name}`}
        description="One member, fully unfolded. Stated facts. Observed patterns. Predicted moves. The cross-pillar journey to date and the next-best move."
      >
        <FeaturedMember m={CONCIERGE_FEATURED_MEMBER} />
      </Section>

      {/* AI PROOF — before / after delta */}
      <Section
        eyebrow="Why personalization wins"
        title="Same offer. Different relationship layer."
        description="A real-world before/after the engine touches an invitation. AI drafted, Carla refined, Ciarra sent."
      >
        <BeforeAfterProof proof={CONCIERGE_AI_PROOF} />
      </Section>

      {/* 6 — CROSS-PILLAR FLOW (Sankey-style) + AT-RISK */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
        <div className="lg:col-span-3">
          <Section
            eyebrow="Cross-Pillar Flow"
            title="One booking, four lifetimes"
            description="How members move from a single touchpoint into multi-pillar loyalty. Ribbon width = members converting in the last 90 days."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6">
              <CrossPillarSankey transitions={CROSS_PILLAR_TRANSITIONS} />

              <div className="mt-5 pt-4 border-t border-[var(--ph-border)] grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {CROSS_PILLAR_TRANSITIONS.slice(0, 3).map((t) => (
                  <div key={t.from + t.to} className="flex items-start gap-2">
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

// ----- Recommendation queue field helper -----

function RecField({
  label,
  value,
  icon,
  accent = 'ink',
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  accent?: 'ink' | 'clay';
}) {
  const valClass = accent === 'clay' ? 'text-clay font-medium' : 'text-ink';
  return (
    <div className="flex flex-col gap-1 min-w-0">
      <span className="text-[10px] ph-mono uppercase tracking-[0.16em] text-ink-faint inline-flex items-center gap-1">
        {icon}
        {label}
      </span>
      <span className={`text-xs ${valClass} truncate`} title={value}>
        {value}
      </span>
    </div>
  );
}

// ----- Cross-Pillar Sankey-style flow -----
//
// Custom SVG ribbon flow. Three columns of pillars:
//   left  = sources       (Studio · Peppers and Beli)
//   mid   = staging        (BeautyDays)
//   right = destinations  (Residences · Membership)
// Each ribbon's stroke-width = sqrt(count*4) for visual breathing room.

interface SankeyEdge {
  from: string;
  to: string;
  count: number;
}

function CrossPillarSankey({ transitions }: { transitions: SankeyEdge[] }) {
  // Layout: 3 columns × 4 rows of pillar slots. Hand-tuned y-positions so
  // ribbons read clean on a single bezier per edge.
  const W = 800;
  const H = 360;
  const colX = { left: 110, mid: 400, right: 690 };

  type Slot = { name: string; x: number; y: number; color: string };
  const SLOTS: Slot[] = [
    { name: 'Studio',           x: colX.left,  y: 70,  color: 'var(--mj-forest)' },
    { name: 'Peppers and Beli', x: colX.left,  y: 220, color: 'var(--mj-clay)'   },
    { name: 'BeautyDays',       x: colX.mid,   y: 130, color: 'var(--mj-sage)'   },
    { name: 'Residences',       x: colX.right, y: 90,  color: 'var(--mj-sage-deep)' },
    { name: 'Membership',       x: colX.right, y: 260, color: 'var(--mj-clay-strong)' },
  ];

  const slotMap = Object.fromEntries(SLOTS.map((s) => [s.name, s]));

  // Edge color follows the SOURCE pillar
  const edgeColor = (from: string) => slotMap[from]?.color || 'var(--mj-sage)';

  // Bezier path between two points with horizontal handle
  const path = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = (x2 - x1) * 0.5;
    return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
  };

  // Map width based on count (cap so giants don't drown)
  const maxCount = Math.max(...transitions.map((t) => t.count));
  const widthFor = (count: number) => 6 + (count / maxCount) * 28;

  return (
    <div className="relative w-full" style={{ aspectRatio: '20 / 9', minHeight: 280 }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full">
        <defs>
          {SLOTS.map((s) => (
            <linearGradient
              key={`grad-${s.name}`}
              id={`grad-${s.name.replace(/[^a-zA-Z]/g, '')}`}
              x1="0%"
              x2="100%"
            >
              <stop offset="0%" stopColor={s.color} stopOpacity="0.55" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0.30" />
            </linearGradient>
          ))}
        </defs>

        {/* Ribbons (rendered first so nodes float on top) */}
        <g fill="none">
          {transitions.map((t, i) => {
            const a = slotMap[t.from];
            const b = slotMap[t.to];
            if (!a || !b) return null;
            const sw = widthFor(t.count);
            const gradId = `grad-${t.from.replace(/[^a-zA-Z]/g, '')}`;
            return (
              <g key={`edge-${i}`}>
                <path
                  d={path(a.x + 70, a.y, b.x - 70, b.y)}
                  stroke={`url(#${gradId})`}
                  strokeWidth={sw}
                  strokeLinecap="round"
                />
                {/* count label at midpoint */}
                <text
                  x={(a.x + 70 + b.x - 70) / 2}
                  y={(a.y + b.y) / 2 - sw / 2 - 4}
                  textAnchor="middle"
                  fontFamily="var(--font-jetbrains-mono), monospace"
                  fontSize="9"
                  fontWeight="600"
                  fill={edgeColor(t.from)}
                  letterSpacing="0.1em"
                >
                  {t.count}
                </text>
              </g>
            );
          })}
        </g>

        {/* Pillar nodes — pill-shaped chips */}
        <g>
          {SLOTS.map((s) => (
            <g key={s.name}>
              <rect
                x={s.x - 70}
                y={s.y - 18}
                width={140}
                height={36}
                rx={18}
                fill="var(--ph-bg-raised)"
                stroke={s.color}
                strokeWidth={1.5}
              />
              <text
                x={s.x}
                y={s.y + 5}
                textAnchor="middle"
                fontFamily="var(--font-inter), sans-serif"
                fontSize="12"
                fontWeight="600"
                fill="var(--ph-ink)"
              >
                {s.name}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

// ----- Featured Member (the "money shot") -----

function FeaturedMember({ m }: { m: typeof CONCIERGE_FEATURED_MEMBER }) {
  return (
    <article className="rounded-2xl border border-[var(--ph-border)] bg-surface overflow-hidden">
      {/* Top band — forest hero with cream/peach text, deck-native */}
      <div
        className="px-6 md:px-8 py-7 md:py-9 relative"
        style={{
          background:
            'linear-gradient(135deg, var(--mj-forest-deep) 0%, var(--mj-forest) 60%, var(--mj-forest-soft) 100%)',
          color: 'var(--ph-ink-on-accent)',
        }}
      >
        <div className="flex flex-wrap items-start gap-5">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-base font-semibold ring-2"
            style={{ background: 'var(--mj-forest-soft)', color: 'var(--mj-peach)', borderColor: 'var(--mj-peach)' }}
          >
            {m.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] ph-mono uppercase tracking-[0.2em]" style={{ color: 'var(--mj-peach)' }}>
              {m.archetype} · {m.tier}
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold mt-1 leading-tight">
              {m.name.split(' ')[0]}{' '}
              <span className="ph-display-serif-italic" style={{ fontSize: 'inherit', color: 'var(--mj-peach)' }}>
                {m.name.split(' ').slice(1).join(' ')}
              </span>
            </h3>
            <p
              className="text-sm mt-1.5 leading-relaxed max-w-2xl"
              style={{ color: 'rgba(242,235,216,0.85)' }}
            >
              {m.memorySnapshot}
            </p>
          </div>
          <div className="flex flex-col items-end text-right min-w-[180px]">
            <span className="text-[10px] ph-mono uppercase tracking-[0.2em]" style={{ color: 'var(--mj-peach)' }}>
              Engagement health
            </span>
            <span
              className="text-3xl font-semibold ph-mono mt-1"
              style={{ color: '#F2EBD8' }}
            >
              {m.health}
            </span>
            <span className="text-[10px] ph-mono uppercase tracking-[0.16em] mt-0.5" style={{ color: 'rgba(242,235,216,0.6)' }}>
              {m.ltv}
            </span>
          </div>
        </div>

        {/* Occasion strip */}
        <div
          className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-full"
          style={{ background: 'rgba(217,168,142,0.18)', border: '1px solid rgba(217,168,142,0.35)' }}
        >
          <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--mj-peach)' }} />
          <span className="text-[10px] ph-mono uppercase tracking-[0.18em]" style={{ color: 'var(--mj-peach)' }}>
            Occasion · {m.occasion.label} {m.occasion.when}
          </span>
          <span className="text-xs" style={{ color: 'rgba(242,235,216,0.8)' }}>
            {m.occasion.detail}
          </span>
        </div>
      </div>

      {/* Body grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[var(--ph-border)]">
        {/* Memory triplet */}
        <div className="p-5 md:p-6">
          <p className="text-[10px] ph-mono uppercase tracking-[0.2em] text-clay mb-4">
            Memory · stated · observed · predicted
          </p>
          <div className="space-y-4">
            <FeaturedTriplet label="Stated" items={m.stated} dot="forest" />
            <FeaturedTriplet label="Observed" items={m.observed} dot="sage" />
            <FeaturedTriplet label="Predicted" items={m.predicted} dot="peach" />
          </div>
        </div>

        {/* Recent touchpoints + cross-pillar journey */}
        <div className="p-5 md:p-6">
          <p className="text-[10px] ph-mono uppercase tracking-[0.2em] text-clay mb-4">
            Recent touchpoints
          </p>
          <ul className="space-y-3 mb-6">
            {m.recentTouchpoints.map((t, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{
                    background:
                      t.pillar === 'Peppers and Beli'
                        ? 'var(--mj-clay)'
                        : t.pillar === 'Studio'
                          ? 'var(--mj-forest)'
                          : t.pillar === 'BeautyDays'
                            ? 'var(--mj-sage)'
                            : 'var(--mj-sage-deep)',
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-0.5">
                    <span className="text-[10px] ph-mono uppercase tracking-[0.16em] text-ink-faint">
                      {t.date}
                    </span>
                    <span className="text-[10px] ph-mono uppercase tracking-[0.16em] text-clay-strong">
                      {t.pillar}
                    </span>
                  </div>
                  <p className="text-xs text-ink-soft leading-snug">{t.detail}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="text-[10px] ph-mono uppercase tracking-[0.2em] text-clay mb-3">
            Cross-pillar journey
          </p>
          <div className="space-y-2">
            {m.crossPillarJourney.map((j, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="text-[10px] ph-mono uppercase tracking-[0.14em] text-ink-faint flex-shrink-0 w-5">
                  0{j.step}
                </span>
                <span className="text-ink-muted">{j.from}</span>
                <ArrowRight className="w-3 h-3 text-clay-strong flex-shrink-0" />
                <span className="text-ink-soft">{j.to}</span>
                <span className="text-[10px] ph-mono text-ink-faint truncate ml-auto">{j.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next-best action + notes + preferences */}
        <div className="p-5 md:p-6">
          <p className="text-[10px] ph-mono uppercase tracking-[0.2em] text-clay mb-3">
            Next-best action
          </p>
          <div className="rounded-xl border border-clay/30 bg-clay-tint p-4 mb-5">
            <p className="text-sm text-ink leading-relaxed">{m.nextBest}</p>
          </div>

          <p className="text-[10px] ph-mono uppercase tracking-[0.2em] text-clay mb-3">
            Relationship notes
          </p>
          <ul className="space-y-2 mb-5">
            {m.notes.map((n, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-ink-muted leading-relaxed">
                <Quote className="w-3 h-3 text-ink-faint mt-0.5 flex-shrink-0" />
                <span>{n}</span>
              </li>
            ))}
          </ul>

          <p className="text-[10px] ph-mono uppercase tracking-[0.2em] text-clay mb-2">
            Preferences
          </p>
          <div className="flex flex-wrap gap-1.5">
            {m.preferences.map((p) => (
              <span
                key={p}
                className="text-[10px] ph-mono uppercase tracking-[0.14em] px-2 py-1 rounded-full bg-[var(--ph-surface-sunk)] text-ink-muted"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function FeaturedTriplet({
  label,
  items,
  dot,
}: {
  label: string;
  items: readonly string[] | string[];
  dot: 'forest' | 'sage' | 'peach';
}) {
  const dotClass = dot === 'forest' ? 'bg-forest' : dot === 'peach' ? 'bg-clay-strong' : 'bg-sage';
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
        <span className="text-[10px] ph-mono uppercase tracking-[0.16em] text-ink-faint">
          {label}
        </span>
      </div>
      <ul className="space-y-1 pl-3.5">
        {items.map((it, i) => (
          <li key={i} className="text-xs text-ink-soft leading-snug">
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ----- Before / After AI Proof -----

function BeforeAfterProof({ proof }: { proof: typeof CONCIERGE_AI_PROOF }) {
  return (
    <div className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-7">
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <span className="text-[10px] ph-mono uppercase tracking-[0.2em] text-clay">
          Scenario
        </span>
        <span className="text-sm text-ink font-medium">{proof.scenario}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* BEFORE */}
        <div className="rounded-xl border border-[var(--ph-border)] bg-[var(--ph-surface-sunk)] p-5 flex flex-col">
          <span className="text-[10px] ph-mono uppercase tracking-[0.18em] text-ink-faint mb-3">
            {proof.before.label}
          </span>
          <p className="text-sm text-ink-soft leading-relaxed mb-5 flex-1 italic">
            <Quote className="inline w-3 h-3 text-ink-faint mr-1 -mt-0.5" />
            {proof.before.body}
          </p>
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-[var(--ph-border)]">
            {proof.before.metrics.map((m) => (
              <div key={m.label}>
                <p className="text-[10px] ph-mono uppercase tracking-[0.14em] text-ink-faint">
                  {m.label}
                </p>
                <p className="text-base font-semibold text-ink-muted ph-mono mt-0.5">{m.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AFTER — highlighted */}
        <div
          className="rounded-xl border-2 border-clay/40 p-5 flex flex-col relative shadow-md"
          style={{
            background:
              'linear-gradient(180deg, var(--ph-surface) 0%, var(--mj-peach-tint) 100%)',
          }}
        >
          <span className="absolute -top-3 left-5 inline-flex items-center gap-1.5 text-[10px] ph-mono uppercase tracking-[0.16em] px-2.5 py-1 rounded-full bg-clay text-white">
            <Sparkles className="w-3 h-3" /> Concierge engine
          </span>
          <span className="text-[10px] ph-mono uppercase tracking-[0.18em] text-clay mt-2 mb-3">
            {proof.after.label}
          </span>
          <p className="text-sm text-ink leading-relaxed mb-5 flex-1">
            <Quote className="inline w-3 h-3 text-clay-strong mr-1 -mt-0.5" />
            {proof.after.body}
          </p>
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-clay/20">
            {proof.after.metrics.map((m) => (
              <div key={m.label}>
                <p className="text-[10px] ph-mono uppercase tracking-[0.14em] text-clay">
                  {m.label}
                </p>
                <p className="text-base font-semibold text-clay ph-mono mt-0.5">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delta strip */}
      <div className="rounded-xl border border-[var(--ph-border)] bg-bg-raised px-5 py-4 flex flex-wrap items-center gap-x-8 gap-y-3">
        <div>
          <p className="text-[10px] ph-mono uppercase tracking-[0.18em] text-ink-faint">RSVP lift</p>
          <p className="text-2xl font-semibold text-clay ph-mono mt-0.5 inline-flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            {proof.delta.rsvpLift}
          </p>
        </div>
        <span className="hidden md:inline-block w-px h-10 bg-[var(--ph-border)]" />
        <div>
          <p className="text-[10px] ph-mono uppercase tracking-[0.18em] text-ink-faint">Attended lift</p>
          <p className="text-2xl font-semibold text-clay ph-mono mt-0.5 inline-flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            {proof.delta.attendedLift}
          </p>
        </div>
        <span className="hidden md:inline-block w-px h-10 bg-[var(--ph-border)]" />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] ph-mono uppercase tracking-[0.18em] text-ink-faint">Revenue impact</p>
          <p className="text-sm font-semibold text-ink mt-0.5 truncate">
            {proof.delta.revenueLift}
          </p>
        </div>
        <p className="text-xs text-ink-muted italic w-full md:w-auto md:max-w-md md:text-right">
          {proof.delta.note}
        </p>
      </div>
    </div>
  );
}
