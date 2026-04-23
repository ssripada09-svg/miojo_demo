# CACI Rebrand — Canonical Pharos Reference System

**Source of truth:** `embed-mvp` repo, branch `v72-preview`, checkpoint `db85843`
("Polish: 5 surgical fixes on cream-shell redesign").

All values below are extracted verbatim from:
- `src/styles/globals.css`
- `tailwind.config.js`
- `src/components/layout/Navigation.tsx`, `layout/Footer.tsx`, `layout/PageContainer.tsx`
- `src/components/ui/Button.tsx`, `ui/Card.tsx`
- `src/components/sections/Hero.tsx`, `sections/OperationsLive.tsx`, `sections/HeroBackground.tsx`

This document is the implementation source of truth for the CACI demo rebrand.
**No approximation.** Every token, font weight, and shadow string below must match the reference.

---

## 1. Fonts

Loaded via a single Google Fonts `@import` in `globals.css`:

```
https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..600&display=swap
```

### Primary sans — Inter
- Stack: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Weights loaded: 300, 400, 500, 600, 700
- Weights actually used in type scale: **400** (body/lede), **500** (stat), **560** (display/h1/h2 — a custom weight between Medium/Semibold), **600** (h3, eyebrow, button)
- Font-feature-settings (body): `'ss01','cv11'`
- Body text-rendering: `optimizeLegibility`, antialiased

### Expressive serif — Fraunces (variable)
- Stack: `'Fraunces', Georgia, serif`
- **Italic usage is the signature accent.** Used via `.ph-display-serif-italic` to italicize one phrase inside a display headline (e.g. "right now"), colored `--ph-teal-deep`.
- Variable font settings: `'opsz' 144, 'SOFT' 50` (italic accent), `'opsz' 144` (`.ph-stat`)
- Weight 400 for italic accent; weight 500 for stat numerals
- Feature settings for stats: `'tnum' 1, 'lnum' 1` (tabular, lining figures)

### Mono — JetBrains Mono
- Stack: `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace`
- Weights used: 400, 500, 600
- Used for eyebrows (`.ph-eyebrow` 11px / 600 / tracking 0.18em, uppercase, color teal-deep), numeric eyebrows (`.ph-eyebrow-num`), and `.ph-mono` captions.

### Nav wordmark — IBM Plex Sans
- Inlined as a style on the `PHAROS` wordmark in `Navigation.tsx`:
  `fontFamily: '"IBM Plex Sans", system-ui, sans-serif'`
- tracking `0.05em`, weight 600, size `text-2xl`

---

## 2. Colors / tokens

Two coexisting token layers, both resolving to cream in the canonical light theme:
- **Shell tokens** (`--ph-*`) — hero, nav, footer, page chrome
- **Feature-panel tokens** (`--pharos-*`) — body sections; in v72 these were remapped from dark to cream so existing `bg-pharos-*` markup continues to work on the light shell

### Cream / light shell
| Token | Value | Purpose |
|---|---|---|
| `--ph-bg` | `#F6F4EE` | page background (warm cream paper) |
| `--ph-bg-raised` | `#FDFCF8` | raised nav/hero strip |
| `--ph-surface` | `#FFFFFF` | card base |
| `--ph-surface-sunk` | `#EEEBE2` | inset panels, scroll track |

### Feature-panel surfaces (cream)
| Token | Value |
|---|---|
| `--pharos-bg-void` | `#EEEBE2` |
| `--pharos-bg-deep` | `#F6F4EE` |
| `--pharos-bg-base` | `#F8F5EF` |
| `--pharos-bg-elevated` | `#FDFCF8` |
| `--pharos-bg-surface` | `#F6F4EE` |
| `--pharos-bg-card` | `#FFFFFF` |

### Ink (charcoal text)
| Token | Value |
|---|---|
| `--ph-ink` | `#0F0F0E` |
| `--ph-ink-soft` | `rgba(15,15,14,0.82)` |
| `--ph-ink-muted` | `rgba(15,15,14,0.62)` |
| `--ph-ink-faint` | `rgba(15,15,14,0.46)` |
| `--ph-ink-ghost` | `rgba(15,15,14,0.26)` |
| `--ph-ink-on-accent` | `#FFFFFF` |

On feature panels, the parallel text hierarchy is:
- `--pharos-text-primary` `#0F0F0E`
- `--pharos-text-secondary` `rgba(15,15,14,0.74)`
- `--pharos-text-tertiary` `rgba(15,15,14,0.58)`
- `--pharos-text-muted` `rgba(15,15,14,0.44)`

### Teal (system identity)
| Token | Value |
|---|---|
| `--ph-teal` | `#1FB6B8` |
| `--ph-teal-strong` | `#17999B` |
| `--ph-teal-deep` | `#0F7A7C` |
| `--ph-teal-tint` | `rgba(31,182,184,0.10)` |
| `--ph-teal-glow` | `rgba(31,182,184,0.28)` |

### Gold (CTA emphasis)
| Token | Value |
|---|---|
| `--ph-gold` | `#E68A3F` |
| `--ph-gold-strong` | `#C87730` |
| `--ph-gold-deep` | `#A8601F` |
| `--ph-gold-tint` | `rgba(230,138,63,0.10)` |

### Borders, hairlines, status
- `--ph-border` `rgba(15,15,14,0.10)`
- `--ph-border-strong` `rgba(15,15,14,0.18)`
- `--ph-hairline` `rgba(15,15,14,0.06)`
- `--ph-success` `#15803D`, `--ph-warn` `#B45309`, `--ph-danger` `#B91C1C`

### Gradients (defined)
- `--ph-grad-timeline`: `linear-gradient(90deg, teal 0%, teal 35%, gold 65%, ink 100%)`
- `--ph-grad-display`: `linear-gradient(92deg, teal-strong 0%, teal-deep 50%, gold-strong 100%)`

### Shadows
- `--ph-shadow-xs` `0 1px 0 rgba(15,15,14,0.04)`
- `--ph-shadow-sm` `0 1px 2px rgba(15,15,14,0.06)`
- `--ph-shadow-md` `0 1px 2px rgba(15,15,14,0.04), 0 8px 24px rgba(15,15,14,0.08)`
- `--ph-shadow-lg` `0 1px 2px rgba(15,15,14,0.05), 0 20px 60px rgba(15,15,14,0.12)`
- `--ph-shadow-cta` `0 1px 0 rgba(168,96,31,0.5), 0 10px 28px rgba(230,138,63,0.32)`

### Purple — NOT present in the canonical system
The reference does **not** define a purple token. In the current CACI app purple is used for Aegis/governance distinction. Per "brand rules implied by implementation," purple is reserved/optional and must be used sparingly if kept.

---

## 3. Typography / hierarchy

All utility classes are defined in `globals.css`.

| Class | Family | Size | Weight | Line-height | Letter-spacing | Color |
|---|---|---|---|---|---|---|
| `.ph-display` | Inter | `clamp(3rem, 6.2vw, 6.75rem)` | 560 | 1.0 | -0.028em | `--ph-ink` |
| `.ph-h1` | Inter | `clamp(2.75rem, 5.2vw, 4.75rem)` | 560 | 0.98 | -0.032em | `--ph-ink` |
| `.ph-h2` | Inter | `clamp(2rem, 3.6vw, 3.25rem)` | 560 | 1.04 | -0.028em | `--ph-ink` |
| `.ph-h3` | Inter | `1.375rem` | 600 | 1.25 | -0.015em | `--ph-ink` |
| `.ph-lede` | Inter | `clamp(1.125rem, 1.5vw, 1.375rem)` | 400 | 1.45 | -0.008em | `--ph-ink-soft` |
| `.ph-body` | Inter | `1rem` | 400 | 1.6 | — | `--ph-ink-muted` |
| `.ph-display-serif-italic` | Fraunces italic | inherit | 400 | inherit | -0.025em | `--ph-teal-deep` |
| `.ph-stat` | Fraunces | `clamp(4rem, 9vw, 8rem)` | 500 | 0.92 | -0.04em | `--ph-ink` |
| `.ph-eyebrow` | JetBrains Mono | 11px | 600 | — | 0.18em, uppercase | `--ph-teal-deep` |
| `.ph-eyebrow-num` | JetBrains Mono | 11px | 500 | — | 0.2em, uppercase | `--ph-ink-muted` (teal-deep for number prefix) |
| `.ph-mono` | JetBrains Mono | 11px | — | — | 0.12em | `--ph-ink-muted` |

### Editorial hairline rule
`.ph-rule` — a 2rem × 1px teal-deep inline block used immediately before `.ph-eyebrow` to anchor section labels. This is a **signature device** of the v72 design.

### Left-align override
`globals.css` has a global override forcing all `main section` headings, paragraphs, and text-center utilities to left-align — the entire body of the v72 redesign is left-aligned editorial, not centered. Nav/footer/header are exempt.

---

## 4. Elements / patterns

### Navigation (`layout/Navigation.tsx`)
- Fixed top, `h-20`, `bg-bg-raised/85 backdrop-blur-xl`, `border-b border-border`
- Logo: `/brand/pharos-mark-white.png` inverted via CSS filter (`invert(1) brightness(0.15)`) so the white mark renders as charcoal on cream
- Wordmark: IBM Plex Sans 2xl / 600 / tracking 0.05em
- Links: 13.5px / 500 / tracking -0.005em — muted ink, active state = `text-ink`
- Divider: `h-4 w-px bg-[var(--ph-border-strong)]`
- Primary nav CTA: **solid gold pill** — `bg-pharos-gold text-white px-5 py-2.5 rounded-md hover:bg-pharos-gold-dim shadow-cta ring-1 ring-pharos-gold/70`

### Hero (`sections/Hero.tsx`)
- Section: `min-h-[calc(100vh-4rem)] flex items-center pt-20 pb-28 overflow-hidden`
- Background: `<HeroBackground />` — layered radial gradients (teal tint top center, gold tint top-right) over cream
- Container: `PageContainer maxWidth="lg"` → `max-w-container` = `1280px`
- Eyebrow device: `<span className="ph-rule" />` + `<span className="ph-eyebrow">{eyebrow}</span>` — this pattern is mandatory
- Headline: `ph-display text-ink mb-7 text-balance` with optional italic accent phrase wrapped in `<span className="ph-display-serif-italic">`
- Lede: `ph-lede mb-10 max-w-[44rem] text-balance`
- CTA row: primary (gold) + secondary (teal) stacked on mobile, `flex-row gap-4` on sm

### CTA / Buttons (`ui/Button.tsx`)
Four variants, exact classes:
- **primary (gold)**: `bg-pharos-gold text-white hover:bg-pharos-gold-dim shadow-[0_1px_0_rgba(168,96,31,0.5),0_10px_28px_rgba(230,138,63,0.32)] ring-1 ring-pharos-gold/70`
- **secondary (teal)**: `bg-teal-strong text-white hover:bg-teal-deep shadow-[0_1px_0_rgba(15,122,124,0.5),0_8px_22px_rgba(31,182,184,0.22)] ring-1 ring-teal-strong/60`
- **outline**: `bg-white border border-[rgba(15,15,14,0.18)] text-ink hover:border-teal-strong`
- **ghost**: `text-ink-muted hover:text-ink hover:bg-[rgba(15,15,14,0.05)]`
- Base: rounded-lg, `font-semibold`, `tracking-[-0.005em]`, focus ring = `pharos-gold`
- Sizes: sm `px-4 py-2 text-sm`, md `px-6 py-3 text-[15px]`, lg `px-7 py-[14px] text-[15px] tracking-[0.005em]`

### Cards
Two patterns coexist:
- `.stat-card` — white surface (`--pharos-bg-card`), `border: 1px solid --pharos-border`, `border-radius: 14px`, hover = teal border + lift shadow
- `.content-card` — same but `border-radius: 16px`, `padding: 2rem`, hover = ink border + neutral shadow

### Section backgrounds
- `.bg-pharos-hero` / `.hero-with-glow` — radial teal tint + gold tint over cream gradient
- `.bg-pharos-elevated|surface|deep` — flat cream surfaces
- `.pharos-grid-overlay` — 40×40 ink grid at 4% opacity
- `.pharos-noise-overlay` — SVG fractal noise at 2%, multiply blend
- `.pharos-divider` — horizontal 1px teal gradient rule
- `.pharos-glow-teal` / `.pharos-glow-warm` — soft box-shadow glows
- `.section-with-glow` — radial teal + gold washes on elevated cream

### Operations Live panel (`sections/OperationsLive.tsx`)
A signature editorial module. Key DNA:
- `rounded-2xl border border-[var(--ph-border)] bg-bg-raised overflow-hidden`
- Ambient teal blur glow (`-top-24 -right-24 w-[460px] h-[460px] blur-[120px]`)
- Left column: beacon dot (teal, with `beacon-ring-expand` animation) + `ph-eyebrow "Operations Live"` + `ph-h3` with an italic Fraunces phrase
- Right column: stream of signal rows with left tint bar (teal/gold/ink) + monospaced meta

### Focus state (global)
`*:focus-visible { outline: 2px solid var(--ph-teal); outline-offset: 2px; }`

### Scrollbar
8px, track `--ph-bg-raised`, thumb `--ph-border-strong` → hover `--ph-ink-muted`.

---

## 5. Brand rules implied by the implementation

**Primary:** warm cream shell (`#F6F4EE`) + charcoal ink (`#0F0F0E`). The app is a **light editorial operating surface**, not a dashboard-dark console.

**Teal is system identity.** Used for:
- Eyebrow labels (`--ph-teal-deep`)
- Italic Fraunces accents
- The editorial hairline rule
- Focus rings
- Secondary CTA
- Ambient hero/panel glows
- Status-dot tint on structural signals
Never used as a dominant background; always an accent or hairline.

**Gold is CTA emphasis — reserved.** It is the single primary-CTA color. Solid gold pill with a teal-free shadow (`shadow-cta`). Don't use gold for borders, body text, or decorative tints except the faintest hero-background wash.

**Purple is absent** from the v72 canonical system. If used in CACI for Aegis, it must be explicitly scoped to governance surfaces and not introduced into shell chrome.

**Dark panels inside a light system** — the v72 design considered but rejected dark feature panels (commits earlier in the branch show the "dark-first" pass was replaced by "propagate cream shell through all body sections"). The final checkpoint `db85843` is **fully cream**. Feature panels differentiate via white cards, subtle grid overlays, and tint glows — not darkness.

**Serif/italic is rare and editorial.** Fraunces italic appears once per hero (a single phrase) and sparingly in section headings. Never use Fraunces for body copy or large runs of text. `ph-stat` is for single-number stat displays, not for every metric.

**Mono is for metadata, not body.** JetBrains Mono is used exclusively for eyebrows, numeric labels, and small technical captions.

**Left-align everything.** The `main section` left-align override is a deliberate editorial choice — content blocks align to the grid's left edge, not centered.

**Hairline rule + eyebrow is the section opener.** Every meaningful section begins with `<span class="ph-rule"/><span class="ph-eyebrow">…</span>`.

**What NOT to overuse:**
- Multiple italic phrases per block
- Fraunces at body sizes
- Teal as a background
- Gold outside primary CTAs
- Gradients beyond the two defined (`grad-timeline`, `grad-display`)
- Hard/black borders — always `rgba(15,15,14,0.10|0.18)`, never `#000`

---

## Enforcement

Every decision in the CACI rebrand must map to a specific token, class, or pattern in this document. Any deviation must be justified explicitly in `CACI_REBRAND_DECISION.md`.
