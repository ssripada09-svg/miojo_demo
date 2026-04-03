'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  className?: string;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

const CHART_SKELETON_HEIGHTS = ['24%', '38%', '33%', '50%', '44%', '66%', '58%', '49%', '72%', '61%', '80%', '57%'];

export function LoadingState({ className, message = 'Loading...', size = 'md' }: LoadingStateProps) {
  const sizes = {
    sm: { spinner: 'h-4 w-4', text: 'text-sm' },
    md: { spinner: 'h-6 w-6', text: 'text-base' },
    lg: { spinner: 'h-8 w-8', text: 'text-lg' },
  };

  return (
    <div className={cn('flex flex-col items-center justify-center py-12', className)}>
      <Loader2 className={cn('animate-spin text-primary', sizes[size].spinner)} />
      {message && <p className={cn('mt-3 text-muted-foreground', sizes[size].text)}>{message}</p>}
    </div>
  );
}

export function Skeleton({ className, style }: SkeletonProps) {
  return <div className={cn('animate-pulse rounded bg-muted', className)} style={style} />;
}

export function CardSkeleton({ className }: Omit<SkeletonProps, 'style'>) {
  return (
    <div className={cn('rounded-lg border border-border bg-card p-6', className)}>
      <div className="space-y-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  );
}

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function TableSkeleton({ rows = 5, columns = 4, className }: TableSkeletonProps) {
  return (
    <div className={cn('rounded-lg border border-border bg-card', className)}>
      <div className="border-b border-border p-4">
        <Skeleton className="h-8 w-64" />
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div key={rowIdx} className="flex gap-4 p-4">
            {Array.from({ length: columns }).map((_, colIdx) => (
              <Skeleton key={colIdx} className="h-5 flex-1" style={{ maxWidth: colIdx === 0 ? '200px' : '100px' }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartSkeleton({ className }: Omit<SkeletonProps, 'style'>) {
  return (
    <div className={cn('rounded-lg border border-border bg-card p-6', className)}>
      <div className="space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="flex h-48 items-end justify-between gap-2">
          {CHART_SKELETON_HEIGHTS.map((height, i) => (
            <Skeleton key={i} className="flex-1 rounded-t" style={{ height }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>

      <TableSkeleton rows={5} columns={5} />
    </div>
  );
}

interface SpinnerProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export function Spinner({ className, size = 'sm' }: SpinnerProps) {
  const sizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return <Loader2 className={cn('animate-spin', sizes[size], className)} />;
}
