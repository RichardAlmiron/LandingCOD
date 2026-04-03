'use client';
import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import {
  Menu, Search, ShoppingCart, User, Star, Truck, RotateCcw,
  ShieldCheck, Plus, Minus, Check, Cpu, BatteryFull, Leaf,
  Wifi, Shield, Droplets, Heart, Package, PlayCircle
} from 'lucide-react';

interface PDPProps { data: StoreData; product: Product; variant?: number; }

const C = {
  bgMain: '#F2EFE9', bgWhite: '#FFFFFF', bgImage: '#E6DEC9',
  textDark: '#2C2B29', textSub: '#5E5A54', primary: '#917953',
  border: '#D8D1C3', star: '#A3885C'
};

const fontTitles = `'Times New Roman', 'Georgia', serif`;
const fontSans = `'Inter', sans-serif`;

export default function PdpCelularesEco({ data, product }: PDPProps) {
  const images = product.images?.length ? product.images : [product.imageUrl];
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
      <nav style={{ background: C.bgWhite, padding: '16px 24px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Menu size={24} color={C.textDark} />
          <span style={{ fontFamily: fontTitles, fontSize: 24, fontWeight: 700, letterSpacing: '0.05em' }}>{data.name || 'TERRA'}</span>
          <div style={{ display: 'flex', gap: 16 }}><User size={20} /><Search size={20} /><ShoppingCart size={20} /></div>
        </div>
      </nav>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 24px 16px', fontSize: 13, color: C.textSub, fontWeight: 500 }}>
        Celulares {'>'} Eco {'>'} <span style={{ color: C.textDark }}>{ai?.enhancedTitle || product.title}</span>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        
        {/* 1. HERO SECTION */}
        <div style={{ padding: '0 24px 48px', display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ background: C.bgImage, borderRadius: 16, padding: 40, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <img src={images[0]} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <h1 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 400, lineHeight: 1.2, marginBottom: 8, color: '#000' }}>{ai?.enhancedTitle || product.title}</h1>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Subeocebezado de Impacto</h3>
            <p style={{ fontSize: 15, color: C.textSub, lineHeight: 1.5, marginBottom: 16 }}>{ai?.enhancedDescription || product.description || 'Tecnología sostenible de alta fidelidad con chasis reciclado y diseño ergonómico.'}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(i => <Star key={i} size={14} fill={C.star} color={C.star} />)}</div>
              <span style={{ fontSize: 14, fontWeight: 600 }}>4.9 / 5</span><span style={{ fontSize: 14, color: C.textSub }}>(1,590 Reseñas)</span>
            </div>
            <button style={{ width: '100%', padding: '16px', background: C.primary, color: '#fff', fontSize: 16, fontWeight: 600, borderRadius: 8, border: 'none', cursor: 'pointer', marginBottom: 16 }}>
              Añadir al carrito - {fmtPrice(price)} {originalPrice > price && <span style={{ textDecoration: 'line-through', fontWeight: 400, marginLeft: 8 }}>(Antes {fmtPrice(originalPrice)})</span>}
            </button>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '16px 0', marginBottom: 16 }}>
              <div style={{ textAlign: 'center', flex: 1 }}><Truck size={20} color={C.textDark} style={{ margin: '0 auto 8px' }} /><div style={{ fontSize: 11, fontWeight: 600 }}>Envío Gratuito</div></div>
              <div style={{ textAlign: 'center', flex: 1 }}><RotateCcw size={20} color={C.textDark} style={{ margin: '0 auto 8px' }} /><div style={{ fontSize: 11, fontWeight: 600 }}>Devoluciones</div></div>
              <div style={{ textAlign: 'center', flex: 1 }}><Leaf size={20} color={C.textDark} style={{ margin: '0 auto 8px' }} /><div style={{ fontSize: 11, fontWeight: 600 }}>Sostenibilidad</div></div>
            </div>
          </div>
        </div>

        {/* 3. AUTORIDAD */}
        <div style={{ padding: '0 24px 48px', textAlign: 'center', opacity: 0.6 }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>Reconocido por expertos en sostenibilidad:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap', filter: 'grayscale(100%)' }}>
            {['WIRED', 'TECHCRUNCH', 'FORBES', 'THE VERGE'].map(l => <span key={l} style={{ fontFamily: fontTitles, fontSize: 20, fontWeight: 700 }}>{l}</span>)}
          </div>
        </div>
      </div>

      {/* 2. BENEFICIOS INMEDIATOS */}
      <div style={{ background: C.bgWhite, padding: '64px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 28, textAlign: 'center', marginBottom: 48 }}>Impacto Positivo Inmediato.</h2>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { i: <Leaf />, t: 'Cero Emisiones Netas', d: 'Desde la fabricación hasta tu puerta.' },
              { i: <BatteryFull />, t: 'Independencia Energética', d: 'Batería adaptativa que optimiza cada ciclo.' },
              { i: <Shield />, t: 'Diseño Modular', d: 'Reparable por ti mismo extendiendo su vida útil.' }
            ].map((b, i) => (
              <div key={i} style={{ flex: '1 1 250px', background: C.bgMain, padding: 32, textAlign: 'center', borderRadius: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>{React.cloneElement(b.i as any, { size: 32, color: C.primary })}</div>
                <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{b.t}</h4>
                <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.5 }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. INGENIERÍA Y MATERIALES */}
      <div style={{ background: C.bgImage, padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
             <h2 style={{ fontFamily: fontTitles, fontSize: 32, marginBottom: 16 }}>Ingeniería que respeta la tierra.</h2>
             <p style={{ fontSize: 16, color: C.textDark, lineHeight: 1.6, marginBottom: 24 }}>El chasis de Terra está forjado a partir de un 95% de titanio reciclado post-consumo. Hemos eliminado las tierras raras de nuestros imanes acústicos y reemplazado el cristal estándar por un bio-polímero cerámico tres veces más duradero y 100% biodegradable en plantas de compostaje industrial.</p>
             <button style={{ padding: '12px 24px', border: `1px solid ${C.textDark}`, background: 'transparent', color: C.textDark, fontWeight: 600, borderRadius: 8 }}>Descubrir Materiales</button>
          </div>
          <div style={{ flex: '1 1 400px', height: 300, borderRadius: 16, overflow: 'hidden' }}>
             <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" alt="Celular eco detalle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>

      {/* 4. POR QUÉ USARLO */}
      <div style={{ background: C.bgWhite, padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 28, textAlign: 'center', marginBottom: 48 }}>Diseñado para la vida real.</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            {[
              { i: <Wifi />, t: 'Conexión Estable:', d: 'Experimenta cada llamada con claridad excepcional.' },
              { i: <Cpu />, t: 'Rendimiento Fluido:', d: 'Procesamiento limpio sin sobrecargas térmicas.' },
              { i: <Droplets />, t: 'Protección al Agua:', d: 'Sellado natural que resiste polvo y sumersiones cortas.' }
            ].map((f, i) => (
              <div key={i} style={{ flex: '1 1 250px', textAlign: 'center' }}>
                <div style={{ marginBottom: 16 }}>{React.cloneElement(f.i as any, { size: 36, strokeWidth: 1.5, color: '#000' })}</div>
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: '#000' }}>{f.t}</h4>
                <p style={{ fontSize: 13, color: C.textSub, lineHeight: 1.4, margin: '0 auto', maxWidth: 220 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. TUTORIAL VISUAL (CÓMO USARLO) */}
      <div style={{ background: C.bgMain, padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 28, textAlign: 'center', marginBottom: 48 }}>Flujo Natural. 3 Pasos.</h2>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { t: '(1) Enciende y Transfiere:', d: 'Tu vida digital se mueve de forma segura por NFC.', img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80' },
              { t: '(2) Control Gesto:', d: 'Sin botones innecesarios, puro control táctil orgánico.', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80' },
              { t: '(3) Carga Solar (Opcional):', d: 'Soporta nuestra funda de carga fotovoltaica.', img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80' }
            ].map((s, i) => (
              <div key={i} style={{ flex: '1 1 250px' }}>
                <div style={{ borderRadius: 16, height: 200, overflow: 'hidden', marginBottom: 24, border: `1px solid ${C.border}` }}><img src={s.img} alt={s.t} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{s.t}</h4>
                <p style={{ fontSize: 13, color: C.textSub, lineHeight: 1.4 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. TABLA COMPARATIVA */}
      <div style={{ background: C.bgWhite, padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 28, textAlign: 'center', marginBottom: 48 }}>La diferencia es clara.</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ padding: '16px', borderBottom: `1px solid ${C.border}`, background: C.bgMain }}></th>
                <th style={{ padding: '16px', borderBottom: `1px solid ${C.border}`, background: C.bgImage, fontWeight: 700 }}>Nuestro Producto Premium</th>
                <th style={{ padding: '16px', borderBottom: `1px solid ${C.border}`, background: '#F9F8F6', fontWeight: 600 }}>Competidor A</th>
                <th style={{ padding: '16px', borderBottom: `1px solid ${C.border}`, background: '#F9F8F6', fontWeight: 600 }}>Competidor B</th>
              </tr>
            </thead>
            <tbody>
              {[
                { f: 'Materiales Reciclados', c1: <Check size={20} color={C.primary} style={{ margin: '0 auto' }} />, c2: '15% Parcial', c3: 'Ninguno' },
                { f: 'Batería Adaptativa', c1: <Check size={20} color={C.primary} style={{ margin: '0 auto' }} />, c2: 'No incluido', c3: 'Corto plazo' },
                { f: 'Resistencia al Agua', c1: <Check size={20} color={C.primary} style={{ margin: '0 auto' }} />, c2: 'Splash solo', c3: 'No incluido' },
                { f: 'Derecho a Reparar', c1: <Check size={20} color={C.primary} style={{ margin: '0 auto' }} />, c2: 'Cerrado', c3: 'Cerrado' }
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '16px', textAlign: 'left', fontWeight: 600, borderBottom: `1px solid ${C.border}`, background: C.bgMain }}>{r.f}</td>
                  <td style={{ padding: '16px', borderBottom: `1px solid ${C.border}`, background: '#FDFBF7' }}>{r.c1}</td>
                  <td style={{ padding: '16px', borderBottom: `1px solid ${C.border}`, background: '#FFFFFF' }}>{r.c2}</td>
                  <td style={{ padding: '16px', borderBottom: `1px solid ${C.border}`, background: '#FFFFFF' }}>{r.c3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 11. ESPECIFICACIONES TÉCNICAS */}
      <div style={{ background: C.bgMain, padding: '48px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 28, marginBottom: 32 }}>Especificaciones y Detalles.</h2>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {[
              { t: 'Núcleos Tecnológicos', c: 'Procesador A15 Green de arquitectura limpia. Batería de 5000mAh de alta densidad.' },
              { t: 'Pantalla Natural Tone', c: 'Panel AMOLED 6.7" que ajusta temperatura de color dinámicamente según luz ambiental.' },
              { t: 'Sistema Fotográfico', c: 'Cámara doble de 48MP con lentes libres de plásticos. Fotografía macro mejorada.' }
            ].map((s, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setActiveSpec(activeSpec === i ? null : i)} style={{ width: '100%', padding: '24px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', color: C.textDark }}>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{s.t}</span>
                  {activeSpec === i ? <Minus size={20} color={C.primary} /> : <Plus size={20} color={C.primary} />}
                </button>
                {activeSpec === i && <div style={{ paddingBottom: 24, fontSize: 15, color: C.textSub, lineHeight: 1.6 }}>{s.c}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 10. GARANTÍA Y CONFIANZA */}
      <div style={{ background: C.bgWhite, padding: '64px 24px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 32, flexWrap: 'wrap', textAlign: 'center' }}>
          {[
            { t: 'Garantía 24 Meses', d: 'Soporte total de hardware y software sin coste extra.', i: <ShieldCheck /> },
            { t: 'Pago Encriptado', d: 'Pasarelas de seguridad de grado bancario.', i: <Check /> },
            { t: 'Prueba de 30 Días', d: 'Devoluciones garantizadas, nosotros pagamos el envío.', i: <RotateCcw /> }
          ].map((g, i) => (
            <div key={i} style={{ flex: '1 1 250px' }}>
              <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>{React.cloneElement(g.i as any, { size: 40, color: C.primary })}</div>
              <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{g.t}</h4>
              <p style={{ fontSize: 14, color: C.textSub }}>{g.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 8. PRUEBA SOCIAL DINÁMICA */}
      <div style={{ background: C.bgMain, padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 28, textAlign: 'center', marginBottom: 48 }}>La comunidad Terra en acción.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { img: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&q=80', u: '@usuario_1' },
              { img: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80', u: '@usuario_2' },
              { img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80', u: '@usuario_3' },
              { img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80', u: '@usuario_4' }
            ].map((item, i) => (
               <div key={i} style={{ height: 300, borderRadius: 16, overflow: 'hidden', position: 'relative' }}>
                  <img src={item.img} alt={item.u} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', bottom: 16, left: 16, color: C.bgWhite, fontWeight: 600, fontSize: 13, background: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: 4 }}>{item.u}</span>
               </div>
            ))}
          </div>
        </div>
      </div>

      {/* 9. MISIÓN DE MARCA */}
      <div style={{ background: C.bgImage, padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Heart size={48} color={C.textDark} strokeWidth={1.5} style={{ margin: '0 auto 24px' }} />
          <h2 style={{ fontFamily: fontTitles, fontSize: 36, marginBottom: 24 }}>Más que un dispositivo. Un movimiento.</h2>
          <p style={{ fontSize: 18, color: C.textDark, lineHeight: 1.6 }}>Nuestra misión es demostrar que la tecnología de vanguardia no requiere comprometer nuestro planeta. Cada compra de Terra es un voto por la economía circular y la reforestación amazónica.</p>
        </div>
      </div>

      {/* 12. PREGUNTAS FRECUENTES */}
      <div style={{ background: C.bgWhite, padding: '64px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 28, textAlign: 'center', marginBottom: 48 }}>Preguntas Frecuentes.</h2>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {[
              { q: '¿Viene con cargador en la caja?', a: 'Para cumplir nuestras metas ambientales, no incluimos adaptador de corriente, pero sí el cable ecológico USB-C.' },
              { q: '¿Es compatible con mi operador celular?', a: 'Sí, el dispositivo está 100% desbloqueado de fábrica para funcionar con todas las operadoras globales.' },
              { q: '¿Cuáles son los tiempos de envío ecológico?', a: 'Utilizamos rutas optimizadas y mensajería en bicicleta/eléctrica en zonas urbanas. Tarda de 2 a 4 días hábiles.' }
            ].map((f, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setActiveFAQ(activeFAQ === i ? null : i)} style={{ width: '100%', padding: '24px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', color: C.textDark }}>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>{f.q}</span>
                  {activeFAQ === i ? <Minus size={20} /> : <Plus size={20} />}
                </button>
                {activeFAQ === i && <div style={{ paddingBottom: 24, fontSize: 15, color: C.textSub, lineHeight: 1.6 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 13. VENTA CRUZADA */}
      <div style={{ background: C.bgMain, padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 28, marginBottom: 48 }}>Combina perfectamente con:</h2>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { n: 'Funda Compostable', img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80' },
              { n: 'Cargador Solar 30W', img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80' },
              { n: 'Audífonos Reciclados', img: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80' }
            ].map((v, i) => (
              <div key={i} style={{ flex: '1 1 250px', background: C.bgWhite, padding: 24, borderRadius: 16, border: `1px solid ${C.border}`, textAlign: 'center' }}>
                 <div style={{ height: 120, borderRadius: 8, marginBottom: 16, overflow: 'hidden' }}><img src={v.img} alt={v.n} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                 <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{v.n}</h4>
                 <button style={{ padding: '8px 16px', background: 'transparent', border: `1px solid ${C.primary}`, color: C.primary, fontWeight: 600, borderRadius: 4, cursor: 'pointer' }}>+ Agregar</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 14. MURO DE RESEÑAS */}
      <div style={{ background: C.bgWhite, padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 32, textAlign: 'center', marginBottom: 64 }}>Testimonios</h2>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { t: '"Increíble que un móvil tan verde sea tan potente. Un acierto."', auth: 'Usuario Verificado' },
              { t: '"El empaque es hermoso y no tiene nada de plástico. Lo amé."', auth: 'Ambientalista' },
              { t: '"Duración de batería excepcional, perfecto para la naturaleza."', auth: 'Aventurero' }
            ].map((r, i) => (
              <div key={i} style={{ flex: '1 1 250px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: C.bgImage, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={20} color={C.textSub} /></div>
                  <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(s => <Star key={s} size={12} fill={C.star} color={C.star} />)}</div>
                </div>
                <p style={{ fontSize: 16, fontStyle: 'italic', marginBottom: 16, lineHeight: 1.5 }}>{r.t}</p>
                <span style={{ fontSize: 13, color: C.textSub, fontWeight: 600 }}>- {r.auth} (1,20 Reseñas)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 15. FOOTER FUNCIONAL */}
      <footer style={{ background: C.bgImage, padding: '64px 24px 40px', paddingBottom: showSticky ? 120 : 40 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', marginBottom: 48 }}>
            <div style={{ flex: '2 1 300px' }}>
               <h4 style={{ fontFamily: fontTitles, fontSize: 24, fontWeight: 700, marginBottom: 16 }}>TERRA</h4>
               <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.6 }}>Tecnología sostenible diseñada para mitigar el cambio climático. Cada compra planta un árbol.</p>
            </div>
            <div style={{ flex: '1 1 150px' }}>
               <h5 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Explorar</h5>
               <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: C.textSub, lineHeight: 2.5 }}><li>Smartphones</li><li>Accesorios</li><li>Garantías</li></ul>
            </div>
            <div style={{ flex: '1 1 150px' }}>
               <h5 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Empresa</h5>
               <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: C.textSub, lineHeight: 2.5 }}><li>Nuestra Misión</li><li>Reporte Ambiental</li><li>Contacto</li></ul>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.textSub }}>
             <span>© 2026 TERRA. Todos los derechos reservados.</span>
             <span>Políticas | Privacidad | Términos</span>
          </div>
        </div>
      </footer>

      {/* STICKY ATC */}
      {showSticky && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: C.primary, padding: '16px 24px', zIndex: 100, boxShadow: '0 -10px 30px rgba(0,0,0,0.1)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>{ai?.enhancedTitle || product.title} - {fmtPrice(price)}</span>
            <button style={{ padding: '12px 32px', background: C.bgWhite, color: C.textDark, fontSize: 14, fontWeight: 700, borderRadius: 8, border: 'none', cursor: 'pointer' }}>Añadir al carrito</button>
          </div>
        </div>
      )}

    </div>
  );
}
