'use client';
import React, { useState } from 'react';
import { Bug, CheckCircle, Code, ArrowRight, Layers, FileText, GitBranch, AlertTriangle } from 'lucide-react';

interface BugEntry {
  id: string;
  fecha: string;
  titulo: string;
  severidad: 'CRITICA' | 'ALTA' | 'MEDIA';
  estado: 'RESUELTO';
  commit: string;
  archivosCreados: string[];
  archivosModificados: string[];
  resumen: string;
  causa: string;
  solucion: string;
  cadena?: string[];
  pasos?: string[];
}

const BUGS_RESUELTOS: BugEntry[] = [
  {
    id: 'bug-preview-pdp',
    fecha: '22 de Marzo de 2026',
    titulo: 'Preview de PDP mostraba Tienda en vez de Página de Producto',
    severidad: 'CRITICA',
    estado: 'RESUELTO',
    commit: '516084f',
    archivosCreados: [],
    archivosModificados: [
      'components/visualizacion/FilmStrip.tsx',
      'components/visualizacion/CoverFlow.tsx',
    ],
    resumen: 'Al hacer click en "Previsualizar" en la Etapa 2 del Builder, se abría una tienda completa en lugar de la página de producto seleccionada.',
    causa: 'Los componentes FilmStrip y CoverFlow usaban el parámetro de URL incorrecto: ?pdp=ID en vez de ?template=ID&type=pdp. La página /preview no reconoce el parámetro "pdp".',
    solucion: 'Se corrigió la URL de preview en ambos componentes para usar los parámetros correctos: ?template=ID&type=pdp.',
  },
  {
    id: 'bug-miniaturas-carrusel-srp',
    fecha: '24 de Marzo de 2026',
    titulo: 'Miniaturas del Carrusel Step 2 mostraban imágenes de reloj para todos los nichos',
    severidad: 'ALTA',
    estado: 'RESUELTO',
    commit: '531c5aa',
    archivosCreados: [
      'lib/plantilla-nicho.ts',
      'lib/demo-productos.ts',
    ],
    archivosModificados: [
      'components/panel-de-administracion/LivePDPPreview.tsx',
      'app/preview/page.tsx',
    ],
    resumen: 'Las miniaturas del carrusel de selección de plantillas PDP (Etapa 2) mostraban una imagen de reloj para TODAS las plantillas, sin importar el nicho (celulares, salud, belleza, etc.). El preview a pantalla completa sí mostraba las imágenes correctas.',
    causa: 'LivePDPPreview.tsx tenía un mockProduct hardcodeado con imagen de reloj (photo-1523275335684) que se pasaba a TODOS los componentes PDP. Los componentes usan product.images[0] para el hero, así que todos mostraban el reloj.',
    solucion: 'Arquitectura SRP con 4 módulos de responsabilidad única. Registro explícito código→nicho (sin autodetección por nombre). Cada plantilla declara su nicho en plantilla-nicho.ts, y demo-productos.ts provee los datos demo correspondientes.',
    cadena: [
      'templateId',
      'resolverCodigo() — plantilla-identity.ts',
      'obtenerNicho() — plantilla-nicho.ts',
      'DEMO_POR_NICHO[nicho] — demo-productos.ts',
    ],
    pasos: [
      'Registrar el código en lib/plantilla-nicho.ts → NICHO_POR_CODIGO',
      'Si es nicho nuevo: agregar tipo en NichoPDP y demo en lib/demo-productos.ts → DEMO_POR_NICHO',
      'LivePDPPreview.tsx y preview/page.tsx lo consumen automáticamente',
    ],
  },
];

export default function BugsResueltosPage() {
  const [activeBug, setActiveBug] = useState(BUGS_RESUELTOS[1]);

  const severidadColor: Record<string, string> = {
    CRITICA: '#ef4444',
    ALTA: '#f59e0b',
    MEDIA: '#3b82f6',
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px', height: 'calc(100vh - 120px)' }}>
      {/* Sidebar — Lista de bugs */}
      <div className="ultra-glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, padding: '0 8px' }}>
          <Bug size={18} color="#ef4444" />
          <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.05em' }}>BUGS RESUELTOS</span>
        </div>

        {BUGS_RESUELTOS.map(bug => (
          <button
            key={bug.id}
            onClick={() => setActiveBug(bug)}
            style={{
              display: 'flex', flexDirection: 'column', gap: 6, padding: '14px 16px', borderRadius: 12,
              border: activeBug.id === bug.id ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
              background: activeBug.id === bug.id ? 'rgba(255,255,255,0.05)' : 'transparent',
              color: activeBug.id === bug.id ? '#fff' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle size={14} color="#22c55e" />
              <span style={{ fontSize: 13, fontWeight: activeBug.id === bug.id ? 700 : 500, lineHeight: 1.3 }}>
                {bug.titulo}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginLeft: 22 }}>
              <span style={{
                fontSize: 10, fontWeight: 800, padding: '2px 6px', borderRadius: 4,
                background: `${severidadColor[bug.severidad]}20`,
                color: severidadColor[bug.severidad],
              }}>
                {bug.severidad}
              </span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{bug.fecha}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Contenido principal */}
      <div style={{ overflowY: 'auto', paddingRight: '8px' }}>
        {/* Header */}
        <div className="ultra-glass" style={{ padding: '32px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{
              width: 50, height: 50, borderRadius: 12,
              background: `${severidadColor[activeBug.severidad]}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${severidadColor[activeBug.severidad]}30`,
            }}>
              <Bug size={24} color={severidadColor[activeBug.severidad]} />
            </div>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 900, margin: 0 }}>{activeBug.titulo}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, marginTop: 6 }}>
                <span style={{
                  background: '#22c55e20', color: '#22c55e', padding: '3px 10px',
                  borderRadius: 20, fontWeight: 700, fontSize: 11,
                }}>
                  ✅ {activeBug.estado}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>{activeBug.fecha}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.3)' }}>
                  <GitBranch size={12} /> {activeBug.commit}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Resumen */}
        <div className="ultra-glass" style={{ padding: '24px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <FileText size={16} color="#60a5fa" />
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.05em', color: '#60a5fa' }}>RESUMEN</span>
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: 0 }}>
            {activeBug.resumen}
          </p>
        </div>

        {/* Causa Raíz */}
        <div className="ultra-glass" style={{ padding: '24px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <AlertTriangle size={16} color="#f59e0b" />
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.05em', color: '#f59e0b' }}>CAUSA RAÍZ</span>
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: 0 }}>
            {activeBug.causa}
          </p>
        </div>

        {/* Solución */}
        <div className="ultra-glass" style={{ padding: '24px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <CheckCircle size={16} color="#22c55e" />
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.05em', color: '#22c55e' }}>SOLUCIÓN IMPLEMENTADA</span>
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: 0 }}>
            {activeBug.solucion}
          </p>
        </div>

        {/* Cadena SRP (si existe) */}
        {activeBug.cadena && (
          <div className="ultra-glass" style={{ padding: '24px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Layers size={16} color="#a78bfa" />
              <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.05em', color: '#a78bfa' }}>CADENA SRP</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {activeBug.cadena.map((paso, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {i > 0 && <ArrowRight size={14} color="rgba(255,255,255,0.2)" style={{ marginLeft: 4 }} />}
                  <div style={{
                    background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)',
                    borderRadius: 8, padding: '8px 14px', fontSize: 13, fontFamily: 'monospace',
                    color: 'rgba(255,255,255,0.8)', fontWeight: 600,
                  }}>
                    {paso}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Archivos */}
        <div className="ultra-glass" style={{ padding: '24px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Code size={16} color="#38bdf8" />
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.05em', color: '#38bdf8' }}>ARCHIVOS INVOLUCRADOS</span>
          </div>

          {activeBug.archivosCreados.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', marginBottom: 8, display: 'block' }}>CREADOS</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {activeBug.archivosCreados.map(f => (
                  <code key={f} style={{
                    fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.7)',
                    background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)',
                    borderRadius: 6, padding: '6px 12px',
                  }}>
                    + {f}
                  </code>
                ))}
              </div>
            </div>
          )}

          {activeBug.archivosModificados.length > 0 && (
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', marginBottom: 8, display: 'block' }}>MODIFICADOS</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {activeBug.archivosModificados.map(f => (
                  <code key={f} style={{
                    fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.7)',
                    background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)',
                    borderRadius: 6, padding: '6px 12px',
                  }}>
                    ~ {f}
                  </code>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pasos para futuro (si existen) */}
        {activeBug.pasos && (
          <div className="ultra-glass" style={{ padding: '24px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Layers size={16} color="#2dd4bf" />
              <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.05em', color: '#2dd4bf' }}>CÓMO AGREGAR UN NICHO NUEVO</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {activeBug.pasos.map((paso, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    minWidth: 24, height: 24, borderRadius: '50%',
                    background: 'rgba(45,212,191,0.15)', border: '1px solid rgba(45,212,191,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 800, color: '#2dd4bf',
                  }}>
                    {i + 1}
                  </div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: 0 }}>
                    {paso}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
