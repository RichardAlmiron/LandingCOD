import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';
import React from 'react';
import ProductClickWrapper from '@/components/store/ProductClickWrapper';

const templateComponents: Record<string, any> = {
    megamarket: dynamic(() => import('@/components/templates/MegaMarket')),
    flashdeals: dynamic(() => import('@/components/templates/FlashDeals')),
    tradevault: dynamic(() => import('@/components/templates/TradeVault')),
    mercadocod: dynamic(() => import('@/components/templates/MercadoCOD')),
    bidzone: dynamic(() => import('@/components/templates/BidZone')),
    pricedrop: dynamic(() => import('@/components/templates/PriceDrop')),
    cashflow: dynamic(() => import('@/components/templates/CashFlow')),
    primegoods: dynamic(() => import('@/components/templates/PrimeGoods')),
    minimaltech: dynamic(() => import('@/components/templates/MinimalTech')),
    futuretech: dynamic(() => import('@/components/templates/FutureTech')),
    techretail: dynamic(() => import('@/components/templates/TechRetail')),
    techparts: dynamic(() => import('@/components/templates/TechParts')),
    gamevault: dynamic(() => import('@/components/templates/GameVault')),
    progamer: dynamic(() => import('@/components/templates/ProGamer')),
    keymarket: dynamic(() => import('@/components/templates/KeyMarket')),
    verifymarket: dynamic(() => import('@/components/templates/VerifyMarket')),
    futureauto: dynamic(() => import('@/components/templates/FutureAuto')),
    boldathlete: dynamic(() => import('@/components/templates/BoldAthlete')),
    sportstripe: dynamic(() => import('@/components/templates/SportStripe')),
    editorialchic: dynamic(() => import('@/components/templates/EditorialChic')),
    trendfast: dynamic(() => import('@/components/templates/TrendFast')),
    redstyle: dynamic(() => import('@/components/templates/RedStyle')),
    zenbasic: dynamic(() => import('@/components/templates/ZenBasic')),
    stylepress: dynamic(() => import('@/components/templates/StylePress')),
    classicwear: dynamic(() => import('@/components/templates/ClassicWear')),
    familyfun: dynamic(() => import('@/components/templates/FamilyFun')),
    yogapremium: dynamic(() => import('@/components/templates/YogaPremium')),
    fitmodern: dynamic(() => import('@/components/templates/FitModern')),
    hypedrop: dynamic(() => import('@/components/templates/HypeDrop')),
    streetboutique: dynamic(() => import('@/components/templates/StreetBoutique')),
    boldyouth: dynamic(() => import('@/components/templates/BoldYouth')),
    pinkglam: dynamic(() => import('@/components/templates/PinkGlam')),
    novatrend: dynamic(() => import('@/components/templates/NovaTrend')),
    influencestyle: dynamic(() => import('@/components/templates/InfluenceStyle')),
    avantgarde: dynamic(() => import('@/components/templates/AvantGarde')),
    sneakerzone: dynamic(() => import('@/components/templates/SneakerZone')),
    eurostyle: dynamic(() => import('@/components/templates/EuroStyle')),
    beautybox: dynamic(() => import('@/components/templates/BeautyBox')),
    beautyhaven: dynamic(() => import('@/components/templates/BeautyHaven')),
    softglow: dynamic(() => import('@/components/templates/SoftGlow')),
    freshcraft: dynamic(() => import('@/components/templates/FreshCraft')),
    glamangel: dynamic(() => import('@/components/templates/GlamAngel')),
    blueretail: dynamic(() => import('@/components/templates/BlueRetail')),
    bullseye: dynamic(() => import('@/components/templates/Bullseye')),
    bulkzone: dynamic(() => import('@/components/templates/BulkZone')),
    starstore: dynamic(() => import('@/components/templates/StarStore')),
    luxservice: dynamic(() => import('@/components/templates/LuxService')),
    chicstore: dynamic(() => import('@/components/templates/ChicStore')),
    elitestore: dynamic(() => import('@/components/templates/EliteStore')),
    designerhub: dynamic(() => import('@/components/templates/DesignerHub')),
    luxedit: dynamic(() => import('@/components/templates/LuxEdit')),
    italiancraft: dynamic(() => import('@/components/templates/ItalianCraft')),
    heritagelux: dynamic(() => import('@/components/templates/HeritageLux')),
    parisianchic: dynamic(() => import('@/components/templates/ParisianChic')),
    milanomodern: dynamic(() => import('@/components/templates/MilanoModern')),
    timecraft: dynamic(() => import('@/components/templates/TimeCraft')),
    maisonelegance: dynamic(() => import('@/components/templates/MaisonElegance')),
    blueclassic: dynamic(() => import('@/components/templates/BlueClassic')),
    charmboutique: dynamic(() => import('@/components/templates/CharmBoutique')),
    crystalshine: dynamic(() => import('@/components/templates/CrystalShine')),
    nordichome: dynamic(() => import('@/components/templates/NordicHome')),
    homedecor: dynamic(() => import('@/components/templates/HomeDecor')),
    builderzone: dynamic(() => import('@/components/templates/BuilderZone')),
    handcraft: dynamic(() => import('@/components/templates/HandCraft')),
    petfriend: dynamic(() => import('@/components/templates/PetFriend')),
    petworld: dynamic(() => import('@/components/templates/PetWorld')),
    sportzone: dynamic(() => import('@/components/templates/SportZone')),
    ecooutdoor: dynamic(() => import('@/components/templates/EcoOutdoor')),
    extremeexplorer: dynamic(() => import('@/components/templates/ExtremeExplorer')),
    greenhealth: dynamic(() => import('@/components/templates/GreenHealth')),
    iconshades: dynamic(() => import('@/components/templates/IconShades')),
    sportoptics: dynamic(() => import('@/components/templates/SportOptics')),
    modernlens: dynamic(() => import('@/components/templates/ModernLens')),
    opticalretail: dynamic(() => import('@/components/templates/OpticalRetail')),
    shadeshub: dynamic(() => import('@/components/templates/ShadesHub')),
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

    const TemplateComponent = templateComponents[store.template] || templateComponents.megamarket;

    return (
        <div suppressHydrationWarning className="min-h-screen bg-white">
            <title>{store.name}</title>
            <ProductClickWrapper identificadorUrl={resolvedParams.identificador_url}>
                <TemplateComponent data={store.store_data} />
            </ProductClickWrapper>
        </div>
    );
}
