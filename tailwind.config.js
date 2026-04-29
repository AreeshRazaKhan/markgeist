/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/hooks/**/*.{js,jsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1400px' }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        'border-hot': 'hsl(var(--border-hot))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        bg: 'hsl(var(--bg))',
        surface: 'hsl(var(--surface))',
        steel: 'hsl(var(--steel))',
        ink: 'hsl(var(--ink))',
        mute: 'hsl(var(--mute))',
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        ember: 'hsl(var(--ember))',
        live: 'hsl(var(--live))',
        olive: 'hsl(var(--olive))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        }
      },
      borderRadius: {
        lg: '0',
        md: '0',
        sm: '0',
        none: '0'
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sub)', 'Impact', 'system-ui', 'sans-serif'],
        sub: ['var(--font-sub)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace']
      },
      letterSpacing: {
        tightest: '-0.04em',
        display: '-0.01em',
        hud: '0.18em',
        hudWide: '0.22em'
      },
      zIndex: {
        canvas: '0',
        content: '1',
        nav: '40',
        overlay: '50',
        hud: '60'
      },
      transitionTimingFunction: {
        ignite: 'cubic-bezier(0.22, 1, 0.36, 1)',
        scrub: 'cubic-bezier(0.65, 0, 0.35, 1)'
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(100%)' }
        },
        ping: {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' }
        }
      },
      animation: {
        scan: 'scan 6s linear infinite',
        ping: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}

module.exports = config
