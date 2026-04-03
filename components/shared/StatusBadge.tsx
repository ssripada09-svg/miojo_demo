'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check, Clock, AlertTriangle, X, Shield, Lock, ShieldCheck } from 'lucide-react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'primary';

interface StatusBadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-green-500/10 text-green-500 border-green-500/20',
  warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  error: 'bg-red-500/10 text-red-500 border-red-500/20',
  info: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  neutral: 'bg-muted text-muted-foreground border-border',
  primary: 'bg-primary/10 text-primary border-primary/20',
};

const sizeStyles = {
  sm: 'text-xs px-1.5 py-0.5',
  md: 'text-xs px-2 py-1',
  lg: 'text-sm px-2.5 py-1.5',
};

export function StatusBadge({
  variant = 'neutral',
  children,
  className,
  icon,
  size = 'md',
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium rounded-full border',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}

// Compliance-specific badges
interface ComplianceBadgeProps {
  certification: string;
  status?: 'authorized' | 'in_process' | 'not_applicable' | 'unknown';
  className?: string;
}

export function ComplianceBadge({ certification, status = 'authorized', className }: ComplianceBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'authorized':
        return { variant: 'success' as const, icon: <ShieldCheck className="h-3 w-3" /> };
      case 'in_process':
        return { variant: 'warning' as const, icon: <Clock className="h-3 w-3" /> };
      case 'not_applicable':
        return { variant: 'neutral' as const, icon: null };
      default:
        return { variant: 'neutral' as const, icon: <AlertTriangle className="h-3 w-3" /> };
    }
  };

  const config = getStatusConfig();

  return (
    <StatusBadge variant={config.variant} icon={config.icon} className={className}>
      {certification}
    </StatusBadge>
  );
}

// Utilization badge with color coding
interface UtilizationBadgeProps {
  value: number; // 0-100
  className?: string;
  showPercentage?: boolean;
}

export function UtilizationBadge({ value, className, showPercentage = true }: UtilizationBadgeProps) {
  const getVariant = (): BadgeVariant => {
    if (value >= 80) return 'success';
    if (value >= 60) return 'info';
    if (value >= 40) return 'warning';
    return 'error';
  };

  const getLabel = () => {
    if (value >= 80) return 'High';
    if (value >= 60) return 'Good';
    if (value >= 40) return 'Low';
    return 'Critical';
  };

  return (
    <StatusBadge variant={getVariant()} className={className}>
      {showPercentage ? `${value}%` : getLabel()}
    </StatusBadge>
  );
}

// Risk score badge
interface RiskBadgeProps {
  score: number; // 0-100
  className?: string;
}

export function RiskBadge({ score, className }: RiskBadgeProps) {
  const getConfig = () => {
    if (score <= 25) return { variant: 'success' as const, label: 'Low Risk' };
    if (score <= 50) return { variant: 'info' as const, label: 'Moderate' };
    if (score <= 75) return { variant: 'warning' as const, label: 'Elevated' };
    return { variant: 'error' as const, label: 'High Risk' };
  };

  const config = getConfig();

  return (
    <StatusBadge variant={config.variant} className={className}>
      {config.label}
    </StatusBadge>
  );
}

// FedRAMP status badge
interface FedRAMPBadgeProps {
  status: 'authorized' | 'in_process' | 'ready' | 'not_applicable' | 'unknown';
  level?: 'high' | 'moderate' | 'low' | 'tailored';
  className?: string;
}

export function FedRAMPBadge({ status, level, className }: FedRAMPBadgeProps) {
  const getConfig = () => {
    switch (status) {
      case 'authorized':
        return {
          variant: 'success' as const,
          icon: <Shield className="h-3 w-3" />,
          label: level ? `FedRAMP ${level.charAt(0).toUpperCase() + level.slice(1)}` : 'FedRAMP',
        };
      case 'in_process':
        return {
          variant: 'warning' as const,
          icon: <Clock className="h-3 w-3" />,
          label: 'In Process',
        };
      case 'ready':
        return {
          variant: 'info' as const,
          icon: <Check className="h-3 w-3" />,
          label: 'FedRAMP Ready',
        };
      case 'not_applicable':
        return {
          variant: 'neutral' as const,
          icon: null,
          label: 'N/A',
        };
      default:
        return {
          variant: 'neutral' as const,
          icon: <AlertTriangle className="h-3 w-3" />,
          label: 'Unknown',
        };
    }
  };

  const config = getConfig();

  return (
    <StatusBadge variant={config.variant} icon={config.icon} className={className}>
      {config.label}
    </StatusBadge>
  );
}

// Integration health badge
interface HealthBadgeProps {
  score: number; // 0-100
  className?: string;
}

export function HealthBadge({ score, className }: HealthBadgeProps) {
  const getConfig = () => {
    if (score >= 95) return { variant: 'success' as const, label: 'Healthy' };
    if (score >= 80) return { variant: 'info' as const, label: 'Good' };
    if (score >= 60) return { variant: 'warning' as const, label: 'Degraded' };
    return { variant: 'error' as const, label: 'Critical' };
  };

  const config = getConfig();

  return (
    <StatusBadge variant={config.variant} className={className}>
      {config.label} ({score}%)
    </StatusBadge>
  );
}
