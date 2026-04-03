'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';

interface ElegantProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'minimal';
  showAddToCart?: boolean;
  showRating?: boolean;
  className?: string;
}

export default function ElegantProductCard({
  product,
  variant = 'default',
  showAddToCart = true,
  showRating = true,
  className = ''
}: ElegantProductCardProps) {
  const { addToCart } = useCart();

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div 
      className={`group relative bg-white rounded-2xl overflow-hidden border border-gray-100 
        hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 
        hover:-translate-y-1 flex flex-col h-full ${className}`}
      data-product-id={product.id}
    >
      {/* Image Container - Fixed Aspect Ratio */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Discount Badge */}
        {product.discount && product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 
            rounded-full text-xs font-bold shadow-lg">
            -{product.discount}%
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm 
          text-gray-700 px-2 py-1 rounded-lg text-xs font-medium shadow-sm">
          {product.category}
        </div>

        {/* Quick Add Button - Appears on Hover */}
        {showAddToCart && (
          <button
            onClick={() => addToCart(product)}
            className="absolute bottom-4 left-4 right-4 bg-white text-gray-900 
              py-3 px-4 rounded-xl font-semibold text-sm shadow-lg
              opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
              transition-all duration-300 hover:bg-gray-900 hover:text-white
              flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Añadir al carrito
          </button>
        )}
      </div>

      {/* Content - Flex Grow to Fill Space */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title - Fixed Height with Line Clamp */}
        <h3 className="font-semibold text-gray-900 text-sm leading-tight 
          line-clamp-2 min-h-[2.5rem] mb-2 group-hover:text-blue-600 
          transition-colors">
          {product.title}
        </h3>

        {/* Description - Optional, smaller text */}
        <p className="text-gray-500 text-xs line-clamp-2 mb-3 flex-grow">
          {product.description}
        </p>

        {/* Rating - Fixed Height */}
        {showRating && (
          <div className="flex items-center gap-1 mb-3 min-h-[1.25rem]">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating || 0)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">({product.reviews || 0})</span>
          </div>
        )}

        {/* Price Section - Fixed at Bottom */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discount && product.discount > 0 && (
              <span className="text-sm text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            className="p-2 rounded-full bg-gray-100 text-gray-400 
              hover:bg-red-50 hover:text-red-500 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
