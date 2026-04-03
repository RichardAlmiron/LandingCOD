'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, CheckCircle, CreditCard, Package, Send, Smartphone, User, MapPinned } from 'lucide-react';

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  storeName: string;
  whatsappNumber: string;
  formType?: any;
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    neighborhood: string;
    address: string;
    locationUrl?: string;
    referencePoints: string;
  }) => void;
}

export default function OrderForm({ isOpen, onClose, storeName, whatsappNumber, onSubmit }: OrderFormProps) {
  const { items, total, itemCount } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    neighborhood: '',
    address: '',
    locationUrl: '',
    referencePoints: ''
  });
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationConfirmed, setLocationConfirmed] = useState(false);
  const [showLocationConfirm, setShowLocationConfirm] = useState(false);

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return `S/ ${Math.round(price).toLocaleString('es-PY')}`;
  };

  const handleGetLocation = () => {
    setIsGettingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setFormData(prev => ({ ...prev, locationUrl: mapsUrl }));
          setIsGettingLocation(false);
          setShowLocationConfirm(true);
        },
        (error) => {
          alert('No se pudo obtener tu ubicación. Por favor ingresa la dirección manualmente.');
          setIsGettingLocation(false);
        }
      );
    } else {
      alert('Tu navegador no soporta geolocalización.');
      setIsGettingLocation(false);
    }
  };

  const confirmLocation = () => {
    setLocationConfirmed(true);
    setShowLocationConfirm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[10001] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden">
              
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white px-6 py-5 shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl">
                      <Send className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Completa tu Pedido</h2>
                      <p className="text-blue-100 text-sm">
                        {itemCount} {itemCount === 1 ? 'producto' : 'productos'} · Total: {formatPrice(total)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Mini Product Summary */}
                {items.length > 0 && (
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 shrink-0">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/20">
                          <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                        </div>
                        <div className="text-xs">
                          <p className="font-medium truncate max-w-[100px]">{item.title}</p>
                          <p className="text-blue-200">x{item.quantity}</p>
                        </div>
                      </div>
                    ))}
                    {items.length > 3 && (
                      <div className="flex items-center justify-center bg-white/10 rounded-xl px-4 py-2 shrink-0">
                        <span className="text-sm font-medium">+{items.length - 3} más</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-blue-600" />
                        Nombre
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">Apellido</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                        placeholder="Tu apellido"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-blue-600" />
                      Teléfono de Contacto
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                      placeholder="Ej: 0981 123 456"
                    />
                  </div>

                  {/* City & Neighborhood */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                        <MapPinned className="w-4 h-4 text-blue-600" />
                        Ciudad
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                        placeholder="Ciudad"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">Barrio</label>
                      <input
                        type="text"
                        required
                        value={formData.neighborhood}
                        onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                        placeholder="Barrio"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-blue-600" />
                      Dirección Exacta
                    </label>
                    <textarea
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm resize-none h-20"
                      placeholder="Calle, número, departamento, etc."
                    />
                  </div>

                  {/* GPS Location */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      Ubicación GPS (Opcional pero recomendado)
                    </label>
                    
                    {!locationConfirmed ? (
                      <button
                        type="button"
                        onClick={handleGetLocation}
                        disabled={isGettingLocation}
                        className="w-full py-3 px-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-dashed border-emerald-300 rounded-xl text-sm font-medium text-emerald-700 hover:border-emerald-500 hover:from-emerald-100 hover:to-teal-100 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                      >
                        {isGettingLocation ? (
                          <>
                            <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                            Obteniendo ubicación...
                          </>
                        ) : (
                          <>
                            <MapPin className="w-4 h-4" />
                            Obtener mi ubicación exacta
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 p-3 rounded-xl text-sm border border-emerald-200">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span className="font-medium">Ubicación confirmada</span>
                      </div>
                    )}

                    {formData.locationUrl && !locationConfirmed && (
                      <a 
                        href={formData.locationUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs text-blue-600 hover:text-blue-700 underline flex items-center gap-1"
                      >
                        Ver ubicación en Google Maps →
                      </a>
                    )}
                  </div>

                  {/* Reference Points */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Puntos de Referencia</label>
                    <textarea
                      value={formData.referencePoints}
                      onChange={(e) => setFormData({ ...formData, referencePoints: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm resize-none h-16"
                      placeholder="Ej: Cerca del supermercado, frente a la farmacia"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Enviar Pedido por WhatsApp
                    </motion.button>
                    <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                      <CreditCard className="w-3 h-3" />
                      Serás redirigido a WhatsApp para confirmar tu pedido
                    </p>
                  </div>
                </form>
              </div>

              {/* Location Confirmation Overlay */}
              <AnimatePresence>
                {showLocationConfirm && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50"
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-white p-6 rounded-2xl max-w-sm w-full text-center space-y-4 shadow-2xl"
                    >
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                        <MapPin className="w-8 h-8 text-emerald-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">¿Ubicación correcta?</h3>
                      <p className="text-sm text-gray-600">
                        Confirma que estás en el lugar donde deseas recibir tu pedido.
                      </p>
                      <div className="flex gap-3 pt-2">
                        <button 
                          onClick={() => setShowLocationConfirm(false)} 
                          className="flex-1 py-3 px-4 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
                        >
                          Corregir
                        </button>
                        <button 
                          onClick={confirmLocation} 
                          className="flex-1 py-3 px-4 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all shadow-lg"
                        >
                          Confirmar
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
