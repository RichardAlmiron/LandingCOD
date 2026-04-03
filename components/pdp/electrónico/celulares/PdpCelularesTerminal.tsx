'use client';
import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import {
  Menu, ShoppingBag, Star, Truck, RotateCcw, ShieldCheck,
  Plus, Minus, Cpu, BatteryFull, Shield, Zap, Heart,
  Package, Terminal as TermIcon, Code, Database, HardDrive, Server, Activity, MessageSquare
} from 'lucide-react';

interface PDPProps { data: StoreData; product: Product; variant?: number; }

const C = {
  bgMain: '#000000', bgWhite: '#0a0a0a', bgImage: '#111111',
  textDark: '#00ff00', textSub: '#008800', primary: '#00ff00',
  border: '#004400', star: '#00ff00'
};

const fontTitles = '"Fira Code", "Courier New", monospace';
const fontSans = '"Fira Code", "Courier New", monospace';
const REAL_IMG = 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=800&fit=crop';

export default function PdpCelularesTerminal({ data, product }: PDPProps) {
  const images = product.images?.length ? product.images : [REAL_IMG];
  const price = typeof product.price === 'number' ? product.price : parseFloat(String(product.price)) || 0;
  const ai = product.aiContent;
  const sec = ai?.sections;
  const fmtPrice = (n: number) => {
    const str = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Gs. ${str}`;
  };

  const [activeSpec, setActiveSpec] = useState<number | null>(null);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const terminalBorder = { border: `1px solid ${C.primary}`, borderRadius: 0 };

  return (
    <div style={{ background: C.bgMain, minHeight: '100vh', fontFamily: fontSans, color: C.textDark, position: 'relative' }}>
      
      {/* 15. BREADCRUMBS & NAV */}
      <nav style={{ padding: '20px 24px', position: 'sticky', top: 0, zIndex: 100, background: '#000', borderBottom: `2px solid ${C.primary}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Menu size={20} color={C.primary}/>
            <span style={{ fontSize: 18, fontWeight: 700 }}>root@{data.name?.toLowerCase().replace(/\s/g,'-') || 'dev'}:~#</span>
          </div>
          <ShoppingBag size={20} color={C.primary}/>
        </div>
      </nav>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 24px 0', fontSize: 12, color: C.textSub }}>
        {`$ cd /dev/hardware/cellular/${product.title.toLowerCase().replace(/\s/g,'_')}`}
      </div>

      {/* 1. HERO SECTION */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px 80px', display: 'flex', gap: 64, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ ...terminalBorder, padding: 8, background: 'repeating-linear-gradient(0deg, #001100, #001100 2px, #000 2px, #000 4px)' }}>
            <div style={{ padding: '4px 12px', borderBottom: `1px solid ${C.primary}`, fontSize: 11, color: C.textSub, marginBottom: 16 }}>
              DISPLAY: [MODEL_01.IMG] - 100% RENDERED
            </div>
            <img src={images[0]} alt="" style={{ width: '100%', height: 450, objectFit: 'contain', filter: 'contrast(1.2) brightness(0.8) sepia(1) hue-rotate(80deg) saturate(3)' }} />
          </div>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 12, color: C.textSub, marginBottom: 16 }}>[STATUS: ROOT_ACCESS_GRANTED]</div>
          <h2 style={{ fontSize: 48, fontWeight: 700, marginBottom: 24, textTransform: 'lowercase' }}>{ai?.enhancedTitle || product.title}</h2>
          <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.6, marginBottom: 40 }}>
            {`/* ${ai?.enhancedDescription || product.description || 'Dispositivo de alta autoridad para desarrolladores. Kernel optimizado, terminal de hardware persistente y acceso total al sistema sin capas de usuario restrictivas.'} */`}
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
            <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(i => <Star key={i} size={16} fill={C.primary} color={C.primary} />)}</div>
            <span style={{ fontSize: 12 }}>[AVG_LOG_STABLE]</span>
          </div>

          <div style={{ fontSize: 40, marginBottom: 48 }}>$ {price.toLocaleString()} <span style={{ fontSize: 14 }}>[USD]</span></div>
          
          <button style={{ width: '100%', padding: '24px', background: 'transparent', color: C.primary, border: `2px solid ${C.primary}`, fontSize: 18, fontWeight: 700, cursor: 'pointer', textAlign: 'left' }}>
            $ sudo apt-get install {product.title.toLowerCase().replace(/\s/g,'_')} █
          </button>
        </div>
      </div>

      {/* 2. BENEFICIOS RÁPIDOS */}
      <div style={{ padding: '80px 24px', borderTop: `1px dotted ${C.border}`, borderBottom: `2px solid ${C.primary}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h3 style={{ fontSize: 24, marginBottom: 48 }}>$ ./list_features.sh</h3>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { i: <Cpu />, t: 'Open Kernel', d: 'Libre de binarios cerrados. Compila tu propia versión del SO.' },
              { i: <HardDrive />, t: 'Physical I/O', d: 'Selector de hardware físico para desconexión total.' },
              { i: <Zap />, t: 'Overclock Ready', d: 'Sistema de enfriamiento por heatpipes de grafeno.' }
            ].map((b, i) => (
              <div key={i} style={{ flex: '1 1 280px', border: `1px solid ${C.border}`, padding: 32 }}>
                <div style={{ color: C.primary, marginBottom: 20 }}>{b.i}</div>
                <h4 style={{ fontSize: 18, marginBottom: 12, textTransform: 'lowercase' }}>{`> ${b.t}`}</h4>
                <p style={{ color: C.textSub, fontSize: 14, lineHeight: 1.6 }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. AUTORIDAD / LOGOS */}
      <div style={{ padding: '64px 24px', textAlign: 'center', opacity: 0.6 }}>
         <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap', fontSize: 16 }}>
            {['LINUX_FOUNDATION', 'KERNEL_ORG', 'GITHUB_HACK', 'KALI_LINUX'].map(l => <span key={l}>[{l}]</span>)}
         </div>
      </div>

      {/* 4. INGENIERÍA / MATERIALES */}
      <div style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 64, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h3 style={{ fontSize: 32, marginBottom: 32 }}>$ cat /etc/materials</h3>
            <p style={{ color: C.textSub, fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>Chasis de policarbonato industrial reforzado con fibra de vidrio. Diseñado para resistir ambientes de centros de datos, caídas desde racks y uso intensivo en consola.</p>
            <div style={{ borderLeft: `3px solid ${C.primary}`, paddingLeft: 16, fontSize: 14 }}>MATERIAL_STRENGTH: 98% [OK]</div>
          </div>
          <div style={{ flex: '1 1 400px', height: 350, border: `1px solid ${C.border}`, background: '#0a0a0a', overflow: 'hidden' }}>
             <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" alt="Ingeniería celular" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.2) brightness(0.6) sepia(1) hue-rotate(80deg) saturate(3)' }} />
          </div>
        </div>
      </div>

      {/* 5. TUTORIAL VISUAL (TTY) */}
      <div style={{ padding: '100px 24px', background: C.bgWhite }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h3 style={{ fontSize: 24, textAlign: 'center', marginBottom: 64 }}>[ BOOT_SEQUENCE ]</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            {[
              { t: 'STEP_01', d: 'Bootloader unlock via CLI.', img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80' },
              { t: 'STEP_02', d: 'Neural network sync initialized.', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80' },
              { t: 'STEP_03', d: 'Uptime starts now.', img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80' }
            ].map((s, i) => (
              <div key={i} style={{ padding: 32, border: `1px solid ${C.border}` }}>
                 <img src={s.img} alt={s.t} style={{ width: '100%', height: 150, objectFit: 'cover', marginBottom: 20, filter: 'contrast(1.2) brightness(0.7) sepia(1) hue-rotate(80deg) saturate(3)' }} />
                 <h4 style={{ fontSize: 16, color: C.primary, marginBottom: 12 }}>{s.t}</h4>
                 <p style={{ color: C.textSub, fontSize: 14 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. SOCIAL PROOF (TTY) */}
      <div style={{ padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontSize: 24, marginBottom: 32 }}>{`> tail -n 1 /var/log/syslog`}</h3>
          <p style={{ fontSize: 20, color: C.textDark, fontStyle: 'italic', marginBottom: 16 }}>"Finally a phone that doesn't treat me like a basic user. 10/10 performance."</p>
          <div style={{ fontSize: 14, color: C.textSub }}>-- USER: dev_null_01</div>
        </div>
      </div>

      {/* 7. MISIÓN DE MARCA */}
      <div style={{ padding: '120px 24px', background: '#050505', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontSize: 40, marginBottom: 32 }}>$ export MISSION="UNCOMPROMISED_ROOT"</h3>
          <p style={{ fontSize: 18, lineHeight: 1.8, color: C.textSub }}>Creemos que eres el dueño de tu hardware. No hay muros, no hay puertas traseras, no hay telemetría sin permiso. Terminal es libertad binaria.</p>
        </div>
      </div>

      {/* 8. GARANTÍA */}
      <div style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {[
            { t: 'SLA 99.9%', d: 'Soporte técnico directo de ingenieros de sistemas.', i: <ShieldCheck /> },
            { t: 'NEXT_DAY_SHIP', d: 'Envío express prioritario para redundancia de hardware.', i: <Truck /> },
            { t: 'OPEN_WARRANTY', d: 'Garantía válida incluso si abres el dispositivo.', i: <HardDrive /> }
          ].map((g, i) => (
            <div key={i} style={{ flex: '1 1 280px', border: `1px solid ${C.border}`, padding: 32 }}>
              <div style={{ color: C.primary, marginBottom: 16 }}>{g.i}</div>
              <h4 style={{ fontSize: 16, marginBottom: 8 }}>{`# ${g.t}`}</h4>
              <p style={{ color: C.textSub, fontSize: 13 }}>{g.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 9. ESPECIFICACIONES TÉCNICAS */}
      <div style={{ padding: '100px 24px', background: C.bgWhite }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontSize: 24, color: C.primary, marginBottom: 48 }}>{`> cat /proc/cpuinfo`}</h3>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {[
              { t: 'CPU_CORES', c: 'ARM-v9 high-performance architecture, 16 physical cores.' },
              { t: 'MEMORY_V', c: '32GB LPDDR5X, ECC supported.' },
              { t: 'STORAGE_S', c: '2TB NVMe SSD with hardware encryption (AES-256).' }
            ].map((s, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setActiveSpec(activeSpec === i ? null : i)} style={{ width: '100%', padding: '24px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', color: C.primary, cursor: 'pointer', fontFamily: fontSans }}>
                  <span>{`[+] ${s.t}`}</span>
                  {activeSpec === i ? <Minus /> : <Plus />}
                </button>
                {activeSpec === i && <div style={{ paddingBottom: 24, color: C.textSub, fontSize: 14 }}>{s.c}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 10. FAQ */}
      <div style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontSize: 24, color: C.primary, textAlign: 'center', marginBottom: 48 }}>$ man terminal_h</h3>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {[
              { q: 'Is it compatible with Android apps?', a: 'Yes, via a lightweight virtualization container, though native Linux apps are recommended.' },
              { q: 'Can I install other distros?', a: 'Completely. Support for Ubuntu Touch, PostmarketOS, and Kali is built into the bootloader.' }
            ].map((f, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setActiveFAQ(activeFAQ === i ? null : i)} style={{ width: '100%', padding: '24px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', color: C.primary, textAlign: 'left', cursor: 'pointer', fontFamily: fontSans }}>
                  <span>{`? ${f.q}`}</span>
                  {activeFAQ === i ? <Minus /> : <Plus />}
                </button>
                {activeFAQ === i && <div style={{ paddingBottom: 24, color: C.textSub, fontSize: 14 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 11. CROSS-SELL */}
      <div style={{ background: C.bgWhite, padding: '100px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h4 style={{ fontSize: 20, color: C.primary, marginBottom: 40 }}>$ ls /mnt/accessories</h4>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { n: 'Physical Keycap Set', img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80' },
              { n: 'Power Station Pro', img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80' },
              { n: 'Fiber Optics Cable', img: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80' }
            ].map((v, i) => (
              <div key={i} style={{ flex: '1 1 280px', border: `1px solid ${C.border}`, padding: 32, textAlign: 'center' }}>
                 <div style={{ height: 120, background: '#000', marginBottom: 24, overflow: 'hidden' }}><img src={v.img} alt={v.n} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.2) brightness(0.6) sepia(1) hue-rotate(80deg) saturate(3)' }} /></div>
                 <h5 style={{ fontSize: 14, marginBottom: 20 }}>{v.n}</h5>
                 <button style={{ padding: '10px 20px', background: C.primary, color: '#000', fontWeight: 700, border: 'none', cursor: 'pointer' }}>ADD_TO_QUEUE</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 13. REVIEW WALL */}
      <div style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h3 style={{ fontSize: 24, textAlign: 'center', marginBottom: 64 }}>{`> grep -i "awesome" /var/mail/customers`}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {[
              { t: '“The screen is surprisingly good for coding on the go. Uptime 200 days.”', author: 'DEV_X' },
              { t: '“If you value your privacy, this is the only terminal you need.”', author: 'ANON_USER' },
              { t: '“The build quality is like a 90s ThinkPad. Pure indestructible joy.”', author: 'OLD_SCHOOL' }
            ].map((r, i) => (
              <div key={i} style={{ padding: 32, border: `1px solid ${C.border}`, background: C.bgWhite }}>
                <p style={{ fontSize: 14, color: C.textDark, lineHeight: 1.6, marginBottom: 20 }}>{r.t}</p>
                <div style={{ fontSize: 11, color: C.textSub }}>FROM: {r.author}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 14. FOOTER FUNCIONAL */}
      <footer style={{ padding: `100px 24px ${showSticky ? 120 : 60}px`, borderTop: `2px solid ${C.primary}`, background: '#000' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>halt -p</div>
            <div style={{ fontSize: 12, opacity: 0.4 }}>System halted. © 2026 TERMINAL_DYNAMICS.</div>
        </div>
      </footer>

      {/* 12. STICKY ATC */}
      {showSticky && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#000', borderTop: `2px solid ${C.primary}`, borderBottom: `8px solid ${C.primary}`, padding: '20px 24px', zIndex: 100 }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{ai?.enhancedTitle || product.title}</div>
              <div style={{ color: C.textSub, fontSize: 12 }}>ARCH: ARM_V9_HYBRID</div>
            </div>
            <button style={{ padding: '16px 40px', background: C.primary, color: '#000', fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer' }}>$ pkg install █</button>
          </div>
        </div>
      )}
    </div>
  );
}
