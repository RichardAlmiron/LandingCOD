'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Incident {
  id: string;
  model: string;
  event_type: 'failure' | 'recovery';
  fallback_level: number;
  replaced_by: string | null;
  error_message: string | null;
  product_title: string | null;
  product_id: string | null;
  copy_generated: boolean;
  read: boolean;
  created_at: string;
}

const MODEL_NAMES: Record<string, string> = {
  'google/gemini-3.1-flash-lite-preview': 'Gemini 3.1 Flash Lite',
  'anthropic/claude-haiku-4.5': 'Claude Haiku 4.5',
  'anthropic/claude-3.5-haiku': 'Claude 3.5 Haiku',
};

function modelLabel(id: string) {
  return MODEL_NAMES[id] || id;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'ahora';
  if (mins < 60) return `hace ${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `hace ${days}d`;
}

export default function AIHealthPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'failures' | 'recoveries'>('all');

  const fetchIncidents = useCallback(async () => {
    try {
      const res = await fetch('/api/ai/incidents?limit=100');
      const data = await res.json();
      if (data.success) {
        setIncidents(data.incidents);
        setUnreadCount(data.unreadCount);
      }
    } catch (err) {
      console.error('Error fetching incidents:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIncidents();
    // Auto-refresh cada 30 segundos
    const interval = setInterval(fetchIncidents, 30000);
    return () => clearInterval(interval);
  }, [fetchIncidents]);

  const markAllRead = async () => {
    await fetch('/api/ai/incidents', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ markAllRead: true }),
    });
    fetchIncidents();
  };

  // Calcular estado actual de cada motor
  const motorStatus = React.useMemo(() => {
    const status: Record<string, { ok: boolean; lastEvent: Incident | null }> = {};
    for (const m of Object.keys(MODEL_NAMES)) {
      const events = incidents.filter(i => i.model === m);
      const last = events[0] || null;
      status[m] = { ok: !last || last.event_type === 'recovery', lastEvent: last };
    }
    return status;
  }, [incidents]);

  const filtered = incidents.filter(i => {
    if (filter === 'failures') return i.event_type === 'failure';
    if (filter === 'recoveries') return i.event_type === 'recovery';
    return true;
  });

  return (
    <div style={{ padding: '24px 32px', maxWidth: 1000, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Estado de Motores IA
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>
            Monitoreo en tiempo real de los modelos de copywriting
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            style={{
              padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-subtle)',
              background: 'var(--bg-elevated)', color: 'var(--text-primary)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}
          >
            Marcar todo como leído ({unreadCount})
          </button>
        )}
      </div>

      {/* Motor Status Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {Object.entries(MODEL_NAMES).map(([modelId, name], idx) => {
          const s = motorStatus[modelId];
          const isOk = s?.ok ?? true;
          return (
            <div key={modelId} style={{
              padding: 20, borderRadius: 16,
              background: isOk ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
              border: `1px solid ${isOk ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: isOk ? '#10b981' : '#ef4444',
                  boxShadow: isOk ? '0 0 8px rgba(16,185,129,0.5)' : '0 0 8px rgba(239,68,68,0.5)',
                }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Motor {idx + 1} {idx === 0 ? '(Primario)' : `(Fallback ${idx})`}
                </span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                {name}
              </div>
              <div style={{ fontSize: 12, color: isOk ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                {isOk ? '● Operativo' : '● Con fallos'}
                {s?.lastEvent && (
                  <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>
                    {timeAgo(s.lastEvent.created_at)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['all', 'failures', 'recoveries'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              border: filter === f ? 'none' : '1px solid var(--border-subtle)',
              background: filter === f ? (f === 'failures' ? '#ef4444' : f === 'recoveries' ? '#10b981' : 'var(--accent-primary)') : 'transparent',
              color: filter === f ? '#fff' : 'var(--text-secondary)',
            }}
          >
            {f === 'all' ? 'Todos' : f === 'failures' ? 'Fallos' : 'Recuperaciones'}
          </button>
        ))}
      </div>

      {/* Incidents List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Cargando...</div>
      ) : filtered.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: 60,
          background: 'var(--bg-surface)', borderRadius: 16, border: '1px solid var(--border-subtle)',
        }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
            Sin incidentes
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
            Todos los motores de IA están funcionando correctamente
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(incident => (
            <div
              key={incident.id}
              style={{
                padding: '14px 18px', borderRadius: 12,
                background: incident.read ? 'var(--bg-surface)' : 'var(--bg-elevated)',
                border: `1px solid ${incident.event_type === 'failure' ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'}`,
                borderLeft: `4px solid ${incident.event_type === 'failure' ? '#ef4444' : '#10b981'}`,
                opacity: incident.read ? 0.7 : 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>
                    {incident.event_type === 'failure' ? '🔴' : '🟢'}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                    {incident.event_type === 'failure' ? 'FALLO' : 'RECUPERADO'}
                    {' — '}
                    {modelLabel(incident.model)}
                  </span>
                  {!incident.read && (
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
                      background: '#f59e0b', color: '#000',
                    }}>
                      NUEVO
                    </span>
                  )}
                </div>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {timeAgo(incident.created_at)}
                </span>
              </div>

              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {incident.event_type === 'failure' && incident.replaced_by && (
                  <div>Reemplazado por: <strong>{modelLabel(incident.replaced_by)}</strong></div>
                )}
                {incident.event_type === 'failure' && !incident.copy_generated && (
                  <div style={{ color: '#ef4444', fontWeight: 600 }}>
                    ⚠️ No se pudo generar copy — todos los motores fallaron
                  </div>
                )}
                {incident.error_message && (
                  <div style={{
                    marginTop: 4, padding: '6px 10px', borderRadius: 6,
                    background: 'rgba(0,0,0,0.2)', fontFamily: 'monospace', fontSize: 11,
                    color: 'var(--text-muted)', wordBreak: 'break-all',
                  }}>
                    {incident.error_message.substring(0, 200)}
                  </div>
                )}
                {incident.product_title && (
                  <div style={{ marginTop: 4, color: 'var(--text-muted)' }}>
                    Producto: {incident.product_title}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
