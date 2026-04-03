'use client';
import React from 'react';
import { resolverComponentePDP, extraerVariante } from '@/lib/plantilla-registry';
import { obtenerDemoParaTemplate } from '@/lib/demo-productos';

interface LivePDPPreviewProps {
  templateId: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Renderiza una miniatura live de un componente PDP.
 * 
 * Cadena SRP para resolver qué mostrar:
 *   templateId
 *     → resolverComponentePDP() (plantilla-mapper.ts)  → componente React
 *     → obtenerDemoParaTemplate() (demo-productos.ts)  → datos demo del nicho
 *         ↳ resolverCodigo() (plantilla-identity.ts)   → código normalizado
 *         ↳ obtenerNicho() (plantilla-nicho.ts)        → nicho declarado
 * 
 * Ningún módulo "adivina" nada. Todo está declarado explícitamente en registros.
 */
export default React.memo(function LivePDPPreview({ 
  templateId, 
  width = 304, 
  height = 304,
  className = ''
}: LivePDPPreviewProps) {
  const PdpComponent = resolverComponentePDP(templateId);
  const variant = extraerVariante(templateId);
  const { product, store } = obtenerDemoParaTemplate(templateId);

  return (
    <div 
      className={`relative overflow-hidden bg-white ${className}`}
      style={{ 
        width, 
        height,
        contain: 'strict',
        contentVisibility: 'auto',
      }}
    >
      <div style={{
        transform: 'scale(0.38)',
        transformOrigin: 'top left',
        width: '263%',
        height: '263%',
        overflow: 'hidden',
        willChange: 'transform',
      }}>
        <PdpComponent 
          data={store} 
          product={product} 
          variant={variant}
        />
      </div>
    </div>
  );
}, (prev, next) => 
  prev.templateId === next.templateId && 
  prev.width === next.width &&
  prev.height === next.height
);
