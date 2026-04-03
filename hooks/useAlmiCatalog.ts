'use client';

import { useState, useEffect, useCallback } from 'react';

export interface AlmiProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  costPrice?: number;
  originalPrice: number;
  currency: string;
  imageUrl: string;
  images: string[];
  edited_images?: string[];
  original_images?: string[];
  videos?: string[];
  productCode?: string;
  category: string;
  hasRealStock: boolean;
  supplier: {
    id: string;
    companyName: string;
    isVerified: boolean;
  };
}

interface UseAlmiCatalogReturn {
  products: AlmiProduct[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  totalPages: number;
  search: string;
  setSearch: (s: string) => void;
  category: string;
  setCategory: (c: string) => void;
  sort: 'random' | 'newest' | 'price_low' | 'price_high';
  setSort: (s: 'random' | 'newest' | 'price_low' | 'price_high') => void;
  refresh: () => void;
  goToPage: (p: number) => void;
}

export function useAlmiCatalog(initialSearch = ''): UseAlmiCatalogReturn {
  const [products, setProducts] = useState<AlmiProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState<'random' | 'newest' | 'price_low' | 'price_high'>('random');
  const [seed] = useState(() => String(Date.now()));

  const fetchProducts = useCallback(async (pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(pageNum),
        limit: '40',
        sort,
        seed
      });
      if (search) params.set('search', search);
      if (category) params.set('category', category);

      const res = await fetch(`/api/almidrop/catalog?${params}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error cargando catálogo');

      setProducts(data.products || []);
      setTotal(data.total || 0);
      setPage(data.page || 1);
      setTotalPages(data.totalPages || 1);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching catalog:', err);
    } finally {
      setLoading(false);
    }
  }, [search, category, sort, seed]);

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  const refresh = () => fetchProducts(page);
  const goToPage = (p: number) => fetchProducts(p);

  return {
    products,
    loading,
    error,
    total,
    page,
    totalPages,
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    refresh,
    goToPage
  };
}
