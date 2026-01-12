// Importar expect para hacer aserciones
const { expect } = require('@playwright/test');

// Clase base que contiene métodos comunes reutilizables para todas las páginas
class BasePage {
  // Constructor que recibe la instancia de page de Playwright
  constructor(page) {
    this.page = page;
  }

  // Navegar a una URL específica
  async navigate(url) {
    await this.page.goto(url);
  }

  // Hacer clic en un elemento usando selector CSS
  async click(selector) {
    await this.page.click(selector);
  }

  // Rellenar un campo de texto con un valor
  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  // Obtener el contenido de texto de un elemento
  async getText(selector) {
    return await this.page.textContent(selector);
  }

  // Esperar a que un elemento con el selector esté presente (timeout: 10s por defecto)
  async waitForSelector(selector, timeout = 10000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  // Verificar si un elemento es visible en la página
  async isVisible(selector) {
    return await this.page.locator(selector).isVisible();
  }

  // Obtener el título de la página actual
  async getTitle() {
    return await this.page.title();
  }

  // Aserción para verificar que un elemento es visible
  async expectVisible(selector) {
    const isVisible = await this.isVisible(selector);
    expect(isVisible).toBeTruthy();
  }
}

module.exports = BasePage;
