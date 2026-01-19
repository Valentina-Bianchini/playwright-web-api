// Importar la clase base BasePage
const BasePage = require('./BasePage');

// Clase CartPage que hereda de BasePage específica para la página del carrito de Swag Labs
class CartPage extends BasePage {
  // Constructor que inicializa los selectores de los elementos de la página del carrito
  constructor(page) {
    super(page); // Llamar al constructor de la clase padre
    
    // Selectores de los elementos de la página del carrito
    this.cartContainer = '[data-test="cart-contents-container"]';
    this.cartHeader = '[data-test="header-container"]';
    this.cartItems = '[data-test="inventory-item"]';
    this.cartItemName = '[data-test="inventory-item-name"]';
    this.cartItemPrice = '[data-test="inventory-item-price"]';
    this.removeButton = 'button[id^="remove-"]';
    this.continueShoppingButton = '[data-test="continue-shopping"]';
    this.checkoutButton = '[data-test="checkout"]';
    this.cartBadge = '[data-test="shopping-cart-badge"]';
    
    // Selectores para el checkout
    this.firstNameInput = '[data-test="firstName"]';
    this.lastNameInput = '[data-test="lastName"]';
    this.postalCodeInput = '[data-test="postalCode"]';
    this.continueButton = '[data-test="continue"]';
    this.cancelButton = '[data-test="cancel"]';
    
    // Selectores para checkout overview
    this.finishButton = '[data-test="finish"]';
    this.totalLabel = '[data-test="total-label"]';
    this.subtotalLabel = '[data-test="subtotal-label"]';
    this.taxLabel = '[data-test="tax-label"]';
    
    // Selector para confirmación final
    this.completeHeader = '[data-test="complete-header"]';
    this.completeText = '[data-test="complete-text"]';
    this.backHomeButton = '[data-test="back-to-products"]';
  }

  // Verificar que la página del carrito se cargó correctamente
  async verifyCartPageLoaded() {
    await this.waitForSelector(this.cartContainer);
    const isVisible = await this.isVisible(this.cartContainer);
    return isVisible;
  }

  // Obtener el número de items en el carrito
  async getCartItemCount() {
    try {
      const items = await this.page.$$(this.cartItems);
      return items.length;
    } catch (error) {
      return 0;
    }
  }

  // Obtener los nombres de todos los productos en el carrito
  async getCartItemNames() {
    await this.waitForSelector(this.cartItems);
    const itemNames = await this.page.$$eval(this.cartItemName, elements => 
      elements.map(el => el.textContent.trim())
    );
    return itemNames;
  }

  // Obtener los precios de todos los productos en el carrito
  async getCartItemPrices() {
    await this.waitForSelector(this.cartItems);
    const itemPrices = await this.page.$$eval(this.cartItemPrice, elements => 
      elements.map(el => el.textContent.trim())
    );
    return itemPrices;
  }

  // Remover un producto específico del carrito por nombre
  async removeProductFromCart(productName) {
    const items = await this.page.$$(this.cartItems);
    
    for (const item of items) {
      const nameElement = await item.$(this.cartItemName);
      const name = await nameElement.textContent();
      
      if (name.trim() === productName) {
        const removeButton = await item.$(this.removeButton);
        await removeButton.click();
        console.log(`✓ Removed ${productName} from cart`);
        return true;
      }
    }
    
    console.log(`✗ Product ${productName} not found in cart`);
    return false;
  }

  // Continuar comprando (volver a productos)
  async continueShopping() {
    await this.click(this.continueShoppingButton);
    console.log('✓ Continued shopping - returned to products page');
  }

  // Proceder al checkout
  async proceedToCheckout() {
    await this.click(this.checkoutButton);
    console.log('✓ Proceeded to checkout');
  }

  // Completar información del checkout
  async fillCheckoutInformation(firstName, lastName, postalCode) {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.postalCodeInput, postalCode);
    
    console.log(`✓ Filled checkout information: ${firstName} ${lastName}, ${postalCode}`);
  }

  // Continuar después de llenar información
  async continueCheckout() {
    await this.click(this.continueButton);
    console.log('✓ Continued to checkout overview');
  }

  // Obtener el total de la compra
  async getTotal() {
    await this.waitForSelector(this.totalLabel);
    const total = await this.getText(this.totalLabel);
    return total;
  }

  // Obtener el subtotal de la compra
  async getSubtotal() {
    await this.waitForSelector(this.subtotalLabel);
    const subtotal = await this.getText(this.subtotalLabel);
    return subtotal;
  }

  // Obtener el impuesto de la compra
  async getTax() {
    await this.waitForSelector(this.taxLabel);
    const tax = await this.getText(this.taxLabel);
    return tax;
  }

  // Finalizar la compra
  async finishPurchase() {
    await this.click(this.finishButton);
    console.log('✓ Finished purchase');
  }

  // Verificar que la compra se completó exitosamente
  async verifyOrderComplete() {
    await this.waitForSelector(this.completeHeader);
    const headerText = await this.getText(this.completeHeader);
    const messageText = await this.getText(this.completeText);
    
    console.log(`✓ Order complete header: ${headerText}`);
    console.log(`✓ Order complete message: ${messageText}`);
    
    return {
      header: headerText,
      message: messageText
    };
  }

  // Volver a productos después de completar la compra
  async backToProducts() {
    await this.click(this.backHomeButton);
    console.log('✓ Returned to products page');
  }

  // Proceso completo de checkout (método helper)
  async completeCheckout(firstName = 'John', lastName = 'Doe', postalCode = '12345') {
    await this.proceedToCheckout();
    await this.fillCheckoutInformation(firstName, lastName, postalCode);
    await this.continueCheckout();
    
    // Obtener información de pricing
    const subtotal = await this.getSubtotal();
    const tax = await this.getTax();
    const total = await this.getTotal();
    
    console.log(`✓ Checkout summary - Subtotal: ${subtotal}, Tax: ${tax}, Total: ${total}`);
    
    await this.finishPurchase();
    const completion = await this.verifyOrderComplete();
    
    return {
      subtotal,
      tax,
      total,
      completion
    };
  }

  // Verificar que el carrito está vacío
  async verifyCartIsEmpty() {
    const itemCount = await this.getCartItemCount();
    return itemCount === 0;
  }
}

module.exports = CartPage;