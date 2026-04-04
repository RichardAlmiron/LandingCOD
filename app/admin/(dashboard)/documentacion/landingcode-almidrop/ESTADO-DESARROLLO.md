# ESTADO DE DESARROLLO — LandingCOD × AlmiDrop
## Última actualización: 4 de abril de 2026

---

## CONTEXTO GENERAL

LandingCOD es una plataforma de creación de páginas de producto (PDP) y tiendas e-commerce COD (Cobro Contra Entrega) para Paraguay. Se integra con AlmiDrop, una plataforma de dropshipping. Los dropshippers de AlmiDrop usan LandingCOD para crear sus páginas de venta.

### Repositorio: RichardAlmiron/LandingCOD (master)
### Stack: Next.js 15.5 + Supabase + TypeScript
### IA: OpenRouter (Gemini 2.5 Flash)
### WhatsApp soporte: +595973532550 (Richard Almiron)

---

## FASES COMPLETADAS

### ✅ FASE 0 — Limpieza y Preparación
- Eliminadas 14 plantillas antiguas: standard-urgencia, standard-prueba-social, standard-bundle, standard-historia, standard-checkout-directo, standard-electronico, premium-urgencia, premium-bundle, premium-electronico, pdp-cro-bold, pdp-cro-elegant, pdp-cro-futurista, pdp-cro-minimal, pdp-cro-visual
- Eliminados archivos .tsx de los 14 componentes React
- Eliminada categoría "Standard" de Categorias_PDP
- Eliminada tabla Subcategorias_PDP (no se usa)
- Eliminado MAPA_LEGACY_A_STANDARD completo (no hay tiendas publicadas con IDs viejos)
- Eliminados TODOS los fallbacks silenciosos en: preview/page.tsx, app/t/page.tsx, app/t/producto/page.tsx, app/p/page.tsx, LiveStorePreview.tsx, resolverCodigoPlantilla
- Reemplazados con errores explícitos con logs detallados y botón WhatsApp a soporte
- force-dynamic implementado en 25/25 rutas de API
- Eliminada funcionalidad de Bloques del editor visual (botón, panel, ComponentPickerPanel, injectComponent, estados)
- pdpTemplate default cambiado a vacío (el usuario elige desde cero, sin pre-selección)
- Eliminadas entradas de template-suggestions.ts para las 14 plantillas
- Limpiada documentación admin de categorías PDP

### ✅ FASE 0.5 — IA y Editor Visual
- Modelo IA primario: google/gemini-2.5-flash con fallbacks Claude Haiku 4.5 → Claude 3.5 Haiku
- System prompt CRO agresivo para PDP: Cash on Delivery Paraguay, sin devolución/reembolso/cancelación, precios en Guaraníes
- System prompt específico para tiendas: traducción español paraguayo, COD, garantía sin días
- API /api/ai/rewrite-all: reescritura completa de página en UNA sola llamada (tienda o PDP)
- API /api/ai/rewrite-section: reescritura individual por sección con contexto completo
- API /api/ai/generate-copy: generación de copy CRO para PDP entre etapa 3 y 4
- Botones de IA flotantes (estrella morada) sobre cada texto editable en el iframe
- Accordions/desplegables: se abren temporalmente para que la IA reescriba su contenido interno
- Productos de Almidrop protegidos con data-ve-product: la IA NUNCA los toca
- Precios reales del producto inyectados en el prompt (precio venta + precio tachado)
- Numeración protegida: regla en el prompt para no duplicar (1→11, 2→22)
- Fix de reemplazo de texto: primer nodo de texto recibe el nuevo texto, los demás se limpian
- Imágenes reales del producto inyectadas en la PDP en etapa 4 (1 segundo después del setup)
- IDs determinísticos via ve-id-generator.ts (hash djb2 de tag + path + texto)
- VisualCustomizationApplier usa el mismo generador para que las ediciones se apliquen en producción
- Bloqueo de publicación si hay cambios sin guardar (tooltip rojo "Guardá los cambios antes de publicar")
- Auto-save antes de publicar
- Error crítico de IA: modal con botón WhatsApp, bloquea paso a etapa 4
- Preview page: pdpMode como fuente de verdad (eliminado hack __pdp_)
- flowType inteligente: flowType || (storeData.pdpTemplate ? 'pdp' : 'store')
- Tiendas: etapa 3 → etapa 4 directo sin IA intermedia
- PDP: etapa 3 → IA intermedia → etapa 4
- EnhancedProductGallery: todas las imágenes originales preservadas, máximo 5 miniaturas, videos con autoplay-on-scroll
- ProductVideoPlayer.tsx: componente de video con IntersectionObserver

### ✅ FASE 1 — Autenticación Dual
- Login dual en /api/auth/login: verifica en 3 niveles:
  1. Dropshipper de Almidrop (via ALMIDROP_SUPABASE_URL, solo is_dropshipper=true)
  2. Admin de LandingCOD (tabla "usuarios")
  3. Usuario externo (tabla "usuarios_externos")
- Bodega EXCLUIDA — solo dropshippers acceden
- Tabla "usuarios_externos" creada en Supabase con: id, email, password_hash, full_name, phone, city, is_active
- API /api/auth/register-external: registro de usuarios externos con validación contra Almidrop
- Página de registro /register-external con formulario completo
- API /api/auth/me actualizada: detecta source (almidrop/landingcod/external)
- User interface actualizada: source, almidropId, plan 'almidrop'
- Documentación completa en admin: /admin/documentacion/landingcode-almidrop

### ✅ FASE 2 — Campo de Precio de Venta (PARCIAL)
- Estado customPrices en BuilderFlow para guardar precios por producto
- Campo "Tu precio de venta" en cada tarjeta de AlmiCatalogGrid (solo para source='almidrop')
- Precio tachado calculado automáticamente: precio_venta × 1.32 (+32%)
- Preview del precio tachado debajo del campo
- Validación: sin precio no puede pasar a etapa 4 (alerta)
- Los precios personalizados se aplican a los productos antes de pasar a la IA y a la etapa 4
- pricedProducts reemplaza chosen en el flujo de IA

---

## FASES PENDIENTES

### 🔲 FASE 2 (CONTINUACIÓN) — Etapa 3 para Usuarios Externos
- Si user.source === 'external': mostrar formulario de subida manual en vez de catálogo Almidrop
- Subir: imágenes del producto, título, descripción, precio
- La IA hace el resto en etapa 4

### 🔲 FASE 3 — Sistema de Ventas
- Crear tabla ventas_landingcod en Supabase:
  - id, user_id, tipo (tienda/pdp), url_pagina
  - producto_titulo, producto_precio_venta, producto_precio_tachado, producto_imagen
  - cliente_nombre, cliente_telefono, cliente_ciudad, cliente_barrio
  - cliente_referencias, cliente_color_casa, cliente_gps_lat, cliente_gps_lng
  - whatsapp_dropshipper, fecha_pedido, estado (pendiente/procesado/entregado)
- Formulario de compra en PDP/tiendas:
  - Nombre, teléfono, ciudad, barrio, lugares cercanos, color de casa, referencias
  - Geolocalización GPS automática (precisión 99%)
  - Botón "Pedir Ahora" dispara registro en DB + WhatsApp
- NO es venta confirmada — es un PEDIDO. Se confirma al entregar y cobrar
- WhatsApp del dropshipper: se inyecta antes de publicar la página

### 🔲 FASE 4 — Interfaz "Mis Ventas LandingCOD"
- En LandingCOD: nuevo menú en dashboard del usuario
- En Almidrop: mismo menú, misma interfaz (lectura de ventas_landingcod)
- Cada tarjeta: producto, cliente, fecha, hora, tipo (tienda/PDP), URL
- Al expandir: datos completos del cliente, GPS, imágenes del producto
- Estado: pendiente → procesado → entregado
- El dropshipper ve sus ventas desde cualquiera de las dos plataformas

---

## CONEXIONES TÉCNICAS

### LandingCOD Supabase
- URL: grxeiinmunfjmptqtfwf.supabase.co
- Tablas principales: usuarios, usuarios_externos, sesiones_activas, tiendas_publicadas, pdp_publicadas, Categorias_PDP, Plantillas_PDP

### Almidrop Supabase (SOLO LECTURA)
- URL: bakmisrdgjpnrwohjcyn.supabase.co
- Conexión via: ALMIDROP_SUPABASE_URL + ALMIDROP_SUPABASE_SERVICE_ROLE_KEY
- Tablas leídas: users (is_dropshipper, password_hash), catalogo_de_los_productos_del_master, categories
- REGLA: LandingCOD NUNCA escribe en Almidrop

### OpenRouter IA
- API Key: OPENROUTER_API_KEY en .env.local
- Modelo primario: google/gemini-2.5-flash
- Fallbacks: anthropic/claude-haiku-4.5, anthropic/claude-3.5-haiku

---

## REGLAS ESTRICTAS
1. force-dynamic en TODA API nueva — sin excepción
2. SRP en cada componente
3. Almidrop es SOLO LECTURA
4. Productos intocables por la IA (data-ve-product)
5. Modelo COD: nunca devolución/reembolso/cancelación/días de garantía
6. Precios en Guaraníes: "Gs. XXX.XXX"
7. Garantía: solo "Garantía de Satisfacción", "Compra Segura", "Calidad Garantizada"
8. No usar PowerShell para editar archivos (corrompe UTF-8) — usar Node.js o strReplace
9. Un solo commit por bloque de trabajo
10. Auditoría antes de push: compilación, force-dynamic, SRP, no archivos basura

---

## SQL PENDIENTES DE EJECUTAR
Ninguno — todos ejecutados el 4 de abril de 2026.
