'use client';
import React, { useState, useEffect, useRef } from 'react';
import { StoreData, Product } from '@/lib/types';
import {
  Menu, Search, ShoppingCart, User, Star, Truck, RotateCcw,
  ShieldCheck, Plus, Minus, Check, Zap, Heart, Play, ChevronRight,
  CreditCard, Lock, Award, ThumbsUp, MessageCircle, Eye, ShoppingBag
} from 'lucide-react';

interface PDPProps { data: StoreData; product: Product; variant?: number; }

const C = {
  bgMain: '#FAFAFA', bgWhite: '#FFFFFF', bgAccent: '#F0FDF4',
  textDark: '#111827', textSub: '#6B7280', primary: '#16A34A',
  border: '#E5E7EB', star: '#F59E0B', accentLight: '#DCFCE7'
};

const fontSans = "system-ui, -apple-system, sans-serif";

export default function PdpCroVisual({ data, product }: PDPProps) {
  const images = product.images?.length ? product.images : [product.imageUrl];
  const price = typeof product.price === 'number' ? product.price : parseFloat(String(product.price)) || 0;
  const originalPrice = typeof product.originalPrice === 'number' ? product.originalPrice : parseFloat(String(product.originalPrice)) || 0;
  const discount = originalPrice > price ? Math.round((1 - price / originalPrice) * 100) : 0;
  const stockLeft = Math.floor(Math.random() * 15) + 5;

  const [activeImg, setActiveImg] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const [activeSpec, setActiveSpec] = useState<number | null>(null);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const reviews = [
    { name: 'Carlos M.', rating: 5, comment: 'Excelente producto, llegó antes de lo esperado.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    { name: 'Ana L.', rating: 5, comment: 'La calidad es increíble, muy recomendada.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    { name: 'Roberto P.', rating: 4, comment: 'Buena relación precio-calidad.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' }
  ];

  const specs = [
    { title: 'Dimensiones', content: '15.6 x 7.6 x 0.8 cm' },
    { title: 'Peso', content: '185g' },
    { title: 'Batería', content: '5000mAh' },
    { title: 'Conectividad', content: '5G, WiFi 6, Bluetooth 5.3' }
  ];

  const features = [
    'Envío gratis en 24-48h',
    'Garantía de 2 años',
    'Devolución en 30 días',
    'Soporte técnico 24/7'
  ];

  const relatedProducts = [
    { name: 'Accesorio Premium', price: 29.99, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80' },
    { name: 'Funda Protectora', price: 19.99, img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80' },
    { name: 'Cargador Rápido', price: 24.99, img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80' }
  ];

  return (
    <div style={{ background: C.bgMain, minHeight: '100vh', fontFamily: fontSans, color: C.textDark, overflowX: 'hidden' }}>
      
      {/* STICKY BAR */}
      {showSticky && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, background: C.bgWhite, padding: '12px 24px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src={images[0]} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 8 }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{product.title}</div>
              <div style={{ fontSize: 14, color: C.primary, fontWeight: 700 }}>${price.toLocaleString()}</div>
            </div>
          </div>
          <button style={{ background: C.primary, color: 'white', border: 'none', padding: '10px 24px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
            Comprar Ahora
          </button>
        </div>
      )}

      {/* NAV */}
      <nav style={{ background: C.bgWhite, padding: '16px 24px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Menu size={24} />
            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>{data.name || 'TIENDA'}</span>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <Search size={20} style={{ cursor: 'pointer' }} />
            <ShoppingCart size={20} style={{ cursor: 'pointer' }} />
            <User size={20} style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </nav>

      {/* BREADCRUMB */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px', fontSize: 13, color: C.textSub }}>
        Inicio / {product.category || 'Productos'} / <span style={{ color: C.primary }}>{product.title}</span>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 48px' }}>
        
        {/* 1. HERO CON GALERÍA */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 64 }}>
          {/* Galería */}
          <div>
            <div 
              style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', background: C.bgWhite, aspectRatio: '1', cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
              onClick={() => setIsZoomed(!isZoomed)}
              onMouseMove={handleMouseMove}
            >
              <img 
                src={images[activeImg]} 
                alt={product.title}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: isZoomed ? 'cover' : 'contain',
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: isZoomed ? 'scale(2)' : 'scale(1)',
                  transition: 'transform 0.3s ease'
                }} 
              />
              {stockLeft <= 10 && (
                <div style={{ position: 'absolute', top: 16, left: 16, background: '#EF4444', color: 'white', padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                  ⚠️ Solo quedan {stockLeft} unidades
                </div>
              )}
            </div>
            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              {images.slice(0, 4).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  style={{ 
                    width: 80, height: 80, borderRadius: 12, overflow: 'hidden', border: activeImg === i ? `2px solid ${C.primary}` : `2px solid ${C.border}`, 
                    padding: 0, background: 'none', cursor: 'pointer'
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Info Producto */}
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginBottom: 12, letterSpacing: '-0.02em' }}>{product.title}</h1>
            
            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(i => <Star key={i} size={16} fill={C.star} color={C.star} />)}</div>
              <span style={{ fontSize: 14, color: C.textSub }}>4.8 (124 reseñas)</span>
            </div>

            {/* Precio */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontSize: 36, fontWeight: 800, color: C.primary }}>${price.toLocaleString()}</span>
                {originalPrice > price && (
                  <>
                    <span style={{ fontSize: 20, color: C.textSub, textDecoration: 'line-through' }}>${originalPrice.toLocaleString()}</span>
                    <span style={{ background: '#FEE2E2', color: '#DC2626', padding: '4px 10px', borderRadius: 20, fontSize: 14, fontWeight: 600 }}>-{discount}%</span>
                  </>
                )}
              </div>
            </div>

            {/* CTA Principal */}
            <button style={{ width: '100%', padding: '18px', background: C.primary, color: 'white', fontSize: 18, fontWeight: 700, borderRadius: 12, border: 'none', cursor: 'pointer', marginBottom: 16, boxShadow: '0 4px 14px rgba(22,163,74,0.4)' }}>
              🛒 Comprar Ahora
            </button>

            {/* Beneficios Icons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {features.slice(0, 4).map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.textSub }}>
                  <Check size={16} color={C.primary} />
                  {f}
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div style={{ display: 'flex', gap: 24, padding: 20, background: C.bgAccent, borderRadius: 12, justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}><Lock size={24} color={C.primary} /><div style={{ fontSize: 11, marginTop: 4 }}>Pago Seguro</div></div>
              <div style={{ textAlign: 'center' }}><Truck size={24} color={C.primary} /><div style={{ fontSize: 11, marginTop: 4 }}>Envío Gratis</div></div>
              <div style={{ textAlign: 'center' }}><ShieldCheck size={24} color={C.primary} /><div style={{ fontSize: 11, marginTop: 4 }}>Garantía</div></div>
              <div style={{ textAlign: 'center' }}><RotateCcw size={24} color={C.primary} /><div style={{ fontSize: 11, marginTop: 4 }}>30 Días</div></div>
            </div>
          </div>
        </div>

        {/* 2. VIDEO DEMO */}
        <div style={{ background: C.bgWhite, borderRadius: 16, padding: 48, marginBottom: 48, textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Mira el producto en acción</h2>
          <p style={{ color: C.textSub, marginBottom: 24 }}>Descubre todas las características en nuestro video</p>
          <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '16/9', background: '#000', maxWidth: 800, margin: '0 auto' }}>
            <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" alt="Video thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
            <button onClick={() => setShowVideo(true)} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 80, height: 80, borderRadius: '50%', background: C.primary, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Play size={32} color="white" fill="white" />
            </button>
          </div>
        </div>

        {/* 3. PRUEBA SOCIAL */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, textAlign: 'center' }}>Lo que dicen nuestros clientes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {reviews.map((r, i) => (
              <div key={i} style={{ background: C.bgWhite, borderRadius: 16, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <img src={r.img} alt={r.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>{r.name}</div>
                    <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(s => <Star key={s} size={12} fill={C.star} color={C.star} />)}</div>
                  </div>
                </div>
                <p style={{ color: C.textSub, fontSize: 14, lineHeight: 1.6 }}>"{r.comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. ESPECIFICACIONES */}
        <div style={{ background: C.bgWhite, borderRadius: 16, padding: 48, marginBottom: 48 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32 }}>Especificaciones Técnicas</h2>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
            {specs.map((s, i) => (
              <div key={i} style={{ borderBottom: i < specs.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <button onClick={() => setActiveSpec(activeSpec === i ? null : i)} style={{ width: '100%', padding: '20px 24px', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontWeight: 600, fontSize: 16 }}>{s.title}</span>
                  {activeSpec === i ? <Minus size={20} color={C.primary} /> : <Plus size={20} color={C.textSub} />}
                </button>
                {activeSpec === i && <div style={{ padding: '0 24px 20px', color: C.textSub, fontSize: 15 }}>{s.content}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* 5. GARANTÍAS */}
        <div style={{ background: C.bgAccent, borderRadius: 16, padding: 48, marginBottom: 48 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, textAlign: 'center' }}>¿Por qué confiar en nosotros?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { icon: <ShieldCheck size={40} />, title: 'Garantía de 2 Años', desc: 'Cobertura total para defectos de fabricación' },
              { icon: <Truck size={40} />, title: 'Envío Express', desc: 'Entrega en 24-48 horas sin costo adicional' },
              { icon: <RotateCcw size={40} />, title: 'Devolución Fácil', desc: '30 días para devolver sin preguntas' }
            ].map((g, i) => (
              <div key={i} style={{ textAlign: 'center', background: C.bgWhite, padding: 32, borderRadius: 16 }}>
                <div style={{ color: C.primary, marginBottom: 16 }}>{g.icon}</div>
                <h4 style={{ fontWeight: 700, marginBottom: 8 }}>{g.title}</h4>
                <p style={{ color: C.textSub, fontSize: 14 }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. COMPARATIVA */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, textAlign: 'center' }}>¿Por qué elegirnos?</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead>
              <tr>
                <th style={{ padding: 16, background: C.bgWhite, borderRadius: '12px 0 0 12px' }}></th>
                <th style={{ padding: 20, background: C.primary, color: 'white', fontWeight: 700, borderRadius: 12 }}>Nosotros</th>
                <th style={{ padding: 16, background: '#F3F4F6', fontWeight: 600 }}>Competencia</th>
                <th style={{ padding: 16, background: '#F3F4F6', fontWeight: 600, borderRadius: '0 12px 12px 0' }}>Otros</th>
              </tr>
            </thead>
            <tbody>
              {[
                { f: 'Envío gratis', c1: <Check size={20} color={C.primary} />, c2: 'No', c3: 'A partir de $50' },
                { f: 'Garantía', c1: <Check size={20} color={C.primary} />, c2: '90 días', c3: '1 año' },
                { f: 'Soporte 24/7', c1: <Check size={20} color={C.primary} />, c2: 'No', c3: 'Solo email' },
                { f: 'Devolución', c1: <Check size={20} color={C.primary} />, c2: '14 días', c3: '7 días' }
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: 16, background: C.bgWhite, fontWeight: 500 }}>{r.f}</td>
                  <td style={{ padding: 16, background: '#DCFCE7' }}>{r.c1}</td>
                  <td style={{ padding: 16, background: '#F3F4F6' }}>{r.c2}</td>
                  <td style={{ padding: 16, background: '#F3F4F6' }}>{r.c3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 7. FAQ */}
        <div style={{ background: C.bgWhite, borderRadius: 16, padding: 48, marginBottom: 48 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, textAlign: 'center' }}>Preguntas Frecuentes</h2>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
            {[
              { q: '¿Cuánto tiempo dura el envío?', a: 'El envío estándar toma 24-48 horas hábiles. Envío express disponible por un costo adicional.' },
              { q: '¿Qué incluye la garantía?', a: 'La garantía cubre defectos de fabricación por 2 años. No incluye daños por uso inadecuado.' },
              { q: '¿Cómo puedo devolver el producto?', a: 'Contáctanos a través de nuestro chat o email. Te enviaremos una etiqueta de devolución sin costo.' }
            ].map((f, i) => (
              <div key={i} style={{ borderBottom: i < 2 ? `1px solid ${C.border}` : 'none' }}>
                <button onClick={() => setActiveFAQ(activeFAQ === i ? null : i)} style={{ width: '100%', padding: '20px 24px', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontWeight: 600, fontSize: 16 }}>{f.q}</span>
                  {activeFAQ === i ? <Minus size={20} color={C.primary} /> : <Plus size={20} color={C.textSub} />}
                </button>
                {activeFAQ === i && <div style={{ padding: '0 24px 20px', color: C.textSub, fontSize: 15, lineHeight: 1.6 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* 8. CROSS SELLING */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32 }}>Completa tu compra</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {relatedProducts.map((p, i) => (
              <div key={i} style={{ background: C.bgWhite, borderRadius: 16, padding: 20, textAlign: 'center' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} />
                </div>
                <h4 style={{ fontWeight: 600, marginBottom: 8 }}>{p.name}</h4>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.primary, marginBottom: 12 }}>${p.price}</div>
                <button style={{ width: '100%', padding: '10px', background: 'transparent', border: `1px solid ${C.primary}`, color: C.primary, borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
                  Agregar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 9. FOOTER */}
        <div style={{ background: C.bgWhite, borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 24 }}>
            <a href="#" style={{ color: C.textSub, textDecoration: 'none', fontSize: 14 }}>Términos y Condiciones</a>
            <a href="#" style={{ color: C.textSub, textDecoration: 'none', fontSize: 14 }}>Política de Privacidad</a>
            <a href="#" style={{ color: C.textSub, textDecoration: 'none', fontSize: 14 }}>Contacto</a>
          </div>
          <p style={{ color: C.textSub, fontSize: 13 }}>© 2024 {data.name || 'Tienda'}. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}
