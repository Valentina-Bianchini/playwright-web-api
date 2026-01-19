// spec: specs/blazedemo-test-plan.md  
// seed: frontend/tests/blazedemo-seed.spec.ts

const { test, expect } = require('@playwright/test');
const BlazeDataHelper = require('../../utils/blazeDataHelper.js');

test.describe('End-to-End Booking Tests', () => {
  test('Booking with CSV test data', async ({ page }) => {
    // Load customer data from CSV file
    const dataHelper = new BlazeDataHelper();
    const customers = dataHelper.getCustomersData();
    expect(customers.length).toBeGreaterThan(0);
    
    const testCustomer = customers[0]; // Using first customer: John Doe
    
    // Navigate to BlazeDemo homepage
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveTitle('BlazeDemo');

    // Search flights Boston to London
    await page.locator('select[name="fromPort"]').selectOption('Boston');
    await page.locator('select[name="toPort"]').selectOption('London');
    await page.getByRole('button', { name: 'Find Flights' }).click();

    await expect(page).toHaveTitle('BlazeDemo - reserve');
    await expect(page.getByRole('heading', { name: 'Flights from Boston to London:' })).toBeVisible();

    // Select cheapest flight option (Aer Lingus $200.98)
    const cheapestFlight = page.getByRole('row', { name: /Choose This Flight.*Aer Lingus.*\$200\.98/ });
    await expect(cheapestFlight).toBeVisible();
    await cheapestFlight.getByRole('button').click();

    await expect(page).toHaveTitle('BlazeDemo Purchase');
    await expect(page.locator('h2')).toContainText('has been reserved');

    // Fill form with CSV customer data
    await page.locator('input[name="inputName"]').fill(testCustomer.name);
    await page.locator('input[name="address"]').fill(testCustomer.address);
    await page.locator('input[name="city"]').fill(testCustomer.city);
    await page.locator('input[name="state"]').fill(testCustomer.state);
    await page.locator('input[name="zipCode"]').fill(testCustomer.zipCode);

    // Set card type from CSV data
    await page.locator('select[name="cardType"]').selectOption(testCustomer.cardType);
    
    await page.locator('input[name="creditCardNumber"]').fill(testCustomer.cardNumber);
    await page.locator('input[name="creditCardMonth"]').fill(testCustomer.month);
    await page.locator('input[name="creditCardYear"]').fill(testCustomer.year);
    await page.locator('input[name="nameOnCard"]').fill(testCustomer.nameOnCard);

    // Complete purchase transaction
    await page.getByRole('button', { name: 'Purchase Flight' }).click();

    // Validate confirmation details
    await expect(page).toHaveTitle('BlazeDemo Confirmation');
    await expect(page.getByRole('heading', { name: 'Thank you for your purchase today!' })).toBeVisible();

    // Verify transaction ID is generated
    const transactionIdRow = page.getByRole('row', { name: /^Id/ });
    await expect(transactionIdRow).toBeVisible();
    const transactionId = await transactionIdRow.getByRole('cell').last().textContent();
    expect(transactionId).toMatch(/^\d+$/);

    // Verify payment details match CSV data (masked card number)
    await expect(page.getByRole('row', { name: /Card Number/ })).toContainText('xxxxxxxxxxxx1111');
    
    // Verify other transaction details
    await expect(page.getByRole('row', { name: /Status/ })).toBeVisible();
    await expect(page.getByRole('row', { name: /Amount/ })).toBeVisible();
    await expect(page.getByRole('row', { name: /Auth Code/ })).toBeVisible();
    await expect(page.getByRole('row', { name: /Date/ })).toBeVisible();
  });
});