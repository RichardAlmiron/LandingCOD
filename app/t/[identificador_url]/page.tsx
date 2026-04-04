import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';
import React from 'react';
import ProductClickWrapper from '@/components/componentes-tiendas/ProductClickWrapper';
import { CartProvider } from '@/contexts/CartContext';
import { FloatingCartProvider } from '@/contexts/FloatingCartContext';
import StoreCartWrapper from '@/components/componentes-tiendas/StoreCartWrapper';
import GlobalFloatingCart from '@/components/componentes-tiendas/GlobalFloatingCart';
import GlobalNavigationDisabler from '@/components/componentes-tiendas/GlobalNavigationDisabler';
import VisualCustomizationApplier from '@/components/componentes-tiendas/VisualCustomizationApplier';

const templateComponents: Record<string, any> = {
    megamarket: dynamic(() => import('@/components/tiendas/MegaMarket')),
    flashdeals: dynamic(() => import('@/components/tiendas/FlashDeals')),
    tradevault: dynamic(() => import('@/components/tiendas/TradeVault')),
    mercadocod: dynamic(() => import('@/components/tiendas/MercadoCOD')),
    bidzone: dynamic(() => import('@/components/tiendas/BidZone')),
    pricedrop: dynamic(() => import('@/components/tiendas/PriceDrop')),
    cashflow: dynamic(() => import('@/components/tiendas/CashFlow')),
    primegoods: dynamic(() => import('@/components/tiendas/PrimeGoods')),
    minimaltech: dynamic(() => import('@/components/tiendas/MinimalTech')),
    futuretech: dynamic(() => import('@/components/tiendas/FutureTech')),
    techretail: dynamic(() => import('@/components/tiendas/TechRetail')),
    techparts: dynamic(() => import('@/components/tiendas/TechParts')),
    gamevault: dynamic(() => import('@/components/tiendas/GameVault')),
    progamer: dynamic(() => import('@/components/tiendas/ProGamer')),
    keymarket: dynamic(() => import('@/components/tiendas/KeyMarket')),
    verifymarket: dynamic(() => import('@/components/tiendas/VerifyMarket')),
    futureauto: dynamic(() => import('@/components/tiendas/FutureAuto')),
    boldathlete: dynamic(() => import('@/components/tiendas/BoldAthlete')),
    sportstripe: dynamic(() => import('@/components/tiendas/SportStripe')),
    editorialchic: dynamic(() => import('@/components/tiendas/EditorialChic')),
    trendfast: dynamic(() => import('@/components/tiendas/TrendFast')),
    redstyle: dynamic(() => import('@/components/tiendas/RedStyle')),
    zenbasic: dynamic(() => import('@/components/tiendas/ZenBasic')),
    stylepress: dynamic(() => import('@/components/tiendas/StylePress')),
    classicwear: dynamic(() => import('@/components/tiendas/ClassicWear')),
    familyfun: dynamic(() => import('@/components/tiendas/FamilyFun')),
    yogapremium: dynamic(() => import('@/components/tiendas/YogaPremium')),
    fitmodern: dynamic(() => import('@/components/tiendas/FitModern')),
    hypedrop: dynamic(() => import('@/components/tiendas/HypeDrop')),
    streetboutique: dynamic(() => import('@/components/tiendas/StreetBoutique')),
    boldyouth: dynamic(() => import('@/components/tiendas/BoldYouth')),
    pinkglam: dynamic(() => import('@/components/tiendas/PinkGlam')),
    novatrend: dynamic(() => import('@/components/tiendas/NovaTrend')),
    influencestyle: dynamic(() => import('@/components/tiendas/InfluenceStyle')),
    avantgarde: dynamic(() => import('@/components/tiendas/AvantGarde')),
    sneakerzone: dynamic(() => import('@/components/tiendas/SneakerZone')),
    eurostyle: dynamic(() => import('@/components/tiendas/EuroStyle')),
    beautybox: dynamic(() => import('@/components/tiendas/BeautyBox')),
    beautyhaven: dynamic(() => import('@/components/tiendas/BeautyHaven')),
    softglow: dynamic(() => import('@/components/tiendas/SoftGlow')),
    freshcraft: dynamic(() => import('@/components/tiendas/FreshCraft')),
    glamangel: dynamic(() => import('@/components/tiendas/GlamAngel')),
    blueretail: dynamic(() => import('@/components/tiendas/BlueRetail')),
    bullseye: dynamic(() => import('@/components/tiendas/Bullseye')),
    bulkzone: dynamic(() => import('@/components/tiendas/BulkZone')),
    starstore: dynamic(() => import('@/components/tiendas/StarStore')),
    luxservice: dynamic(() => import('@/components/tiendas/LuxService')),
    chicstore: dynamic(() => import('@/components/tiendas/ChicStore')),
    elitestore: dynamic(() => import('@/components/tiendas/EliteStore')),
    designerhub: dynamic(() => import('@/components/tiendas/DesignerHub')),
    luxedit: dynamic(() => import('@/components/tiendas/LuxEdit')),
    italiancraft: dynamic(() => import('@/components/tiendas/ItalianCraft')),
    heritagelux: dynamic(() => import('@/components/tiendas/HeritageLux')),
    parisianchic: dynamic(() => import('@/components/tiendas/ParisianChic')),
    milanomodern: dynamic(() => import('@/components/tiendas/MilanoModern')),
    timecraft: dynamic(() => import('@/components/tiendas/TimeCraft')),
    maisonelegance: dynamic(() => import('@/components/tiendas/MaisonElegance')),
    blueclassic: dynamic(() => import('@/components/tiendas/BlueClassic')),
    charmboutique: dynamic(() => import('@/components/tiendas/CharmBoutique')),
    crystalshine: dynamic(() => import('@/components/tiendas/CrystalShine')),
    nordichome: dynamic(() => import('@/components/tiendas/NordicHome')),
    homedecor: dynamic(() => import('@/components/tiendas/HomeDecor')),
    builderzone: dynamic(() => import('@/components/tiendas/BuilderZone')),
    handcraft: dynamic(() => import('@/components/tiendas/HandCraft')),
    petfriend: dynamic(() => import('@/components/tiendas/PetFriend')),
    petworld: dynamic(() => import('@/components/tiendas/PetWorld')),
    sportzone: dynamic(() => import('@/components/tiendas/SportZone')),
    ecooutdoor: dynamic(() => import('@/components/tiendas/EcoOutdoor')),
    extremeexplorer: dynamic(() => import('@/components/tiendas/ExtremeExplorer')),
    greenhealth: dynamic(() => import('@/components/tiendas/GreenHealth')),
    iconshades: dynamic(() => import('@/components/tiendas/IconShades')),
    sportoptics: dynamic(() => import('@/components/tiendas/SportOptics')),
    modernlens: dynamic(() => import('@/components/tiendas/ModernLens')),
    opticalretail: dynamic(() => import('@/components/tiendas/OpticalRetail')),
    shadeshub: dynamic(() => import('@/components/tiendas/ShadesHub')),
};

export default async function PublicStorePage({ params }: { params: Promise<{ identificador_url: string }> }) {
    const resolvedParams = await params;

    const { data: store, error } = await supabase
        .from('tiendas_publicadas')
        .select('store_data, template, name')
        .eq('identificador_url', resolvedParams.identificador_url)
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
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Tienda No Encontrada</h1>
                    <p className="text-gray-500 mb-6">
                        La tienda que buscas ({resolvedParams.identificador_url}) no existe o ha sido eliminada por su creador.
                    </p>
                    <a href="https://landingcod.com" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition w-full block">
                        Crear mi propia tienda
                    </a>
                </div>
            </div>
        );
    }

    const TemplateComponent = templateComponents[store.template];
    if (!TemplateComponent) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full">
                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Error de Plantilla</h1>
                    <p className="text-gray-500 mb-4">No se encontró la plantilla de tienda en el sistema.</p>
                    <div className="bg-gray-100 rounded-lg p-4 text-left mb-6 space-y-1">
                        <p className="text-xs font-mono text-red-600">ERROR: STORE_TEMPLATE_NOT_FOUND</p>
                        <p className="text-xs font-mono text-gray-600">template: {store.template}</p>
                        <p className="text-xs font-mono text-gray-600">URL: {resolvedParams.identificador_url}</p>
                    </div>
                    <a href={`https://wa.me/595973532550?text=${encodeURIComponent(`Error de plantilla en tienda. Template: ${store.template}, URL: ${resolvedParams.identificador_url}`)}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition w-full block text-center">
                        Contactar Soporte
                    </a>
                </div>
            </div>
        );
    }

    return (
        <CartProvider>
            <FloatingCartProvider>
                <div suppressHydrationWarning className="min-h-screen bg-white">
                    <title>{store.name}</title>
                    <ProductClickWrapper identificadorUrl={resolvedParams.identificador_url}>
                        <StoreCartWrapper 
                            storeName={store.name} 
                            storeData={store.store_data}
                            template={store.template}
                        >
                            {/* NUEVO: Sistema global de carrito flotante */}
                            <GlobalFloatingCart storeData={store.store_data} />
                            {/* NUEVO: Desactivador global de enlaces de navegación */}
                            <GlobalNavigationDisabler enabled={store.store_data?.viewOnlyMode?.enabled || false} />
                            {store.store_data?.visualCustomizations && (
                                <VisualCustomizationApplier
                                    customizations={store.store_data.visualCustomizations.customizations || []}
                                    injectedComponents={store.store_data.visualCustomizations.injectedComponents || []}
                                />
                            )}
                            <TemplateComponent data={store.store_data} />
                        </StoreCartWrapper>
                    </ProductClickWrapper>
                </div>
            </FloatingCartProvider>
        </CartProvider>
    );
}
