import React from 'react';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  currency: string;
  imageUrl: string; // Primera imagen (backward compatibility)
  images?: string[]; // Todas las imágenes del producto
  edited_images?: string[]; // Imágenes editadas de Almidrop
  original_images?: string[]; // Imágenes originales de Almidrop
  videos?: string[]; // Videos del producto
  category: string;
  rating: number;
  reviews: number;
  discount?: number; // Descuento individual del producto (0-100)
  costPrice?: number; // Costo del dropshipper (solo visible en builder)
  aiContent?: {
    enhancedTitle: string;
    enhancedDescription: string;
    tagline: string;
    niche: string;
    storytelling: { hook: string; painPoint: string; reveal: string };
    authority: { badgeText: string; certification: string };
    comparison: { us: string[]; them: string[] };
    faq: { q: string; a: string }[];
    testimonials?: { name: string; text: string; stars: number }[];
    sections: {
      heroHeadline: string;
      heroSubheadline: string;
      benefitsBullets: string[];
      urgencyText: string;
      socialProofText: string;
      guaranteeText: string;
      ctaPrimary: string;
      ctaSecondary: string;
      closingArgument: string;
    };
    mediaStrategy: {
      heroImages: string[];
      galleryImages: string[];
      featureImages: string[];
      videoPlacement: Array<{
        url: string;
        section: string;
        label: string;
      }>;
    };
    _meta?: { model: string; modelName: string; fallbackLevel: number; generatedAt: string };
  };
}

export type StoreModel = 'marketplace' | 'hero-landing' | 'carousel-premium' | 'minimal-elegant' | 'flash-deal';

export interface StoreData {
  name: string;
  description: string;
  logoText: string;
  bannerImage: string;
  products: Product[];
  pdpTemplate: string;
  model: StoreModel;
  pdpFeatures: {
    liveViewers: boolean;
    recentSales: boolean;
    scarcityTimer: boolean;
    stickyButton: boolean;
  };
  footerConfig?: {
    contact?: {
      enabled: boolean;
      email?: string;
      phone?: string;
    };
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      whatsapp?: string;
    };
  };
  discountConfig?: {
    globalDiscount?: {
      enabled: boolean;
      percentage: number; // 0-100
    };
    perProductDiscount?: {
      enabled: boolean;
    };
  };
  orderFormConfig?: OrderFormConfig;
  viewOnlyMode?: ViewOnlyModeConfig;
  floatingCartConfig?: FloatingCartConfig;
  whatsappNumber?: string;
  productPageType?: 'standard' | 'premium'; // 'standard' = página simple gratuita, 'premium' = PDP de alta conversión
  visualCustomizations?: {
    customizations: Array<{
      id: string;
      selector: string;
      type: 'text' | 'image' | 'style' | 'visibility' | 'component';
      property?: string;
      originalValue?: string;
      newValue: string;
      timestamp: number;
    }>;
    injectedComponents: string[];
    lastEditedAt?: string;
  };
}

export type ProductPageType = 'standard' | 'premium';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

export type OrderFormType = 'modern' | 'minimal' | 'classic';

export interface OrderFormConfig {
  enabled: boolean;
  formType: OrderFormType;
  whatsappNumber: string;
  currency: string;
}

export interface ViewOnlyModeConfig {
  enabled: boolean;
}

export interface FloatingCartConfig {
  enabled: boolean;
  whatsappNumber: string;
}

export interface OrderFormData {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  neighborhood: string;
  address: string;
  locationUrl?: string;
  referencePoints: string;
  products: CartItem[];
  total: number;
}

export type TemplateType = 
  | 'megamarket' | 'flashdeals' | 'tradevault' | 'mercadocod' | 'trendfast' | 'minimaltech' | 'handcraft' | 'boldathlete' | 'blueretail' | 'bidzone' | 'editorialchic' | 'nordichome' | 'bullseye' | 'beautybox'
  | 'techretail' | 'stylepress' | 'homedecor' | 'builderzone' | 'bulkzone' | 'sportstripe' | 'futuretech'
  | 'yogapremium' | 'redstyle' | 'zenbasic' | 'classicwear' | 'familyfun' | 'starstore' | 'luxservice' | 'chicstore' | 'elitestore' | 'designerhub'
  | 'luxedit' | 'influencestyle' | 'boldyouth' | 'pinkglam' | 'novatrend' | 'softglow' | 'beautyhaven' | 'freshcraft' | 'progamer' | 'gamevault'
  | 'keymarket' | 'verifymarket' | 'techparts' | 'cashflow' | 'primegoods' | 'pricedrop' | 'eurostyle' | 'sneakerzone' | 'glamangel'
  | 'ecooutdoor' | 'extremeexplorer' | 'fitmodern' | 'hypedrop' | 'streetboutique' | 'avantgarde' | 'petfriend' | 'petworld' | 'sportzone' | 'greenhealth'
  | 'timecraft' | 'maisonelegance' | 'blueclassic' | 'charmboutique' | 'crystalshine' | 'iconshades' | 'sportoptics' | 'modernlens' | 'opticalretail' | 'shadeshub'
  | 'italiancraft' | 'heritagelux' | 'parisianchic' | 'milanomodern' | 'futureauto';

export interface PdpTemplate {
  id: string;
  codigo?: string;
  name: string;
  description: string;
  componente?: string;
  image_url?: string;
  premium?: boolean;
  verified?: boolean;
  verificada?: boolean;
  categoria_id?: string;
  categoria_nombre?: string;
  categoria_color?: string;
  variante?: number;
  orden?: number;
  activa?: boolean;
}

export interface StoreTemplate {
  id: string;
  name: string;
  description: string;
  image_url?: string;
  verified?: boolean;
}

