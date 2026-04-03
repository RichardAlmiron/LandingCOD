'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Search, Heart, X } from 'lucide-react';

interface StoreSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  templates: { id: string; name: string }[];
  favoritesCount: number;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  placeholder?: string;
}

export default function StoreSearchBar({
  value,
  onChange,
  templates,
  favoritesCount,
  showFavoritesOnly,
  onToggleFavorites,
  placeholder = 'Buscar por nombre o ID de tienda...',
}: StoreSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filtrar sugerencias por nombre o ID
  const suggestions = value.length > 0
    ? templates.filter(t =>
        t.id.toLowerCase().includes(value.toLowerCase()) ||
        t.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8)
    : [];

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8 }}>
      {/* Buscador */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--bg-elevated)',
          border: `1.5px solid ${isFocused ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
          borderRadius: 10,
          padding: '6px 12px',
          transition: 'all 0.2s',
          width: 280,
          boxShadow: isFocused ? '0 0 0 3px rgba(99,102,241,0.1)' : 'none',
        }}
      >
        <Search size={15} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => {
            setIsFocused(true);
            if (value.length > 0) setShowSuggestions(true);
          }}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: 12,
            fontWeight: 500,
          }}
        />
        {value && (
          <button
            onClick={() => { onChange(''); setShowSuggestions(false); }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 2,
              display: 'flex',
              color: 'var(--text-muted)',
            }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Botón Favoritos con contador */}
      <button
        onClick={onToggleFavorites}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 12px',
          borderRadius: 10,
          fontSize: 12,
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.2s',
          background: showFavoritesOnly
            ? 'linear-gradient(135deg, #ef4444, #dc2626)'
            : 'var(--bg-elevated)',
          color: showFavoritesOnly ? '#fff' : 'var(--text-secondary)',
          border: `1.5px solid ${showFavoritesOnly ? '#ef4444' : 'var(--border-subtle)'}`,
          boxShadow: showFavoritesOnly ? '0 4px 12px rgba(239,68,68,0.3)' : 'none',
        }}
      >
        <Heart
          size={15}
          fill={showFavoritesOnly ? '#fff' : 'none'}
          style={{ transition: 'all 0.2s' }}
        />
        <span>Favoritos</span>
        {/* Contador badge */}
        {favoritesCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: -6,
              right: -6,
              minWidth: 18,
              height: 18,
              borderRadius: 9,
              background: showFavoritesOnly ? '#fff' : '#ef4444',
              color: showFavoritesOnly ? '#ef4444' : '#fff',
              fontSize: 10,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 5px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              border: '2px solid var(--bg-surface)',
            }}
          >
            {favoritesCount}
          </span>
        )}
      </button>

      {/* Dropdown de sugerencias */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: 4,
            width: 280,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 10,
            boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
            zIndex: 100,
            overflow: 'hidden',
          }}
        >
          {suggestions.map((t) => (
            <button
              key={t.id}
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(t.id);
                setShowSuggestions(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '10px 14px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 0.15s',
                borderBottom: '1px solid var(--border-subtle)',
              }}
              className="hover:bg-white/5"
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {t.name}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                  {t.id}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
