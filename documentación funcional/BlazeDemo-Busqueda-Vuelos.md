# BlazeDemo - Funcionalidad de Búsqueda de Vuelos

## 📍 Ubicación
**URL:** https://blazedemo.com/  
**Página:** Página Principal / Home

## 🎯 Descripción Funcional

La funcionalidad de búsqueda de vuelos permite a los usuarios seleccionar ciudades de origen y destino para encontrar vuelos disponibles. Es el punto de entrada principal del sistema y la primera interacción del usuario.

## 🖥️ Elementos de la Interfaz

### Título Principal
- **Texto:** "Welcome to the Simple Travel Agency!"
- **Tipo:** Heading nivel 1
- **Propósito:** Bienvenida y branding del sitio

### Mensaje Descriptivo
- **Texto:** "This is a sample site you can test with BlazeMeter!"
- **Propósito:** Indicar que es un sitio de demostración para testing

### Enlace Promocional
- **Texto:** "Check out our destination of the week! The Beach!"
- **Destino:** `/vacation.html`
- **Propósito:** Promoción de destinos especiales

## 🔧 Controles de Búsqueda

### Selector de Ciudad de Origen
- **Etiqueta:** "Choose your departure city:"
- **Tipo:** Combobox/Dropdown
- **Atributo:** `name="fromPort"`
- **Opciones disponibles:**
  - Paris (seleccionado por defecto)
  - Philadelphia
  - Boston
  - Portland
  - San Diego
  - Mexico City
  - São Paolo

### Selector de Ciudad de Destino  
- **Etiqueta:** "Choose your destination city:"
- **Tipo:** Combobox/Dropdown
- **Atributo:** `name="toPort"`
- **Opciones disponibles:**
  - Buenos Aires (seleccionado por defecto)
  - Rome
  - London
  - Berlin
  - New York
  - Dublin
  - Cairo

### Botón de Búsqueda
- **Texto:** "Find Flights"
- **Tipo:** Button
- **Acción:** Envía formulario de búsqueda
- **Destino:** `/reserve.php`

## ⚡ Comportamiento Funcional

### Flujo Normal
1. Usuario accede a la página principal
2. Ve las opciones predeterminadas seleccionadas (Paris → Buenos Aires)
3. Cambia ciudad de origen usando el dropdown
4. Cambia ciudad de destino usando el dropdown
5. Hace click en "Find Flights"
6. Sistema procesa la búsqueda
7. Usuario es redirigido a página de resultados

### Validaciones
- **Ciudades requeridas:** Sistema permite búsqueda con cualquier combinación válida
- **Datos obligatorios:** Ambos campos deben tener selección
- **Combinaciones válidas:** Todas las combinaciones de origen-destino son permitidas

## 📋 Casos de Uso

### CU-01: Búsqueda con Selecciones Predeterminadas
- **Actor:** Usuario nuevo
- **Precondición:** Acceso a página principal
- **Flujo:** Click directo en "Find Flights" con Paris → Buenos Aires
- **Resultado:** Muestra vuelos disponibles para la ruta predeterminada

### CU-02: Búsqueda con Ciudad Personalizada
- **Actor:** Usuario
- **Precondición:** Acceso a página principal
- **Flujo:** Cambiar origen a "Boston", destino a "London", click "Find Flights"
- **Resultado:** Muestra vuelos Boston → London

### CU-03: Exploración de Múltiples Rutas
- **Actor:** Usuario comparando opciones
- **Precondición:** Acceso a página principal
- **Flujo:** Probar diferentes combinaciones de ciudades
- **Resultado:** Diferentes resultados de vuelos por cada combinación

## 🔍 Criterios de Aceptación

### Funcionales
- ✅ Dropdowns muestran todas las ciudades disponibles
- ✅ Selecciones se mantienen visualmente actualizadas
- ✅ Botón "Find Flights" está siempre habilitado
- ✅ Búsqueda funciona con cualquier combinación válida
- ✅ Redirección exitosa a página de resultados

### No Funcionales  
- ✅ Carga de página ≤ 3 segundos
- ✅ Dropdowns responden inmediatamente al click
- ✅ Interfaz responsive en diferentes tamaños de pantalla
- ✅ Accesibilidad con navegación por teclado

## 🐛 Problemas Conocidos

### Errores de Consola
- **Error:** "Mixed Content: The page at 'https://blazedemo.com/' was loaded over HTTPS..."
- **Impacto:** No afecta funcionalidad, solo genera warnings
- **Estado:** Conocido, no crítico

### Dependencias JavaScript
- **Error:** "TypeError: a is not a function" en bootstrap.min.js
- **Error:** "ReferenceError: jQuery is not defined"
- **Impacto:** Funcionalidad básica no se ve afectada
- **Estado:** Conocido, no bloquea operaciones principales

## 📊 Datos de Prueba

### Combinaciones Recomendadas para Testing
1. **Ruta Popular:** Boston → London
2. **Ruta Internacional:** Paris → Rome  
3. **Ruta Domestic US:** Philadelphia → New York
4. **Ruta Larga:** San Diego → Berlin
5. **Ruta Predeterminada:** Paris → Buenos Aires

### Selectores para Automatización
```javascript
// Seleccionar ciudad de origen
page.locator('select[name="fromPort"]').selectOption('Boston');

// Seleccionar ciudad de destino  
page.locator('select[name="toPort"]').selectOption('London');

// Hacer búsqueda
page.getByRole('button', { name: 'Find Flights' }).click();
```

## 📈 Métricas de Success

- **Tasa de conversión:** % de búsquedas que llevan a selección de vuelo
- **Abandono:** % de usuarios que salen sin hacer búsqueda
- **Rutas populares:** Combinaciones más buscadas
- **Tiempo promedio:** Tiempo desde carga hasta búsqueda ejecutada