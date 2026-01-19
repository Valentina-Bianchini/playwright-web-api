const { expect } = require('@playwright/test');

class BlazePurchasePage {
  constructor(page) {
    this.page = page;
    
    // Form fields
    this.nameField = page.getByRole('textbox', { name: 'Name', exact: true });
    this.addressField = page.getByRole('textbox', { name: 'Address' });
    this.cityField = page.getByRole('textbox', { name: 'City' });
    this.stateField = page.getByRole('textbox', { name: 'State' });
    this.zipCodeField = page.getByRole('textbox', { name: 'Zip Code' });
    this.cardTypeDropdown = page.locator('select[name="cardType"]');
    this.cardNumberField = page.getByRole('textbox', { name: 'Credit Card Number' });
    this.monthField = page.getByRole('textbox', { name: 'Month' });
    this.yearField = page.getByRole('textbox', { name: 'Year' });
    this.nameOnCardField = page.getByRole('textbox', { name: 'Name on Card' });
    this.rememberMeCheckbox = page.getByRole('checkbox', { name: 'Remember me' });
    this.purchaseButton = page.getByRole('button', { name: 'Purchase Flight' });
    
    // Flight details
    this.flightDetails = page.locator('h2');
    this.totalCostElement = page.locator('em');
  }

  async verifyPurchasePage() {
    await expect(this.page).toHaveTitle('BlazeDemo Purchase');
    await expect(this.flightDetails).toBeVisible();
    await expect(this.purchaseButton).toBeVisible();
  }

  async fillPersonalInfo(personalInfo) {
    await this.nameField.fill(personalInfo.name);
    await this.addressField.fill(personalInfo.address);
    await this.cityField.fill(personalInfo.city);
    await this.stateField.fill(personalInfo.state);
    await this.zipCodeField.fill(personalInfo.zipCode);
  }

  async fillCreditCardInfo(cardInfo) {
    if (cardInfo.cardType) {
      await this.cardTypeDropdown.selectOption(cardInfo.cardType);
    }
    await this.cardNumberField.fill(cardInfo.cardNumber);
    await this.monthField.fill(cardInfo.month);
    await this.yearField.fill(cardInfo.year);
    await this.nameOnCardField.fill(cardInfo.nameOnCard);
  }

  async completePurchase() {
    await this.purchaseButton.click();
  }

  async getTotalCost() {
    return await this.totalCostElement.textContent();
  }

  async checkRememberMe() {
    await this.rememberMeCheckbox.check();
  }

  async verifyFlightReservation() {
    await expect(this.flightDetails).toContainText('has been reserved');
  }
}

module.exports = BlazePurchasePage;