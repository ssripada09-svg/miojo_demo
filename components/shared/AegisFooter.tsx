'use client';

import { Eye } from 'lucide-react';

interface TrustFooterProps {
  className?: string;
}

/**
 * TrustFooter \u2014 the Miojo human-in-the-loop reminder. Replaces the legacy
 * AegisFooter export so all existing imports continue to work.
 */
export function AegisFooter({ className = '' }: TrustFooterProps) {
  return (
    <div className={`mt-6 pt-4 border-t border-[var(--ph-border)] ${className}`}>
      <div className="flex items-center justify-center gap-2 text-xs text-ink-muted">
        <Eye className="h-3.5 w-3.5 text-teal-deep" />
        <span className="ph-mono">HUMAN IN THE LOOP</span>
        <span className="text-ink-ghost">\u00b7</span>
        <span>Ciarra approves \u2014 agents execute. Every decision logged.</span>
      </div>
    </div>
  );
}

export const TrustFooter = AegisFooter;
export default AegisFooter;
