'use client';

import { Shield } from 'lucide-react';

interface AegisFooterProps {
  className?: string;
}

export function AegisFooter({ className = '' }: AegisFooterProps) {
  return (
    <div className={`mt-6 pt-4 border-t border-[var(--ph-border)] ${className}`}>
      <div className="flex items-center justify-center gap-2 text-xs text-ink-muted">
        <Shield className="h-3.5 w-3.5 text-pharos-purple" />
        <span className="ph-mono">AEGIS GOVERNANCE ACTIVE</span>
        <span className="text-ink-ghost">·</span>
        <span>All actions logged</span>
      </div>
    </div>
  );
}

export default AegisFooter;
