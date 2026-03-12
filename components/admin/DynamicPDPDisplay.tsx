'use client';
import React, { Suspense, lazy } from 'react';
import { PdpTemplate } from '@/lib/types';
import { DisplayMode } from './DisplayModeSelector';

// Lazy load visualization components
const FullscreenSlider = lazy(() => import('@/components/visualization/FullscreenSlider'));
const CardStack = lazy(() => import('@/components/visualization/CardStack'));
const FilmStrip = lazy(() => import('@/components/visualization/FilmStrip'));
const CoverFlow = lazy(() => import('@/components/visualization/CoverFlow'));

interface DynamicPDPDisplayProps {
  mode: DisplayMode;
  items: PdpTemplate[];
  selectedId: string;
  onSelect: (id: string) => void;
  onConfirmSelect?: (id: string) => void;
  isAdmin?: boolean;
  onDeleteTemplate?: (id: string) => void;
  templateType?: 'pdp' | 'store';
  useLivePreview?: boolean;
}

export default function DynamicPDPDisplay({
  mode,
  items,
  selectedId,
  onSelect,
  onConfirmSelect
}: DynamicPDPDisplayProps) {
  const commonProps = {
    items,
    selectedId,
    onSelect,
    onConfirmSelect
  };

  const renderComponent = () => {
    switch (mode) {
      case 'fullscreenslider':
        return <FullscreenSlider {...commonProps} />;
      case 'cardstack':
        return <CardStack {...commonProps} />;
      case 'filmstrip':
        return <FilmStrip {...commonProps} />;
      case 'coverflow':
        return <CoverFlow {...commonProps} />;
      default:
        return <FullscreenSlider {...commonProps} />;
    }
  };

  // Loading component with mode information
  const LoadingFallback = () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      <p className="text-zinc-400 text-sm">Cargando modo {mode}...</p>
    </div>
  );

  return (
    <div className="w-full h-full">
      <Suspense fallback={<LoadingFallback />}>
        {renderComponent()}
      </Suspense>
    </div>
  );
}
