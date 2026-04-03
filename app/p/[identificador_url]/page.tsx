import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';
import React from 'react';
import VisualCustomizationApplier from '@/components/componentes-tiendas/VisualCustomizationApplier';
import { resolverCodigoPlantilla } from '@/lib/types-categorias';

// ── Mapa código Standard → componente PDP (dynamic imports para SSR) ──
const componentesPDP: Record<string, any> = {
    'standard-urgencia':         dynamic(() => import('@/components/pdp/electrónico/general/PdpUrgenciaMaxima')),
    'standard-prueba-social':    dynamic(() => import('@/components/pdp/electrónico/general/PdpPruebaSocial')),
    'standard-bundle':           dynamic(() => import('@/components/pdp/electrónico/general/PdpOfertaBundle')),
    'standard-historia':         dynamic(() => import('@/components/pdp/electrónico/general/PdpHistoriaProducto')),
    'standard-checkout-directo': dynamic(() => import('@/components/pdp/electrónico/general/PdpCheckoutDirecto')),
    'standard-salud':            dynamic(() => import('@/components/pdp/salud/general/PdpSaludEstandar')),
    'standard-electronico':      dynamic(() => import('@/components/pdp/electrónico/general/PdpElectronicoEstandar')),
    'standard-herramientas':     dynamic(() => import('@/components/pdp/herramientas/general/PdpHerramientasEstandar')),
    'standard-belleza':          dynamic(() => import('@/components/pdp/belleza/general/PdpBellezaEstandar')),
    'standard-hogar':            dynamic(() => import('@/components/pdp/hogar/general/PdpHogarEstandar')),
    'premium-urgencia':          dynamic(() => import('@/components/pdp/electrónico/general/PdpUrgenciaPremium')),
    'premium-bundle':            dynamic(() => import('@/components/pdp/electrónico/general/PdpPremiumBundle')),
    'premium-electronico':       dynamic(() => import('@/components/pdp/electrónico/general/PdpElectronicoPremium')),
    'premium-salud':             dynamic(() => import('@/components/pdp/salud/general/PdpSaludPremium')),
    // Celulares
    'standard-celulares':        dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelulares')),
    'PDP-CEL-MINIMAL':           dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesMinimal')),
    'PDP-CEL-LUXURY':            dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesLuxury')),
    'PDP-CEL-GAMER':             dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesGamer')),
    'PDP-CEL-ECO':               dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesEco')),
    'PDP-CEL-CREATOR':           dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesCreator')),
    'PDP-CEL-BUSINESS':          dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesBusiness')),
    'PDP-CEL-OUTDOOR':           dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesOutdoor')),
    'PDP-CEL-GLASS':             dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesGlass')),
    'PDP-CEL-PRESTIGE':          dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesPrestige')),
    'PDP-CEL-MECHA':             dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesMecha')),
    'PDP-CEL-SCIFI':             dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesSciFi')),
    'PDP-CEL-NORDIC':            dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesNordic')),
    'PDP-CEL-TERMINAL':          dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesTerminal')),
    'PDP-CEL-VINTAGE':           dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesVintage')),
    'PDP-CEL-STREETWEAR':        dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesStreetwear')),
};

export default async function PublicPdpPage({ params }: { params: Promise<{ identificador_url: string }> }) {
    const resolvedParams = await params;

    // Buscar EXCLUSIVAMENTE en pdp_publicadas — /p/ es solo para PDPs
    const { data: store, error } = await supabase
        .from('pdp_publicadas')
        .select('store_data, name, pdp_template')
        .eq('identificador_url', resolvedParams.identificador_url)
        .eq('status', 'published')
        .single();

    if (error || !store) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 text-center px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Página No Encontrada</h1>
                    <p className="text-gray-500 mb-6">
                        La página de producto que buscas ({resolvedParams.identificador_url}) no existe o ha sido eliminada.
                    </p>
                    <a href="https://landingcod.com" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition w-full block">
                        Crear mi propia página
                    </a>
                </div>
            </div>
        );
    }

    const pdpTemplateId = store.pdp_template || store.store_data?.pdpTemplate || 'urgency-1';

    const product = store.store_data?.products?.[0];
    
    if (!product) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 text-center px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Producto No Encontrado</h1>
                    <p className="text-gray-500 mb-6">
                        No se encontró el producto para esta página.
                    </p>
                </div>
            </div>
        );
    }

    // Resolución centralizada (soporta IDs legacy y Standard)
    const codigo = resolverCodigoPlantilla(pdpTemplateId);
    let PdpComponent = componentesPDP[codigo];
    
    // Extraer variant del ID (último segmento numérico)
    const parts = pdpTemplateId.split('-');
    const lastPart = parseInt(parts[parts.length - 1], 10);
    const variant = isNaN(lastPart) ? 1 : lastPart;

    if (!PdpComponent) {
        PdpComponent = componentesPDP['standard-urgencia'];
    }

    return (
        <div suppressHydrationWarning className="min-h-screen bg-white">
            <title>{product.name} | {store.name}</title>
            {store.store_data?.visualCustomizations && (
                <VisualCustomizationApplier
                    customizations={store.store_data.visualCustomizations.customizations || []}
                    injectedComponents={store.store_data.visualCustomizations.injectedComponents || []}
                />
            )}
            <PdpComponent 
                data={store.store_data} 
                product={product} 
                variant={variant} 
            />
        </div>
    );
}
