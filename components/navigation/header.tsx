'use client';

import { usePathname } from 'next/navigation';
import { Eye, Sparkles } from 'lucide-react';
import Link from 'next/link';

const SECTION_LABELS: Record<string, string> = {
  '/': 'Founder Home',
  '/crews/founder-command': 'Founder Command',
  '/crews/mi-ojo-studio': 'Mi Ojo Studio',
  '/crews/beauty-days-community': 'BeautyDays Community',
  '/crews/experience-engine': 'Experience Engine',
  '/crews/concierge-engine': 'Concierge Engine',
  '/crews/residency-engine': 'Residency Engine',
  '/crews/trend-intelligence': 'Trend Intelligence',
  '/trust': 'Trust Layer',
};

export function Header() {
  const pathname = usePathname();
  const sectionLabel = SECTION_LABELS[pathname] || 'Mi Ojo OS';
  const isOnTrust = pathname === '/trust';

  return (
    <header className="h-14 border-b border-[var(--ph-border)] bg-bg-raised/85 backdrop-blur-xl flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3 pl-10 lg:pl-0 min-w-0">
        <span className="ph-rule hidden sm:inline-block" />
        <span className="ph-eyebrow truncate">{sectionLabel}</span>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/trust"
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-xs ${
            isOnTrust
              ? 'bg-forest-tint border-forest/30 text-forest'
              : 'border-[var(--ph-border)] text-ink-muted hover:bg-[var(--ph-surface-sunk)] hover:text-ink'
          }`}
          title="Trust Layer — human-in-the-loop & memory"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline ph-mono">Trust</span>
        </Link>

        <div className="hidden md:flex items-center gap-2 text-xs text-ink-muted">
          <Sparkles className="w-3.5 h-3.5 text-clay" />
          <span className="ph-mono">Founder Demo</span>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center ring-1"
            style={{
              background: 'linear-gradient(135deg, var(--mj-forest-soft), var(--mj-forest))',
              borderColor: 'var(--mj-forest-glow)',
            }}
          >
            <span className="text-white text-xs font-medium">CP</span>
          </div>
        </div>
      </div>
    </header>
  );
}
