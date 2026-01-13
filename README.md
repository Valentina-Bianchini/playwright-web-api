# Playwright Testing - E2E

Proyecto de automatización de pruebas utilizando **Playwright** con arquitectura de **Page Object Model (POM)** para tests E2E y tests de API REST.

## 📋 Descripción

Este proyecto contiene:
- **Tests E2E de Frontend**: Pruebas automatizadas para la aplicación web [Swag Labs](https://www.saucedemo.com/)
- **Tests de API**: Pruebas de endpoints REST de [Restful API Dev](https://api.restful-api.dev)

Implementados con Playwright usando una configuración centralizada y arquitectura de Page Object Model para mantener el código limpio, reutilizable y fácil de mantener.

## 🏗️ Estructura del Proyecto

```
playwright-e2e/
├── frontend/                   # Tests de Frontend (E2E con Playwright)
│   ├── pages/                 # Page Objects - Clases que representan páginas web
│   │   ├── BasePage.js        # Clase base con métodos comunes reutilizables
│   │   └── LoginPage.js       # Page Object específico para la página de login
│   │
│   ├── tests/                 # Tests de Playwright (.spec.js)
│   │   └── login.spec.js      # Test de login con Data-Driven Testing
│   │
│   ├── csv/                   # Archivos CSV con datos de prueba
│   │   └── credentials.csv    # Usuarios y contraseñas para Data-Driven Testing
│   │
│   ├── utils/                 # Utilidades y helpers
│   │   └── csvHelper.js       # Helper para leer archivos CSV
│   │
│   └── README.md              # Documentación de tests frontend
│
├── api/                        # Tests de APIs REST
│   ├── tests/                 # Tests de APIs
│   │   └── objects.spec.js    # Tests del endpoint /objects (GET, POST)
│   │
│   └── README.md              # Documentación de tests API
│
├── playwright.config.js       # ⚙️ CONFIGURACIÓN CENTRALIZADA (Frontend + API)
├── package.json              # Dependencias del proyecto
├── .gitignore                # Archivos ignorados por Git
└── README.md                 # Este archivo
```

## ⚙️ Configuración Centralizada

El proyecto utiliza una **única configuración** en `/playwright.config.js` que maneja:
- **Proyectos de Frontend**: `frontend-chromium`, `frontend-firefox`, `frontend-webkit`
- **Proyecto de API**: `api`

Esto permite:
- ✅ Mantener configuraciones compartidas en un solo lugar
- ✅ Ejecutar todos los tests desde la raíz
- ✅ Configuraciones específicas por tipo de test (navegadores vs API)
- ✅ Mejor mantenibilidad y consistencia

## 📊 Data-Driven Testing

Los tests de frontend utilizan **Data-Driven Testing** con archivos CSV:
- Un único test se ejecuta con múltiples conjuntos de datos
- Usuarios y contraseñas almacenados en `frontend/csv/credentials.csv`
- Fácil agregar nuevos casos: solo edita el CSV
- Separación clara entre código y datos de prueba

**Ejemplo:** 3 usuarios en CSV = 3 tests × 3 navegadores = **9 tests ejecutados automáticamente**

## 🔧 Tecnologías Utilizadas

- **Playwright** - Framework de automatización de navegadores y APIs
- **Node.js** - Runtime de JavaScript
- **npm** - Gestor de paquetes

## 📦 Dependencias Principales

```json
{
  "@playwright/test": "^1.57.0",
  "@types/node": "^25.0.6"
}
```

## 🚀 Instalación y Setup

### Clonar el repositorio

```bash
# Clonar el repositorio desde GitHub
git clone https://github.com/Valentina-Bianchini/playwright-web-api.git

# Navegar al directorio del proyecto
cd playwright-e2e

# Instalar las dependencias
npm install
```

### Verificar instalación

```bash
# Verificar que Playwright está instalado correctamente
npx playwright --version
```

## 🧪 Ejecutar Tests

### ▶️ Todos los Tests (Frontend + API)

```bash
# Ejecutar todos los tests (frontend en 3 navegadores + API)
npm test
# o
npm run test:all
```

### 🌐 Tests de Frontend (E2E)

```bash
# Ejecutar todos los tests de frontend (chromium, firefox, webkit)
npm run test:frontend

# Ejecutar en un navegador específico
npx playwright test --project=frontend-chromium
npx playwright test --project=frontend-firefox
npx playwright test --project=frontend-webkit
```

### 🔌 Tests de API

```bash
# Ejecutar tests de API con reporte
npm run test:api

# Ejecutar solo los tests sin abrir el reporte
npx playwright test --project=api
```

### 🎯 Ejecutar tests específicos

```bash
# Ejecutar solo tests de login (frontend)
npx playwright test frontend/tests/login.spec.js

# Ejecutar solo tests del endpoint objects (API)
npx playwright test api/tests/objects.spec.js --project=api

# Ejecutar test específico por nombre
npx playwright test -g "Login correcto con usuario estándar"

# Ejecutar múltiples proyectos
npx playwright test --project=frontend-chromium --project=api
```

### 🔧 Ejecutar tests en modo headless/headed (solo frontend)

```bash
# Modo headless (sin interfaz gráfica) - por defecto
npx playwright test --project=frontend-chromium

# Modo headed (ver el navegador)
npx playwright test --project=frontend-chromium --headed
```

## 📊 Reportes

### Reporte HTML de Playwright

Después de ejecutar los tests:

```bash
# Mostrar el reporte HTML
npx playwright show-report
```

El reporte incluye:
- ✅ Resumen de tests ejecutados (Frontend + API)
- ✅ Videos de la ejecución (tests E2E)
- ✅ Screenshots de cada paso
- ✅ Trazas completas de la ejecución
- ✅ Detalles de errores y stack traces
- ✅ Tiempo de ejecución por test

## 📝 Estructura de Tests

### Tests E2E de Frontend (Data-Driven)

```javascript
// frontend/tests/login.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const { readCSV } = require('../utils/csvHelper');
const path = require('path');

// Leer credenciales desde CSV
const csvPath = path.join(__dirname, '../csv/credentials.csv');
const credentials = readCSV(csvPath);

// El test se ejecuta automáticamente para cada usuario del CSV
test.describe('Login en Swag Labs - Data-Driven Testing', () => {
  for (const credential of credentials) {
    test(`Login correcto con ${credential.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();
      await loginPage.enterUsername(credential.username);
      await loginPage.enterPassword(credential.password);
      await loginPage.clickLoginButton();
      
      const isLoaded = await loginPage.verifyProductsPageLoaded();
      expect(isLoaded).toBeTruthy();
    });
  }
});
```

**Archivo CSV (`frontend/csv/credentials.csv`):**
```csv
username,password,description
standard_user,secret_sauce,Usuario estándar
problem_user,secret_sauce,Usuario con problemas
performance_glitch_user,secret_sauce,Usuario con problemas de rendimiento
```

### Tests de API REST

```javascript
// api/tests/objects.spec.js
const { test, expect } = require('@playwright/test');

const API_BASE_URL = 'https://api.restful-api.dev';
const ENDPOINT = '/objects';

test.describe('API Tests - /objects endpoint', () => {
  test('GET /objects/{id} - Debe retornar status 200', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}${ENDPOINT}/7`);
    expect(response.status()).toBe(200);
  });
  
  test('POST /objects - Debe crear un nuevo objeto', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}${ENDPOINT}`, {
      data: {
        name: "Apple MacBook Pro 16",
        data: { year: 2019, price: 1849.99 }
      }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBeDefined();
  });
});
```

## 🎯 Page Object Model (POM)

### Clase Base (BasePage)

Contiene métodos comunes reutilizables:

```javascript
class BasePage {
  async navigate(url)          // Navegar a una URL
  async click(selector)         // Hacer clic en un elemento
  async fill(selector, text)   // Rellenar un campo de texto
  async getText(selector)      // Obtener texto de un elemento
  async waitForSelector(selector) // Esperar a que aparezca un elemento
  async isVisible(selector)    // Verificar si es visible
  async getTitle()             // Obtener título de la página
  async expectVisible(selector) // Aserción de visibilidad
}
```

### Page Object Específico (LoginPage)

Extiende BasePage y contiene métodos específicos de la página:

```javascript
class LoginPage extends BasePage {
  async navigate()              // Ir a la página de login
  async enterUsername(username) // Ingresar usuario
  async enterPassword(password) // Ingresar contraseña
  async clickLoginButton()      // Hacer clic en login
  async verifyProductsPageLoaded() // Verificar que cargó la página de productos
}
```

## ✅ Configuración de Tests

### Archivo playwright.config.js (Centralizado)

```javascript
export default defineConfig({
  fullyParallel: true,
  reporter: 'html',
  timeout: 30000,
  
  projects: [
    // Tests E2E - Frontend
    {
      name: 'frontend-chromium',
      testDir: './frontend/tests',
      use: { ...devices['Desktop Chrome'], trace: 'on' },
    },
    {
      name: 'frontend-firefox',
      testDir: './frontend/tests',
      use: { ...devices['Desktop Firefox'], trace: 'on' },
    },
    {
      name: 'frontend-webkit',
      testDir: './frontend/tests',
      use: { ...devices['Desktop Safari'], trace: 'on' },
    },
    // Tests de API
    {
      name: 'api',
      testDir: './api/tests',
      use: {
        baseURL: 'https://api.restful-api.dev',
        extraHTTPHeaders: { 'Accept': 'application/json' },
      },
    },
  ],
});
```

## 🔍 Debugging

### Ver los tests en acción

```bash
# Ejecutar en modo headed (ver el navegador)
npx playwright test --headed
```

### Debug mode interactivo

```bash
# Abre el debugger de Playwright
npx playwright test --debug
```

### Inspeccionar selectores

```bash
# Genera código de test interactivamente
npx playwright codegen https://www.saucedemo.com/
```

## 📚 Datos de Prueba - Swag Labs

La aplicación Swag Labs proporciona varios usuarios para testing:

| Usuario | Contraseña | Comportamiento |
|---------|-----------|----------------|
| `standard_user` | `secret_sauce` | Experiencia normal |
| `problem_user` | `secret_sauce` | Problemas visuales |
| `performance_glitch_user` | `secret_sauce` | Carga lenta |
| `error_user` | `secret_sauce` | Errores en la página |
| `visual_user` | `secret_sauce` | Problemas visuales |
| `locked_out_user` | `secret_sauce` | Usuario bloqueado |

## 🛠️ Comandos Útiles

```bash
# Instalar dependencias
npm install

# Ejecutar todos los tests
npm test

# Ejecutar tests en modo debug
npx playwright test --debug

# Ver el reporte HTML
npx playwright show-report

# Generar código de test interactivamente
npx playwright codegen https://www.saucedemo.com/

# Listar todos los tests
npx playwright test --list

# Ejecutar tests con un tag específico
npx playwright test --grep @smoke
```

## 🐛 Troubleshooting

### Tests no se ejecutan
```bash
# Asegúrate de estar en el directorio correcto
cd playwright-e2e

# Reinstala las dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: Cannot find module
```bash
# Verifica que la ruta del require/import sea correcta
# Usa rutas relativas: ../pages/BasePage
```

### Selectores no funcionan
```bash
# Usa el codegen para generar selectores automáticamente
npx playwright codegen https://www.saucedemo.com/
```

## 📖 Recursos Útiles

- [Documentación de Playwright](https://playwright.dev/)
- [Documentación de Cucumber.js](https://cucumber.io/docs/cucumber/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [BDD y Gherkin](https://cucumber.io/docs/gherkin/)

## 👥 Contribuciones

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/mi-feature`)
3. Commit tus cambios (`git commit -m 'Agrego mi feature'`)
4. Push a la rama (`git push origin feature/mi-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia ISC.

## 👤 Autor

Valentina Bianchini

---

**Última actualización:** January 13, 2026
