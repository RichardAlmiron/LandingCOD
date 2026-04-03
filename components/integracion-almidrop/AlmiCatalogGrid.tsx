'use client';

import React, { useState } from 'react';
import { Package, Heart, Eye, CheckCircle2, ArrowRight } from 'lucide-react';
import { AlmiProduct } from '@/hooks/useAlmiCatalog';

interface AlmiCatalogGridProps {
  products: AlmiProduct[];
  selectedIds: Set<string>;
  onToggleSelection: (id: string) => void;
  stockIds: Set<string>;
  isExpressMode: boolean;
  onViewDetails: (product: AlmiProduct) => void;
  loading?: boolean;
  emptyMessage?: string;
  flowType?: 'store' | 'pdp';
}

const CARD_MIN_WIDTH = 145;
const GRID_GAP = 12;

export default function AlmiCatalogGrid({
  products,
  selectedIds,
  onToggleSelection,
  stockIds,
  isExpressMode,
  onViewDetails,
  loading,
  emptyMessage = 'No hay productos disponibles',
  flowType = 'store'
}: AlmiCatalogGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavoriteIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const hasStock = (productId: string) => {
    if (isExpressMode) return true;
    return stockIds.has(productId);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4rem'
      }}>
        <div className="auth-loading" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem',
        gap: '1rem'
      }}>
        <Package size={48} style={{ color: 'var(--text-muted)', opacity: 0.4 }} />
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, ${CARD_MIN_WIDTH}px)`,
      gap: `${GRID_GAP}px`,
      width: '100%',
      justifyContent: 'center'
    }}>
      {products.map(product => {
        const isSelected = selectedIds.has(product.id);
        const isFav = favoriteIds.has(product.id);
        const isHovered = hoveredId === product.id;
        const productHasStock = hasStock(product.id);

        // Imagen a mostrar (segunda imagen en hover si existe)
        const displayImage = isHovered && product.images?.[1] 
          ? product.images[1] 
          : product.imageUrl;

        return (
          <div
            key={product.id}
            className="product-card-almiplace"
            style={{
              overflow: 'hidden',
              border: productHasStock 
                ? '1px solid #00c8c8' 
                : '1px solid var(--border)',
              borderRadius: '0',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              position: 'relative',
              background: productHasStock 
                ? 'rgba(20, 20, 25, 0.85)' 
                : 'rgba(15, 15, 20, 0.7)',
              opacity: productHasStock ? 1 : 0.85,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: productHasStock 
                ? '0 0 0 1px rgba(0, 200, 200, 0.3), 0 4px 12px rgba(0, 0, 0, 0.4)'
                : '0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 12px rgba(0, 0, 0, 0.2)',
              cursor: 'pointer',
            }}
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Esquina decorativa cian */}
            <div 
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '15px',
                height: '15px',
                background: 'linear-gradient(135deg, transparent 50%, var(--accent, #00f3ff) 50%)',
                opacity: 0.6,
                pointerEvents: 'none',
                zIndex: 5,
              }}
            />

            {/* Stock Express Badge - Círculo cian sólido */}
            {productHasStock && (
              <div style={{
                position: 'absolute',
                top: '0.4rem',
                left: '0.4rem',
                zIndex: 3,
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: '#00c8c8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0, 200, 200, 0.4)',
              }}>
                <span style={{ fontSize: '0.8rem', lineHeight: 1 }}>⚡</span>
              </div>
            )}

            {/* Favorite Button */}
            <button
              onClick={(e) => toggleFavorite(e, product.id)}
              style={{
                position: 'absolute',
                top: '0.4rem',
                right: '0.4rem',
                zIndex: 3,
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                background: isFav ? 'rgba(239, 68, 68, 0.9)' : 'rgba(0,0,0,0.4)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
            >
              <Heart size={14} fill={isFav ? '#fff' : 'none'} />
            </button>

            {/* Selection Badge - Oculto por diseño AlmiPlace */}
            {isSelected && (
              <div style={{
                position: 'absolute',
                top: productHasStock ? '2.4rem' : '0.4rem',
                left: '0.4rem',
                zIndex: 3,
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: '#6366f1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(99, 102, 241, 0.4)'
              }}>
                <CheckCircle2 size={16} color="#fff" />
              </div>
            )}

            {/* Imagen con hover effect AlmiPlace */}
            <div
              onClick={() => onViewDetails(product)}
              style={{
                height: '130px',
                background: 'var(--bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                flexShrink: 0
              }}
            >
              {displayImage ? (
                <img
                  src={displayImage}
                  alt={product.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                  }}
                />
              ) : (
                <Package size={32} style={{ color: 'var(--text-muted)', opacity: 0.3 }} />
              )}
            </div>

            {/* Content */}
            <div style={{
              padding: '0.65rem',
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Categoría - Color cian AlmiPlace */}
              <div style={{
                fontSize: '0.6rem',
                fontWeight: 600,
                color: '#00c8c8',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                marginBottom: '0.15rem'
              }}>
                {product.category}
              </div>

              {/* Nombre con cursor pointer */}
              <h3 style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                marginBottom: '0.35rem',
                lineHeight: 1.25,
                height: '2rem',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }} onClick={() => onViewDetails(product)}>
                {product.title}
              </h3>

              {/* Prices - Guaraníes format */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                minHeight: '2.8rem',
                marginBottom: '0.5rem',
                gap: '0.4rem'
              }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontSize: '0.55rem',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    lineHeight: 1.2
                  }}>
                    Tu costo
                  </div>
                  <div style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    lineHeight: 1.3,
                    whiteSpace: 'nowrap'
                  }}>
                    Gs. {Math.round(product.costPrice || 0).toLocaleString('es-PY')}
                  </div>
                </div>
                <div style={{ textAlign: 'right', minWidth: 0 }}>
                  <div style={{
                    fontSize: '0.55rem',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    lineHeight: 1.2
                  }}>
                    Precio sugerido
                  </div>
                  <div style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: '#10b981',
                    lineHeight: 1.3,
                    whiteSpace: 'nowrap'
                  }}>
                    Gs. {Math.round(product.price).toLocaleString('es-PY')}
                  </div>
                </div>
              </div>

              {/* Botones - Estilo AlmiPlace exacto */}
              <div style={{
                marginTop: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem'
              }}>
                <button
                  onClick={() => onViewDetails(product)}
                  style={{
                    width: '100%',
                    padding: '0.4rem',
                    borderRadius: '8px',
                    border: '1px solid var(--accent, #00f3ff)',
                    background: 'transparent',
                    color: 'var(--accent, #00f3ff)',
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem',
                    transition: 'all 0.2s'
                  }}
                >
                  <Eye size={13} /> Más información
                </button>

                {productHasStock ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSelection(product.id);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.45rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: isSelected ? '#6366f1' : 'var(--accent, #00f3ff)',
                      color: '#000',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.3rem',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s'
                    }}
                  >
                    <ArrowRight size={14} style={{ flexShrink: 0 }} />
                    {flowType === 'pdp' 
                      ? (isSelected ? '★ Producto Estrella' : 'Elegir como Estrella')
                      : (isSelected ? 'Seleccionado' : 'Seleccionar')
                    }
                  </button>
                ) : (
                  <button
                    onClick={() => onToggleSelection(product.id)}
                    style={{
                      width: '100%',
                      padding: '0.4rem',
                      borderRadius: '8px',
                      border: isSelected ? 'none' : '1px solid var(--accent, #00f3ff)',
                      background: isSelected ? '#6366f1' : 'transparent',
                      color: isSelected ? '#fff' : 'var(--accent, #00f3ff)',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.3rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    <CheckCircle2 size={13} />
                    {flowType === 'pdp'
                      ? (isSelected ? '★ Estrella' : 'Elegir Estrella')
                      : (isSelected ? 'Seleccionado' : 'Seleccionar')
                    }
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
