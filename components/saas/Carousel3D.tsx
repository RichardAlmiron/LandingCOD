'use client';
import React, { useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Eye, Trash2 } from 'lucide-react';
import { TemplateType } from '@/lib/types';

interface CarouselItem {
  id: TemplateType;
  name: string;
  desc: string;
  premium?: boolean;
}

interface Carousel3DProps {
  category: string;
  items: CarouselItem[];
  selectedId: TemplateType | string;
  onSelect: (id: any) => void;
  isAdmin?: boolean;
  onDeleteTemplate?: (id: string) => void;
}

const catColors: Record<string, string> = {
  Marketplace: '#f59e0b', Tech: '#6366f1', Moda: '#ec4899', Belleza: '#f472b6',
  Retail: '#ef4444', Lujo: '#a78bfa', Hogar: '#10b981', Deporte: '#06b6d4', Accesorios: '#8b5cf6',
};

const BRAND: Record<string, [string, string]> = {
  megamarket: ['#ff9900', '#232f3e'], flashdeals: ['#e62e04', '#1a1a2e'], tradevault: ['#ff6a00', '#e64a19'],
  mercadocod: ['#fff159', '#3483fa'], bidzone: ['#e53238', '#0064d2'], pricedrop: ['#ff6000', '#fb2c36'],
  cashflow: ['#bf0000', '#fff'], primegoods: ['#e1251b', '#fff'], minimaltech: ['#000', '#f5f5f7'],
  futuretech: ['#1428a0', '#000'], techretail: ['#0046be', '#fff200'], techparts: ['#ff6600', '#003399'],
  gamevault: ['#1b2838', '#66c0f4'], progamer: ['#000', '#e11f1c'], keymarket: ['#f05f00', '#1a1a2e'],
  verifymarket: ['#006340', '#000'], boldathlete: ['#111', '#f5f5f5'], sportstripe: ['#000', '#fff'],
  editorialchic: ['#000', '#fff'], trendfast: ['#000', '#ff4081'], redstyle: ['#e50010', '#faf9f8'],
  zenbasic: ['#ff0000', '#fff'], stylepress: ['#2d2d2d', '#fff'], classicwear: ['#000c3b', '#fff'],
  familyfun: ['#003b64', '#fff'], yogapremium: ['#d31334', '#f5f5f5'], fitmodern: ['#000', '#fff'],
  hypedrop: ['#e11b1b', '#fff'], streetboutique: ['#000', '#fff'], boldyouth: ['#000', '#ff69b4'],
  pinkglam: ['#ff69b4', '#000'], novatrend: ['#000', '#c9a96e'], influencestyle: ['#000', '#fff'],
  avantgarde: ['#000', '#fff'], sneakerzone: ['#000', '#e4002b'], beautybox: ['#000', '#fff'],
  beautyhaven: ['#f57224', '#000'], softglow: ['#f5c6c6', '#fff'], freshcraft: ['#000', '#fff'],
  glamangel: ['#000', '#e91e8c'], blueretail: ['#0071dc', '#ffc220'], bullseye: ['#cc0000', '#fff'],
  bulkzone: ['#005daa', '#e31837'], starstore: ['#e21a2c', '#000'], luxservice: ['#000', '#fff'],
  chicstore: ['#000', '#fff'], elitestore: ['#000', '#fff'], designerhub: ['#000', '#fff'],
  luxedit: ['#000', '#fff'], italiancraft: ['#000', '#c9a96e'], heritagelux: ['#1a1a1a', '#c19a5b'],
  parisianchic: ['#000', '#fff'], milanomodern: ['#000', '#fff'], timecraft: ['#006039', '#a37e2c'],
  maisonelegance: ['#8b0000', '#c9a96e'], blueclassic: ['#0abab5', '#fff'], charmboutique: ['#000', '#f5c6c6'],
  crystalshine: ['#000', '#a8d8ea'], nordichome: ['#0058a3', '#ffda1a'], homedecor: ['#7b189f', '#fff'],
  builderzone: ['#f96302', '#fff'], handcraft: ['#f56400', '#fff'], petfriend: ['#0a74c4', '#fff'],
  petworld: ['#0054a4', '#e31837'], sportzone: ['#0082c3', '#fff'], ecooutdoor: ['#000', '#fff'],
  extremeexplorer: ['#000', '#fff'], greenhealth: ['#3a7d2c', '#fff'], eurostyle: ['#ff6900', '#fff'],
  iconshades: ['#1a1a1a', '#c0392b'], sportoptics: ['#000', '#c0392b'], modernlens: ['#00487c', '#fff'],
  opticalretail: ['#003366', '#fff'], shadeshub: ['#000', '#e31837'], futureauto: ['#000', '#e82127'],
};

export default function Carousel3D({ category, items, selectedId, onSelect, isAdmin, onDeleteTemplate }: Carousel3DProps) {
  const count = items.length;
  const angleStep = 360 / count;
  const radius = Math.max(340, count * 52);
  const catColor = catColors[category] || '#6366f1';

  // All animation state lives in refs — zero re-renders during animation
  const angleRef = useRef(0);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragAngleStart = useRef(0);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isPaused = useRef(false);

  // Direct DOM update — no React state, no re-renders
  const applyTransform = useCallback(() => {
    const ring = ringRef.current;
    if (!ring) return;
    ring.style.transform = `translateZ(-${radius}px) rotateY(${angleRef.current}deg)`;

    // Update card opacity directly
    for (let i = 0; i < count; i++) {
      const card = cardRefs.current[i];
      if (!card) continue;
      const itemAngle = i * angleStep;
      const eff = ((angleRef.current + itemAngle) % 360 + 360) % 360;
      const dist = Math.min(eff, 360 - eff);
      const op = dist < 90 ? 1 : dist < 130 ? 0.4 : 0;
      card.style.opacity = String(op);
      card.style.pointerEvents = op > 0.3 ? 'auto' : 'none';
    }
  }, [count, angleStep, radius]);

  // Auto-rotation via rAF — never touches React state
  useEffect(() => {
    let animId: number;
    let last = performance.now();
    const speed = 0.012;

    const tick = (now: number) => {
      if (!dragging.current && !isPaused.current) {
        angleRef.current -= speed * (now - last);
        applyTransform();
      }
      last = now;
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [applyTransform]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    dragStartX.current = e.clientX;
    dragAngleStart.current = angleRef.current;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    angleRef.current = dragAngleStart.current + (e.clientX - dragStartX.current) * 0.3;
    applyTransform();
  }, [applyTransform]);

  const onPointerUp = useCallback(() => { dragging.current = false; }, []);

  const rotate = useCallback((dir: number) => {
    angleRef.current += dir * angleStep;
    applyTransform();
  }, [angleStep, applyTransform]);

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, paddingLeft: 4 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: catColor, boxShadow: `0 0 8px ${catColor}` }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: catColor, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{category}</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>({count})</span>
      </div>

      <div style={{
        position: 'relative', height: 320, overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}>
        {/* Arrows */}
        <button onClick={() => rotate(1)} aria-label="Anterior" style={{
          position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
          width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--border-subtle)',
          background: 'rgba(0,0,0,0.6)', color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)',
        }}><ChevronLeft size={18} /></button>
        <button onClick={() => rotate(-1)} aria-label="Siguiente" style={{
          position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
          width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--border-subtle)',
          background: 'rgba(0,0,0,0.6)', color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)',
        }}><ChevronRight size={18} /></button>

        {/* 3D scene */}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{
            width: '100%', height: '100%', perspective: 650,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'grab', userSelect: 'none',
          }}
        >
          <div
            ref={ringRef}
            style={{
              position: 'relative', width: 180, height: 280,
              transformStyle: 'preserve-3d',
              transform: `translateZ(-${radius}px) rotateY(0deg)`,
            }}
          >
            {items.map((item, i) => {
              const itemAngle = i * angleStep;
              const isSelected = item.id === selectedId;
              const [brandPrimary, brandSecondary] = BRAND[item.id] || ['#6366f1', '#1a1a2e'];
              return (
                <div
                  key={item.id}
                  ref={el => { cardRefs.current[i] = el; }}
                  onClick={() => onSelect(item.id)}
                  className="group"
                  style={{
                    position: 'absolute', width: 180, height: 280,
                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                    opacity: 0, cursor: 'pointer',
                    willChange: 'opacity',
                  }}
                  onMouseEnter={() => { isPaused.current = true; }}
                  onMouseLeave={() => { isPaused.current = false; }}
                >
                  <div style={{
                    width: '100%', height: '100%', borderRadius: '1.5rem',
                    background: isSelected ? catColor : '#27272a', padding: 3,
                    boxShadow: isSelected
                      ? `0 0 24px ${catColor}60, 0 8px 32px rgba(0,0,0,0.4)`
                      : '0 8px 32px rgba(0,0,0,0.3)',
                  }}>
                    <div style={{
                      width: '100%', height: '100%', borderRadius: '1.35rem',
                      overflow: 'hidden', background: brandSecondary,
                      position: 'relative', display: 'flex', flexDirection: 'column',
                    }}>
                      {/* Default: color blocks (always visible as base layer) */}
                      <div style={{ height: 28, background: brandPrimary, display: 'flex', alignItems: 'center', padding: '0 10px', gap: 6 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />
                        <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.2)' }} />
                      </div>
                      <div style={{ height: 50, background: `linear-gradient(135deg, ${brandPrimary}, ${brandSecondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.3)', letterSpacing: '0.05em' }}>{item.name}</span>
                      </div>
                      <div style={{ flex: 1, padding: 6, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                        {[0, 1, 2, 3].map(j => (
                          <div key={j} style={{
                            borderRadius: 6,
                            background: `linear-gradient(${135 + j * 45}deg, ${brandPrimary}30, ${brandSecondary}50)`,
                            border: '1px solid rgba(255,255,255,0.06)',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, padding: 4,
                          }}>
                            <div style={{ width: '80%', aspectRatio: '1', borderRadius: 4, background: `${brandPrimary}40` }} />
                            <div style={{ width: '70%', height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }} />
                            <div style={{ width: '40%', height: 3, borderRadius: 2, background: `${brandPrimary}60` }} />
                          </div>
                        ))}
                      </div>
                      {/* Screenshot overlay: covers fallback when loaded */}
                      <img
                        src={`/screenshots/${item.id}.webp`}
                        alt={item.name}
                        loading="lazy"
                        draggable={false}
                        style={{
                          position: 'absolute', inset: 0, width: '100%', height: '100%',
                          objectFit: 'cover', objectPosition: 'top',
                          pointerEvents: 'none', borderRadius: '1.35rem',
                        }}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      
                      {/* Admin Overlay */}
                      {isAdmin && (
                        <div 
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-[1.35rem] flex flex-col items-center justify-center gap-3 z-50 pointer-events-auto"
                          onPointerDown={(e) => e.stopPropagation()}
                          onPointerUp={(e) => e.stopPropagation()}
                        >
                          <a 
                            href={`/preview?template=${item.id}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-md flex items-center justify-center gap-2 text-sm font-medium border border-white/20 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Eye size={16} /> Previsualizar
                          </a>
                          <button 
                            onClick={(e) => { e.stopPropagation(); onDeleteTemplate?.(item.id); }}
                            className="bg-red-500/80 hover:bg-red-500 text-white px-4 py-2 rounded-lg backdrop-blur-md flex items-center justify-center gap-2 text-sm font-medium border border-red-500/50 transition-colors w-[138px]"
                          >
                            <Trash2 size={16} /> Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', marginTop: 6 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: isSelected ? catColor : 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                      {item.name}
                      {item.premium && <Sparkles size={10} style={{ color: '#f59e0b' }} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
