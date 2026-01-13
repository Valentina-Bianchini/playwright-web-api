# Frontend E2E Tests

Carpeta destinada a pruebas end-to-end del frontend usando Playwright.

## Estructura

- `tests/` - Contiene los archivos de prueba (.spec.js)
- `pages/` - Contiene los Page Objects para abstracción de elementos

## Uso

**Nota:** Los tests de frontend usan la configuración centralizada en `/playwright.config.js` (raíz del proyecto) bajo los proyectos `frontend-chromium`, `frontend-firefox` y `frontend-webkit`.

### Ejecutar tests de frontend
```bash
npm run test:frontend
```

### Ejecutar en un navegador específico
```bash
px playwright test --project=frontend-chromium
px playwright test --project=frontend-firefox
px playwright test --project=frontend-webkit
```
