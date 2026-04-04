/**
 * Datos de demostración compartidos para todas las tiendas.
 * Se usan en el preview cuando no hay datos reales del usuario.
 * Cada tienda puede usar estos productos para llenar sus secciones.
 */

import { Product } from './types';

// ─── PRODUCTOS DEMO POR CATEGORÍA ───
// Electrónicos
export const electronicsProducts: Product[] = [
  { id: 'demo-elec-1', title: 'Auriculares Bluetooth Pro Max', description: 'Cancelación de ruido activa, 40h batería', price: 189990, originalPrice: 299990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop', category: 'Electrónicos', rating: 4.8, reviews: 2341, discount: 37 },
  { id: 'demo-elec-2', title: 'Smartwatch Deportivo Ultra', description: 'GPS integrado, monitor cardíaco', price: 249990, originalPrice: 399990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop', category: 'Electrónicos', rating: 4.6, reviews: 1892, discount: 38 },
  { id: 'demo-elec-3', title: 'Cámara Instantánea Retro', description: 'Impresión instantánea, filtros creativos', price: 159990, originalPrice: 229990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=600&fit=crop', category: 'Electrónicos', rating: 4.9, reviews: 3278, discount: 30 },
  { id: 'demo-elec-4', title: 'Parlante Portátil Waterproof', description: 'Sonido 360°, IP67, 24h batería', price: 109990, originalPrice: 179990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop', category: 'Electrónicos', rating: 4.7, reviews: 2034, discount: 39 },
  { id: 'demo-elec-5', title: 'Tablet Pro 11" 256GB', description: 'Pantalla Retina, chip M2, WiFi 6E', price: 899990, originalPrice: 1199990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop', category: 'Electrónicos', rating: 4.9, reviews: 4521, discount: 25 },
  { id: 'demo-elec-6', title: 'Teclado Mecánico RGB Gaming', description: 'Switches Cherry MX, retroiluminación', price: 129990, originalPrice: 189990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop', category: 'Electrónicos', rating: 4.5, reviews: 1567, discount: 32 },
];

// Moda
export const fashionProducts: Product[] = [
  { id: 'demo-fash-1', title: 'Zapatillas Running Pro Air', description: 'Amortiguación reactiva, ultraligeras', price: 129990, originalPrice: 199990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop', category: 'Moda', rating: 4.7, reviews: 3124, discount: 35 },
  { id: 'demo-fash-2', title: 'Gafas de Sol Polarizadas Premium', description: 'UV400, montura titanio', price: 69990, originalPrice: 119990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop', category: 'Moda', rating: 4.3, reviews: 1678, discount: 42 },
  { id: 'demo-fash-3', title: 'Mochila Urban Explorer 30L', description: 'Impermeable, compartimento laptop 15"', price: 79990, originalPrice: 129990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop', category: 'Moda', rating: 4.5, reviews: 2156, discount: 38 },
  { id: 'demo-fash-4', title: 'Reloj Clásico Acero Inoxidable', description: 'Movimiento automático, cristal zafiro', price: 349990, originalPrice: 549990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop', category: 'Moda', rating: 4.8, reviews: 892, discount: 36 },
  { id: 'demo-fash-5', title: 'Vestido Elegante Noche', description: 'Tela satinada, corte A-line', price: 89990, originalPrice: 149990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop', category: 'Moda', rating: 4.6, reviews: 1345, discount: 40 },
  { id: 'demo-fash-6', title: 'Chaqueta Cuero Sintético', description: 'Estilo biker, forro interior suave', price: 149990, originalPrice: 229990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop', category: 'Moda', rating: 4.4, reviews: 987, discount: 35 },
];

// Hogar y Cocina
export const homeProducts: Product[] = [
  { id: 'demo-home-1', title: 'Cafetera Espresso Automática', description: 'Molinillo integrado, 15 bares', price: 399990, originalPrice: 599990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&h=600&fit=crop', category: 'Hogar', rating: 4.8, reviews: 2567, discount: 33 },
  { id: 'demo-home-2', title: 'Botella Térmica Premium 1L', description: 'Mantiene temperatura 24h', price: 49990, originalPrice: 79990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop', category: 'Hogar', rating: 4.4, reviews: 1890, discount: 38 },
  { id: 'demo-home-3', title: 'Set de Cuchillos Chef Pro', description: '8 piezas, acero alemán', price: 199990, originalPrice: 329990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&h=600&fit=crop', category: 'Hogar', rating: 4.7, reviews: 1234, discount: 39 },
  { id: 'demo-home-4', title: 'Lámpara de Mesa LED Smart', description: 'Control por app, 16M colores', price: 79990, originalPrice: 129990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&h=600&fit=crop', category: 'Hogar', rating: 4.5, reviews: 876, discount: 38 },
  { id: 'demo-home-5', title: 'Aspiradora Robot Inteligente', description: 'Mapeo láser, autovaciado', price: 549990, originalPrice: 799990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop', category: 'Hogar', rating: 4.6, reviews: 3456, discount: 31 },
  { id: 'demo-home-6', title: 'Juego de Sábanas 600 Hilos', description: 'Algodón egipcio, king size', price: 149990, originalPrice: 249990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop', category: 'Hogar', rating: 4.3, reviews: 654, discount: 40 },
];

// Deportes
export const sportsProducts: Product[] = [
  { id: 'demo-sport-1', title: 'Bicicleta Montaña 29" Carbono', description: 'Suspensión doble, 12 velocidades', price: 1899990, originalPrice: 2499990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&h=600&fit=crop', category: 'Deportes', rating: 4.9, reviews: 567, discount: 24 },
  { id: 'demo-sport-2', title: 'Yoga Mat Premium Antideslizante', description: '6mm grosor, material TPE ecológico', price: 59990, originalPrice: 89990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop', category: 'Deportes', rating: 4.5, reviews: 2345, discount: 33 },
  { id: 'demo-sport-3', title: 'Mancuernas Ajustables 24kg', description: 'Sistema de ajuste rápido', price: 299990, originalPrice: 449990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=600&fit=crop', category: 'Deportes', rating: 4.7, reviews: 1234, discount: 33 },
  { id: 'demo-sport-4', title: 'Balón Fútbol Profesional', description: 'FIFA Quality Pro, cosido a mano', price: 89990, originalPrice: 139990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=600&h=600&fit=crop', category: 'Deportes', rating: 4.6, reviews: 3456, discount: 36 },
];

// Belleza
export const beautyProducts: Product[] = [
  { id: 'demo-beauty-1', title: 'Set Skincare Completo 7 Pasos', description: 'Limpieza, tónico, sérum, crema', price: 179990, originalPrice: 289990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop', category: 'Belleza', rating: 4.8, reviews: 4567, discount: 38 },
  { id: 'demo-beauty-2', title: 'Perfume Eau de Parfum 100ml', description: 'Notas florales y amaderadas', price: 249990, originalPrice: 399990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop', category: 'Belleza', rating: 4.7, reviews: 2345, discount: 38 },
  { id: 'demo-beauty-3', title: 'Paleta de Sombras 18 Tonos', description: 'Pigmentos de alta duración', price: 69990, originalPrice: 109990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=600&fit=crop', category: 'Belleza', rating: 4.5, reviews: 1890, discount: 36 },
  { id: 'demo-beauty-4', title: 'Secador de Pelo Iónico Pro', description: '2200W, tecnología iónica', price: 119990, originalPrice: 189990, currency: 'Gs.', imageUrl: 'https://images.unsplash.com/photo-1522338242992-e1a54571a9f7?w=600&h=600&fit=crop', category: 'Belleza', rating: 4.4, reviews: 1567, discount: 37 },
];

// ─── COLECCIÓN COMPLETA DE DEMO ───
export const allDemoProducts: Product[] = [
  ...electronicsProducts,
  ...fashionProducts,
  ...homeProducts,
  ...sportsProducts,
  ...beautyProducts,
];

// ─── BANNERS DEMO POR TIPO DE TIENDA ───
export const demoBanners = {
  marketplace: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&h=500&fit=crop',
  fashion: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=500&fit=crop',
  electronics: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&h=500&fit=crop',
  sports: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=1400&h=500&fit=crop',
  beauty: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1400&h=500&fit=crop',
  home: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&h=500&fit=crop',
  luxury: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&h=500&fit=crop',
  gaming: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1400&h=500&fit=crop',
  food: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&h=500&fit=crop',
  pets: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1400&h=500&fit=crop',
  outdoor: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1400&h=500&fit=crop',
  auto: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&h=500&fit=crop',
};

// ─── HELPER: Obtener productos demo para una tienda ───
export function getDemoProducts(count: number = 20): Product[] {
  const products: Product[] = [];
  let idx = 0;
  while (products.length < count) {
    products.push(allDemoProducts[idx % allDemoProducts.length]);
    idx++;
  }
  // Asegurar IDs únicos
  return products.map((p, i) => ({ ...p, id: `${p.id}-${i}` }));
}

// ─── DEFAULT STORE DATA PARA PREVIEW ───
export const defaultPreviewStoreData = {
  name: 'Mi Tienda',
  description: 'La mejor tienda online con productos de alta calidad',
  logoText: 'TIENDA',
  bannerImage: demoBanners.marketplace,
  products: getDemoProducts(24),
  pdpTemplate: '' as const,
  model: 'marketplace' as const,
  pdpFeatures: {
    liveViewers: true,
    recentSales: true,
    scarcityTimer: true,
    stickyButton: true,
  },
  productPageType: 'standard' as const,
  discountConfig: {
    globalDiscount: { enabled: false, percentage: 0 },
    perProductDiscount: { enabled: false },
  },
};
