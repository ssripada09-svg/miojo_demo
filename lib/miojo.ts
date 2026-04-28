import {
  Compass,
  Sparkles,
  Users,
  MapPin,
  Radar,
  Eye,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface CrewConfig {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  subtitle: string;
  mission: string;
  icon: LucideIcon;
  accent: 'teal' | 'gold' | 'ink';
}

export interface PillarConfig {
  id: string;
  name: string;
  oneLiner: string;
  role: string;
  maturity: 'Live' | 'Launching' | 'Early' | 'Concept';
  themes: string[];
  accent: string;
}

export const CREWS: CrewConfig[] = [
  {
    slug: 'founder-command',
    name: 'Founder Command',
    shortName: 'Command',
    description: 'Executive home for Ciarra',
    subtitle: 'Cross-pillar executive surface',
    mission: 'Cross-pillar executive intelligence — every morning brief, every priority decision, every relationship in one place.',
    icon: Compass,
    accent: 'teal',
  },
  {
    slug: 'mi-ojo-studio',
    name: 'Mi Ojo Studio',
    shortName: 'Studio',
    description: 'Brand & narrative co-strategist',
    subtitle: 'Creative & brand operating room',
    mission: 'AI co-strategist for brand creation, narrative, launch readiness, and retail strategy — the cashflow engine.',
    icon: Sparkles,
    accent: 'gold',
  },
  {
    slug: 'beauty-days-community',
    name: 'Beauty Days',
    shortName: 'Community',
    description: 'IRL-to-digital community OS',
    subtitle: 'Community & membership operating system',
    mission: 'Turns Beauty Days events into a recurring community, sponsor, and first-party data engine — the scaling wedge.',
    icon: Users,
    accent: 'teal',
  },
  {
    slug: 'experience-engine',
    name: 'Experience Engine',
    shortName: 'Experience',
    description: 'Hospitality & wellness ops',
    subtitle: 'Peppers & Bellies + Residences',
    mission: 'Operating layer for chef residencies, wellness stays, and editorial commerce — sensory expression of the brand world.',
    icon: MapPin,
    accent: 'gold',
  },
  {
    slug: 'trend-intelligence',
    name: 'Trend Intelligence',
    shortName: 'Intel',
    description: 'Foresight, opportunities, signal',
    subtitle: 'Trend, forecasting & opportunity radar',
    mission: 'Continuous radar across beauty, wellness, fashion, hospitality, and culture — Ciarra\u2019s foresight, amplified.',
    icon: Radar,
    accent: 'teal',
  },
];

export const TRUST_LAYER: { slug: string; name: string; description: string; icon: LucideIcon } = {
  slug: 'trust',
  name: 'Trust Layer',
  description: 'Human-in-the-loop & memory',
  icon: Eye,
};

export const PILLARS: PillarConfig[] = [
  {
    id: 'mi-ojo',
    name: 'Mi Ojo',
    oneLiner: 'The strategic eye \u2014 brand creation, advisory, narrative.',
    role: 'Cashflow engine and authority layer.',
    maturity: 'Live',
    themes: ['Creative', 'Commerce'],
    accent: 'var(--ph-gold-strong)',
  },
  {
    id: 'beauty-days',
    name: 'Beauty Days',
    oneLiner: 'Community-led beauty & wellness platform \u2014 IRL events into a year-round membership.',
    role: 'Audience and data wedge.',
    maturity: 'Launching',
    themes: ['Community', 'Wellness'],
    accent: 'var(--ph-teal)',
  },
  {
    id: 'peppers-bellies',
    name: 'Peppers & Bellies',
    oneLiner: 'Editorial hospitality \u2014 chef residencies, provisions, culinary storytelling.',
    role: 'Cultural & sensory expression.',
    maturity: 'Early',
    themes: ['Hospitality', 'Culture'],
    accent: 'var(--ph-teal-deep)',
  },
  {
    id: 'residences',
    name: 'Residences',
    oneLiner: 'Restored homes & wellness stays \u2014 the brand world made physical.',
    role: 'Long-duration asset and world-building anchor.',
    maturity: 'Concept',
    themes: ['Wellness', 'Hospitality'],
    accent: 'var(--ph-ink)',
  },
];

export function getCrew(slug: string): CrewConfig | undefined {
  return CREWS.find((c) => c.slug === slug);
}
