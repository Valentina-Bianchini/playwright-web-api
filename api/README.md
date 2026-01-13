# API Tests

Carpeta destinada a pruebas de APIs usando Playwright.

## Estructura

- `tests/` - Contiene los archivos de prueba de APIs
  - `objects.spec.js` - Tests del endpoint /objects

**Nota:** Los tests de API usan la configuración centralizada en `/playwright.config.js` (raíz del proyecto) bajo el proyecto `api`.

## API Base URL

```
https://api.restful-api.dev
```

## Endpoints Testeados

### GET /objects/{id}
- **Descripción**: Obtiene un objeto específico de la tienda online por su ID
- **URL**: `https://api.restful-api.dev/objects/7`
- **Componentes**:
  - **API Base**: `https://api.restful-api.dev`
  - **Endpoint**: `/objects`
  - **Atributo/ID**: `7`

## Tests Implementados

### objects.spec.js
1. **GET /objects/{id} - Debe retornar status 200**
   - Verifica que la API responde correctamente con código 200

2. **GET /objects/{id} - Debe retornar la estructura correcta con todos los campos**
   - Verifica el status 200
   - Verifica que el ID sea "7"
   - Verifica que todos los campos existan y contengan información:
     - `id`: "7"
     - `name`: "Apple MacBook Pro 16"
     - `data.year`: 2019
     - `data.price`: 1849.99
     - `data["CPU model"]`: "Intel Core i9"
     - `data["Hard disk size"]`: "1 TB"

## Uso

### Ejecutar tests de API
```bash
npm run test:api
```

### Solo ejecutar sin reporte
```bash
px playwright test --project=api
```

### Ver reporte anterior
```bash
npm run test:report
```
