/**
 * DEMO PRODUCTOS POR NICHO (SRP)
 * 
 * Responsabilidad única: Proveer datos demo (producto + tienda) por nicho.
 * 
 * Consumido por:
 *   - LivePDPPreview.tsx (miniaturas del carrusel)
 *   - preview/page.tsx (preview a pantalla completa)
 *   - Cualquier lugar que necesite un producto demo contextual
 * 
 * Para agregar un nicho nuevo:
 *   1. Registrar el nicho en lib/plantilla-nicho.ts
 *   2. Agregar la entrada en DEMO_POR_NICHO aquí
 */

import { obtenerNicho, getCodigosRegistrados } from '@/lib/plantilla-registry';
import { TEMPLATE_SUGGESTIONS } from '@/lib/template-suggestions';

export interface DemoProducto {
  id: string;
  title: string;
  description: string;
  price: string | number;
  originalPrice: string | number;
  currency?: string;
  imageUrl: string;
  images: string[];
  gallery: string[];
  category: string;
  rating: number;
  reviews: number;
  features: string[];
}

export interface DemoTienda {
  name: string;
  logoText: string;
  products: any[];
}

export interface DemoData {
  product: DemoProducto;
  store: DemoTienda;
}

// ── Datos demo por nicho ──
const DEMO_POR_NICHO: Record<string, DemoData> = {
  celulares: {
    product: {
      id: 'demo-cel',
      title: 'Smartphone Ultra Pro 5G',
      description: 'Pantalla AMOLED 6.7" 120Hz, cámara 108MP con IA, batería 5000mAh con carga rápida 65W.',
      price: '$399.99', originalPrice: '$599.99', currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=800&fit=crop',
      ],
      gallery: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=800&fit=crop',
      ],
      category: 'Celulares', rating: 4.9, reviews: 1390,
      features: ['Pantalla AMOLED 120Hz', 'Cámara 108MP', 'Carga rápida 65W'],
    },
    store: { name: 'CelularStore', logoText: 'CELULAR', products: [] },
  },
  electronico: {
    product: {
      id: 'demo-elec',
      title: 'Auriculares Bluetooth Pro Max',
      description: 'Cancelación de ruido activa, 40h de batería, sonido Hi-Res certificado.',
      price: '$199.99', originalPrice: '$349.99', currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
      ],
      gallery: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop',
      ],
      category: 'Electrónicos', rating: 4.8, reviews: 2847,
      features: ['Cancelación de ruido', '40h batería', 'Hi-Res Audio'],
    },
    store: { name: 'TechStore', logoText: 'TECH', products: [] },
  },
  'electronico-camaras': {
    product: {
      id: 'demo-cam',
      title: 'Action Camera Ultra 5K',
      description: 'Gimbal estabilizador integrado, sumergible a 60m, batería dual inteligente.',
      price: '$299.99', originalPrice: '$450.00', currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1516961642265-531546e84af2?w=800&h=800&fit=crop'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop',
      ],
      category: 'Cámaras', rating: 4.9, reviews: 3450,
      features: ['Video 5K/60fps', 'Sumergible', 'Estabilización Pro'],
    },
    store: { name: 'CamGear', logoText: 'GEAR', products: [] },
  },
  'electronico-wearables': {
    product: {
      id: 'demo-wear',
      title: 'SmartWatch Titanium Elite',
      description: 'Cuerpo de titanio, ECG incorporado, GPS de doble banda militar.',
      price: '$450.00', originalPrice: '$600.00', currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=800&fit=crop'
      ],
      category: 'Wearables', rating: 4.8, reviews: 2980,
      features: ['Titanio Forjado', 'Monitor Salud', 'GPS Preciso'],
    },
    store: { name: 'WearStore', logoText: 'WEAR', products: [] },
  },
  'electronico-gaming': {
    product: {
      id: 'demo-game',
      title: 'Mechanical Keyboard RGB Pro',
      description: 'Switches ópticos ultra-rápidos, base de aluminio y keycaps PBT.',
      price: '$129.99', originalPrice: '$180.00', currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=800&fit=crop'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=800&fit=crop'
      ],
      category: 'Gaming', rating: 4.9, reviews: 5200,
      features: ['Switches Ópticos', 'RGB Sync', 'Aluminio'],
    },
    store: { name: 'GamerGear', logoText: 'GAMING', products: [] },
  },

  salud: {
    product: {
      id: 'demo-salud',
      title: 'Colágeno Hidrolizado Premium',
      description: 'Fórmula avanzada con vitamina C y ácido hialurónico. 30 sobres de 10g.',
      price: '$49.99', originalPrice: '$79.99', currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=800&fit=crop',
      ],
      gallery: [
        'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&h=800&fit=crop',
      ],
      category: 'Salud', rating: 4.7, reviews: 3200,
      features: ['Vitamina C', 'Ácido hialurónico', '30 sobres'],
    },
    store: { name: 'SaludStore', logoText: 'SALUD', products: [] },
  },

  belleza: {
    product: {
      id: 'demo-belleza',
      title: 'Sérum Facial Vitamina C 30%',
      description: 'Sérum concentrado con ácido hialurónico y niacinamida. Ilumina y reduce manchas.',
      price: '$39.99', originalPrice: '$65.99', currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=800&fit=crop',
      ],
      gallery: [
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&h=800&fit=crop',
      ],
      category: 'Belleza', rating: 4.8, reviews: 1850,
      features: ['Vitamina C 30%', 'Ácido hialurónico', 'Anti-manchas'],
    },
    store: { name: 'BellezaStore', logoText: 'BELLEZA', products: [] },
  },

  hogar: {
    product: {
      id: 'demo-hogar',
      title: 'Difusor de Aromas Inteligente',
      description: 'Control por app, 6 modos de nebulización, tanque de 500ml.',
      price: '$59.99', originalPrice: '$89.99', currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop',
      ],
      gallery: [
        'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=800&fit=crop',
      ],
      category: 'Hogar', rating: 4.6, reviews: 980,
      features: ['Control por app', '6 modos', 'Tanque 500ml'],
    },
    store: { name: 'HogarStore', logoText: 'HOGAR', products: [] },
  },

  herramientas: {
    product: {
      id: 'demo-herr',
      title: 'Kit Herramientas Profesional 120pzs',
      description: 'Acero cromo-vanadio, maletín reforzado, llaves, destornilladores y más.',
      price: '$129.99', originalPrice: '$199.99', currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=800&fit=crop',
      ],
      gallery: [
        'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=800&fit=crop',
      ],
      category: 'Herramientas', rating: 4.7, reviews: 1560,
      features: ['Cromo-vanadio', 'Maletín reforzado', '120 piezas'],
    },
    store: { name: 'ToolStore', logoText: 'TOOLS', products: [] },
  },
};

// ── API pública ──

/**
 * Obtiene los datos demo para un template ID.
 * Resuelve el código → busca el nicho → retorna el demo correspondiente.
 */
export function obtenerDemoParaTemplate(templateId: string): DemoData {
  const nicho = obtenerNicho(templateId);
  
  // Refinamos usando la asombrosa clasificación de subnichos
  const subcat = TEMPLATE_SUGGESTIONS[templateId]?.subcat || '';
  
  if (subcat.includes('camara') || subcat.includes('camaras')) {
      return DEMO_POR_NICHO['electronico-camaras'];
  }
  if (subcat.includes('wearable') || subcat.includes('reloj')) {
      return DEMO_POR_NICHO['electronico-wearables'];
  }
  if (subcat.includes('gaming') || subcat.includes('periferico') || subcat.includes('keyboard')) {
      return DEMO_POR_NICHO['electronico-gaming'];
  }
  if (subcat === 'celulares') {
      return DEMO_POR_NICHO['celulares'];
  }

  return DEMO_POR_NICHO[nicho] || DEMO_POR_NICHO['electronico'];
}

/** Acceso directo por nicho */
export function obtenerDemoPorNicho(nicho: string): DemoData {
  return DEMO_POR_NICHO[nicho] || DEMO_POR_NICHO['electronico'];
}
