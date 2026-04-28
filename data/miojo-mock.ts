/**
 * Miojo OS \u2014 mock data layer.
 *
 * Drawn from Ciarra Pardo / Miojo source materials (Phase 1 brief, Phase 2 PRD,
 * pitch decks). Numbers and names are illustrative for an investor demo.
 */

// ============================================================
// HOME / FOUNDER COMMAND
// ============================================================

export const HOME_KPIS = [
  { label: 'Investor Conversations', value: '14', sub: 'Active family-office tracks' },
  { label: 'Beauty Days Members', value: '11.4K', sub: 'Across 7 cities' },
  { label: 'Activations \u2014 Next 30d', value: '8', sub: 'Events, launches, residencies' },
  { label: 'Concepts In Pipeline', value: '12', sub: 'Brand & advisory workstreams' },
  { label: 'Decisions Flagged', value: '5', sub: 'Awaiting Ciarra\u2019s approval' },
];

export const FOUNDER_BRIEF = {
  date: 'Tuesday, April 28',
  topOpportunity: {
    headline: 'Cayman family office requesting deal memo by Thursday',
    detail:
      'A patient-capital LP archetype, prefers minority equity + royalty. Memory says they passed on Glossier in 2017 and have asked twice about Beauty Days economics.',
  },
  topRisk: {
    headline: 'Mexico City Beauty Day venue contract not countersigned',
    detail:
      'Sponsor activations depend on this. Studio crew flagged 9 days of slack remaining before sponsor outreach must move.',
  },
  topDecision: {
    headline: 'Approve Mi Ojo \u2014 Maison Vence narrative direction',
    detail:
      'Three positioning options on the table. Studio crew recommends Option B (\u201cthe ritual is the brand\u201d) based on member panel resonance scores.',
  },
  topCrossPillar: {
    headline: 'Beauty Days NYC sponsor could anchor a Peppers & Bellies pop-up',
    detail:
      'Eaux Sauvages signaled interest in extended cultural programming \u2014 worth a 30-min call before Friday.',
  },
};

export const RECENT_ACTIVITY = [
  {
    id: 1,
    crew: 'Trend Intelligence',
    title: 'Longevity \u00d7 beauty cluster crossed velocity threshold',
    detail: '14 signals in 9 days, +180% w/w. Three brands in our pipeline already operating in this space.',
    type: 'signal' as const,
    time: '38 min ago',
  },
  {
    id: 2,
    crew: 'Beauty Days',
    title: 'Mexico City RSVP pace +24% vs LA at same milestone',
    detail: '1,840 confirmed \u2192 412 pre-activated to year-round community.',
    type: 'success' as const,
    time: '2 hr ago',
  },
  {
    id: 3,
    crew: 'Mi Ojo Studio',
    title: 'Maison Vence \u2014 Sephora prestige window opens Q3',
    detail: 'Buyer relationship memory pulled. Recommended pitch frame attached.',
    type: 'recommend' as const,
    time: '4 hr ago',
  },
  {
    id: 4,
    crew: 'Experience Engine',
    title: 'Peppers & Bellies \u2014 chef residency calendar at 87% sell-through',
    detail: 'August fully booked. September wait-list 41 deep.',
    type: 'success' as const,
    time: '6 hr ago',
  },
  {
    id: 5,
    crew: 'Founder Command',
    title: 'Decision logged: pass on Strand Studios introduction',
    detail: 'Reasoning captured: brand portfolio overlap, taste mismatch.',
    type: 'info' as const,
    time: 'Yesterday',
  },
  {
    id: 6,
    crew: 'Trend Intelligence',
    title: 'Watchlist: Chef Aarón Serra opening Brooklyn residency',
    detail: 'Pattern match against Peppers & Bellies sourcing thesis. 92% fit score.',
    type: 'signal' as const,
    time: 'Yesterday',
  },
];

export const PROOF_STRIP = [
  {
    eyebrow: 'The Fenty Lesson',
    stat: '$570M',
    statSuffix: 'Year-1 revenue',
    body: 'Inclusive beauty wasn\u2019t a niche \u2014 it was the missing center. Ciarra co-founded and scaled Fenty Beauty to a $3B+ valuation; the same playbook now compounds across Miojo.',
  },
  {
    eyebrow: 'Founder Capacity',
    stat: '10\u00d7',
    statSuffix: 'Portfolio capacity',
    body: 'Manual ops cap a tastemaker at 2\u20133 brands. Miojo OS lifts that ceiling \u2014 24/7 trend coverage, institutional memory, and consistent execution let the founder focus on judgement.',
  },
  {
    eyebrow: 'The Bottleneck',
    stat: '24/7',
    statSuffix: 'Coverage, not theatre',
    body: 'Ciarra\u2019s time is the bottleneck. Miojo agents observe, recommend, and execute inside her policy \u2014 she approves; the system delivers. Human-in-the-loop, every step.',
  },
];

// ============================================================
// FOUNDER COMMAND
// ============================================================

export const COMMAND_KPIS = [
  { label: 'Pillar Health', value: '4 / 4', sub: 'All pillars operational' },
  { label: 'Pipeline Coverage', value: '$28.4M', sub: 'Royalty + equity tracks' },
  { label: 'Avg. Decision Time', value: '36 hr', sub: 'Down from 92 hr in Q1' },
  { label: 'Memory Captured', value: '1,284', sub: 'Decisions, partners, standards' },
];

export const COMMAND_TIMELINE = [
  { day: 'Apr 30', label: 'Cayman LP \u2014 deal memo due', kind: 'milestone', pillar: 'Founder' },
  { day: 'May 4', label: 'Maison Vence narrative review', kind: 'decision', pillar: 'Mi Ojo' },
  { day: 'May 10', label: 'Beauty Days \u2014 Mexico City', kind: 'activation', pillar: 'Beauty Days' },
  { day: 'May 18', label: 'Peppers & Bellies \u2014 Chef Aarón residency opens', kind: 'activation', pillar: 'Peppers & Bellies' },
  { day: 'May 22', label: 'LAFW collections review board', kind: 'milestone', pillar: 'Mi Ojo' },
  { day: 'Jun 6', label: 'Beauty Days \u2014 NYC', kind: 'activation', pillar: 'Beauty Days' },
  { day: 'Jun 14', label: 'Residencies \u2014 Marrakesh site walk', kind: 'milestone', pillar: 'Residences' },
  { day: 'Jun 27', label: 'Beauty Days \u2014 London', kind: 'activation', pillar: 'Beauty Days' },
  { day: 'Jul 9', label: 'Maison Vence \u2014 Sephora prestige window', kind: 'milestone', pillar: 'Mi Ojo' },
  { day: 'Jul 18', label: 'Beauty Days \u2014 Miami', kind: 'activation', pillar: 'Beauty Days' },
  { day: 'Aug 2', label: 'Pharos LP report', kind: 'decision', pillar: 'Founder' },
];

export const COMMAND_INVESTOR_TRACKS = [
  { partner: 'Banyan Family Office', archetype: 'Patient capital \u2022 Cayman', stage: 'Memo Requested', signal: 'High', last: 'Apr 26' },
  { partner: 'Maison Lévêque', archetype: 'Multi-gen LVMH-adjacent', stage: 'Term Discussion', signal: 'High', last: 'Apr 24' },
  { partner: 'Ridgewood Capital', archetype: 'Strategic CPG', stage: 'Diligence Q&A', signal: 'Medium', last: 'Apr 22' },
  { partner: 'Halcyon Group', archetype: 'Wellness-hospitality LP', stage: 'Intro Call', signal: 'Medium', last: 'Apr 21' },
  { partner: 'Sable & Co.', archetype: 'Consumer-IP family office', stage: 'Memo Requested', signal: 'High', last: 'Apr 19' },
  { partner: 'Levant Holdings', archetype: 'GCC family office', stage: 'Intro Call', signal: 'Low', last: 'Apr 16' },
  { partner: 'Pinecrest Partners', archetype: 'Operator LP', stage: 'Term Discussion', signal: 'Medium', last: 'Apr 14' },
];

export const COMMAND_DECISIONS = [
  { label: 'Approve Maison Vence narrative direction', owner: 'Mi Ojo Studio', due: 'Today', priority: 'High' },
  { label: 'Countersign Mexico City venue contract', owner: 'Experience Engine', due: 'In 2 days', priority: 'High' },
  { label: 'Greenlight LAFW \u00d7 Beauty Days NYC bridge', owner: 'Founder', due: 'In 3 days', priority: 'Medium' },
  { label: 'Confirm Banyan deal memo terms', owner: 'Founder', due: 'In 4 days', priority: 'High' },
  { label: 'Pass / advance: Strand Studios advisory ask', owner: 'Mi Ojo Studio', due: 'In 6 days', priority: 'Medium' },
];

export const COMMAND_PILLAR_HEALTH = [
  { pillar: 'Mi Ojo', revenue: 38, share: 38, status: 'Strong', note: 'Three advisory engagements compounding into next quarter.' },
  { pillar: 'Beauty Days', revenue: 26, share: 26, status: 'Accelerating', note: 'Sponsor pipeline 2.4\u00d7 vs Q1; member retention holding at 41%.' },
  { pillar: 'Peppers & Bellies', revenue: 22, share: 22, status: 'Building', note: 'Chef residency demand outpacing capacity; menu IP forming.' },
  { pillar: 'Residences', revenue: 14, share: 14, status: 'Concept', note: 'Marrakesh + Tulum site walks in flight; capital partner conversations open.' },
];

// ============================================================
// MI OJO STUDIO
// ============================================================

export const MIOJO_STUDIO_KPIS = [
  { label: 'Active Concepts', value: '12', sub: 'Across stages' },
  { label: 'Launch-Ready', value: '3', sub: 'In production phase' },
  { label: 'Retail Doors Targeted', value: '47', sub: 'Sephora / Ulta / Target / Nordstrom' },
  { label: 'Narrative Tests Run', value: '38', sub: 'Last 30 days' },
];

export const STUDIO_CONCEPTS = [
  { name: 'Maison Vence', stage: 'Production', category: 'Prestige fragrance', founder: 'Cécile Vence', readiness: 92, retail: 'Sephora prestige window Q3' },
  { name: 'Hue & Halo', stage: 'Narrative', category: 'Multi-gen color cosmetics', founder: 'Jordan Park', readiness: 64, retail: 'Ulta Q4 candidate' },
  { name: 'Casa Lirio', stage: 'Concept', category: 'Latina-led skincare', founder: 'Luz Mariné', readiness: 28, retail: 'Target Beauty pilot Q1' },
  { name: 'Solène by Solène', stage: 'Production', category: 'Founder-led perfume', founder: 'Solène Iro', readiness: 88, retail: 'Nordstrom indie window' },
  { name: 'Ren / Riot', stage: 'Narrative', category: 'Texture-first hair', founder: 'Aja N. Walker', readiness: 71, retail: 'Sephora textured hair set' },
  { name: 'Aurelya', stage: 'Concept', category: 'Longevity \u00d7 wellness', founder: 'Dr. Inès Auffray', readiness: 22, retail: 'D2C first \u2192 Ulta' },
  { name: 'Field & Bloom', stage: 'Concept', category: 'Pantry-inspired body care', founder: 'Mira Olu', readiness: 18, retail: 'Indie boutique pilot' },
  { name: 'Velvethold', stage: 'Production', category: 'Luxury hold tools', founder: 'Tomás Reig', readiness: 96, retail: 'Sephora Pro tools' },
  { name: 'Quanta Skin', stage: 'Narrative', category: 'Biotic skincare', founder: 'Dr. Yui Watanabe', readiness: 58, retail: 'Sephora prestige Q1' },
  { name: 'Saint Cay', stage: 'Concept', category: 'Coastal scent', founder: 'Marisol DC', readiness: 34, retail: 'Indie boutique \u2192 Nordstrom' },
  { name: 'Plume Atelier', stage: 'Narrative', category: 'Inclusive lash & brow', founder: 'Olu Bahar', readiness: 66, retail: 'Ulta Q3' },
  { name: 'Otra Cosa', stage: 'Production', category: 'Chef-led fragrance', founder: 'Aarón Serra', readiness: 84, retail: 'Hospitality \u2192 prestige' },
];

export const STUDIO_AUDIENCE_RESONANCE = [
  { axis: 'Inclusivity', a: 92, b: 78, c: 84 },
  { axis: 'Cultural Fluency', a: 88, b: 70, c: 76 },
  { axis: 'Founder Voice', a: 81, b: 90, c: 64 },
  { axis: 'Product Story', a: 76, b: 82, c: 88 },
  { axis: 'Price-to-Premium', a: 70, b: 74, c: 80 },
  { axis: 'Ritual Repeat', a: 84, b: 68, c: 78 },
];

export const STUDIO_NARRATIVE_OPTIONS = [
  {
    label: 'Option A',
    headline: 'A perfume for who you are becoming.',
    angle: 'Identity-forward, future-tense',
    score: 76,
    note: 'Resonates with younger prestige tier; risk of feeling generic in a saturated category.',
  },
  {
    label: 'Option B',
    headline: 'The ritual is the brand.',
    angle: 'Ritual-led, sensory-first',
    score: 88,
    note: 'Recommended. Highest resonance across LA, NYC, Mexico City panels; pairs with Peppers & Bellies storytelling.',
  },
  {
    label: 'Option C',
    headline: 'Maison Vence \u2014 a perfume for the in-between.',
    angle: 'Atmospheric, mood-led',
    score: 71,
    note: 'Editorial appeal but harder to translate into retail talking points.',
  },
];

export const STUDIO_LAUNCH_PIPELINE = [
  { stage: 'Concept', count: 4, share: 33 },
  { stage: 'Narrative', count: 4, share: 33 },
  { stage: 'Production', count: 4, share: 33 },
  { stage: 'Launch-Ready', count: 3, share: 25 },
];

export const STUDIO_RECOMMENDATIONS = [
  {
    title: 'Brief Maison Vence on Option B by Friday',
    detail: 'Recommended narrative cleared the resonance bar across 3 city panels. Kicks off retail prep for the Sephora prestige window in Q3.',
    impact: 'Unlocks $1.2M Y1 retail forecast',
  },
  {
    title: 'Schedule Aja Walker (Ren / Riot) with Ulta textured-hair buyer',
    detail: 'Buyer relationship memory: prefers founder-led pitch with sample-set walkthrough. Last meeting Mar 14, signaled spring window.',
    impact: 'Opens 12 doors in textured-hair set',
  },
  {
    title: 'Pause Field & Bloom until Q3 \u2014 narrative not differentiated yet',
    detail: 'Three of six positioning tests overlapped with Pantry / Apothecary peers. Studio recommends a re-brief with founder before continuing.',
    impact: 'Saves ~6 weeks of misallocated effort',
  },
];

// ============================================================
// BEAUTY DAYS COMMUNITY
// ============================================================

export const BEAUTY_DAYS_KPIS = [
  { label: 'Total Members', value: '11,420', sub: '+34% q/q' },
  { label: 'Cities Active', value: '7', sub: '3 more in 90d' },
  { label: '30-day Retention', value: '41%', sub: 'IRL \u2192 digital' },
  { label: 'Sponsor Re-engagement', value: '78%', sub: 'Returning post-event' },
];

export const BEAUTY_DAYS_FUNNEL = [
  { stage: 'RSVP', count: 14820, share: 100 },
  { stage: 'Attended', count: 9840, share: 66 },
  { stage: 'Activated (app)', count: 5210, share: 35 },
  { stage: '30-day Retained', count: 4080, share: 28 },
  { stage: '90-day Active', count: 2760, share: 19 },
];

export const BEAUTY_DAYS_CITIES = [
  { city: 'Los Angeles', members: 3100, growth: 22, density: 92, status: 'Anchor', nextEvent: 'Aug 24' },
  { city: 'New York', members: 2480, growth: 31, density: 88, status: 'Anchor', nextEvent: 'Jun 6' },
  { city: 'Miami', members: 1620, growth: 44, density: 76, status: 'Scaling', nextEvent: 'Jul 18' },
  { city: 'Mexico City', members: 1184, growth: 58, density: 82, status: 'Launching', nextEvent: 'May 10' },
  { city: 'London', members: 1080, growth: 26, density: 71, status: 'Scaling', nextEvent: 'Jun 27' },
  { city: 'Paris', members: 760, growth: 17, density: 64, status: 'Building', nextEvent: 'Sep 14' },
  { city: 'Lagos', members: 1196, growth: 71, density: 88, status: 'Launching', nextEvent: 'Aug 9' },
];

export const BEAUTY_DAYS_GROWTH = [
  { month: 'Oct', members: 2400 },
  { month: 'Nov', members: 3120 },
  { month: 'Dec', members: 4080 },
  { month: 'Jan', members: 5340 },
  { month: 'Feb', members: 6810 },
  { month: 'Mar', members: 8460 },
  { month: 'Apr', members: 11420 },
];

export const BEAUTY_DAYS_INTERESTS = [
  { cluster: 'Longevity & wellness', share: 22, note: 'Highest sponsor demand' },
  { cluster: 'Multi-gen beauty', share: 18, note: 'Cross-segment, low churn' },
  { cluster: 'Textured hair', share: 16, note: 'High activation \u2192 retention' },
  { cluster: 'Inclusive fragrance', share: 13, note: 'Driving Maison Vence demand' },
  { cluster: 'Clean / botanical skincare', share: 11, note: 'Strong in LA & MX-CDMX' },
  { cluster: 'Founder voice / cultural', share: 10, note: 'Highest re-RSVP rate' },
  { cluster: 'Wellness-hospitality', share: 7, note: 'Bridges Peppers & Bellies' },
  { cluster: 'Beauty technology', share: 3, note: 'Niche but high creator overlap' },
];

export const BEAUTY_DAYS_SPONSORS = [
  { brand: 'Eaux Sauvages', tier: 'Anchor', dwell: 9.2, optin: 64, reengage: 'Confirmed', note: 'Wants NYC + multi-city extension' },
  { brand: 'Kindred Co.', tier: 'Anchor', dwell: 7.8, optin: 58, reengage: 'Confirmed', note: 'Negotiating year-round digital integration' },
  { brand: 'Oroya Wellness', tier: 'Activation', dwell: 6.5, optin: 49, reengage: 'Likely', note: 'Strong Mexico City fit' },
  { brand: 'Fynix Skincare', tier: 'Activation', dwell: 5.9, optin: 42, reengage: 'Likely', note: 'Asking for sampling expansion' },
  { brand: 'Halo & Hush', tier: 'Discovery', dwell: 4.4, optin: 31, reengage: 'Pending', note: 'Better fit for London / Paris' },
  { brand: 'Plume Atelier', tier: 'Discovery', dwell: 6.1, optin: 47, reengage: 'Confirmed', note: 'Cross-promote with Mi Ojo concept' },
  { brand: 'Saint Cay', tier: 'Anchor', dwell: 8.1, optin: 55, reengage: 'Confirmed', note: 'Anchor in Miami; expanding to London' },
];

export const BEAUTY_DAYS_AMBASSADORS = [
  { name: 'Sasha Devereaux', city: 'New York', followers: 412000, lastActive: 'Today', vibe: 'Multi-gen beauty' },
  { name: 'Camila R\u00edos', city: 'Mexico City', followers: 318000, lastActive: 'Today', vibe: 'Cultural fluency' },
  { name: 'Olu Bahar', city: 'Lagos', followers: 268000, lastActive: 'Yesterday', vibe: 'Texture & color' },
  { name: 'Ines Tavares', city: 'Lisbon', followers: 188000, lastActive: '2 days', vibe: 'Wellness-led' },
  { name: 'Marcus J. Lin', city: 'Los Angeles', followers: 224000, lastActive: 'Today', vibe: 'Founder POV' },
  { name: 'Ruth Adetola', city: 'London', followers: 162000, lastActive: '3 days', vibe: 'Editorial fragrance' },
  { name: 'Sienna Park', city: 'Paris', followers: 144000, lastActive: 'Yesterday', vibe: 'Clean & botanical' },
];

export const BEAUTY_DAYS_RECOMMENDATIONS = [
  {
    title: 'Bridge Eaux Sauvages into Peppers & Bellies NYC pop-up',
    detail: 'Sponsor signaled extended cultural programming intent. Cross-pillar deal could unlock six-figure incremental sponsorship + chef collab content.',
    impact: 'Cross-pillar spend expansion',
  },
  {
    title: 'Activate Lagos ambassadors 21 days before Aug event',
    detail: '+58% growth at lower density than NYC at same maturity \u2014 ambassador-led waves consistently lift retention by ~9 pts.',
    impact: '+9 pt retention forecast',
  },
  {
    title: 'Start year-round community app onboarding for Mexico City',
    detail: 'RSVP pace +24% vs LA at same milestone. Activate digital before event to capture peak intent.',
    impact: '~620 incremental activated members',
  },
];

// ============================================================
// EXPERIENCE ENGINE (Peppers & Bellies + Residences)
// ============================================================

export const EXPERIENCE_KPIS = [
  { label: 'Residency Slots Booked', value: '11 / 12', sub: 'Through August' },
  { label: 'Avg. Sell-through', value: '87%', sub: '6-week pace' },
  { label: 'Repeat Guest Rate', value: '34%', sub: 'Up from 22% in Q1' },
  { label: 'Referral Rate', value: '41%', sub: 'Member-to-guest' },
];

export const EXPERIENCE_RESIDENCIES = [
  { id: 'RES-01', name: 'Chef Aar\u00f3n Serra \u00d7 Brooklyn', kind: 'Chef Residency', start: 'May 18', end: 'Jun 22', booked: 100, package: 'Editorial dining' },
  { id: 'RES-02', name: 'Casa Lirio Wellness Stay', kind: 'Wellness Stay', start: 'Jun 4', end: 'Jun 14', booked: 92, package: 'Botanical retreat' },
  { id: 'RES-03', name: 'Marrakesh Long Weekend', kind: 'Residency', start: 'Jun 14', end: 'Jun 17', booked: 88, package: 'Founders\u2019 retreat' },
  { id: 'RES-04', name: 'Otra Cosa Tasting Series', kind: 'Editorial Series', start: 'Jul 1', end: 'Jul 8', booked: 96, package: 'Provisions \u00d7 fragrance' },
  { id: 'RES-05', name: 'Saint Cay Coastal Stay', kind: 'Wellness Stay', start: 'Jul 11', end: 'Jul 21', booked: 81, package: 'Coastal ritual' },
  { id: 'RES-06', name: 'Tulum Restored Home', kind: 'Residency', start: 'Aug 2', end: 'Aug 12', booked: 79, package: 'Architectural retreat' },
  { id: 'RES-07', name: 'Velvethold Salon Days', kind: 'Editorial Series', start: 'Aug 14', end: 'Aug 18', booked: 100, package: 'Tools & textures' },
  { id: 'RES-08', name: 'Field & Bloom Pantry Lab', kind: 'Chef Residency', start: 'Aug 22', end: 'Aug 30', booked: 74, package: 'Pantry \u2192 body' },
  { id: 'RES-09', name: 'London Founders\u2019 Suite', kind: 'Residency', start: 'Sep 4', end: 'Sep 11', booked: 64, package: 'Founder retreat' },
  { id: 'RES-10', name: 'Aurelya Longevity Clinic', kind: 'Wellness Stay', start: 'Sep 14', end: 'Sep 21', booked: 88, package: 'Longevity \u00d7 hospitality' },
  { id: 'RES-11', name: 'Otra Cosa \u00d7 Mi Ojo Pop-up', kind: 'Editorial Series', start: 'Sep 26', end: 'Oct 2', booked: 92, package: 'Cross-pillar pop-up' },
  { id: 'RES-12', name: 'Marrakesh Re-open', kind: 'Residency', start: 'Oct 18', end: 'Oct 28', booked: 56, package: 'Architectural retreat' },
];

export const EXPERIENCE_PACKAGE_MIX = [
  { package: 'Editorial dining', share: 28, growth: 18 },
  { package: 'Wellness stay', share: 24, growth: 32 },
  { package: 'Founders\u2019 retreat', share: 18, growth: 9 },
  { package: 'Coastal ritual', share: 12, growth: 14 },
  { package: 'Architectural retreat', share: 10, growth: 21 },
  { package: 'Cross-pillar pop-up', share: 8, growth: 41 },
];

export const EXPERIENCE_BOOKING_PACE = [
  { week: 'W-12', mexico: 12, brooklyn: 8, marrakesh: 4, tulum: 6 },
  { week: 'W-10', mexico: 28, brooklyn: 22, marrakesh: 12, tulum: 14 },
  { week: 'W-8', mexico: 41, brooklyn: 38, marrakesh: 24, tulum: 26 },
  { week: 'W-6', mexico: 62, brooklyn: 58, marrakesh: 41, tulum: 38 },
  { week: 'W-4', mexico: 78, brooklyn: 72, marrakesh: 58, tulum: 54 },
  { week: 'W-2', mexico: 92, brooklyn: 88, marrakesh: 74, tulum: 68 },
  { week: 'W-0', mexico: 100, brooklyn: 100, marrakesh: 88, tulum: 79 },
];

export const EXPERIENCE_GUEST_SEGMENTS = [
  { segment: 'Founders & operators', share: 31 },
  { segment: 'Beauty Days members', share: 24 },
  { segment: 'Editorial / press', share: 14 },
  { segment: 'Family-office principals', share: 12 },
  { segment: 'Creators & ambassadors', share: 11 },
  { segment: 'First-time guests', share: 8 },
];

export const EXPERIENCE_RECOMMENDATIONS = [
  {
    title: 'Open September wait-list to Beauty Days NYC members',
    detail: 'Highest cross-pillar conversion has historically come from Beauty Days members. Pre-release before public list keeps retention loop intact.',
    impact: '~190 incremental bookings forecast',
  },
  {
    title: 'Pair Otra Cosa pop-up with Maison Vence narrative drop',
    detail: 'Chef-led fragrance crossover. Editorial cadence aligns with Sephora prestige window.',
    impact: 'Multi-pillar story for press window',
  },
  {
    title: 'Shift Field & Bloom to Q4 \u2014 demand softer than peers',
    detail: '74% sell-through vs 88% peer average. Reframe as Pantry Lab editorial instead of full residency.',
    impact: 'Protect editorial cadence',
  },
];

// ============================================================
// TREND INTELLIGENCE
// ============================================================

export const TREND_KPIS = [
  { label: 'Active Trend Clusters', value: '9', sub: 'Across 6 verticals' },
  { label: 'Signal Velocity \u2191', value: '+34%', sub: 'Week over week' },
  { label: 'Opportunities Tracked', value: '46', sub: 'Brands / creators / chefs' },
  { label: 'Concept Forecasts Run', value: '14', sub: 'Last 14 days' },
];

export const TREND_CLUSTERS = [
  { name: 'Longevity \u00d7 beauty', velocity: 92, confidence: 88, fit: 95, vertical: 'Beauty' },
  { name: 'Multi-gen color cosmetics', velocity: 71, confidence: 82, fit: 90, vertical: 'Beauty' },
  { name: 'Chef-led fragrance', velocity: 64, confidence: 74, fit: 92, vertical: 'Beauty / Hospitality' },
  { name: 'Restored-home hospitality', velocity: 52, confidence: 70, fit: 88, vertical: 'Hospitality' },
  { name: 'Texture-first hair', velocity: 78, confidence: 84, fit: 89, vertical: 'Beauty' },
  { name: 'Editorial provisions / pantry', velocity: 46, confidence: 64, fit: 80, vertical: 'Hospitality' },
  { name: 'Inclusive fragrance', velocity: 68, confidence: 78, fit: 86, vertical: 'Beauty' },
  { name: 'Cultural foresight collectives', velocity: 42, confidence: 60, fit: 76, vertical: 'Culture' },
  { name: 'Founder-led wellness clinics', velocity: 58, confidence: 72, fit: 84, vertical: 'Wellness' },
];

export const TREND_VELOCITY_SERIES = [
  { week: 'W-7', longevity: 22, chef: 14, texture: 32, hospitality: 18 },
  { week: 'W-6', longevity: 31, chef: 18, texture: 38, hospitality: 22 },
  { week: 'W-5', longevity: 44, chef: 22, texture: 46, hospitality: 24 },
  { week: 'W-4', longevity: 58, chef: 28, texture: 54, hospitality: 30 },
  { week: 'W-3', longevity: 70, chef: 38, texture: 60, hospitality: 36 },
  { week: 'W-2', longevity: 81, chef: 48, texture: 68, hospitality: 44 },
  { week: 'W-1', longevity: 92, chef: 64, texture: 78, hospitality: 52 },
];

export const TREND_OPPORTUNITIES = [
  { name: 'Chef Aar\u00f3n Serra', kind: 'Chef', match: 92, vertical: 'Hospitality / Beauty', signal: 'Brooklyn residency opening; sourcing thesis fit' },
  { name: 'Dr. In\u00e8s Auffray', kind: 'Founder', match: 88, vertical: 'Longevity', signal: 'Aurelya concept enters pre-clinical; advisory ask' },
  { name: 'Sephora Prestige Window Q3', kind: 'Retailer', match: 86, vertical: 'Beauty', signal: 'Two Mi Ojo concepts ready for slot' },
  { name: 'Olu Bahar', kind: 'Creator', match: 84, vertical: 'Beauty', signal: 'Founder-led texture-first audience; Lagos anchor' },
  { name: 'Halcyon Group', kind: 'Capital', match: 82, vertical: 'Wellness-hospitality', signal: 'LP fit with Residences thesis' },
  { name: 'Ulta Textured-Hair Set', kind: 'Retailer', match: 80, vertical: 'Beauty', signal: 'Buyer relationship memory \u2014 active spring window' },
  { name: 'Eaux Sauvages', kind: 'Brand', match: 78, vertical: 'Beauty / Hospitality', signal: 'Cross-pillar sponsor expansion intent' },
  { name: 'Marrakesh restored home (private)', kind: 'Property', match: 76, vertical: 'Hospitality', signal: 'Ownership window opens June; site walk scheduled' },
  { name: 'Tomás Reig (Velvethold)', kind: 'Founder', match: 74, vertical: 'Beauty', signal: 'Production-ready; Sephora Pro tools fit' },
  { name: 'ComplexCon culture programming', kind: 'Cultural', match: 72, vertical: 'Culture', signal: 'Programming overlap with Beauty Days NYC' },
  { name: 'La Maison des Startups', kind: 'Capital / Network', match: 70, vertical: 'Beauty', signal: 'Studio partner intro \u2014 LVMH-adjacent' },
  { name: 'Pattern (Tracee Ellis Ross) network', kind: 'Network', match: 68, vertical: 'Beauty', signal: 'Texture-first benchmark; Ulta playbook' },
];

export const TREND_CONCEPT_FORECASTS = [
  { concept: 'Aurelya', velocity: 78, confidence: 82, fit: 90, recommendation: 'Greenlight advisory engagement' },
  { concept: 'Otra Cosa', velocity: 72, confidence: 80, fit: 88, recommendation: 'Bridge to Maison Vence editorial' },
  { concept: 'Casa Lirio', velocity: 64, confidence: 70, fit: 84, recommendation: 'Refine narrative before retail outreach' },
  { concept: 'Plume Atelier', velocity: 60, confidence: 74, fit: 80, recommendation: 'Position for Ulta Q3 window' },
  { concept: 'Quanta Skin', velocity: 58, confidence: 72, fit: 76, recommendation: 'Hold; biotic narrative not differentiated' },
  { concept: 'Saint Cay', velocity: 54, confidence: 66, fit: 78, recommendation: 'Pair with coastal residency programming' },
];

export const TREND_RECOMMENDATIONS = [
  {
    title: 'Move Aurelya from concept to advisory engagement',
    detail: 'Longevity \u00d7 beauty cluster crossed velocity threshold. Founder Auffray\u2019s pre-clinical positioning is rare; first-mover slot is open for ~10 weeks.',
    impact: 'Locks white-space anchor for Miojo',
  },
  {
    title: 'Schedule Marrakesh site walk before June 14',
    detail: 'Restored-home hospitality velocity climbing fast. Property owner closing by Q3; this is the only fit-for-thesis listing in market.',
    impact: 'Protects Residences pillar timeline',
  },
  {
    title: 'Open intro track with La Maison des Startups',
    detail: 'LVMH-adjacent network signal compounding. Match with Studio crew on shared concepts (Maison Vence, Otra Cosa).',
    impact: 'Strategic studio partnership pathway',
  },
];
