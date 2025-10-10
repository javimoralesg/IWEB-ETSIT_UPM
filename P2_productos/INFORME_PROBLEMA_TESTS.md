# Informe: Inconsistencia en Tests del Autocorrector

**Para:** Profesor/a de IWEB  
**De:** Javier Morales Galisteo  
**Asunto:** Problema detectado en tests de comentarios del autocorrector - P2_productos  
**Fecha:** 4 de octubre de 2025

---

## Resumen del Problema

He detectado una inconsistencia entre los datos de prueba del autocorrector y las expectativas de los tests para la funcionalidad de comentarios de productos, específicamente en los tests:

1. "La aplicación en la página del producto renderiza los últimos 3 comentarios del producto"
2. "La aplicación en la página del producto renderiza los últimos 3 comentarios del producto (2º render)"

## Descripción Técnica

### Configuración del Test

El archivo `autocorector/tests/checks.jsx` contiene la siguiente configuración (líneas 11-24):

```javascript
const mytestconfig = {
  server_url: "https://dummyjson.com/products",
  num_items: 100,  
  use_server: false,  // ← Fuerza uso de datos locales
  loading_timeout_ms: 2000
};

jest.mock('../../src/config/config', () => ({
  __esModule: true,
  default: mytestconfig  
}));
```

Esto hace que **todos los tests** del archivo utilicen `use_server: false`, por lo que la aplicación carga los datos de `src/constants/products.js` en lugar de usar el fetch mockeado.

### El Problema Específico

En los tests de comentarios (líneas 244-282), se realiza un mock de `fetch`:

```javascript
global.fetch = jest.fn(() => Promise.resolve({
  status: 200,
  json: () => Promise.resolve(mockdata)  // mockdata de autocorector/utils/products.js
}));
```

**Sin embargo**, debido a que `mytestconfig.use_server = false`, este mock **nunca se ejecuta**, y la app usa `src/constants/products.js`.

### Inconsistencia en los Datos

#### Para el Producto 7 (Chanel Coco Noir):

**El test espera:**
- Media de comentarios: **4.20**
- Últimos 3 comentarios: Olivia Brown, Sophia Turner, Xavier Wright
- NO debe contener: Leah Henderson

**El mockdata del autocorrector (`autocorector/utils/products.js`) contiene:**
- 3 reviews: Ruby Andrews (4★), Leah Henderson (5★), Xavier Wright (5★)
- Media: (4+5+5)/3 = **4.67** ❌
- No existen: Olivia Brown ni Sophia Turner ❌

#### Para el Producto 25 (Green Bell Pepper):

**El test espera:**
- Media: **4.00**
- Comentarios: Addison Wright, Henry Hill, Avery Carter

**El mockdata del autocorrector SÍ contiene estos datos correctamente** ✅

## Soluciones Posibles

### Opción 1: Modificar el mockdata del autocorrector
Actualizar `autocorector/utils/products.js` para que el producto 7 tenga 5 reviews que den una media de 4.20:

```javascript
"reviews": [
  { "rating": 5, "reviewerName": "Emma Davis", ... },
  { "rating": 3, "reviewerName": "Leah Henderson", ... },  // No en últimos 3
  { "rating": 5, "reviewerName": "Olivia Brown", "comment": "Amazing scent!", ... },
  { "rating": 4, "reviewerName": "Sophia Turner", "comment": "Excellent quality!", ... },
  { "rating": 4, "reviewerName": "Xavier Wright", ... }
]
// Media: (5+3+5+4+4)/5 = 4.20 ✅
```

### Opción 2: Modificar la configuración del test
Cambiar `mytestconfig.use_server = true` solo para los tests de comentarios, para que el mock de fetch sí se utilice.

### Opción 3: Actualizar las expectativas del test
Cambiar las aserciones del test para que coincidan con los datos actuales del mockdata.

## Evidencia

He adjuntado capturas de pantalla del error y puedo proporcionar logs detallados si es necesario. El error específico es:

```
Error: expect(element).toHaveTextContent()
Expected element to have text content: 4.2
Received: 4.67
```

## Solicitud

¿Podría confirmar cuál es la solución preferida? Estoy dispuesto a:
- Actualizar mi código si el problema es de mi implementación
- Esperar a una corrección del autocorrector si es un problema de los datos de prueba
- Aplicar cualquier otra solución que considere apropiada

Quedo a la espera de sus indicaciones.

Atentamente,  
Javier Morales Galisteo

---

**Archivos relevantes:**
- `autocorector/tests/checks.jsx` (líneas 11-24, 244-282)
- `autocorector/utils/products.js` (producto id: 7, líneas ~389-410)
- `src/constants/products.js` (producto id: 7)
- `src/ProductPage.jsx` (implementación de comentarios)
