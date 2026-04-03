# ✨ PixelForge Studio — Editor Visual HTML

## Nombre del Sistema
**PixelForge Studio** — Motor de edición visual inline para tiendas LandingCOD.

---

## ¿Qué es?

PixelForge Studio es un editor visual profesional integrado directamente en el paso 4 (Configuración) del flujo de creación de tiendas. Permite al usuario editar visualmente cualquier elemento de su tienda — textos, colores, fondos, tipografías, secciones completas — directamente sobre la vista real de la tienda, sin necesidad de conocimientos técnicos.

El editor se abre como un overlay fullscreen dentro de la misma interfaz del builder (no abre pestañas nuevas), cargando la tienda en un iframe interactivo donde cada elemento es clickeable y editable.

---

## ¿Por qué existe?

Antes de PixelForge Studio, el usuario solo podía configurar su tienda mediante campos de formulario (nombre, descripción, logo, banner). Esto limitaba enormemente la personalización. El usuario no podía:

- Cambiar colores de secciones específicas
- Modificar tipografías de títulos individuales
- Agregar banners promocionales, barras de anuncio o insignias de confianza
- Ocultar secciones que no necesitaba
- Editar textos directamente sobre la vista real

PixelForge Studio resuelve todo esto con una experiencia de edición WYSIWYG (What You See Is What You Get) de nivel profesional.

---

## ¿Para qué sirve?

1. **Personalización total** — El usuario puede hacer que su tienda sea única, diferente a cualquier otra que use el mismo template.
2. **Edición de textos** — Cambiar cualquier texto visible (títulos, descripciones, botones, etiquetas) con doble clic.
3. **Edición de estilos** — Cambiar colores de fondo, gradientes, bordes, sombras, opacidad, padding de cualquier sección.
4. **Tipografía avanzada** — 20 fuentes profesionales, control de tamaño, peso, alineación, interlineado, espaciado de letras.
5. **Inserción de componentes** — 12 bloques prediseñados que se pueden agregar a la tienda (banners, CTAs, trust badges, temporizadores, newsletter, etc).
6. **Eliminación de elementos** — Ocultar secciones o elementos que el usuario no necesita.
7. **Persistencia** — Todo se guarda automáticamente en la base de datos y se aplica en la tienda publicada.

---

## Cómo se usa

### Acceso
1. El usuario llega al **Paso 4** del builder (flujo "store")
2. En el panel izquierdo de configuración, debajo de todas las opciones, aparece el botón **"✨ Editor Visual HTML PRO"**
3. Al hacer clic, se abre el editor fullscreen

### Dentro del editor

| Acción | Cómo |
|--------|------|
| Seleccionar elemento | Clic simple sobre cualquier texto, imagen o sección |
| Editar texto inline | Doble clic sobre un texto → se activa edición directa |
| Cambiar tipografía | Seleccionar elemento → Panel "Texto" en la barra lateral |
| Cambiar colores/fondo | Seleccionar elemento → Panel "Estilo" en la barra lateral |
| Agregar componente | Clic en "+" → Elegir componente → Se inserta arriba o abajo |
| Eliminar elemento | Seleccionar → Clic en "Eliminar" o tecla Delete |
| Deshacer | Ctrl+Z |
| Rehacer | Ctrl+Y o Ctrl+Shift+Z |
| Guardar | Ctrl+S o botón "Guardar" |
| Cerrar editor | Esc o botón X |

### Elementos NO editables
- **Productos**: Los productos están bloqueados automáticamente. Se muestran con opacidad reducida y un candado "🔒 Productos (no editable)". Esto es intencional — los productos se seleccionan en el paso 3 y no deben modificarse visualmente.

### Indicadores visuales
- **Borde punteado azul** al pasar el mouse → elemento editable
- **Borde sólido azul** → elemento seleccionado
- **Etiqueta superior** → tipo de elemento (H1, H2, P, IMAGEN, ENCABEZADO, etc)
- **Borde punteado verde** → componente inyectado por el usuario
- **Borde naranja** → texto en modo edición inline
- **Punto amarillo** en la barra → hay cambios sin guardar

---

## Qué se puede hacer

### Panel de Texto (✏️)
- Cambiar fuente entre 20 opciones: Inter, Roboto, Montserrat, Poppins, Playfair Display, Oswald, Raleway, Nunito, etc.
- Tamaño de fuente (8px a 120px)
- Peso: Light, Normal, Medium, Semibold, Bold, Extra Bold, Black
- Color: paleta de 24 colores + selector de color personalizado
- Alineación: izquierda, centro, derecha, justificado
- Transformación: normal, MAYÚSCULAS, minúsculas, Capitalizado
- Interlineado y espaciado de letras

### Panel de Estilo (🎨)
- Color de fondo: paleta + selector personalizado
- Gradientes predefinidos: Violeta, Rosa, Azul, Verde, Sunset, Lavanda, Oscuro
- Bordes redondeados: 0px a 50px
- Espaciado interno (padding): 0px a 80px
- Opacidad: 0% a 100%
- Sombras: Sutil, Media, Fuerte, Dramática, Glow Indigo

### Componentes insertables (✨)
| Componente | Categoría | Descripción |
|-----------|-----------|-------------|
| Barra de Anuncio | Banner | Barra superior con mensaje promocional |
| Banner Hero | Banner | Banner grande con título, descripción y CTA |
| Temporizador | Banner | Cuenta regresiva para urgencia |
| Bloque de Texto | Texto | Título + párrafo personalizable |
| Imagen / Banner | Media | Imagen con enlace opcional |
| Prueba Social | Social | Reseñas y testimonios |
| Separador | Divider | Línea divisoria decorativa |
| Insignias de Confianza | Badge | Iconos de seguridad y garantía |
| Grid de Características | Badge | Cuadrícula de beneficios |
| Botón CTA | CTA | Botón de llamada a la acción |
| Newsletter | CTA | Formulario de suscripción |
| Botón WhatsApp | CTA | Botón de contacto por WhatsApp |

---

## Arquitectura Técnica

### Archivos del sistema

```
lib/
  visual-editor-types.ts          # Tipos, interfaces, constantes, bloques de componentes
  types.ts                        # StoreData extendido con visualCustomizations

components/
  visual-editor/
    VisualEditorOverlay.tsx        # Componente principal del editor (overlay fullscreen)
  store/
    VisualCustomizationApplier.tsx # Aplica customizaciones en tiendas publicadas
  saas/
    BuilderFlow.tsx                # Integración del botón + overlay en paso 4

app/
  api/
    tiendas/route.ts              # PATCH endpoint para actualizar customizaciones
    builder-config/route.ts       # POST guarda visualCustomizations dentro de store_data
  preview/page.tsx                # Soporte modo editor visual (oculta controles admin)
  t/[identificador_url]/page.tsx  # Aplica customizaciones en tiendas publicadas
```

### Componentes principales

#### `VisualEditorOverlay.tsx`
Componente React client-side que renderiza:
- Barra de herramientas superior (cerrar, herramientas, undo/redo, guardar)
- Panel lateral condicional (texto, estilo, componentes)
- Iframe con la tienda cargada desde `/preview?template=X&type=store&ve=1`
- Barra de estado inferior
- Sistema de inyección de estilos CSS en el iframe
- Detección automática de elementos editables vs productos
- Listeners de click/dblclick en el iframe
- Sistema de customizaciones con undo/redo stack

#### `VisualCustomizationApplier.tsx`
Componente invisible (retorna `null`) que se monta en tiendas publicadas. Después de 300ms (para asegurar que el template renderizó), aplica todas las customizaciones guardadas:
- Modifica innerHTML para cambios de texto
- Aplica estilos inline para cambios de estilo
- Oculta elementos marcados como hidden
- Inyecta componentes HTML al inicio del template

#### `visual-editor-types.ts`
Define todas las interfaces y constantes:
- `VisualCustomization` — estructura de cada cambio individual
- `VisualEditorState` — estado completo del editor
- `TextEditorOptions` — opciones del panel de texto
- `StyleEditorOptions` — opciones del panel de estilo
- `ComponentBlock` — definición de cada bloque insertable
- `EDITOR_FONTS` — 20 fuentes disponibles
- `EDITOR_COLORS` — 32 colores predefinidos
- `COMPONENT_BLOCKS` — 12 bloques con HTML predeterminado

---

## Base de Datos

### Tablas involucradas

#### `builder_configurations` (configuración en progreso)
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | uuid | PK |
| user_id | uuid | FK al usuario |
| tienda_id | uuid | NULL hasta publicar |
| flow_type | text | 'store' o 'pdp' |
| store_data | jsonb | **Contiene `visualCustomizations`** |
| template | text | ID del template |
| current_step | int | Paso actual (1-4) |
| selected_products | jsonb | Array de IDs de productos |
| updated_at | timestamp | Última actualización |
| last_accessed_at | timestamp | Último acceso |

#### `tiendas_publicadas` (tiendas en producción)
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | uuid | PK |
| user_id | uuid | FK al usuario |
| identificador_url | text | Slug único (ej: "mi-tienda") |
| name | text | Nombre de la tienda |
| template | text | ID del template |
| pdp_template | text | ID del template PDP |
| store_data | jsonb | **Contiene `visualCustomizations`** |
| status | text | 'published' |

### Estructura de `visualCustomizations` dentro de `store_data`

```json
{
  "visualCustomizations": {
    "customizations": [
      {
        "id": "ve-h1-abc123",
        "selector": "[data-ve-editable=\"ve-h1-abc123\"]",
        "type": "text",
        "newValue": "Mi Título Personalizado",
        "timestamp": 1710950400000
      },
      {
        "id": "ve-h1-abc123-color",
        "selector": "[data-ve-editable=\"ve-h1-abc123\"]",
        "type": "style",
        "property": "color",
        "newValue": "#6366f1",
        "timestamp": 1710950401000
      },
      {
        "id": "ve-section-def456",
        "selector": "[data-ve-editable=\"ve-section-def456\"]",
        "type": "visibility",
        "newValue": "hidden",
        "timestamp": 1710950402000
      }
    ],
    "injectedComponents": [
      "<div class=\"ve-injected-component\" data-ve-editable=\"ve-injected-announcement-bar-1710950403000\">...</div>"
    ],
    "lastEditedAt": "2026-03-20T15:00:00.000Z"
  }
}
```

### Tipos de customización

| Tipo | Descripción | Campos usados |
|------|-------------|---------------|
| `text` | Cambio de contenido HTML | `selector`, `newValue` (innerHTML) |
| `style` | Cambio de propiedad CSS | `selector`, `property`, `newValue` |
| `visibility` | Ocultar elemento | `selector`, `newValue` = "hidden" |
| `image` | Cambio de src de imagen | `selector`, `newValue` (URL) |
| `component` | Componente inyectado | Almacenado en `injectedComponents[]` |

---

## API Endpoints

### `POST /api/builder-config`
Guarda el estado del builder incluyendo `visualCustomizations` dentro de `store_data`.
- Se llama automáticamente al hacer clic en "Guardar" en el editor visual
- También se llama por el auto-save debounced cada 2 segundos

### `POST /api/tiendas`
Publica la tienda. El `store_data` enviado ya incluye `visualCustomizations` si el usuario editó visualmente.

### `PATCH /api/tiendas`
Actualiza las customizaciones visuales de una tienda ya publicada.
- Body: `{ identificador_url, visualCustomizations }`
- Verifica ownership (user_id)
- Merge las customizaciones en el `store_data` existente

---

## Flujo de datos completo

```
1. Usuario abre Editor Visual en Paso 4
   ↓
2. BuilderFlow pasa storeData + template al VisualEditorOverlay
   ↓
3. Overlay carga /preview?template=X&type=store&ve=1 en iframe
   ↓
4. Preview page renderiza template sin controles admin
   ↓
5. Overlay inyecta CSS de edición + marca elementos editables
   ↓
6. Usuario edita (clic, doble clic, paneles laterales)
   ↓
7. Cada cambio se registra como VisualCustomization
   ↓
8. Usuario hace clic en "Guardar"
   ↓
9. onSave callback actualiza storeData.visualCustomizations
   ↓
10. POST /api/builder-config guarda en builder_configurations
   ↓
11. Cuando publica → POST /api/tiendas incluye visualCustomizations
   ↓
12. Tienda publicada en /t/[slug] monta VisualCustomizationApplier
   ↓
13. Applier aplica todos los cambios al DOM después de 300ms
```

---

## Atajos de teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl+S` | Guardar cambios |
| `Ctrl+Z` | Deshacer |
| `Ctrl+Shift+Z` / `Ctrl+Y` | Rehacer |
| `Delete` | Eliminar elemento seleccionado |
| `Esc` | Deseleccionar / Cerrar editor |

---

## Limitaciones conocidas

1. **Selectores dinámicos**: Los `data-ve-editable` IDs se generan aleatoriamente en cada carga del iframe. Esto significa que las customizaciones se aplican por selector CSS, y si el template cambia su estructura DOM, algunas customizaciones podrían no aplicarse correctamente.

2. **Solo flujo store**: El editor visual está habilitado solo para el flujo de tienda (`flowType === 'store'`), no para PDP.

3. **Componentes inyectados**: Los componentes se insertan como HTML estático. No tienen interactividad React (no manejan estado, no tienen event handlers funcionales).

4. **Cross-origin iframe**: El iframe carga `/preview` del mismo dominio, por lo que no hay problemas de CORS. Sin embargo, si el preview page cambia de dominio en el futuro, el editor dejará de funcionar.

---

## Seguridad

- Todas las APIs verifican autenticación via `access_token` cookie
- El PATCH endpoint verifica ownership (`user_id`) antes de actualizar
- Las customizaciones se almacenan como JSON dentro de `store_data`, no como HTML ejecutable en el servidor
- El `VisualCustomizationApplier` opera solo en el cliente (client-side DOM manipulation)

---

*Documentación generada el 20 de marzo de 2026*
*Sistema: PixelForge Studio v1.0*
*Plataforma: LandingCOD*
