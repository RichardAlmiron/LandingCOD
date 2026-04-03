'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import LiveStorePreview from '@/components/panel-de-administracion/LiveStorePreview';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Copy, Heart, Eye, Loader2, Trash2 } from 'lucide-react';
import { VERIFIED_TEMPLATES } from '@/components/componentes-compartidos/VerifiedBadge';

interface StoreFilmStripProps {
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

const ITEMS_PER_VIEW = 5;
const PRELOAD_BUFFER = 5; // Precargar 5 más adelante

export default function StoreFilmStrip({ 
  items, 
  selectedId, 
  onSelect, 
  onConfirmSelect,
  isAdmin = false,
  onVerifyToggle,
  favorites,
  onToggleFavorite,
  onDelete,
  selectedIds = [],
  onToggleSelection,
}: StoreFilmStripProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  // Track which indices have been "loaded" (rendered at least once)
  const [loadedRange, setLoadedRange] = useState({ start: 0, end: Math.min(ITEMS_PER_VIEW + PRELOAD_BUFFER, items.length) });
  const [isPreloading, setIsPreloading] = useState(false);
  const preloadTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Expand loaded range when currentIndex changes
  useEffect(() => {
    const visibleEnd = currentIndex + ITEMS_PER_VIEW;
    const neededEnd = Math.min(visibleEnd + PRELOAD_BUFFER, items.length);
    const neededStart = Math.max(0, currentIndex - PRELOAD_BUFFER);

    if (neededEnd > loadedRange.end || neededStart < loadedRange.start) {
      setIsPreloading(true);
      // Small delay to let the UI breathe before rendering new templates
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

  const goToPrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(items.length - ITEMS_PER_VIEW, prev + 1));
  };

  const visibleItems = items.slice(currentIndex, currentIndex + ITEMS_PER_VIEW);

  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleVerifyToggle = (id: string, currentVerified: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    onVerifyToggle?.(id, !currentVerified);
  };

  const handlePreview = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`/preview?template=${id}`, '_blank');
  };

  const handleToggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSelection?.(id);
  };

  const handleBulkDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIds.length > 0 && onDelete) {
      onDelete(selectedIds);
    }
  };

  // Check if an item index is within the loaded range
  const isItemLoaded = useCallback((globalIndex: number) => {
    return globalIndex >= loadedRange.start && globalIndex < loadedRange.end;
  }, [loadedRange]);

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950">
      {/* Main preview area with side buttons */}
      <div className="flex-1 flex items-center justify-center relative px-16">
        {/* Left navigation button */}
        <button
          onClick={goToPrev}
          disabled={currentIndex === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Preview items */}
        <div className="flex items-center justify-center">
          {visibleItems.map((item, idx) => {
            const globalIndex = currentIndex + idx;
            const isSelected = selectedId === item.id;
            const isCenter = idx === 2;
            const isVerified = item.verified === true;
            const loaded = isItemLoaded(globalIndex);
            
            return (
              <div
                key={item.id}
                className={`relative mx-2 transition-all duration-500 cursor-pointer ${
                  isCenter ? 'scale-125 z-10' : 'scale-100 opacity-60'
                } ${isSelected ? 'ring-4 ring-indigo-500' : ''}`}
                onClick={() => { onSelect(item.id); onConfirmSelect?.(item.id); }}
              >
                <div className="w-[280px] h-[350px] rounded-lg overflow-hidden shadow-2xl relative bg-zinc-900">
                  {loaded ? (
                    <LiveStorePreview
                      templateId={item.id}
                      width={280}
                      height={350}
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
                      {globalIndex + 1}
                    </div>
                  </div>

                  {/* Franja verde de tienda completada */}
                  {VERIFIED_TEMPLATES.includes(item.id) && (
                    <div className="absolute top-0 right-0 z-20">
                      <div className="bg-[#00a650] text-white text-[9px] font-bold px-2 py-1 rounded-bl-lg shadow-md flex items-center gap-1 cursor-pointer hover:bg-[#008c44] transition-colors"
                        onClick={(e) => handleCopyId(item.id, e)}
                        title={`Completada · Copiar ID: ${item.id}`}
                      >
                        <CheckCircle className="w-3 h-3" />
                        <span>{item.id}</span>
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
                  
                  {/* Admin overlay con ID y toggle de verificación */}
                  {isAdmin && (
                    <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-start">
                      <div className="flex flex-col gap-2">
                        {/* Checkbox para selección múltiple */}
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

                        {/* ID de tienda con botón copiar */}
                        <div className="flex items-center gap-2">
                          <code className="text-[10px] font-mono text-white/90 bg-black/50 px-2 py-1 rounded truncate max-w-[160px]">
                            {item.id}
                          </code>
                          <button
                            onClick={(e) => handleCopyId(item.id, e)}
                            className="p-1 bg-white/20 hover:bg-white/30 rounded transition-colors"
                            title="Copiar ID"
                          >
                            {copiedId === item.id ? (
                              <span className="text-[10px] text-green-400 font-bold">✓</span>
                            ) : (
                              <Copy className="w-3 h-3 text-white" />
                            )}
                          </button>
                        </div>
                        
                        {/* Toggle de verificación */}
                        <button
                          onClick={(e) => handleVerifyToggle(item.id, isVerified, e)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all shadow-lg ${
                            isVerified 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30' 
                              : 'bg-red-600 text-white border-2 border-red-400 hover:bg-red-700 shadow-red-500/50'
                          }`}
                        >
                          {isVerified ? (
                            <>
                              <CheckCircle className="w-3.5 h-3.5" />
                              VERIFICADO
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" />
                              NO VERIFICADO
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {isCenter && (
                  <div className="absolute -bottom-8 left-0 right-0 text-center">
                    <p className="text-white font-semibold truncate">{item.name}</p>
                    {isSelected && (
                      <span className="text-indigo-400 text-sm">Seleccionado</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right navigation button */}
        <button
          onClick={goToNext}
          disabled={currentIndex >= items.length - ITEMS_PER_VIEW}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Preloading indicator */}
        {isPreloading && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1.5 bg-indigo-500/20 border border-indigo-500/30 rounded-full backdrop-blur-sm">
            <Loader2 className="w-3 h-3 animate-spin text-indigo-400" />
            <span className="text-[10px] text-indigo-300 font-medium">Preparando tiendas...</span>
          </div>
        )}
      </div>

      {/* Film strip controls */}
      <div className="h-20 bg-zinc-900 flex items-center justify-center gap-4 px-4 relative">
        <button
          onClick={goToPrev}
          disabled={currentIndex === 0}
          className="p-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        {/* Progress indicator */}
        <div className="flex gap-1">
          {items.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx >= currentIndex && idx < currentIndex + ITEMS_PER_VIEW
                  ? 'bg-indigo-500'
                  : idx >= loadedRange.start && idx < loadedRange.end
                    ? 'bg-zinc-600'
                    : 'bg-zinc-800'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={goToNext}
          disabled={currentIndex >= items.length - ITEMS_PER_VIEW}
          className="p-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 rounded-lg transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

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
