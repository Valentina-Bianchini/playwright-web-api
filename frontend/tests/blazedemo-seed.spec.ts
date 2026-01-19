import { test, expect } from '@playwright/test';

test.describe('BlazeDemo Seed', () => {
  test('navigate to BlazeDemo homepage', async ({ page }) => {
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveTitle('BlazeDemo');
    await expect(page.getByRole('heading', { name: 'Welcome to the Simple Travel Agency!' })).toBeVisible();
  });
});