import { expect, test } from '@playwright/test'

test('home page has expected h1', async ({ page }) => {
	await page.goto('/')
	const navElement = page.locator('nav');
	await expect(navElement).toBeVisible()
	await expect(navElement).toContainText('Auth +');
})
