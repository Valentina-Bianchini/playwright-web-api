// Importar utilidades de Playwright Test y la clase LoginPage
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const { readCSV } = require('../utils/csvHelper');
const path = require('path');

// Leer las credenciales desde el archivo CSV
const csvPath = path.join(__dirname, '../csv/credentials.csv');
const credentials = readCSV(csvPath);

// Definir el grupo de tests para Login en Swag Labs
test.describe('Login en Swag Labs - Data-Driven Testing', () => {
  
  // Iterar sobre cada conjunto de credenciales del CSV
  for (const credential of credentials) {
    test(`Login correcto con ${credential.description}`, async ({ page }) => {
      // Inicializar la página de login
      const loginPage = new LoginPage(page);
      
      // Navegar a la URL de Swag Labs
      await loginPage.navigate();
      
      console.log(`Testing login with user: ${credential.username}`);
      
      // Ingresa el usuario desde el CSV
      await loginPage.enterUsername(credential.username);
      
      // Ingresa la contraseña desde el CSV
      await loginPage.enterPassword(credential.password);
      
      // Hace clic en el botón de inicio de sesión
      await loginPage.clickLoginButton();
      
      // Verifica que la página de productos se haya cargado correctamente
      const isProductsPageLoaded = await loginPage.verifyProductsPageLoaded();
      
      // Afirma que la página de productos está visible
      expect(isProductsPageLoaded).toBeTruthy();
      
      console.log(`✓ Login successful for: ${credential.username}`);
    });
  }
});
