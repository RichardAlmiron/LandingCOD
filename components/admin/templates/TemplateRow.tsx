'use client';
import React, { useState } from 'react';
import { TemplateType, TemplateRecord } from '@/hooks/useTemplates';
import { CategoriaConSubcategorias } from '@/lib/types-categorias';
import { CheckCircle2, XCircle, Loader2, Store, LayoutTemplate, Trash2, CheckSquare, Square, Eye } from 'lucide-react';

interface TemplateRowProps {
    item: TemplateRecord;
    tab: TemplateType;
    isSelected: boolean;
    actionLoading: boolean;
    categorias?: CategoriaConSubcategorias[];
    onToggle: () => void;
    onVerify: () => void;
    onDelete: () => void;
    onCategoryChange?: (categoriaId: string | null, subcategoriaId: string | null) => void;
}

export function TemplateRow({ item, tab, isSelected, actionLoading, categorias, onToggle, onVerify, onDelete, onCategoryChange }: TemplateRowProps) {
    const isPdp = tab === 'pdps';
    const gridCols = isPdp ? '44px 1fr 200px 180px 120px 140px' : '44px 1fr 180px 120px 140px';

    const [catDropOpen, setCatDropOpen] = useState(false);

    // Find current category from item
    const currentCat = categorias?.find(c => c.nombre === item.categoria_nombre);

    return (
        <div onClick={onToggle} role="row" style={{
            display: 'grid', gridTemplateColumns: gridCols,
            padding: '14px 20px', alignItems: 'center', cursor: 'pointer',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
            background: isSelected ? 'rgba(99,102,241,0.06)' : 'transparent',
            transition: 'background 0.15s',
        }}
            onMouseOver={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
            onMouseOut={e => { e.currentTarget.style.background = isSelected ? 'rgba(99,102,241,0.06)' : 'transparent'; }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: isSelected ? '#6366f1' : 'rgba(255,255,255,0.25)' }}>
                {isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {item.image_url ? (
                    <img src={item.image_url} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
                ) : (
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {tab === 'stores' ? <Store size={18} style={{ color: '#6366f1' }} /> : <LayoutTemplate size={18} style={{ color: '#6366f1' }} />}
                    </div>
                )}
                <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{item.name}</div>
                    {item.description && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2, maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.description}</div>}
                </div>
            </div>

            {/* ── Columna Categoría (solo PDPs) ── */}
            {isPdp && (
                <div onClick={e => e.stopPropagation()} style={{ position: 'relative' }}>
                    {item.categoria_nombre ? (
                        <button onClick={() => setCatDropOpen(!catDropOpen)} style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                            background: `${item.categoria_color || '#6366f1'}18`, color: item.categoria_color || '#a78bfa',
                            border: `1px solid ${item.categoria_color || '#6366f1'}40`,
                        }}>
                            {currentCat?.icono || '📦'} {item.categoria_nombre}
                            {item.subcategoria_nombre && <span style={{ opacity: 0.7, fontSize: 10 }}>/ {item.subcategoria_nombre}</span>}
                        </button>
                    ) : (
                        <button onClick={() => setCatDropOpen(!catDropOpen)} style={{
                            display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                            background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.35)', border: '1px dashed rgba(255,255,255,0.15)',
                        }}>
                            + Asignar
                        </button>
                    )}

                    {/* Dropdown */}
                    {catDropOpen && categorias && (
                        <CategoryDropdown
                            categorias={categorias}
                            currentCatId={currentCat?.id || null}
                            onSelect={(catId, subId) => {
                                setCatDropOpen(false);
                                onCategoryChange?.(catId, subId);
                            }}
                            onClose={() => setCatDropOpen(false)}
                        />
                    )}
                </div>
            )}

            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.id.substring(0, 16)}...</div>
            <div style={{ textAlign: 'center' }}>
                {item.verified
                    ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}><CheckCircle2 size={12} /> Verificado</span>
                    : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}><XCircle size={12} /> Pendiente</span>
                }
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }} onClick={e => e.stopPropagation()}>
                <button onClick={() => {
                    const code = item.codigo || item.id;
                    const type = isPdp ? 'pdp' : 'store';
                    window.open(`/preview?template=${code}&type=${type}`, '_blank');
                }} title="Previsualizar" style={{
                    width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(99,102,241,0.1)', color: '#a78bfa',
                }}><Eye size={14} /></button>
                <button onClick={onVerify} disabled={actionLoading} title={item.verified ? 'Quitar verificación' : 'Verificar'} style={{
                    width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: item.verified ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)', color: item.verified ? '#ef4444' : '#10b981',
                }}>{actionLoading ? <Loader2 size={14} className="animate-spin" /> : item.verified ? <XCircle size={14} /> : <CheckCircle2 size={14} />}</button>
                <button onClick={onDelete} disabled={actionLoading} title="Eliminar" style={{
                    width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(239,68,68,0.08)', color: '#ef4444',
                }}><Trash2 size={14} /></button>
            </div>
        </div>
    );
}

/* ── Dropdown de categoría/subcategoría ── */
function CategoryDropdown({ categorias, currentCatId, onSelect, onClose }: {
    categorias: CategoriaConSubcategorias[];
    currentCatId: string | null;
    onSelect: (catId: string | null, subId: string | null) => void;
    onClose: () => void;
}) {
    const [step, setStep] = useState<'cat' | 'sub'>('cat');
    const [selectedCat, setSelectedCat] = useState<CategoriaConSubcategorias | null>(null);

    return (
        <>
            {/* Backdrop */}
            <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 99 }} />
            <div style={{
                position: 'absolute', top: '100%', left: 0, marginTop: 4, zIndex: 100,
                minWidth: 220, maxHeight: 300, overflowY: 'auto',
                background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12,
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)', padding: 4,
            }}>
                {step === 'cat' ? (
                    <>
                        <div style={{ padding: '6px 10px', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Seleccionar categoría
                        </div>
                        {/* Option to remove category */}
                        {currentCatId && (
                            <button onClick={() => onSelect(null, null)} style={{
                                width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8,
                                border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                                background: 'transparent', color: '#ef4444', textAlign: 'left',
                            }}
                                onMouseOver={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                            >
                                ✕ Quitar categoría
                            </button>
                        )}
                        {categorias.map(cat => (
                            <button key={cat.id} onClick={() => {
                                if (cat.subcategorias.length > 0) {
                                    setSelectedCat(cat);
                                    setStep('sub');
                                } else {
                                    onSelect(cat.id, null);
                                }
                            }} style={{
                                width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8,
                                border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                                background: cat.id === currentCatId ? 'rgba(99,102,241,0.12)' : 'transparent',
                                color: '#fff', textAlign: 'left',
                            }}
                                onMouseOver={e => e.currentTarget.style.background = cat.id === currentCatId ? 'rgba(99,102,241,0.18)' : 'rgba(255,255,255,0.06)'}
                                onMouseOut={e => e.currentTarget.style.background = cat.id === currentCatId ? 'rgba(99,102,241,0.12)' : 'transparent'}
                            >
                                <span style={{ fontSize: 16 }}>{cat.icono}</span>
                                <span>{cat.nombre}</span>
                                {cat.subcategorias.length > 0 && <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>▸</span>}
                            </button>
                        ))}
                    </>
                ) : selectedCat && (
                    <>
                        <button onClick={() => { setStep('cat'); setSelectedCat(null); }} style={{
                            width: '100%', display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 8,
                            border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700, background: 'transparent', color: 'rgba(255,255,255,0.4)',
                        }}>
                            ◂ Volver
                        </button>
                        <div style={{ padding: '4px 10px', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
                            {selectedCat.icono} {selectedCat.nombre}
                        </div>
                        {/* Option: only category, no subcategory */}
                        <button onClick={() => onSelect(selectedCat.id, null)} style={{
                            width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8,
                            border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                            background: 'transparent', color: 'rgba(255,255,255,0.5)', textAlign: 'left', fontStyle: 'italic',
                        }}
                            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                            onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                        >
                            Solo categoría (sin sub)
                        </button>
                        {selectedCat.subcategorias.map(sub => (
                            <button key={sub.id} onClick={() => onSelect(selectedCat.id, sub.id)} style={{
                                width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8,
                                border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                                background: 'transparent', color: '#fff', textAlign: 'left',
                            }}
                                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                            >
                                <span style={{ fontSize: 14 }}>{sub.icono}</span>
                                <span>{sub.nombre}</span>
                            </button>
                        ))}
                    </>
                )}
            </div>
        </>
    );
}