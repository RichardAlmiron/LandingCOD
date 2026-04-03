'use client';

import React from 'react';
import { StoreData } from '@/lib/types';
import { useFloatingCart } from '@/contexts/FloatingCartContext';
import FloatingCartButton from '@/components/componentes-compartidos/FloatingCartButton';
import ElegantCartModal from '@/components/componentes-compartidos/ElegantCartModal';
import ElegantOrderForm from '@/components/componentes-compartidos/ElegantOrderForm';

interface GlobalFloatingCartProps {
  storeData: StoreData;
}

export default function GlobalFloatingCart({ storeData }: GlobalFloatingCartProps) {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    cartTotal,
    isCartModalOpen,
    setIsCartModalOpen,
    isOrderFormOpen,
    setIsOrderFormOpen,
    clearCart,
    cartCount,
  } = useFloatingCart();

  // Verificar configuraciones
  const hasWhatsAppNumber = storeData.floatingCartConfig?.whatsappNumber && 
    storeData.floatingCartConfig.whatsappNumber.split('|')[1]?.length > 0;
  const floatingCartEnabled = storeData.floatingCartConfig?.enabled && hasWhatsAppNumber;

  const handleCheckout = () => {
    setIsCartModalOpen(false);
    setIsOrderFormOpen(true);
  };

  const handleOrderSubmit = (formData: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    neighborhood: string;
    reference: string;
    locationUrl?: string;
  }) => {
    // Detectar si es móvil
    const isMobile = typeof window !== 'undefined' && 
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768);

    // Obtener URL base de la tienda
    const storeUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname.split('/').slice(0, 3).join('/') : '';

    // Productos formateados con URLs
    const productList = cartItems.map((item, index) => {
      const productUrl = `${storeUrl}/p/${item.id}`;
      return isMobile 
        ? `${index + 1}. ${item.title}\n   Cant: ${item.quantity} | $${item.price.toLocaleString()} c/u\n   Link: ${productUrl}`
        : `${index + 1}. ${item.title}\n   Cant: ${item.quantity} | $${item.price.toLocaleString()} c/u = $${(item.price * item.quantity).toLocaleString()}\n   → ${productUrl}`;
    }).join('\n\n');
    
    const fecha = new Date().toLocaleDateString('es-PY', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric'
    });
    const hora = new Date().toLocaleTimeString('es-PY', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
    
    // Mensaje para PC (texto elegante con caracteres Unicode)
    const pcMessage = 
      `*NUEVO PEDIDO - ${storeData.name.toUpperCase()}*\n` +
      `═══════════════════════════════════\n` +
      `Fecha: ${fecha} | Hora: ${hora}\n` +
      `═══════════════════════════════════\n\n` +
      `*PRODUCTOS:*\n` +
      `${productList}\n\n` +
      `────────────────────────────────────\n` +
      `*TOTAL: $${cartTotal.toLocaleString()}*\n` +
      `────────────────────────────────────\n\n` +
      `*CLIENTE:*\n` +
      `→ Nombre: ${formData.firstName} ${formData.lastName}\n` +
      `→ Tel: ${formData.phone}\n\n` +
      `*ENTREGA:*\n` +
      `→ Direccion: ${formData.address}\n` +
      `→ Ciudad: ${formData.city}\n` +
      `→ Barrio: ${formData.neighborhood}\n` +
      (formData.reference ? `→ Ref: ${formData.reference}\n` : '') +
      (formData.locationUrl ? `→ Ubicacion: ${formData.locationUrl}\n` : '') +
      `\n═══════════════════════════════════\n` +
      `*PAGO CONTRA ENTREGA*\n` +
      `Por favor confirmar el pedido\n` +
      `═══════════════════════════════════`;

    // Mensaje para Móvil (más compacto, sin caracteres Unicode problemáticos)
    const mobileMessage = 
      `*NUEVO PEDIDO - ${storeData.name.toUpperCase()}*\n` +
      `------------------------\n` +
      `Fecha: ${fecha}\n` +
      `Hora: ${hora}\n` +
      `------------------------\n\n` +
      `*PRODUCTOS:*\n` +
      `${productList}\n\n` +
      `------------------------\n` +
      `*TOTAL: $${cartTotal.toLocaleString()}*\n` +
      `------------------------\n\n` +
      `*CLIENTE:*\n` +
      `Nombre: ${formData.firstName} ${formData.lastName}\n` +
      `Tel: ${formData.phone}\n\n` +
      `*ENTREGA:*\n` +
      `Dir: ${formData.address}\n` +
      `Ciudad: ${formData.city}\n` +
      `Barrio: ${formData.neighborhood}\n` +
      (formData.reference ? `Ref: ${formData.reference}\n` : '') +
      (formData.locationUrl ? `Ubicacion: ${formData.locationUrl}\n` : '') +
      `\n------------------------\n` +
      `*PAGO CONTRA ENTREGA*\n` +
      `Por favor confirmar el pedido\n` +
      `------------------------`;
    
    const message = isMobile ? mobileMessage : pcMessage;
    
    const whatsappNumber = storeData.floatingCartConfig?.whatsappNumber || storeData.whatsappNumber || '595981123456';
    
    // Procesar número: quitar el '+' y el separador '|' para formato wa.me
    const cleanNumber = whatsappNumber
      .replace(/\+/g, '')  // Quitar signo +
      .replace(/\|/g, '');  // Quitar separador |
    
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setIsOrderFormOpen(false);
    clearCart();
  };

  if (!floatingCartEnabled) return null;

  return (
    <>
      <FloatingCartButton 
        itemCount={cartCount}
        onClick={() => setIsCartModalOpen(true)}
      />
      <ElegantCartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        total={cartTotal}
        onCheckout={handleCheckout}
        storeName={storeData.name}
      />
      <ElegantOrderForm
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        onSubmit={handleOrderSubmit}
        storeName={storeData.name}
        total={cartTotal}
        items={cartItems}
      />
    </>
  );
}
