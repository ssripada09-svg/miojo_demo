'use client';

import React from 'react';
import { AlertTriangle, Check, Clock, Shield, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'primary';

interface StatusBadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'border-green-500/20 bg-green-500/10 text-green-500',
  warning: 'border-yellow-500/20 bg-yellow-500/10 text-yellow-500',
  error: 'border-red-500/20 bg-red-500/10 text-red-500',
  info: 'border-blue-500/20 bg-blue-500/10 text-blue-500',
  neutral: 'border-border bg-muted text-muted-foreground',
  primary: 'border-primary/20 bg-primary/10 text-primary',
};

const sizeStyles = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-1 text-xs',
  lg: 'px-2.5 py-1.5 text-sm',
};

export function StatusBadge({ variant = 'neutral', children, className, icon, size = 'md' }: StatusBadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border font-medium', variantStyles[variant], sizeStyles[size], className)}>
      {icon}
      {children}
    </span>
  );
}

interface ComplianceBadgeProps {
  certification: string;
  status?: 'authorized' | 'in_process' | 'not_applicable' | 'unknown';
  className?: string;
}

export function ComplianceBadge({ certification, status = 'authorized', className }: ComplianceBadgeProps) {
  const config =
    status === 'authorized'
      ? { variant: 'success' as const, icon: <ShieldCheck className="h-3 w-3" /> }
      : status === 'in_process'
        ? { variant: 'warning' as const, icon: <Clock className="h-3 w-3" /> }
        : status === 'not_applicable'
          ? { variant: 'neutral' as const, icon: null }
          : { variant: 'neutral' as const, icon: <AlertTriangle className="h-3 w-3" /> };

  return (
    <StatusBadge variant={config.variant} icon={config.icon} className={className}>
      {certification}
    </StatusBadge>
  );
}

interface UtilizationBadgeProps {
  value: number;
  className?: string;
  showPercentage?: boolean;
}

export function UtilizationBadge({ value, className, showPercentage = true }: UtilizationBadgeProps) {
  const variant: BadgeVariant = value >= 80 ? 'success' : value >= 60 ? 'info' : value >= 40 ? 'warning' : 'error';
  const label = value >= 80 ? 'High' : value >= 60 ? 'Good' : value >= 40 ? 'Low' : 'Critical';

  return <StatusBadge variant={variant} className={className}>{showPercentage ? `${value}%` : label}</StatusBadge>;
}

interface RiskBadgeProps {
  score: number;
  className?: string;
}

export function RiskBadge({ score, className }: RiskBadgeProps) {
  const config = score <= 25 ? { variant: 'success' as const, label: 'Low Risk' } : score <= 50 ? { variant: 'info' as const, label: 'Moderate' } : score <= 75 ? { variant: 'warning' as const, label: 'Elevated' } : { variant: 'error' as const, label: 'High Risk' };
  return <StatusBadge variant={config.variant} className={className}>{config.label}</StatusBadge>;
}

interface FedRAMPBadgeProps {
  status: 'authorized' | 'in_process' | 'ready' | 'not_applicable' | 'unknown';
  level?: 'high' | 'moderate' | 'low' | 'tailored';
  className?: string;
}

export function FedRAMPBadge({ status, level, className }: FedRAMPBadgeProps) {
  const config =
    status === 'authorized'
      ? { variant: 'success' as const, icon: <Shield className="h-3 w-3" />, label: level ? `FedRAMP ${level.charAt(0).toUpperCase() + level.slice(1)}` : 'FedRAMP' }
      : status === 'in_process'
        ? { variant: 'warning' as const, icon: <Clock className="h-3 w-3" />, label: 'In Process' }
        : status === 'ready'
          ? { variant: 'info' as const, icon: <Check className="h-3 w-3" />, label: 'FedRAMP Ready' }
          : status === 'not_applicable'
            ? { variant: 'neutral' as const, icon: null, label: 'N/A' }
            : { variant: 'neutral' as const, icon: <AlertTriangle className="h-3 w-3" />, label: 'Unknown' };

  return <StatusBadge variant={config.variant} icon={config.icon} className={className}>{config.label}</StatusBadge>;
}

interface HealthBadgeProps {
  score: number;
  className?: string;
}

export function HealthBadge({ score, className }: HealthBadgeProps) {
  const config = score >= 95 ? { variant: 'success' as const, label: 'Healthy' } : score >= 80 ? { variant: 'info' as const, label: 'Good' } : score >= 60 ? { variant: 'warning' as const, label: 'Degraded' } : { variant: 'error' as const, label: 'Critical' };
  return <StatusBadge variant={config.variant} className={className}>{config.label} ({score}%)</StatusBadge>;
}
