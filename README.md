# Miojo OS \u2014 Founder Demo

> The operating environment for a founder-led lifestyle platform.

A premium investor demo of **Miojo OS** \u2014 the AI-assisted operating layer for Ciarra Pardo's interlinked platform across beauty, wellness, hospitality, community, and brand-building.

## What this is

One founder. Four pillars. Five crews. One platform.

| Crew | Role |
|------|------|
| **Founder Command** | Cross-pillar executive surface \u2014 morning brief, decisions, investor tracks |
| **Mi Ojo Studio** | Brand & narrative co-strategist \u2014 the cashflow engine |
| **BeautyDays Community** | IRL-to-digital community OS \u2014 the scaling wedge |
| **Experience Engine** | Peppers & Beli + Residences \u2014 hospitality & wellness ops |
| **Trend Intelligence** | Foresight, opportunities, signal radar |
| **Trust Layer** | Human-in-the-loop & memory |

The demo is built so an investor can walk through it in 10\u201315 minutes and immediately understand: how each crew looks and feels, what each crew is doing for Miojo, why the outputs matter, and why AI makes the founder platform more powerful without replacing the founder.

## Stack

- **Next.js 16** (App Router), **React 19**, **TypeScript 5**
- **Tailwind CSS 3.4** with the Pharos V9 cream-shell design system
- **Recharts** for data visualization
- **Inter / Fraunces / JetBrains Mono** via `next/font/google`

## Run locally

```bash
npm install
npm run dev   # http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Project structure

```
app/                    Next.js App Router pages
\u251c\u2500 page.tsx            Home \u2014 Miojo OS dashboard + Interlock Map
\u251c\u2500 trust/              Trust Layer \u2014 human-in-the-loop & memory
\u2514\u2500 crews/
   \u251c\u2500 founder-command/
   \u251c\u2500 mi-ojo-studio/
   \u251c\u2500 beauty-days-community/
   \u251c\u2500 experience-engine/
   \u2514\u2500 trend-intelligence/

components/
\u251c\u2500 miojo/              Crew header, sections, Interlock Map
\u251c\u2500 navigation/         Shell, Sidebar, Header
\u251c\u2500 shared/             MetricCard, DataTable, ChartContainer, etc.
\u2514\u2500 ui/                 shadcn-style primitives

lib/miojo.ts            Crew + pillar config
data/miojo-mock.ts      Centralized mock data
```

## Design system

Built on the Pharos V9 cream-shell editorial system:

- Cream backgrounds (`#F6F4EE`), white raised cards
- Charcoal ink text, teal as system accent, gold for CTA emphasis
- Editorial hairline + JetBrains Mono eyebrow openers on every section
- Fraunces italic accent reserved for signature phrases
- Left-aligned editorial rhythm \u2014 not centered deck text

## Repo origin

This build was bootstrapped from the [Pharos / CACI demo](https://github.com/ssripada09-svg/caci-demo) and transformed end-to-end into the Miojo OS narrative. The original CACI demo repo was not modified \u2014 this app lives in [`ssripada09-svg/miojo_demo`](https://github.com/ssripada09-svg/miojo_demo) on the `miojo-phase2` branch.

## License

Proprietary \u2014 Pharos / Stoic Capital
