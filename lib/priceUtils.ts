import { Product } from './types';

export interface PriceDisplay {
  current: number;      // Precio a pagar (con descuento aplicado)
  original: number;     // Precio tachado (sin descuento)
  discount: number;     // Porcentaje de descuento
  formatted: {
    current: string;    // Formateado para mostrar
    original: string;   // Formateado para mostrar
    currency: string;  // Símbolo de moneda
  };
}

/**
 * Calcula los precios de display para un producto
 * - Si tiene discount > 0: current = precio con descuento, original = precio original
 * - Si no tiene discount: current = price, original = originalPrice (si es diferente)
 */
export function calculateProductPrice(product: Product): PriceDisplay {
  const currency = product.currency || 'S/';
  const discount = product.discount || 0;
  
  // Precio base (el que viene de la base de datos)
  const basePrice = Number(product.price) || 0;
  const originalPrice = Number(product.originalPrice) || basePrice;
  
  let currentPrice: number;
  let displayOriginal: number;
  
  if (discount > 0 && discount <= 100) {
    // Hay descuento: current = precio con descuento aplicado
    currentPrice = basePrice;
    displayOriginal = Math.round(basePrice / (1 - discount / 100));
  } else {
    // Sin descuento: mostrar precio normal
    currentPrice = basePrice;
    displayOriginal = originalPrice > basePrice ? originalPrice : 0;
  }
  
  return {
    current: currentPrice,
    original: displayOriginal,
    discount: discount,
    formatted: {
      current: `${currency}${currentPrice.toFixed(2)}`,
      original: displayOriginal > 0 ? `${currency}${displayOriginal.toFixed(2)}` : '',
      currency
    }
  };
}

/**
 * Formatea un precio simple con la moneda
 */
export function formatPrice(price: number, currency: string = 'S/'): string {
  return `${currency}${Number(price).toFixed(2)}`;
}

/**
 * Calcula el descuento basado en precio original y precio actual
 */
export function calculateDiscountPercent(original: number, current: number): number {
  if (!original || !current || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}
