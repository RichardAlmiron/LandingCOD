'use client';
import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import {
  Menu, Search, ShoppingCart, User, Star, Truck, RotateCcw,
  ShieldCheck, Plus, Minus, Check, Zap, Heart, Play, ChevronDown,
  Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin
} from 'lucide-react';

interface PDPProps { data: StoreData; product: Product; variant?: number; }

const C = {
  bgMain: '#0F0F0F', bgWhite: '#1A1A1A', bgCard: '#222222',
  textDark: '#FFFFFF', textSub: '#A1A1AA', primary: '#F97316',
  border: '#333333', star: '#F97316', accent: '#FF6B00'
};

const fontDisplay = "Impact, Haettenschweiler, sans-serif";
const fontSans = "system-ui, sans-serif";

export default function PdpCroBold({ data, product }: PDPProps) {
  const images = product.images?.length ? product.images : [product.imageUrl];
  const price = typeof product.price === 'number' ? product.price : parseFloat(String(product.price)) || 0;
  const originalPrice = typeof product.originalPrice === 'number' ? product.originalPrice : parseFloat(String(product.originalPrice)) || 0;
  const discount = originalPrice > price ? Math.round((1 - price / originalPrice) * 100) : 0;
  const stockLeft = Math.floor(Math.random() * 20) + 8;

  const [activeImg, setActiveImg] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const [activeSpec, setActiveSpec] = useState<number | null>(null);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: '🚀', title: 'Envío Rápido', desc: '24-72 horas' },
    { icon: '🛡️', title: 'Garantía', desc: '2 años' },
    { icon: '↩️', title: 'Devolución', desc: '30 días' },
    { icon: '💬', title: 'Soporte', desc: '24/7' }
  ];

  const specs = [
    { title: 'Procesador', content: 'Octa-core 3.2GHz' },
    { title: 'Memoria RAM', content: '12GB' },
    { title: 'Almacenamiento', content: '256GB' },
    { title: 'Pantalla', content: 'AMOLED 6.7"' }
  ];

  const reviews = [
    { name: 'Juan D.', rating: 5, comment: "El mejor'achat que he hecho. Calidad premium.", img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    { name: 'Maria G.', rating: 5, comment: 'Entrega super rápida y producto exacto.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' }
  ];

  const relatedProducts = [
    { name: 'Case Pro', price: 25, img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80' },
    { name: 'Cable USB-C', price: 15, img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80' },
    { name: 'Auriculares', price: 49, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80' }
  ];

  return (
    <div style={{ background: C.bgMain, minHeight: '100vh', fontFamily: fontSans, color: C.textDark, overflowX: 'hidden' }}>
      
      {/* STICKY BAR */}
      {showSticky && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, background: 'rgba(26,26,26,0.95)', backdropFilter: 'blur(10px)', padding: '12px 24px', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src={images[0]} alt="" style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 6 }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: C.textSub }}>{product.title}</div>
              <div style={{ fontSize: 16, color: C.primary, fontWeight: 800 }}>${price}</div>
            </div>
          </div>
          <button style={{ background: C.primary, color: 'white', border: 'none', padding: '10px 28px', borderRadius: 6, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
            COMPRAR
          </button>
        </div>
      )}

      {/* NAV */}
      <nav style={{ background: C.bgWhite, padding: '14px 24px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Menu size={24} color={C.textDark} />
          <span style={{ fontFamily: fontDisplay, fontSize: 22, letterSpacing: 2 }}>{data.name || 'STORE'}</span>
          <div style={{ display: 'flex', gap: 16 }}>
            <Search size={20} color={C.textDark} />
            <ShoppingCart size={20} color={C.textDark} />
            <User size={20} color={C.textDark} />
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        
        {/* Badge Urgencia */}
        {stockLeft <= 15 && (
          <div style={{ background: C.primary, color: 'white', padding: '8px 16px', borderRadius: 4, display: 'inline-block', marginBottom: 24, fontWeight: 700, fontSize: 14, letterSpacing: 1 }}>
            ⚡ ÚLTIMAS {stockLeft} UNIDADES — ¡APURA!
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          
          {/* Galería */}
          <div>
            <div style={{ background: C.bgCard, borderRadius: 12, aspectRatio: '1', overflow: 'hidden', marginBottom: 16, position: 'relative' }}>
              <img src={images[activeImg]} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              {discount > 0 && (
                <div style={{ position: 'absolute', top: 16, right: 16, background: '#EF4444', color: 'white', padding: '8px 16px', borderRadius: 4, fontWeight: 800, fontSize: 18 }}>
                  -{discount}%
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {images.slice(0, 4).map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} style={{ width: 70, height: 70, borderRadius: 8, overflow: 'hidden', border: activeImg === i ? `2px solid ${C.primary}` : `2px solid ${C.border}`, padding: 0, background: 'none', cursor: 'pointer' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 style={{ fontFamily: fontDisplay, fontSize: 42, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 16, letterSpacing: 1 }}>{product.title}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(i => <Star key={i} size={18} fill={C.star} color={C.star} />)}</div>
              <span style={{ color: C.textSub, fontSize: 14 }}>4.9 (200+ reviews)</span>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: C.primary }}>${price}</span>
                {originalPrice > price && (
                  <span style={{ fontSize: 24, color: C.textSub, textDecoration: 'line-through' }}>${originalPrice}</span>
                )}
              </div>
              {originalPrice > price && (
                <div style={{ color: '#22C55E', fontSize: 14, marginTop: 4 }}>¡Ahorras ${originalPrice - price}!</div>
              )}
            </div>

            {/* Selector cantidad */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <span style={{ color: C.textSub }}>Cantidad:</span>
              <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${C.border}`, borderRadius: 8 }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: 40, height: 40, border: 'none', background: 'none', color: C.textDark, cursor: 'pointer', fontSize: 20 }}>-</button>
                <span style={{ width: 40, textAlign: 'center', fontWeight: 600 }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} style={{ width: 40, height: 40, border: 'none', background: 'none', color: C.textDark, cursor: 'pointer', fontSize: 20 }}>+</button>
              </div>
            </div>

            {/* CTA */}
            <button style={{ width: '100%', padding: '20px', background: C.primary, color: 'white', fontSize: 20, fontWeight: 800, borderRadius: 8, border: 'none', cursor: 'pointer', marginBottom: 24, textTransform: 'uppercase', letterSpacing: 2, boxShadow: '0 0 30px rgba(249,115,22,0.4)' }}>
              🛒 COMPRAR AHORA
            </button>

            {/* Features Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {features.map((f, i) => (
                <div key={i} style={{ background: C.bgCard, padding: 16, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 24 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{f.title}</div>
                    <div style={{ color: C.textSub, fontSize: 12 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust */}
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', padding: 16, borderTop: `1px solid ${C.border}` }}>
              <div style={{ textAlign: 'center' }}><Truck size={20} color={C.primary} /><div style={{ fontSize: 11, marginTop: 4, color: C.textSub }}>Envío Gratis</div></div>
              <div style={{ textAlign: 'center' }}><ShieldCheck size={20} color={C.primary} /><div style={{ fontSize: 11, marginTop: 4, color: C.textSub }}>Garantía</div></div>
              <div style={{ textAlign: 'center' }}><RotateCcw size={20} color={C.primary} /><div style={{ fontSize: 11, marginTop: 4, color: C.textSub }}>30 Días</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* VIDEO SECTION */}
      <div style={{ background: C.bgWhite, padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontDisplay, fontSize: 36, letterSpacing: 2, marginBottom: 16 }}>MIRA EL UNBOXING</h2>
          <p style={{ color: C.textSub, marginBottom: 32 }}>Descubre qué hay dentro de la caja</p>
          <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '16/9', background: '#000' }}>
            <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 80, height: 80, borderRadius: '50%', background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Play size={36} color="white" fill="white" />
            </div>
          </div>
        </div>
      </div>

      {/* SOCIAL PROOF */}
      <div style={{ padding: '80px 24px' }}>
        <h2 style={{ fontFamily: fontDisplay, fontSize: 36, textAlign: 'center', letterSpacing: 2, marginBottom: 48 }}>CLIENTES FELICES</h2>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {reviews.map((r, i) => (
            <div key={i} style={{ background: C.bgCard, padding: 24, borderRadius: 12, border: `1px solid ${C.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <img src={r.img} alt={r.name} style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700 }}>{r.name}</div>
                  <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(s => <Star key={s} size={12} fill={C.star} color={C.star} />)}</div>
                </div>
              </div>
              <p style={{ color: C.textSub, fontSize: 14, lineHeight: 1.6 }}>"{r.comment}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* SPECS */}
      <div style={{ background: C.bgWhite, padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontDisplay, fontSize: 36, letterSpacing: 2, marginBottom: 32, textAlign: 'center' }}>ESPECIFICACIONES</h2>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 12 }}>
            {specs.map((s, i) => (
              <div key={i} style={{ borderBottom: i < specs.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <button onClick={() => setActiveSpec(activeSpec === i ? null : i)} style={{ width: '100%', padding: '20px', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', color: C.textDark }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{s.title}</span>
                  {activeSpec === i ? <Minus size={20} color={C.primary} /> : <Plus size={20} color={C.textSub} />}
                </button>
                {activeSpec === i && <div style={{ padding: '0 20px 20px', color: C.textSub }}>{s.content}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMPARISON */}
      <div style={{ padding: '80px 24px' }}>
        <h2 style={{ fontFamily: fontDisplay, fontSize: 36, letterSpacing: 2, marginBottom: 32, textAlign: 'center' }}>¿POR QUÉ NOSOTROS?</h2>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: 16, background: C.bgWhite, borderRadius: '8px 0 0 8px' }}></th>
                <th style={{ padding: 16, background: C.primary, color: 'white', fontWeight: 800, borderRadius: 8 }}>NUESTRO PRODUCTO</th>
                <th style={{ padding: 16, background: C.bgCard, fontWeight: 600, borderRadius: '0 8px 8px 0' }}>OTROS</th>
              </tr>
            </thead>
            <tbody>
              {[
                { f: 'Envío', c1: 'Gratis 24h', c2: '5-10 días' },
                { f: 'Garantía', c1: '2 años', c2: '90 días' },
                { f: 'Soporte', c1: '24/7', c2: 'Email' },
                { f: 'Calidad', c1: 'Premium', c2: 'Estándar' }
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: 16, background: C.bgWhite, fontWeight: 500 }}>{r.f}</td>
                  <td style={{ padding: 16, background: C.bgCard, color: C.primary, fontWeight: 700 }}>{r.c1}</td>
                  <td style={{ padding: 16, background: C.bgCard, color: C.textSub }}>{r.c2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: C.bgWhite, padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: fontDisplay, fontSize: 36, letterSpacing: 2, marginBottom: 32, textAlign: 'center' }}>PREGUNTAS</h2>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 12 }}>
            {[
              { q: '¿Cuánto tarda en llegar?', a: 'Envío express 24-72 horas hábiles. Rastrea tu pedido en tiempo real.' },
              { q: '¿Tiene garantía?', a: 'Sí, 2 años de garantía total. Cubrimos cualquier defecto de fábrica.' },
              { q: '¿Puedo devolverlo?', a: '30 días para devolución sin costo. Solo contáctanos y te ayudamos.' }
            ].map((f, i) => (
              <div key={i} style={{ borderBottom: i < 2 ? `1px solid ${C.border}` : 'none' }}>
                <button onClick={() => setActiveFAQ(activeFAQ === i ? null : i)} style={{ width: '100%', padding: '20px', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', color: C.textDark }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{f.q}</span>
                  {activeFAQ === i ? <Minus size={20} color={C.primary} /> : <Plus size={20} color={C.textSub} />}
                </button>
                {activeFAQ === i && <div style={{ padding: '0 20px 20px', color: C.textSub, lineHeight: 1.6 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CROSS SELL */}
      <div style={{ padding: '80px 24px' }}>
        <h2 style={{ fontFamily: fontDisplay, fontSize: 36, letterSpacing: 2, marginBottom: 32 }}>COMPLETA TU SET</h2>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {relatedProducts.map((p, i) => (
            <div key={i} style={{ background: C.bgCard, borderRadius: 12, padding: 20, textAlign: 'center', border: `1px solid ${C.border}` }}>
              <div style={{ borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
                <img src={p.img} alt={p.name} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} />
              </div>
              <h4 style={{ fontWeight: 700, marginBottom: 8 }}>{p.name}</h4>
              <div style={{ fontSize: 20, fontWeight: 800, color: C.primary, marginBottom: 12 }}>${p.price}</div>
              <button style={{ width: '100%', padding: '10px', background: 'transparent', border: `1px solid ${C.primary}`, color: C.primary, borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}>
                AGREGAR
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: C.bgWhite, padding: '48px 24px', textAlign: 'center', borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 24 }}>
          <a href="#" style={{ color: C.textSub, textDecoration: 'none', fontSize: 13 }}>Términos</a>
          <a href="#" style={{ color: C.textSub, textDecoration: 'none', fontSize: 13 }}>Privacidad</a>
          <a href="#" style={{ color: C.textSub, textDecoration: 'none', fontSize: 13 }}>Contacto</a>
        </div>
        <p style={{ color: C.textSub, fontSize: 12 }}>© 2024 {data.name || 'Tienda'}</p>
      </footer>
    </div>
  );
}
