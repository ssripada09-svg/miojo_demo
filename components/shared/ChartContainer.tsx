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
    <div className={cn('bg-card rounded-lg border border-border', className)}>
      {(title || actions) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            {title && <h3 className="font-semibold text-foreground">{title}</h3>}
            {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      
      <div 
        className="p-6"
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
      >
        {loading ? (
          <ChartSkeleton />
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-red-500 font-medium">Error loading chart</p>
              <p className="text-sm text-muted-foreground mt-1">{error}</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="w-full h-full flex items-end justify-between gap-2 animate-pulse">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 bg-muted rounded-t"
          style={{ height: `${Math.random() * 60 + 20}%` }}
        />
      ))}
    </div>
  );
}

// Chart legend component
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
    <div
      className={cn(
        'flex gap-4',
        direction === 'vertical' ? 'flex-col' : 'flex-wrap',
        className
      )}
    >
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-muted-foreground">{item.label}</span>
          {item.value !== undefined && (
            <span className="text-sm font-medium">{item.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}

// Mini chart for inline displays
interface SparklineProps {
  data: number[];
  color?: string;
  className?: string;
  width?: number;
  height?: number;
}

export function Sparkline({
  data,
  color = 'currentColor',
  className,
  width = 80,
  height = 24,
}: SparklineProps) {
  if (data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
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
