# Frontend E2E Tests

Carpeta destinada a pruebas end-to-end del frontend usando Playwright con **Data-Driven Testing**.

## Estructura

- `tests/` - Contiene los archivos de prueba (.spec.js)
  - `login.spec.js` - Tests de login con datos del CSV
- `pages/` - Contiene los Page Objects para abstracción de elementos
  - `BasePage.js` - Clase base con métodos comunes
  - `LoginPage.js` - Page Object para la página de login
- `csv/` - Archivos CSV con datos de prueba
  - `credentials.csv` - Usuarios y contraseñas para login
- `utils/` - Utilidades y helpers
  - `csvHelper.js` - Helper para leer archivos CSV

## Data-Driven Testing

Los tests de login utilizan **Data-Driven Testing**, leyendo múltiples conjuntos de credenciales desde `csv/credentials.csv`. Esto permite:
- ✅ Un único test que se ejecuta con múltiples usuarios
- ✅ Fácil mantenimiento: agregar usuarios editando el CSV
- ✅ Separación de datos de prueba del código

### Agregar nuevos usuarios

Edita `frontend/csv/credentials.csv`:
```csv
username,password,description
standard_user,secret_sauce,Usuario estándar
problem_user,secret_sauce,Usuario con problemas
performance_glitch_user,secret_sauce,Usuario con problemas de rendimiento
nuevo_usuario,nueva_password,Descripción del nuevo usuario
```

El test se ejecutará automáticamente para todos los usuarios del CSV.

## Uso

**Nota:** Los tests de frontend usan la configuración centralizada en `/playwright.config.js` (raíz del proyecto) bajo los proyectos `frontend-chromium`, `frontend-firefox` y `frontend-webkit`.

### Ejecutar tests de frontend
```bash
npm run test:frontend
```

### Ejecutar en un navegador específico
```bash
npx playwright test --project=frontend-chromium
npx playwright test --project=frontend-firefox
npx playwright test --project=frontend-webkit
```
