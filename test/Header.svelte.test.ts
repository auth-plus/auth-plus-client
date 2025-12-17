import { render, screen } from '@testing-library/svelte'
import { describe, test, expect } from 'vitest'

import Modal from '../src/routes/Header.svelte'

describe('Header.svelte', () => {
	test('should render Auth+', () => {
		render(Modal)
		// `queryByRole` is used because it returns null if not found, unlike `getByRole` which throws an error.
		const nav = screen.queryAllByText('Auth +')
		if (nav.length != 1) {
			throw new Error('Should have only one')
		}
		expect(nav[0]).toBeInTheDocument()
	})
})
