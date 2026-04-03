'use client';
import React, { useState } from 'react';
import { 
  Database, Layers, Tag, LayoutTemplate, ArrowRight, Code, 
  FileText, Cpu, Heart, Sparkles, Wrench, Home, Shirt, 
  Dumbbell, PawPrint, Car, ChevronDown, ChevronUp,
  Shield, Zap, GitBranch, Server, Globe
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════
// DOCUMENTACIÓN EMPRESARIAL: Sistema de Categorías PDP
// Landing Code Studio — Módulo de Categorización
// ═══════════════════════════════════════════════════════════

const DOC_SECTIONS = [
  {
    id: 'resumen',
    title: 'Resumen Ejecutivo',
    icon: FileText,
    color: '#6366f1',
    content: `El Sistema de Categorías PDP es una reestructuración completa del módulo de páginas de producto del Landing Code Studio. Reemplaza el sistema anterior de IDs arbitrarios (urgency-1, trust-2, bundle-3) por una nomenclatura estandarizada "Standard" con categorización jerárquica por nichos y sub-nichos.

OBJETIVO: Permitir la clasificación, búsqueda y administración eficiente de plantillas de páginas de producto, organizadas por categoría de mercado (nicho) y especialización (sub-nicho).

ALCANCE: Afecta la base de datos (3 tablas nuevas), la API (1 endpoint nuevo), el frontend (7 archivos actualizados), y el flujo del builder (Landing Code Studio paso 2).

COMPATIBILIDAD: El sistema mantiene retrocompatibilidad total con IDs legacy mediante un mapa de traducción automática.`
  },
  {
    id: 'arquitectura',
    title: 'Arquitectura del Sistema',
    icon: GitBranch,
    color: '#8b5cf6',
    content: `FLUJO DE DATOS:

1. Base de Datos (Supabase)
   └── Categorias_PDP (catálogo maestro de nichos)
       └── Subcategorias_PDP (sub-nichos por categoría)
   └── Plantillas_PDP (plantillas con código Standard)

2. API Layer
   └── /api/categorias-pdp (GET: lectura, POST: gestión admin)

3. Resolución de Componentes (lib/mapa-plantillas-pdp.ts)
   └── resolverComponentePDP(templateId) → React Component
   └── Soporta IDs legacy Y códigos Standard

4. Frontend (Landing Code Studio)
   └── BuilderFlow paso 2 → selección por categoría
   └── LivePDPPreview → renderizado de miniatura
   └── Preview.tsx → vista previa completa

PRINCIPIO DE DISEÑO: Una sola fuente de verdad. El mapa centralizado en lib/mapa-plantillas-pdp.ts es el ÚNICO lugar donde se define qué componente React corresponde a cada código de plantilla.`
  },
  {
    id: 'tablas',
    title: 'Estructura de Base de Datos',
    icon: Database,
    color: '#3b82f6',
    content: `TABLA 1: Categorias_PDP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Propósito: Catálogo maestro de categorías (nichos principales).
Cada categoría agrupa plantillas PDP por tipo de mercado.

Columnas:
• id (UUID, PK) — Identificador único
• nombre (VARCHAR 100, UNIQUE) — Nombre de la categoría
• descripcion (TEXT) — Descripción del nicho
• icono (VARCHAR 50) — Nombre del icono Lucide
• color (VARCHAR 20) — Color hex para UI
• orden (INT) — Posición en la lista
• activa (BOOLEAN) — Si está visible para usuarios
• created_at / updated_at (TIMESTAMPTZ)

Categorías iniciales: Standard, Electrónica, Salud, Belleza, Herramientas, Hogar, Moda, Deportes, Mascotas, Automotriz, Alimentos, Juguetes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TABLA 2: Subcategorias_PDP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Propósito: Sub-nichos dentro de cada categoría. Permite clasificación granular.

Columnas:
• id (UUID, PK) — Identificador único
• categoria_id (UUID, FK → Categorias_PDP) — Categoría padre
• nombre (VARCHAR 100) — Nombre del sub-nicho
• descripcion (TEXT) — Descripción
• icono (VARCHAR 50) — Icono Lucide
• orden (INT) — Posición
• activa (BOOLEAN) — Visibilidad
• created_at / updated_at (TIMESTAMPTZ)
• UNIQUE(categoria_id, nombre) — No duplicados por categoría

Relación: ON DELETE CASCADE — Si se elimina la categoría, se eliminan sus subcategorías.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TABLA 3: Plantillas_PDP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Propósito: Reemplaza Paginas_de_Productos_Reutilizables. Almacena las plantillas con nomenclatura Standard y vinculación a categorías.

Columnas:
• id (UUID, PK) — Identificador único
• codigo (VARCHAR 50, UNIQUE) — Código legible (standard-urgencia, premium-bundle)
• nombre (VARCHAR 200) — Nombre descriptivo
• descripcion (TEXT) — Descripción completa
• componente (VARCHAR 100) — Nombre del componente React
• categoria_id (UUID, FK → Categorias_PDP) — Categoría asignada
• subcategoria_id (UUID, FK → Subcategorias_PDP) — Subcategoría
• imagen_url (TEXT) — Screenshot de la plantilla
• premium (BOOLEAN) — Si es plantilla premium
• verificada (BOOLEAN) — Si está verificada por admin
• variante (INT) — Número de variante visual
• orden (INT) — Posición en la lista
• activa (BOOLEAN) — Visibilidad
• deleted_at (TIMESTAMPTZ) — Soft delete
• created_at / updated_at (TIMESTAMPTZ)

Relaciones: ON DELETE SET NULL — Si se elimina categoría/subcategoría, la plantilla queda sin clasificar.`
  },
  {
    id: 'plantillas',
    title: 'Catálogo de Plantillas Standard',
    icon: LayoutTemplate,
    color: '#10b981',
    content: `PLANTILLAS STANDARD (10 plantillas base):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. standard-urgencia → PdpUrgenciaMaxima
   Psicología de urgencia: contador regresivo, escasez, presión social.

2. standard-prueba-social → PdpPruebaSocial
   Validación social: reseñas, UGC, testimonios, contadores.

3. standard-bundle → PdpOfertaBundle
   Ofertas de paquetes: selección de cantidad, descuentos por volumen.

4. standard-historia → PdpHistoriaProducto
   Storytelling: narrativa problema-solución, conexión emocional.

5. standard-checkout-directo → PdpCheckoutDirecto
   Checkout integrado: formulario inline, pago contra entrega.

6. standard-salud → PdpSaludEstandar
   Productos de salud: beneficios clínicos, ingredientes, testimonios.

7. standard-electronico → PdpElectronicoEstandar
   Productos tech: specs técnicas, comparativas, galería HD.

8. standard-herramientas → PdpHerramientasEstandar
   Herramientas: durabilidad, materiales, tutorial de uso.

9. standard-belleza → PdpBellezaEstandar
   Cosméticos: ingredientes, antes/después, rutina de aplicación.

10. standard-hogar → PdpHogarEstandar
    Hogar: ambientación, dimensiones, materiales, estilo de vida.

PLANTILLAS PREMIUM (4 plantillas avanzadas):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

11. premium-urgencia → PdpUrgenciaPremium
12. premium-bundle → PdpOfertaBundlePremium
13. premium-electronico → PdpElectronicoPremium
14. premium-salud → PdpSaludPremium`
  },
  {
    id: 'migracion',
    title: 'Mapa de Migración Legacy → Standard',
    icon: ArrowRight,
    color: '#f59e0b',
    content: `TABLA DE EQUIVALENCIAS (IDs legacy → código Standard):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

urgency-1, urgency-2, urgency-3    →  standard-urgencia
trust-1, trust-2, trust-3          →  standard-prueba-social
bundle-1, bundle-2, bundle-3       →  standard-bundle
story-1, story-2, story-3          →  standard-historia
direct-1, direct-2, direct-3       →  standard-checkout-directo
health-1, health-2, health-3       →  standard-salud
electronics-1, electronics-2, -3   →  standard-electronico
tools-1, tools-2, tools-3          →  standard-herramientas
beauty-1, beauty-2, beauty-3       →  standard-belleza
home-1, home-2, home-3             →  standard-hogar
premium-urgency-1                  →  premium-urgencia
premium-bundle-1                   →  premium-bundle
premium-electronics-1              →  premium-electronico
premium-health-1                   →  premium-salud

FUNCIÓN DE RESOLUCIÓN: resolverCodigoPlantilla(templateId)
Ubicación: lib/types-categorias.ts

Lógica:
1. Si el ID ya es un código Standard → retornarlo directamente
2. Si es un ID legacy → buscar en MAPA_LEGACY_A_STANDARD
3. Si no se encuentra → fallback a 'standard-urgencia'

RETROCOMPATIBILIDAD: Las tiendas y PDPs publicados con IDs legacy seguirán funcionando sin necesidad de migrar datos existentes en la base de datos.`
  },
  {
    id: 'api',
    title: 'API Endpoint',
    icon: Server,
    color: '#06b6d4',
    content: `ENDPOINT: /api/categorias-pdp
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GET /api/categorias-pdp
  Parámetros:
  • incluirInactivas=true — Incluir categorías desactivadas
  • soloPlantillas=true — Retornar solo plantillas (sin categorías)
  
  Respuesta (categorías):
  { categorias: [{ id, nombre, descripcion, icono, color, orden, activa, subcategorias: [...] }] }
  
  Respuesta (plantillas):
  { plantillas: [{ id, codigo, nombre, descripcion, componente, categoria_nombre, categoria_color, subcategoria_nombre, premium, verificada, ... }] }

POST /api/categorias-pdp (requiere admin)
  Body: { tabla, accion, ...campos }
  
  Acciones por tabla:
  
  tabla: 'categoria'
  • accion: 'crear'      → { nombre, descripcion, icono, color, orden }
  • accion: 'actualizar'  → { id, ...campos a actualizar }
  • accion: 'eliminar'    → { id }
  • accion: 'toggle'      → { id, activa: boolean }
  
  tabla: 'subcategoria'
  • accion: 'crear'      → { categoria_id, nombre, descripcion, icono, orden }
  • accion: 'actualizar'  → { id, ...campos }
  • accion: 'eliminar'    → { id }
  
  tabla: 'plantilla'
  • accion: 'asignar_categoria' → { id, categoria_id, subcategoria_id }
  • accion: 'actualizar'        → { id, ...campos }`
  },
  {
    id: 'codigo',
    title: 'Archivos de Código Modificados',
    icon: Code,
    color: '#ef4444',
    content: `ARCHIVOS NUEVOS (4):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• lib/types-categorias.ts — Tipos, mapas de migración, función resolverCodigoPlantilla()
• lib/mapa-plantillas-pdp.ts — Mapa centralizado código → componente React
• app/api/categorias-pdp/route.ts — API de gestión de categorías
• supabase/migrations/20260323_sistema_categorias_pdp.sql — Migración SQL

ARCHIVOS ACTUALIZADOS (6):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• components/panel-de-administracion/LivePDPPreview.tsx
  ANTES: 14 imports individuales + mapa de 34 entradas duplicado
  AHORA: 1 import de resolverComponentePDP + extraerVariante

• components/constructor-visual/Preview.tsx
  ANTES: 14 imports + mapa inline de 34 entradas
  AHORA: 1 import centralizado, resolución automática

• app/t/[identificador_url]/producto/[productId]/page.tsx
  ANTES: 14 dynamic imports + función getPdpComponent con mapa de 30+ entradas
  AHORA: 14 dynamic imports + mapa Standard + resolverCodigoPlantilla()

• app/p/[identificador_url]/page.tsx
  ANTES: Mapa por categoría legacy (16 entradas) + resolvePdpCategory()
  AHORA: Mapa Standard (14 entradas) + resolverCodigoPlantilla()

• app/preview/page.tsx
  ANTES: 14 imports + pdpCategoryMap + resolvePdpCategory + resolvePdpComponent
  AHORA: 1 import centralizado, funciones wrapper

• components/flujo-constructor/BuilderFlow.tsx
  ANTES: pdpTemplate default 'urgency-1'
  AHORA: pdpTemplate default 'standard-urgencia'

• lib/types.ts
  ANTES: PdpTemplate con 9 campos
  AHORA: PdpTemplate con 21 campos (incluye codigo, componente, categoria_*, etc.)

• lib/demoData.ts
  ANTES: pdpTemplate: 'urgency-1'
  AHORA: pdpTemplate: 'standard-urgencia'`
  },
  {
    id: 'categorias',
    title: 'Catálogo Completo de Categorías y Sub-nichos',
    icon: Layers,
    color: '#a855f7',
    content: `CATEGORÍAS Y SUBCATEGORÍAS INICIALES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Standard — Plantillas multipropósito (sin subcategorías)

💻 Electrónica
   └── Celulares, Computadoras, Audio, Cámaras, Gaming,
       Tablets, Wearables, Accesorios Tech, Televisores, Redes

❤️ Salud
   └── Suplementos, Equipos Médicos, Fitness, Cuidado Personal,
       Bienestar, Nutrición

✨ Belleza
   └── Skincare, Maquillaje, Cuidado Capilar, Fragancias,
       Uñas, Corporal

🔧 Herramientas
   └── Manuales, Eléctricas, Jardinería, Medición,
       Ferretería, Industriales

🏠 Hogar
   └── Cocina, Decoración, Organización, Iluminación,
       Limpieza, Muebles

👔 Moda
   └── Ropa Mujer, Ropa Hombre, Calzado, Accesorios,
       Joyería, Bolsos

🏋️ Deportes
   └── Equipamiento, Ropa Deportiva, Outdoor, Ciclismo,
       Acuáticos, Suplementos Dep.

🐾 Mascotas
   └── Perros, Gatos, Accesorios Pet, Higiene Animal

🚗 Automotriz
   └── Repuestos, Accesorios Auto, Electrónica Auto, Limpieza Auto

🍎 Alimentos — (subcategorías por definir)
🎮 Juguetes — (subcategorías por definir)`
  },
  {
    id: 'seguridad',
    title: 'Seguridad y Permisos',
    icon: Shield,
    color: '#10b981',
    content: `POLÍTICAS DE SEGURIDAD (RLS — Row Level Security):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Las 3 tablas tienen RLS habilitado con las siguientes políticas:

LECTURA (SELECT): Pública — cualquier usuario puede leer categorías, subcategorías y plantillas. Esto es necesario para que el Landing Code Studio funcione sin autenticación en el paso de selección.

ESCRITURA (INSERT/UPDATE/DELETE): Solo admin — la API verifica el token JWT y el rol 'admin' antes de permitir cualquier modificación.

VALIDACIÓN EN API:
1. Se extrae el access token de las cookies
2. Se verifica con verifyAccessToken()
3. Se valida que payload.role === 'admin'
4. Solo entonces se ejecuta la operación

SOFT DELETE: Las plantillas usan deleted_at en lugar de eliminación física. Esto permite recuperación y auditoría.`
  },
  {
    id: 'rendimiento',
    title: 'Optimización y Rendimiento',
    icon: Zap,
    color: '#f97316',
    content: `ÍNDICES DE BASE DE DATOS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Categorias_PDP:
• idx_categorias_pdp_nombre — Búsqueda por nombre
• idx_categorias_pdp_orden — Ordenamiento
• idx_categorias_pdp_activa — Filtro de activas (parcial)

Subcategorias_PDP:
• idx_subcategorias_pdp_categoria — JOIN con categoría padre
• idx_subcategorias_pdp_nombre — Búsqueda por nombre
• idx_subcategorias_pdp_activa — Filtro de activas (parcial)

Plantillas_PDP:
• idx_plantillas_pdp_codigo — Búsqueda por código Standard
• idx_plantillas_pdp_categoria — Filtro por categoría
• idx_plantillas_pdp_subcategoria — Filtro por subcategoría
• idx_plantillas_pdp_verificada — Filtro de verificadas (parcial)
• idx_plantillas_pdp_activa — Filtro de activas (parcial)
• idx_plantillas_pdp_premium — Filtro de premium (parcial)

RESOLUCIÓN DE COMPONENTES:
• La función resolverComponentePDP() opera en O(1) — lookup directo en objeto
• El mapa MAPA_LEGACY_A_STANDARD opera en O(1) — lookup directo
• No hay queries a DB para resolver componentes — todo es estático en el frontend

TRIGGERS:
• updated_at se actualiza automáticamente en cada UPDATE
• No hay triggers costosos ni funciones complejas`
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
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
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
              Documentación empresarial completa — Landing Code Studio
            </p>
          </div>
        </div>
        <div style={{
          marginTop: 16, padding: '16px 20px', borderRadius: 12,
          background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.1)',
        }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>
            Este documento describe la arquitectura completa del sistema de categorización de páginas de producto (PDP).
            Incluye estructura de base de datos, API, lógica de resolución de componentes, mapa de migración legacy,
            catálogo de categorías/subcategorías, y políticas de seguridad.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { label: 'Tablas Nuevas', value: '3', color: '#3b82f6' },
          { label: 'Plantillas Standard', value: '14', color: '#10b981' },
          { label: 'Categorías', value: '12', color: '#8b5cf6' },
          { label: 'Subcategorías', value: '52+', color: '#f59e0b' },
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {DOC_SECTIONS.map((section, i) => (
          <DocSection key={section.id} section={section} index={i} />
        ))}
      </div>
    </div>
  );
}
