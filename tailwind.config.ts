/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss'

export default {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {},
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
} satisfies Config
