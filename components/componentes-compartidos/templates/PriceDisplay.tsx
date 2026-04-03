'use client';

import React from 'react';
import { Product } from '@/lib/types';
import { calculateProductPrice } from '@/lib/priceUtils';

interface PriceDisplayProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
  showOriginal?: boolean;
  className?: string;
}

export function PriceDisplay({ 
  product, 
  size = 'md', 
  showOriginal = true,
  className = ''
}: PriceDisplayProps) {
  const priceData = calculateProductPrice(product);
  
  const sizeClasses = {
    sm: {
      current: 'text-sm',
      original: 'text-xs',
      discount: 'text-xs'
    },
    md: {
      current: 'text-lg font-bold',
      original: 'text-sm',
      discount: 'text-xs'
    },
    lg: {
      current: 'text-2xl font-bold',
      original: 'text-base',
      discount: 'text-sm'
    }
  };
  
  const classes = sizeClasses[size];
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`${classes.current} text-red-600`}>
        {priceData.formatted.current}
      </span>
      
      {showOriginal && priceData.original > priceData.current && (
        <span className={`${classes.original} text-gray-400 line-through`}>
          {priceData.formatted.original}
        </span>
      )}
      
      {priceData.discount > 0 && (
        <span className={`${classes.discount} bg-red-500 text-white px-1.5 py-0.5 rounded`}>
          -{priceData.discount}%
        </span>
      )}
    </div>
  );
}

// Hook for using price calculations in components
export function useProductPrice(product: Product) {
  return calculateProductPrice(product);
}

// Simple price formatter for inline use
export function formatProductPrice(product: Product): string {
  const priceData = calculateProductPrice(product);
  return priceData.formatted.current;
}
