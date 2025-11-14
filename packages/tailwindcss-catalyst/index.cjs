const plugin = require('tailwindcss/plugin');

const preset = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        accent: {
          50: 'var(--color-accent-50)',
          100: 'var(--color-accent-100)',
          200: 'var(--color-accent-200)',
          300: 'var(--color-accent-300)',
          400: 'var(--color-accent-400)',
          500: 'var(--color-accent-500)',
          600: 'var(--color-accent-600)',
          700: 'var(--color-accent-700)',
          800: 'var(--color-accent-800)',
          900: 'var(--color-accent-900)',
        },
        neutral: {
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
        },
      },
    },
  },
  plugins: [
    plugin(function catalystBase({ addBase }) {
      addBase({
        ':root': {
          '--color-primary-50': '240 249 255',
          '--color-primary-100': '224 242 254',
          '--color-primary-200': '186 230 253',
          '--color-primary-300': '125 211 252',
          '--color-primary-400': '56 189 248',
          '--color-primary-500': '14 165 233',
          '--color-primary-600': '2 132 199',
          '--color-primary-700': '3 105 161',
          '--color-primary-800': '7 89 133',
          '--color-primary-900': '12 74 110',
          '--color-accent-50': '254 242 242',
          '--color-accent-100': '254 226 226',
          '--color-accent-200': '254 202 202',
          '--color-accent-300': '252 165 165',
          '--color-accent-400': '248 113 113',
          '--color-accent-500': '239 68 68',
          '--color-accent-600': '220 38 38',
          '--color-accent-700': '185 28 28',
          '--color-accent-800': '153 27 27',
          '--color-accent-900': '127 29 29',
          '--color-neutral-50': '250 250 250',
          '--color-neutral-100': '244 244 245',
          '--color-neutral-200': '228 228 231',
          '--color-neutral-300': '212 212 216',
          '--color-neutral-400': '161 161 170',
          '--color-neutral-500': '113 113 122',
          '--color-neutral-600': '82 82 91',
          '--color-neutral-700': '63 63 70',
          '--color-neutral-800': '39 39 42',
          '--color-neutral-900': '24 24 27',
        },
      });
    }),
  ],
};

module.exports = preset;
module.exports.preset = preset;
module.exports.default = preset;
