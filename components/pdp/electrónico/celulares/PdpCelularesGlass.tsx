'use client';
import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import {
  Menu, Search, ShoppingCart, User, Star, Truck, RotateCcw,
  ShieldCheck, Plus, Minus, Check, Cpu, BatteryFull, Shield,
  Wifi, ScanFace, Zap, Heart, Package, PlayCircle, Eye, Cloud
} from 'lucide-react';

interface PDPProps { data: StoreData; product: Product; variant?: number; }

const C = {
  bgMain: '#eef2f5', bgWhite: 'rgba(255,255,255,0.7)', bgImage: 'rgba(255,255,255,0.4)',
  textDark: '#1a2a40', textSub: '#5b6d8a', primary: '#00b4d8',
  border: 'rgba(255,255,255,0.5)', star: '#00b4d8', gradient: 'linear-gradient(135deg, #00b4d8, #0077b6)'
};

const fontTitles = 'Poppins, sans-serif';
const fontSans = 'Inter, sans-serif';
const REAL_IMG = 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=800&fit=crop';
const glassStyle = {
  background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)',
  borderRadius: 24, boxShadow: '0 8px 32px rgba(31,38,135,0.07)'
};

export default function PdpCelularesGlass({ data, product }: PDPProps) {
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
    <div style={{ background: C.bgMain, minHeight: '100vh', fontFamily: fontSans, color: C.textDark, WebkitFontSmoothing: 'antialiased', position: 'relative', overflowX: 'hidden' }}>
      
      {/* BACKGROUND DECOR */}
      <div style={{ position: 'fixed', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: '#90e0ef', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.6, zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-10%', right: '-10%', width: '50vw', height: '50vw', background: '#caf0f8', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.8, zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        
        {/* 15. BREADCRUMBS & NAV */}
        <nav style={{ padding: '16px 24px', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ ...glassStyle, maxWidth: 1000, margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 99 }}>
            <Menu size={24} color={C.textDark} />
            <span style={{ fontFamily: fontTitles, fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>{data.name || 'E T H E R'}</span>
            <div style={{ display: 'flex', gap: 16 }}><ShoppingCart size={20} /></div>
          </div>
        </nav>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 24px 16px', fontSize: 13, color: C.textSub, fontWeight: 600 }}>
          <span style={{ background: 'rgba(255,255,255,0.4)', padding: '6px 16px', borderRadius: 99, backdropFilter: 'blur(10px)' }}>Crystal Series {'>'} Celulares {'>'} <span style={{ color: C.primary }}>{ai?.enhancedTitle || product.title}</span></span>
        </div>

        {/* 1. HERO SECTION */}
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 48px', display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ ...glassStyle, padding: 40, height: 450, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={images[0]} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.1))' }} />
            </div>
          </div>
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.4)', color: C.primary, padding: '8px 16px', borderRadius: 99, fontSize: 12, fontWeight: 700, marginBottom: 16, border: '1px solid rgba(255,255,255,0.6)' }}>Diseño Translúcido</div>
            <h1 style={{ fontFamily: fontTitles, fontSize: 56, fontWeight: 800, lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.03em' }}>{ai?.enhancedTitle || product.title}</h1>
            <p style={{ fontSize: 16, color: C.textSub, lineHeight: 1.6, marginBottom: 24 }}>{ai?.enhancedDescription || product.description || 'Redefiniendo la estética móvil. Interfaz etérea, materiales cristalinos y un rendimiento que desafía la lógica visual.'}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(i => <Star key={i} size={16} fill={C.star} color={C.star} />)}</div>
              <span style={{ fontSize: 15, fontWeight: 700 }}>4.9/5</span><span style={{ fontSize: 14, color: C.textSub }}>Certificación Óptica</span>
            </div>
            <button style={{ ...glassStyle, background: C.textDark, color: '#fff', padding: '18px', fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer', marginBottom: 24, boxShadow: '0 10px 20px rgba(26,42,64,0.15)' }}>
              Comprar - {fmtPrice(price)}
            </button>
            <div style={{ ...glassStyle, display: 'flex', justifyContent: 'space-between', padding: '16px', borderRadius: 20 }}>
              <div style={{ textAlign: 'center', flex: 1 }}><Truck size={20} color={C.primary} style={{ margin: '0 auto 8px' }} /><div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Envío Gratis</div></div>
              <div style={{ textAlign: 'center', flex: 1 }}><Shield size={20} color={C.primary} style={{ margin: '0 auto 8px' }} /><div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>2 Años Garantía</div></div>
              <div style={{ textAlign: 'center', flex: 1 }}><RotateCcw size={20} color={C.primary} style={{ margin: '0 auto 8px' }} /><div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>30 Días Retorno</div></div>
            </div>
          </div>
        </div>

        {/* 2. BENEFICIOS RÁPIDOS */}
        <div style={{ padding: '64px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48 }}>Claridad en cada Tarea.</h2>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              {[
                { i: <Cpu />, t: 'Chip Cuántico Z1', d: 'Procesamiento síncrono para multitarea sin límites.' },
                { i: <ScanFace />, t: 'Bio-Scan Invisible', d: 'Reconocimiento facial integrado bajo los píxeles.' },
                { i: <BatteryFull />, t: 'Energía Persistente', d: 'Hasta 48 horas de uso con carga solar ambiental.' }
              ].map((b, i) => (
                <div key={i} style={{ flex: '1 1 250px', ...glassStyle, padding: 32, textAlign: 'center' }}>
                  <div style={{ width: 64, height: 64, background: 'rgba(0,180,216,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', borderRadius: '50%' }}>{React.cloneElement(b.i as any, { size: 28, color: C.primary })}</div>
                  <h4 style={{ fontFamily: fontTitles, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{b.t}</h4>
                  <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.6 }}>{b.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. AUTORIDAD / LOGOS */}
        <div style={{ padding: '0 24px 64px', opacity: 0.4, textAlign: 'center' }}>
          <p style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>Reconocido por:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap', filter: 'grayscale(100%)' }}>
            {['DESIGN WEEK', 'TECH INSIDER', 'MINIMALISM', 'GLOBAL LABS'].map(l => <span key={l} style={{ fontFamily: fontTitles, fontSize: 18, fontWeight: 800 }}>{l}</span>)}
          </div>
        </div>

        {/* 4. INGENIERÍA / MATERIALES */}
        <div style={{ padding: '64px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontFamily: fontTitles, fontSize: 40, fontWeight: 800, marginBottom: 16 }}>Cristal Ethereal.</h2>
              <p style={{ fontSize: 16, color: C.textSub, lineHeight: 1.8, marginBottom: 24 }}>No es solo vidrio. Es una aleación molecular de zafiro y polímeros Aero-tech que ofrecen la transparencia del agua con la resistencia del diamante. El cuerpo unibody no tiene costuras ni puertos visibles.</p>
              <button style={{ padding: '14px 28px', border: `1px solid ${C.primary}`, background: 'transparent', color: C.primary, fontWeight: 700, borderRadius: 99, cursor: 'pointer' }}>Ver Materiales</button>
            </div>
            <div style={{ flex: '1 1 400px', height: 350, ...glassStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
              <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" alt="Celular glass detalle" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 20 }} />
            </div>
          </div>
        </div>

        {/* 5. TUTORIAL VISUAL */}
        <div style={{ padding: '64px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48 }}>Tu Flujo, Simplificado.</h2>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              {[
                { t: '1. Sincroniza', d: 'Acerca el dispositivo a tu nube y listo.', img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80' },
                { t: '2. Personaliza', d: 'El color del cristal cambia con tu mood.', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80' },
                { t: '3. Opera', d: 'Control gestual sin tocar la pantalla.', img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80' }
              ].map((s, i) => (
                <div key={i} style={{ flex: '1 1 250px', textAlign: 'center' }}>
                  <div style={{ ...glassStyle, height: 180, overflow: 'hidden', marginBottom: 24 }}><img src={s.img} alt={s.t} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                  <h4 style={{ fontFamily: fontTitles, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.t}</h4>
                  <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.6 }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. SOCIAL PROOF (MINI) */}
        <div style={{ padding: '64px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', ...glassStyle, padding: '40px' }}>
            <div style={{ fontSize: 48, fontWeight: 800, color: C.primary, marginBottom: 8 }}>500,000+</div>
            <p style={{ fontSize: 18, fontWeight: 600, color: C.textDark, marginBottom: 16 }}>Usuarios viviendo en el futuro.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: -10 }}>
              {[1,2,3,4,5].map(i => <div key={i} style={{ width: 44, height: 44, borderRadius: '50%', background: C.bgImage, border: '2px solid #fff', marginLeft: -12 }} />)}
            </div>
          </div>
        </div>

        {/* 7. MISIÓN DE MARCA */}
        <div style={{ padding: '80px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <h2 style={{ fontFamily: fontTitles, fontSize: 48, fontWeight: 800, marginBottom: 24, letterSpacing: '-0.02em' }}>Pureza Digital.</h2>
            <p style={{ fontSize: 18, color: C.textSub, lineHeight: 1.6 }}>En Ether Labs, creemos que la tecnología debe ser invisible. No estamos aquí para añadir ruido a tu vida, sino para destilarla a su esencia más pura a través de un diseño honesto y transparente.</p>
          </div>
        </div>

        {/* 8. GARANTÍA */}
        <div style={{ padding: '64px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { t: 'Crystal Care 2Y', d: 'Protección total contra roturas accidental.', i: <ShieldCheck /> },
              { t: 'Envío Sostenible', d: 'Empaque 100% orgánico y compostable.', i: <Truck /> },
              { t: 'Satisfacción Pura', d: '30 días para enamorarte o te lo devolvemos.', i: <RotateCcw /> }
            ].map((g, i) => (
              <div key={i} style={{ flex: '1 1 250px', ...glassStyle, padding: 32, textAlign: 'center' }}>
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>{React.cloneElement(g.i as any, { size: 36, color: C.primary })}</div>
                <h4 style={{ fontWeight: 800, marginBottom: 8 }}>{g.t}</h4>
                <p style={{ fontSize: 14, color: C.textSub }}>{g.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 9. ESPECIFICACIONES TÉCNICAS */}
        <div style={{ padding: '64px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', ...glassStyle, padding: '48px' }}>
            <h2 style={{ fontFamily: fontTitles, fontSize: 28, fontWeight: 800, marginBottom: 32 }}>Ingeniería de Precisión.</h2>
            <div style={{ borderTop: `1px solid ${C.border}` }}>
              {[
                { t: 'Dimensiones', c: '6.7" OLED Translúcida. Grosor de 5.8mm.' },
                { t: 'Óptica', c: 'Triple sensor de 64MP ocultos tras capa fotocrómica.' },
                { t: 'Audio', c: 'Superficie de cristal vibrante para sonido 360.' }
              ].map((s, i) => (
                <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <button onClick={() => setActiveSpec(activeSpec === i ? null : i)} style={{ width: '100%', padding: '24px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>{s.t}</span>
                    {activeSpec === i ? <Minus size={20} color={C.primary} /> : <Plus size={20} color={C.textSub} />}
                  </button>
                  {activeSpec === i && <div style={{ paddingBottom: 24, fontSize: 15, color: C.textSub, lineHeight: 1.6 }}>{s.c}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 10. FAQ */}
        <div style={{ padding: '64px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48 }}>Consultas Etéreas.</h2>
            <div style={{ borderTop: `1px solid ${C.border}` }}>
              {[
                { q: '¿Se raya el cristal exterior?', a: 'Nuestro cristal tiene una dureza de 9H en la escala de Mohs, siendo prácticamente inmune a rayaduras por uso diario.' },
                { q: '¿Cómo funciona la carga solar?', a: 'Micro-paneles solares bajo la pantalla captan luz ambiente (incluso artificial) para mantener la batería al 100%.' }
              ].map((f, i) => (
                <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <button onClick={() => setActiveFAQ(activeFAQ === i ? null : i)} style={{ width: '100%', padding: '24px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>{f.q}</span>
                    {activeFAQ === i ? <Minus size={20} color={C.primary} /> : <Plus size={20} color={C.textSub} />}
                  </button>
                  {activeFAQ === i && <div style={{ paddingBottom: 24, fontSize: 15, color: C.textSub, lineHeight: 1.6 }}>{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 11. CROSS-SELL */}
        <div style={{ padding: '64px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontFamily: fontTitles, fontSize: 24, fontWeight: 800, marginBottom: 48 }}>Completa tu Ecosistema:</h2>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[
                { n: 'Ether Buds (Glass)', img: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80' },
                { n: 'Soporte de Cita Mag', img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80' },
                { n: 'Cargador Universal Purista', img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80' }
              ].map((v, i) => (
                <div key={i} style={{ flex: '1 1 250px', ...glassStyle, padding: 24, textAlign: 'center' }}>
                   <div style={{ height: 160, borderRadius: 16, marginBottom: 24, overflow: 'hidden' }}>
                      <img src={v.img} alt={v.n} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                   </div>
                   <h4 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>{v.n}</h4>
                   <button style={{ padding: '8px 24px', background: C.textDark, color: '#fff', fontWeight: 700, borderRadius: 99, border: 'none', cursor: 'pointer' }}>Agregar</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 13. REVIEW WALL */}
        <div style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 64 }}>Experiencias.</h2>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              {[
                { t: '"Llevo 3 meses con él y cada vez que lo saco en una cena, alguien me pregunta qué es. Es arte funcional."', auth: 'Julian M.' },
                { t: '"La pantalla es tan clara que a veces parece que los iconos flotan en el aire. Increíble."', auth: 'Elena V.' },
                { t: '"Pesa poquísimo pero se siente muy robusto. El diseño transparente es el futuro."', auth: 'Marco S.' }
              ].map((r, i) => (
                <div key={i} style={{ flex: '1 1 250px', ...glassStyle, padding: 32 }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>{[1,2,3,4,5].map(s => <Star key={s} size={14} fill={C.star} color={C.star} />)}</div>
                  <p style={{ fontSize: 15, color: C.textDark, marginBottom: 20, lineHeight: 1.6, fontWeight: 500 }}>{r.t}</p>
                  <span style={{ fontSize: 14, color: C.textSub, fontWeight: 700 }}>— {r.auth}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 14. FOOTER FUNCIONAL */}
        <footer style={{ padding: `100px 24px ${showSticky ? 120 : 60}px` }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', ...glassStyle, padding: 64, textAlign: 'center' }}>
            <h4 style={{ fontFamily: fontTitles, fontSize: 24, fontWeight: 900, marginBottom: 16 }}>ETHER LABS</h4>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 32, fontSize: 14, fontWeight: 600 }}>
              <span>Soporte</span><span>Garantía</span><span>Tienda</span>
            </div>
            <div style={{ fontSize: 12, color: C.textSub, fontWeight: 600 }}>© 2026 ETHER LABS GLOBAL.</div>
          </div>
        </footer>

        {/* 12. STICKY ATC */}
        {showSticky && (
          <div style={{ position: 'fixed', bottom: 24, left: 24, right: 24, zIndex: 100 }}>
            <div style={{ ...glassStyle, maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', borderRadius: 99 }}>
              <div>
                <div style={{ color: C.textDark, fontSize: 16, fontWeight: 800 }}>{ai?.enhancedTitle || product.title}</div>
                <div style={{ color: C.primary, fontSize: 14, fontWeight: 800 }}>{fmtPrice(price)}</div>
              </div>
              <button style={{ padding: '14px 32px', background: C.textDark, color: '#fff', fontSize: 14, fontWeight: 800, border: 'none', cursor: 'pointer', borderRadius: 99 }}>Comprar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
