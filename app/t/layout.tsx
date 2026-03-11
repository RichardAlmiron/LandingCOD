export default function StoreLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="store-isolation-wrapper" style={{ margin: 0, padding: 0, width: '100%', minHeight: '100vh', background: '#ffffff', color: '#000000' }}>
            <style dangerouslySetInnerHTML={{
                __html: `
                /* Override globals.css constraints for the public store */
                html, body {
                    background: #ffffff !important;
                    color: #000000 !important;
                    height: auto !important;
                    min-height: 100vh !important;
                }
                .electric-bg {
                    display: none !important;
                }
            `}} />
            {children}
        </div>
    )
}
