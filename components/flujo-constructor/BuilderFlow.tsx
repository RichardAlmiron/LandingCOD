'use client';
// ── Responsabilidad única: orquestar el flujo del builder ──
// Este componente NO contiene lógica de negocio. Solo compone hooks y componentes.

import React, { useState, useEffect, useRef } from 'react';
import { StoreData, TemplateType, PdpTemplate } from '@/lib/types';
import Preview from '@/components/constructor-visual/Preview';
import DynamicPDPDisplay from '@/components/panel-de-administracion/DynamicPDPDisplay';
import StoreDynamicDisplay from '@/components/visualizacion/StoreDynamicDisplay';
import { AlmiCatalogGrid, AlmiProductModal, ExpressStockBar } from '@/components/integracion-almidrop';
import { useExpressStock } from '@/hooks/useExpressStock';
import { X, Globe, Link as LinkIcon, ExternalLink, CheckCircle2, Loader2, Store, LayoutTemplate, MousePointerClick, Check } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import StoreSearchBar from '@/components/componentes-compartidos/StoreSearchBar';
import StudioLaunchSequence from '@/components/flujo-constructor/StudioLaunchSequence';
import StepCinematicTransition from '@/components/flujo-constructor/StepCinematicTransition';
import dynamic from 'next/dynamic';
import { useBuilderStep } from '@/hooks/useBuilderStep';
import { useBuilderTemplates } from '@/hooks/useBuilderTemplates';
import { useBuilderProducts } from '@/hooks/useBuilderProducts';
import { useBuilderDraft } from '@/hooks/useBuilderDraft';
import { useBuilderPublish } from '@/hooks/useBuilderPublish';
import { builderApi } from '@/lib/builder-api';
const VisualEditorOverlay = dynamic(() => import('@/components/editor-visual/VisualEditorOverlay'), { ssr: false });

type Step = 1 | 2 | 3 | 4;

export default function BuilderFlow() {
    const { user, loading: authLoading } = useAuth();
    const [isHydrated, setIsHydrated] = useState(false);
    const [template, setTemplate] = useState<TemplateType>('megamarket');
    const [storeData, setStoreData] = useState<StoreData>({ 
        name: '',
        description: '',
        logoText: '',
        bannerImage: '',
        products: [],
        pdpTemplate: 'standard-urgencia',
        model: 'marketplace',
        productPageType: 'standard',
        pdpFeatures: { liveViewers: true, recentSales: true, scarcityTimer: true, stickyButton: true },
        discountConfig: { globalDiscount: { enabled: false, percentage: 0 }, perProductDiscount: { enabled: false } }
    });
    const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
    const [previewMode, setPreviewMode] = useState<'store' | 'product'>('store');
    const [activeProductId, setActiveProductId] = useState<string | null>(null);
    const [showVisualEditor, setShowVisualEditor] = useState(false);
    const [isLoadingEditor, setIsLoadingEditor] = useState(false);
    const [showPdpSelectorModal, setShowPdpSelectorModal] = useState(false);
    const [useLivePreview, setUseLivePreview] = useState(false);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [selectedCategoria, setSelectedCategoria] = useState<string>('');
    const [aiGenerating, setAiGenerating] = useState(false);
    const [aiProgress, setAiProgress] = useState('');

    // ── Hooks con responsabilidad única ──
    const builderStep = useBuilderStep();
    const { step, setStep, flowType, setFlowType, transition, showEntry, goTo, completeTransition, completeEntry } = builderStep;

    const builderTemplates = useBuilderTemplates();
    const { storeTemplates, pdpTemplates, categorias: categoriasPDP, loading: isLoadingTemplates } = builderTemplates;

    const builderProducts = useBuilderProducts(flowType);
    const draft = useBuilderDraft(user?.id);
    const publish = useBuilderPublish();

    // Favorites hook
    const { favorites, count: favoritesCount, toggleFavorite, isFavorite } = useFavorites();

    // Express Stock Hook
    const { cities, citiesLoading, selectedCity, setSelectedCity, selectedCities, setSelectedCities, stockIds, isExpressMode } = useExpressStock();

    // Hidratación + detección de borrador
    useEffect(() => {
        if (authLoading || !user) {
            if (!authLoading && !user) setIsHydrated(true);
            return;
        }
        setIsHydrated(true);
    }, [authLoading, user]);

    // Restaurar borrador
    const loadDraft = () => {
        const d = draft.draftData;
        if (d) {
            if (d.current_step) builderStep.setStep(d.current_step as Step);
            if (d.flow_type) setFlowType(d.flow_type);
            if (d.template) setTemplate(d.template as TemplateType);
            if (d.store_data) setStoreData(d.store_data as StoreData);
            if (d.selected_products) builderProducts.selected; // selección se restaura vía reset
            if (d.current_step === 4) setShowVisualEditor(true);
        }
        draft.accept();
    };

    // Autosave en paso 4
    useEffect(() => {
        if (!user || step !== 4 || !showVisualEditor) return;
        draft.save({
            current_step: step,
            flow_type: flowType,
            template,
            store_data: storeData,
            selected_products: Array.from(builderProducts.selected),
        });
    }, [step, flowType, template, storeData, builderProducts.selected, user, showVisualEditor]);

    // Sincronizar previewMode con flowType
    useEffect(() => {
        if (flowType === 'pdp') {
            setPreviewMode('product');
            if (storeData.products.length > 0) {
                const first = storeData.products[0];
                if (first?.id) setActiveProductId(first.id);
            }
        } else {
            setPreviewMode('store');
            setActiveProductId(null);
        }
    }, [flowType, storeData.products]);

    // Auto-fetch productos al entrar al paso 3
    useEffect(() => {
        if (step === 3 && builderProducts.products.length === 0) {
            builderProducts.fetch();
        }
    }, [step]);

    // Auto-seleccionar primera categoría cuando cargan
    useEffect(() => {
        if (categoriasPDP.length > 0 && !selectedCategoria) {
            setSelectedCategoria(categoriasPDP[0].nombre);
        }
    }, [categoriasPDP]);

    const confirmProductSelection = async () => {
        const chosen = builderProducts.products.filter(p => builderProducts.selected.has(p.id));
        
        // ── Generar copywriting con IA antes de pasar a etapa 4 ──
        setAiGenerating(true);
        setAiProgress('Analizando producto...');
        
        const enhancedProducts = await Promise.all(
            chosen.map(async (product, idx) => {
                try {
                    setAiProgress(chosen.length > 1 
                        ? `Generando copy IA (${idx + 1}/${chosen.length})...` 
                        : 'Generando página de ventas con IA...');
                    
                    const result = await builderApi.generateAICopy(product);
                    
                    if (result.success && result.content) {
                        const ai = result.content;
                        // Seleccionar máximo 4 miniaturas (originales primero, luego editadas)
                        const heroImg = (ai.mediaStrategy?.heroImages?.[0]) || product.imageUrl;
                        const thumbs = [
                            ...(product.original_images || []),
                            ...(product.edited_images || []),
                        ].filter(img => img && img !== heroImg).slice(0, 4);

                        return {
                            ...product,
                            title: ai.enhancedTitle || product.title,
                            description: ai.enhancedDescription || product.description,
                            imageUrl: heroImg,
                            images: [heroImg, ...thumbs],
                            original_images: [heroImg],
                            edited_images: thumbs,
                            videos: [], // Videos desactivados
                            aiContent: {
                                enhancedTitle: ai.enhancedTitle,
                                enhancedDescription: ai.enhancedDescription,
                                tagline: ai.tagline,
                                niche: ai.niche,
                                storytelling: ai.storytelling,
                                authority: ai.authority,
                                comparison: ai.comparison,
                                faq: ai.faq,
                                testimonials: ai.testimonials,
                                sections: ai.sections,
                                mediaStrategy: ai.mediaStrategy,
                                _meta: ai._meta,
                            },
                        };
                    }
                    return product;
                } catch (err) {
                    console.error('[AI Copy] Error para producto:', product.title, err);
                    return product;
                }
            })
        );
        
        setAiProgress('Preparando página de ventas...');
        setStoreData(prev => ({ ...prev, products: enhancedProducts }));
        setAiGenerating(false);
        setAiProgress('');
        
        goTo(4, 'Etapa 4', 'Configura y Publica', {
            minDuration: 2000,
            accentColor: '#f59e0b',
            pendingAction: () => { setIsLoadingEditor(true); setShowVisualEditor(true); },
        });
    };

    const isStepDataReady = (): boolean => {
        if (!transition) return true;
        if (transition.targetStep === 2) return !isLoadingTemplates;
        if (transition.targetStep === 3) return !builderProducts.loading && builderProducts.products.length > 0;
        return true;
    };

    const filteredTemplates = storeTemplates.filter((t: any) =>
        (builderProducts.search === '' || t.name.toLowerCase().includes(builderProducts.search.toLowerCase())) &&
        (!showFavoritesOnly || favorites.has(t.id))
    );

    const steps = [
        { n: 1, label: 'Tipo de Proyecto' },
        { n: 2, label: flowType === 'store' ? 'Diseño de Tienda' : 'Estrategia de Venta' },
        { n: 3, label: 'Catálogo de Productos' },
        { n: 4, label: 'Configura y Publica' },
    ];

    return (
        <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: 0, height: 'calc(100vh - var(--topbar-height) - 56px)', minHeight: 600 }}>

            {draft.showPrompt && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 999999, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{
                        background: 'var(--bg-card)', padding: 40, borderRadius: 24, maxWidth: 500, width: '90%',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', border: '1px solid var(--border-subtle)',
                        textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 20
                    }}>
                        <div style={{ width: 64, height: 64, background: 'rgba(79, 70, 229, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                            <Store className="w-8 h-8 text-indigo-500" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>Trabajo sin guardar detectado</h3>
                            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                Encontramos datos recientes de una tienda que estabas diseñando y que no alcanzaste a guardar. ¿Te gustaría volver al punto exacto donde lo dejaste?
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                            <button onClick={draft.discard} style={{ flex: 1, padding: '14px 24px', background: 'transparent', border: '1px solid var(--border-subtle)', borderRadius: 12, color: 'var(--text-primary)', fontWeight: 600, transition: 'all 0.2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.background = 'var(--bg-hover)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                                Descartar y empezar de cero
                            </button>
                            <button onClick={loadDraft} style={{ flex: 1, padding: '14px 24px', background: 'var(--accent-primary)', border: 'none', borderRadius: 12, color: '#ffffff', fontWeight: 600, transition: 'all 0.2s', cursor: 'pointer', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                                Continuar editando
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading state while loading from database */}
            {!isHydrated && (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
                </div>
            )}

            {/* ── STEP 1: Elige el Tipo de Proyecto ── */}
            {isHydrated && step === 1 && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, padding: 40, position: 'relative' }}>
                    <div style={{ textAlign: 'center', maxWidth: 600 }}>
                        <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>¿Qué quieres construir hoy?</h1>
                        <p style={{ fontSize: 16, color: 'var(--text-secondary)' }}>Selecciona el formato que mejor se adapte a tu objetivo. Nos conectaremos directamente con el catálogo maestro de AlmiDrop de manera automatizada.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: '100%', maxWidth: 800 }}>
                        {/* Option A: Store */}
                        <div
                            onClick={() => {
                                setFlowType('store');
                                goTo(2, 'Etapa 2', 'Selección de Diseño de Tienda', { minDuration: 2000, accentColor: '#6366f1' });
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
                                goTo(2, 'Etapa 2', 'Estrategia de Venta', { minDuration: 2000, accentColor: '#10b981' });
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
            {isHydrated && step === 2 && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
                    
                    {flowType === 'store' ? (
                        <>
                            {/* Header unificado compacto con steps y categorías */}
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 12, 
                                marginBottom: 12, 
                                flexShrink: 0, 
                                padding: '8px 16px', 
                                background: 'var(--bg-surface)', 
                                borderRadius: 'var(--radius-lg)', 
                                border: '1px solid var(--border-subtle)',
                                height: 48
                            }}>
                                {/* Steps compactos */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                                    {steps.map((s, i) => (
                                        <React.Fragment key={s.n}>
                                            <button
                                                onClick={() => step > s.n && setStep(s.n as Step)}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: 6,
                                                    background: 'none', border: 'none', cursor: step > s.n ? 'pointer' : 'default',
                                                    padding: 0, opacity: step < s.n ? 0.4 : 1,
                                                }}
                                            >
                                                <div style={{
                                                    width: 24, height: 24, borderRadius: '50%',
                                                    background: step >= s.n ? 'linear-gradient(135deg, var(--accent-primary), #4f46e5)' : 'var(--bg-elevated)',
                                                    border: `2px solid ${step >= s.n ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: step >= s.n ? '#fff' : 'var(--text-muted)',
                                                    fontSize: 11, fontWeight: 700,
                                                    boxShadow: step === s.n ? '0 0 8px var(--accent-glow)' : 'none',
                                                }}>
                                                    {s.n}
                                                </div>
                                                <span style={{ 
                                                    fontSize: 12, 
                                                    fontWeight: step === s.n ? 700 : 500, 
                                                    color: step === s.n ? 'var(--text-primary)' : 'var(--text-secondary)',
                                                    whiteSpace: 'nowrap'
                                                }}>{s.label}</span>
                                            </button>
                                            {i < steps.length - 1 && (
                                                <div style={{ width: 16, height: 2, background: step > s.n ? 'var(--accent-primary)' : 'var(--border-subtle)', borderRadius: 1 }} />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>

                                <div style={{ width: 1, height: 24, background: 'var(--border-subtle)', margin: '0 4px' }} />
                                
                                {/* Título y contador */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                                    <h2 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Diseño de Tienda</h2>
                                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>({filteredTemplates.length})</span>
                                </div>
                                
                                {/* Buscador + Favoritos */}
                                <StoreSearchBar
                                    value={builderProducts.search}
                                    onChange={builderProducts.setSearch}
                                    templates={storeTemplates.map((t: any) => ({ id: t.id, name: t.name }))}
                                    favoritesCount={favoritesCount}
                                    showFavoritesOnly={showFavoritesOnly}
                                    onToggleFavorites={() => setShowFavoritesOnly(prev => !prev)}
                                />
                                
                            </div>
                            
                            {/* Visualization Area - Extended to footer */}
                            <div style={{ flex: 1, overflow: 'hidden', position: 'relative', minHeight: 0, marginTop: -12 }}>
                                {isLoadingTemplates ? (
                                    <div className="flex items-center justify-center h-full">
                                        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                                    </div>
                                ) : (
                                    <StoreDynamicDisplay
                                        mode="filmstrip"
                                        items={filteredTemplates}
                                        selectedId={template}
                                        onSelect={(id) => { setTemplate(id as TemplateType); }}
                                        onConfirmSelect={(id) => {
                                            setTemplate(id as TemplateType);
                                            goTo(3, 'Etapa 3', 'Catálogo de Productos', { minDuration: 2000, accentColor: '#00f3ff' });
                                        }}
                                        favorites={favorites}
                                        onToggleFavorite={toggleFavorite}
                                    />
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexShrink: 0, flexWrap: 'wrap' }}>
                                <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', margin: 0 }}>Páginas de Producto</h2>
                                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>({pdpTemplates.length} plantillas disponibles)</span>
                                
                                {/* Filtros de Categoría y Subcategoría */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 12 }}>
                                    <select 
                                        value={selectedCategoria}
                                        onChange={(e) => { setSelectedCategoria(e.target.value); }}
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: 8,
                                            fontSize: 12,
                                            fontWeight: 600,
                                            background: 'var(--bg-elevated)',
                                            color: 'var(--text-primary)',
                                            border: '1px solid var(--border-subtle)',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <option value="">Todas las categorías</option>
                                        {categoriasPDP.map((cat: any) => (
                                            <option key={cat.id} value={cat.nombre}>{cat.icono} {cat.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                
                            </div>

                            <div style={{ flex: 1, overflowY: 'auto', marginRight: '-8px', paddingRight: 8, paddingBottom: 60 }} className="custom-scrollbar">
                                {isLoadingTemplates ? (
                                    <div className="flex items-center justify-center h-full">
                                        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                                    </div>
                                ) : (
                                    // Render PDP templates using the selected display mode
                                    (() => {
                                        // Filter PDP templates by categoría y subcategoría
                                        let filteredPdpTemplates = pdpTemplates;
                                        
                                        // Filtro por categoría
                                        if (selectedCategoria) {
                                            filteredPdpTemplates = filteredPdpTemplates.filter((t: any) => 
                                                t.categoria_nombre === selectedCategoria || !t.categoria_nombre
                                            );
                                        }
                                        
                                        // Map plantillas con datos de categoría
                                        // id = UUID (para operaciones CRUD), codigo = para renderizar componente
                                        const allItems = filteredPdpTemplates.map((t: any) => ({
                                            id: t.id,
                                            codigo: t.codigo,
                                            name: t.name,
                                            description: t.description,
                                            category: t.categoria_nombre || 'General',
                                            categoria_nombre: t.categoria_nombre || null,
                                            image_url: t.image_url || `/screenshots/megamarket.webp`,
                                            verified: t.verified,
                                            categoria_color: t.categoria_color,
                                        }));
                                        
                                        if (allItems.length === 0) return null;

                                        return (
                                            <DynamicPDPDisplay
                                                mode="filmstrip"
                                                items={allItems}
                                                selectedId={storeData.pdpTemplate || ''}
                                                onSelect={(id) => { 
                                                    // Buscar el codigo correspondiente al id seleccionado
                                                    const selected = allItems.find((t: any) => t.id === id);
                                                    const codigo = selected?.codigo || id;
                                                    setStoreData(p => ({ ...p, pdpTemplate: codigo }));
                                                }}
                                                onConfirmSelect={(id) => {
                                                    const selected = allItems.find((t: any) => t.id === id);
                                                    const codigo = selected?.codigo || id;
                                                    setStoreData(p => ({ ...p, pdpTemplate: codigo, productPageType: 'premium' as const }));
                                                    goTo(3, 'Etapa 3', 'Catálogo de Productos', { minDuration: 2000, accentColor: '#10b981' });
                                                }}
                                                templateType="pdp"
                                                useLivePreview={useLivePreview}
                                            />
                                        );
                                    })()
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
                            disabled={flowType === 'pdp' && !storeData.pdpTemplate}
                            onClick={() => {
                                if (flowType === 'pdp' && storeData.pdpTemplate) {
                                    setStoreData(p => ({ ...p, pdpTemplate: storeData.pdpTemplate, productPageType: 'premium' as const }));
                                }
                                goTo(3, 'Etapa 3', 'Catálogo de Productos', { minDuration: 2000, accentColor: flowType === 'pdp' ? '#10b981' : '#00f3ff' });
                            }}
                        >
                            Seleccionar Productos del Catálogo
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 8 }}><path d="M6 4 L10 8 L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                        </button>
                    </div>
                </div>
            )}

            {isHydrated && step === 3 && (() => {
                const totalProducts = builderProducts.products.length;
                const totalPages = builderProducts.totalPages;
                const paginatedProducts = builderProducts.paginated;
                return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
                    {/* Header */}
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                        <div>
                            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <MousePointerClick className="w-5 h-5 text-indigo-500" />
                                {flowType === 'pdp' ? 'Selecciona Tu Producto Estrella' : 'Catálogo de Productos'}
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
                                    value={builderProducts.search}
                                    onChange={e => builderProducts.setSearch(e.target.value)}
                                    onKeyDown={e => { if (e.key === 'Enter') { builderProducts.fetch(builderProducts.search); } }}
                                    placeholder="Buscar productos..."
                                    className="input-dark"
                                    style={{ width: 200, padding: '7px 12px 7px 32px', fontSize: 13 }}
                                />
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                            </div>
                            <button onClick={() => { builderProducts.fetch(builderProducts.search); }} className="btn-secondary" style={{ padding: '7px 14px', fontSize: 13 }}>Buscar</button>
                            {flowType === 'store' && (
                                <button onClick={builderProducts.toggleAll} className="btn-secondary" style={{ padding: '7px 14px', fontSize: 13, fontWeight: 700 }}>
                                    {builderProducts.selected.size === builderProducts.products.length && builderProducts.products.length > 0 ? 'Deseleccionar Todo' : 'Seleccionar Todo'}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Stock Express Bar - Ciudades dinámicas desde AlmiDrop */}
                    <div style={{ padding: '0 20px', marginTop: '12px' }}>
                        <ExpressStockBar
                            cities={cities}
                            citiesLoading={citiesLoading}
                            selectedCity={selectedCity}
                            onCitySelect={setSelectedCity}
                            selectedCities={selectedCities}
                            onMultiCitySelect={setSelectedCities}
                        />
                    </div>

                    {/* Products Grid - Usando AlmiCatalogGrid */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }} className="custom-scrollbar">
                        <AlmiCatalogGrid
                            products={paginatedProducts}
                            selectedIds={builderProducts.selected}
                            onToggleSelection={builderProducts.toggle}
                            stockIds={stockIds}
                            isExpressMode={isExpressMode}
                            onViewDetails={builderProducts.setViewing}
                            loading={builderProducts.loading}
                            emptyMessage="No se encontraron productos en el catálogo."
                            flowType={flowType || 'store'}
                        />

                        {/* Paginación */}
                        {totalPages > 1 && (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem', paddingBottom: 4 }}>
                                <button onClick={() => builderProducts.setPage(p => Math.max(1, p - 1))} disabled={builderProducts.page === 1} style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', color: 'var(--text-primary)', cursor: builderProducts.page === 1 ? 'default' : 'pointer', opacity: builderProducts.page === 1 ? 0.4 : 1, fontWeight: 600, fontSize: '0.85rem' }}>← Anterior</button>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Página {builderProducts.page} de {totalPages}</span>
                                <button onClick={() => builderProducts.setPage(p => Math.min(totalPages, p + 1))} disabled={builderProducts.page === totalPages} style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'var(--bg-base)', color: 'var(--text-primary)', cursor: builderProducts.page === totalPages ? 'default' : 'pointer', opacity: builderProducts.page === totalPages ? 0.4 : 1, fontWeight: 600, fontSize: '0.85rem' }}>Siguiente →</button>
                            </div>
                        )}
                    </div>

                    {/* Footer with actions */}
                    <div style={{ padding: '14px 24px', borderTop: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, background: 'var(--bg-surface)' }}>
                        <button className="btn-secondary" onClick={() => setStep(2)} style={{ padding: '10px 24px' }} disabled={aiGenerating}>← Atrás</button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600 }}>
                                {builderProducts.selected.size} de {totalProducts} producto{builderProducts.selected.size !== 1 ? 's' : ''} seleccionado{builderProducts.selected.size !== 1 ? 's' : ''}
                            </span>
                            <button className="btn-primary" disabled={builderProducts.selected.size === 0 || aiGenerating} style={{ padding: '10px 28px', fontSize: 14, opacity: (builderProducts.selected.size === 0 || aiGenerating) ? 0.5 : 1 }} onClick={confirmProductSelection}>
                                {aiGenerating ? (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        {aiProgress || 'Generando...'}
                                    </span>
                                ) : (
                                    <>
                                        Continuar con {builderProducts.selected.size} producto{builderProducts.selected.size !== 1 ? 's' : ''}
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 8 }}><path d="M6 4 L10 8 L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* AI Generation Overlay */}
                    {aiGenerating && (
                        <div style={{
                            position: 'absolute', inset: 0, zIndex: 50,
                            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24,
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <div style={{
                                width: 80, height: 80, borderRadius: '50%',
                                background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 0 60px rgba(245, 158, 11, 0.4)',
                                animation: 'pulse 2s infinite'
                            }}>
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                                </svg>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
                                    Inteligencia Artificial Trabajando
                                </h3>
                                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', maxWidth: 400, lineHeight: 1.6 }}>
                                    {aiProgress || 'Generando copywriting agresivo de ventas COD...'}
                                </p>
                            </div>
                            <div style={{
                                width: 200, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden'
                            }}>
                                <div style={{
                                    height: '100%', background: 'linear-gradient(90deg, #f59e0b, #ef4444, #f59e0b)',
                                    backgroundSize: '200% 100%',
                                    animation: 'shimmer 1.5s infinite linear',
                                    borderRadius: 2
                                }} />
                            </div>
                        </div>
                    )}

                    {/* Product Detail Modal */}
                    {builderProducts.viewing && (
                        <AlmiProductModal
                            product={builderProducts.viewing}
                            hasStock={stockIds.has(builderProducts.viewing.id)}
                            onClose={() => builderProducts.setViewing(null)}
                            onSelect={() => { builderProducts.toggle(builderProducts.viewing.id); builderProducts.setViewing(null); }}
                            isSelected={builderProducts.selected.has(builderProducts.viewing.id)}
                        />
                    )}
                </div>
                );
            })()}

            {/* ── STEP 4: Both Store and PDP now use VisualEditorOverlay ── */}


            {/* Publish Modal */}
            {publish.showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                    <div style={{ background: 'var(--bg-base)', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: 480, overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', animation: 'slideUp 0.3s ease-out forwards' }}>
                        <div style={{ padding: '24px 24px 20px', borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: flowType === 'pdp' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, var(--accent-primary), #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                    {flowType === 'pdp' ? <LayoutTemplate className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
                                        {flowType === 'pdp' ? 'Publicar Página de Producto' : 'Publicar Tienda'}
                                    </h3>
                                    <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-secondary)' }}>
                                        {flowType === 'pdp' ? 'Personaliza el nombre y enlace de tu página de producto.' : 'Personaliza el nombre y enlace de tu tienda.'}
                                    </p>
                                </div>
                            </div>
                            <button onClick={publish.close} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'all 0.2s' }} className="hover:bg-zinc-100 hover:text-zinc-900">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div style={{ padding: 24 }}>
                            {!publish.published ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
                                            {flowType === 'pdp' ? 'Nombre de tu página de producto' : 'Nombre de tu tienda'}
                                        </label>
                                        <input type="text" placeholder={flowType === 'pdp' ? 'Mi Página de Producto' : 'Mi Tienda Online'} value={storeData.name} onChange={(e) => setStoreData(prev => ({ ...prev, name: e.target.value }))} style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', background: 'var(--bg-base)', color: 'var(--text-primary)', fontSize: 14, outline: 'none', transition: 'border-color 0.2s' }} className="focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
                                            {flowType === 'pdp' ? 'URL de la página' : 'URL de la tienda'}
                                        </label>
                                        <div style={{ display: 'flex', alignItems: 'stretch', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', overflow: 'hidden', transition: 'border-color 0.2s' }} className="focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                                            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', padding: '0 12px', borderRight: '1px solid var(--border-default)', color: 'var(--text-secondary)', fontSize: 14 }}>
                                                <LinkIcon className="w-4 h-4 mr-2" />
                                                landingcod.com/{flowType === 'pdp' ? 'p' : 't'}/
                                            </div>
                                            <input type="text" placeholder={flowType === 'pdp' ? 'mi-producto' : 'mi-tienda'} value={publish.slug} onChange={(e) => publish.setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} style={{ flex: 1, padding: '12px 14px', border: 'none', background: 'var(--bg-base)', color: 'var(--text-primary)', fontSize: 14, outline: 'none' }} autoFocus />
                                        </div>
                                        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>Solo letras, números y guiones. Ejemplo: {flowType === 'pdp' ? 'producto-premium' : 'tienda-oficial'}</p>
                                    </div>
                                    {publish.error && (
                                        <div style={{ padding: '10px 14px', background: '#fee2e2', color: '#b91c1c', borderRadius: 'var(--radius-md)', fontSize: 13, border: '1px solid #fca5a5' }}>
                                            {publish.error}
                                        </div>
                                    )}
                                    <button className="btn-primary" disabled={publish.slug.length < 3 || publish.publishing || !storeData.name.trim()} style={{ width: '100%', padding: '14px', fontSize: 15, opacity: (publish.slug.length < 3 || publish.publishing || !storeData.name.trim()) ? 0.5 : 1, cursor: (publish.slug.length < 3 || publish.publishing || !storeData.name.trim()) ? 'not-allowed' : 'pointer' }}
                                        onClick={() => publish.publish({
                                            storeData, template, flowType: flowType || 'store',
                                            userId: user?.id, userName: user?.name, userEmail: user?.email,
                                            activeProductId,
                                            onSuccess: () => { if (user?.id) draft.clearSaved(); },
                                        })}
                                    >
                                        {publish.publishing ? (
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Loader2 className="w-5 h-5 animate-spin" />Publicando...</span>
                                        ) : flowType === 'pdp' ? '🚀 Publicar Página de Producto' : '🚀 Publicar Tienda'}
                                    </button>
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <h4 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px' }}>
                                        {flowType === 'pdp' ? '¡Página de producto publicada!' : '¡Tienda publicada con éxito!'}
                                    </h4>
                                    <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: '0 0 24px' }}>
                                        {flowType === 'pdp' ? 'Tu página de producto está en vivo.' : 'Tu tienda está en vivo y lista para recibir clientes.'}
                                    </p>
                                    <div style={{ background: 'var(--bg-surface)', border: '1px dashed var(--border-default)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: 24, userSelect: 'all' }}>
                                        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tu enlace público</div>
                                        <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--accent-primary)', wordBreak: 'break-all' }}>https://landingcod.com/{flowType === 'pdp' ? 'p' : 't'}/{publish.slug || 'preview'}</div>
                                    </div>
                                    <button className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: 15 }} onClick={() => { window.open(`/${flowType === 'pdp' ? 'p' : 't'}/${publish.slug}`, '_blank'); publish.close(); }}>
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        {flowType === 'pdp' ? 'Visitar Página de Producto' : 'Visitar Tienda en Vivo'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* PDP Type Selector Modal - Igual al paso 2 del builder */}
            {showPdpSelectorModal && (
                <div style={{ 
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    backgroundColor: 'rgba(0,0,0,0.85)', 
                    backdropFilter: 'blur(12px)', 
                    zIndex: 10000, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    padding: '30px'
                }}>
                    <div style={{ 
                        background: 'var(--bg-surface)', 
                        borderRadius: '20px', 
                        width: '90%', 
                        maxWidth: '1400px',
                        height: '90%',
                        overflow: 'hidden', 
                        boxShadow: '0 35px 100px -20px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255,255,255,0.1)', 
                        animation: 'slideUp 0.5s ease-out forwards',
                        display: 'flex',
                        flexDirection: 'column',
                        border: '1px solid var(--border-subtle)'
                    }}>
                        {/* Header igual al paso 2 */}
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 12, 
                            marginBottom: 8, 
                            flexShrink: 0, 
                            flexWrap: 'wrap',
                            padding: '20px 24px',
                            borderBottom: '1px solid var(--border-subtle)'
                        }}>
                            <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', margin: 0 }}>
                                Páginas de Producto
                            </h2>
                            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                                ({pdpTemplates.length} plantillas disponibles)
                            </span>
                            
                            {/* Botón Cerrar */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
                                <button 
                                    onClick={() => setShowPdpSelectorModal(false)} 
                                    style={{ 
                                        background: 'rgba(239, 68, 68, 0.15)', 
                                        border: '1px solid rgba(239, 68, 68, 0.4)', 
                                        color: '#fca5a5', 
                                        cursor: 'pointer', 
                                        padding: '8px 16px', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        borderRadius: '10px', 
                                        transition: 'all 0.2s',
                                        fontSize: 13,
                                        fontWeight: 600,
                                        gap: 6
                                    }}
                                >
                                    <X size={16} />
                                    Cerrar
                                </button>
                            </div>
                        </div>

                        {/* Visualization Area - DynamicPDPDisplay */}
                        <div style={{ flex: 1, overflow: 'hidden', position: 'relative', minHeight: 0, marginTop: -12 }}>
                            {isLoadingTemplates ? (
                                <div className="flex items-center justify-center h-full">
                                    <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                                </div>
                            ) : (
                                // Render PDP templates using the selected display mode
                                (() => {
                                    // Filter PDP templates by categoría y subcategoría
                                    let filteredPdpTemplates = pdpTemplates;
                                    
                                    // Filtro por categoría
                                    if (selectedCategoria) {
                                        filteredPdpTemplates = filteredPdpTemplates.filter((t: any) => 
                                            t.categoria_nombre === selectedCategoria || !t.categoria_nombre
                                        );
                                    }
                                    
                                    // Map plantillas con datos de categoría
                                    const allItems = filteredPdpTemplates.map((t: any) => ({
                                        id: t.id,
                                        name: t.name,
                                        description: t.description,
                                        category: t.categoria_nombre || 'General',
                                        categoria_nombre: t.categoria_nombre || null,
                                        image_url: t.image_url || `/screenshots/megamarket.webp`,
                                        verified: t.verified,
                                        categoria_color: t.categoria_color,
                                    }));
                                    
                                    if (allItems.length === 0) return null;

                                    return (
                                        <DynamicPDPDisplay
                                            mode="filmstrip"
                                            items={allItems}
                                            selectedId={storeData.pdpTemplate || ''}
                                            onSelect={(id) => { 
                                                setStoreData(p => ({ ...p, pdpTemplate: id })); 
                                            }}
                                            onConfirmSelect={(id) => {
                                                setStoreData(p => ({ 
                                                    ...p, 
                                                    pdpTemplate: id,
                                                    productPageType: 'premium' as const
                                                }));
                                                setShowPdpSelectorModal(false);
                                            }}
                                            templateType="pdp"
                                            useLivePreview={useLivePreview}
                                        />
                                    );
                                })()
                            )}
                        </div>

                        {/* Footer con botón de confirmar */}
                        <div style={{ 
                            padding: '16px 24px', 
                            borderTop: '1px solid var(--border-subtle)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'var(--bg-surface)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                    </svg>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: 12 }}>
                                <button
                                    onClick={() => {
                                        setStoreData(p => ({ ...p, productPageType: 'standard' }));
                                        setShowPdpSelectorModal(false);
                                    }}
                                    style={{
                                        padding: '12px 24px',
                                        background: 'var(--bg-elevated)',
                                        color: 'var(--text-secondary)',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: '10px',
                                        fontWeight: 600,
                                        fontSize: 14,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => {
                                        if (storeData.pdpTemplate) {
                                            setStoreData(p => ({ 
                                                ...p, 
                                                pdpTemplate: storeData.pdpTemplate,
                                                productPageType: 'premium' as const
                                            }));
                                        }
                                        setShowPdpSelectorModal(false);
                                    }}
                                    disabled={!storeData.pdpTemplate}
                                    style={{
                                        padding: '12px 28px',
                                        background: storeData.pdpTemplate 
                                            ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' 
                                            : 'var(--bg-elevated)',
                                        color: storeData.pdpTemplate ? 'white' : 'var(--text-muted)',
                                        border: 'none',
                                        borderRadius: '10px',
                                        fontWeight: 700,
                                        fontSize: 14,
                                        cursor: storeData.pdpTemplate ? 'pointer' : 'not-allowed',
                                        opacity: storeData.pdpTemplate ? 1 : 0.5,
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8
                                    }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                    Confirmar Selección
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Animaciones CSS */}
                    <style>{`
                        @keyframes slideUp {
                            from { opacity: 0; transform: translateY(30px) scale(0.95); }
                            to { opacity: 1; transform: translateY(0) scale(1); }
                        }
                    `}</style>
                </div>
            )}

            {isLoadingEditor && (
                <StudioLaunchSequence onComplete={() => setIsLoadingEditor(false)} productCount={builderProducts.selected.size} storeName={storeData.name || undefined} />
            )}

            {transition?.active && (
                <StepCinematicTransition onComplete={completeTransition} title={transition.title} subtitle={transition.subtitle} minDuration={transition.minDuration} accentColor={transition.accentColor} dataReady={isStepDataReady()} />
            )}

            {showEntry && (
                <StepCinematicTransition onComplete={completeEntry} title="Etapa 1" subtitle="Tipo de Proyecto" minDuration={2000} accentColor="#6366f1" />
            )}

            {/* Visual Editor Overlay */}
            {showVisualEditor && (
                <VisualEditorOverlay
                    isOpen={showVisualEditor}
                    onClose={() => {
                        setShowVisualEditor(false);
                        setStep(3);
                    }}
                    closeLabel="Volver al paso 3"
                    storeData={storeData}
                    template={template}
                    flowType={flowType || 'store'}
                    existingCustomizations={storeData.visualCustomizations?.customizations || []}
                    existingInjectedComponents={storeData.visualCustomizations?.injectedComponents || []}
                    onPublish={() => publish.open()}
                    onSave={async (customizations, injectedComponents) => {
                        const updatedStoreData = {
                            ...storeData,
                            visualCustomizations: {
                                customizations,
                                injectedComponents,
                                lastEditedAt: new Date().toISOString(),
                            }
                        };
                        setStoreData(updatedStoreData);
                        const result = await builderApi.saveDraft(updatedStoreData, template, flowType || 'store');
                        if (result.success) {
                            console.log(`[Save] ${flowType === 'pdp' ? 'PDP' : 'Tienda'} guardada en DB (${result.action}), id: ${result.id}`);
                        } else {
                            console.error('[Save] Error guardando en DB:', result.error);
                        }
                    }}
                />
            )}

        </div>
    );
}
