'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { CartItem } from '@/lib/types';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Plus, Minus, Trash2, X, ChevronRight, Package, CreditCard, MapPin, Sparkles } from 'lucide-react';

interface PremiumCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  storeName: string;
  currency?: string;
}

export default function PremiumCartModal({ isOpen, onClose, onCheckout, storeName, currency = 'S/' }: PremiumCartModalProps) {
  const { items, total, itemCount, updateQuantity, removeFromCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  const formatPrice = (price: number) => {
    return `${currency} ${Math.round(price).toLocaleString('es-PY')}`;
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    onCheckout();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg z-[9999] bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Tu Carrito</h2>
                    <p className="text-blue-100 text-sm">{itemCount} {itemCount === 1 ? 'producto' : 'productos'}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-all duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col h-[calc(100vh-180px)]">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-100 p-6 rounded-full mb-4"
                  >
                    <ShoppingCart className="w-12 h-12 text-gray-400" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Tu carrito está vacío</h3>
                  <p className="text-gray-500">Agrega productos increíbles que te encanten</p>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                    <AnimatePresence mode="popLayout">
                      {items.map((item) => (
                        <CartItemCard
                          key={item.id}
                          item={item}
                          currency={currency}
                          onUpdateQuantity={updateQuantity}
                          onRemove={removeFromCart}
                        />
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Summary Footer */}
                  <div className="bg-gray-50 border-t border-gray-200 p-5 space-y-4">
                    {/* Calculations */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-600">
                        <span className="text-sm">Subtotal ({itemCount} items)</span>
                        <span className="font-medium">{formatPrice(total)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span className="text-sm flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          Envío
                        </span>
                        <span className="text-green-600 font-medium flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Gratis
                        </span>
                      </div>
                      <div className="h-px bg-gray-300 my-3" />
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-black text-blue-600">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-5 h-5" />
                      Continuar con el Pedido
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>

                    {/* Trust Badges */}
                    <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        Envío gratis
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Seguimiento
                      </span>
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Garantía
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface CartItemCardProps {
  item: CartItem;
  currency: string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

function CartItemCard({ item, currency, onUpdateQuantity, onRemove }: CartItemCardProps) {
  const formatPrice = (price: number) => {
    return `${currency} ${Math.round(price).toLocaleString('es-PY')}`;
  };

  const itemTotal = item.price * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex gap-4">
        {/* Image */}
        <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-contain p-2"
          />
          {item.discount && item.discount > 0 && (
            <div className="absolute top-1 left-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              -{item.discount}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 flex-1">
              {item.title}
            </h3>
            <button
              onClick={() => onRemove(item.id)}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-1">{item.category}</p>

          <div className="mt-auto flex items-center justify-between">
            {/* Quantity Controls */}
            <div className="flex items-center bg-gray-100 rounded-lg">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                disabled={item.quantity <= 1}
              >
                <Minus className="w-3 h-3 text-gray-600" />
              </button>
              <span className="w-10 text-center font-semibold text-sm text-gray-900">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
              >
                <Plus className="w-3 h-3 text-gray-600" />
              </button>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="font-bold text-gray-900">{formatPrice(itemTotal)}</p>
              {item.discount && item.discount > 0 && (
                <p className="text-xs text-gray-400 line-through">
                  {formatPrice(item.originalPrice || item.price)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
