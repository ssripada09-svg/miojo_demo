'use client';

import { Compass, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface CrewHeaderProps {
  eyebrow: string;
  title: string;
  italicWord?: string;
  subtitle: string;
  mission: string;
  icon: LucideIcon;
  accent: 'teal' | 'gold' | 'ink';
  pillar?: string;
  liveLabel?: string;
  liveValue?: string;
}

export function CrewHeader({
  eyebrow,
  title,
  italicWord,
  subtitle,
  mission,
  icon: Icon,
  accent,
  pillar,
  liveLabel = 'On mission',
  liveValue,
}: CrewHeaderProps) {
  const tint =
    accent === 'gold'
      ? { bg: 'bg-gold-tint', fg: 'text-gold-deep' }
      : accent === 'ink'
        ? { bg: 'bg-[var(--ph-surface-sunk)]', fg: 'text-ink' }
        : { bg: 'bg-teal-tint', fg: 'text-teal-deep' };

  // Render title with optional italic word substituted in.
  const renderTitle = () => {
    if (!italicWord) return title;
    const parts = title.split(italicWord);
    if (parts.length < 2) return title;
    return (
      <>
        {parts[0]}
        <span className="ph-display-serif-italic" style={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
          {italicWord}
        </span>
        {parts.slice(1).join(italicWord)}
      </>
    );
  };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[var(--ph-border)] bg-bg-raised hero-with-glow px-6 py-9 md:px-10 md:py-12 mb-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-3xl min-w-0">
          <div className="flex items-center mb-4">
            <span className="ph-rule" />
            <span className="ph-eyebrow">{eyebrow}</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${tint.bg} ${tint.fg}`}>
              <Icon className="w-5 h-5" />
            </div>
            <h1 className="ph-h2 text-balance">{renderTitle()}</h1>
          </div>
          <p className="ph-lede max-w-2xl mb-2">{subtitle}</p>
          <p className="text-sm text-ink-muted max-w-2xl">{mission}</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap flex-shrink-0">
          {pillar && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--ph-border-strong)] bg-surface text-[11px] ph-mono uppercase tracking-[0.16em] text-ink-muted">
              <Compass className="w-3 h-3" /> {pillar}
            </span>
          )}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--ph-border-strong)] bg-surface">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-pass opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pass" />
            </span>
            <span className="text-[11px] ph-mono uppercase tracking-[0.16em] text-ink-muted">
              {liveLabel}{liveValue ? ` \u00b7 ${liveValue}` : ''}
            </span>
          </div>
          <Link
            href="/"
            className="text-xs text-ink-muted hover:text-ink inline-flex items-center gap-1"
          >
            <ArrowRight className="w-3 h-3 rotate-180" /> Home
          </Link>
        </div>
      </div>
    </section>
  );
}
