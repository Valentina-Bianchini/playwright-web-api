// Importar utilidades de Playwright Test y las clases Page Objects
const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const ProductsPage = require('../../pages/ProductsPage');
const CartPage = require('../../pages/CartPage');

// Función helper para generar datos aleatorios para checkout
function getRandomCheckoutData() {
  const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
  const postalCodes = ['12345', '67890', '54321', '98765', '11111', '22222', '33333', '44444'];
  
  return {
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    postalCode: postalCodes[Math.floor(Math.random() * postalCodes.length)]
  };
}

// Grupo de tests para Shopping Cart en Swag Labs
test.describe('Shopping Cart en Swag Labs - E2E Testing', () => {
  let loginPage;
  let productsPage;
  let cartPage;
  
  // Hook que se ejecuta antes de cada test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    
    // Login con usuario estándar antes de cada test
    await loginPage.navigate();
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLoginButton();
    
    // Verificar que llegamos a la página de productos
    const isProductsPageLoaded = await productsPage.verifyProductsPageLoaded();
    expect(isProductsPageLoaded).toBeTruthy();
    
    console.log('✓ Setup completed - logged in and on products page');
  });

  // Test 1: Agregar un producto aleatorio al carrito
  test('Agregar producto aleatorio al carrito y verificar contador', async ({ page }) => {
    console.log('🛒 Test: Add random product to cart');
    
    // Verificar que inicialmente el carrito está vacío
    let cartCount = await productsPage.getCartItemCount();
    expect(cartCount).toBe(0);
    console.log(`✓ Initial cart count: ${cartCount}`);
    
    // Agregar producto aleatorio
    const addedProduct = await productsPage.addRandomProductToCart();
    console.log(`✓ Random product added: ${addedProduct.name}`);
    
    // Verificar que el contador del carrito se actualizó
    cartCount = await productsPage.getCartItemCount();
    expect(cartCount).toBe(1);
    console.log(`✓ Cart count after adding product: ${cartCount}`);
    
    // Ir al carrito y verificar que el producto está allí
    await productsPage.goToCart();
    const isCartLoaded = await cartPage.verifyCartPageLoaded();
    expect(isCartLoaded).toBeTruthy();
    
    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems).toHaveLength(1);
    expect(cartItems[0]).toBe(addedProduct.name);
    console.log(`✓ Product verified in cart: ${cartItems[0]}`);
  });

  // Test 2: Agregar múltiples productos aleatorios
  test('Agregar múltiples productos aleatorios al carrito', async ({ page }) => {
    console.log('🛒 Test: Add multiple random products to cart');
    
    const numberOfProducts = Math.floor(Math.random() * 3) + 2; // Entre 2-4 productos
    console.log(`🎯 Adding ${numberOfProducts} random products`);
    
    // Agregar productos aleatorios
    const addedProducts = await productsPage.addMultipleRandomProducts(numberOfProducts);
    console.log(`✓ Added ${addedProducts.length} products to cart`);
    
    // Verificar contador del carrito
    const cartCount = await productsPage.getCartItemCount();
    expect(cartCount).toBe(numberOfProducts);
    console.log(`✓ Cart count matches: ${cartCount}`);
    
    // Ir al carrito y verificar productos
    await productsPage.goToCart();
    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems).toHaveLength(numberOfProducts);
    
    // Verificar que todos los productos agregados están en el carrito
    addedProducts.forEach(product => {
      expect(cartItems).toContain(product.name);
      console.log(`✓ Product verified in cart: ${product.name}`);
    });
  });

  // Test 3: Remover productos del carrito
  test('Agregar y remover productos del carrito', async ({ page }) => {
    console.log('🛒 Test: Add and remove products from cart');
    
    // Agregar 2 productos específicos
    await productsPage.addProductToCart('backpack');
    await productsPage.addProductToCart('bikeLight');
    
    let cartCount = await productsPage.getCartItemCount();
    expect(cartCount).toBe(2);
    console.log(`✓ Added 2 products, cart count: ${cartCount}`);
    
    // Remover un producto desde la página de productos
    await productsPage.removeProductFromCart('backpack');
    
    cartCount = await productsPage.getCartItemCount();
    expect(cartCount).toBe(1);
    console.log(`✓ Removed 1 product, cart count: ${cartCount}`);
    
    // Ir al carrito y verificar que solo queda un producto
    await productsPage.goToCart();
    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems).toHaveLength(1);
    expect(cartItems[0]).toBe(productsPage.products.bikeLight.name);
    console.log(`✓ Only ${cartItems[0]} remains in cart`);
    
    // Remover el último producto desde el carrito
    await cartPage.removeProductFromCart(productsPage.products.bikeLight.name);
    
    // Verificar que el carrito está vacío
    const isEmpty = await cartPage.verifyCartIsEmpty();
    expect(isEmpty).toBeTruthy();
    console.log('✓ Cart is now empty');
  });

  // Test 4: Proceso completo de checkout con datos aleatorios
  test('Proceso completo de checkout con datos aleatorios', async ({ page }) => {
    console.log('🛒 Test: Complete checkout process with random data');
    
    // Agregar productos aleatorios
    const numberOfProducts = Math.floor(Math.random() * 2) + 1; // Entre 1-2 productos
    const addedProducts = await productsPage.addMultipleRandomProducts(numberOfProducts);
    console.log(`✓ Added ${addedProducts.length} products for checkout`);
    
    // Ir al carrito
    await productsPage.goToCart();
    const cartItems = await cartPage.getCartItemNames();
    const cartPrices = await cartPage.getCartItemPrices();
    
    console.log(`✓ Cart contains: ${cartItems.join(', ')}`);
    console.log(`✓ Prices: ${cartPrices.join(', ')}`);
    
    // Generar datos aleatorios para el checkout
    const checkoutData = getRandomCheckoutData();
    console.log(`✓ Generated random checkout data: ${checkoutData.firstName} ${checkoutData.lastName}, ${checkoutData.postalCode}`);
    
    // Completar el proceso de checkout
    const checkoutResult = await cartPage.completeCheckout(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.postalCode
    );
    
    // Verificar que la compra se completó exitosamente
    expect(checkoutResult.completion.header).toBe('Thank you for your order!');
    expect(checkoutResult.completion.message).toContain('Your order has been dispatched');
    
    console.log(`✓ Checkout completed successfully!`);
    console.log(`✓ Order summary: ${checkoutResult.subtotal} + ${checkoutResult.tax} = ${checkoutResult.total}`);
    
    // Volver a productos
    await cartPage.backToProducts();
    
    // Verificar que estamos de vuelta en productos y el carrito está vacío
    const isProductsPageLoaded = await productsPage.verifyProductsPageLoaded();
    expect(isProductsPageLoaded).toBeTruthy();
    
    const finalCartCount = await productsPage.getCartItemCount();
    expect(finalCartCount).toBe(0);
    console.log('✓ Back to products page with empty cart');
  });

  // Test 5: Test de continuidad - agregar, ir al carrito, continuar comprando
  test('Flujo de continuidad - agregar, ver carrito, continuar comprando', async ({ page }) => {
    console.log('🛒 Test: Continuity flow - add, view cart, continue shopping');
    
    // Agregar un producto
    const addedProduct = await productsPage.addRandomProductToCart();
    console.log(`✓ Added product: ${addedProduct.name}`);
    
    // Ir al carrito
    await productsPage.goToCart();
    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems).toContain(addedProduct.name);
    console.log(`✓ Product verified in cart: ${addedProduct.name}`);
    
    // Continuar comprando (volver a productos)
    await cartPage.continueShopping();
    
    // Verificar que volvimos a productos y el carrito mantiene el producto
    const isProductsPageLoaded = await productsPage.verifyProductsPageLoaded();
    expect(isProductsPageLoaded).toBeTruthy();
    
    const cartCount = await productsPage.getCartItemCount();
    expect(cartCount).toBe(1);
    console.log('✓ Continued shopping - product remains in cart');
    
    // Agregar otro producto
    const secondProduct = await productsPage.addRandomProductToCart();
    console.log(`✓ Added second product: ${secondProduct.name}`);
    
    // Verificar que tenemos 2 productos
    const finalCartCount = await productsPage.getCartItemCount();
    expect(finalCartCount).toBe(2);
    console.log(`✓ Cart now contains ${finalCartCount} products`);
  });

  // Test 6: Validación de precios en el checkout
  test('Validación de cálculo de precios en checkout', async ({ page }) => {
    console.log('🛒 Test: Price calculation validation in checkout');
    
    // Agregar productos específicos con precios conocidos
    await productsPage.addProductToCart('backpack'); // $29.99
    await productsPage.addProductToCart('bikeLight'); // $9.99
    
    console.log('✓ Added Backpack ($29.99) and Bike Light ($9.99)');
    
    // Ir al carrito y proceder al checkout
    await productsPage.goToCart();
    
    const checkoutData = getRandomCheckoutData();
    await cartPage.proceedToCheckout();
    await cartPage.fillCheckoutInformation(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
    await cartPage.continueCheckout();
    
    // Obtener valores de precio
    const subtotal = await cartPage.getSubtotal();
    const tax = await cartPage.getTax();
    const total = await cartPage.getTotal();
    
    console.log(`✓ Price breakdown: Subtotal: ${subtotal}, Tax: ${tax}, Total: ${total}`);
    
    // Verificar que el subtotal es correcto (debería ser $39.98)
    expect(subtotal).toContain('39.98');
    
    // Verificar que el tax existe y es un número positivo
    expect(tax).toContain('$');
    expect(tax).toMatch(/\$\d+\.\d{2}/);
    
    // Verificar que el total incluye subtotal + tax
    expect(total).toContain('$');
    expect(total).toMatch(/\$\d+\.\d{2}/);
    
    console.log('✓ Price calculations verified');
  });
});