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
  ChefHat,
  Flame,
  CalendarDays,
  Sparkles,
  Quote,
  Newspaper,
  ArrowRight,
} from 'lucide-react';
import { CrewHeader } from '@/components/miojo/CrewHeader';
import { Section, KpiRow } from '@/components/miojo/Section';
import { TrustFooter } from '@/components/shared/AegisFooter';
import {
  RESIDENCY_PULSE,
  RESIDENCY_KPIS,
  RESIDENCY_CHEFS,
  RESIDENCY_CONCEPTS,
  RESIDENCY_SERVICES,
  RESIDENCY_DEMAND_HEAT,
  RESIDENCY_LEGACY,
  RESIDENCY_PRESS,
  RESIDENCY_PANTRY_EXTENSIONS,
} from '@/data/miojo-mock';

const STATUS_TINT: Record<string, string> = {
  Scouting: 'bg-[var(--ph-surface-sunk)] text-ink-muted',
  'In Conversation': 'bg-sage-tint text-sage-deep',
  'Menu Development': 'bg-peach-tint text-clay-strong',
  Confirmed: 'bg-clay-tint text-clay',
  Active: 'bg-forest-tint text-forest',
  'Post-Residency': 'bg-[var(--ph-surface-sunk)] text-ink-faint',
};

const SERVICE_KIND_TINT: Record<string, string> = {
  'Chef Table': 'var(--mj-clay)',
  'Launch Dinner': 'var(--mj-fire)',
  'Press Service': 'var(--mj-forest)',
  'Supplier Dinner': 'var(--mj-sage-deep)',
  'Pantry Drop': 'var(--mj-sage)',
  'Off-site': 'var(--mj-peach-strong)',
};

const SERVICE_STATUS_TINT: Record<string, string> = {
  'Sold Out': 'bg-clay-tint text-clay',
  Filling: 'bg-peach-tint text-clay-strong',
  'Invite Only': 'bg-forest-tint text-forest',
  Open: 'bg-sage-tint text-sage-deep',
  Done: 'bg-[var(--ph-surface-sunk)] text-ink-faint',
};

const FLAG_TINT: Record<string, string> = {
  Anchor: 'bg-forest-tint text-forest',
  'Press Magnet': 'bg-clay-tint text-clay',
  'Heritage Lens': 'bg-sage-tint text-sage-deep',
  Rising: 'bg-peach-tint text-clay-strong',
};

export default function ResidencyEnginePage() {
  return (
    <div className="max-w-[1280px] mx-auto">
      <CrewHeader
        eyebrow="Crew 07 · Peppers and Beli Engine"
        title="Peppers and Beli Engine"
        italicWord="Beli"
        subtitle="The culinary IP layer of Peppers and Beli."
        mission="Where chefs, menus, residencies, storytelling, and guest demand become one premium, bookable cultural program. Peppers and Beli is not a restaurant — it is a chef-table platform."
        icon={ChefHat}
        accent="clay"
        pillar="Peppers and Beli"
        liveValue={`${RESIDENCY_PULSE.sellThrough} sell-through · waitlist ${RESIDENCY_PULSE.waitlistDepth}`}
      />

      {/* 1 — RESIDENCY OVERVIEW PULSE */}
      <Section
        eyebrow="Residency Overview"
        title="The cover of the runbook"
        description="Active program, what's next on the calendar, and where the season is pointing."
      >
        <div className="rounded-2xl border border-[var(--ph-border)] bg-surface px-6 py-6 md:px-8 md:py-7">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="md:col-span-2">
              <p className="text-[10px] ph-mono uppercase tracking-[0.18em] text-clay mb-2">
                Now serving
              </p>
              <p className="ph-h3 mb-1.5" style={{ fontSize: '1.5rem' }}>
                {RESIDENCY_PULSE.activeResidency}
              </p>
              <p className="text-sm text-ink-soft mb-5">
                <span className="ph-display-serif-italic" style={{ fontSize: '1rem' }}>
                  Sweetwater Five.
                </span>{' '}
                Five courses, five fires. A living essay on the Caribbean pepper —
                from Sweetwater seed to bone-broth finish.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs">
                <Pulse label="Next launch" value={RESIDENCY_PULSE.nextLaunch} />
                <PulseDivider />
                <Pulse label="Chef pipeline" value={`${RESIDENCY_PULSE.chefPipeline} talents`} />
                <PulseDivider />
                <Pulse label="Waitlist depth" value={RESIDENCY_PULSE.waitlistDepth} accent="clay" />
              </div>
            </div>
            <div className="md:border-l md:border-[var(--ph-border)] md:pl-7 flex flex-col justify-between gap-3">
              <div>
                <p className="text-[10px] ph-mono uppercase tracking-[0.18em] text-ink-faint mb-2">
                  Season
                </p>
                <p className="text-sm font-semibold text-ink mb-1">{RESIDENCY_PULSE.season}</p>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Heat as a thesis — fire technique, heritage chiles, slow vegetables.
                  Programmed end-to-end through August.
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--ph-border)] flex items-center gap-3 ph-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                <span className="inline-flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-pass opacity-60 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-pass" />
                  </span>
                  Updated · {RESIDENCY_PULSE.lastUpdate}
                </span>
                <span className="text-ink-ghost">·</span>
                <span className="truncate">{RESIDENCY_PULSE.operator}</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 2 — KPI ROW */}
      <Section eyebrow="What the engine optimizes for" title="Investor-grade metrics">
        <KpiRow kpis={RESIDENCY_KPIS} columns={3} />
      </Section>

      {/* 3 — CHEF & TALENT PIPELINE */}
      <Section
        eyebrow="Chef & Talent Pipeline"
        title="A&R for the kitchen"
        description="Twelve culinary voices in motion. This is creative scouting, not staffing."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESIDENCY_CHEFS.map((c) => (
            <article
              key={c.id}
              className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 hover:border-[var(--ph-border-strong)] hover:-translate-y-0.5 hover:shadow-md transition-all flex flex-col"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, var(--mj-clay-strong), var(--mj-clay))',
                    color: 'var(--ph-ink-on-accent)',
                  }}
                >
                  {c.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink truncate">{c.name}</p>
                  <p className="text-[11px] ph-mono uppercase tracking-[0.16em] text-ink-faint">
                    {c.cuisine}
                  </p>
                </div>
                <span
                  className={`text-[10px] ph-mono uppercase tracking-[0.16em] px-2 py-1 rounded-full whitespace-nowrap ${STATUS_TINT[c.status] || ''}`}
                >
                  {c.status}
                </span>
              </div>

              {c.flag && (
                <div className="mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] ph-mono uppercase tracking-[0.14em] px-2 py-0.5 rounded-full ${FLAG_TINT[c.flag] || ''}`}
                  >
                    <Flame className="w-3 h-3" />
                    {c.flag}
                  </span>
                </div>
              )}

              <p className="text-sm text-ink-soft leading-relaxed mb-4">{c.bio}</p>

              <div className="space-y-2 mb-4 pb-4 border-b border-[var(--ph-border)]">
                <Bar2 label="Sourcing fit" value={c.sourcingFit} tint="sage" />
                <Bar2 label="Audience pull" value={c.audiencePull} tint="clay" />
              </div>

              <div className="flex items-center justify-between text-[10px] ph-mono uppercase tracking-[0.16em] mt-auto">
                <div>
                  <p className="text-ink-faint">{c.city}</p>
                  <p className="text-clay-strong mt-1">{c.pressValue}</p>
                </div>
                <div className="text-right">
                  <p className="text-ink-faint">Rebook</p>
                  <p
                    className={`mt-1 ${
                      c.rebookLikelihood === 'High'
                        ? 'text-forest'
                        : c.rebookLikelihood === 'Medium'
                          ? 'text-sage-deep'
                          : 'text-ink-faint'
                    }`}
                  >
                    {c.rebookLikelihood}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 4 — MENU & NARRATIVE BUILDER */}
      <Section
        eyebrow="Menu Narrative"
        title="A residency is authored culinary IP"
        description="Each concept tracked end-to-end: narrative, courses, provenance, signature ritual, pairing logic, pricing."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {RESIDENCY_CONCEPTS.slice(0, 4).map((m) => (
            <article
              key={m.id}
              className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <p className="text-[10px] ph-mono uppercase tracking-[0.18em] text-ink-faint mb-1">
                    {m.id}
                  </p>
                  <p className="ph-h3" style={{ fontSize: '1.35rem' }}>
                    {m.title}
                  </p>
                  <p className="text-xs text-ink-muted mt-0.5">{m.chef}</p>
                </div>
                <span
                  className={`text-[10px] ph-mono uppercase tracking-[0.16em] px-2 py-1 rounded-full whitespace-nowrap ${
                    m.status === 'Live'
                      ? 'bg-forest-tint text-forest'
                      : m.status === 'Launching'
                        ? 'bg-clay-tint text-clay'
                        : m.status === 'Drafting'
                          ? 'bg-peach-tint text-clay-strong'
                          : 'bg-[var(--ph-surface-sunk)] text-ink-faint'
                  }`}
                >
                  {m.status}
                </span>
              </div>

              <p className="text-sm text-ink-soft leading-relaxed mb-4 italic">
                <Quote className="inline w-3.5 h-3.5 text-clay-strong mr-1 -mt-1" />
                {m.narrative}
              </p>

              <p className="text-[10px] ph-mono uppercase tracking-[0.18em] text-clay mb-2">
                Courses
              </p>
              <ol className="space-y-1.5 mb-4 pl-3">
                {m.keyCourses.slice(0, 5).map((course, i) => (
                  <li key={i} className="text-sm text-ink-soft flex items-baseline gap-2">
                    <span className="text-[10px] ph-mono text-ink-faint flex-shrink-0">
                      0{i + 1}
                    </span>
                    <span>{course}</span>
                  </li>
                ))}
              </ol>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-[var(--ph-border)] text-xs">
                <NarrativeRow label="Provenance" body={m.provenance} />
                <NarrativeRow label="Signature ritual" body={m.signature} />
                <NarrativeRow label="Pairing" body={m.pairing} />
                <NarrativeRow label="Pricing" body={m.pricing} highlight />
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 5 — PROGRAMMING CALENDAR */}
      <Section
        eyebrow="Programming Calendar"
        title="The rhythm of the room"
        description="Chef tables, launch dinners, press services, supplier nights, pantry drops, and off-site moments."
      >
        <div className="rounded-2xl border border-[var(--ph-border)] bg-surface overflow-hidden divide-y divide-[var(--ph-border)]">
          {RESIDENCY_SERVICES.map((s) => (
            <div
              key={s.id}
              className="px-5 py-4 md:px-6 hover:bg-[var(--ph-surface-sunk)] transition-colors"
            >
              <div className="flex flex-wrap items-start gap-x-5 gap-y-2">
                <div className="flex items-start gap-3 flex-shrink-0 min-w-[180px]">
                  <div className="flex flex-col items-center pt-1">
                    <CalendarDays className="w-4 h-4 text-clay" />
                  </div>
                  <div>
                    <p className="text-xs ph-mono uppercase tracking-[0.18em] text-ink-faint">
                      {s.date}
                    </p>
                    <p className="text-sm font-medium text-ink mt-0.5">{s.title}</p>
                    {s.note && (
                      <p className="text-[11px] text-ink-faint italic mt-0.5">{s.note}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 flex-1 justify-end">
                  <span
                    className="text-[10px] ph-mono uppercase tracking-[0.16em] px-2 py-1 rounded-full"
                    style={{
                      background: 'var(--ph-surface-sunk)',
                      color: SERVICE_KIND_TINT[s.kind] || 'var(--ph-ink-muted)',
                    }}
                  >
                    {s.kind}
                  </span>
                  <span className="text-[10px] ph-mono uppercase tracking-[0.16em] text-ink-faint hidden md:inline">
                    {s.chef}
                  </span>
                  <span className="text-[10px] ph-mono text-ink-muted">
                    {s.booked} / {s.capacity}
                  </span>
                  <span
                    className={`text-[10px] ph-mono uppercase tracking-[0.16em] px-2 py-1 rounded-full ${SERVICE_STATUS_TINT[s.status] || ''}`}
                  >
                    {s.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 6 — DEMAND & HEAT LAYER */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
        <div className="lg:col-span-3">
          <Section
            eyebrow="Demand Heat"
            title="What's catching fire"
            description="Where attention concentrates — sell-through, waitlist depth, and the recommended next move."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface divide-y divide-[var(--ph-border)]">
              {RESIDENCY_DEMAND_HEAT.map((d, i) => (
                <div key={i} className="px-5 py-4 md:px-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="text-sm font-medium text-ink leading-snug">{d.service}</p>
                    <div className="flex items-center gap-3 flex-shrink-0 text-[10px] ph-mono uppercase tracking-[0.14em] text-ink-faint">
                      <span>
                        sell <span className="text-ink ph-mono">{d.sellThrough}%</span>
                      </span>
                      <span>·</span>
                      <span>
                        wait <span className="text-clay ph-mono">{d.waitlist}</span>
                      </span>
                      <span className="hidden md:inline">·</span>
                      <span className="hidden md:inline">
                        repeat <span className="text-sage-deep ph-mono">{d.repeatGuestShare}%</span>
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--ph-surface-sunk)] overflow-hidden mb-2.5">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${d.sellThrough}%`,
                        background:
                          d.sellThrough >= 95
                            ? 'linear-gradient(90deg, var(--mj-clay-strong), var(--mj-fire))'
                            : 'linear-gradient(90deg, var(--mj-clay), var(--mj-fire))',
                      }}
                    />
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed flex items-start gap-2">
                    <Sparkles className="w-3 h-3 mt-0.5 text-clay-strong flex-shrink-0" />
                    <span>{d.recommendation}</span>
                  </p>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <div className="lg:col-span-2">
          <Section
            eyebrow="Pantry extensions"
            title="Where culinary IP becomes retail"
            description="Residency dishes that became Beli's Pantry SKUs — or are about to."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface divide-y divide-[var(--ph-border)]">
              {RESIDENCY_PANTRY_EXTENSIONS.map((p) => (
                <div key={p.sku} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <p className="text-sm font-medium text-ink">{p.sku}</p>
                    <span
                      className={`text-[10px] ph-mono uppercase tracking-[0.16em] px-2 py-0.5 rounded-full whitespace-nowrap ${
                        p.launch === 'in market'
                          ? 'bg-forest-tint text-forest'
                          : p.launch === 'concept' || p.launch === 'press only'
                            ? 'bg-[var(--ph-surface-sunk)] text-ink-faint'
                            : 'bg-clay-tint text-clay'
                      }`}
                    >
                      {p.launch}
                    </span>
                  </div>
                  <p className="text-[11px] ph-mono uppercase tracking-[0.14em] text-ink-faint">
                    From: {p.from}
                  </p>
                  <p className="text-xs text-ink ph-mono mt-1">{p.units}</p>
                  <p className="text-xs text-ink-muted mt-1.5 leading-relaxed">{p.signal}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* 7 — PERFORMANCE & LEGACY ARCHIVE + PRESS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2">
          <Section
            eyebrow="Legacy Archive"
            title="Past residencies that compounded value"
            description="Closed programs and the downstream value they created across pillars."
          >
            <div className="space-y-3">
              {RESIDENCY_LEGACY.map((l) => (
                <article
                  key={l.id}
                  className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="text-[10px] ph-mono uppercase tracking-[0.18em] text-ink-faint">
                        {l.dates}
                      </p>
                      <p className="text-base font-semibold text-ink mt-1">{l.residency}</p>
                      <p className="text-xs text-ink-muted mt-0.5">{l.chef}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] ph-mono uppercase tracking-[0.16em] text-ink-faint">
                        Sold-out services
                      </p>
                      <p className="text-2xl font-semibold text-clay ph-mono mt-1">
                        {l.soldOutCount}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs ph-mono uppercase tracking-[0.16em] text-clay-strong mb-1">
                    Signature
                  </p>
                  <p className="text-sm text-ink-soft mb-3">{l.signatureDish}</p>
                  <div className="pt-3 border-t border-[var(--ph-border)] flex items-start gap-3 text-xs">
                    <ArrowRight className="w-3 h-3 mt-1 text-forest flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-ink-soft leading-relaxed">{l.downstream}</p>
                      <p className="text-[10px] ph-mono uppercase tracking-[0.14em] text-ink-faint mt-1.5">
                        Press · {l.pressImpressions} impressions
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Section>
        </div>

        <div>
          <Section
            eyebrow="Cultural Signal"
            title="Press wave"
            description="Recent editorial moments that compound prestige."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface divide-y divide-[var(--ph-border)]">
              {RESIDENCY_PRESS.map((p, i) => (
                <div key={i} className="px-5 py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Newspaper className="w-3.5 h-3.5 text-clay-strong" />
                    <span className="text-[10px] ph-mono uppercase tracking-[0.18em] text-ink-faint">
                      {p.outlet}
                    </span>
                    <span className="text-[10px] text-ink-faint">·</span>
                    <span className="text-[10px] ph-mono text-ink-faint">{p.date}</span>
                  </div>
                  <p className="text-sm text-ink leading-snug">{p.headline}</p>
                  <p className="text-[10px] ph-mono uppercase tracking-[0.14em] text-clay-strong mt-2">
                    {p.residency}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* DEMAND CHART */}
      <Section
        eyebrow="Demand by service"
        title="Sell-through across the calendar"
        description="The shape of demand. Sold-out is scarcity earned, not capacity guessed."
      >
        <div className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6" style={{ height: 320 }}>
          <ResponsiveContainer>
            <BarChart
              data={RESIDENCY_DEMAND_HEAT}
              layout="vertical"
              margin={{ top: 8, right: 24, bottom: 8, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--ph-hairline)" horizontal={false} />
              <XAxis type="number" stroke="var(--ph-ink-muted)" fontSize={11} domain={[0, 100]} unit="%" />
              <YAxis
                type="category"
                dataKey="service"
                stroke="var(--ph-ink-muted)"
                fontSize={11}
                width={170}
                tickFormatter={(v: string) => (v.length > 28 ? v.slice(0, 28) + '…' : v)}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--ph-surface)',
                  border: '1px solid var(--ph-border-strong)',
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(v) => `${v}% sell-through`}
              />
              <Bar dataKey="sellThrough" radius={[0, 6, 6, 0]}>
                {RESIDENCY_DEMAND_HEAT.map((_, i) => (
                  <Cell
                    key={i}
                    fill={
                      RESIDENCY_DEMAND_HEAT[i].sellThrough >= 95
                        ? 'var(--mj-clay-strong)'
                        : RESIDENCY_DEMAND_HEAT[i].sellThrough >= 85
                          ? 'var(--mj-clay)'
                          : 'var(--mj-fire)'
                    }
                  />
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

// ---- helpers ----

function Pulse({
  label,
  value,
  accent = 'forest',
}: {
  label: string;
  value: string | number;
  accent?: 'forest' | 'clay' | 'sage';
}) {
  const accentClass =
    accent === 'clay' ? 'text-clay' : accent === 'sage' ? 'text-sage-deep' : 'text-forest';
  return (
    <div className="flex flex-col gap-1 min-w-0">
      <span className="text-[10px] ph-mono uppercase tracking-[0.18em] text-ink-faint">{label}</span>
      <span className={`text-sm font-semibold ${accentClass}`}>{value}</span>
    </div>
  );
}

function PulseDivider() {
  return <span className="hidden md:inline-block w-px h-6 bg-[var(--ph-border)]" />;
}

function Bar2({ label, value, tint }: { label: string; value: number; tint: 'sage' | 'clay' | 'forest' }) {
  const fill =
    tint === 'sage'
      ? 'linear-gradient(90deg, var(--mj-sage-deep), var(--mj-sage))'
      : tint === 'forest'
        ? 'linear-gradient(90deg, var(--mj-forest), var(--mj-forest-soft))'
        : 'linear-gradient(90deg, var(--mj-clay-strong), var(--mj-fire))';
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] ph-mono uppercase tracking-[0.16em] text-ink-faint">
          {label}
        </span>
        <span className="text-xs ph-mono text-ink-muted">{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-[var(--ph-surface-sunk)]">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: fill }} />
      </div>
    </div>
  );
}

function NarrativeRow({
  label,
  body,
  highlight = false,
}: {
  label: string;
  body: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p
        className={`text-[10px] ph-mono uppercase tracking-[0.16em] mb-1 ${
          highlight ? 'text-clay' : 'text-ink-faint'
        }`}
      >
        {label}
      </p>
      <p className={`leading-relaxed ${highlight ? 'text-ink ph-mono' : 'text-ink-muted'}`}>
        {body}
      </p>
    </div>
  );
}
