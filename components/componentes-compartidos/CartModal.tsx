'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { CartItem } from '@/lib/types';
import Image from 'next/image';

interface CartModalProps {
  storeName: string;
  whatsappNumber?: string;
  onCheckout: () => void;
  currency?: string;
  primaryColor?: string;
}

export default function CartModal({ storeName, whatsappNumber, onCheckout, currency = 'PYG', primaryColor = '#1a1a1a' }: CartModalProps) {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, total, itemCount } = useCart();
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsCartOpen(false);
    onCheckout();
  };

  const formatPrice = (price: number) => {
    const roundedPrice = Math.round(price);
    return `Gs. ${roundedPrice.toLocaleString('es-PY')}`;
  };

  const getItemTotal = (item: CartItem) => {
    const price = item.discount 
      ? item.price * (1 - item.discount / 100)
      : item.price;
    return price * item.quantity;
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={() => setIsCartOpen(false)} />
      
      <div className="relative bg-white w-full max-w-md max-h-[90vh] overflow-hidden rounded-lg shadow-2xl">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Tu Carrito</h2>
              <p className="text-sm text-gray-500">
                {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
              </p>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[50vh] p-4 space-y-3 bg-gray-50">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Tu carrito esta vacio</p>
            </div>
          ) : (
            items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                onZoom={setZoomedImage}
                formatPrice={formatPrice}
                getItemTotal={getItemTotal}
              />
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="bg-white p-4 border-t border-gray-200 space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envio</span>
                <span className="text-green-600 font-medium">Gratis</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-gray-900 font-bold">TOTAL A PAGAR</span>
                <span className="text-xl font-bold" style={{ color: primaryColor }}>
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full text-white font-bold py-3 px-4 rounded-lg transition-all hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              CONTINUAR CON EL PEDIDO →
            </button>

            {whatsappNumber && (
              <p className="text-center text-xs text-gray-400">Recibiras confirmacion via WhatsApp</p>
            )}
          </div>
        )}
      </div>

      {zoomedImage && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/90 p-4" onClick={() => setZoomedImage(null)}>
          <div className="relative w-full max-w-lg aspect-square">
            <Image src={zoomedImage} alt="Producto" fill className="object-contain" />
          </div>
          <button className="absolute top-4 right-4 text-white text-3xl" onClick={() => setZoomedImage(null)}>×</button>
        </div>
      )}
    </div>
  );
}

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onZoom: (image: string) => void;
  formatPrice: (price: number) => string;
  getItemTotal: (item: CartItem) => number;
}

function CartItemRow({ item, onUpdateQuantity, onRemove, onZoom, formatPrice, getItemTotal }: CartItemRowProps) {
  const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;

  return (
    <div className="flex gap-3 p-3 bg-white rounded-lg border border-gray-200">
      <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden cursor-pointer" onClick={() => onZoom(item.imageUrl)}>
        <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
        {item.discount && item.discount > 0 && (
          <div className="absolute top-0 left-0 bg-red-500 text-white text-[10px] font-bold px-1 py-0.5">-{item.discount}%</div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <h3 className="font-medium text-gray-900 text-sm truncate">{item.title}</h3>
        <p className="text-xs text-gray-500">{item.category}</p>
        
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-bold text-gray-900">{formatPrice(price)}</span>
          {item.discount && item.discount > 0 && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(item.price)}</span>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center border border-gray-300 rounded">
            <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="w-8 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700" disabled={item.quantity <= 1}>−</button>
            <span className="w-10 text-center font-semibold text-gray-900 text-sm">{item.quantity}</span>
            <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-8 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700">+</button>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">{formatPrice(getItemTotal(item))}</span>
            <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500 text-sm">✕</button>
          </div>
        </div>
      </div>
    </div>
  );
}