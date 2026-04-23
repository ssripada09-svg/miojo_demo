# CACI Demo App — Rebrand Audit

Auditing `/Users/Shank/.../Pharos/CACI_DEMO_APP` against the canonical Pharos v72 / db85843 reference.

## Current state summary

The CACI demo is a **dark-first** Next.js 16 / React 19 app. Every surface is built on charcoal (`#0B0F12` / `#14181C`) with white text. Accent colors (teal `#1FB6B8`, gold `#E68A3F`, purple `#A78BFA`) are the same Pharos palette, but applied as luminous spots on dark — the opposite shell polarity from v72.

**Approx usage counts** (occurrences of dark/legacy tokens):
- `text-white`, `text-muted-foreground`, `text-foreground`: ~200+
- `bg-pharos-card`, `bg-pharos-bg`, `bg-pharos-border`, `border-pharos-border`: ~180+
- `bg-card`, `border-border`: ~80+ (shadcn-style generic tokens)
- `text-pharos-teal`, `text-pharos-gold`, `text-pharos-purple`: ~50+

14 crew pages × ~300–770 lines each = ~7,000 lines of markup heavily coupled to dark tokens.

---

## Token layer (the leverage point)

### `app/globals.css`
Defines HSL CSS vars for `--background` (10% L), `--card` (9% L), `--foreground` (white), `--muted-foreground` (55% L gray), `--primary` = teal, `--accent` = gold, `--border` (20% L). These vars are consumed by shadcn/Tailwind generic tokens (`bg-card`, `border-border`, `text-muted-foreground`, etc.).

**Change required:** rebuild this file around the v72 token scheme (`--ph-*`, `--pharos-*`) and rebind the existing HSL vars so generic shadcn tokens (`bg-card`, `text-foreground`, `text-muted-foreground`) resolve to the cream equivalents. **This single file flips 80+ shadcn-bound surfaces for free.**

### `tailwind.config.js`
Defines a `pharos.*` palette with **fixed hex** values (`bg: '#0B0F12'`, `card: '#14181C'`, `border: '#2E3338'`). The entire app consumes these classes directly: `bg-pharos-card`, `border-pharos-border`, `bg-pharos-bg`, `bg-pharos-teal/10`, etc.

**Change required:** rebind `pharos.bg`, `pharos.card`, `pharos.border` to cream CSS variables so *every* `bg-pharos-card` token in the app automatically becomes `#FFFFFF` card on cream. Keep `pharos.teal`, `pharos.gold`, `pharos.purple` hex values — they're already canonical. Add the full v72 token tree (`ink`, `bg-raised`, `surface`, `teal-strong`, `teal-deep`, `gold-strong`, `gold-deep`, shadows, etc.).

**This is the highest-leverage change in the rebrand.** Once `pharos.bg/card/border` rebind, the vast majority of crew pages translate automatically without touching their markup.

### `app/layout.tsx`
- Uses `next/font/google` Inter only
- Adds `className="dark"` on `<html>` — forces the dark variant globally
- Uses `font-sans antialiased` on body

**Change required:**
- Load JetBrains Mono + Fraunces via `next/font/google` (or keep the canonical Google Fonts `@import` in globals.css for 1:1 parity with reference)
- Remove `dark` class from `<html>`
- Use v72 body treatment (`bg-bg text-ink`, feature-settings)

---

## Component layer

### `components/navigation/shell.tsx`
Dark root: `bg-pharos-bg` outer, `bg-pharos-card` mobile button, `bg-black/50` overlay.
**Impact:** trivial — 3 class swaps once token rebind lands.

### `components/navigation/sidebar.tsx`
`bg-pharos-card border-r border-pharos-border`, `text-white` active states, `text-muted-foreground` inactive. Suite coloring uses inline color values.
**Impact:** medium — active-state styling ("active = text-white") should invert to "active = text-ink" (default color once token rebind lands; the hover class `hover:text-white` needs to become `hover:text-ink` in ~6 places).

### `components/navigation/header.tsx`
`bg-pharos-card border-b border-pharos-border`. Aegis compliance pulse button with purple active state.
**Impact:** trivial class swaps + keep purple for governance active state (intentional brand distinction).

### `components/ui/card.tsx` (shadcn base)
Uses generic `bg-card text-card-foreground shadow-sm` — **automatically flips** once globals.css vars rebind.

### `components/ui/button.tsx` (shadcn)
Generic primary/secondary/outline/ghost bound to `bg-primary`, `bg-accent`, etc. With primary = teal and accent = gold already configured in the shadcn vars, this mostly rebinds for free — but the v72 canonical primary button is **solid gold with shadow-cta**, not teal. We need a new `gold` variant or rebind `default` to gold + add custom shadow.

### `components/shared/*`
- `MetricCard.tsx` — `bg-card border-border` ✅ flips automatically
- `ChartContainer.tsx` — `bg-card border-border` ✅ flips automatically
- `DataTable.tsx` — uses generic tokens + some inline `text-muted-foreground` ✅ mostly flips
- `StatusBadge.tsx` — uses green/yellow/red/blue HSL Tailwind → should rebind to `--ph-success/warn/danger/teal` variants but visually acceptable without
- `AegisFooter.tsx` — hard-coded `border-pharos-border text-pharos-purple` — swaps once token rebind lands
- `EmptyState.tsx`, `ErrorState.tsx`, `LoadingState.tsx` — mix of generic + pharos tokens ✅ mostly flip

### `app/page.tsx` (dashboard)
Heavy use of `text-white`, `bg-pharos-card`, `bg-pharos-bg`, hero banner gradient `from-pharos-teal/20 to-pharos-purple/20`.
**Impact:** medium — needs targeted edits:
- `text-white` → `text-ink` (the dashboard headline, suite titles)
- Hero banner gradient is too loud for cream; rebuild with v72 hero-glow pattern + italic Fraunces accent
- `bg-pharos-bg` (used as inset stat-card background) → `bg-surface-sunk`

### Crew pages (14 × 300–770 LOC)
All consume the same dark tokens. Recharts colors are passed as explicit hex strings to `Cell fill`, `stroke`, `Bar fill`. Quick scan confirms charts reference `#1FB6B8`, `#E68A3F`, `#A78BFA`, `#22C55E`, `#EF4444`, `#F59E0B` inline — already aligned.

**Impact:**
- 95% translate automatically on token rebind.
- Remaining work: batch-replace `text-white` → `text-ink` across all 14 crew pages. This is ~150 occurrences across ~15 files — one scripted `sed` pass. Any `bg-black/50` / `bg-pharos-bg` insets need a cream equivalent.

### `app/governance/page.tsx` (1058 LOC)
Uses purple heavily for Aegis identity. Already conceptually separated from the rest of the app.
**Impact:** medium — token rebind flips the shell. Purple accents stay. Score rings and risk coloring may need contrast adjustments on white cards.

---

## Change-by-area summary

| Area | Effort | Leverage |
|---|---|---|
| `globals.css` rewrite (v72 tokens + shadcn rebind) | 1 file | Flips ~80 generic-token usages |
| `tailwind.config.js` rewrite (pharos.* → cream vars, add v72 tokens) | 1 file | Flips ~180 `bg-pharos-*` usages |
| `app/layout.tsx` (fonts, dark → light) | 1 file | Global type + shell |
| Navigation (sidebar, header, shell) | 3 files | All chrome |
| Dashboard `app/page.tsx` | 1 file | Landing screen + hero |
| Shared components | 7 files (3 trivial) | Metrics / tables / charts |
| 14 crew pages | scripted edit | Bulk `text-white` → `text-ink` |
| Governance page | 1 file, targeted | Preserves purple authority |

---

## Easy screens

- **Dashboard** — high leverage, most visible, already consumes `bg-pharos-card` / `text-white` patterns
- **MetricCard / ChartContainer** — generic tokens → free flip
- **Most crew pages** (executive-command, workforce-utilization, etc.) — standard metric grid + table + chart pattern

## Hybrid / risky screens

- **Governance / Aegis page** — needs explicit decision on purple retention vs. v72 absence of purple. Risky to over-lighten without losing the "authority" signal.
- **Integration-mapping (772 LOC), operator-assistant (759 LOC), tool-optimization (664 LOC)** — large custom surface area, may contain hardcoded dark SVG strokes / backgrounds that need manual touch
- **Dashboard hero banner** — current `from-teal/20 to-purple/20` gradient on dark reads very differently on cream; needs rebuild, not inversion

## Where to NOT over-lighten

- **Aegis governance surfaces** — keep a modest surface-tier differentiation (e.g., `bg-surface-sunk` insets) + purple accent for the governance badge/score. Full cream with no differentiation flattens the "governance is different" signal.
- **Status indicators / risk severity** — keep red/amber strong; on cream these need slightly stronger saturation than on dark to maintain legibility.
- **Data-dense tables** — keep white card surface on cream `bg`; don't layer cream-on-cream.

## Where Aegis needs to remain distinct

- Header compliance pulse — purple when on `/governance`, else status color
- Governance page score ring, policy category headers, Aegis badge in footer — keep `pharos-purple` as accent
- Aegis footer across crew pages — purple shield icon + ink-muted text on cream
