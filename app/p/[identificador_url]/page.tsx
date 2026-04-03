import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import React from 'react';
import VisualCustomizationApplier from '@/components/componentes-tiendas/VisualCustomizationApplier';
import { resolverCodigoPlantilla } from '@/lib/types-categorias';
import { resolverComponentePDP, existePlantilla } from '@/lib/plantilla-registry';

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

    const pdpTemplateId = store.pdp_template || store.store_data?.pdpTemplate || '';

    if (!pdpTemplateId) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 text-center px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Error de Configuración</h1>
                    <p className="text-gray-500 mb-4">Esta página no tiene una plantilla de diseño asignada.</p>
                    <div className="bg-gray-100 rounded-lg p-3 text-left mb-6">
                        <p className="text-xs font-mono text-gray-600">URL: {resolvedParams.identificador_url}</p>
                        <p className="text-xs font-mono text-gray-600">pdp_template: vacío</p>
                    </div>
                    <a href={`https://wa.me/595973532550?text=${encodeURIComponent(`Hola Richard, mi página ${resolvedParams.identificador_url} no tiene plantilla asignada.`)}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition w-full block text-center">
                        Contactar Soporte
                    </a>
                </div>
            </div>
        );
    }

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

    // Resolución centralizada via plantilla-registry (fuente única de verdad)
    const codigo = resolverCodigoPlantilla(pdpTemplateId);
    
    if (!existePlantilla(codigo)) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 text-center px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Error de Plantilla</h1>
                    <p className="text-gray-500 mb-4">La plantilla de diseño no se encontró en el sistema.</p>
                    <div className="bg-gray-100 rounded-lg p-3 text-left mb-6">
                        <p className="text-xs font-mono text-gray-600">Template ID: {pdpTemplateId}</p>
                        <p className="text-xs font-mono text-gray-600">Código resuelto: {codigo}</p>
                    </div>
                    <a href={`https://wa.me/595973532550?text=${encodeURIComponent(`Hola Richard, error de plantilla en mi página. Template: ${pdpTemplateId}, Código: ${codigo}, URL: ${resolvedParams.identificador_url}`)}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition w-full block text-center">
                        Contactar Soporte
                    </a>
                </div>
            </div>
        );
    }

    const PdpComponent = resolverComponentePDP(codigo);

    // Extraer variant del ID
    const parts = pdpTemplateId.split('-');
    const lastPart = parseInt(parts[parts.length - 1], 10);
    const variant = isNaN(lastPart) ? 1 : lastPart;

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
