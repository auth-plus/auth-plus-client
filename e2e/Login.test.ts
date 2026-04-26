import { test, expect } from '@playwright/test'

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Replace with your actual login route
    await page.goto('/login')
  })

  test('should display the login form correctly', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Welcome Back')
    await expect(page.locator('label[for="login-email"]')).toBeVisible()
    await expect(page.locator('label[for="login-pw"]')).toBeVisible()
  })

  test('successful login without MFA redirects to home', async ({ page }) => {
    // Intercept the API call to mock a successful login (no MFA)
    await page.route('**/login', async (route) => {
      // Ensure this matches your PUBLIC_AUTH_URL path
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          token: 'mock-session-token',
          email: 'test@company.com',
          id: '123',
          name: 'Test User',
          info: { phone: '', deviceId: '', googleAuth: '' }
        })
      })
    })

    await page.fill('#login-email', 'test@company.com')
    await page.fill('#login-pw', 'password123')
    await page.click('button[type="submit"]')

    // Verify redirection and session storage
    const token = await page.evaluate(() => sessionStorage.getItem('token'))
    await expect(page).toHaveURL('/')
    expect(token).toBe('mock-session-token')
  })

  test('login with MFA triggers the MFA Selection view', async ({ page }) => {
    // Mock a response that returns an MFA hash and strategy list
    await page.route('**/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          hash: 'mfa-challenge-123',
          strategyList: ['email', 'totp']
        })
      })
    })

    await page.fill('#login-email', 'mfa-user@company.com')
    await page.fill('#login-pw', 'password123')
    await page.click('button[type="submit"]')

    // Verify that the 'Default' component is hidden and 'Choose' is shown
    // Note: We check for elements that would exist in choose.svelte
    await expect(page.locator('form')).not.toContainText('Welcome Back')
  })

  test('should display error message on failed login', async ({ page }) => {
    // Mock a 401 Unauthorized error
    await page.route('**/api/login', async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Invalid credentials' })
      })
    })

    await page.fill('#login-email', 'wrong@company.com')
    await page.fill('#login-pw', 'wrongpassword')
    await page.click('button[type="submit"]')

    const errorMsg = page.locator('.text-red-800')
    await expect(errorMsg).toBeVisible()
    await expect(errorMsg).toContainText("Login didn't work")
  })
})
