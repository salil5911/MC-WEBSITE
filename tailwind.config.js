import { type Config } from "tailwindcss"

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          mint: '#50D5B7',
          mintLight: '#7FFFD4',
          mintDark: '#2A9D8F',
          dark: '#1A1A1A',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'circuit-pattern': 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.343 0L13.8 8.544 15.214 9.96l9.9-9.9h-2.77zM32 0l-3.657 3.657 1.414 1.414L33.03 2l2.828-2H32zM0 5.373l.828.828L2.243 5.96 0 3.73V5.37zm0 5.656l.828.828L2.243 11.6 0 9.37v1.7zm0 5.657l.828.828L2.243 17.256 0 15.027v1.7zm0 5.657l.828.828L2.243 22.912 0 20.683v1.7zm0 5.657l.828.828L2.243 28.57 0 26.34v1.7zm0 5.657l.828.828L2.243 34.226 0 31.997v1.7zm0 5.657l.828.828L2.243 39.883 0 37.654v1.7zm0 5.657l.828.828L2.243 45.54 0 43.31v1.7zm0 5.657l.828.828L2.243 51.196 0 48.967v1.7zm0 5.657l.828.828L2.243 56.853 0 54.624v1.7zm0 5.657l.828.828L2.243 62.51 0 60.28v1.7zm5.373 5.657l.828-.828L5.96 57.757 3.73 60h1.642zm5.657 0l.828-.828-1.415-1.415L8.2 60h2.827zm5.657 0l.828-.828-1.415-1.415-3.243 3.243h2.827zm5.657 0l.828-.828-1.415-1.415-3.243 3.243h2.827zm5.657 0l.828-.828-1.415-1.415-3.243 3.243h2.827zm5.657 0l.828-.828-1.415-1.415-3.243 3.243h2.827zm5.657 0l.828-.828-1.415-1.415-3.243 3.243h2.827zm5.657 0l.828-.828-1.415-1.415-3.243 3.243h2.827zm5.657 0l.828-.828-1.415-1.415-3.243 3.243h2.827zm5.657 0l.828-.828-1.415-1.415L51.8 60h2.827zm5.657 0l.828-.828-1.415-1.415L57.457 60h2.827zm-39.598-5.657l.828.828 1.415-1.415-2.243-2.243v2.83zm5.657 0l.828.828 1.415-1.415-2.243-2.243v2.83zm5.657 0l.828.828 1.415-1.415-2.243-2.243v2.83zm5.657 0l.828.828 1.415-1.415-2.243-2.243v2.83zm5.657 0l.828.828 1.415-1.415-2.243-2.243v2.83zm5.657 0l.828.828 1.415-1.415-2.243-2.243v2.83zm5.657 0l.828.828 1.415-1.415-2.243-2.243v2.83zm5.657 0l.828.828 1.415-1.415-2.243-2.243v2.83z\' fill=\'%2350D5B7\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} satisfies Config

