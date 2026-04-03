'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import CartModal from '@/components/componentes-compartidos/CartModal';
import OrderForm from '@/components/componentes-compartidos/OrderForm';
import { StoreData, OrderFormType } from '@/lib/types';
import { handleOrderSubmission } from '@/lib/whatsapp';

interface StoreCartWrapperProps {
  children: React.ReactNode;
  storeName: string;
  storeData: StoreData;
  template?: string;
}

// Template color schemes - NO morados, colores limpios
const getTemplateStyles = (template?: string) => {
  const styles: Record<string, { bg: string; hover: string; accent: string; text: string; primaryColor: string }> = {
    megamarket: { bg: 'bg-[#febd69]', hover: 'hover:bg-[#f3a847]', accent: 'bg-[#131921]', text: 'text-[#131921]', primaryColor: '#131921' },
    flashdeals: { bg: 'bg-red-600', hover: 'hover:bg-red-700', accent: 'bg-yellow-400', text: 'text-white', primaryColor: '#dc2626' },
    tradevault: { bg: 'bg-[#ff6a00]', hover: 'hover:bg-[#e55a00]', accent: 'bg-white', text: 'text-white', primaryColor: '#ff6a00' },
    mercadocod: { bg: 'bg-yellow-400', hover: 'hover:bg-yellow-500', accent: 'bg-blue-600', text: 'text-blue-900', primaryColor: '#facc15' },
    trendfast: { bg: 'bg-[#fa6338]', hover: 'hover:bg-[#e5532d]', accent: 'bg-white', text: 'text-white', primaryColor: '#fa6338' },
    minimaltech: { bg: 'bg-black', hover: 'hover:bg-gray-800', accent: 'bg-white', text: 'text-white', primaryColor: '#000000' },
    handcraft: { bg: 'bg-[#8b5a2b]', hover: 'hover:bg-[#6d4621]', accent: 'bg-[#f5f5dc]', text: 'text-white', primaryColor: '#8b5a2b' },
    boldathlete: { bg: 'bg-black', hover: 'hover:bg-gray-900', accent: 'bg-white', text: 'text-white', primaryColor: '#000000' },
    blueretail: { bg: 'bg-[#0058a3]', hover: 'hover:bg-[#004a89]', accent: 'bg-[#fbd914]', text: 'text-white', primaryColor: '#0058a3' },
    bidzone: { bg: 'bg-[#1e3a5f]', hover: 'hover:bg-[#152a45]', accent: 'bg-[#ffc107]', text: 'text-white', primaryColor: '#1e3a5f' },
    editorialchic: { bg: 'bg-black', hover: 'hover:bg-gray-800', accent: 'bg-white', text: 'text-white', primaryColor: '#000000' },
    nordichome: { bg: 'bg-[#0058a3]', hover: 'hover:bg-[#004a89]', accent: 'bg-[#fbd914]', text: 'text-white', primaryColor: '#0058a3' },
    bullseye: { bg: 'bg-[#cc0000]', hover: 'hover:bg-[#aa0000]', accent: 'bg-white', text: 'text-white', primaryColor: '#cc0000' },
    beautybox: { bg: 'bg-pink-500', hover: 'hover:bg-pink-600', accent: 'bg-white', text: 'text-white', primaryColor: '#ec4899' },
    techretail: { bg: 'bg-[#fff200]', hover: 'hover:bg-[#e6d900]', accent: 'bg-[#040c13]', text: 'text-[#040c13]', primaryColor: '#fff200' },
    stylepress: { bg: 'bg-[#2d2d2d]', hover: 'hover:bg-black', accent: 'bg-white', text: 'text-white', primaryColor: '#2d2d2d' },
    homedecor: { bg: 'bg-[#2c5282]', hover: 'hover:bg-[#1e3a5f]', accent: 'bg-white', text: 'text-white', primaryColor: '#2c5282' },
    builderzone: { bg: 'bg-[#ff6600]', hover: 'hover:bg-[#e55c00]', accent: 'bg-[#003366]', text: 'text-white', primaryColor: '#ff6600' },
    bulkzone: { bg: 'bg-[#1e4d2b]', hover: 'hover:bg-[#153d22]', accent: 'bg-[#ffc107]', text: 'text-white', primaryColor: '#1e4d2b' },
    sportstripe: { bg: 'bg-[#1a365d]', hover: 'hover:bg-[#132a4a]', accent: 'bg-white', text: 'text-white', primaryColor: '#1a365d' },
    futuretech: { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', accent: 'bg-white', text: 'text-white', primaryColor: '#2563eb' },
    yogapremium: { bg: 'bg-[#d31334]', hover: 'hover:bg-[#b91c1c]', accent: 'bg-white', text: 'text-white', primaryColor: '#d31334' },
    redstyle: { bg: 'bg-red-600', hover: 'hover:bg-red-700', accent: 'bg-white', text: 'text-white', primaryColor: '#dc2626' },
    zenbasic: { bg: 'bg-[#ff0000]', hover: 'hover:bg-red-700', accent: 'bg-white', text: 'text-white', primaryColor: '#ff0000' },
    classicwear: { bg: 'bg-[#1a1a1a]', hover: 'hover:bg-black', accent: 'bg-[#c9a96e]', text: 'text-white', primaryColor: '#1a1a1a' },
    familyfun: { bg: 'bg-[#ff6b35]', hover: 'hover:bg-[#e55a2b]', accent: 'bg-white', text: 'text-white', primaryColor: '#ff6b35' },
    starstore: { bg: 'bg-[#e01a2b]', hover: 'hover:bg-[#c41424]', accent: 'bg-white', text: 'text-white', primaryColor: '#e01a2b' },
    luxservice: { bg: 'bg-amber-600', hover: 'hover:bg-amber-700', accent: 'bg-white', text: 'text-white', primaryColor: '#d97706' },
    chicstore: { bg: 'bg-[#1a1a1a]', hover: 'hover:bg-black', accent: 'bg-[#c9a96e]', text: 'text-white', primaryColor: '#1a1a1a' },
    elitestore: { bg: 'bg-[#0a0a0a]', hover: 'hover:bg-black', accent: 'bg-[#d4af37]', text: 'text-white', primaryColor: '#0a0a0a' },
    designerhub: { bg: 'bg-black', hover: 'hover:bg-gray-900', accent: 'bg-white', text: 'text-white', primaryColor: '#000000' },
    luxedit: { bg: 'bg-[#1a1a1a]', hover: 'hover:bg-black', accent: 'bg-[#c9a96e]', text: 'text-white', primaryColor: '#1a1a1a' },
    influencestyle: { bg: 'bg-pink-600', hover: 'hover:bg-pink-700', accent: 'bg-white', text: 'text-white', primaryColor: '#db2777' },
    boldyouth: { bg: 'bg-[#ff3366]', hover: 'hover:bg-[#e62e5c]', accent: 'bg-white', text: 'text-white', primaryColor: '#ff3366' },
    pinkglam: { bg: 'bg-pink-500', hover: 'hover:bg-pink-600', accent: 'bg-white', text: 'text-white', primaryColor: '#ec4899' },
    novatrend: { bg: 'bg-indigo-600', hover: 'hover:bg-indigo-700', accent: 'bg-white', text: 'text-white', primaryColor: '#4f46e5' },
    softglow: { bg: 'bg-rose-400', hover: 'hover:bg-rose-500', accent: 'bg-white', text: 'text-gray-800', primaryColor: '#fb7185' },
    beautyhaven: { bg: 'bg-pink-500', hover: 'hover:bg-pink-600', accent: 'bg-white', text: 'text-white', primaryColor: '#ec4899' },
    freshcraft: { bg: 'bg-[#22c55e]', hover: 'hover:bg-[#16a34a]', accent: 'bg-white', text: 'text-white', primaryColor: '#22c55e' },
    progamer: { bg: 'bg-blue-500', hover: 'hover:bg-blue-600', accent: 'bg-white', text: 'text-white', primaryColor: '#3b82f6' },
    gamevault: { bg: 'bg-violet-600', hover: 'hover:bg-violet-700', accent: 'bg-white', text: 'text-white', primaryColor: '#7c3aed' },
    keymarket: { bg: 'bg-[#0ea5e9]', hover: 'hover:bg-[#0284c7]', accent: 'bg-white', text: 'text-white', primaryColor: '#0ea5e9' },
    verifymarket: { bg: 'bg-[#059669]', hover: 'hover:bg-[#047857]', accent: 'bg-white', text: 'text-white', primaryColor: '#059669' },
    techparts: { bg: 'bg-[#003366]', hover: 'hover:bg-[#002244]', accent: 'bg-[#ff6600]', text: 'text-white', primaryColor: '#003366' },
    cashflow: { bg: 'bg-[#0f172a]', hover: 'hover:bg-[#1e293b]', accent: 'bg-[#22c55e]', text: 'text-white', primaryColor: '#0f172a' },
    primegoods: { bg: 'bg-[#1e40af]', hover: 'hover:bg-[#1e3a8a]', accent: 'bg-white', text: 'text-white', primaryColor: '#1e40af' },
    pricedrop: { bg: 'bg-[#dc2626]', hover: 'hover:bg-[#b91c1c]', accent: 'bg-white', text: 'text-white', primaryColor: '#dc2626' },
    eurostyle: { bg: 'bg-[#1f2937]', hover: 'hover:bg-black', accent: 'bg-white', text: 'text-white', primaryColor: '#1f2937' },
    sneakerzone: { bg: 'bg-[#111827]', hover: 'hover:bg-black', accent: 'bg-white', text: 'text-white', primaryColor: '#111827' },
    glamangel: { bg: 'bg-pink-500', hover: 'hover:bg-pink-600', accent: 'bg-white', text: 'text-white', primaryColor: '#ec4899' },
    ecooutdoor: { bg: 'bg-[#15803d]', hover: 'hover:bg-[#166534]', accent: 'bg-white', text: 'text-white', primaryColor: '#15803d' },
    extremeexplorer: { bg: 'bg-[#7c2d12]', hover: 'hover:bg-[#9a3412]', accent: 'bg-white', text: 'text-white', primaryColor: '#7c2d12' },
    fitmodern: { bg: 'bg-blue-500', hover: 'hover:bg-blue-600', accent: 'bg-white', text: 'text-white', primaryColor: '#3b82f6' },
    hypedrop: { bg: 'bg-[#18181b]', hover: 'hover:bg-black', accent: 'bg-white', text: 'text-white', primaryColor: '#18181b' },
    streetboutique: { bg: 'bg-[#292524]', hover: 'hover:bg-[#1c1917]', accent: 'bg-white', text: 'text-white', primaryColor: '#292524' },
    avantgarde: { bg: 'bg-black', hover: 'hover:bg-gray-900', accent: 'bg-white', text: 'text-white', primaryColor: '#000000' },
    petfriend: { bg: 'bg-[#0d9488]', hover: 'hover:bg-[#0f766e]', accent: 'bg-white', text: 'text-white', primaryColor: '#0d9488' },
    petworld: { bg: 'bg-[#ea580c]', hover: 'hover:bg-[#c2410c]', accent: 'bg-white', text: 'text-white', primaryColor: '#ea580c' },
    sportzone: { bg: 'bg-[#2563eb]', hover: 'hover:bg-[#1d4ed8]', accent: 'bg-white', text: 'text-white', primaryColor: '#2563eb' },
    greenhealth: { bg: 'bg-[#16a34a]', hover: 'hover:bg-[#15803d]', accent: 'bg-white', text: 'text-white', primaryColor: '#16a34a' },
    timecraft: { bg: 'bg-[#1c1917]', hover: 'hover:bg-black', accent: 'bg-[#006039]', text: 'text-white', primaryColor: '#1c1917' },
    maisonelegance: { bg: 'bg-[#292524]', hover: 'hover:bg-[#1c1917]', accent: 'bg-white', text: 'text-white', primaryColor: '#292524' },
    blueclassic: { bg: 'bg-[#1e3a8a]', hover: 'hover:bg-[#1e40af]', accent: 'bg-white', text: 'text-white', primaryColor: '#1e3a8a' },
    charmboutique: { bg: 'bg-[#be185d]', hover: 'hover:bg-[#9d174d]', accent: 'bg-white', text: 'text-white', primaryColor: '#be185d' },
    crystalshine: { bg: 'bg-pink-500', hover: 'hover:bg-pink-600', accent: 'bg-white', text: 'text-white', primaryColor: '#ec4899' },
    iconshades: { bg: 'bg-[#0f172a]', hover: 'hover:bg-[#1e293b]', accent: 'bg-white', text: 'text-white', primaryColor: '#0f172a' },
    sportoptics: { bg: 'bg-[#1e40af]', hover: 'hover:bg-[#1e3a8a]', accent: 'bg-white', text: 'text-white', primaryColor: '#1e40af' },
    modernlens: { bg: 'bg-[#111827]', hover: 'hover:bg-black', accent: 'bg-white', text: 'text-white', primaryColor: '#111827' },
    opticalretail: { bg: 'bg-[#1e3a8a]', hover: 'hover:bg-[#1e40af]', accent: 'bg-white', text: 'text-white', primaryColor: '#1e3a8a' },
    shadeshub: { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', accent: 'bg-white', text: 'text-white', primaryColor: '#2563eb' },
    italiancraft: { bg: 'bg-[#1c1917]', hover: 'hover:bg-black', accent: 'bg-white', text: 'text-white', primaryColor: '#1c1917' },
    heritagelux: { bg: 'bg-[#451a03]', hover: 'hover:bg-[#78350f]', accent: 'bg-white', text: 'text-white', primaryColor: '#451a03' },
    parisianchic: { bg: 'bg-[#1c1917]', hover: 'hover:bg-black', accent: 'bg-white', text: 'text-white', primaryColor: '#1c1917' },
    milanomodern: { bg: 'bg-[#171717]', hover: 'hover:bg-black', accent: 'bg-white', text: 'text-white', primaryColor: '#171717' },
  };
  
  return styles[template || ''] || { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', accent: 'bg-red-500', text: 'text-white', primaryColor: '#2563eb' };
};

// Inner component that uses cart context
function StoreCartInner({ children, storeName, storeData, template }: StoreCartWrapperProps) {
  const { itemCount, items, total, clearCart, isCartOpen, setIsCartOpen } = useCart();
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  // Get order form config from store data - Default PYG for Paraguay
  const orderFormConfig = storeData.orderFormConfig || {
    enabled: true,
    formType: 'modern' as OrderFormType,
    whatsappNumber: '',
    currency: 'PYG'
  };

  // Get WhatsApp number from store data or use default
  const whatsappNumber = orderFormConfig.whatsappNumber || storeData.whatsappNumber || '';

  // Get template-specific styles
  const templateStyles = getTemplateStyles(template);

  const handleCheckout = () => {
    if (!whatsappNumber) {
      alert('Esta tienda no ha configurado un numero de WhatsApp para pedidos.');
      return;
    }
    setIsCartOpen(false);
    setIsOrderFormOpen(true);
  };

  const handleOrderSubmit = (formData: {
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    neighborhood: string;
    address: string;
    locationUrl?: string;
    referencePoints: string;
  }) => {
    if (!whatsappNumber) return;

    handleOrderSubmission(
      {
        ...formData,
        products: items,
        total
      },
      storeName,
      whatsappNumber,
      () => {
        clearCart();
        setIsOrderFormOpen(false);
      }
    );
  };

  return (
    <>
      {children}

      {/* Floating Cart Button - Template Styled - SIN ICONOS */}
      {itemCount > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsCartOpen(true);
          }}
          className={`fixed bottom-6 right-6 z-[9998] ${templateStyles.bg} ${templateStyles.hover} 
            ${templateStyles.text} p-4 rounded-full shadow-2xl transition-all hover:scale-110
            flex items-center gap-2 group`}
        >
          <div className="relative">
            {/* Texto simple en lugar de icono */}
            <span className="font-bold text-lg">CARRITO</span>
            <span className={`absolute -top-2 -right-2 ${templateStyles.accent} text-white text-xs 
              font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg`}>
              {itemCount}
            </span>
          </div>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-semibold text-sm">
            Ver →
          </span>
        </button>
      )}

      {/* Cart Modal - Usando moneda PYG por defecto y color del template */}
      <CartModal
        storeName={storeName}
        whatsappNumber={whatsappNumber}
        onCheckout={handleCheckout}
        currency={orderFormConfig.currency || 'PYG'}
        primaryColor={templateStyles.primaryColor}
      />

      {/* Order Form */}
      {orderFormConfig.enabled && (
        <OrderForm
          isOpen={isOrderFormOpen}
          onClose={() => setIsOrderFormOpen(false)}
          formType={orderFormConfig.formType}
          storeName={storeName}
          whatsappNumber={whatsappNumber}
          onSubmit={handleOrderSubmit}
        />
      )}
    </>
  );
}

// Wrapper component that provides cart context
export default function StoreCartWrapper({ children, storeName, storeData, template }: StoreCartWrapperProps) {
  return (
    <StoreCartInner storeName={storeName} storeData={storeData} template={template}>
      {children}
    </StoreCartInner>
  );
}