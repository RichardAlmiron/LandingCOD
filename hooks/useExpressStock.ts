'use client';

import { useState, useEffect, useCallback } from 'react';
import { AlmiProduct } from './useAlmiCatalog';

export interface City {
  name: string;
  totalStock: number;
}

interface UseExpressStockReturn {
  expressProducts: AlmiProduct[];
  stockIds: Set<string>;
  loading: boolean;
  cities: City[];
  citiesLoading: boolean;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedCities: string[];
  setSelectedCities: (cities: string[]) => void;
  isExpressMode: boolean;
  refresh: () => void;
}

export function useExpressStock(): UseExpressStockReturn {
  const [expressProducts, setExpressProducts] = useState<AlmiProduct[]>([]);
  const [stockIds, setStockIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const isExpressMode = selectedCities.length > 0 || !!selectedCity;

  // Fetch cities dynamically from AlmiDrop
  useEffect(() => {
    const fetchCities = async () => {
      setCitiesLoading(true);
      try {
        console.log('[useExpressStock] Fetching cities from /api/almidrop/cities...');
        const res = await fetch('/api/almidrop/cities');
        const data = await res.json();
        console.log('[useExpressStock] Cities response:', data);
        
        if (data.success && data.cities && data.cities.length > 0) {
          // Guardar objetos completos con name y totalStock REAL de la base de datos
          const citiesWithStock: City[] = data.cities.map((c: { name: string; totalStock: number }) => ({
            name: c.name,
            totalStock: c.totalStock || 0
          }));
          setCities(citiesWithStock);
          console.log('[useExpressStock] Cities loaded with REAL stock:', citiesWithStock);
        } else {
          console.warn('[useExpressStock] No cities returned from API');
          setCities([]);
        }
      } catch (err) {
        console.error('[useExpressStock] Error fetching cities:', err);
        setCities([]);
      } finally {
        setCitiesLoading(false);
      }
    };
    fetchCities();
  }, []);

  const fetchExpressStock = useCallback(async () => {
    if (selectedCities.length === 0 && !selectedCity) {
      setExpressProducts([]);
      setStockIds(new Set());
      return;
    }

    setLoading(true);
    try {
      const url = selectedCities.length > 1
        ? `/api/almidrop/express-stock?cities=${encodeURIComponent(selectedCities.join(','))}`
        : `/api/almidrop/express-stock?city=${encodeURIComponent(selectedCities[0] || selectedCity)}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error consultando stock');

      setExpressProducts(data.products || []);
      setStockIds(new Set(data.ids || []));
    } catch (err: any) {
      console.error('Error fetching express stock:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedCities, selectedCity]);

  useEffect(() => {
    fetchExpressStock();
  }, [fetchExpressStock]);

  const refresh = fetchExpressStock;

  return {
    expressProducts,
    stockIds,
    loading,
    cities,
    citiesLoading,
    selectedCity,
    setSelectedCity,
    selectedCities,
    setSelectedCities,
    isExpressMode,
    refresh
  };
}
