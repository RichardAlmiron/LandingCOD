'use client';
import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import {
  Menu, Search, ShoppingCart, User, Star, Truck, RotateCcw,
  ShieldCheck, Plus, Minus, Check, Cpu, BatteryFull, Shield,
  Wifi, ScanFace, Droplets, Zap, Heart, Package, PlayCircle
} from 'lucide-react';

interface PDPProps { data: StoreData; product: Product; variant?: number; }

/* ══ PALETA CREATOR / INFLUENCER ══ */
const C = {
  bgMain: '#ffffff', bgWhite: '#f8f4ff', bgImage: '#eaddff',
  textDark: '#1f1338', textSub: '#61537a', primary: '#7c3aed',
  border: '#eaddff', star: '#7c3aed', gradient: 'linear-gradient(135deg, #FF6B6B, #7C3AED, #38BDF8)'
};

const fontTitles = 'Outfit, sans-serif';
const fontSans = 'Poppins, sans-serif';
const REAL_IMG = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop';

export default function PdpCelularesCreator({ data, product }: PDPProps) {
  const images = product.images?.length ? product.images : [REAL_IMG];
  const price = typeof product.price === 'number' ? product.price : parseFloat(String(product.price)) || 0;
  const ai = product.aiContent;
  const sec = ai?.sections;
  const fmtPrice = (n: number) => {
    const str = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Gs. ${str}`;
  };
  const originalPrice = typeof product.originalPrice === 'number' ? product.originalPrice : parseFloat(String(product.originalPrice)) || 0;

  const [activeSpec, setActiveSpec] = useState<number | null>(null);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: C.bgMain, minHeight: '100vh', fontFamily: fontSans, color: C.textDark, WebkitFontSmoothing: 'antialiased', overflowX: 'hidden' }}>
      
      {/* --- NAV & BREADCRUMBS --- */}
      <nav style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 100, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Menu size={24} color={C.textDark} />
          <span style={{ fontFamily: fontTitles, fontSize: 24, fontWeight: 900, letterSpacing: '-0.03em', background: C.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{data.name || 'STUDIO.X'}</span>
          <div style={{ display: 'flex', gap: 16 }}><User size={20} /><Search size={20} /><ShoppingCart size={20} /></div>
        </div>
      </nav>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 24px 16px', fontSize: 13, color: C.textSub, fontWeight: 500 }}>
        Celulares {'>'} Creator {'>'} <span style={{ color: C.primary, fontWeight: 700 }}>{ai?.enhancedTitle || product.title}</span>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        
        {/* 1. HERO SECTION */}
        <div style={{ padding: '0 24px 48px', display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ background: C.bgWhite, borderRadius: 24, padding: 40, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, border: `2px solid ${C.border}`, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: -20, background: C.gradient, borderRadius: '30%', filter: 'blur(60px)', opacity: 0.15, zIndex: 0 }} />
              <img src={images[0]} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', borderRadius: 16, position: 'relative', zIndex: 1, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
            </div>
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#f3e8ff', color: C.primary, padding: '8px 16px', borderRadius: 99, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
              Diseñado para Creadores
            </div>
            <h1 style={{ fontFamily: fontTitles, fontSize: 48, fontWeight: 800, lineHeight: 1.1, marginBottom: 16, color: C.textDark, letterSpacing: '-0.03em' }}>{ai?.enhancedTitle || product.title}</h1>
            <p style={{ fontSize: 16, color: C.textSub, lineHeight: 1.6, marginBottom: 24 }}>{ai?.enhancedDescription || product.description || 'El primer smartphone diseñado desde cero para creadores de contenido. Edición 4K nativa, micrófonos de estudio y lentes Leica integrados.'}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(i => <Star key={i} size={16} fill={C.star} color={C.star} />)}</div>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.textDark }}>4.9/5</span><span style={{ fontSize: 14, color: C.textSub }}>+2M Vistas Locales</span>
            </div>
            <button style={{ width: '100%', padding: '16px', background: C.textDark, color: '#fff', fontSize: 16, fontWeight: 800, borderRadius: 16, border: 'none', cursor: 'pointer', marginBottom: 16, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, transition: 'transform 0.2s', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
              Comprar Ahora - {fmtPrice(price)} {originalPrice > price && <span style={{ textDecoration: 'line-through', fontWeight: 400, marginLeft: 8, opacity: 0.7 }}>({fmtPrice(originalPrice)})</span>}
            </button>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '16px 0', marginBottom: 16 }}>
              <div style={{ textAlign: 'center', flex: 1 }}><ScanFace size={20} color={C.primary} style={{ margin: '0 auto 8px' }} /><div style={{ fontSize: 12, fontWeight: 600 }}>Cámara 50MP</div></div>
              <div style={{ textAlign: 'center', flex: 1 }}><ShieldCheck size={20} color={C.primary} style={{ margin: '0 auto 8px' }} /><div style={{ fontSize: 12, fontWeight: 600 }}>1 Año Protección</div></div>
              <div style={{ textAlign: 'center', flex: 1 }}><Truck size={20} color={C.primary} style={{ margin: '0 auto 8px' }} /><div style={{ fontSize: 12, fontWeight: 600 }}>Envío Rápido</div></div>
            </div>
          </div>
        </div>

        {/* 3. AUTORIDAD */}
        <div style={{ padding: '0 24px 48px', textAlign: 'center' }}>
          <p style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: C.textSub }}>Utilizado por creadores en:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap', opacity: 0.5, filter: 'grayscale(100%)' }}>
            {['TIKTOK', 'INSTAGRAM', 'YOUTUBE', 'TWITCH'].map(l => <span key={l} style={{ fontFamily: fontTitles, fontSize: 20, fontWeight: 900, letterSpacing: '1px' }}>{l}</span>)}
          </div>
        </div>
      </div>

      {/* 2. BENEFICIOS INMEDIATOS */}
      <div style={{ background: C.bgWhite, padding: '64px 24px', borderRadius: '40px 40px 0 0' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48, letterSpacing: '-0.02em', color: C.textDark }}>Tu Propio Estudio Portátil.</h2>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { i: <Zap />, t: 'Render Ultra Rápido', d: 'Exporta videos 4K en 1/3 del tiempo que los smartphones tradicionales.' },
              { i: <Shield />, t: 'Seguridad Biométrica', d: 'Protege tus contenidos y activos digitales con reconocimiento dactilar 3D.' },
              { i: <Zap />, t: 'Vlog Mode Dual', d: 'Graba con la cámara frontal y trasera simultáneamente.' }
            ].map((b, i) => (
              <div key={i} style={{ flex: '1 1 250px', background: '#fff', padding: 32, textAlign: 'center', borderRadius: 24, boxShadow: '0 10px 30px rgba(124,58,237,0.05)' }}>
                <div style={{ background: C.bgWhite, width: 64, height: 64, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>{React.cloneElement(b.i as any, { size: 28, color: C.primary })}</div>
                <h4 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: C.textDark }}>{b.t}</h4>
                <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.6 }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. INGENIERÍA Y MATERIALES */}
      <div style={{ background: C.textDark, padding: '80px 24px', color: '#fff' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
             <h2 style={{ fontFamily: fontTitles, fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 16 }}>Grado Cinematográfico.</h2>
             <p style={{ fontSize: 16, color: '#a79abf', lineHeight: 1.8, marginBottom: 24 }}>Construido en aluminio aeroespacial recubierto de cristal mate anti-huellas. Su anillo de iluminación trasero te da la luz perfecta para stories en cualquier lugar, mientras el sensor Sony IMX989 capta hasta el último detalle.</p>
             <button style={{ padding: '14px 28px', background: '#fff', color: C.textDark, fontWeight: 800, borderRadius: 99, border: 'none', cursor: 'pointer' }}>Explorar Hardware</button>
          </div>
          <div style={{ flex: '1 1 400px', height: 300, background: '#110a1f', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid #3b2563`, overflow: 'hidden' }}>
             <img src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80' alt='Celular creator detalle' style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 24, opacity: 0.9 }} />
          </div>
        </div>
      </div>

      {/* 4. POR QUÉ USARLO */}
      <div style={{ background: C.bgMain, padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48, letterSpacing: '-0.02em' }}>No Pierdas Ni Un Trend.</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            {[
               { i: <Wifi />, t: 'Subidas 5G Directas', d: 'Conexión ultrarrápida para emitir en vivo sin cortes ni lag.' },
               { i: <BatteryFull />, t: 'Batería Todo el Día', d: 'Graba 4 horas continuas de video 4K sin conectarlo.' },
               { i: <Check />, t: 'Edición IA', d: 'Recorta, subtitula y ecualiza el audio con IA integrada.' }
            ].map((f, i) => (
              <div key={i} style={{ flex: '1 1 250px', textAlign: 'center' }}>
                <div style={{ marginBottom: 16 }}>{React.cloneElement(f.i as any, { size: 36, color: C.primary })}</div>
                <h4 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8, color: C.textDark }}>{f.t}</h4>
                <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.6, margin: '0 auto', maxWidth: 220 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. TUTORIAL VISUAL (CÓMO USARLO) */}
      <div style={{ background: C.bgWhite, padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48, letterSpacing: '-0.02em' }}>Producir es Así de Fácil.</h2>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { t: '1. Enfoca y Graba', d: 'El estabilizador óptico elimina temblores incluso caminando.', img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80' },
              { t: '2. Auto-Edita', d: 'Nuestra IA sincroniza tus clips con el beat de la música.', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80' },
              { t: '3. Hazte Viral', d: 'Sube directo a plataformas optimizado para el máximo alcance.', img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80' }
            ].map((s, i) => (
              <div key={i} style={{ flex: '1 1 250px' }}>
                <div style={{ borderRadius: 24, height: 200, overflow: 'hidden', marginBottom: 24, boxShadow: '0 10px 30px rgba(124,58,237,0.05)' }}><img src={s.img} alt={s.t} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                <h4 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: C.textDark }}>{s.t}</h4>
                <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. TABLA COMPARATIVA */}
      <div style={{ background: C.bgMain, padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48, letterSpacing: '-0.02em' }}>Por qué los Top Creators nos prefieren.</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, textAlign: 'center', minWidth: 600 }}>
              <thead>
                <tr>
                  <th style={{ padding: '24px 16px', borderBottom: `2px solid ${C.border}` }}></th>
                  <th style={{ padding: '24px 16px', background: C.bgWhite, borderRadius: '16px 16px 0 0', fontWeight: 800, color: C.primary, fontSize: 18 }}>STUDIO.X</th>
                  <th style={{ padding: '24px 16px', borderBottom: `2px solid ${C.border}`, fontWeight: 600, color: C.textSub }}>Teléfono Convencional</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { f: 'Micrófono Anti-Viento', c1: <Check size={20} color={C.primary} style={{ margin: '0 auto' }} />, c2: <Minus size={20} color='#ccc' style={{ margin: '0 auto' }} /> },
                  { f: 'Generación de Subtítulos Offline', c1: <Check size={20} color={C.primary} style={{ margin: '0 auto' }} />, c2: <Minus size={20} color='#ccc' style={{ margin: '0 auto' }} /> },
                  { f: 'Almacenamiento (Base)', c1: '512GB (Expansible)', c2: '128GB (Fijo)' },
                  { f: 'Cámara Principal', c1: '50MP Sony IMX989 1"', c2: '12MP Sensor Pequeño' }
                ].map((r, i) => (
                  <tr key={i}>
                    <td style={{ padding: '20px 16px', textAlign: 'left', fontWeight: 600, borderBottom: `1px solid ${C.border}`, color: C.textDark }}>{r.f}</td>
                    <td style={{ padding: '20px 16px', background: C.bgWhite, fontWeight: 700, color: C.textDark, borderBottom: i === 3 ? 'none' : `1px solid ${C.border}`, borderRadius: i === 3 ? '0 0 16px 16px' : 0 }}>{r.c1}</td>
                    <td style={{ padding: '20px 16px', borderBottom: `1px solid ${C.border}`, color: C.textSub }}>{r.c2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 11. ESPECIFICACIONES TÉCNICAS */}
      <div style={{ background: C.bgWhite, padding: '48px 24px', borderRadius: 40 }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 24, fontWeight: 800, marginBottom: 32, letterSpacing: '-0.02em', color: C.textDark }}>Ficha Técnica Detallada.</h2>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {[
               { t: 'Cámara Frontal para Vlogs', c: '32MP con autofoco de seguimiento de ojo, campo de visión variable (70º a 100º) para tomas grupales.' },
               { t: 'Pantalla Edit-Ready', c: 'OLED 6.8" plana a 120Hz reales, cubre 100% espacio DCI-P3 para calibración exacta de color tipo monitor grading.' },
               { t: 'Audio Direccional de 3 Vías', c: 'Tres micrófonos array con software que permite enfocar la captura de audio visualmente hacia el sujeto objetivo.' }
            ].map((s, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setActiveSpec(activeSpec === i ? null : i)} style={{ width: '100%', padding: '24px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', color: C.textDark }}>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{s.t}</span>
                  {activeSpec === i ? <Minus size={20} color={C.primary} /> : <Plus size={20} color={C.textSub} />}
                </button>
                {activeSpec === i && <div style={{ paddingBottom: 24, fontSize: 15, color: C.textSub, lineHeight: 1.6 }}>{s.c}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 10. GARANTÍA Y CONFIANZA */}
      <div style={{ background: C.bgMain, padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 32, flexWrap: 'wrap', textAlign: 'center' }}>
          {[
            { t: 'Garantía Creador de 2 Años', d: 'Cubre caídas accidentales porque sabemos cómo grabas.', i: <ShieldCheck /> },
            { t: 'Devolución en 30 Días', d: 'Más que suficiente para armar tu primer viral.', i: <RotateCcw /> },
            { t: 'Soporte Prioritario', d: 'Acceso directo a técnicos por chat 24/7.', i: <Zap /> }
          ].map((g, i) => (
            <div key={i} style={{ flex: '1 1 250px' }}>
              <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>{React.cloneElement(g.i as any, { size: 40, color: C.primary, strokeWidth: 1.5 })}</div>
              <h4 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{g.t}</h4>
              <p style={{ fontSize: 14, color: C.textSub }}>{g.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 8. PRUEBA SOCIAL DINÁMICA */}
      <div style={{ background: C.bgWhite, padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48, letterSpacing: '-0.02em' }}>Comunidad de Influencers.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[1, 2, 3, 4].map((i) => (
               <div key={i} style={{ height: 350, borderRadius: 24, overflow: 'hidden', position: 'relative', background: '#eaddff' }}>
                  <img src='https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=400&auto=format&fit=crop' alt='' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(31,19,56,0.9) 0%, transparent 50%)' }} />
                  <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, color: '#fff' }}>
                     <div style={{ fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}><Heart size={14} fill='#fff' /> {i*10}K Likes</div>
                  </div>
               </div>
            ))}
          </div>
        </div>
      </div>

      {/* 9. MISIÓN DE MARCA */}
      <div style={{ background: C.textDark, padding: '80px 24px', textAlign: 'center', color: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Zap size={48} color={C.primary} strokeWidth={2} style={{ margin: '0 auto 24px' }} />
          <h2 style={{ fontFamily: fontTitles, fontSize: 40, fontWeight: 800, marginBottom: 24, letterSpacing: '-0.03em' }}>Empoderando tu Voz.</h2>
          <p style={{ fontSize: 18, color: '#a79abf', lineHeight: 1.6 }}>Creemos que todos tienen una historia que contar. Hemos eliminado las barreras técnicas del hardware profesional de cámara y sonido, para que solo tengas que preocuparte por presionar grabar.</p>
        </div>
      </div>

      {/* 12. PREGUNTAS FRECUENTES */}
      <div style={{ background: C.bgMain, padding: '64px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48, letterSpacing: '-0.02em' }}>Dudas Comunes.</h2>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {[
              { q: '¿Puedo exportar en ProRes?', a: 'Sí, la app de cámara nativa permite capturar en Apple ProRes LOG directo a un disco SSD externo vía USB-C 3.2.' },
              { q: '¿Viene con aro de luz?', a: 'El aro LED trasero (Aura Light) está integrado en el módulo de cámaras y su temperatura de color es ajustable.' },
              { q: '¿Tiene soporte para micrófonos tipo Rode Wireless?', a: 'Absolutamente, el puerto USB-C reconoce interfaces de audio externas al instante, además de soportar micrófonos Bluetooth duales.' }
            ].map((f, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setActiveFAQ(activeFAQ === i ? null : i)} style={{ width: '100%', padding: '24px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', color: C.textDark }}>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{f.q}</span>
                  {activeFAQ === i ? <Minus size={20} color={C.primary} /> : <Plus size={20} color={C.textSub} />}
                </button>
                {activeFAQ === i && <div style={{ paddingBottom: 24, fontSize: 15, color: C.textSub, lineHeight: 1.6 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 13. VENTA CRUZADA */}
      <div style={{ background: C.bgWhite, padding: '64px 24px', borderRadius: 40 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 28, fontWeight: 800, marginBottom: 48, letterSpacing: '-0.02em' }}>Completa tu Setup:</h2>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { n: 'Gimbal Magnético Inteligente', img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80' },
              { n: 'Micrófono de Solapa Inalámbrico', img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80' },
              { n: 'SSD Portátil 2TB', img: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80' }
            ].map((v, i) => (
              <div key={i} style={{ flex: '1 1 250px', background: '#fff', padding: 24, borderRadius: 24, textAlign: 'center', boxShadow: '0 10px 30px rgba(124,58,237,0.05)' }}>
                 <div style={{ height: 160, borderRadius: 16, marginBottom: 24, overflow: 'hidden' }}>
                    <img src={v.img} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16 }} alt={v.n} />
                 </div>
                 <h4 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16, color: C.textDark }}>{v.n}</h4>
                 <button style={{ padding: '8px 20px', background: '#f3e8ff', color: C.primary, fontWeight: 800, borderRadius: 99, border: 'none', cursor: 'pointer' }}>Agregar</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 14. MURO DE RESEÑAS */}
      <div style={{ background: C.bgMain, padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 64, letterSpacing: '-0.02em' }}>Lo que Dicen Ell@s</h2>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { t: '"Logré grabar, editar y subir mi vlog de viaje a París 100% desde este dispositivo, sin tocar mi laptop. Una locura."', auth: 'Travel Blogger' },
              { t: '"La captura de audio en conciertos no satura. El micrófono direccional aísla los graves horribles mágicamente."', auth: 'Music Reviewer' },
              { t: '"El modo frontal y trasero hace que grabar reacciones sea natural y rápido, no descargo más apps para edición."', auth: 'Streamer Vlogs' }
            ].map((r, i) => (
              <div key={i} style={{ flex: '1 1 250px', background: C.bgWhite, padding: 32, borderRadius: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}><User size={20} color={C.primary} /></div>
                  <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(s => <Star key={s} size={14} fill={C.star} color={C.star} />)}</div>
                </div>
                <p style={{ fontSize: 15, color: C.textDark, marginBottom: 16, lineHeight: 1.6, fontWeight: 500 }}>{r.t}</p>
                <span style={{ fontSize: 14, color: C.textSub, fontWeight: 700 }}>@ {r.auth}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 15. FOOTER FUNCIONAL */}
      <footer style={{ background: '#0a0514', padding: '80px 24px 40px', paddingBottom: showSticky ? 140 : 40, color: '#fff' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', marginBottom: 48 }}>
            <div style={{ flex: '2 1 300px' }}>
               <h4 style={{ fontFamily: fontTitles, fontSize: 24, fontWeight: 900, marginBottom: 16, letterSpacing: '-0.03em', background: C.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>STUDIO.X</h4>
               <p style={{ fontSize: 15, color: '#a79abf', lineHeight: 1.6, maxWidth: 300 }}>Hardware para la próxima generación de creadores digitales autónomos.</p>
            </div>
            <div style={{ flex: '1 1 150px' }}>
               <h5 style={{ fontSize: 15, fontWeight: 800, marginBottom: 20, color: '#fff' }}>Para Creators</h5>
               <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 15, color: '#887b9e', lineHeight: 2.2 }}><li>Guía de Lentes</li><li>Creator Hub</li><li>App de Edición</li></ul>
            </div>
            <div style={{ flex: '1 1 150px' }}>
               <h5 style={{ fontSize: 15, fontWeight: 800, marginBottom: 20, color: '#fff' }}>Servicio</h5>
               <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 15, color: '#887b9e', lineHeight: 2.2 }}><li>Soporte 24/7</li><li>Devoluciones</li><li>Afiliados</li></ul>
            </div>
          </div>
          <div style={{ borderTop: `1px solid rgba(255,255,255,0.1)`, paddingTop: 32, display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#685c7f', fontWeight: 500 }}>
             <span>© 2026 STUDIO.X Global.</span>
             <span>Privacy | Terms</span>
          </div>
        </div>
      </footer>

      {/* STICKY ATC */}
      {showSticky && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', borderTop: `1px solid ${C.border}`, padding: '16px 24px', zIndex: 100, boxShadow: '0 -10px 40px rgba(124,58,237,0.1)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: C.textDark, fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 2 }}>{ai?.enhancedTitle || product.title}</div>
              <div style={{ color: C.primary, fontSize: 15, fontWeight: 800 }}>{fmtPrice(price)}</div>
            </div>
            <button style={{ padding: '14px 32px', background: C.textDark, color: '#fff', fontSize: 16, fontWeight: 800, borderRadius: 14, border: 'none', cursor: 'pointer', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}>Añadir al Carrito</button>
          </div>
        </div>
      )}

    </div>
  );
}
