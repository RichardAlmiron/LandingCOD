# 🔄 PARTE 4: FLUJO COMPLETO Y EL BUG

## 📊 FLUJO COMPLETO DE VISUALIZACIÓN

### 1. Usuario Entra a Etapa 2
```typescript
// BuilderFlow.tsx - Línea 692
{step === 2 && (
  <div>
    {flowType === 'pdp' ? (
      // Renderiza selector de plantillas PDP
      <DynamicPDPDisplay 
        mode={displayMode}  // 'filmstrip' o 'coverflow'
        items={pdpTemplates}
        selectedId={storeData.pdpTemplate}
        onSelect={(id) => setStoreData({...storeData, pdpTemplate: id})}
      />
    ) : (
      // Renderiza selector de plantillas Store
    )}
  </div>
)}
```

### 2. DynamicPDPDisplay Decide Qué Componente Usar
```typescript
// DynamicPDPDisplay.tsx
export default function DynamicPDPDisplay({ mode, items, ... }) {
  switch (mode) {
    case 'filmstrip':
      return <FilmStrip {...props} />;  // ← Usa FilmStrip
    case 'coverflow':
      return <CoverFlow {...props} />;  // ← Usa CoverFlow
    default:
      return <FilmStrip {...props} />;
  }
}
```

### 3. FilmStrip o CoverFlow Renderiza las Plantillas
```typescript
// FilmStrip.tsx o CoverFlow.tsx
{items.map((item) => (
  <div key={item.id}>
    {/* Preview de la plantilla */}
    <LivePDPPreview templateId={item.id} />
    
    {/* Botón Previsualizar - AQUÍ ESTABA EL BUG */}
    <button onClick={(e) => handlePreviewPdp(item.id, e)}>
      <Eye /> Previsualizar
    </button>
  </div>
))}
```

### 4. Usuario Hace Click en "Previsualizar"
```typescript
// ANTES (Código Incorrecto)
const handlePreviewPdp = (id: string, e: React.MouseEvent) => {
  e.stopPropagation();
  window.open(`/preview?pdp=${id}`, '_blank');  // ❌ BUG AQUÍ
};
```

### 5. Se Abre Nueva Pestaña con URL Incorrecta
```
URL generada: /preview?pdp=urgency-1
                              ^^^
                              Parámetro que NO EXISTE
```

### 6. Página /preview Intenta Parsear los Parámetros
```typescript
// app/preview/page.tsx - Línea 190
const params = new URLSearchParams(window.location.search);
const templateParam = params.get('template');  // null ❌
const typeParam = params.get('type');          // null ❌
const pdpParam = params.get('pdp');            // 'urgency-1' (IGNORADO)
```

### 7. Fallback a Tienda por Defecto
```typescript
// Como no encuentra 'template' ni 'type', usa fallback
if (!templateParam || !typeParam) {
  // Lee de localStorage o usa template por defecto
  setData({ store: defaultPreviewStore, template: 'megamarket' });
  // ↑ Renderiza una TIENDA en lugar de PDP ❌
}
```

---

## 🐛 DIAGRAMA DEL BUG

```
┌─────────────────────────────────────────────────────────────┐
│ ETAPA 2: Usuario ve plantillas PDP                          │
│                                                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                     │
│  │ PDP 1   │  │ PDP 2   │  │ PDP 3   │                     │
│  │         │  │         │  │         │                     │
│  │ [👁 Ver]│  │ [👁 Ver]│  │ [👁 Ver]│ ← Click aquí       │
│  └─────────┘  └─────────┘  └─────────┘                     │
└─────────────────────────────────────────────────────────────┘
                      ↓
        window.open('/preview?pdp=urgency-1')  ❌
                      ↓
┌─────────────────────────────────────────────────────────────┐
│ /preview?pdp=urgency-1                                       │
│                                                              │
│ params.get('template') = null  ❌                           │
│ params.get('type') = null      ❌                           │
│ params.get('pdp') = 'urgency-1' (IGNORADO)                 │
│                                                              │
│ Resultado: Muestra TIENDA en lugar de PDP ❌               │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ DIAGRAMA DE LA SOLUCIÓN

```
┌─────────────────────────────────────────────────────────────┐
│ ETAPA 2: Usuario ve plantillas PDP                          │
│                                                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                     │
│  │ PDP 1   │  │ PDP 2   │  │ PDP 3   │                     │
│  │         │  │         │  │         │                     │
│  │ [👁 Ver]│  │ [👁 Ver]│  │ [👁 Ver]│ ← Click aquí       │
│  └─────────┘  └─────────┘  └─────────┘                     │
└─────────────────────────────────────────────────────────────┘
                      ↓
   window.open('/preview?template=urgency-1&type=pdp')  ✅
                      ↓
┌─────────────────────────────────────────────────────────────┐
│ /preview?template=urgency-1&type=pdp                         │
│                                                              │
│ params.get('template') = 'urgency-1'  ✅                    │
│ params.get('type') = 'pdp'            ✅                    │
│                                                              │
│ if (templateParam && typeParam === 'pdp') {                 │
│   setPdpMode({ templateId: templateParam });                │
│   // Renderiza PDP correctamente ✅                         │
│ }                                                            │
│                                                              │
│ Resultado: Muestra PDP CORRECTAMENTE ✅                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 RESUMEN DEL BUG

### Causa Raíz
FilmStrip.tsx y CoverFlow.tsx usaban parámetros incorrectos en la URL de preview.

### Archivos Afectados
1. `components/visualizacion/FilmStrip.tsx` - Línea 126
2. `components/visualizacion/CoverFlow.tsx` - Línea 134

### Código Incorrecto
```typescript
window.open(`/preview?pdp=${id}`, '_blank');
```

### Código Correcto
```typescript
window.open(`/preview?template=${id}&type=pdp`, '_blank');
```

### Impacto
- ❌ ANTES: Mostraba tienda en lugar de PDP
- ✅ DESPUÉS: Muestra PDP correctamente

---

## 📝 LECCIONES APRENDIDAS

### 1. Verificar Parámetros de URL
Siempre verificar qué parámetros acepta una ruta antes de usarla.

### 2. Documentar Parámetros Esperados
La página `/preview` debería documentar claramente:
```typescript
/**
 * Parámetros aceptados:
 * - template: ID de la plantilla (requerido)
 * - type: 'pdp' | 'store' (requerido)
 * - ve: '1' para modo Visual Editor (opcional)
 */
```

### 3. Usar Constantes
```typescript
// Mejor práctica
const PREVIEW_PARAMS = {
  TEMPLATE: 'template',
  TYPE: 'type',
  VE: 've'
} as const;

window.open(
  `/preview?${PREVIEW_PARAMS.TEMPLATE}=${id}&${PREVIEW_PARAMS.TYPE}=pdp`,
  '_blank'
);
```
