const fs = require('fs');
const path = require('path');

class BlazeDataHelper {
  constructor() {
    this.customersFilePath = path.join(__dirname, '../csv/blazedemo-customers.csv');
  }

  parseCSV(csvContent) {
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',');
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',');
        const row = {};
        headers.forEach((header, index) => {
          row[header] = values[index];
        });
        data.push(row);
      }
    }

    return data;
  }

  getCustomersData() {
    try {
      const csvContent = fs.readFileSync(this.customersFilePath, 'utf-8');
      return this.parseCSV(csvContent);
    } catch (error) {
      console.error('Error reading customers data:', error);
      return [];
    }
  }

  getRandomCustomer() {
    const customers = this.getCustomersData();
    return customers[Math.floor(Math.random() * customers.length)];
  }

  getCustomerByName(name) {
    const customers = this.getCustomersData();
    return customers.find(customer => customer.name === name);
  }

  getCities() {
    return [
      'Paris', 'Philadelphia', 'Boston', 'Portland', 'San Diego', 'Mexico City', 'São Paolo'
    ];
  }

  getDestinations() {
    return [
      'Buenos Aires', 'Rome', 'London', 'Berlin', 'New York', 'Dublin', 'Cairo'
    ];
  }

  getRandomRoute() {
    const cities = this.getCities();
    const destinations = this.getDestinations();
    
    return {
      from: cities[Math.floor(Math.random() * cities.length)],
      to: destinations[Math.floor(Math.random() * destinations.length)]
    };
  }

  getTestRoutes() {
    return [
      { from: 'Boston', to: 'London' },
      { from: 'Paris', to: 'Rome' },
      { from: 'San Diego', to: 'Berlin' },
      { from: 'Philadelphia', to: 'New York' },
      { from: 'Mexico City', to: 'Dublin' }
    ];
  }
}

module.exports = BlazeDataHelper;