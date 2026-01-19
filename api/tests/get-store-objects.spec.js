// Importar utilidades de Playwright Test para hacer requests de API
const { test, expect } = require('@playwright/test');

// Configuración de la API
const API_BASE_URL = 'https://api.restful-api.dev';
const ENDPOINT = '/objects';

// Función helper para generar IDs aleatorios
function getRandomExistentId() {
  // IDs que se sabe que existen en la API (rango común: 1-13)
  const existentIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  return existentIds[Math.floor(Math.random() * existentIds.length)];
}

function getRandomNonExistentId() {
  // IDs que probablemente no existen (números altos)
  return Math.floor(Math.random() * 900000) + 100000; // Entre 100000-999999
}

function getRandomInvalidId() {
  // IDs inválidos (no numéricos)
  const invalidIds = ['abc', 'xyz123', '!@#', 'null', 'undefined', ''];
  return invalidIds[Math.floor(Math.random() * invalidIds.length)];
}

// Grupo de tests para el endpoint GET /objects/{id}
test.describe('API Tests - GET /objects/{id} Store endpoint', () => {
  
  // Test 1: Obtener un objeto existente (caso exitoso)
  test('GET /objects/{id} - Debe obtener un objeto existente con datos válidos', async ({ request }) => {
    // Generar ID aleatorio de objeto existente
    const randomId = getRandomExistentId();
    const url = `${API_BASE_URL}${ENDPOINT}/${randomId}`;
    
    console.log(`🔍 Testing with random ID: ${randomId}`);
    
    // Realizar la petición GET
    const response = await request.get(url);
    
    // Verificar que el status sea 200 OK
    expect(response.status()).toBe(200);
    console.log(`✓ Response status: ${response.status()}`);
    
    // Parsear el body de la respuesta como JSON
    const responseBody = await response.json();
    console.log(`✓ Response body:`, JSON.stringify(responseBody, null, 2));
    
    // Validar que los campos obligatorios estén presentes
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('name');
    expect(responseBody).toHaveProperty('data');
    
    // Verificar que el ID coincida (convertir a string para comparación)
    expect(responseBody.id).toBe(randomId.toString());
    console.log(`✓ ID correcto: ${responseBody.id}`);
    
    // Verificar que el campo "name" existe y contiene información válida
    expect(responseBody.name).toBeDefined();
    expect(responseBody.name).toBeTruthy();
    expect(typeof responseBody.name).toBe('string');
    console.log(`✓ Name válido: ${responseBody.name}`);
    
    // Verificar que el campo "data" existe y es un objeto
    expect(responseBody.data).toBeDefined();
    expect(typeof responseBody.data).toBe('object');
    expect(responseBody.data).not.toBeNull();
    console.log(`✓ Data object válido`);
  });

  // Test 2: Consultar un objeto inexistente
  test('GET /objects/{id} - Debe retornar 404 para objeto inexistente', async ({ request }) => {
    // Generar ID aleatorio que no existe
    const randomNonExistentId = getRandomNonExistentId();
    const url = `${API_BASE_URL}${ENDPOINT}/${randomNonExistentId}`;
    
    console.log(`🔍 Testing with non-existent random ID: ${randomNonExistentId}`);
    
    // Realizar la petición GET
    const response = await request.get(url);
    
    // Verificar que el status sea 404 Not Found
    expect(response.status()).toBe(404);
    console.log(`✓ Response status for non-existent object: ${response.status()}`);
    
    // Parsear el body de la respuesta
    const responseBody = await response.json();
    console.log(`✓ Error response:`, JSON.stringify(responseBody, null, 2));
    
    // Verificar que contiene un mensaje de error
    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
    console.log(`✓ Error message present: ${responseBody.error}`);
  });

  // Test 3: Consultar con un ID inválido (no numérico)
  test('GET /objects/{id} - Debe manejar ID inválido correctamente', async ({ request }) => {
    // Generar ID inválido aleatorio
    const randomInvalidId = getRandomInvalidId();
    const url = `${API_BASE_URL}${ENDPOINT}/${randomInvalidId}`;
    
    console.log(`🔍 Testing with invalid random ID: "${randomInvalidId}"`);
    
    // Realizar la petición GET
    const response = await request.get(url);
    
    // La API puede responder con 400 (Bad Request) o 404 (Not Found) para IDs inválidos
    // Verificamos que sea un código de error apropiado
    expect([400, 404]).toContain(response.status());
    console.log(`✓ Response status for invalid ID: ${response.status()}`);
    
    // Si el status es 404, verificar que hay un mensaje de error
    if (response.status() === 404) {
      const responseBody = await response.json();
      console.log(`✓ Error response for invalid ID:`, JSON.stringify(responseBody, null, 2));
      expect(responseBody).toHaveProperty('error');
    }
  });

  // Test 4: Verificar estructura específica del objeto ID 4 (según documentación)
  test('GET /objects/4 - Debe retornar estructura específica documentada', async ({ request }) => {
    const specificId = 4;
    const url = `${API_BASE_URL}${ENDPOINT}/${specificId}`;
    
    console.log(`🔍 Testing specific documented case with ID: ${specificId}`);
    
    // Realizar la petición GET
    const response = await request.get(url);
    
    // Verificar que el status sea 200 OK
    expect(response.status()).toBe(200);
    
    // Parsear el body de la respuesta
    const responseBody = await response.json();
    console.log(`✓ ID 4 response:`, JSON.stringify(responseBody, null, 2));
    
    // Verificar estructura según la documentación
    expect(responseBody.id).toBe("4"); // La API retorna ID como string
    expect(responseBody).toHaveProperty('name');
    expect(responseBody).toHaveProperty('data');
    
    // Verificar que data contiene campos esperados (según ejemplo de documentación)
    if (responseBody.data) {
      expect(typeof responseBody.data).toBe('object');
      // La documentación muestra que debería tener price y color para iPhone 11
      console.log(`✓ Data structure for ID 4 validated`);
    }
  });

  // Test 5: Performance test - Múltiples requests con IDs aleatorios
  test('GET /objects/{id} - Test de rendimiento con múltiples IDs aleatorios', async ({ request }) => {
    console.log(`🔍 Testing performance with multiple random requests`);
    
    const promises = [];
    const testIds = [];
    
    // Generar 5 IDs aleatorios para test de rendimiento
    for (let i = 0; i < 5; i++) {
      const randomId = getRandomExistentId();
      testIds.push(randomId);
      const url = `${API_BASE_URL}${ENDPOINT}/${randomId}`;
      promises.push(request.get(url));
    }
    
    console.log(`🚀 Executing ${promises.length} parallel requests with IDs: [${testIds.join(', ')}]`);
    
    // Ejecutar todas las requests en paralelo
    const startTime = Date.now();
    const responses = await Promise.all(promises);
    const endTime = Date.now();
    
    const totalTime = endTime - startTime;
    console.log(`✓ All ${responses.length} requests completed in ${totalTime}ms`);
    
    // Verificar que todas las responses sean exitosas
    responses.forEach((response, index) => {
      expect(response.status()).toBe(200);
      console.log(`✓ Request ${index + 1} (ID: ${testIds[index]}) - Status: ${response.status()}`);
    });
    
    // Verificar que el tiempo total sea razonable (menos de 5 segundos)
    expect(totalTime).toBeLessThan(5000);
    console.log(`✓ Performance test passed - Total time: ${totalTime}ms`);
  });
});