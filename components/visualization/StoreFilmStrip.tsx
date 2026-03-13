'use client';
import React, { useState } from 'react';
import LiveStorePreview from '@/components/admin/LiveStorePreview';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StoreFilmStripProps {
  items: any[];
  selectedId: string;
  onSelect: (id: string) => void;
  onConfirmSelect?: (id: string) => void;
}

export default function StoreFilmStrip({ items, selectedId, onSelect, onConfirmSelect }: StoreFilmStripProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 5;

  const goToPrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(items.length - itemsPerView, prev + 1));
  };

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerView);

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
            const isSelected = selectedId === item.id;
            const isCenter = idx === 2;
            
            return (
              <div
                key={item.id}
                className={`relative mx-2 transition-all duration-500 cursor-pointer ${
                  isCenter ? 'scale-125 z-10' : 'scale-100 opacity-60'
                } ${isSelected ? 'ring-4 ring-indigo-500' : ''}`}
                onClick={() => { onSelect(item.id); onConfirmSelect?.(item.id); }}
              >
                <div className="w-[280px] h-[350px] rounded-lg overflow-hidden shadow-2xl relative bg-zinc-900">
                  <LiveStorePreview
                    templateId={item.id}
                    width={280}
                    height={350}
                    className="w-full h-full"
                  />
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
          disabled={currentIndex >= items.length - itemsPerView}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Film strip controls */}
      <div className="h-20 bg-zinc-900 flex items-center justify-center gap-4 px-4">
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
                idx >= currentIndex && idx < currentIndex + itemsPerView
                  ? 'bg-indigo-500'
                  : 'bg-zinc-700'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={goToNext}
          disabled={currentIndex >= items.length - itemsPerView}
          className="p-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 rounded-lg transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
