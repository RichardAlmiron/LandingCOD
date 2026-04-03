'use client';
import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import {
  Menu, ShoppingBag, Star, Truck, RotateCcw, ShieldCheck,
  Plus, Minus, Cpu, BatteryFull, Shield, Zap, Heart,
  Package, Mountain, Droplets, Activity, Crosshair, Box, Anchor, Info, MessageSquare
} from 'lucide-react';

interface PDPProps { data: StoreData; product: Product; variant?: number; }

const C = {
  bgMain: '#1a1c1a', bgWhite: '#222522', bgImage: '#111311',
  textDark: '#FFFFFF', textSub: '#A1A8A2', primary: '#FF5722',
  border: '#2A2D2A', star: '#FFC107'
};

const fontTitles = 'Impact, "Arial Black", sans-serif';
const fontSans = 'Roboto, sans-serif';
const REAL_IMG = 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=800&fit=crop';

export default function PdpCelularesOutdoor({ data, product }: PDPProps) {
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

  const ruggedClip = { clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' };
  const ruggedBorder = { border: `2px solid ${C.border}`, borderRadius: 4 };

  return (
    <div style={{ background: C.bgMain, minHeight: '100vh', fontFamily: fontSans, color: C.textDark, WebkitFontSmoothing: 'antialiased' }}>
      
      {/* 15. BREADCRUMBS & NAV */}
      <nav style={{ padding: '16px 24px', background: C.bgImage, borderBottom: `4px solid ${C.primary}`, position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Menu size={28} color={C.textDark} />
          <h1 style={{ fontFamily: fontTitles, fontSize: 32, letterSpacing: '4px', textTransform: 'uppercase', color: C.primary, margin: 0 }}>{data.name || 'RUGGED'}</h1>
          <ShoppingBag size={28} color={C.textDark} />
        </div>
      </nav>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 0', fontSize: 13, color: C.textSub, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>
        Celulares {'>'} Outdoor {'>'} <span style={{ color: C.primary }}>{ai?.enhancedTitle || product.title}</span>
      </div>

      {/* 1. HERO SECTION */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px', display: 'flex', gap: 64, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ background: C.bgWhite, height: 600, ...ruggedBorder, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
             <div style={{ position: 'absolute', top: 0, left: 0, background: C.primary, color: '#fff', padding: '8px 24px', fontFamily: fontTitles, fontSize: 18, zIndex: 1, ...ruggedClip }}>MIL-SPEC 810G</div>
             <img src={images[0]} alt="" style={{ maxWidth: '85%', maxHeight: '85%', objectFit: 'contain', filter: 'contrast(1.1) brightness(1.1)' }} />
             <div style={{ position: 'absolute', bottom: 20, right: 20, opacity: 0.2 }}><Crosshair size={120} /></div>
          </div>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ display: 'inline-block', background: C.primary, color: '#fff', padding: '4px 12px', fontFamily: fontTitles, fontSize: 14, marginBottom: 24, letterSpacing: '2px' }}>UNIDAD DE CAMPAÑA // ACTIVE</div>
          <h2 style={{ fontFamily: fontTitles, fontSize: 64, fontWeight: 900, lineHeight: 1, marginBottom: 24, textTransform: 'uppercase' }}>{ai?.enhancedTitle || product.title}</h2>
          <p style={{ fontSize: 18, color: C.textSub, lineHeight: 1.6, marginBottom: 40, fontWeight: 500 }}>{ai?.enhancedDescription || product.description || 'Blindaje balístico, resistencia IP69K y batería de 15,000mAh. Diseñado para teatros de operaciones extremos y entornos industriales hostiles.'}</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40, background: 'rgba(255,87,34,0.1)', padding: '12px', borderLeft: `4px solid ${C.primary}` }}>
            <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(i => <Star key={i} size={20} fill={C.star} color={C.star} />)}</div>
            <span style={{ fontSize: 13, fontWeight: 900, textTransform: 'uppercase' }}>Elite Ops Rating</span>
          </div>

          <div style={{ fontFamily: fontTitles, fontSize: 56, marginBottom: 48 }}>{fmtPrice(price)} <span style={{ fontSize: 18, color: C.textSub }}>CRD</span></div>
          
          <button style={{ width: '100%', padding: '24px', background: C.primary, color: '#fff', fontFamily: fontTitles, fontSize: 24, border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '4px', boxShadow: '0 10px 0 #bf360c' }}>
            EQUIPAR AHORA
          </button>
        </div>
      </div>

      {/* 2. BENEFICIOS RÁPIDOS */}
      <div style={{ padding: '80px 24px', background: C.bgImage, borderTop: `4px solid ${C.border}`, borderBottom: `4px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 32, textAlign: 'center', marginBottom: 64, textTransform: 'uppercase', letterSpacing: '2px' }}>Capacidades Extremas</h3>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { i: <Shield />, t: 'IP69K REFORZADO', d: 'Sumergible hasta 3 metros y resistente a vapor de agua a presión.' },
              { i: <Zap />, t: 'LINTERNA 1000LM', d: 'Potente haz de luz integrado para misiones nocturnas sin equipo extra.' },
              { i: <BatteryFull />, t: '15,000 mAh', d: 'Hasta 20 días de autonomía en modo de ahorro táctico inteligente.' }
            ].map((b, i) => (
              <div key={i} style={{ flex: '1 1 300px', background: C.bgWhite, padding: 48, ...ruggedBorder, borderTop: `8px solid ${C.primary}` }}>
                <div style={{ color: C.primary, marginBottom: 24 }}>{React.cloneElement(b.i as any, { size: 48 })}</div>
                <h4 style={{ fontFamily: fontTitles, fontSize: 24, marginBottom: 16 }}>{b.t}</h4>
                <p style={{ color: C.textSub, fontSize: 16, lineHeight: 1.6, fontWeight: 500 }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. AUTORIDAD / LOGOS */}
      <div style={{ padding: '64px 24px', textAlign: 'center', opacity: 0.5 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 64, flexWrap: 'wrap', fontFamily: fontTitles, fontSize: 24, textTransform: 'uppercase' }}>
          {['NAT_GEOGRAPHIC', 'GEAR_JUNKIE', 'OUTSIDE_MAG', 'MIL_TECH'].map(l => <span key={l}>{l}</span>)}
        </div>
      </div>

      {/* 4. INGENIERÍA / MATERIALES */}
      <div style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 80, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 450px' }}>
            <h3 style={{ fontFamily: fontTitles, fontSize: 40, marginBottom: 32, textTransform: 'uppercase' }}>Blindaje de TPU Bayer.</h3>
            <p style={{ fontSize: 18, color: C.textSub, lineHeight: 1.8, marginBottom: 32, fontWeight: 500 }}>Utilizamos polímeros de grado industrial de Bayer combinados con una estructura interna de titanio. Las esquinas están sobredimensionadas para absorber impactos de hasta 3 metros sobre concreto puro.</p>
            <div style={{ fontFamily: fontTitles, color: C.primary, fontSize: 20, letterSpacing: '2px', cursor: 'pointer' }}>VER PRUEBA DE IMPACTO →</div>
          </div>
          <div style={{ flex: '1 1 450px', height: 400, background: C.bgWhite, ...ruggedBorder, overflow: 'hidden' }}>
             <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Celular outdoor detalle" />
          </div>
        </div>
      </div>

      {/* 5. TUTORIAL VISUAL (MOLLE) */}
      <div style={{ padding: '100px 24px', background: C.bgImage }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 32, textAlign: 'center', marginBottom: 64, textTransform: 'uppercase' }}>Configuración Táctica</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
            {[
              { t: 'DEPLOY', d: 'Montaje instantáneo en chalecos MOLLE mediante clip reforzado.', i: <Box /> },
              { t: 'ACTIVE', d: 'Activación de modo guantes para uso en climas bajo cero.', i: <Anchor /> },
              { t: 'RESCUE', d: 'Botón SOS físico con coordenadas satelitales encriptadas.', i: <Activity /> }
            ].map((s, i) => (
              <div key={i} style={{ background: C.bgWhite, padding: 40, ...ruggedBorder }}>
                 <div style={{ color: C.primary, marginBottom: 24 }}>{React.cloneElement(s.i as any, { size: 32 })}</div>
                 <h4 style={{ fontFamily: fontTitles, fontSize: 24, marginBottom: 12 }}>{s.t}</h4>
                 <p style={{ color: C.textSub, fontWeight: 500 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. SOCIAL PROOF (BRIGADA) */}
      <div style={{ padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 48, marginBottom: 32, color: C.primary }}>"Indestructible."</h3>
          <p style={{ fontSize: 22, color: C.textSub, fontWeight: 700 }}>— Sargento James Miller, Search & Rescue Division</p>
        </div>
      </div>

      {/* 7. MISIÓN DE MARCA */}
      <div style={{ padding: '120px 24px', background: C.primary, color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 56, fontWeight: 900, marginBottom: 32 }}>DONDE LA TECNOLOGÍA SOBREVIVE.</h3>
          <p style={{ fontSize: 22, lineHeight: 1.8, fontWeight: 700 }}>No fabricamos para la oficina. Fabricamos para el lodo, la nieve, las chispas y el concreto. RUGGED X es la herramienta final para los hombres y mujeres de acción.</p>
        </div>
      </div>

      {/* 8. GARANTÍA */}
      <div style={{ padding: '100px 24px', background: C.bgMain }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {[
            { t: 'BLINDAJE TOTAL', d: 'Si la pantalla se rompe por impacto incidental, la cambiamos.', i: <ShieldCheck /> },
            { t: 'SOPORTE DE CAMPO', d: 'Sustitución en 24h en cualquier zona de trabajo.', i: <Truck /> },
            { t: 'DURABILIDAD', d: 'Certificación de 3 años en condiciones extremas.', i: <Info /> }
          ].map((g, i) => (
            <div key={i} style={{ flex: '1 1 300px', ...ruggedBorder, padding: 40, background: C.bgWhite }}>
              <div style={{ color: C.primary, marginBottom: 24 }}>{g.i}</div>
              <h4 style={{ fontFamily: fontTitles, fontSize: 22, marginBottom: 12 }}>{g.t}</h4>
              <p style={{ color: C.textSub, fontSize: 16, fontWeight: 500 }}>{g.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 9. ESPECIFICACIONES TÉCNICAS */}
      <div style={{ padding: '100px 24px', background: C.bgImage }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 32, color: C.primary, marginBottom: 48, textAlign: 'center' }}>FICHA TÉCNICA MILITAR</h3>
          <div style={{ borderTop: `2px solid ${C.border}` }}>
            {[
              { t: 'PODER DE CÓMPUTO', c: 'Octa-core 2.4GHz optimizado para eficiencia térmica masiva.' },
              { t: 'OPTIQUES TÁCTICOS', c: 'Sensor de 108MP + Sensor Térmico FLIR Lepton 3.5.' },
              { t: 'ENERGÍA', c: '15,000mAh. Carga OTG (Reverse Charging) para alimentar otros equipos.' }
            ].map((s, i) => (
              <div key={i} style={{ borderBottom: `2px solid ${C.border}` }}>
                <button onClick={() => setActiveSpec(activeSpec === i ? null : i)} style={{ width: '100%', padding: '32px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', color: '#fff', fontFamily: fontTitles }}>
                  <span style={{ fontSize: 20 }}>{`[+] ${s.t}`}</span>
                  {activeSpec === i ? <Minus /> : <Plus />}
                </button>
                {activeSpec === i && <div style={{ paddingBottom: 32, color: C.textSub, fontSize: 16, fontWeight: 700 }}>{s.c}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 10. FAQ */}
      <div style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 32, textAlign: 'center', marginBottom: 48 }}>INTEL (FAQ)</h3>
          <div style={{ borderTop: `2px solid ${C.border}` }}>
            {[
              { q: '¿Es sumergible en agua salada?', a: 'Sí, pero recomendamos enjuagar con agua dulce después de misiones marinas para evitar corrosión en los conectores.' },
              { q: '¿Funciona con guantes tácticos?', a: 'El panel táctico tiene sensibilidad aumentada configurable para guantes de hasta 3mm de grosor.' }
            ].map((f, i) => (
              <div key={i} style={{ borderBottom: `2px solid ${C.border}` }}>
                <button onClick={() => setActiveFAQ(activeFAQ === i ? null : i)} style={{ width: '100%', padding: '32px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', color: '#fff', fontFamily: fontTitles }}>
                  <span style={{ fontSize: 18 }}>{`? ${f.q}`}</span>
                  {activeFAQ === i ? <Minus /> : <Plus />}
                </button>
                {activeFAQ === i && <div style={{ paddingBottom: 32, color: C.textSub, fontSize: 16, fontWeight: 500 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 11. CROSS-SELL */}
      <div style={{ background: C.bgImage, padding: '100px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h4 style={{ fontFamily: fontTitles, fontSize: 24, textAlign: 'center', marginBottom: 64, color: C.primary }}>EQUIPAMIENTO EXTRA</h4>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { n: 'Soporte de Bici Blindado', img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80' },
              { n: 'Funda MOLLE Modular', img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80' },
              { n: 'Antena Larga Alcance UHF', img: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80' }
            ].map((v, i) => (
              <div key={i} style={{ flex: '1 1 300px', background: C.bgWhite, padding: 40, ...ruggedBorder, textAlign: 'center' }}>
                 <div style={{ height: 180, ...ruggedBorder, marginBottom: 24, overflow: 'hidden' }}><img src={v.img} alt={v.n} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                 <h5 style={{ fontFamily: fontTitles, fontSize: 20, marginBottom: 16 }}>{v.n}</h5>
                 <button style={{ padding: '12px 32px', background: C.primary, color: '#fff', fontFamily: fontTitles, fontWeight: 900, border: 'none', cursor: 'pointer' }}>AÑADIR KIT</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 13. REVIEW WALL */}
      <div style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 40, textAlign: 'center', marginBottom: 80 }}>DEBRIEFING (RESEÑAS)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40 }}>
            {[
              { t: '“Sobrevivió a una caída desde un camión a 40km/h. Sigue funcionando como el primer día.”', author: 'SITREP_04' },
              { t: '“La cámara térmica es indispensable para mantenimiento industrial de noche.”', author: 'INGENIA_CORP' },
              { t: '“Batería infinita. Estuve 10 días en la montaña y volví con 30%.”', author: 'RESCUE_TEAM' }
            ].map((r, i) => (
              <div key={i} style={{ padding: 40, ...ruggedBorder, background: C.bgWhite }}>
                <p style={{ fontSize: 18, color: C.textDark, lineHeight: 1.6, marginBottom: 24, fontWeight: 700 }}>{r.t}</p>
                <div style={{ fontFamily: fontTitles, color: C.primary, fontSize: 16 }}>— FROM: {r.author}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 14. FOOTER FUNCIONAL */}
      <footer style={{ padding: `100px 24px ${showSticky ? 120 : 60}px`, background: '#000', borderTop: `8px solid ${C.primary}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 64 }}>
          <div>
            <h4 style={{ fontFamily: fontTitles, fontSize: 40, color: C.primary, marginBottom: 24 }}>RUGGED X</h4>
            <p style={{ opacity: 0.6, fontSize: 14 }}>Rough Terrain Devices S.A. <br /> Sector de Defensa Industrial.</p>
          </div>
          <div style={{ display: 'flex', gap: 80 }}>
             <div><h5 style={{ fontFamily: fontTitles, color: C.primary, marginBottom: 24 }}>SISTEMAS</h5><div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, opacity: 0.6 }}><span>Blueprints</span><span>Field_Manual</span><span>Soporte</span></div></div>
             <div><h5 style={{ fontFamily: fontTitles, color: C.primary, marginBottom: 24 }}>LEGAL</h5><div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, opacity: 0.6 }}><span>Privacy_Shield</span><span>Garantía</span><span>Terms</span></div></div>
          </div>
        </div>
      </footer>

      {/* 12. STICKY ATC */}
      {showSticky && (
        <div style={{ position: 'fixed', bottom: 16, left: 16, right: 16, zIndex: 100 }}>
          <div style={{ maxWidth: 800, margin: '0 auto', background: C.bgWhite, border: `2px solid ${C.primary}`, borderBottomWidth: 10, padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: fontTitles, fontSize: 22, fontWeight: 800 }}>{ai?.enhancedTitle || product.title}</div>
              <div style={{ color: C.primary, fontSize: 16, fontWeight: 900 }}>{fmtPrice(price)} CRD ACTIVE</div>
            </div>
            <button style={{ padding: '16px 40px', background: C.primary, color: '#fff', fontFamily: fontTitles, fontWeight: 900, border: 'none', cursor: 'pointer' }}>EQUIPAR</button>
          </div>
        </div>
      )}
    </div>
  );
}
