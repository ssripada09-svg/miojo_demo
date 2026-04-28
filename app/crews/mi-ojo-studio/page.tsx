'use client';

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RadarShape,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { CrewHeader } from '@/components/miojo/CrewHeader';
import { Section, KpiRow, RecsList } from '@/components/miojo/Section';
import { TrustFooter } from '@/components/shared/AegisFooter';
import {
  MIOJO_STUDIO_KPIS,
  STUDIO_CONCEPTS,
  STUDIO_AUDIENCE_RESONANCE,
  STUDIO_NARRATIVE_OPTIONS,
  STUDIO_LAUNCH_PIPELINE,
  STUDIO_RECOMMENDATIONS,
} from '@/data/miojo-mock';

const STAGE_COLORS: Record<string, string> = {
  Concept: 'var(--ph-ink-muted)',
  Narrative: 'var(--ph-teal)',
  Production: 'var(--ph-gold-strong)',
  'Launch-Ready': 'var(--ph-success)',
};

export default function MiOjoStudioPage() {
  return (
    <div className="max-w-[1280px] mx-auto">
      <CrewHeader
        eyebrow="Crew 02 · Mi Ojo Studio"
        title="Mi Ojo Studio"
        italicWord="Ojo"
        subtitle="The creative & brand operating room."
        mission="An AI co-strategist for brand creation, narrative, launch readiness, and retail strategy. The cashflow engine that funds and de-risks the rest of Miojo."
        icon={Sparkles}
        accent="gold"
        pillar="Mi Ojo · Live"
        liveValue="12 active concepts"
      />

      {/* KPIs */}
      <Section eyebrow="Studio at a glance">
        <KpiRow kpis={MIOJO_STUDIO_KPIS} columns={4} />
      </Section>

      {/* MISSION: NARRATIVE OPTIONS */}
      <Section
        eyebrow="Active mission"
        title="Maison Vence — narrative direction"
        description="The crew tested three positioning angles across LA, NYC, and Mexico City Beauty Days panels. Recommendation flagged for Ciarra's review."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STUDIO_NARRATIVE_OPTIONS.map((opt) => {
            const isRec = opt.label === 'Option B';
            return (
              <div
                key={opt.label}
                className={`rounded-2xl border p-5 transition-all ${
                  isRec
                    ? 'border-teal-deep bg-teal-tint/40 shadow-md'
                    : 'border-[var(--ph-border)] bg-surface'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] ph-mono uppercase tracking-[0.18em] text-teal-deep">
                    {opt.label}
                  </span>
                  {isRec && (
                    <span className="inline-flex items-center gap-1 text-[10px] ph-mono uppercase tracking-[0.16em] px-2 py-1 rounded-full bg-teal-deep text-white">
                      <CheckCircle2 className="w-3 h-3" /> Recommended
                    </span>
                  )}
                </div>
                <p className="ph-h3 mb-3" style={{ fontSize: '1.25rem' }}>
                  &ldquo;{opt.headline}&rdquo;
                </p>
                <p className="text-xs ph-mono uppercase tracking-[0.14em] text-ink-muted mb-2">
                  {opt.angle}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 h-1.5 rounded-full bg-[var(--ph-surface-sunk)]">
                    <div
                      className="h-full rounded-full bg-teal-deep"
                      style={{ width: `${opt.score}%` }}
                    />
                  </div>
                  <span className="text-xs ph-mono text-ink-muted">{opt.score}</span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">{opt.note}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* CONCEPT PIPELINE BAR + RESONANCE RADAR */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
        <div className="lg:col-span-3">
          <Section
            eyebrow="Concept pipeline"
            title="Where each concept lives"
            description="Twelve workstreams, four stages — from raw concept to launch-ready."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6" style={{ height: 320 }}>
              <ResponsiveContainer>
                <BarChart data={STUDIO_LAUNCH_PIPELINE} margin={{ top: 16, right: 16, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--ph-hairline)" vertical={false} />
                  <XAxis dataKey="stage" stroke="var(--ph-ink-muted)" fontSize={11} />
                  <YAxis stroke="var(--ph-ink-muted)" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--ph-surface)',
                      border: '1px solid var(--ph-border-strong)',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {STUDIO_LAUNCH_PIPELINE.map((s) => (
                      <Cell key={s.stage} fill={STAGE_COLORS[s.stage] || 'var(--ph-teal)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </div>

        <div className="lg:col-span-2">
          <Section
            eyebrow="Audience resonance"
            title="Three lenses, six axes"
            description="How tested narratives resonate across founder voice, ritual, inclusivity, and price-to-premium."
          >
            <div className="rounded-2xl border border-[var(--ph-border)] bg-surface p-5 md:p-6" style={{ height: 320 }}>
              <ResponsiveContainer>
                <RadarChart data={STUDIO_AUDIENCE_RESONANCE} outerRadius={100}>
                  <PolarGrid stroke="var(--ph-border)" />
                  <PolarAngleAxis dataKey="axis" tick={{ fill: 'var(--ph-ink-muted)', fontSize: 10 }} />
                  <PolarRadiusAxis tick={{ fill: 'var(--ph-ink-faint)', fontSize: 9 }} />
                  <RadarShape name="Option A" dataKey="a" stroke="var(--ph-ink)" fill="var(--ph-ink)" fillOpacity={0.08} />
                  <RadarShape name="Option B" dataKey="b" stroke="var(--ph-teal-deep)" fill="var(--ph-teal)" fillOpacity={0.25} />
                  <RadarShape name="Option C" dataKey="c" stroke="var(--ph-gold-strong)" fill="var(--ph-gold)" fillOpacity={0.18} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--ph-surface)',
                      border: '1px solid var(--ph-border-strong)',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </div>
      </div>

      {/* CONCEPTS TABLE */}
      <Section
        eyebrow="Concept ledger"
        title="Twelve workstreams"
        description="Each concept tracked: stage, founder, retail target, launch readiness."
      >
        <div className="rounded-2xl border border-[var(--ph-border)] bg-surface overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--ph-border)] bg-[var(--ph-surface-sunk)]">
                <Th>Concept</Th>
                <Th>Founder</Th>
                <Th>Category</Th>
                <Th>Stage</Th>
                <Th>Readiness</Th>
                <Th>Retail target</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--ph-border)]">
              {STUDIO_CONCEPTS.map((c) => (
                <tr key={c.name} className="hover:bg-[var(--ph-surface-sunk)] transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-ink">{c.name}</td>
                  <td className="px-4 py-3 text-sm text-ink-muted">{c.founder}</td>
                  <td className="px-4 py-3 text-sm text-ink-muted">{c.category}</td>
                  <td className="px-4 py-3">
                    <span
                      className="text-[10px] ph-mono uppercase tracking-[0.16em] px-2 py-1 rounded-full"
                      style={{
                        background: 'var(--ph-surface-sunk)',
                        color: STAGE_COLORS[c.stage] || 'var(--ph-ink-muted)',
                      }}
                    >
                      {c.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3 min-w-[140px]">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-[var(--ph-surface-sunk)]">
                        <div
                          className="h-full rounded-full bg-teal-deep"
                          style={{ width: `${c.readiness}%` }}
                        />
                      </div>
                      <span className="text-xs ph-mono text-ink-muted">{c.readiness}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-ink-muted">{c.retail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* RECOMMENDATIONS */}
      <Section
        eyebrow="Studio recommendations"
        title="What the crew suggests Ciarra do next"
        description="Three calls scored against impact. Each has source memory and panel evidence behind it."
      >
        <RecsList items={STUDIO_RECOMMENDATIONS} />
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
