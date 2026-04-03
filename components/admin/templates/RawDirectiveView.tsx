'use client';
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { RAW_DIRECTIVE } from '@/lib/raw-directive';

export default function RawDirectiveView() {
    const [copied, setCopied] = useState(false);

    const copyAll = async () => {
        await navigator.clipboard.writeText(RAW_DIRECTIVE);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: 0 }}>Prompt Maestro</h3>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: '4px 0 0' }}>
                        Directiva técnica completa — documento original sin modificaciones.
                    </p>
                </div>
                <button onClick={copyAll} style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px',
                    borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    background: copied ? 'rgba(16,185,129,0.12)' : 'rgba(99,102,241,0.1)',
                    border: `1px solid ${copied ? 'rgba(16,185,129,0.25)' : 'rgba(99,102,241,0.25)'}`,
                    color: copied ? '#10b981' : '#a78bfa',
                }}>
                    {copied ? <><Check size={14} /> Copiado</> : <><Copy size={14} /> Copiar Todo</>}
                </button>
            </div>
            <div style={{
                padding: '36px 40px', borderRadius: 16,
                background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)',
                maxHeight: '80vh', overflowY: 'auto',
            }} className="custom-scrollbar">
                <pre style={{
                    margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                    fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
                    fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 2.1,
                    letterSpacing: '0.01em',
                }}>
                    {RAW_DIRECTIVE}
                </pre>
            </div>
        </div>
    );
}
