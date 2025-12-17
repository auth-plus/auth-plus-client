import { defineConfig } from 'vitest/config'
import { sveltekit } from '@sveltejs/kit/vite'
import { svelteTesting } from '@testing-library/svelte/vite'

export default defineConfig({
	plugins: [sveltekit(), svelteTesting()],
	test: {
		coverage: {
			provider: 'v8',
			include: ['src/**/*.svelte'],
		},
		expect: { requireAssertions: true },
		environment: 'jsdom',
		setupFiles: ['./vitest-setup.js'],
		include: ['test/**/*.svelte.test.ts']
	}
})
