/**
 * DEMO PRODUCTOS POR NICHO Y SUBNICHO
 * 
 * Responsabilidad única: Proveer datos demo (producto + tienda) por nicho/subnicho.
 * 
 * TODAS las URLs de imágenes aquí han sido verificadas y probadas.
 * NO agregar URLs nuevas sin verificarlas primero.
 */

import { obtenerNicho } from '@/lib/plantilla-registry';
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

// ═══════════════════════════════════════════════════════════════
// URLS VERIFICADAS (todas probadas y funcionando)
// ═══════════════════════════════════════════════════════════════
const IMG = {
  // Celulares
  phone1: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
  phone2: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=800&fit=crop',
  phone3: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&h=800&fit=crop',
  phone4: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=800&fit=crop',
  // Audio / Electrónico genérico
  audio1: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
  audio2: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop',
  audio3: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
  // Cámaras
  cam1: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop',
  cam2: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?w=800&h=800&fit=crop',
  // Wearables
  watch1: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=800&fit=crop',
  watch2: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop',
  // Gaming / Periféricos
  gaming1: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=800&fit=crop',
  // Salud
  salud1: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=800&fit=crop',
  salud2: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&h=800&fit=crop',
  salud3: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=800&fit=crop',
  // Belleza
  belleza1: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=800&fit=crop',
  belleza2: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&h=800&fit=crop',
  belleza3: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=800&fit=crop',
  // Hogar
  hogar1: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=800&h=800&fit=crop',
  hogar2: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=800&fit=crop',
  hogar3: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop',
  // Herramientas
  tool1: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&h=800&fit=crop',
  tool2: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=800&fit=crop',
  tool3: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=800&fit=crop',
};

// ═══════════════════════════════════════════════════════════════
// HELPER: Construye un DemoData completo
// ═══════════════════════════════════════════════════════════════
function crearDemo(
  id: string, title: string, description: string,
  price: string, originalPrice: string,
  imgs: string[],
  category: string, rating: number, reviews: number,
  features: string[],
  storeName: string, logoText: string,
): DemoData {
  return {
    product: {
      id, title, description,
      price, originalPrice, currency: 'USD',
      imageUrl: imgs[0],
      images: imgs,
      gallery: imgs.slice(0, 2),
      category, rating, reviews, features,
    },
    store: { name: storeName, logoText, products: [] },
  };
}

// ═══════════════════════════════════════════════════════════════
// CATÁLOGO POR SUBNICHO (cada subcat de template-suggestions.ts)
// Todas las imágenes reutilizan URLs verificadas arriba.
// ═══════════════════════════════════════════════════════════════
const DEMO_POR_SUBCAT: Record<string, DemoData> = {
  // Audio (parlantes, guitarras, podcasting, audífonos conducción ósea, etc.)
  'audio': crearDemo('demo-audio', 'Parlante Bluetooth Premium 360°',
    'Sonido envolvente 360°, resistente al agua IPX7, batería de 24 horas.',
    '$149.99', '$249.99', [IMG.audio1, IMG.audio2, IMG.audio3],
    'Audio', 4.8, 3200, ['Sonido 360°', 'IPX7', '24h Batería'], 'SoundStore', 'SOUND'),

  // Cámaras
  'camaras': crearDemo('demo-cam', 'Cámara Profesional Mirrorless 4K',
    'Sensor full-frame 45MP, video 4K 120fps, estabilización de 5 ejes.',
    '$1,299.99', '$1,799.99', [IMG.cam1, IMG.cam2],
    'Cámaras', 4.9, 3450, ['Sensor 45MP', '4K/120fps', '5 Ejes'], 'PhotoGear', 'PHOTO'),

  'camaras-accion': crearDemo('demo-actioncam', 'Cámara de Acción Extrema 5K',
    'Grabación 5K a 60fps, sumergible a 60m, estabilización HyperSmooth.',
    '$299.99', '$450.00', [IMG.cam1, IMG.cam2],
    'Cámaras de Acción', 4.9, 5400, ['5K/60fps', 'Sumergible 60m', 'HyperSmooth'], 'ActionGear', 'ACTION'),

  // Celulares
  'celulares': crearDemo('demo-cel', 'Smartphone Ultra Pro 5G',
    'Pantalla AMOLED 6.7" 120Hz, cámara 108MP con IA, batería 5000mAh.',
    '$399.99', '$599.99', [IMG.phone1, IMG.phone2, IMG.phone3, IMG.phone4],
    'Celulares', 4.9, 1390, ['AMOLED 120Hz', 'Cámara 108MP', 'Carga 65W'], 'CelularStore', 'CELULAR'),

  // Gaming
  'gaming': crearDemo('demo-gaming', 'Teclado Mecánico RGB Pro',
    'Switches ópticos ultra-rápidos, base de aluminio y keycaps PBT.',
    '$129.99', '$180.00', [IMG.gaming1],
    'Gaming', 4.9, 5200, ['Switches Ópticos', 'RGB Sync', 'Aluminio'], 'GamerGear', 'GAMING'),

  // Tablets
  'tablets': crearDemo('demo-tablet', 'Tablet Pro 12.9" M-Series',
    'Pantalla Liquid Retina XDR, chip M-Class de 8 núcleos.',
    '$899.99', '$1,199.99', [IMG.phone1, IMG.phone2, IMG.phone3],
    'Tablets', 4.8, 2870, ['Pantalla XDR', 'Chip M-Class', 'Lápiz'], 'TabletStore', 'TABLET'),

  // Wearables
  'wearables': crearDemo('demo-wear', 'SmartWatch Titanium Elite',
    'Cuerpo de titanio, ECG incorporado, GPS de doble banda.',
    '$450.00', '$600.00', [IMG.watch1, IMG.watch2],
    'Wearables', 4.8, 2980, ['Titanio', 'ECG + SpO2', 'GPS Dual'], 'WearStore', 'WEAR'),

  // Drones
  'drones': crearDemo('demo-drone', 'Drone Profesional 4K Gimbal',
    'Cámara 4K con gimbal 3 ejes, autonomía 45 min, detección 360°.',
    '$799.99', '$1,199.99', [IMG.cam1, IMG.cam2],
    'Drones', 4.9, 1890, ['4K Gimbal', '45min Vuelo', 'Detección 360°'], 'DroneStore', 'DRONE'),

  // Smart Home / Hogar Smart
  'smart-home': crearDemo('demo-smarthome', 'Hub de Control Domótico',
    'Controla luces, cerraduras y termostato desde un panel táctil.',
    '$249.99', '$399.99', [IMG.hogar1, IMG.hogar2, IMG.hogar3],
    'Smart Home', 4.7, 1560, ['Panel Táctil', 'Multi-Protocolo', 'IA'], 'SmartStore', 'SMART'),

  'hogar-smart': crearDemo('demo-hogarsmart', 'Ecosistema Smart Home',
    'Kit domótica: hub central, sensores, bombillas y enchufes smart.',
    '$199.99', '$349.99', [IMG.hogar1, IMG.hogar2, IMG.hogar3],
    'Hogar Inteligente', 4.8, 2340, ['Kit Completo', 'Asistente IA', 'Auto'], 'HomeStore', 'HOME'),

  // Movilidad
  'movilidad': crearDemo('demo-scooter', 'Scooter Eléctrico Urban Pro',
    'Motor 500W, autonomía 45km, suspensión doble, neumáticos 10".',
    '$599.99', '$899.99', [IMG.tool1, IMG.tool2, IMG.tool3],
    'Movilidad', 4.7, 1230, ['Motor 500W', '45km', 'Suspensión Doble'], 'UrbanMove', 'URBAN'),

  // VR
  'vr': crearDemo('demo-vr', 'Visor VR Inmersivo Pro',
    'Pantalla dual 4K, campo de visión 120°, tracking 6DOF.',
    '$499.99', '$699.99', [IMG.gaming1, IMG.audio1],
    'Realidad Virtual', 4.8, 1670, ['Dual 4K', 'FOV 120°', '6DOF'], 'VRStore', 'VR'),

  // Periféricos (con y sin acento)
  'perifericos': crearDemo('demo-perifericos', 'Teclado Mecánico Custom RGB',
    'Switches hot-swappable, aluminio CNC, keycaps PBT doubleshot.',
    '$159.99', '$229.99', [IMG.gaming1],
    'Periféricos', 4.9, 4100, ['Hot-Swappable', 'Aluminio CNC', 'PBT'], 'MechStore', 'MECH'),

  'periféricos': crearDemo('demo-perifericos2', 'Numpad Mecánico Compacto',
    'Panel numérico mecánico, retroiluminación RGB, aluminio.',
    '$79.99', '$119.99', [IMG.gaming1],
    'Periféricos', 4.8, 2300, ['Switches Táctiles', 'RGB', 'Aluminio'], 'MechStore', 'MECH'),

  // Proyectores
  'proyectores': crearDemo('demo-proyector', 'Proyector Láser 4K Cinema',
    'Tecnología láser, 3000 lúmenes, HDR10+, Dolby Atmos.',
    '$1,499.99', '$2,199.99', [IMG.hogar1, IMG.hogar2],
    'Proyectores', 4.8, 890, ['Láser 4K', '3000 Lúmenes', 'Dolby'], 'CinemaStore', 'CINEMA'),

  // Energía
  'energia': crearDemo('demo-energia', 'Estación de Energía Portátil 1000W',
    'Batería LiFePO4, carga solar compatible, 10 puertos.',
    '$699.99', '$999.99', [IMG.tool1, IMG.tool2, IMG.tool3],
    'Energía Portátil', 4.7, 1100, ['1024Wh', 'Carga Solar', '10 Puertos'], 'PowerStore', 'POWER'),

  // E-Readers
  'ereaders': crearDemo('demo-ereader', 'E-Reader Premium E-Ink 7"',
    'Pantalla E-Ink Carta 1300, luz cálida, IPX8, 32GB.',
    '$199.99', '$279.99', [IMG.phone1, IMG.phone2],
    'E-Readers', 4.8, 3400, ['E-Ink Carta', 'Luz Cálida', 'IPX8'], 'ReadStore', 'READ'),

  // Ergonomía
  'ergonomia': crearDemo('demo-ergo', 'Silla Ergonómica Executive Pro',
    'Soporte lumbar dinámico, malla 3D, reposabrazos 4D.',
    '$549.99', '$799.99', [IMG.hogar1, IMG.hogar2, IMG.hogar3],
    'Ergonomía', 4.7, 1890, ['Lumbar Dinámico', 'Malla 3D', 'Brazos 4D'], 'ErgoStore', 'ERGO'),

  // Monitores
  'monitores': crearDemo('demo-monitor', 'Monitor Curvo Ultrawide 49"',
    'Panel OLED curvo 1800R, 240Hz, HDR1000.',
    '$1,299.99', '$1,799.99', [IMG.gaming1, IMG.audio1],
    'Monitores', 4.9, 2100, ['OLED 49"', '240Hz', 'HDR1000'], 'DisplayStore', 'DISPLAY'),

  // Electrodomésticos
  'electrodomesticos': crearDemo('demo-espresso', 'Máquina de Espresso Pro',
    'Caldera doble acero inoxidable, molinillo integrado, 20 bares.',
    '$449.99', '$699.99', [IMG.hogar1, IMG.hogar2, IMG.hogar3],
    'Electrodomésticos', 4.8, 1450, ['Caldera Doble', 'Molinillo', '20 Bares'], 'CafeStore', 'CAFE'),

  // Displays
  'displays': crearDemo('demo-display', 'Televisor OLED 8K 65"',
    'Panel OLED autoiluminado, procesador IA, Dolby Vision IQ.',
    '$2,499.99', '$3,499.99', [IMG.gaming1, IMG.audio1],
    'Pantallas', 4.9, 980, ['OLED 8K', 'IA Cognitiva', 'Dolby Vision'], 'ScreenStore', 'SCREEN'),

  // Fotografía (con y sin acento)
  'fotografía': crearDemo('demo-gimbal', 'Gimbal Estabilizador Cinematográfico',
    'Estabilizador 3 ejes para cámaras, motor brushless, tracking IA.',
    '$349.99', '$499.99', [IMG.cam1, IMG.cam2],
    'Fotografía', 4.8, 2300, ['3 Ejes', 'Brushless', 'Tracking IA'], 'PhotoGear', 'PHOTO'),

  'fotografia': crearDemo('demo-gimbal2', 'Cardán Estabilizador Pro',
    'Fibra de carbono ultraligero, 3 ejes, control por app.',
    '$349.99', '$499.99', [IMG.cam1, IMG.cam2],
    'Fotografía', 4.8, 2300, ['Fibra Carbono', '3 Ejes', 'App Control'], 'PhotoGear', 'PHOTO'),

  // Seguridad
  'seguridad': crearDemo('demo-seguridad', 'Cerradura Biométrica Smart',
    'Huella digital 3D, reconocimiento facial, app remota.',
    '$179.99', '$279.99', [IMG.hogar1, IMG.hogar2, IMG.hogar3],
    'Seguridad', 4.7, 1670, ['Huella 3D', 'Facial IA', 'App Remota'], 'SecureStore', 'SECURE'),

  // Laptops
  'laptops': crearDemo('demo-laptop', 'Laptop Gaming RTX Elite 16"',
    'GPU RTX 4080, CPU 14-Core, pantalla 240Hz QHD, 32GB DDR5.',
    '$1,899.99', '$2,499.99', [IMG.gaming1, IMG.audio1],
    'Laptops', 4.9, 3200, ['RTX 4080', '240Hz QHD', '32GB DDR5'], 'LaptopStore', 'LAPTOP'),

  // Consolas
  'consolas': crearDemo('demo-consola', 'Consola Next-Gen Ultra',
    'GPU custom RDNA4, SSD 2TB, ray tracing, 8K output.',
    '$499.99', '$599.99', [IMG.gaming1, IMG.audio1],
    'Consolas', 4.9, 8900, ['RDNA4', 'SSD 2TB', 'Ray Tracing 8K'], 'GameStore', 'GAME'),

  // Óptica
  'optica': crearDemo('demo-telescopio', 'Telescopio Inteligente Wi-Fi',
    'Óptica conectada a smartphone, detección de estrellas con IA.',
    '$399.99', '$599.99', [IMG.cam1, IMG.cam2],
    'Óptica', 4.8, 1340, ['Zoom 150x', 'IA Estelar', 'Wi-Fi'], 'OpticStore', 'OPTIC'),

  // Mascotas
  'mascotas': crearDemo('demo-mascota', 'Collar GPS Inteligente',
    'Rastreo GPS tiempo real, geocercas, monitor de actividad, IP68.',
    '$79.99', '$129.99', [IMG.watch1, IMG.watch2],
    'Mascotas', 4.7, 2100, ['GPS Real', 'Geocercas', 'IP68'], 'PetStore', 'PET'),

  // Outdoor
  'outdoor': crearDemo('demo-outdoor', 'Estación Solar Portátil',
    'Panel solar plegable 200W, batería 500Wh, 8 puertos, IP65.',
    '$349.99', '$499.99', [IMG.tool1, IMG.tool2, IMG.tool3],
    'Outdoor', 4.8, 1780, ['Solar 200W', '500Wh', 'IP65'], 'OutdoorStore', 'OUTDOOR'),

  // Automotriz
  'automotriz': crearDemo('demo-dashcam', 'Dashcam 4K Espejo Retrovisor',
    'Cámara DVR dual 4K, visión nocturna STARVIS, GPS integrado.',
    '$149.99', '$249.99', [IMG.cam1, IMG.cam2],
    'Automotriz', 4.7, 3400, ['Dual 4K', 'Visión Nocturna', 'GPS'], 'AutoStore', 'AUTO'),

  // Salud-Belleza
  'salud-belleza': crearDemo('demo-saludbelleza', 'Pistola de Masaje Terapéutico',
    'Motor brushless, 30 velocidades, 6 cabezales, batería 6h.',
    '$129.99', '$199.99', [IMG.salud1, IMG.salud2, IMG.salud3],
    'Salud y Belleza', 4.8, 4200, ['Brushless', '30 Vel.', '6 Cabezales'], 'WellnessStore', 'WELLNESS'),

  // Herramientas (subcat dentro de electrónico)
  'herramientas': crearDemo('demo-herr-tech', 'Grabadora Láser CNC',
    'Grabado en madera, metal y acrílico. Láser 20W, 400x400mm.',
    '$399.99', '$599.99', [IMG.tool1, IMG.tool2, IMG.tool3],
    'Herramientas Tech', 4.7, 1560, ['Láser 20W', '400x400mm', 'Multi-material'], 'ToolStore', 'TOOLS'),
};

// ═══════════════════════════════════════════════════════════════
// DATOS POR NICHO (nivel superior)
// ═══════════════════════════════════════════════════════════════
const DEMO_POR_NICHO: Record<string, DemoData> = {
  celulares: DEMO_POR_SUBCAT['celulares'],

  electronico: crearDemo('demo-elec', 'Gadget Tecnológico Premium',
    'Dispositivo electrónico de última generación con diseño premium.',
    '$199.99', '$349.99', [IMG.audio1, IMG.audio2, IMG.audio3],
    'Electrónicos', 4.8, 2847, ['Alta Tecnología', 'Diseño Premium', 'Innovación'], 'TechStore', 'TECH'),

  salud: crearDemo('demo-salud', 'Colágeno Hidrolizado Premium',
    'Fórmula avanzada con vitamina C y ácido hialurónico. 30 sobres.',
    '$49.99', '$79.99', [IMG.salud1, IMG.salud2, IMG.salud3],
    'Salud', 4.7, 3200, ['Vitamina C', 'Ácido hialurónico', '30 sobres'], 'SaludStore', 'SALUD'),

  belleza: crearDemo('demo-belleza', 'Sérum Facial Vitamina C 30%',
    'Sérum con ácido hialurónico y niacinamida. Ilumina y reduce manchas.',
    '$39.99', '$65.99', [IMG.belleza1, IMG.belleza2, IMG.belleza3],
    'Belleza', 4.8, 1850, ['Vitamina C 30%', 'Ácido hialurónico', 'Anti-manchas'], 'BellezaStore', 'BELLEZA'),

  hogar: crearDemo('demo-hogar', 'Difusor de Aromas Inteligente',
    'Control por app, 6 modos de nebulización, tanque de 500ml.',
    '$59.99', '$89.99', [IMG.hogar1, IMG.hogar2, IMG.hogar3],
    'Hogar', 4.6, 980, ['Control por app', '6 modos', 'Tanque 500ml'], 'HogarStore', 'HOGAR'),

  herramientas: crearDemo('demo-herr', 'Kit Herramientas Profesional 120pzs',
    'Acero cromo-vanadio, maletín reforzado, llaves y más.',
    '$129.99', '$199.99', [IMG.tool1, IMG.tool2, IMG.tool3],
    'Herramientas', 4.7, 1560, ['Cromo-vanadio', 'Maletín', '120 piezas'], 'ToolStore', 'TOOLS'),
};

// ═══════════════════════════════════════════════════════════════
// API PÚBLICA
// ═══════════════════════════════════════════════════════════════

/**
 * PRIORIDAD:
 *   1. Nicho específico (salud, belleza, hogar, herramientas)
 *   2. Subcat específico (audio, tablets, drones, etc.)
 *   3. Fallback electronico genérico
 */
export function obtenerDemoParaTemplate(templateId: string): DemoData {
  // 1. Obtener nicho PRIMERO
  let nicho = 'electronico';
  try {
    nicho = obtenerNicho(templateId);
  } catch {
    // Silently fallback
  }

  // 2. Si NO es electrónico, usar nicho directamente
  if (nicho !== 'electronico' && DEMO_POR_NICHO[nicho]) {
    return DEMO_POR_NICHO[nicho];
  }

  // 3. Para electrónico: buscar subcat específico
  const subcat = TEMPLATE_SUGGESTIONS[templateId]?.subcat || '';
  if (subcat && subcat !== 'general' && DEMO_POR_SUBCAT[subcat]) {
    return DEMO_POR_SUBCAT[subcat];
  }

  // 4. Fallback genérico
  return DEMO_POR_NICHO['electronico'];
}

/** Acceso directo por nicho */
export function obtenerDemoPorNicho(nicho: string): DemoData {
  return DEMO_POR_NICHO[nicho] || DEMO_POR_NICHO['electronico'];
}
