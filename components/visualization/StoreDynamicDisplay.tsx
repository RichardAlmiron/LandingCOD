'use client';
import React, { lazy, Suspense } from 'react';
import { DisplayMode } from '@/components/admin/DisplayModeSelector';
import { Loader2 } from 'lucide-react';

// Lazy load store visualization components
const StoreFilmStrip = lazy(() => import('@/components/visualization/StoreFilmStrip'));
const StoreCoverFlow = lazy(() => import('@/components/visualization/StoreCoverFlow'));

interface StoreDynamicDisplayProps {
  mode: DisplayMode;
  items: any[];
  selectedId: string;
  onSelect: (id: string) => void;
  onConfirmSelect?: (id: string) => void;
}

export default function StoreDynamicDisplay({ 
  mode, 
  items, 
  selectedId, 
  onSelect, 
  onConfirmSelect 
}: StoreDynamicDisplayProps) {
  
  const renderComponent = () => {
    switch (mode) {
      case 'filmstrip':
        return (
          <StoreFilmStrip
            items={items}
            selectedId={selectedId}
            onSelect={onSelect}
            onConfirmSelect={onConfirmSelect}
          />
        );
      case 'coverflow':
        return (
          <StoreCoverFlow
            items={items}
            selectedId={selectedId}
            onSelect={onSelect}
            onConfirmSelect={onConfirmSelect}
          />
        );
      default:
        return (
          <StoreFilmStrip
            items={items}
            selectedId={selectedId}
            onSelect={onSelect}
            onConfirmSelect={onConfirmSelect}
          />
        );
    }
  };

  return (
    <div className="w-full h-full">
      <Suspense fallback={
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        </div>
      }>
        {renderComponent()}
      </Suspense>
    </div>
  );
}
