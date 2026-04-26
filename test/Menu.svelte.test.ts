import { render, screen } from '@testing-library/svelte'
import { describe, test, expect } from 'vitest'

import Menu from '../src/routes/Menu.svelte'

describe('Menu.svelte', () => {
  test('should render navigation menu with links and logout button', () => {
    render(Menu)
    expect(screen.getByText('HOME')).toBeInTheDocument()
    expect(screen.getByText('HOME')).toHaveAttribute('href', '/')

    expect(screen.getByTestId('login-button')).toBeInTheDocument()
  })
})
