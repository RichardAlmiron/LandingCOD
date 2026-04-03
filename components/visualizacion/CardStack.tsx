'use client';
import React, { useState } from 'react';
import LivePDPPreview from '@/components/panel-de-administracion/LivePDPPreview';
import { PdpTemplate } from '@/lib/types';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';

interface CardStackProps {
  items: PdpTemplate[];
  selectedId: string;
  onSelect: (id: string) => void;
  onConfirmSelect?: (id: string) => void;
}

export default function CardStack({ items, selectedId, onSelect, onConfirmSelect }: CardStackProps) {
  const [stackIndex, setStackIndex] = useState(0);
  const currentItems = items.slice(stackIndex, stackIndex + 3);

  const nextCard = () => {
    if (stackIndex < items.length - 1) {
      setStackIndex(prev => prev + 1);
    }
  };

  const prevCard = () => {
    if (stackIndex > 0) {
      setStackIndex(prev => prev - 1);
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-950 to-zinc-900">
      {/* Stack of cards */}
      <div className="relative w-[400px] h-[500px]">
        {currentItems.map((item, idx) => {
          const isSelected = selectedId === item.id;
          const offset = idx * 20;
          const scale = 1 - idx * 0.05;
          const zIndex = 30 - idx;

          return (
            <div
              key={item.id}
              className={`absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer ${
                isSelected ? 'ring-4 ring-indigo-500' : ''
              }`}
              style={{
                transform: `translateY(${offset}px) scale(${scale})`,
                zIndex,
              }}
              onClick={() => { onSelect(item.id); onConfirmSelect?.(item.id); }}
            >
              <LivePDPPreview 
                templateId={item.id}
                width={400}
                height={500}
                className="w-full h-full"
              />
              
              {/* Card info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                <h3 className="text-white font-bold text-lg">{item.name}</h3>
                <p className="text-zinc-400 text-sm capitalize">{item.categoria_nombre || 'General'}</p>
                {false && (
                  <span className="inline-block mt-2 px-2 py-1 bg-amber-500 text-white text-xs rounded-full">
                    Premium
                  </span>
                )}
              </div>

              {isSelected && (
                <div className="absolute top-4 right-4 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}

        {/* Stack indicator */}
        <div className="absolute -top-12 left-0 right-0 flex items-center justify-center gap-2">
          <Layers className="w-5 h-5 text-zinc-500" />
          <span className="text-zinc-400 text-sm">
            {stackIndex + 1} de {items.length}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <button 
        onClick={prevCard}
        disabled={stackIndex === 0}
        className="absolute left-8 w-14 h-14 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-full flex items-center justify-center transition-colors"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>
      <button 
        onClick={nextCard}
        disabled={stackIndex >= items.length - 1}
        className="absolute right-8 w-14 h-14 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-full flex items-center justify-center transition-colors"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>
    </div>
  );
}
