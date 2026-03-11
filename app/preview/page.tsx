'use client';
import React, { useEffect, useState } from 'react';
import { defaultStore, StoreData } from '@/lib/types';
import MegaMarketTemplate from '@/components/templates/MegaMarket';
import FlashDealsTemplate from '@/components/templates/FlashDeals';
import { Loader2, Trash2 } from 'lucide-react';
// Import other templates as needed or dynamically lazy load them
import dynamic from 'next/dynamic';

const templateComponents: Record<string, any> = {
    megamarket: dynamic(() => import('@/components/templates/MegaMarket')),
    flashdeals: dynamic(() => import('@/components/templates/FlashDeals')),
    tradevault: dynamic(() => import('@/components/templates/TradeVault')),
    mercadocod: dynamic(() => import('@/components/templates/MercadoCOD')),
    trendfast: dynamic(() => import('@/components/templates/TrendFast')),
    minimaltech: dynamic(() => import('@/components/templates/MinimalTech')),
    boldathlete: dynamic(() => import('@/components/templates/BoldAthlete')),
    editorialchic: dynamic(() => import('@/components/templates/EditorialChic')),
    handcraft: dynamic(() => import('@/components/templates/HandCraft')),
    blueretail: dynamic(() => import('@/components/templates/BlueRetail')),
    bidzone: dynamic(() => import('@/components/templates/BidZone')),
    nordichome: dynamic(() => import('@/components/templates/NordicHome')),
    bullseye: dynamic(() => import('@/components/templates/Bullseye')),
    beautybox: dynamic(() => import('@/components/templates/BeautyBox')),
    techretail: dynamic(() => import('@/components/templates/TechRetail')),
    stylepress: dynamic(() => import('@/components/templates/StylePress')),
    homedecor: dynamic(() => import('@/components/templates/HomeDecor')),
    builderzone: dynamic(() => import('@/components/templates/BuilderZone')),
    bulkzone: dynamic(() => import('@/components/templates/BulkZone')),
    sportstripe: dynamic(() => import('@/components/templates/SportStripe')),
    futuretech: dynamic(() => import('@/components/templates/FutureTech')),
    yogapremium: dynamic(() => import('@/components/templates/YogaPremium')),
    redstyle: dynamic(() => import('@/components/templates/RedStyle')),
    zenbasic: dynamic(() => import('@/components/templates/ZenBasic')),
    classicwear: dynamic(() => import('@/components/templates/ClassicWear')),
    familyfun: dynamic(() => import('@/components/templates/FamilyFun')),
    starstore: dynamic(() => import('@/components/templates/StarStore')),
    luxservice: dynamic(() => import('@/components/templates/LuxService')),
    chicstore: dynamic(() => import('@/components/templates/ChicStore')),
    elitestore: dynamic(() => import('@/components/templates/EliteStore')),
    designerhub: dynamic(() => import('@/components/templates/DesignerHub')),
    luxedit: dynamic(() => import('@/components/templates/LuxEdit')),
    influencestyle: dynamic(() => import('@/components/templates/InfluenceStyle')),
    boldyouth: dynamic(() => import('@/components/templates/BoldYouth')),
    pinkglam: dynamic(() => import('@/components/templates/PinkGlam')),
    novatrend: dynamic(() => import('@/components/templates/NovaTrend')),
    softglow: dynamic(() => import('@/components/templates/SoftGlow')),
    beautyhaven: dynamic(() => import('@/components/templates/BeautyHaven')),
    freshcraft: dynamic(() => import('@/components/templates/FreshCraft')),
    progamer: dynamic(() => import('@/components/templates/ProGamer')),
    gamevault: dynamic(() => import('@/components/templates/GameVault')),
    keymarket: dynamic(() => import('@/components/templates/KeyMarket')),
    verifymarket: dynamic(() => import('@/components/templates/VerifyMarket')),
    techparts: dynamic(() => import('@/components/templates/TechParts')),
    cashflow: dynamic(() => import('@/components/templates/CashFlow')),
    primegoods: dynamic(() => import('@/components/templates/PrimeGoods')),
    pricedrop: dynamic(() => import('@/components/templates/PriceDrop')),
    eurostyle: dynamic(() => import('@/components/templates/EuroStyle')),
    sneakerzone: dynamic(() => import('@/components/templates/SneakerZone')),
    glamangel: dynamic(() => import('@/components/templates/GlamAngel')),
    ecooutdoor: dynamic(() => import('@/components/templates/EcoOutdoor')),
    extremeexplorer: dynamic(() => import('@/components/templates/ExtremeExplorer')),
    fitmodern: dynamic(() => import('@/components/templates/FitModern')),
    hypedrop: dynamic(() => import('@/components/templates/HypeDrop')),
    streetboutique: dynamic(() => import('@/components/templates/StreetBoutique')),
    avantgarde: dynamic(() => import('@/components/templates/AvantGarde')),
    petfriend: dynamic(() => import('@/components/templates/PetFriend')),
    petworld: dynamic(() => import('@/components/templates/PetWorld')),
    sportzone: dynamic(() => import('@/components/templates/SportZone')),
    greenhealth: dynamic(() => import('@/components/templates/GreenHealth')),
    timecraft: dynamic(() => import('@/components/templates/TimeCraft')),
    maisonelegance: dynamic(() => import('@/components/templates/MaisonElegance')),
    blueclassic: dynamic(() => import('@/components/templates/BlueClassic')),
    charmboutique: dynamic(() => import('@/components/templates/CharmBoutique')),
    crystalshine: dynamic(() => import('@/components/templates/CrystalShine')),
    iconshades: dynamic(() => import('@/components/templates/IconShades')),
    sportoptics: dynamic(() => import('@/components/templates/SportOptics')),
    modernlens: dynamic(() => import('@/components/templates/ModernLens')),
    opticalretail: dynamic(() => import('@/components/templates/OpticalRetail')),
    shadeshub: dynamic(() => import('@/components/templates/ShadesHub')),
    italiancraft: dynamic(() => import('@/components/templates/ItalianCraft')),
    heritagelux: dynamic(() => import('@/components/templates/HeritageLux')),
    parisianchic: dynamic(() => import('@/components/templates/ParisianChic')),
    milanomodern: dynamic(() => import('@/components/templates/MilanoModern')),
    futureauto: dynamic(() => import('@/components/templates/FutureAuto')),
};

export default function FullscreenPreview() {
    const [data, setData] = useState<{ store: StoreData, template: string } | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        // Check for ?template= query param (used by carousel 3D previews)
        const params = new URLSearchParams(window.location.search);
        const templateParam = params.get('template');
        if (templateParam && templateComponents[templateParam]) {
            setData({ store: defaultStore, template: templateParam });
            return;
        }

        const stored = localStorage.getItem('landing_preview_data');
        if (stored) {
            try {
                setData(JSON.parse(stored));
            } catch (e) {
                console.error(e);
                setData({ store: defaultStore, template: 'megamarket' });
            }
        } else {
            setData({ store: defaultStore, template: 'megamarket' });
        }

        // Check if user is admin
        fetch('/api/auth/me')
            .then(res => res.json())
            .then(data => {
                if (data.user && data.user.role === 'admin') {
                    setIsAdmin(true);
                }
            })
            .catch(console.error);

    }, []);

    const handleDeleteTemplate = async () => {
        if (!data?.template) return;
        if (!confirm('¿Estás seguro de que deseas mover esta plantilla a la papelera? Podrás recuperarla desde el Admin Builder si lo deseas.')) return;
        
        setIsDeleting(true);
        try {
            // Check if it's a store or PDP by trying both APIs starting with the most probable one (Stores)
            let isPdp = data.template.includes('-'); // Fast heuristic, pdps usually have urgency-1, trust-2

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

    const TemplateComponent = templateComponents[data.template] || templateComponents.megamarket;

    return (
        <div suppressHydrationWarning className="min-h-screen bg-white relative">
            <TemplateComponent data={data.store} />
            
            {isAdmin && (
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
