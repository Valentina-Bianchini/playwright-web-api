// spec: specs/blazedemo-test-plan.md  
// seed: frontend/tests/blazedemo-seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('Flight Search Tests', () => {
  test('Search flights with valid route', async ({ page }) => {
    // Navigate to BlazeDemo homepage
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveTitle('BlazeDemo');
    await expect(page.getByRole('heading', { name: 'Welcome to the Simple Travel Agency!' })).toBeVisible();

    // Select Boston as departure city
    await page.locator('select[name="fromPort"]').selectOption('Boston');
    
    // Select London as destination city  
    await page.locator('select[name="toPort"]').selectOption('London');
    
    // Click Find Flights button
    await page.getByRole('button', { name: 'Find Flights' }).click();
    
    // Verify flights page displays with results from Boston to London
    await expect(page).toHaveTitle('BlazeDemo - reserve');
    await expect(page.getByRole('heading', { name: 'Flights from Boston to London:' })).toBeVisible();
    
    // Verify flight table contains multiple flight options
    await expect(page.locator('table')).toBeVisible();
    const chooseButtons = page.getByRole('button', { name: 'Choose This Flight' });
    await expect(chooseButtons.first()).toBeVisible();
    
    // Verify each flight row has Choose This Flight button
    const buttonCount = await chooseButtons.count();
    expect(buttonCount).toBeGreaterThan(0);
  });
});