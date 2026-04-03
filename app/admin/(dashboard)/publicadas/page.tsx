'use client';
import React, { useEffect, useState, useCallback } from 'react';
import {
    Store, LayoutTemplate, Trash2, RefreshCw, Loader2,
    ExternalLink, Search, CheckSquare, Square, AlertTriangle,
    Eye, Copy, Check
} from 'lucide-react';

type TabType = 'stores' | 'pdps';

interface PublishedRecord {
    id: string;
    identificador_url: string;
    name: string;
    template?: string;
    pdp_template?: string;
    status: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

export default function PublicadasPage() {
    const [tab, setTab] = useState<TabType>('stores');
    const [stores, setStores] = useState<PublishedRecord[]>([]);
    const [pdps, setPdps] = useState<PublishedRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isDeleting, setIsDeleting] = useState(false);
    const [search, setSearch] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/tiendas?all=true');
            const data = await res.json();
            if (data.success) {
                setStores(data.stores || []);
                setPdps(data.pdps || []);
            }
        } catch (err) {
            console.error('Error fetching publicadas:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);
    useEffect(() => { setSelectedIds(new Set()); }, [tab]);

    const currentList = tab === 'stores' ? stores : pdps;
    const filtered = currentList.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.identificador_url.toLowerCase().includes(search.toLowerCase())
    );

    const toggleSelect = (id: string) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === filtered.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filtered.map(r => r.id)));
        }
    };

    const handleBulkDelete = async () => {
        if (selectedIds.size === 0) return;
        setIsDeleting(true);
        try {
            const res = await fetch('/api/tiendas', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ids: Array.from(selectedIds),
                    type: tab === 'stores' ? 'store' : 'pdp'
                })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                if (tab === 'stores') {
                    setStores(prev => prev.filter(s => !selectedIds.has(s.id)));
                } else {
                    setPdps(prev => prev.filter(p => !selectedIds.has(p.id)));
                }
                setSelectedIds(new Set());
            } else {
                alert(data.error || 'Error al eliminar');
            }
        } catch (err) {
            console.error('Error deleting:', err);
            alert('Error de red al eliminar');
        } finally {
            setIsDeleting(false);
            setShowConfirm(false);
        }
    };

    const handleCopyName = async (record: PublishedRecord) => {
        const textToCopy = `${record.name} [${record.id}]`;
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopiedId(record.id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch {
            // Fallback
            const ta = document.createElement('textarea');
            ta.value = textToCopy;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            setCopiedId(record.id);
            setTimeout(() => setCopiedId(null), 2000);
        }
    };

    const handlePreview = (record: PublishedRecord) => {
        const prefix = tab === 'stores' ? 't' : 'p';
        window.open(`/${prefix}/${record.identificador_url}`, '_blank');
    };

    const formatDate = (d: string) => {
        try {
            return new Date(d).toLocaleDateString('es-ES', {
                day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
            });
        } catch { return d; }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Blinking green number animation */}
            <style>{`
                @keyframes greenBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
                .num-blink {
                    animation: greenBlink 1.5s ease-in-out infinite;
                    color: #22c55e;
                    text-shadow: 0 0 8px rgba(34,197,94,0.6);
                    font-weight: 800;
                    font-size: 14px;
                    font-variant-numeric: tabular-nums;
                    min-width: 28px;
                    text-align: center;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }
                .copy-btn:hover {
                    background: rgba(99,102,241,0.2) !important;
                    border-color: rgba(99,102,241,0.4) !important;
                }
                .preview-btn:hover {
                    background: rgba(16,185,129,0.2) !important;
                    border-color: rgba(16,185,129,0.4) !important;
                }
            `}</style>

            {/* Header */}
            <div>
                <h1 className="shimmer-text" style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>
                    TIENDAS Y PDPs PUBLICADAS
                </h1>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                    Gestiona todas las tiendas y páginas de producto publicadas en la plataforma.
                </p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 8 }}>
                <button
                    onClick={() => setTab('stores')}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '10px 20px', borderRadius: 10, fontSize: 13, fontWeight: 700,
                        background: tab === 'stores' ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
                        border: tab === 'stores' ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.08)',
                        color: tab === 'stores' ? '#a78bfa' : 'rgba(255,255,255,0.5)',
                        cursor: 'pointer', transition: 'all 0.2s',
                    }}
                >
                    <Store size={16} />
                    Tiendas ({stores.length})
                </button>
                <button
                    onClick={() => setTab('pdps')}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '10px 20px', borderRadius: 10, fontSize: 13, fontWeight: 700,
                        background: tab === 'pdps' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.04)',
                        border: tab === 'pdps' ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.08)',
                        color: tab === 'pdps' ? '#6ee7b7' : 'rgba(255,255,255,0.5)',
                        cursor: 'pointer', transition: 'all 0.2s',
                    }}
                >
                    <LayoutTemplate size={16} />
                    PDPs ({pdps.length})
                </button>
            </div>

            {/* Toolbar: Search + Actions */}
            <div className="ultra-glass" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <input
                        className="neo-input"
                        placeholder="Buscar por nombre o URL..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{ paddingLeft: 44, width: '100%' }}
                    />
                    <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
                </div>

                <button
                    onClick={fetchData}
                    disabled={loading}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '10px 16px', borderRadius: 10, fontSize: 12, fontWeight: 700,
                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                        color: 'rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'all 0.2s',
                    }}
                >
                    <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                    Actualizar
                </button>

                {selectedIds.size > 0 && (
                    <button
                        onClick={() => setShowConfirm(true)}
                        disabled={isDeleting}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '10px 20px', borderRadius: 10, fontSize: 13, fontWeight: 800,
                            background: 'rgba(239,68,68,0.15)',
                            border: '1px solid rgba(239,68,68,0.4)',
                            color: '#f87171', cursor: 'pointer', transition: 'all 0.2s',
                            boxShadow: '0 0 20px rgba(239,68,68,0.1)',
                        }}
                    >
                        {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                        Eliminar ({selectedIds.size})
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="ultra-glass" style={{ overflow: 'hidden' }}>
                {loading ? (
                    <div style={{ padding: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, color: 'rgba(255,255,255,0.4)' }}>
                        <Loader2 size={24} className="animate-spin" style={{ color: '#6366f1' }} />
                        <span style={{ fontSize: 14, fontWeight: 600 }}>Cargando registros...</span>
                    </div>
                ) : filtered.length === 0 ? (
                    <div style={{ padding: 60, textAlign: 'center', color: 'rgba(255,255,255,0.35)' }}>
                        <div style={{ fontSize: 40, marginBottom: 12 }}>{tab === 'stores' ? '🏪' : '📄'}</div>
                        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
                            {search ? 'Sin resultados' : `No hay ${tab === 'stores' ? 'tiendas' : 'PDPs'} publicadas`}
                        </div>
                        <div style={{ fontSize: 13 }}>
                            {search ? 'Intenta con otro término de búsqueda.' : 'Cuando se publiquen, aparecerán aquí.'}
                        </div>
                    </div>
                ) : (
                    <table className="table-dark" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ width: 40, textAlign: 'center' }}>
                                    <button onClick={toggleSelectAll} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {selectedIds.size === filtered.length && filtered.length > 0
                                            ? <CheckSquare size={16} style={{ color: '#6366f1' }} />
                                            : <Square size={16} style={{ opacity: 0.4 }} />
                                        }
                                    </button>
                                </th>
                                <th style={{ width: 44, textAlign: 'center' }}>#</th>
                                <th>NOMBRE / ID</th>
                                <th>URL</th>
                                <th>{tab === 'stores' ? 'TEMPLATE' : 'PDP TEMPLATE'}</th>
                                <th>ESTADO</th>
                                <th>FECHA</th>
                                <th style={{ width: 110, textAlign: 'center' }}>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((record, index) => {
                                const isSelected = selectedIds.has(record.id);
                                const isCopied = copiedId === record.id;
                                return (
                                    <tr
                                        key={record.id}
                                        style={{
                                            background: isSelected ? 'rgba(239,68,68,0.06)' : 'transparent',
                                            transition: 'background 0.15s',
                                        }}
                                    >
                                        {/* Checkbox */}
                                        <td style={{ textAlign: 'center' }}>
                                            <button
                                                onClick={() => toggleSelect(record.id)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            >
                                                {isSelected
                                                    ? <CheckSquare size={16} style={{ color: '#ef4444' }} />
                                                    : <Square size={16} style={{ opacity: 0.3 }} />
                                                }
                                            </button>
                                        </td>

                                        {/* Blinking green number */}
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <span className="num-blink">{index + 1}</span>
                                        </td>

                                        {/* Name + ID + Copy button */}
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 2 }}>
                                                        {record.name}
                                                    </div>
                                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        ID: {record.id}
                                                    </div>
                                                </div>
                                                <button
                                                    className="copy-btn"
                                                    onClick={() => handleCopyName(record)}
                                                    title="Copiar nombre + ID"
                                                    style={{
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                                                        background: isCopied ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.04)',
                                                        border: isCopied ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(255,255,255,0.08)',
                                                        color: isCopied ? '#22c55e' : 'rgba(255,255,255,0.5)',
                                                        cursor: 'pointer', transition: 'all 0.2s',
                                                    }}
                                                >
                                                    {isCopied ? <Check size={13} /> : <Copy size={13} />}
                                                </button>
                                            </div>
                                        </td>

                                        {/* URL */}
                                        <td>
                                            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
                                                /{tab === 'stores' ? 't' : 'p'}/{record.identificador_url}
                                            </span>
                                        </td>

                                        {/* Template */}
                                        <td>
                                            <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>
                                                {record.template || record.pdp_template || '—'}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td>
                                            <span className={record.status === 'published' ? 'badge badge-green' : 'badge badge-amber'}>
                                                {record.status === 'published' ? 'Publicada' : 'Borrador'}
                                            </span>
                                        </td>

                                        {/* Date */}
                                        <td>
                                            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                                                {formatDate(record.updated_at)}
                                            </span>
                                        </td>

                                        {/* Actions: Preview + External Link */}
                                        <td style={{ textAlign: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                                {/* Preview full page button */}
                                                <button
                                                    className="preview-btn"
                                                    onClick={() => handlePreview(record)}
                                                    title={`Previsualizar ${tab === 'stores' ? 'tienda' : 'PDP'} en página completa`}
                                                    style={{
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        width: 32, height: 32, borderRadius: 8,
                                                        background: 'rgba(16,185,129,0.1)',
                                                        border: '1px solid rgba(16,185,129,0.2)',
                                                        color: '#34d399', cursor: 'pointer', transition: 'all 0.2s',
                                                    }}
                                                >
                                                    <Eye size={15} />
                                                </button>

                                                {/* External link (existing) */}
                                                {record.status === 'published' && (
                                                    <a
                                                        href={`/${tab === 'stores' ? 't' : 'p'}/${record.identificador_url}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        title="Abrir enlace público"
                                                        style={{
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            width: 32, height: 32, borderRadius: 8,
                                                            background: 'rgba(99,102,241,0.1)',
                                                            border: '1px solid rgba(99,102,241,0.2)',
                                                            color: '#6366f1', transition: 'all 0.2s',
                                                        }}
                                                    >
                                                        <ExternalLink size={14} />
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 999999,
                    background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <div style={{
                        background: '#1a1a24', borderRadius: 20, padding: 32,
                        maxWidth: 440, width: '90%',
                        border: '1px solid rgba(239,68,68,0.2)',
                        boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                            <div style={{
                                width: 48, height: 48, borderRadius: 14,
                                background: 'rgba(239,68,68,0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <AlertTriangle size={24} style={{ color: '#ef4444' }} />
                            </div>
                            <div>
                                <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>
                                    Confirmar eliminación
                                </div>
                                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                                    Esta acción es irreversible
                                </div>
                            </div>
                        </div>

                        <div style={{
                            padding: '14px 16px', borderRadius: 12, marginBottom: 24,
                            background: 'rgba(239,68,68,0.06)',
                            border: '1px solid rgba(239,68,68,0.15)',
                        }}>
                            <div style={{ fontSize: 14, color: '#fca5a5', fontWeight: 700, marginBottom: 4 }}>
                                ¿Estás seguro de eliminar {selectedIds.size} {tab === 'stores' ? 'tienda' : 'PDP'}{selectedIds.size > 1 ? 's' : ''}?
                            </div>
                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
                                Se eliminarán permanentemente de la base de datos. Los enlaces públicos dejarán de funcionar inmediatamente.
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 10 }}>
                            <button
                                onClick={() => setShowConfirm(false)}
                                style={{
                                    flex: 1, padding: '12px', borderRadius: 10,
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 700,
                                    cursor: 'pointer', transition: 'all 0.2s',
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleBulkDelete}
                                disabled={isDeleting}
                                style={{
                                    flex: 1, padding: '12px', borderRadius: 10,
                                    background: 'rgba(239,68,68,0.9)',
                                    border: 'none',
                                    color: '#fff', fontSize: 13, fontWeight: 800,
                                    cursor: isDeleting ? 'wait' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                    transition: 'all 0.2s',
                                    boxShadow: '0 4px 15px rgba(239,68,68,0.3)',
                                    opacity: isDeleting ? 0.7 : 1,
                                }}
                            >
                                {isDeleting
                                    ? <><Loader2 size={14} className="animate-spin" /> Eliminando...</>
                                    : <><Trash2 size={14} /> Eliminar {selectedIds.size}</>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
