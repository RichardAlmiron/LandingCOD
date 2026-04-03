export default function DashboardLoading() {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '60vh',
            width: '100%',
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="16" stroke="rgba(99,102,241,0.2)" strokeWidth="3" />
                    <circle cx="20" cy="20" r="16" stroke="var(--accent-primary)" strokeWidth="3" strokeDasharray="25 75" strokeLinecap="round">
                        <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.7s" repeatCount="indefinite" />
                    </circle>
                </svg>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>CARGANDO...</span>
            </div>
        </div>
    );
}
