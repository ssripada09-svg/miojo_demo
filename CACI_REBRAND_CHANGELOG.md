# CACI Rebrand — Changelog

**Canonical reference:** `embed-mvp` @ branch `v72-preview` @ commit `db85843`
("Polish: 5 surgical fixes on cream-shell redesign").

**Strategy chosen:** Full cream (not hybrid). See `CACI_REBRAND_DECISION.md`.

---

## Files changed

### Foundation (highest leverage)
- `app/globals.css` — rewritten end-to-end. Replaced dark HSL shadcn vars with v72 `--ph-*` tokens and rebound the shadcn HSL triples (`--background`, `--card`, `--foreground`, `--muted-foreground`, etc.) to cream equivalents. Ported the canonical Google Fonts import (`Inter 300–700`, `JetBrains Mono 400–600`, `Fraunces variable`). Ported the full v72 typography helper classes (`ph-display`, `ph-h1/2/3`, `ph-lede`, `ph-body`, `ph-display-serif-italic`, `ph-stat`, `ph-eyebrow`, `ph-eyebrow-num`, `ph-mono`, `ph-rule`). Ported section utilities (`hero-with-glow`, `pharos-divider`, `pharos-glow-teal`). Replaced dark scrollbar with cream scrollbar. Added a scoped `--ph-purple` token for Aegis.
- `tailwind.config.js` — rewritten. Rebound `pharos.bg` → `var(--ph-bg)`, `pharos.card` → `var(--ph-surface)`, `pharos.border` → `var(--ph-border-strong)`. Added full v72 shell tokens (`bg`, `bg-raised`, `surface`, `surface-sunk`, `ink.*`, `teal.*`, `gold.*`, `hairline`) and shadows (`shadow-cta`, `shadow-md/lg`). Added `fontFamily` for `serif` (Fraunces) and `mono` (JetBrains Mono). Added `maxWidth.container` (1280px) and gradient backgrounds (`grad-timeline`, `grad-display`).

### Layout
- `app/layout.tsx` — removed `dark` class from `<html>`, added `data-theme="light"`. Body now `bg-bg text-ink font-sans antialiased`.

### Navigation
- `components/navigation/shell.tsx` — shell background `bg-pharos-bg` → `bg-bg`. Overlay `bg-black/50` → `bg-ink/30 backdrop-blur-sm`. Mobile menu button flipped to cream surface.
- `components/navigation/sidebar.tsx` — full rewrite. `bg-pharos-card` → `bg-bg-raised`. Hover states `hover:text-white` → `hover:text-ink`, `hover:bg-pharos-border/50` → `hover:bg-[var(--ph-surface-sunk)]`. Suite color palette converted to `bg-teal-tint`/`text-teal-deep` etc. Suite section labels switched to `font-mono text-[10px] tracking-[0.15em]` (v72 eyebrow treatment). Governance retains `text-pharos-purple` active state.
- `components/navigation/header.tsx` — full rewrite. Header `bg-pharos-card` → `bg-bg-raised/85 backdrop-blur-xl`. Left side replaced "CACI Demo Environment" text with the v72 editorial eyebrow device (`<span class="ph-rule"/><span class="ph-eyebrow">CACI Demo Environment</span>`). Aegis compliance pulse retains purple when on `/governance`; otherwise uses semantic `pass/warn/fail` state colors. User avatar circle now `bg-pharos-purple/90` with ring.

### Shared components
- `components/shared/AegisFooter.tsx` — border `border-pharos-border` → `border-[var(--ph-border)]`; text `text-muted-foreground` → `text-ink-muted`. Emoji shield removed; replaced with monospace "AEGIS GOVERNANCE ACTIVE" using `.ph-mono` class, plus the existing purple shield icon.
- `components/shared/MetricCard.tsx`, `ChartContainer.tsx`, `DataTable.tsx`, `EmptyState.tsx`, `ErrorState.tsx`, `LoadingState.tsx`, `StatusBadge.tsx` — **no direct edits**. These consume `bg-card`, `border-border`, `text-muted-foreground`, `text-foreground` which now resolve to cream via the globals.css + tailwind.config.js rebind.

### UI primitives
- `components/ui/button.tsx` — variants rewritten to v72 semantics: `default` is now the solid-gold pill (`bg-pharos-gold text-white hover:bg-gold-strong shadow-cta ring-1 ring-pharos-gold/70`), `secondary` is solid teal, `outline` is white-with-charcoal-border, `ghost` is subtle ink hover, `link` uses teal-deep.
- `components/ui/card.tsx`, `components/ui/badge.tsx` — no edits needed; consume rebound shadcn tokens.

### Dashboard (`app/page.tsx`)
- Hero banner replaced. Was: `bg-gradient-to-r from-pharos-teal/20 to-pharos-purple/20`. Now: `rounded-2xl border border-[var(--ph-border)] bg-bg-raised hero-with-glow` with the v72 editorial pattern — `ph-rule` + `ph-eyebrow "CACI Demo · Deploy360"` + `ph-h2` headline with italic Fraunces accent on "Command" + `ph-lede` subhead + a "systems operational" pill using `bg-surface`.
- Stat card insets: `bg-pharos-bg` (now cream-on-cream invisible) replaced with `bg-[var(--ph-surface-sunk)]`.
- Crew link hovers: `hover:bg-pharos-border/50` → `hover:bg-[var(--ph-surface-sunk)]`.
- All `text-white` on cream cards → `text-ink`.

### 14 crew pages + governance (`app/crews/*/page.tsx`, `app/governance/page.tsx`)
Scripted sweep (Python regex). Preserved `text-white` ONLY on lines with a solid colored background (purple, teal, gold, blue, fail, pass, warning, primary, accent, destructive, gradient-to-*). Everywhere else:
- `text-white` → `text-ink` (~154 replacements)
- `hover:text-white` → `hover:text-ink`
- `bg-pharos-bg` → `bg-[var(--ph-surface-sunk)]`
- `hover:bg-pharos-border/{20,30,50}` → `hover:bg-[var(--ph-surface-sunk)]`
- `divide-pharos-border` → `divide-[var(--ph-border)]`
- `bg-black/50` → `bg-ink/30 backdrop-blur-sm`
- `bg-black/NN` → `bg-ink/20`

5 legitimate `text-white` occurrences remain — all icons inside solid-colored circles/buttons (e.g., `<User className="text-white">` inside a purple avatar, `<Bot>` inside a colored chip, font color on `bg-fail/pass/purple` buttons). These were preserved intentionally.

---

## Tokens/classes rebound (before → after)

| Token | Before | After |
|---|---|---|
| `--background` | HSL `210 25% 5%` (≈#0B0F12) | HSL `44 27% 95%` (≈#F6F4EE) |
| `--card` | HSL `210 15% 9%` | HSL `0 0% 100%` |
| `--foreground` | white | `#0F0F0E` |
| `--muted-foreground` | gray-55 | ink at 62% opacity |
| `--border` | 20% L gray | hairline on cream |
| `pharos.bg` | `#0B0F12` | `var(--ph-bg)` = `#F6F4EE` |
| `pharos.card` | `#14181C` | `var(--ph-surface)` = `#FFFFFF` |
| `pharos.border` | `#2E3338` | `var(--ph-border-strong)` = `rgba(15,15,14,0.18)` |
| `pharos.purple` | `#A78BFA` | `#6D5BD0` (higher-contrast on cream) |

---

## Decision: full cream vs hybrid

**Chose full cream.** The v72 branch history explicitly shows the reference team trialed `1dd3170 "Redesign: dark-first Signal & System pass"` and rejected it in favor of `a249287 "Redesign: propagate cream shell through all body sections"`. Following their documented decision. Hybrid would reintroduce the polarity the reference removed. Full rationale in `CACI_REBRAND_DECISION.md`.

Within-cream differentiation for governance authority:
1. Aegis retains `pharos.purple` (explicitly scoped: header pulse, governance page, AegisFooter).
2. Sunk insets (`--ph-surface-sunk` `#EEEBE2`) on audit rows and stat-card insets for structural hierarchy.
3. Editorial typography: every section opens with `ph-rule` + `ph-eyebrow` per the v72 signature device.

---

## Key screens — status

Build not executed in this working copy because `node_modules` is not installed locally (CACI_DEMO_APP is not under the Embed repo; it's a sibling directory with no installed deps). All edits are syntactic-only (token swaps, class renames, no structural JSX changes), so compilation risk is low. Recommend running `npm install && npm run build` as a verification step before shipping.

Manually verified via code review:
- **Dashboard** (`app/page.tsx`): hero rebuilt with v72 pattern; suite cards and metric insets flip via rebound tokens; all `text-white` → `text-ink`.
- **Sidebar / Header / Shell**: rewritten, consume only cream tokens.
- **MetricCard / ChartContainer / DataTable**: consume shadcn generics that rebound to cream; no edits required.
- **14 crew pages**: token rebind + scripted sweep flips all surfaces; minor legitimate `text-white` preserved on colored backdrops.
- **Governance page**: token rebind + sweep applied; purple accent preserved on Aegis surfaces.

---

## Unresolved tradeoffs

1. **Purple value shift.** I raised `pharos.purple` from `#A78BFA` (loud lavender on dark) to `#6D5BD0` (balanced on cream). This gives Aegis more gravitas on the light shell but changes the purple any existing mocks/screenshots used. Revisit if stakeholders prefer the original.
2. **`.ph-stat` scaled down.** v72 uses `clamp(4rem, 9vw, 8rem)` for hero statistics. CACI's dashboards have tighter metric grids; I set `clamp(2.5rem, 5vw, 4rem)` in the ported class. If someone explicitly uses `.ph-stat` for a single hero number, it will render smaller than on the marketing site — by design for this app context.
3. **Chart colors in Recharts.** Crew charts pass hex strings directly (e.g., `fill="#1FB6B8"`). These remain visually appropriate on white cards but were not audited for full v72 parity (e.g., no switch to `var(--ph-teal-deep)` for emphasis bars). Low risk; visually consistent.
4. **Fraunces and JetBrains Mono are loaded via Google Fonts `@import` in `globals.css`.** The original CACI app uses `next/font/google` for Inter. For full parity with v72 this is correct (matches reference loading strategy) but mixes two font-loading mechanisms. Acceptable; consider consolidating later.
5. **The left-align override from v72 globals.css was NOT ported.** CACI's dashboards use centered grid layouts deliberately. Porting the override would break existing crew-page centering. Left it out as an intentional deviation.

---

## Build status

Not executed — `node_modules` not present locally. Edits are class/token renames + one rebuilt hero block; no JSX structural changes to break type inference. Next step: `npm install && npm run build` on a machine with the repo's lockfile.

## Commit hash

Not committed — `CACI_DEMO_APP` is not a git repository in this working tree (`git rev-parse HEAD` → `fatal: not a git repository`). All changes are in-place in the working directory. If this repo is version-controlled elsewhere, commit from that tree.

---

## Files produced by this sprint

- `CACI_REBRAND_REFERENCE_SYSTEM.md` — canonical token/type/pattern extraction from `embed-mvp@db85843`
- `CACI_REBRAND_AUDIT.md` — current-app audit with change-by-area effort estimates
- `CACI_REBRAND_DECISION.md` — full-cream decision with three scoped concessions
- `CACI_REBRAND_CHANGELOG.md` — this file

---

# Second-pass: build verification + live QA + polish

## Build issue found and fixed

**Symptom:** `npm run build` failed at `app/globals.css` parsing:
```
@import rules must precede all rules aside from @charset and @layer statements
```

**Root cause:** In the first pass I placed the Google Fonts `@import url(...)` *after* `@tailwind base;` / `@tailwind components;` / `@tailwind utilities;`. PostCSS (and the CSS spec) forbid `@import` appearing after non-`@charset`/`@layer` rules, and `@tailwind` expands into real rules before processing continues.

**Fix:** removed the `@import` from `globals.css` entirely and migrated all three font families to `next/font/google` in `app/layout.tsx`. This is the correct Next.js 16 loading strategy:
- Self-hosts the fonts (no third-party runtime request, no layout shift, no CSS ordering fragility).
- Exposes `--font-inter`, `--font-jetbrains-mono`, `--font-fraunces` as CSS variables on `<html>`.
- Variable-font Fraunces loaded with both `normal` and `italic` styles so `.ph-display-serif-italic` renders correctly.

**Wiring updates:**
- `app/layout.tsx` — added `JetBrains_Mono` and `Fraunces` imports from `next/font/google`. Composed `className={${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable}}` on `<html>`.
- `app/globals.css` — every `.ph-*` typography helper's `font-family` stack now leads with the next/font var (`var(--font-inter)`, `var(--font-fraunces)`, `var(--font-jetbrains-mono)`) then falls back to the literal name then the system stack.
- `tailwind.config.js` — `fontFamily.sans/serif/mono` stacks also lead with the next/font vars so `font-sans`, `font-serif`, `font-mono` utilities resolve to the loaded fonts.

## Build status (second pass)

**`npm run build` — PASSED.**
- Next.js 16.2.2 / Turbopack
- All 19 routes statically pre-rendered (`/`, 14 `/crews/*`, `/governance`, `/_not-found`)
- Zero errors, zero warnings unrelated to the pre-existing Recharts SSR `width(-1)` notice (that noise is about Recharts computing dimensions during static generation; unrelated to the rebrand).

## Live QA sweep

Ran `npm run dev`, connected via preview harness, resized to 1440×900, screenshot-inspected:

| Screen | Verdict |
|---|---|
| `/` Dashboard | ✅ Hero with italic Fraunces "Command" reads editorial; suite cards color-keyed (blue/teal/gold); Recent Activity panel clean |
| `/crews/executive-command` | ✅ 12-metric grid + Executive Insight callout + charts render with strong contrast on white cards |
| `/crews/license-intelligence` | ✅ MetricCard grid, compliance chips, data table with uppercase mono headers — all legible |
| `/crews/contract-performance` | ✅ RED/AMBER/GREEN KPI blocks, CPARS donut, Portfolio Health Summary — high legibility |
| `/crews/operator-assistant` | ✅ Chat surface retains purple (operator is governance-adjacent — intentional); Aegis audit footer visible |
| `/governance` | ✅ Purple scoped correctly: shield, score, RMF function cards, audit filter badges |
| Sidebar | ✅ Three-suite color keying (blue/teal/gold) + governance-purple readable on cream |
| Header | ✅ `ph-rule` + `ph-eyebrow` "CACI DEMO ENVIRONMENT" + Aegis pulse |
| Cards / tables / badges / buttons | ✅ Solid gold primary CTA, teal secondary, outline w/ charcoal hairline, ghost — all hierarchy intact |
| AegisFooter | ✅ Purple shield + monospace "AEGIS GOVERNANCE ACTIVE" |

Live DOM computed values verified via `preview_inspect`:
- `body` background = `rgb(246, 244, 238)` (`--ph-bg` #F6F4EE) ✓
- `body` color = `rgb(15, 15, 14)` (`--ph-ink`) ✓
- `body` font-family = `Inter, "Inter Fallback", ...` (next/font resolved) ✓
- MetricCard bg = `rgb(255, 255, 255)` (`--ph-surface`) ✓

### Purple-bleed check
Only intentional uses of `pharos-purple`:
- `/governance` page (all Aegis identity)
- Header Aegis pulse (purple when on `/governance`, else status color)
- `AegisFooter` shield icon
- `operator-assistant` (AI governance surface — every query hits audit trail; documented as intentional)
- No other crew page uses purple.

The `bg-pharos-blue/10` "Last scanned" badge and filter on `license-intelligence` reads faintly blue-purple at low opacity in compressed screenshots but resolves to pure blue `#2563EB` in live DOM — that's the suite color, not Aegis bleed.

## Decision re-evaluation

**Full cream decision held.** See the second-pass note appended to `CACI_REBRAND_DECISION.md`. The live app passes the operational / executive-readable / federal-credible test; no hybrid refinement required.

## Second-pass fixes applied

1. **Build fix:** `app/globals.css` — removed the in-CSS `@import` of Google Fonts (the ordering violation). Comment added explaining the reason.
2. **Font loading:** `app/layout.tsx` — added `JetBrains_Mono` and `Fraunces` via `next/font/google`, exposing variables on `<html>`.
3. **Font stacks:** `app/globals.css` + `tailwind.config.js` — every font stack now leads with the next/font CSS variable.
4. **MetricCard polish** (targeted, inside-cream):
   - Added hover lift: `hover:border-[rgba(31,182,184,0.45)] hover:shadow-md hover:-translate-y-0.5` with `transition-all duration-300` (matches v72 `.stat-card` interaction).
   - Label typography tightened to editorial uppercase: `text-[11px] font-semibold tracking-[0.08em] uppercase text-ink-muted`.
   - Value weight shifted from `font-bold` to `font-semibold` with `tracking-[-0.01em]` and explicit `text-ink` (matches v72 headline discipline).

## Files changed in second pass

- `app/globals.css`
- `app/layout.tsx`
- `tailwind.config.js`
- `components/shared/MetricCard.tsx`
- `CACI_REBRAND_DECISION.md` (second-pass note appended)
- `CACI_REBRAND_CHANGELOG.md` (this addition)
- `.claude/launch.json` (dev-server config for preview harness, not shipped to users)

## Screens checked

Dashboard, executive-command, license-intelligence, contract-performance, operator-assistant, governance, sidebar, header, footer, shell (mobile + desktop viewports).

## Unresolved tradeoffs

1. **Recharts SSR noise.** Build prints repeated `width(-1)/height(-1)` warnings during static generation. Pre-existing; unrelated to the rebrand. Charts render correctly client-side. Could be silenced by passing explicit `minWidth`/`height` or using dynamic imports; outside scope.
2. **Purple on `operator-assistant`.** Flagged as arguably-bleed, kept as intentional. The crew IS the governance interface — every message is an audit entry. Revisit if stakeholders want purple clamped strictly to `/governance`.
3. **Blue suite color at low opacity.** `bg-pharos-blue/10` on cream reads faintly purple in low-DPI compressed screenshots. Confirmed correct in live DOM. Consider raising to `/15` opacity later if mocks need higher perceived saturation.

## Final build status (second pass)

**PASSED.** `npm run build` completes cleanly. 19/19 routes static-generated.
