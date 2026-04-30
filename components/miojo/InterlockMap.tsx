'use client';

import React from 'react';

/**
 * Mi Ojo Interlock Map — the home-page signature object.
 *
 * Mirrors the deck's "Four ventures, one creative engine" diagram:
 * Mi Ojo at the center as the dark forest engine; the four ventures
 * arranged around it with deck-matched ring colors (clay for Peppers
 * & Beli and Beli's Pantry, sage for BeautyDays and Residences).
 * Six themes (Creative · Community · Wellness · Hospitality ·
 * Commerce · Culture) wrap the outer ring.
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
            <stop offset="0%" stopColor="var(--mj-sage)" stopOpacity="0.16" />
            <stop offset="60%" stopColor="var(--mj-sage)" stopOpacity="0.04" />
            <stop offset="100%" stopColor="var(--mj-sage)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="clayGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--mj-fire)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--mj-fire)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="peachGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--mj-peach)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--mj-peach)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient halos */}
        <ellipse cx="400" cy="300" rx="320" ry="240" fill="url(#centerGlow)" />
        <ellipse cx="220" cy="180" rx="180" ry="120" fill="url(#clayGlow)" />
        <ellipse cx="580" cy="420" rx="180" ry="120" fill="url(#peachGlow)" />

        {/* Theme rings */}
        <g stroke="var(--mj-hairline-sage)" strokeWidth="1" fill="none" opacity="0.7">
          <circle cx="400" cy="300" r="170" strokeDasharray="2 4" />
          <circle cx="400" cy="300" r="240" strokeDasharray="2 6" />
        </g>

        {/* Connectors from center to pillars */}
        <g stroke="var(--mj-sage)" strokeWidth="1" opacity="0.55" strokeDasharray="2 3">
          <line x1="400" y1="300" x2="200" y2="160" />
          <line x1="400" y1="300" x2="600" y2="160" />
          <line x1="400" y1="300" x2="200" y2="440" />
          <line x1="400" y1="300" x2="600" y2="440" />
        </g>

        {/* Theme labels */}
        <g
          fontFamily="var(--font-jetbrains-mono), monospace"
          fontSize="11"
          fontWeight="600"
          letterSpacing="2.4"
          fill="var(--mj-sage-deep)"
        >
          <text x="400" y="48" textAnchor="middle">CULTURE</text>
          <text x="400" y="568" textAnchor="middle">COMMERCE</text>
          <text x="48" y="304" textAnchor="middle">CREATIVE</text>
          <text x="752" y="304" textAnchor="middle">COMMUNITY</text>
          <text x="120" y="100" textAnchor="middle">HOSPITALITY</text>
          <text x="680" y="510" textAnchor="middle">WELLNESS</text>
        </g>

        {/* Center node — forest dark, the engine */}
        <g>
          <circle cx="400" cy="300" r="78" fill="var(--mj-forest)" />
          <circle cx="400" cy="300" r="78" fill="none" stroke="var(--mj-clay)" strokeOpacity="0.3" strokeWidth="1" />
          <text
            x="400"
            y="288"
            textAnchor="middle"
            fontFamily="var(--font-jetbrains-mono), monospace"
            fontSize="9"
            fontWeight="600"
            letterSpacing="2.4"
            fill="var(--mj-peach)"
          >
            THE ENGINE
          </text>
          <text
            x="400"
            y="316"
            textAnchor="middle"
            fontFamily="var(--font-inter), sans-serif"
            fontSize="20"
            fontWeight="700"
            letterSpacing="1"
            fill="#F2EBD8"
          >
            MI OJO
          </text>
          <text
            x="400"
            y="338"
            textAnchor="middle"
            fontFamily="var(--font-fraunces), serif"
            fontStyle="italic"
            fontSize="13"
            fill="var(--mj-peach)"
          >
            the eye
          </text>
        </g>

        {/* Pillar nodes — deck-matched ring colors */}
        {[
          {
            x: 200, y: 160, label: 'Peppers & Beli',
            sub: 'CORE · LAUNCHING',
            ringColor: 'var(--mj-clay)',
          },
          {
            x: 600, y: 160, label: 'BeautyDays',
            sub: 'AMPLIFIER · 2026',
            ringColor: 'var(--mj-sage)',
          },
          {
            x: 200, y: 440, label: "Beli’s Pantry",
            sub: 'RETAIL · 2026',
            ringColor: 'var(--mj-clay)',
          },
          {
            x: 600, y: 440, label: 'The Residences',
            sub: 'HOME · PHASE 4',
            ringColor: 'var(--mj-sage-deep)',
          },
        ].map((p) => (
          <g key={p.label}>
            <circle cx={p.x} cy={p.y} r="50" fill="var(--ph-bg-raised)" stroke={p.ringColor} strokeWidth="1.75" />
            <text
              x={p.x}
              y={p.y + 4}
              textAnchor="middle"
              fontFamily="var(--font-inter), sans-serif"
              fontSize="13"
              fontWeight="700"
              fill="var(--ph-ink)"
            >
              {p.label}
            </text>
            <text
              x={p.x}
              y={p.y + 22}
              textAnchor="middle"
              fontFamily="var(--font-jetbrains-mono), monospace"
              fontSize="9"
              fontWeight="600"
              letterSpacing="1.6"
              fill="var(--mj-sage-deep)"
            >
              {p.sub}
            </text>
          </g>
        ))}

        {/* Subtitle role labels along connectors (deck reference) */}
        <g
          fontFamily="var(--font-jetbrains-mono), monospace"
          fontSize="9"
          letterSpacing="1.6"
          fill="var(--ph-ink-muted)"
        >
          <text x="295" y="232" textAnchor="middle">CREATIVE DIRECTION</text>
          <text x="505" y="232" textAnchor="middle">PRODUCTION &amp; IP</text>
          <text x="295" y="378" textAnchor="middle">SUPPLY CHAIN</text>
          <text x="505" y="378" textAnchor="middle">HOSPITALITY</text>
        </g>
      </svg>
    </div>
  );
}
