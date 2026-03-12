'use client';
import React, { useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCarousel3DProps {
  images: string[];
  productName: string;
  catColor?: string; // e.g '#ef4444' or a tailwind variable
  brandPrimary?: string;
  brandSecondary?: string;
}

export default function ProductCarousel3D({ 
  images, 
  productName, 
  catColor = '#ef4444', 
  brandPrimary = '#ef4444', 
  brandSecondary = '#1a1a2e' 
}: ProductCarousel3DProps) {
  
  // Enforce a minimum of 3 items for the 3D effect to look good.
  // If we have fewer, we can duplicate them to create a loop
  let displayImages = [...images];
  while (displayImages.length > 0 && displayImages.length < 5) {
    displayImages = [...displayImages, ...displayImages];
  }
  // Trim to a maximum to avoid crazy radius
  if(displayImages.length > 12) displayImages = displayImages.slice(0, 12);
  
  const count = displayImages.length;
  // Hooks must be called before early return
  const angleStep = count > 0 ? 360 / count : 0;
  const radius = count > 0 ? Math.max(280, count * 45) : 0; 

  // All animation state lives in refs — zero re-renders during animation
  const angleRef = useRef(0);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragAngleStart = useRef(0);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isPaused = useRef(false);

  // Fallback if no images (after hooks)
  if (count === 0) return <div className="p-8 text-center">No images available</div>;

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
      const op = dist < 90 ? 1 : dist < 120 ? 0.4 : 0;
      card.style.opacity = String(op);
      card.style.pointerEvents = op > 0.3 ? 'auto' : 'none';
      card.style.zIndex = Math.round(100 - dist).toString();
    }
  }, [count, angleStep, radius]);

  // Auto-rotation via rAF — never touches React state
  useEffect(() => {
    let animId: number;
    let last = performance.now();
    const speed = 0.015;

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
    angleRef.current = dragAngleStart.current + (e.clientX - dragStartX.current) * 0.4;
    applyTransform();
  }, [applyTransform]);

  const onPointerUp = useCallback(() => { dragging.current = false; }, []);

  const rotate = useCallback((dir: number) => {
    angleRef.current += dir * angleStep;
    applyTransform();
  }, [angleStep, applyTransform]);

  return (
    <div style={{ padding: '0px' }} className="w-full h-full min-h-[400px] flex justify-center items-center">
      <div style={{
        position: 'relative', height: 400, width: '100%', overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
      }}>
        {/* Arrows */}
        <button onClick={() => rotate(1)} aria-label="Anterior" className="md:flex hidden hover:scale-110 transition-transform" style={{
          position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
          width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--border-subtle)',
          background: 'rgba(0,0,0,0.6)', color: '#fff', cursor: 'pointer',
          alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)',
        }}><ChevronLeft size={24} /></button>
        <button onClick={() => rotate(-1)} aria-label="Siguiente" className="md:flex hidden hover:scale-110 transition-transform" style={{
          position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
          width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--border-subtle)',
          background: 'rgba(0,0,0,0.6)', color: '#fff', cursor: 'pointer',
          alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)',
        }}><ChevronRight size={24} /></button>

        {/* 3D scene */}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{
            width: '100%', height: '100%', perspective: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'grab', userSelect: 'none', touchAction: 'none'
          }}
        >
          <div
            ref={ringRef}
            style={{
              position: 'relative', width: 400, height: 'auto',
              transformStyle: 'preserve-3d',
              transform: `translateZ(-${radius}px) rotateY(0deg)`,
            }}
          >
            {displayImages.map((src, i) => {
              const itemAngle = i * angleStep;
              return (
                <div
                  key={`${src}-${i}`}
                  ref={el => { cardRefs.current[i] = el; }}
                  className="group"
                  style={{
                    position: 'absolute', width: 400, height: 'auto',
                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                    opacity: 0,
                    willChange: 'opacity, transform',
                  }}
                  onMouseEnter={() => { isPaused.current = true; }}
                  onMouseLeave={() => { isPaused.current = false; }}
                >
                  <div style={{
                    width: '100%', height: 'auto', minHeight: 500, borderRadius: '1.5rem',
                    background: catColor, padding: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  }}>
                    <div style={{
                      width: '100%', height: 'auto', borderRadius: '1.35rem',
                      overflow: 'hidden', background: '#fff',
                      position: 'relative', display: 'flex', flexDirection: 'column',
                    }}>
                      {/* Product Image - altura completa */}
                      <div style={{ width: '100%', background: '#fff' }}>
                        <img
                          src={src}
                          alt={`${productName} view ${i + 1}`}
                          loading="lazy"
                          draggable={false}
                          style={{
                            width: '100%', height: 'auto',
                            objectFit: 'contain',
                            pointerEvents: 'none',
                            display: 'block',
                          }}
                        />
                      </div>
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
