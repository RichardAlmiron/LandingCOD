import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Parsea un precio en formato string (ej: "$499", "$1,299.99") a número
 * Elimina el signo $ y las comas antes de convertir
 */
export function parsePrice(price: string | undefined): number {
  if (!price) return 0;
  const cleaned = price.replace(/[$,]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Calcula el porcentaje de descuento entre precio original y precio actual
 * Retorna null si no hay descuento válido
 */
export function calculateDiscount(price: string | undefined, originalPrice: string | undefined): number | null {
  if (!originalPrice || !price) return null;
  
  const currentPrice = parsePrice(price);
  const origPrice = parsePrice(originalPrice);
  
  if (origPrice <= 0 || currentPrice <= 0 || origPrice <= currentPrice) return null;
  
  return Math.round(((origPrice - currentPrice) / origPrice) * 100);
}
