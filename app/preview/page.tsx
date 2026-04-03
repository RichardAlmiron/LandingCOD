'use client';
import React, { useEffect, useState } from 'react';
import { StoreData } from '@/lib/types';
import { Loader2, Trash2, Copy, Check } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useDeviceType } from '@/hooks/useDeviceType';
import VerifiedBadge from '@/components/componentes-compartidos/VerifiedBadge';

// PDP template components — resolución centralizada desde registry único
import { resolverComponentePDP, extraerVariante } from '@/lib/plantilla-registry';

// Mobile templates - usando named exports
const MobileMegaMarket = dynamic(() => import('@/components/plantillas-movil/mobile/MobileMegaMarket').then(mod => mod.MobileMegaMarket), { ssr: false });
const MobileFlashDeals = dynamic(() => import('@/components/plantillas-movil/mobile/MobileFlashDeals').then(mod => mod.MobileFlashDeals), { ssr: false });
const GenericMobileTemplate = dynamic(() => import('@/components/plantillas-movil/mobile/GenericMobileTemplate').then(mod => mod.GenericMobileTemplate), { ssr: false });

const templateComponents: Record<string, any> = {
    megamarket: dynamic(() => import('@/components/tiendas/MegaMarket')),
    flashdeals: dynamic(() => import('@/components/tiendas/FlashDeals')),
    tradevault: dynamic(() => import('@/components/tiendas/TradeVault')),
    mercadocod: dynamic(() => import('@/components/tiendas/MercadoCOD')),
    trendfast: dynamic(() => import('@/components/tiendas/TrendFast')),
    minimaltech: dynamic(() => import('@/components/tiendas/MinimalTech')),
    boldathlete: dynamic(() => import('@/components/tiendas/BoldAthlete')),
    editorialchic: dynamic(() => import('@/components/tiendas/EditorialChic')),
    handcraft: dynamic(() => import('@/components/tiendas/HandCraft')),
    blueretail: dynamic(() => import('@/components/tiendas/BlueRetail')),
    bidzone: dynamic(() => import('@/components/tiendas/BidZone')),
    nordichome: dynamic(() => import('@/components/tiendas/NordicHome')),
    bullseye: dynamic(() => import('@/components/tiendas/Bullseye')),
    beautybox: dynamic(() => import('@/components/tiendas/BeautyBox')),
    techretail: dynamic(() => import('@/components/tiendas/TechRetail')),
    stylepress: dynamic(() => import('@/components/tiendas/StylePress')),
    homedecor: dynamic(() => import('@/components/tiendas/HomeDecor')),
    builderzone: dynamic(() => import('@/components/tiendas/BuilderZone')),
    bulkzone: dynamic(() => import('@/components/tiendas/BulkZone')),
    sportstripe: dynamic(() => import('@/components/tiendas/SportStripe')),
    futuretech: dynamic(() => import('@/components/tiendas/FutureTech')),
    yogapremium: dynamic(() => import('@/components/tiendas/YogaPremium')),
    redstyle: dynamic(() => import('@/components/tiendas/RedStyle')),
    zenbasic: dynamic(() => import('@/components/tiendas/ZenBasic')),
    classicwear: dynamic(() => import('@/components/tiendas/ClassicWear')),
    familyfun: dynamic(() => import('@/components/tiendas/FamilyFun')),
    starstore: dynamic(() => import('@/components/tiendas/StarStore')),
    luxservice: dynamic(() => import('@/components/tiendas/LuxService')),
    chicstore: dynamic(() => import('@/components/tiendas/ChicStore')),
    elitestore: dynamic(() => import('@/components/tiendas/EliteStore')),
    designerhub: dynamic(() => import('@/components/tiendas/DesignerHub')),
    luxedit: dynamic(() => import('@/components/tiendas/LuxEdit')),
    influencestyle: dynamic(() => import('@/components/tiendas/InfluenceStyle')),
    boldyouth: dynamic(() => import('@/components/tiendas/BoldYouth')),
    pinkglam: dynamic(() => import('@/components/tiendas/PinkGlam')),
    novatrend: dynamic(() => import('@/components/tiendas/NovaTrend')),
    softglow: dynamic(() => import('@/components/tiendas/SoftGlow')),
    beautyhaven: dynamic(() => import('@/components/tiendas/BeautyHaven')),
    freshcraft: dynamic(() => import('@/components/tiendas/FreshCraft')),
    progamer: dynamic(() => import('@/components/tiendas/ProGamer')),
    gamevault: dynamic(() => import('@/components/tiendas/GameVault')),
    keymarket: dynamic(() => import('@/components/tiendas/KeyMarket')),
    verifymarket: dynamic(() => import('@/components/tiendas/VerifyMarket')),
    techparts: dynamic(() => import('@/components/tiendas/TechParts')),
    cashflow: dynamic(() => import('@/components/tiendas/CashFlow')),
    primegoods: dynamic(() => import('@/components/tiendas/PrimeGoods')),
    pricedrop: dynamic(() => import('@/components/tiendas/PriceDrop')),
    eurostyle: dynamic(() => import('@/components/tiendas/EuroStyle')),
    sneakerzone: dynamic(() => import('@/components/tiendas/SneakerZone')),
    glamangel: dynamic(() => import('@/components/tiendas/GlamAngel')),
    ecooutdoor: dynamic(() => import('@/components/tiendas/EcoOutdoor')),
    extremeexplorer: dynamic(() => import('@/components/tiendas/ExtremeExplorer')),
    fitmodern: dynamic(() => import('@/components/tiendas/FitModern')),
    hypedrop: dynamic(() => import('@/components/tiendas/HypeDrop')),
    streetboutique: dynamic(() => import('@/components/tiendas/StreetBoutique')),
    avantgarde: dynamic(() => import('@/components/tiendas/AvantGarde')),
    petfriend: dynamic(() => import('@/components/tiendas/PetFriend')),
    petworld: dynamic(() => import('@/components/tiendas/PetWorld')),
    sportzone: dynamic(() => import('@/components/tiendas/SportZone')),
    greenhealth: dynamic(() => import('@/components/tiendas/GreenHealth')),
    timecraft: dynamic(() => import('@/components/tiendas/TimeCraft')),
    maisonelegance: dynamic(() => import('@/components/tiendas/MaisonElegance')),
    blueclassic: dynamic(() => import('@/components/tiendas/BlueClassic')),
    charmboutique: dynamic(() => import('@/components/tiendas/CharmBoutique')),
    crystalshine: dynamic(() => import('@/components/tiendas/CrystalShine')),
    iconshades: dynamic(() => import('@/components/tiendas/IconShades')),
    sportoptics: dynamic(() => import('@/components/tiendas/SportOptics')),
    modernlens: dynamic(() => import('@/components/tiendas/ModernLens')),
    opticalretail: dynamic(() => import('@/components/tiendas/OpticalRetail')),
    shadeshub: dynamic(() => import('@/components/tiendas/ShadesHub')),
    italiancraft: dynamic(() => import('@/components/tiendas/ItalianCraft')),
    heritagelux: dynamic(() => import('@/components/tiendas/HeritageLux')),
    parisianchic: dynamic(() => import('@/components/tiendas/ParisianChic')),
    milanomodern: dynamic(() => import('@/components/tiendas/MilanoModern')),
    futureauto: dynamic(() => import('@/components/tiendas/FutureAuto')),
};

// Mobile template components mapping - add specific mobile versions here
const mobileTemplateComponents: Record<string, any> = {
    megamarket: MobileMegaMarket,
    flashdeals: MobileFlashDeals,
    // All other templates will use GenericMobileTemplate as fallback
};

// Demo products for preview when no real data is available
import { getDemoProducts, defaultPreviewStoreData } from '@/lib/demoData';

// Default store for preview when no real data is available
const defaultPreviewStore: StoreData = defaultPreviewStoreData as StoreData;
const demoProducts = getDemoProducts(24);

// ── Resolución centralizada de componentes PDP ──
function resolvePdpComponent(templateId: string): React.ComponentType<any> {
    return resolverComponentePDP(templateId);
}

function resolvePdpVariant(templateId: string): number {
    return extraerVariante(templateId);
}

// ── PDP Wrapper: se comporta como un template de Store (recibe solo `data`) ──
// Esto permite que PDP use EXACTAMENTE el mismo rendering path que Store en el VE.
function PdpTemplateWrapper({ data, templateId }: { data: StoreData; templateId: string }) {
    const PdpComponent = resolvePdpComponent(templateId);
    
    // Obtenemos un producto falso contextual en vez de usar siempre los auriculares genéricos
    // Para que una plantilla de cámara muestre una cámara en la previsualización
    const contextualDemo = obtenerDemoParaTemplate(templateId).product;
    
    // Si estamos en el constructor visual usaremos los productos reales si ya no son el default.
    // Asumimos que si no es "TechStore" ni otra de demoData, tiene productos reales.
    const isGenericDemo = data.name === 'TechStore' || data.products?.[0]?.id === 'demo-elec';
    const product = (data.products && data.products.length > 0 && !isGenericDemo) 
        ? data.products[0] 
        : contextualDemo;
    const variant = resolvePdpVariant(templateId);
    return <PdpComponent data={data} product={product} variant={variant} />;
}

// ── Producto demo contextual según el template (SRP) ──
// Usa el módulo centralizado demo-productos.ts que resuelve por registro explícito.
import { obtenerDemoParaTemplate } from '@/lib/demo-productos';


export default function FullscreenPreview() {
    const [data, setData] = useState<{ store: StoreData, template: string } | null>(null);
    const [pdpMode, setPdpMode] = useState<{ templateId: string, category?: string, subcategory?: string } | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isVisualEditorMode, setIsVisualEditorMode] = useState(false);
    const { isMobile, isClient } = useDeviceType();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const templateParam = params.get('template');
        const typeParam = params.get('type');
        const veParam = params.get('ve');
        const catParam = params.get('cat');
        const subcatParam = params.get('subcat');
        
        if (veParam === '1') {
            setIsVisualEditorMode(true);
        }

        // In visual editor mode: load template immediately and listen for store data updates
        let messageCleanup: (() => void) | null = null;
        if (veParam === '1') {
            console.log('[Preview VE] Visual editor mode active, listening for ve-init-data');
            const handleMessage = (e: MessageEvent) => {
                if (e.data?.type === 've-init-data' && e.data?.store) {
                    console.log('[Preview VE] ve-init-data received');
                    const incoming = e.data.store;
                    
                    // Smart merge: only override fields that have real values from the user.
                    // This preserves hardcoded template defaults (banners, images, name, description)
                    // while injecting the user's selected products from step 2.
                    const mergedStore = {
                        ...defaultPreviewStore,
                        // Only override these fields if the user actually set them (non-empty)
                        ...(incoming.name && incoming.name.trim() ? { name: incoming.name } : {}),
                        ...(incoming.description && incoming.description.trim() ? { description: incoming.description } : {}),
                        ...(incoming.logoText && incoming.logoText.trim() ? { logoText: incoming.logoText } : {}),
                        ...(incoming.bannerImage && incoming.bannerImage.trim() ? { bannerImage: incoming.bannerImage } : {}),
                        // Products are always overridden (this is the whole point of step 2)
                        products: (incoming.products && incoming.products.length > 0) ? incoming.products : demoProducts,
                        // Preserve structural config from user
                        ...(incoming.pdpTemplate ? { pdpTemplate: incoming.pdpTemplate } : {}),
                        ...(incoming.model ? { model: incoming.model } : {}),
                        ...(incoming.productPageType ? { productPageType: incoming.productPageType } : {}),
                        ...(incoming.pdpFeatures ? { pdpFeatures: incoming.pdpFeatures } : {}),
                        ...(incoming.discountConfig ? { discountConfig: incoming.discountConfig } : {}),
                        ...(incoming.visualCustomizations ? { visualCustomizations: incoming.visualCustomizations } : {}),
                    };
                    
                    // CRITICAL: In VE mode, NEVER change the template to avoid re-mounting the dynamic component.
                    // Only update the store data props. The template is already loaded from the URL.
                    setData(prev => {
                        if (!prev) {
                            // First time: use the template already set from URL parsing (including __pdp_ prefix for PDP)
                            const fallbackTemplate = (typeParam === 'pdp' && templateParam) 
                                ? `__pdp_${templateParam}` 
                                : (templateParam || 'megamarket');
                            return { store: mergedStore as StoreData, template: fallbackTemplate };
                        }
                        return { ...prev, store: mergedStore as StoreData };
                    });
                }
            };
            window.addEventListener('message', handleMessage);
            messageCleanup = () => window.removeEventListener('message', handleMessage);

            // Load template immediately from URL so iframe renders content right away
            const tmpl = templateParam || 'megamarket';
            
            // If type=pdp, render PDP through the SAME path as Store.
            // We register a dynamic wrapper in templateComponents so the VE
            // treats PDP identically to Store (same iframe setup, same editor flow).
            if (typeParam === 'pdp' && tmpl) {
                // Register PDP wrapper as a "store template" so it uses the identical rendering path
                templateComponents[`__pdp_${tmpl}`] = (props: { data: StoreData }) => (
                    <PdpTemplateWrapper data={props.data} templateId={tmpl} />
                );
                setData({ store: defaultPreviewStore, template: `__pdp_${tmpl}` });
            } else if (templateComponents[tmpl]) {
                setData({ store: defaultPreviewStore, template: tmpl });
            } else {
                setData({ store: defaultPreviewStore, template: 'megamarket' });
            }
            return messageCleanup;
        }

        // Check if user is admin independently to avoid early returns skipping it
        fetch('/api/auth/me')
            .then(res => res.json())
            .then(data => {
                if (data.user && data.user.role === 'admin') {
                    setIsAdmin(true);
                }
            })
            .catch(console.error);

        // PDP preview: resolve directly by template ID
        if (templateParam && typeParam === 'pdp') {
            setPdpMode({ templateId: templateParam, category: catParam || undefined, subcategory: subcatParam || undefined });
            setData({ store: defaultPreviewStore, template: templateParam });
            return;
        }

        // Store preview
        if (templateParam && templateComponents[templateParam]) {
            setData({ store: defaultPreviewStore, template: templateParam });
            return;
        }

        // Fallback: read from localStorage (used by Preview.tsx when opening in new tab)
        const stored = localStorage.getItem('landing_preview_data');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Ensure products array is never empty - merge with demo products if needed
                if (!parsed.store?.products || parsed.store.products.length === 0) {
                    parsed.store = { ...defaultPreviewStore, ...parsed.store, products: demoProducts };
                }
                setData(parsed);
                
                // Detectar si es modo PDP desde datos guardados
                if (parsed.store?.pdpTemplate) {
                    setPdpMode({ templateId: parsed.store.pdpTemplate, category: parsed.store.category, subcategory: parsed.store.subcategory });
                }
            } catch (e) {
                console.error(e);
                setData({ store: defaultPreviewStore, template: 'megamarket' });
            }
        } else {
            setData({ store: defaultPreviewStore, template: 'megamarket' });
        }
    }, []);

    const handleDeleteTemplate = async () => {
        if (!data?.template) return;
        if (!confirm('¿Estás seguro de que deseas mover esta plantilla a la papelera? Podrás recuperarla desde el Admin Builder si lo deseas.')) return;
        
        setIsDeleting(true);
        try {
            // Check if it's a store or PDP by trying both APIs starting with the most probable one (Stores)
            let isPdp = !!pdpMode;

            const endpoint = isPdp ? '/api/templates/pdp' : '/api/templates/stores';
            const res = await fetch(`${endpoint}?id=${data.template}`, { method: 'DELETE' });
            
            if (!res.ok) {
                // If it fails, maybe we guessed wrong, try the other table
                const otherEndpoint = isPdp ? '/api/templates/stores' : '/api/templates/pdp';
                const res2 = await fetch(`${otherEndpoint}?id=${data.template}`, { method: 'DELETE' });
                if (!res2.ok) throw new Error('Error al eliminar');
            }
            
            alert('Plantilla movida a la papelera correctamente. Ya no aparecerá en el listado público.');
            window.close(); // Close tab after deletion
        } catch (error) {
            console.error(error);
            alert('Ocurrió un error al intentar eliminar la plantilla.');
        } finally {
            setIsDeleting(false);
        }
    };

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            </div>
        );
    }

    // Render PDP if pdpMode is set
    if (pdpMode) {
        const PdpComponent = resolvePdpComponent(pdpMode.templateId);
        // Producto demo contextual via módulo SRP (registro explícito, sin autodetección)
        const { product: demoProduct } = obtenerDemoParaTemplate(pdpMode.templateId);
        const product = demoProduct;
        const variant = resolvePdpVariant(pdpMode.templateId);

        return (
            <div suppressHydrationWarning className="min-h-screen bg-white relative">

                <PdpComponent data={data.store} product={product} variant={variant} />
                {isAdmin && !isVisualEditorMode && (
                    <div className="fixed bottom-6 right-6 z-[9999]">
                        <button 
                            onClick={handleDeleteTemplate}
                            disabled={isDeleting}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-full shadow-2xl font-bold transition-transform hover:scale-105"
                        >
                            {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                            {isDeleting ? 'Eliminando...' : 'Eliminar Plantilla Globalmente'}
                        </button>
                        <div className="text-xs text-red-600 font-bold bg-white px-2 py-1 rounded shadow-md mt-2 text-center absolute -top-8 right-0 whitespace-nowrap">
                            VISTA ADMIN ACTIVA
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Select template component based on device type
    // If on mobile and has specific mobile version, use it
    // Otherwise use generic mobile template for mobile, or desktop version
    let TemplateComponent;
    
    if (isClient && isMobile) {
        // Check if there's a specific mobile version
        if (mobileTemplateComponents[data.template]) {
            TemplateComponent = mobileTemplateComponents[data.template];
        } else {
            // Use generic mobile template for all other templates
            TemplateComponent = () => <GenericMobileTemplate data={data.store} />;
        }
    } else {
        // Desktop: use original template
        TemplateComponent = templateComponents[data.template] || templateComponents.megamarket;
    }

    return (
        <div suppressHydrationWarning className="min-h-screen bg-white relative">
            {!isVisualEditorMode && <VerifiedBadge templateId={data.template} />}
            <TemplateComponent data={data.store} />
            
            {isAdmin && !isVisualEditorMode && (
                <div className="fixed bottom-6 right-6 z-[9999]">
                    <button 
                        onClick={handleDeleteTemplate}
                        disabled={isDeleting}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-full shadow-2xl font-bold transition-transform hover:scale-105"
                    >
                        {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                        {isDeleting ? 'Eliminando...' : 'Eliminar Plantilla Globalmente'}
                    </button>
                    <div className="text-xs text-red-600 font-bold bg-white px-2 py-1 rounded shadow-md mt-2 text-center absolute -top-8 right-0 whitespace-nowrap">
                        VISTA ADMIN ACTIVA
                    </div>
                </div>
            )}
        </div>
    );
}

