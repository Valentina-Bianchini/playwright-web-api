// Importar la clase base BasePage
const BasePage = require('./BasePage');

// Clase ProductsPage que hereda de BasePage específica para la página de productos de Swag Labs
class ProductsPage extends BasePage {
  // Constructor que inicializa los selectores de los elementos de la página
  constructor(page) {
    super(page); // Llamar al constructor de la clase padre
    
    // Selectores de los elementos de la página de productos
    this.inventoryContainer = '.inventory_container';
    this.sortDropdown = '[data-test="product_sort_container"]';
    this.cartBadge = '[data-test="shopping-cart-badge"]';
    this.cartLink = '[data-test="shopping-cart-link"]';
    
    // Selectores para productos específicos
    this.products = {
      backpack: {
        addToCartButton: '[data-test="add-to-cart-sauce-labs-backpack"]',
        removeButton: '[data-test="remove-sauce-labs-backpack"]',
        name: 'Sauce Labs Backpack',
        price: '$29.99'
      },
      bikeLight: {
        addToCartButton: '[data-test="add-to-cart-sauce-labs-bike-light"]',
        removeButton: '[data-test="remove-sauce-labs-bike-light"]',
        name: 'Sauce Labs Bike Light',
        price: '$9.99'
      },
      tShirt: {
        addToCartButton: '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]',
        removeButton: '[data-test="remove-sauce-labs-bolt-t-shirt"]',
        name: 'Sauce Labs Bolt T-Shirt',
        price: '$15.99'
      },
      jacket: {
        addToCartButton: '[data-test="add-to-cart-sauce-labs-fleece-jacket"]',
        removeButton: '[data-test="remove-sauce-labs-fleece-jacket"]',
        name: 'Sauce Labs Fleece Jacket',
        price: '$49.99'
      },
      onesie: {
        addToCartButton: '[data-test="add-to-cart-sauce-labs-onesie"]',
        removeButton: '[data-test="remove-sauce-labs-onesie"]',
        name: 'Sauce Labs Onesie',
        price: '$7.99'
      },
      redTShirt: {
        addToCartButton: '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]',
        removeButton: '[data-test="remove-test.allthethings()-t-shirt-(red)"]',
        name: 'Test.allTheThings() T-Shirt (Red)',
        price: '$15.99'
      }
    };
  }

  // Verificar que la página de productos se cargó correctamente
  async verifyProductsPageLoaded() {
    await this.waitForSelector(this.inventoryContainer);
    const isVisible = await this.isVisible(this.inventoryContainer);
    return isVisible;
  }

  // Agregar un producto aleatorio al carrito
  async addRandomProductToCart() {
    const productKeys = Object.keys(this.products);
    const randomKey = productKeys[Math.floor(Math.random() * productKeys.length)];
    const product = this.products[randomKey];
    
    await this.click(product.addToCartButton);
    console.log(`✓ Added ${product.name} (${product.price}) to cart`);
    return product;
  }

  // Agregar productos específicos al carrito
  async addProductToCart(productName) {
    const product = this.products[productName];
    if (!product) {
      throw new Error(`Product ${productName} not found`);
    }
    
    await this.click(product.addToCartButton);
    console.log(`✓ Added ${product.name} (${product.price}) to cart`);
    return product;
  }

  // Remover un producto del carrito
  async removeProductFromCart(productName) {
    const product = this.products[productName];
    if (!product) {
      throw new Error(`Product ${productName} not found`);
    }
    
    await this.click(product.removeButton);
    console.log(`✓ Removed ${product.name} from cart`);
    return product;
  }

  // Obtener el número del badge del carrito
  async getCartItemCount() {
    try {
      const isVisible = await this.isVisible(this.cartBadge);
      if (!isVisible) {
        return 0; // No hay badge = carrito vacío
      }
      const count = await this.getText(this.cartBadge);
      return parseInt(count) || 0;
    } catch (error) {
      return 0; // Si hay error, asumir carrito vacío
    }
  }

  // Hacer clic en el carrito para ir a la página del carrito
  async goToCart() {
    await this.click(this.cartLink);
    console.log('✓ Navigated to cart page');
  }

  // Ordenar productos por criterio
  async sortProducts(criteria) {
    await this.click(this.sortDropdown);
    await this.page.selectOption(this.sortDropdown, criteria);
    console.log(`✓ Sorted products by: ${criteria}`);
  }

  // Agregar múltiples productos aleatorios
  async addMultipleRandomProducts(count) {
    const addedProducts = [];
    for (let i = 0; i < count; i++) {
      const product = await this.addRandomProductToCart();
      addedProducts.push(product);
    }
    return addedProducts;
  }

  // Verificar que un producto específico está visible
  async isProductVisible(productName) {
    const product = this.products[productName];
    if (!product) {
      return false;
    }
    return await this.isVisible(product.addToCartButton);
  }
}

module.exports = ProductsPage;