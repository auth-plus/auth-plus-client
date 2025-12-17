import { render, screen } from '@testing-library/svelte'
import { describe, test, expect } from 'vitest'

import Modal from '../src/routes/Header.svelte'

describe('Header.svelte', () => {
	test('should render Auth+', () => {
		render(Modal)
		expect(screen.getByText('Auth +')).toBeInTheDocument()
	})
})
