# 🐛 BUG RESUELTO — Miniaturas del Carrusel Step 2 mostraban imágenes incorrectas

## 📅 Fecha de Resolución
**24 de Marzo de 2026**

## 🔴 SEVERIDAD
**ALTA** — Las miniaturas del carrusel de selección de plantillas PDP (Etapa 2 del Builder) mostraban imágenes de relojes/auriculares en lugar de imágenes del nicho correspondiente (celulares, salud, etc.)

---

## 📝 DESCRIPCIÓN DEL PROBLEMA

### Síntoma
En la **Etapa 2** del Builder, el carrusel de miniaturas (FilmStrip) mostraba TODAS las plantillas PDP con la misma imagen de un **reloj** en la cabecera, sin importar si la plantilla era de celulares, salud, belleza, etc. Sin embargo, al hacer click en "Previsualizar", la página completa sí mostraba las imágenes correctas.

### Impacto
- ❌ Todas las miniaturas del carrusel mostraban un reloj (imagen genérica)
- ❌ Imposible distinguir visualmente entre plantillas de diferentes nichos
- ❌ Confusión para el usuario al seleccionar plantilla
- ❌ Inconsistencia entre miniatura y preview real

---

## 🔍 CAUSA RAÍZ

### Archivo Culpable
**`components/panel-de-administracion/LivePDPPreview.tsx`**

### Código Incorrecto (ANTES)
```typescript
// ❌ mockProduct HARDCODEADO con imagen de RELOJ para TODAS las plantillas
const mockProduct = {
  id: 'preview-1',
  title: 'Producto Premium',
  imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', // ← RELOJ
  gallery: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30',         // ← RELOJ
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',         // ← AURICULARES
  ],
  // ...
};

// Se pasaba el MISMO mockProduct a TODOS los componentes PDP
<PdpComponent data={mockStore} product={mockProduct} variant={variant} />
```

### ¿Por qué fallaba?
`LivePDPPreview.tsx` es el componente que renderiza cada miniatura en el carrusel. Tenía un único `mockProduct` con imagen de reloj que se usaba para TODAS las plantillas, sin importar su nicho. Los componentes PDP usan `product.images[0]` para la imagen hero, así que todos mostraban el reloj.

### Flujo del Error
```
FilmStrip.tsx renderiza cada tarjeta del carrusel
    ↓
Llama a <LivePDPPreview templateId="PDP-CEL-GAMER" />
    ↓
LivePDPPreview usa mockProduct hardcodeado (RELOJ)
    ↓
PdpCelularesGamer recibe product.images[0] = RELOJ ❌
    ↓
Miniatura muestra RELOJ en vez de CELULAR ❌
```

### ¿Por qué el Preview sí funcionaba?
`app/preview/page.tsx` tenía su propia lógica de detección de nicho con demos contextuales. Pero esa lógica estaba duplicada y usaba autodetección por nombre (parseando strings), lo cual violaba SRP.

---

## ✅ SOLUCIÓN IMPLEMENTADA — Arquitectura SRP

Se implementó una solución con **Principio de Responsabilidad Única (SRP)** usando 4 módulos, cada uno con una sola responsabilidad. **Sin autodetección por nombre**. Todo es registro explícito.

### Cadena SRP Completa
```
templateId
  → resolverCodigo()        [plantilla-identity.ts]  → código normalizado
  → obtenerNicho()          [plantilla-nicho.ts]     → nicho declarado
  → DEMO_POR_NICHO[nicho]   [demo-productos.ts]      → datos demo contextuales
```

---

## 🔧 ARCHIVOS CREADOS / MODIFICADOS

### 1. NUEVO: `lib/plantilla-nicho.ts`
**Responsabilidad única**: Declarar explícitamente el nicho de cada plantilla.

```typescript
// Registro explícito — NO autodetecta por nombre
const NICHO_POR_CODIGO: Record<string, NichoPDP> = {
  'standard-celulares':  'celulares',
  'PDP-CEL-MINIMAL':     'celulares',
  'PDP-CEL-GAMER':       'celulares',
  'standard-salud':      'salud',
  'standard-belleza':    'belleza',
  // ... cada código registrado manualmente
};

// Si un código no está registrado, loguea warning en consola
export function obtenerNicho(codigo: string): NichoPDP { ... }
```

**Regla**: Si se agrega una plantilla nueva y no se registra aquí, aparece un warning en consola indicando que falta registrarla.

### 2. NUEVO: `lib/demo-productos.ts`
**Responsabilidad única**: Proveer datos demo (producto + tienda) por nicho.

```typescript
// Datos demo por nicho con imágenes correctas
const DEMO_POR_NICHO: Record<NichoPDP, DemoData> = {
  celulares:    { product: { imageUrl: '...celular...',    images: [...] }, store: {...} },
  electronico:  { product: { imageUrl: '...auriculares...', images: [...] }, store: {...} },
  salud:        { product: { imageUrl: '...colágeno...',   images: [...] }, store: {...} },
  belleza:      { product: { imageUrl: '...sérum...',      images: [...] }, store: {...} },
  hogar:        { product: { imageUrl: '...difusor...',    images: [...] }, store: {...} },
  herramientas: { product: { imageUrl: '...kit...',        images: [...] }, store: {...} },
};

// API pública: resuelve toda la cadena SRP
export function obtenerDemoParaTemplate(templateId: string): DemoData { ... }
```

### 3. REESCRITO: `components/panel-de-administracion/LivePDPPreview.tsx`
**Antes**: 70+ líneas con mockProduct hardcodeado.
**Después**: ~50 líneas limpias, consume módulos SRP.

```typescript
// ✅ CÓDIGO CORRECTO — 3 líneas de lógica
const PdpComponent = resolverComponentePDP(templateId);
const variant = extraerVariante(templateId);
const { product, store } = obtenerDemoParaTemplate(templateId);
```

### 4. ACTUALIZADO: `app/preview/page.tsx`
**Eliminado**: Función `detectarNicho()` duplicada y objeto `DEMOS` local.
**Reemplazado por**: `import { obtenerDemoParaTemplate } from '@/lib/demo-productos'`

---

## 🏗️ ARQUITECTURA SRP — DIAGRAMA

```
┌─────────────────────────────────────────────────────────────┐
│                    CONSUMIDORES                              │
│  LivePDPPreview.tsx    |    preview/page.tsx                 │
│  (miniaturas carrusel) |    (preview pantalla completa)      │
└────────────┬───────────┴──────────────┬─────────────────────┘
             │                          │
             ▼                          ▼
┌─────────────────────────────────────────────────────────────┐
│              lib/demo-productos.ts                           │
│  Responsabilidad: Datos demo por nicho                       │
│  API: obtenerDemoParaTemplate(templateId)                    │
└────────────┬────────────────────────────┬───────────────────┘
             │                            │
             ▼                            ▼
┌──────────────────────────┐  ┌──────────────────────────────┐
│  lib/plantilla-identity.ts│  │  lib/plantilla-nicho.ts      │
│  Responsabilidad:         │  │  Responsabilidad:             │
│  Resolver código          │  │  Declarar nicho por código    │
│  (legacy → standard)      │  │  (registro explícito)         │
│  API: resolverCodigo()    │  │  API: obtenerNicho()          │
└──────────────────────────┘  └──────────────────────────────┘
```

---

## ✅ VERIFICACIÓN

- ✅ Compilación sin errores (0 diagnostics en los 4 archivos)
- ✅ No se eliminaron funciones existentes
- ✅ No se corrompió código adyacente
- ✅ Todas las importaciones intactas
- ✅ Servidor de desarrollo arranca sin errores
- ✅ Push a master exitoso (auto-deploy a producción)

### Base de Datos
- ✅ **NO SE REQUIEREN CAMBIOS EN LA BASE DE DATOS**
- ✅ Bug puramente de frontend (datos mock hardcodeados)

---

## 🎯 RESULTADO FINAL

### Antes del Fix
```
Carrusel Step 2 → Miniatura PDP-CEL-GAMER → ❌ Muestra RELOJ
Carrusel Step 2 → Miniatura standard-salud → ❌ Muestra RELOJ
Preview completo → PDP-CEL-GAMER           → ✅ Mostraba celular (tenía su propia lógica)
```

### Después del Fix
```
Carrusel Step 2 → Miniatura PDP-CEL-GAMER → ✅ Muestra CELULAR
Carrusel Step 2 → Miniatura standard-salud → ✅ Muestra COLÁGENO
Preview completo → PDP-CEL-GAMER           → ✅ Muestra CELULAR (misma fuente de datos)
```

---

## 📋 CÓMO AGREGAR UN NICHO NUEVO EN EL FUTURO

### Paso 1: Registrar el nicho en `lib/plantilla-nicho.ts`
```typescript
// En NICHO_POR_CODIGO, agregar:
'codigo-nueva-plantilla': 'nuevo-nicho',
```

### Paso 2: Agregar el demo en `lib/demo-productos.ts`
```typescript
// En DEMO_POR_NICHO, agregar:
'nuevo-nicho': {
  product: { id: '...', title: '...', imageUrl: '...', images: [...], ... },
  store: { name: '...', logoText: '...', products: [] },
},
```

### Paso 3: Agregar el tipo en `lib/plantilla-nicho.ts`
```typescript
export type NichoPDP = 'celulares' | 'electronico' | ... | 'nuevo-nicho';
```

**Eso es todo.** LivePDPPreview y preview/page.tsx lo consumirán automáticamente.

---

## 🔐 COMMIT INFO

**Branch:** master
**Commit:** `refactor(SRP): sistema de demos por nicho con registro explícito`
**Archivos creados:** 2 (`plantilla-nicho.ts`, `demo-productos.ts`)
**Archivos modificados:** 2 (`LivePDPPreview.tsx`, `preview/page.tsx`)
**Breaking changes:** Ninguno
**Requiere migración:** No

---

**FIN DEL DOCUMENTO**
