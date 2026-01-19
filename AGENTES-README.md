# 🤖 Playwright Agentes - Testing Automation con IA

Proyecto de automatización de pruebas utilizando **Agentes de Playwright** con inteligencia artificial para generar tests automáticamente.

## 📋 Descripción del Proyecto

Este proyecto demuestra el uso de **Agentes de Playwright** para crear tests E2E y API de manera automatizada usando IA. Incluye:

- **Tests E2E de Frontend**: Pruebas automatizadas para [Swag Labs](https://www.saucedemo.com/)
- **Tests de API**: Pruebas de endpoints REST de [Restful API Dev](https://api.restful-api.dev)
- **Generación automática** de tests usando agentes de IA
- **Page Object Model** creado automáticamente
- **Data-Driven Testing** con datos aleatorios

---

## 🤖 ¿Qué son los Agentes de Playwright?

Los **Agentes de Playwright** son asistentes de IA especializados que automatizan la creación y ejecución de tests. Son **extensiones inteligentes** que pueden:

- 🧠 **Generar tests automáticamente** desde especificaciones
- 🔍 **Inspeccionar páginas web** en tiempo real
- ⚡ **Ejecutar tests** y generar reportes
- 🛠️ **Crear Page Objects** y helpers

---

## 🏗️ Arquitectura y Funcionamiento

```
┌─────────────┐     ┌─────────────────┐    ┌─────────────┐
│   VS Code   │───▶│ Agente Playwright│───▶│ MCP Server  │
└─────────────┘     └─────────────────┘    └─────────────┘
                            │                      │
                            ▼                      ▼
                   ┌─────────────────┐    ┌─────────────┐
                   │ Tests .spec.js  │    │  Navegador  │
                   └─────────────────┘    └─────────────┘
```

### Componentes clave:

1. **Agente** - La IA que entiende tus solicitudes
2. **MCP Server** - Interfaz de comunicación con Playwright
3. **VS Code** - Entorno integrado
4. **Navegador** - Donde se ejecutan las pruebas

---

## 🏗️ Estructura del Proyecto

```
playwright-e2e/
├── .github/agents/                 # 🤖 Configuración de agentes IA
│   └── playwright-test-generator.agent.md
├── frontend/                       # Tests de Frontend (E2E)
│   ├── pages/                     # Page Objects (generados por agente)
│   │   ├── BasePage.js            # Clase base con métodos comunes
│   │   ├── LoginPage.js           # Page Object para login
│   │   ├── ProductsPage.js        # Page Object para productos
│   │   └── CartPage.js            # Page Object para carrito
│   ├── tests/                     # Tests de Playwright
│   │   ├── login.spec.js          # Test de login con data-driven
│   │   └── shopping-cart.spec.js  # Test E2E completo del carrito
│   ├── csv/                       # Datos para testing
│   │   └── credentials.csv        # Credenciales para data-driven
│   └── utils/                     # Utilidades
│       └── csvHelper.js           # Helper para leer CSV
├── api/                           # Tests de APIs REST
│   └── tests/
│       ├── objects.spec.js        # Tests básicos de API
│       └── get-store-objects.spec.js # Tests generados por agente
├── documentación funcional/       # Documentación para generar tests
│   └── DocumentacionGET_Store.md
├── .vscode/                       # Configuración de VS Code
│   ├── mcp.json                   # Configuración MCP Server
│   └── settings.json              # Settings locales del proyecto
└── playwright.config.js          # Configuración centralizada
```

---

## ⚙️ Configuración y Setup

### 1. **Instalación**

```bash
# Clonar el repositorio
git clone <tu-repo>
cd playwright-e2e

# Instalar dependencias
npm install

# Inicializar agentes de Playwright
npx playwright init-agents --loop=vscode
```

### 2. **Configuración MCP Server**

Archivo `.vscode/mcp.json`:
```json
{
  "servers": {
    "playwright-test": {
      "type": "stdio",
      "command": "npx",
      "args": ["playwright", "run-test-mcp-server"]
    },
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-filesystem",
        "c:\\Users\\[USER]\\Desktop\\playwright-e2e"
      ]
    }
  }
}
```

### 3. **Configuración de Agente**

Archivo `.github/agents/playwright-test-generator.agent.md`:
- Define el comportamiento del agente IA
- Especifica cómo generar tests
- Configura el formato de salida

---

## 🚀 Cómo usar los Agentes

### **Comandos típicos para el agente:**

```bash
# Generar tests desde documentación
"Genera tests para login basado en esta especificación"

# Explorar página web y crear tests
"Inspecciona https://www.saucedemo.com y crea tests del carrito"

# Crear Page Objects automáticamente
"Crea ProductsPage.js para esta página web"

# Generar tests con datos aleatorios
"Crea tests de API con IDs aleatorios basado en esta documentación"
```

### **Workflow típico:**

1. 📝 **Describes** tu necesidad en lenguaje natural
2. 🔍 **El agente explora** la web/documentación automáticamente
3. 🧪 **Genera tests** completos con Page Objects
4. ✅ **Ejecuta y valida** los tests generados

---

## 🔧 MCP Server: El Corazón del Sistema

### **¿Qué hace el MCP Server?**

El **Model Context Protocol Server** actúa como **traductor** entre:

- 🤖 **Agente IA** ↔ 🌐 **Playwright**
- 📝 **Lenguaje natural** ↔ 💻 **Código JavaScript**

### **Herramientas disponibles del MCP Server:**

```javascript
// Navegación
await browser_navigate('https://ejemplo.com')

// Interacción con elementos
await browser_click(selector)
await browser_type(selector, 'texto')
await browser_fill(selector, 'valor')

// Inspección y captura
await browser_snapshot()
await browser_take_screenshot()

// Generación de código
await generator_write_test(código)
await generator_setup_page()
```

---

## 🎪 Ejemplo Práctico

### **Input (Lenguaje natural):**
```
"Crea un test que haga login en Swag Labs y agregue productos aleatorios al carrito"
```

### **Proceso del Agente:**

1. 🔍 **Navega** a https://www.saucedemo.com
2. 🕵️ **Inspecciona** elementos de login y productos
3. 🧪 **Genera** Page Objects (LoginPage, ProductsPage, CartPage)
4. 📝 **Crea** test completo con datos aleatorios
5. ✅ **Ejecuta** y valida automáticamente

### **Output (Código generado):**
```javascript
test('Login y agregar productos aleatorios', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  
  await loginPage.navigate();
  await loginPage.enterUsername('standard_user');
  await loginPage.enterPassword('secret_sauce');
  await loginPage.clickLoginButton();
  
  const addedProducts = await productsPage.addMultipleRandomProducts(3);
  const cartCount = await productsPage.getCartItemCount();
  expect(cartCount).toBe(3);
});
```

---

## 🎯 Ventajas vs Playwright Tradicional

| **Agentes IA** | **Playwright Manual** |
|----------------|------------------------|
| 🤖 **IA genera código completo** | 👨‍💻 **Escribes todo manualmente** |
| 🔍 **Explora web automáticamente** | 🕵️ **Inspeccionas elementos manual** |
| ⚡ **Setup en minutos** | ⏱️ **Setup en horas/días** |
| 📚 **Aprende de documentación** | 📖 **Lees y traduces manual** |
| 🔄 **Auto-actualización de tests** | 🛠️ **Mantenimiento manual** |
| 🎯 **Datos aleatorios integrados** | 🎲 **Hardcodeas datos de prueba** |
| 📊 **Page Objects automáticos** | 🏗️ **Diseñas arquitectura manual** |

---

## 🏆 Casos de Uso Ideales

### ✅ **Perfecto para:**

- **Prototipado rápido** de tests nuevos
- **Exploración** de aplicaciones desconocidas
- **Generación automática** de Page Objects
- **Tests desde documentación** funcional
- **Regresión automática** de funcionalidades
- **Data-driven testing** con datos aleatorios
- **Cobertura rápida** de happy paths

### ⚠️ **Limitaciones:**

- **Lógica de negocio compleja** muy específica
- **Validaciones personalizadas** del dominio
- **Integraciones** con sistemas no estándar
- **Tests de performance** muy específicos

---

## 🧪 Tests Generados en este Proyecto

### **Frontend E2E Tests:**

1. **Login Tests** (`login.spec.js`)
   - Data-driven testing con CSV
   - Múltiples usuarios de prueba
   - Validación de navegación post-login

2. **Shopping Cart Tests** (`shopping-cart.spec.js`)
   - Agregar productos aleatorios
   - Proceso completo de checkout
   - Validación de precios y cálculos
   - Flujos de continuidad

### **API Tests:**

1. **Basic Objects Tests** (`objects.spec.js`)
   - Tests GET y POST básicos
   - Validación de estructura de datos

2. **Store Objects Tests** (`get-store-objects.spec.js`)
   - IDs aleatorios para testing
   - Casos de error (404, 400)
   - Tests de performance paralelos
   - Validación de precios específicos

---

## 🛠️ Comandos Útiles

### **Agentes:**
```bash
# Inicializar agentes
npx playwright init-agents --loop=vscode

# Ver agentes disponibles
npx playwright agents list

# Ejecutar con agente activo
npx playwright test --agent
```

### **Tests:**
```bash
# Ejecutar todos los tests
npm test

# Tests de frontend solamente
npm run test:frontend

# Tests de API solamente
npm run test:api

# Ver reporte HTML
npx playwright show-report
```

### **Debug:**
```bash
# Debug interactivo
npx playwright test --debug

# Modo headed (ver navegador)
npx playwright test --headed

# Generar código interactivamente
npx playwright codegen https://www.saucedemo.com/
```

---

## 📊 Resultados de Tests

### **Últimos resultados:**

- **Frontend E2E**: ✅ 6 tests / 6 passed (14.5s)
- **API Tests**: ✅ 8 tests / 8 passed (7.0s)
- **Total**: ✅ 14 tests / 14 passed

### **Cobertura:**
- 🌐 **3 navegadores** (Chromium, Firefox, Safari)
- 🔌 **API REST** completa
- 🛒 **E2E flows** completos
- 🎲 **Datos aleatorios** en cada ejecución

---

## 🚀 Tecnologías Utilizadas

- **Playwright** - Framework de automatización
- **Playwright Agents** - IA para generación automática
- **MCP Server** - Protocolo de comunicación con IA
- **Node.js** - Runtime de JavaScript
- **VS Code** - IDE integrado con agentes

---

## 🎉 Conclusión

Los **Agentes de Playwright** representan el **futuro de la automatización de tests**:

- 🧠 **Inteligencia artificial** totalmente integrada
- ⚡ **Velocidad de desarrollo** 10x más rápida
- 🎯 **Precisión** en generación de código
- 🔄 **Mantenimiento** prácticamente automático
- 🚀 **Escalabilidad** sin límites técnicos

**¡Es como tener un QA Automation Engineer senior trabajando 24/7 en tu equipo!** 🤖✨

---

## 👥 Contribuciones

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/mi-feature`
3. Commit: `git commit -m 'Agrego nueva funcionalidad'`
4. Push: `git push origin feature/mi-feature`
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia ISC.

## 👤 Autor

Valentina Bianchini

---

**Última actualización:** January 14, 2026