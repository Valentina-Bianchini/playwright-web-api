// Importar utilidades de Playwright Test y la clase LoginPage
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

// Definir el grupo de tests para Login en Swag Labs
test.describe('Login en Swag Labs', () => {
  let loginPage; // Variable para almacenar la instancia del Page Object

  // Hook que se ejecuta antes de cada test
  test.beforeEach(async ({ page }) => {
    // Inicializar la página de login con la instancia del page de Playwright
    loginPage = new LoginPage(page);
    // Navegar a la URL de Swag Labs
    await loginPage.navigate();
  });

  // Test 1: Verificar login exitoso con usuario estándar
  test('Login correcto con usuario estándar', async () => {
    // Ingresa el usuario estándar
    await loginPage.enterUsername('standard_user');
    // Ingresa la contraseña
    await loginPage.enterPassword('secret_sauce');
    // Hace clic en el botón de inicio de sesión
    await loginPage.clickLoginButton();

    // Verifica que la página de productos se haya cargado correctamente
    const isProductsPageLoaded = await loginPage.verifyProductsPageLoaded();
    // Afirma que la página de productos está visible
    expect(isProductsPageLoaded).toBeTruthy();
  });

  // Test 2: Verificar login exitoso con usuario problem
  test('Login correcto con usuario problem', async () => {
    // Ingresa el usuario problem
    await loginPage.enterUsername('problem_user');
    // Ingresa la contraseña
    await loginPage.enterPassword('secret_sauce');
    // Hace clic en el botón de inicio de sesión
    await loginPage.clickLoginButton();

    // Verifica que la página de productos se haya cargado correctamente
    const isProductsPageLoaded = await loginPage.verifyProductsPageLoaded();
    // Afirma que la página de productos está visible
    expect(isProductsPageLoaded).toBeTruthy();
  });

  // Test 3: Verificar login exitoso con usuario performance
  test('Login correcto con usuario performance', async () => {
    // Ingresa el usuario performance
    await loginPage.enterUsername('performance_glitch_user');
    // Ingresa la contraseña
    await loginPage.enterPassword('secret_sauce');
    // Hace clic en el botón de inicio de sesión
    await loginPage.clickLoginButton();

    // Verifica que la página de productos se haya cargado correctamente
    const isProductsPageLoaded = await loginPage.verifyProductsPageLoaded();
    // Afirma que la página de productos está visible
    expect(isProductsPageLoaded).toBeTruthy();
  });
});
