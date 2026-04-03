'use client';
import React from 'react';
import { TemplateType } from '@/hooks/useTemplates';
import { EstadoFiltro } from '@/hooks/useTemplateFilters';
import { CategoriaConSubcategorias } from '@/lib/types-categorias';
import {
    CheckCircle2, XCircle, Loader2, Search, RefreshCw,
    Store, LayoutTemplate, Trash2, ChevronLeft, ChevronRight, Filter
} from 'lucide-react';

export function PageHeader({ onRefresh }: { onRefresh: () => void }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
                <h1 className="shimmer-text" style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.04em', margin: 0, lineHeight: 1 }}>GESTIÓN DE TEMPLATES</h1>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 600, marginTop: 8, letterSpacing: '0.03em' }}>Verificar y administrar plantillas de tiendas y páginas de producto</p>
            </div>
            <button onClick={onRefresh} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 12, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: '#a78bfa', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                <RefreshCw size={14} /> Actualizar
            </button>
        </div>
    );
}

export function TabBar({ tab, storeCount, pdpCount, playgroundCount, onChange }: { tab: string; storeCount: number; pdpCount: number; playgroundCount: number; onChange: (t: any) => void }) {
    const Beaker = ({ size, ...props }: any) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M4.5 3h15M6 3v16a2 2 0 002 2h8a2 2 0 002-2V3M6 14h12" />
        </svg>
    );
    const tabs = [
        { key: 'stores', label: 'Tiendas', icon: Store, count: storeCount },
        { key: 'pdps', label: 'Páginas de Producto', icon: LayoutTemplate, count: pdpCount },
        { key: 'playground', label: 'Playground', icon: Beaker, count: playgroundCount },
    ];
    return (
        <div style={{ display: 'flex', gap: 8 }}>
            {tabs.map(t => (
                <button key={t.key} onClick={() => onChange(t.key)} style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer',
                    background: tab === t.key ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${tab === t.key ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.08)'}`,
                    color: tab === t.key ? '#fff' : 'rgba(255,255,255,0.5)',
                }}>
                    <t.icon size={16} /> {t.label}
                    <span style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 800, background: tab === t.key ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.06)' }}>{t.count}</span>
                </button>
            ))}
        </div>
    );
}

export function StatsBar({ verified, unverified, search, onSearch, onRefresh }: { verified: number; unverified: number; search: string; onSearch: (v: string) => void; onRefresh: () => void }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>✓ {verified} verificadas</span>
                <span style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>✗ {unverified} sin verificar</span>
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                <input type="text" placeholder="Buscar template..." value={search} onChange={e => onSearch(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', fontSize: 13, outline: 'none' }} />
            </div>
            <button onClick={onRefresh} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', background: 'rgba(99,102,241,0.1)', color: '#a78bfa', border: '1px solid rgba(99,102,241,0.25)', whiteSpace: 'nowrap' }}>
                <RefreshCw size={13} /> Actualizar todo
            </button>
        </div>
    );
}

/* ── Barra de filtros para PDPs ── */
// EstadoFiltro se importa desde @/hooks/useTemplateFilters

export function FilterBar({ tab, estadoFiltro, categoriaFiltro, subcategoriaFiltro, categorias, onEstadoChange, onCategoriaChange, onSubcategoriaChange }: {
    tab: string;
    estadoFiltro: EstadoFiltro;
    categoriaFiltro: string;
    subcategoriaFiltro: string;
    categorias: CategoriaConSubcategorias[];
    onEstadoChange: (v: EstadoFiltro) => void;
    onCategoriaChange: (v: string) => void;
    onSubcategoriaChange: (v: string) => void;
}) {
    if (tab === 'playground') return null;

    const selectedCat = categorias.find(c => c.id === categoriaFiltro);
    const subcategorias = selectedCat?.subcategorias || [];

    const selectStyle: React.CSSProperties = {
        padding: '8px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
        color: '#fff', outline: 'none', minWidth: 140,
    };

    const estadoBtns: { key: EstadoFiltro; label: string; color: string; bg: string; border: string }[] = [
        { key: 'todos', label: 'Todos', color: '#a78bfa', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.25)' },
        { key: 'verificados', label: '✓ Verificados', color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)' },
        { key: 'pendientes', label: '✗ Pendientes', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)' },
    ];

    const hasActiveFilters = estadoFiltro !== 'todos' || categoriaFiltro || subcategoriaFiltro;

    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
            borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
            flexWrap: 'wrap',
        }}>
            <Filter size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Filtros:</span>

            {/* Estado — disponible para stores y pdps */}
            <div style={{ display: 'flex', gap: 4 }}>
                {estadoBtns.map(btn => (
                    <button key={btn.key} onClick={() => onEstadoChange(btn.key)} style={{
                        padding: '5px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                        background: estadoFiltro === btn.key ? btn.bg : 'transparent',
                        border: `1px solid ${estadoFiltro === btn.key ? btn.border : 'rgba(255,255,255,0.08)'}`,
                        color: estadoFiltro === btn.key ? btn.color : 'rgba(255,255,255,0.35)',
                        transition: 'all 0.15s',
                    }}>
                        {btn.label}
                    </button>
                ))}
            </div>

            {/* Categoría y subcategoría — solo PDPs */}
            {tab === 'pdps' && (
                <>
                    <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.08)' }} />
                    <select value={categoriaFiltro} onChange={e => { onCategoriaChange(e.target.value); onSubcategoriaChange(''); }} style={selectStyle}>
                        <option value="" style={{ background: '#1a1a2e' }}>Todas las categorías</option>
                        {categorias.map(c => (
                            <option key={c.id} value={c.id} style={{ background: '#1a1a2e' }}>{c.icono} {c.nombre}</option>
                        ))}
                    </select>
                    {subcategorias.length > 0 && (
                        <select value={subcategoriaFiltro} onChange={e => onSubcategoriaChange(e.target.value)} style={selectStyle}>
                            <option value="" style={{ background: '#1a1a2e' }}>Todas las subcategorías</option>
                            {subcategorias.map(s => (
                                <option key={s.id} value={s.id} style={{ background: '#1a1a2e' }}>{s.icono} {s.nombre}</option>
                            ))}
                        </select>
                    )}
                </>
            )}

            {/* Limpiar filtros — siempre visible cuando hay filtros activos */}
            {hasActiveFilters && (
                <button onClick={() => { onEstadoChange('todos'); onCategoriaChange(''); onSubcategoriaChange(''); }} style={{
                    padding: '5px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                    background: 'transparent', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.08)',
                }}>
                    Limpiar filtros
                </button>
            )}
        </div>
    );
}

export function BulkActionBar({ count, totalFiltered, loading, onVerify, onUnverify, onDelete, onSelectAll, onClear }: {
    count: number; totalFiltered: number; loading: boolean;
    onVerify: () => void; onUnverify: () => void; onDelete: () => void; onSelectAll: () => void; onClear: () => void;
}) {
    if (count === 0) return null;
    const Btn = ({ onClick, bg, color, border, icon, label }: { onClick: () => void; bg: string; color: string; border: string; icon: React.ReactNode; label: string }) => (
        <button onClick={onClick} disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', background: bg, color, border: `1px solid ${border}` }}>
            {loading ? <Loader2 size={12} className="animate-spin" /> : icon} {label}
        </button>
    );
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderRadius: 14, background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#a78bfa' }}>{count} seleccionado{count !== 1 ? 's' : ''}</span>
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)' }} />
            {count < totalFiltered && (
                <button onClick={onSelectAll} disabled={loading} style={{ padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', background: 'rgba(99,102,241,0.15)', color: '#a78bfa', border: '1px solid rgba(99,102,241,0.3)' }}>
                    Seleccionar todos ({totalFiltered})
                </button>
            )}
            <Btn onClick={onVerify} bg="rgba(16,185,129,0.15)" color="#10b981" border="rgba(16,185,129,0.3)" icon={<CheckCircle2 size={12} />} label="Verificar selección" />
            <Btn onClick={onUnverify} bg="rgba(245,158,11,0.12)" color="#f59e0b" border="rgba(245,158,11,0.3)" icon={<XCircle size={12} />} label="Quitar verificación" />
            <Btn onClick={onDelete} bg="rgba(239,68,68,0.15)" color="#ef4444" border="rgba(239,68,68,0.3)" icon={<Trash2 size={12} />} label="Eliminar selección" />
            <button onClick={onClear} style={{ marginLeft: 'auto', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', background: 'transparent', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>Limpiar</button>
        </div>
    );
}

export function TableHeader({ tab }: { tab?: string }) {
    const gridCols = tab === 'pdps' 
        ? '44px 1fr 200px 180px 120px 140px' 
        : '44px 1fr 180px 120px 140px';
    return (
        <div style={{ display: 'grid', gridTemplateColumns: gridCols, padding: '10px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <div /><div>Template</div>{tab === 'pdps' && <div>Categoría</div>}<div>ID</div><div style={{ textAlign: 'center' }}>Estado</div><div style={{ textAlign: 'center' }}>Acciones</div>
        </div>
    );
}

export function Pagination({ page, totalPages, total, hasPrev, hasNext, onPrev, onNext, onGoTo }: {
    page: number; totalPages: number; total: number; hasPrev: boolean; hasNext: boolean;
    onPrev: () => void; onNext: () => void; onGoTo: (p: number) => void;
}) {
    if (totalPages <= 1) return null;
    const pages: (number | '...')[] = [];
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) pages.push(i);
        else if (pages[pages.length - 1] !== '...') pages.push('...');
    }
    const navBtn = (onClick: () => void, enabled: boolean, icon: React.ReactNode) => (
        <button onClick={onClick} disabled={!enabled} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', cursor: enabled ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', background: enabled ? 'rgba(255,255,255,0.06)' : 'transparent', color: enabled ? '#fff' : 'rgba(255,255,255,0.15)' }}>{icon}</button>
    );
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>{total} template{total !== 1 ? 's' : ''} en total</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {navBtn(onPrev, hasPrev, <ChevronLeft size={16} />)}
                {pages.map((p, i) => p === '...'
                    ? <span key={`d${i}`} style={{ width: 32, textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>…</span>
                    : <button key={p} onClick={() => onGoTo(p)} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, background: p === page ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)', color: p === page ? '#a78bfa' : 'rgba(255,255,255,0.4)' }}>{p}</button>
                )}
                {navBtn(onNext, hasNext, <ChevronRight size={16} />)}
            </div>
        </div>
    );
}

export function EmptyState({ tab }: { tab: TemplateType }) {
    return (
        <div style={{ padding: 60, textAlign: 'center' }}>
            {tab === 'stores' ? <Store size={48} style={{ color: 'rgba(255,255,255,0.1)', marginBottom: 16 }} /> : <LayoutTemplate size={48} style={{ color: 'rgba(255,255,255,0.1)', marginBottom: 16 }} />}
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>No se encontraron templates</p>
        </div>
    );
}

export function LoadingState() {
    return (
        <div style={{ padding: 60, textAlign: 'center' }}>
            <Loader2 size={32} className="animate-spin" style={{ color: '#6366f1', marginBottom: 16 }} />
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>Cargando templates...</p>
        </div>
    );
}