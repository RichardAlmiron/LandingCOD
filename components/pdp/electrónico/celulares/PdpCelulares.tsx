'use client';
import React, { useState, useEffect, useRef } from 'react';
import { StoreData, Product } from '@/lib/types';
import {
  Star, Plus, Minus, Truck, RotateCcw, ShieldCheck, Shield,
  Check, Search, ShoppingCart, User, Menu, ChevronRight, ChevronDown,
  Cpu, BatteryFull, Smartphone, X, Heart, Award, Play,
  MessageSquare, ArrowRight, Package, Clock, Zap, Eye,
  Instagram, Facebook, Twitter, Mail, Phone, MapPin,
  CreditCard, Lock, RefreshCw, Headphones
} from 'lucide-react';

interface PDPProps {
  data: StoreData;
  product: Product;
  variant?: number;
}

/* ══ PALETA PREMIUM — Tonos tierra + verde bosque ══ */
const C = {
  pageBg: '#f5f0e8',
  cardBg: '#ffffff',
  cardBorder: '#e8e2d6',
  text: '#1a1a1a',
  textSub: '#5c5549',
  textLight: '#9e9688',
  textMuted: '#b8b0a4',
  accent: '#8b7355',
  accentLight: '#c4a97d',
  cta: '#4a6741',
  ctaHover: '#3d5636',
  ctaDark: '#2d4028',
  gold: '#c9a84c',
  starFill: '#d4a843',
  line: '#ddd6c9',
  lineLight: '#ebe6dc',
  badgeBg: '#f0ebe2',
  sectionBg: '#faf7f2',
  warmGray: '#f8f5f0',
};

const font = `'Georgia', 'Times New Roman', serif`;
const sans = `'Helvetica Neue', 'Arial', sans-serif`;

/* ══ COMPONENTES REUTILIZABLES ══ */

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: C.cardBg, borderRadius: 20, border: `1px solid ${C.cardBorder}`,
      overflow: 'hidden', ...style,
    }}>{children}</div>
  );
}

function SectionWrapper({ children, bg, style }: { children: React.ReactNode; bg?: string; style?: React.CSSProperties }) {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 56px', ...style }}>
      {bg ? <div style={{ background: bg, borderRadius: 24, padding: '56px 48px', ...style }}>{children}</div> : children}
    </div>
  );
}

function SectionTitle({ eyebrow, title, subtitle, align = 'center', light }: {
  eyebrow?: string; title: string; subtitle?: string; align?: 'center' | 'left'; light?: boolean;
}) {
  return (
    <div style={{ textAlign: align, marginBottom: 40 }}>
      {eyebrow && (
        <span style={{
          display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: 3,
          textTransform: 'uppercase', color: light ? 'rgba(255,255,255,0.5)' : C.accent,
          marginBottom: 12,
        }}>{eyebrow}</span>
      )}
      <h2 style={{
        fontFamily: font, fontSize: 30, fontWeight: 700, lineHeight: 1.2,
        color: light ? '#fff' : C.text, marginBottom: subtitle ? 12 : 0,
      }}>{title}</h2>
      {subtitle && (
        <p style={{
          fontSize: 15, color: light ? 'rgba(255,255,255,0.65)' : C.textSub,
          lineHeight: 1.7, maxWidth: 560, margin: align === 'center' ? '0 auto' : 0,
        }}>{subtitle}</p>
      )}
    </div>
  );
}

function Accordion({ items }: { items: { title: string; content: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div style={{ borderRadius: 16, border: `1px solid ${C.lineLight}`, overflow: 'hidden' }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: i < items.length - 1 ? `1px solid ${C.lineLight}` : 'none' }}>
          <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{
            width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '20px 24px', background: openIdx === i ? C.warmGray : 'transparent',
            border: 'none', cursor: 'pointer', transition: 'background 0.2s',
          }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: C.text, fontFamily: sans, textAlign: 'left' }}>{item.title}</span>
            <div style={{
              width: 28, height: 28, borderRadius: 99, flexShrink: 0,
              background: openIdx === i ? C.cta : C.badgeBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}>
              {openIdx === i
                ? <Minus size={14} color="#fff" />
                : <Plus size={14} color={C.textLight} />}
            </div>
          </button>
          {openIdx === i && (
            <div style={{ padding: '0 24px 24px', fontSize: 14, color: C.textSub, lineHeight: 1.8, fontFamily: sans }}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Stars({ rating, size = 15 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={size} fill={i <= rating ? C.starFill : 'none'} color={i <= rating ? C.starFill : C.lineLight} strokeWidth={1.5} />
      ))}
    </div>
  );
}

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: 52, height: 52, borderRadius: 99, background: C.badgeBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <span style={{ fontSize: 11, color: C.textSub, fontWeight: 600, textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL — PDP Celulares (15 Secciones CRO)
   ══════════════════════════════════════════════════════════════ */
export default function PdpCelulares({ data, product }: PDPProps) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [qty, setQty] = useState(1);

  const images = product.images?.length ? product.images : [product.imageUrl];
  const price = typeof product.price === 'number' ? product.price : parseFloat(String(product.price)) || 0;
  const ai = product.aiContent;
  const sec = ai?.sections;
  const fmtPrice = (n: number) => {
    const str = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Gs. ${str}`;
  };
  const originalPrice = typeof product.originalPrice === 'number' ? product.originalPrice : parseFloat(String(product.originalPrice)) || 0;
  const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const storeName = data.name || 'MARCA';
  const rating = Math.round(product.rating || 4.8);
  const reviewCount = product.reviews || 2847;

  return (
    <div style={{ background: C.pageBg, minHeight: '100vh', fontFamily: sans, color: C.text }}>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div onClick={() => setLightbox(false)} style={{
          position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out',
          backdropFilter: 'blur(8px)',
        }}>
          <button onClick={() => setLightbox(false)} style={{
            position: 'absolute', top: 24, right: 24, width: 44, height: 44, borderRadius: 99,
            background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><X size={22} color="#fff" /></button>
          <img src={images[selectedImg]} alt={product.title} style={{
            maxWidth: '85vw', maxHeight: '85vh', borderRadius: 16, objectFit: 'contain',
          }} />
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          SECCION 1: HERO — Above the Fold
          Todo lo esencial sin scroll: nav, galeria, titulo, precio, CTA
          ═══════════════════════════════════════════════════════ */}

      {/* Nav */}
      <div style={{ background: C.cardBg, borderBottom: `1px solid ${C.lineLight}` }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '16px 24px',
        }}>
          <Menu size={20} color={C.text} style={{ cursor: 'pointer' }} />
          <span style={{
            fontFamily: font, fontSize: 18, fontWeight: 700, letterSpacing: 4,
            color: C.text, textTransform: 'uppercase',
          }}>{storeName}</span>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Search size={18} color={C.textSub} style={{ cursor: 'pointer' }} />
            <User size={18} color={C.textSub} style={{ cursor: 'pointer' }} />
            <div style={{ position: 'relative' }}>
              <ShoppingCart size={18} color={C.textSub} style={{ cursor: 'pointer' }} />
              <span style={{
                position: 'absolute', top: -8, right: -10, background: C.cta, color: '#fff',
                fontSize: 9, fontWeight: 800, borderRadius: 99, width: 18, height: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.textMuted }}>
          <span style={{ cursor: 'pointer' }}>Inicio</span>
          <ChevronRight size={11} />
          <span style={{ cursor: 'pointer' }}>Celulares</span>
          <ChevronRight size={11} />
          <span style={{ color: C.textSub, fontWeight: 500 }}>{ai?.enhancedTitle || product.title}</span>
        </div>
      </div>

      {/* Hero Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 48px' }}>
        <Card style={{ padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '55% 45%' }}>

            {/* Galeria */}
            <div style={{ padding: 36, display: 'flex', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {images.slice(0, 5).map((img, i) => (
                  <div key={i} onClick={() => setSelectedImg(i)} style={{
                    width: 64, height: 64, borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
                    border: selectedImg === i ? `2px solid ${C.accent}` : `1px solid ${C.lineLight}`,
                    opacity: selectedImg === i ? 1 : 0.55, transition: 'all 0.25s',
                  }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
              <div onClick={() => setLightbox(true)} style={{
                flex: 1, borderRadius: 16, overflow: 'hidden', background: C.warmGray,
                cursor: 'zoom-in', display: 'flex', alignItems: 'center', justifyContent: 'center',
                minHeight: 480, position: 'relative',
              }}>
                <img src={images[selectedImg]} alt={product.title} style={{
                  width: '100%', height: '100%', objectFit: 'contain', maxHeight: 520,
                }} />
                {discount > 0 && (
                  <span style={{
                    position: 'absolute', top: 16, left: 16, background: '#c0392b', color: '#fff',
                    fontSize: 12, fontWeight: 800, padding: '6px 14px', borderRadius: 8,
                  }}>-{discount}%</span>
                )}
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: '44px 40px 44px 8px', display: 'flex', flexDirection: 'column' }}>
              <p style={{
                fontSize: 11, letterSpacing: 3, textTransform: 'uppercase',
                color: C.accent, marginBottom: 10, fontWeight: 600,
              }}>Tecnolog&iacute;a Premium</p>

              <h1 style={{
                fontFamily: font, fontSize: 34, fontWeight: 700, lineHeight: 1.15,
                color: C.text, marginBottom: 14,
              }}>{ai?.enhancedTitle || product.title}</h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <Stars rating={rating} />
                <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{product.rating || '4.8'}</span>
                <span style={{ fontSize: 13, color: C.textLight }}>({reviewCount.toLocaleString()} rese&ntilde;as)</span>
              </div>

              <p style={{ fontSize: 15, color: C.textSub, lineHeight: 1.75, marginBottom: 24, maxWidth: 420 }}>
                {ai?.enhancedDescription || product.description}
              </p>

              {/* Precio */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                  <span style={{ fontSize: 38, fontWeight: 800, color: C.text, fontFamily: font }}>
                    {fmtPrice(price)}
                  </span>
                  {originalPrice > price && (
                    <span style={{ fontSize: 20, color: C.textMuted, textDecoration: 'line-through' }}>
                      {fmtPrice(originalPrice)}
                    </span>
                  )}
                </div>
                {discount > 0 && (
                  <span style={{
                    display: 'inline-block', background: '#e8f5e9', color: C.cta,
                    fontSize: 12, fontWeight: 700, padding: '5px 12px', borderRadius: 8, marginTop: 8,
                  }}>Ahorras ${(originalPrice - price).toLocaleString()} ({discount}%)</span>
                )}
              </div>

              {/* Qty + ATC */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', border: `1px solid ${C.line}`,
                  borderRadius: 12, overflow: 'hidden',
                }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} style={{
                    width: 44, height: 52, border: 'none', background: 'transparent',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}><Minus size={16} color={C.textLight} /></button>
                  <span style={{ width: 40, textAlign: 'center', fontSize: 15, fontWeight: 700, color: C.text }}>{qty}</span>
                  <button onClick={() => setQty(qty + 1)} style={{
                    width: 44, height: 52, border: 'none', background: 'transparent',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}><Plus size={16} color={C.textLight} /></button>
                </div>
                <button style={{
                  flex: 1, padding: '16px 0', background: C.cta, color: '#fff', border: 'none',
                  borderRadius: 12, fontSize: 15, fontWeight: 700, letterSpacing: 1.5, cursor: 'pointer',
                  textTransform: 'uppercase', transition: 'background 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                }}>
                  <ShoppingCart size={18} /> A&ntilde;adir al Carrito
                </button>
              </div>

              {/* Trust badges inline */}
              <div style={{ display: 'flex', gap: 24, justifyContent: 'flex-start' }}>
                <TrustBadge icon={<Truck size={20} color={C.accent} />} label="Env&iacute;o Gratis" />
                <TrustBadge icon={<RotateCcw size={20} color={C.accent} />} label="30 D&iacute;as Devoluci&oacute;n" />
                <TrustBadge icon={<ShieldCheck size={20} color={C.accent} />} label="Garant&iacute;a 2 A&ntilde;os" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECCION 2: BENEFICIOS INMEDIATOS — 3 puntos clave
          Iconos de lineas finas monocromaticos. Sin emojis.
          ═══════════════════════════════════════════════════════ */}
      <SectionWrapper>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { icon: <Zap size={26} color={C.accent} strokeWidth={1.5} />, title: 'Rendimiento Extremo', desc: 'Procesador de nueva generaci&oacute;n para multitarea fluida y gaming sin l&iacute;mites.' },
            { icon: <BatteryFull size={26} color={C.accent} strokeWidth={1.5} />, title: 'Bater&iacute;a Todo el D&iacute;a', desc: 'Carga r&aacute;pida de 65W. De 0 a 100% en solo 35 minutos.' },
            { icon: <Eye size={26} color={C.accent} strokeWidth={1.5} />, title: 'Pantalla Inmersiva', desc: 'AMOLED de 6.7 pulgadas con 120Hz para una experiencia visual superior.' },
          ].map((b, i) => (
            <div key={i} style={{
              padding: '36px 32px', borderRadius: 20, background: C.cardBg,
              border: `1px solid ${C.cardBorder}`, textAlign: 'center',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 99, background: C.badgeBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}>{b.icon}</div>
              <h3 style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 8 }}>{b.title}</h3>
              <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.7 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════
          SECCION 3: AUTORIDAD — "As Seen In"
          Logos en escala de grises. Validacion externa.
          ═══════════════════════════════════════════════════════ */}
      <SectionWrapper>
        <Card style={{ padding: '40px 48px', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: C.textMuted, marginBottom: 28 }}>
            RECONOCIDO POR
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 48, flexWrap: 'wrap', opacity: 0.4 }}>
            {['TechRadar', 'CNET', 'The Verge', 'Wired', 'Digital Trends'].map((name, i) => (
              <span key={i} style={{
                fontFamily: font, fontSize: 20, fontWeight: 700, color: C.text,
                letterSpacing: 1, textTransform: 'uppercase',
              }}>{name}</span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 28 }}>
            {[
              { icon: <Award size={16} />, label: 'Best of 2026' },
              { icon: <Star size={16} />, label: "Editor's Choice" },
              { icon: <Shield size={16} />, label: 'Top Rated' },
            ].map((badge, i) => (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 16px', borderRadius: 99, fontSize: 11, fontWeight: 700,
                background: C.badgeBg, color: C.accent, border: `1px solid ${C.lineLight}`,
              }}>{badge.icon} {badge.label}</span>
            ))}
          </div>
        </Card>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════
          SECCION 4: POR QUE USARLO — Beneficios que resuelven
          Problema -> Solucion. No features, transformaciones.
          ═══════════════════════════════════════════════════════ */}
      <SectionWrapper>
        <SectionTitle
          eyebrow="Transforma tu experiencia"
          title="&iquest;Por Qu&eacute; Elegir Este Dispositivo?"
          subtitle="No vendemos especificaciones. Vendemos soluciones reales para tu d&iacute;a a d&iacute;a."
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[
            { problem: 'Tu celular se congela con varias apps', solution: 'Procesador de 8 n&uacute;cleos con 12GB RAM para multitarea sin pausas', icon: <Cpu size={22} color={C.cta} strokeWidth={1.5} /> },
            { problem: 'La bater&iacute;a no dura ni medio d&iacute;a', solution: '5000mAh con carga de 65W. Un d&iacute;a completo con una sola carga', icon: <BatteryFull size={22} color={C.cta} strokeWidth={1.5} /> },
            { problem: 'Fotos borrosas con poca luz', solution: 'C&aacute;mara de 108MP con IA nocturna y estabilizaci&oacute;n &oacute;ptica', icon: <Eye size={22} color={C.cta} strokeWidth={1.5} /> },
            { problem: 'Pantalla que cansa la vista', solution: 'AMOLED con protecci&oacute;n ocular certificada y brillo adaptativo', icon: <Smartphone size={22} color={C.cta} strokeWidth={1.5} /> },
          ].map((item, i) => (
            <Card key={i} style={{ padding: '32px 28px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                background: `rgba(74,103,65,0.08)`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{item.icon}</div>
              <div>
                <p style={{ fontSize: 13, color: C.textLight, marginBottom: 6, fontStyle: 'italic' }}>
                  &ldquo;{item.problem}&rdquo;
                </p>
                <p style={{ fontSize: 15, color: C.text, fontWeight: 600, lineHeight: 1.6 }}>
                  {item.solution}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════
          SECCION 5: COMPARATIVA DE SUPERIORIDAD
          Tabla elegante. Nosotros vs Competencia.
          ═══════════════════════════════════════════════════════ */}
      <SectionWrapper>
        <SectionTitle
          eyebrow="Comparativa honesta"
          title="Nosotros vs. La Competencia"
          subtitle="Los datos hablan por s&iacute; solos. Sin trucos, solo hechos."
        />
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: sans }}>
            <thead>
              <tr style={{ background: C.warmGray }}>
                <th style={{ textAlign: 'left', padding: '18px 28px', color: C.textLight, fontWeight: 600, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' }}>Caracter&iacute;stica</th>
                <th style={{ textAlign: 'center', padding: '18px 28px', color: C.cta, fontWeight: 800, fontSize: 13 }}>{ai?.enhancedTitle || product.title || 'Nuestro Producto'}</th>
                <th style={{ textAlign: 'center', padding: '18px 28px', color: C.textMuted, fontWeight: 600, fontSize: 13 }}>Competencia</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feat: 'Procesador', us: 'Snapdragon 8 Gen 3', them: 'Chip gen. anterior', win: true },
                { feat: 'Pantalla', us: 'AMOLED 120Hz', them: 'LCD 60Hz', win: true },
                { feat: 'C&aacute;mara', us: '108MP + OIS + IA', them: '48MP sin OIS', win: true },
                { feat: 'Bater&iacute;a', us: '5000mAh + 65W', them: '4500mAh + 25W', win: true },
                { feat: 'Garant&iacute;a', us: '2 a&ntilde;os completa', them: '1 a&ntilde;o limitada', win: true },
                { feat: 'Precio', us: `${fmtPrice(price)}`, them: `${fmtPrice(Math.round(price * 1.3))}`, win: true },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.lineLight}` }}>
                  <td style={{ padding: '16px 28px', color: C.text, fontWeight: 500 }}>{row.feat}</td>
                  <td style={{ padding: '16px 28px', textAlign: 'center', fontWeight: 700 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: C.cta }}>
                      <Check size={15} strokeWidth={2.5} /> {row.us}
                    </span>
                  </td>
                  <td style={{ padding: '16px 28px', textAlign: 'center', color: C.textMuted }}>{row.them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════
          SECCION 6: INGENIERIA / MATERIALES
          Calidad tangible. Detalles de fabricacion premium.
          ═══════════════════════════════════════════════════════ */}
      <SectionWrapper>
        <div style={{
          borderRadius: 24, overflow: 'hidden', background: C.text,
          display: 'grid', gridTemplateColumns: '1fr 1fr',
        }}>
          <div style={{
            padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}>
            <SectionTitle
              eyebrow="Ingenier&iacute;a de precisi&oacute;n"
              title="Construido Para Durar"
              subtitle="Cada detalle ha sido dise&ntilde;ado con materiales de grado aeroespacial para una experiencia que se siente premium desde el primer contacto."
              align="left"
              light
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Aluminio Serie 7000', desc: 'Chasis de aleaci&oacute;n aeroespacial, 40% m&aacute;s resistente' },
                { label: 'Gorilla Glass Victus 2', desc: 'Protecci&oacute;n contra ca&iacute;das de hasta 2 metros' },
                { label: 'Certificaci&oacute;n IP68', desc: 'Resistente al agua y polvo en condiciones extremas' },
                { label: 'Dise&ntilde;o de 7.9mm', desc: 'Ultra delgado con peso de solo 185 gramos' },
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: 99, background: C.accentLight,
                    marginTop: 8, flexShrink: 0,
                  }} />
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{m.label}</span>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{
            background: C.warmGray, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 40,
          }}>
            <img src={images[0]} alt="Detalle del producto" style={{
              width: '100%', maxHeight: 420, objectFit: 'contain', borderRadius: 16,
            }} />
          </div>
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════
          SECCION 7: TUTORIAL VISUAL — Como usarlo
          3-4 pasos visuales numerados. Elimina barrera de uso.
          ═══════════════════════════════════════════════════════ */}
      <SectionWrapper>
        <SectionTitle
          eyebrow="Simple y r&aacute;pido"
          title="Listo en 3 Pasos"
          subtitle="Configura tu nuevo dispositivo en minutos. Sin complicaciones."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          {[
            { step: '01', title: 'Desempaqueta', desc: 'Abre la caja premium con cargador 65W, cable USB-C y funda protectora incluidos.', img: images[0] },
            { step: '02', title: 'Configura', desc: 'Enciende y sigue el asistente inteligente. Transfiere todos tus datos en minutos.', img: images[1] || images[0] },
            { step: '03', title: 'Disfruta', desc: 'Explora la c&aacute;mara IA, personaliza tu pantalla y descarga tus apps favoritas.', img: images[2] || images[0] },
          ].map((s, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <div style={{
                borderRadius: 20, overflow: 'hidden', marginBottom: 20,
                height: 220, background: C.warmGray,
              }}>
                <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{
                position: 'absolute', top: 16, left: 16,
                width: 36, height: 36, borderRadius: 99, background: C.cta,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800, color: '#fff',
              }}>{s.step}</div>
              <h3 style={{ fontFamily: font, fontSize: 19, fontWeight: 700, color: C.text, marginBottom: 6 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════
          SECCION 8: PRUEBA SOCIAL DINAMICA — UGC
          Fotos reales de clientes. Nada de stock.
          ═══════════════════════════════════════════════════════ */}
      <SectionWrapper>
        <SectionTitle
          eyebrow="Comunidad real"
          title="Lo Que Dicen Nuestros Clientes"
          subtitle="Historias reales de personas reales. Sin filtros."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            { name: 'Carlos M.', location: 'Buenos Aires', text: 'La c&aacute;mara es incre&iacute;ble. Mis fotos nocturnas quedaron mejor que con mi c&aacute;mara profesional.', rating: 5, time: 'Hace 3 d&iacute;as' },
            { name: 'Laura P.', location: 'Ciudad de M&eacute;xico', text: 'La bater&iacute;a dura todo el d&iacute;a incluso con uso intensivo. La carga r&aacute;pida es un game changer.', rating: 5, time: 'Hace 1 semana' },
            { name: 'Diego R.', location: 'Bogot&aacute;', text: 'El rendimiento es brutal. Puedo tener 20 apps abiertas sin que se trabe. Totalmente recomendado.', rating: 5, time: 'Hace 2 semanas' },
          ].map((review, i) => (
            <Card key={i} style={{ padding: '28px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 99, background: `hsl(${i * 120}, 30%, 85%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, fontWeight: 700, color: C.text,
                }}>{review.name[0]}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{review.name}</div>
                  <div style={{ fontSize: 11, color: C.textLight }}>{review.location} &middot; {review.time}</div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, color: C.cta, background: `rgba(74,103,65,0.08)`,
                    padding: '3px 8px', borderRadius: 6,
                  }}>Compra verificada</span>
                </div>
              </div>
              <Stars rating={review.rating} size={13} />
              <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.75, marginTop: 12 }}>
                &ldquo;{review.text}&rdquo;
              </p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════
          SECCION 9: MISION DE MARCA — Conexion emocional
          Historia y valores. El usuario compra la marca.
          ═══════════════════════════════════════════════════════ */}
      <SectionWrapper>
        <div style={{
          borderRadius: 24, background: C.sectionBg, padding: '64px 48px',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center',
        }}>
          <div>
            <SectionTitle
              eyebrow="Nuestra historia"
              title="M&aacute;s Que Tecnolog&iacute;a"
              subtitle="Nacimos con una misi&oacute;n simple: hacer que la tecnolog&iacute;a premium sea accesible para todos. Cada producto que creamos refleja nuestro compromiso con la calidad, la innovaci&oacute;n y el respeto por nuestros clientes."
              align="left"
            />
            <div style={{ display: 'flex', gap: 32, marginTop: 8 }}>
              {[
                { num: '50K+', label: 'Clientes felices' },
                { num: '4.8', label: 'Rating promedio' },
                { num: '15', label: 'Pa&iacute;ses' },
              ].map((stat, i) => (
                <div key={i}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: C.cta, fontFamily: font }}>{stat.num}</div>
                  <div style={{ fontSize: 12, color: C.textLight, marginTop: 2 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{
            borderRadius: 20, overflow: 'hidden', height: 320,
            background: C.cardBg, border: `1px solid ${C.cardBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img src={images[0]} alt="Nuestra marca" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════
          SECCION 10: GARANTIA Y CONFIANZA
          Eliminacion de riesgo. Ultimo obstaculo antes de compra.
          ═══════════════════════════════════════════════════════ */}
      <SectionWrapper>
        <SectionTitle
          eyebrow="Compra sin riesgo"
          title="Tu Satisfacci&oacute;n, Garantizada"
          subtitle="Si no est&aacute;s 100% satisfecho, te devolvemos tu dinero. Sin preguntas."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            { icon: <RotateCcw size={28} color={C.cta} strokeWidth={1.5} />, title: '30 D&iacute;as de Devoluci&oacute;n', desc: 'Devuelve el producto por cualquier motivo dentro de los primeros 30 d&iacute;as. Reembolso completo garantizado.' },
            { icon: <Shield size={28} color={C.cta} strokeWidth={1.5} />, title: 'Garant&iacute;a de 2 A&ntilde;os', desc: 'Cobertura completa contra defectos de f&aacute;brica. Reparaci&oacute;n o reemplazo sin costo adicional.' },
            { icon: <Lock size={28} color={C.cta} strokeWidth={1.5} />, title: 'Pago 100% Seguro', desc: 'Encriptaci&oacute;n SSL de grado bancario. Tus datos est&aacute;n protegidos en todo momento.' },
          ].map((g, i) => (
            <Card key={i} style={{ padding: '36px 28px', textAlign: 'center' }}>
              <div style={{
                width: 64, height: 64, borderRadius: 99, background: `rgba(74,103,65,0.06)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px', border: `1px solid rgba(74,103,65,0.12)`,
              }}>{g.icon}</div>
              <h3 style={{ fontFamily: font, fontSize: 17, fontWeight: 700, color: C.text, marginBottom: 8 }}>{g.title}</h3>
              <p style={{ fontSize: 13, color: C.textSub, lineHeight: 1.7 }}>{g.desc}</p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════
          SECCION 11: ESPECIFICACIONES TECNICAS
          Drawers expandibles. No saturar la vista.
          ═══════════════════════════════════════════════════════ */}
      <SectionWrapper>
        <SectionTitle
          eyebrow="Datos t&eacute;cnicos"
          title="Especificaciones Completas"
          subtitle="Para los que quieren conocer cada detalle."
        />
        <Accordion items={[
          { title: 'Pantalla y Visualizaci&oacute;n', content: 'AMOLED de 6.7 pulgadas con resoluci&oacute;n 2K+ (3200x1440). Tasa de refresco adaptativa de 1-120Hz. Brillo m&aacute;ximo de 2600 nits. Protecci&oacute;n Gorilla Glass Victus 2. Soporte HDR10+ y Dolby Vision.' },
          { title: 'Rendimiento y Memoria', content: 'Procesador Snapdragon 8 Gen 3 de 4nm. 12GB de RAM LPDDR5X. 256GB de almacenamiento UFS 4.0. GPU Adreno 750 con ray tracing. Refrigeraci&oacute;n por c&aacute;mara de vapor.' },
          { title: 'C&aacute;mara y Video', content: 'C&aacute;mara principal de 108MP con OIS e IA avanzada. Ultra gran angular de 12MP. Teleobjetivo de 10MP con zoom &oacute;ptico 3x. C&aacute;mara frontal de 12MP. Grabaci&oacute;n 8K a 30fps y 4K a 120fps.' },
          { title: 'Bater&iacute;a y Carga', content: 'Bater&iacute;a de 5000mAh. Carga r&aacute;pida por cable de 65W (0-100% en 35 min). Carga inal&aacute;mbrica de 15W. Carga inal&aacute;mbrica inversa de 4.5W.' },
          { title: 'Conectividad', content: '5G Sub-6 y mmWave. WiFi 7 (802.11be). Bluetooth 5.4 con LE Audio. NFC. USB-C 3.2 Gen 2. GPS de doble frecuencia.' },
          { title: 'Dimensiones y Peso', content: '162.3 x 77.2 x 7.9mm. Peso: 185g. Certificaci&oacute;n IP68. Colores disponibles: Negro Obsidiana, Plata Lunar, Verde Bosque.' },
        ]} />
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════
          SECCION 12: PREGUNTAS FRECUENTES
          Destructor de objeciones. Acordeones limpios.
          ═══════════════════════════════════════════════════════ */}
      <SectionWrapper>
        <SectionTitle
          eyebrow="Resolvemos tus dudas"
          title="Preguntas Frecuentes"
          subtitle="Todo lo que necesitas saber antes de decidir."
        />
        <Accordion items={[
          { title: '&iquest;Cu&aacute;nto tarda el env&iacute;o?', content: 'El env&iacute;o est&aacute;ndar gratuito tarda 3-5 d&iacute;as h&aacute;biles. Tambi&eacute;n ofrecemos env&iacute;o express en 1-2 d&iacute;as por un costo adicional. Todos los env&iacute;os incluyen seguimiento en tiempo real.' },
          { title: '&iquest;Qu&eacute; incluye la garant&iacute;a de 2 a&ntilde;os?', content: 'Cubre defectos de f&aacute;brica, problemas de bater&iacute;a y fallos de hardware. No cubre da&ntilde;os por ca&iacute;das o agua (aunque el IP68 protege contra salpicaduras). Incluye reparaci&oacute;n o reemplazo gratuito.' },
          { title: '&iquest;Puedo devolver el producto si no me gusta?', content: 'S&iacute;. Tienes 30 d&iacute;as desde la recepci&oacute;n para devolver el producto por cualquier motivo. El reembolso se procesa en 5-7 d&iacute;as h&aacute;biles. El env&iacute;o de devoluci&oacute;n es gratuito.' },
          { title: '&iquest;Es compatible con mi operador?', content: 'S&iacute;. El dispositivo es desbloqueado de f&aacute;brica y compatible con todos los operadores principales. Soporta bandas 5G, 4G LTE y 3G a nivel global.' },
          { title: '&iquest;Qu&eacute; accesorios vienen incluidos?', content: 'Incluye cargador r&aacute;pido de 65W, cable USB-C, funda protectora transparente, protector de pantalla pre-instalado, herramienta para SIM y gu&iacute;a r&aacute;pida.' },
          { title: '&iquest;C&oacute;mo transfiero mis datos del celular anterior?', content: 'El asistente de configuraci&oacute;n inicial te gu&iacute;a paso a paso. Puedes transferir contactos, fotos, apps y configuraciones desde cualquier Android o iPhone en menos de 15 minutos.' },
          { title: '&iquest;Tiene resistencia al agua?', content: 'S&iacute;. Cuenta con certificaci&oacute;n IP68, lo que significa resistencia al polvo y al agua hasta 1.5 metros de profundidad durante 30 minutos. Ideal para uso diario sin preocupaciones.' },
          { title: '&iquest;Ofrecen financiamiento?', content: 'S&iacute;. Puedes pagar en hasta 12 cuotas sin inter&eacute;s con tarjetas participantes. Tambi&eacute;n aceptamos PayPal, transferencia bancaria y pago contra entrega en ciudades seleccionadas.' },
        ]} />
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════
          SECCION 13: VENTA CRUZADA — Completa el look
          Grid de productos relacionados. Aumenta ticket promedio.
          ═══════════════════════════════════════════════════════ */}
      <SectionWrapper>
        <SectionTitle
          eyebrow="Complementa tu compra"
          title="Accesorios Recomendados"
          subtitle="Maximiza tu experiencia con estos complementos seleccionados."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {[
            { name: 'Funda Premium', price: 29, img: images[0] },
            { name: 'Cargador Inal&aacute;mbrico', price: 45, img: images[1] || images[0] },
            { name: 'Auriculares TWS', price: 89, img: images[2] || images[0] },
            { name: 'Protector Pantalla', price: 15, img: images[0] },
          ].map((acc, i) => (
            <Card key={i} style={{ overflow: 'hidden' }}>
              <div style={{ height: 160, background: C.warmGray, overflow: 'hidden' }}>
                <img src={acc.img} alt={acc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '16px 18px' }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 6 }}>{acc.name}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: C.cta }}>${acc.price}</span>
                  <button style={{
                    padding: '6px 14px', borderRadius: 8, border: `1px solid ${C.cta}`,
                    background: 'transparent', color: C.cta, fontSize: 11, fontWeight: 700,
                    cursor: 'pointer',
                  }}>Agregar</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════
          SECCION 14: MURO DE RESENAS — Prueba social profunda
          Distribucion de estrellas, filtros, fotos de clientes.
          ═══════════════════════════════════════════════════════ */}
      <SectionWrapper>
        <SectionTitle
          eyebrow={`${reviewCount.toLocaleString()} rese&ntilde;as verificadas`}
          title="Lo Que Opinan Nuestros Clientes"
        />
        {/* Rating summary */}
        <Card style={{ padding: '36px 40px', marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 40, alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 56, fontWeight: 800, color: C.text, fontFamily: font, lineHeight: 1 }}>
                {product.rating || '4.8'}
              </div>
              <Stars rating={rating} size={18} />
              <p style={{ fontSize: 12, color: C.textLight, marginTop: 8 }}>
                Basado en {reviewCount.toLocaleString()} rese&ntilde;as
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { stars: 5, pct: 78 },
                { stars: 4, pct: 15 },
                { stars: 3, pct: 4 },
                { stars: 2, pct: 2 },
                { stars: 1, pct: 1 },
              ].map((bar) => (
                <div key={bar.stars} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 12, color: C.textLight, width: 60, textAlign: 'right' }}>{bar.stars} estrellas</span>
                  <div style={{ flex: 1, height: 8, borderRadius: 99, background: C.lineLight, overflow: 'hidden' }}>
                    <div style={{ width: `${bar.pct}%`, height: '100%', borderRadius: 99, background: C.starFill, transition: 'width 0.5s' }} />
                  </div>
                  <span style={{ fontSize: 12, color: C.textLight, width: 36 }}>{bar.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Individual reviews */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { name: 'Andr&eacute;s G.', loc: 'Lima', rating: 5, title: 'Superó mis expectativas', text: 'Ven&iacute;a de un iPhone y la transici&oacute;n fue incre&iacute;blemente f&aacute;cil. La c&aacute;mara es espectacular.', date: 'Hace 5 d&iacute;as', verified: true },
            { name: 'Mar&iacute;a F.', loc: 'Santiago', rating: 5, title: 'Mejor compra del a&ntilde;o', text: 'La bater&iacute;a dura todo el d&iacute;a con uso intensivo. La pantalla es hermosa.', date: 'Hace 1 semana', verified: true },
            { name: 'Roberto S.', loc: 'Montevideo', rating: 4, title: 'Excelente relaci&oacute;n calidad-precio', text: 'Por este precio no hay nada mejor. El rendimiento es de gama alta real.', date: 'Hace 2 semanas', verified: true },
            { name: 'Valentina C.', loc: 'Medell&iacute;n', rating: 5, title: 'Dise&ntilde;o premium', text: 'Se siente incre&iacute;ble en la mano. El acabado mate es elegante y no se marca con huellas.', date: 'Hace 3 semanas', verified: true },
          ].map((r, i) => (
            <Card key={i} style={{ padding: '24px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 99, background: C.badgeBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 700, color: C.accent,
                  }}>{r.name[0]}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: C.textLight }}>{r.loc} &middot; {r.date}</div>
                  </div>
                </div>
                {r.verified && (
                  <span style={{
                    fontSize: 10, fontWeight: 700, color: C.cta, background: `rgba(74,103,65,0.08)`,
                    padding: '3px 8px', borderRadius: 6,
                  }}>Verificada</span>
                )}
              </div>
              <Stars rating={r.rating} size={12} />
              <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginTop: 10, marginBottom: 4 }}>{r.title}</h4>
              <p style={{ fontSize: 13, color: C.textSub, lineHeight: 1.7 }}>{r.text}</p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════
          SECCION 15: FOOTER FUNCIONAL
          Metodos de pago, legal, soporte. Cierre profesional.
          ═══════════════════════════════════════════════════════ */}
      <div style={{ background: C.text, marginTop: 20 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, marginBottom: 48 }}>
            {/* Col 1: Marca */}
            <div>
              <span style={{
                fontFamily: font, fontSize: 18, fontWeight: 700, letterSpacing: 3,
                color: '#fff', textTransform: 'uppercase', display: 'block', marginBottom: 16,
              }}>{storeName}</span>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
                Tecnolog&iacute;a premium accesible para todos. Innovaci&oacute;n, calidad y compromiso en cada producto.
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <div key={i} style={{
                    width: 36, height: 36, borderRadius: 99, background: 'rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  }}><Icon size={16} color="rgba(255,255,255,0.4)" /></div>
                ))}
              </div>
            </div>

            {/* Col 2: Compra */}
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>Compra</h4>
              {['Cat&aacute;logo', 'Ofertas', 'Nuevos Productos', 'Gift Cards'].map((link, i) => (
                <p key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 10, cursor: 'pointer' }}>{link}</p>
              ))}
            </div>

            {/* Col 3: Soporte */}
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>Soporte</h4>
              {['Centro de Ayuda', 'Env&iacute;os y Devoluciones', 'Garant&iacute;a', 'Contacto'].map((link, i) => (
                <p key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 10, cursor: 'pointer' }}>{link}</p>
              ))}
            </div>

            {/* Col 4: Contacto */}
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>Contacto</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: <Mail size={14} />, text: 'soporte@marca.com' },
                  { icon: <Phone size={14} />, text: '+1 (800) 123-4567' },
                  { icon: <Clock size={14} />, text: 'Lun-Vie 9:00-18:00' },
                ].map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
                    <span style={{ color: 'rgba(255,255,255,0.25)' }}>{c.icon}</span>
                    {c.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Metodos de pago */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontWeight: 600 }}>M&eacute;todos de pago:</span>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Visa', 'MC', 'Amex', 'PayPal'].map((m, i) => (
                  <span key={i} style={{
                    padding: '4px 10px', borderRadius: 4, fontSize: 10, fontWeight: 700,
                    background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>{m}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 20, fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
              <span style={{ cursor: 'pointer' }}>T&eacute;rminos</span>
              <span style={{ cursor: 'pointer' }}>Privacidad</span>
              <span style={{ cursor: 'pointer' }}>Cookies</span>
            </div>
          </div>

          {/* Copyright */}
          <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.15)', marginTop: 24 }}>
            &copy; 2026 {storeName}. Todos los derechos reservados.
          </p>
        </div>
      </div>

    </div>
  );
}