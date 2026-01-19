// spec: specs/blazedemo-test-plan.md  
// seed: frontend/tests/blazedemo-seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('Purchase Form Tests', () => {
  test('Complete purchase with valid data', async ({ page }) => {
    // Navigate to BlazeDemo and search flights
    await page.goto('https://blazedemo.com/');
    await page.locator('select[name="fromPort"]').selectOption('Boston');
    await page.locator('select[name="toPort"]').selectOption('London');
    await page.getByRole('button', { name: 'Find Flights' }).click();

    // Select a flight to reach purchase page
    await page.getByRole('button', { name: 'Choose This Flight' }).first().click();
    await expect(page).toHaveTitle('BlazeDemo Purchase');
    await expect(page.locator('h2')).toContainText('has been reserved');

    // Fill all required personal information fields
    await page.locator('input[name="inputName"]').fill('John Doe');
    await page.locator('input[name="address"]').fill('123 Main Street');
    await page.locator('input[name="city"]').fill('Boston');
    await page.locator('input[name="state"]').fill('MA');
    await page.locator('input[name="zipCode"]').fill('02101');

    // Fill all required credit card information fields
    await page.locator('input[name="creditCardNumber"]').fill('4111111111111111');
    await page.locator('input[name="creditCardMonth"]').fill('12');
    await page.locator('input[name="creditCardYear"]').fill('2025');
    await page.locator('input[name="nameOnCard"]').fill('John Doe');

    // Verify purchase button is enabled after filling forms
    await expect(page.getByRole('button', { name: 'Purchase Flight' })).toBeEnabled();

    // Click Purchase Flight button
    await page.getByRole('button', { name: 'Purchase Flight' }).click();

    // Verify confirmation page
    await expect(page).toHaveTitle('BlazeDemo Confirmation');
    await expect(page.getByRole('heading', { name: 'Thank you for your purchase today!' })).toBeVisible();

    // Verify transaction details table is displayed
    await expect(page.locator('table')).toBeVisible();

    // Verify transaction ID is generated and shown
    const transactionIdRow = page.getByRole('row', { name: /^Id/ });
    await expect(transactionIdRow).toBeVisible();
    const idCell = transactionIdRow.getByRole('cell').last();
    const transactionId = await idCell.textContent();
    expect(transactionId).toMatch(/^\d+$/);

    // Verify additional transaction details
    await expect(page.getByRole('row', { name: /Status/ })).toBeVisible();
    await expect(page.getByRole('row', { name: /Amount/ })).toBeVisible();
    await expect(page.getByRole('row', { name: /Card Number/ })).toContainText('xxxxxxxxxxxx1111');
  });
});