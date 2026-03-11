import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';
import React from 'react';
import type { StoreData } from '@/lib/types';

// Dynamic imports for PDP components
const PdpAggressiveUrgency = dynamic(() => import('@/components/templates/pdp/PdpAggressiveUrgency'));
const PdpSocialTrust = dynamic(() => import('@/components/templates/pdp/PdpSocialTrust'));
const PdpBundleMaximizer = dynamic(() => import('@/components/templates/pdp/PdpBundleMaximizer'));
const PdpStorytelling = dynamic(() => import('@/components/templates/pdp/PdpStorytelling'));
const PdpDirectCheckout = dynamic(() => import('@/components/templates/pdp/PdpDirectCheckout'));
const PdpHealth = dynamic(() => import('@/components/templates/pdp/PdpHealth'));
const PdpElectronics = dynamic(() => import('@/components/templates/pdp/PdpElectronics'));
const PdpTools = dynamic(() => import('@/components/templates/pdp/PdpTools'));
const PdpBeauty = dynamic(() => import('@/components/templates/pdp/PdpBeauty'));
const PdpHome = dynamic(() => import('@/components/templates/pdp/PdpHome'));

function getPdpComponent(data: StoreData) {
  const variant = parseInt(data.pdpTemplate?.split('-')[1] || '1', 10);

  const componentMap: Record<string, { Component: any; variant: number }> = {
    urgency: { Component: PdpAggressiveUrgency, variant },
    trust: { Component: PdpSocialTrust, variant },
    bundle: { Component: PdpBundleMaximizer, variant },
    story: { Component: PdpStorytelling, variant },
    direct: { Component: PdpDirectCheckout, variant },
    health: { Component: PdpHealth, variant },
    electronics: { Component: PdpElectronics, variant },
    tools: { Component: PdpTools, variant },
    beauty: { Component: PdpBeauty, variant },
    home: { Component: PdpHome, variant },
  };

  return componentMap[data.pdpCategory] || componentMap['urgency'];
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

  const { Component, variant } = getPdpComponent(storeData);

  return (
    <div suppressHydrationWarning className="min-h-screen bg-white">
      <title>{product.title} - {store.name}</title>
      <Component data={storeData} product={product} variant={variant} />
    </div>
  );
}
