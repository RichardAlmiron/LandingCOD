'use client';
import React from 'react';
import { PLAYGROUND_MODELS } from '@/lib/playground-models';
import { Layers } from 'lucide-react';

export default function PlaygroundTab() {
    if (PLAYGROUND_MODELS.length === 0) {
        return (
            <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', padding: '80px 20px', textAlign: 'center',
            }}>
                <Layers size={48} style={{ color: 'rgba(255,255,255,0.08)', marginBottom: 16 }} />
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'rgba(255,255,255,0.3)', margin: '0 0 8px 0' }}>
                    Playground Vacío
                </h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)', maxWidth: 400, margin: 0 }}>
                    No hay modelos de PDP configurados. Los nuevos modelos aparecerán aquí.
                </p>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PLAYGROUND_MODELS.map(m => (
                <div key={m.id}>{m.name}</div>
            ))}
        </div>
    );
}
