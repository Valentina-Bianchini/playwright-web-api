// spec: specs/blazedemo-test-plan.md  
// seed: frontend/tests/blazedemo-seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('Flight Selection Tests', () => {
  test('Select first available flight', async ({ page }) => {
    // Navigate to BlazeDemo homepage
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveTitle('BlazeDemo');
    
    // Search for flights from Boston to London
    await page.locator('select[name="fromPort"]').selectOption('Boston');
    await page.locator('select[name="toPort"]').selectOption('London');
    await page.getByRole('button', { name: 'Find Flights' }).click();
    
    // Verify flight search returns multiple results
    await expect(page).toHaveTitle('BlazeDemo - reserve');
    await expect(page.getByRole('heading', { name: 'Flights from Boston to London:' })).toBeVisible();
    
    // Verify first Choose This Flight button is clickable
    const chooseButtons = page.getByRole('button', { name: 'Choose This Flight' });
    await expect(chooseButtons.first()).toBeVisible();
    await expect(chooseButtons.first()).toBeEnabled();
    
    // Click Choose This Flight button for the first flight
    await chooseButtons.first().click();
    
    // Verify purchase page loads with flight details
    await expect(page).toHaveTitle('BlazeDemo Purchase');
    await expect(page.locator('h2')).toContainText('has been reserved');
    
    // Verify purchase form is visible and ready for input
    await expect(page.getByRole('textbox', { name: 'Name', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Purchase Flight' })).toBeVisible();
  });
});