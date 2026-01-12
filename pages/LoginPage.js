// Importar la clase base BasePage
const BasePage = require('./BasePage');

// Clase LoginPage que hereda de BasePage específica para la página de login de Swag Labs
class LoginPage extends BasePage {
  // Constructor que inicializa los selectores de los elementos de la página
  constructor(page) {
    super(page); // Llamar al constructor de la clase padre
    
    // Selector del campo de usuario
    this.usernameInput = '#user-name';
    // Selector del campo de contraseña
    this.passwordInput = '#password';
    // Selector del botón de inicio de sesión
    this.loginButton = '#login-button';
    // Selector del contenedor de inventario (productos) - aparece después del login exitoso
    this.inventoryContainer = '.inventory_container';
  }

  // Navegar a la página de login de Swag Labs
  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // Ingresar el nombre de usuario en el campo correspondiente
  async enterUsername(username) {
    await this.fill(this.usernameInput, username);
  }

  // Ingresar la contraseña en el campo correspondiente
  async enterPassword(password) {
    await this.fill(this.passwordInput, password);
  }

  // Hacer clic en el botón de inicio de sesión
  async clickLoginButton() {
    await this.click(this.loginButton);
  }

  // Verificar que la página de productos se cargó correctamente
  async verifyProductsPageLoaded() {
    // Esperar a que el contenedor de inventario esté presente
    await this.waitForSelector(this.inventoryContainer);
    // Verificar que el contenedor es visible y retornar el resultado
    const isVisible = await this.isVisible(this.inventoryContainer);
    return isVisible;
  }

  // Obtener el título de la página actual
  async getPageTitle() {
    return await this.getTitle();
  }
}

module.exports = LoginPage;
