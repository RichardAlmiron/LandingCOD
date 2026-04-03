'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import LiveStorePreview from '@/components/panel-de-administracion/LiveStorePreview';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Copy, Heart, Eye, Loader2, Trash2 } from 'lucide-react';
import { VERIFIED_TEMPLATES } from '@/components/componentes-compartidos/VerifiedBadge';

interface StoreCoverFlowProps {
  items: any[];
  selectedId: string;
  onSelect: (id: string) => void;
  onConfirmSelect?: (id: string) => void;
  isAdmin?: boolean;
  onVerifyToggle?: (id: string, verified: boolean) => void;
  favorites?: Set<string>;
  onToggleFavorite?: (id: string) => void;
  onDelete?: (ids: string[]) => void;
  selectedIds?: string[];
  onToggleSelection?: (id: string) => void;
}

const VISIBLE_RANGE = 5; // Render 5 around center (2 left, center, 2 right)
const PRELOAD_BUFFER = 5;

export default function StoreCoverFlow({ items, selectedId, onSelect, onConfirmSelect, isAdmin = false, onVerifyToggle, favorites, onToggleFavorite, onDelete, selectedIds = [], onToggleSelection }: StoreCoverFlowProps) {
  const [currentIndex, setCurrentIndex] = useState(Math.min(Math.floor(items.length / 2), items.length - 1));
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loadedRange, setLoadedRange] = useState({ 
    start: Math.max(0, Math.floor(items.length / 2) - VISIBLE_RANGE - PRELOAD_BUFFER),
    end: Math.min(items.length, Math.floor(items.length / 2) + VISIBLE_RANGE + PRELOAD_BUFFER + 1)
  });
  const [isPreloading, setIsPreloading] = useState(false);
  const preloadTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Expand loaded range when currentIndex changes
  useEffect(() => {
    const neededStart = Math.max(0, currentIndex - VISIBLE_RANGE - PRELOAD_BUFFER);
    const neededEnd = Math.min(items.length, currentIndex + VISIBLE_RANGE + PRELOAD_BUFFER + 1);

    if (neededEnd > loadedRange.end || neededStart < loadedRange.start) {
      setIsPreloading(true);
      if (preloadTimerRef.current) clearTimeout(preloadTimerRef.current);
      preloadTimerRef.current = setTimeout(() => {
        setLoadedRange(prev => ({
          start: Math.min(prev.start, neededStart),
          end: Math.max(prev.end, neededEnd),
        }));
        setIsPreloading(false);
      }, 100);
    }

    return () => {
      if (preloadTimerRef.current) clearTimeout(preloadTimerRef.current);
    };
  }, [currentIndex, items.length, loadedRange]);

  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePreview = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`/preview?template=${id}`, '_blank');
  };

  const handleToggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSelection?.(id);
  };

  const handleVerifyToggle = (id: string, currentVerified: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    onVerifyToggle?.(id, !currentVerified);
  };

  const handleBulkDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIds.length > 0 && onDelete) {
      onDelete(selectedIds);
    }
  };

  const goToPrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const goToNext = () => setCurrentIndex((prev) => Math.min(items.length - 1, prev + 1));

  const isItemLoaded = useCallback((index: number) => {
    return index >= loadedRange.start && index < loadedRange.end;
  }, [loadedRange]);

  // Only render items within visible range for performance
  const renderableItems = items.map((item, index) => {
    const offset = index - currentIndex;
    const absOffset = Math.abs(offset);
    // Only render items within visible range
    if (absOffset > VISIBLE_RANGE) return null;
    return { item, index, offset, absOffset };
  }).filter(Boolean) as { item: any; index: number; offset: number; absOffset: number }[];

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950">
      {/* Cover flow area */}
      <div className="flex-1 relative flex items-center justify-center perspective-[1000px]">
        {renderableItems.map(({ item, index, offset, absOffset }) => {
          const isSelected = selectedId === item.id;
          const isCenter = offset === 0;
          const loaded = isItemLoaded(index);
          
          const translateX = offset * 220;
          const translateZ = -absOffset * 100;
          const rotateY = offset * -35;
          const scale = isCenter ? 1.2 : Math.max(0.6, 1 - absOffset * 0.15);
          const opacity = isCenter ? 1 : Math.max(0.3, 1 - absOffset * 0.3);
          const zIndex = 100 - absOffset;

          return (
            <div
              key={item.id}
              className={`absolute w-[300px] h-[400px] transition-all duration-500 cursor-pointer ${
                isSelected ? 'ring-4 ring-indigo-500' : ''
              }`}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
              }}
              onClick={() => {
                setCurrentIndex(index);
                onSelect(item.id);
                onConfirmSelect?.(item.id);
              }}
            >
              <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl relative bg-zinc-900">
                {loaded ? (
                  <LiveStorePreview
                    templateId={item.id}
                    width={300}
                    height={400}
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-zinc-800">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
                    <span className="text-xs text-zinc-400">Cargando tienda...</span>
                  </div>
                )}
                
                {/* Número de tienda - esquina superior izquierda */}
                <div className="absolute top-0 left-0 z-20">
                  <div className="bg-[#00c853] text-white text-[11px] font-black px-2 py-0.5 rounded-br-lg shadow-md animate-pulse" style={{ textShadow: '0 0 6px rgba(0,200,83,0.8)' }}>
                    {index + 1}
                  </div>
                </div>

                {/* Franja verde de tienda completada */}
                {VERIFIED_TEMPLATES.includes(item.id) && (
                  <div className="absolute top-0 right-0 z-20">
                    <div
                      className="bg-[#00a650] text-white text-[9px] font-bold px-2 py-1 rounded-bl-lg shadow-md flex items-center gap-1 cursor-pointer hover:bg-[#008c44] transition-colors"
                      onClick={(e) => handleCopyId(item.id, e)}
                      title={`Completada · Copiar ID: ${item.id}`}
                    >
                      <CheckCircle className="w-3 h-3" />
                      <span>{copiedId === item.id ? '✓ Copiado' : item.id}</span>
                    </div>
                  </div>
                )}

                {/* Botón Previsualizar */}
                <button
                  className="absolute bottom-2 left-2 z-20 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold transition-all shadow-lg hover:scale-105"
                  style={{
                    background: 'rgba(79, 70, 229, 0.85)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: '#fff',
                  }}
                  onClick={(e) => handlePreview(item.id, e)}
                  title="Previsualizar tienda completa"
                >
                  <Eye size={11} />
                  Previsualizar
                </button>
                
                {/* Botón favorito */}
                {onToggleFavorite && (
                  <button
                    className="absolute bottom-2 right-2 z-20 w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-110"
                    style={{
                      background: favorites?.has(item.id) ? '#ef4444' : 'rgba(0,0,0,0.5)',
                      border: '1.5px solid rgba(255,255,255,0.3)',
                    }}
                    onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }}
                    title={favorites?.has(item.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                  >
                    <Heart size={13} fill={favorites?.has(item.id) ? '#fff' : 'none'} color="#fff" />
                  </button>
                )}

                {/* Admin overlay con checkbox y verificación */}
                {isAdmin && (
                  <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/80 to-transparent z-20 flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={(e) => handleToggleSelect(item.id, e)}
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                          selectedIds.includes(item.id)
                            ? 'bg-blue-500 border-blue-400'
                            : 'bg-black/40 border-white/40 hover:border-white'
                        }`}
                      >
                        {selectedIds.includes(item.id) && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                      </button>
                      <button
                        onClick={(e) => handleVerifyToggle(item.id, item.verified === true, e)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all shadow-lg ${
                          item.verified === true
                            ? 'bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30' 
                            : 'bg-red-600 text-white border-2 border-red-400 hover:bg-red-700 shadow-red-500/50'
                        }`}
                      >
                        {item.verified === true ? (
                          <><CheckCircle className="w-3.5 h-3.5" />VERIFICADO</>
                        ) : (
                          <><XCircle className="w-3.5 h-3.5" />NO VERIFICADO</>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {isCenter && (
                <div className="absolute -bottom-16 left-0 right-0 text-center">
                  <h3 className="text-white font-bold text-lg">{item.name}</h3>
                  <p className="text-zinc-400 text-sm capitalize">{item.category}</p>
                  {isSelected && (
                    <span className="inline-block mt-2 px-4 py-1 bg-indigo-500 text-white text-sm rounded-full">
                      Seleccionado
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Navigation */}
        <button
          onClick={goToPrev}
          disabled={currentIndex === 0}
          className="absolute left-8 z-50 w-14 h-14 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-full flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <button
          onClick={goToNext}
          disabled={currentIndex === items.length - 1}
          className="absolute right-8 z-50 w-14 h-14 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-full flex items-center justify-center transition-colors"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>

        {/* Preloading indicator */}
        {isPreloading && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 px-3 py-1.5 bg-indigo-500/20 border border-indigo-500/30 rounded-full backdrop-blur-sm">
            <Loader2 className="w-3 h-3 animate-spin text-indigo-400" />
            <span className="text-[10px] text-indigo-300 font-medium">Preparando tiendas...</span>
          </div>
        )}
      </div>

      {/* Counter */}
      <div className="h-16 flex items-center justify-center relative">
        <span className="text-zinc-400">
          {currentIndex + 1} / {items.length}
        </span>

        {/* Floating bulk delete button */}
        {isAdmin && selectedIds.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="absolute right-6 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-extrabold transition-all shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:shadow-[0_0_35px_rgba(239,68,68,0.6)] hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
              border: '2px solid rgba(239,68,68,0.6)',
              color: '#fff',
            }}
          >
            <Trash2 className="w-4 h-4" />
            Eliminar ({selectedIds.length})
          </button>
        )}
      </div>
    </div>
  );
}
