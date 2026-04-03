# CÓMO CREAR UNA NUEVA PLANTILLA PDP

## FLUJO SIMPLIFICADO (3 PASOS)

### Paso 1: Crear el componente
Ubicación: `components/pdp/[categoria]/[subcategoria]/MiPdpNombre.tsx`

Ejemplo para electrónica general:
```
components/pdp/electrónico/general/PdpMiNuevoTemplate.tsx
```

El componente debe exportar por defecto:
```tsx
export default function PdpMiNuevoTemplate({ data, product, variant }: { data: StoreData; product: Product; variant?: number }) {
  // Tu diseño aquí
  return <div>...</div>;
}
```

### Paso 2: Registrar en el registry único
Archivo: `lib/plantilla-registry.ts`

Agregar al objeto PLANTILLAS_REGISTRY:
```typescript
'mi-codigo-nuevo': { componente: PdpMiNuevoTemplate, nicho: 'electronico' },
```

**Reglas del código:**
- Usar minúsculas y guiones: `mi-nuevo-template`
- NO usar fallback - si no está registrado, el sistema dará error claro

### Paso 3: Insertar en Supabase (manual o automático)
Tabla: `Plantillas_PDP`

```json
{
  "codigo": "mi-codigo-nuevo",
  "nombre": "Mi Nuevo Template",
  "descripcion": "Descripción breve",
  "componente": "PdpMiNuevoTemplate",
  "categoria_id": "ID-de-categoría-en-Supabase",
  "verificada": false,
  "activa": true,
  "orden": 999
}
```

---

## ESTRUCTURA DE CARPETAS

```
components/pdp/
├── electrónica/
│   ├── general/       ← Plantillas genéricas de electrónica
│   └── celulares/     ← Plantillas específicas de celulares
├── salud/
│   └── general/
├── belleza/
│   └── general/
├── hogar/
│   └── general/
└── herramientas/
    └── general/
```

---

## CATEGORÍAS DISPONIBLES EN SUABASE

- Electrónica (id: f735a007-0c2d-474b-98ba-df4b77b10f0e)
- Salud
- Belleza
- Hogar
- Herramientas
- Celulares (subcategoría de Electrónica)

---

## QUÉ NO HACER

- ❌ NO crear múltiples archivos de mapeo
- ❌ NO usar fallback para plantillas no encontradas
- ❌ NO duplicar registros en varios lugares
- ❌ NO modificar types-categorias.ts para el registro

---

## QUÉ SÍ HACER

- ✅ UN solo lugar: `lib/plantilla-registry.ts`
- ✅ Si no existe → ERROR claro (no fallback)
- ✅ Código simple y predecible
- ✅ Nicho declarado explícitamente

---

## VERIFICACIÓN

Después de crear:
1. Ir a `/admin/templates` → "Páginas de Producto"
2. Buscar en "✗ Pendientes"
3. Click en "Ver Landing Page" → debe mostrar el diseño correcto
4. Click en "✓" para verificar → pasa a clientes
