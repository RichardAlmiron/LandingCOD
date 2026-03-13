'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  rating?: number;
  reviews?: number;
  category?: string;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'list' | 'compact' | 'minimal';
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onWishlist?: (product: Product) => void;
}

export function ProductCard({ 
  product, 
  variant = 'grid', 
  onAddToCart, 
  onQuickView, 
  onWishlist 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const renderStars = (rating: number = 0) => {
    return (
      <div className="flex text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= Math.floor(rating) ? 'fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  if (variant === 'compact') {
    return (
      <div 
        className="group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
          {product.badge && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {product.badge}
            </span>
          )}
        </div>
        <h3 className="text-sm font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-sm">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div 
        className="group cursor-pointer flex flex-col items-center text-center p-2 hover:bg-gray-50 transition-colors"
        data-product-id={product.id}
      >
        <div className="relative aspect-square w-full mb-2">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
          <span className="text-xs font-bold block">{product.title}</span>
          <span className="text-xs font-bold text-red-600">${product.price}</span>
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="group flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
        <div className="relative w-32 h-32 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-contain p-2"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
          {product.category && (
            <p className="text-sm text-gray-500">{product.category}</p>
          )}
          <div className="flex items-center gap-2 mt-1">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-500">({product.reviews || 0})</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-bold text-xl">${product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          <div className="flex gap-2 mt-auto pt-3">
            <button
              onClick={(e) => { e.stopPropagation(); onAddToCart?.(product); }}
              className="flex-1 bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Agregar
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onWishlist?.(product); }}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid variant (default)
  return (
    <div 
      className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-product-id={product.id}
    >
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.badge}
          </span>
        )}
        
        {/* Quick Actions */}
        <div className={`absolute bottom-3 left-3 right-3 flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart?.(product); }}
            className="flex-1 bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Agregar al carrito
          </button>
        </div>
        
        <button
          onClick={(e) => { e.stopPropagation(); onWishlist?.(product); }}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white shadow-md transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <Heart className="w-4 h-4" />
        </button>
        
        <button
          onClick={(e) => { e.stopPropagation(); onQuickView?.(product); }}
          className={`absolute top-3 right-12 p-2 rounded-full bg-white shadow-md transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-4">
        {product.category && (
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</p>
        )}
        <h3 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-500">({product.reviews || 0})</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4 | 5;
  gap?: 'small' | 'medium' | 'large';
}

export function ProductGrid({ products, columns = 4, gap = 'medium' }: ProductGridProps) {
  const colClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  };

  const gapClasses = {
    small: 'gap-3',
    medium: 'gap-4 md:gap-6',
    large: 'gap-6 md:gap-8',
  };

  return (
    <div className={`grid ${colClasses[columns]} ${gapClasses[gap]}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant="grid" />
      ))}
    </div>
  );
}
