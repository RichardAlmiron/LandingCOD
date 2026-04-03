'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronRight, Search, Package, Check } from 'lucide-react';
import { City } from '@/hooks/useExpressStock';

interface ExpressStockBarProps {
  cities: City[];
  citiesLoading: boolean;
  selectedCity: string;
  onCitySelect: (city: string) => void;
  selectedCities: string[];
  onMultiCitySelect: (cities: string[]) => void;
}

export default function ExpressStockBar({
  cities,
  citiesLoading,
  selectedCity,
  onCitySelect,
  selectedCities,
  onMultiCitySelect
}: ExpressStockBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<'above' | 'below'>('above');
  const cityRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const modalRef = useRef<HTMLDivElement>(null);

  // USAR DATOS REALES de la API - no generar stock falso
  const cityData = cities;

  const filteredCities = cityData.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topCities = cityData.slice(0, 5);

  const handleCityToggle = (cityName: string) => {
    const currentCities = new Set(selectedCities);
    if (currentCities.has(cityName)) {
      currentCities.delete(cityName);
    } else {
      currentCities.add(cityName);
    }
    const newCities = Array.from(currentCities);
    onMultiCitySelect(newCities);
    onCitySelect(newCities.length === 1 ? newCities[0] : newCities[0] || '');
  };

  const removeCity = (cityName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newCities = selectedCities.filter(c => c !== cityName);
    onMultiCitySelect(newCities);
    onCitySelect(newCities.length === 1 ? newCities[0] : newCities[0] || '');
  };

  const clearAll = () => {
    onMultiCitySelect([]);
    onCitySelect('');
  };

  const handleMouseEnter = (cityName: string, e: React.MouseEvent) => {
    const element = e.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;
    
    setTooltipPosition(spaceAbove > spaceBelow ? 'above' : 'below');
    setHoveredCity(cityName);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const ShieldIcon = ({ size = 10 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 1L29 12L24 28H8L3 12L16 1Z" fill="url(#shieldFill)" stroke="url(#shieldStroke)" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M10 17L16 8L18 14.5H23L16 23L14.5 17H10Z" fill="url(#arrowFill)"/>
      <line x1="6" y1="13" x2="10" y2="13" stroke="url(#lineFill)" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
      <line x1="7" y1="16" x2="11" y2="16" stroke="url(#lineFill)" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
      <line x1="8" y1="19" x2="11" y2="19" stroke="url(#lineFill)" strokeWidth="0.6" strokeLinecap="round" opacity="0.35"/>
      <path d="M20 4C24 5.5 27 8.5 28 12" stroke="url(#orbitStroke)" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6"/>
      <circle cx="28" cy="12" r="1.3" fill="#FFD700" opacity="0.8"/>
      <defs>
        <linearGradient id="shieldFill" x1="3" y1="1" x2="29" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(255,107,0,0.18)"/>
          <stop offset="0.5" stopColor="rgba(200,50,0,0.12)"/>
          <stop offset="1" stopColor="rgba(255,107,0,0.08)"/>
        </linearGradient>
        <linearGradient id="shieldStroke" x1="3" y1="1" x2="29" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700"/>
          <stop offset="0.4" stopColor="#FF8C00"/>
          <stop offset="1" stopColor="#FF4500"/>
        </linearGradient>
        <linearGradient id="arrowFill" x1="10" y1="8" x2="23" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE066"/>
          <stop offset="0.5" stopColor="#FF8C00"/>
          <stop offset="1" stopColor="#FF4500"/>
        </linearGradient>
        <linearGradient id="lineFill" x1="6" y1="13" x2="11" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700"/>
          <stop offset="1" stopColor="#FF6B00"/>
        </linearGradient>
        <linearGradient id="orbitStroke" x1="20" y1="4" x2="28" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE066"/>
          <stop offset="1" stopColor="#FF8C00"/>
        </linearGradient>
      </defs>
    </svg>
  );

  const FireIcon = ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 1L29 12L24 28H8L3 12L16 1Z" fill="url(#fireShieldFill)" stroke="url(#fireShieldStroke)" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M10 17L16 8L18 14.5H23L16 23L14.5 17H10Z" fill="url(#fireArrowFill)"/>
      <line x1="6" y1="13" x2="10" y2="13" stroke="url(#fireLineFill)" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
      <line x1="7" y1="16" x2="11" y2="16" stroke="url(#fireLineFill)" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
      <line x1="8" y1="19" x2="11" y2="19" stroke="url(#fireLineFill)" strokeWidth="0.6" strokeLinecap="round" opacity="0.35"/>
      <path d="M20 4C24 5.5 27 8.5 28 12" stroke="url(#fireOrbitStroke)" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6"/>
      <circle cx="28" cy="12" r="1.3" fill="#FFD700" opacity="0.8"/>
      <defs>
        <linearGradient id="fireShieldFill" x1="3" y1="1" x2="29" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(255,107,0,0.18)"/>
          <stop offset="0.5" stopColor="rgba(200,50,0,0.12)"/>
          <stop offset="1" stopColor="rgba(255,107,0,0.08)"/>
        </linearGradient>
        <linearGradient id="fireShieldStroke" x1="3" y1="1" x2="29" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700"/>
          <stop offset="0.4" stopColor="#FF8C00"/>
          <stop offset="1" stopColor="#FF4500"/>
        </linearGradient>
        <linearGradient id="fireArrowFill" x1="10" y1="8" x2="23" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE066"/>
          <stop offset="0.5" stopColor="#FF8C00"/>
          <stop offset="1" stopColor="#FF4500"/>
        </linearGradient>
        <linearGradient id="fireLineFill" x1="6" y1="13" x2="11" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700"/>
          <stop offset="1" stopColor="#FF6B00"/>
        </linearGradient>
        <linearGradient id="fireOrbitStroke" x1="20" y1="4" x2="28" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE066"/>
          <stop offset="1" stopColor="#FF8C00"/>
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <>
      <div className="esb-bar">
        <div className="esb-orbit-wrap">
          <div className="esb-fire-border"></div>
          <div className="esb-fire-border esb-fire-border--secondary"></div>
          <button
            className={`esb-trigger ${selectedCities.length > 0 ? 'esb-trigger--active' : ''} ${citiesLoading ? 'esb-trigger--loading' : ''}`}
            onClick={() => !citiesLoading && setIsModalOpen(true)}
            aria-haspopup="dialog"
          >
            <div className="esb-corner esb-corner--tl"></div>
            <div className="esb-corner esb-corner--tr"></div>
            <div className="esb-corner esb-corner--bl"></div>
            <div className="esb-corner esb-corner--br"></div>
            <div className="esb-pointer">
              <ChevronRight size={14} />
              <ChevronRight size={14} />
            </div>
            <FireIcon size={16} />
            <span className="esb-trigger-label">ENTREGA EXPRESS</span>
            {selectedCities.length > 0 && (
              <span className="esb-active-badge">{selectedCities.length}</span>
            )}
          </button>
        </div>

        <div className="esb-ticker">
          {citiesLoading ? (
            <div className="esb-ticker-placeholder"></div>
          ) : (
            <>
              <div className="esb-ticker-fade esb-ticker-fade--left"></div>
              <div className="esb-ticker-track">
                <div className="esb-ticker-scroll">
                  {[...topCities, ...topCities, ...topCities].map((city, idx) => (
                    <button
                      key={`${city.name}-${idx}`}
                      className={`esb-ticker-item ${selectedCities.includes(city.name) ? 'esb-ticker-item--active' : ''}`}
                      onClick={() => handleCityToggle(city.name)}
                    >
                      <ShieldIcon size={10} />
                      <span className="esb-ticker-name">{city.name}</span>
                      <span className="esb-ticker-sep">·</span>
                      <span className="esb-ticker-stock">{city.totalStock}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="esb-ticker-fade esb-ticker-fade--right"></div>
            </>
          )}
        </div>

        {selectedCities.length > 0 && (
          <div className="esb-pills">
            {selectedCities.map(cityName => {
              const city = cityData.find(c => c.name === cityName);
              return (
                <div key={cityName} className="esb-pill">
                  <span className="esb-pill-name">{cityName}</span>
                  {city && <span className="esb-pill-stock">{city.totalStock}</span>}
                  <button
                    className="esb-pill-remove"
                    onClick={(e) => removeCity(cityName, e)}
                  >
                    <X size={12} />
                  </button>
                </div>
              );
            })}
            <button className="esb-clear-btn" onClick={clearAll}>
              Limpiar
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="esb-overlay esb-overlay--visible" onClick={() => setIsModalOpen(false)}>
          <div
            ref={modalRef}
            className="esb-modal esb-modal--visible"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="esb-modal-header">
              <div className="esb-modal-header-left">
                <div className="esb-modal-icon">
                  <div className="esb-modal-icon-glow"></div>
                  <FireIcon size={20} />
                </div>
                <div>
                  <div className="esb-modal-title">Entrega Express</div>
                  <div className="esb-modal-subtitle">Filtra por ciudades con stock disponible</div>
                </div>
              </div>
              <button className="esb-modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="esb-modal-toolbar">
              <div className="esb-search-wrap">
                <Search size={16} className="esb-search-icon" />
                <input
                  type="text"
                  className="esb-search-input"
                  placeholder="Buscar ciudad..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="esb-search-clear" onClick={() => setSearchQuery('')}>
                    <X size={14} />
                  </button>
                )}
              </div>
              {selectedCities.length > 0 && (
                <div className="esb-selection-bar">
                  <div className="esb-selection-text">
                    <Check size={14} />
                    {selectedCities.length} {selectedCities.length === 1 ? 'ciudad seleccionada' : 'ciudades seleccionadas'}
                  </div>
                  <button className="esb-selection-clear" onClick={clearAll}>
                    Limpiar todo
                  </button>
                </div>
              )}
            </div>

            <div className="esb-modal-body">
              {filteredCities.length === 0 ? (
                <div className="esb-empty">
                  <Package size={32} opacity={0.3} />
                  <span>No se encontraron ciudades</span>
                </div>
              ) : (
                <div className="esb-grid">
                  {filteredCities.map((city, index) => {
                    const isSelected = selectedCities.includes(city.name);
                    const isTop = index < 5;
                    const maxStock = Math.max(...cityData.map(c => c.totalStock));
                    const barWidth = (city.totalStock / maxStock) * 100;

                    return (
                      <button
                        key={city.name}
                        ref={(el) => {
                          if (el) cityRefs.current.set(city.name, el);
                        }}
                        className={`esb-city ${isSelected ? 'esb-city--selected' : ''} ${isTop ? 'esb-city--top' : ''}`}
                        onClick={() => handleCityToggle(city.name)}
                        onMouseEnter={(e) => handleMouseEnter(city.name, e)}
                        onMouseLeave={() => setHoveredCity(null)}
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        <div className="esb-city-bar" style={{ width: `${barWidth}%` }}></div>
                        <div className="esb-city-content">
                          <div className="esb-city-left">
                            <div className={`esb-city-check ${isSelected ? 'esb-city-check--on' : ''}`}>
                              {isSelected && <Check size={12} />}
                            </div>
                            <div className="esb-city-info">
                              <span className="esb-city-name">{city.name}</span>
                              {isTop && <span className="esb-city-badge">TOP</span>}
                            </div>
                          </div>
                          <div className="esb-city-right">
                            <Package size={14} className="esb-city-pkg" />
                            <span className="esb-city-stock">{city.totalStock}</span>
                          </div>
                        </div>

                        {hoveredCity === city.name && (
                          <div className={`esb-city-tooltip esb-city-tooltip--${tooltipPosition}`}>
                            <div className="esb-tooltip-arrow"></div>
                            <div className="esb-tooltip-header">
                              <ShieldIcon size={14} />
                              <span className="esb-tooltip-title">{city.name}</span>
                            </div>
                            <div className="esb-tooltip-row">
                              <span className="esb-tooltip-label">Stock disponible</span>
                              <span className="esb-tooltip-value">{city.totalStock} unidades</span>
                            </div>
                            <div className="esb-tooltip-bar-wrap">
                              <div className="esb-tooltip-bar" style={{ width: `${barWidth}%` }}></div>
                            </div>
                            <div className="esb-tooltip-hint">
                              {isSelected ? 'Click para deseleccionar' : 'Click para filtrar por esta ciudad'}
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="esb-modal-footer">
              <span className="esb-footer-hint">
                {selectedCities.length === 0
                  ? 'Selecciona al menos una ciudad para filtrar'
                  : `Mostrando productos disponibles en ${selectedCities.length} ${selectedCities.length === 1 ? 'ciudad' : 'ciudades'}`
                }
              </span>
              <button className="esb-footer-done" onClick={() => setIsModalOpen(false)}>
                Listo
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* ── Bar ── */
        .esb-bar {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 0.75rem;
          position: relative;
          flex-wrap: wrap;
          height: auto;
        }

        /* ══════════════════════════════════════════════
           TRIGGER BUTTON — Cut corners (clip-path)
           ══════════════════════════════════════════════ */
        .esb-trigger {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1rem;
          background: linear-gradient(135deg, rgba(255, 107, 0, 0.15), rgba(180, 40, 0, 0.1));
          color: #fff;
          cursor: pointer;
          position: relative;
          border: none;
          clip-path: polygon(
            10px 0%, calc(100% - 10px) 0%,
            100% 10px, 100% calc(100% - 10px),
            calc(100% - 10px) 100%, 10px 100%,
            0% calc(100% - 10px), 0% 10px
          );
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
          -webkit-tap-highlight-color: transparent;
          z-index: 2;
        }
        .esb-trigger::before {
          content: '';
          position: absolute;
          inset: 0;
          clip-path: polygon(
            10px 0%, calc(100% - 10px) 0%,
            100% 10px, 100% calc(100% - 10px),
            calc(100% - 10px) 100%, 10px 100%,
            0% calc(100% - 10px), 0% 10px
          );
          background: linear-gradient(135deg, rgba(255, 107, 0, 0.25), rgba(200, 50, 0, 0.15));
          opacity: 0;
          transition: opacity 0.3s;
        }
        .esb-trigger:hover::before { opacity: 1; }
        .esb-trigger:hover {
          transform: translateY(-1px);
          filter: brightness(1.1);
        }
        .esb-trigger:active { transform: scale(0.98); }
        .esb-trigger--active {
          background: linear-gradient(135deg, rgba(255, 107, 0, 0.25), rgba(200, 50, 0, 0.15));
        }
        .esb-trigger--loading { cursor: default; opacity: 0.6; }

        /* ══════════════════════════════════════════════
           FIRE BORDER — Conic gradient spinning around
           the button edges. Two layers for depth.
           ══════════════════════════════════════════════ */
        .esb-orbit-wrap {
          position: relative;
          flex-shrink: 0;
          z-index: 2;
          padding: 3px;
        }

        /* The spinning fire border — a conic gradient that rotates */
        .esb-fire-border {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          clip-path: polygon(
            10px 0%, calc(100% - 10px) 0%,
            100% 10px, 100% calc(100% - 10px),
            calc(100% - 10px) 100%, 10px 100%,
            0% calc(100% - 10px), 0% 10px
          );
          background: conic-gradient(
            from var(--esb-fire-angle, 0deg),
            transparent 0deg,
            transparent 40deg,
            #CC220088 80deg,
            #FF4500 110deg,
            #FF8C00 130deg,
            #FFD700 145deg,
            #FFFFFF 155deg,
            #FFD700 165deg,
            #FF8C00 180deg,
            #FF4500 200deg,
            #CC220088 230deg,
            transparent 270deg,
            transparent 360deg
          );
          animation: esbFireSpin 2.5s linear infinite;
        }

        /* Secondary layer: slower, offset, more subtle */
        .esb-fire-border--secondary {
          opacity: 0.4;
          filter: blur(3px);
          animation: esbFireSpin 4s linear infinite reverse;
          inset: -2px;
        }

        @keyframes esbFireSpin {
          0%   { --esb-fire-angle: 0deg; }
          100% { --esb-fire-angle: 360deg; }
        }

        /* Register custom property for smooth angle animation */
        @property --esb-fire-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        /* Glow pulse behind the border */
        .esb-orbit-wrap::before {
          content: '';
          position: absolute;
          inset: -4px;
          pointer-events: none;
          z-index: -1;
          clip-path: polygon(
            12px 0%, calc(100% - 12px) 0%,
            100% 12px, 100% calc(100% - 12px),
            calc(100% - 12px) 100%, 12px 100%,
            0% calc(100% - 12px), 0% 12px
          );
          background: transparent;
          box-shadow:
            0 0 12px 3px rgba(255, 107, 0, 0.15),
            0 0 30px 6px rgba(255, 69, 0, 0.08);
          animation: esbGlowPulse 2.5s ease-in-out infinite;
        }
        @keyframes esbGlowPulse {
          0%, 100% { box-shadow: 0 0 10px 2px rgba(255, 107, 0, 0.12), 0 0 24px 5px rgba(255, 69, 0, 0.06); }
          50%      { box-shadow: 0 0 18px 5px rgba(255, 107, 0, 0.25), 0 0 40px 10px rgba(255, 69, 0, 0.12); }
        }

        /* Button sits above the fire border */
        .esb-orbit-wrap .esb-trigger {
          position: relative;
          z-index: 2;
        }

        /* Corner accents (the cut-corner glow lines) */
        .esb-corner {
          position: absolute;
          width: 14px;
          height: 14px;
          z-index: 1;
          pointer-events: none;
        }
        .esb-corner::before, .esb-corner::after {
          content: '';
          position: absolute;
          background: #ff6b00;
          box-shadow: 0 0 6px rgba(255, 107, 0, 0.6);
          animation: esbCornerPulse 3s ease-in-out infinite;
        }
        .esb-corner--tl { top: 0; left: 0; }
        .esb-corner--tl::before { top: 0; left: 0; width: 14px; height: 1.5px; }
        .esb-corner--tl::after { top: 0; left: 0; width: 1.5px; height: 14px; }
        .esb-corner--tr { top: 0; right: 0; }
        .esb-corner--tr::before { top: 0; right: 0; width: 14px; height: 1.5px; }
        .esb-corner--tr::after { top: 0; right: 0; width: 1.5px; height: 14px; }
        .esb-corner--bl { bottom: 0; left: 0; }
        .esb-corner--bl::before { bottom: 0; left: 0; width: 14px; height: 1.5px; }
        .esb-corner--bl::after { bottom: 0; left: 0; width: 1.5px; height: 14px; }
        .esb-corner--br { bottom: 0; right: 0; }
        .esb-corner--br::before { bottom: 0; right: 0; width: 14px; height: 1.5px; }
        .esb-corner--br::after { bottom: 0; right: 0; width: 1.5px; height: 14px; }

        @keyframes esbCornerPulse {
          0%, 100% { opacity: 0.5; box-shadow: 0 0 4px rgba(255, 107, 0, 0.4); }
          50% { opacity: 1; box-shadow: 0 0 10px rgba(255, 107, 0, 0.8); }
        }

        /* Attention pointer (animated chevrons) */
        .esb-pointer {
          position: absolute;
          left: -22px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          color: #ff6b00;
          animation: esbPointerBounce 1.5s ease-in-out infinite;
          filter: drop-shadow(0 0 4px rgba(255, 107, 0, 0.5));
        }
        .esb-pointer > *:first-child { opacity: 0.4; margin-right: -8px; }
        .esb-pointer > *:last-child { opacity: 0.8; }
        @keyframes esbPointerBounce {
          0%, 100% { transform: translateY(-50%) translateX(0); }
          50% { transform: translateY(-50%) translateX(4px); }
        }

        .esb-trigger-label {
          font-weight: 800;
          font-size: 0.68rem;
          letter-spacing: 0.07em;
          position: relative;
          z-index: 1;
          white-space: nowrap;
        }
        .esb-active-badge {
          font-size: 0.58rem;
          font-weight: 800;
          min-width: 17px;
          height: 17px;
          border-radius: 4px;
          background: #ff6b00;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
          position: relative;
          z-index: 1;
          box-shadow: 0 0 8px rgba(255, 107, 0, 0.5);
        }

        /* ══════════════════════════════════════════════
           TICKER — Forex-style scrolling city strip
           ══════════════════════════════════════════════ */
        .esb-ticker {
          flex: 1;
          min-width: 0;
          height: 38px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(90deg, rgba(255, 107, 0, 0.04), rgba(0, 200, 200, 0.03), rgba(255, 107, 0, 0.04));
          border-top: 1px solid rgba(255, 107, 0, 0.12);
          border-bottom: 1px solid rgba(255, 107, 0, 0.12);
        }
        .esb-ticker-placeholder {
          height: 100%;
          background: rgba(255,255,255,0.03);
          animation: esbPulse 1.5s ease-in-out infinite;
        }
        @keyframes esbPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .esb-ticker-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 40px;
          z-index: 2;
          pointer-events: none;
        }
        .esb-ticker-fade--left {
          left: 0;
          background: linear-gradient(to right, var(--bg-primary, #0a0a0a), transparent);
        }
        .esb-ticker-fade--right {
          right: 0;
          background: linear-gradient(to left, var(--bg-primary, #0a0a0a), transparent);
        }

        .esb-ticker-track {
          height: 100%;
          overflow: hidden;
        }
        .esb-ticker-scroll {
          display: flex;
          align-items: center;
          height: 100%;
          gap: 0;
          animation: esbTickerScroll 40s linear infinite;
          width: max-content;
        }
        .esb-ticker-scroll:hover { animation-play-state: paused; }

        @keyframes esbTickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        .esb-ticker-item {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0 1rem;
          height: 100%;
          border: none;
          background: none;
          cursor: pointer;
          white-space: nowrap;
          color: #888;
          transition: all 0.2s;
          border-right: 1px solid rgba(255, 107, 0, 0.08);
          -webkit-tap-highlight-color: transparent;
        }
        .esb-ticker-item:hover {
          background: rgba(255, 107, 0, 0.08);
          color: #fff;
        }
        .esb-ticker-item--active {
          background: rgba(255, 107, 0, 0.1);
          color: #ff6b00;
        }
        .esb-ticker-name { font-size: 0.72rem; font-weight: 700; }
        .esb-ticker-sep { color: rgba(255, 107, 0, 0.3); font-size: 0.8rem; }
        .esb-ticker-stock {
          font-size: 0.68rem;
          font-weight: 800;
          color: #00c8c8;
          font-variant-numeric: tabular-nums;
        }
        .esb-ticker-item--active .esb-ticker-stock { color: #ff6b00; }

        /* ── Selected pills ── */
        .esb-pills {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          flex-wrap: wrap;
          width: 100%;
          padding: 0.4rem 0 0;
        }
        .esb-pill {
          display: flex;
          align-items: center;
          gap: 0.2rem;
          padding: 0.25rem 0.5rem;
          border: 1px solid rgba(255, 107, 0, 0.3);
          background: rgba(255, 107, 0, 0.06);
          color: #fff;
          clip-path: polygon(6px 0%, calc(100% - 6px) 0%, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0% calc(100% - 6px), 0% 6px);
          animation: esbPillIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes esbPillIn {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
        .esb-pill-name { font-size: 0.7rem; font-weight: 700; white-space: nowrap; }
        .esb-pill-stock {
          font-size: 0.56rem; font-weight: 800; padding: 1px 4px;
          background: rgba(0, 200, 200, 0.1); color: #00c8c8; border-radius: 3px;
        }
        .esb-pill-remove {
          background: none; border: none; cursor: pointer; color: #666;
          padding: 0; display: flex; transition: color 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .esb-pill-remove:hover { color: #ef4444; }
        .esb-clear-btn {
          font-size: 0.62rem; font-weight: 600; color: #666;
          background: none; border: none; cursor: pointer; padding: 0.2rem 0.4rem;
          transition: color 0.2s; -webkit-tap-highlight-color: transparent;
        }
        .esb-clear-btn:hover { color: #ef4444; }

        /* ══════════════════════════════════════════════
           MODAL — 80% viewport on desktop, full on mobile
           ══════════════════════════════════════════════ */
        .esb-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .esb-overlay--visible { opacity: 1; }

        .esb-modal {
          background: #0a0a0a;
          border: 1px solid #333;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform: scale(0.95) translateY(10px);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
          height: 100%;
          border-radius: 0;
        }
        .esb-modal--visible {
          transform: scale(1) translateY(0);
          opacity: 1;
        }

        /* Desktop: 80% viewport */
        @media (min-width: 768px) {
          .esb-modal {
            width: 80vw;
            height: 80vh;
            max-width: 1100px;
            max-height: 700px;
            border-radius: 16px;
            box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 107, 0, 0.08);
          }
        }

        /* ── Modal header ── */
        .esb-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #333;
          flex-shrink: 0;
        }
        .esb-modal-header-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .esb-modal-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: linear-gradient(135deg, rgba(255, 107, 0, 0.15), rgba(200, 50, 0, 0.1));
          clip-path: polygon(6px 0%, calc(100% - 6px) 0%, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0% calc(100% - 6px), 0% 6px);
        }
        .esb-modal-icon-glow {
          position: absolute;
          inset: -4px;
          background: rgba(255, 107, 0, 0.15);
          clip-path: polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px);
          animation: esbIconGlow 2.5s ease-in-out infinite;
          z-index: -1;
        }
        @keyframes esbIconGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.08); }
        }
        .esb-modal-title { font-size: 1rem; font-weight: 800; color: #fff; }
        .esb-modal-subtitle { font-size: 0.72rem; color: #888; font-weight: 600; }
        .esb-modal-close {
          width: 34px; height: 34px; border-radius: 8px;
          border: 1px solid #333; background: #1a1a1a;
          color: #666; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; -webkit-tap-highlight-color: transparent;
        }
        .esb-modal-close:hover { background: rgba(239, 68, 68, 0.1); color: #ef4444; border-color: rgba(239, 68, 68, 0.3); }

        /* ── Toolbar (search + selection) ── */
        .esb-modal-toolbar {
          padding: 0.75rem 1.25rem;
          border-bottom: 1px solid #333;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .esb-search-wrap { position: relative; }
        .esb-search-icon {
          position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%);
          color: #666; pointer-events: none;
        }
        .esb-search-input {
          width: 100%; padding: 0.5rem 2rem 0.5rem 2.3rem;
          border-radius: 8px; border: 1px solid #333;
          background: #1a1a1a; color: #fff;
          font-size: 0.82rem; font-weight: 500; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s; box-sizing: border-box;
        }
        .esb-search-input:focus {
          border-color: rgba(255, 107, 0, 0.5);
          box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.08);
        }
        .esb-search-input::placeholder { color: #666; opacity: 0.5; }
        .esb-search-clear {
          position: absolute; right: 0.6rem; top: 50%; transform: translateY(-50%);
          background: none; border: none; color: #666; cursor: pointer;
          padding: 2px; display: flex; -webkit-tap-highlight-color: transparent;
        }

        .esb-selection-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.35rem 0.6rem; background: rgba(255, 107, 0, 0.05);
          border-radius: 8px; border: 1px solid rgba(255, 107, 0, 0.12);
        }
        .esb-selection-text {
          display: flex; align-items: center; gap: 0.3rem;
          font-size: 0.72rem; font-weight: 700; color: #ff6b00;
        }
        .esb-selection-clear {
          font-size: 0.65rem; font-weight: 600; color: #666;
          background: none; border: none; cursor: pointer; padding: 0.2rem 0.5rem;
          border-radius: 6px; transition: all 0.2s; -webkit-tap-highlight-color: transparent;
        }
        .esb-selection-clear:hover { color: #ef4444; background: rgba(239, 68, 68, 0.08); }

        /* ── Modal body (scrollable grid) ── */
        .esb-modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 1.25rem;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }
        .esb-modal-body::-webkit-scrollbar { width: 5px; }
        .esb-modal-body::-webkit-scrollbar-track { background: transparent; }
        .esb-modal-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }

        .esb-empty {
          display: flex; flex-direction: column; align-items: center;
          gap: 0.5rem; padding: 3rem; color: #666; font-size: 0.85rem;
        }

        /* ── City grid ── */
        .esb-grid {
          display: grid;
          gap: 0.4rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 420px) { .esb-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 768px) { .esb-grid { grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; } }
        @media (min-width: 1024px) { .esb-grid { grid-template-columns: 1fr 1fr 1fr 1fr; } }

        /* ── City card ── */
        .esb-city {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0.6rem 0.7rem;
          border: 1px solid #333;
          background: #1a1a1a;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          animation: esbCityIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          -webkit-tap-highlight-color: transparent;
          clip-path: polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px);
        }
        @keyframes esbCityIn {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .esb-city:hover {
          border-color: rgba(255, 107, 0, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
        .esb-city:active { transform: scale(0.98); }

        .esb-city--selected {
          border-color: #ff6b00 !important;
          background: rgba(255, 107, 0, 0.08);
          box-shadow: 0 0 20px rgba(255, 107, 0, 0.1), inset 0 0 30px rgba(255, 107, 0, 0.03);
        }
        .esb-city--top { border-color: rgba(255, 107, 0, 0.2); }

        .esb-city-bar {
          position: absolute; left: 0; top: 0; bottom: 0;
          background: linear-gradient(90deg, rgba(0, 200, 200, 0.06), rgba(0, 200, 200, 0.01));
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }
        .esb-city--selected .esb-city-bar {
          background: linear-gradient(90deg, rgba(255, 107, 0, 0.08), rgba(255, 107, 0, 0.02));
        }

        .esb-city-content {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; position: relative; z-index: 1; gap: 0.3rem;
        }
        .esb-city-left { display: flex; align-items: center; gap: 0.4rem; min-width: 0; }
        .esb-city-check {
          width: 18px; height: 18px; border-radius: 4px;
          border: 1.5px solid #333;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s; color: transparent;
        }
        .esb-city-check--on {
          background: #ff6b00; border-color: #ff6b00; color: #fff;
          box-shadow: 0 0 8px rgba(255, 107, 0, 0.4);
        }
        .esb-city-info { display: flex; align-items: center; gap: 0.3rem; min-width: 0; }
        .esb-city-name {
          font-size: 0.78rem; font-weight: 700; color: #fff;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .esb-city--selected .esb-city-name { color: #ff6b00; }
        .esb-city-badge {
          font-size: 0.48rem; font-weight: 800; padding: 1px 5px;
          background: linear-gradient(135deg, #ff6b00, #ee2200);
          color: #fff; letter-spacing: 0.04em; white-space: nowrap; flex-shrink: 0;
          clip-path: polygon(3px 0%, calc(100% - 3px) 0%, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0% calc(100% - 3px), 0% 3px);
        }
        .esb-city-right { display: flex; align-items: center; gap: 0.2rem; flex-shrink: 0; }
        .esb-city-pkg { color: #666; opacity: 0.4; }
        .esb-city-stock {
          font-size: 0.72rem; font-weight: 800; color: #00c8c8;
          font-variant-numeric: tabular-nums;
        }
        .esb-city--selected .esb-city-stock { color: #ff6b00; }

        /* ── City hover tooltip — direction-aware ── */
        .esb-city-tooltip {
          position: absolute;
          left: 50%;
          z-index: 200;
          background: #0a0a0a;
          border: 1px solid #333;
          border-radius: 10px;
          padding: 0.7rem 0.85rem;
          min-width: 200px;
          max-width: 260px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
          pointer-events: none;
        }

        .esb-city-tooltip--above {
          bottom: calc(100% + 8px);
          top: auto;
          transform: translateX(-50%);
          animation: esbTooltipAboveIn 0.2s ease;
        }
        @keyframes esbTooltipAboveIn {
          from { opacity: 0; transform: translateX(-50%) translateY(4px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .esb-city-tooltip--above .esb-tooltip-arrow {
          position: absolute;
          bottom: -5px;
          top: auto;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 10px;
          height: 10px;
          background: #0a0a0a;
          border-right: 1px solid #333;
          border-bottom: 1px solid #333;
          border-top: none;
          border-left: none;
        }

        .esb-city-tooltip--below {
          top: calc(100% + 8px);
          bottom: auto;
          transform: translateX(-50%);
          animation: esbTooltipBelowIn 0.2s ease;
        }
        @keyframes esbTooltipBelowIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-4px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .esb-city-tooltip--below .esb-tooltip-arrow {
          position: absolute;
          top: -5px;
          bottom: auto;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 10px;
          height: 10px;
          background: #0a0a0a;
          border-top: 1px solid #333;
          border-left: 1px solid #333;
          border-bottom: none;
          border-right: none;
        }
        .esb-tooltip-header {
          display: flex; align-items: center; gap: 0.4rem;
          margin-bottom: 0.5rem; padding-bottom: 0.4rem;
          border-bottom: 1px solid #333;
        }
        .esb-tooltip-title { font-size: 0.82rem; font-weight: 800; color: #fff; }
        .esb-tooltip-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0.2rem 0; font-size: 0.72rem;
        }
        .esb-tooltip-label { color: #666; font-weight: 500; }
        .esb-tooltip-value { font-weight: 800; color: #00c8c8; }
        .esb-tooltip-bar-wrap {
          height: 4px; border-radius: 2px; background: rgba(255,255,255,0.06);
          margin: 0.4rem 0; overflow: hidden;
        }
        .esb-tooltip-bar {
          height: 100%; border-radius: 2px;
          background: linear-gradient(90deg, #ff6b00, #00c8c8);
          transition: width 0.4s ease;
        }
        .esb-tooltip-hint {
          font-size: 0.62rem; color: #666; text-align: center;
          margin-top: 0.3rem; font-style: italic;
        }

        @media (max-width: 767px) {
          .esb-city-tooltip { display: none; }
        }

        /* ── Footer ── */
        .esb-modal-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.75rem 1.25rem; border-top: 1px solid #333;
          flex-shrink: 0; gap: 0.5rem;
        }
        .esb-footer-hint { font-size: 0.7rem; color: #666; font-weight: 500; }
        .esb-footer-done {
          padding: 0.5rem 1.5rem; border: none;
          background: linear-gradient(135deg, #ff6b00, #ee2200);
          color: #fff; font-weight: 700; font-size: 0.8rem;
          cursor: pointer; transition: all 0.2s; flex-shrink: 0;
          box-shadow: 0 2px 12px rgba(255, 107, 0, 0.3);
          -webkit-tap-highlight-color: transparent;
          clip-path: polygon(6px 0%, calc(100% - 6px) 0%, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0% calc(100% - 6px), 0% 6px);
        }
        .esb-footer-done:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(255, 107, 0, 0.4);
        }
        .esb-footer-done:active { transform: scale(0.97); }

        /* ══════════════════════════════════════════════
           MOBILE RESPONSIVE
           ══════════════════════════════════════════════ */
        @media (max-width: 767px) {
          .esb-bar { flex-wrap: wrap; gap: 0; }
          .esb-trigger { padding: 0.45rem 0.7rem; gap: 0.3rem; }
          .esb-trigger-label { font-size: 0.6rem; }
          .esb-pointer { display: none; }
          .esb-orbit-wrap { padding: 2px; }
          .esb-fire-border--secondary { display: none; }
          .esb-ticker { height: 32px; }
          .esb-ticker-name { font-size: 0.65rem; }
          .esb-ticker-stock { font-size: 0.6rem; }
          .esb-ticker-item { padding: 0 0.7rem; }
          .esb-pills { padding: 0.3rem 0 0; gap: 0.2rem; }
          .esb-pill { padding: 0.2rem 0.4rem; }
          .esb-pill-name { font-size: 0.62rem; }

          .esb-modal-header { padding: 0.85rem 1rem; }
          .esb-modal-icon { width: 34px; height: 34px; }
          .esb-modal-title { font-size: 0.9rem; }
          .esb-modal-toolbar { padding: 0.6rem 1rem; }
          .esb-modal-body { padding: 0.75rem; }
          .esb-city { padding: 0.5rem 0.6rem; }
          .esb-city-name { font-size: 0.74rem; }
          .esb-modal-footer {
            padding: 0.65rem 1rem;
            padding-bottom: calc(0.65rem + env(safe-area-inset-bottom, 0px));
          }
          .esb-footer-hint { font-size: 0.6rem; }
        }

        @media (max-width: 359px) {
          .esb-trigger-label { font-size: 0.55rem; letter-spacing: 0.03em; }
          .esb-active-badge { width: 15px; height: 15px; font-size: 0.5rem; }
          .esb-grid { grid-template-columns: 1fr !important; }
          .esb-ticker { height: 28px; }
          .esb-ticker-name { font-size: 0.58rem; }
        }
      `}</style>
    </>
  );
}
