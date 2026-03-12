'use client';
import React from 'react';
import PdpAggressiveUrgency from '@/components/templates/pdp/PdpAggressiveUrgency';
import PdpSocialTrust from '@/components/templates/pdp/PdpSocialTrust';
import PdpBundleMaximizer from '@/components/templates/pdp/PdpBundleMaximizer';
import PdpStorytelling from '@/components/templates/pdp/PdpStorytelling';
import PdpDirectCheckout from '@/components/templates/pdp/PdpDirectCheckout';
import PdpHealth from '@/components/templates/pdp/PdpHealth';
import PdpElectronics from '@/components/templates/pdp/PdpElectronics';
import PdpTools from '@/components/templates/pdp/PdpTools';
import PdpBeauty from '@/components/templates/pdp/PdpBeauty';
import PdpHome from '@/components/templates/pdp/PdpHome';
import PdpPremiumBundle from '@/components/templates/pdp/PdpPremiumBundle';
import PdpPremiumElectronics from '@/components/templates/pdp/PdpPremiumElectronics';
import PdpPremiumHealth from '@/components/templates/pdp/PdpPremiumHealth';
import PdpPremiumUrgency from '@/components/templates/pdp/PdpPremiumUrgency';

const pdpCategoryComponents: Record<string, React.ComponentType<any>> = {
  urgency: PdpAggressiveUrgency,
  trust: PdpSocialTrust,
  bundle: PdpBundleMaximizer,
  story: PdpStorytelling,
  direct: PdpDirectCheckout,
  health: PdpHealth,
  electronics: PdpElectronics,
  tools: PdpTools,
  beauty: PdpBeauty,
  home: PdpHome,
  'premium-bundle': PdpPremiumBundle,
  'premium-electronics': PdpPremiumElectronics,
  'premium-health': PdpPremiumHealth,
  'premium-urgency': PdpPremiumUrgency,
};

interface LivePDPPreviewProps {
  templateId: string;
  category?: string;
  width?: number;
  height?: number;
  className?: string;
}

const mockProduct = {
  id: 'preview-1',
  title: 'Producto Premium',
  description: 'Descripción del producto de alta calidad con características excepcionales.',
  price: '$99.99',
  originalPrice: '$199.99',
  imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
  gallery: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
  ],
  category: 'Premium',
  rating: 4.9,
  reviews: 128,
  features: ['Alta calidad', 'Envío rápido', 'Garantía 30 días'],
};

const mockStore = {
  name: 'Mi Tienda',
  logoText: 'TIENDA',
  products: [mockProduct],
};

export default React.memo(function LivePDPPreview({ 
  templateId, 
  category = 'urgency',
  width = 304, 
  height = 304,
  className = ''
}: LivePDPPreviewProps) {
  const cat = category || templateId.split('-')[0] || 'urgency';
  const PdpComponent = pdpCategoryComponents[cat] || PdpAggressiveUrgency;
  const variant = parseInt(templateId.split('-')[1] || '1', 10);

  return (
    <div 
      className={`relative overflow-hidden bg-white ${className}`}
      style={{ 
        width, 
        height,
        contain: 'strict',
        contentVisibility: 'auto',
      }}
    >
      <div style={{
        transform: 'scale(0.38)',
        transformOrigin: 'top left',
        width: '263%',
        height: '263%',
        overflow: 'hidden',
        willChange: 'transform',
      }}>
        <PdpComponent 
          data={mockStore} 
          product={mockProduct} 
          variant={variant}
        />
      </div>
    </div>
  );
}, (prev, next) => 
  prev.templateId === next.templateId && 
  prev.category === next.category &&
  prev.width === next.width &&
  prev.height === next.height
);
