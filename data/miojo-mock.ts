/**
 * Mi Ojo OS — mock data layer.
 *
 * Drawn from Ciarra Pardo / Mi Ojo source materials (Phase 1 brief, Phase 2 PRD,
 * pitch decks). Numbers and names are illustrative for an investor demo.
 */

// ============================================================
// HOME / FOUNDER COMMAND
// ============================================================

export const HOME_KPIS = [
  { label: 'Investor Conversations', value: '14', sub: 'Active family-office tracks' },
  { label: 'BeautyDays Members', value: '11.4K', sub: 'Across 7 cities' },
  { label: 'Activations — Next 30d', value: '8', sub: 'Events, launches, residencies' },
  { label: 'Concepts In Pipeline', value: '12', sub: 'Brand & advisory workstreams' },
  { label: 'Decisions Flagged', value: '5', sub: 'Awaiting Ciarra’s approval' },
];

export const FOUNDER_BRIEF = {
  date: 'Tuesday, April 28',
  topOpportunity: {
    headline: 'Cayman family office requesting deal memo by Thursday',
    detail:
      'A patient-capital LP archetype, prefers minority equity + royalty. Memory says they passed on Glossier in 2017 and have asked twice about BeautyDays economics.',
  },
  topRisk: {
    headline: 'Mexico City Beauty Day venue contract not countersigned',
    detail:
      'Sponsor activations depend on this. Studio crew flagged 9 days of slack remaining before sponsor outreach must move.',
  },
  topDecision: {
    headline: 'Approve Mi Ojo — Maison Vence narrative direction',
    detail:
      'Three positioning options on the table. Studio crew recommends Option B (“the ritual is the brand”) based on member panel resonance scores.',
  },
  topCrossPillar: {
    headline: 'BeautyDays NYC sponsor could anchor a Peppers & Beli pop-up',
    detail:
      'Eaux Sauvages signaled interest in extended cultural programming — worth a 30-min call before Friday.',
  },
};

export const RECENT_ACTIVITY = [
  {
    id: 1,
    crew: 'Trend Intelligence',
    title: 'Longevity × beauty cluster crossed velocity threshold',
    detail: '14 signals in 9 days, +180% w/w. Three brands in our pipeline already operating in this space.',
    type: 'signal' as const,
    time: '38 min ago',
  },
  {
    id: 2,
    crew: 'BeautyDays',
    title: 'Mexico City RSVP pace +24% vs LA at same milestone',
    detail: '1,840 confirmed → 412 pre-activated to year-round community.',
    type: 'success' as const,
    time: '2 hr ago',
  },
  {
    id: 3,
    crew: 'Mi Ojo Studio',
    title: 'Maison Vence — Sephora prestige window opens Q3',
    detail: 'Buyer relationship memory pulled. Recommended pitch frame attached.',
    type: 'recommend' as const,
    time: '4 hr ago',
  },
  {
    id: 4,
    crew: 'Experience Engine',
    title: 'Peppers & Beli — chef residency calendar at 87% sell-through',
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
    detail: 'Pattern match against Peppers & Beli sourcing thesis. 92% fit score.',
    type: 'signal' as const,
    time: 'Yesterday',
  },
];

export const PROOF_STRIP = [
  {
    eyebrow: 'The Fenty Lesson',
    stat: '$570M',
    statSuffix: 'Year-1 revenue',
    body: 'Inclusive beauty wasn’t a niche — it was the missing center. Ciarra co-founded and scaled Fenty Beauty to a $3B+ valuation; the same playbook now compounds across Mi Ojo.',
  },
  {
    eyebrow: 'Founder Capacity',
    stat: '10×',
    statSuffix: 'Portfolio capacity',
    body: 'Manual ops cap a tastemaker at 2–3 brands. Mi Ojo OS lifts that ceiling — 24/7 trend coverage, institutional memory, and consistent execution let the founder focus on judgement.',
  },
  {
    eyebrow: 'The Bottleneck',
    stat: '24/7',
    statSuffix: 'Coverage, not theatre',
    body: 'Ciarra’s time is the bottleneck. Mi Ojo agents observe, recommend, and execute inside her policy — she approves; the system delivers. Human-in-the-loop, every step.',
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
  { day: 'Apr 30', label: 'Cayman LP — deal memo due', kind: 'milestone', pillar: 'Founder' },
  { day: 'May 4', label: 'Maison Vence narrative review', kind: 'decision', pillar: 'Mi Ojo' },
  { day: 'May 10', label: 'BeautyDays — Mexico City', kind: 'activation', pillar: 'BeautyDays' },
  { day: 'May 18', label: 'Peppers & Beli — Chef Aarón residency opens', kind: 'activation', pillar: 'Peppers & Beli' },
  { day: 'May 22', label: 'LAFW collections review board', kind: 'milestone', pillar: 'Mi Ojo' },
  { day: 'Jun 6', label: 'BeautyDays — NYC', kind: 'activation', pillar: 'BeautyDays' },
  { day: 'Jun 14', label: 'Residencies — Marrakesh site walk', kind: 'milestone', pillar: 'Residences' },
  { day: 'Jun 27', label: 'BeautyDays — London', kind: 'activation', pillar: 'BeautyDays' },
  { day: 'Jul 9', label: 'Maison Vence — Sephora prestige window', kind: 'milestone', pillar: 'Mi Ojo' },
  { day: 'Jul 18', label: 'BeautyDays — Miami', kind: 'activation', pillar: 'BeautyDays' },
  { day: 'Aug 2', label: 'Pharos LP report', kind: 'decision', pillar: 'Founder' },
];

export const COMMAND_INVESTOR_TRACKS = [
  { partner: 'Banyan Family Office', archetype: 'Patient capital • Cayman', stage: 'Memo Requested', signal: 'High', last: 'Apr 26' },
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
  { label: 'Greenlight LAFW × BeautyDays NYC bridge', owner: 'Founder', due: 'In 3 days', priority: 'Medium' },
  { label: 'Confirm Banyan deal memo terms', owner: 'Founder', due: 'In 4 days', priority: 'High' },
  { label: 'Pass / advance: Strand Studios advisory ask', owner: 'Mi Ojo Studio', due: 'In 6 days', priority: 'Medium' },
];

export const COMMAND_PILLAR_HEALTH = [
  { pillar: 'Mi Ojo', revenue: 38, share: 38, status: 'Strong', note: 'Three advisory engagements compounding into next quarter.' },
  { pillar: 'BeautyDays', revenue: 26, share: 26, status: 'Accelerating', note: 'Sponsor pipeline 2.4× vs Q1; member retention holding at 41%.' },
  { pillar: 'Peppers & Beli', revenue: 22, share: 22, status: 'Building', note: 'Chef residency demand outpacing capacity; menu IP forming.' },
  { pillar: 'Residences', revenue: 14, share: 14, status: 'Concept', note: 'Marrakesh + Tulum site walks in flight; capital partner conversations open.' },
];

// ============================================================
// MI OJO STUDIO
// ============================================================

export const MI_OJO_STUDIO_KPIS = [
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
  { name: 'Aurelya', stage: 'Concept', category: 'Longevity × wellness', founder: 'Dr. Inès Auffray', readiness: 22, retail: 'D2C first → Ulta' },
  { name: 'Field & Bloom', stage: 'Concept', category: 'Pantry-inspired body care', founder: 'Mira Olu', readiness: 18, retail: 'Indie boutique pilot' },
  { name: 'Velvethold', stage: 'Production', category: 'Luxury hold tools', founder: 'Tomás Reig', readiness: 96, retail: 'Sephora Pro tools' },
  { name: 'Quanta Skin', stage: 'Narrative', category: 'Biotic skincare', founder: 'Dr. Yui Watanabe', readiness: 58, retail: 'Sephora prestige Q1' },
  { name: 'Saint Cay', stage: 'Concept', category: 'Coastal scent', founder: 'Marisol DC', readiness: 34, retail: 'Indie boutique → Nordstrom' },
  { name: 'Plume Atelier', stage: 'Narrative', category: 'Inclusive lash & brow', founder: 'Olu Bahar', readiness: 66, retail: 'Ulta Q3' },
  { name: 'Otra Cosa', stage: 'Production', category: 'Chef-led fragrance', founder: 'Aarón Serra', readiness: 84, retail: 'Hospitality → prestige' },
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
    note: 'Recommended. Highest resonance across LA, NYC, Mexico City panels; pairs with Peppers & Beli storytelling.',
  },
  {
    label: 'Option C',
    headline: 'Maison Vence — a perfume for the in-between.',
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
    title: 'Pause Field & Bloom until Q3 — narrative not differentiated yet',
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
  { label: '30-day Retention', value: '41%', sub: 'IRL → digital' },
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
  { cluster: 'Textured hair', share: 16, note: 'High activation → retention' },
  { cluster: 'Inclusive fragrance', share: 13, note: 'Driving Maison Vence demand' },
  { cluster: 'Clean / botanical skincare', share: 11, note: 'Strong in LA & MX-CDMX' },
  { cluster: 'Founder voice / cultural', share: 10, note: 'Highest re-RSVP rate' },
  { cluster: 'Wellness-hospitality', share: 7, note: 'Bridges Peppers & Beli' },
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
  { name: 'Camila Ríos', city: 'Mexico City', followers: 318000, lastActive: 'Today', vibe: 'Cultural fluency' },
  { name: 'Olu Bahar', city: 'Lagos', followers: 268000, lastActive: 'Yesterday', vibe: 'Texture & color' },
  { name: 'Ines Tavares', city: 'Lisbon', followers: 188000, lastActive: '2 days', vibe: 'Wellness-led' },
  { name: 'Marcus J. Lin', city: 'Los Angeles', followers: 224000, lastActive: 'Today', vibe: 'Founder POV' },
  { name: 'Ruth Adetola', city: 'London', followers: 162000, lastActive: '3 days', vibe: 'Editorial fragrance' },
  { name: 'Sienna Park', city: 'Paris', followers: 144000, lastActive: 'Yesterday', vibe: 'Clean & botanical' },
];

export const BEAUTY_DAYS_RECOMMENDATIONS = [
  {
    title: 'Bridge Eaux Sauvages into Peppers & Beli NYC pop-up',
    detail: 'Sponsor signaled extended cultural programming intent. Cross-pillar deal could unlock six-figure incremental sponsorship + chef collab content.',
    impact: 'Cross-pillar spend expansion',
  },
  {
    title: 'Activate Lagos ambassadors 21 days before Aug event',
    detail: '+58% growth at lower density than NYC at same maturity — ambassador-led waves consistently lift retention by ~9 pts.',
    impact: '+9 pt retention forecast',
  },
  {
    title: 'Start year-round community app onboarding for Mexico City',
    detail: 'RSVP pace +24% vs LA at same milestone. Activate digital before event to capture peak intent.',
    impact: '~620 incremental activated members',
  },
];

// ============================================================
// EXPERIENCE ENGINE (Peppers & Beli + Residences)
// ============================================================

export const EXPERIENCE_KPIS = [
  { label: 'Residency Slots Booked', value: '11 / 12', sub: 'Through August' },
  { label: 'Avg. Sell-through', value: '87%', sub: '6-week pace' },
  { label: 'Repeat Guest Rate', value: '34%', sub: 'Up from 22% in Q1' },
  { label: 'Referral Rate', value: '41%', sub: 'Member-to-guest' },
];

export const EXPERIENCE_RESIDENCIES = [
  { id: 'RES-01', name: 'Chef Aarón Serra × Brooklyn', kind: 'Chef Residency', start: 'May 18', end: 'Jun 22', booked: 100, package: 'Editorial dining' },
  { id: 'RES-02', name: 'Casa Lirio Wellness Stay', kind: 'Wellness Stay', start: 'Jun 4', end: 'Jun 14', booked: 92, package: 'Botanical retreat' },
  { id: 'RES-03', name: 'Marrakesh Long Weekend', kind: 'Residency', start: 'Jun 14', end: 'Jun 17', booked: 88, package: 'Founders’ retreat' },
  { id: 'RES-04', name: 'Otra Cosa Tasting Series', kind: 'Editorial Series', start: 'Jul 1', end: 'Jul 8', booked: 96, package: 'Provisions × fragrance' },
  { id: 'RES-05', name: 'Saint Cay Coastal Stay', kind: 'Wellness Stay', start: 'Jul 11', end: 'Jul 21', booked: 81, package: 'Coastal ritual' },
  { id: 'RES-06', name: 'Tulum Restored Home', kind: 'Residency', start: 'Aug 2', end: 'Aug 12', booked: 79, package: 'Architectural retreat' },
  { id: 'RES-07', name: 'Velvethold Salon Days', kind: 'Editorial Series', start: 'Aug 14', end: 'Aug 18', booked: 100, package: 'Tools & textures' },
  { id: 'RES-08', name: 'Field & Bloom Pantry Lab', kind: 'Chef Residency', start: 'Aug 22', end: 'Aug 30', booked: 74, package: 'Pantry → body' },
  { id: 'RES-09', name: 'London Founders’ Suite', kind: 'Residency', start: 'Sep 4', end: 'Sep 11', booked: 64, package: 'Founder retreat' },
  { id: 'RES-10', name: 'Aurelya Longevity Clinic', kind: 'Wellness Stay', start: 'Sep 14', end: 'Sep 21', booked: 88, package: 'Longevity × hospitality' },
  { id: 'RES-11', name: 'Otra Cosa × Mi Ojo Pop-up', kind: 'Editorial Series', start: 'Sep 26', end: 'Oct 2', booked: 92, package: 'Cross-pillar pop-up' },
  { id: 'RES-12', name: 'Marrakesh Re-open', kind: 'Residency', start: 'Oct 18', end: 'Oct 28', booked: 56, package: 'Architectural retreat' },
];

export const EXPERIENCE_PACKAGE_MIX = [
  { package: 'Editorial dining', share: 28, growth: 18 },
  { package: 'Wellness stay', share: 24, growth: 32 },
  { package: 'Founders’ retreat', share: 18, growth: 9 },
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
  { segment: 'BeautyDays members', share: 24 },
  { segment: 'Editorial / press', share: 14 },
  { segment: 'Family-office principals', share: 12 },
  { segment: 'Creators & ambassadors', share: 11 },
  { segment: 'First-time guests', share: 8 },
];

export const EXPERIENCE_RECOMMENDATIONS = [
  {
    title: 'Open September wait-list to BeautyDays NYC members',
    detail: 'Highest cross-pillar conversion has historically come from BeautyDays members. Pre-release before public list keeps retention loop intact.',
    impact: '~190 incremental bookings forecast',
  },
  {
    title: 'Pair Otra Cosa pop-up with Maison Vence narrative drop',
    detail: 'Chef-led fragrance crossover. Editorial cadence aligns with Sephora prestige window.',
    impact: 'Multi-pillar story for press window',
  },
  {
    title: 'Shift Field & Bloom to Q4 — demand softer than peers',
    detail: '74% sell-through vs 88% peer average. Reframe as Pantry Lab editorial instead of full residency.',
    impact: 'Protect editorial cadence',
  },
];

// ============================================================
// TREND INTELLIGENCE
// ============================================================

export const TREND_KPIS = [
  { label: 'Active Trend Clusters', value: '9', sub: 'Across 6 verticals' },
  { label: 'Signal Velocity ↑', value: '+34%', sub: 'Week over week' },
  { label: 'Opportunities Tracked', value: '46', sub: 'Brands / creators / chefs' },
  { label: 'Concept Forecasts Run', value: '14', sub: 'Last 14 days' },
];

export const TREND_CLUSTERS = [
  { name: 'Longevity × beauty', velocity: 92, confidence: 88, fit: 95, vertical: 'Beauty' },
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
  { name: 'Chef Aarón Serra', kind: 'Chef', match: 92, vertical: 'Hospitality / Beauty', signal: 'Brooklyn residency opening; sourcing thesis fit' },
  { name: 'Dr. Inès Auffray', kind: 'Founder', match: 88, vertical: 'Longevity', signal: 'Aurelya concept enters pre-clinical; advisory ask' },
  { name: 'Sephora Prestige Window Q3', kind: 'Retailer', match: 86, vertical: 'Beauty', signal: 'Two Mi Ojo concepts ready for slot' },
  { name: 'Olu Bahar', kind: 'Creator', match: 84, vertical: 'Beauty', signal: 'Founder-led texture-first audience; Lagos anchor' },
  { name: 'Halcyon Group', kind: 'Capital', match: 82, vertical: 'Wellness-hospitality', signal: 'LP fit with Residences thesis' },
  { name: 'Ulta Textured-Hair Set', kind: 'Retailer', match: 80, vertical: 'Beauty', signal: 'Buyer relationship memory — active spring window' },
  { name: 'Eaux Sauvages', kind: 'Brand', match: 78, vertical: 'Beauty / Hospitality', signal: 'Cross-pillar sponsor expansion intent' },
  { name: 'Marrakesh restored home (private)', kind: 'Property', match: 76, vertical: 'Hospitality', signal: 'Ownership window opens June; site walk scheduled' },
  { name: 'Tomás Reig (Velvethold)', kind: 'Founder', match: 74, vertical: 'Beauty', signal: 'Production-ready; Sephora Pro tools fit' },
  { name: 'ComplexCon culture programming', kind: 'Cultural', match: 72, vertical: 'Culture', signal: 'Programming overlap with BeautyDays NYC' },
  { name: 'La Maison des Startups', kind: 'Capital / Network', match: 70, vertical: 'Beauty', signal: 'Studio partner intro — LVMH-adjacent' },
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
    detail: 'Longevity × beauty cluster crossed velocity threshold. Founder Auffray’s pre-clinical positioning is rare; first-mover slot is open for ~10 weeks.',
    impact: 'Locks white-space anchor for Mi Ojo',
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

// ============================================================
// CONCIERGE ENGINE — guest memory & relationship layer
// ============================================================

export const CONCIERGE_PULSE = {
  activeMembers: 412,
  highFitGuests: 96,
  pendingApprovals: 11,
  arrivalsNext7: 18,
  conciergeRevenueDelta: '+ $214K',
  lastSync: '4 min ago',
  operator: 'Carla M., Lead RM',
};

export const CONCIERGE_KPIS = [
  { label: 'Cross-Pillar Conversion', value: '54%', sub: 'Members touching 2+ pillars / yr' },
  { label: 'Repeat Booking Rate', value: '63%', sub: 'Within 12 months' },
  { label: 'Ancillary $ / Booking', value: '$1,240', sub: 'Above stated package' },
  { label: 'Concierge-Attributed', value: '38%', sub: 'Of pillar revenue' },
  { label: 'Referral Rate', value: '41%', sub: 'Member-to-guest' },
  { label: 'Itinerary Acceptance', value: '78%', sub: 'On AI-drafted journeys' },
];

// 14 high-fit guests — names, archetypes, memory, next-best action.
export interface ConciergeMember {
  id: string;
  name: string;
  initials: string;
  archetype: string;
  tier: 'Founders Circle' | 'House' | 'Resident' | 'New';
  household?: string;
  lastTouch: string;            // human-readable "X days ago" / event
  lastTouchPillar: string;      // 'Peppers & Beli' | 'Residences' | 'BeautyDays' | 'Studio'
  occasion?: string;            // birthday / anniversary / opening night
  memorySnapshot: string;       // 1-2 sentence narrative
  preferences: string[];        // tag chips
  stated: string[];
  observed: string[];
  predicted: string[];
  nextBest: string;
  health: number;               // 0-100 engagement score
  flags?: ('Founder Watch' | 'At Risk' | 'High LTV' | 'Press' | 'Investor')[];
  ltv: string;                  // illustrative
}

export const CONCIERGE_MEMBERS: ConciergeMember[] = [
  {
    id: 'M-0142',
    name: 'Beatriz Calderón',
    initials: 'BC',
    archetype: 'Cultural Patron',
    tier: 'Founders Circle',
    household: '+ Daniel Calderón',
    lastTouch: '3 nights ago',
    lastTouchPillar: 'Peppers & Beli',
    occasion: 'Anniversary in 9 days',
    memorySnapshot: 'Anniversary diners — booked the corner four-top three years running. Daniel proposed at the bar.',
    preferences: ['Off-menu', 'Sparkling natural', 'No press', 'Vinyl wall'],
    stated: ['Anniversary date Sep 4', 'Allergy: stone fruit (Daniel)'],
    observed: ['Always orders the heritage tasting', 'Prefers 9:30 PM seating', 'Tips bartender by name'],
    predicted: ['Will accept a private chef’s residency invite', 'Likely Residences candidate by Q3'],
    nextBest: 'Hold corner four-top + sparkling, send anniversary note from Ciarra',
    health: 92,
    flags: ['High LTV', 'Founder Watch'],
    ltv: '$84K LTV',
  },
  {
    id: 'M-0156',
    name: 'Ines Tavares',
    initials: 'IT',
    archetype: 'Editorial Voice',
    tier: 'House',
    lastTouch: 'BeautyDays LA',
    lastTouchPillar: 'BeautyDays',
    memorySnapshot: 'Lisbon-based editor; covered our LA gathering for Vogue Iberia. Quiet ally of the brand.',
    preferences: ['Quiet rooms', 'Late checkout', 'Espresso, no sugar'],
    stated: ['Press contact', 'Travels with daughter (12)'],
    observed: ['Always RSVPs same-day', 'Asks for staff recommendations'],
    predicted: ['Strong fit for Marrakesh founders’ retreat'],
    nextBest: 'Pre-release Marrakesh stay 24 hr before public list',
    health: 78,
    flags: ['Press'],
    ltv: '$18K LTV',
  },
  {
    id: 'M-0203',
    name: 'Marcus J. Lin',
    initials: 'ML',
    archetype: 'Founder POV',
    tier: 'Founders Circle',
    lastTouch: 'Studio dinner · LA',
    lastTouchPillar: 'Studio',
    memorySnapshot: 'Sold his last brand to LVMH. Brought four close friends to Studio dinner; all converted to BeautyDays passes.',
    preferences: ['Bourbon flight', 'Quiet table', 'No phones'],
    stated: ['Investor contact', 'Lives between LA & NYC'],
    observed: ['Brings his network', 'Never cancels last minute'],
    predicted: ['Likely Mi Ojo Fellowship judge', 'High Residences fit'],
    nextBest: 'Invite to Mi Ojo Fellowship judging panel',
    health: 95,
    flags: ['High LTV', 'Investor'],
    ltv: '$112K LTV',
  },
  {
    id: 'M-0217',
    name: 'Sasha Devereaux',
    initials: 'SD',
    archetype: 'Multi-gen Beauty',
    tier: 'House',
    household: '+ mother, Renée',
    lastTouch: 'BeautyDays NYC',
    lastTouchPillar: 'BeautyDays',
    memorySnapshot: 'Brings her mother to every NYC BeautyDays. Mother prefers calmer programming.',
    preferences: ['Mother-friendly', 'Hair texture lab', 'Wellness wing AM'],
    stated: ['Two-pass household'],
    observed: ['Mother always books wellness wing first', 'Sasha books late dinner'],
    predicted: ['Wellness Stay candidate for Renée'],
    nextBest: 'Bundle Renée into Aurelya longevity clinic stay',
    health: 84,
    flags: [],
    ltv: '$22K LTV',
  },
  {
    id: 'M-0231',
    name: 'Olu Bahar',
    initials: 'OB',
    archetype: 'Creator Anchor',
    tier: 'House',
    lastTouch: 'Lagos pre-launch',
    lastTouchPillar: 'BeautyDays',
    memorySnapshot: 'Lagos community anchor; her audience is the city. Asked once how to bring Mi Ojo to Lagos.',
    preferences: ['Local press', 'No alcohol', 'Vegetarian'],
    stated: ['Vegetarian', 'No alcohol'],
    observed: ['Creates content at every event', 'Always introduces our team to her network'],
    predicted: ['Lagos BeautyDays anchor 2027'],
    nextBest: 'Invite to Lagos BeautyDays advisory call',
    health: 88,
    flags: ['Founder Watch', 'High LTV'],
    ltv: '$31K LTV',
  },
  {
    id: 'M-0244',
    name: 'Chef Aarón Serra',
    initials: 'AS',
    archetype: 'Chef Resident',
    tier: 'Founders Circle',
    lastTouch: 'Brooklyn residency setup',
    lastTouchPillar: 'Peppers & Beli',
    memorySnapshot: 'Brooklyn residency opening May 18. Sourcing thesis aligns with Sweetwater farm.',
    preferences: ['Heritage corn', 'Farm visits', 'Late-night kitchen'],
    stated: ['Vegan dietary requests honored, but never personally'],
    observed: ['Stays after service', 'Knows every farmer by name'],
    predicted: ['Long-tail Beli’s Pantry collab — chef-led salsa line'],
    nextBest: 'Set Sweetwater farm walkthrough Sat AM',
    health: 96,
    flags: ['High LTV', 'Founder Watch'],
    ltv: '$54K LTV',
  },
  {
    id: 'M-0258',
    name: 'Cécile Vence',
    initials: 'CV',
    archetype: 'Founder · Beauty',
    tier: 'House',
    lastTouch: 'Maison Vence narrative review',
    lastTouchPillar: 'Studio',
    memorySnapshot: 'Founder of Maison Vence (Mi Ojo concept). Wants to cross-promote with Peppers & Beli for press window.',
    preferences: ['Late dinner', 'Press-friendly settings', 'Saint Cay coast'],
    stated: ['Press window: Sephora prestige Q3'],
    observed: ['Takes founder feedback to heart', 'Refers other founders'],
    predicted: ['Strong Saint Cay coastal stay candidate'],
    nextBest: 'Pair Maison Vence drop with Peppers & Beli pop-up',
    health: 86,
    flags: ['High LTV'],
    ltv: '$40K LTV',
  },
  {
    id: 'M-0269',
    name: 'Dr. Inès Auffray',
    initials: 'IA',
    archetype: 'Founder · Longevity',
    tier: 'House',
    lastTouch: 'Aurelya advisory call',
    lastTouchPillar: 'Studio',
    memorySnapshot: 'Pre-clinical longevity founder. Quiet, technical, demands rigor — books table 7 every visit.',
    preferences: ['No press', 'Off-menu vegetable plate', 'Table 7'],
    stated: ['Allergy: shellfish'],
    observed: ['Brings clinical advisor', 'Never on social'],
    predicted: ['Aurelya × Wellness Stay collab Q4'],
    nextBest: 'Schedule Aurelya × Wellness Stay co-design session',
    health: 82,
    flags: ['Founder Watch'],
    ltv: '$28K LTV',
  },
  {
    id: 'M-0277',
    name: 'Banyan Family Office',
    initials: 'BF',
    archetype: 'Patient Capital LP',
    tier: 'Founders Circle',
    lastTouch: 'Cayman intro · April',
    lastTouchPillar: 'Studio',
    occasion: 'Memo due Thursday',
    memorySnapshot: 'Patient-capital LP. Passed on Glossier ’17, asked twice about BeautyDays economics. Two principals + two analysts.',
    preferences: ['Private dining room', 'No photography', 'Late seating'],
    stated: ['Cayman-based', 'Min check $1M'],
    observed: ['Asks deeply about retention loops', 'Brings analysts to dinners'],
    predicted: ['Most likely lead in current round'],
    nextBest: 'Comp private dining room + walk through deal memo',
    health: 90,
    flags: ['Investor', 'High LTV'],
    ltv: '$1.5M+ exposure',
  },
  {
    id: 'M-0281',
    name: 'Halcyon Group',
    initials: 'HG',
    archetype: 'Wellness LP',
    tier: 'House',
    lastTouch: 'Marrakesh site walk · invite',
    lastTouchPillar: 'Residences',
    memorySnapshot: 'Wellness-hospitality LP. Hottest fit for Residences thesis but slow-moving culturally.',
    preferences: ['Daytime visits', 'Tea, not coffee', 'Architectural detail'],
    stated: ['Prefers in-property tours'],
    observed: ['Detail-oriented; asks about supply chain'],
    predicted: ['Residences anchor LP candidate'],
    nextBest: 'Lead Marrakesh property tour with Ciarra',
    health: 70,
    flags: ['Investor'],
    ltv: '$800K+ exposure',
  },
  {
    id: 'M-0292',
    name: 'Camila Ríos',
    initials: 'CR',
    archetype: 'Cultural Anchor',
    tier: 'House',
    lastTouch: 'Mexico City pre-launch',
    lastTouchPillar: 'BeautyDays',
    memorySnapshot: 'Mexico City community lead. Personally invited 200+ to upcoming BeautyDays Mexico City.',
    preferences: ['Spanish-first communication', 'Family seating', 'Daytime ops'],
    stated: ['Family-first scheduling'],
    observed: ['Brings community organisers', 'Always early'],
    predicted: ['Mexico City BeautyDays anchor 2027'],
    nextBest: 'Pre-release Peppers & Beli pop-up dates to her list',
    health: 87,
    flags: ['Founder Watch'],
    ltv: '$24K LTV',
  },
  {
    id: 'M-0301',
    name: 'Ridgewood Capital',
    initials: 'RC',
    archetype: 'Strategic CPG',
    tier: 'House',
    lastTouch: 'Diligence Q&A',
    lastTouchPillar: 'Studio',
    memorySnapshot: 'CPG strategic. Most interested in Beli’s Pantry retail roadmap; less so in BeautyDays.',
    preferences: ['Working dinners', 'Numbers in advance'],
    stated: ['Min check $750K'],
    observed: ['Drills on unit economics', 'Brings their head of M&A'],
    predicted: ['Likely co-investor, not lead'],
    nextBest: 'Send pantry retail expansion forecast before Friday',
    health: 64,
    flags: ['Investor', 'At Risk'],
    ltv: '$600K+ exposure',
  },
  {
    id: 'M-0319',
    name: 'Tomás Reig',
    initials: 'TR',
    archetype: 'Founder · Beauty',
    tier: 'House',
    lastTouch: 'Sephora prep meeting',
    lastTouchPillar: 'Studio',
    memorySnapshot: 'Velvethold founder. Sephora Pro tools fit. Quiet, but everyone in his network watches what he does.',
    preferences: ['Hospitality stays', 'Loves Brooklyn residency'],
    stated: ['Travels with operations partner'],
    observed: ['Books Brooklyn each trip'],
    predicted: ['Velvethold × BeautyDays activation collaboration'],
    nextBest: 'Hold the Brooklyn corner suite for next visit',
    health: 81,
    flags: [],
    ltv: '$26K LTV',
  },
  {
    id: 'M-0327',
    name: 'Renée DeWitt',
    initials: 'RD',
    archetype: 'Resident',
    tier: 'Resident',
    household: 'Tulum residency 2026',
    lastTouch: 'Tulum welcome dinner',
    lastTouchPillar: 'Residences',
    memorySnapshot: 'Multi-night Tulum resident. Quiet weekday mornings, 7 PM dinners, requested no service in room.',
    preferences: ['Privacy', 'Mineral water', 'Sunset hour'],
    stated: ['Privacy-first stay'],
    observed: ['Walks the property at sunset', 'No social media'],
    predicted: ['Multi-property loyalty candidate'],
    nextBest: 'Personal note + Marrakesh pre-release',
    health: 76,
    flags: [],
    ltv: '$48K LTV',
  },
];

// 5 archetypes
export const CONCIERGE_ARCHETYPES = [
  { name: 'Cultural Patron', share: 28, ltv: '$72K', notes: 'Anniversary diners, multi-pillar loyalists' },
  { name: 'Founder Network', share: 22, ltv: '$48K', notes: 'Founders + their guests; brings the network' },
  { name: 'Editorial Voice', share: 14, ltv: '$22K', notes: 'Press, editors, cultural critics' },
  { name: 'Resident', share: 18, ltv: '$54K', notes: 'Multi-night Residences guests' },
  { name: 'Investor', share: 10, ltv: '$1.2M+', notes: 'LPs, family offices, strategic principals' },
  { name: 'Cultural Anchor', share: 8, ltv: '$24K', notes: 'City community leads who bring others' },
];

// Concierge intelligence queue — AI-drafted, human-approved
export interface ConciergeRec {
  id: string;
  member: string;
  memberInitials: string;
  title: string;
  type: 'Invitation' | 'Cross-Pillar' | 'Upgrade' | 'Re-Engagement' | 'Itinerary';
  confidence: number;       // 0-100
  rationale: string;        // plain-language
  status: 'AI Draft' | 'Pending Review' | 'Edited by Concierge' | 'Sent' | 'Booked';
  pillar: string;
  draftedAt: string;
}

export const CONCIERGE_QUEUE: ConciergeRec[] = [
  {
    id: 'Q-091',
    member: 'Beatriz Calderón',
    memberInitials: 'BC',
    title: 'Anniversary corner four-top + handwritten note from Ciarra',
    type: 'Invitation',
    confidence: 96,
    rationale: 'Anniversary in 9 days. Three-year pattern of corner four-top with sparkling natural. Daniel proposed here — emotional anchor.',
    status: 'Pending Review',
    pillar: 'Peppers & Beli',
    draftedAt: '12 min ago',
  },
  {
    id: 'Q-088',
    member: 'Sasha Devereaux',
    memberInitials: 'SD',
    title: 'Bundle mother Renée into Aurelya longevity clinic stay',
    type: 'Cross-Pillar',
    confidence: 88,
    rationale: 'Renée prefers calm AM wellness wing. Aurelya stay programs match her stated rhythms. Sasha funds.',
    status: 'AI Draft',
    pillar: 'Residences',
    draftedAt: '38 min ago',
  },
  {
    id: 'Q-085',
    member: 'Marcus J. Lin',
    memberInitials: 'ML',
    title: 'Mi Ojo Fellowship judging panel — formal invite',
    type: 'Invitation',
    confidence: 94,
    rationale: 'Sold his last brand to LVMH. Brings his network; Studio dinners convert at 100%.',
    status: 'Edited by Concierge',
    pillar: 'Studio',
    draftedAt: '1 hr ago',
  },
  {
    id: 'Q-083',
    member: 'Banyan Family Office',
    memberInitials: 'BF',
    title: 'Comp private dining + walk-through of deal memo',
    type: 'Upgrade',
    confidence: 92,
    rationale: 'Memo due Thursday. Patient-capital LP, asked twice about BeautyDays economics. Investor signal: high.',
    status: 'Sent',
    pillar: 'Founder',
    draftedAt: '3 hr ago',
  },
  {
    id: 'Q-080',
    member: 'Halcyon Group',
    memberInitials: 'HG',
    title: 'Marrakesh property tour led by Ciarra (Jun 14)',
    type: 'Itinerary',
    confidence: 84,
    rationale: 'Wellness-hospitality LP fit. Detail-oriented buyer; needs in-property time before commitment.',
    status: 'AI Draft',
    pillar: 'Residences',
    draftedAt: '4 hr ago',
  },
  {
    id: 'Q-078',
    member: 'Olu Bahar',
    memberInitials: 'OB',
    title: 'Lagos BeautyDays advisory call — co-curate the lineup',
    type: 'Invitation',
    confidence: 91,
    rationale: 'Lagos audience is hers. Already volunteered city anchor energy. Vegetarian, no alcohol — note for hosting.',
    status: 'Pending Review',
    pillar: 'BeautyDays',
    draftedAt: '6 hr ago',
  },
  {
    id: 'Q-076',
    member: 'Ridgewood Capital',
    memberInitials: 'RC',
    title: 'Send pantry retail expansion forecast before Friday',
    type: 'Re-Engagement',
    confidence: 70,
    rationale: 'Engagement health declined to 64. Last touch went quiet. They drill on unit economics — give them the model.',
    status: 'AI Draft',
    pillar: 'Studio',
    draftedAt: '7 hr ago',
  },
  {
    id: 'Q-074',
    member: 'Renée DeWitt',
    memberInitials: 'RD',
    title: 'Personal note + Marrakesh pre-release access',
    type: 'Cross-Pillar',
    confidence: 79,
    rationale: 'Tulum resident. Privacy-first. Marrakesh restored-home matches her sunset rhythm.',
    status: 'Pending Review',
    pillar: 'Residences',
    draftedAt: '9 hr ago',
  },
  {
    id: 'Q-072',
    member: 'Camila Ríos',
    memberInitials: 'CR',
    title: 'Pre-release Peppers & Beli Mexico City pop-up dates',
    type: 'Cross-Pillar',
    confidence: 86,
    rationale: 'Mexico City community lead. Spanish-first comms. Pre-release converts her network at ~3× public list.',
    status: 'Booked',
    pillar: 'Peppers & Beli',
    draftedAt: 'Yesterday',
  },
  {
    id: 'Q-070',
    member: 'Cécile Vence',
    memberInitials: 'CV',
    title: 'Pair Maison Vence drop with Peppers & Beli pop-up',
    type: 'Cross-Pillar',
    confidence: 88,
    rationale: 'Sephora prestige window Q3. Cross-pillar story = press leverage. Studio + Peppers narrative aligned.',
    status: 'Edited by Concierge',
    pillar: 'Studio',
    draftedAt: 'Yesterday',
  },
];

// 3 high-value itineraries (the proposed-journey product)
export interface ItineraryItem {
  time: string;
  title: string;
  pillar: string;
  detail: string;
  value?: string;
}

export interface Itinerary {
  id: string;
  guest: string;
  guestInitials: string;
  occasion: string;
  status: 'AI Proposed' | 'RM Refined' | 'Sent' | 'Accepted';
  total: string;
  items: ItineraryItem[];
}

export const CONCIERGE_ITINERARIES: Itinerary[] = [
  {
    id: 'IT-014',
    guest: 'Beatriz & Daniel Calderón',
    guestInitials: 'BC',
    occasion: 'Anniversary · 4 nights',
    status: 'RM Refined',
    total: '$11,820',
    items: [
      { time: 'Day 1 · 16:00', title: 'Private transfer + welcome', pillar: 'Concierge', detail: 'Driver Carla, sparkling natural in vehicle, no signage', value: '$320' },
      { time: 'Day 1 · 21:30', title: 'Anniversary corner four-top', pillar: 'Peppers & Beli', detail: 'Heritage tasting + sparkling natural; handwritten note from Ciarra', value: '$1,180' },
      { time: 'Day 2 · 09:00', title: 'BeautyDays wellness wing AM', pillar: 'BeautyDays', detail: 'Breathwork + IV bar private session', value: '$680' },
      { time: 'Day 2 · 19:00', title: 'Sweetwater farm walk + supper', pillar: 'Peppers & Beli', detail: 'Chef Aarón hosts at the farm', value: '$1,920' },
      { time: 'Day 3 · 11:00', title: 'Coastal residency · Saint Cay overnight', pillar: 'Residences', detail: 'Private terrace, sunset ritual, no service in room', value: '$3,400' },
      { time: 'Day 4 · 17:00', title: 'Founder send-off cocktail', pillar: 'Studio', detail: 'Optional — small Studio gathering, no press', value: '$420' },
    ],
  },
  {
    id: 'IT-018',
    guest: 'Marcus J. Lin + 2 guests',
    guestInitials: 'ML',
    occasion: 'Studio dinner + LA weekend',
    status: 'Sent',
    total: '$14,640',
    items: [
      { time: 'Fri · 20:00', title: 'Mi Ojo Studio dinner', pillar: 'Studio', detail: 'Bourbon flight, no phones, table for 6', value: '$2,400' },
      { time: 'Sat · 11:00', title: 'BeautyDays VIP lounge', pillar: 'BeautyDays', detail: 'Founder track day pass × 3', value: '$1,200' },
      { time: 'Sat · 19:30', title: 'Peppers & Beli chef’s table', pillar: 'Peppers & Beli', detail: 'Heritage 9-course; Marcus brings 4 close friends (will convert)', value: '$3,940' },
      { time: 'Sun · 09:00', title: 'Mi Ojo Fellowship judging brief', pillar: 'Studio', detail: 'Private table with the Fellowship director', value: '$0 (host)' },
      { time: 'Sun · 18:00', title: 'Tulum residency stretch (optional)', pillar: 'Residences', detail: 'Hold for review — Marcus has flagged interest', value: '$7,100' },
    ],
  },
  {
    id: 'IT-021',
    guest: 'Halcyon Group · 3 principals',
    guestInitials: 'HG',
    occasion: 'Marrakesh property tour',
    status: 'AI Proposed',
    total: '$22,300',
    items: [
      { time: 'Day 1 · 14:00', title: 'Property arrival + architectural walk', pillar: 'Residences', detail: 'Lead by Ciarra; supply-chain talking points pre-loaded', value: '$0 (host)' },
      { time: 'Day 1 · 19:30', title: 'Heritage dinner — Beli + heirloom corn', pillar: 'Peppers & Beli', detail: 'Sweetwater sourcing storytelling embedded', value: '$2,800' },
      { time: 'Day 2 · 09:00', title: 'Wellness ritual — sound + breathwork', pillar: 'BeautyDays', detail: 'On-property practitioner', value: '$1,200' },
      { time: 'Day 2 · 12:00', title: 'Unit economics walk-through', pillar: 'Studio', detail: 'CFO + Ciarra; data room pre-shared', value: '$0 (host)' },
      { time: 'Day 2 · 18:00', title: 'Founders’ retreat overnight', pillar: 'Residences', detail: 'Architectural suite × 3 principals', value: '$18,300' },
    ],
  },
];

// Cross-pillar conversion flow
export const CROSS_PILLAR_TRANSITIONS = [
  { from: 'Peppers & Beli', to: 'Residences', count: 64, share: 28 },
  { from: 'Residences', to: 'BeautyDays', count: 41, share: 18 },
  { from: 'Studio dinner', to: 'BeautyDays', count: 56, share: 24 },
  { from: 'BeautyDays', to: 'Peppers & Beli', count: 38, share: 16 },
  { from: 'Studio', to: 'Membership', count: 30, share: 13 },
];

export const CROSS_PILLAR_FLOW = {
  pillars: ['Studio', 'Peppers & Beli', 'BeautyDays', 'Residences', 'Membership'] as const,
  flows: [
    { from: 'Studio', to: 'Peppers & Beli', value: 56 },
    { from: 'Studio', to: 'BeautyDays', value: 30 },
    { from: 'Peppers & Beli', to: 'Residences', value: 64 },
    { from: 'Peppers & Beli', to: 'BeautyDays', value: 38 },
    { from: 'BeautyDays', to: 'Residences', value: 41 },
    { from: 'Residences', to: 'Membership', value: 28 },
    { from: 'BeautyDays', to: 'Membership', value: 22 },
  ],
};

// At-risk re-engagement queue
export const CONCIERGE_AT_RISK = [
  {
    name: 'Ridgewood Capital',
    initials: 'RC',
    health: 64,
    delta: -18,
    lastTouch: 'Apr 22 · diligence Q&A',
    suggested: 'Send pantry retail expansion forecast + working-dinner invite',
  },
  {
    name: 'Levant Holdings',
    initials: 'LH',
    health: 52,
    delta: -22,
    lastTouch: 'Apr 16 · intro call',
    suggested: 'Founder follow-up note from Ciarra — prefer voice memo',
  },
  {
    name: 'Halo & Hush',
    initials: 'HH',
    health: 47,
    delta: -14,
    lastTouch: 'BeautyDays London · pending',
    suggested: 'Pivot sponsor placement to Paris BeautyDays — better fit',
  },
  {
    name: 'Sienna Park',
    initials: 'SP',
    health: 58,
    delta: -9,
    lastTouch: 'Paris pre-launch · 18 days',
    suggested: 'Personal note from Camila + early Paris dates',
  },
];

// Occasion detection (AI-flagged)
export const CONCIERGE_OCCASIONS = [
  { member: 'Beatriz Calderón', occasion: 'Anniversary', date: 'in 9 days', source: 'Stated + 3-year pattern' },
  { member: 'Marcus J. Lin', occasion: 'Birthday', date: 'in 18 days', source: 'Stated' },
  { member: 'Cécile Vence', occasion: 'Maison Vence Sephora launch', date: 'in 32 days', source: 'Inferred from Studio calendar' },
  { member: 'Renée DeWitt', occasion: 'Tulum return window', date: 'in 28 days', source: 'Pattern detection' },
  { member: 'Ines Tavares', occasion: 'Daughter’s 13th birthday', date: 'in 44 days', source: 'Stated' },
];
