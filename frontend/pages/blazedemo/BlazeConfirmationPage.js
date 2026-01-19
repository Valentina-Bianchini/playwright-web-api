const { expect } = require('@playwright/test');

class BlazeConfirmationPage {
  constructor(page) {
    this.page = page;
    this.confirmationHeading = page.getByRole('heading', { name: 'Thank you for your purchase today!' });
    this.confirmationTable = page.locator('table');
    this.transactionId = page.getByRole('cell', { name: /^\d+$/ }).first();
    this.status = page.getByRole('row', { name: /Status/ }).getByRole('cell').last();
    this.amount = page.getByRole('row', { name: /Amount/ }).getByRole('cell').last();
    this.cardNumber = page.getByRole('row', { name: /Card Number/ }).getByRole('cell').last();
    this.authCode = page.getByRole('row', { name: /Auth Code/ }).getByRole('cell').last();
    this.date = page.getByRole('row', { name: /Date/ }).getByRole('cell').last();
  }

  async verifyConfirmationPage() {
    await expect(this.page).toHaveTitle('BlazeDemo Confirmation');
    await expect(this.confirmationHeading).toBeVisible();
    await expect(this.confirmationTable).toBeVisible();
  }

  async verifyTransactionDetails() {
    await expect(this.transactionId).toBeVisible();
    await expect(this.status).toContainText(/PendingCapture|Success|Completed/);
    await expect(this.amount).toBeVisible();
    await expect(this.cardNumber).toContainText('xxxxxxxxxxxx');
    await expect(this.authCode).toBeVisible();
    await expect(this.date).toBeVisible();
  }

  async getTransactionId() {
    return await this.transactionId.textContent();
  }

  async getTransactionStatus() {
    return await this.status.textContent();
  }

  async getTransactionAmount() {
    return await this.amount.textContent();
  }

  async verifyMaskedCardNumber() {
    const cardText = await this.cardNumber.textContent();
    expect(cardText).toMatch(/^xxxxxxxxxxxx\d{4}$/);
  }
}

module.exports = BlazeConfirmationPage;