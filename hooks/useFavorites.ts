'use client';
import { useState, useEffect, useCallback } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Cargar favoritos al montar
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/favorites', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (data.favorites) {
            setFavorites(new Set(data.favorites));
          }
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const toggleFavorite = useCallback(async (templateId: string) => {
    const isFav = favorites.has(templateId);

    // Optimistic update
    setFavorites(prev => {
      const next = new Set(prev);
      if (isFav) next.delete(templateId);
      else next.add(templateId);
      return next;
    });

    try {
      if (isFav) {
        await fetch(`/api/favorites?template_id=${templateId}`, {
          method: 'DELETE',
          credentials: 'include',
        });
      } else {
        await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ template_id: templateId }),
        });
      }
    } catch {
      // Revert on error
      setFavorites(prev => {
        const next = new Set(prev);
        if (isFav) next.add(templateId);
        else next.delete(templateId);
        return next;
      });
    }
  }, [favorites]);

  const isFavorite = useCallback((templateId: string) => {
    return favorites.has(templateId);
  }, [favorites]);

  return {
    favorites,
    count: favorites.size,
    loading,
    toggleFavorite,
    isFavorite,
  };
}
