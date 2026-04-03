'use client';
import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import {
  Menu, Search, ShoppingCart, User, Star, Truck, RotateCcw,
  ShieldCheck, Plus, Minus, Check, Cpu, BatteryFull, Shield,
  Wifi, ScanFace, Droplets, Zap, Heart, Package, PlayCircle
} from 'lucide-react';

interface PDPProps { data: StoreData; product: Product; variant?: number; }

const C = {
  bgMain: '#050510', bgWhite: '#0A0A16', bgImage: '#121225',
  textDark: '#FFFFFF', textSub: '#8B8C9D', primary: '#00FF66',
  border: '#1F2038', star: '#00FF66'
};

const fontTitles = "Orbitron, sans-serif";
const fontSans = "Rajdhani, sans-serif";

export default function PdpCelularesGamer({ data, product }: PDPProps) {
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
          <span style={{ fontFamily: fontTitles, fontSize: 24, fontWeight: 700, letterSpacing: '2px', color: C.primary }}>{data.name || 'NEXUS PRO'}</span>
          <div style={{ display: 'flex', gap: 16 }}><User size={20} /><Search size={20} /><ShoppingCart size={20} /></div>
        </div>
      </nav>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 24px 16px', fontSize: 14, color: C.textSub, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
        Celulares {'>'} Gaming {'>'} <span style={{ color: C.primary }}>{ai?.enhancedTitle || product.title}</span>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        
        {/* 1. HERO SECTION */}
        <div style={{ padding: '0 24px 48px', display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ background: C.bgImage, borderRadius: 12, padding: 40, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, border: `1px solid ${C.border}`, boxShadow: `0 0 40px rgba(0,255,102,0.05)` }}>
              <img src={images[0]} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 20px rgba(0,255,102,0.2))' }} />
            </div>
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <h1 style={{ fontFamily: fontTitles, fontSize: 36, fontWeight: 800, lineHeight: 1.1, marginBottom: 8, color: C.textDark, textTransform: 'uppercase', letterSpacing: '1px' }}>{ai?.enhancedTitle || product.title}</h1>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: C.primary, textTransform: 'uppercase', letterSpacing: '2px' }}>Dominación Absoluta</h3>
            <p style={{ fontSize: 16, color: C.textSub, lineHeight: 1.6, marginBottom: 16 }}>{ai?.enhancedDescription || product.description || 'La máquina de gaming definitiva. Refrigeración líquida activa, gatillos ultrasónicos y 165Hz de fluidez letal.'}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(i => <Star key={i} size={16} fill={C.star} color={C.star} />)}</div>
              <span style={{ fontSize: 16, fontWeight: 700, color: C.textDark }}>4.9 / 5</span><span style={{ fontSize: 14, color: C.textSub }}>(Nivel 99)</span>
            </div>
            <button style={{ width: '100%', padding: '16px', background: C.primary, color: '#000', fontSize: 18, fontWeight: 800, borderRadius: 4, border: 'none', cursor: 'pointer', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '2px', boxShadow: `0 0 20px ${C.primary}40`, transition: 'all 0.2s' }}>
              Equipar Ahora - {fmtPrice(price)} {originalPrice > price && <span style={{ textDecoration: 'line-through', fontWeight: 600, marginLeft: 8, opacity: 0.6 }}>(Antes {fmtPrice(originalPrice)})</span>}
            </button>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '16px 0', marginBottom: 16 }}>
              <div style={{ textAlign: 'center', flex: 1 }}><Zap size={22} color={C.primary} style={{ margin: '0 auto 8px' }} /><div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>165Hz OLED</div></div>
              <div style={{ textAlign: 'center', flex: 1 }}><Cpu size={22} color={C.primary} style={{ margin: '0 auto 8px' }} /><div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Snapdragon 8 Gen 4</div></div>
              <div style={{ textAlign: 'center', flex: 1 }}><BatteryFull size={22} color={C.primary} style={{ margin: '0 auto 8px' }} /><div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>6000 mAh</div></div>
            </div>
          </div>
        </div>

        {/* 3. AUTORIDAD */}
        <div style={{ padding: '0 24px 48px', textAlign: 'center', opacity: 0.8 }}>
          <p style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: 24, color: C.textSub }}>Torneos Oficiales:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap', filter: 'grayscale(100%) brightness(200%)' }}>
            {['ESL', 'EVO', 'DREAMHACK', 'IGN'].map(l => <span key={l} style={{ fontFamily: fontTitles, fontSize: 24, fontWeight: 800, letterSpacing: '2px' }}>{l}</span>)}
          </div>
        </div>
      </div>

      {/* 2. BENEFICIOS INMEDIATOS */}
      <div style={{ background: C.bgWhite, padding: '64px 24px', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48, letterSpacing: '1px', textTransform: 'uppercase' }}>Ventaja Táctica Competitiva.</h2>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { i: <Zap />, t: 'Latencia Cero', d: 'Touch sampling de 960Hz para reaccionar antes que el enemigo.' },
              { i: <Cpu />, t: 'Refrigeración Activa', d: 'Ventilador interno a 20,000 RPM para mantener FPS máximos estables.' },
              { i: <Shield />, t: 'Gatillos Ultrasónicos', d: 'Mapea acciones a los bordes hápticos para jugar con 4 dedos.' }
            ].map((b, i) => (
              <div key={i} style={{ flex: '1 1 250px', background: C.bgMain, padding: 32, textAlign: 'center', borderRadius: 8, border: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>{React.cloneElement(b.i as any, { size: 36, color: C.primary, strokeWidth: 2 })}</div>
                <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, letterSpacing: '1px', textTransform: 'uppercase', color: C.textDark }}>{b.t}</h4>
                <p style={{ fontSize: 15, color: C.textSub, lineHeight: 1.5 }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. INGENIERÍA Y MATERIALES */}
      <div style={{ background: C.bgImage, padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
             <h2 style={{ fontFamily: fontTitles, fontSize: 36, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16, color: C.primary }}>Armadura Cyber-Grid.</h2>
             <p style={{ fontSize: 16, color: C.textDark, lineHeight: 1.7, marginBottom: 24, fontWeight: 500 }}>Chasis de aleación de aluminio aeroespacial optimizado para disipación térmica. Iluminación RGB Aura Sync en el panel trasero y textura anti-deslizante para sesiones maratónicas de 10+ horas.</p>
             <button style={{ padding: '14px 28px', border: `2px solid ${C.primary}`, background: 'transparent', color: C.primary, fontWeight: 700, borderRadius: 4, textTransform: 'uppercase', letterSpacing: '2px' }}>Inspeccionar Hardware</button>
          </div>
          <div style={{ flex: '1 1 400px', height: 300, borderRadius: 8, border: `1px solid ${C.border}`, position: 'relative', overflow: 'hidden' }}>
             <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: C.primary, boxShadow: `0 0 10px ${C.primary}`, zIndex: 1 }}></div>
             <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" alt="Celular gaming detalle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>

      {/* 4. POR QUÉ USARLO */}
      <div style={{ background: C.bgWhite, padding: '64px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48, letterSpacing: '1px', textTransform: 'uppercase' }}>Sistema Optimizado.</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            {[
               { i: <Wifi />, t: 'Hyper-Fi 7:', d: 'Elimina el lag de red con antenas en X laterales.' },
               { i: <BatteryFull />, t: 'Bypass Charging:', d: 'Alimenta directo a la placa sin calentar la batería.' },
               { i: <PlayCircle />, t: 'Game Space OS:', d: 'Interfaz inmersiva que bloquea distracciones y libera RAM.' }
            ].map((f, i) => (
              <div key={i} style={{ flex: '1 1 250px', textAlign: 'center' }}>
                <div style={{ marginBottom: 16 }}>{React.cloneElement(f.i as any, { size: 40, strokeWidth: 1.5, color: C.primary })}</div>
                <h4 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8, color: C.textDark, textTransform: 'uppercase', letterSpacing: '1px' }}>{f.t}</h4>
                <p style={{ fontSize: 15, color: C.textSub, lineHeight: 1.5, margin: '0 auto', maxWidth: 220, fontWeight: 500 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. TUTORIAL VISUAL (CÓMO USARLO) */}
      <div style={{ background: C.bgMain, padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48, letterSpacing: '1px', textTransform: 'uppercase' }}>Entra en la Zona.</h2>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { t: 'Paso 1: Activar', d: 'Desliza el interruptor físico lateral para entrar en modo Game Space.', img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80' },
              { t: 'Paso 2: Calibrar', d: 'Ajusta macros, sensibilidad de gatillos y curvas de ventilador.', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80' },
              { t: 'Paso 3: Destruir', d: 'Ejecuta tu juego favorito con prioridad máxima de CPU/GPU.', img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80' }
            ].map((s, i) => (
              <div key={i} style={{ flex: '1 1 250px' }}>
                <div style={{ background: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: 8, height: 200, overflow: 'hidden', marginBottom: 24, boxShadow: `inset 0 0 20px rgba(0,255,102,0.02)` }}><img src={s.img} alt={s.t} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                <h4 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '1px', color: C.textDark }}>{s.t}</h4>
                <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.5, fontWeight: 500 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. TABLA COMPARATIVA */}
      <div style={{ background: C.bgWhite, padding: '64px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48, letterSpacing: '1px', textTransform: 'uppercase' }}>Overpowered.</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: 15 }}>
            <thead>
              <tr>
                <th style={{ padding: '16px', borderBottom: `1px solid ${C.border}`, background: C.bgMain }}></th>
                <th style={{ padding: '16px', borderBottom: `2px solid ${C.primary}`, background: C.bgImage, fontWeight: 800, color: C.primary, textTransform: 'uppercase', letterSpacing: '1px' }}>NEXUS PRO</th>
                <th style={{ padding: '16px', borderBottom: `1px solid ${C.border}`, background: '#0F0F1A', fontWeight: 700, color: C.textSub, textTransform: 'uppercase' }}>Gamer Base</th>
                <th style={{ padding: '16px', borderBottom: `1px solid ${C.border}`, background: '#0F0F1A', fontWeight: 700, color: C.textSub, textTransform: 'uppercase' }}>Teléfono "Pro"</th>
              </tr>
            </thead>
            <tbody style={{ fontWeight: 500 }}>
              {[
                { f: 'Tasa de Refresco', c1: '165Hz AMOLED', c2: '144Hz IPS', c3: '120Hz Genérico' },
                { f: 'Enfriamiento', c1: 'Activo (Ventilador)', c2: 'Pasivo', c3: 'Pasivo Limitado' },
                { f: 'Bypass Charging', c1: <Check size={20} color={C.primary} style={{ margin: '0 auto' }} />, c2: <Minus size={20} color={C.textSub} style={{ margin: '0 auto' }} />, c3: <Minus size={20} color={C.textSub} style={{ margin: '0 auto' }} /> },
                { f: 'Gatillos Físicos', c1: <Check size={20} color={C.primary} style={{ margin: '0 auto' }} />, c2: <Check size={20} color={C.textSub} style={{ margin: '0 auto' }} />, c3: <Minus size={20} color={C.textSub} style={{ margin: '0 auto' }} /> }
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '16px', textAlign: 'left', fontWeight: 700, borderBottom: `1px solid ${C.border}`, background: C.bgMain, color: C.textSub }}>{r.f}</td>
                  <td style={{ padding: '16px', borderBottom: `1px solid ${C.border}`, background: C.bgImage, color: C.textDark, fontWeight: 700 }}>{r.c1}</td>
                  <td style={{ padding: '16px', borderBottom: `1px solid ${C.border}`, background: C.bgMain }}>{r.c2}</td>
                  <td style={{ padding: '16px', borderBottom: `1px solid ${C.border}`, background: C.bgMain }}>{r.c3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 11. ESPECIFICACIONES TÉCNICAS */}
      <div style={{ background: C.bgMain, padding: '48px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 800, marginBottom: 32, letterSpacing: '1px', textTransform: 'uppercase' }}>Specs de Hardware.</h2>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {[
               { t: 'Procesador Gráfico', c: 'Adreno 750 con Ray Tracing por hardware. Ancho de banda de memoria LPDDR5X (Hasta 24GB).' },
               { t: 'Sistema de Audio Dirac', c: 'Altavoces estéreo frontales duales con certificación Hi-Res y jack de 3.5mm para latencia cero real.' },
               { t: 'Batería Dual Cell', c: 'Diseño de batería dividida en dos celdas de 3000mAh para soportar carga HyperCharge de 165W. 0 a 100% en 15 minutos.' }
            ].map((s, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setActiveSpec(activeSpec === i ? null : i)} style={{ width: '100%', padding: '24px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', color: C.textDark }}>
                  <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: activeSpec === i ? C.primary : C.textDark }}>{s.t}</span>
                  {activeSpec === i ? <Minus size={20} color={C.primary} /> : <Plus size={20} color={C.textDark} />}
                </button>
                {activeSpec === i && <div style={{ paddingBottom: 24, fontSize: 16, color: C.textSub, lineHeight: 1.6, fontWeight: 500 }}>{s.c}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 10. GARANTÍA Y CONFIANZA */}
      <div style={{ background: C.bgWhite, padding: '64px 24px', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 32, flexWrap: 'wrap', textAlign: 'center' }}>
          {[
            { t: 'Respawn en 24h', d: 'Tu equipo de reemplazo se envía el mismo día ante defectos.', i: <ShieldCheck /> },
            { t: 'Protección Anti-Ghosting', d: 'Pantalla certificada libre de quemaduras térmicas.', i: <Zap /> },
            { t: 'Trial de 14 Días', d: 'Pruébalo en ranked. Si no subes de liga, devuélvelo.', i: <RotateCcw /> }
          ].map((g, i) => (
            <div key={i} style={{ flex: '1 1 250px' }}>
              <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>{React.cloneElement(g.i as any, { size: 40, color: C.primary, strokeWidth: 1.5 })}</div>
              <h4 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, letterSpacing: '1px', textTransform: 'uppercase' }}>{g.t}</h4>
              <p style={{ fontSize: 15, color: C.textSub, fontWeight: 500 }}>{g.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 8. PRUEBA SOCIAL DINÁMICA */}
      <div style={{ background: C.bgMain, padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48, letterSpacing: '1px', textTransform: 'uppercase' }}>Pro Players.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { img: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&q=80', u: '@Jugador_1' },
              { img: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80', u: '@Jugador_2' },
              { img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80', u: '@Jugador_3' },
              { img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80', u: '@Jugador_4' }
            ].map((item, i) => (
               <div key={i} style={{ height: 300, borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
                  <img src={item.img} alt={item.u} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                  <span style={{ position: 'absolute', bottom: 16, left: 16, color: C.primary, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px' }}>{item.u}</span>
               </div>
            ))}
          </div>
        </div>
      </div>

      {/* 9. MISIÓN DE MARCA */}
      <div style={{ background: C.bgWhite, padding: '80px 24px', textAlign: 'center', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Zap size={48} color={C.primary} strokeWidth={2} style={{ margin: '0 auto 24px', filter: `drop-shadow(0 0 10px ${C.primary})` }} />
          <h2 style={{ fontFamily: fontTitles, fontSize: 40, fontWeight: 800, marginBottom: 24, letterSpacing: '2px', textTransform: 'uppercase', color: C.textDark }}>For The Players.</h2>
          <p style={{ fontSize: 18, color: C.textSub, lineHeight: 1.6, fontWeight: 500 }}>No hacemos concesiones. Nexus existe para empujar los límites de lo que es físicamente posible en hardware móvil. Diseñamos con un solo propósito en mente: la victoria incondicional de nuestros usuarios.</p>
        </div>
      </div>

      {/* 12. PREGUNTAS FRECUENTES */}
      <div style={{ background: C.bgMain, padding: '64px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48, letterSpacing: '1px', textTransform: 'uppercase' }}>Intel Base.</h2>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {[
              { q: '¿Viene con el Cooler Externo AeroActive?', a: 'El modelo Pro viene con el enfriador activo incluido en la caja. Se conecta al puerto USB-C lateral.' },
              { q: '¿Se pueden jugar títulos de PC en emulación?', a: 'Sí, gracias al chipset genérico y los 24GB de RAM, la emulación de plataformas mayores como Switch o PC es extremadamente fluida.' },
              { q: '¿Cuánto dura la batería a máximos FPS?', a: 'En títulos AAA móviles a 120fps con gráficos Ultra, estima unas 5.5 horas continuas antes de requerir el bypass charging.' }
            ].map((f, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setActiveFAQ(activeFAQ === i ? null : i)} style={{ width: '100%', padding: '24px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', color: C.textDark }}>
                  <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: activeFAQ === i ? C.primary : C.textDark }}>{f.q}</span>
                  {activeFAQ === i ? <Minus size={20} color={C.primary} /> : <Plus size={20} color={C.textDark} />}
                </button>
                {activeFAQ === i && <div style={{ paddingBottom: 24, fontSize: 15, color: C.textSub, lineHeight: 1.6, fontWeight: 500 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 13. VENTA CRUZADA */}
      <div style={{ background: C.bgWhite, padding: '64px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 800, marginBottom: 48, letterSpacing: '1px', textTransform: 'uppercase' }}>Armería:</h2>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { n: 'Cooler Térmico Aero', img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80' },
              { n: 'Gamepad Acoplable Kunai', img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80' },
              { n: 'Auriculares Latencia 0', img: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80' }
            ].map((v, i) => (
              <div key={i} style={{ flex: '1 1 250px', background: C.bgMain, padding: 24, border: `1px solid ${C.border}`, textAlign: 'center', borderRadius: 8 }}>
                 <div style={{ height: 120, borderRadius: 4, marginBottom: 16, overflow: 'hidden' }}><img src={v.img} alt={v.n} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                 <h4 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16, color: C.textDark, textTransform: 'uppercase', letterSpacing: '1px' }}>{v.n}</h4>
                 <button style={{ padding: '8px 16px', background: C.primary, color: '#000', fontWeight: 800, border: 'none', borderRadius: 2, cursor: 'pointer', letterSpacing: '1px', textTransform: 'uppercase' }}>Loot</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 14. MURO DE RESEÑAS */}
      <div style={{ background: C.bgImage, padding: '80px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 36, fontWeight: 800, textAlign: 'center', marginBottom: 64, letterSpacing: '1px', color: C.primary, textTransform: 'uppercase' }}>Hall Of Fame</h2>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { t: '"Los gatillos ultrasónicos cambian el meta por completo. He subido dos rangos esta semana."', auth: 'Jugador Esport' },
              { t: '"Jugar Genshin en ultra sin que mis manos suden porque el ventilador disipa todo el calor frontal es surrealista."', auth: 'Creador de Contenido' },
              { t: '"La pantalla es ridículamente rápida. El bypass charge me salva la vida en torneos locales que duran 8h."', auth: 'Competidor Mobile' }
            ].map((r, i) => (
              <div key={i} style={{ flex: '1 1 250px', background: C.bgMain, padding: 32, border: `1px solid ${C.border}`, borderRadius: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, background: C.bgImage, border: `1px solid ${C.primary}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={20} color={C.primary} /></div>
                  <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(s => <Star key={s} size={14} fill={C.star} color={C.star} />)}</div>
                </div>
                <p style={{ fontSize: 16, color: C.textDark, marginBottom: 16, lineHeight: 1.6, fontWeight: 500 }}>{r.t}</p>
                <span style={{ fontSize: 13, color: C.textSub, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>// {r.auth}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 15. FOOTER FUNCIONAL */}
      <footer style={{ background: C.bgMain, padding: '64px 24px 40px', paddingBottom: showSticky ? 120 : 40, borderTop: `2px solid ${C.primary}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', marginBottom: 48 }}>
            <div style={{ flex: '2 1 300px' }}>
               <h4 style={{ fontFamily: fontTitles, fontSize: 24, fontWeight: 800, marginBottom: 16, letterSpacing: '2px', color: C.primary }}>NEXUS // ROG</h4>
               <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.6, fontWeight: 500 }}>Equipamiento de grado torneo. Desarrollado en conjunto con jugadores top mundiales.</p>
            </div>
            <div style={{ flex: '1 1 150px' }}>
               <h5 style={{ fontSize: 14, fontWeight: 800, marginBottom: 16, color: C.textDark, textTransform: 'uppercase', letterSpacing: '1px' }}>Arsenal</h5>
               <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: C.textSub, lineHeight: 2.5, fontWeight: 500 }}><li>Smartphones</li><li>Accesorios</li><li>Software</li></ul>
            </div>
            <div style={{ flex: '1 1 150px' }}>
               <h5 style={{ fontSize: 14, fontWeight: 800, marginBottom: 16, color: C.textDark, textTransform: 'uppercase', letterSpacing: '1px' }}>Protocolos</h5>
               <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: C.textSub, lineHeight: 2.5, fontWeight: 500 }}><li>Soporte Técnico</li><li>Garantía</li><li>Comunidad</li></ul>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.textSub, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
             <span>© 2026 NEXUS ENTERTAINMENT.</span>
             <span>Privacidad | Términos</span>
          </div>
        </div>
      </footer>

      {/* STICKY ATC */}
      {showSticky && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: C.bgMain, borderTop: `2px solid ${C.primary}`, padding: '16px 24px', zIndex: 100, boxShadow: `0 -10px 40px rgba(0,255,102,0.1)` }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: C.primary, fontSize: 16, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>{ai?.enhancedTitle || product.title} - {fmtPrice(price)}</span>
            <button style={{ padding: '12px 32px', background: C.primary, color: '#000', fontSize: 15, fontWeight: 800, borderRadius: 4, border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', boxShadow: `0 0 15px ${C.primary}80` }}>Deploy to Cart</button>
          </div>
        </div>
      )}

    </div>
  );
}
