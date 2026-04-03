// ── Responsabilidad única: gestionar el flujo de publicación ──
// No sabe de templates, no sabe de productos, no sabe de pasos.

import { useState, useCallback } from 'react';
import { builderApi } from '@/lib/builder-api';

export function useBuilderPublish() {
    const [showModal, setShowModal] = useState(false);
    const [slug, setSlug] = useState('');
    const [published, setPublished] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [error, setError] = useState('');

    const open = useCallback(() => {
        setShowModal(true);
        setPublished(false);
        setError('');
    }, []);

    const close = useCallback(() => {
        setShowModal(false);
        setPublished(false);
        setError('');
    }, []);

    const publish = useCallback(async (payload: {
        storeData: any;
        template: string;
        flowType: 'store' | 'pdp';
        userId?: string;
        userName?: string;
        userEmail?: string;
        activeProductId?: string | null;
        onSuccess?: () => void;
    }) => {
        setPublishing(true);
        setError('');

        const now = new Date();
        const storeDataToPublish = {
            ...payload.storeData,
            productPageType: payload.flowType === 'pdp' ? 'premium' : (payload.storeData.productPageType || 'standard'),
            products: (payload.flowType === 'pdp' && payload.activeProductId)
                ? payload.storeData.products.filter((p: any) => p.id === payload.activeProductId)
                : payload.storeData.products,
            _publish_metadata: {
                fecha_guardado: now.toLocaleDateString('es-ES'),
                dia: now.getDate().toString().padStart(2, '0'),
                mes: (now.getMonth() + 1).toString().padStart(2, '0'),
                año: now.getFullYear().toString(),
                hora: now.toLocaleTimeString('es-ES'),
                usuario_id: payload.userId || 'Desconocido',
                usuario_nombre_exacto: payload.userName || 'Desconocido',
                usuario_correo: payload.userEmail || 'Desconocido',
            },
        };

        try {
            const result = await builderApi.publish({
                identificador_url: slug,
                storeData: storeDataToPublish,
                template: payload.flowType === 'pdp' ? (payload.storeData.pdpTemplate || payload.template) : payload.template,
                flowType: payload.flowType,
            });

            if (result.success) {
                setPublished(true);
                payload.onSuccess?.();
            } else {
                setError(result.error || 'Error al publicar');
            }
        } catch {
            setError('Error de red al intentar conectar con el servidor.');
        } finally {
            setPublishing(false);
        }
    }, [slug]);

    return { showModal, slug, setSlug, published, publishing, error, open, close, publish };
}
