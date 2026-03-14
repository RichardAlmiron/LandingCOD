'use client';
import React, { useState, useEffect } from 'react';
import { defaultStore, StoreData, TemplateType, PdpTemplate } from '@/lib/types';
import Preview from '@/components/builder/Preview';
import RecycleBin from '@/components/saas/RecycleBin';
import AutoCaptureButton from '@/components/admin/AutoCaptureButton';
import DisplayModeSelector, { DisplayMode } from '@/components/admin/DisplayModeSelector';
import DynamicPDPDisplay from '@/components/admin/DynamicPDPDisplay';
import StoreDynamicDisplay from '@/components/visualization/StoreDynamicDisplay';
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
    // Estados inicializados con valores por defecto (no leer localStorage aquí)
    const [step, setStep] = useState<Step>(1);
    const [flowType, setFlowType] = useState<FlowType>(null);
    const [isHydrated, setIsHydrated] = useState(false);
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
    const [pdpTemplates, setPdpTemplates] = useState<any[]>([]);
    const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
    const [isRecycleBinOpen, setIsRecycleBinOpen] = useState(false);

    // AlmiDrop Products State
    const [almidropProducts, setAlmidropProducts] = useState<any[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [productSearch, setProductSearch] = useState('');
    const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
    const [productPage, setProductPage] = useState(1);
    const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
    const ITEMS_PER_PAGE = 24;
    // Database persistence state
    const [isSavingToDB, setIsSavingToDB] = useState(false);
    const saveTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const [hasLoadedFromDB, setHasLoadedFromDB] = useState(false);
    const [displayMode, setDisplayMode] = useState<DisplayMode>('filmstrip');
    const [showDisplayModeSelector, setShowDisplayModeSelector] = useState(false);

    // Save step to localStorage whenever it changes (but not on initial mount)
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        if (hasMounted) {
            localStorage.setItem('builderFlow_step', String(step));
        }
    }, [step, hasMounted]);

    // Mark as mounted after initial render
    useEffect(() => {
        setHasMounted(true);
    }, []);

    // Save flowType to localStorage whenever it changes
    useEffect(() => {
        if (hasMounted && flowType) {
            localStorage.setItem('builderFlow_flowType', flowType);
        }
    }, [flowType, hasMounted]);

    // Save template to localStorage whenever it changes
    useEffect(() => {
        if (hasMounted) {
            localStorage.setItem('builderFlow_template', template);
        }
    }, [template, hasMounted]);

    // Save pdpCategory to localStorage whenever it changes
    useEffect(() => {
        if (hasMounted && pdpCategory) {
            localStorage.setItem('builderFlow_pdpCategory', pdpCategory);
        }
    }, [pdpCategory, hasMounted]);

    // Save selectedProducts to localStorage whenever it changes
    useEffect(() => {
        if (hasMounted) {
            localStorage.setItem('builderFlow_selectedProducts', JSON.stringify(Array.from(selectedProducts)));
        }
    }, [selectedProducts, hasMounted]);

    // Save storeData to localStorage whenever it changes (except empty initial state)
    useEffect(() => {
        if (hasMounted && (storeData.products.length > 0 || storeData.name !== defaultStore.name)) {
            localStorage.setItem('builderFlow_storeData', JSON.stringify(storeData));
        }
    }, [storeData, hasMounted]);

    // Hydration effect: load all saved state from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedStep = localStorage.getItem('builderFlow_step');
            const savedFlowType = localStorage.getItem('builderFlow_flowType');
            const savedTemplate = localStorage.getItem('builderFlow_template');
            const savedPdpCategory = localStorage.getItem('builderFlow_pdpCategory');
            const savedSelectedProducts = localStorage.getItem('builderFlow_selectedProducts');
            const savedStoreData = localStorage.getItem('builderFlow_storeData');
            
            if (savedStep) {
                setStep(parseInt(savedStep, 10) as Step);
            }
            if (savedFlowType) {
                setFlowType(savedFlowType as FlowType);
            }
            if (savedTemplate) {
                setTemplate(savedTemplate as TemplateType);
            }
            if (savedPdpCategory) {
                setPdpCategory(savedPdpCategory);
            }
            if (savedSelectedProducts) {
                try {
                    const parsed = JSON.parse(savedSelectedProducts);
                    setSelectedProducts(new Set(parsed));
                } catch (e) {
                    console.error('Error parsing selectedProducts:', e);
                }
            }
            if (savedStoreData) {
                try {
                    const parsed = JSON.parse(savedStoreData);
                    setStoreData(parsed);
                } catch (e) {
                    console.error('Error parsing storeData:', e);
                }
            }
            
            // Mark as hydrated after loading
            setIsHydrated(true);
        }
    }, []);

    // Load builder config from database on mount
    useEffect(() => {
        const loadFromDB = async () => {
            try {
                const res = await fetch('/api/builder-config');
                if (res.ok) {
                    const data = await res.json();
                    if (data.config) {
                        // Merge DB config with localStorage (localStorage takes precedence for recent changes)
                        const savedStep = localStorage.getItem('builderFlow_step');
                        const savedFlowType = localStorage.getItem('builderFlow_flowType');
                        const savedTemplate = localStorage.getItem('builderFlow_template');
                        const savedStoreData = localStorage.getItem('builderFlow_storeData');
                        
                        // Only use DB data if no recent localStorage data exists
                        if (!savedStep && data.config.current_step) {
                            setStep(data.config.current_step as Step);
                        }
                        if (!savedFlowType && data.config.flow_type) {
                            setFlowType(data.config.flow_type as FlowType);
                        }
                        if (!savedTemplate && data.config.template) {
                            setTemplate(data.config.template as TemplateType);
                        }
                        if (!savedStoreData && data.config.store_data) {
                            setStoreData(data.config.store_data as StoreData);
                        }
                        if (data.config.pdp_category && !localStorage.getItem('builderFlow_pdpCategory')) {
                            setPdpCategory(data.config.pdp_category);
                        }
                        if (data.config.selected_products && data.config.selected_products.length > 0) {
                            const savedSelected = localStorage.getItem('builderFlow_selectedProducts');
                            if (!savedSelected) {
                                setSelectedProducts(new Set(data.config.selected_products));
                            }
                        }
                    }
                }
            } catch (err) {
                console.error('Error loading builder config from DB:', err);
            } finally {
                setHasLoadedFromDB(true);
            }
        };
        loadFromDB();
    }, []);

    // Function to save builder config to database with debounce
    const saveToDatabase = React.useCallback(async () => {
        if (!flowType || isSavingToDB) return;
        
        setIsSavingToDB(true);
        try {
            const res = await fetch('/api/builder-config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    flowType,
                    storeData,
                    template,
                    currentStep: step,
                    selectedProducts: Array.from(selectedProducts),
                    pdpCategory: pdpCategory || undefined
                })
            });
            if (!res.ok) {
                console.error('Error saving to DB:', await res.text());
            }
        } catch (err) {
            console.error('Network error saving to DB:', err);
        } finally {
            setIsSavingToDB(false);
        }
    }, [flowType, storeData, template, step, selectedProducts, pdpCategory, isSavingToDB]);

    // Debounced save effect - saves to DB 2 seconds after changes stop
    useEffect(() => {
        if (!hasMounted || !flowType || !hasLoadedFromDB) return;
        
        // Clear previous timeout
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
        
        // Set new timeout for debounced save
        saveTimeoutRef.current = setTimeout(() => {
            saveToDatabase();
        }, 2000);
        
        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, [flowType, storeData, template, step, selectedProducts, pdpCategory, hasMounted, hasLoadedFromDB, saveToDatabase]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        Promise.all([
            fetch('/api/templates/stores').then(res => res.json()),
            fetch('/api/templates/pdp').then(res => res.json())
        ]).then(([storesData, pdpsData]) => {
            if (storesData.stores) {
                const mapped = storesData.stores.map((s: any) => ({
                    id: s.id,
                    name: s.name,
                    description: s.description,
                    category: s.category,
                    premium: s.premium,
                    image_url: s.image_url
                }));
                setStoreTemplates(mapped);
            }
            if (pdpsData.pdps) {
                const mapped = pdpsData.pdps.map((p: any) => ({
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    category: p.category,
                    premium: p.premium,
                    image_url: p.image_url
                }));
                setPdpTemplates(mapped);
            }
        }).catch(console.error).finally(() => setIsLoadingTemplates(false));
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
                setStoreTemplates(prev => prev.filter((t: any) => t.id !== id));
            } else {
                alert('No se pudo eliminar el template.');
            }
        } catch (err) {
            console.error(err);
            alert('Error al intentar eliminar');
        }
    };

    const handleDeletePdpTemplate = async (id: string) => {
        if (!confirm('¿Seguro de que deseas mover esta página de producto a la papelera?')) return;
        try {
            const res = await fetch(`/api/templates/pdp?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setPdpTemplates(prev => prev.filter((t: any) => t.id !== id));
            } else {
                alert('No se pudo eliminar la página de producto.');
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

    const filteredTemplates = storeTemplates.filter((t: any) =>
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

            {/* Loading state while hydrating from localStorage */}
            {!isHydrated && (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
                </div>
            )}

            {/* ── STEP 1: Elige el Tipo de Proyecto ── */}
            {isHydrated && step === 1 && (
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
                                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>({storeTemplates.length})</span>
                                </div>
                                
                                {/* Categorías en header - una línea */}
                                <div style={{ display: 'flex', gap: 4, flexWrap: 'nowrap', overflowX: 'auto', flex: 1 }}>
                                    {STORE_CATEGORIES.map(c => (
                                        <button key={c} onClick={() => setCatFilter(c)} style={{
                                            padding: '4px 10px', borderRadius: 16, fontSize: 11, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
                                            background: catFilter === c ? 'var(--accent-primary)' : 'var(--bg-elevated)',
                                            color: catFilter === c ? '#fff' : 'var(--text-secondary)',
                                            border: `1px solid ${catFilter === c ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                                            transition: 'all 0.2s',
                                        }}>{c}</button>
                                    ))}
                                </div>
                                
                                {/* Botones admin */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                                    {isAdmin && (
                                        <button
                                            onClick={() => setShowDisplayModeSelector(!showDisplayModeSelector)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 4,
                                                padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700,
                                                background: showDisplayModeSelector ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-elevated)',
                                                color: showDisplayModeSelector ? '#6366f1' : 'var(--text-secondary)',
                                                border: `1px solid ${showDisplayModeSelector ? 'rgba(99, 102, 241, 0.3)' : 'var(--border-subtle)'}`,
                                                cursor: 'pointer', transition: 'all 0.2s',
                                            }}
                                        >
                                            <LayoutTemplate size={12} />
                                            Modo
                                        </button>
                                    )}
                                    {isAdmin && (
                                        <button
                                            onClick={() => setIsRecycleBinOpen(true)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 4,
                                                padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700,
                                                background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444',
                                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                                cursor: 'pointer', transition: 'all 0.2s',
                                            }}
                                        >
                                            <Trash2 size={12} />
                                            Papelera
                                        </button>
                                    )}
                                </div>
                            </div>
                            
                            {/* Display Mode Selector Panel */}
                            {isAdmin && showDisplayModeSelector && (
                                <div style={{ 
                                    position: 'absolute', 
                                    top: 70, 
                                    right: 20, 
                                    width: 320, 
                                    zIndex: 50,
                                    maxHeight: 'calc(100vh - 200px)',
                                    overflowY: 'auto'
                                }} className="custom-scrollbar">
                                    <DisplayModeSelector 
                                        currentMode={displayMode}
                                        onModeChange={(mode) => {
                                            setDisplayMode(mode);
                                        }}
                                    />
                                </div>
                            )}
                            
                            {/* Visualization Area - Extended to footer */}
                            <div style={{ flex: 1, overflow: 'hidden', position: 'relative', minHeight: 0, marginTop: -12 }}>
                                {isLoadingTemplates ? (
                                    <div className="flex items-center justify-center h-full">
                                        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                                    </div>
                                ) : (
                                    <StoreDynamicDisplay
                                        mode={displayMode}
                                        items={catFilter === 'Todos' ? storeTemplates : storeTemplates.filter((t: any) => t.category === catFilter)}
                                        selectedId={template}
                                        onSelect={(id) => { setTemplate(id as TemplateType); }}
                                        onConfirmSelect={(id) => {
                                            setTemplate(id as TemplateType);
                                            setStep(3);
                                        }}
                                    />
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexShrink: 0, flexWrap: 'wrap' }}>
                                <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', margin: 0 }}>Páginas de Producto</h2>
                                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>({pdpTemplates.length} plantillas disponibles)</span>
                                {isAdmin && (
                                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <button
                                            onClick={() => setShowDisplayModeSelector(!showDisplayModeSelector)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 6,
                                                padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                                                background: showDisplayModeSelector ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-elevated)',
                                                color: showDisplayModeSelector ? '#6366f1' : 'var(--text-secondary)',
                                                border: `1px solid ${showDisplayModeSelector ? 'rgba(99, 102, 241, 0.3)' : 'var(--border-subtle)'}`,
                                                cursor: 'pointer', transition: 'all 0.2s',
                                            }}
                                            className="hover:bg-indigo-500/10"
                                        >
                                            <LayoutTemplate size={14} />
                                            Modo Visualización
                                        </button>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 12, color: 'var(--text-muted)' }}>
                                            <input 
                                                type="checkbox" 
                                                checked={useLivePreview} 
                                                onChange={toggleLivePreview}
                                                style={{ cursor: 'pointer' }}
                                            />
                                            <span>Live Preview</span>
                                        </label>
                                        <AutoCaptureButton />
                                    </div>
                                )}
                            </div>
                            
                            {/* Display Mode Selector Panel */}
                            {isAdmin && showDisplayModeSelector && (
                                <div style={{ 
                                    position: 'absolute', 
                                    top: 50, 
                                    right: 20, 
                                    width: 320, 
                                    zIndex: 50,
                                    maxHeight: 'calc(100vh - 200px)',
                                    overflowY: 'auto'
                                }} className="custom-scrollbar">
                                    <DisplayModeSelector 
                                        currentMode={displayMode}
                                        onModeChange={(mode) => {
                                            setDisplayMode(mode);
                                        }}
                                    />
                                </div>
                            )}

                            <div style={{ flex: 1, overflowY: 'auto', marginRight: '-8px', paddingRight: 8, paddingBottom: 60 }} className="custom-scrollbar">
                                {isLoadingTemplates ? (
                                    <div className="flex items-center justify-center h-full">
                                        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                                    </div>
                                ) : (
                                    // Render PDP templates using the selected display mode
                                    (() => {
                                        // Flatten all PDP templates into a single array for non-carousel modes
                                        const allItems = pdpTemplates.map((t: any) => ({
                                            id: t.id,
                                            name: t.name,
                                            description: t.description,
                                            category: t.category,
                                            image_url: t.image_url || `/screenshots/megamarket.webp`
                                        }));
                                        
                                        if (allItems.length === 0) return null;

                                        return (
                                            <DynamicPDPDisplay
                                                mode={displayMode}
                                                items={allItems}
                                                selectedId={pdpCategory || ''}
                                                onSelect={(id) => { setPdpCategory(id); }}
                                                onConfirmSelect={(id) => {
                                                    setPdpCategory(id);
                                                    const selected = pdpTemplates.find((t: any) => t.id === id);
                                                    setStoreData(p => ({ ...p, pdpCategory: (selected?.category || 'urgency') as StoreData['pdpCategory'], pdpTemplate: id }));
                                                    setStep(3);
                                                }}
                                                isAdmin={isAdmin}
                                                onDeleteTemplate={handleDeletePdpTemplate}
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
                            disabled={flowType === 'pdp' && !pdpCategory}
                            onClick={() => {
                                if (flowType === 'pdp' && pdpCategory) {
                                    const selected = pdpTemplates.find((t: any) => t.id === pdpCategory);
                                    setStoreData(p => ({ ...p, pdpCategory: (selected?.category || 'urgency') as StoreData['pdpCategory'], pdpTemplate: pdpCategory }));
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
            {isHydrated && step === 3 && (() => {
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
            {isHydrated && step === 4 && (
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

                                {/* Selector de Idioma - Estilo integrado */}
                                <div className="section-elevated">
                                    <div className="section-title">Idioma de la Tienda</div>
                                    <div className="language-selector">
                                        <button
                                            className={`lang-option ${storeData.language === 'es' ? 'active' : ''}`}
                                            onClick={() => setStoreData(p => ({ ...p, language: 'es' }))}
                                        >
                                            <span className="lang-flag">🇪🇸</span>
                                            <span className="lang-label">Español</span>
                                            {storeData.language === 'es' && <span className="lang-check">✓</span>}
                                        </button>
                                        <button
                                            className={`lang-option ${storeData.language === 'pt' ? 'active' : ''}`}
                                            onClick={() => setStoreData(p => ({ ...p, language: 'pt' }))}
                                        >
                                            <span className="lang-flag">🇧🇷</span>
                                            <span className="lang-label">Português</span>
                                            {storeData.language === 'pt' && <span className="lang-check">✓</span>}
                                        </button>
                                    </div>
                                </div>

                                {/* Footer Configuration - Solo Contacto y Redes Sociales */}
                                {flowType === 'store' && (
                                    <div className="footer-simple">
                                        {/* Contacto - Toggle Profesional */}
                                        <div className="footer-contact-section">
                                            <div 
                                                className="contact-toggle-header"
                                                onClick={() => setStoreData(p => ({ 
                                                    ...p, 
                                                    footerConfig: { 
                                                        ...p.footerConfig, 
                                                        contact: { ...p.footerConfig?.contact, enabled: !p.footerConfig?.contact?.enabled } 
                                                    } 
                                                }))}
                                            >
                                                <div className="contact-info">
                                                    <div className="contact-icon">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                                    </div>
                                                    <div>
                                                        <div className="contact-title">Contacto</div>
                                                        <div className="contact-subtitle">
                                                            {storeData.footerConfig?.contact?.enabled ? 'Activado' : 'Desactivado'}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`ios-toggle ${storeData.footerConfig?.contact?.enabled ? 'on' : ''}`}>
                                                    <div className="ios-toggle-knob" />
                                                </div>
                                            </div>
                                            
                                            {/* Formulario de Contacto - Aparece cuando está activado */}
                                            {storeData.footerConfig?.contact?.enabled && (
                                                <div className="contact-form">
                                                    <div className="contact-input-group">
                                                        <label className="contact-label">
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="m2 5 10 7 10-7"/></svg>
                                                            Email
                                                        </label>
                                                        <input 
                                                            className="contact-input"
                                                            type="email"
                                                            placeholder="contacto@tutienda.com"
                                                            value={storeData.footerConfig?.contact?.email || ''} 
                                                            onChange={e => setStoreData(p => ({ 
                                                                ...p, 
                                                                footerConfig: { 
                                                                    ...p.footerConfig, 
                                                                    contact: { ...p.footerConfig?.contact, email: e.target.value } 
                                                                } 
                                                            }))}
                                                        />
                                                    </div>
                                                    
                                                    <div className="contact-input-group">
                                                        <label className="contact-label">
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                                            Teléfono
                                                            <span className="tooltip" title="Incluye código de país. Ejemplo: +52 para México, +55 para Brasil">
                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                                                            </span>
                                                        </label>
                                                        <input 
                                                            className="contact-input"
                                                            type="tel"
                                                            placeholder="+52 55 1234 5678"
                                                            value={storeData.footerConfig?.contact?.phone || ''} 
                                                            onChange={e => setStoreData(p => ({ 
                                                                ...p, 
                                                                footerConfig: { 
                                                                    ...p.footerConfig, 
                                                                    contact: { ...p.footerConfig?.contact, phone: e.target.value } 
                                                                } 
                                                            }))}
                                                        />
                                                        <span className="input-hint">Formato internacional: +código país + número</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Redes Sociales - Intactas */}
                                        <div className="section-elevated">
                                            <div className="section-title">Redes Sociales</div>
                                            <div className="social-inputs">
                                                <div className="input-with-icon">
                                                    <svg className="input-icon social-facebook" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                                                    <input 
                                                        className="input-dark" 
                                                        placeholder="Facebook URL"
                                                        value={storeData.footerConfig?.socialMedia?.facebook || ''} 
                                                        onChange={e => setStoreData(p => ({ 
                                                            ...p, 
                                                            footerConfig: { 
                                                                ...p.footerConfig, 
                                                                socialMedia: { ...p.footerConfig?.socialMedia, facebook: e.target.value } 
                                                            } 
                                                        }))}
                                                    />
                                                </div>
                                                <div className="input-with-icon">
                                                    <svg className="input-icon social-instagram" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                                                    <input 
                                                        className="input-dark" 
                                                        placeholder="Instagram URL"
                                                        value={storeData.footerConfig?.socialMedia?.instagram || ''} 
                                                        onChange={e => setStoreData(p => ({ 
                                                            ...p, 
                                                            footerConfig: { 
                                                                ...p.footerConfig, 
                                                                socialMedia: { ...p.footerConfig?.socialMedia, instagram: e.target.value } 
                                                            } 
                                                        }))}
                                                    />
                                                </div>
                                                <div className="input-with-icon">
                                                    <svg className="input-icon social-twitter" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                                                    <input 
                                                        className="input-dark" 
                                                        placeholder="Twitter URL"
                                                        value={storeData.footerConfig?.socialMedia?.twitter || ''} 
                                                        onChange={e => setStoreData(p => ({ 
                                                            ...p, 
                                                            footerConfig: { 
                                                                ...p.footerConfig, 
                                                                socialMedia: { ...p.footerConfig?.socialMedia, twitter: e.target.value } 
                                                            } 
                                                        }))}
                                                    />
                                                </div>
                                                <div className="input-with-icon">
                                                    <svg className="input-icon social-whatsapp" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.13 1.588 5.931L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                                                    <input 
                                                        className="input-dark" 
                                                        placeholder="WhatsApp (con código de país)"
                                                        value={storeData.footerConfig?.socialMedia?.whatsapp || ''} 
                                                        onChange={e => setStoreData(p => ({ 
                                                            ...p, 
                                                            footerConfig: { 
                                                                ...p.footerConfig, 
                                                                socialMedia: { ...p.footerConfig?.socialMedia, whatsapp: e.target.value } 
                                                            } 
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Herramientas CRO - Solo para PDP */}
                                {flowType === 'pdp' && (
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
                                )}
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
