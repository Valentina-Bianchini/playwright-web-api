// Importar utilidades de Playwright Test para hacer requests de API
const { test, expect } = require('@playwright/test');

// Configuración de la API
const API_BASE_URL = 'https://api.restful-api.dev';
const ENDPOINT = '/objects';
const OBJECT_ID = '7';

// Grupo de tests para el endpoint /objects
test.describe('API Tests - /objects endpoint', () => {
  
  // Test 1: Verificar que GET retorna status 200
  test('GET /objects/{id} - Debe retornar status 200', async ({ request }) => {
    // Construir la URL completa: API + Endpoint + Atributo(ID)
    const url = `${API_BASE_URL}${ENDPOINT}/${OBJECT_ID}`;
    
    // Realizar la petición GET
    const response = await request.get(url);
    
    // Verificar que el status sea 200 OK
    expect(response.status()).toBe(200);
    
    console.log(`✓ Response status: ${response.status()}`);
  });

  // Test 2: Verificar la estructura completa de la respuesta
  test('GET /objects/{id} - Debe retornar la estructura correcta con todos los campos', async ({ request }) => {
    // Construir la URL completa: API + Endpoint + Atributo(ID)
    const url = `${API_BASE_URL}${ENDPOINT}/${OBJECT_ID}`;
    
    // Realizar la petición GET
    const response = await request.get(url);
    
    // Parsear el body de la respuesta como JSON
    const responseBody = await response.json();
    
    console.log('Response body:', JSON.stringify(responseBody, null, 2));
    
    // Verificar que el status sea 200
    expect(response.status()).toBe(200);
    
    // Verificar que el ID sea "7"
    expect(responseBody.id).toBe("7");
    console.log(`✓ ID correcto: ${responseBody.id}`);
    
    // Verificar que el campo "name" existe y contiene información
    expect(responseBody.name).toBeDefined();
    expect(responseBody.name).toBeTruthy();
    expect(responseBody.name).toBe("Apple MacBook Pro 16");
    console.log(`✓ Name: ${responseBody.name}`);
    
    // Verificar que el objeto "data" existe
    expect(responseBody.data).toBeDefined();
    expect(typeof responseBody.data).toBe('object');
    
    // Verificar que todos los campos dentro de "data" existen y tienen información
    expect(responseBody.data.year).toBeDefined();
    expect(responseBody.data.year).toBe(2019);
    console.log(`✓ Year: ${responseBody.data.year}`);
    
    expect(responseBody.data.price).toBeDefined();
    expect(responseBody.data.price).toBe(1849.99);
    console.log(`✓ Price: ${responseBody.data.price}`);
    
    expect(responseBody.data['CPU model']).toBeDefined();
    expect(responseBody.data['CPU model']).toBeTruthy();
    expect(responseBody.data['CPU model']).toBe("Intel Core i9");
    console.log(`✓ CPU model: ${responseBody.data['CPU model']}`);
    
    expect(responseBody.data['Hard disk size']).toBeDefined();
    expect(responseBody.data['Hard disk size']).toBeTruthy();
    expect(responseBody.data['Hard disk size']).toBe("1 TB");
    console.log(`✓ Hard disk size: ${responseBody.data['Hard disk size']}`);
    
    console.log('✓ Todos los campos verificados correctamente');
  });

  // Test 3: Crear un nuevo objeto mediante POST
  test('POST /objects - Debe crear un nuevo objeto y retornar 200', async ({ request }) => {
    // Construir la URL completa: API + Endpoint
    const url = `${API_BASE_URL}${ENDPOINT}`;
    
    // Cuerpo de la petición
    const requestBody = {
      "name": "Apple MacBook Pro 16",
      "data": {
        "year": 2019,
        "price": 1849.99,
        "CPU model": "Intel Core i9",
        "Hard disk size": "1 TB"
      }
    };
    
    console.log('Request body:', JSON.stringify(requestBody, null, 2));
    
    // Realizar la petición POST
    const response = await request.post(url, {
      data: requestBody
    });
    
    // Parsear el body de la respuesta como JSON
    const responseBody = await response.json();
    
    console.log('Response body:', JSON.stringify(responseBody, null, 2));
    
    // Verificar que el status sea 200 (la API devuelve 200 en lugar de 201)
    expect(response.status()).toBe(200);
    console.log(`✓ Response status: ${response.status()}`);
    
    // Verificar que se generó un ID (debe contener caracteres alfanuméricos random)
    expect(responseBody.id).toBeDefined();
    expect(responseBody.id).toBeTruthy();
    expect(typeof responseBody.id).toBe('string');
    expect(responseBody.id.length).toBeGreaterThan(0);
    // Verificar que el ID contiene caracteres alfanuméricos (formato hexadecimal típico)
    const idRegex = /^[a-f0-9]+$/;
    expect(responseBody.id).toMatch(idRegex);
    console.log(`✓ ID generado con caracteres random: ${responseBody.id}`);
    
    // Verificar que el campo "name" coincide con el enviado
    expect(responseBody.name).toBe(requestBody.name);
    console.log(`✓ Name: ${responseBody.name}`);
    
    // Verificar que se generó el campo "createdAt" con formato de fecha ISO con timezone
    expect(responseBody.createdAt).toBeDefined();
    expect(responseBody.createdAt).toBeTruthy();
    // Validar que es una fecha en formato ISO 8601 con timezone offset (ej: 2026-01-13T12:52:24.379+00:00)
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}$/;
    expect(responseBody.createdAt).toMatch(isoDateRegex);
    console.log(`✓ createdAt: ${responseBody.createdAt}`);
    
    // Verificar que el objeto "data" existe y todos sus campos coinciden
    expect(responseBody.data).toBeDefined();
    expect(typeof responseBody.data).toBe('object');
    
    expect(responseBody.data.year).toBe(requestBody.data.year);
    console.log(`✓ Year: ${responseBody.data.year}`);
    
    expect(responseBody.data.price).toBe(requestBody.data.price);
    console.log(`✓ Price: ${responseBody.data.price}`);
    
    expect(responseBody.data['CPU model']).toBe(requestBody.data['CPU model']);
    console.log(`✓ CPU model: ${responseBody.data['CPU model']}`);
    
    expect(responseBody.data['Hard disk size']).toBe(requestBody.data['Hard disk size']);
    console.log(`✓ Hard disk size: ${responseBody.data['Hard disk size']}`);
    
    console.log('✓ Objeto creado correctamente con todos los campos verificados');
  });
});
