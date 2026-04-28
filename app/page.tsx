import Link from 'next/link';
import {
  ArrowRight,
  Compass,
  Sparkles,
  Users,
  MapPin,
  Radar,
  AlertTriangle,
  Lightbulb,
  Layers,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CREWS, PILLARS } from '@/lib/miojo';
import {
  HOME_KPIS,
  FOUNDER_BRIEF,
  RECENT_ACTIVITY,
  PROOF_STRIP,
} from '@/data/miojo-mock';
import { InterlockMap } from '@/components/miojo/InterlockMap';

const ACTIVITY_TYPE_STYLE = {
  signal: { color: 'text-teal-deep', icon: Radar },
  success: { color: 'text-pass', icon: CheckCircle2 },
  recommend: { color: 'text-gold-strong', icon: Lightbulb },
  info: { color: 'text-ink-muted', icon: Activity },
} as const;

export default function HomePage() {
  return (
    <div className="space-y-10 md:space-y-14 max-w-[1280px] mx-auto">
      {/* HERO ---------------------------------------------------- */}
      <section className="relative overflow-hidden rounded-2xl border border-[var(--ph-border)] bg-bg-raised hero-with-glow px-6 py-10 md:px-12 md:py-16">
        <div className="flex items-center mb-6">
          <span className="ph-rule" />
          <span className="ph-eyebrow">Miojo OS · Founder Demo</span>
        </div>

        <h1 className="ph-h2 text-balance mb-5 max-w-4xl">
          The operating environment for a{' '}
          <span className="ph-display-serif-italic" style={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
            founder-led
          </span>{' '}
          lifestyle platform.
        </h1>

        <p className="ph-lede max-w-3xl mb-8">
          One interlinked platform across beauty, wellness, hospitality, community, and brand-building —
          with AI as the operating layer that scales Ciarra’s taste, memory, timing, and execution.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/crews/founder-command"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-ink text-ink-invert text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ boxShadow: 'var(--ph-shadow-md)' }}
          >
            Open Founder Command
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/crews/beauty-days-community"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--ph-border-strong)] text-ink text-sm font-medium hover:bg-[var(--ph-surface-sunk)] transition-colors"
          >
            Tour BeautyDays
          </Link>
          <span className="text-xs ph-mono text-ink-muted ml-2">
            5 crews · 4 pillars · 1 platform
          </span>
        </div>
      </section>

      {/* KPI ROW ------------------------------------------------- */}
      <section>
        <div className="flex items-center mb-5">
          <span className="ph-rule" />
          <span className="ph-eyebrow">Top of mind today</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {HOME_KPIS.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-xl border border-[var(--ph-border)] bg-surface p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-[10px] ph-mono uppercase tracking-[0.18em] text-ink-muted">{kpi.label}</p>
              <p className="text-3xl font-semibold text-ink mt-2 tracking-[-0.01em]">{kpi.value}</p>
              <p className="text-xs text-ink-faint mt-1.5">{kpi.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERLOCK MAP ------------------------------------------- */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 rounded-2xl border border-[var(--ph-border)] bg-surface p-6 md:p-8">
          <div className="flex items-center mb-2">
            <span className="ph-rule" />
            <span className="ph-eyebrow">The Interlock</span>
          </div>
          <h2 className="ph-h3 mb-2">One engine, many expressions.</h2>
          <p className="text-sm text-ink-muted max-w-xl mb-4">
            Four pillars, one founder, six themes that weave them together. Miojo OS is the platform layer
            that lets a single tastemaker run all of it without losing the standard.
          </p>
          <InterlockMap />
        </div>

        <div className="lg:col-span-2 space-y-4">
          {PILLARS.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-[var(--ph-border)] bg-surface p-5 transition-all hover:border-[var(--ph-border-strong)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: p.accent }}
                  />
                  <span className="text-base font-semibold text-ink">{p.name}</span>
                </div>
                <span className="text-[10px] ph-mono uppercase tracking-[0.18em] text-ink-muted">
                  {p.maturity}
                </span>
              </div>
              <p className="text-sm text-ink-soft mt-2">{p.oneLiner}</p>
              <p className="text-xs text-ink-faint mt-2">{p.role}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {p.themes.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] ph-mono uppercase tracking-[0.18em] px-2 py-1 rounded-full bg-[var(--ph-surface-sunk)] text-ink-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDER BRIEF ------------------------------------------- */}
      <section className="rounded-2xl border border-[var(--ph-border)] bg-surface p-6 md:p-8">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
          <div className="flex items-center">
            <span className="ph-rule" />
            <span className="ph-eyebrow">Founder Brief · {FOUNDER_BRIEF.date}</span>
          </div>
          <Link
            href="/crews/founder-command"
            className="text-xs text-teal-deep hover:underline inline-flex items-center gap-1"
          >
            Open Command <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <BriefCard
            label="Top Opportunity"
            icon={<Lightbulb className="w-4 h-4" />}
            color="teal"
            headline={FOUNDER_BRIEF.topOpportunity.headline}
            detail={FOUNDER_BRIEF.topOpportunity.detail}
          />
          <BriefCard
            label="Top Risk"
            icon={<AlertTriangle className="w-4 h-4" />}
            color="warn"
            headline={FOUNDER_BRIEF.topRisk.headline}
            detail={FOUNDER_BRIEF.topRisk.detail}
          />
          <BriefCard
            label="Top Decision"
            icon={<Compass className="w-4 h-4" />}
            color="gold"
            headline={FOUNDER_BRIEF.topDecision.headline}
            detail={FOUNDER_BRIEF.topDecision.detail}
          />
          <BriefCard
            label="Cross-Pillar Insight"
            icon={<Layers className="w-4 h-4" />}
            color="ink"
            headline={FOUNDER_BRIEF.topCrossPillar.headline}
            detail={FOUNDER_BRIEF.topCrossPillar.detail}
          />
        </div>
      </section>

      {/* CREW QUICK NAV ------------------------------------------ */}
      <section>
        <div className="flex items-center mb-5">
          <span className="ph-rule" />
          <span className="ph-eyebrow">The five crews</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
          {CREWS.map((crew) => (
            <Link
              key={crew.slug}
              href={`/crews/${crew.slug}`}
              className="group rounded-xl border border-[var(--ph-border)] bg-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--ph-border-strong)]"
            >
              <div
                className={`inline-flex items-center justify-center w-9 h-9 rounded-lg mb-3 ${
                  crew.accent === 'clay'
                    ? 'bg-clay-tint text-clay'
                    : crew.accent === 'forest'
                      ? 'bg-forest-tint text-forest'
                      : 'bg-sage-tint text-sage-deep'
                }`}
              >
                <crew.icon className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-sm font-semibold text-ink mb-1">{crew.name}</h3>
              <p className="text-xs text-ink-muted leading-snug mb-3">{crew.subtitle}</p>
              <span className="inline-flex items-center gap-1 text-[11px] text-teal-deep group-hover:gap-2 transition-all">
                Open <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* PROOF STRIP --------------------------------------------- */}
      <section>
        <div className="flex items-center mb-5">
          <span className="ph-rule" />
          <span className="ph-eyebrow">Why this works</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROOF_STRIP.map((p) => (
            <div
              key={p.eyebrow}
              className="rounded-2xl border border-[var(--ph-border)] bg-surface p-6 md:p-7 hero-with-glow"
              style={{ background: 'linear-gradient(180deg, var(--ph-surface) 0%, var(--ph-bg-raised) 100%)' }}
            >
              <p className="text-[10px] ph-mono uppercase tracking-[0.2em] text-teal-deep mb-3">
                {p.eyebrow}
              </p>
              <p className="ph-stat" style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}>
                {p.stat}
              </p>
              <p className="text-xs text-ink-muted mt-1 mb-4 ph-mono uppercase tracking-[0.16em]">
                {p.statSuffix}
              </p>
              <p className="text-sm text-ink-soft leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RECENT ACTIVITY ----------------------------------------- */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-[var(--ph-border)] bg-surface">
          <div className="flex items-center justify-between p-5 border-b border-[var(--ph-border)]">
            <div className="flex items-center">
              <span className="ph-rule" />
              <span className="ph-eyebrow">Live signal feed</span>
            </div>
            <span className="text-xs text-ink-muted ph-mono">Last 24 hours</span>
          </div>
          <div className="divide-y divide-[var(--ph-border)]">
            {RECENT_ACTIVITY.map((a) => {
              const style = ACTIVITY_TYPE_STYLE[a.type];
              const Icon = style.icon;
              return (
                <div key={a.id} className="px-5 py-4 hover:bg-[var(--ph-surface-sunk)] transition-colors">
                  <div className="flex gap-3">
                    <div className={`flex-shrink-0 mt-0.5 ${style.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3 mb-0.5">
                        <p className="text-sm text-ink font-medium">{a.title}</p>
                        <span className="text-[10px] ph-mono uppercase tracking-[0.16em] text-ink-faint flex-shrink-0">
                          {a.time}
                        </span>
                      </div>
                      <p className="text-xs text-ink-muted mb-2 leading-relaxed">{a.detail}</p>
                      <span className="text-[10px] ph-mono uppercase tracking-[0.16em] text-teal-deep">
                        {a.crew}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Capability cluster */}
        <div className="space-y-3">
          <div className="flex items-center mb-1">
            <span className="ph-rule" />
            <span className="ph-eyebrow">What you get</span>
          </div>
          {[
            { label: '24/7 Coverage', body: 'Operations while you sleep — no gaps, no holidays.' },
            { label: 'Consistent Execution', body: 'Your playbook followed exactly. Same standard, every brand.' },
            { label: 'Institutional Memory', body: 'Every decision logged. Your expertise compounds, not disappears.' },
            { label: 'Real-time Intel', body: 'Trends, competitors, opportunities — monitored, ranked, ready.' },
            { label: 'Your Standards, Always', body: 'Human-in-the-loop. You approve; agents execute inside policy.' },
          ].map((c) => (
            <Card key={c.label} className="bg-surface border-[var(--ph-border)]">
              <CardContent className="p-4">
                <p className="text-[10px] ph-mono uppercase tracking-[0.18em] text-teal-deep mb-1.5">
                  {c.label}
                </p>
                <p className="text-sm text-ink-soft leading-snug">{c.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

// -------- helpers --------

function BriefCard({
  label,
  icon,
  color,
  headline,
  detail,
}: {
  label: string;
  icon: React.ReactNode;
  color: 'teal' | 'gold' | 'warn' | 'ink';
  headline: string;
  detail: string;
}) {
  const colorMap = {
    teal: { bg: 'bg-teal-tint', fg: 'text-teal-deep' },
    gold: { bg: 'bg-gold-tint', fg: 'text-gold-deep' },
    warn: { bg: 'bg-[rgba(180,83,9,0.10)]', fg: 'text-warning' },
    ink: { bg: 'bg-[var(--ph-surface-sunk)]', fg: 'text-ink' },
  } as const;
  const c = colorMap[color];

  return (
    <div className="rounded-xl border border-[var(--ph-border)] bg-bg-raised p-5">
      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] ph-mono uppercase tracking-[0.16em] ${c.bg} ${c.fg} mb-3`}>
        {icon}
        {label}
      </div>
      <p className="text-sm font-semibold text-ink mb-2 leading-snug">{headline}</p>
      <p className="text-xs text-ink-muted leading-relaxed">{detail}</p>
    </div>
  );
}
