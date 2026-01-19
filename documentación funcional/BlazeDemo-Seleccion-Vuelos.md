# BlazeDemo - Funcionalidad de Selección de Vuelos

## 📍 Ubicación
**URL:** https://blazedemo.com/reserve.php  
**Página:** Página de Resultados de Vuelos  
**Acceso:** Después de búsqueda desde página principal

## 🎯 Descripción Funcional

La funcionalidad de selección de vuelos presenta los resultados de búsqueda en formato tabular, permitiendo al usuario revisar opciones disponibles y seleccionar el vuelo deseado para proceder con la reserva.

## 🖥️ Elementos de la Interfaz

### Encabezado de Resultados
- **Formato:** "Flights from [ORIGEN] to [DESTINO]:"
- **Tipo:** Heading nivel 3
- **Ejemplo:** "Flights from Boston to London:"
- **Propósito:** Confirmar los criterios de búsqueda aplicados

### Tabla de Resultados
- **Estructura:** Tabla HTML con header y múltiples filas de datos
- **Columnas:**
  - **Choose:** Botón de selección
  - **Flight #:** Número de vuelo  
  - **Airline:** Aerolínea operadora
  - **Departs: [CIUDAD]:** Hora de salida
  - **Arrives: [CIUDAD]:** Hora de llegada  
  - **Price:** Precio en USD

## ✈️ Datos de Vuelos Disponibles

### Vuelos Típicos (Boston → London)

| Flight # | Airline | Departure | Arrival | Price |
|----------|---------|-----------|---------|--------|
| 43 | Virgin America | 1:43 AM | 9:45 PM | $472.56 |
| 234 | United Airlines | 7:43 AM | 10:45 PM | $432.98 |
| 9696 | Aer Lingus | 5:27 AM | 8:22 PM | $200.98 |
| 12 | Virgin America | 11:23 AM | 1:45 PM | $765.32 |
| 4346 | Lufthansa | 1:45 AM | 8:34 PM | $233.98 |

### Aerolíneas Disponibles
- **Virgin America** - Múltiples horarios, precios variables
- **United Airlines** - Vuelos regulares, precios competitivos
- **Aer Lingus** - Frecuentemente la opción más económica
- **Lufthansa** - Vuelos internacionales, precios moderados

## 🔧 Controles de Selección

### Botones "Choose This Flight"
- **Ubicación:** Primera columna de cada fila
- **Texto:** "Choose This Flight"
- **Tipo:** Button clickeable
- **Acción:** Redirige a página de compra con vuelo seleccionado
- **Destino:** `/purchase.php`

## ⚡ Comportamiento Funcional

### Flujo Normal
1. Usuario llega desde página de búsqueda
2. Sistema muestra tabla con vuelos disponibles (típicamente 5 opciones)
3. Usuario revisa opciones comparando precios, horarios y aerolíneas
4. Usuario hace click en "Choose This Flight" del vuelo preferido
5. Sistema procesa selección
6. Usuario es redirigido a formulario de compra

### Lógica de Negocio
- **Cantidad de resultados:** Siempre muestra exactamente 5 vuelos
- **Precios:** Varían significativamente ($200-$800 aproximadamente)
- **Horarios:** Diferentes horas del día disponibles
- **Disponibilidad:** Todos los vuelos mostrados están "disponibles"

## 📋 Casos de Uso

### CU-01: Selección por Precio Menor
- **Actor:** Usuario consciente del precio
- **Precondición:** Visualización de resultados
- **Flujo:** Identificar vuelo más barato, click en "Choose This Flight"
- **Resultado:** Proceder a compra con opción más económica

### CU-02: Selección por Horario Conveniente  
- **Actor:** Usuario con preferencias de tiempo
- **Precondición:** Visualización de resultados
- **Flujo:** Comparar horarios, seleccionar el más conveniente
- **Resultado:** Proceder a compra con horario preferido

### CU-03: Selección por Aerolínea Preferida
- **Actor:** Usuario con lealtad a aerolínea
- **Precondición:** Visualización de resultados  
- **Flujo:** Buscar aerolínea específica, seleccionar independiente del precio
- **Resultado:** Proceder a compra con aerolínea preferida

### CU-04: Comparación Detallada
- **Actor:** Usuario indeciso
- **Precondición:** Visualización de resultados
- **Flujo:** Analizar todas las opciones, comparar múltiples factores
- **Resultado:** Selección informada después de análisis completo

## 🔍 Criterios de Aceptación

### Funcionales
- ✅ Tabla muestra exactamente 5 opciones de vuelos
- ✅ Cada vuelo tiene botón "Choose This Flight" funcional
- ✅ Precios mostrados en formato USD con decimales
- ✅ Horarios en formato 12 horas con AM/PM
- ✅ Números de vuelo únicos para cada opción
- ✅ Click en botón redirige a página de compra correctamente

### Datos Mostrados
- ✅ Encabezado refleja ciudades de búsqueda originales
- ✅ Columnas alineadas correctamente
- ✅ Información consistente en cada fila
- ✅ Precios ordenados de manera lógica

### Navegación
- ✅ Botones claramente visibles y clickeables
- ✅ Hover states apropiados en botones
- ✅ Redirección exitosa manteniendo contexto de selección

## 🐛 Problemas Conocidos

### Inconsistencia de Datos
- **Problema:** Detalles del vuelo en página de compra no coinciden con selección
- **Ejemplo:** Seleccionar Aer Lingus pero compra muestra "United Airlines"
- **Impacto:** Confusión del usuario, datos no persistentes
- **Estado:** Limitación conocida del demo

### Errores de Consola
- **Error:** "Mixed Content" warnings al cargar página
- **Error:** JavaScript errors por dependencias faltantes
- **Impacto:** No afecta funcionalidad principal
- **Estado:** No crítico para testing

## 📊 Datos para Testing

### Vuelos por Orden de Precio (Ascendente)
1. **Más Barato:** Aer Lingus - $200.98
2. **Económico:** Lufthansa - $233.98  
3. **Medio:** United Airlines - $432.98
4. **Alto:** Virgin America - $472.56
5. **Más Caro:** Virgin America - $765.32

### Selectores para Automatización
```javascript
// Seleccionar primer vuelo disponible
page.getByRole('button', { name: 'Choose This Flight' }).first().click();

// Seleccionar vuelo más barato (Aer Lingus)
page.getByRole('row', { name: /Aer Lingus.*\$200\.98/ })
    .getByRole('button').click();

// Seleccionar por aerolínea específica
page.getByRole('row', { name: /United Airlines/ })
    .getByRole('button').click();

// Verificar cantidad de vuelos mostrados
const flightCount = await page.getByRole('button', { name: 'Choose This Flight' }).count();
expect(flightCount).toBe(5);
```

## 📈 Métricas de Análisis

### Patrones de Selección
- **Por precio:** % de usuarios que eligen opción más barata
- **Por horario:** % que prioriza horarios convenientes  
- **Por aerolínea:** % que selecciona marca específica
- **Tiempo de decisión:** Promedio desde vista hasta selección

### Abandono de Página
- **Tasa de rebote:** % usuarios que salen sin seleccionar
- **Vuelta atrás:** % que regresa a búsqueda para cambiar criterios
- **Conversión:** % que procede a formulario de compra

## 🎨 Elementos Visuales

### Layout de Tabla
- **Encabezados:** Fondo diferenciado, texto en negrita
- **Filas alternas:** Facilita lectura de múltiples opciones
- **Botones:** Destacados visualmente para acción principal
- **Alineación:** Precios alineados a la derecha, texto a la izquierda

### Responsividad
- **Desktop:** Tabla completa visible
- **Tablet:** Posible scroll horizontal
- **Mobile:** Adaptación de columnas prioritarias