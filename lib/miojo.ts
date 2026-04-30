import {
  Compass,
  Sparkles,
  Users,
  MapPin,
  Radar,
  Eye,
  ConciergeBell,
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
  accent: 'sage' | 'clay' | 'forest' | 'peach';
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
    accent: 'forest',
  },
  {
    slug: 'mi-ojo-studio',
    name: 'Mi Ojo Studio',
    shortName: 'Studio',
    description: 'Brand & narrative co-strategist',
    subtitle: 'Creative & brand operating room',
    mission: 'AI co-strategist for brand creation, narrative, launch readiness, and retail strategy — the cashflow engine.',
    icon: Sparkles,
    accent: 'forest',
  },
  {
    slug: 'beauty-days-community',
    name: 'BeautyDays',
    shortName: 'Community',
    description: 'IRL-to-digital community OS',
    subtitle: 'Community & membership operating system',
    mission: 'Turns BeautyDays events into a recurring community, sponsor, and first-party data engine — the scaling wedge.',
    icon: Users,
    accent: 'sage',
  },
  {
    slug: 'experience-engine',
    name: 'Experience Engine',
    shortName: 'Experience',
    description: 'Hospitality & wellness ops',
    subtitle: 'Peppers & Beli + Residences',
    mission: 'Operating layer for the heritage restaurant, farm-to-table sourcing, chef residencies, and wellness stays — the sensory expression of the brand world.',
    icon: MapPin,
    accent: 'clay',
  },
  {
    slug: 'trend-intelligence',
    name: 'Trend Intelligence',
    shortName: 'Intel',
    description: 'Foresight, opportunities, signal',
    subtitle: 'Trend, forecasting & opportunity radar',
    mission: 'Continuous radar across beauty, wellness, fashion, hospitality, and culture — Ciarra’s foresight, amplified.',
    icon: Radar,
    accent: 'sage',
  },
  {
    slug: 'concierge-engine',
    name: 'Concierge Engine',
    shortName: 'Concierge',
    description: 'Memory & relationship layer',
    subtitle: 'Guest memory & relationship engine',
    mission: 'The relationship layer of Mi Ojo OS — guest memory, occasion detection, and AI-drafted invitations that human concierges refine. Where one booking compounds into repeat behavior, higher spend, and cross-pillar loyalty.',
    icon: ConciergeBell,
    accent: 'peach',
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
    oneLiner: 'Creative house & venture studio — brand strategy, cultural IP, equity stakes in the next wave of fashion & beauty.',
    role: 'The engine. Every brand inherits Fenty institutional rigor.',
    maturity: 'Live',
    themes: ['Creative', 'Commerce'],
    accent: 'var(--mj-forest)',
  },
  {
    id: 'peppers-beli',
    name: 'Peppers & Beli',
    oneLiner: 'Heritage restaurant, farm supply chain, and Beli’s Pantry CPG line — grandmother’s recipes meet Michelin craft.',
    role: 'The revenue core. Restaurant + CPG drive recurring cash.',
    maturity: 'Launching',
    themes: ['Hospitality', 'Culture'],
    accent: 'var(--mj-clay)',
  },
  {
    id: 'beauty-days',
    name: 'BeautyDays',
    oneLiner: 'Beauty & culture festival — 8,500 attendees, 125+ vendors, masterclasses and cultural programming.',
    role: 'The amplifier. Converts mass attention to portfolio distribution.',
    maturity: 'Launching',
    themes: ['Community', 'Wellness'],
    accent: 'var(--mj-sage)',
  },
  {
    id: 'residences',
    name: 'The Residences',
    oneLiner: 'Wellness-forward homes, private membership retreats, and owned real estate.',
    role: 'The home. Compounds the brand into real estate.',
    maturity: 'Concept',
    themes: ['Wellness', 'Hospitality'],
    accent: 'var(--mj-sage-deep)',
  },
];

export function getCrew(slug: string): CrewConfig | undefined {
  return CREWS.find((c) => c.slug === slug);
}
