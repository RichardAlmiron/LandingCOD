import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import React from 'react';
import nextDynamic from 'next/dynamic';
import type { StoreData } from '@/lib/types';

// Forzar renderizado dinámico porque depende de query params
export const dynamic = 'force-dynamic';

const PdpAggressiveUrgency = nextDynamic(() => import('@/components/templates/pdp/PdpAggressiveUrgency'));
const PdpSocialTrust = nextDynamic(() => import('@/components/templates/pdp/PdpSocialTrust'));
const PdpBundleMaximizer = nextDynamic(() => import('@/components/templates/pdp/PdpBundleMaximizer'));
const PdpStorytelling = nextDynamic(() => import('@/components/templates/pdp/PdpStorytelling'));
const PdpDirectCheckout = nextDynamic(() => import('@/components/templates/pdp/PdpDirectCheckout'));
const PdpHealth = nextDynamic(() => import('@/components/templates/pdp/PdpHealth'));
const PdpElectronics = nextDynamic(() => import('@/components/templates/pdp/PdpElectronics'));
const PdpTools = nextDynamic(() => import('@/components/templates/pdp/PdpTools'));
const PdpBeauty = nextDynamic(() => import('@/components/templates/pdp/PdpBeauty'));
const PdpHome = nextDynamic(() => import('@/components/templates/pdp/PdpHome'));

function getPdpComponent(category: string, templateId: string) {
  const variant = parseInt(templateId.split('-')[1] || '1', 10);

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

  return componentMap[category] || componentMap['urgency'];
}

export default async function PdpPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const resolvedParams = await searchParams;
  const id = resolvedParams.id;

  if (!id) return notFound();

  // Buscar el template PDP desde la BD para saber la categoría
  const { data: pdpTemplate, error } = await supabase
    .from('Paginas_de_Productos_Reutilizables')
    .select('category, name, description')
    .or(`id.eq.${id},template_key.eq.${id}`)
    .is('deleted_at', null)
    .single();

  if (error || !pdpTemplate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white p-8 font-sans">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Plantilla no encontrada</h1>
          <p className="text-zinc-400">
            No se pudo cargar la previsualización de la página de producto. 
            Es posible que haya sido eliminada o que la conexión a la base de datos falle.
          </p>
        </div>
      </div>
    );
  }

  const { Component, variant } = getPdpComponent(pdpTemplate.category, id);

  // Crear datos falsos de tienda para que el componente funcione
  const dummyStoreData: Partial<StoreData> = {
    name: "Tienda Demo",
    pdpCategory: pdpTemplate.category as any,
    pdpTemplate: id,
  };

  const dummyProduct = {
    id: "demo-1",
    title: "Producto de Demostración",
    description: pdpTemplate.description || "Este es un ejemplo visual de cómo se verá tu producto utilizando esta plantilla y esta variante de color.",
    price: "$99.90",
    compareAtPrice: "$149.90",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800"],
    category: "General"
  };

  return (
    <div suppressHydrationWarning className="min-h-screen bg-white">
      <title>Preview: {pdpTemplate.name}</title>
      <Component data={dummyStoreData as StoreData} product={dummyProduct} variant={variant} />
    </div>
  );
}
