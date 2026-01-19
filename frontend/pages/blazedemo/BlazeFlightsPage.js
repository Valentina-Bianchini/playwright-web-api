const { expect } = require('@playwright/test');

class BlazeFlightsPage {
  constructor(page) {
    this.page = page;
    this.flightsTable = page.locator('table');
    this.chooseFlightButtons = page.getByRole('button', { name: 'Choose This Flight' });
    this.flightsHeading = page.locator('h3');
  }

  async verifyFlightsPage(fromCity, toCity) {
    await expect(this.page).toHaveTitle('BlazeDemo - reserve');
    await expect(this.flightsHeading).toContainText(`Flights from ${fromCity} to ${toCity}`);
    await expect(this.flightsTable).toBeVisible();
  }

  async selectFlight(flightIndex = 0) {
    await this.chooseFlightButtons.nth(flightIndex).click();
  }

  async selectFlightByAirline(airlineName) {
    const flightRow = this.page.getByRole('row').filter({ hasText: airlineName });
    await flightRow.getByRole('button', { name: 'Choose This Flight' }).click();
  }

  async verifyFlightsList() {
    await expect(this.chooseFlightButtons.first()).toBeVisible();
    const flightCount = await this.chooseFlightButtons.count();
    expect(flightCount).toBeGreaterThan(0);
  }

  async getFlightPrice(flightIndex = 0) {
    const flightRow = this.page.locator('tbody tr').nth(flightIndex);
    const priceCell = flightRow.locator('td').last();
    return await priceCell.textContent();
  }
}

module.exports = BlazeFlightsPage;