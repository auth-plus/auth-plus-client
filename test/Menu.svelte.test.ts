import { render, screen } from '@testing-library/svelte'
import { describe, test, expect } from 'vitest'

import Header from '../src/routes/Menu.svelte'

describe('Header.svelte', () => {
	test('should render Auth+', () => {
		render(Header)
		expect(screen.getByText('HOME')).toBeInTheDocument()
		expect(screen.getByText('HOME')).toHaveAttribute('href', '/')

		expect(screen.getByText('INVOICES')).toBeInTheDocument()
		expect(screen.getByText('INVOICES')).toHaveAttribute('href', '/invoices')

		expect(screen.getByText('MFA')).toBeInTheDocument()
		expect(screen.getByText('MFA')).toHaveAttribute('href', '/mfa')

		expect(screen.getByText('USERS')).toBeInTheDocument()
		expect(screen.getByText('USERS')).toHaveAttribute('href', '/users')

		expect(screen.getByTestId('logout-button')).toBeInTheDocument()
		expect(screen.getByTestId('logout-button')).toHaveClass('isDisabled')
	})
})
