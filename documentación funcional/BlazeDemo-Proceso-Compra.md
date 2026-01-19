# BlazeDemo - Funcionalidad de Proceso de Compra

## 📍 Ubicación
**URL:** https://blazedemo.com/purchase.php  
**Página:** Formulario de Compra / Purchase  
**Acceso:** Después de seleccionar vuelo en página de resultados

## 🎯 Descripción Funcional

El proceso de compra permite al usuario completar la reserva del vuelo seleccionado proporcionando información personal y detalles de pago. Incluye confirmación de reserva y formulario completo para finalizar la transacción.

## 🖥️ Elementos de la Interfaz

### Confirmación de Reserva
- **Encabezado:** "Your flight from TLV to SFO has been reserved."
- **Tipo:** Heading nivel 2
- **Nota:** Los códigos de aeropuerto no coinciden con la selección original (limitación del demo)

### Detalles del Vuelo Reservado
- **Aerolínea:** "Airline: United"
- **Número de Vuelo:** "Flight Number: UA954"  
- **Precio Base:** "Price: 400"
- **Tasas e Impuestos:** "Arbitrary Fees and Taxes: 514.76"
- **Costo Total:** Destacado con énfasis "$914.76"

### Instrucciones
- **Texto:** "Please submit the form below to purchase the flight."
- **Propósito:** Guiar al usuario al siguiente paso

## 🏷️ Formulario de Información Personal

### Campo: Nombre Completo
- **Etiqueta:** "Name"
- **Atributo:** `name="inputName"`
- **Tipo:** Text input
- **Placeholder:** "First Last"
- **Requerido:** Sí

### Campo: Dirección
- **Etiqueta:** "Address"
- **Atributo:** `name="address"`
- **Tipo:** Text input  
- **Placeholder:** "123 Main St."
- **Requerido:** Sí

### Campo: Ciudad
- **Etiqueta:** "City"
- **Atributo:** `name="city"`
- **Tipo:** Text input
- **Placeholder:** "Anytown"  
- **Requerido:** Sí

### Campo: Estado
- **Etiqueta:** "State"
- **Atributo:** `name="state"`
- **Tipo:** Text input
- **Placeholder:** Ninguno
- **Requerido:** Sí

### Campo: Código Postal
- **Etiqueta:** "Zip Code"
- **Atributo:** `name="zipCode"`
- **Tipo:** Text input
- **Placeholder:** "12345"
- **Requerido:** Sí

## 💳 Formulario de Información de Pago

### Campo: Tipo de Tarjeta
- **Etiqueta:** "Card Type"
- **Atributo:** `name="cardType"`
- **Tipo:** Dropdown/Select
- **Opciones:**
  - Visa (predeterminado)
  - American Express
  - Diner's Club
- **Requerido:** Sí

### Campo: Número de Tarjeta
- **Etiqueta:** "Credit Card Number"
- **Atributo:** `name="creditCardNumber"`
- **Tipo:** Text input
- **Formato:** 16 dígitos sin espacios
- **Requerido:** Sí

### Campo: Mes de Expiración
- **Etiqueta:** "Month"
- **Atributo:** `name="creditCardMonth"`
- **Tipo:** Text input
- **Valor Predeterminado:** "11"
- **Formato:** MM (01-12)
- **Requerido:** Sí

### Campo: Año de Expiración  
- **Etiqueta:** "Year"
- **Atributo:** `name="creditCardYear"`
- **Tipo:** Text input
- **Valor Predeterminado:** "2017"
- **Formato:** YYYY
- **Requerido:** Sí

### Campo: Nombre en Tarjeta
- **Etiqueta:** "Name on Card"
- **Atributo:** `name="nameOnCard"`
- **Tipo:** Text input
- **Placeholder:** "John Smith"
- **Requerido:** Sí

## ✅ Controles Adicionales

### Checkbox "Remember me"
- **Atributo:** checkbox input
- **Texto:** "Remember me"
- **Funcionalidad:** Presumiblemente para recordar datos (no funcional en demo)
- **Requerido:** No

### Botón de Compra
- **Texto:** "Purchase Flight"
- **Tipo:** Submit button
- **Acción:** Procesa formulario y redirige a confirmación
- **Destino:** `/confirmation.php`

## ⚡ Comportamiento Funcional

### Flujo Normal
1. Usuario llega desde selección de vuelo
2. Ve confirmación de que el vuelo está "reservado"
3. Revisa detalles de precio total ($914.76)
4. Completa información personal (5 campos)
5. Completa información de tarjeta de crédito (5 campos)
6. Opcionalmente marca "Remember me"
7. Click en "Purchase Flight"
8. Sistema procesa datos
9. Redirección a página de confirmación

### Validaciones de Formulario
- **Campos requeridos:** Todos los campos de texto deben ser completados
- **Formato de tarjeta:** Acepta números sin validación estricta
- **Fechas:** No valida fechas futuras o formatos específicos
- **Envío:** Permite submit con cualquier combinación de datos válidos

## 📋 Casos de Uso

### CU-01: Compra con Datos Válidos Completos
- **Actor:** Usuario con información completa
- **Precondición:** Vuelo seleccionado, acceso a formulario
- **Flujo:** Completar todos los campos correctamente, submit
- **Resultado:** Transacción exitosa, redirección a confirmación

### CU-02: Compra con Tarjeta Visa (Predeterminada)
- **Actor:** Usuario con tarjeta Visa
- **Precondición:** Acceso a formulario de compra
- **Flujo:** Usar tipo de tarjeta predeterminado, completar datos
- **Resultado:** Transacción procesada correctamente

### CU-03: Compra con American Express
- **Actor:** Usuario con tarjeta AMEX
- **Precondición:** Acceso a formulario de compra
- **Flujo:** Cambiar tipo de tarjeta a American Express, completar
- **Resultado:** Transacción procesada con tipo de tarjeta alternativo

### CU-04: Compra con Checkbox Marcado
- **Actor:** Usuario que desea ser recordado
- **Precondición:** Formulario completado
- **Flujo:** Marcar "Remember me" antes de submit
- **Resultado:** Preferencia registrada (aunque no funcional)

## 🔍 Criterios de Aceptación

### Funcionales
- ✅ Formulario acepta datos en todos los campos requeridos
- ✅ Dropdown de tipo de tarjeta permite selección de las 3 opciones
- ✅ Botón "Purchase Flight" procesa envío correctamente
- ✅ Campos con placeholders muestran ejemplos apropiados
- ✅ Costo total se muestra claramente destacado

### Datos de Vuelo
- ✅ Mensaje de confirmación indica vuelo "reservado"
- ✅ Detalles de precio incluyen base + tasas
- ✅ Cálculo de total es consistente
- ✅ Información de aerolínea y vuelo visible

### Navegación
- ✅ Formulario se submit exitosamente con datos completos
- ✅ Redirección a página de confirmación funciona
- ✅ Datos ingresados se procesan y pasan a confirmación

## 🐛 Problemas Conocidos

### Inconsistencia de Datos de Vuelo
- **Problema:** Vuelo mostrado no coincide con selección anterior
- **Detalle:** Siempre muestra "United Airlines" y "TLV to SFO"
- **Impacto:** Usuario ve información diferente a la seleccionada
- **Estado:** Limitación conocida del demo

### Validación de Campos
- **Problema:** Validación básica o inexistente
- **Detalle:** Acepta cualquier texto en campos de tarjeta
- **Ejemplo:** "1234" es aceptado como número de tarjeta válido
- **Estado:** Comportamiento del demo, no producción

### Fechas Predeterminadas Expiradas
- **Problema:** Año predeterminado "2017" ya expiró
- **Impacto:** Usuario debe cambiar manualmente a fecha futura
- **Estado:** Datos estáticos del demo

## 📊 Datos para Testing

### Datos de Prueba Válidos
```javascript
// Información Personal
const personalData = {
  name: "John Doe",
  address: "123 Main Street", 
  city: "Boston",
  state: "MA",
  zipCode: "02101"
};

// Información de Tarjeta
const cardData = {
  cardType: "Visa", // o "American Express", "Diner's Club"
  cardNumber: "4111111111111111", // Número de prueba Visa
  month: "12",
  year: "2025", 
  nameOnCard: "John Doe"
};
```

### Selectores para Automatización
```javascript
// Llenar información personal
await page.locator('input[name="inputName"]').fill('John Doe');
await page.locator('input[name="address"]').fill('123 Main Street');
await page.locator('input[name="city"]').fill('Boston');
await page.locator('input[name="state"]').fill('MA');
await page.locator('input[name="zipCode"]').fill('02101');

// Llenar información de tarjeta
await page.locator('select[name="cardType"]').selectOption('Visa');
await page.locator('input[name="creditCardNumber"]').fill('4111111111111111');
await page.locator('input[name="creditCardMonth"]').fill('12');
await page.locator('input[name="creditCardYear"]').fill('2025');
await page.locator('input[name="nameOnCard"]').fill('John Doe');

// Completar compra
await page.getByRole('button', { name: 'Purchase Flight' }).click();
```

## 📈 Métricas de Conversión

### Abandono de Formulario
- **Campos críticos:** Número de tarjeta es típicamente donde abandonan
- **Tiempo de llenado:** Promedio 2-3 minutos para completar
- **Errores comunes:** Fechas expiradas, campos vacíos

### Tasa de Finalización
- **Éxito:** % de formularios enviados exitosamente
- **Reintento:** % de usuarios que corrigen errores y reenvían
- **Tipos de tarjeta:** Distribución de uso por tipo seleccionado

## 🎨 Elementos Visuales

### Organización del Formulario
- **Secciones:** Información personal y pago claramente separadas
- **Campos:** Etiquetas descriptivas encima de cada input
- **Botón principal:** "Purchase Flight" destacado como CTA principal
- **Costo total:** Números grandes y enfatizados para transparencia

### Estados Interactivos
- **Focus states:** Campos activos visualmente diferenciados
- **Hover states:** Botón principal responde a hover
- **Placeholders:** Texto de ayuda en campos que lo requieren