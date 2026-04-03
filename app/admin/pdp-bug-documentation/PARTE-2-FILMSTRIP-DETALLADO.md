# 🎞️ PARTE 2: FILMSTRIP - EXPLICACIÓN DETALLADA

## 📋 INFORMACIÓN BÁSICA

**Archivo**: `components/visualizacion/FilmStrip.tsx`  
**Líneas de código**: ~350  
**Propósito**: Mostrar plantillas PDP en formato horizontal tipo "tira de película"

---

## 🧩 ESTRUCTURA DEL COMPONENTE

### Props que Recibe
```typescript
interface FilmStripProps {
  items: PdpTemplate[];              // Array de plantillas a mostrar
  selectedId: string;                // ID de la plantilla seleccionada
  onSelect: (id: string) => void;    // Callback al seleccionar
  onConfirmSelect?: (id: string) => void;  // Callback al confirmar
  isAdmin?: boolean;                 // Si es administrador
  onVerifyToggle?: (id: string, verified: boolean) => void;
  onDelete?: (id: string | string[]) => void;
  selectedIds?: string[];            // IDs seleccionados (multi-select)
  onToggleSelection?: (id: string) => void;
}
```

---

## 🎯 FUNCIONALIDADES PRINCIPALES

### 1. Navegación Horizontal
```typescript
const [currentIndex, setCurrentIndex] = useState(0);
const itemsPerView = 5;  // Muestra 5 plantillas a la vez

// Botón Anterior
const handlePrev = () => {
  if (currentIndex > 0) {
    setCurrentIndex(prev => prev - 1);
  }
};

// Botón Siguiente
const handleNext = () => {
  if (currentIndex < items.length - itemsPerView) {
    setCurrentIndex(prev => prev + 1);
  }
};
```

**Ejemplo Visual**:
```
Items totales: 20 plantillas
currentIndex: 0

Vista 1: [1][2][3][4][5] ← Visible
         [6][7][8][9][10]
         [11][12][13][14][15]
         [16][17][18][19][20]

Click "Siguiente" → currentIndex: 1

Vista 2: [1][2][3][4][5]
         [6][7][8][9][10] ← Visible
         [11][12][13][14][15]
         [16][17][18][19][20]
```

---

## 🖼️ RENDERIZADO DE PLANTILLAS

### Cálculo de Items Visibles
```typescript
const visibleItems = items.slice(currentIndex, currentIndex + itemsPerView);
// Si currentIndex = 2 y itemsPerView = 5
// Muestra items del índice 2 al 6 (5 items)
```

### Renderizado de Cada Item
```typescript
{visibleItems.map((item, idx) => {
  const globalIndex = currentIndex + idx;  // Índice real en el array completo
  const isSelected = selectedId === item.id;
  
  return (
    <div key={item.id} className="plantilla-card">
      {/* Preview de la plantilla */}
      <LivePDPPreview 
        templateId={item.id}
        width={260}
        height={340}
      />
      
      {/* Botón Previsualizar - AQUÍ ESTABA EL BUG */}
      <button onClick={(e) => handlePreviewPdp(item.id, e)}>
        Previsualizar
      </button>
    </div>
  );
})}
```

---

## 🐛 LA FUNCIÓN QUE CAUSÓ EL BUG

### ANTES (Código Incorrecto)
```typescript
const handlePreviewPdp = (id: string, e: React.MouseEvent) => {
  e.stopPropagation();
  window.open(`/preview?pdp=${id}`, '_blank');  // ❌ INCORRECTO
};
```

**¿Por qué estaba mal?**
- Usaba parámetro `pdp` que NO EXISTE en `/preview`
- La página `/preview` solo reconoce `template` y `type`

### DESPUÉS (Código Correcto)
```typescript
const handlePreviewPdp = (id: string, e: React.MouseEvent) => {
  e.stopPropagation();
  window.open(`/preview?template=${id}&type=pdp`, '_blank');  // ✅ CORRECTO
};
```

**¿Por qué ahora funciona?**
- Usa `template=${id}` → La página sabe qué plantilla cargar
- Usa `type=pdp` → La página sabe que es una PDP, no una tienda
