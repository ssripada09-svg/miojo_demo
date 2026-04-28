import React from 'react';

interface SectionProps {
  eyebrow: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Section({ eyebrow, title, description, action, children, className = '' }: SectionProps) {
  return (
    <section className={`mb-10 md:mb-12 ${className}`}>
      <div className="flex items-end justify-between gap-4 mb-4 flex-wrap">
        <div>
          <div className="flex items-center mb-2">
            <span className="ph-rule" />
            <span className="ph-eyebrow">{eyebrow}</span>
          </div>
          {title && <h2 className="ph-h3">{title}</h2>}
          {description && <p className="text-sm text-ink-muted max-w-2xl mt-1.5">{description}</p>}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      {children}
    </section>
  );
}

interface KpiRowProps {
  kpis: { label: string; value: string; sub?: string }[];
  columns?: 2 | 3 | 4 | 5;
}

export function KpiRow({ kpis, columns = 4 }: KpiRowProps) {
  const grid = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-2 lg:grid-cols-5',
  }[columns];

  return (
    <div className={`grid ${grid} gap-3`}>
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="rounded-xl border border-[var(--ph-border)] bg-surface p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <p className="text-[10px] ph-mono uppercase tracking-[0.18em] text-ink-muted">{kpi.label}</p>
          <p className="text-2xl md:text-3xl font-semibold text-ink mt-1.5 tracking-[-0.01em]">
            {kpi.value}
          </p>
          {kpi.sub && <p className="text-xs text-ink-faint mt-1">{kpi.sub}</p>}
        </div>
      ))}
    </div>
  );
}

interface RecsListProps {
  items: { title: string; detail: string; impact: string }[];
}

export function RecsList({ items }: RecsListProps) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl border border-[var(--ph-border)] bg-surface p-5 hover:border-[var(--ph-border-strong)] transition-colors"
        >
          <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
            <p className="text-sm font-semibold text-ink">{item.title}</p>
            <span className="text-[10px] ph-mono uppercase tracking-[0.16em] text-teal-deep px-2 py-1 rounded-full bg-teal-tint">
              {item.impact}
            </span>
          </div>
          <p className="text-sm text-ink-muted leading-relaxed">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}
