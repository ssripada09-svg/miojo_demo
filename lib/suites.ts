import {
  FileSearch,
  TrendingUp,
  MessageSquare,
  Network,
  Search,
  Rocket,
  Users,
  BarChart3,
  Target,
  ShieldCheck,
  Truck,
  Activity,
  BookOpen,
  LayoutDashboard,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface CrewConfig {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface SuiteConfig {
  id: string;
  name: string;
  description: string;
  audience: string;
  color: string;
  tailwindColor: string; // e.g. 'pharos-blue'
  crews: CrewConfig[];
}

export const suites: SuiteConfig[] = [
  {
    id: 'license-optimization',
    name: 'License Optimization',
    description: 'Enterprise tool governance, spend optimization, and compliance monitoring for federal IT portfolios.',
    audience: 'CACI / DHS',
    color: '#3B82F6',
    tailwindColor: 'pharos-blue',
    crews: [
      { slug: 'license-intelligence', name: 'License Intelligence', description: 'Tool inventory & compliance', icon: FileSearch },
      { slug: 'tool-optimization', name: 'Tool Optimization', description: 'Spend analysis & savings', icon: TrendingUp },
      { slug: 'operator-assistant', name: 'Operator Assistant', description: 'Natural language operations', icon: MessageSquare },
      { slug: 'integration-mapping', name: 'Integration Mapping', description: 'API connections & data flows', icon: Network },
    ],
  },
  {
    id: 'proposal-optimization',
    name: 'Proposal Optimization',
    description: 'AI-powered pipeline intelligence, proposal acceleration, and competitive analysis for federal business development.',
    audience: 'CACI',
    color: '#1FB6B8',
    tailwindColor: 'pharos-teal',
    crews: [
      { slug: 'opportunity-intelligence', name: 'Opportunity Intelligence', description: 'Federal BD pipeline monitoring', icon: Search },
      { slug: 'proposal-acceleration', name: 'Proposal Acceleration', description: 'AI-assisted proposal ops', icon: Rocket },
      { slug: 'headcount-justification', name: 'Headcount Justification', description: 'Labor category justification', icon: Users },
      { slug: 'contract-performance', name: 'Contract Performance', description: 'CPI / SPI / CPARS monitoring', icon: BarChart3 },
      { slug: 'competitive-intelligence', name: 'Competitive Intelligence', description: 'Competitor benchmarking', icon: Target },
    ],
  },
  {
    id: 'operational-excellence',
    name: 'Operational Excellence',
    description: 'Workforce management, contract delivery, and institutional knowledge activation for large-scale federal operations.',
    audience: 'CACI',
    color: '#E68A3F',
    tailwindColor: 'pharos-gold',
    crews: [
      { slug: 'talent-clearance', name: 'Talent & Clearance', description: 'Cleared workforce pipeline', icon: ShieldCheck },
      { slug: 'contract-delivery', name: 'Contract Delivery', description: 'OTD & follow-on readiness', icon: Truck },
      { slug: 'workforce-utilization', name: 'Workforce Utilization', description: 'Billable utilization & bench', icon: Activity },
      { slug: 'knowledge-activation', name: 'Knowledge Activation', description: 'Institutional knowledge retrieval', icon: BookOpen },
      { slug: 'executive-command', name: 'Executive Command', description: 'Unified executive dashboard', icon: LayoutDashboard },
    ],
  },
];

export function getSuiteForCrew(crewSlug: string): SuiteConfig | undefined {
  return suites.find(s => s.crews.some(c => c.slug === crewSlug));
}

export function getCrewConfig(crewSlug: string): CrewConfig | undefined {
  for (const suite of suites) {
    const crew = suite.crews.find(c => c.slug === crewSlug);
    if (crew) return crew;
  }
  return undefined;
}
