# ESTADO DE DESARROLLO — LandingCOD × AlmiDrop
## Última actualización: 4 de abril de 2026

---

## FASES COMPLETADAS

### ✅ FASE 0 — Limpieza y Preparación
- Eliminadas 14 plantillas antiguas (standard-*, premium-*, pdp-cro-*)
- Eliminada categoría "Standard" de la DB
- Eliminada tabla Subcategorias_PDP (no se usa)
- Eliminado MAPA_LEGACY_A_STANDARD (no hay tiendas publicadas con IDs viejos)
- Eliminados todos los fallbacks silenciosos (megamarket, urgency-1, PdpUrgenciaMaxima)
- Reemplazados con errores explícitos con logs y botón WhatsApp soporte (+595973532550)
- force-dynamic en 25/25 rutas de API
- Eliminada funcionalidad de Bloques del editor visual
- pdpTemplate default cambiado a vacío (el usuario elige desde cero)

### ✅ FASE 0.5 — IA y Editor Visual
- Modelo IA: google/gemini-2.5-flash (primario) con fallbacks Claude Haiku
- System prompt CRO agresivo para PDP (Cash on Delivery Paraguay)
- System prompt específico para tiendas (traducción español, COD, garantía sin devolución)
- Reescritura completa de página en UNA sola llamada API (/api/ai/rewrite-all)
- Reescritura por sección individual (/api/ai/rewrite-section)
- Botones de IA flotantes sobre cada texto editable en el iframe
- Accordions/desplegables: se abren temporalmente para que la IA reescriba su contenido interno
- Productos de Almidrop protegidos (data-ve-product): la IA nunca los toca
- Precios reales del producto inyectados en el prompt de la IA
- Numeración protegida (1, 2, 3 no se duplican a 11, 22, 33)
- Imágenes reales del producto inyectadas en la PDP en etapa 4
- IDs determinísticos (ve-id-generator.ts) para que las customizaciones se apliquen en la página publicada
- VisualCustomizationApplier usa el mismo generador de IDs
- Bloqueo de publicación si hay cambios sin guardar (tooltip rojo)
- Auto-save antes de publicar
- Error crítico de IA: modal con botón WhatsApp, bloquea paso a etapa 4
- Preview page: pdpMode como fuente de verdad (eliminado hack __pdp_)
- flowType inteligente: detecta PDP vs tienda automáticamente

### ✅ FASE 1 — Autenticación Dual (COMPLETADA)
- Login dual: verifica primero en Almidrop (solo is_dropshipper=true), luego en LandingCOD
- Tabla usuarios_externos creada en Supabase
- API /api/auth/register-external para registro de usuarios externos
- API /api/auth/login modificada para autenticación en 3 niveles:
  1. Dropshipper de Almidrop (via ALMIDROP_SUPABASE_URL)
  2. Admin de LandingCOD (tabla usuarios)
  3. Usuario externo (tabla usuarios_externos)
- API /api/auth/me actualizada para detectar source (almidrop/landingcod/external)
- Página de registro /register-external
- Documentación completa en admin panel: /admin/documentacion/landingcode-almidrop
- Bodega EXCLUIDA — solo dropshippers acceden

---

## FASES PENDIENTES

### 🔲 FASE 2 — Etapa 3 del Builder (Catálogo Almiplace + Precios)
**Estado: POR INICIAR**

Qué hacer:
1. Detectar en BuilderFlow si el usuario es de Almidrop o externo (via user.source)
2. Usuario Almidrop → mostrar catálogo clonado de Almiplace:
   - Tarjeta con: imagen, nombre, categoría, precio proveedor, precio sugerido
   - Campo para que el dropshipper ponga SU precio de venta
   - Sin precio → no puede pasar a etapa 4 (popup de advertencia)
   - Sistema calcula precio tachado automáticamente (+30-35%)
3. Usuario externo → formulario de subida manual:
   - Subir imágenes del producto
   - Título y descripción
   - Poner precio de venta
4. El precio de venta viaja a la PDP/tienda publicada como precio real
5. El precio tachado es calculado por el sistema (simulación de descuento)

Referencia: Almidrop dropshipper catalog en:
- AlmiDrop/src/app/(dashboard)/dropshipper/catalog/page.tsx
- Campos: cost_price, suggested_price, images, edited_images, original_images, videos
- API: /api/dropshipper/catalog

### 🔲 FASE 3 — Sistema de Ventas
**Estado: POR INICIAR**

Qué hacer:
1. Crear tabla ventas_landingcod en Supabase
2. Formulario de compra en PDP/tiendas:
   - Nombre, teléfono, ciudad, barrio, referencias, color de casa
   - Geolocalización GPS automática (precisión 99%)
   - Botón "Pedir Ahora" dispara el registro
3. Al enviar formulario:
   - Registrar venta en ventas_landingcod
   - Notificar por WhatsApp al dropshipper
4. WhatsApp del dropshipper: se inyecta antes de publicar la página

### 🔲 FASE 4 — Interfaz "Mis Ventas LandingCOD"
**Estado: POR INICIAR**

Qué hacer:
1. En LandingCOD: nuevo menú "Mis Ventas LandingCOD" en el dashboard del usuario
2. En Almidrop: mismo menú, misma interfaz (lectura de la misma tabla)
3. Cada tarjeta: producto, cliente, fecha, hora, tipo (tienda/PDP), URL
4. Al expandir: datos completos del cliente, GPS, imágenes
5. Estado del pedido: pendiente → procesado → entregado

### 🔲 FASE 5 — Etapa 3 para Usuarios Externos
**Estado: POR INICIAR**

Qué hacer:
1. Si el usuario es externo, la etapa 3 muestra formulario de subida manual
2. No ve catálogo de Almidrop
3. Sube: imágenes, título, descripción, precio
4. La IA hace el resto en etapa 4

---

## REGLAS ESTRICTAS
- Modelo de negocio: Cobro Contra Entrega (COD)
- Nunca mencionar: devolución de dinero, reembolso, cancelación, días de garantía
- Garantía: solo "Garantía de Satisfacción", "Compra Segura", "Calidad Garantizada"
- force-dynamic en TODA API nueva
- SRP en cada componente
- Almidrop es SOLO LECTURA desde LandingCOD
- Productos intocables por la IA
- WhatsApp soporte: +595973532550 (Richard Almiron)

## CONEXIONES
- LandingCOD Supabase: grxeiinmunfjmptqtfwf.supabase.co
- Almidrop Supabase: bakmisrdgjpnrwohjcyn.supabase.co
- OpenRouter API: Gemini 2.5 Flash (primario)
- GitHub: RichardAlmiron/LandingCOD (master)
