'use client';

import React, { useState } from 'react';
import { X, MapPin, CheckCircle2, Image, Camera, Film, ExternalLink, Zap } from 'lucide-react';
import { AlmiProduct } from '@/hooks/useAlmiCatalog';

interface AlmiProductModalProps {
  product: AlmiProduct | null;
  hasStock: boolean;
  onClose: () => void;
  onSelect: () => void;
  isSelected: boolean;
}

// SVG Divider Component - Exact AlmiPlace style
const DividerSVG = () => (
  <svg width="100%" height="12" viewBox="0 0 400 12" preserveAspectRatio="none" fill="none" style={{ display: 'block', margin: '0.25rem 0' }}>
    <line x1="0" y1="6" x2="170" y2="6" stroke="url(#divGradL)" strokeWidth="1" />
    <polygon points="185,2 192,6 185,10" fill="url(#divAccent)" opacity="0.5" />
    <circle cx="200" cy="6" r="2.5" fill="url(#divAccent)" />
    <polygon points="215,2 208,6 215,10" fill="url(#divAccent)" opacity="0.5" />
    <line x1="230" y1="6" x2="400" y2="6" stroke="url(#divGradR)" strokeWidth="1" />
    <defs>
      <linearGradient id="divGradL" x1="0" y1="6" x2="170" y2="6" gradientUnits="userSpaceOnUse">
        <stop stopColor="transparent" />
        <stop offset="1" stopColor="var(--border)" />
      </linearGradient>
      <linearGradient id="divGradR" x1="230" y1="6" x2="400" y2="6" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--border)" />
        <stop offset="1" stopColor="transparent" />
      </linearGradient>
      <linearGradient id="divAccent" x1="185" y1="2" x2="215" y2="10" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ff6b00" />
        <stop offset="1" stopColor="#00c8c8" />
      </linearGradient>
    </defs>
  </svg>
);

// Quote SVG Component
const QuoteSVG = () => (
  <svg width="20" height="16" viewBox="0 0 20 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
    <path d="M8 0C3.6 2.4 0 6.4 0 11.2c0 2.8 1.6 4.8 4 4.8 2 0 3.6-1.6 3.6-3.6 0-2-1.2-3.2-2.8-3.2-.4 0-.8.1-1.2.2C4 6.8 5.6 4 8 2.4L8 0zm12 0c-4.4 2.4-8 6.4-8 11.2 0 2.8 1.6 4.8 4 4.8 2 0 3.6-1.6 3.6-3.6 0-2-1.2-3.2-2.8-3.2-.4 0-.8.1-1.2.2C16 6.8 17.6 4 20 2.4L20 0z" fill="url(#quoteGrad)" opacity="0.25" />
    <defs>
      <linearGradient id="quoteGrad" x1="0" y1="0" x2="20" y2="16" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ff6b00" />
        <stop offset="1" stopColor="#ff8c00" />
      </linearGradient>
    </defs>
  </svg>
);

export default function AlmiProductModal({
  product,
  hasStock,
  onClose,
  onSelect,
  isSelected
}: AlmiProductModalProps) {
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return null;

  const profit = Math.round(product.price - (product.costPrice || 0));
  const profitPct = (product.costPrice || 0) > 0 ? Math.round((profit / (product.costPrice || 1)) * 100) : 0;

  // Extract all image sources
  const editedImages = product.edited_images || [];
  const originalImages = product.original_images || [];
  const videos = product.videos || [];
  const allImages = [...editedImages, ...originalImages];
  const mainImage = allImages[activeImage] || product.imageUrl;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(4px)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '580px',
          maxHeight: '90vh',
          background: 'var(--bg-surface)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Hero Image Section */}
        <div style={{
          position: 'relative',
          height: '280px',
          background: 'var(--bg-elevated)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {mainImage ? (
            <img
              src={mainImage}
              alt={product.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <Image size={64} style={{ color: 'var(--text-muted)', opacity: 0.2 }} />
          )}

          {/* Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7))'
          }} />

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(0,0,0,0.5)',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)'
            }}
          >
            <X size={20} />
          </button>

          {/* Stock Badge */}
          {hasStock && (
            <div style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: '#00c8c8',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#000'
            }}>
              <span>⚡</span>
              Stock Express
            </div>
          )}

          {/* Category Badge */}
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            padding: '0.375rem 0.875rem',
            background: 'rgba(0,0,0,0.6)',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#fff'
          }}>
            {product.category}
          </div>
        </div>

        {/* Content */}
        <div style={{
          padding: '1.25rem',
          flex: 1,
          overflowY: 'auto'
        }}>
          {/* Title Section */}
          <div style={{ marginBottom: '0.5rem' }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
              lineHeight: 1.3
            }}>
              {product.title}
            </h2>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.8rem',
              color: 'var(--text-muted)'
            }}>
              {product.productCode && (
                <span style={{
                  padding: '0.25rem 0.5rem',
                  background: 'var(--bg-elevated)',
                  borderRadius: '4px',
                  fontWeight: 600
                }}>
                  {product.productCode}
                </span>
              )}
              <div style={{ position: 'relative', display: 'inline-flex' }}>
                <button
                  title="Ver disponibilidad por ciudad"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    border: 'none',
                    background: 'rgba(0, 200, 200, 0.12)',
                    color: '#00b8b8',
                    cursor: 'pointer'
                  }}
                >
                  <MapPin size={12} />
                </button>
              </div>
            </div>
          </div>

          <DividerSVG />

          {/* Description Section */}
          <div style={{ margin: '0.75rem 0' }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <QuoteSVG />
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Descripción del producto
              </span>
            </div>
            <div style={{
              position: 'relative',
              paddingLeft: '0.75rem',
              borderLeft: '2px solid #ff6b00'
            }}>
              <p style={{
                fontSize: '0.9rem',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                whiteSpace: 'pre-wrap'
              }}>
                {product.description}
              </p>
            </div>
          </div>

          <DividerSVG />

          {/* Pricing Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.75rem',
            margin: '0.75rem 0'
          }}>
            <div style={{
              padding: '0.875rem',
              background: 'var(--bg-elevated)',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                fontWeight: 600,
                textTransform: 'uppercase',
                marginBottom: '0.25rem'
              }}>
                Tu Costo
              </div>
              <div style={{
                fontSize: '1.1rem',
                fontWeight: 800,
                color: 'var(--text-primary)'
              }}>
                Gs. {Math.round(product.costPrice || 0).toLocaleString('es-PY')}
              </div>
            </div>
            <div style={{
              padding: '0.875rem',
              background: 'var(--bg-elevated)',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                fontWeight: 600,
                textTransform: 'uppercase',
                marginBottom: '0.25rem'
              }}>
                Precio Sugerido
              </div>
              <div style={{
                fontSize: '1.1rem',
                fontWeight: 800,
                color: '#10b981'
              }}>
                Gs. {Math.round(product.price).toLocaleString('es-PY')}
              </div>
            </div>
            <div style={{
              padding: '0.875rem',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(0, 200, 200, 0.1) 100%)',
              borderRadius: '10px',
              textAlign: 'center',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <div style={{
                fontSize: '0.7rem',
                color: '#10b981',
                fontWeight: 600,
                textTransform: 'uppercase',
                marginBottom: '0.25rem'
              }}>
                Tu Ganancia
              </div>
              <div style={{
                fontSize: '1.1rem',
                fontWeight: 800,
                color: '#10b981'
              }}>
                Gs. {profit.toLocaleString('es-PY')}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#00c8c8',
                fontWeight: 700
              }}>
                +{profitPct}%
              </div>
            </div>
          </div>

          <DividerSVG />

          {/* Materials Section */}
          {(editedImages.length > 0 || originalImages.length > 0 || videos.length > 0) && (
            <div style={{ margin: '0.75rem 0' }}>
              <div style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '0.75rem'
              }}>
                Materiales del producto
              </div>

              {/* Edited Images */}
              {editedImages.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem',
                    fontSize: '0.75rem',
                    color: 'var(--accent)'
                  }}>
                    <Image size={13} />
                    <span>Imágenes editadas ({editedImages.length})</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap'
                  }}>
                    {editedImages.map((img: string, idx: number) => (
                      <img
                        key={`edited-${idx}`}
                        src={img}
                        alt={`Editada ${idx + 1}`}
                        onClick={() => setActiveImage(idx)}
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          border: activeImage === idx ? '2px solid #6366f1' : '2px solid transparent'
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Original Images */}
              {originalImages.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem',
                    fontSize: '0.75rem',
                    color: '#f59e0b'
                  }}>
                    <Camera size={13} />
                    <span>Fotos reales ({originalImages.length})</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap'
                  }}>
                    {originalImages.map((img: string, idx: number) => (
                      <img
                        key={`original-${idx}`}
                        src={img}
                        alt={`Real ${idx + 1}`}
                        onClick={() => setActiveImage(editedImages.length + idx)}
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          border: activeImage === editedImages.length + idx ? '2px solid #f59e0b' : '2px solid transparent'
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Videos */}
              {videos.length > 0 && (
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem',
                    fontSize: '0.75rem',
                    color: '#ef4444'
                  }}>
                    <Film size={13} />
                    <span>Videos ({videos.length})</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    {videos.map((video: string, idx: number) => (
                      <a
                        key={`video-${idx}`}
                        href={video}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 0.75rem',
                          background: 'var(--bg-elevated)',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          color: 'var(--text-primary)',
                          textDecoration: 'none',
                          transition: 'all 0.2s'
                        }}
                      >
                        <Film size={14} />
                        <span>Video {idx + 1}</span>
                        <ExternalLink size={12} style={{ marginLeft: 'auto', opacity: 0.6 }} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <button
              onClick={onSelect}
              style={{
                flex: 1,
                padding: '0.875rem 1.5rem',
                borderRadius: '10px',
                border: isSelected ? 'none' : '2px solid var(--accent)',
                background: isSelected ? 'var(--accent)' : 'transparent',
                color: isSelected ? '#fff' : 'var(--accent)',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <CheckCircle2 size={20} />
              {isSelected ? 'Seleccionado' : 'Seleccionar Producto'}
            </button>

            {hasStock && (
              <button
                style={{
                  padding: '0.875rem 1.5rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#00c8c8',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <Zap size={20} />
                Enviar al Cliente
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
