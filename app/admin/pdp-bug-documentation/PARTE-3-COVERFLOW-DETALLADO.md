# 🌊 PARTE 3: COVERFLOW - EXPLICACIÓN DETALLADA

## 📋 INFORMACIÓN BÁSICA

**Archivo**: `components/visualizacion/CoverFlow.tsx`  
**Líneas de código**: ~380  
**Propósito**: Mostrar plantillas PDP con efecto 3D tipo Apple CoverFlow

---

## 🧩 ESTRUCTURA DEL COMPONENTE

### Props que Recibe
```typescript
interface CoverFlowProps {
  items: PdpTemplate[];              // Array de plantillas
  selectedId: string;                // ID seleccionado
  onSelect: (id: string) => void;    // Callback selección
  onConfirmSelect?: (id: string) => void;
  isAdmin?: boolean;
  onVerifyToggle?: (id: string, verified: boolean) => void;
  onDelete?: (id: string | string[]) => void;
  selectedIds?: string[];
  onToggleSelection?: (id: string) => void;
}
```

---

## 🎯 DIFERENCIA CLAVE CON FILMSTRIP

### FilmStrip
- Muestra 5 items a la vez
- Vista plana (2D)
- Navegación por "ventana deslizante"

### CoverFlow
- Muestra TODOS los items
- Vista 3D con perspectiva
- Navegación por "item central"

---

## 🎨 EFECTO 3D - CÓMO FUNCIONA

### Cálculo de Posición y Transformación
```typescript
items.map((item, index) => {
  const offset = index - currentIndex;  // Distancia del centro
  const absOffset = Math.abs(offset);   // Distancia absoluta
  const isCenter = offset === 0;        // ¿Es el item central?
  
  // Transformaciones CSS
  const translateX = offset * 220;      // Separación horizontal
  const translateZ = -absOffset * 100;  // Profundidad (3D)
  const rotateY = offset * -35;         // Rotación en eje Y
  const scale = isCenter ? 1.2 : 0.6;   // Escala (central más grande)
  const opacity = isCenter ? 1 : 0.3;   // Opacidad
  
  return (
    <div style={{
      transform: `
        translateX(${translateX}px) 
        translateZ(${translateZ}px) 
        rotateY(${rotateY}deg) 
        scale(${scale})
      `,
      opacity: opacity
    }}>
      {/* Plantilla */}
    </div>
  );
});
```

### Ejemplo Visual con 5 Items

**currentIndex = 2** (Item 3 es el central)

```
Item 1:                    Item 2:                Item 3:
offset = -2                offset = -1            offset = 0
translateX = -440px        translateX = -220px    translateX = 0px
translateZ = -200px        translateZ = -100px    translateZ = 0px
rotateY = 70deg            rotateY = 35deg        rotateY = 0deg
scale = 0.6                scale = 0.6            scale = 1.2
opacity = 0.3              opacity = 0.3          opacity = 1.0

    ┌───┐                      ┌───┐                  ┌─────┐
    │ 1 │ (rotado derecha)     │ 2 │ (rotado)         │  3  │ (frontal)
    └───┘                      └───┘                  └─────┘
```

---

## 🎯 NAVEGACIÓN EN COVERFLOW

### Cambio de Item Central
```typescript
const handlePrev = () => {
  if (currentIndex > 0) {
    const newIdx = currentIndex - 1;
    setCurrentIndex(newIdx);
    onSelect(items[newIdx].id);  // Selecciona automáticamente
  }
};

const handleNext = () => {
  if (currentIndex < items.length - 1) {
    const newIdx = currentIndex + 1;
    setCurrentIndex(newIdx);
    onSelect(items[newIdx].id);
  }
};
```

**Diferencia con FilmStrip**:
- FilmStrip: Cambia la "ventana" de visualización
- CoverFlow: Cambia el item central y reposiciona TODOS los items

---

## 🐛 LA FUNCIÓN QUE CAUSÓ EL BUG (IDÉNTICA A FILMSTRIP)

### ANTES (Código Incorrecto)
```typescript
const handlePreviewPdp = (id: string, e: React.MouseEvent) => {
  e.stopPropagation();
  window.open(`/preview?pdp=${id}`, '_blank');  // ❌ INCORRECTO
};
```

### DESPUÉS (Código Correcto)
```typescript
const handlePreviewPdp = (id: string, e: React.MouseEvent) => {
  e.stopPropagation();
  window.open(`/preview?template=${id}&type=pdp`, '_blank');  // ✅ CORRECTO
};
```

**Nota**: El bug era EXACTAMENTE EL MISMO en ambos componentes.
