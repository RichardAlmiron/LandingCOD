'use client';
import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import {
  Menu, ShoppingBag, Star, Truck, RotateCcw, ShieldCheck,
  Plus, Minus, Cpu, BatteryFull, Shield, Zap, Heart,
  Package, Phone, Camera, Clock, Music, Info, MessageSquare, Mail
} from 'lucide-react';

interface PDPProps { data: StoreData; product: Product; variant?: number; }

const C = {
  bgMain: '#f4ecd8', bgWhite: '#fff9e6', bgImage: '#e8ddc1',
  textDark: '#4a3b32', textSub: '#7c6a58', primary: '#c44536',
  border: '#d6c7b0', star: '#fca311'
};

const fontTitles = '"Playfair Display", serif';
const fontSans = '"Lora", serif';
const REAL_IMG = 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=800&fit=crop';

export default function PdpCelularesVintage({ data, product }: PDPProps) {
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

  const paperShadow = '5px 5px 0px rgba(74,59,50,0.1)';

  return (
    <div style={{ background: C.bgMain, minHeight: '100vh', fontFamily: fontSans, color: C.textDark, backgroundImage: 'radial-gradient(#d6c7b0 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      
      {/* 15. BREADCRUMBS & NAV */}
      <nav style={{ padding: '24px', background: C.bgWhite, position: 'sticky', top: 0, zIndex: 100, borderBottom: `4px double ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Menu size={24} color={C.textDark} />
          <h1 style={{ fontFamily: fontTitles, fontSize: 28, fontWeight: 900, color: C.primary, textTransform: 'uppercase', letterSpacing: '4px', margin: 0 }}>{data.name || 'CLASSIQUE'}</h1>
          <ShoppingBag size={24} color={C.textDark} />
        </div>
      </nav>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 24px 0', fontSize: 13, color: C.textSub, fontStyle: 'italic' }}>
        Celulares {'>'} Vintage {'>'} <span style={{ color: C.textDark }}>{ai?.enhancedTitle || product.title}</span>
      </div>

      {/* 1. HERO SECTION */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px 80px', display: 'flex', gap: 64, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ background: C.bgWhite, padding: 32, border: `1px solid ${C.border}`, boxShadow: paperShadow, position: 'relative' }}>
             <div style={{ position: 'absolute', top: -20, left: 20, background: C.primary, color: '#fff', padding: '8px 20px', fontFamily: fontTitles, fontSize: 16, transform: 'rotate(-4deg)', fontWeight: 700, boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' }}>PIEZA UNICA</div>
             <img src={images[0]} alt="" style={{ width: '100%', height: 450, objectFit: 'contain', filter: 'sepia(0.4) contrast(1.1) brightness(0.95)' }} />
             <div style={{ fontFamily: fontTitles, textAlign: 'center', marginTop: 24, fontSize: 13, borderTop: `1px solid ${C.border}`, paddingTop: 16, color: C.textSub }}>— Fig. 21.04: Manufactura de Alta Autoridad —</div>
          </div>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '2px', color: C.textSub, marginBottom: 24, fontWeight: 700 }}>Est. 2026 / Edición de Prestigio</div>
          <h2 style={{ fontFamily: fontTitles, fontSize: 56, fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>{ai?.enhancedTitle || product.title}</h2>
          <p style={{ fontSize: 18, color: C.textSub, lineHeight: 1.8, marginBottom: 40, fontStyle: 'italic' }}>{ai?.enhancedDescription || product.description || 'Una oda a los días dorados del diseño analógico. Dial mecanizado en bronce, pantalla de tinta electrónica a color y acústica afinada meticulosamente.'}</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40, borderLeft: `2px solid ${C.primary}`, paddingLeft: 16 }}>
             <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(i => <Star key={i} size={18} fill={C.star} color={C.star} />)}</div>
             <span style={{ fontSize: 15, fontWeight: 700 }}>VERIFICACIÓN CLÁSICA</span>
          </div>

          <div style={{ fontFamily: fontTitles, fontSize: 48, color: C.primary, marginBottom: 48 }}>{fmtPrice(price)} <span style={{ fontSize: 16, color: C.textSub }}>OBLIG. FISCAL</span></div>
          
          <button style={{ width: '100%', padding: '24px', background: C.textDark, color: '#fff', fontFamily: fontTitles, fontSize: 20, fontWeight: 700, border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '4px', boxShadow: `5px 5px 0px ${C.primary}` }}>
            ADQUIRIR AHORA
          </button>
        </div>
      </div>

      {/* 2. BENEFICIOS RÁPIDOS */}
      <div style={{ padding: '80px 24px', background: C.bgWhite, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 32, textAlign: 'center', marginBottom: 64 }}>Maestría en cada Detalle</h3>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {[
              { i: <Phone />, t: 'Acústica de Bronce', d: 'Auricular forjado manualmente para una nitidez analógica superior.' },
              { i: <Clock />, t: 'Eterna Presencia', d: 'Autonomía de 14 días gracias a su procesador de baja frecuencia.' },
              { i: <Music />, t: 'Bulbos Digitales', d: 'Amplificación de audio mediante simulación térmica de válvulas.' }
            ].map((b, i) => (
              <div key={i} style={{ flex: '1 1 300px', textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, border: `1px solid ${C.textDark}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', color: C.primary }}>{b.i}</div>
                <h4 style={{ fontFamily: fontTitles, fontSize: 24, marginBottom: 16 }}>{b.t}</h4>
                <p style={{ color: C.textSub, fontSize: 16, lineHeight: 1.6 }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. AUTORIDAD / LOGOS */}
      <div style={{ padding: '64px 24px', textAlign: 'center', opacity: 0.7 }}>
         <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 40, fontFamily: fontTitles, fontSize: 22, fontWeight: 900, letterSpacing: '2px' }}>
            {['L’OFFICIÉL', 'ROBB REPORT', 'THE TIMES', 'VINTAGE MAG'].map(l => <span key={l}>{l}</span>)}
         </div>
      </div>

      {/* 4. INGENIERÍA / MATERIALES */}
      <div style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 80, alignItems: 'center', flexWrap: 'wrap-reverse' }}>
          <div style={{ flex: '1 1 450px', background: C.bgWhite, padding: 8, border: `1px solid ${C.border}`, boxShadow: paperShadow }}>
             <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" style={{ width: '100%', height: 400, objectFit: 'cover' }} alt="Ingeniería celular" />
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <h3 style={{ fontFamily: fontTitles, fontSize: 40, fontWeight: 900, marginBottom: 32 }}>Ebano y Latón Pulido.</h3>
            <p style={{ fontSize: 18, color: C.textSub, lineHeight: 2, marginBottom: 32 }}>Cada chasis es fresado individualmente en maderas nobles certificadas. El inserto de latón en la cámara frontal es pulido a mano para lograr un acabado espejo que recuerda a los instrumentos ópticos del siglo XIX.</p>
            <div style={{ fontFamily: fontTitles, color: C.primary, fontWeight: 700, cursor: 'pointer', borderBottom: `2px solid ${C.primary}`, display: 'inline-block' }}>EL ARCHIVO DE DISEÑO →</div>
          </div>
        </div>
      </div>

      {/* 5. TUTORIAL VISUAL (RECETA) */}
      <div style={{ padding: '100px 24px', background: C.bgWhite }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 32, textAlign: 'center', marginBottom: 64 }}>La Experiencia Clásica</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
            {[
              { t: 'DESEMBALAJE', d: 'Una caja de terciopelo y roble de 1920.', img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80' },
              { t: 'CALIBRACIÓN', d: 'Ajuste manual del dial de volumen analógico.', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80' },
              { t: 'CONEXIÓN', d: 'Sincronización mediante el protocolo Heritage.', img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80' }
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: 32, background: C.bgMain, border: `1px solid ${C.border}`, boxShadow: '3px 3px 0px rgba(0,0,0,0.05)' }}>
                 <img src={s.img} alt={s.t} style={{ width: '100%', height: 180, objectFit: 'cover', marginBottom: 24 }} />
                 <h4 style={{ fontFamily: fontTitles, fontSize: 20, marginBottom: 12 }}>{s.t}</h4>
                 <p style={{ color: C.textSub, fontSize: 15 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. SOCIAL PROOF (CARTA) */}
      <div style={{ padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', background: '#fff', padding: 64, border: `1px solid ${C.border}`, boxShadow: paperShadow, position: 'relative' }}>
          <p style={{ fontSize: 22, color: C.textDark, lineHeight: 1.8, marginBottom: 32, fontStyle: 'italic' }}>“He abandonado mi smartphone moderno por el Vintage. Es la primera vez en años que disfruto de una conversación telefónica sin distracciones visuales.”</p>
          <div style={{ fontFamily: fontTitles, fontSize: 18, color: C.primary }}>— Sir Arthur C. Bennet</div>
        </div>
      </div>

      {/* 7. MISIÓN DE MARCA */}
      <div style={{ padding: '120px 24px', background: C.textDark, color: '#fdfbf7', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 56, fontWeight: 900, marginBottom: 32 }}>ARTE QUE PERDURA.</h3>
          <p style={{ fontSize: 20, lineHeight: 2, opacity: 0.8 }}>No creamos dispositivos, creamos legados. En un mundo de plástico y obsolescencia,Classique fabrica piezas que tus nietos querrán restaurar. Tecnología con alma e historia.</p>
        </div>
      </div>

      {/* 8. GARANTÍA */}
      <div style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {[
            { t: 'RESTAURACIÓN VITALICIA', d: 'Mantenimiento preventivo anual incluido para tu pieza.', i: <ShieldCheck /> },
            { t: 'ENVÍO DE ÉPOCA', d: 'Transporte ultra-seguro en estuches rígidos de madera.', i: <Truck /> },
            { t: 'AUTENTICIDAD', d: 'Certificado firmado por el artesano jefe del taller.', i: <Info /> }
          ].map((g, i) => (
            <div key={i} style={{ flex: '1 1 300px', border: `1px solid ${C.border}`, padding: 40, background: C.bgWhite }}>
              <div style={{ color: C.primary, marginBottom: 24 }}>{g.i}</div>
              <h4 style={{ fontFamily: fontTitles, fontSize: 20, marginBottom: 12 }}>{g.t}</h4>
              <p style={{ color: C.textSub, fontSize: 15, lineHeight: 1.6 }}>{g.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 9. ESPECIFICACIONES TÉCNICAS */}
      <div style={{ padding: '100px 24px', background: C.bgWhite }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 900, marginBottom: 48, textAlign: 'center' }}>Manual de Usuario</h3>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {[
              { t: 'MECANISMOS INTERNOS', c: 'Procesador de bajo ruido electromagnético con 1TFLOP de potencia y 512GB de almacenamiento en estado sólido.' },
              { t: 'ÓPTICA DE PRECISIÓN', c: 'Cámara manual de 64MP con lente asférico de 35mm para capturas cinematográficas.' },
              { t: 'SISTEMA OPERATIVO', c: 'Heritage OS: Interfaz tipográfica inspirada en periódicos de 1900.' }
            ].map((s, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setActiveSpec(activeSpec === i ? null : i)} style={{ width: '100%', padding: '32px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: fontTitles }}>
                  <span style={{ fontSize: 20 }}>{s.t}</span>
                  {activeSpec === i ? <Minus /> : <Plus />}
                </button>
                {activeSpec === i && <div style={{ paddingBottom: 32, fontSize: 17, color: C.textSub, lineHeight: 1.8, fontStyle: 'italic' }}>{s.c}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 10. FAQ */}
      <div style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 900, marginBottom: 48, textAlign: 'center' }}>Consultas Frecuentes</h3>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {[
              { q: '¿Ofrece soporte para redes modernas?', a: 'Completamente. Incluye conectividad 5G global oculta bajo su chasis de madera de ébano para no comprometer la señal.' },
              { q: '¿Cómo se limpia la madera?', a: 'Recomendamos un paño de microfibra seco y el aceite de linaza incluido en el set de mantenimiento.' }
            ].map((f, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setActiveFAQ(activeFAQ === i ? null : i)} style={{ width: '100%', padding: '32px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', fontFamily: fontTitles }}>
                  <span style={{ fontSize: 18 }}>{f.q}</span>
                  {activeFAQ === i ? <Minus /> : <Plus />}
                </button>
                {activeFAQ === i && <div style={{ paddingBottom: 32, fontSize: 16, color: C.textSub, lineHeight: 1.8 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 11. CROSS-SELL */}
      <div style={{ padding: '100px 24px', background: C.bgWhite }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h4 style={{ fontFamily: fontTitles, fontSize: 24, textAlign: 'center', marginBottom: 48 }}>Accesorios de Taller</h4>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { n: 'Funda de Piel de Búfalo', img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80' },
              { n: 'Base de Carga en Mármol', img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80' },
              { n: 'Stylus de Plata Esterlina', img: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80' }
            ].map((v, i) => (
              <div key={i} style={{ flex: '1 1 300px', background: C.bgMain, padding: 40, border: `1px solid ${C.border}`, textAlign: 'center' }}>
                 <div style={{ height: 180, background: C.bgWhite, border: `1px solid ${C.border}`, marginBottom: 24, overflow: 'hidden' }}><img src={v.img} alt={v.n} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                 <h5 style={{ fontFamily: fontTitles, fontSize: 20, marginBottom: 16 }}>{v.n}</h5>
                 <button style={{ padding: '12px 32px', border: `2px solid ${C.textDark}`, background: 'transparent', fontFamily: fontTitles, fontWeight: 700, cursor: 'pointer' }}>ADQUIRIR</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 13. REVIEW WALL */}
      <div style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h3 style={{ fontFamily: fontTitles, fontSize: 40, fontWeight: 900, textAlign: 'center', marginBottom: 80 }}>Elogios de la Prensa.</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40 }}>
            {[
              { t: '“Classique ha redefinido el significado de tecnología premium. Es pura poesía tactile.”', author: 'LE MONDE LUXE' },
              { t: '“Un dispositivo que no se deprecia, sino que se revaloriza como una antigüedad.”', author: 'FINANCIAL TIMES' },
              { t: '“La pantalla es tan suave que olvidas que estás mirando un componente electrónico.”', author: 'G.Q. FRANCE' }
            ].map((r, i) => (
              <div key={i} style={{ padding: 48, background: C.bgWhite, border: `1px solid ${C.border}`, boxShadow: paperShadow }}>
                <p style={{ fontSize: 18, color: C.textDark, lineHeight: 1.8, marginBottom: 24, fontStyle: 'italic' }}>{r.t}</p>
                <div style={{ fontFamily: fontTitles, color: C.primary, fontWeight: 900, fontSize: 14 }}>— {r.author}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 14. FOOTER FUNCIONAL */}
      <footer style={{ padding: `100px 24px ${showSticky ? 140 : 80}px`, background: C.bgWhite, borderTop: `4px double ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 64 }}>
          <div>
            <h4 style={{ fontFamily: fontTitles, fontSize: 32, color: C.primary, fontWeight: 900, marginBottom: 16 }}>CLASSIQUE.</h4>
            <p style={{ color: C.textSub, fontSize: 16, fontStyle: 'italic' }}>Manufactura de Objetos de Alta Autoridad. <br /> Atelier en Ginebra, Suiza.</p>
          </div>
          <div style={{ display: 'flex', gap: 80 }}>
             <div><h5 style={{ fontFamily: fontTitles, fontSize: 18, marginBottom: 24 }}>ARCHIVO</h5><div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 16, color: C.textSub }}><span>Catálogo</span><span>Historia</span><span>Soporte</span></div></div>
             <div><h5 style={{ fontFamily: fontTitles, fontSize: 18, marginBottom: 24 }}>SOCIAL</h5><div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 16, color: C.textSub }}><span>Gazzette</span><span>Club Elite</span><span>Contacto</span></div></div>
          </div>
        </div>
      </footer>

      {/* 12. STICKY ATC */}
      {showSticky && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: C.bgWhite, borderTop: `2px solid ${C.textDark}`, padding: '24px', zIndex: 100 }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: fontTitles, fontSize: 24, fontWeight: 900 }}>{ai?.enhancedTitle || product.title}</div>
              <div style={{ color: C.primary, fontWeight: 700, fontFamily: fontTitles }}>{fmtPrice(price)} USD</div>
            </div>
            <button style={{ padding: '16px 48px', background: C.textDark, color: '#fff', fontFamily: fontTitles, fontSize: 18, fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: `4px 4px 0px ${C.primary}` }}>RESERVAR</button>
          </div>
        </div>
      )}
    </div>
  );
}
