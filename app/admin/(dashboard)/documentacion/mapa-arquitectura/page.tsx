'use client';
import React, { useState } from 'react';
import { Building2, Users, Database, Globe, ArrowRight, Layers, Package, BookmarkCheck, Rocket, FileText, Brain, ChevronDown, ChevronRight } from 'lucide-react';

// ═══════════════════════════════════════════════════════════
// MAPA MENTAL 3D — ARQUITECTURA SRP DEL ECOSISTEMA
// Analogía: Agencia de Marketing Digital "AlmiDrop Creative"
// ═══════════════════════════════════════════════════════════

interface Persona {
    nombre: string;
    codigo: string;
    rol: string;
    descripcion: string;
    color: string;
    icon: React.ReactNode;
}

interface Departamento {
    id: string;
    nombre: string;
    analogia: string;
    ruta: string;
    color: string;
    gradiente: string;
    icon: React.ReactNode;
    descripcion: string;
    personas: Persona[];
}

const DEPARTAMENTOS: Departamento[] = [
    {
        id: 'direccion',
        nombre: 'Dirección Creativa',
        analogia: 'El piso ejecutivo donde se aprueban los diseños',
        ruta: '/admin/templates',
        color: '#6366f1',
        gradiente: 'linear-gradient(135deg, #6366f1, #4f46e5)',
        icon: <Building2 size={22} />,
        descripcion: 'Aquí el Director Creativo revisa cada diseño de tienda y cada página de producto antes de que llegue al cliente. Nada sale al mercado sin su aprobación. Él no diseña — supervisa.',
        personas: [
            {
                nombre: 'Santiago "El Director"',
                codigo: 'app/admin/(dashboard)/templates/page.tsx',
                rol: 'Director Creativo',
                descripcion: 'Santiago no toca un solo diseño. Se sienta en su oficina y coordina a todo su equipo. Cuando alguien le pregunta algo, él sabe a quién derivar. Es el orquestador — cero trabajo operativo.',
                color: '#6366f1',
                icon: <Building2 size={16} />,
            },
            {
                nombre: 'Memo "El Archivista"',
                codigo: 'hooks/useTemplates.ts',
                rol: 'Jefe de Archivo de Diseños',
                descripcion: 'Memo tiene el catálogo completo de todos los diseños que existen en la agencia. Tiendas por un lado, páginas de producto por otro. Cuando Santiago pregunta "¿qué tenemos?", Memo abre su archivo y responde. No opina, no filtra. Solo recuerda la lista.',
                color: '#818cf8',
                icon: <Layers size={16} />,
            },
            {
                nombre: 'Lupe "La Curadora"',
                codigo: 'hooks/useTemplateFilters.ts',
                rol: 'Curadora de Contenido',
                descripcion: 'Lupe se para frente al archivo de Memo con un filtro. "Solo los verificados." "Solo los de categoría belleza." "Solo los pendientes." Ella no sabe qué hay en el archivo — solo sabe filtrar lo que le piden.',
                color: '#a78bfa',
                icon: <BookmarkCheck size={16} />,
            },
            {
                nombre: 'Rafa "El Ejecutor"',
                codigo: 'hooks/useTemplateActions.ts',
                rol: 'Gerente de Operaciones',
                descripcion: 'Rafa ejecuta las decisiones de Santiago. "Aprueba este diseño." "Elimina este otro." "Asigna esta categoría." Rafa no decide qué aprobar — solo ejecuta órdenes sin cuestionar.',
                color: '#c084fc',
                icon: <BookmarkCheck size={16} />,
            },
            {
                nombre: 'Doña Cata "La Clasificadora"',
                codigo: 'hooks/useCategorias.ts',
                rol: 'Jefa de Clasificación',
                descripcion: 'Doña Cata solo sabe de categorías. "¿Cuántas categorías hay? ¿Cuáles son las subcategorías de electrónica?" Pregúntale a ella. No sabe de diseños, no sabe de filtros. Solo categorías.',
                color: '#e879f9',
                icon: <Package size={16} />,
            },
            {
                nombre: 'Pepe "El Navegante"',
                codigo: 'hooks/useTemplateTab.ts',
                rol: 'Recepcionista de Piso',
                descripcion: 'Pepe sabe en qué sala estás. ¿Sala de Tiendas? ¿Sala de PDPs? ¿Sala de Playground? Cuando cambias de sala, Pepe avisa a todos para que se preparen.',
                color: '#f0abfc',
                icon: <ChevronRight size={16} />,
            },
            {
                nombre: 'Carlos "El Mensajero"',
                codigo: 'lib/templates-api.ts',
                rol: 'Mensajero Externo',
                descripcion: 'Carlos es el único que sale del edificio. Va a la bodega central (Supabase), trae datos, lleva actualizaciones. Nadie más toca la calle. Si necesitas algo de la base de datos, Carlos va y vuelve.',
                color: '#67e8f9',
                icon: <Globe size={16} />,
            },
        ],
    },
    {
        id: 'estudio',
        nombre: 'Estudio del Cliente',
        analogia: 'El salón donde el cliente arma su proyecto',
        ruta: '/builder (Landing C. Studio)',
        color: '#10b981',
        gradiente: 'linear-gradient(135deg, #10b981, #059669)',
        icon: <Rocket size={22} />,
        descripcion: 'Aquí el cliente se sienta y construye su tienda o su página de producto. El Capitán del Estudio coordina a su equipo para que el cliente tenga todo lo que necesita sin esperar.',
        personas: [
            {
                nombre: 'Don Builder "El Capitán"',
                codigo: 'components/flujo-constructor/BuilderFlow.tsx',
                rol: 'Capitán del Estudio',
                descripcion: 'Don Builder no diseña, no busca productos, no publica. Solo coordina. "Tomás, trae el menú. Paco, trae los productos. Nando, prepara la publicación." Él es la regleta — distribuye la corriente pero no genera ninguna.',
                color: '#10b981',
                icon: <Rocket size={16} />,
            },
            {
                nombre: 'Tomás "El del Menú"',
                codigo: 'hooks/useBuilderTemplates.ts',
                rol: 'Encargado del Catálogo de Diseños',
                descripcion: 'Cuando el cliente se sienta, Tomás corre a la bodega y trae el menú de diseños disponibles. Tiendas verificadas, páginas de producto verificadas, categorías. Pone el menú en la mesa y se queda quieto.',
                color: '#34d399',
                icon: <Layers size={16} />,
            },
            {
                nombre: 'Paco "El del Catálogo"',
                codigo: 'hooks/useBuilderProducts.ts',
                rol: 'Encargado del Catálogo de Productos',
                descripcion: 'Paco trae los productos de AlmiDrop. El cliente busca, pagina, selecciona uno o varios. Paco anota todo en su libreta. "El cliente quiere estos 5 productos." No sabe de diseños, no sabe de publicación. Solo productos.',
                color: '#6ee7b7',
                icon: <Package size={16} />,
            },
            {
                nombre: 'Beto "El de los Borradores"',
                codigo: 'hooks/useBuilderDraft.ts',
                rol: 'Encargado de Borradores',
                descripcion: 'Beto guarda la servilleta donde el cliente estaba dibujando su proyecto. Si el cliente se va sin terminar y vuelve mañana, Beto le dice "encontré tu servilleta de ayer, ¿quieres seguir?" Si dice que no, Beto la tira.',
                color: '#a7f3d0',
                icon: <FileText size={16} />,
            },
            {
                nombre: 'Nando "El Publicador"',
                codigo: 'hooks/useBuilderPublish.ts',
                rol: 'Gerente de Lanzamiento',
                descripcion: 'Cuando el cliente dice "listo, publícalo", Nando toma el proyecto completo, le pone nombre, URL, y lo manda a la bodega para que quede en vivo para siempre. Si algo falla, Nando informa. Si todo sale bien, entrega el enlace público.',
                color: '#fbbf24',
                icon: <Rocket size={16} />,
            },
            {
                nombre: 'Sergio "El de los Pasos"',
                codigo: 'hooks/useBuilderStep.ts',
                rol: 'Director de Flujo',
                descripcion: 'Sergio sabe en qué momento del proceso va el cliente. Paso 1: ¿qué quieres construir? Paso 2: elige diseño. Paso 3: elige productos. Paso 4: configura y publica. Maneja las transiciones cinemáticas entre pasos.',
                color: '#fcd34d',
                icon: <ChevronRight size={16} />,
            },
            {
                nombre: 'Diego "El Mensajero"',
                codigo: 'lib/builder-api.ts',
                rol: 'Mensajero Externo del Estudio',
                descripcion: 'Igual que Carlos arriba, Diego es el único que sale a la calle. Trae diseños de la bodega, trae productos del catálogo, manda a publicar. Nadie más del estudio toca la calle.',
                color: '#67e8f9',
                icon: <Globe size={16} />,
            },
        ],
    },
    {
        id: 'bodega',
        nombre: 'La Bodega Central',
        analogia: 'Donde se almacena todo — Supabase',
        ruta: 'Supabase (Base de Datos)',
        color: '#f59e0b',
        gradiente: 'linear-gradient(135deg, #f59e0b, #d97706)',
        icon: <Database size={22} />,
        descripcion: 'La bodega es Supabase. Solo los mensajeros (Carlos y Diego) entran aquí. Nadie más. Tiene estantes organizados por tipo de dato.',
        personas: [
            {
                nombre: 'Estante de Diseños de Tienda',
                codigo: 'Tabla: Tiendas_Reutilizables',
                rol: 'Almacén de templates de tiendas',
                descripcion: 'Aquí viven todos los diseños de tienda que el admin puede verificar. Cada diseño tiene nombre, imagen, descripción y un campo "verified" que dice si ya fue aprobado por Santiago.',
                color: '#f59e0b',
                icon: <Database size={16} />,
            },
            {
                nombre: 'Estante de Diseños de Producto',
                codigo: 'Tabla: Plantillas_PDP',
                rol: 'Almacén de templates de páginas de producto',
                descripcion: 'Aquí viven las páginas de producto. Cada una tiene código, categoría, subcategoría y el campo "verificada" que dice si fue aprobada. Se conecta con Categorias_PDP y Subcategorias_PDP.',
                color: '#fbbf24',
                icon: <Database size={16} />,
            },
            {
                nombre: 'Estante de Tiendas Publicadas',
                codigo: 'Tabla: tiendas_publicadas',
                rol: 'Almacén de tiendas en vivo',
                descripcion: 'Cuando Nando publica una tienda, llega aquí. Tiene el identificador_url (el slug público), el store_data completo con productos y configuración, y el template elegido. Se sirve en /t/[url].',
                color: '#fb923c',
                icon: <Globe size={16} />,
            },
            {
                nombre: 'Estante de PDPs Publicadas',
                codigo: 'Tabla: pdp_publicadas',
                rol: 'Almacén de páginas de producto en vivo',
                descripcion: 'Cuando Nando publica una página de producto, llega aquí. Tiene el identificador_url, el pdp_template elegido, el producto seleccionado y toda la configuración. Se sirve en /p/[url].',
                color: '#f97316',
                icon: <Globe size={16} />,
            },
        ],
    },
    {
        id: 'vitrina',
        nombre: 'La Vitrina Pública',
        analogia: 'Lo que ve el mundo — las páginas en vivo',
        ruta: '/t/[url] y /p/[url]',
        color: '#06b6d4',
        gradiente: 'linear-gradient(135deg, #06b6d4, #0891b2)',
        icon: <Globe size={22} />,
        descripcion: 'La vitrina es lo que ve el mundo. Cuando alguien visita una URL pública, el sistema va a la bodega, trae los datos y renderiza el diseño elegido con los productos configurados.',
        personas: [
            {
                nombre: 'Vitrina de Tiendas',
                codigo: 'app/t/[identificador_url]/page.tsx',
                rol: 'Renderizador de tiendas públicas',
                descripcion: 'Cuando alguien visita /t/mi-tienda, esta página va a la bodega (tiendas_publicadas), busca el registro por URL, carga el template correcto de los 80+ componentes de tienda, y lo renderiza con los datos del cliente.',
                color: '#06b6d4',
                icon: <Globe size={16} />,
            },
            {
                nombre: 'Vitrina de Productos',
                codigo: 'app/p/[identificador_url]/page.tsx',
                rol: 'Renderizador de páginas de producto públicas',
                descripcion: 'Cuando alguien visita /p/mi-producto, esta página va a la bodega (pdp_publicadas), busca el registro, resuelve el código de plantilla PDP, y renderiza la página de producto con el diseño de conversión elegido.',
                color: '#22d3ee',
                icon: <Globe size={16} />,
            },
        ],
    },
];

const FLUJO_PASOS = [
    { paso: 1, titulo: 'Santiago aprueba un diseño', desc: 'Rafa ejecuta la verificación. Carlos lleva el sello a la bodega.', color: '#6366f1' },
    { paso: 2, titulo: 'El diseño queda verificado en la bodega', desc: 'Campo verified=true en Tiendas_Reutilizables o verificada=true en Plantillas_PDP.', color: '#f59e0b' },
    { paso: 3, titulo: 'El cliente abre Landing C. Studio', desc: 'Tomás va a la bodega y trae solo los diseños verificados.', color: '#10b981' },
    { paso: 4, titulo: 'El cliente elige diseño + productos', desc: 'Paco trae el catálogo AlmiDrop. El cliente selecciona. Beto guarda el borrador.', color: '#10b981' },
    { paso: 5, titulo: 'El cliente publica', desc: 'Nando toma todo, Diego lo lleva a la bodega como tienda o PDP publicada.', color: '#fbbf24' },
    { paso: 6, titulo: 'El mundo lo ve', desc: 'La vitrina pública renderiza /t/mi-tienda o /p/mi-producto en vivo.', color: '#06b6d4' },
];

export default function MapaArquitecturaPage() {
    const [expanded, setExpanded] = useState<string | null>('direccion');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 1200 }}>

            {/* Header */}
            <div>
                <h1 className="shimmer-text" style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em', margin: 0, lineHeight: 1 }}>
                    MAPA DE ARQUITECTURA
                </h1>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginTop: 10 }}>
                    Analogía: Agencia de Marketing Digital "AlmiDrop Creative" — Cada persona tiene un nombre, un rol y una sola responsabilidad (SRP)
                </p>
            </div>

            {/* Flujo visual */}
            <div className="ultra-glass" style={{ padding: 28, position: 'relative', overflow: 'hidden' }}>
                <div className="hyper-ring" style={{ opacity: 0.1 }} />
                <div style={{ fontSize: 13, fontWeight: 800, color: 'rgba(255,255,255,0.5)', marginBottom: 20, letterSpacing: '0.05em', position: 'relative', zIndex: 1 }}>
                    FLUJO COMPLETO — DE LA APROBACIÓN A LA VITRINA
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
                    {FLUJO_PASOS.map((p, i) => (
                        <React.Fragment key={p.paso}>
                            <div style={{
                                padding: '12px 16px', borderRadius: 12, minWidth: 150,
                                background: `${p.color}15`, border: `1px solid ${p.color}40`,
                                display: 'flex', flexDirection: 'column', gap: 4,
                            }}>
                                <div style={{ fontSize: 10, fontWeight: 800, color: p.color, letterSpacing: '0.08em' }}>PASO {p.paso}</div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{p.titulo}</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>{p.desc}</div>
                            </div>
                            {i < FLUJO_PASOS.length - 1 && <ArrowRight size={16} style={{ color: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Departamentos */}
            {DEPARTAMENTOS.map(dept => {
                const isOpen = expanded === dept.id;
                return (
                    <div key={dept.id} className="ultra-glass" style={{ overflow: 'hidden', position: 'relative' }}>
                        <div className="hyper-ring" style={{ opacity: 0.08 }} />
                        <button onClick={() => setExpanded(isOpen ? null : dept.id)} style={{
                            width: '100%', display: 'flex', alignItems: 'center', gap: 16, padding: '24px 28px',
                            background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', position: 'relative', zIndex: 1,
                        }}>
                            <div style={{
                                width: 48, height: 48, borderRadius: 14, background: dept.gradiente,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                                boxShadow: `0 8px 24px ${dept.color}30`, flexShrink: 0,
                            }}>
                                {dept.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>{dept.nombre}</div>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginTop: 2 }}>
                                    {dept.analogia} — <span style={{ fontFamily: 'monospace', color: dept.color }}>{dept.ruta}</span>
                                </div>
                            </div>
                            <div style={{ color: 'rgba(255,255,255,0.3)', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                                <ChevronDown size={20} />
                            </div>
                        </button>

                        {isOpen && (
                            <div style={{ padding: '0 28px 28px', position: 'relative', zIndex: 1 }}>
                                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 20, padding: '0 4px' }}>
                                    {dept.descripcion}
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {dept.personas.map(p => (
                                        <div key={p.codigo} style={{
                                            display: 'flex', gap: 14, padding: '16px 18px', borderRadius: 14,
                                            background: 'rgba(0,0,0,0.2)', border: `1px solid ${p.color}25`,
                                            alignItems: 'flex-start',
                                        }}>
                                            <div style={{
                                                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                                                background: `${p.color}20`, border: `1px solid ${p.color}40`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.color,
                                            }}>
                                                {p.icon}
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                                    <span style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>{p.nombre}</span>
                                                    <span style={{ fontSize: 10, fontWeight: 700, color: p.color, background: `${p.color}15`, padding: '2px 8px', borderRadius: 6 }}>{p.rol}</span>
                                                </div>
                                                <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
                                                    {p.codigo}
                                                </div>
                                                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginTop: 8, marginBottom: 0 }}>
                                                    {p.descripcion}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Principio SRP */}
            <div className="ultra-glass" style={{ padding: 28, position: 'relative', overflow: 'hidden' }}>
                <div className="hyper-ring" style={{ opacity: 0.1 }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, position: 'relative', zIndex: 1 }}>
                    <Brain size={20} style={{ color: '#a78bfa' }} />
                    <span style={{ fontSize: 14, fontWeight: 900, color: '#fff', letterSpacing: '-0.01em' }}>PRINCIPIO SRP — ¿POR QUÉ FUNCIONA ASÍ?</span>
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, position: 'relative', zIndex: 1 }}>
                    Cada persona de esta agencia tiene una sola razón para cambiar. Si mañana cambia la forma de publicar, solo Nando se entera. Si cambia el catálogo de productos, solo Paco se entera. Si cambia la base de datos, solo los mensajeros (Carlos y Diego) se enteran. Nadie más se rompe. Eso es SRP — Principio de Responsabilidad Única. Cada cable va a su propia toma. Si desconectas uno, los demás siguen funcionando.
                </div>
            </div>
        </div>
    );
}
