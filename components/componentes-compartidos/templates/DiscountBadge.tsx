'use client';

import React from 'react';

interface DiscountBadgeProps {
  discount?: number;
  className?: string;
  variant?: 'default' | 'small' | 'large' | 'percentage-only';
  showZero?: boolean;
}

/**
 * Componente reutilizable para mostrar descuentos.
 * Solo muestra el descuento si es mayor a 0.
 * 
 * @param discount - El porcentaje de descuento (0-100)
 * @param variant - Estilo visual del badge
 * @param showZero - Si mostrar 0% o no mostrar nada
 */
export function DiscountBadge({ 
  discount = 0, 
  className = '', 
  variant = 'default',
  showZero = false 
}: DiscountBadgeProps) {
  // No mostrar si no hay descuento (a menos que showZero sea true)
  if (!discount || discount <= 0) {
    if (!showZero) return null;
  }

  const displayDiscount = Math.min(100, Math.max(0, discount || 0));

  const variants = {
    default: 'bg-red-500 text-white text-xs font-bold px-2 py-1 rounded',
    small: 'bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded',
    large: 'bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-md',
    'percentage-only': 'text-red-600 text-xs font-bold'
  };

  return (
    <span className={`${variants[variant]} ${className}`}>
      -{displayDiscount}%
    </span>
  );
}

/**
 * Componente para mostrar texto de descuento (ej: "AHORRA X%")
 */
export function DiscountText({ 
  discount = 0, 
  className = '' 
}: Omit<DiscountBadgeProps, 'variant' | 'showZero'>) {
  if (!discount || discount <= 0) return null;

  return (
    <span className={`text-red-600 text-xs font-bold bg-red-100 px-2 py-1 rounded ${className}`}>
      AHORRA {discount}%
    </span>
  );
}

/**
 * Hook para calcular descuento - ahora usa el discount del producto
 */
export function useProductDiscount(product: { discount?: number; price?: string; originalPrice?: string }): number {
  // Prioridad 1: Usar el discount del producto si existe
  if (product.discount && product.discount > 0) {
    return product.discount;
  }
  
  // Si no hay discount, retornar 0 (no calcular fake)
  return 0;
}

export default DiscountBadge;
