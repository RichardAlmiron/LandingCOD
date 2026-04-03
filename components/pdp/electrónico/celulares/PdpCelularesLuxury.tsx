'use client';
import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import {
  Menu, Search, ShoppingCart, User, Star, Truck, RotateCcw,
  ShieldCheck, Plus, Minus, Check, Cpu, BatteryFull, Shield,
  Wifi, ScanFace, Droplets, Zap, Heart, Package, PlayCircle, Gem
} from 'lucide-react';

interface PDPProps { data: StoreData; product: Product; variant?: number; }

const C = {
  bgMain: '#0F0F0F', bgWhite: '#1A1A1A', bgImage: '#262626',
  textDark: '#FFFFFF', textSub: '#A1A1AA', primary: '#D4AF37',
  border: '#333333', star: '#D4AF37'
};

const fontTitles = "Playfair Display, serif";
const fontSans = "Montserrat, sans-serif";

export default function PdpCelularesLuxury({ data, product }: PDPProps) {
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
          <span style={{ fontFamily: fontTitles, fontSize: 24, fontWeight: 700, letterSpacing: '0.1em' }}>{data.name || 'AURA EXECUTIVE'}</span>
          <div style={{ display: 'flex', gap: 16 }}><User size={20} /><Search size={20} /><ShoppingCart size={20} /></div>
        </div>
      </nav>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 24px 16px', fontSize: 13, color: C.textSub, fontWeight: 500, letterSpacing: '0.05em' }}>
        Celulares {'>'} Luxury {'>'} <span style={{ color: C.primary }}>{ai?.enhancedTitle || product.title}</span>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        
        {/* 1. HERO SECTION */}
        <div style={{ padding: '0 24px 48px', display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ background: C.bgImage, borderRadius: 0, padding: 40, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, border: `1px solid ${C.border}` }}>
              <img src={images[0]} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(212,175,55,0.1))' }} />
            </div>
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <h1 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 700, lineHeight: 1.2, marginBottom: 8, color: C.textDark, letterSpacing: '0.02em' }}>{ai?.enhancedTitle || product.title}</h1>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: C.primary, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Distinción sin Precedentes</h3>
            <p style={{ fontSize: 15, color: C.textSub, lineHeight: 1.6, marginBottom: 16 }}>{ai?.enhancedDescription || product.description || 'Una obra maestra de ingeniería revestida en oro rosado y zafiro. Para aquellos que no aceptan compromisos.'}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(i => <Star key={i} size={14} fill={C.star} color={C.star} />)}</div>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.textDark }}>4.9 / 5</span><span style={{ fontSize: 14, color: C.textSub }}>(Exclusivo Socios)</span>
            </div>
            <button style={{ width: '100%', padding: '16px', background: C.primary, color: '#000', fontSize: 16, fontWeight: 700, borderRadius: 0, border: 'none', cursor: 'pointer', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Adquirir Pieza - {fmtPrice(price)} {originalPrice > price && <span style={{ textDecoration: 'line-through', fontWeight: 400, marginLeft: 8, opacity: 0.7 }}>(Antes {fmtPrice(originalPrice)})</span>}
            </button>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '16px 0', marginBottom: 16 }}>
              <div style={{ textAlign: 'center', flex: 1 }}><Gem size={20} color={C.primary} style={{ margin: '0 auto 8px' }} /><div style={{ fontSize: 11, fontWeight: 600 }}>Corte Zafiro</div></div>
              <div style={{ textAlign: 'center', flex: 1 }}><ShieldCheck size={20} color={C.primary} style={{ margin: '0 auto 8px' }} /><div style={{ fontSize: 11, fontWeight: 600 }}>Servicio Concierge</div></div>
              <div style={{ textAlign: 'center', flex: 1 }}><Truck size={20} color={C.primary} style={{ margin: '0 auto 8px' }} /><div style={{ fontSize: 11, fontWeight: 600 }}>Envío Blindado</div></div>
            </div>
          </div>
        </div>

        {/* 3. AUTORIDAD */}
        <div style={{ padding: '0 24px 48px', textAlign: 'center', opacity: 0.6 }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24, color: C.primary }}>Aclamado por coleccionistas:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap', filter: 'grayscale(100%) opacity(0.8)' }}>
            {['VOGUE', 'GQ', 'ROBB REPORT', 'FORBES'].map(l => <span key={l} style={{ fontFamily: fontTitles, fontSize: 20, fontWeight: 700, letterSpacing: '0.1em' }}>{l}</span>)}
          </div>
        </div>
      </div>

      {/* 2. BENEFICIOS INMEDIATOS */}
      <div style={{ background: C.bgWhite, padding: '64px 24px', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48, letterSpacing: '0.05em' }}>El Privilegio del Poder.</h2>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { i: <Cpu />, t: 'Rendimiento Absoluto', d: 'Procesador quantico V12 exclusivo para nuestra línea Executive.' },
              { i: <Shield />, t: 'Privacidad Suiza', d: 'Encriptación militar para resguardar tus datos confidenciales.' },
              { i: <Gem />, t: 'Elegancia Imperecedera', d: 'Terminación a mano con inspección visual de 40 puntos.' }
            ].map((b, i) => (
              <div key={i} style={{ flex: '1 1 250px', background: C.bgMain, padding: 32, textAlign: 'center', borderRadius: 0, border: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>{React.cloneElement(b.i as any, { size: 32, color: C.primary, strokeWidth: 1.5 })}</div>
                <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, letterSpacing: '0.05em', color: C.textDark }}>{b.t}</h4>
                <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.6 }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. INGENIERÍA Y MATERIALES */}
      <div style={{ background: C.bgImage, padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
             <h2 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 700, letterSpacing: '0.05em', marginBottom: 16, color: C.primary }}>Artesanía sin igual.</h2>
             <p style={{ fontSize: 16, color: C.textDark, lineHeight: 1.8, marginBottom: 24 }}>Inspirado en la alta relojería, hemos fusionado cristal de zafiro irrayable con un chasis de cerámica pulida y acentos en oro líquido de 24 quilates incrustado a altas temperaturas. Este no es un teléfono, es una joya funcional.</p>
             <button style={{ padding: '12px 24px', border: `1px solid ${C.primary}`, background: 'transparent', color: C.primary, fontWeight: 600, borderRadius: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ver Artesanía</button>
          </div>
          <div style={{ flex: '1 1 400px', height: 300, borderRadius: 0, border: `1px solid ${C.primary}`, overflow: 'hidden' }}>
             <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" alt="Celular luxury detalle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>

      {/* 4. POR QUÉ USARLO */}
      <div style={{ background: C.bgWhite, padding: '64px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48, letterSpacing: '0.05em' }}>Herramientas del Éxito.</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            {[
               { i: <Wifi />, t: 'Red Global VIP:', d: 'Antenas de oro puro para recepción global garantizada.' },
               { i: <ScanFace />, t: 'Aura FaceTech:', d: 'Biometría infalible para proteger tu patrimonio.' },
               { i: <Droplets />, t: 'Estanqueidad Absoluta:', d: 'Resiste inmersión prolongada para tu yate o mansión.' }
            ].map((f, i) => (
              <div key={i} style={{ flex: '1 1 250px', textAlign: 'center' }}>
                <div style={{ marginBottom: 16 }}>{React.cloneElement(f.i as any, { size: 36, strokeWidth: 1, color: C.primary })}</div>
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: C.textDark, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.t}</h4>
                <p style={{ fontSize: 13, color: C.textSub, lineHeight: 1.6, margin: '0 auto', maxWidth: 220 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. TUTORIAL VISUAL (CÓMO USARLO) */}
      <div style={{ background: C.bgMain, padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48, letterSpacing: '0.05em' }}>Servicio de Guante Blanco.</h2>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { t: 'I. Recepción Protocolar', d: 'El dispositivo es entregado en maletín blindado por nuestro agente.', img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80' },
              { t: 'II. Migración Concierge', d: 'Asistencia 24/7 personal para transferir tus datos de forma segura.', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80' },
              { t: 'III. Dominio Absoluto', d: 'Tu vida digital, ahora encapsulada en la pieza más exclusiva.', img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80' }
            ].map((s, i) => (
              <div key={i} style={{ flex: '1 1 250px' }}>
                <div style={{ border: `1px solid ${C.border}`, borderRadius: 0, height: 200, overflow: 'hidden', marginBottom: 24 }}><img src={s.img} alt={s.t} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', color: C.primary }}>{s.t}</h4>
                <p style={{ fontSize: 13, color: C.textSub, lineHeight: 1.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. TABLA COMPARATIVA */}
      <div style={{ background: C.bgWhite, padding: '64px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48, letterSpacing: '0.05em' }}>Sin Competencia.</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ padding: '16px', borderBottom: `1px solid ${C.border}`, background: C.bgMain, color: C.primary }}></th>
                <th style={{ padding: '16px', borderBottom: `1px solid ${C.primary}`, background: C.bgImage, fontWeight: 700, color: C.primary }}>AURA Executive</th>
                <th style={{ padding: '16px', borderBottom: `1px solid ${C.border}`, background: '#111', fontWeight: 600, color: C.textSub }}>Línea Masiva Pro</th>
                <th style={{ padding: '16px', borderBottom: `1px solid ${C.border}`, background: '#111', fontWeight: 600, color: C.textSub }}>Modelos Comerciales</th>
              </tr>
            </thead>
            <tbody>
              {[
                { f: 'Construcción', c1: <Check size={20} color={C.primary} style={{ margin: '0 auto' }} />, c2: 'Titanio Simple', c3: 'Aluminio' },
                { f: 'Cristal Zafiro Sintético', c1: <Check size={20} color={C.primary} style={{ margin: '0 auto' }} />, c2: 'Vidrio Estándar', c3: 'Vidrio Estándar' },
                { f: 'Servicio Concierge 24/7', c1: <Check size={20} color={C.primary} style={{ margin: '0 auto' }} />, c2: 'No disponible', c3: 'Ninguno' },
                { f: 'Seguridad Financiera', c1: <Check size={20} color={C.primary} style={{ margin: '0 auto' }} />, c2: 'Estándar', c3: 'Básica' }
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '16px', textAlign: 'left', fontWeight: 600, borderBottom: `1px solid ${C.border}`, background: C.bgMain, color: C.textSub }}>{r.f}</td>
                  <td style={{ padding: '16px', borderBottom: `1px solid ${C.primary}`, background: '#1C1C1C' }}>{r.c1}</td>
                  <td style={{ padding: '16px', borderBottom: `1px solid ${C.border}`, background: '#0F0F0F' }}>{r.c2}</td>
                  <td style={{ padding: '16px', borderBottom: `1px solid ${C.border}`, background: '#0F0F0F' }}>{r.c3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 11. ESPECIFICACIONES TÉCNICAS */}
      <div style={{ background: C.bgMain, padding: '48px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 28, fontWeight: 700, marginBottom: 32, letterSpacing: '0.05em' }}>Ficha Técnica.</h2>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {[
               { t: 'Motor Quántico V12', c: 'Capacidad de encriptación end-to-end con 12 núcleos de cálculo dedicados exclusivamente a operar en frío masivo.' },
               { t: 'Panel Zafiro OLED', c: '120Hz adaptativos con pureza de negros inigualable. Recubrimiento anti-huellas de nanopartículas de oro.' },
               { t: 'Óptica Leica Platinum', c: 'Cámaras calibradas individualmente en Alemania. Rango dinámico infinito para fotografía documental nocturna.' }
            ].map((s, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setActiveSpec(activeSpec === i ? null : i)} style={{ width: '100%', padding: '24px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', color: C.textDark }}>
                  <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.05em', color: activeSpec === i ? C.primary : C.textDark }}>{s.t}</span>
                  {activeSpec === i ? <Minus size={20} color={C.primary} /> : <Plus size={20} color={C.textDark} />}
                </button>
                {activeSpec === i && <div style={{ paddingBottom: 24, fontSize: 15, color: C.textSub, lineHeight: 1.8 }}>{s.c}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 10. GARANTÍA Y CONFIANZA */}
      <div style={{ background: C.bgWhite, padding: '64px 24px', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 32, flexWrap: 'wrap', textAlign: 'center' }}>
          {[
            { t: 'Garantía Vitalicia', d: 'Servicio de reemplazo global inmediato ante accidentes.', i: <ShieldCheck /> },
            { t: 'Concierge Asignado', d: 'Asistencia personal humana en cualquier huso horario.', i: <User /> },
            { t: 'Valor de Retorno', d: 'Actualización a nuevos modelos preservando tu estatus.', i: <RotateCcw /> }
          ].map((g, i) => (
            <div key={i} style={{ flex: '1 1 250px' }}>
              <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>{React.cloneElement(g.i as any, { size: 40, color: C.primary, strokeWidth: 1 })}</div>
              <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{g.t}</h4>
              <p style={{ fontSize: 14, color: C.textSub }}>{g.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 8. PRUEBA SOCIAL DINÁMICA */}
      <div style={{ background: C.bgMain, padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48, letterSpacing: '0.05em' }}>Círculo Exclusivo.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { img: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&q=80', u: 'Socio #850' },
              { img: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80', u: 'Socio #851' },
              { img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80', u: 'Socio #852' },
              { img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80', u: 'Socio #853' }
            ].map((item, i) => (
               <div key={i} style={{ height: 300, border: `1px solid ${C.border}`, overflow: 'hidden', position: 'relative' }}>
                  <img src={item.img} alt={item.u} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                  <span style={{ position: 'absolute', bottom: 16, left: 16, color: C.primary, fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.u}</span>
               </div>
            ))}
          </div>
        </div>
      </div>

      {/* 9. MISIÓN DE MARCA */}
      <div style={{ background: C.bgWhite, padding: '80px 24px', textAlign: 'center', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Gem size={48} color={C.primary} strokeWidth={1} style={{ margin: '0 auto 24px' }} />
          <h2 style={{ fontFamily: fontTitles, fontSize: 36, fontWeight: 700, marginBottom: 24, letterSpacing: '0.05em', color: C.primary }}>Elevando el estándar global.</h2>
          <p style={{ fontSize: 18, color: C.textSub, lineHeight: 1.8 }}>Aura Executive no se rige por las tendencias del mercado masivo. Nuestra misión es preservar la alta relojería y trasladarla al mundo de las telecomunicaciones. Solo fabricamos 10,000 unidades anuales a nivel global.</p>
        </div>
      </div>

      {/* 12. PREGUNTAS FRECUENTES */}
      <div style={{ background: C.bgMain, padding: '64px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48, letterSpacing: '0.05em' }}>Dudas Exclusivas.</h2>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {[
              { q: '¿Cómo funciona el servicio de Concierge 24/7?', a: 'Presiona el botón zafiro lateral tres veces. Un agente humano se conectará en menos de 10 segundos para reservas, vuelos o soporte técnico en cualquier parte del mundo.' },
              { q: '¿Está cubierto el daño accidental de la cubierta?', a: 'Completamente. Recogemos y reemplazamos la unidad con el mismo número de serie grabado a láser en 24h.' },
              { q: '¿Puedo personalizar el gravado trasero de Oro 24K?', a: 'Al completar la orden, un representante le contactará para definir la tipografía y el blasón familiar a grabar sin coste extra.' }
            ].map((f, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button onClick={() => setActiveFAQ(activeFAQ === i ? null : i)} style={{ width: '100%', padding: '24px 0', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', color: C.textDark }}>
                  <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: '0.05em', color: activeFAQ === i ? C.primary : C.textDark }}>{f.q}</span>
                  {activeFAQ === i ? <Minus size={20} color={C.primary} /> : <Plus size={20} color={C.textDark} />}
                </button>
                {activeFAQ === i && <div style={{ paddingBottom: 24, fontSize: 15, color: C.textSub, lineHeight: 1.8 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 13. VENTA CRUZADA */}
      <div style={{ background: C.bgWhite, padding: '64px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 28, fontWeight: 700, marginBottom: 48, letterSpacing: '0.05em' }}>Adiciones Exclusivas:</h2>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { n: 'Funda de Piel de Caimán', img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80' },
              { n: 'Base de Carga en Mármol', img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80' },
              { n: 'Audífonos Aura Diamond', img: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80' }
            ].map((v, i) => (
              <div key={i} style={{ flex: '1 1 250px', background: C.bgMain, padding: 24, border: `1px solid ${C.border}`, textAlign: 'center' }}>
                 <div style={{ height: 120, border: `1px solid ${C.border}`, marginBottom: 16, overflow: 'hidden' }}><img src={v.img} alt={v.n} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                 <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: C.textDark, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{v.n}</h4>
                 <button style={{ padding: '8px 16px', background: 'transparent', color: C.primary, fontWeight: 600, border: `1px solid ${C.primary}`, cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Adquirir</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 14. MURO DE RESEÑAS */}
      <div style={{ background: C.bgImage, padding: '80px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontTitles, fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 64, letterSpacing: '0.05em', color: C.primary }}>Palabras y Estatus</h2>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { t: '"Es la primera vez que un teléfono iguala a mis relojes mecánicos en puro nivel de detalle y peso. Impresionante."', auth: 'Dueño de Corporación' },
              { t: '"El servicio de concierge me solucionó una reserva en Mónaco en dos minutos. La cámara graba de lujo."', auth: 'Inversor Privado' },
              { t: '"Su diseño impone un respeto inmediato en las juntas de negocios. Es simplemente distinto a todo."', auth: 'Arquitecto y Socio' }
            ].map((r, i) => (
              <div key={i} style={{ flex: '1 1 250px', background: C.bgMain, padding: 32, border: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, background: C.bgImage, border: `1px solid ${C.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={20} color={C.primary} /></div>
                  <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(s => <Star key={s} size={12} fill={C.star} color={C.star} />)}</div>
                </div>
                <p style={{ fontSize: 16, color: C.textDark, marginBottom: 16, lineHeight: 1.6, fontStyle: 'italic' }}>{r.t}</p>
                <span style={{ fontSize: 13, color: C.textSub, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>— {r.auth}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 15. FOOTER FUNCIONAL */}
      <footer style={{ background: C.bgMain, padding: '64px 24px 40px', paddingBottom: showSticky ? 120 : 40, borderTop: `1px solid ${C.primary}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', marginBottom: 48 }}>
            <div style={{ flex: '2 1 300px' }}>
               <h4 style={{ fontFamily: fontTitles, fontSize: 24, fontWeight: 700, marginBottom: 16, letterSpacing: '0.1em', color: C.primary }}>AURA GLOBAL</h4>
               <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.8 }}>Manufactura de precisión para los líderes del presente. Sede en Ginebra, Suiza.</p>
            </div>
            <div style={{ flex: '1 1 150px' }}>
               <h5 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: C.textDark, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Colección</h5>
               <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: C.textSub, lineHeight: 2.5 }}><li>Piezas Maestras</li><li>Ediciones Limitadas</li><li>Materiales</li></ul>
            </div>
            <div style={{ flex: '1 1 150px' }}>
               <h5 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: C.textDark, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Soporte</h5>
               <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: C.textSub, lineHeight: 2.5 }}><li>Portal Socios</li><li>Servicio Concierge</li><li>Boutiques Privadas</li></ul>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: C.textSub, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
             <span>© 2026 AURA EXECUTIVE. DERECHOS RESERVADOS.</span>
             <span>Privacidad | Términos de Servicio</span>
          </div>
        </div>
      </footer>

      {/* STICKY ATC */}
      {showSticky && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: C.bgMain, borderTop: `1px solid ${C.primary}`, padding: '16px 24px', zIndex: 100 }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: C.primary, fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{ai?.enhancedTitle || product.title} - {fmtPrice(price)}</span>
            <button style={{ padding: '12px 32px', background: C.primary, color: '#000', fontSize: 14, fontWeight: 700, borderRadius: 0, border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Proceder al Pago</button>
          </div>
        </div>
      )}

    </div>
  );
}
