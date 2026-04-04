'use client';
import React, { useState } from 'react';
import { 
  Database, Layers, Tag, LayoutTemplate, ArrowRight, Code, 
  FileText, Cpu, Heart, Sparkles, Wrench, Home, Shirt, 
  Dumbbell, PawPrint, Car, ChevronDown, ChevronUp,
  Shield, Zap, GitBranch, Server, Globe
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════
// DOCUMENTACIÓN EMPRESARIAL: Sistema de Categorías PDP (v2)
// Landing Code Studio — Módulo de Categorización Simplificado
// ═══════════════════════════════════════════════════════════

const DOC_SECTIONS = [
  {
    id: 'resumen',
    title: 'Resumen Ejecutivo',
    icon: FileText,
    color: '#6366f1',
    content: `El Sistema de Categorías PDP es una reestructuración completa del módulo de páginas de producto del Landing Code Studio. Organiza las plantillas con categorización directa por nichos de mercado.

OBJETIVO: Permitir la clasificación, búsqueda y administración eficiente de plantillas de páginas de producto, organizadas por categoría de mercado (nicho).

ALCANCE: Afecta la base de datos (Categorias_PDP, Plantillas_PDP), la API (/api/categorias-pdp), y el flujo de selección del builder (Etapa 2).

COMPATIBILIDAD: Mantiene retrocompatibilidad total con IDs legacy mediante traducción automática.`
  },
  {
    id: 'arquitectura',
    title: 'Arquitectura del Sistema',
    icon: GitBranch,
    color: '#8b5cf6',
    content: `FLUJO DE DATOS:

1. Base de Datos (Supabase)
   └── Categorias_PDP (catálogo de nichos)
   └── Plantillas_PDP (plantillas vinculadas a categorías)

2. API Layer
   └── /api/categorias-pdp (GET: lectura, POST: gestión admin)

3. Resolución de Componentes
   └── resolverComponentePDP(templateId) → React Component
   └── Soporta IDs legacy y códigos de plantilla en una sola fuente de verdad.

4. Frontend (Landing Code Studio)
   └── BuilderFlow paso 2 → selección por categoría
   └── LivePDPPreview → renderizado de miniaturas live`
  },
  {
    id: 'tablas',
    title: 'Estructura de Base de Datos',
    icon: Database,
    color: '#3b82f6',
    content: `TABLA 1: Categorias_PDP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Propósito: Catálogo maestro de categorías (nichos).

Columnas: id, nombre, descripcion, icono, color, orden, activa.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TABLA 2: Plantillas_PDP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Propósito: Almacena las plantillas con vinculación a categorías.

Columnas: id, codigo, nombre, descripcion, componente, categoria_id, imagen_url, premium, verificada, variante, orden, activa.`
  },
  {
    id: 'plantillas',
    title: 'Catálogo de Plantillas PDP',
    icon: LayoutTemplate,
    color: '#10b981',
    content: `PLANTILLAS BASE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. standard-salud → PdpSaludEstandar
2. standard-herramientas → PdpHerramientasEstandar
4. standard-belleza → PdpBellezaEstandar
5. standard-hogar → PdpHogarEstandar

PLANTILLAS PREMIUM:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

6. premium-salud → PdpSaludPremium`
  },
  {
    id: 'api',
    title: 'API Endpoint',
    icon: Server,
    color: '#06b6d4',
    content: `ENDPOINT: /api/categorias-pdp
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GET /api/categorias-pdp
  Respuesta: { categorias: [...], plantillas: [...] }

POST /api/categorias-pdp (Admin)
  tabla: 'categoria'
  • accion: 'crear' | 'actualizar' | 'eliminar' | 'toggle'
  
  tabla: 'plantilla'
  • accion: 'asignar_categoria' | 'actualizar'`
  },
  {
    id: 'seguridad',
    title: 'Seguridad y Permisos',
    icon: Shield,
    color: '#10b981',
    content: `POLÍTICAS DE SEGURIDAD (RLS):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LECTURA: Pública (necesario para el builder).
ESCRITURA: Solo admin (token JWT verificado).

SOFT DELETE: Se utiliza deleted_at para plantillas.`
  }
];

function DocSection({ section, index }: { section: typeof DOC_SECTIONS[0]; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div style={{
      background: 'rgba(255,255,255,0.015)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 8
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16,
        background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12, flexShrink: 0,
          background: `${section.color}12`, border: `1px solid ${section.color}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <section.icon size={18} style={{ color: section.color }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{section.title}</div>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.2)' }}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>
      {open && (
        <div style={{ padding: '0 24px 24px' }}>
          <pre style={{
            margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.9,
          }}>
            {section.content}
          </pre>
        </div>
      )}
    </div>
  );
}

export default function DocumentacionCategoriasPDP() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24, padding: '20px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
            border: '1px solid rgba(99,102,241,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Database size={22} style={{ color: '#a78bfa' }} />
          </div>
          <div>
            <h1 className="shimmer-text" style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.03em', margin: 0 }}>
              SISTEMA DE CATEGORÍAS PDP
            </h1>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 600, marginTop: 4 }}>
              Documentación técnica simplificada — Landing Code Studio
            </p>
          </div>
        </div>
        <div style={{
          marginTop: 16, padding: '16px 20px', borderRadius: 12,
          background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.1)',
        }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>
            Este documento describe la arquitectura del sistema de categorización de páginas de producto (PDP) 
            basado en un modelo de nicho único (sin subcategorías).
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[
          { label: 'Tablas Nucleares', value: '2', color: '#3b82f6' },
          { label: 'Plantillas PDP', value: '14', color: '#10b981' },
          { label: 'Categorías (Nichos)', value: '12', color: '#8b5cf6' },
        ].map((stat, i) => (
          <div key={i} style={{
            padding: '16px 20px', borderRadius: 12, textAlign: 'center',
            background: `${stat.color}08`, border: `1px solid ${stat.color}15`,
          }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {DOC_SECTIONS.map((section, i) => (
          <DocSection key={section.id} section={section} index={i} />
        ))}
      </div>
    </div>
  );
}
