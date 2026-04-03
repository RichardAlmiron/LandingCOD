'use client';
import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import {
  Menu, Search, ShoppingCart, User, Star, Truck, RotateCcw,
  ShieldCheck, Plus, Minus, Check, Play, ArrowRight, Mail, Phone
} from 'lucide-react';

interface PDPProps { data: StoreData; product: Product; variant?: number; }

const C = {
  bgMain: '#FAFAFA', bgWhite: '#FFFFFF', bgGray: '#F5F5F5',
  textDark: '#1A1A1A', textSub: '#71717A', primary: '#18181B',
  border: '#E4E4E7', star: '#FBBF24'
};

const fontSans = "system-ui, -apple-system, BlinkMacSystemFont, sans-serif";

export default function PdpCroMinimal({ data, product }: PDPProps) {
  const images = product.images?.length ? product.images : [product.imageUrl];
  const price = typeof product.price === 'number' ? product.price : parseFloat(String(product.price)) || 0;
  const originalPrice = typeof product.originalPrice === 'number' ? product.originalPrice : parseFloat(String(product.originalPrice)) || 0;
  const discount = originalPrice > price ? Math.round((1 - price / originalPrice) * 100) : 0;
  const stockLeft = Math.floor(Math.random() * 12) + 3;

  const [activeImg, setActiveImg] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const [activeSpec, setActiveSpec] = useState<number | null>(null);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { title: 'Envío gratis', desc: '24-48 horas' },
    { title: 'Garantía', desc: '2 años total' },
    { title: 'Devolución', desc: '30 días' },
    { title: 'Soporte', desc: '24/7' }
  ];

  const specs = [
    { title: 'Dimensiones', content: '14.5 x 7.2 x 0.75 cm' },
    { title: 'Peso', content: '168g' },
    { title: 'Batería', content: '4500mAh' },
    { title: 'Pantalla', content: 'OLED 6.5"' }
  ];

  const reviews = [
    { name: 'Sofia R.', rating: 5, comment: 'Simplemente perfecto. Muy satisfecho con la compra.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    { name: 'Miguel T.', rating: 5, comment: 'Calidad de construcción excelente. Recomendado 100%.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    { name: 'Laura K.', rating: 4, comment: 'Buen producto, entrega rápida.', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' }
  ];

  const relatedProducts = [
    { name: 'Accesorio Essential', price: 19, img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80' },
    { name: ' protector', price: 15, img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80' },
    { name: 'Cargador', price: 22, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80' }
  ];

  return (
    <div style={{ background: C.bgMain, minHeight: '100vh', fontFamily: fontSans, color: C.textDark }}>
      
      {/* STICKY */}
      {showSticky && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, background: C.bgWhite, padding: '12px 24px', zIndex: 1000, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={images[0]} alt="" style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 4 }} />
            <span style={{ fontSize: 14, fontWeight: 500 }}>{product.title}</span>
          </div>
          <button style={{ background: C.primary, color: 'white', border: 'none', padding: '8px 20px', borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Comprar — ${price}
          </button>
        </div>
      )}

      {/* NAV */}
      <nav style={{ background: C.bgWhite, padding: '16px 24px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Menu size={22} />
          <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em' }}>{data.name || 'TIENDA'}</span>
          <div style={{ display: 'flex', gap: 16 }}>
            <Search size={20} />
            <ShoppingCart size={20} />
            <User size={20} />
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 64px' }}>
        
        {/* HERO */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 64 }}>
          <div>
            <div style={{ background: C.bgWhite, borderRadius: 16, aspectRatio: '1', overflow: 'hidden', marginBottom: 16, position: 'relative' }}>
              <img src={images[activeImg]} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 24 }} />
              {stockLeft <= 10 && (
                <div style={{ position: 'absolute', bottom: 16, left: 16, background: '#EF4444', color: 'white', padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                  Solo quedan {stockLeft}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {images.slice(0, 4).map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} style={{ width: 64, height: 64, borderRadius: 8, overflow: 'hidden', border: activeImg === i ? `2px solid ${C.primary}` : `2px solid ${C.border}`, padding: 0, background: 'none', cursor: 'pointer' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.3, marginBottom: 16 }}>{product.title}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(i => <Star key={i} size={14} fill={C.star} color={C.star} />)}</div>
              <span style={{ fontSize: 13, color: C.textSub }}>4.8 (89 reseñas)</span>
            </div>

            <div style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 32, fontWeight: 700 }}>${price}</span>
              {originalPrice > price && (
                <span style={{ fontSize: 18, color: C.textSub, textDecoration: 'line-through', marginLeft: 12 }}>${originalPrice}</span>
              )}
            </div>

            <button style={{ width: '100%', padding: '16px', background: C.primary, color: 'white', fontSize: 15, fontWeight: 600, borderRadius: 8, border: 'none', cursor: 'pointer', marginBottom: 24 }}>
              Comprar ahora
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.textSub }}>
                  <Check size={14} color={C.primary} />
                  {f.title}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 20, justifyContent: 'center', paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
              <Truck size={18} color={C.textSub} />
              <ShieldCheck size={18} color={C.textSub} />
              <RotateCcw size={18} color={C.textSub} />
            </div>
          </div>
        </div>

        {/* VIDEO */}
        <div style={{ background: C.bgWhite, borderRadius: 16, padding: 48, marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>Ver en acción</h2>
          <p style={{ color: C.textSub, marginBottom: 24, textAlign: 'center', fontSize: 14 }}>Descubre todas las características</p>
          <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '16/9', background: '#000' }}>
            <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 60, height: 60, borderRadius: '50%', background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Play size={24} color="white" fill="white" />
            </div>
          </div>
        </div>

        {/* REVIEWS */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>Reseñas</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {reviews.map((r, i) => (
              <div key={i} style={{ background: C.bgWhite, borderRadius: 12, padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <img src={r.img} alt={r.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14 }}>{r.name}</div>
                    <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(s => <Star key={s} size={10} fill={C.star} color={C.star} />)}</div>
                  </div>
                </div>
                <p style={{ color: C.textSub, fontSize: 13, lineHeight: 1.5 }}>{r.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SPECS */}
        <div style={{ background: C.bgWhite, borderRadius: 16, padding: 32, marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 20 }}>Especificaciones</h2>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 8 }}>
            {specs.map((s, i) => (
              <div key={i} style={{ borderBottom: i < specs.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <button onClick={() => setActiveSpec(activeSpec === i ? null : i)} style={{ width: '100%', padding: '16px 20px', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <span style={{ fontWeight: 500, fontSize: 14 }}>{s.title}</span>
                  {activeSpec === i ? <Minus size={16} /> : <Plus size={16} />}
                </button>
                {activeSpec === i && <div style={{ padding: '0 20px 16px', color: C.textSub, fontSize: 13 }}>{s.content}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* COMPARISON */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 20, textAlign: 'center' }}>¿Por qué elegirnos?</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: 12 }}></th>
                <th style={{ padding: 12, background: C.primary, color: 'white', borderRadius: '8px 0 0 8px' }}>Nosotros</th>
                <th style={{ padding: 12, background: C.bgGray, borderRadius: '0 8px 8px 0' }}>Otros</th>
              </tr>
            </thead>
            <tbody>
              {[
                { f: 'Envío', c1: 'Gratis 24h', c2: '5-8 días' },
                { f: 'Garantía', c1: '2 años', c2: '90 días' },
                { f: 'Devolución', c1: '30 días', c2: '7 días' }
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: 12, background: C.bgWhite, fontWeight: 500, fontSize: 14 }}>{r.f}</td>
                  <td style={{ padding: 12, background: '#F0FDF4', fontSize: 14 }}>{r.c1}</td>
                  <td style={{ padding: 12, background: C.bgGray, fontSize: 14, color: C.textSub }}>{r.c2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQ */}
        <div style={{ background: C.bgWhite, borderRadius: 16, padding: 32, marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 20 }}>Preguntas frecuentes</h2>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 8 }}>
            {[
              { q: '¿Cuánto tarda el envío?', a: '24-48 horas hábiles. Envío gratis en todos los pedidos.' },
              { q: '¿Tiene garantía?', a: 'Sí, 2 años de garantía total por defectos de fabricación.' },
              { q: '¿Puedo devolverlo?', a: '30 días para devolución sin costo. Contáctanos para ayudarte.' }
            ].map((f, i) => (
              <div key={i} style={{ borderBottom: i < 2 ? `1px solid ${C.border}` : 'none' }}>
                <button onClick={() => setActiveFAQ(activeFAQ === i ? null : i)} style={{ width: '100%', padding: '16px 20px', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <span style={{ fontWeight: 500, fontSize: 14 }}>{f.q}</span>
                  {activeFAQ === i ? <Minus size={16} /> : <Plus size={16} />}
                </button>
                {activeFAQ === i && <div style={{ padding: '0 20px 16px', color: C.textSub, fontSize: 13, lineHeight: 1.5 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* CROSS SELL */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 20 }}>También te puede gustar</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {relatedProducts.map((p, i) => (
              <div key={i} style={{ background: C.bgWhite, borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={{ borderRadius: 8, overflow: 'hidden', marginBottom: 12 }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} />
                </div>
                <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>${p.price}</div>
                <button style={{ padding: '8px 16px', background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>
                  Agregar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ background: C.bgWhite, borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 16 }}>
            <a href="#" style={{ color: C.textSub, textDecoration: 'none', fontSize: 13 }}>Términos</a>
            <a href="#" style={{ color: C.textSub, textDecoration: 'none', fontSize: 13 }}>Privacidad</a>
            <a href="#" style={{ color: C.textSub, textDecoration: 'none', fontSize: 13 }}>Contacto</a>
          </div>
          <p style={{ color: C.textSub, fontSize: 12 }}>© 2024 {data.name || 'Tienda'}</p>
        </div>
      </div>
    </div>
  );
}
