'use client';
import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import {
  Menu, ShoppingBag, Star, Truck, RotateCcw, ShieldCheck,
  Plus, Minus, Cpu, BatteryFull, Shield, Zap, Heart,
  Package, Activity, Orbit, Crosshair, Box, Layers, MessageSquare
} from 'lucide-react';

interface PDPProps { data: StoreData; product: Product; variant?: number; }

const C = {
  bgMain: '#0a0a0a', bgWhite: '#111', bgImage: '#1a1c23',
  textDark: '#ffffff', textSub: '#8b9bb4', primary: '#facc15',
  border: '#333b4d', star: '#facc15'
};

const fontTitles = '"Space Mono", monospace';
const fontSans = '"Inter", sans-serif';
const REAL_IMG = 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=800&fit=crop';

export default function PdpCelularesMecha({ data, product }: PDPProps) {
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

  const mechaCut = {
    clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
    border: `1px solid ${C.primary}`
  };

  return (
    <div style={{ background: C.bgMain, minHeight: '100vh', fontFamily: fontSans, color: C.textDark, position: 'relative' }}>
      
      {/* 15. BREADCRUMBS & NAV */}
      <nav style={{ padding: '16px 24px', position: 'sticky', top: 0, background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(10px)', borderBottom: `2px solid ${C.primary}`, zIndex: 100 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Menu size={24} color={C.primary} />
          <span style={{ fontFamily: fontTitles, fontSize: 22, fontWeight: 700, color: C.primary, letterSpacing: '4px' }}>// NEURAL.LINK</span>
          <ShoppingBag size={24} color={C.primary} />
        </div>
      </nav>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 24px 0', fontFamily: fontTitles, fontSize: 12, color: C.textSub }}>
        Celulares {'>'} Mecha {'>'} <span style={{ color: C.primary }}>{product.title.toUpperCase().replace(/\s/g, '_')}</span>
      </div>

      {/* 1. HERO SECTION */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px 64px', display: 'flex', gap: 48, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ background: 'repeating-linear-gradient(45deg, #111, #111 2px, #1a1c23 2px, #1a1c23 10px)', height: 450, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', ...mechaCut }}>
             <div style={{ position: 'absolute', top: 0, left: 0, background: C.primary, color: '#000', padding: '4px 8px', fontSize: 10, fontFamily: fontTitles, fontWeight: 700 }}>SYNCHRONIZATION: 100%</div>
             <img src={images[0]} alt="" style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
             <div style={{ position: 'absolute', bottom: 10, right: 10, color: C.primary }}><Crosshair size={40} strokeWidth={1} /></div>
          </div>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ display: 'inline-block', background: C.primary, color: '#000', padding: '4px 12px', fontFamily: fontTitles, fontSize: 12, fontWeight: 700, marginBottom: 16 }}>MARK IV [PROTO]</div>
          <h2 style={{ fontFamily: fontTitles, fontSize: 56, fontWeight: 700, lineHeight: 1, marginBottom: 24, textTransform: 'uppercase' }}>{ai?.enhancedTitle || product.title}</h2>
          <p style={{ fontSize: 16, color: C.textSub, lineHeight: 1.6, marginBottom: 32 }}>{ai?.enhancedDescription || product.description || 'Sincronización neuronal de quinta generación. Chasis reforzado con polímeros EVA y núcleo criogénico para operaciones de alto rendimiento.'}</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(i => <Star key={i} size={16} fill={C.primary} color={C.primary} />)}</div>
            <span style={{ fontFamily: fontTitles, color: C.primary }}>[SYNC_STABLE]</span>
          </div>

          <div style={{ fontFamily: fontTitles, fontSize: 40, color: C.primary, marginBottom: 32 }}>{fmtPrice(price)} CRD</div>
          
          <button style={{ width: '100%', padding: '20px', background: C.primary, color: '#000', fontFamily: fontTitles, fontSize: 18, fontWeight: 900, cursor: 'pointer', ...mechaCut }}>
            INICIAR SECUENCIA
          </button>
        </div>
      </div>

      {/* 2. BENEFICIOS RÁPIDOS */}
      <div style={{ background: '#111', padding: '64px 24px', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 24, color: C.primary, marginBottom: 48 }}>// SISTEMAS_DE_COMBATE</h3>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { i: <Cpu />, t: 'NÚCLEO N2', d: 'Procesamiento paralelo sin sobrecalentamiento térmico.' },
              { i: <Layers />, t: 'ARMADURA A.T.', d: 'Campo de dispersión de impactos integrado en el chasis.' },
              { i: <BatteryFull />, t: 'CELDA S2', d: 'Autonomía de 120h en modo de combate activo.' }
            ].map((b, i) => (
              <div key={i} style={{ flex: '1 1 250px', padding: 32, ...mechaCut }}>
                <div style={{ color: C.primary, marginBottom: 20 }}>{b.i}</div>
                <h4 style={{ fontFamily: fontTitles, fontSize: 18, marginBottom: 12 }}>{b.t}</h4>
                <p style={{ color: C.textSub, fontSize: 14, lineHeight: 1.6 }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. AUTORIDAD / LOGOS */}
      <div style={{ padding: '64px 24px', textAlign: 'center' }}>
         <p style={{ fontFamily: fontTitles, fontSize: 10, color: C.textSub, letterSpacing: '4px', marginBottom: 32 }}>UNIDADES DE VERIFICACIÓN:</p>
         <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap', opacity: 0.5 }}>
            {['NERV_LABS', 'GEO_FRONT', 'EURO_DIVISION', 'MAGI_SYS'].map(l => <span key={l} style={{ fontFamily: fontTitles, fontSize: 20, fontWeight: 700 }}>{l}</span>)}
         </div>
      </div>

      {/* 4. INGENIERÍA / MATERIALES */}
      <div style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 64, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h3 style={{ fontFamily: fontTitles, fontSize: 32, color: C.primary, marginBottom: 24 }}>Ingeniería de Sincronía.</h3>
            <p style={{ color: C.textSub, fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>Construido mediante fundición centrífuga de titanio y recubierto con una capa nanométrica de polímero amortiguador. El interior alberga un sistema de enfriamiento líquido por capilaridad.</p>
            <div style={{ fontFamily: fontTitles, borderLeft: `4px solid ${C.primary}`, paddingLeft: 16, fontSize: 14 }}>DIAG_STATUS: NOMINAL</div>
          </div>
          <div style={{ flex: '1 1 400px', height: 300, overflow: 'hidden', border: `1px solid ${C.primary}` }}>
             <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" alt="Celular mecha detalle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>

      {/* 5. TUTORIAL VISUAL */}
      <div style={{ background: '#111', padding: '100px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 24, color: C.primary, textAlign: 'center', marginBottom: 64 }}>SECUENCIA DE ARRANQUE</h3>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { t: 'PHASE 01', d: 'Conexión neuronal LCL.', img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80' },
              { t: 'PHASE 02', d: 'Configuración de plug.', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80' },
              { t: 'PHASE 03', d: 'Sincronización activa.', img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80' }
            ].map((s, i) => (
              <div key={i} style={{ flex: '1 1 250px', textAlign: 'center' }}>
                <div style={{ height: 180, border: `1px solid ${C.border}`, overflow: 'hidden', marginBottom: 24 }}><img src={s.img} alt={s.t} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                <h4 style={{ fontFamily: fontTitles, fontSize: 18, color: C.primary, marginBottom: 8 }}>{s.t}</h4>
                <p style={{ color: C.textSub, fontSize: 14 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. SOCIAL PROOF (MINI) */}
      <div style={{ padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', border: `1px solid ${C.primary}`, padding: 48, background: 'rgba(250,204,21,0.05)' }}>
          <div style={{ fontFamily: fontTitles, fontSize: 48, color: C.primary, marginBottom: 16 }}>99.9% ACCURACY</div>
          <p style={{ color: C.textSub }}>En pruebas de campo operativas bajo estrés extremo.</p>
        </div>
      </div>

      {/* 7. MISIÓN DE MARCA */}
      <div style={{ padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 48, color: C.primary, marginBottom: 32 }}>RETA AL DESTINO.</h3>
          <p style={{ color: C.textSub, fontSize: 18, lineHeight: 1.8 }}>No fabricamos tecnología para el usuario promedio. Fabricamos herramientas para los pilotos del mañana que necesitan que su equipo responda a la velocidad del pensamiento.</p>
        </div>
      </div>

      {/* 8. GARANTÍA */}
      <div style={{ background: '#111', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {[
            { t: 'ASISTENCIA EVA', d: 'Soporte técnico directo desde el centro de mando.', i: <MessageSquare /> },
            { t: 'EXTRACCIÓN RÁPIDA', d: 'Sustitución en 24h ante fallas críticas.', i: <Truck /> },
            { t: 'PROT. BLINDADA', d: 'Garantía extendida contra impacto cinético.', i: <Shield /> }
          ].map((g, i) => (
            <div key={i} style={{ flex: '1 1 250px', padding: 32, ...mechaCut }}>
              <div style={{ color: C.primary, marginBottom: 16 }}>{g.i}</div>
              <h4 style={{ fontFamily: fontTitles, fontSize: 16, marginBottom: 8 }}>{g.t}</h4>
              <p style={{ color: C.textSub, fontSize: 13 }}>{g.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 9. ESPECIFICACIONES TÉCNICAS */}
      <div style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', border: `1px solid ${C.border}`, padding: 32 }}>
          <h3 style={{ fontFamily: fontTitles, color: C.primary, marginBottom: 32 }}>// ESPECIFICACIONES_DE_UNIDAD</h3>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {[
              { t: 'PROCESADOR', c: 'Octa-Core Quantum Link 4.2GHz.' },
              { t: 'ÓPTICA', c: 'Scanner Lidar 3D con sensores térmicos integrados.' },
              { t: 'MATERIAL', c: 'Compuesto de Titanio y Polímero de Carbono.' }
            ].map((s, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setActiveSpec(activeSpec === i ? null : i)} style={{ width: '100%', padding: '24px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', color: '#fff', fontFamily: fontTitles, cursor: 'pointer' }}>
                  <span>{s.t}</span>
                  {activeSpec === i ? <Minus /> : <Plus />}
                </button>
                {activeSpec === i && <div style={{ paddingBottom: 24, color: C.textSub, fontSize: 14 }}>{s.c}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 10. FAQ */}
      <div style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, color: C.primary, textAlign: 'center', marginBottom: 48 }}>INTERROGATORIO_FRECUENTE</h3>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {[
              { q: '¿Qué es el Neural Link?', a: 'Es nuestro sistema de transferencia de datos de ultra-baja latencia que sincroniza tu dispositivo con tu perfil digital al instante.' },
              { q: '¿Es resistente a la corrosión LCL?', a: 'Completamente. El sellado IP69K asegura funcionamiento en fluidos densos.' }
            ].map((f, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setActiveFAQ(activeFAQ === i ? null : i)} style={{ width: '100%', padding: '24px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', color: '#fff', textAlign: 'left', fontFamily: fontTitles, cursor: 'pointer' }}>
                  <span>{f.q}</span>
                  {activeFAQ === i ? <Minus /> : <Plus />}
                </button>
                {activeFAQ === i && <div style={{ paddingBottom: 24, color: C.textSub, fontSize: 14 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 11. CROSS-SELL */}
      <div style={{ background: '#111', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, color: C.primary, marginBottom: 40 }}>ACCESORIOS_COMPATIBLES:</h3>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { n: 'UNIDAD PLUG-IN', img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80' },
              { n: 'CARGADOR DE CAMPO', img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80' },
              { n: 'MÓDULO DE RED', img: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80' }
            ].map((v, i) => (
              <div key={i} style={{ flex: '1 1 250px', background: C.bgMain, padding: 24, ...mechaCut, textAlign: 'center' }}>
                 <div style={{ height: 120, marginBottom: 16, overflow: 'hidden' }}><img src={v.img} alt={v.n} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                 <h4 style={{ fontFamily: fontTitles, fontSize: 14, marginBottom: 16 }}>{v.n}</h4>
                 <button style={{ padding: '8px 16px', background: C.primary, color: '#000', fontFamily: fontTitles, fontWeight: 700, border: 'none', cursor: 'pointer' }}>ADQUIRIR</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 13. REVIEW WALL */}
      <div style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 32, color: C.primary, textAlign: 'center', marginBottom: 64 }}>LOG_DE_USUARIOS</h3>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { t: '"La respuesta táctil es instantánea. No he vuelto a sentir lag en mis aplicaciones de desarrollo."', auth: 'PILOT_01' },
              { t: '"El diseño agresivo es una obra de arte. Se siente como un equipo militar de lujo."', auth: 'PILOT_05' },
              { t: '"Soportó una caída de 4 metros sin un rasguño. El blindaje EVA es real."', auth: 'PILOT_09' }
            ].map((r, i) => (
              <div key={i} style={{ flex: '1 1 250px', border: `1px solid ${C.border}`, padding: 32, background: '#111' }}>
                <p style={{ color: C.textSub, fontStyle: 'italic', marginBottom: 24 }}>{r.t}</p>
                <div style={{ fontFamily: fontTitles, color: C.primary, fontSize: 12 }}>FROM: {r.auth}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 14. FOOTER FUNCIONAL */}
      <footer style={{ background: '#000', padding: `100px 24px ${showSticky ? 120 : 60}px`, borderTop: `2px solid ${C.primary}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <h4 style={{ fontFamily: fontTitles, fontSize: 32, color: C.primary, letterSpacing: '8px', marginBottom: 24 }}>NEURAL.LINK</h4>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, marginBottom: 48, fontFamily: fontTitles, fontSize: 12, color: C.textSub }}>
            <span>DATA_CENTER</span><span>SUPPORT</span><span>RESOURCES</span>
          </div>
          <p style={{ fontFamily: fontTitles, fontSize: 10, color: C.textSub }}>© 2026 NEO-TOKYO OPS. ALL SYSTEMS GREEN.</p>
        </div>
      </footer>

      {/* 12. STICKY ATC */}
      {showSticky && (
        <div style={{ position: 'fixed', bottom: 16, left: 16, right: 16, zIndex: 100 }}>
          <div style={{ ...mechaCut, maxWidth: 800, margin: '0 auto', background: C.bgMain, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px' }}>
            <div>
              <div style={{ fontFamily: fontTitles, fontSize: 18, color: C.primary }}>{ai?.enhancedTitle || product.title}</div>
              <div style={{ color: C.textSub, fontSize: 14 }}>SYNC_ACTIVE</div>
            </div>
            <button style={{ padding: '12px 32px', background: C.primary, color: '#000', fontFamily: fontTitles, fontWeight: 900, border: 'none', cursor: 'pointer' }}>ACQUIRIR</button>
          </div>
        </div>
      )}
    </div>
  );
}
