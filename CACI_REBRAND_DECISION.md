# CACI Rebrand — Strategic Decision

**Question:** Should the CACI demo go full cream-shell, or hybrid (cream chrome + darker data-dense panels)?

**Decision: FULL CREAM**, faithful to the v72/db85843 canonical system, with three disciplined concessions for operational authority.

---

## Rationale

### 1. Brand alignment
The canonical reference is unambiguous. The v72-preview branch contains an explicit earlier commit — `5117e63 Design: apply Signal & System v2 two-tier theme tokens`, followed by `1dd3170 Redesign: dark-first Signal & System pass across V7.2` — where the team attempted a dark-first pass and **rejected it**. The next two commits (`a0c054e Redesign: light cream shell + solid gold CTA system` and `a249287 Redesign: propagate cream shell through all body sections`) mark the deliberate move to full cream. The final checkpoint `db85843` remaps every `--pharos-bg-*` dark token to a cream value.

A hybrid model would reintroduce the exact polarity the reference team deliberately removed. That is thematic drift, not translation.

### 2. Demo effectiveness
The CACI demo's audience is federal executives and BD leadership. In that context:
- **Cream + charcoal + editorial hierarchy** reads as "institutional, considered, official" — closer to The Economist / Bloomberg Opinion / a federal briefing binder.
- **Dark-first SaaS console** reads as "vendor dashboard" — the default aesthetic of every DevOps tool on the market. It's the aesthetic CACI already owns; Pharos needs to contrast it.

The redesign's strategic signal is "Pharos is the operating layer, not another console." Going full cream reinforces that. Going hybrid hedges it.

### 3. Implementation leverage
Full cream is paradoxically *less* work than hybrid, because:
- A single `tailwind.config.js` + `globals.css` rewrite rebinds all `bg-pharos-card`, `bg-pharos-bg`, `border-pharos-border`, `bg-card`, `border-border`, `text-muted-foreground`, `text-foreground` usages at once.
- Hybrid requires decisions per-page: which stays dark, which goes cream, how they visually bridge. That's 14 judgment calls × 14 crew pages.
- The token rebind approach ships the whole app in one atomic change. Hybrid requires per-page migration.

---

## Three disciplined concessions

These are not a hybrid — they are within-cream differentiation using the v72 vocabulary.

### 1. Aegis governance retains purple
The v72 canonical system does not define purple. But the CACI demo uses `pharos-purple (#A78BFA)` as a governance/audit signal. Removing it flattens the "governance is structurally different from the operational crews" narrative that is core to this demo.

**Resolution:** Keep `pharos.purple` as a token, but **scope it** to:
- The Aegis compliance pulse in the header
- `/governance` page accents (score ring, policy category headers)
- `AegisFooter` shield icon
Nothing else. Purple never appears in shell chrome, crew pages, or CTAs.

### 2. Data-dense tables sit on `--ph-surface` (white) within `--ph-bg` (cream)
This is exactly the v72 pattern — cards are white (`#FFFFFF`) on cream (`#F6F4EE`). It reads as "structured data surface" without going dark. We do not need a darker panel for tables.

### 3. Governance page uses `--ph-surface-sunk` insets for audit log rows
Rather than a darker panel, use the 1-shade-down cream (`#EEEBE2`) as an inset surface for the audit trail — same pattern v72 uses for its scrollbar track and sunk panels. This gives the page its visual authority without breaking polarity.

---

## What this means concretely

- The outer shell (nav, sidebar, header, page background) becomes cream.
- All cards become white on cream with `--ph-border` hairlines.
- All body text becomes ink (`#0F0F0E`) + ink-soft / ink-muted.
- Accent CTAs become solid gold with `shadow-cta`.
- Teal becomes an accent and focus color, not a background.
- Dashboard hero rebuilds around the v72 hero pattern: `ph-rule` + `ph-eyebrow` + `ph-h1` with one italic Fraunces accent phrase + solid-gold primary CTA.
- Aegis/governance retains purple scoped to governance surfaces only.
- Typography loads Inter + JetBrains Mono + Fraunces via the canonical Google Fonts import.

---

## What we explicitly will NOT do

- No darker panels inside the cream shell for operational screens.
- No introduction of new colors or gradients beyond the two v72 canonical gradients.
- No redesign of information architecture, suites, crews, or metric hierarchy.
- No copy rewrites (only minimal clarifications if a color swap makes a phrase unreadable).
- No Fraunces at body sizes, no multiple italic phrases per hero.
- No "beige SaaS" softening of operational density — the cream retains executive tension via hairline borders, editorial eyebrows, and tight type.

---

## Confidence

**High.** The reference repo's own commit history validates this path: the team actively trialed and rejected dark-first, then propagated cream shell through all body sections. We are following their documented decision.

---

## Second-pass re-evaluation (after build + live QA)

After the build failure was fixed and a live `npm run dev` QA sweep was run, I re-checked the decision against the actual rendered app (dashboard, executive-command, license-intelligence, contract-performance, operator-assistant, governance).

**Decision held: full cream. No hybrid refinement needed.**

What the live app confirmed:
- Dashboard hero (`Pharos` + italic Fraunces `Command` + `Center`) reads as editorial and federal, not SaaS-beige.
- MetricCard grids on crew pages (executive-command, contract-performance) retain operational density without any dark-panel treatment — white-card-on-cream plus hairline borders is enough hierarchy.
- Data tables (license-intelligence tool inventory) stay readable; ink / ink-muted / ink-faint tiering does the work on cream.
- Charts (contract-performance donut, dashboard stats) render with strong teal/gold/red on white — no contrast loss versus the dark original.
- Aegis governance page keeps clear identity via `pharos-purple` accents on score, RMF functions, audit trail, and the header compliance pulse. It does NOT blend into the rest of the app.
- The operator-assistant chat surface also uses purple — intentional, because it IS the human-AI governance interface where every query hits the Aegis audit trail. Purple there is on-concept, not bleed.

What I pressure-tested and accepted:
- License-intelligence uses `bg-pharos-blue/10` for a "Last scanned" badge and the "All" filter button. At low opacity on cream the blue reads faintly purple-ish in screenshot compression but resolves cleanly in live DOM (`#2563EB` at 10%). Not purple bleed; the suite color legitimately shows.
- The flat-white card treatment (no default shadow) matches v72's `.stat-card` / `.content-card` — shadow only appears on hover. Kept exactly that.

One targeted second-pass polish was applied, inside the cream decision:
- `MetricCard` now gets a hover lift (`hover:border-teal/45 hover:shadow-md hover:-translate-y-0.5`) and the label scale was tightened to a mono-like `uppercase tracking-[0.08em]` treatment — mirroring v72's stat-card interaction and giving the grid visible response without introducing a darker panel.

No hybrid pivot. No surface darkening. No new tokens.
