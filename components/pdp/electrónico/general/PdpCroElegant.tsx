'use client';
import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import {
  Menu, Search, ShoppingCart, User, Star, Truck, RotateCcw,
  ShieldCheck, Plus, Minus, Check, Play, Heart, Share2, MessageCircle
} from 'lucide-react';

interface PDPProps { data: StoreData; product: Product; variant?: number; }

const C = {
  bgMain: '#FFF1F2', bgWhite: '#FFFFFF', bgAccent: '#FDF2F8',
  textDark: '#1F2937', textSub: '#6B7280', primary: '#EC4899',
  border: '#FCE7F3', star: '#F59E0B', accent: '#F472B6'
};

const fontSerif = "Georgia, serif";
const fontSans = "system-ui, sans-serif";

export default function PdpCroElegant({ data, product }: PDPProps) {
  const images = product.images?.length ? product.images : [product.imageUrl];
  const price = typeof product.price === 'number' ? product.price : parseFloat(String(product.price)) || 0;
  const originalPrice = typeof product.originalPrice === 'number' ? product.originalPrice : parseFloat(String(product.originalPrice)) || 0;
  const discount = originalPrice > price ? Math.round((1 - price / originalPrice) * 100) : 0;
  const stockLeft = Math.floor(Math.random() * 10) + 3;

  const [activeImg, setActiveImg] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const [activeSpec, setActiveSpec] = useState<number | null>(null);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { title: 'Envío Premium', desc: 'Entrega express' },
    { title: 'Garantía Total', desc: '2 años coverage' },
    { title: 'Devolución', desc: '30 días fácil' },
    { title: 'Atención', desc: 'Soporte 24/7' }
  ];

  const specs = [
    { title: 'Calidad Premium', content: 'Materiales de primera línea seleccionados' },
    { title: 'Diseño Exclusivo', content: 'Creado por diseñadores expertos' },
    { title: 'Empaque de Lujo', content: 'Presentado en caja exclusiva' },
    { title: 'Certificación', content: 'Producto 100% original' }
  ];

  const reviews = [
    { name: 'Isabella M.', rating: 5, comment: 'Exceeded all my expectations. Beautiful packaging too!', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    { name: 'Daniela S.', rating: 5, comment: 'The quality is outstanding. Will definitely buy again.', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
    { name: 'Valentina R.', rating: 5, comment: 'Absolutely love it! Best purchase this year.', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80' }
  ];

  const relatedProducts = [
    { name: 'Complemento Deluxe', price: 45, img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80' },
    { name: 'Accesorio Exclusive', price: 35, img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80' },
    { name: 'Set Premium', price: 59, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80' }
  ];

  return (
    <div style={{ background: C.bgMain, minHeight: '100vh', fontFamily: fontSans, color: C.textDark, overflowX: 'hidden' }}>
      
      {/* STICKY */}
      {showSticky && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(10px)', padding: '12px 24px', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 20px rgba(236,72,153,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={images[0]} alt="" style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 8 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{product.title}</div>
              <div style={{ fontSize: 15, color: C.primary, fontWeight: 700 }}>${price}</div>
            </div>
          </div>
          <button style={{ background: C.primary, color: 'white', border: 'none', padding: '10px 24px', borderRadius: 25, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Comprar Ahora
          </button>
        </div>
      )}

      {/* NAV */}
      <nav style={{ background: C.bgWhite, padding: '18px 24px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Menu size={24} color={C.textDark} />
          <span style={{ fontFamily: fontSerif, fontSize: 22, fontWeight: 600, letterSpacing: 1, color: C.primary }}>{data.name || 'BOUTIQUE'}</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <Search size={20} color={C.textDark} />
            <ShoppingCart size={20} color={C.textDark} />
            <User size={20} color={C.textDark} />
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        
        {/* Badge */}
        {stockLeft <= 8 && (
          <div style={{ background: C.primary, color: 'white', padding: '10px 20px', borderRadius: 25, display: 'inline-block', marginBottom: 32, fontWeight: 600, fontSize: 14 }}>
            ✨ Solo {stockLeft} disponibles
          </div>
        )}

        {/* HERO */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, marginBottom: 64 }}>
          <div>
            <div style={{ background: C.bgWhite, borderRadius: 24, aspectRatio: '1', overflow: 'hidden', marginBottom: 16, position: 'relative', boxShadow: '0 20px 60px rgba(236,72,153,0.15)' }}>
              <img src={images[activeImg]} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 40 }} />
              <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button onClick={() => setIsLiked(!isLiked)} style={{ width: 40, height: 40, borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                  <Heart size={18} color={isLiked ? C.primary : C.textSub} fill={isLiked ? C.primary : 'none'} />
                </button>
                <button style={{ width: 40, height: 40, borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                  <Share2 size={18} color={C.textSub} />
                </button>
              </div>
              {discount > 0 && (
                <div style={{ position: 'absolute', top: 16, left: 16, background: '#EF4444', color: 'white', padding: '8px 14px', borderRadius: 20, fontWeight: 700, fontSize: 14 }}>
                  -{discount}%
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
              {images.slice(0, 4).map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} style={{ width: 72, height: 72, borderRadius: 12, overflow: 'hidden', border: activeImg === i ? `3px solid ${C.primary}` : `3px solid transparent`, padding: 0, background: 'none', cursor: 'pointer', boxShadow: activeImg === i ? `0 4px 15px ${C.primary}40` : 'none' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 style={{ fontFamily: fontSerif, fontSize: 34, fontWeight: 600, lineHeight: 1.3, marginBottom: 16, color: C.textDark }}>{product.title}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(i => <Star key={i} size={16} fill={C.star} color={C.star} />)}</div>
              <span style={{ color: C.textSub, fontSize: 14 }}>4.9 (98 reseñas)</span>
              <span style={{ color: C.primary, fontSize: 14, cursor: 'pointer' }}>Ver todas</span>
            </div>

            <div style={{ marginBottom: 28 }}>
              <span style={{ fontSize: 40, fontWeight: 700, color: C.primary }}>${price}</span>
              {originalPrice > price && (
                <span style={{ fontSize: 22, color: C.textSub, textDecoration: 'line-through', marginLeft: 16 }}>${originalPrice}</span>
              )}
            </div>

            <button style={{ width: '100%', padding: '18px', background: C.primary, color: 'white', fontSize: 16, fontWeight: 600, borderRadius: 30, border: 'none', cursor: 'pointer', marginBottom: 24, boxShadow: '0 8px 30px rgba(236,72,153,0.4)' }}>
              ✨ Comprar Ahora
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
              {features.map((f, i) => (
                <div key={i} style={{ background: C.bgWhite, padding: 16, borderRadius: 14, display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${C.border}` }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.primary }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{f.title}</div>
                    <div style={{ color: C.textSub, fontSize: 12 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 28, justifyContent: 'center', paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
              <div style={{ textAlign: 'center' }}><Truck size={20} color={C.primary} /><div style={{ fontSize: 11, marginTop: 4, color: C.textSub }}>Envío</div></div>
              <div style={{ textAlign: 'center' }}><ShieldCheck size={20} color={C.primary} /><div style={{ fontSize: 11, marginTop: 4, color: C.textSub }}>Garantía</div></div>
              <div style={{ textAlign: 'center' }}><RotateCcw size={20} color={C.primary} /><div style={{ fontSize: 11, marginTop: 4, color: C.textSub }}>Devolución</div></div>
            </div>
          </div>
        </div>

        {/* VIDEO */}
        <div style={{ background: C.bgWhite, borderRadius: 24, padding: 56, marginBottom: 48, textAlign: 'center', boxShadow: '0 10px 40px rgba(236,72,153,0.1)' }}>
          <h2 style={{ fontFamily: fontSerif, fontSize: 28, fontWeight: 600, marginBottom: 12, color: C.primary }}>Descubre la Experiencia</h2>
          <p style={{ color: C.textSub, marginBottom: 32 }}>Una mirada más de cerca al producto</p>
          <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', aspectRatio: '16/9', background: '#FFF5F7' }}>
            <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 72, height: 72, borderRadius: '50%', background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 30px rgba(236,72,153,0.5)' }}>
              <Play size={28} color="white" fill="white" />
            </div>
          </div>
        </div>

        {/* REVIEWS */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: fontSerif, fontSize: 28, fontWeight: 600, marginBottom: 32, textAlign: 'center', color: C.textDark }}>Lo que dicen nuestras clientas</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {reviews.map((r, i) => (
              <div key={i} style={{ background: C.bgWhite, borderRadius: 20, padding: 24, boxShadow: '0 4px 20px rgba(236,72,153,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <img src={r.img} alt={r.name} style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${C.border}` }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                    <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(s => <Star key={s} size={12} fill={C.star} color={C.star} />)}</div>
                  </div>
                </div>
                <p style={{ color: C.textSub, fontSize: 14, lineHeight: 1.6, fontStyle: 'italic' }}>"{r.comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* SPECS */}
        <div style={{ background: C.bgWhite, borderRadius: 24, padding: 48, marginBottom: 48, boxShadow: '0 10px 40px rgba(236,72,153,0.08)' }}>
          <h2 style={{ fontFamily: fontSerif, fontSize: 28, fontWeight: 600, marginBottom: 28, textAlign: 'center' }}>Detalles del Producto</h2>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
            {specs.map((s, i) => (
              <div key={i} style={{ borderBottom: i < specs.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <button onClick={() => setActiveSpec(activeSpec === i ? null : i)} style={{ width: '100%', padding: '20px 24px', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', color: C.textDark }}>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{s.title}</span>
                  {activeSpec === i ? <Minus size={18} color={C.primary} /> : <Plus size={18} color={C.textSub} />}
                </button>
                {activeSpec === i && <div style={{ padding: '0 24px 20px', color: C.textSub, fontSize: 14, lineHeight: 1.6 }}>{s.content}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* COMPARISON */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: fontSerif, fontSize: 28, fontWeight: 600, marginBottom: 28, textAlign: 'center' }}>¿Por qué elegirnos?</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: 16, background: C.bgWhite, borderRadius: '16px 0 0 16px' }}></th>
                <th style={{ padding: 16, background: C.primary, color: 'white', fontWeight: 600, borderRadius: 16 }}>Nuestra Tienda</th>
                <th style={{ padding: 16, background: C.bgAccent, fontWeight: 600, borderRadius: '0 16px 16px 0' }}>Otros</th>
              </tr>
            </thead>
            <tbody>
              {[
                { f: 'Envío', c1: 'Express 24h', c2: '5-8 días' },
                { f: 'Garantía', c1: '2 años total', c2: '90 días' },
                { f: 'Atención', c1: 'Personalizada', c2: 'Automatizada' },
                { f: 'Calidad', c1: 'Premium', c2: 'Estándar' }
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: 16, background: C.bgWhite, fontWeight: 500 }}>{r.f}</td>
                  <td style={{ padding: 16, background: '#FDF2F8', color: C.primary, fontWeight: 600 }}>{r.c1}</td>
                  <td style={{ padding: 16, background: C.bgAccent, color: C.textSub }}>{r.c2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQ */}
        <div style={{ background: C.bgWhite, borderRadius: 24, padding: 48, marginBottom: 48, boxShadow: '0 10px 40px rgba(236,72,153,0.08)' }}>
          <h2 style={{ fontFamily: fontSerif, fontSize: 28, fontWeight: 600, marginBottom: 28, textAlign: 'center' }}>Preguntas Frecuentes</h2>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
            {[
              { q: '¿Cuánto tiempo de entrega?', a: 'Entrega express en 24-48 horas. Rastreo disponible en tiempo real.' },
              { q: '¿Qué incluye la garantía?', a: 'Cobertura completa por 2 años para cualquier defecto de fabricación.' },
              { q: '¿Cómo funciona la devolución?', a: '30 días para devolver sin costo. Contáctanos y te ayudamos.' }
            ].map((f, i) => (
              <div key={i} style={{ borderBottom: i < 2 ? `1px solid ${C.border}` : 'none' }}>
                <button onClick={() => setActiveFAQ(activeFAQ === i ? null : i)} style={{ width: '100%', padding: '20px 24px', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', color: C.textDark }}>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{f.q}</span>
                  {activeFAQ === i ? <Minus size={18} color={C.primary} /> : <Plus size={18} color={C.textSub} />}
                </button>
                {activeFAQ === i && <div style={{ padding: '0 24px 20px', color: C.textSub, fontSize: 14, lineHeight: 1.6 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* CROSS SELL */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: fontSerif, fontSize: 28, fontWeight: 600, marginBottom: 28 }}>Completa tu Look</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {relatedProducts.map((p, i) => (
              <div key={i} style={{ background: C.bgWhite, borderRadius: 20, padding: 20, textAlign: 'center', boxShadow: '0 4px 20px rgba(236,72,153,0.08)' }}>
                <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} />
                </div>
                <h4 style={{ fontWeight: 600, marginBottom: 8, fontSize: 15 }}>{p.name}</h4>
                <div style={{ fontSize: 20, fontWeight: 700, color: C.primary, marginBottom: 14 }}>${p.price}</div>
                <button style={{ width: '100%', padding: '12px', background: 'transparent', border: `2px solid ${C.primary}`, color: C.primary, borderRadius: 25, fontWeight: 600, cursor: 'pointer' }}>
                  Agregar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ background: C.bgWhite, borderRadius: 20, padding: 32, textAlign: 'center', boxShadow: '0 4px 20px rgba(236,72,153,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 20 }}>
            <a href="#" style={{ color: C.textSub, textDecoration: 'none', fontSize: 13 }}>Términos</a>
            <a href="#" style={{ color: C.textSub, textDecoration: 'none', fontSize: 13 }}>Privacidad</a>
            <a href="#" style={{ color: C.textSub, textDecoration: 'none', fontSize: 13 }}>Contacto</a>
          </div>
          <p style={{ color: C.textSub, fontSize: 12 }}>© 2024 {data.name || 'Boutique'}</p>
        </footer>
      </div>
    </div>
  );
}
