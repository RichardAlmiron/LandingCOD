'use client';
import React, { useState } from 'react';
import {
  Sparkles, Code, Database, Table, Shield, Info, Zap, MousePointer,
  Type, Palette, Plus, Undo2, Redo2, Save, Trash2, Eye, Layers,
  FileCode, Server, ArrowRight, CheckCircle, AlertTriangle, Keyboard,
  Monitor, Smartphone, PenTool, LayoutGrid, Component, Hash,
  GitBranch, Box, Workflow, BookOpen, Terminal, Globe, Lock
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// DATA: Toda la documentación estructurada
// ═══════════════════════════════════════════════════════════════

type SectionId = 'overview' | 'howto' | 'features' | 'components' | 'architecture' | 'database' | 'api' | 'dataflow' | 'shortcuts' | 'security' | 'files';

interface NavItem {
  id: SectionId;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Visión General', icon: <Sparkles size={16} /> },
  { id: 'howto', label: 'Cómo se Usa', icon: <MousePointer size={16} /> },
  { id: 'features', label: 'Capacidades', icon: <Zap size={16} />, badge: '3 paneles' },
  { id: 'components', label: 'Componentes', icon: <Component size={16} />, badge: '12' },
  { id: 'architecture', label: 'Arquitectura', icon: <GitBranch size={16} /> },
  { id: 'files', label: 'Archivos & Código', icon: <FileCode size={16} />, badge: '8' },
  { id: 'database', label: 'Base de Datos', icon: <Database size={16} /> },
  { id: 'api', label: 'API Endpoints', icon: <Server size={16} />, badge: '3' },
  { id: 'dataflow', label: 'Flujo de Datos', icon: <Workflow size={16} /> },
  { id: 'shortcuts', label: 'Atajos de Teclado', icon: <Keyboard size={16} /> },
  { id: 'security', label: 'Seguridad', icon: <Shield size={16} /> },
];

const INSERTABLE_COMPONENTS = [
  { name: 'Barra de Anuncio', icon: '📢', cat: 'Banner', desc: 'Barra superior con mensaje promocional y gradiente' },
  { name: 'Banner Hero', icon: '🖼️', cat: 'Banner', desc: 'Banner grande con título, descripción y botón CTA' },
  { name: 'Temporizador', icon: '⏰', cat: 'Banner', desc: 'Cuenta regresiva para generar urgencia de compra' },
  { name: 'Bloque de Texto', icon: '📝', cat: 'Texto', desc: 'Título + párrafo personalizable con formato' },
  { name: 'Imagen / Banner', icon: '🌄', cat: 'Media', desc: 'Imagen a ancho completo con enlace opcional' },
  { name: 'Prueba Social', icon: '⭐', cat: 'Social', desc: 'Reseñas, testimonios y calificaciones de clientes' },
  { name: 'Separador', icon: '➖', cat: 'Divider', desc: 'Línea divisoria decorativa con gradiente' },
  { name: 'Insignias de Confianza', icon: '🛡️', cat: 'Badge', desc: 'Iconos de pago seguro, envío y garantía' },
  { name: 'Grid de Características', icon: '📊', cat: 'Badge', desc: 'Cuadrícula 3 columnas con beneficios' },
  { name: 'Botón CTA', icon: '🔘', cat: 'CTA', desc: 'Botón de llamada a la acción con gradiente y sombra' },
  { name: 'Newsletter', icon: '✉️', cat: 'CTA', desc: 'Formulario de suscripción con input + botón' },
  { name: 'Botón WhatsApp', icon: '💬', cat: 'CTA', desc: 'Botón verde de contacto directo por WhatsApp' },
];

const ARCHITECTURE_FILES = [
  { path: 'lib/visual-editor-types.ts', role: 'Tipos & Constantes', desc: 'Interfaces TypeScript, 20 fuentes, 32 colores, 12 bloques de componentes con HTML predeterminado.', lines: '~200', type: 'types' },
  { path: 'components/visual-editor/VisualEditorOverlay.tsx', role: 'Editor Principal', desc: 'Overlay fullscreen con iframe, paneles laterales, toolbar, undo/redo, inyección CSS, detección de elementos editables.', lines: '~850', type: 'component' },
  { path: 'components/store/VisualCustomizationApplier.tsx', role: 'Aplicador en Producción', desc: 'Componente invisible que aplica customizaciones al DOM de tiendas publicadas después de 300ms.', lines: '~80', type: 'component' },
  { path: 'lib/types.ts', role: 'StoreData Extendido', desc: 'Campo visualCustomizations añadido a la interfaz StoreData con customizations[] e injectedComponents[].', lines: 'Modificado', type: 'types' },
  { path: 'components/saas/BuilderFlow.tsx', role: 'Integración Builder', desc: 'Botón "Editor Visual HTML PRO" en paso 4, estado showVisualEditor, overlay render, save handler.', lines: 'Modificado', type: 'integration' },
  { path: 'app/api/tiendas/route.ts', role: 'API PATCH', desc: 'Nuevo endpoint PATCH para actualizar visualCustomizations en tiendas ya publicadas con verificación de ownership.', lines: 'Modificado', type: 'api' },
  { path: 'app/t/[identificador_url]/page.tsx', role: 'Tienda Publicada', desc: 'Monta VisualCustomizationApplier condicionalmente si store_data tiene visualCustomizations.', lines: 'Modificado', type: 'integration' },
  { path: 'app/preview/page.tsx', role: 'Preview Mode', desc: 'Soporte para parámetro ve=1 que oculta controles admin cuando se usa como iframe del editor.', lines: 'Modificado', type: 'integration' },
];

const DB_TABLES = [
  {
    name: 'builder_configurations',
    purpose: 'Almacena el estado en progreso del builder. Las visualCustomizations se guardan dentro del campo JSONB store_data mientras el usuario edita.',
    fields: [
      { name: 'id', type: 'UUID', desc: 'Identificador único de la configuración.' },
      { name: 'user_id', type: 'UUID', desc: 'FK al usuario propietario.' },
      { name: 'tienda_id', type: 'UUID', desc: 'NULL hasta que se publica. Se asigna al publicar.' },
      { name: 'flow_type', type: 'TEXT', desc: 'Tipo de flujo: "store" o "pdp".' },
      { name: 'store_data', type: 'JSONB', desc: 'Estructura completa de la tienda. CONTIENE visualCustomizations.customizations[] y visualCustomizations.injectedComponents[].' },
      { name: 'template', type: 'TEXT', desc: 'ID del template seleccionado (ej: "megamarket").' },
      { name: 'current_step', type: 'INT', desc: 'Paso actual del builder (1-4).' },
      { name: 'selected_products', type: 'JSONB', desc: 'Array de IDs de productos seleccionados del catálogo.' },
      { name: 'updated_at', type: 'TIMESTAMPTZ', desc: 'Última actualización (auto-save cada 2s).' },
      { name: 'last_accessed_at', type: 'TIMESTAMPTZ', desc: 'Último acceso del usuario a esta configuración.' },
    ]
  },
  {
    name: 'tiendas_publicadas',
    purpose: 'Tiendas en producción visibles al público. Las visualCustomizations se persisten dentro de store_data y se aplican en tiempo real por VisualCustomizationApplier.',
    fields: [
      { name: 'id', type: 'UUID', desc: 'Identificador único de la tienda publicada.' },
      { name: 'user_id', type: 'UUID', desc: 'FK al usuario propietario.' },
      { name: 'identificador_url', type: 'TEXT', desc: 'Slug único para la URL pública (ej: "mi-tienda").' },
      { name: 'name', type: 'TEXT', desc: 'Nombre visible de la tienda.' },
      { name: 'template', type: 'TEXT', desc: 'ID del template de diseño.' },
      { name: 'pdp_template', type: 'TEXT', desc: 'ID del template de página de producto.' },
      { name: 'store_data', type: 'JSONB', desc: 'Estructura completa. CONTIENE visualCustomizations con todos los cambios del editor visual.' },
      { name: 'status', type: 'TEXT', desc: 'Estado de la tienda: "published".' },
    ]
  }
];

const API_ENDPOINTS = [
  {
    method: 'POST',
    path: '/api/builder-config',
    purpose: 'Guarda el estado del builder incluyendo visualCustomizations dentro de store_data.',
    trigger: 'Se llama al hacer clic en "Guardar" en el editor visual. También por auto-save debounced cada 2 segundos.',
    body: '{ flowType, storeData (con visualCustomizations), template, currentStep, selectedProducts }',
    response: '{ success: true, config: {...} }',
    color: '#22c55e',
  },
  {
    method: 'POST',
    path: '/api/tiendas',
    purpose: 'Publica la tienda. El store_data enviado ya incluye visualCustomizations si el usuario editó visualmente.',
    trigger: 'Se llama al hacer clic en "Publicar Tienda" en el modal de publicación.',
    body: '{ identificador_url, storeData (con visualCustomizations), template }',
    response: '{ success: true, store: { id, identificador_url } }',
    color: '#3b82f6',
  },
  {
    method: 'PATCH',
    path: '/api/tiendas',
    purpose: 'Actualiza las customizaciones visuales de una tienda YA publicada. Verifica ownership por user_id.',
    trigger: 'Se llama cuando se edita una tienda publicada desde el editor visual (futuro).',
    body: '{ identificador_url, visualCustomizations: { customizations[], injectedComponents[] } }',
    response: '{ success: true }',
    color: '#f59e0b',
  },
];

const SHORTCUTS = [
  { keys: 'Ctrl + S', action: 'Guardar todos los cambios', context: 'Global' },
  { keys: 'Ctrl + Z', action: 'Deshacer último cambio', context: 'Global' },
  { keys: 'Ctrl + Shift + Z', action: 'Rehacer cambio deshecho', context: 'Global' },
  { keys: 'Ctrl + Y', action: 'Rehacer (alternativo)', context: 'Global' },
  { keys: 'Delete', action: 'Eliminar elemento seleccionado', context: 'Con elemento seleccionado' },
  { keys: 'Escape', action: 'Deseleccionar / Cerrar editor', context: 'Global' },
  { keys: 'Doble clic', action: 'Editar texto inline directamente', context: 'Sobre elemento de texto' },
  { keys: 'Clic simple', action: 'Seleccionar elemento para editar', context: 'Sobre cualquier elemento' },
];

const DATAFLOW_STEPS = [
  { step: 1, title: 'Apertura del Editor', desc: 'Usuario hace clic en "✨ Editor Visual HTML PRO" en el paso 4 del builder.', icon: <MousePointer size={16} /> },
  { step: 2, title: 'Carga del Iframe', desc: 'BuilderFlow pasa storeData + template al VisualEditorOverlay. Se carga /preview?ve=1 en iframe.', icon: <Monitor size={16} /> },
  { step: 3, title: 'Inyección de Estilos', desc: 'Se inyectan estilos CSS de edición y se marcan elementos editables con data-ve-editable. Productos se bloquean.', icon: <Code size={16} /> },
  { step: 4, title: 'Edición del Usuario', desc: 'Clic selecciona, doble clic edita texto inline. Paneles laterales para tipografía, estilos y componentes.', icon: <PenTool size={16} /> },
  { step: 5, title: 'Registro de Cambios', desc: 'Cada modificación se registra como VisualCustomization con ID, selector, tipo, valor y timestamp.', icon: <Layers size={16} /> },
  { step: 6, title: 'Guardado', desc: 'Ctrl+S o botón "Guardar" → onSave callback actualiza storeData.visualCustomizations en el estado.', icon: <Save size={16} /> },
  { step: 7, title: 'Persistencia en DB', desc: 'POST /api/builder-config guarda store_data completo (con visualCustomizations) en builder_configurations.', icon: <Database size={16} /> },
  { step: 8, title: 'Publicación', desc: 'Al publicar → POST /api/tiendas incluye visualCustomizations dentro de store_data en tiendas_publicadas.', icon: <Globe size={16} /> },
  { step: 9, title: 'Aplicación en Producción', desc: 'Tienda en /t/[slug] monta VisualCustomizationApplier que aplica todos los cambios al DOM tras 300ms.', icon: <CheckCircle size={16} /> },
];

// ═══════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function PixelForgeDocPage() {
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [activeDbTable, setActiveDbTable] = useState(0);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 32, height: 'calc(100vh - 120px)' }}>
      {/* ═══ SIDEBAR NAV ═══ */}
      <div className="ultra-glass" style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 6, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '0 12px', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #a855f7, #6366f1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(168,85,247,0.3)',
            }}>
              <Sparkles size={18} color="white" />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#fff', letterSpacing: '-0.01em' }}>PixelForge</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#a78bfa', letterSpacing: '0.08em' }}>STUDIO DOCS</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 500, lineHeight: 1.4 }}>
            Documentación técnica y operativa del editor visual HTML inline.
          </div>
        </div>

        <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 8 }} />

        {/* Nav Items */}
        <div style={{ flex: 1, overflowY: 'auto' }} className="custom-scrollbar">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, width: '100%',
                border: activeSection === item.id ? '1px solid rgba(168,85,247,0.3)' : '1px solid transparent',
                background: activeSection === item.id ? 'rgba(168,85,247,0.1)' : 'transparent',
                color: activeSection === item.id ? '#e9d5ff' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                fontSize: 13, fontWeight: activeSection === item.id ? 700 : 500, marginBottom: 2,
              }}
            >
              <span style={{ color: activeSection === item.id ? '#a78bfa' : 'inherit', flexShrink: 0 }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 6,
                  background: activeSection === item.id ? 'rgba(168,85,247,0.25)' : 'rgba(255,255,255,0.05)',
                  color: activeSection === item.id ? '#c4b5fd' : 'rgba(255,255,255,0.3)',
                }}>{item.badge}</span>
              )}
            </button>
          ))}
        </div>

        {/* Version */}
        <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 8 }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontWeight: 600 }}>PixelForge Studio v1.0</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)' }}>LandingCOD Platform</div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div style={{ overflowY: 'auto', paddingRight: 8 }} className="custom-scrollbar">

        {/* ── OVERVIEW ── */}
        {activeSection === 'overview' && (
          <div>
            {/* Hero */}
            <div className="ultra-glass" style={{ padding: '48px 44px', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 300, height: 300, background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 18,
                  background: 'linear-gradient(135deg, #a855f7, #6366f1, #3b82f6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 40px rgba(168,85,247,0.3), 0 0 80px rgba(99,102,241,0.15)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}>
                  <Sparkles size={30} color="white" />
                </div>
                <div>
                  <h1 style={{ fontSize: 32, fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>
                    <span className="shimmer-text">PixelForge Studio</span>
                  </h1>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: '4px 0 0', fontWeight: 500 }}>
                    Motor de Edición Visual HTML Inline · Editor WYSIWYG de Nivel Empresarial
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
                {[
                  { label: 'Tipo', value: 'Editor Visual', color: '#a855f7' },
                  { label: 'Ubicación', value: 'Paso 4 Builder', color: '#6366f1' },
                  { label: 'Flujo', value: 'Solo Store', color: '#3b82f6' },
                  { label: 'Versión', value: 'v1.0', color: '#22c55e' },
                ].map(s => (
                  <div key={s.label} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: '16px 18px', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', marginBottom: 4 }}>{s.label.toUpperCase()}</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: s.color }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* QUÉ ES */}
              <SectionBlock icon={<Info size={16} />} title="¿QUÉ ES?" color="#a855f7">
                PixelForge Studio es un editor visual profesional integrado directamente en el paso 4 (Configuración) del flujo de creación de tiendas. Permite al usuario editar visualmente cualquier elemento de su tienda — textos, colores, fondos, tipografías, secciones completas — directamente sobre la vista real de la tienda, sin necesidad de conocimientos técnicos. El editor se abre como un overlay fullscreen dentro de la misma interfaz del builder, cargando la tienda en un iframe interactivo donde cada elemento es clickeable y editable.
              </SectionBlock>

              {/* POR QUÉ */}
              <SectionBlock icon={<AlertTriangle size={16} />} title="¿POR QUÉ EXISTE?" color="#f59e0b">
                Antes de PixelForge Studio, el usuario solo podía configurar su tienda mediante campos de formulario (nombre, descripción, logo, banner). Esto limitaba enormemente la personalización. El usuario no podía cambiar colores de secciones específicas, modificar tipografías de títulos individuales, agregar banners promocionales, ocultar secciones innecesarias, ni editar textos directamente sobre la vista real. PixelForge Studio resuelve todo esto con una experiencia de edición WYSIWYG (What You See Is What You Get) de nivel profesional.
              </SectionBlock>

              {/* PARA QUÉ */}
              <SectionBlock icon={<Zap size={16} />} title="¿PARA QUÉ SIRVE?" color="#22c55e">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
                  {[
                    'Personalización total de la tienda sin código',
                    'Edición de textos con doble clic directo',
                    'Cambio de colores, fondos y gradientes',
                    'Tipografía avanzada con 20 fuentes profesionales',
                    'Inserción de 12 componentes prediseñados',
                    'Eliminación de secciones innecesarias',
                    'Persistencia automática en base de datos',
                    'Aplicación en tiempo real en tiendas publicadas',
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                      <CheckCircle size={14} style={{ color: '#22c55e', flexShrink: 0 }} /> {item}
                    </div>
                  ))}
                </div>
              </SectionBlock>
            </div>
          </div>
        )}

        {/* ── HOW TO USE ── */}
        {activeSection === 'howto' && (
          <div>
            <PageHeader title="Cómo se Usa" subtitle="Guía paso a paso para el usuario final" icon={<MousePointer size={24} />} />

            <div className="ultra-glass" style={{ padding: '36px 40px', marginBottom: 24 }}>
              <SectionBlock icon={<ArrowRight size={16} />} title="ACCESO AL EDITOR" color="#6366f1">
                <ol style={{ margin: '12px 0 0', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>El usuario llega al <strong style={{ color: '#a78bfa' }}>Paso 4</strong> del builder (flujo "store").</li>
                  <li style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>En el panel izquierdo de configuración, debajo de todas las opciones, aparece el botón <strong style={{ color: '#c084fc' }}>✨ Editor Visual HTML PRO</strong>.</li>
                  <li style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>Al hacer clic, se abre el editor fullscreen con la tienda cargada en un iframe interactivo.</li>
                </ol>
              </SectionBlock>

              <SectionBlock icon={<PenTool size={16} />} title="ACCIONES DENTRO DEL EDITOR" color="#a855f7">
                <div style={{ marginTop: 12 }}>
                  <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 6px' }}>
                    <thead>
                      <tr>
                        <th style={thStyle}>Acción</th>
                        <th style={thStyle}>Cómo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Seleccionar elemento', 'Clic simple sobre cualquier texto, imagen o sección'],
                        ['Editar texto inline', 'Doble clic sobre un texto → se activa edición directa'],
                        ['Cambiar tipografía', 'Seleccionar elemento → Panel "Texto" en la barra lateral'],
                        ['Cambiar colores/fondo', 'Seleccionar elemento → Panel "Estilo" en la barra lateral'],
                        ['Agregar componente', 'Clic en "+" → Elegir componente → Se inserta arriba o abajo'],
                        ['Eliminar elemento', 'Seleccionar → Clic en "Eliminar" o tecla Delete'],
                        ['Deshacer', 'Ctrl+Z'],
                        ['Rehacer', 'Ctrl+Y o Ctrl+Shift+Z'],
                        ['Guardar', 'Ctrl+S o botón "Guardar"'],
                        ['Cerrar editor', 'Esc o botón X'],
                      ].map(([action, how], i) => (
                        <tr key={i}>
                          <td style={{ ...tdStyle, fontWeight: 700, color: '#e4e4e7' }}>{action}</td>
                          <td style={tdStyle}>{how}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SectionBlock>

              <SectionBlock icon={<Lock size={16} />} title="ELEMENTOS NO EDITABLES" color="#ef4444">
                Los <strong style={{ color: '#fca5a5' }}>productos</strong> están bloqueados automáticamente. Se muestran con opacidad reducida y un candado "🔒 Productos (no editable)". Los productos se seleccionan en el paso 3 y no deben modificarse visualmente desde el editor.
              </SectionBlock>

              <SectionBlock icon={<Eye size={16} />} title="INDICADORES VISUALES" color="#06b6d4">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
                  {[
                    ['Borde punteado azul', 'Elemento editable (hover)'],
                    ['Borde sólido azul', 'Elemento seleccionado'],
                    ['Etiqueta superior', 'Tipo: H1, H2, P, IMAGEN, etc.'],
                    ['Borde punteado verde', 'Componente inyectado'],
                    ['Borde naranja', 'Texto en modo edición inline'],
                    ['Punto amarillo', 'Cambios sin guardar'],
                  ].map(([indicator, meaning], i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
                      <span style={{ color: '#22d3ee', fontWeight: 700, flexShrink: 0 }}>•</span>
                      <span><strong style={{ color: '#e4e4e7' }}>{indicator}</strong> — {meaning}</span>
                    </div>
                  ))}
                </div>
              </SectionBlock>
            </div>
          </div>
        )}

        {/* ── FEATURES ── */}
        {activeSection === 'features' && (
          <div>
            <PageHeader title="Capacidades" subtitle="Los 3 paneles de edición y sus herramientas" icon={<Zap size={24} />} />

            {/* Panel de Texto */}
            <div className="ultra-glass" style={{ padding: '36px 40px', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Type size={22} color="#f59e0b" />
                </div>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: '#fbbf24' }}>Panel de Texto ✏️</h2>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0 }}>Control total sobre la tipografía de cada elemento</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  ['Tipografía', '20 fuentes: Inter, Roboto, Montserrat, Poppins, Playfair Display, Oswald, Raleway, Nunito, Source Sans Pro, Merriweather, Ubuntu, Rubik, Work Sans, DM Sans, Space Grotesk, Outfit, Sora, Manrope, Lato'],
                  ['Tamaño', '8px a 120px con control numérico preciso'],
                  ['Peso', 'Light (300), Normal (400), Medium (500), Semibold (600), Bold (700), Extra Bold (800), Black (900)'],
                  ['Color', 'Paleta de 24 colores predefinidos + selector de color personalizado (color picker)'],
                  ['Alineación', 'Izquierda, Centro, Derecha, Justificado'],
                  ['Transformación', 'Normal (Aa), MAYÚSCULAS (AA), minúsculas (aa), Capitalizado (Ab)'],
                  ['Interlineado', '0.5x a 4x con paso de 0.1'],
                  ['Espaciado de letras', '-5px a 20px con paso de 0.5px'],
                ].map(([title, desc], i) => (
                  <FeatureCard key={i} title={title} desc={desc} />
                ))}
              </div>
            </div>

            {/* Panel de Estilo */}
            <div className="ultra-glass" style={{ padding: '36px 40px', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Palette size={22} color="#a855f7" />
                </div>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: '#c084fc' }}>Panel de Estilo 🎨</h2>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0 }}>Personalización visual de cualquier sección o elemento</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  ['Color de Fondo', 'Paleta de 24 colores + selector personalizado'],
                  ['Gradientes', '7 gradientes predefinidos: Violeta, Rosa, Azul, Verde, Sunset, Lavanda, Oscuro + opción sin gradiente'],
                  ['Bordes Redondeados', '0px a 50px con slider visual'],
                  ['Espaciado Interno', 'Padding de 0px a 80px con slider'],
                  ['Opacidad', '0% a 100% con slider visual'],
                  ['Sombras', '6 opciones: Sin sombra, Sutil, Media, Fuerte, Dramática, Glow Indigo'],
                ].map(([title, desc], i) => (
                  <FeatureCard key={i} title={title} desc={desc} />
                ))}
              </div>
            </div>

            {/* Panel de Componentes */}
            <div className="ultra-glass" style={{ padding: '36px 40px', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Plus size={22} color="#22c55e" />
                </div>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: '#4ade80' }}>Panel de Componentes ✨</h2>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0 }}>12 bloques prediseñados insertables con un clic</p>
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
                El usuario puede elegir insertar componentes en la parte <strong style={{ color: '#4ade80' }}>superior</strong> o <strong style={{ color: '#4ade80' }}>inferior</strong> de la tienda (antes del footer). Cada componente viene con HTML y estilos predeterminados listos para usar.
              </p>
              {/* Se renderiza en la sección "components" */}
            </div>
          </div>
        )}

        {/* ── COMPONENTS ── */}
        {activeSection === 'components' && (
          <div>
            <PageHeader title="Componentes Insertables" subtitle="12 bloques prediseñados listos para usar" icon={<Component size={24} />} />
            <div className="ultra-glass" style={{ padding: '36px 40px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {INSERTABLE_COMPONENTS.map((comp, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 14, padding: '18px 20px', borderRadius: 14,
                    background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.04)',
                    transition: 'all 0.2s',
                  }}>
                    <span style={{ fontSize: 28, flexShrink: 0, lineHeight: 1 }}>{comp.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#e4e4e7', marginBottom: 2 }}>{comp.name}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#a78bfa', letterSpacing: '0.04em', marginBottom: 6 }}>{comp.cat.toUpperCase()}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{comp.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ARCHITECTURE ── */}
        {activeSection === 'architecture' && (
          <div>
            <PageHeader title="Arquitectura" subtitle="Componentes principales y su rol en el sistema" icon={<GitBranch size={24} />} />
            <div className="ultra-glass" style={{ padding: '36px 40px' }}>
              <SectionBlock icon={<Box size={16} />} title="COMPONENTES PRINCIPALES" color="#6366f1">
                <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <ArchBlock
                    name="VisualEditorOverlay.tsx"
                    role="Editor Principal"
                    color="#a855f7"
                    desc="Overlay fullscreen con iframe interactivo. Contiene: barra de herramientas superior (cerrar, herramientas, undo/redo, guardar), panel lateral condicional (texto, estilo, componentes), iframe con la tienda cargada desde /preview?ve=1, barra de estado inferior, sistema de inyección de estilos CSS en el iframe, detección automática de elementos editables vs productos, listeners de click/dblclick, y sistema de customizaciones con undo/redo stack."
                  />
                  <ArchBlock
                    name="VisualCustomizationApplier.tsx"
                    role="Aplicador en Producción"
                    color="#22c55e"
                    desc="Componente invisible (retorna null) que se monta en tiendas publicadas. Después de 300ms (para asegurar que el template renderizó), aplica todas las customizaciones guardadas: modifica innerHTML para cambios de texto, aplica estilos inline para cambios de estilo, oculta elementos marcados como hidden, e inyecta componentes HTML al inicio del template."
                  />
                  <ArchBlock
                    name="visual-editor-types.ts"
                    role="Tipos & Constantes"
                    color="#3b82f6"
                    desc="Define todas las interfaces TypeScript: VisualCustomization (estructura de cada cambio), VisualEditorState (estado completo del editor), TextEditorOptions, StyleEditorOptions, ComponentBlock. Exporta constantes: EDITOR_FONTS (20 fuentes), EDITOR_COLORS (32 colores), COMPONENT_BLOCKS (12 bloques con HTML predeterminado)."
                  />
                </div>
              </SectionBlock>
            </div>
          </div>
        )}

        {/* ── FILES ── */}
        {activeSection === 'files' && (
          <div>
            <PageHeader title="Archivos & Código" subtitle="Todos los archivos involucrados en el sistema" icon={<FileCode size={24} />} />
            <div className="ultra-glass" style={{ padding: '36px 40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {ARCHITECTURE_FILES.map((file, i) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '1fr 140px 2fr 80px', gap: 16, alignItems: 'center',
                    padding: '16px 20px', borderRadius: 12, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.03)',
                  }}>
                    <div style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: '#e4e4e7', wordBreak: 'break-all' }}>{file.path}</div>
                    <span style={{
                      fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 6, textAlign: 'center',
                      background: file.type === 'component' ? 'rgba(168,85,247,0.15)' : file.type === 'api' ? 'rgba(245,158,11,0.15)' : file.type === 'types' ? 'rgba(59,130,246,0.15)' : 'rgba(34,197,94,0.15)',
                      color: file.type === 'component' ? '#c084fc' : file.type === 'api' ? '#fbbf24' : file.type === 'types' ? '#60a5fa' : '#4ade80',
                    }}>{file.role}</span>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{file.desc}</span>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', textAlign: 'right', fontFamily: 'monospace' }}>{file.lines}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── DATABASE ── */}
        {activeSection === 'database' && (
          <div>
            <PageHeader title="Base de Datos" subtitle="Tablas y columnas involucradas en el almacenamiento" icon={<Database size={24} />} />

            {/* Table selector */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              {DB_TABLES.map((t, i) => (
                <button key={i} onClick={() => setActiveDbTable(i)} style={{
                  padding: '10px 20px', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  background: activeDbTable === i ? 'rgba(168,85,247,0.15)' : 'rgba(255,255,255,0.03)',
                  border: activeDbTable === i ? '1px solid rgba(168,85,247,0.3)' : '1px solid rgba(255,255,255,0.06)',
                  color: activeDbTable === i ? '#c084fc' : 'rgba(255,255,255,0.4)',
                  transition: 'all 0.2s',
                }}>
                  <Table size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                  {t.name}
                </button>
              ))}
            </div>

            <div className="ultra-glass" style={{ padding: '36px 40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div style={{ width: 50, height: 50, borderRadius: 12, background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Database size={24} color="#a855f7" />
                </div>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>
                    TABLA: <span className="shimmer-text">{DB_TABLES[activeDbTable].name}</span>
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4, fontWeight: 600 }}>
                    <Shield size={12} /> SUPABASE · JSONB · RLS ACTIVO
                  </div>
                </div>
              </div>

              <SectionBlock icon={<Info size={16} />} title="PROPÓSITO" color="#06b6d4">
                {DB_TABLES[activeDbTable].purpose}
              </SectionBlock>

              <h3 style={{ fontSize: 13, fontWeight: 900, marginBottom: 16, marginTop: 28, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.5)' }}>DEFINICIÓN DE CAMPOS</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {DB_TABLES[activeDbTable].fields.map(field => (
                  <div key={field.name} style={{
                    display: 'grid', gridTemplateColumns: '180px 120px 1fr', gap: 16, alignItems: 'center',
                    padding: '14px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)',
                  }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: '#fff' }}>{field.name}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 800, color: '#c084fc', background: 'rgba(168,85,247,0.1)',
                      padding: '3px 8px', borderRadius: 6, width: 'fit-content', textAlign: 'center',
                    }}>{field.type}</span>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{field.desc}</span>
                  </div>
                ))}
              </div>

              {/* JSON Structure */}
              <h3 style={{ fontSize: 13, fontWeight: 900, marginBottom: 16, marginTop: 28, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.5)' }}>ESTRUCTURA JSON DE visualCustomizations</h3>
              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: '20px 24px', border: '1px solid rgba(255,255,255,0.04)', fontFamily: 'monospace', fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, whiteSpace: 'pre-wrap', overflowX: 'auto' }}>
{`{
  "visualCustomizations": {
    "customizations": [
      {
        "id": "ve-h1-abc123",
        "selector": "[data-ve-editable=\\"ve-h1-abc123\\"]",
        "type": "text",
        "newValue": "Mi Título Personalizado",
        "timestamp": 1710950400000
      },
      {
        "id": "ve-h1-abc123-color",
        "selector": "[data-ve-editable=\\"ve-h1-abc123\\"]",
        "type": "style",
        "property": "color",
        "newValue": "#6366f1",
        "timestamp": 1710950401000
      }
    ],
    "injectedComponents": [
      "<div class=\\"ve-injected-component\\">...</div>"
    ],
    "lastEditedAt": "2026-03-20T15:00:00.000Z"
  }
}`}
              </div>
            </div>
          </div>
        )}

        {/* ── API ENDPOINTS ── */}
        {activeSection === 'api' && (
          <div>
            <PageHeader title="API Endpoints" subtitle="Rutas del servidor que soportan el editor visual" icon={<Server size={24} />} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {API_ENDPOINTS.map((ep, i) => (
                <div key={i} className="ultra-glass" style={{ padding: '32px 36px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 900, padding: '5px 12px', borderRadius: 6, letterSpacing: '0.06em',
                      background: `${ep.color}20`, color: ep.color, border: `1px solid ${ep.color}40`,
                    }}>{ep.method}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 700, color: '#e4e4e7' }}>{ep.path}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', marginBottom: 6 }}>PROPÓSITO</div>
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{ep.purpose}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', marginBottom: 6 }}>TRIGGER</div>
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{ep.trigger}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', marginBottom: 6 }}>REQUEST BODY</div>
                      <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.5)', background: 'rgba(0,0,0,0.2)', padding: '10px 14px', borderRadius: 8, lineHeight: 1.6 }}>{ep.body}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', marginBottom: 6 }}>RESPONSE</div>
                      <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.5)', background: 'rgba(0,0,0,0.2)', padding: '10px 14px', borderRadius: 8, lineHeight: 1.6 }}>{ep.response}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── DATAFLOW ── */}
        {activeSection === 'dataflow' && (
          <div>
            <PageHeader title="Flujo de Datos" subtitle="Recorrido completo desde la edición hasta la producción" icon={<Workflow size={24} />} />
            <div className="ultra-glass" style={{ padding: '36px 40px' }}>
              <div style={{ position: 'relative' }}>
                {DATAFLOW_STEPS.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 20, marginBottom: i < DATAFLOW_STEPS.length - 1 ? 0 : 0, position: 'relative' }}>
                    {/* Timeline line */}
                    {i < DATAFLOW_STEPS.length - 1 && (
                      <div style={{ position: 'absolute', left: 19, top: 44, width: 2, height: 'calc(100% - 20px)', background: 'rgba(168,85,247,0.15)' }} />
                    )}
                    {/* Step circle */}
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                      background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(99,102,241,0.2))',
                      border: '2px solid rgba(168,85,247,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#c084fc', fontSize: 14, fontWeight: 800, zIndex: 1,
                    }}>
                      {s.step}
                    </div>
                    {/* Content */}
                    <div style={{ flex: 1, paddingBottom: 28 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ color: '#a78bfa' }}>{s.icon}</span>
                        <span style={{ fontSize: 15, fontWeight: 700, color: '#e4e4e7' }}>{s.title}</span>
                      </div>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── SHORTCUTS ── */}
        {activeSection === 'shortcuts' && (
          <div>
            <PageHeader title="Atajos de Teclado" subtitle="Accesos rápidos para edición eficiente" icon={<Keyboard size={24} />} />
            <div className="ultra-glass" style={{ padding: '36px 40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {SHORTCUTS.map((s, i) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '160px 1fr 180px', gap: 16, alignItems: 'center',
                    padding: '14px 20px', borderRadius: 10, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.03)',
                  }}>
                    <div style={{
                      fontFamily: 'monospace', fontSize: 13, fontWeight: 800, color: '#e4e4e7',
                      background: 'rgba(168,85,247,0.1)', padding: '6px 12px', borderRadius: 8,
                      border: '1px solid rgba(168,85,247,0.2)', textAlign: 'center',
                    }}>{s.keys}</div>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{s.action}</span>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', textAlign: 'right' }}>{s.context}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── SECURITY ── */}
        {activeSection === 'security' && (
          <div>
            <PageHeader title="Seguridad" subtitle="Medidas de protección y autenticación" icon={<Shield size={24} />} />
            <div className="ultra-glass" style={{ padding: '36px 40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: <Lock size={18} />, title: 'Autenticación en APIs', desc: 'Todas las APIs (POST /api/builder-config, POST /api/tiendas, PATCH /api/tiendas) verifican autenticación via access_token cookie con JWT. Sin token válido, retornan 401.', color: '#ef4444' },
                  { icon: <Shield size={18} />, title: 'Verificación de Ownership', desc: 'El endpoint PATCH /api/tiendas verifica que el user_id del token coincida con el user_id de la tienda antes de permitir actualizaciones. Un usuario no puede editar tiendas de otro.', color: '#f59e0b' },
                  { icon: <Database size={18} />, title: 'Almacenamiento Seguro', desc: 'Las customizaciones se almacenan como JSON dentro del campo JSONB store_data, no como HTML ejecutable en el servidor. Supabase RLS (Row Level Security) está activo.', color: '#22c55e' },
                  { icon: <Monitor size={18} />, title: 'Ejecución Client-Side', desc: 'El VisualCustomizationApplier opera exclusivamente en el cliente (DOM manipulation). No hay server-side rendering de HTML inyectado por el usuario, eliminando riesgos de XSS en el servidor.', color: '#3b82f6' },
                  { icon: <Globe size={18} />, title: 'Same-Origin Iframe', desc: 'El iframe del editor carga /preview del mismo dominio, evitando problemas de CORS. La comunicación entre el editor y el iframe es directa via contentDocument.', color: '#a855f7' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 16, padding: '20px 24px', borderRadius: 14,
                    background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.04)',
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                      background: `${item.color}15`, border: `1px solid ${item.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color,
                    }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#e4e4e7', marginBottom: 4 }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Limitations */}
              <h3 style={{ fontSize: 13, fontWeight: 900, marginTop: 32, marginBottom: 16, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.5)' }}>LIMITACIONES CONOCIDAS</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Los data-ve-editable IDs se generan aleatoriamente en cada carga del iframe. Si el template cambia su estructura DOM, algunas customizaciones podrían no aplicarse.',
                  'El editor visual está habilitado solo para el flujo de tienda (flowType === "store"), no para PDP.',
                  'Los componentes inyectados son HTML estático. No tienen interactividad React (no manejan estado ni event handlers funcionales).',
                  'Si el preview page cambia de dominio en el futuro, el editor dejará de funcionar por restricciones de cross-origin.',
                ].map((lim, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                    <AlertTriangle size={14} style={{ color: '#f59e0b', flexShrink: 0, marginTop: 3 }} />
                    {lim}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════
// Reusable Sub-Components
// ═══════════════════════════════════════════════════════════════

function PageHeader({ title, subtitle, icon }: { title: string; subtitle: string; icon: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
      <div style={{
        width: 50, height: 50, borderRadius: 14,
        background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(99,102,241,0.15))',
        border: '1px solid rgba(168,85,247,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa',
      }}>{icon}</div>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 900, margin: 0, color: '#fff' }}>{title}</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: '2px 0 0', fontWeight: 500 }}>{subtitle}</p>
      </div>
    </div>
  );
}

function SectionBlock({ icon, title, color, children }: { icon: React.ReactNode; title: string; color: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: 16,
      border: '1px solid rgba(255,255,255,0.05)', marginBottom: 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ color }}>{icon}</span>
        <span style={{ fontSize: 11, fontWeight: 800, color, letterSpacing: '0.06em' }}>{title}</span>
      </div>
      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{
      padding: '14px 18px', borderRadius: 12, background: 'rgba(0,0,0,0.2)',
      border: '1px solid rgba(255,255,255,0.04)',
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#e4e4e7', marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{desc}</div>
    </div>
  );
}

function ArchBlock({ name, role, color, desc }: { name: string; role: string; color: string; desc: string }) {
  return (
    <div style={{
      padding: '18px 22px', borderRadius: 14, background: 'rgba(0,0,0,0.2)',
      border: '1px solid rgba(255,255,255,0.04)', borderLeft: `3px solid ${color}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: '#e4e4e7' }}>{name}</span>
        <span style={{
          fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 6,
          background: `${color}15`, color, border: `1px solid ${color}30`,
        }}>{role}</span>
      </div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{desc}</div>
    </div>
  );
}

// ── Shared table styles ──
const thStyle: React.CSSProperties = {
  fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em',
  textAlign: 'left', padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)',
};

const tdStyle: React.CSSProperties = {
  fontSize: 13, color: 'rgba(255,255,255,0.55)', padding: '10px 14px',
  background: 'rgba(0,0,0,0.15)', borderRadius: 8,
};
