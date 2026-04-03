'use client';
import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import {
  Menu, ShoppingBag, Star, Truck, RotateCcw, ShieldCheck,
  Plus, Minus, Cpu, BatteryFull, Shield, Zap, Heart,
  Package, Music, Camera, Zap as ZapIcon, Info, MessageSquare, Flame, Sparkles
} from 'lucide-react';

interface PDPProps { data: StoreData; product: Product; variant?: number; }

const C = {
  bgMain: '#ffffff', bgWhite: '#f8f8f8', bgImage: '#eeeeee',
  textDark: '#000000', textSub: '#666666', primary: '#ff0055',
  border: '#dddddd', star: '#000000'
};

const fontTitles = '"Unbounded", sans-serif';
const fontSans = '"Inter", sans-serif';
const REAL_IMG = 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=800&fit=crop';

export default function PdpCelularesStreetwear({ data, product }: PDPProps) {
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

  const hypeClip = { clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)' };

  return (
    <div style={{ background: C.bgMain, minHeight: '100vh', fontFamily: fontSans, color: C.textDark, overflowX: 'hidden' }}>
      
      {/* 15. BREADCRUMBS & NAV */}
      <nav style={{ padding: '20px 24px', position: 'sticky', top: 0, zIndex: 100, background: '#fff', borderBottom: `4px solid ${C.textDark}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Menu size={28} strokeWidth={3} />
          <h1 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 900, letterSpacing: '-2px', textTransform: 'uppercase' }}>{data.name || 'HYPE'}</h1>
          <ShoppingBag size={28} strokeWidth={3} />
        </div>
      </nav>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 0', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>
        Celulares {'>'} Streetwear {'>'} <span style={{ color: C.primary }}>{ai?.enhancedTitle || product.title}</span>
      </div>

      {/* 1. HERO SECTION */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 80px', display: 'flex', gap: 64, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ background: C.primary, height: 600, ...hypeClip, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
             <div style={{ position: 'absolute', top: 40, left: -20, background: '#000', color: '#fff', padding: '12px 32px', fontFamily: fontTitles, transform: 'rotate(-5deg)', fontSize: 24 }}>SOLD OUT SOON</div>
             <img src={images[0]} alt="" style={{ maxWidth: '85%', maxHeight: '85%', objectFit: 'contain', filter: 'brightness(1.1) drop-shadow(20px 20px 0px rgba(0,0,0,0.2))' }} />
          </div>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ display: 'inline-block', background: '#000', color: '#fff', padding: '8px 16px', fontFamily: fontTitles, fontSize: 12, marginBottom: 24, fontWeight: 900 }}>LIMITED DROP // 1 OF 500</div>
          <h2 style={{ fontFamily: fontTitles, fontSize: 64, fontWeight: 900, lineHeight: 0.9, marginBottom: 24, textTransform: 'uppercase', letterSpacing: '-4px' }}>{ai?.enhancedTitle || product.title}</h2>
          <p style={{ fontSize: 18, color: C.textSub, lineHeight: 1.4, marginBottom: 40, fontWeight: 700 }}>{ai?.enhancedDescription || product.description || 'El dispositivo que define la cultura. Diseño brutalista, acabados en neón y la cámara más rápida del juego.'}</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 4 }}>{[1,2,3,4,5].map(i => <Star key={i} size={20} fill="#000" color="#000" />)}</div>
            <span style={{ fontSize: 14, fontWeight: 900 }}>HYPE_METER: MAX</span>
          </div>

          <div style={{ fontFamily: fontTitles, fontSize: 56, fontWeight: 900, marginBottom: 48, letterSpacing: '-4px' }}>{fmtPrice(price)}</div>
          
          <button style={{ width: '100%', padding: '24px', background: '#000', color: '#fff', fontFamily: fontTitles, fontSize: 24, fontWeight: 900, border: 'none', cursor: 'pointer', ...hypeClip }}>
            COPEAR AHORA
          </button>
        </div>
      </div>

      {/* 2. BENEFICIOS RÁPIDOS */}
      <div style={{ padding: '100px 24px', background: '#000', color: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 40, fontWeight: 900, textAlign: 'center', marginBottom: 80, textTransform: 'uppercase' }}>Built for the Street</h3>
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            {[
              { i: <Camera />, t: 'Insta-Lens', d: 'Cámara optimizada para contenido vertical con enfoque ultra-rápido.' },
              { i: <Music />, t: 'Bass-Boost', d: 'Altavoces duales con salida de 10W para tu música en cualquier lugar.' },
              { i: <Flame />, t: 'Heat-Sync', d: 'No se calienta ni grabando en 8K durante horas.' }
            ].map((b, i) => (
              <div key={i} style={{ flex: '1 1 300px', textAlign: 'center', border: '2px solid #333', padding: 48, position: 'relative' }}>
                <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', background: C.primary, padding: '12px', borderRadius: '50%' }}>{React.cloneElement(b.i as any, { size: 24 })}</div>
                <h4 style={{ fontFamily: fontTitles, fontSize: 24, fontWeight: 900, marginBottom: 16, textTransform: 'uppercase' }}>{b.t}</h4>
                <p style={{ opacity: 0.6, fontSize: 16, lineHeight: 1.6 }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. AUTORIDAD / LOGOS */}
      <div style={{ padding: '64px 24px', background: C.primary, overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 80, whiteSpace: 'nowrap', fontFamily: fontTitles, fontSize: 32, fontWeight: 900, color: '#000', opacity: 0.8 }}>
          {['HYPBEAST', 'HIGHSNOBIETY', 'COMPLEX', 'VOGUE_RUNWAY', 'HYPEBEAST'].map((l, i) => <span key={i}>{l}</span>)}
        </div>
      </div>

      {/* 4. INGENIERÍA / MATERIALES */}
      <div style={{ padding: '120px 24px', background: C.bgMain }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 80, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 500px' }}>
            <h3 style={{ fontFamily: fontTitles, fontSize: 48, fontWeight: 900, marginBottom: 32, textTransform: 'uppercase', lineHeight: 0.9 }}>Chasis de Carbono y Neón.</h3>
            <p style={{ fontSize: 20, color: C.textSub, lineHeight: 1.4, marginBottom: 40, fontWeight: 700 }}>Hemos mezclado fibra de carbono real con pigmentos reactivos a la luz UV. El teléfono cambia de tono según el clima de la calle. Es un objeto vivo.</p>
            <div style={{ fontFamily: fontTitles, fontSize: 18, color: C.primary, textDecoration: 'underline', cursor: 'pointer' }}>LOOK_BOOK_26.PDF</div>
          </div>
          <div style={{ flex: '1 1 400px', height: 400, background: '#000', overflow: 'hidden' }}>
             <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" alt="Ingeniería celular" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
          </div>
        </div>
      </div>

      {/* 5. TUTORIAL VISUAL (UNBOXING) */}
      <div style={{ padding: '100px 24px', background: C.bgWhite }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 40, fontWeight: 900, textAlign: 'center', marginBottom: 64 }}>The Unboxing Experience</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {[
              { t: 'PULL', d: 'Caja de acrílico transparente con cierre magnético.', img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80' },
              { t: 'CONNECT', d: 'Cable de nylon trenzado en color neón.', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80' },
              { t: 'FLEX', d: 'Funda de silicona líquida transparente incluida.', img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80' }
            ].map((s, i) => (
              <div key={i} style={{ background: '#000', color: '#fff', padding: 40, ...hypeClip }}>
                 <img src={s.img} alt={s.t} style={{ width: '100%', height: 180, objectFit: 'cover', marginBottom: 24 }} />
                 <h4 style={{ fontFamily: fontTitles, fontSize: 24, fontWeight: 900, marginBottom: 12 }}>{s.t}</h4>
                 <p style={{ opacity: 0.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. SOCIAL PROOF (STREET) */}
      <div style={{ padding: '120px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 48, marginBottom: 32, lineHeight: 0.9 }}>"El único accesorio que importa este año."</h3>
          <p style={{ fontSize: 24, fontWeight: 900, color: C.primary }}>— TRAVIS S., CREATIVE DIR.</p>
        </div>
      </div>

      {/* 7. MISIÓN DE MARCA */}
      <div style={{ padding: '120px 24px', background: C.textDark, color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 56, fontWeight: 900, marginBottom: 32, letterSpacing: '-4px' }}>WE ARE THE CULTURE.</h3>
          <p style={{ fontSize: 22, lineHeight: 1.4, opacity: 0.8, fontWeight: 700 }}>HYPE no es solo una marca de electrónica, es una plataforma de expresión. Diseñamos para los que están en la fila, los que madrugan por un drop y los que nunca se conforman con lo básico.</p>
        </div>
      </div>

      {/* 8. GARANTÍA */}
      <div style={{ padding: '100px 24px', background: C.bgWhite }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {[
            { t: 'HYPE_CARE', d: 'Seguro completo contra robos y daños accidentales.', i: <ShieldCheck /> },
            { t: 'FAST_DROP', d: 'Envío prioritario en menos de 12 horas en zonas urbanas.', i: <Truck /> },
            { t: 'LEGIT_CHECK', d: 'Chip NFC de autenticidad para evitar réplicas.', i: <Shield /> }
          ].map((g, i) => (
            <div key={i} style={{ flex: '1 1 300px', border: '4px solid #000', padding: 40, background: '#fff' }}>
              <div style={{ color: C.primary, marginBottom: 24 }}>{g.i}</div>
              <h4 style={{ fontFamily: fontTitles, fontSize: 20, fontWeight: 900, marginBottom: 12 }}>{g.t}</h4>
              <p style={{ color: C.textSub, fontWeight: 700 }}>{g.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 9. ESPECIFICACIONES TÉCNICAS */}
      <div style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 900, marginBottom: 48, textAlign: 'center' }}>THE_SPECS</h3>
          <div style={{ borderTop: '4px solid #000' }}>
            {[
              { t: 'ENGINE', c: 'Procesador A1-Hyper para renderizado de video en tiempo real.' },
              { t: 'VISION', c: 'Display Super Amoled de 144Hz con recubrimiento anti-huellas.' },
              { t: 'POWER', c: 'Batería de 5000mAh con carga ultra-rápida de 120W.' }
            ].map((s, i) => (
              <div key={i} style={{ borderBottom: '2px solid #eee' }}>
                <button onClick={() => setActiveSpec(activeSpec === i ? null : i)} style={{ width: '100%', padding: '32px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: fontTitles }}>
                  <span style={{ fontSize: 18, fontWeight: 900 }}>{s.t}</span>
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
          <h3 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 900, marginBottom: 48, textAlign: 'center' }}>HELP_CENTER</h3>
          <div style={{ borderTop: '4px solid #000' }}>
            {[
              { q: '¿Es resistente al agua?', a: 'Sí, certificación IP68. Puedes mojarlo en la piscina sin problemas.' },
              { q: '¿Cuándo es el próximo drop?', a: 'Suscríbete a nuestra gazzette para recibir coordenadas exclusivas.' }
            ].map((f, i) => (
              <div key={i} style={{ borderBottom: '2px solid #eee' }}>
                <button onClick={() => setActiveFAQ(activeFAQ === i ? null : i)} style={{ width: '100%', padding: '32px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', fontFamily: fontTitles }}>
                  <span style={{ fontSize: 16, fontWeight: 900 }}>{f.q}</span>
                  {activeFAQ === i ? <Minus /> : <Plus />}
                </button>
                {activeFAQ === i && <div style={{ paddingBottom: 32, color: C.textSub, fontSize: 14 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 11. CROSS-SELL */}
      <div style={{ background: C.bgWhite, padding: '100px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h4 style={{ fontFamily: fontTitles, fontSize: 24, fontWeight: 900, textAlign: 'center', marginBottom: 48 }}>Finish the Look</h4>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { n: 'Hype-Case Pro V2', img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80' },
              { n: 'Lanyard Tactical Neón', img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80' },
              { n: 'Powerbank Mini-Cube', img: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80' }
            ].map((v, i) => (
              <div key={i} style={{ flex: '1 1 300px', background: '#fff', padding: 40, border: '2px solid #000', textAlign: 'center' }}>
                 <div style={{ height: 200, background: C.bgImage, marginBottom: 24, overflow: 'hidden' }}><img src={v.img} alt={v.n} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                 <h5 style={{ fontFamily: fontTitles, fontSize: 16, fontWeight: 900, marginBottom: 24 }}>{v.n}</h5>
                 <button style={{ padding: '12px 32px', background: '#000', color: '#fff', fontFamily: fontTitles, fontSize: 14, fontWeight: 900, border: 'none', cursor: 'pointer' }}>ADD_TO_CART</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 13. REVIEW WALL */}
      <div style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 48, fontWeight: 900, textAlign: 'center', marginBottom: 80, letterSpacing: '-4px' }}>STREET_TALK</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40 }}>
            {[
              { t: '“El diseño es otro nivel. Todos me preguntan qué teléfono es.”', author: 'LEO_STREET' },
              { t: '“La cámara para video es lo mejor que he probado para mis reels.”', author: 'SARA_CRTR' },
              { t: '“Pesa poco pero se siente indestructible. Puro hype.”', author: 'M_VIBES' }
            ].map((r, i) => (
              <div key={i} style={{ padding: 40, background: '#000', color: '#fff', ...hypeClip }}>
                <p style={{ fontSize: 20, lineHeight: 1.4, marginBottom: 24, fontWeight: 900 }}>{r.t}</p>
                <div style={{ fontFamily: fontTitles, color: C.primary, fontSize: 14 }}>— {r.author}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 14. FOOTER FUNCIONAL */}
      <footer style={{ padding: `100px 24px ${showSticky ? 120 : 60}px`, background: '#000', color: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 64 }}>
          <div>
            <h4 style={{ fontFamily: fontTitles, fontSize: 40, fontWeight: 900, marginBottom: 16, letterSpacing: '-4px' }}>HYPE.</h4>
            <p style={{ color: '#666', fontSize: 14 }}>The Culture of Electronics. <br /> NYC / TOKYO / BERLIN.</p>
          </div>
          <div style={{ display: 'flex', gap: 80 }}>
             <div><h5 style={{ fontFamily: fontTitles, fontSize: 16, marginBottom: 24 }}>DROPS</h5><div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, color: '#666' }}><span>Archive</span><span>Active</span><span>Support</span></div></div>
             <div><h5 style={{ fontFamily: fontTitles, fontSize: 16, marginBottom: 24 }}>LEGAL</h5><div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, color: '#666' }}><span>Terms</span><span>Privacy</span><span>Returns</span></div></div>
          </div>
        </div>
      </footer>

      {/* 12. STICKY ATC */}
      {showSticky && (
        <div style={{ position: 'fixed', bottom: 20, left: 20, right: 20, zIndex: 100 }}>
          <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', border: '4px solid #000', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '10px 10px 0px #000' }}>
            <div>
              <div style={{ fontFamily: fontTitles, fontSize: 20, fontWeight: 900 }}>{ai?.enhancedTitle || product.title}</div>
              <div style={{ color: C.primary, fontWeight: 900 }}>{fmtPrice(price)} DROP_ACTIVE</div>
            </div>
            <button style={{ padding: '16px 40px', background: '#000', color: '#fff', fontFamily: fontTitles, fontSize: 16, fontWeight: 900, border: 'none', cursor: 'pointer' }}>COPEAR</button>
          </div>
        </div>
      )}
    </div>
  );
}
