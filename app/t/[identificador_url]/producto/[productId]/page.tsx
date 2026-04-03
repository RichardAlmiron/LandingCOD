import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';
import React from 'react';
import type { StoreData } from '@/lib/types';
import ProductStandardPage from '@/components/tiendas/ProductStandardPage';
import { resolverCodigoPlantilla, MAPA_LEGACY_A_STANDARD } from '@/lib/types-categorias';

// Dynamic imports para componentes PDP (solo páginas premium)
const PdpUrgenciaMaxima = dynamic(() => import('@/components/pdp/electrónico/general/PdpUrgenciaMaxima'));
const PdpPruebaSocial = dynamic(() => import('@/components/pdp/electrónico/general/PdpPruebaSocial'));
const PdpOfertaBundle = dynamic(() => import('@/components/pdp/electrónico/general/PdpOfertaBundle'));
const PdpHistoriaProducto = dynamic(() => import('@/components/pdp/electrónico/general/PdpHistoriaProducto'));
const PdpCheckoutDirecto = dynamic(() => import('@/components/pdp/electrónico/general/PdpCheckoutDirecto'));
const PdpSaludEstandar = dynamic(() => import('@/components/pdp/salud/general/PdpSaludEstandar'));
const PdpElectronicoEstandar = dynamic(() => import('@/components/pdp/electrónico/general/PdpElectronicoEstandar'));
const PdpHerramientasEstandar = dynamic(() => import('@/components/pdp/herramientas/general/PdpHerramientasEstandar'));
const PdpBellezaEstandar = dynamic(() => import('@/components/pdp/belleza/general/PdpBellezaEstandar'));
const PdpHogarEstandar = dynamic(() => import('@/components/pdp/hogar/general/PdpHogarEstandar'));
const PdpUrgenciaPremium = dynamic(() => import('@/components/pdp/electrónico/general/PdpUrgenciaPremium'));
const PdpOfertaBundlePremium = dynamic(() => import('@/components/pdp/electrónico/general/PdpPremiumBundle'));
const PdpElectronicoPremium = dynamic(() => import('@/components/pdp/electrónico/general/PdpElectronicoPremium'));
const PdpSaludPremium = dynamic(() => import('@/components/pdp/salud/general/PdpSaludPremium'));
// Celulares
const PdpCelulares = dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelulares'));
const PdpCelularesMinimal = dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesMinimal'));
const PdpCelularesLuxury = dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesLuxury'));
const PdpCelularesGamer = dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesGamer'));
const PdpCelularesEco = dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesEco'));
const PdpCelularesCreator = dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesCreator'));
const PdpCelularesBusiness = dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesBusiness'));
const PdpCelularesOutdoor = dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesOutdoor'));
const PdpCelularesGlass = dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesGlass'));
const PdpCelularesPrestige = dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesPrestige'));
const PdpCelularesMecha = dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesMecha'));
const PdpCelularesSciFi = dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesSciFi'));
const PdpCelularesNordic = dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesNordic'));
const PdpCelularesTerminal = dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesTerminal'));
const PdpCelularesVintage = dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesVintage'));
const PdpCelularesStreetwear = dynamic(() => import('@/components/pdp/electrónico/celulares/PdpCelularesStreetwear'));

// Mapa centralizado: código Standard → componente (dynamic imports para SSR)
const COMPONENTES_DINAMICOS: Record<string, any> = {
  'standard-urgencia':         PdpUrgenciaMaxima,
  'standard-prueba-social':    PdpPruebaSocial,
  'standard-bundle':           PdpOfertaBundle,
  'standard-historia':         PdpHistoriaProducto,
  'standard-checkout-directo': PdpCheckoutDirecto,
  'standard-salud':            PdpSaludEstandar,
  'standard-electronico':      PdpElectronicoEstandar,
  'standard-herramientas':     PdpHerramientasEstandar,
  'standard-belleza':          PdpBellezaEstandar,
  'standard-hogar':            PdpHogarEstandar,
  'premium-urgencia':          PdpUrgenciaPremium,
  'premium-bundle':            PdpOfertaBundlePremium,
  'premium-electronico':       PdpElectronicoPremium,
  'premium-salud':             PdpSaludPremium,
  // Celulares
  'standard-celulares':        PdpCelulares,
  'PDP-CEL-MINIMAL':           PdpCelularesMinimal,
  'PDP-CEL-LUXURY':            PdpCelularesLuxury,
  'PDP-CEL-GAMER':             PdpCelularesGamer,
  'PDP-CEL-ECO':               PdpCelularesEco,
  'PDP-CEL-CREATOR':           PdpCelularesCreator,
  'PDP-CEL-BUSINESS':          PdpCelularesBusiness,
  'PDP-CEL-OUTDOOR':           PdpCelularesOutdoor,
  'PDP-CEL-GLASS':             PdpCelularesGlass,
  'PDP-CEL-PRESTIGE':          PdpCelularesPrestige,
  'PDP-CEL-MECHA':             PdpCelularesMecha,
  'PDP-CEL-SCIFI':             PdpCelularesSciFi,
  'PDP-CEL-NORDIC':            PdpCelularesNordic,
  'PDP-CEL-TERMINAL':          PdpCelularesTerminal,
  'PDP-CEL-VINTAGE':           PdpCelularesVintage,
  'PDP-CEL-STREETWEAR':        PdpCelularesStreetwear,
};

function getPdpComponent(data: StoreData) {
  if (data.productPageType === 'standard') return null;
  
  const templateId = data.pdpTemplate || 'standard-urgencia';
  const codigo = resolverCodigoPlantilla(templateId);
  const Component = COMPONENTES_DINAMICOS[codigo] || PdpUrgenciaMaxima;
  const parts = templateId.split('-');
  const variant = parseInt(parts[parts.length - 1] || '1', 10);

  return { Component, variant: isNaN(variant) ? 1 : variant };
}

export default async function ProductPage({ params }: { params: Promise<{ identificador_url: string; productId: string }> }) {
  const resolvedParams = await params;

  // Fetch store from Supabase
  const { data: store, error } = await supabase
    .from('tiendas_publicadas')
    .select('store_data, template, name')
    .eq('identificador_url', resolvedParams.identificador_url)
    .single();

  if (error || !store) {
    return notFound();
  }

  const storeData = store.store_data as StoreData;
  const product = storeData.products.find(p => p.id === resolvedParams.productId);

  if (!product) {
    return notFound();
  }

  // Verificar tipo de página de producto
  const productPageType = storeData.productPageType || 'standard';

  // Si es página estándar, mostrar ProductStandardPage
  if (productPageType === 'standard') {
    return (
      <div suppressHydrationWarning className="min-h-screen bg-white">
        <title>{product.title} - {store.name}</title>
        <ProductStandardPage product={product} storeData={storeData} />
      </div>
    );
  }

  // Si es premium, usar componentes PDP
  const pdpComponent = getPdpComponent(storeData);
  
  if (!pdpComponent) {
    // Fallback a página estándar si no hay PDP configurado
    return (
      <div suppressHydrationWarning className="min-h-screen bg-white">
        <title>{product.title} - {store.name}</title>
        <ProductStandardPage product={product} storeData={storeData} />
      </div>
    );
  }

  const { Component, variant } = pdpComponent;

  return (
    <div suppressHydrationWarning className="min-h-screen bg-white">
      <title>{product.title} - {store.name}</title>
      <Component data={storeData} product={product} variant={variant} />
    </div>
  );
}
