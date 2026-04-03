'use client';
import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import {
  Menu, ShoppingBag, Star, Truck, RotateCcw, ShieldCheck,
  Plus, Minus, Cpu, BatteryFull, Shield, Zap, Heart,
  Package, Leaf, Feather, Sun, HelpCircle, MessageSquare, Info
} from 'lucide-react';

interface PDPProps { data: StoreData; product: Product; variant?: number; }

const C = {
  bgMain: '#fdfbf7', bgWhite: '#ffffff', bgImage: '#f4f1ea',
  textDark: '#2c2b29', textSub: '#797670', primary: '#8ea89a',
  border: '#e9e6df', star: '#e6c78e'
};

const fontTitles = '"Inter", sans-serif';
const fontSans = '"Inter", sans-serif';
const REAL_IMG = 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=800&fit=crop';

export default function PdpCelularesNordic({ data, product }: PDPProps) {
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
    <div style={{ background: C.bgMain, minHeight: '100vh', fontFamily: fontSans, color: C.textDark, fontWeight: 400 }}>
      
      {/* 15. BREADCRUMBS & NAV */}
      <nav style={{ padding: '24px', background: C.bgWhite, position: 'sticky', top: 0, zIndex: 100, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Menu size={20} color={C.textDark} strokeWidth={1.5} />
          <span style={{ fontFamily: fontTitles, fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>{data.name || 'KALO'}</span>
          <ShoppingBag size={20} strokeWidth={1.5} />
        </div>
      </nav>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 0', fontSize: 13, color: C.textSub }}>
        Celulares {'>'} Nordic {'>'} <span style={{ color: C.textDark }}>{ai?.enhancedTitle || product.title}</span>
      </div>

      {/* 1. HERO SECTION */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 80px', display: 'flex', gap: 80, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ background: C.bgImage, height: 600, borderRadius: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, border: `1px solid ${C.border}` }}>
            <img src={images[0]} alt="" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.05))' }} />
          </div>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.15em', color: C.primary, marginBottom: 24, fontWeight: 700 }}>Materiales Circulares</div>
          <h2 style={{ fontFamily: fontTitles, fontSize: 56, fontWeight: 700, lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.03em' }}>{ai?.enhancedTitle || product.title}</h2>
          <p style={{ fontSize: 18, color: C.textSub, lineHeight: 1.8, marginBottom: 40 }}>{ai?.enhancedDescription || product.description || 'Una pausa en el ruido digital. Chasis de polímero oceánico, diseño sobrio y tecnología que te devuelve el tiempo libre.'}</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
            <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(i => <Star key={i} size={18} fill={C.star} color={C.star} />)}</div>
            <span style={{ fontSize: 15, color: C.textSub }}>4.9/5 Diseño Consciente</span>
          </div>

          <div style={{ fontSize: 40, fontWeight: 700, marginBottom: 48 }}>{fmtPrice(price)}</div>
          
          <button style={{ padding: '24px 64px', background: C.textDark, color: '#fff', fontSize: 16, fontWeight: 700, border: 'none', borderRadius: 99, cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            Elegir Kalo
          </button>
        </div>
      </div>

      {/* 2. BENEFICIOS RÁPIDOS */}
      <div style={{ padding: '100px 24px', background: C.bgWhite }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 36, fontWeight: 700, textAlign: 'center', marginBottom: 80, letterSpacing: '-0.02em' }}>Menos ruido. Más esencia.</h3>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {[
              { i: <Leaf />, t: 'Polímero Marino', d: 'Chasis fabricado con redes de pesca recuperadas del Mar del Norte.' },
              { i: <Feather />, t: 'Minimalismo Radical', d: 'Interfaz simplificada para reducir la fatiga de dopamina diaria.' },
              { i: <Sun />, t: 'Panel E-Ink Pro', d: 'Pantalla de bajo consumo que se siente como papel al tacto.' }
            ].map((b, i) => (
              <div key={i} style={{ flex: '1 1 300px', textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, background: C.bgImage, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', margin: '0 auto 32px', color: C.primary }}>{React.cloneElement(b.i as any, { strokeWidth: 1.5 })}</div>
                <h4 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>{b.t}</h4>
                <p style={{ color: C.textSub, fontSize: 16, lineHeight: 1.6 }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. AUTORIDAD / LOGOS */}
      <div style={{ padding: '80px 24px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 48, opacity: 0.5 }}>
          {['KINFORK', 'WALLPAPER*', 'MONOCLE', 'DEZEEN'].map(l => <span key={l} style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.04em' }}>{l}</span>)}
        </div>
      </div>

      {/* 4. INGENIERÍA / MATERIALES */}
      <div style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 80, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 450px' }}>
            <h3 style={{ fontSize: 40, fontWeight: 700, marginBottom: 32, letterSpacing: '-0.02em' }}>La calidez de lo orgánico.</h3>
            <p style={{ fontSize: 18, color: C.textSub, lineHeight: 1.8, marginBottom: 32 }}>El tacto mate de la madera de abedul tratada con aceites naturales es cálido y humano. A diferencia del metal frío, Kalo adquiere una pátina única con el tiempo, contando la historia de su uso.</p>
            <div style={{ color: C.primary, fontWeight: 700, cursor: 'pointer' }}>Sostenibilidad Total →</div>
          </div>
          <div style={{ flex: '1 1 450px', height: 450, background: C.bgImage, borderRadius: 32 }}>
             <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" alt="Celular nordic detalle" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 32 }} />
          </div>
        </div>
      </div>

      {/* 5. TUTORIAL VISUAL */}
      <div style={{ padding: '100px 24px', background: C.bgWhite }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h3 style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 64 }}>Uso consciente</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
            {[
              { t: 'Botón Zen', d: 'Desliza el interruptor físico para bloquear distracciones inmediatamente.', i: <Zap /> },
              { t: 'Interfaz Suave', d: 'Iconografía en escala de grises para evitar la sobreestimulación visual.', i: <Feather /> },
              { t: 'Carga Solar', d: 'Expón el reverso a la luz ambiental para extender la batería.', i: <Sun /> }
            ].map((s, i) => (
              <div key={i} style={{ background: C.bgMain, padding: 48, borderRadius: 32, border: `1px solid ${C.border}` }}>
                 <div style={{ color: C.primary, marginBottom: 24 }}>{React.cloneElement(s.i as any, { strokeWidth: 1.2, size: 32 })}</div>
                 <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{s.t}</h4>
                 <p style={{ color: C.textSub, lineHeight: 1.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. SOCIAL PROOF (MINI) */}
      <div style={{ padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontSize: 32, fontWeight: 600, marginBottom: 32, fontStyle: 'italic' }}>"Kalo no es un teléfono, es un compromiso con mi propia salud mental. El diseño es simplemente sublime."</h3>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.primary }}>ARIANA N., DISEÑADORA DE INTERIORES</div>
        </div>
      </div>

      {/* 7. MISIÓN DE MARCA */}
      <div style={{ padding: '120px 24px', background: C.primary, color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontSize: 56, fontWeight: 700, marginBottom: 32, letterSpacing: '-0.04em' }}>RECONECTA CON LO REAL.</h3>
          <p style={{ fontSize: 22, lineHeight: 1.8, opacity: 0.9 }}>Nacimos en Copenhague con una idea simple: la tecnología debería servirnos, no consumirnos. Kalo es nuestra respuesta al caos digital, un objeto de paz en un mundo ruidoso.</p>
        </div>
      </div>

      {/* 8. GARANTÍA */}
      <div style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          {[
            { t: 'Derecho a Reparar', d: 'Kalo es modular. Cambia la batería o pantalla tú mismo en minutos.', i: <HelpCircle /> },
            { t: 'Garantía 5 Años', d: 'Creemos en la durabilidad. Estamos contigo a largo plazo.', i: <ShieldCheck /> },
            { t: 'Envío Carbono Neutro', d: 'Toda nuestra logística está compensada ambientalmente.', i: <Truck /> }
          ].map((g, i) => (
            <div key={i} style={{ flex: '1 1 300px', padding: 48, background: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: 24 }}>
              <div style={{ color: C.primary, marginBottom: 24 }}>{g.i}</div>
              <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{g.t}</h4>
              <p style={{ color: C.textSub, lineHeight: 1.6, fontSize: 15 }}>{g.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 9. ESPECIFICACIONES TÉCNICAS */}
      <div style={{ padding: '100px 24px', background: C.bgWhite }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontSize: 32, fontWeight: 700, marginBottom: 48, textAlign: 'center' }}>Especificaciones</h3>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {[
              { t: 'Hardware Consciente', c: 'Procesador optimizado para bajo consumo y 256GB de memoria flash reciclada.' },
              { t: 'Óptica Zen', c: 'Sensor de 48MP con lente de cristal natural. Fotos sin postprocesado agresivo.' },
              { t: 'Energía Solar', c: 'Batería de estado sólido de 4500mAh con panel de absorción ambiental.' }
            ].map((s, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setActiveSpec(activeSpec === i ? null : i)} style={{ width: '100%', padding: '32px 0', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: 18, fontWeight: 600 }}>{s.t}</span>
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
          <h3 style={{ fontSize: 32, fontWeight: 700, marginBottom: 48, textAlign: 'center' }}>Preguntas Comunes</h3>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {[
              { q: '¿Qué aplicaciones puedo instalar?', a: 'Kalo soporta todas las apps esenciales mediante su SO basado en Android Limpio, pero fomenta el uso de herramientas de productividad y bienestar.' },
              { q: '¿Es realmente resistente al agua?', a: 'Certificación IP68 completa. Su chasis de polímero oceánico es naturalmente hidrófugo y altamente resistente.' }
            ].map((f, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setActiveFAQ(activeFAQ === i ? null : i)} style={{ width: '100%', padding: '32px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontSize: 18, fontWeight: 600 }}>{f.q}</span>
                  {activeFAQ === i ? <Minus /> : <Plus />}
                </button>
                {activeFAQ === i && <div style={{ paddingBottom: 32, color: C.textSub, lineHeight: 1.8 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 11. CROSS-SELL */}
      <div style={{ background: C.bgImage, padding: '100px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h4 style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>Accesorios en equilibrio</h4>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { n: 'Funda de Corcho Natural', img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80' },
              { n: 'Cargador de Madera de Fresno', img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80' },
              { n: 'Correa de Lino Orgánico', img: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80' }
            ].map((v, i) => (
              <div key={i} style={{ flex: '1 1 300px', background: '#fff', padding: 40, borderRadius: 24, textAlign: 'center', border: `1px solid ${C.border}` }}>
                 <div style={{ height: 200, borderRadius: 16, marginBottom: 32, overflow: 'hidden' }}><img src={v.img} alt={v.n} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                 <h5 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{v.n}</h5>
                 <button style={{ padding: '12px 32px', border: `1px solid ${C.primary}`, color: C.primary, background: 'transparent', borderRadius: 99, fontWeight: 700, cursor: 'pointer' }}>VER MÁS</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 13. REVIEW WALL */}
      <div style={{ padding: '120px 24px', background: C.bgWhite }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h3 style={{ fontSize: 48, fontWeight: 700, textAlign: 'center', marginBottom: 80, letterSpacing: '-0.04em' }}>Opiniones Honestas.</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
            {[
              { t: '“El primer dispositivo que no me exige atención constante. Es hermoso y funcional.”', author: 'MONOCLE MAGAZINE' },
              { t: '“La pantalla E-Ink Pro es un cambio de juego para los que leemos mucho en el móvil.”', author: 'SOFÍA G., ESCRITORA' },
              { t: '“Ética y estética unidas en un objeto que da gusto sostener.”', author: 'DESIGN MILK' }
            ].map((r, i) => (
              <div key={i} style={{ padding: 48, border: `1px solid ${C.border}`, borderRadius: 32 }}>
                <p style={{ fontSize: 18, color: C.textDark, lineHeight: 1.6, marginBottom: 24 }}>{r.t}</p>
                <div style={{ fontWeight: 800, fontSize: 12, color: C.primary, textTransform: 'uppercase', letterSpacing: '0.1em' }}>— {r.author}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 14. FOOTER FUNCIONAL */}
      <footer style={{ padding: `100px 24px ${showSticky ? 120 : 60}px`, background: C.bgWhite, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 64 }}>
          <div>
            <h4 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24, letterSpacing: '-0.04em' }}>KALO.</h4>
            <p style={{ color: C.textSub, fontSize: 15 }}>Diseño Escandinavo Consciente. <br /> Copenhague, Dinamarca.</p>
          </div>
          <div style={{ display: 'flex', gap: 80 }}>
             <div><h5 style={{ fontWeight: 700, marginBottom: 24 }}>PRODUCTO</h5><div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, color: C.textSub }}><span>Materiales</span><span>Filosofía</span><span>Soporte</span></div></div>
             <div><h5 style={{ fontWeight: 700, marginBottom: 24 }}>CONECTA</h5><div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, color: C.textSub }}><span>Instagram</span><span>Diario Zen</span><span>Contacto</span></div></div>
          </div>
        </div>
      </footer>

      {/* 12. STICKY ATC */}
      {showSticky && (
        <div style={{ position: 'fixed', bottom: 24, left: 24, right: 24, zIndex: 100 }}>
          <div style={{ maxWidth: 600, margin: '0 auto', background: C.bgWhite, border: `1px solid ${C.border}`, padding: '16px 32px', borderRadius: 99, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{ai?.enhancedTitle || product.title}</div>
              <div style={{ color: C.primary, fontWeight: 600 }}>{fmtPrice(price)}</div>
            </div>
            <button style={{ padding: '12px 32px', background: C.textDark, color: '#fff', fontSize: 14, fontWeight: 700, borderRadius: 99, border: 'none', cursor: 'pointer' }}>ELEGIR</button>
          </div>
        </div>
      )}
    </div>
  );
}
