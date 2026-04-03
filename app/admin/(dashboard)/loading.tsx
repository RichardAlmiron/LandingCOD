export default function AdminLoading() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '60vh',
            gap: 24,
        }}>
            <div style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: 'rgba(99,102,241,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(99,102,241,0.2)',
                boxShadow: '0 0 30px rgba(99,102,241,0.15)',
            }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="18" stroke="rgba(99,102,241,0.2)" strokeWidth="3" />
                    <circle cx="24" cy="24" r="18" stroke="#6366f1" strokeWidth="3"
                        strokeDasharray="30 85" strokeLinecap="round">
                        <animateTransform attributeName="transform" type="rotate"
                            from="0 24 24" to="360 24 24" dur="0.8s" repeatCount="indefinite" />
                    </circle>
                </svg>
            </div>
            <div style={{ textAlign: 'center' }}>
                <div className="shimmer-text" style={{ fontSize: 18, fontWeight: 900, marginBottom: 8, letterSpacing: '-0.02em' }}>
                    CARGANDO MÓDULO
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                    Preparando interfaz administrativa...
                </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: 'var(--accent-primary)',
                            animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite`,
                        }}
                    />
                ))}
            </div>
            <style>{`
                @keyframes bounce {
                    0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
                    40% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
