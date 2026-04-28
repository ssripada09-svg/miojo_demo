'use client';

import { Eye, ShieldCheck, BookOpen, GitBranch, FileText, UserCheck } from 'lucide-react';
import { CrewHeader } from '@/components/miojo/CrewHeader';
import { Section } from '@/components/miojo/Section';

const APPROVALS = [
  { label: 'Maison Vence narrative direction', stage: 'Awaiting Ciarra', kind: 'Decision', logged: 'Today, 06:48' },
  { label: 'Mexico City venue contract', stage: 'Awaiting Ciarra', kind: 'Contract', logged: 'Today, 09:12' },
  { label: 'Banyan deal memo terms', stage: 'In review', kind: 'Investor', logged: 'Yesterday' },
  { label: 'Pass on Strand Studios advisory ask', stage: 'Logged', kind: 'Decision', logged: 'Apr 26' },
  { label: 'Ren / Riot \u2014 Ulta intro', stage: 'Awaiting Ciarra', kind: 'Outreach', logged: 'Apr 27' },
];

const MEMORY_PILLARS = [
  {
    icon: BookOpen,
    title: 'Decisions',
    body: 'Every recommendation, every choice, every pass \u2014 captured with the reasoning. Compounds into a reusable founder playbook.',
    metric: '1,284 logged',
  },
  {
    icon: UserCheck,
    title: 'Relationships',
    body: 'Partner, investor, retailer, and creator memory \u2014 last touch, what they care about, how Ciarra has framed them.',
    metric: '462 partners',
  },
  {
    icon: FileText,
    title: 'Standards',
    body: 'The qualitative bar \u2014 voice, taste, formulation principles, sourcing, presentation. The thing AI must never violate.',
    metric: '78 standards',
  },
  {
    icon: GitBranch,
    title: 'Provenance',
    body: 'Every recommendation traces back to its sources \u2014 panel evidence, member data, partner conversations, prior decisions.',
    metric: '100% sourced',
  },
];

const AUTONOMY_LEVELS = [
  { level: 'L1', label: 'Observe', desc: 'Listen, log, summarize. No actions taken.', share: 22 },
  { level: 'L2', label: 'Recommend', desc: 'Suggest. Ciarra reads and decides. The default.', share: 48 },
  { level: 'L3', label: 'Execute (with approval)', desc: 'Drafts, schedules, sends \u2014 only after Ciarra approves.', share: 24 },
  { level: 'L4', label: 'Autonomous (in policy)', desc: 'Narrowly scoped, pre-approved actions inside a policy budget.', share: 6 },
];

export default function TrustLayerPage() {
  return (
    <div className="max-w-[1280px] mx-auto">
      <CrewHeader
        eyebrow="Foundation \u00b7 Trust Layer"
        title="Trust Layer"
        italicWord="Trust"
        subtitle="Human-in-the-loop, by design."
        mission="Miojo OS only feels like leverage if Ciarra trusts it. The Trust Layer is where every decision is logged, every action is reversible, and the founder always remains the standard."
        icon={Eye}
        accent="ink"
        liveLabel="Memory active"
      />

      <Section
        eyebrow="What the layer does"
        title="Four ways the platform stays accountable"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MEMORY_PILLARS.map((p) => (
            <div key={p.title} className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-pharos-purple/10 text-pharos-purple">
                  <p.icon className="w-4 h-4" />
                </div>
                <p className="text-base font-semibold text-ink">{p.title}</p>
                <span className="ml-auto text-[10px] ph-mono uppercase tracking-[0.18em] text-ink-muted">
                  {p.metric}
                </span>
              </div>
              <p className="text-sm text-ink-muted leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Autonomy ladder"
        title="L1 \u2192 L4. Ciarra picks the level for every workflow."
        description="Most of the platform sits at L2 (recommend). L4 (autonomous) is reserved for narrow, pre-approved actions \u2014 like a policy budget for sponsor follow-ups."
      >
        <div className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6">
          <div className="space-y-4">
            {AUTONOMY_LEVELS.map((l) => (
              <div key={l.level} className="flex items-start gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-pharos-purple/10 text-pharos-purple text-sm font-semibold ph-mono">
                  {l.level}
                </span>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between mb-1">
                    <p className="text-sm font-semibold text-ink">{l.label}</p>
                    <span className="text-xs ph-mono text-ink-muted">{l.share}% of workflows</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed mb-2">{l.desc}</p>
                  <div className="h-1.5 rounded-full bg-[var(--ph-surface-sunk)]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${l.share}%`,
                        background: 'var(--ph-purple)',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Approvals queue"
        title="What\u2019s on Ciarra\u2019s desk"
        description="Every action that needs founder approval lives here, with full source memory attached."
      >
        <div className="rounded-2xl border border-[var(--ph-border)] bg-surface divide-y divide-[var(--ph-border)]">
          {APPROVALS.map((a, i) => (
            <div
              key={i}
              className="px-5 py-4 flex items-center justify-between gap-3 hover:bg-[var(--ph-surface-sunk)] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <ShieldCheck className="w-4 h-4 text-pharos-purple flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{a.label}</p>
                  <p className="text-xs text-ink-muted mt-0.5">
                    <span className="ph-mono uppercase tracking-[0.14em]">{a.kind}</span> \u00b7 logged {a.logged}
                  </p>
                </div>
              </div>
              <span
                className={`text-[10px] ph-mono uppercase tracking-[0.16em] px-2 py-1 rounded-full whitespace-nowrap ${
                  a.stage === 'Awaiting Ciarra'
                    ? 'bg-pharos-purple/10 text-pharos-purple'
                    : a.stage === 'In review'
                      ? 'bg-gold-tint text-gold-deep'
                      : 'bg-[var(--ph-surface-sunk)] text-ink-muted'
                }`}
              >
                {a.stage}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <div className="rounded-2xl border border-[var(--ph-border)] bg-bg-raised p-6 md:p-8 text-center">
        <p className="ph-eyebrow inline-block mb-3" style={{ color: 'var(--ph-purple)' }}>
          The principle
        </p>
        <p className="text-lg md:text-xl text-ink max-w-2xl mx-auto leading-relaxed">
          Ciarra approves. <span className="ph-display-serif-italic" style={{ fontSize: 'inherit' }}>Agents execute.</span> Every decision is logged, every action is reversible, and the founder always remains the standard.
        </p>
      </div>
    </div>
  );
}
