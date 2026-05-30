import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0F172A',
        sky: {
          DEFAULT: '#0EA5E9',
          light: '#38BDF8',
          pale: '#F0F9FF',
        },
        green: {
          DEFAULT: '#22C55E',
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(15, 23, 42, 0.06)',
        'card-hover': '0 4px 16px rgba(15, 23, 42, 0.1)',
      },
    },
  },
}

export default config
