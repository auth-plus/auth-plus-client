import { render, screen, fireEvent } from '@testing-library/svelte'
import { describe, test, expect, vi } from 'vitest'
import Modal from './Menu.svelte'

// A simple wrapper component to help test slot content
import { SvelteComponent } from 'svelte'
class SlotWrapper extends SvelteComponent {
	constructor(options) {
		super({
			...options,
			props: {
				...options.props,
				// A simple way to pass down a template for the slot
				component: {
					template: `<h1>Modal Title</h1><p>Modal content goes here.</p>`
				}
			}
		})
	}
}

describe('Modal.svelte', () => {
	test('should not render the modal when "open" is false', () => {
		render(Modal, { props: { open: false } })
		// `queryByRole` is used because it returns null if not found, unlike `getByRole` which throws an error.
		const dialog = screen.queryByRole('dialog')
		expect(dialog).not.toBeInTheDocument()
	})

	test('should render the modal and its slot content when "open" is true', () => {
		render(Modal, {
			props: { open: true },
			slots: {
				default: {
					component: SlotWrapper
				}
			}
		})

		const dialog = screen.getByRole('dialog')
		expect(dialog).toBeInTheDocument()

		// Check for content passed into the slot
		expect(screen.getByRole('heading', { name: 'Modal Title' })).toBeInTheDocument()
		expect(screen.getByText('Modal content goes here.')).toBeInTheDocument()
	})

	test('should dispatch a "close" event when the close button is clicked', async () => {
		const { component } = render(Modal, { props: { open: true } })
		const mockCloseEvent = vi.fn()
		component.$on('close', mockCloseEvent)

		const closeButton = screen.getByLabelText('Close modal')
		await fireEvent.click(closeButton)

		expect(mockCloseEvent).toHaveBeenCalledTimes(1)
	})

	test('should dispatch a "close" event when the overlay is clicked', async () => {
		const { component } = render(Modal, { props: { open: true } })
		const mockCloseEvent = vi.fn()
		component.$on('close', mockCloseEvent)

		// The overlay has a role of 'presentation' in our component
		const overlay = screen.getByRole('presentation')
		await fireEvent.click(overlay)

		expect(mockCloseEvent).toHaveBeenCalledTimes(1)
	})

	test('should not dispatch a "close" event when the modal content area is clicked', async () => {
		const { component } = render(Modal, { props: { open: true } })
		const mockCloseEvent = vi.fn()
		component.$on('close', mockCloseEvent)

		const dialog = screen.getByRole('dialog')
		await fireEvent.click(dialog)

		// The event should not have been dispatched because of `on:click|stopPropagation`
		expect(mockCloseEvent).not.toHaveBeenCalled()
	})

	test('should dispatch a "close" event when the Escape key is pressed', async () => {
		const { component } = render(Modal, { props: { open: true } })
		const mockCloseEvent = vi.fn()
		component.$on('close', mockCloseEvent)

		// Fire a 'keydown' event on the window
		await fireEvent.keyDown(window, { key: 'Escape' })

		expect(mockCloseEvent).toHaveBeenCalledTimes(1)
	})
})
