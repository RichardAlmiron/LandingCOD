'use client';

import React from 'react';
import { StoreModel } from '@/lib/types';
import { LayoutGrid, Sparkles, Image, Palette, Zap } from 'lucide-react';

interface StoreModelOption {
  id: StoreModel;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
}

const models: StoreModelOption[] = [
  {
    id: 'marketplace',
    name: 'Marketplace Clásico',
    description: 'Grid tradicional de productos con banner superior. Ideal para catálogos grandes.',
    icon: <LayoutGrid className="w-6 h-6" />,
    color: '#6366f1',
    features: ['Grid de 4 columnas', 'Banner hero', 'Filtros laterales', 'Paginación']
  },
  {
    id: 'hero-landing',
    name: 'Landing Hero',
    description: 'Producto destacado grande con grid secundario. Perfecto para destacar un bestseller.',
    icon: <Sparkles className="w-6 h-6" />,
    color: '#f59e0b',
    features: ['Producto hero destacado', 'Grid secundario 3 cols', 'CTA principal', 'Social proof']
  },
  {
    id: 'carousel-premium',
    name: 'Carrusel Premium',
    description: 'Carrusel de banners rotativos con productos destacados. Elegante y dinámico.',
    icon: <Image className="w-6 h-6" />,
    color: '#8b5cf6',
    features: ['Carrusel de banners', 'Productos destacados', 'Transiciones suaves', 'Indicadores']
  },
  {
    id: 'minimal-elegant',
    name: 'Minimalista Elegante',
    description: 'Diseño limpio con mucho espacio, tipografía elegante. Para marcas premium.',
    icon: <Palette className="w-6 h-6" />,
    color: '#10b981',
    features: ['Espaciado amplio', 'Tipografía serif', 'Fotos grandes', 'Sin distracciones']
  },
  {
    id: 'flash-deal',
    name: 'Flash Deal',
    description: 'Urgencia y escasez con contadores visuales. Ideal para ofertas flash.',
    icon: <Zap className="w-6 h-6" />,
    color: '#ef4444',
    features: ['Contador de urgencia', 'Badges de escasez', 'Precios tachados', 'Stock limitado']
  }
];

interface StoreModelSelectorProps {
  currentModel: StoreModel;
  onModelChange: (model: StoreModel) => void;
}

export default function StoreModelSelector({ currentModel, onModelChange }: StoreModelSelectorProps) {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
        <h3 className="font-semibold text-zinc-900 dark:text-white">Modelo de Tienda</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Selecciona la estructura visual que mejor se adapte a tu catálogo
        </p>
      </div>
      
      <div className="p-4 space-y-3">
        {models.map((model) => (
          <div
            key={model.id}
            onClick={() => onModelChange(model.id)}
            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              currentModel === model.id
                ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10'
                : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${model.color}20`, color: model.color }}
              >
                {model.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-zinc-900 dark:text-white">
                    {model.name}
                  </h4>
                  {currentModel === model.id && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-indigo-500 text-white rounded-full">
                      Activo
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  {model.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {model.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-zinc-50 dark:bg-zinc-800/30 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
          El modelo seleccionado se guardará y se reflejará en el dashboard del cliente
        </p>
      </div>
    </div>
  );
}

export { models };
export type { StoreModelOption };
