'use client';
import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import {
  Menu, Search, ShoppingCart, User, Star, Truck, RotateCcw,
  ShieldCheck, Plus, Minus, Check, Play, Zap, Award, Target, Flame
} from 'lucide-react';

interface PDPProps { data: StoreData; product: Product; variant?: number; }

const C = {
  bgMain: '#0F172A', bgWhite: '#1E293B', bgCard: '#334155',
  textDark: '#F8FAFC', textSub: '#94A3B8', primary: '#06B6D4',
  border: '#475569', star: '#FBBF24', accent: '#22D3EE'
};

const fontSans = "system-ui, sans-serif";

export default function PdpCroFuturista({ data, product }: PDPProps) {
  const images = product.images?.length ? product.images : [product.imageUrl];
  const price = typeof product.price === 'number' ? product.price : parseFloat(String(product.price)) || 0;
  const originalPrice = typeof product.originalPrice === 'number' ? product.originalPrice : parseFloat(String(product.originalPrice)) || 0;
  const discount = originalPrice > price ? Math.round((1 - price / originalPrice) * 100) : 0;
  const stockLeft = Math.floor(Math.random() * 18) + 5;

  const [activeImg, setActiveImg] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const [activeSpec, setActiveSpec] = useState<number | null>(null);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setProgress(p => p >= 75 ? 75 : p + 1), 100);
    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: <Zap size={20} />, title: 'Envío Express', desc: '24-48h' },
    { icon: <ShieldCheck size={20} />, title: 'Garantía', desc: '2 años' },
    { icon: <RotateCcw size={20} />, title: 'Devolución', desc: '30 días' },
    { icon: <Award size={20} />, title: 'Calidad', desc: 'Premium' }
  ];

  const specs = [
    { title: 'Procesador', content: 'Octa-core 3.2GHz + Neural Engine' },
    { title: 'Memoria', content: '12GB LPDDR5X' },
    { title: 'Almacenamiento', content: '512GB NVMe' },
    { title: 'Pantalla', content: 'AMOLED 120Hz 6.8"' }
  ];

  const reviews = [
    { name: 'Alex K.', rating: 5, comment: 'Tecnología de otro nivel. Increíble.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    { name: 'Nina P.', rating: 5, comment: 'El futuro en mis manos. Espectacular.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' }
  ];

  const relatedProducts = [
    { name: 'Cyber Case', price: 35, img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80' },
    { name: 'Holo Charger', price: 29, img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80' },
    { name: 'Neural Buds', price: 79, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80' }
  ];

  return (
    <div style={{ background: C.bgMain, minHeight: '100vh', fontFamily: fontSans, color: C.textDark, overflowX: 'hidden' }}>
      
      {/* Progress Bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: C.bgCard, zIndex: 1001 }}>
        <div style={{ width: `${progress}%`, height: '100%', background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`, transition: 'width 0.3s' }} />
      </div>

      {/* STICKY */}
      {showSticky && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, background: 'rgba(30,41,59,0.95)', backdropFilter: 'blur(10px)', padding: '10px 24px', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={images[0]} alt="" style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 6, border: `1px solid ${C.primary}` }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: C.textSub }}>{product.title}</span>
          </div>
          <button style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, color: 'white', border: 'none', padding: '8px 20px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Comprar — ${price}
          </button>
        </div>
      )}

      {/* NAV */}
      <nav style={{ background: C.bgWhite, padding: '14px 24px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Menu size={22} color={C.textDark} />
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: 4, background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{data.name || 'NEXUS'}</span>
          <div style={{ display: 'flex', gap: 16 }}>
            <Search size={20} color={C.textDark} />
            <ShoppingCart size={20} color={C.textDark} />
            <User size={20} color={C.textDark} />
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        
        {/* Badge */}
        {stockLeft <= 15 && (
          <div style={{ background: `linear-gradient(135deg, #EF4444, #F97316)`, color: 'white', padding: '8px 16px', borderRadius: 20, display: 'inline-block', marginBottom: 24, fontWeight: 600, fontSize: 13 }}>
            ⚡ {stockLeft} unidades restantes
          </div>
        )}

        {/* HERO */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginBottom: 64 }}>
          <div>
            <div style={{ background: C.bgCard, borderRadius: 16, aspectRatio: '1', overflow: 'hidden', marginBottom: 16, position: 'relative', border: `1px solid ${C.border}` }}>
              <img src={images[activeImg]} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 32 }} />
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 30% 30%, ${C.primary}10, transparent 60%)` }} />
              {discount > 0 && (
                <div style={{ position: 'absolute', top: 16, right: 16, background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, color: 'white', padding: '8px 14px', borderRadius: 8, fontWeight: 800, fontSize: 16 }}>
                  -{discount}%
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {images.slice(0, 4).map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} style={{ width: 70, height: 70, borderRadius: 10, overflow: 'hidden', border: activeImg === i ? `2px solid ${C.primary}` : `2px solid ${C.border}`, padding: 0, background: 'none', cursor: 'pointer' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16, letterSpacing: '-0.02em' }}>{product.title}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(i => <Star key={i} size={16} fill={C.star} color={C.star} />)}</div>
              <span style={{ color: C.textSub, fontSize: 14 }}>4.9 (156 reviews)</span>
            </div>

            <div style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 42, fontWeight: 800, background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>${price}</span>
              {originalPrice > price && (
                <span style={{ fontSize: 22, color: C.textSub, textDecoration: 'line-through', marginLeft: 16 }}>${originalPrice}</span>
              )}
            </div>

            <button style={{ width: '100%', padding: '18px', background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, color: 'white', fontSize: 16, fontWeight: 700, borderRadius: 12, border: 'none', cursor: 'pointer', marginBottom: 24, boxShadow: `0 4px 20px ${C.primary}40` }}>
              🚀 COMPRAR AHORA
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {features.map((f, i) => (
                <div key={i} style={{ background: C.bgCard, padding: 14, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${C.border}` }}>
                  <div style={{ color: C.primary }}>{f.icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 12 }}>{f.title}</div>
                    <div style={{ color: C.textSub, fontSize: 11 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
              <div style={{ textAlign: 'center' }}><Truck size={18} color={C.primary} /><div style={{ fontSize: 10, marginTop: 4, color: C.textSub }}>ENVÍO</div></div>
              <div style={{ textAlign: 'center' }}><ShieldCheck size={18} color={C.primary} /><div style={{ fontSize: 10, marginTop: 4, color: C.textSub }}>GARANTÍA</div></div>
              <div style={{ textAlign: 'center' }}><RotateCcw size={18} color={C.primary} /><div style={{ fontSize: 10, marginTop: 4, color: C.textSub }}>DEVOLUCIÓN</div></div>
            </div>
          </div>
        </div>

        {/* VIDEO */}
        <div style={{ background: C.bgWhite, borderRadius: 20, padding: 56, marginBottom: 48, textAlign: 'center', border: `1px solid ${C.border}` }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Experience the Future</h2>
          <p style={{ color: C.textSub, marginBottom: 32 }}>Watch the unboxing and discover</p>
          <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '16/9', background: '#000' }}>
            <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 40px ${C.primary}60` }}>
              <Play size={28} color="white" fill="white" />
            </div>
          </div>
        </div>

        {/* REVIEWS */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32, textAlign: 'center' }}>What Users Say</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {reviews.map((r, i) => (
              <div key={i} style={{ background: C.bgCard, padding: 24, borderRadius: 16, border: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <img src={r.img} alt={r.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${C.primary}` }} />
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

        {/* SPECS */}
        <div style={{ background: C.bgWhite, borderRadius: 20, padding: 48, marginBottom: 48, border: `1px solid ${C.border}` }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>Tech Specs</h2>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
            {specs.map((s, i) => (
              <div key={i} style={{ borderBottom: i < specs.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <button onClick={() => setActiveSpec(activeSpec === i ? null : i)} style={{ width: '100%', padding: '18px 24px', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', color: C.textDark }}>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{s.title}</span>
                  {activeSpec === i ? <Minus size={18} color={C.primary} /> : <Plus size={18} color={C.textSub} />}
                </button>
                {activeSpec === i && <div style={{ padding: '0 24px 18px', color: C.textSub, fontSize: 14 }}>{s.content}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* COMPARISON */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>Why Choose Us</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: 16, background: C.bgWhite, borderRadius: '12px 0 0 12px' }}></th>
                <th style={{ padding: 16, background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, color: 'white', fontWeight: 700, borderRadius: 12 }}>NEXUS</th>
                <th style={{ padding: 16, background: C.bgCard, fontWeight: 600, borderRadius: '0 12px 12px 0' }}>Others</th>
              </tr>
            </thead>
            <tbody>
              {[
                { f: 'Shipping', c1: 'Express 24h', c2: '5-10 days' },
                { f: 'Warranty', c1: '2 Years', c2: '90 days' },
                { f: 'Support', c1: '24/7 Live', c2: 'Email only' },
                { f: 'Quality', c1: 'A+ Grade', c2: 'Standard' }
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: 16, background: C.bgWhite, fontWeight: 500 }}>{r.f}</td>
                  <td style={{ padding: 16, background: `${C.primary}20`, color: C.primary, fontWeight: 700 }}>{r.c1}</td>
                  <td style={{ padding: 16, background: C.bgCard, color: C.textSub }}>{r.c2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQ */}
        <div style={{ background: C.bgWhite, borderRadius: 20, padding: 48, marginBottom: 48, border: `1px solid ${C.border}` }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>FAQ</h2>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
            {[
              { q: 'Shipping time?', a: 'Express delivery in 24-48 hours with tracking.' },
              { q: 'Warranty coverage?', a: 'Full 2-year warranty covering all manufacturing defects.' },
              { q: 'Return policy?', a: '30-day hassle-free returns. Contact us for assistance.' }
            ].map((f, i) => (
              <div key={i} style={{ borderBottom: i < 2 ? `1px solid ${C.border}` : 'none' }}>
                <button onClick={() => setActiveFAQ(activeFAQ === i ? null : i)} style={{ width: '100%', padding: '18px 24px', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', color: C.textDark }}>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{f.q}</span>
                  {activeFAQ === i ? <Minus size={18} color={C.primary} /> : <Plus size={18} color={C.textSub} />}
                </button>
                {activeFAQ === i && <div style={{ padding: '0 24px 18px', color: C.textSub, fontSize: 14, lineHeight: 1.6 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* CROSS SELL */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Enhance Your Setup</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {relatedProducts.map((p, i) => (
              <div key={i} style={{ background: C.bgCard, borderRadius: 16, padding: 20, textAlign: 'center', border: `1px solid ${C.border}` }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} />
                </div>
                <h4 style={{ fontWeight: 600, marginBottom: 8 }}>{p.name}</h4>
                <div style={{ fontSize: 20, fontWeight: 700, color: C.primary, marginBottom: 12 }}>${p.price}</div>
                <button style={{ width: '100%', padding: '10px', background: 'transparent', border: `1px solid ${C.primary}`, color: C.primary, borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
                  ADD
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ background: C.bgWhite, borderRadius: 16, padding: 32, textAlign: 'center', border: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 20 }}>
            <a href="#" style={{ color: C.textSub, textDecoration: 'none', fontSize: 13 }}>Terms</a>
            <a href="#" style={{ color: C.textSub, textDecoration: 'none', fontSize: 13 }}>Privacy</a>
            <a href="#" style={{ color: C.textSub, textDecoration: 'none', fontSize: 13 }}>Contact</a>
          </div>
          <p style={{ color: C.textSub, fontSize: 12 }}>© 2024 {data.name || 'NEXUS'}</p>
        </footer>
      </div>
    </div>
  );
}
