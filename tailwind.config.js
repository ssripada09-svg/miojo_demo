import tailwindcssAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config}
 * Pharos Signal & System — cream shell (v72 / db85843 canonical).
 *
 * `pharos.*` tokens are REBOUND from dark hex to cream CSS variables so every
 * `bg-pharos-card`, `bg-pharos-bg`, `border-pharos-border` usage across the
 * existing CACI demo flips to cream automatically.
 *
 * `pharos.teal`, `pharos.gold`, `pharos.purple`, `pharos.blue` retain their hex
 * values — they are already canonical.
 */
const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        // ---- pharos.* rebound to Miojo deck palette (cream + forest + clay + sage) ----
        pharos: {
          bg:     'var(--ph-bg)',           // cream page background
          card:   'var(--ph-surface)',      // sand-cream card
          border: 'var(--ph-border-strong)',// hairline on cream
          teal:   '#828651',                // sage (was Pharos teal)
          gold:   '#9C2B28',                // clay / brick (was Pharos gold)
          purple: '#545727',                // sage-deep (legacy Trust accent)
          blue:   '#1B2820',                // forest (legacy)
        },

        // ---- Miojo deck palette aliases (use these in new code) ----
        forest: {
          DEFAULT: 'var(--mj-forest)',
          soft:    'var(--mj-forest-soft)',
          deep:    'var(--mj-forest-deep)',
          tint:    'var(--mj-forest-tint)',
          glow:    'var(--mj-forest-glow)',
        },
        clay: {
          DEFAULT: 'var(--mj-clay)',
          strong:  'var(--mj-clay-strong)',
          fire:    'var(--mj-fire)',
          tint:    'var(--mj-fire-tint)',
        },
        sage: {
          DEFAULT: 'var(--mj-sage)',
          strong:  'var(--mj-sage-strong)',
          deep:    'var(--mj-sage-deep)',
          tint:    'var(--mj-sage-tint)',
        },
        peach: {
          DEFAULT: 'var(--mj-peach)',
          strong:  'var(--mj-peach-strong)',
          tint:    'var(--mj-peach-tint)',
        },

        // ---- v72 shell tokens ----
        bg:             'var(--ph-bg)',
        'bg-raised':    'var(--ph-bg-raised)',
        surface:        'var(--ph-surface)',
        'surface-sunk': 'var(--ph-surface-sunk)',

        ink: {
          DEFAULT: 'var(--ph-ink)',
          soft:    'var(--ph-ink-soft)',
          muted:   'var(--ph-ink-muted)',
          faint:   'var(--ph-ink-faint)',
          ghost:   'var(--ph-ink-ghost)',
          invert:  'var(--ph-ink-on-accent)',
        },

        teal: {
          DEFAULT: 'var(--ph-teal)',
          strong:  'var(--ph-teal-strong)',
          deep:    'var(--ph-teal-deep)',
          tint:    'var(--ph-teal-tint)',
          glow:    'var(--ph-teal-glow)',
          400:     'var(--ph-teal)',
          500:     'var(--ph-teal-strong)',
          600:     'var(--ph-teal-deep)',
          700:     'var(--ph-teal-deep)',
        },
        gold: {
          DEFAULT: 'var(--ph-gold)',
          strong:  'var(--ph-gold-strong)',
          deep:    'var(--ph-gold-deep)',
          tint:    'var(--ph-gold-tint)',
        },

        // Semantic status
        pass:    'var(--ph-success)',
        fail:    'var(--ph-danger)',
        warning: 'var(--ph-warn)',
        success: 'var(--ph-success)',
        danger:  'var(--ph-danger)',

        // ---- shadcn HSL-bound tokens ----
        border:     'hsl(var(--border))',
        input:      'hsl(var(--input))',
        ring:       'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        hairline: 'var(--ph-hairline)',
      },

      fontFamily: {
        sans:  ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Fraunces', 'Georgia', 'serif'],
        mono:  ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xs: '2px',
        xl: '20px',
        pill: '999px',
      },

      boxShadow: {
        xs:  'var(--ph-shadow-xs)',
        sm:  'var(--ph-shadow-sm)',
        md:  'var(--ph-shadow-md)',
        lg:  'var(--ph-shadow-lg)',
        cta: 'var(--ph-shadow-cta)',
      },

      backgroundImage: {
        'grad-timeline': 'var(--ph-grad-timeline)',
        'grad-display':  'var(--ph-grad-display)',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
      },

      maxWidth: {
        container: '1280px',
        content:   '1440px',
        prose:     '640px',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
