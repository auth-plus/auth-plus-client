import { render, screen } from '@testing-library/svelte'
import { describe, test, expect } from 'vitest'

import Header from '../src/routes/Header.svelte'

describe('Header.svelte', () => {
	test('should render Auth+', () => {
		render(Header)
		expect(screen.getByText('Auth +')).toBeInTheDocument()
	})
})
