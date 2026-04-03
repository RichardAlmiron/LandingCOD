# 📚 ÍNDICE - DOCUMENTACIÓN COMPLETA FILMSTRIP Y COVERFLOW

## 🎯 PROPÓSITO DE ESTA DOCUMENTACIÓN

Esta documentación explica EN DETALLE qué son FilmStrip y CoverFlow, cómo funcionan, y por qué causaron el bug crítico del preview de PDP.

---

## 📖 DOCUMENTOS DISPONIBLES

### 1️⃣ PARTE 1: ¿Qué son FilmStrip y CoverFlow?
**Archivo**: `PARTE-1-QUE-SON-FILMSTRIP-COVERFLOW.md`

**Contenido**:
- Definición simple y analogías
- Ubicación en el sistema
- Diferencias visuales
- Archivos y ubicación en el código
- Cómo se selecciona entre ellos

**Lee esto primero** si no sabes qué son estos componentes.

---

### 2️⃣ PARTE 2: FilmStrip - Explicación Detallada
**Archivo**: `PARTE-2-FILMSTRIP-DETALLADO.md`

**Contenido**:
- Estructura del componente
- Props que recibe
- Funcionalidades principales
- Navegación horizontal
- Renderizado de plantillas
- La función que causó el bug
- Código antes y después del fix

**Lee esto** para entender FilmStrip a profundidad.

---

### 3️⃣ PARTE 3: CoverFlow - Explicación Detallada
**Archivo**: `PARTE-3-COVERFLOW-DETALLADO.md`

**Contenido**:
- Estructura del componente
- Diferencia clave con FilmStrip
- Efecto 3D - Cómo funciona
- Cálculo de transformaciones CSS
- Navegación en CoverFlow
- La función que causó el bug
- Código antes y después del fix

**Lee esto** para entender CoverFlow a profundidad.

---

### 4️⃣ PARTE 4: Flujo Completo y El Bug
**Archivo**: `PARTE-4-FLUJO-COMPLETO-Y-BUG.md`

**Contenido**:
- Flujo completo de visualización (paso a paso)
- Diagrama del bug
- Diagrama de la solución
- Causa raíz del problema
- Archivos afectados
- Código incorrecto vs correcto
- Lecciones aprendidas

**Lee esto** para entender el bug completo de principio a fin.

---

### 5️⃣ Bug Crítico Resuelto - Resumen Ejecutivo
**Archivo**: `CRITICAL-BUG-PREVIEW-FIXED.md`

**Contenido**:
- Resumen ejecutivo del bug
- Solución implementada
- Verificación de integridad
- Impacto de la solución
- Commit info

**Lee esto** para un resumen rápido del fix.

---

### 6️⃣ Bug Miniaturas Carrusel — Solución SRP
**Archivo**: `BUG-MINIATURAS-CARRUSEL-SRP-FIX.md`
**Fecha**: 24 de Marzo de 2026

**Contenido**:
- Miniaturas del carrusel Step 2 mostraban imagen de reloj para TODOS los nichos
- Causa raíz: `LivePDPPreview.tsx` tenía un `mockProduct` hardcodeado con imagen de reloj
- Solución con arquitectura SRP (4 módulos con responsabilidad única)
- `plantilla-nicho.ts` → registro explícito código→nicho
- `demo-productos.ts` → datos demo por nicho
- `LivePDPPreview.tsx` → reescrito limpio, consume módulos SRP
- `preview/page.tsx` → eliminada autodetección duplicada
- Guía para agregar nichos nuevos en el futuro

**Lee esto** para entender cómo funciona el sistema de demos por nicho y cómo extenderlo.

---

## 🗺️ ORDEN DE LECTURA RECOMENDADO

### Para Entender Todo Desde Cero:
1. PARTE 1: ¿Qué son FilmStrip y CoverFlow?
2. PARTE 2: FilmStrip - Explicación Detallada
3. PARTE 3: CoverFlow - Explicación Detallada
4. PARTE 4: Flujo Completo y El Bug
5. CRITICAL-BUG-PREVIEW-FIXED.md

### Para Entender Solo El Bug:
1. PARTE 4: Flujo Completo y El Bug
2. CRITICAL-BUG-PREVIEW-FIXED.md

### Para Referencia Rápida:
- CRITICAL-BUG-PREVIEW-FIXED.md

---

## 🎯 PROTAGONISTAS DEL BUG

### FilmStrip.tsx
- **Ubicación**: `components/visualizacion/FilmStrip.tsx`
- **Línea del bug**: 126
- **Función afectada**: `handlePreviewPdp`

### CoverFlow.tsx
- **Ubicación**: `components/visualizacion/CoverFlow.tsx`
- **Línea del bug**: 134
- **Función afectada**: `handlePreviewPdp`

---

## ⚠️ NOTA IMPORTANTE

**ESTOS DOS ARCHIVOS CAUSARON MUCHOS DOLORES DE CABEZA**

Antes de modificarlos en el futuro:
1. Lee esta documentación completa
2. Verifica que los parámetros de URL sean correctos
3. Prueba en ambos modos de visualización (FilmStrip y CoverFlow)
4. Verifica que no afectes otros flujos

---

## 📞 CONTACTO

Si tienes preguntas sobre FilmStrip o CoverFlow:
1. Lee esta documentación primero
2. Revisa el código con los comentarios
3. Verifica `app/preview/page.tsx` para entender los parámetros

---

**FIN DEL ÍNDICE**
