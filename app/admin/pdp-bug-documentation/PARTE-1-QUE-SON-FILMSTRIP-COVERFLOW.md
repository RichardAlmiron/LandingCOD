# 🎬 PARTE 1: ¿QUÉ SON FILMSTRIP Y COVERFLOW?

## 📍 UBICACIÓN EN EL SISTEMA

```
Dashboard del Cliente
    └── Flujo de Creación de PDP
        └── Etapa 1: Seleccionar tipo (Store o PDP)
        └── Etapa 2: Seleccionar Plantilla ← AQUÍ ESTÁN FILMSTRIP Y COVERFLOW
        └── Etapa 3: Seleccionar Productos
        └── Etapa 4: Editor Visual
```

---

## 🎯 DEFINICIÓN SIMPLE

**FilmStrip** y **CoverFlow** son dos componentes React que muestran las plantillas de PDP de forma visual e interactiva.

### Analogía del Mundo Real

Imagina que tienes 50 plantillas de diseño y necesitas mostrarlas:

**FILMSTRIP** = Como una tira de película de cine
- Horizontal
- Muestra 5 plantillas a la vez
- Navegas con flechas izquierda/derecha
- Vista plana (2D)

**COVERFLOW** = Como el visualizador de iTunes/Apple Music
- Efecto 3D con perspectiva
- Plantilla central grande, las demás más pequeñas
- Rotación en el eje Y
- Vista con profundidad (3D)

---

## 📂 ARCHIVOS Y UBICACIÓN

```
components/
└── visualizacion/
    ├── FilmStrip.tsx      ← 350 líneas
    └── CoverFlow.tsx      ← 380 líneas
```

---

## 🔄 ¿CÓMO SE SELECCIONA ENTRE ELLOS?

El administrador puede cambiar el modo de visualización:

```typescript
// En BuilderFlow.tsx
const [displayMode, setDisplayMode] = useState<DisplayMode>('filmstrip');

// Modos disponibles:
- 'filmstrip'  → Usa FilmStrip.tsx
- 'coverflow'  → Usa CoverFlow.tsx
```

---

## 🎨 DIFERENCIAS VISUALES

### FilmStrip (Vista Horizontal)
```
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│  1  │ │  2  │ │  3  │ │  4  │ │  5  │
└─────┘ └─────┘ └─────┘ └─────┘ └─────┘
   ←                                  →
```
- 5 plantillas visibles simultáneamente
- Navegación horizontal con flechas
- Todas las plantillas al mismo nivel

### CoverFlow (Vista 3D)
```
    ┌───┐     ┌─────┐     ┌───┐
    │ 1 │     │  2  │     │ 3 │
    └───┘     └─────┘     └───┘
   (rotado)  (central)   (rotado)
      ←          ↕          →
```
- 1 plantilla central grande
- Plantillas laterales rotadas en 3D
- Efecto de profundidad con translateZ
