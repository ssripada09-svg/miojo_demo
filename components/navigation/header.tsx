'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const COMPLIANCE_SCORE = 94;
const COMPLIANCE_THRESHOLD_GOOD = 90;
const COMPLIANCE_THRESHOLD_WARNING = 70;

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const isGoodCompliance = COMPLIANCE_SCORE >= COMPLIANCE_THRESHOLD_GOOD;
  const isWarningCompliance = COMPLIANCE_SCORE >= COMPLIANCE_THRESHOLD_WARNING && COMPLIANCE_SCORE < COMPLIANCE_THRESHOLD_GOOD;

  const complianceColor = isGoodCompliance
    ? 'text-pass'
    : isWarningCompliance
      ? 'text-warning'
      : 'text-fail';

  const complianceBgColor = isGoodCompliance
    ? 'bg-pass/10 border-pass/20 hover:bg-pass/15'
    : isWarningCompliance
      ? 'bg-warning/10 border-warning/20 hover:bg-warning/15'
      : 'bg-fail/10 border-fail/20 hover:bg-fail/15';

  const isOnGovernancePage = pathname === '/governance';

  return (
    <header className="h-14 border-b border-[var(--ph-border)] bg-bg-raised/85 backdrop-blur-xl flex items-center justify-between px-4 md:px-6">
      {/* Left: editorial eyebrow device */}
      <div className="flex items-center gap-3 pl-10 lg:pl-0">
        <span className="ph-rule hidden sm:inline-block" />
        <span className="ph-eyebrow hidden sm:inline">CACI Demo Environment</span>
        <span className="ph-eyebrow sm:hidden">CACI Demo</span>
      </div>

      {/* Right: Aegis compliance pulse + user */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push('/governance')}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all cursor-pointer
            ${isOnGovernancePage
              ? 'bg-pharos-purple/10 border-pharos-purple/30'
              : `${complianceBgColor}`
            }
          `}
          title="View Aegis Governance Dashboard"
        >
          <Shield className={`w-4 h-4 ${isOnGovernancePage ? 'text-pharos-purple' : complianceColor}`} />
          <span className="text-xs text-ink-muted hidden sm:inline">Aegis</span>
          <Badge
            variant="outline"
            className={`text-xs ${
              isOnGovernancePage
                ? 'bg-pharos-purple/10 text-pharos-purple border-pharos-purple/20'
                : isGoodCompliance
                  ? 'bg-pass/10 text-pass border-pass/20'
                  : isWarningCompliance
                    ? 'bg-warning/10 text-warning border-warning/20'
                    : 'bg-fail/10 text-fail border-fail/20'
            }`}
          >
            {isGoodCompliance && <CheckCircle className="w-2.5 h-2.5 mr-1" />}
            {isWarningCompliance && <AlertTriangle className="w-2.5 h-2.5 mr-1" />}
            {COMPLIANCE_SCORE}%
          </Badge>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-pharos-purple/90 flex items-center justify-center ring-1 ring-pharos-purple/30">
            <span className="text-white text-xs font-medium">DC</span>
          </div>
        </div>
      </div>
    </header>
  );
}
