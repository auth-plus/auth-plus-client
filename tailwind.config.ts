import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography' // Import here
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {}
  },

  plugins: [typography]
} as Config
