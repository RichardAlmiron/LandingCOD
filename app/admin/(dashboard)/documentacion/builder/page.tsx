'use client';
import React, { useState, useRef } from 'react';
import { BookOpen, Code, Copy, Check, Database, Layers, ArrowRight, Shield, Zap, Globe, Terminal, Store, LayoutTemplate, CheckCircle } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// TABS
// ─────────────────────────────────────────────────────────────
type Tab = 'logica' | 'codigo' | 'prompt';

const TAB_CONFIG: { id: Tab; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'logica', label: 'Lógica General', icon: <BookOpen size={15} />, color: '#6366f1' },
    { id: 'codigo', label: 'Código y Tablas', icon: <Code size={15} />, color: '#10b981' },
    { id: 'prompt', label: 'Prompt Copiable', icon: <Terminal size={15} />, color: '#f59e0b' },
];

// ─────────────────────────────────────────────────────────────
// PROMPT COMPLETO (para copiar)
// ─────────────────────────────────────────────────────────────
const FULL_PROMPT = `# DOCUMENTACIÓN COMPLETA: SaaS Builder + Landing Code Studio
# ═══════════════════════════════════════════════════════════
# Plataforma de creación y distribución de tiendas online y páginas de producto (PDP).
# Arquitectura: Next.js 15 (App Router) + Supabase (PostgreSQL) + Tailwind CSS.

## GLOSARIO DE NOMBRES
- **SaaS Builder**: Panel ADMINISTRATIVO donde se crean, visualizan, verifican y gestionan las plantillas de tiendas y PDPs. Ruta: /admin/builder
- **Landing Code Studio**: Panel del CLIENTE donde aparecen únicamente las plantillas que el admin ya verificó. Ruta: /builder

## ARQUITECTURA GENERAL
El sistema funciona como una fábrica de plantillas:
1. El ADMIN carga/crea plantillas en el SaaS Builder.
2. El ADMIN verifica (aprueba) las plantillas que están listas.
3. Las plantillas verificadas aparecen automáticamente en el Landing Code Studio del cliente.
4. El CLIENTE selecciona una plantilla, elige productos del catálogo AlmiDrop, y publica su tienda/PDP.

## TABLAS DE BASE DE DATOS (Supabase / PostgreSQL)

### Tabla: Tiendas_Reutilizables
Almacena las PLANTILLAS de tienda creadas por el admin.
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador único de la plantilla |
| name | TEXT | Nombre descriptivo de la plantilla |
| description | TEXT | Descripción de la plantilla |
| image_url | TEXT | URL de la imagen de preview |
| premium | BOOLEAN | Si es plantilla premium |
| verified | BOOLEAN (default false) | Si está verificada por el admin. Solo las verified=true aparecen para el cliente |
| deleted_at | TIMESTAMPTZ | Soft delete (null = activa, fecha = en papelera) |
| created_at | TIMESTAMPTZ | Fecha de creación |

### Tabla: Paginas_de_Productos_Reutilizables
Almacena las PLANTILLAS de PDP (página de producto) creadas por el admin.
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador único de la plantilla PDP |
| name | TEXT | Nombre descriptivo |
| description | TEXT | Descripción |
| template_name | TEXT | CLAVE: Nombre del componente .tsx que renderiza el diseño visual (ej: "PdpPremiumElectronics") |
| image_url | TEXT | URL de la imagen de preview |
| premium | BOOLEAN | Si es plantilla premium |
| verified | BOOLEAN (default false) | Si está verificada. Solo verified=true aparecen para el cliente |
| niche | TEXT | Nicho de la plantilla (ej: "Electrónica", "Salud", "Belleza") |
| sub_niche | TEXT | Sub-nicho específico (ej: "Smartphones", "Suplementos") |
| deleted_at | TIMESTAMPTZ | Soft delete |
| created_at | TIMESTAMPTZ | Fecha de creación |

### Tabla: tiendas_publicadas
Almacena las tiendas YA PUBLICADAS por los clientes (instancias reales, no plantillas).
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | ID único de la tienda publicada |
| identificador_url | TEXT | Slug para la URL pública (/t/slug) |
| name | TEXT | Nombre de la tienda |
| template | TEXT | ID de la plantilla base usada |
| status | TEXT | 'published' o 'draft' |
| user_id | UUID | ID del usuario dueño |
| created_at | TIMESTAMPTZ | Fecha de creación |
| updated_at | TIMESTAMPTZ | Última actualización |

### Tabla: pdp_publicadas
Almacena las PDPs YA PUBLICADAS por los clientes.
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | ID único del PDP publicado |
| identificador_url | TEXT | Slug para la URL pública (/p/slug) |
| name | TEXT | Nombre del PDP |
| pdp_template | TEXT | ID de la plantilla PDP base usada |
| status | TEXT | 'published' o 'draft' |
| user_id | UUID | ID del usuario dueño |
| created_at | TIMESTAMPTZ | Fecha de creación |
| updated_at | TIMESTAMPTZ | Última actualización |

## API ENDPOINTS

### GET /api/templates/stores
- Sin parámetros: Devuelve SOLO plantillas con verified=true (para el cliente).
- Con ?includeUnverified=true: Devuelve TODAS las plantillas (para el admin).
- Tabla consultada: Tiendas_Reutilizables
- Filtro adicional: excluye deleted_at != null (soft deleted).

### GET /api/templates/pdp
- Sin parámetros: Devuelve SOLO PDPs con verified=true (para el cliente).
- Con ?includeUnverified=true: Devuelve TODAS las PDPs (para el admin).
- Tabla consultada: Paginas_de_Productos_Reutilizables

### POST /api/templates/stores (action: 'verify')
- Requiere: role === 'admin' (validado por JWT).
- Body: { id, action: 'verify', verified: true/false }
- Actualiza: UPDATE Tiendas_Reutilizables SET verified = ? WHERE id = ?
- Resultado: La plantilla aparece/desaparece del Landing Code Studio del cliente.

### POST /api/templates/pdp (action: 'verify')
- Requiere: role === 'admin'.
- Body: { id, action: 'verify', verified: true/false }
- Actualiza: UPDATE Paginas_de_Productos_Reutilizables SET verified = ? WHERE id = ?

### POST /api/templates/pdp (action: 'update_niche')
- Requiere: role === 'admin'.
- Body: { id, action: 'update_niche', niche: 'Electrónica', sub_niche: 'Smartphones' }
- Actualiza: UPDATE Paginas_de_Productos_Reutilizables SET niche = ?, sub_niche = ? WHERE id = ?

### POST /api/templates/stores (action: 'delete_permanent')
- Elimina permanentemente de Tiendas_Reutilizables.

### POST /api/templates/pdp (action: 'delete_permanent')
- Elimina permanentemente de Paginas_de_Productos_Reutilizables.

### DELETE /api/templates/stores?id=UUID
- Soft delete: SET deleted_at = NOW() (va a la papelera).

### DELETE /api/templates/pdp?id=UUID
- Soft delete: SET deleted_at = NOW().

### POST /api/templates/stores (action: 'restore')
- Restaura de papelera: SET deleted_at = null.

### GET /api/tiendas?all=true
- Devuelve todas las tiendas y PDPs PUBLICADAS (para admin en /admin/publicadas).
- Tablas: tiendas_publicadas + pdp_publicadas.

## COMPONENTES PRINCIPALES

### BuilderFlow.tsx (components/saas/BuilderFlow.tsx)
Componente central del builder. Recibe prop \`isAdmin\` que controla todo el comportamiento:
- isAdmin=true → Carga TODAS las plantillas (incluye no verificadas), muestra botones de verificar/eliminar.
- isAdmin=undefined/false → Carga SOLO verificadas, sin controles admin.

Estados principales:
- step (1-4): Etapa actual del builder.
- flowType ('store' | 'pdp'): Tipo de proyecto seleccionado.
- storeTemplates[]: Plantillas de tienda cargadas.
- pdpTemplates[]: Plantillas PDP cargadas.
- storeData: Datos de la tienda en construcción (productos, config, etc).

Etapas:
1. Etapa 1: Selección de tipo (Tienda Completa o Landing de Producto).
2. Etapa 2: Selección de plantilla (FilmStrip/CoverFlow para visualizar).
3. Etapa 3: Catálogo de productos (importa desde AlmiDrop).
4. Etapa 4: Editor visual + Publicación.

### Componentes de visualización de plantillas:
- FilmStrip.tsx: Vista horizontal tipo cinta de película para PDPs.
- CoverFlow.tsx: Vista 3D tipo Apple CoverFlow para PDPs.
- StoreFilmStrip.tsx: Vista horizontal para tiendas.
- StoreCoverFlow.tsx: Vista 3D para tiendas.

Cada uno muestra:
- Número parpadeante verde (esquina superior izquierda).
- Botón "Previsualizar" (abre en nueva pestaña).
- ID con botón copiar (copia "Nombre [UUID]").
- Toggle VERIFICADO/NO VERIFICADO (solo en modo admin).
- Checkbox de selección múltiple (solo admin).
- Botón eliminar (solo admin).

### LivePDPPreview.tsx / LiveStorePreview.tsx
Renderizan previews en vivo de las plantillas dentro de iframes escalados.

### StudioLaunchSequence.tsx
Animación cinematográfica de 14 segundos que se muestra al entrar a la Etapa 4.
9 fases de texto + barra de progreso + apertura de telón.

### StepCinematicTransition.tsx
Transición cinematográfica entre etapas (2 segundos mínimo).

### VisualEditorOverlay.tsx
Editor visual completo de la Etapa 4 donde se configura y publica.

## FLUJO DE VERIFICACIÓN (paso a paso)

1. Admin entra a /admin/builder → Carga BuilderFlow con isAdmin={true}.
2. BuilderFlow hace fetch a /api/templates/stores?includeUnverified=true.
3. La API consulta: SELECT * FROM Tiendas_Reutilizables WHERE deleted_at IS NULL.
4. Admin ve TODAS las plantillas en Etapa 2.
5. Cada card tiene botón rojo "NO VERIFICADO" o verde "VERIFICADO".
6. Admin hace clic → handleVerifyToggle() → POST /api/templates/stores { action: 'verify', verified: true }.
7. API valida role=admin → UPDATE Tiendas_Reutilizables SET verified=true WHERE id=?.
8. Estado local se actualiza inmediatamente.
9. Cliente entra a /builder → Carga BuilderFlow SIN isAdmin.
10. BuilderFlow hace fetch a /api/templates/stores (sin includeUnverified).
11. API consulta: SELECT * FROM Tiendas_Reutilizables WHERE deleted_at IS NULL AND verified=true.
12. Cliente solo ve plantillas verificadas.

## FLUJO DE PUBLICACIÓN

1. Cliente selecciona plantilla verificada en Etapa 2.
2. Selecciona productos del catálogo AlmiDrop en Etapa 3.
3. Configura en el Editor Visual (Etapa 4).
4. Publica → Se crea registro en tiendas_publicadas o pdp_publicadas.
5. La tienda/PDP queda accesible en /t/slug o /p/slug.

## RUTAS DEL PROYECTO

### Admin:
- /admin/builder → SaaS Builder (isAdmin=true)
- /admin/publicadas → Gestión de tiendas/PDPs publicadas
- /admin/documentacion → Documentación de tablas
- /admin/documentacion/builder → Esta documentación

### Cliente:
- /builder → Landing Code Studio (isAdmin=false/undefined)
- /dashboard → Centro de control del cliente

### Públicas:
- /t/[slug] → Tienda publicada (acceso público)
- /p/[slug] → PDP publicado (acceso público)

## SEGURIDAD
- Todas las acciones de verificación/eliminación requieren JWT con role='admin'.
- Las APIs validan el token de acceso desde cookies httpOnly.
- El cliente nunca puede acceder a plantillas no verificadas (filtrado en servidor).
- Soft delete protege contra eliminación accidental (papelera con restauración).

## ARQUITECTURA: BASE DE DATOS vs CÓDIGO (¿Qué se guarda dónde?)

### CONCEPTO CLAVE
El sistema separa DATOS y DISEÑO en dos lugares diferentes:
- **BASE DE DATOS (Supabase)**: Guarda los DATOS de cada plantilla (nombre, precio, imagen, estado de verificación, etc.)
- **CÓDIGO (.tsx files)**: Guarda el DISEÑO VISUAL de cada plantilla (secciones CRO, layout, colores, formularios, SVG icons, etc.)

### ¿Qué guarda la tabla Paginas_de_Productos_Reutilizables?
Esta tabla guarda la METADATA de cada plantilla PDP:
| Campo | Qué guarda |
|-------|------------|
| id | UUID único de la plantilla |
| name | Nombre descriptivo (ej: "PDP Premium Electronics") |
| description | Descripción de la plantilla |
| template_name | CLAVE: El nombre del componente .tsx que renderiza el diseño (ej: "PdpPremiumElectronics") |
| image_url | URL de la imagen de preview/thumbnail |
| premium | Si es plantilla premium (true/false) |
| verified | Si está verificada por el admin (true/false) |
| niche | Nicho de la plantilla (ej: "Electrónica", "Salud") |
| sub_niche | Sub-nicho (ej: "Smartphones", "Suplementos") |
| deleted_at | Soft delete (null = activa) |
| created_at | Fecha de creación |

### ¿Qué guardan los archivos .tsx de plantillas PDP?
Los archivos en components/templates/pdp/ guardan el DISEÑO VISUAL completo:
- Las secciones CRO de venta (hero, features, reviews, FAQ, etc.)
- El layout y estructura HTML/JSX
- Los estilos Tailwind CSS
- Los iconos SVG inline
- Los formularios COD (contra entrega)
- Los contadores, temporizadores, barras de confianza
- La lógica de interacción (acordeones, tabs, animaciones)

### Los 14 archivos de plantillas PDP:
1. PdpPremiumElectronics.tsx — Premium, electrónica (11 secciones CRO)
2. PdpPremiumHealth.tsx — Premium, salud/bienestar (11 secciones CRO)
3. PdpPremiumUrgency.tsx — Premium, urgencia/escasez (11 secciones CRO)
4. PdpPremiumBundle.tsx — Premium, bundles/paquetes (12 secciones CRO)
5. PdpAggressiveUrgency.tsx — Urgencia agresiva con countdown
6. PdpBeauty.tsx — Belleza y cosméticos
7. PdpBundleMaximizer.tsx — Maximizador de bundles
8. PdpDirectCheckout.tsx — Checkout directo rápido
9. PdpElectronics.tsx — Electrónica estándar
10. PdpHealth.tsx — Salud estándar
11. PdpHome.tsx — Hogar y decoración
12. PdpSocialTrust.tsx — Prueba social fuerte
13. PdpStorytelling.tsx — Narrativa/historia del producto
14. PdpTools.tsx — Herramientas y utilidades
+ SharedCRO.tsx — Componentes CRO compartidos (BeforeAfter, DeepDiveFeature, etc.)

### ¿Cómo se conectan la DB y el código?
1. La tabla tiene un campo template_name (ej: "PdpPremiumElectronics")
2. Cuando se renderiza un PDP, el sistema busca el componente .tsx que coincide con ese template_name
3. El componente .tsx recibe los DATOS de la tabla (producto, precio, imagen) como props
4. El componente .tsx usa esos datos para llenar su DISEÑO VISUAL

### ¿Qué pasa cuando actualizás un archivo .tsx?
- Si actualizás PdpPremiumElectronics.tsx (le agregás secciones, cambiás colores, etc.)
- TODOS los PDPs que usan template_name="PdpPremiumElectronics" se actualizan automáticamente
- No necesitás tocar la base de datos
- Es como cambiar el molde: todas las piezas que salen del molde cambian

### ¿Qué pasa cuando actualizás la base de datos?
- Si cambiás el nombre, precio o imagen de un PDP en la tabla
- Solo cambian los DATOS, no el diseño
- El diseño visual sigue siendo el mismo (el .tsx no cambió)
- Es como cambiar la etiqueta de un producto sin cambiar el empaque

## MIGRACIÓN DE BASE DE DATOS
Archivo: supabase/migrations/20250315_add_verified_column.sql
- Agrega columna verified BOOLEAN DEFAULT false a ambas tablas.
- Crea índices para consultas rápidas por estado de verificación.
- Todas las plantillas existentes quedan como no verificadas por defecto.

Archivo: supabase/migrations/20250321_add_niche_columns.sql
- Agrega columnas niche TEXT y sub_niche TEXT a Paginas_de_Productos_Reutilizables.
- Permite clasificar cada plantilla PDP por nicho y sub-nicho.
`;

export default function BuilderDocumentationPage() {
    const [activeTab, setActiveTab] = useState<Tab>('logica');
    const [copied, setCopied] = useState(false);
    const promptRef = useRef<HTMLPreElement>(null);

    const handleCopyPrompt = async () => {
        try {
            await navigator.clipboard.writeText(FULL_PROMPT);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } catch {
            // Fallback
            const ta = document.createElement('textarea');
            ta.value = FULL_PROMPT;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, height: 'calc(100vh - 120px)' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h1 className="shimmer-text" style={{ fontSize: 28, fontWeight: 900, marginBottom: 6 }}>
                        DOCUMENTACIÓN — SaaS Builder
                    </h1>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                        Arquitectura completa del sistema de creación y distribución de plantillas
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>SaaS Builder → Landing Code Studio</span>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 8 }}>
                {TAB_CONFIG.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '10px 20px', borderRadius: 12, fontSize: 13, fontWeight: 700,
                            background: activeTab === t.id ? `${t.color}20` : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${activeTab === t.id ? `${t.color}50` : 'rgba(255,255,255,0.06)'}`,
                            color: activeTab === t.id ? t.color : 'rgba(255,255,255,0.4)',
                            cursor: 'pointer', transition: 'all 0.2s',
                        }}
                    >
                        {t.icon}
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: 8 }}>
                {activeTab === 'logica' && <LogicaTab />}
                {activeTab === 'codigo' && <CodigoTab />}
                {activeTab === 'prompt' && <PromptTab promptText={FULL_PROMPT} copied={copied} onCopy={handleCopyPrompt} promptRef={promptRef} />}
            </div>
        </div>
    );
}


// ─────────────────────────────────────────────────────────────
// TAB 1: LÓGICA GENERAL
// ─────────────────────────────────────────────────────────────
function LogicaTab() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Analogía principal */}
            <div className="ultra-glass" style={{ padding: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Layers size={22} color="#6366f1" />
                    </div>
                    <div>
                        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0 }}>¿Cómo funciona todo esto?</h2>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0 }}>Explicación con analogías simples</p>
                    </div>
                </div>

                <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8 }}>
                    <p style={{ marginBottom: 16 }}>
                        Imaginá que tenés una <strong style={{ color: '#a78bfa' }}>fábrica de ropa</strong> (el SaaS Builder) y una <strong style={{ color: '#6ee7b7' }}>tienda en el centro comercial</strong> (Landing Code Studio, el dashboard del cliente).
                    </p>
                    <p style={{ marginBottom: 16 }}>
                        En la fábrica, vos diseñás y cosés toda la ropa. Tenés camisas terminadas, camisas a medio hacer, y camisas que todavía están en prueba. <strong style={{ color: '#fbbf24' }}>No toda la ropa que está en la fábrica va directo a la tienda.</strong> Solo la ropa que vos revisás, aprobás y le ponés la etiqueta verde de "VERIFICADO" es la que se manda a la tienda para que los clientes la vean y la compren.
                    </p>
                    <p style={{ marginBottom: 16 }}>
                        Eso es exactamente lo que pasa acá:
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                        <FlowStep number={1} color="#6366f1" title="Vos cargás plantillas en el SaaS Builder" desc="Creás tiendas y páginas de producto. Pueden ser 10, 50, 100... todas quedan guardadas en la base de datos con verified=false (etiqueta roja, NO VERIFICADO)." />
                        <FlowStep number={2} color="#f59e0b" title="Revisás y verificás" desc="Entrás a la Etapa 2 del Builder, ves cada plantilla en preview. Si te gusta cómo se ve, le das clic al botón rojo 'NO VERIFICADO' y se pone verde 'VERIFICADO'. Eso cambia el campo verified de false a true en la base de datos." />
                        <FlowStep number={3} color="#10b981" title="Aparece automáticamente en el cliente" desc="El Landing Code Studio del cliente hace una consulta a la misma base de datos, pero SOLO pide las que tienen verified=true. Entonces, en el momento que vos verificás una plantilla, el cliente ya la puede ver y usar." />
                        <FlowStep number={4} color="#06b6d4" title="El cliente construye y publica" desc="El cliente elige la plantilla verificada, selecciona productos del catálogo AlmiDrop, configura su tienda en el editor visual, y la publica. Eso crea un registro en tiendas_publicadas o pdp_publicadas con su URL pública." />
                    </div>

                    <p style={{ marginBottom: 16 }}>
                        <strong style={{ color: '#f87171' }}>¿Y si desverificás una plantilla?</strong> Si le quitás la verificación (la volvés a poner en rojo), esa plantilla desaparece del Landing Code Studio del cliente inmediatamente. Es como sacar la ropa de la tienda y devolverla a la fábrica.
                    </p>
                </div>
            </div>

            {/* Dos columnas: SaaS Builder vs Landing Code Studio */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div className="ultra-glass" style={{ padding: 28 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Store size={18} color="#6366f1" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#a78bfa', margin: 0 }}>SaaS Builder</h3>
                            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: 0 }}>Panel Administrativo · /admin/builder</p>
                        </div>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            'Ve TODAS las plantillas (verificadas y no verificadas)',
                            'Puede verificar/desverificar con un clic',
                            'Puede eliminar plantillas (soft delete → papelera)',
                            'Puede restaurar plantillas de la papelera',
                            'Puede eliminar permanentemente',
                            'Tiene filtros: Verificado / No Verificado',
                            'Tiene selección múltiple para eliminar en lote',
                            'Tiene búsqueda por nombre e ID',
                            'Tiene favoritos persistentes en base de datos',
                            'Tiene modos de visualización: FilmStrip y CoverFlow',
                        ].map((item, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                                <CheckCircle size={14} style={{ color: '#6366f1', flexShrink: 0, marginTop: 2 }} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="ultra-glass" style={{ padding: 28 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Globe size={18} color="#10b981" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#6ee7b7', margin: 0 }}>Landing Code Studio</h3>
                            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: 0 }}>Dashboard del Cliente · /builder</p>
                        </div>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            'Ve SOLO plantillas verificadas (verified=true)',
                            'NO puede verificar ni desverificar',
                            'NO puede eliminar plantillas del catálogo',
                            'Puede seleccionar una plantilla para su proyecto',
                            'Puede elegir productos del catálogo AlmiDrop',
                            'Puede configurar en el Editor Visual',
                            'Puede publicar su tienda/PDP con URL pública',
                            'Tiene modos de visualización: FilmStrip y CoverFlow',
                            'Tiene favoritos persistentes',
                            'Su tienda publicada queda en /t/slug o /p/slug',
                        ].map((item, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                                <CheckCircle size={14} style={{ color: '#10b981', flexShrink: 0, marginTop: 2 }} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Las 4 Etapas */}
            <div className="ultra-glass" style={{ padding: 32 }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 20 }}>Las 4 Etapas del Builder</h2>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 24, lineHeight: 1.6 }}>
                    Tanto el SaaS Builder (admin) como el Landing Code Studio (cliente) comparten el mismo componente <code style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>BuilderFlow.tsx</code>. La diferencia es que el admin pasa <code style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>isAdmin=true</code> y el cliente no.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                    <EtapaCard n={1} title="Tipo de Proyecto" color="#6366f1" desc="El usuario elige entre crear una Tienda Completa (e-commerce con múltiples productos) o una Landing de Producto (PDP, enfocada en un solo producto ganador). Esta elección define qué plantillas se muestran en la Etapa 2." />
                    <EtapaCard n={2} title="Selección de Plantilla" color="#a78bfa" desc="Se muestran las plantillas disponibles en formato FilmStrip o CoverFlow. El admin ve todas; el cliente solo las verificadas. Cada card muestra un preview en vivo renderizado en un iframe. El admin puede verificar/eliminar desde aquí." />
                    <EtapaCard n={3} title="Catálogo de Productos" color="#10b981" desc="Se conecta al catálogo maestro de AlmiDrop. El usuario selecciona los productos que quiere incluir. Para tiendas puede seleccionar múltiples; para PDP solo uno. Incluye Express Stock con ciudades dinámicas." />
                    <EtapaCard n={4} title="Configura y Publica" color="#f59e0b" desc="Se abre el Editor Visual completo. El usuario personaliza colores, textos, imágenes. Al publicar, se crea un registro en tiendas_publicadas o pdp_publicadas con una URL pública accesible para cualquier visitante." />
                </div>
            </div>

            {/* Flujo de verificación visual */}
            <div className="ultra-glass" style={{ padding: 32 }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 20 }}>Flujo de Verificación — Paso a Paso</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {[
                        { step: '1', text: 'Admin entra a /admin/builder', detail: 'La página carga <BuilderFlow isAdmin={true} />' },
                        { step: '2', text: 'BuilderFlow detecta isAdmin=true', detail: 'Hace fetch a /api/templates/stores?includeUnverified=true' },
                        { step: '3', text: 'La API consulta Supabase', detail: 'SELECT * FROM Tiendas_Reutilizables WHERE deleted_at IS NULL (sin filtro de verified)' },
                        { step: '4', text: 'Admin ve TODAS las plantillas en Etapa 2', detail: 'Cada card tiene botón rojo "NO VERIFICADO" o verde "VERIFICADO"' },
                        { step: '5', text: 'Admin hace clic en "NO VERIFICADO"', detail: 'Se ejecuta handleVerifyToggle() → POST /api/templates/stores { action: "verify", verified: true }' },
                        { step: '6', text: 'La API valida el JWT del admin', detail: 'Verifica que payload.role === "admin". Si no es admin, devuelve 403.' },
                        { step: '7', text: 'Se actualiza la base de datos', detail: 'UPDATE Tiendas_Reutilizables SET verified = true WHERE id = ?' },
                        { step: '8', text: 'El estado local se actualiza', detail: 'setStoreTemplates(prev => prev.map(t => t.id === id ? { ...t, verified: true } : t))' },
                        { step: '9', text: 'Cliente entra a /builder', detail: 'La página carga <BuilderFlow /> sin isAdmin (es undefined/falsy)' },
                        { step: '10', text: 'BuilderFlow detecta que NO es admin', detail: 'Hace fetch a /api/templates/stores (sin includeUnverified)' },
                        { step: '11', text: 'La API filtra por verified=true', detail: 'SELECT * FROM Tiendas_Reutilizables WHERE deleted_at IS NULL AND verified = true' },
                        { step: '12', text: 'Cliente solo ve plantillas verificadas', detail: 'Las plantillas no verificadas simplemente no existen para el cliente.' },
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: i < 11 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8, background: i < 8 ? 'rgba(99,102,241,0.15)' : 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: i < 8 ? '#a78bfa' : '#6ee7b7', flexShrink: 0 }}>
                                {item.step}
                            </div>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{item.text}</div>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{item.detail}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Qué pasa cuando se publica */}
            <div className="ultra-glass" style={{ padding: 32 }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 20 }}>¿Qué pasa cuando el cliente publica?</h2>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>
                    <p style={{ marginBottom: 12 }}>
                        Cuando el cliente termina de configurar su tienda o PDP en la Etapa 4 y le da "Publicar", ocurre lo siguiente:
                    </p>
                    <p style={{ marginBottom: 12 }}>
                        <strong style={{ color: '#6ee7b7' }}>Para tiendas:</strong> Se crea un nuevo registro en la tabla <code style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>tiendas_publicadas</code> con un <code style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>identificador_url</code> (slug) único. La tienda queda accesible en <strong>/t/ese-slug</strong>.
                    </p>
                    <p style={{ marginBottom: 12 }}>
                        <strong style={{ color: '#a78bfa' }}>Para PDPs:</strong> Se crea un registro en <code style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>pdp_publicadas</code>. El PDP queda accesible en <strong>/p/ese-slug</strong>.
                    </p>
                    <p>
                        Estas tablas son <strong>diferentes</strong> a las de plantillas. Las plantillas (<code style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>Tiendas_Reutilizables</code> y <code style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>Paginas_de_Productos_Reutilizables</code>) son los moldes. Las publicadas son las copias que el cliente creó a partir de esos moldes.
                    </p>
                </div>
            </div>

            {/* NUEVA SECCIÓN: Arquitectura DB vs Código */}
            <div className="ultra-glass" style={{ padding: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Database size={22} color="#f59e0b" />
                    </div>
                    <div>
                        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0 }}>Arquitectura: Base de Datos vs Código</h2>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0 }}>¿Qué se guarda en la DB y qué se guarda en los archivos .tsx?</p>
                    </div>
                </div>

                <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: 24 }}>
                    <p style={{ marginBottom: 16 }}>
                        Imaginá que tenés un <strong style={{ color: '#fbbf24' }}>catálogo de IKEA</strong>. El catálogo tiene dos partes: la <strong style={{ color: '#a78bfa' }}>ficha técnica</strong> (nombre del mueble, precio, medidas, color disponible) y la <strong style={{ color: '#6ee7b7' }}>foto del showroom</strong> (cómo se ve armado, decorado, en un ambiente real).
                    </p>
                    <p style={{ marginBottom: 16 }}>
                        En nuestro sistema es igual: la <strong style={{ color: '#a78bfa' }}>base de datos</strong> guarda la ficha técnica (los DATOS) y los <strong style={{ color: '#6ee7b7' }}>archivos .tsx</strong> guardan la foto del showroom (el DISEÑO VISUAL).
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                    {/* Columna DB */}
                    <div style={{ padding: 24, borderRadius: 16, background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.15)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <Database size={18} color="#a78bfa" />
                            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#a78bfa', margin: 0 }}>Base de Datos (Supabase)</h3>
                        </div>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>Tabla: Paginas_de_Productos_Reutilizables</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {[
                                'Nombre de la plantilla',
                                'template_name → apunta al archivo .tsx',
                                'Descripción',
                                'URL de imagen de preview',
                                'Si es premium (true/false)',
                                'Si está verificada (true/false)',
                                'Nicho y sub-nicho',
                                'Fecha de creación',
                                'Estado de eliminación (soft delete)',
                            ].map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
                                    <Database size={12} style={{ color: '#a78bfa', flexShrink: 0, marginTop: 2 }} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Columna Código */}
                    <div style={{ padding: 24, borderRadius: 16, background: 'rgba(110,231,183,0.06)', border: '1px solid rgba(110,231,183,0.15)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <Code size={18} color="#6ee7b7" />
                            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#6ee7b7', margin: 0 }}>Código (.tsx files)</h3>
                        </div>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>Carpeta: components/templates/pdp/</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {[
                                'Secciones CRO de venta (10-12 por plantilla)',
                                'Layout y estructura HTML/JSX',
                                'Estilos Tailwind CSS',
                                'Iconos SVG inline (no emojis)',
                                'Formularios COD (contra entrega)',
                                'Contadores y temporizadores',
                                'Barras de confianza y trust badges',
                                'Acordeones FAQ, tabs, animaciones',
                                'Lógica de interacción (useState, useEffect)',
                            ].map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
                                    <Code size={12} style={{ color: '#6ee7b7', flexShrink: 0, marginTop: 2 }} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Conexión entre DB y Código */}
                <div style={{ padding: 20, borderRadius: 14, background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', marginBottom: 20 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 800, color: '#fbbf24', marginBottom: 12 }}>¿Cómo se conectan?</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                        <code style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>template_name = &quot;PdpPremiumElectronics&quot;</code>
                        <ArrowRight size={16} color="#fbbf24" />
                        <code style={{ background: 'rgba(110,231,183,0.15)', color: '#6ee7b7', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>PdpPremiumElectronics.tsx</code>
                    </div>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 12, lineHeight: 1.6 }}>
                        El campo <code style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4, fontSize: 11 }}>template_name</code> en la tabla apunta al archivo .tsx que contiene el diseño visual. Cuando se renderiza un PDP, el sistema busca el componente que coincide con ese nombre y le pasa los datos de la tabla como props.
                    </p>
                </div>

                {/* Consecuencias */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div style={{ padding: 18, borderRadius: 12, background: 'rgba(110,231,183,0.06)', border: '1px solid rgba(110,231,183,0.12)' }}>
                        <h4 style={{ fontSize: 13, fontWeight: 800, color: '#6ee7b7', marginBottom: 8 }}>Si actualizás un archivo .tsx:</h4>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                            TODOS los PDPs que usan ese template se actualizan automáticamente. Es como cambiar el molde: todas las piezas que salen del molde cambian. No necesitás tocar la base de datos.
                        </p>
                    </div>
                    <div style={{ padding: 18, borderRadius: 12, background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.12)' }}>
                        <h4 style={{ fontSize: 13, fontWeight: 800, color: '#a78bfa', marginBottom: 8 }}>Si actualizás la base de datos:</h4>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                            Solo cambian los DATOS (nombre, precio, imagen). El diseño visual sigue igual porque el .tsx no cambió. Es como cambiar la etiqueta de un producto sin cambiar el empaque.
                        </p>
                    </div>
                </div>
            </div>

            {/* Los 14 archivos de plantillas PDP */}
            <div className="ultra-glass" style={{ padding: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <LayoutTemplate size={22} color="#10b981" />
                    </div>
                    <div>
                        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0 }}>Los 14 Archivos de Plantillas PDP</h2>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0 }}>components/templates/pdp/ — Cada archivo es un diseño visual completo</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {[
                        { name: 'PdpPremiumElectronics.tsx', desc: 'Premium — Electrónica (11 secciones CRO)', color: '#6366f1', premium: true },
                        { name: 'PdpPremiumHealth.tsx', desc: 'Premium — Salud/Bienestar (11 secciones CRO)', color: '#6366f1', premium: true },
                        { name: 'PdpPremiumUrgency.tsx', desc: 'Premium — Urgencia/Escasez (11 secciones CRO)', color: '#6366f1', premium: true },
                        { name: 'PdpPremiumBundle.tsx', desc: 'Premium — Bundles/Paquetes (12 secciones CRO)', color: '#6366f1', premium: true },
                        { name: 'PdpAggressiveUrgency.tsx', desc: 'Urgencia agresiva con countdown', color: '#10b981', premium: false },
                        { name: 'PdpBeauty.tsx', desc: 'Belleza y cosméticos', color: '#10b981', premium: false },
                        { name: 'PdpBundleMaximizer.tsx', desc: 'Maximizador de bundles', color: '#10b981', premium: false },
                        { name: 'PdpDirectCheckout.tsx', desc: 'Checkout directo rápido', color: '#10b981', premium: false },
                        { name: 'PdpElectronics.tsx', desc: 'Electrónica estándar', color: '#10b981', premium: false },
                        { name: 'PdpHealth.tsx', desc: 'Salud estándar', color: '#10b981', premium: false },
                        { name: 'PdpHome.tsx', desc: 'Hogar y decoración', color: '#10b981', premium: false },
                        { name: 'PdpSocialTrust.tsx', desc: 'Prueba social fuerte', color: '#10b981', premium: false },
                        { name: 'PdpStorytelling.tsx', desc: 'Narrativa/historia del producto', color: '#10b981', premium: false },
                        { name: 'PdpTools.tsx', desc: 'Herramientas y utilidades', color: '#10b981', premium: false },
                    ].map((t, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                            <div style={{ width: 28, height: 28, borderRadius: 8, background: `${t.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: t.color, flexShrink: 0 }}>
                                {i + 1}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{t.name}</div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{t.desc}</div>
                            </div>
                            {t.premium && (
                                <span style={{ fontSize: 9, fontWeight: 800, color: '#fbbf24', background: 'rgba(251,191,36,0.1)', padding: '3px 8px', borderRadius: 6, letterSpacing: '0.05em' }}>PREMIUM</span>
                            )}
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 10, background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.12)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Zap size={14} color="#f87171" />
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#f87171' }}>SharedCRO.tsx</span>
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>— Componentes CRO compartidos (BeforeAfter, DeepDiveFeature, etc.)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


// ─────────────────────────────────────────────────────────────
// TAB 2: CÓDIGO Y TABLAS
// ─────────────────────────────────────────────────────────────
function CodigoTab() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Tablas de base de datos */}
            <div className="ultra-glass" style={{ padding: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <Database size={22} color="#6366f1" />
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0 }}>Tablas de Base de Datos</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                    <TableDoc
                        name="Tiendas_Reutilizables"
                        purpose="Almacena las PLANTILLAS de tienda. Son los moldes que el admin crea y verifica. El campo verified controla si aparecen para el cliente."
                        fields={[
                            { name: 'id', type: 'UUID', desc: 'Identificador único de la plantilla' },
                            { name: 'name', type: 'TEXT', desc: 'Nombre descriptivo de la plantilla' },
                            { name: 'description', type: 'TEXT', desc: 'Descripción de la plantilla' },
                            { name: 'image_url', type: 'TEXT', desc: 'URL de la imagen de preview' },
                            { name: 'premium', type: 'BOOLEAN', desc: 'Si es plantilla premium' },
                            { name: 'verified', type: 'BOOLEAN', desc: 'DEFAULT false. Solo verified=true aparecen para el cliente' },
                            { name: 'deleted_at', type: 'TIMESTAMPTZ', desc: 'Soft delete. null=activa, fecha=en papelera' },
                            { name: 'created_at', type: 'TIMESTAMPTZ', desc: 'Fecha de creación' },
                        ]}
                        color="#6366f1"
                    />
                    <TableDoc
                        name="Paginas_de_Productos_Reutilizables"
                        purpose="Almacena las PLANTILLAS de PDP (página de producto). El campo template_name conecta con el archivo .tsx que contiene el diseño visual."
                        fields={[
                            { name: 'id', type: 'UUID', desc: 'Identificador único de la plantilla PDP' },
                            { name: 'name', type: 'TEXT', desc: 'Nombre descriptivo' },
                            { name: 'description', type: 'TEXT', desc: 'Descripción' },
                            { name: 'template_name', type: 'TEXT', desc: 'CLAVE: Nombre del componente .tsx (ej: "PdpPremiumElectronics")' },
                            { name: 'image_url', type: 'TEXT', desc: 'URL de la imagen de preview' },
                            { name: 'premium', type: 'BOOLEAN', desc: 'Si es plantilla premium' },
                            { name: 'verified', type: 'BOOLEAN', desc: 'DEFAULT false. Solo verified=true aparecen para el cliente' },
                            { name: 'niche', type: 'TEXT', desc: 'Nicho de la plantilla (ej: "Electrónica", "Salud")' },
                            { name: 'sub_niche', type: 'TEXT', desc: 'Sub-nicho específico (ej: "Smartphones", "Suplementos")' },
                            { name: 'deleted_at', type: 'TIMESTAMPTZ', desc: 'Soft delete' },
                            { name: 'created_at', type: 'TIMESTAMPTZ', desc: 'Fecha de creación' },
                        ]}
                        color="#10b981"
                    />
                    <TableDoc
                        name="tiendas_publicadas"
                        purpose="Almacena las tiendas YA PUBLICADAS por los clientes. Son instancias reales creadas a partir de las plantillas verificadas."
                        fields={[
                            { name: 'id', type: 'UUID', desc: 'ID único de la tienda publicada' },
                            { name: 'identificador_url', type: 'TEXT', desc: 'Slug para la URL pública (/t/slug)' },
                            { name: 'name', type: 'TEXT', desc: 'Nombre de la tienda' },
                            { name: 'template', type: 'TEXT', desc: 'ID de la plantilla base usada' },
                            { name: 'status', type: 'TEXT', desc: '"published" o "draft"' },
                            { name: 'user_id', type: 'UUID', desc: 'ID del usuario dueño' },
                            { name: 'created_at', type: 'TIMESTAMPTZ', desc: 'Fecha de creación' },
                            { name: 'updated_at', type: 'TIMESTAMPTZ', desc: 'Última actualización' },
                        ]}
                        color="#06b6d4"
                    />
                    <TableDoc
                        name="pdp_publicadas"
                        purpose="Almacena las PDPs YA PUBLICADAS por los clientes. Misma lógica que tiendas_publicadas pero para páginas de producto."
                        fields={[
                            { name: 'id', type: 'UUID', desc: 'ID único del PDP publicado' },
                            { name: 'identificador_url', type: 'TEXT', desc: 'Slug para la URL pública (/p/slug)' },
                            { name: 'name', type: 'TEXT', desc: 'Nombre del PDP' },
                            { name: 'pdp_template', type: 'TEXT', desc: 'ID de la plantilla PDP base usada' },
                            { name: 'status', type: 'TEXT', desc: '"published" o "draft"' },
                            { name: 'user_id', type: 'UUID', desc: 'ID del usuario dueño' },
                            { name: 'created_at', type: 'TIMESTAMPTZ', desc: 'Fecha de creación' },
                            { name: 'updated_at', type: 'TIMESTAMPTZ', desc: 'Última actualización' },
                        ]}
                        color="#a78bfa"
                    />
                </div>
            </div>

            {/* Componentes del código */}
            <div className="ultra-glass" style={{ padding: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <Code size={22} color="#10b981" />
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0 }}>Componentes del Código</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <ComponentDoc name="BuilderFlow.tsx" path="components/saas/BuilderFlow.tsx" desc="Componente central. Recibe isAdmin para controlar el comportamiento. Maneja las 4 etapas, carga plantillas, gestiona verificación, y orquesta todo el flujo." color="#6366f1" />
                    <ComponentDoc name="FilmStrip.tsx" path="components/visualization/FilmStrip.tsx" desc="Vista horizontal tipo cinta de película para plantillas PDP. Muestra número verde, preview, botón copiar ID, toggle verificación (admin), y botón previsualizar." color="#10b981" />
                    <ComponentDoc name="CoverFlow.tsx" path="components/visualization/CoverFlow.tsx" desc="Vista 3D tipo Apple CoverFlow para plantillas PDP. Mismas funcionalidades que FilmStrip pero con perspectiva 3D y rotación." color="#10b981" />
                    <ComponentDoc name="StoreFilmStrip.tsx" path="components/visualization/StoreFilmStrip.tsx" desc="Vista horizontal para plantillas de tienda. Incluye preloading inteligente de iframes y lazy loading por rango visible." color="#a78bfa" />
                    <ComponentDoc name="StoreCoverFlow.tsx" path="components/visualization/StoreCoverFlow.tsx" desc="Vista 3D para plantillas de tienda. Renderiza solo items dentro del rango visible para optimizar rendimiento." color="#a78bfa" />
                    <ComponentDoc name="LivePDPPreview.tsx" path="components/admin/LivePDPPreview.tsx" desc="Renderiza un preview en vivo de una plantilla PDP dentro de un iframe escalado." color="#06b6d4" />
                    <ComponentDoc name="LiveStorePreview.tsx" path="components/admin/LiveStorePreview.tsx" desc="Renderiza un preview en vivo de una plantilla de tienda dentro de un iframe escalado." color="#06b6d4" />
                    <ComponentDoc name="DynamicPDPDisplay.tsx" path="components/admin/DynamicPDPDisplay.tsx" desc="Wrapper que decide si mostrar FilmStrip o CoverFlow según el displayMode seleccionado." color="#f59e0b" />
                    <ComponentDoc name="StoreDynamicDisplay.tsx" path="components/visualization/StoreDynamicDisplay.tsx" desc="Wrapper que decide si mostrar StoreFilmStrip o StoreCoverFlow según el displayMode." color="#f59e0b" />
                    <ComponentDoc name="StudioLaunchSequence.tsx" path="components/saas/StudioLaunchSequence.tsx" desc="Animación cinematográfica de 14 segundos al entrar a la Etapa 4. 9 fases de texto, barra de progreso, apertura de telón." color="#f87171" />
                    <ComponentDoc name="StepCinematicTransition.tsx" path="components/saas/StepCinematicTransition.tsx" desc="Transición cinematográfica entre etapas (mínimo 2 segundos). Se muestra como overlay mientras los datos cargan." color="#f87171" />
                    <ComponentDoc name="VisualEditorOverlay.tsx" path="components/visual-editor/VisualEditorOverlay.tsx" desc="Editor visual completo de la Etapa 4. Permite personalizar colores, textos, imágenes y publicar." color="#fbbf24" />
                    <ComponentDoc name="RecycleBin.tsx" path="components/saas/RecycleBin.tsx" desc="Papelera de reciclaje. Muestra plantillas con soft delete (deleted_at != null). Permite restaurar o eliminar permanentemente." color="#f87171" />
                </div>
            </div>

            {/* API Endpoints */}
            <div className="ultra-glass" style={{ padding: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <Zap size={22} color="#f59e0b" />
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0 }}>API Endpoints</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <ApiDoc method="GET" path="/api/templates/stores" desc="Sin params: solo verified=true. Con ?includeUnverified=true: todas. Tabla: Tiendas_Reutilizables." />
                    <ApiDoc method="GET" path="/api/templates/pdp" desc="Sin params: solo verified=true. Con ?includeUnverified=true: todas. Tabla: Paginas_de_Productos_Reutilizables." />
                    <ApiDoc method="POST" path="/api/templates/stores" desc="action='verify': Cambia verified. action='restore': Restaura de papelera. action='delete_permanent': Elimina definitivamente. Requiere role=admin." />
                    <ApiDoc method="POST" path="/api/templates/pdp" desc="Mismas acciones que stores pero para PDPs. Requiere role=admin." />
                    <ApiDoc method="DELETE" path="/api/templates/stores?id=UUID" desc="Soft delete: SET deleted_at=NOW(). Va a la papelera. Requiere role=admin." />
                    <ApiDoc method="DELETE" path="/api/templates/pdp?id=UUID" desc="Soft delete para PDPs. Requiere role=admin." />
                    <ApiDoc method="GET" path="/api/tiendas?all=true" desc="Devuelve todas las tiendas y PDPs PUBLICADAS. Tablas: tiendas_publicadas + pdp_publicadas. Para admin en /admin/publicadas." />
                </div>
            </div>

            {/* Rutas */}
            <div className="ultra-glass" style={{ padding: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <Globe size={22} color="#06b6d4" />
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0 }}>Rutas del Proyecto</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                    <div>
                        <h4 style={{ fontSize: 12, fontWeight: 800, color: '#a78bfa', marginBottom: 12, letterSpacing: '0.05em' }}>ADMIN</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <RouteItem path="/admin/builder" desc="SaaS Builder" />
                            <RouteItem path="/admin/publicadas" desc="Gestión publicadas" />
                            <RouteItem path="/admin/documentacion" desc="Docs de tablas" />
                            <RouteItem path="/admin/documentacion/builder" desc="Esta documentación" />
                        </div>
                    </div>
                    <div>
                        <h4 style={{ fontSize: 12, fontWeight: 800, color: '#6ee7b7', marginBottom: 12, letterSpacing: '0.05em' }}>CLIENTE</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <RouteItem path="/builder" desc="Landing Code Studio" />
                            <RouteItem path="/dashboard" desc="Centro de control" />
                        </div>
                    </div>
                    <div>
                        <h4 style={{ fontSize: 12, fontWeight: 800, color: '#fbbf24', marginBottom: 12, letterSpacing: '0.05em' }}>PÚBLICAS</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <RouteItem path="/t/[slug]" desc="Tienda publicada" />
                            <RouteItem path="/p/[slug]" desc="PDP publicado" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


// ─────────────────────────────────────────────────────────────
// TAB 3: PROMPT COPIABLE
// ─────────────────────────────────────────────────────────────
function PromptTab({ promptText, copied, onCopy, promptRef }: { promptText: string; copied: boolean; onCopy: () => void; promptRef: React.RefObject<HTMLPreElement | null> }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Instrucciones */}
            <div className="ultra-glass" style={{ padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <Terminal size={20} color="#f59e0b" />
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: 0 }}>Prompt Completo para IA / Programadores</h2>
                </div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 16 }}>
                    Este prompt contiene TODA la documentación del SaaS Builder y Landing Code Studio en formato texto plano. 
                    Copialo y pegalo en cualquier chat de IA (ChatGPT, Claude, Gemini, etc.) o envialo a un programador. 
                    Quien lo lea va a entender completamente cómo funciona el sistema: las tablas, las APIs, los componentes, 
                    el flujo de verificación, y cómo se conecta todo.
                </p>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button
                        onClick={onCopy}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 700,
                            background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(245,158,11,0.15)',
                            border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(245,158,11,0.3)'}`,
                            color: copied ? '#22c55e' : '#f59e0b',
                            cursor: 'pointer', transition: 'all 0.2s',
                        }}
                    >
                        {copied ? <><Check size={16} /> Copiado al portapapeles</> : <><Copy size={16} /> Copiar Prompt Completo</>}
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
                        <Shield size={14} />
                        {promptText.length.toLocaleString()} caracteres · {promptText.split('\n').length} líneas
                    </div>
                </div>
            </div>

            {/* Prompt */}
            <div className="ultra-glass" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '12px 20px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f87171' }} />
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fbbf24' }} />
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginLeft: 8, fontWeight: 600 }}>prompt_saas_builder.md</span>
                    </div>
                    <button
                        onClick={onCopy}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '6px 14px', borderRadius: 8, fontSize: 11, fontWeight: 700,
                            background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${copied ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.08)'}`,
                            color: copied ? '#22c55e' : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer', transition: 'all 0.2s',
                        }}
                    >
                        {copied ? <><Check size={12} /> Copiado</> : <><Copy size={12} /> Copiar</>}
                    </button>
                </div>
                <pre
                    ref={promptRef}
                    style={{
                        padding: 24,
                        margin: 0,
                        fontSize: 12,
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                        color: 'rgba(255,255,255,0.65)',
                        lineHeight: 1.7,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        maxHeight: 'calc(100vh - 380px)',
                        overflowY: 'auto',
                        background: 'rgba(0,0,0,0.2)',
                    }}
                >
                    {promptText}
                </pre>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────
// SUBCOMPONENTES REUTILIZABLES
// ─────────────────────────────────────────────────────────────

function FlowStep({ number, color, title, desc }: { number: number; color: string; title: string; desc: string }) {
    return (
        <div style={{ display: 'flex', gap: 16, padding: '16px 20px', borderRadius: 14, background: `${color}08`, border: `1px solid ${color}20` }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color, flexShrink: 0 }}>
                {number}
            </div>
            <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{desc}</div>
            </div>
        </div>
    );
}

function EtapaCard({ n, title, color, desc }: { n: number; title: string; color: string; desc: string }) {
    return (
        <div style={{ padding: 20, borderRadius: 14, background: `${color}08`, border: `1px solid ${color}20`, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color }}>
                    {n}
                </div>
                <span style={{ fontSize: 13, fontWeight: 800, color }}>{title}</span>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
        </div>
    );
}

function TableDoc({ name, purpose, fields, color }: { name: string; purpose: string; fields: { name: string; type: string; desc: string }[]; color: string }) {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Database size={16} color={color} />
                </div>
                <div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: 0 }}>{name}</h3>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0 }}>{purpose}</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {fields.map(f => (
                    <div key={f.name} style={{ display: 'grid', gridTemplateColumns: '160px 110px 1fr', gap: 12, padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.02)' }}>
                        <code style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{f.name}</code>
                        <span style={{ fontSize: 10, fontWeight: 800, color, background: `${color}15`, padding: '2px 6px', borderRadius: 4, textAlign: 'center', alignSelf: 'center' }}>{f.type}</span>
                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{f.desc}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ComponentDoc({ name, path, desc, color }: { name: string; path: string; desc: string; color: string }) {
    return (
        <div style={{ display: 'flex', gap: 12, padding: '14px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, marginTop: 6, flexShrink: 0, boxShadow: `0 0 8px ${color}` }} />
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{name}</span>
                    <code style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: 4 }}>{path}</code>
                </div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.5 }}>{desc}</p>
            </div>
        </div>
    );
}

function ApiDoc({ method, path, desc }: { method: string; path: string; desc: string }) {
    const methodColor = method === 'GET' ? '#22c55e' : method === 'POST' ? '#6366f1' : '#f87171';
    return (
        <div style={{ display: 'flex', gap: 12, padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
            <span style={{ fontSize: 10, fontWeight: 900, color: methodColor, background: `${methodColor}15`, padding: '4px 8px', borderRadius: 6, alignSelf: 'flex-start' }}>{method}</span>
            <div>
                <code style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{path}</code>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: '4px 0 0', lineHeight: 1.5 }}>{desc}</p>
            </div>
        </div>
    );
}

function RouteItem({ path, desc }: { path: string; desc: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
            <code style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: 4 }}>{path}</code>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{desc}</span>
        </div>
    );
}
