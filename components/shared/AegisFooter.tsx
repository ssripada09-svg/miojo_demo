'use client';

import { Shield } from 'lucide-react';

interface AegisFooterProps {
  className?: string;
}

export function AegisFooter({ className = '' }: AegisFooterProps) {
  return (
    <div className={`mt-6 pt-4 border-t border-pharos-border ${className}`}>
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Shield className="h-3.5 w-3.5 text-pharos-purple" />
        <span>🛡️ Aegis Governance Active</span>
        <span className="text-pharos-border">•</span>
        <span>All actions logged</span>
      </div>
    </div>
  );
}

export default AegisFooter;
