const { expect } = require('@playwright/test');

class BlazeHomePage {
  constructor(page) {
    this.page = page;
    this.departureDropdown = page.locator('select[name="fromPort"]');
    this.destinationDropdown = page.locator('select[name="toPort"]');
    this.findFlightsButton = page.getByRole('button', { name: 'Find Flights' });
    this.welcomeHeading = page.getByRole('heading', { name: 'Welcome to the Simple Travel Agency!' });
  }

  async navigate() {
    await this.page.goto('https://blazedemo.com/');
    await expect(this.page).toHaveTitle('BlazeDemo');
  }

  async selectDepartureCity(city) {
    await this.departureDropdown.selectOption(city);
  }

  async selectDestinationCity(city) {
    await this.destinationDropdown.selectOption(city);
  }

  async searchFlights() {
    await this.findFlightsButton.click();
  }

  async verifyHomePage() {
    await expect(this.welcomeHeading).toBeVisible();
    await expect(this.departureDropdown).toBeVisible();
    await expect(this.destinationDropdown).toBeVisible();
    await expect(this.findFlightsButton).toBeVisible();
  }
}

module.exports = BlazeHomePage;