import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import React from 'react';

// Forzar renderizado dinámico porque depende de query params
export const dynamic = 'force-dynamic';

export default async function PdpPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const resolvedParams = await searchParams;
  const id = resolvedParams.id;

  if (!id) return notFound();

  // Buscar el template PDP desde la BD
  const { data: pdpTemplate, error } = await supabase
    .from('Paginas_de_Productos_Reutilizables')
    .select('html_content, name')
    .or(`id.eq.${id},template_key.eq.${id}`)
    .is('deleted_at', null)
    .single();

  if (error || !pdpTemplate || !pdpTemplate.html_content) {
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

  // Renderizar la página completa simulando variables del producto y tienda temporalmente o mostrar tal cual si es independiente.
  return (
    <div suppressHydrationWarning className="min-h-screen bg-white">
      <title>Preview: {pdpTemplate.name}</title>
      <div dangerouslySetInnerHTML={{ __html: pdpTemplate.html_content }} />
    </div>
  );
}
