'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Product } from '@/lib/types';

export interface CartItem extends Product {
  quantity: number;
}

interface FloatingCartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartModalOpen: boolean;
  setIsCartModalOpen: (open: boolean) => void;
  isOrderFormOpen: boolean;
  setIsOrderFormOpen: (open: boolean) => void;
  isProductInCart: (productId: string) => boolean;
  getProductQuantity: (productId: string) => number;
}

const FloatingCartContext = createContext<FloatingCartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'landing_cod_floating_cart';

export function FloatingCartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage when items change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = useCallback((product: Product) => {
    setCartItems(current => {
      const existing = current.find(item => item.id === product.id);
      if (existing) {
        return current.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(current => current.filter(item => item.id !== productId));
      return;
    }
    setCartItems(current =>
      current.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems(current => current.filter(item => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const isProductInCart = useCallback((productId: string) => {
    return cartItems.some(item => item.id === productId);
  }, [cartItems]);

  const getProductQuantity = useCallback((productId: string) => {
    const item = cartItems.find(item => item.id === productId);
    return item?.quantity || 0;
  }, [cartItems]);

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // No renderizar hasta que esté cargado para evitar hidratación inconsistente
  if (!isLoaded) {
    return (
      <FloatingCartContext.Provider
        value={{
          cartItems: [],
          addToCart: () => {},
          updateQuantity: () => {},
          removeFromCart: () => {},
          clearCart: () => {},
          cartTotal: 0,
          cartCount: 0,
          isCartModalOpen: false,
          setIsCartModalOpen: () => {},
          isOrderFormOpen: false,
          setIsOrderFormOpen: () => {},
          isProductInCart: () => false,
          getProductQuantity: () => 0,
        }}
      >
        <div suppressHydrationWarning>{children}</div>
      </FloatingCartContext.Provider>
    );
  }

  return (
    <FloatingCartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        isCartModalOpen,
        setIsCartModalOpen,
        isOrderFormOpen,
        setIsOrderFormOpen,
        isProductInCart,
        getProductQuantity,
      }}
    >
      {children}
    </FloatingCartContext.Provider>
  );
}

export function useFloatingCart() {
  const context = useContext(FloatingCartContext);
  if (context === undefined) {
    throw new Error('useFloatingCart must be used within a FloatingCartProvider');
  }
  return context;
}
