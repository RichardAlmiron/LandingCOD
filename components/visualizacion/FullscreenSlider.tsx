'use client';
import React, { useState } from 'react';
import LivePDPPreview from '@/components/panel-de-administracion/LivePDPPreview';
import { PdpTemplate } from '@/lib/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FullscreenSliderProps {
  items: PdpTemplate[];
  selectedId: string;
  onSelect: (id: string) => void;
  onConfirmSelect?: (id: string) => void;
}

export default function FullscreenSlider({ items, selectedId, onSelect, onConfirmSelect }: FullscreenSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedIndex = items.findIndex(item => item.id === selectedId);
  const currentItem = items[currentIndex];

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const selectCurrent = () => {
    onSelect(currentItem.id);
    onConfirmSelect?.(currentItem.id);
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Main slider area */}
      <div className="flex-1 relative flex items-center justify-center bg-zinc-950">
        {/* Navigation buttons */}
        <button 
          onClick={goToPrev}
          className="absolute left-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button 
          onClick={goToNext}
          className="absolute right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Current PDP */}
        <div 
          className={`relative transition-all duration-500 ${
            selectedId === currentItem.id ? 'scale-105 ring-4 ring-indigo-500' : 'scale-100'
          }`}
          onClick={selectCurrent}
        >
          <LivePDPPreview 
            templateId={currentItem.id}
            width={500}
            height={500}
            className="rounded-xl shadow-2xl cursor-pointer"
          />
          
          {/* Info overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-black/60 backdrop-blur-md rounded-lg p-4">
              <h2 className="text-white font-bold text-lg">{currentItem.name}</h2>
              <p className="text-zinc-400 text-sm capitalize">{currentItem.categoria_nombre || 'General'}</p>
              {currentItem.premium && (
                <span className="inline-block mt-2 px-3 py-1 bg-amber-500/20 text-amber-400 text-sm rounded-full">
                  Premium Template
                </span>
              )}
            </div>
          </div>

          {/* Selection badge */}
          {selectedId === currentItem.id && (
            <div className="absolute top-4 right-4 px-4 py-2 bg-indigo-500 text-white font-bold rounded-full shadow-lg">
              Seleccionado
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="h-28 bg-zinc-900 flex items-center gap-2 px-4 overflow-x-auto">
        {items.map((item, index) => (
          <div
            key={item.id}
            role="button"
            onClick={() => setCurrentIndex(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all cursor-pointer ${
              index === currentIndex 
                ? 'ring-2 ring-indigo-500 scale-110' 
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <LivePDPPreview 
              templateId={item.id}
              width={80}
              height={80}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
