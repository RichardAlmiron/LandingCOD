'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product, StoreData } from '@/lib/types';
import { Star, ShoppingCart, Truck, Shield, ArrowLeft, Plus, Minus } from 'lucide-react';

interface ProductStandardPageProps {
  product: Product;
  storeData: StoreData;
}

export default function ProductStandardPage({ product, storeData }: ProductStandardPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Calcular precio con descuento si aplica
  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount 
    ? Math.round(product.price * (1 - (product.discount || 0) / 100))
    : product.price;

  const formatPrice = (price: number) => {
    return `${product.currency || '$'}${price.toLocaleString()}`;
  };

  const handleAddToCart = () => {
    // Implementar lógica de agregar al carrito
    console.log('Agregando al carrito:', product, 'cantidad:', quantity);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header simple */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Volver a la tienda</span>
          </button>
          <div className="ml-auto font-semibold text-lg text-gray-900">
            {storeData.name}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Columna de imágenes */}
          <div className="space-y-4">
            {/* Imagen principal */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden border relative">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            
            {/* Thumbnails (simulados con la misma imagen) */}
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg border-2 overflow-hidden relative ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={product.imageUrl}
                    alt={`${product.title} - vista ${index + 1}`}
                    fill
                    className="object-contain p-2"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Columna de información */}
          <div className="space-y-6">
            {/* Título y rating */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviews} reseñas)
                  </span>
                </div>
                <span className="text-sm text-gray-500">|</span>
                <span className="text-sm text-gray-600">{product.category}</span>
              </div>
            </div>

            {/* Precio */}
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {formatPrice(discountedPrice)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium">
                      -{product.discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Selector de cantidad */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-gray-700 font-medium">Cantidad:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Botón de agregar al carrito */}
              <button
                onClick={handleAddToCart}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Agregar al carrito
              </button>

              {/* Características de envío */}
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-600">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span>Envío a domicilio disponible</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Garantía de satisfacción</span>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Descripción del producto
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Especificaciones */}
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Información del producto
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Categoría:</span>
                  <p className="font-medium text-gray-900">{product.category}</p>
                </div>
                <div>
                  <span className="text-gray-500">ID del producto:</span>
                  <p className="font-medium text-gray-900">{product.id}</p>
                </div>
                <div>
                  <span className="text-gray-500">Calificación:</span>
                  <p className="font-medium text-gray-900">{product.rating}/5</p>
                </div>
                <div>
                  <span className="text-gray-500">Reseñas:</span>
                  <p className="font-medium text-gray-900">{product.reviews}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

