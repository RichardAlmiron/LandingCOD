import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import React from 'react';
import type { StoreData } from '@/lib/types';

export default async function ProductPage({ params }: { params: Promise<{ identificador_url: string; productId: string }> }) {
  const resolvedParams = await params;

  // Fetch store from Supabase
  const { data: store, error } = await supabase
    .from('tiendas_publicadas')
    .select('store_data, template, name')
    .eq('identificador_url', resolvedParams.identificador_url)
    .single();

  if (error || !store) return notFound();

  const storeData = store.store_data as StoreData;
  const product = storeData.products.find(p => p.id === resolvedParams.productId);

  if (!product) return notFound();

  // Buscar el template PDP desde la BD
  const pdpTemplateId = storeData.pdpTemplate || storeData.pdpCategory || null;
  let pdpHtml: string | null = null;

  if (pdpTemplateId) {
    const { data: pdpTemplate } = await supabase
      .from('Paginas_de_Productos_Reutilizables')
      .select('html_content, name')
      .or(`id.eq.${pdpTemplateId},template_key.eq.${pdpTemplateId}`)
      .is('deleted_at', null)
      .single();

    if (pdpTemplate?.html_content) {
      pdpHtml = pdpTemplate.html_content;
    }
  }

  // Si hay HTML del template PDP, renderizarlo; si no, fallback básico
  if (pdpHtml) {
    return (
      <div suppressHydrationWarning className="min-h-screen bg-white">
        <title>{product.title} - {store.name}</title>
        <div dangerouslySetInnerHTML={{ __html: pdpHtml }} />
      </div>
    );
  }

  // Fallback: página de producto básica
  return (
    <div suppressHydrationWarning className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 p-8">
      <title>{product.title} - {store.name}</title>
      {product.imageUrl && (
        <img src={product.imageUrl} alt={product.title} style={{ maxWidth: 400, borderRadius: 12 }} />
      )}
      <div style={{ textAlign: 'center', maxWidth: 500 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{product.title}</h1>
        <p style={{ color: '#666', marginBottom: 16 }}>{product.description}</p>
        <div style={{ fontSize: 28, fontWeight: 900, color: '#10b981', marginBottom: 24 }}>{product.price}</div>
        <button style={{ background: '#10b981', color: '#fff', padding: '14px 40px', borderRadius: 12, border: 'none', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
          Comprar Ahora
        </button>
      </div>
    </div>
  );
}
