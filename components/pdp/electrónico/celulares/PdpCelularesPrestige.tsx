'use client';
import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import {
  Menu, ShoppingBag, Star, Truck, RotateCcw, ShieldCheck,
  Plus, Minus, Cpu, BatteryFull, Shield, Zap, Heart,
  Package, Sparkles, Gem, Award, Crown
} from 'lucide-react';

interface PDPProps { data: StoreData; product: Product; variant?: number; }

const C = {
  bgMain: '#ffffff', bgWhite: '#fafafa', bgImage: '#f0f0f0',
  textDark: '#1c1c1c', textSub: '#666666', primary: '#b4975a',
  border: '#e5e5e5', star: '#b4975a'
};

const fontTitles = '"Playfair Display", serif';
const fontSans = '"Inter", sans-serif';
const REAL_IMG = 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=800&fit=crop';

export default function PdpCelularesPrestige({ data, product }: PDPProps) {
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
    <div style={{ background: C.bgMain, minHeight: '100vh', fontFamily: fontSans, color: C.textDark, WebkitFontSmoothing: 'antialiased' }}>
      
      {/* 15. BREADCRUMBS & NAV */}
      <nav style={{ padding: '24px', borderBottom: `1px solid ${C.border}`, position: 'sticky', top: 0, background: '#fff', zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Menu size={20} strokeWidth={1.5} />
          <h1 style={{ fontFamily: fontTitles, fontSize: 28, fontWeight: 900, letterSpacing: '0.1em', margin: 0, textTransform: 'uppercase' }}>{data.name || 'PRESTIGE'}</h1>
          <ShoppingBag size={20} strokeWidth={1.5} />
        </div>
      </nav>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 0', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.textSub }}>
        Celulares {'>'} Prestige {'>'} <span style={{ color: C.primary }}>{ai?.enhancedTitle || product.title}</span>
      </div>

      {/* 1. HERO SECTION */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 80px', display: 'flex', gap: 80, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ background: C.bgImage, height: 650, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${C.border}`, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 24, left: 24, padding: '8px 16px', border: `1px solid ${C.primary}`, color: C.primary, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em' }}>PIEZA ÚNICA</div>
            <img src={images[0]} alt="" style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
          </div>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.primary, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 24 }}>The Gold Collection</div>
          <h2 style={{ fontFamily: fontTitles, fontSize: 64, fontWeight: 900, lineHeight: 1, marginBottom: 24, color: C.textDark }}>{ai?.enhancedTitle || product.title}</h2>
          <p style={{ fontSize: 18, color: C.textSub, lineHeight: 1.8, marginBottom: 40, fontStyle: 'italic' }}>{ai?.enhancedDescription || product.description || 'Una obra maestra de la micro-ingeniería. Forjado en oro de 24K y cerámica blanca, diseñado para quienes no aceptan concesiones.'}</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
            <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(i => <Star key={i} size={18} fill={C.star} color={C.star} />)}</div>
            <span style={{ fontSize: 16, fontWeight: 600 }}>Elite Rating</span>
          </div>

          <div style={{ fontSize: 48, fontFamily: fontTitles, marginBottom: 48 }}>{fmtPrice(price)} <span style={{ fontSize: 18, color: C.textSub, verticalAlign: 'middle', marginLeft: 8 }}>USD</span></div>
          
          <button style={{ width: '100%', padding: '24px', background: C.textDark, color: '#fff', fontSize: 14, fontWeight: 800, border: 'none', cursor: 'pointer', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 32 }}>
            Solicitar Adquisición
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '32px 0', borderTop: `1px solid ${C.border}` }}>
            <div style={{ textAlign: 'center' }}><Crown size={20} color={C.primary} style={{ marginBottom: 8 }} /><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }}>EXCLUSIVO</div></div>
            <div style={{ textAlign: 'center' }}><Award size={20} color={C.primary} style={{ marginBottom: 8 }} /><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }}>CERTIFICADO</div></div>
            <div style={{ textAlign: 'center' }}><Gem size={20} color={C.primary} style={{ marginBottom: 8 }} /><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }}>LUJO PURO</div></div>
          </div>
        </div>
      </div>

      {/* 2. BENEFICIOS RÁPIDOS */}
      <div style={{ padding: '100px 24px', background: C.bgWhite }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <h3 style={{ fontFamily: fontTitles, fontSize: 40, fontWeight: 900, marginBottom: 16 }}>Excelencia Sin Compromisos.</h3>
            <div style={{ width: 80, height: 2, background: C.primary, margin: '0 auto' }}></div>
          </div>
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            {[
              { i: <Cpu strokeWidth={1}/>, t: 'Noble Processor', d: 'Rendimiento soberano sin latencia perceptible.' },
              { i: <Sparkles strokeWidth={1}/>, t: 'Acabados a Mano', d: 'Cada unidad es pulida individualmente por maestros artesanos.' },
              { i: <BatteryFull strokeWidth={1}/>, t: 'Autonomía Eterna', d: 'Células de energía de alta densidad para viajes transatlánticos.' }
            ].map((b, i) => (
              <div key={i} style={{ flex: '1 1 300px', textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', margin: '0 auto 32px', color: C.primary }}>{b.i}</div>
                <h4 style={{ fontFamily: fontTitles, fontSize: 24, fontWeight: 800, marginBottom: 16 }}>{b.t}</h4>
                <p style={{ fontSize: 16, color: C.textSub, lineHeight: 1.8 }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. AUTORIDAD / LOGOS */}
      <div style={{ padding: '80px 24px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 40, opacity: 0.6 }}>
          {['VOGUE LUXE', 'FORBES ELITE', 'GQ WORLD', 'HARPER’S'].map(l => <span key={l} style={{ fontFamily: fontTitles, fontSize: 24, fontWeight: 900, letterSpacing: '0.1em' }}>{l}</span>)}
        </div>
      </div>

      {/* 4. INGENIERÍA / MATERIALES */}
      <div style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 80, alignItems: 'center', flexWrap: 'wrap-reverse' }}>
          <div style={{ flex: '1 1 500px', height: 500, background: C.bgImage }}>
            <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" alt="Celular prestige materiales" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <h3 style={{ fontFamily: fontTitles, fontSize: 48, fontWeight: 900, marginBottom: 32 }}>Oro de 18 Kilates y Zafiro.</h3>
            <p style={{ fontSize: 18, color: C.textSub, lineHeight: 2, marginBottom: 32 }}>El chasis es una sola pieza fresada en titanio grado aeroespacial, recubierta mediante deposición de vapor con una capa de oro de 18k. La pantalla está protegida por un cristal de zafiro sintético, material que solo puede ser rayado por un diamante.</p>
            <div style={{ fontWeight: 800, color: C.primary, textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer' }}>Conoce el Proceso →</div>
          </div>
        </div>
      </div>

      {/* 5. TUTORIAL VISUAL */}
      <div style={{ padding: '100px 24px', background: C.bgWhite }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 40, fontWeight: 900, textAlign: 'center', marginBottom: 64 }}>El Ritual de Apertura.</h3>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {[
              { t: 'I. Desvelado', d: 'Un estuche de piel de ternera cosido a mano te da la bienvenida.', i: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80' },
              { t: 'II. Activación', d: 'Configuración personalizada con un asistente dedicado vía satélite.', i: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80' },
              { t: 'III. Disfrute', d: 'Conéctate con el mundo desde un pedestal de jerarquía.', i: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&q=80' }
            ].map((s, i) => (
              <div key={i} style={{ flex: '1 1 300px' }}>
                <div style={{ height: 400, background: C.bgImage, marginBottom: 24 }}>
                   <img src={s.i} alt={s.t} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ fontFamily: fontTitles, fontSize: 24, fontWeight: 800, marginBottom: 12 }}>{s.t}</h4>
                <p style={{ fontSize: 16, color: C.textSub, lineHeight: 1.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. SOCIAL PROOF (MINI) */}
      <div style={{ padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 32, marginBottom: 32 }}>Un Círculo Selecto.</h3>
          <p style={{ fontSize: 18, color: C.textSub, marginBottom: 48 }}>"Poseer un Prestige no es solo tener un teléfono, es tener una declaración de intenciones. El servicio concierge es simplemente inigualable."</p>
          <div style={{ fontWeight: 800, color: C.primary }}>SIR RICHARD BRANSON JR.</div>
        </div>
      </div>

      {/* 7. MISIÓN DE MARCA */}
      <div style={{ padding: '120px 24px', background: C.textDark, color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 48, fontWeight: 900, marginBottom: 32 }}>Legado, No Solo Tecnología.</h3>
          <p style={{ fontSize: 20, lineHeight: 2, opacity: 0.8 }}>Nacimos en Ginebra con una misión: rescatar la artesanía del olvido en la era digital. Creamos objetos que pueden pasar de generación en generación, desafiando la obsolescencia programada con materiales imperecederos.</p>
        </div>
      </div>

      {/* 8. GARANTÍA */}
      <div style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          {[
            { t: 'Concierge 24/7', d: 'Asistencia global inmediata para cualquier necesidad.', i: <ShieldCheck strokeWidth={1}/> },
            { t: 'Recogida Privada', d: 'En caso de soporte, recogemos el equipo en su ubicación.', i: <Truck strokeWidth={1}/> },
            { t: 'Recompra Garantizada', d: 'Valor residual pactado para futuros modelos Prestige.', i: <RotateCcw strokeWidth={1}/> }
          ].map((g, i) => (
            <div key={i} style={{ flex: '1 1 300px', padding: 40, border: `1px solid ${C.border}`, textAlign: 'center' }}>
              <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center', color: C.primary }}>{g.i}</div>
              <h4 style={{ fontFamily: fontTitles, fontSize: 20, fontWeight: 800, marginBottom: 16 }}>{g.t}</h4>
              <p style={{ fontSize: 15, color: C.textSub, lineHeight: 1.6 }}>{g.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 9. ESPECIFICACIONES TÉCNICAS */}
      <div style={{ padding: '100px 24px', background: C.bgWhite }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 900, marginBottom: 48, textAlign: 'center' }}>La Ficha Maestra.</h3>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {[
              { t: 'Arquitectura Interna', c: 'Procesador neural de 3nm con 1TB de almacenamiento cerámico.' },
              { t: 'Visualización', c: 'Panel Retina Pure de 6.8" con contraste infinito y 3000 nits.' },
              { t: 'Cámara Cinematográfica', c: 'Sensor full-frame adaptado con lentes Leica integrados.' }
            ].map((s, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setActiveSpec(activeSpec === i ? null : i)} style={{ width: '100%', padding: '32px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: 16, fontWeight: 800, fontFamily: fontTitles }}>{s.t}</span>
                  {activeSpec === i ? <Minus size={20} /> : <Plus size={20} />}
                </button>
                {activeSpec === i && <div style={{ paddingBottom: 32, fontSize: 16, color: C.textSub, lineHeight: 1.8 }}>{s.c}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 10. FAQ */}
      <div style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 900, marginBottom: 48, textAlign: 'center' }}>Preguntas de la Corte.</h3>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {[
              { q: '¿Es el oro resistente?', a: 'Utilizamos una aleación de 18k endurecida mediante un proceso térmico patentado que septuplica su dureza habitual.' },
              { q: '¿Qué servicios incluye el Concierge?', a: 'Desde reservas en restaurantes con estrellas Michelin hasta gestión de vuelos privados, integrados en su dispositivo.' }
            ].map((f, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setActiveFAQ(activeFAQ === i ? null : i)} style={{ width: '100%', padding: '32px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: 16, fontWeight: 800, fontFamily: fontTitles }}>{f.q}</span>
                  {activeFAQ === i ? <Minus size={20} /> : <Plus size={20} />}
                </button>
                {activeFAQ === i && <div style={{ paddingBottom: 32, fontSize: 16, color: C.textSub, lineHeight: 1.8 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 11. CROSS-SELL */}
      <div style={{ padding: '100px 24px', background: C.bgWhite }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h4 style={{ fontFamily: fontTitles, fontSize: 24, fontWeight: 900, textAlign: 'center', marginBottom: 48 }}>Accesorios de Atelier</h4>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { n: 'Funda de Cocodrilo del Nilo', img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80' },
              { n: 'Gemelos Sincronizados Prestige', img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80' },
              { n: 'Cargador de Mármol Carrara', img: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80' }
            ].map((v, i) => (
              <div key={i} style={{ flex: '1 1 300px', background: '#fff', padding: 40, border: `1px solid ${C.border}`, textAlign: 'center' }}>
                 <div style={{ height: 200, marginBottom: 32, overflow: 'hidden' }}><img src={v.img} alt={v.n} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                 <h5 style={{ fontFamily: fontTitles, fontSize: 18, fontWeight: 800, marginBottom: 16 }}>{v.n}</h5>
                 <button style={{ padding: '12px 32px', border: `1px solid ${C.textDark}`, background: 'transparent', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', cursor: 'pointer' }}>ADQUIRIR</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 13. REVIEW WALL */}
      <div style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 40, fontWeight: 900, textAlign: 'center', marginBottom: 80 }}>Veredictos de Autoridad.</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
            {[
              { t: '“Prestige ha logrado lo imposible: convertir un smartphone en una joya que apetece heredar.”', author: 'L’OFFICIEL' },
              { t: '“El nivel de detalle en el pulido de las teclas de rubí es simplemente hipnótico.”', author: 'ROBB REPORT' },
              { t: '“No hay mejor dispositivo para el hombre de negocios global que valora su privacidad.”', author: 'WALL STREET JOUR.' }
            ].map((r, i) => (
              <div key={i} style={{ padding: 40, border: `1px solid ${C.border}`, background: C.bgWhite }}>
                <p style={{ fontSize: 18, color: C.textDark, lineHeight: 1.8, marginBottom: 24, fontStyle: 'italic' }}>{r.t}</p>
                <div style={{ fontWeight: 800, fontSize: 12, color: C.primary, letterSpacing: '0.2em' }}>— {r.author}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 14. FOOTER FUNCIONAL */}
      <footer style={{ padding: `120px 24px ${showSticky ? 120 : 60}px`, background: C.textDark, color: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 64 }}>
          <div style={{ flex: '1 1 300px' }}>
            <h4 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 900, marginBottom: 24 }}>PRESTIGE</h4>
            <p style={{ opacity: 0.6, fontSize: 14 }}>Fabricación artesanal de objetos digitales de alta autoridad desde 2026.</p>
          </div>
          <div style={{ display: 'flex', gap: 64 }}>
             <div><h5 style={{ fontWeight: 800, marginBottom: 24 }}>MENU</h5><div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, opacity: 0.8 }}><span>Atelier</span><span>Colecciones</span><span>Soporte</span></div></div>
             <div><h5 style={{ fontWeight: 800, marginBottom: 24 }}>LEGAL</h5><div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, opacity: 0.8 }}><span>Privacidad</span><span>Garantía</span><span>Términos</span></div></div>
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: '64px auto 0', paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontSize: 12, opacity: 0.4 }}>
           © 2026 PRESTIGE GLOBAL S.A. GINEBRA, SUIZA.
        </div>
      </footer>

      {/* 12. STICKY ATC */}
      {showSticky && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: `1px solid ${C.border}`, padding: '24px', zIndex: 100 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: fontTitles, fontSize: 20, fontWeight: 800 }}>{ai?.enhancedTitle || product.title}</div>
              <div style={{ color: C.primary, fontWeight: 700 }}>{fmtPrice(price)} USD</div>
            </div>
            <button style={{ padding: '16px 48px', background: C.textDark, color: '#fff', fontSize: 12, fontWeight: 800, border: 'none', cursor: 'pointer', letterSpacing: '0.1em' }}>RESERVAR</button>
          </div>
        </div>
      )}
    </div>
  );
}
