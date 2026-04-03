'use client';
import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';
import { Product } from '@/lib/types';

interface EnhancedProductGalleryProps {
  product: Product;
  accentColor?: string;
}

export default function EnhancedProductGallery({ 
  product,
  accentColor = '#6366f1'
}: EnhancedProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Combinar imágenes del producto: 1 principal + máximo 4 miniaturas, sin videos
  const allMedia = useMemo(() => {
    const media: Array<{ type: 'image', url: string }> = [];
    
    // Imagen principal primero (imageUrl)
    if (product.imageUrl) {
      media.push({ type: 'image', url: product.imageUrl });
    }

    // Agregar imágenes únicas de los arrays (sin duplicar la principal)
    const uniqueImages = new Set<string>(product.imageUrl ? [product.imageUrl] : []);
    const imageArrays = [
      product.original_images || [],
      product.edited_images || [],
      product.images || [],
    ];
    
    imageArrays.forEach(arr => {
      arr.forEach(img => {
        if (img && !uniqueImages.has(img) && media.length < 5) {
          uniqueImages.add(img);
          media.push({ type: 'image', url: img });
        }
      });
    });

    // Pad with high-quality placeholders until we have exactly 5 items (1 main + 4 thumbnails)
    // Only premium tech/electronics placeholders based on current sub-niche rules!
    const fallbacks = [
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1000&auto=format&fit=crop', // Tech setup
      'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000&auto=format&fit=crop', // Circuit board / Abstract tech
      'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?q=80&w=1000&auto=format&fit=crop', // Electronic gadgets macro
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop'  // Circuit chip
    ];
    let fallbackIndex = 0;
    while (media.length < 5) {
      media.push({ type: 'image', url: fallbacks[fallbackIndex % fallbacks.length] });
      fallbackIndex++;
    }
    
    return media;
  }, [product]);

  const nextMedia = () => {
    setSelectedIndex((prev) => (prev + 1) % allMedia.length);
  };

  const prevMedia = () => {
    setSelectedIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  const currentMedia = allMedia[selectedIndex];

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-4">
        {/* Large Media Display */}
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 group">
          <img 
            src={currentMedia?.url || product.imageUrl} 
            alt={`${product.title} - Vista ${selectedIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Navigation Arrows */}
          {allMedia.length > 1 && (
            <>
              <button
                onClick={prevMedia}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10"
                style={{ color: accentColor }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextMedia}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10"
                style={{ color: accentColor }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Zoom Button */}
          <button
            onClick={() => setIsZoomed(true)}
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10"
              style={{ color: accentColor }}
            >
              <ZoomIn className="w-5 h-5" />
            </button>

          {/* Media Counter */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold z-10">
            {selectedIndex + 1} / {allMedia.length}
          </div>
        </div>

        {/* Thumbnails — exactamente 4 miniaturas alineadas al ancho de la imagen principal */}
        {allMedia.length > 1 && (
          <div className="grid grid-cols-4 gap-2" style={{ width: '100%' }}>
            {allMedia.slice(1, 5).map((media, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx + 1)}
                className={`aspect-square rounded-xl overflow-hidden transition-all ${
                  selectedIndex === idx + 1
                    ? 'ring-3 ring-offset-1 scale-[1.03]' 
                    : 'opacity-60 hover:opacity-100'
                }`}
                style={selectedIndex === idx + 1 ? { 
                  '--tw-ring-color': accentColor 
                } as React.CSSProperties : {}}
              >
                <img 
                  src={media.url} 
                  alt={`${product.title} - Miniatura ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Zoomed Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="relative max-w-6xl w-full">
            <img 
              src={currentMedia.url} 
              alt={`${product.title} - Vista ampliada`}
              className="w-full h-auto rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Navigation in Zoom */}
            {allMedia.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevMedia(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                
                <button
                  onClick={(e) => { e.stopPropagation(); nextMedia(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
