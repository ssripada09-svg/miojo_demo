'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Compliance score - in a real app this would come from state/API
const COMPLIANCE_SCORE = 94;
const COMPLIANCE_THRESHOLD_GOOD = 90;
const COMPLIANCE_THRESHOLD_WARNING = 70;

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Determine compliance status
  const isGoodCompliance = COMPLIANCE_SCORE >= COMPLIANCE_THRESHOLD_GOOD;
  const isWarningCompliance = COMPLIANCE_SCORE >= COMPLIANCE_THRESHOLD_WARNING && COMPLIANCE_SCORE < COMPLIANCE_THRESHOLD_GOOD;
  
  const complianceColor = isGoodCompliance 
    ? 'text-pass' 
    : isWarningCompliance 
      ? 'text-warning' 
      : 'text-fail';
  
  const complianceBgColor = isGoodCompliance 
    ? 'bg-pass/10 border-pass/20 hover:bg-pass/20' 
    : isWarningCompliance 
      ? 'bg-warning/10 border-warning/20 hover:bg-warning/20' 
      : 'bg-fail/10 border-fail/20 hover:bg-fail/20';
  
  const isOnGovernancePage = pathname === '/governance';
  
  return (
    <header className="h-14 border-b border-pharos-border bg-pharos-card flex items-center justify-between px-4 md:px-6">
      {/* Left: Page context - offset for mobile menu button */}
      <div className="flex items-center gap-3 pl-10 lg:pl-0">
        <span className="text-sm text-muted-foreground hidden sm:inline">CACI Demo Environment</span>
        <span className="text-sm text-muted-foreground sm:hidden">CACI Demo</span>
      </div>

      {/* Right: Aegis compliance pulse + user */}
      <div className="flex items-center gap-4">
        {/* Aegis Governance Pulse - always visible, clickable */}
        <button
          onClick={() => router.push('/governance')}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all cursor-pointer
            ${isOnGovernancePage 
              ? 'bg-pharos-purple/20 border-pharos-purple/30' 
              : `${complianceBgColor}`
            }
          `}
          title="View Aegis Governance Dashboard"
        >
          <Shield className={`w-4 h-4 ${isOnGovernancePage ? 'text-pharos-purple' : complianceColor}`} />
          <span className="text-xs text-muted-foreground hidden sm:inline">Aegis</span>
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

        {/* Demo user avatar */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-pharos-purple flex items-center justify-center">
            <span className="text-white text-xs font-medium">DC</span>
          </div>
        </div>
      </div>
    </header>
  );
}
