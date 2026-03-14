"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Star, ShoppingCart, Share2, MoreVertical } from "lucide-react";
import { useState } from "react";
import { calculateDiscount } from "@/lib/utils";

interface MobileProductCardProps {
  product: {
    id: string;
    title: string;
    price: string;
    originalPrice?: string;
    imageUrl: string;
    rating?: number;
    reviews?: number;
    badge?: string;
    discount?: string;
  };
  onPress?: () => void;
  onAddToCart?: () => void;
  onFavorite?: () => void;
  variant?: "grid" | "list" | "horizontal";
  index?: number;
}

export function MobileProductCard({
  product,
  onPress,
  onAddToCart,
  onFavorite,
  variant = "grid",
  index = 0,
}: MobileProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onFavorite?.();
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.();
  };

  const discount = calculateDiscount(product.price, product.originalPrice);

  if (variant === "horizontal") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        onClick={onPress}
        className="flex-shrink-0 w-40 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden active:scale-95 transition-transform"
      >
        <div className="relative aspect-square bg-gray-50">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className={`object-contain p-2 transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          {discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              -{discount}%
            </div>
          )}
          <button
            onClick={handleFavorite}
            className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
            {product.title}
          </h3>
          <div className="flex items-center gap-1 mb-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600">
              {product.rating || "4.5"}
            </span>
            <span className="text-xs text-gray-400">
              ({product.reviews || "1.2k"})
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        onClick={onPress}
        className="flex gap-3 bg-white p-3 rounded-2xl shadow-sm border border-gray-100 active:scale-[0.98] transition-transform"
      >
        <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className={`object-contain p-2 transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
            {product.title}
          </h3>
          <div className="flex items-center gap-1 mb-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600">
              {product.rating || "4.5"}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white text-xs font-medium py-2 rounded-xl active:bg-blue-700 transition-colors"
            >
              Agregar
            </button>
            <button
              onClick={handleFavorite}
              className="w-9 h-9 border border-gray-200 rounded-xl flex items-center justify-center active:bg-gray-50 transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid variant (default)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03 }}
      onClick={onPress}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden active:scale-95 transition-transform"
    >
      <div className="relative aspect-square bg-gray-50">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className={`object-contain p-3 transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        {discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            -{discount}%
          </div>
        )}
        {product.badge && (
          <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {product.badge}
          </div>
        )}
        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1.5 leading-snug">
          {product.title}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating || 4.5)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">
            ({product.reviews || "1.2k"})
          </span>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center active:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
