'use client';
import React, { useState, useEffect } from 'react';
import { defaultStore, StoreData, TemplateType } from '@/lib/types';
import Preview from '@/components/builder/Preview';
import Carousel3D from '@/components/saas/Carousel3D';
import RecycleBin from '@/components/saas/RecycleBin';
import { X, Globe, Link as LinkIcon, ExternalLink, CheckCircle2, Loader2, Trash2, Store, LayoutTemplate, MousePointerClick } from 'lucide-react';

type FlowType = 'store' | 'pdp' | null;


const PDP_CATEGORIES = [
    { id: 'urgency', name: 'Urgencia Extrema', desc: 'Escasez, contadores, stock bajo. Compras impulsivas.', color: '#f43f5e' },
    { id: 'trust', name: 'Construcción de Confianza', desc: 'Prueba social, reseñas, insignias. Alto valor.', color: '#06b6d4' },
    { id: 'bundle', name: 'Maximizador de Ofertas', desc: 'Bundles, BOGO y mayor ticket promedio.', color: '#10b981' },
    { id: 'story', name: 'Storytelling Emocional', desc: 'Copy largo, problema/solución. Innovadores.', color: '#a78bfa' },
    { id: 'direct', name: 'Cierre Directo', desc: 'Minimalista, formulario COD. Fricción cero.', color: '#f59e0b' },
    { id: 'health', name: 'Salud y Bienestar', desc: 'Diseños clínicos, beneficios y confianza.', color: '#34d399' },
    { id: 'electronics', name: 'Electrónica y Tech', desc: 'Oscuro, moderno, especificaciones técnicas.', color: '#818cf8' },
    { id: 'tools', name: 'Herramientas y Bricolaje', desc: 'Robustos, industriales, colores de advertencia.', color: '#fb923c' },
    { id: 'beauty', name: 'Belleza y Cosmética', desc: 'Elegante, tonos suaves, resultados visuales.', color: '#f472b6' },
    { id: 'home', name: 'Hogar y Decoración', desc: 'Ambientes cálidos, estilo de vida.', color: '#4ade80' },
];

const STORE_CATEGORIES = ['Todos', 'Marketplace', 'Tech', 'Moda', 'Belleza', 'Retail', 'Lujo', 'Hogar', 'Deporte', 'Accesorios'];

type Step = 1 | 2 | 3 | 4;

export default function BuilderFlow({ isAdmin }: { isAdmin?: boolean }) {
    const [step, setStep] = useState<Step>(1);
    const [flowType, setFlowType] = useState<FlowType>(null);
    const [template, setTemplate] = useState<TemplateType>('megamarket');
    const [pdpCategory, setPdpCategory] = useState<string | null>(null);
    const [storeData, setStoreData] = useState<StoreData>({ ...defaultStore, products: [] });
    const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
    const [previewMode, setPreviewMode] = useState<'store' | 'product'>('store');
    const [activeProductId, setActiveProductId] = useState<string | null>(null);
    const [catFilter, setCatFilter] = useState('Todos');
    const [search, setSearch] = useState('');

    // Publish Modal State
    const [showPublishModal, setShowPublishModal] = useState(false);
    const [storeSlug, setStoreSlug] = useState('');
    const [isPublished, setIsPublished] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [publishError, setPublishError] = useState('');

    // Dynamic Templates State
    const [storeTemplates, setStoreTemplates] = useState<any[]>([]);
    const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
    const [isRecycleBinOpen, setIsRecycleBinOpen] = useState(false);

    // PDP Templates State (cargados desde la BD)
    const [pdpTemplates, setPdpTemplates] = useState<any[]>([]);
    const [isLoadingPdpTemplates, setIsLoadingPdpTemplates] = useState(false);

    // AlmiDrop Products State
    const [almidropProducts, setAlmidropProducts] = useState<any[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [productSearch, setProductSearch] = useState('');
    const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
    const [productPage, setProductPage] = useState(1);
    const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
    const ITEMS_PER_PAGE = 24; // 6 columnas × 4 filas (Solicitado por el usuario)

    // Cargar templates de tiendas
    useEffect(() => {
        fetch('/api/templates/stores')
            .then(res => res.json())
            .then(data => {
                if (data.stores) {
                    const mapped = data.stores.map((s: any) => ({
                        id: s.id,
                        name: s.name,
                        desc: s.description,
                        category: s.category,
                        premium: s.premium
                    }));
                    setStoreTemplates(mapped);
                }
            })
            .catch(console.error)
            .finally(() => setIsLoadingTemplates(false));
    }, []);

    // Cargar templates de PDP desde la BD (Paginas_de_Productos_Reutilizables)
    useEffect(() => {
        setIsLoadingPdpTemplates(true);
        fetch('/api/templates/pdp')
            .then(res => res.json())
            .then(data => {
                if (data.pdps) {
                    const mapped = data.pdps.map((p: any) => ({
                        id: p.id,
                        name: p.name,
                        desc: p.description || '',
                        category: p.category || 'PDP',
                        preview_url: p.preview_url || p.preview_image || p.screenshot_url || null,
                        template_key: p.template_key || p.id,
                    }));
                    setPdpTemplates(mapped);
                }
            })
            .catch(console.error)
            .finally(() => setIsLoadingPdpTemplates(false));
    }, []);

    const fetchAlmiDropProducts = async (searchStr = '') => {
        setIsLoadingProducts(true);
        try {
            const res = await fetch(`/api/almidrop/products?search=${encodeURIComponent(searchStr)}`);
            const data = await res.json();
            if (data.success && data.products) {
                setAlmidropProducts(data.products);
                return data.products;
            }
        } catch (error) {
            console.error("Error fetching AlmiDrop products", error);
        } finally {
            setIsLoadingProducts(false);
        }
        return [];
    };

    // Auto-fetch products when entering the AlmiDrop products step
    useEffect(() => {
        if (step === 3 && almidropProducts.length === 0) {
            fetchAlmiDropProducts();
        }
    }, [step]);

    const toggleProductSelection = (prodId: string) => {
        setSelectedProducts(prev => {
            const next = new Set(prev);
            if (flowType === 'pdp') {
                // PDP: single selection only
                if (next.has(prodId)) { next.delete(prodId); } else { next.clear(); next.add(prodId); }
            } else {
                // Store: multi selection
                if (next.has(prodId)) { next.delete(prodId); } else { next.add(prodId); }
            }
            return next;
        });
    };

    const selectAllProducts = () => {
        if (selectedProducts.size === almidropProducts.length) {
            setSelectedProducts(new Set());
        } else {
            setSelectedProducts(new Set(almidropProducts.map(p => p.id)));
        }
    };

    const confirmProductSelection = () => {
        const chosen = almidropProducts.filter(p => selectedProducts.has(p.id));
        setStoreData(prev => ({ ...prev, products: chosen }));
        setStep(4);
    };

    const handleDeleteTemplate = async (id: string) => {
        if (!confirm('¿Seguro de que deseas mover este template a la papelera?')) return;
        try {
            const res = await fetch(`/api/templates/stores?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setStoreTemplates(prev => prev.filter(t => t.id !== id));
            } else {
                alert('No se pudo eliminar el template.');
            }
        } catch (err) {
            console.error(err);
            alert('Error al intentar eliminar');
        }
    };

    const handleRestoreTemplate = async (id: string, type: 'store' | 'pdp') => {
        try {
            const endpoint = type === 'store' ? '/api/templates/stores' : '/api/templates/pdp';
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, action: 'restore' })
            });
            if (res.ok) {
                if (type === 'store') {
                    // Refetch store templates to show restored one
                    const storesRes = await fetch('/api/templates/stores').then(r => r.json());
                    if (storesRes.stores) {
                        setStoreTemplates(storesRes.stores.map((s: any) => ({
                            id: s.id, name: s.name, desc: s.description, category: s.category, premium: s.premium
                        })));
                    }
                }
            } else {
                throw new Error('Error al restaurar');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const handleDeletePermanent = async (id: string, type: 'store' | 'pdp') => {
        try {
            const endpoint = type === 'store' ? '/api/templates/stores' : '/api/templates/pdp';
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, action: 'delete_permanent' })
            });
            if (!res.ok) throw new Error('Error al eliminar permanentemente');
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const filteredTemplates = storeTemplates.filter(t =>
        (catFilter === 'Todos' || t.category === catFilter) &&
        (search === '' || t.name.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase()))
    );

    const steps = [
        { n: 1, label: 'Tipo de Proyecto' },
        { n: 2, label: flowType === 'store' ? 'Diseño de Tienda' : 'Estrategia de Venta' },
        { n: 3, label: 'Catálogo AlmiDrop' },
        { n: 4, label: 'Configura y Publica' },
    ];

    return (
        <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: 0, height: 'calc(100vh - var(--topbar-height) - 56px)', minHeight: 600 }}>
            {/* Step Progress Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 24, background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', padding: '16px 28px', flexShrink: 0 }}>
                {steps.map((s, i) => (
                    <React.Fragment key={s.n}>
                        <button
                            onClick={() => step > s.n && setStep(s.n as Step)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                background: 'none', border: 'none', cursor: step > s.n ? 'pointer' : 'default',
                                padding: 0, opacity: step < s.n ? 0.4 : 1,
                            }}
                        >
                            <div style={{
                                width: 32, height: 32, borderRadius: '50%',
                                background: step >= s.n ? 'linear-gradient(135deg, var(--accent-primary), #4f46e5)' : 'var(--bg-elevated)',
                                border: `2px solid ${step >= s.n ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: step >= s.n ? '#fff' : 'var(--text-muted)',
                                fontSize: 13, fontWeight: 700,
                                boxShadow: step === s.n ? '0 0 16px var(--accent-glow)' : 'none',
                                transition: 'all 0.3s',
                            }}>
                                {step > s.n ? (
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7 L6 10.5 L11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                ) : s.n}
                            </div>
                            <span style={{ fontSize: 14, fontWeight: step === s.n ? 700 : 500, color: step === s.n ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{s.label}</span>
                        </button>
                        {i < steps.length - 1 && (
                            <div style={{ flex: 1, height: 2, margin: '0 16px', background: step > s.n ? 'var(--accent-primary)' : 'var(--border-subtle)', borderRadius: 2, transition: 'background 0.4s' }} />
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* ── STEP 1: Elige el Tipo de Proyecto ── */}
            {step === 1 && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, padding: 40 }}>
                    <div style={{ textAlign: 'center', maxWidth: 600 }}>
                        <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>¿Qué quieres construir hoy?</h1>
                        <p style={{ fontSize: 16, color: 'var(--text-secondary)' }}>Selecciona el formato que mejor se adapte a tu objetivo. Nos conectaremos directamente con el catálogo maestro de AlmiDrop de manera automatizada.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: '100%', maxWidth: 800 }}>
                        {/* Option A: Store */}
                        <div
                            onClick={() => {
                                setFlowType('store');
                                setStep(2);
                            }}
                            style={{
                                background: 'var(--bg-surface)', border: '2px solid', borderColor: flowType === 'store' ? 'var(--accent-primary)' : 'var(--border-subtle)',
                                borderRadius: 'var(--radius-xl)', padding: 32, cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16,
                                boxShadow: flowType === 'store' ? '0 0 0 4px rgba(79, 70, 229, 0.1), 0 20px 40px rgba(0,0,0,0.1)' : '0 10px 30px rgba(0,0,0,0.05)'
                            }}
                            className="hover:-translate-y-2 hover:border-indigo-500/50"
                        >
                            <div style={{ width: 64, height: 64, borderRadius: '20px', background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 10px 20px rgba(79, 70, 229, 0.3)' }}>
                                <Store size={32} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Crear Tienda Completa</h3>
                                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>Lanza un e-commerce entero. Importaremos automáticamente todos los productos activos del catálogo maestro para que comiences a vender en segundos.</p>
                            </div>
                        </div>

                        {/* Option B: PDP */}
                        <div
                            onClick={() => {
                                setFlowType('pdp');
                                setStep(2);
                            }}
                            style={{
                                background: 'var(--bg-surface)', border: '2px solid', borderColor: flowType === 'pdp' ? '#10b981' : 'var(--border-subtle)',
                                borderRadius: 'var(--radius-xl)', padding: 32, cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16,
                                boxShadow: flowType === 'pdp' ? '0 0 0 4px rgba(16, 185, 129, 0.1), 0 20px 40px rgba(0,0,0,0.1)' : '0 10px 30px rgba(0,0,0,0.05)'
                            }}
                            className="hover:-translate-y-2 hover:border-emerald-500/50"
                        >
                            <div style={{ width: 64, height: 64, borderRadius: '20px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 10px 20px rgba(16, 185, 129, 0.3)' }}>
                                <LayoutTemplate size={32} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Landing de Producto (PDP)</h3>
                                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>Construye un embudo de conversión enfocado en <strong>un solo producto ganador</strong>. Selecciona el artículo exacto del catálogo y aplica psicología de ventas experta.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── STEP 2: Choose Template or Category ── */}
            {step === 2 && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
                    {flowType === 'store' ? (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexShrink: 0, flexWrap: 'wrap' }}>
                                <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', margin: 0 }}>Diseño de Tienda</h2>
                                <input
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Buscar..."
                                    className="input-dark"
                                    style={{ width: 150, padding: '6px 12px', fontSize: 12 }}
                                />
                                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', flex: 1 }}>
                                    {STORE_CATEGORIES.map(c => (
                                        <button key={c} onClick={() => setCatFilter(c)} style={{
                                            padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                                            background: catFilter === c ? 'var(--accent-primary)' : 'var(--bg-elevated)',
                                            color: catFilter === c ? '#fff' : 'var(--text-secondary)',
                                            border: `1px solid ${catFilter === c ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                                            transition: 'all 0.2s',
                                        }}>{c}</button>
                                    ))}
                                </div>
                                {isAdmin && (
                                    <button
                                        onClick={() => setIsRecycleBinOpen(true)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 6,
                                            padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                                            background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444',
                                            border: '1px solid rgba(239, 68, 68, 0.2)',
                                            cursor: 'pointer', transition: 'all 0.2s',
                                            marginLeft: 'auto'
                                        }}
                                        className="hover:bg-red-500 hover:text-white"
                                    >
                                        <Trash2 size={14} />
                                        Papelera
                                    </button>
                                )}
                            </div>
                            <div style={{ flex: 1, overflowY: 'auto', marginRight: '-8px', paddingRight: 8, paddingBottom: 60 }} className="custom-scrollbar">
                                {isLoadingTemplates ? (
                                    <div className="flex items-center justify-center h-full">
                                        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                                    </div>
                                ) : (
                                    (catFilter === 'Todos' ? STORE_CATEGORIES.filter(c => c !== 'Todos') : [catFilter])
                                        .map(cat => {
                                            const items = storeTemplates.filter(t =>
                                                t.category === cat &&
                                                (search === '' || t.name.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase()))
                                            );
                                            if (items.length === 0) return null;
                                            return (
                                                <Carousel3D
                                                    key={cat}
                                                    category={cat}
                                                    items={items}
                                                    selectedId={template}
                                                    onSelect={(id) => { setTemplate(id); }}
                                                    onConfirmSelect={(id) => {
                                                        setTemplate(id);
                                                        setStep(3); // Both flows go to AlmiDrop product selection
                                                    }}
                                                    isAdmin={isAdmin}
                                                    onDeleteTemplate={handleDeleteTemplate}
                                                />
                                            );
                                        })
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexShrink: 0 }}>
                                <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Páginas de Producto Disponibles</h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: 0 }}>Selecciona la página de producto que quieres usar. Arrastra o usa las flechas para explorar.</p>
                                {isLoadingPdpTemplates && <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Cargando...</span>}
                                {!isLoadingPdpTemplates && <span style={{ fontSize: 12, color: 'var(--accent-primary)', fontWeight: 600 }}>{pdpTemplates.length} disponibles</span>}
                            </div>
                            <div style={{ flex: 1, overflowY: 'auto' }} className="custom-scrollbar">
                                {pdpTemplates.length > 0 ? (
                                    // Agrupar PDPs por categoría, igual que las tiendas
                                    (Array.from(new Set(pdpTemplates.map(t => t.category))).sort()).map(cat => {
                                        const items = pdpTemplates.filter(t => t.category === cat);
                                        return (
                                            <Carousel3D
                                                key={cat}
                                                category={cat}
                                                items={items}
                                                selectedId={template}
                                                onSelect={(id) => setTemplate(id)}
                                                onConfirmSelect={(id) => {
                                                    setTemplate(id);
                                                    const chosen = pdpTemplates.find(t => t.id === id);
                                                    setStoreData(p => ({
                                                        ...p,
                                                        pdpCategory: (chosen?.category || 'direct') as StoreData['pdpCategory'],
                                                        pdpTemplate: chosen?.template_key || id,
                                                    }));
                                                    setStep(4); // ← Ir directamente al paso 4 (configurar PDP)
                                                }}
                                                isPdp={false} // Usar modo tienda para mostrar screenshots reales
                                                pdpScreenshotBase="/pdp-screenshots/"
                                            />
                                        );
                                    })
                                ) : (
                                    !isLoadingPdpTemplates && (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300, gap: 12, color: 'var(--text-muted)' }}>
                                            <span style={{ fontSize: 40 }}>📄</span>
                                            <p style={{ margin: 0, fontWeight: 600 }}>No hay páginas de producto disponibles aún.</p>
                                        </div>
                                    )
                                )}
                            </div>
                        </>
                    )}

                    {/* Floating continue/back buttons for Step 2 */}
                    <div style={{ position: 'absolute', bottom: 12, right: 12, left: 12, display: 'flex', justifyContent: 'space-between', zIndex: 20, pointerEvents: 'none' }}>
                        <button className="btn-secondary" style={{ pointerEvents: 'auto', padding: '10px 24px', boxShadow: '0 8px 30px rgba(0,0,0,0.2)', background: 'var(--bg-base)' }} onClick={() => setStep(1)}>
                             Atrás
                        </button>
                        <button
                            className="btn-primary"
                            style={{ padding: '10px 28px', fontSize: 14, boxShadow: '0 8px 30px rgba(0,0,0,0.3)', pointerEvents: 'auto' }}
                            disabled={flowType === 'pdp' && !pdpCategory}
                            onClick={() => {
                                if (flowType === 'pdp') {
                                    setStoreData(p => ({ ...p, pdpCategory: pdpCategory as StoreData['pdpCategory'], pdpTemplate: `${pdpCategory}-1` }));
                                }
                                setStep(3);
                            }}
                        >
                            Seleccionar Productos de AlmiDrop
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 8 }}><path d="M6 4 L10 8 L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                        </button>
                    </div>
                </div>
            )}

            {/* ── STEP 3: Selección de Productos de AlmiDrop ── */}
            {step === 3 && (() => {
                const totalProducts = almidropProducts.length;
                const totalPages = Math.max(1, Math.ceil(totalProducts / ITEMS_PER_PAGE));
                const paginatedProducts = almidropProducts.slice((productPage - 1) * ITEMS_PER_PAGE, productPage * ITEMS_PER_PAGE);
                return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
                    {/* Header */}
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                        <div>
                            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <MousePointerClick className="w-5 h-5 text-indigo-500" />
                                {flowType === 'pdp' ? 'Selecciona Tu Producto Estrella' : 'Catálogo Maestro AlmiDrop'}
                                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginLeft: 4 }}>
                                    ({totalProducts} producto{totalProducts !== 1 ? 's' : ''} disponible{totalProducts !== 1 ? 's' : ''})
                                </span>
                            </h2>
                            <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-secondary)' }}>
                                {flowType === 'pdp'
                                    ? 'Elige exactamente UN producto del catálogo para tu Landing Page.'
                                    : 'Selecciona uno, varios o todos los productos para tu tienda.'}
                            </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ position: 'relative' }}>
                                <input
                                    value={productSearch}
                                    onChange={e => setProductSearch(e.target.value)}
                                    onKeyDown={e => { if (e.key === 'Enter') { fetchAlmiDropProducts(productSearch); setProductPage(1); } }}
                                    placeholder="Buscar productos..."
                                    className="input-dark"
                                    style={{ width: 200, padding: '7px 12px 7px 32px', fontSize: 13 }}
                                />
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                            </div>
                            <button onClick={() => { fetchAlmiDropProducts(productSearch); setProductPage(1); }} className="btn-secondary" style={{ padding: '7px 14px', fontSize: 13 }}>Buscar</button>
                            {flowType === 'store' && (
                                <button
                                    onClick={selectAllProducts}
                                    className="btn-secondary"
                                    style={{ padding: '7px 14px', fontSize: 13, fontWeight: 700 }}
                                >
                                    {selectedProducts.size === almidropProducts.length && almidropProducts.length > 0 ? 'Deseleccionar Todo' : 'Seleccionar Todo'}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Products Grid — AlmiDrop-style cards */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }} className="custom-scrollbar">
                        {isLoadingProducts ? (
                            <div className="flex flex-col items-center justify-center h-full gap-4 text-zinc-400">
                                <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
                                <p className="font-medium">Conectando con el catálogo maestro de AlmiDrop...</p>
                            </div>
                        ) : almidropProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-3">
                                <Store className="w-14 h-14 opacity-40" />
                                <p className="text-base">No se encontraron productos activos en AlmiDrop.</p>
                                <button onClick={() => fetchAlmiDropProducts()} className="btn-secondary" style={{ padding: '8px 16px' }}>Reintentar</button>
                            </div>
                        ) : (
                            <>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.75rem', width: '100%' }}>
                                    {paginatedProducts.map(prod => {
                                        const isSelected = selectedProducts.has(prod.id);
                                        const isHovered = hoveredProductId === prod.id;
                                        return (
                                            <div
                                                key={prod.id}
                                                onClick={() => toggleProductSelection(prod.id)}
                                                onMouseEnter={() => setHoveredProductId(prod.id)}
                                                onMouseLeave={() => setHoveredProductId(null)}
                                                style={{
                                                    overflow: 'hidden',
                                                    border: isSelected ? '2px solid #6366f1' : '1px solid var(--border-subtle)',
                                                    padding: 0,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    height: '100%',
                                                    position: 'relative',
                                                    cursor: 'pointer',
                                                    borderRadius: 'var(--radius-lg)',
                                                    background: 'var(--bg-base)',
                                                    transition: 'all 0.2s ease',
                                                    boxShadow: isSelected ? '0 0 20px rgba(99, 102, 241, 0.25)' : isHovered ? '0 4px 16px rgba(0,0,0,0.15)' : 'none',
                                                    transform: isSelected ? 'scale(1.02)' : isHovered ? 'translateY(-2px)' : 'none',
                                                }}
                                            >
                                                {/* Selection badge */}
                                                {isSelected && (
                                                    <div style={{
                                                        position: 'absolute', top: '0.4rem', left: '0.4rem', zIndex: 3,
                                                        width: 26, height: 26, borderRadius: '50%',
                                                        background: '#6366f1',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        boxShadow: '0 2px 8px rgba(99, 102, 241, 0.4)',
                                                    }}>
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                                    </div>
                                                )}

                                                {/* Imagen — 130px AlmiDrop style */}
                                                <div style={{ height: 130, background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                                                    {prod.imageUrl ? (
                                                        <img src={prod.imageUrl} alt={prod.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }} />
                                                    ) : (
                                                        <Store className="w-8 h-8 text-zinc-600 opacity-30" />
                                                    )}
                                                </div>

                                                {/* Contenido — AlmiDrop style */}
                                                <div style={{ padding: '0.65rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                    {/* Categoría */}
                                                    <div style={{ fontSize: '0.6rem', fontWeight: 600, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.04em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '0.15rem' }}>
                                                        {prod.category || 'General'}
                                                    </div>

                                                    {/* Nombre — 2 líneas con clamp */}
                                                    <h3 style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem', lineHeight: 1.25, height: '2rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', color: 'var(--text-primary)', margin: '0 0 0.35rem' }}>
                                                        {prod.title}
                                                    </h3>

                                                    {/* Precios — AlmiDrop dual style */}
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem', gap: '0.4rem' }}>
                                                        <div style={{ minWidth: 0 }}>
                                                            <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', lineHeight: 1.2 }}>Precio</div>
                                                            <div style={{ fontSize: '0.75rem', fontWeight: 800, lineHeight: 1.3, whiteSpace: 'nowrap', color: 'var(--text-primary)' }}>{prod.price}</div>
                                                        </div>
                                                        <div style={{ textAlign: 'right', minWidth: 0 }}>
                                                            <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', lineHeight: 1.2 }}>P. Público</div>
                                                            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#10b981', lineHeight: 1.3, whiteSpace: 'nowrap' }}>{prod.originalPrice}</div>
                                                        </div>
                                                    </div>

                                                    {/* Botón de selección */}
                                                    <div style={{ marginTop: 'auto' }}>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); toggleProductSelection(prod.id); }}
                                                            style={{
                                                                width: '100%', padding: '0.4rem', borderRadius: 8,
                                                                border: isSelected ? 'none' : '1px solid #6366f1',
                                                                background: isSelected ? '#6366f1' : 'transparent',
                                                                color: isSelected ? '#fff' : '#6366f1',
                                                                fontWeight: 700, fontSize: '0.7rem', cursor: 'pointer',
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
                                                                transition: 'all 0.2s'
                                                            }}
                                                        >
                                                            <CheckCircle2 size={13} />
                                                            {isSelected ? 'Seleccionado' : 'Seleccionar'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Paginación — AlmiDrop style */}
                                {totalPages > 1 && (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem', paddingBottom: 4 }}>
                                        <button
                                            onClick={() => setProductPage(p => Math.max(1, p - 1))}
                                            disabled={productPage === 1}
                                            style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', color: 'var(--text-primary)', cursor: productPage === 1 ? 'default' : 'pointer', opacity: productPage === 1 ? 0.4 : 1, fontWeight: 600, fontSize: '0.85rem' }}
                                        >
                                            ← Anterior
                                        </button>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Página {productPage} de {totalPages}</span>
                                        <button
                                            onClick={() => setProductPage(p => Math.min(totalPages, p + 1))}
                                            disabled={productPage === totalPages}
                                            style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', color: 'var(--text-primary)', cursor: productPage === totalPages ? 'default' : 'pointer', opacity: productPage === totalPages ? 0.4 : 1, fontWeight: 600, fontSize: '0.85rem' }}
                                        >
                                            Siguiente →
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Footer with actions */}
                    <div style={{ padding: '14px 24px', borderTop: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, background: 'var(--bg-surface)' }}>
                        <button className="btn-secondary" onClick={() => setStep(2)} style={{ padding: '10px 24px' }}>← Atrás</button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600 }}>
                                {selectedProducts.size} de {totalProducts} producto{selectedProducts.size !== 1 ? 's' : ''} seleccionado{selectedProducts.size !== 1 ? 's' : ''}
                            </span>
                            <button
                                className="btn-primary"
                                disabled={selectedProducts.size === 0}
                                style={{ padding: '10px 28px', fontSize: 14, opacity: selectedProducts.size === 0 ? 0.5 : 1 }}
                                onClick={confirmProductSelection}
                            >
                                Continuar con {selectedProducts.size} producto{selectedProducts.size !== 1 ? 's' : ''}
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 8 }}><path d="M6 4 L10 8 L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
                );
            })()}

            {/* ── STEP 4: Configure & Preview ── */}
            {step === 4 && (
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '360px 1fr', gap: 20, overflow: 'hidden' }}>
                    {/* Config Panel */}
                    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <div style={{ padding: '20px 20px 14px', borderBottom: '1px solid var(--border-subtle)', flexShrink: 0 }}>
                            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>Configuración</h3>
                            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Template: <span style={{ color: 'var(--accent-bright)', fontWeight: 600 }}>{template}</span> · Producto: <span style={{ color: '#34d399', fontWeight: 600 }}>{pdpCategory}</span></p>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }} className="custom-scrollbar">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div>
                                    <label className="label-dark">Nombre de la tienda</label>
                                    <input className="input-dark" value={storeData.name} onChange={e => setStoreData(p => ({ ...p, name: e.target.value }))} />
                                </div>
                                <div>
                                    <label className="label-dark">Texto del Logo</label>
                                    <input className="input-dark" value={storeData.logoText} onChange={e => setStoreData(p => ({ ...p, logoText: e.target.value }))} />
                                </div>
                                <div>
                                    <label className="label-dark">Descripción de la tienda</label>
                                    <textarea className="input-dark" value={storeData.description} onChange={e => setStoreData(p => ({ ...p, description: e.target.value }))} rows={3} style={{ resize: 'none' }} />
                                </div>
                                <div>
                                    <label className="label-dark">URL del Banner</label>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <input className="input-dark" value={storeData.bannerImage} onChange={e => setStoreData(p => ({ ...p, bannerImage: e.target.value }))} style={{ flex: 1 }} />
                                        <button className="btn-secondary" style={{ padding: '0 12px', flexShrink: 0 }} onClick={() => setStoreData(p => ({ ...p, bannerImage: `https://picsum.photos/1200/400?random=${Math.floor(Math.random() * 999)}` }))}>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12 L5 9 M9 5 L12 2 M7 7 C7 7 7 4 9 4 C11 4 11 2 11 2 M7 7 C7 7 4 7 4 9 C4 11 2 11 2 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                                        </button>
                                    </div>
                                </div>

                                {/* CRO Toggles */}
                                <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', padding: 16, border: '1px solid var(--border-subtle)' }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Herramientas CRO</div>
                                    {([
                                        ['liveViewers', 'Espectadores en vivo'],
                                        ['recentSales', 'Notificaciones de ventas'],
                                        ['scarcityTimer', 'Temporizador de escasez'],
                                        ['stickyButton', 'Botón flotante de compra'],
                                    ] as const).map(([key, label]) => (
                                        <label key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, cursor: 'pointer' }}>
                                            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
                                            <div
                                                className={`toggle-track ${storeData.pdpFeatures?.[key] ? 'on' : ''}`}
                                                onClick={() => setStoreData(p => ({ ...p, pdpFeatures: { ...p.pdpFeatures, [key]: !p.pdpFeatures?.[key] } }))}
                                            >
                                                <div className="toggle-thumb" />
                                            </div>
                                        </label>
                                    ))}
                                </div>

                                {/* Products quick add */}
                                <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                    Productos ({storeData.products.length})
                                </div>
                                <button
                                    onClick={() => setStoreData(p => ({ ...p, products: [{ id: Math.random().toString(36).slice(2), title: 'Nuevo Producto', description: 'Descripción', price: '$0', originalPrice: '$0', imageUrl: `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 999)}`, category: 'General', rating: 5, reviews: 0 }, ...p.products] }))}
                                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: '2px dashed var(--border-default)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all 0.2s' }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1 V13 M1 7 H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                                    Añadir producto
                                </button>
                            </div>
                        </div>
                        {/* Actions */}
                        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: 10, flexShrink: 0 }}>
                            <button className="btn-secondary" onClick={() => setStep(3)} style={{ flex: 1 }}>Atrás</button>
                            <button
                                className="btn-primary"
                                style={{ flex: 2 }}
                                onClick={() => setShowPublishModal(true)}
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12 L5 9 M9 5 L12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M1 13 L4 10 L3 11 M7 7 L10 4" stroke="none" /><circle cx="11" cy="3" r="2" stroke="currentColor" strokeWidth="1.5" /></svg>
                                Publicar Tienda
                            </button>
                        </div>
                    </div>

                    {/* Preview Panel */}
                    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <Preview
                            data={storeData.products?.length ? storeData : defaultStore}
                            template={template}
                            device={device}
                            setDevice={setDevice}
                            previewMode={previewMode}
                            setPreviewMode={setPreviewMode}
                            activeProductId={activeProductId}
                            setActiveProductId={setActiveProductId}
                            isPremium={storeTemplates.find(t => t.id === template)?.premium}
                        />
                    </div>
                </div>
            )}

            {/* Publish Modal */}
            {showPublishModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                    <div style={{ background: 'var(--bg-base)', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: 480, overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', animation: 'slideUp 0.3s ease-out forwards' }}>
                        <div style={{ padding: '24px 24px 20px', borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Publicar Tienda</h3>
                                    <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-secondary)' }}>Personaliza el enlace de tu nueva landing page.</p>
                                </div>
                            </div>
                            <button onClick={() => { setShowPublishModal(false); setIsPublished(false); }} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'all 0.2s' }} className="hover:bg-zinc-100 hover:text-zinc-900">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div style={{ padding: 24 }}>
                            {!isPublished ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>URL de la tienda</label>
                                        <div style={{ display: 'flex', alignItems: 'stretch', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', overflow: 'hidden', transition: 'border-color 0.2s' }} className="focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                                            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', padding: '0 12px', borderRight: '1px solid var(--border-default)', color: 'var(--text-secondary)', fontSize: 14 }}>
                                                <LinkIcon className="w-4 h-4 mr-2" />
                                                landingcod.com/t/
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="mitienda"
                                                value={storeSlug}
                                                onChange={(e) => setStoreSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                                style={{ flex: 1, padding: '12px 14px', border: 'none', background: 'var(--bg-base)', color: 'var(--text-primary)', fontSize: 14, outline: 'none' }}
                                                autoFocus
                                            />
                                        </div>
                                        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>Solo usa letras, números y guiones. Ejemplo: tienda-oficial</p>
                                    </div>

                                    {publishError && (
                                        <div style={{ padding: '10px 14px', background: '#fee2e2', color: '#b91c1c', borderRadius: 'var(--radius-md)', fontSize: 13, border: '1px solid #fca5a5' }}>
                                            {publishError}
                                        </div>
                                    )}

                                    <button
                                        className="btn-primary"
                                        disabled={storeSlug.length < 3 || isPublishing}
                                        style={{ width: '100%', padding: '14px', fontSize: 15, opacity: (storeSlug.length < 3 || isPublishing) ? 0.5 : 1, cursor: (storeSlug.length < 3 || isPublishing) ? 'not-allowed' : 'pointer' }}
                                        onClick={async () => {
                                            setIsPublishing(true);
                                            setPublishError('');
                                            try {
                                                const res = await fetch('/api/tiendas', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        identificador_url: storeSlug,
                                                        storeData,
                                                        template
                                                    })
                                                });
                                                const data = await res.json();

                                                if (res.ok && data.success) {
                                                    // También guardamos en localStorage para referencia offline si quieren
                                                    localStorage.setItem('landing_preview_data', JSON.stringify({ store: storeData, template, slug: storeSlug }));
                                                    setIsPublished(true);
                                                } else {
                                                    setPublishError(data.error || 'Ocurrió un error al publicar la tienda.');
                                                }
                                            } catch (err) {
                                                setPublishError('Error de red al intentar conectar con el servidor.');
                                            } finally {
                                                setIsPublishing(false);
                                            }
                                        }}
                                    >
                                        {isPublishing ? (
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                Publicando...
                                            </span>
                                        ) : 'Generar URL y Publicar'}
                                    </button>
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <h4 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px' }}>¡Tienda publicada con éxito!</h4>
                                    <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: '0 0 24px' }}>Tu nueva landing page está en vivo y lista para recibir clientes.</p>

                                    <div style={{ background: 'var(--bg-surface)', border: '1px dashed var(--border-default)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: 24, userSelect: 'all' }}>
                                        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tu enlace público</div>
                                        <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--accent-primary)', wordBreak: 'break-all' }}>https://landingcod.com/t/{storeSlug || 'preview'}</div>
                                    </div>

                                    <button
                                        className="btn-primary"
                                        style={{ width: '100%', padding: '14px', fontSize: 15 }}
                                        onClick={() => {
                                            window.open(`/t/${storeSlug}`, '_blank');
                                            setShowPublishModal(false);
                                            setIsPublished(false);
                                        }}
                                    >
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Visitar Tienda en Vivo
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {/* Recycle Bin Side Panel */}
            <RecycleBin 
                isOpen={isRecycleBinOpen}
                onClose={() => setIsRecycleBinOpen(false)}
                onRestore={handleRestoreTemplate}
                onDeletePermanent={handleDeletePermanent}
            />
        </div>
    );
}
