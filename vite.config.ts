import { defineConfig } from 'vitest/config'
import { sveltekit } from '@sveltejs/kit/vite'
import { svelteTesting } from '@testing-library/svelte/vite'

import adapter from '@sveltejs/adapter-node'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [
    sveltekit({
      adapter: adapter(),
      preprocess: vitePreprocess()
    }),
    svelteTesting()
  ],
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{svelte,ts}', '!src/**/*.d.ts'],
      reporter: ['html', 'lcov'],
      reportsDirectory: './coverage'
    },
    expect: { requireAssertions: true },
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.js'],
    include: ['test/**/*.svelte.test.ts']
  }
})
