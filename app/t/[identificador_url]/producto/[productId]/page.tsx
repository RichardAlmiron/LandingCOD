import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';
import React from 'react';
import type { StoreData } from '@/lib/types';
import ProductStandardPage from '@/components/tiendas/ProductStandardPage';
import { resolverCodigoPlantilla } from '@/lib/types-categorias';

// Dynamic imports para componentes PDP (solo páginas premium)
const PdpSaludEstandar = dynamic(() => import('@/components/pdp/salud/general/PdpSaludEstandar'));
const PdpHerramientasEstandar = dynamic(() => import('@/components/pdp/herramientas/general/PdpHerramientasEstandar'));
const PdpBellezaEstandar = dynamic(() => import('@/components/pdp/belleza/general/PdpBellezaEstandar'));
const PdpHogarEstandar = dynamic(() => import('@/components/pdp/hogar/general/PdpHogarEstandar'));
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
  'standard-salud':            PdpSaludEstandar,
  'standard-herramientas':     PdpHerramientasEstandar,
  'standard-belleza':          PdpBellezaEstandar,
  'standard-hogar':            PdpHogarEstandar,
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
  
  const templateId = data.pdpTemplate || '';
  if (!templateId) return null;
  const codigo = resolverCodigoPlantilla(templateId);
  const Component = COMPONENTES_DINAMICOS[codigo];
  if (!Component) return null;
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
    const templateId = storeData.pdpTemplate || '';
    const codigo = templateId ? resolverCodigoPlantilla(templateId) : '';
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error de Plantilla PDP</h1>
          <p className="text-gray-500 mb-4">No se pudo cargar la página de producto premium.</p>
          <div className="bg-gray-100 rounded-lg p-4 text-left mb-6 space-y-1">
            <p className="text-xs font-mono text-red-600">ERROR: PDP_RENDER_FAILED</p>
            <p className="text-xs font-mono text-gray-600">productPageType: {storeData.productPageType}</p>
            <p className="text-xs font-mono text-gray-600">pdpTemplate: {templateId || 'vacío'}</p>
            <p className="text-xs font-mono text-gray-600">código resuelto: {codigo || 'vacío'}</p>
            <p className="text-xs font-mono text-gray-600">tienda: {resolvedParams.identificador_url}</p>
            <p className="text-xs font-mono text-gray-600">producto: {resolvedParams.productId}</p>
          </div>
          <a href={`https://wa.me/595973532550?text=${encodeURIComponent(`Error PDP en tienda ${resolvedParams.identificador_url}, producto ${resolvedParams.productId}. Template: ${templateId}, Código: ${codigo}`)}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition w-full block text-center">
            Contactar Soporte
          </a>
        </div>
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
