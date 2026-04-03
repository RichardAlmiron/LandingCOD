'use client';
import React, { useState, useRef, useEffect } from 'react';
import LivePDPPreview from '@/components/panel-de-administracion/LivePDPPreview';
import { PdpTemplate } from '@/lib/types';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, Trash2, Copy, Eye } from 'lucide-react';

interface CoverFlowProps {
  items: PdpTemplate[];
  selectedId: string;
  onSelect: (id: string) => void;
  onConfirmSelect?: (id: string) => void;
  isAdmin?: boolean;
  onVerifyToggle?: (id: string, verified: boolean) => void;
  onDelete?: (id: string | string[]) => void;
  selectedIds?: string[];
  onToggleSelection?: (id: string) => void;
}

export default function CoverFlow({ 
  items, 
  selectedId, 
  onSelect, 
  onConfirmSelect, 
  isAdmin = false, 
  onVerifyToggle, 
  onDelete,
  selectedIds = [],
  onToggleSelection
}: CoverFlowProps) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    const selectedIdx = items.findIndex(item => item.id === selectedId || item.codigo === selectedId);
    return selectedIdx >= 0 ? selectedIdx : 0;
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const selectedIdx = items.findIndex(item => item.id === selectedId || item.codigo === selectedId);
    if (selectedIdx >= 0) {
      setCurrentIndex(selectedIdx);
    }
  }, [selectedId, items]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Desactivado a petición del usuario
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Desactivado a petición del usuario
  };

  const handleMouseUp = () => {
    // Desactivado a petición del usuario
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      const newIdx = currentIndex - 1;
      setCurrentIndex(newIdx);
      onSelect(items[newIdx].id);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < items.length - 1) {
      const newIdx = currentIndex + 1;
      setCurrentIndex(newIdx);
      onSelect(items[newIdx].id);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX - translateX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const newTranslateX = e.touches[0].clientX - startX;
    setTranslateX(newTranslateX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 50;
    if (translateX > threshold && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else if (translateX < -threshold && currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    setTranslateX(0);
  };

  const handleItemClick = (index: number, itemId: string) => {
    if (isDragging) return;
    setCurrentIndex(index);
    onSelect(itemId);
    // No llamamos onConfirmSelect aquí - eso se hace en el botón del footer
  };

  const handleVerifyToggle = (id: string, currentVerified: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    onVerifyToggle?.(id, !currentVerified);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(selectedIds.length > 0 && selectedIds.includes(id) ? selectedIds : id);
    }
  };

  const handleToggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSelection?.(id);
  };

  const handleCopyId = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${name} [${id}]`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePreviewPdp = (id: string, codigo: string | undefined, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`/preview?template=${codigo || id}&type=pdp`, '_blank');
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950">
      {/* Cover flow area */}
      <div 
        ref={containerRef}
        className="flex-1 relative flex items-center justify-center perspective-[1000px] overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-10 z-[200] w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transition-all disabled:opacity-20 disabled:cursor-not-allowed group shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >
          <ChevronLeft className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === items.length - 1}
          className="absolute right-10 z-[200] w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transition-all disabled:opacity-20 disabled:cursor-not-allowed group shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >
          <ChevronRight className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        </button>
        {items.map((item, index) => {
          const offset = index - currentIndex;
          const absOffset = Math.abs(offset);
          const isSelected = selectedId === item.id || selectedId === item.codigo;
          const isCenter = offset === 0;
          const isVerified = item.verified === true;
          
          const baseTranslateX = offset * 220;
          const dragOffset = isDragging ? translateX * 0.3 : 0;
          const translateXPos = baseTranslateX + dragOffset;
          const translateZ = -absOffset * 100;
          const rotateY = offset * -35;
          const scale = isCenter ? 1.2 : Math.max(0.6, 1 - absOffset * 0.15);
          const opacity = isCenter ? 1 : Math.max(0.3, 1 - absOffset * 0.3);
          const zIndex = 100 - absOffset;

          return (
            <div
              key={item.id}
              className={`absolute w-[300px] h-[400px] transition-all duration-500 ${
                isSelected 
                  ? 'ring-4 ring-green-500 shadow-[0_0_30px_rgba(34,197,94,0.5)]' 
                  : ''
              } ${isDragging ? '' : 'cursor-pointer'}`}
              style={{
                transform: `translateX(${translateXPos}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
                borderRadius: '12px',
              }}
              onClick={() => handleItemClick(index, item.id)}
            >
              <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl relative bg-zinc-900">
                <LivePDPPreview 
                  templateId={item.codigo || item.id}
                  width={300}
                  height={400}
                  className="w-full h-full"
                />

                {/* Número parpadeante verde */}
                <div className="absolute top-0 left-0 z-20">
                  <div className="bg-[#00c853] text-white text-[11px] font-black px-2 py-0.5 rounded-br-lg shadow-md animate-pulse" style={{ textShadow: '0 0 6px rgba(0,200,83,0.8)' }}>
                    {index + 1}
                  </div>
                </div>

                {/* Etiqueta Categoría */}
                {item.categoria_nombre && (
                  <div className="absolute top-0 right-0 z-20 max-w-[180px]">
                    <div
                      className="text-white text-[9px] font-bold px-2 py-1 rounded-bl-lg shadow-md truncate"
                      style={{
                        background: item.categoria_color ? `${item.categoria_color}e6` : (isVerified ? 'rgba(34,197,94,0.9)' : 'rgba(239,68,68,0.9)'),
                        textShadow: '0 0 4px rgba(0,0,0,0.3)',
                      }}
                      title={item.categoria_nombre}
                    >
                      {item.categoria_nombre}
                    </div>
                  </div>
                )}
                
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute inset-0 border-4 border-green-500 rounded-xl pointer-events-none">
                    <div className="absolute top-4 right-4 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}

                {/* Botón Previsualizar */}
                <button
                  className="absolute bottom-2 left-2 z-20 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold transition-all shadow-lg hover:scale-105"
                  style={{
                    background: 'rgba(16, 185, 129, 0.85)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: '#fff',
                  }}
                  onClick={(e) => handlePreviewPdp(item.id, item.codigo, e)}
                  title="Previsualizar PDP en página completa"
                >
                  <Eye size={11} />
                  Previsualizar
                </button>
                
                {/* Admin overlay con toggle de verificación y selección múltiple */}
                {isAdmin && (
                  <div className="absolute top-0 left-0 right-0 p-3 pt-7 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                      {/* Checkbox para selección múltiple */}
                      <button
                        onClick={(e) => handleToggleSelect(item.id, e)}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                          selectedIds.includes(item.id)
                            ? 'bg-blue-500 border-blue-400'
                            : 'bg-black/40 border-white/40 hover:border-white'
                        }`}
                      >
                        {selectedIds.includes(item.id) && <div className="w-3 h-3 bg-white rounded-sm" />}
                      </button>

                      {/* ID con botón copiar */}
                      <div className="flex items-center gap-2">
                        <code className="text-[10px] font-mono text-white/90 bg-black/50 px-2 py-1 rounded truncate max-w-[160px]">
                          {item.id}
                        </code>
                        <button
                          onClick={(e) => handleCopyId(item.id, item.name, e)}
                          className="p-1 bg-white/20 hover:bg-white/30 rounded transition-colors"
                          title="Copiar nombre + ID"
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

                    {/* Botón de eliminar */}
                    <button
                      onClick={(e) => handleDelete(item.id, e)}
                      className="p-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg border border-red-500/30 transition-all shadow-lg group"
                      title={selectedIds.length > 0 ? `Eliminar ${selectedIds.length} seleccionados` : "Eliminar plantilla"}
                    >
                      <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Label always visible for all items */}
              <div className="absolute -bottom-16 left-0 right-0 text-center transition-opacity duration-300">
                <h3 className={`font-bold text-lg ${isSelected ? 'text-green-400' : 'text-white'}`}>
                  {item.name}
                </h3>
                <p className="text-zinc-400 text-sm capitalize">{item.category}</p>
                {isSelected && (
                  <span className="inline-block mt-2 px-4 py-1 bg-green-500 text-white text-sm rounded-full font-semibold">
                    Seleccionado
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Instructions */}
      <div className="h-16 flex flex-col items-center justify-center relative">
        <span className="text-zinc-400 text-sm">
          {currentIndex + 1} / {items.length}
        </span>
        <span className="text-zinc-500 text-xs mt-1">
          Arrastra o haz clic en cualquier plantilla para seleccionar
        </span>

        {/* Floating bulk delete button */}
        {isAdmin && selectedIds.length > 0 && onDelete && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(selectedIds.length > 0 ? selectedIds : []); }}
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
