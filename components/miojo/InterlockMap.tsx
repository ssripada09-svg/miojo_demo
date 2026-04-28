'use client';

import React from 'react';

/**
 * Miojo Interlock Map — the home-page signature object.
 *
 * One founder at the center. Four pillars positioned around overlapping
 * thematic rings (Creative · Community · Wellness · Hospitality · Commerce ·
 * Culture). The map exists to make the platform thesis legible in <20 seconds:
 * everything is one engine, expressed in different surfaces.
 */
export function InterlockMap() {
  return (
    <div className="relative w-full" style={{ aspectRatio: '4 / 3', minHeight: 360 }}>
      <svg
        viewBox="0 0 800 600"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--ph-teal)" stopOpacity="0.22" />
            <stop offset="60%" stopColor="var(--ph-teal)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="var(--ph-teal)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--ph-gold)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--ph-gold)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient halos */}
        <ellipse cx="400" cy="300" rx="320" ry="240" fill="url(#centerGlow)" />
        <ellipse cx="220" cy="180" rx="180" ry="120" fill="url(#goldGlow)" />
        <ellipse cx="580" cy="420" rx="180" ry="120" fill="url(#goldGlow)" />

        {/* Theme rings */}
        <g stroke="var(--ph-border-strong)" strokeWidth="1" fill="none" opacity="0.55">
          <circle cx="400" cy="300" r="170" strokeDasharray="2 4" />
          <circle cx="400" cy="300" r="240" strokeDasharray="2 6" />
        </g>

        {/* Connectors from center to pillars */}
        <g stroke="var(--ph-teal-deep)" strokeWidth="1" opacity="0.4">
          <line x1="400" y1="300" x2="200" y2="160" />
          <line x1="400" y1="300" x2="600" y2="160" />
          <line x1="400" y1="300" x2="200" y2="440" />
          <line x1="400" y1="300" x2="600" y2="440" />
        </g>

        {/* Theme labels (around the outer ring) */}
        <g
          fontFamily="var(--font-jetbrains-mono), monospace"
          fontSize="11"
          fontWeight="600"
          letterSpacing="2.4"
          fill="var(--ph-ink-muted)"
        >
          <text x="400" y="48" textAnchor="middle">CULTURE</text>
          <text x="400" y="568" textAnchor="middle">COMMERCE</text>
          <text x="48" y="304" textAnchor="middle">CREATIVE</text>
          <text x="752" y="304" textAnchor="middle">COMMUNITY</text>
          <text x="120" y="100" textAnchor="middle">HOSPITALITY</text>
          <text x="680" y="510" textAnchor="middle">WELLNESS</text>
        </g>

        {/* Center node */}
        <g>
          <circle cx="400" cy="300" r="74" fill="var(--ph-bg-raised)" stroke="var(--ph-teal-deep)" strokeWidth="1.5" />
          <circle cx="400" cy="300" r="74" fill="none" stroke="var(--ph-teal)" strokeOpacity="0.25" strokeWidth="6" />
          <text
            x="400"
            y="290"
            textAnchor="middle"
            fontFamily="var(--font-jetbrains-mono), monospace"
            fontSize="9"
            fontWeight="600"
            letterSpacing="2.2"
            fill="var(--ph-teal-deep)"
          >
            FOUNDER
          </text>
          <text
            x="400"
            y="318"
            textAnchor="middle"
            fontFamily="var(--font-fraunces), serif"
            fontStyle="italic"
            fontWeight="400"
            fontSize="32"
            fill="var(--ph-ink)"
          >
            Ciarra
          </text>
          <text
            x="400"
            y="340"
            textAnchor="middle"
            fontFamily="var(--font-inter), sans-serif"
            fontSize="11"
            fill="var(--ph-ink-muted)"
            letterSpacing="0.5"
          >
            Miojo OS
          </text>
        </g>

        {/* Pillar nodes */}
        {[
          { x: 200, y: 160, label: 'Mi Ojo', sub: 'Studio · Live', fill: 'var(--ph-gold-strong)' },
          { x: 600, y: 160, label: 'Beauty Days', sub: 'Community · Launching', fill: 'var(--ph-teal)' },
          { x: 200, y: 440, label: 'Peppers & Bellies', sub: 'Hospitality · Early', fill: 'var(--ph-teal-deep)' },
          { x: 600, y: 440, label: 'Residences', sub: 'Stays · Concept', fill: 'var(--ph-ink)' },
        ].map((p) => (
          <g key={p.label}>
            <circle cx={p.x} cy={p.y} r="48" fill="var(--ph-surface)" stroke="var(--ph-border-strong)" strokeWidth="1" />
            <circle cx={p.x} cy={p.y} r="6" fill={p.fill} />
            <text
              x={p.x}
              y={p.y + 22}
              textAnchor="middle"
              fontFamily="var(--font-inter), sans-serif"
              fontSize="13"
              fontWeight="600"
              fill="var(--ph-ink)"
            >
              {p.label}
            </text>
            <text
              x={p.x}
              y={p.y + 38}
              textAnchor="middle"
              fontFamily="var(--font-jetbrains-mono), monospace"
              fontSize="9"
              letterSpacing="1.4"
              fill="var(--ph-ink-muted)"
            >
              {p.sub.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
