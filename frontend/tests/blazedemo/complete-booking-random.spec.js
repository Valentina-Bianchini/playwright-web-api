// spec: specs/blazedemo-test-plan.md  
// seed: frontend/tests/blazedemo-seed.spec.ts

const { test, expect } = require('@playwright/test');
const BlazeHomePage = require('../../pages/blazedemo/BlazeHomePage');
const BlazeFlightsPage = require('../../pages/blazedemo/BlazeFlightsPage');
const BlazePurchasePage = require('../../pages/blazedemo/BlazePurchasePage');
const BlazeConfirmationPage = require('../../pages/blazedemo/BlazeConfirmationPage');

test.describe('End-to-End Booking Tests', () => {
  test('Complete booking flow with random data using Page Objects', async ({ page }) => {
    // Initialize page objects
    const homePage = new BlazeHomePage(page);
    const flightsPage = new BlazeFlightsPage(page);
    const purchasePage = new BlazePurchasePage(page);
    const confirmationPage = new BlazeConfirmationPage(page);

    // Navigate to BlazeDemo homepage
    await homePage.navigate();
    await homePage.verifyHomePage();

    // Select random departure and destination cities
    const cities = ['Boston', 'Paris', 'Philadelphia'];
    const destinations = ['London', 'Rome', 'Berlin'];
    
    const randomFrom = cities[Math.floor(Math.random() * cities.length)];
    const randomTo = destinations[Math.floor(Math.random() * destinations.length)];

    await homePage.selectDepartureCity(randomFrom);
    await homePage.selectDestinationCity(randomTo);

    // Search for flights
    await homePage.searchFlights();

    // Verify flights page and select a random flight
    await flightsPage.verifyFlightsPage(randomFrom, randomTo);
    await flightsPage.verifyFlightsList();
    
    const randomFlightIndex = Math.floor(Math.random() * 3); // Choose from first 3 flights
    await flightsPage.selectFlight(randomFlightIndex);

    // Verify purchase page and fill with random data
    await purchasePage.verifyPurchasePage();
    await purchasePage.verifyFlightReservation();

    // Generate random customer data
    const randomCustomer = {
      name: `Test User ${Math.floor(Math.random() * 1000)}`,
      address: `${Math.floor(Math.random() * 999)} Random St`,
      city: 'TestCity',
      state: 'TC',
      zipCode: String(Math.floor(Math.random() * 90000) + 10000)
    };

    const randomCardData = {
      cardType: 'Visa',
      cardNumber: '4111111111111111',
      month: String(Math.floor(Math.random() * 12) + 1).padStart(2, '0'),
      year: String(2025 + Math.floor(Math.random() * 5)),
      nameOnCard: randomCustomer.name
    };

    // Fill purchase form with random data
    await purchasePage.fillPersonalInfo(randomCustomer);
    await purchasePage.fillCreditCardInfo(randomCardData);

    // Complete the purchase transaction
    await purchasePage.completePurchase();

    // Verify final confirmation
    await confirmationPage.verifyConfirmationPage();
    await confirmationPage.verifyTransactionDetails();

    // Verify transaction ID is generated
    const transactionId = await confirmationPage.getTransactionId();
    expect(transactionId).toMatch(/^\d+$/);

    // Verify transaction status
    const status = await confirmationPage.getTransactionStatus();
    expect(status).toContain('PendingCapture');

    // Verify masked card number
    await confirmationPage.verifyMaskedCardNumber();
  });
});