'use client';
import React, { useState, useEffect } from 'react';
import { defaultStore, StoreData, TemplateType } from '@/lib/types';
import Preview from '@/components/builder/Preview';
import Carousel3D from '@/components/saas/Carousel3D';
import RecycleBin from '@/components/saas/RecycleBin';
import { X, Globe, Link as LinkIcon, ExternalLink, CheckCircle2, Loader2, Trash2 } from 'lucide-react';


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

type Step = 1 | 2 | 3;

export default function BuilderFlow({ isAdmin }: { isAdmin?: boolean }) {
    const [step, setStep] = useState<Step>(1);
    const [template, setTemplate] = useState<TemplateType>('megamarket');
    const [pdpCategory, setPdpCategory] = useState('health');
    const [storeData, setStoreData] = useState<StoreData>({ ...defaultStore });
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

    useEffect(() => {
        fetch('/api/templates/stores')
            .then(res => res.json())
            .then(data => {
                if (data.stores) {
                    // Map DB snake_case fields to expected camelCase properties
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
        { n: 1, label: 'Elige Tienda' },
        { n: 2, label: 'Tipo de Producto' },
        { n: 3, label: 'Configura y Publica' },
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

            {/* ── STEP 1: Choose Store Template ── */}
            {step === 1 && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
                    {/* Compact header: title + search + categories all in one row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexShrink: 0, flexWrap: 'wrap' }}>
                        <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', margin: 0 }}>Elige tu tienda</h2>
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
                    {/* 3D Carousels by Category */}
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
                                            onSelect={(id) => { setTemplate(id); setStoreData(p => ({ ...p })); }}
                                            isAdmin={isAdmin}
                                            onDeleteTemplate={handleDeleteTemplate}
                                        />
                                    );
                                })
                        )}
                    </div>
                    {/* Floating continue button */}
                    <button
                        className="btn-primary"
                        style={{ position: 'absolute', bottom: 12, right: 12, padding: '10px 28px', fontSize: 14, zIndex: 20, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}
                        onClick={() => setStep(2)}
                    >
                        Continuar
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4 L10 8 L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                    </button>
                </div>
            )}

            {/* ── STEP 2: Choose PDP Category ── */}
            {step === 2 && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ marginBottom: 20, flexShrink: 0 }}>
                        <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>Elige el tipo de página de producto</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Selecciona la estrategia psicológica que mejor convierte para tu tienda.</p>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto' }} className="custom-scrollbar">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
                            {PDP_CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setPdpCategory(cat.id)}
                                    style={{
                                        padding: 20, borderRadius: 'var(--radius-md)', textAlign: 'left', cursor: 'pointer',
                                        background: pdpCategory === cat.id ? `${cat.color}14` : 'var(--bg-surface)',
                                        border: `1.5px solid ${pdpCategory === cat.id ? cat.color : 'var(--border-subtle)'}`,
                                        boxShadow: pdpCategory === cat.id ? `0 0 20px ${cat.color}30` : 'none',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color, boxShadow: `0 0 8px ${cat.color}` }} />
                                        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{cat.name}</span>
                                    </div>
                                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{cat.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', flexShrink: 0 }}>
                        <button className="btn-secondary" onClick={() => setStep(1)}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4 L6 8 L10 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                            Atrás
                        </button>
                        <button className="btn-primary" style={{ padding: '12px 32px', fontSize: 15 }} onClick={() => {
                            setStoreData(p => ({ ...p, pdpCategory: pdpCategory as StoreData['pdpCategory'], pdpTemplate: `${pdpCategory}-1` }));
                            setStep(3);
                        }}>
                            Continuar
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4 L10 8 L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                        </button>
                    </div>
                </div>
            )}

            {/* ── STEP 3: Configure & Preview ── */}
            {step === 3 && (
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
                            <button className="btn-secondary" onClick={() => setStep(2)} style={{ flex: 1 }}>Atrás</button>
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
