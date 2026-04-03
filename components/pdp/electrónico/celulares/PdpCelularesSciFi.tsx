'use client';
import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import {
  Menu, ShoppingBag, Star, Truck, RotateCcw, ShieldCheck,
  Plus, Minus, Cpu, BatteryFull, Shield, Zap, Heart,
  Package, Orbit, Wifi, Globe, Zap as ZapIcon, Info, MessageSquare
} from 'lucide-react';

interface PDPProps { data: StoreData; product: Product; variant?: number; }

const C = {
  bgMain: '#020617', bgWhite: '#0f172a', bgImage: '#1e293b',
  textDark: '#f8fafc', textSub: '#94a3b8', primary: '#38bdf8',
  border: '#334155', star: '#38bdf8'
};

const fontTitles = '"Space Grotesk", sans-serif';
const fontSans = '"Inter", sans-serif';
const REAL_IMG = 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=800&fit=crop';

export default function PdpCelularesSciFi({ data, product }: PDPProps) {
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

  return (
    <div style={{ background: C.bgMain, minHeight: '100vh', fontFamily: fontSans, color: C.textDark, position: 'relative', overflowX: 'hidden' }}>
      
      {/* 15. BREADCRUMBS & NAV */}
      <nav style={{ padding: '20px 24px', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(2,6,23,0.8)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Menu size={24} color={C.primary} />
          <span style={{ fontFamily: fontTitles, fontSize: 24, fontWeight: 900, letterSpacing: '8px', background: `linear-gradient(90deg, ${C.primary}, #fff)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AEROS</span>
          <ShoppingBag size={24} color={C.primary} />
        </div>
      </nav>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 0', fontFamily: fontTitles, fontSize: 10, color: C.primary, letterSpacing: '4px' }}>
        CELULARES {'>'} SCIFI {'>'} <span style={{ color: '#fff' }}>{product.title.toUpperCase()}</span>
      </div>

      {/* 1. HERO SECTION */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px', display: 'flex', gap: 64, flexWrap: 'wrap', position: 'relative' }}>
        <div style={{ flex: '1 1 450px' }}>
          <div style={{ background: C.bgWhite, height: 550, borderRadius: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', border: `1px solid ${C.border}`, boxShadow: `0 0 60px rgba(56,189,248,0.1)` }}>
             <img src={images[0]} alt="" style={{ maxWidth: '85%', maxHeight: '85%', objectFit: 'contain', zIndex: 2, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))' }} />
             <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)' }}></div>
          </div>
        </div>
        <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(56,189,248,0.1)', color: C.primary, padding: '10px 20px', borderRadius: 99, fontSize: 12, fontWeight: 700, marginBottom: 32, border: `1px solid rgba(56,189,248,0.3)` }}>
             <Orbit size={16}/> ORBITAL GRADE CERTIFIED
          </div>
          <h2 style={{ fontFamily: fontTitles, fontSize: 64, fontWeight: 800, lineHeight: 1, marginBottom: 24 }}>{ai?.enhancedTitle || product.title}</h2>
          <p style={{ fontSize: 18, color: C.textSub, lineHeight: 1.8, marginBottom: 40 }}>{ai?.enhancedDescription || product.description || 'Red cuántica de baja órbita. Sin puertos, sin botones, sincronización neuronal completa mediante pulso electromagnético seguro.'}</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
            <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(i => <Star key={i} size={20} fill={C.primary} color={C.primary} />)}</div>
            <span style={{ fontFamily: fontTitles, color: C.primary }}>PIONEER RATING</span>
          </div>

          <div style={{ fontFamily: fontTitles, fontSize: 56, fontWeight: 300, marginBottom: 48 }}>{fmtPrice(price)} <span style={{ fontSize: 14, color: C.textSub, letterSpacing: '4px' }}>USD_EQUIV</span></div>
          
          <button style={{ width: '100%', padding: '24px', background: C.primary, color: '#020617', fontFamily: fontTitles, fontSize: 18, fontWeight: 900, border: 'none', borderRadius: 20, cursor: 'pointer', boxShadow: `0 0 30px rgba(56,189,248,0.4)`, textTransform: 'uppercase' }}>
            INICIALIZAR SEQ. COMPRA
          </button>
        </div>
      </div>

      {/* 2. BENEFICIOS RÁPIDOS */}
      <div style={{ padding: '100px 24px', background: 'rgba(15,23,42,0.5)', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 24, textAlign: 'center', marginBottom: 64, letterSpacing: '4px' }}>// CORE_ENHANCEMENTS</h3>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { i: <Wifi />, t: 'Malla Gravitacional', d: 'Conexión estable incluso en el lado oscuro de la Luna.' },
              { i: <Cpu />, t: 'Neuronal Core', d: 'Latencia cero. Ejecuta pensamientos en milisegundos.' },
              { i: <Shield />, t: 'Escudo Ionizado', d: 'Resistencia absoluta a radiación solar y EMP.' }
            ].map((b, i) => (
              <div key={i} style={{ flex: '1 1 300px', background: C.bgMain, padding: 48, borderRadius: 32, border: `1px solid ${C.border}`, textAlign: 'center' }}>
                <div style={{ color: C.primary, marginBottom: 24, display: 'flex', justifyContent: 'center' }}>{React.cloneElement(b.i as any, { size: 40 })}</div>
                <h4 style={{ fontFamily: fontTitles, fontSize: 22, marginBottom: 16 }}>{b.t}</h4>
                <p style={{ color: C.textSub, fontSize: 16, lineHeight: 1.6 }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. AUTORIDAD / LOGOS */}
      <div style={{ padding: '64px 24px', opacity: 0.4 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 40, fontFamily: fontTitles, fontSize: 18, fontWeight: 900 }}>
          {['VOYAGER_CORP', 'SPACEX_LABS', 'NASA_INTEL', 'ESA_ORBIT'].map(l => <span key={l}>{l}</span>)}
        </div>
      </div>

      {/* 4. INGENIERÍA / MATERIALES */}
      <div style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 80, alignItems: 'center', flexWrap: 'wrap-reverse' }}>
          <div style={{ flex: '1 1 500px', height: 450, background: C.bgImage, borderRadius: 40, overflow: 'hidden', border: `1px solid ${C.border}` }}>
             <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} alt="Celular scifi detalle" />
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <h3 style={{ fontFamily: fontTitles, fontSize: 40, fontWeight: 800, marginBottom: 32 }}>Chasis de Helio-3 Forjado.</h3>
            <p style={{ fontSize: 18, color: C.textSub, lineHeight: 1.8, marginBottom: 32 }}>Utilizamos depósitos minerales extraídos mediante minería de asteroides para crear una aleación que no existe en la Tierra. El resultado es un dispositivo que pesa 92g pero aguanta 40 atmósferas de presión.</p>
            <div style={{ color: C.primary, fontFamily: fontTitles, fontSize: 14, letterSpacing: '2px', cursor: 'pointer' }}>READ_BLUEPRINTS.PDF →</div>
          </div>
        </div>
      </div>

      {/* 5. TUTORIAL VISUAL */}
      <div style={{ padding: '100px 24px', background: C.bgWhite }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 32, textAlign: 'center', marginBottom: 64 }}>PROTOCOLO_LINK</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
            {[
              { t: 'INIT', d: 'Escaneo biométrico de retina para desbloqueo cuántico.', i: <Globe /> },
              { t: 'SYNC', d: 'Descarga instantánea de tu consciencia digital.', i: <ZapIcon /> },
              { i: <BatteryFull />, t: 'ACTIVE', d: 'Estado de alerta permanente mediante micro-solar panel.' }
            ].map((s, i) => (
              <div key={i} style={{ background: C.bgMain, padding: 40, borderRadius: 24, border: `1px solid ${C.border}` }}>
                 <div style={{ color: C.primary, marginBottom: 24 }}>{React.cloneElement(s.i as any, { size: 32 })}</div>
                 <h4 style={{ fontFamily: fontTitles, fontSize: 20, color: C.primary, marginBottom: 12 }}>{s.t}</h4>
                 <p style={{ color: C.textSub, lineHeight: 1.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. SOCIAL PROOF (MINI) */}
      <div style={{ padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 48, marginBottom: 32 }}>"The device feels alive."</h3>
          <p style={{ fontSize: 20, color: C.textSub }}>— Commander Mark Watney, Orbital Station IV</p>
        </div>
      </div>

      {/* 7. MISIÓN DE MARCA */}
      <div style={{ padding: '120px 24px', background: `linear-gradient(180deg, ${C.bgMain}, #000)`, textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 56, fontWeight: 900, marginBottom: 32 }}>PARA_LA_ULTIMA_FRONTERA.</h3>
          <p style={{ fontSize: 20, lineHeight: 2, color: C.textSub }}>No diseñamos para el Homo Sapiens de hoy, sino para la especie multiplanetaria que seremos mañana. AEROS es el puente tecnológico hacia las estrellas.</p>
        </div>
      </div>

      {/* 8. GARANTÍA */}
      <div style={{ padding: '80px 24px', background: C.bgWhite }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {[
            { t: 'REP_SAT', d: 'Sustitución vía mensajería orbital en 48h.', i: <Truck /> },
            { t: 'PROT_EXT', d: 'Seguro contra colisión espacial y vacío.', i: <ShieldCheck /> },
            { t: 'RECYCLE', d: 'Programa de devolución de minerales nobles.', i: <RotateCcw /> }
          ].map((g, i) => (
            <div key={i} style={{ flex: '1 1 300px', border: `1px solid ${C.border}`, padding: 32, borderRadius: 24 }}>
              <div style={{ color: C.primary, marginBottom: 16 }}>{React.cloneElement(g.i as any, { size: 24 })}</div>
              <h4 style={{ fontFamily: fontTitles, fontSize: 18, marginBottom: 8, color: C.primary }}>{g.t}</h4>
              <p style={{ color: C.textSub, fontSize: 14 }}>{g.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 9. ESPECIFICACIONES TÉCNICAS */}
      <div style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 32, color: C.primary, marginBottom: 48 }}>// DATA_SHEET</h3>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {[
              { t: 'NEURAL_UNIT', c: 'Procesador de 1024 núcleos cuánticos con refrigeración por superfluido.' },
              { t: 'VISION_SYSTEM', c: 'Pantalla de polímero maleable con 10,000 nits de brillo real.' },
              { t: 'ENERGY_CELL', c: 'Fusión fría de bolsillo capaz de cargar 0-100 en 10 segundos.' }
            ].map((s, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setActiveSpec(activeSpec === i ? null : i)} style={{ width: '100%', padding: '32px 0', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', color: '#fff', fontFamily: fontTitles, cursor: 'pointer' }}>
                  <span>{s.t}</span>
                  {activeSpec === i ? <Minus /> : <Plus />}
                </button>
                {activeSpec === i && <div style={{ paddingBottom: 32, color: C.textSub, lineHeight: 1.8 }}>{s.c}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 10. FAQ */}
      <div style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 32, color: C.primary, textAlign: 'center', marginBottom: 48 }}>USER_QUERY_MODE</h3>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {[
              { q: '¿Funciona en gravedad cero?', a: 'Diseñado específicamente para ello. Los componentes internos están balanceados para evitar inercia rotacional.' },
              { q: '¿Cómo se carga sin puertos?', a: 'Absorbe radiación cósmica de fondo y luz estelar. No necesita carga doméstica convencional.' }
            ].map((f, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setActiveFAQ(activeFAQ === i ? null : i)} style={{ width: '100%', padding: '32px 0', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', color: '#fff', textAlign: 'left', fontFamily: fontTitles, cursor: 'pointer' }}>
                  <span>{f.q}</span>
                  {activeFAQ === i ? <Minus /> : <Plus />}
                </button>
                {activeFAQ === i && <div style={{ paddingBottom: 32, color: C.textSub, lineHeight: 1.8 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 11. CROSS-SELL */}
      <div style={{ background: C.bgWhite, padding: '100px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h4 style={{ fontFamily: fontTitles, fontSize: 24, textAlign: 'center', marginBottom: 64, color: C.primary }}>ORBITAL_ECOSYSTEM</h4>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { n: 'Nanofunda Auto-reparable', img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80' },
              { n: 'Módulo de Enlace Trans-estelar', img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80' },
              { n: 'Célula de Energía de Respaldo', img: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80' }
            ].map((v, i) => (
              <div key={i} style={{ flex: '1 1 300px', background: C.bgMain, padding: 40, border: `1px solid ${C.border}`, borderRadius: 24, textAlign: 'center' }}>
                 <div style={{ height: 180, borderRadius: 20, marginBottom: 24, overflow: 'hidden' }}><img src={v.img} alt={v.n} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                 <h5 style={{ fontFamily: fontTitles, fontSize: 18, marginBottom: 16 }}>{v.n}</h5>
                 <button style={{ padding: '12px 32px', background: C.primary, color: '#000', fontFamily: fontTitles, fontWeight: 800, borderRadius: 99, border: 'none', cursor: 'pointer' }}>ADD_TO_DOCK</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 13. REVIEW WALL */}
      <div style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 40, textAlign: 'center', marginBottom: 80 }}>DECRYPTED_REVIEWS</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40 }}>
            {[
              { t: '“El fin de la era del silicio. AEROS es puro hardware cuántico.”', author: 'TERRA_NEW_WSJ' },
              { t: '“La pantalla es tan brillante que puede usarse como baliza de rescate.”', author: 'ASTRO_MAG' },
              { t: '“Sincronización neuronal perfecta. Es una extensión de mi brazo.”', author: 'COLONY_NEWS' }
            ].map((r, i) => (
              <div key={i} style={{ padding: 40, border: `1px solid ${C.border}`, background: C.bgWhite, borderRadius: 32 }}>
                <p style={{ fontSize: 18, color: C.textDark, lineHeight: 1.6, marginBottom: 24, fontStyle: 'italic' }}>{r.t}</p>
                <div style={{ fontFamily: fontTitles, color: C.primary, fontSize: 12 }}>— {r.author}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 14. FOOTER FUNCIONAL */}
      <footer style={{ padding: `100px 24px ${showSticky ? 120 : 60}px`, background: '#000', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 64 }}>
          <div>
            <h4 style={{ fontFamily: fontTitles, fontSize: 32, letterSpacing: '8px', color: C.primary, marginBottom: 24 }}>AEROS</h4>
            <p style={{ opacity: 0.6, fontSize: 14 }}>Beyond Orbit Technologies S.A. <br /> Moon Base Gamma, Sector 7.</p>
          </div>
          <div style={{ display: 'flex', gap: 80 }}>
             <div><h5 style={{ fontFamily: fontTitles, color: C.primary, marginBottom: 24 }}>STATION</h5><div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, opacity: 0.6 }}><span>Blueprints</span><span>Comm_Link</span><span>Support</span></div></div>
             <div><h5 style={{ fontFamily: fontTitles, color: C.primary, marginBottom: 24 }}>LEGAL</h5><div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, opacity: 0.6 }}><span>Privacy_Key</span><span>Garantía</span><span>Terms</span></div></div>
          </div>
        </div>
      </footer>

      {/* 12. STICKY ATC */}
      {showSticky && (
        <div style={{ position: 'fixed', bottom: 24, left: 24, right: 24, zIndex: 100 }}>
          <div style={{ maxWidth: 700, margin: '0 auto', background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(10px)', border: `1px solid ${C.primary}`, borderLeftWidth: 10, padding: '16px 32px', borderRadius: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: fontTitles, fontSize: 20, fontWeight: 800 }}>{ai?.enhancedTitle || product.title}</div>
              <div style={{ color: C.primary, fontSize: 14, fontFamily: fontTitles }}>{fmtPrice(price)} ACTIVE_LINK</div>
            </div>
            <button style={{ padding: '14px 32px', background: C.primary, color: '#000', fontFamily: fontTitles, fontWeight: 900, borderRadius: 12, border: 'none', cursor: 'pointer' }}>ACQUIRIR</button>
          </div>
        </div>
      )}
    </div>
  );
}
