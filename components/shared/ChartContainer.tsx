'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ChartContainerProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  loading?: boolean;
  error?: string;
  className?: string;
  height?: number | string;
  actions?: React.ReactNode;
}

const SKELETON_BAR_HEIGHTS = ['28%', '42%', '35%', '58%', '46%', '70%', '62%', '54%', '76%', '68%', '82%', '60%'];

export function ChartContainer({
  title,
  subtitle,
  children,
  loading = false,
  error,
  className,
  height = 300,
  actions,
}: ChartContainerProps) {
  return (
    <div className={cn('rounded-lg border border-border bg-card', className)}>
      {(title || actions) && (
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            {title && <h3 className="font-semibold text-foreground">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      <div className="p-6" style={{ height: typeof height === 'number' ? `${height}px` : height }}>
        {loading ? (
          <ChartSkeleton />
        ) : error ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p className="font-medium text-red-500">Error loading chart</p>
              <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        ) : (
          <div className="h-full w-full">{children}</div>
        )}
      </div>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="flex h-full w-full items-end justify-between gap-2 animate-pulse">
      {SKELETON_BAR_HEIGHTS.map((height, i) => (
        <div key={i} className="flex-1 rounded-t bg-muted" style={{ height }} />
      ))}
    </div>
  );
}

interface LegendItem {
  label: string;
  color: string;
  value?: string | number;
}

interface ChartLegendProps {
  items: LegendItem[];
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

export function ChartLegend({ items, className, direction = 'horizontal' }: ChartLegendProps) {
  return (
    <div className={cn('flex gap-4', direction === 'vertical' ? 'flex-col' : 'flex-wrap', className)}>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
          <span className="text-sm text-muted-foreground">{item.label}</span>
          {item.value !== undefined && <span className="text-sm font-medium">{item.value}</span>}
        </div>
      ))}
    </div>
  );
}

interface SparklineProps {
  data: number[];
  color?: string;
  className?: string;
  width?: number;
  height?: number;
}

export function Sparkline({ data, color = 'currentColor', className, width = 80, height = 24 }: SparklineProps) {
  if (data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = data.length === 1 ? width / 2 : (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} className={className}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}
