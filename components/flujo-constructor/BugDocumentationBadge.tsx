'use client';
import React, { useState } from 'react';
import { AlertCircle, X, FileText, BookOpen } from 'lucide-react';

export default function BugDocumentationBadge() {
  const [showModal, setShowModal] = useState(false);

  const documentContent = `
# 🐛 BUG CRÍTICO RESUELTO - Preview de PDP mostraba Tienda

## 📅 Fecha: 22 de Marzo de 2026

---

## 🎯 PROTAGONISTAS DEL BUG

### 🎞️ FilmStrip.tsx
- **Ubicación**: components/visualizacion/FilmStrip.tsx
- **Línea del bug**: 126
- **Función**: handlePreviewPdp

### 🌊 CoverFlow.tsx
- **Ubicación**: components/visualizacion/CoverFlow.tsx
- **Línea del bug**: 134
- **Función**: handlePreviewPdp

---

## 🔴 EL PROBLEMA

En la Etapa 2 del flujo de creación de PDP, cuando hacías click en "Previsualizar", 
se abría una TIENDA en lugar de la PÁGINA DE PRODUCTO.

---

## 🐛 CÓDIGO INCORRECTO

\`\`\`typescript
// ❌ ANTES (INCORRECTO)
const handlePreviewPdp = (id: string, e: React.MouseEvent) => {
  e.stopPropagation();
  window.open(\`/preview?pdp=\${id}\`, '_blank');
  //                    ^^^
  //                    Parámetro que NO EXISTE
};
\`\`\`

---

## ✅ CÓDIGO CORRECTO

\`\`\`typescript
// ✅ DESPUÉS (CORRECTO)
const handlePreviewPdp = (id: string, e: React.MouseEvent) => {
  e.stopPropagation();
  window.open(\`/preview?template=\${id}&type=pdp\`, '_blank');
  //                    ^^^^^^^^       ^^^^^^^^
  //                    Parámetros CORRECTOS
};
\`\`\`

---

## 📊 ¿POR QUÉ FALLABA?

La página /preview solo reconoce estos parámetros:
- ✅ template = ID de la plantilla
- ✅ type = 'pdp' o 'store'
- ❌ pdp = NO EXISTE

Cuando usaba ?pdp=urgency-1, la página no encontraba los parámetros 
correctos y mostraba una tienda por defecto.

---

## 🎬 ¿QUÉ SON FILMSTRIP Y COVERFLOW?

Son dos modos de visualización para mostrar las plantillas PDP:

**FILMSTRIP** = Vista horizontal tipo película
- Muestra 5 plantillas a la vez
- Navegación con flechas
- Vista 2D plana

**COVERFLOW** = Vista 3D tipo iTunes
- Plantilla central grande
- Efecto 3D con rotación
- Vista con profundidad

---

## ✅ SOLUCIÓN APLICADA

Se corrigió la función handlePreviewPdp en AMBOS archivos:
1. FilmStrip.tsx (línea 126)
2. CoverFlow.tsx (línea 134)

Ahora usan los parámetros correctos: ?template=ID&type=pdp

---

## 📝 ARCHIVOS MODIFICADOS

✅ components/visualizacion/FilmStrip.tsx
✅ components/visualizacion/CoverFlow.tsx
✅ components/flujo-constructor/BuilderFlow.tsx (badge agregado)

---

## 🎯 RESULTADO

ANTES: Click "Previsualizar" → ❌ Muestra TIENDA
DESPUÉS: Click "Previsualizar" → ✅ Muestra PDP

---

⚠️ ESTOS DOS ARCHIVOS CAUSARON MUCHOS DOLORES DE CABEZA.
Antes de modificarlos, verifica siempre los parámetros de URL.
  `;

  return (
    <>
      {/* Badge parpadeante */}
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-xs transition-all hover:scale-105 shadow-lg animate-pulse"
        style={{
          background: 'linear-gradient(135deg, #dc2626, #ef4444)',
          color: '#fff',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 0 20px rgba(220, 38, 38, 0.5)',
        }}
        title="Click para ver documentación del bug resuelto"
      >
        <AlertCircle className="w-4 h-4" />
        <span>BUG RESUELTO</span>
        <BookOpen className="w-4 h-4" />
      </button>

      {/* Modal con documentación */}
      {showModal && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6" />
                <h2 className="text-xl font-bold">🐛 Bug Crítico Resuelto - FilmStrip & CoverFlow</h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              <div className="max-w-none">
                <div className="whitespace-pre-wrap text-sm bg-white p-6 rounded-lg border border-gray-200 shadow-sm leading-relaxed" style={{ color: '#1f2937', fontFamily: 'monospace' }}>
                  {documentContent}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-white px-6 py-4 flex justify-between items-center border-t border-gray-200">
              <div className="text-sm text-gray-600 font-semibold">
                📅 Resuelto: 22 de Marzo de 2026
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold shadow-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
