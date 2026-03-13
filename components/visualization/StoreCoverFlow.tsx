'use client';
import React, { useState } from 'react';
import LiveStorePreview from '@/components/admin/LiveStorePreview';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StoreCoverFlowProps {
  items: any[];
  selectedId: string;
  onSelect: (id: string) => void;
  onConfirmSelect?: (id: string) => void;
}

export default function StoreCoverFlow({ items, selectedId, onSelect, onConfirmSelect }: StoreCoverFlowProps) {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(items.length / 2));

  const goToPrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(items.length - 1, prev + 1));
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950">
      {/* Cover flow area */}
      <div className="flex-1 relative flex items-center justify-center perspective-[1000px]">
        {items.map((item, index) => {
          const offset = index - currentIndex;
          const absOffset = Math.abs(offset);
          const isSelected = selectedId === item.id;
          const isCenter = offset === 0;
          
          // Calculate 3D transform
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
                <LiveStorePreview
                  templateId={item.id}
                  width={300}
                  height={400}
                  className="w-full h-full"
                />
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
      </div>

      {/* Counter */}
      <div className="h-16 flex items-center justify-center">
        <span className="text-zinc-400">
          {currentIndex + 1} / {items.length}
        </span>
      </div>
    </div>
  );
}
