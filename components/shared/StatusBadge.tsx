'use client';

import React from 'react';
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
  success: 'border-pass/25 bg-pass/10 text-pass',
  warning: 'border-warning/25 bg-warning/10 text-warning',
  error: 'border-fail/25 bg-fail/10 text-fail',
  info: 'border-teal/25 bg-teal-tint text-teal-deep',
  neutral: 'border-[var(--ph-border)] bg-[var(--ph-surface-sunk)] text-ink-muted',
  primary: 'border-teal/25 bg-teal-tint text-teal-deep',
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

interface HealthBadgeProps {
  score: number;
  className?: string;
}

export function HealthBadge({ score, className }: HealthBadgeProps) {
  const config = score >= 95 ? { variant: 'success' as const, label: 'Healthy' } : score >= 80 ? { variant: 'info' as const, label: 'Good' } : score >= 60 ? { variant: 'warning' as const, label: 'Degraded' } : { variant: 'error' as const, label: 'Critical' };
  return <StatusBadge variant={config.variant} className={className}>{config.label} ({score}%)</StatusBadge>;
}
