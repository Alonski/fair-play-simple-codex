import type { Config } from 'tailwindcss';
import catalystPreset from '@tailwindcss/catalyst';

const config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  presets: [catalystPreset],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
    },
  },
} satisfies Config;

export default config;
