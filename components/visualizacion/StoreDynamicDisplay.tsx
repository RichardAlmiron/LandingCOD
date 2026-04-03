'use client';
import React, { lazy, Suspense } from 'react';
import { DisplayMode } from '@/components/panel-de-administracion/DisplayModeSelector';
import { Loader2 } from 'lucide-react';

// Lazy load store visualization components
const StoreFilmStrip = lazy(() => import('@/components/visualizacion/StoreFilmStrip'));
const StoreCoverFlow = lazy(() => import('@/components/visualizacion/StoreCoverFlow'));

interface StoreDynamicDisplayProps {
  mode: DisplayMode;
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

export default function StoreDynamicDisplay({ 
  mode, 
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
            isAdmin={isAdmin}
            onVerifyToggle={onVerifyToggle}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
            onDelete={onDelete}
            selectedIds={selectedIds}
            onToggleSelection={onToggleSelection}
          />
        );
      case 'coverflow':
        return (
          <StoreCoverFlow
            items={items}
            selectedId={selectedId}
            onSelect={onSelect}
            onConfirmSelect={onConfirmSelect}
            isAdmin={isAdmin}
            onVerifyToggle={onVerifyToggle}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
            onDelete={onDelete}
            selectedIds={selectedIds}
            onToggleSelection={onToggleSelection}
          />
        );
      default:
        return (
          <StoreFilmStrip
            items={items}
            selectedId={selectedId}
            onSelect={onSelect}
            onConfirmSelect={onConfirmSelect}
            isAdmin={isAdmin}
            onVerifyToggle={onVerifyToggle}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
            onDelete={onDelete}
            selectedIds={selectedIds}
            onToggleSelection={onToggleSelection}
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
