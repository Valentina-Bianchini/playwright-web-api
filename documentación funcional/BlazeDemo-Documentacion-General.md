# BlazeDemo - Documentación Funcional General

## 📋 Información General

**URL:** https://blazedemo.com/  
**Tipo:** Aplicación web de reservas de vuelos  
**Propósito:** Demo para testing de aplicaciones de viajes  
**Fecha de documentación:** 15 de enero de 2026

## 🎯 Descripción del Sistema

BlazeDemo es una aplicación web de demostración que simula un sistema de reservas de vuelos. Permite a los usuarios buscar vuelos entre diferentes ciudades, seleccionar opciones disponibles y completar el proceso de compra con información de pago simulada.

## 🏗️ Arquitectura de la Aplicación

### Estructura de Páginas
- **Página Principal** (`/`) - Búsqueda de vuelos
- **Página de Resultados** (`/reserve.php`) - Lista de vuelos disponibles  
- **Página de Compra** (`/purchase.php`) - Formulario de datos personales y pago
- **Página de Confirmación** (`/confirmation.php`) - Detalles de transacción completada

### Navegación Principal
- **Travel The World** - Enlace a página principal
- **Home** - Enlace a página de inicio
- **Destination of the Week** - Enlace a página promocional de destinos

## 🌍 Ciudades y Rutas Disponibles

### Ciudades de Origen
- Paris
- Philadelphia  
- Boston
- Portland
- San Diego
- Mexico City
- São Paolo

### Ciudades de Destino
- Buenos Aires
- Rome
- London
- Berlin
- New York
- Dublin
- Cairo

## 💳 Métodos de Pago Soportados

- **Visa** (predeterminado)
- **American Express**
- **Diner's Club**

## 🔧 Características Técnicas

### Tecnologías Observadas
- Frontend: HTML, CSS, JavaScript
- Framework CSS: Bootstrap
- Manejo de formularios: PHP (backend)
- API de pagos: Integración con sandbox de Visa (simulada)

### Limitaciones Conocidas
- Errores de consola por dependencias faltantes (jQuery, Bootstrap)
- Contenido mixto HTTP/HTTPS
- Datos de vuelos simulados (no reflejan selecciones reales)

## 📊 Flujo de Usuario Completo

1. **Acceso** → Usuario visita blazedemo.com
2. **Búsqueda** → Selecciona ciudades de origen y destino
3. **Resultados** → Ve lista de vuelos disponibles con precios
4. **Selección** → Elige vuelo específico
5. **Datos** → Completa información personal y de pago
6. **Confirmación** → Recibe detalles de transacción y ID único

## 🎨 Elementos de UI Principales

### Componentes Interactivos
- Dropdowns de selección de ciudades
- Botones de búsqueda y selección
- Formularios con validación básica
- Tablas de resultados interactivas
- Checkbox de "Remember me"

### Información Mostrada
- Precios de vuelos en USD
- Horarios de salida y llegada
- Números de vuelo y aerolíneas
- Tasas e impuestos calculados
- Detalles de transacción enmascarados

## 🔍 Casos de Uso Principales

1. **Búsqueda Simple**: Usuario busca vuelos entre dos ciudades
2. **Comparación**: Usuario compara precios y horarios de múltiples vuelos
3. **Reserva Rápida**: Usuario completa compra con datos mínimos
4. **Verificación**: Usuario confirma detalles de transacción

## 📈 Métricas y Validaciones

### Campos Obligatorios
- Ciudades de origen y destino
- Información personal completa (nombre, dirección, ciudad, estado, código postal)
- Datos de tarjeta de crédito (número, fecha, nombre en tarjeta)

### Validaciones Implementadas
- Formato de números de tarjeta
- Campos requeridos en formulario
- Generación de ID de transacción único
- Enmascarado de información sensible

## 🚨 Consideraciones de Testing

- Aplicación ideal para pruebas de E2E
- Datos consistentes entre sesiones
- Respuestas predecibles del sistema
- Flujo completo sin dependencias externas críticas
- Adecuada para pruebas de carga y automatización