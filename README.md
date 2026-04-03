# Pharos Helm - CACI Demo

> AI Workforce Command Center for Enterprise Tool Governance

This is a demonstration application built for the CACI/Deploy360 partnership, showcasing the Pharos platform's capabilities for enterprise AI tool governance and optimization.

![Pharos Helm](https://img.shields.io/badge/Pharos-Helm-1FB6B8?style=for-the-badge)
![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## 🎯 Demo Overview

This demo showcases four AI Crews working together to manage enterprise tool portfolios:

| Crew | Purpose |
|------|---------|
| **License Intelligence** | Tool inventory, compliance mapping, FedRAMP coverage |
| **Tool Optimization** | Usage analysis, spend optimization, savings identification |
| **Operator Assistant** | Natural language interface for tool management |
| **Integration Mapping** | API connections, data flows, CUI-sensitive pathways |

### Key Metrics (Demo Data)
- **50 Tools** managed across 6 categories
- **$2.4M** monthly spend
- **$720K** identified annual savings (30%)
- **94%** NIST AI RMF compliance score

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (recommended: 22.x)
- npm or pnpm

### Installation

```bash
# Clone or navigate to the project
cd caci-demo/app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the demo.

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
app/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard home
│   ├── governance/        # Aegis Governance dashboard
│   └── crews/             # AI Crew pages
│       ├── license-intelligence/
│       ├── tool-optimization/
│       ├── operator-assistant/
│       └── integration-mapping/
├── components/
│   ├── navigation/        # Shell, Sidebar, Header
│   ├── shared/            # Reusable components
│   └── ui/                # Base UI primitives
├── data/                  # Mock JSON data
├── lib/                   # Utilities and data functions
└── types/                 # TypeScript definitions
```

## 🎨 Design System

Built with Pharos brand colors:
- **Teal** (#1FB6B8) - Primary accent
- **Gold** (#E68A3F) - Secondary/warnings
- **Purple** (#A78BFA) - Tertiary/AI features
- **Dark theme** with card-based layouts

## 🔒 No Authentication Required

This is a static demo - no login credentials needed. All data is simulated.

## 📦 Tech Stack

- **Framework:** Next.js 16.2 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4
- **Charts:** Recharts
- **Flow Diagrams:** React Flow (@xyflow/react)
- **State:** Zustand
- **UI Components:** Custom + shadcn/ui patterns

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
npx vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Other Platforms

The app builds to static output compatible with any static hosting:
- Netlify
- AWS S3 + CloudFront
- Azure Static Web Apps

## 📋 Environment Variables

**None required** - This demo runs entirely with bundled mock data.

## 🧪 Development

```bash
# Run linter
npm run lint

# Type check
npx tsc --noEmit

# Build
npm run build
```

## 📄 License

Proprietary - Pharos / Stoic Capital

---

*Built for the April 2026 CACI/Deploy360 demo*
