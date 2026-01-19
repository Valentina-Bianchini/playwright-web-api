// Importar la clase base BasePage
const BasePage = require('./BasePage');

// Clase LoginPage que hereda de BasePage específica para la página de login de Swag Labs
class LoginPage extends BasePage {
  // Constructor que inicializa los selectores de los elementos de la página
  constructor(page) {
    super(page); // Llamar al constructor de la clase padre
    
    // URL base de la aplicación Swag Labs
    this.baseUrl = 'https://www.saucedemo.com/';
    
    // Selectores de los elementos de la página
    this.usernameInput = '#user-name';
    this.passwordInput = '#password';
    this.loginButton = '#login-button';
    this.inventoryContainer = '.inventory_container';
  }

  // Navegar a la página de login usando el método heredado de BasePage
  async navigate() {
    await super.navigate(this.baseUrl);
  }

  // Ingresar el nombre de usuario
  async enterUsername(username) {
    await this.fill(this.usernameInput, username);
  }

  // Ingresar la contraseña
  async enterPassword(password) {
    await this.fill(this.passwordInput, password);
  }

  // Hacer clic en el botón de inicio de sesión
  async clickLoginButton() {
    await this.click(this.loginButton);
  }

  // Verificar que la página de productos se cargó correctamente
  async verifyProductsPageLoaded() {
    await this.waitForSelector(this.inventoryContainer);
    const isVisible = await this.isVisible(this.inventoryContainer);
    return isVisible;
  }

  // Obtener el título de la página actual
  async getPageTitle() {
    return await this.getTitle();
  }
}

module.exports = LoginPage;
