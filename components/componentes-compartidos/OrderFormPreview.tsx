'use client';

import React from 'react';
import { X, MapPin, Phone, User, Navigation, Check, Send } from 'lucide-react';
import { OrderFormType } from '@/lib/types';

interface OrderFormPreviewProps {
  formType: OrderFormType;
  showClose?: boolean;
  onClose?: () => void;
}

// Datos de ejemplo para mostrar en el preview
const exampleProducts = [
  { id: '1', title: 'Smartphone Pro Max', quantity: 1, price: 599.99 },
  { id: '2', title: 'Auriculares Bluetooth', quantity: 2, price: 79.99 },
  { id: '3', title: 'Funda Protectora', quantity: 1, price: 24.99 },
];

const exampleTotal = 599.99 + (79.99 * 2) + 24.99;

export default function OrderFormPreview({ formType, showClose = true, onClose }: OrderFormPreviewProps) {
  const getFormStyles = () => {
    switch (formType) {
      case 'modern':
        return {
          container: 'bg-gradient-to-br from-slate-900 to-slate-800 text-white',
          input: 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500',
          button: 'bg-blue-600 hover:bg-blue-700 text-white',
          accent: 'text-blue-400',
          border: 'border-slate-600',
          bgOpacity: 'bg-white/10'
        };
      case 'minimal':
        return {
          container: 'bg-white text-gray-900 border border-gray-200',
          input: 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-black',
          button: 'bg-black hover:bg-gray-800 text-white',
          accent: 'text-gray-600',
          border: 'border-gray-200',
          bgOpacity: 'bg-gray-100'
        };
      case 'classic':
        return {
          container: 'bg-amber-50 text-amber-900 border border-amber-200',
          input: 'bg-white border-amber-200 text-amber-900 placeholder-amber-400 focus:border-amber-600',
          button: 'bg-amber-700 hover:bg-amber-800 text-white',
          accent: 'text-amber-700',
          border: 'border-amber-200',
          bgOpacity: 'bg-amber-100'
        };
      default:
        return {
          container: 'bg-white text-gray-900',
          input: 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500',
          button: 'bg-blue-600 hover:bg-blue-700 text-white',
          accent: 'text-blue-600',
          border: 'border-gray-200',
          bgOpacity: 'bg-gray-100'
        };
    }
  };

  const styles = getFormStyles();

  return (
    <div className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${styles.container}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-current border-opacity-20">
        <div>
          <h2 className="text-lg font-bold">Completa tu Pedido</h2>
          <p className={`text-xs mt-0.5 ${styles.accent}`}>Cash on Delivery - Pago contra entrega</p>
        </div>
        {showClose && onClose && (
          <button onClick={onClose} className="p-1.5 hover:bg-black/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Order Summary */}
      <div className="p-4 border-b border-current border-opacity-10">
        <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
          <span className={`w-5 h-5 rounded-full ${styles.bgOpacity} flex items-center justify-center text-xs`}>
            {exampleProducts.length}
          </span>
          Productos en tu pedido
        </h3>
        <div className="space-y-1 max-h-20 overflow-y-auto">
          {exampleProducts.map(item => (
            <div key={item.id} className="flex justify-between text-xs opacity-90">
              <span>{item.quantity}x {item.title}</span>
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-2 border-t border-current border-opacity-20 flex justify-between items-center">
          <span className="font-medium text-sm">Total a pagar</span>
          <span className="text-xl font-bold">${exampleTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Form */}
      <div className="p-4 space-y-3">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium mb-1 opacity-80">Nombre</label>
            <div className="relative">
              <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-50" />
              <input
                type="text"
                className={`w-full pl-8 pr-3 py-2 rounded-lg border-2 outline-none transition-all text-sm ${styles.input}`}
                placeholder="Tu nombre"
                defaultValue="Juan"
                readOnly
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1 opacity-80">Apellido</label>
            <input
              type="text"
              className={`w-full px-3 py-2 rounded-lg border-2 outline-none transition-all text-sm ${styles.input}`}
              placeholder="Tu apellido"
              defaultValue="Pérez"
              readOnly
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-medium mb-1 opacity-80">Teléfono de contacto</label>
          <div className="relative">
            <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-50" />
            <input
              type="tel"
              className={`w-full pl-8 pr-3 py-2 rounded-lg border-2 outline-none transition-all text-sm ${styles.input}`}
              placeholder="Ej: 0981 123 456"
              defaultValue="0981 123 456"
              readOnly
            />
          </div>
        </div>

        {/* City & Neighborhood */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium mb-1 opacity-80">Ciudad</label>
            <input
              type="text"
              className={`w-full px-3 py-2 rounded-lg border-2 outline-none transition-all text-sm ${styles.input}`}
              placeholder="Ciudad"
              defaultValue="Asunción"
              readOnly
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1 opacity-80">Barrio</label>
            <input
              type="text"
              className={`w-full px-3 py-2 rounded-lg border-2 outline-none transition-all text-sm ${styles.input}`}
              placeholder="Barrio"
              defaultValue="Villa Morra"
              readOnly
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-medium mb-1 opacity-80">Dirección exacta</label>
          <textarea
            className={`w-full px-3 py-2 rounded-lg border-2 outline-none transition-all resize-none h-14 text-sm ${styles.input}`}
            placeholder="Calle, número, departamento, etc."
            defaultValue="Av. Santa Teresa 1234, Apt 5B"
            readOnly
          />
        </div>

        {/* GPS Location */}
        <div className="space-y-2">
          <label className="block text-xs font-medium opacity-80 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            Ubicación GPS (opcional)
          </label>
          <div className="flex items-center gap-2 text-green-500 bg-green-500/10 p-2 rounded-lg text-xs">
            <Check className="w-4 h-4" />
            <span>Ubicación confirmada</span>
          </div>
        </div>

        {/* Reference Points */}
        <div>
          <label className="block text-xs font-medium mb-1 opacity-80">
            Puntos de referencia
          </label>
          <textarea
            className={`w-full px-3 py-2 rounded-lg border-2 outline-none transition-all resize-none h-12 text-sm ${styles.input}`}
            placeholder="Ej: Cerca del supermercado..."
            defaultValue="Cerca del Shopping Villa Morra"
            readOnly
          />
        </div>

        {/* Submit Button */}
        <button
          className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${styles.button}`}
        >
          <Send className="w-4 h-4" />
          Enviar Pedido por WhatsApp
        </button>

        <p className="text-center text-xs opacity-60">
          Recibirás confirmación en: +595 981 123 456
        </p>
      </div>
    </div>
  );
}
