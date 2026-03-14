import React from 'react';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  imageUrl: string;
  category: string;
  rating: number;
  reviews: number;
}

export type StoreModel = 'marketplace' | 'hero-landing' | 'carousel-premium' | 'minimal-elegant' | 'flash-deal';
export type Language = 'es' | 'pt';

export interface StoreData {
  name: string;
  description: string;
  logoText: string;
  bannerImage: string;
  products: Product[];
  pdpCategory: PdpCategoryType;
  pdpTemplate: string;
  model: StoreModel;
  language: Language;
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
    helpCenter?: {
      enabled: boolean;
      url?: string;
    };
    reportAbuse?: {
      enabled: boolean;
      url?: string;
    };
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      whatsapp?: string;
    };
    location?: {
      enabled: boolean;
      address?: string;
      mapsUrl?: string;
    };
  };
}

export type PdpCategoryType = 'urgency' | 'trust' | 'bundle' | 'story' | 'direct' | 'health' | 'electronics' | 'tools' | 'beauty' | 'home' | 'premium-bundle' | 'premium-electronics' | 'premium-health' | 'premium-urgency';

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
  category: string;
  name: string;
  description: string;
  image_url?: string;
  premium?: boolean;
}

export interface StoreTemplate {
  id: string;
  name: string;
  description: string;
  image_url?: string;
}

export const defaultStore: StoreData = {
  name: "MegaStore",
  description: "Tu tienda de confianza para todo lo que necesitas.",
  logoText: "MegaStore",
  bannerImage: "https://picsum.photos/1200/400?random=10",
  pdpCategory: 'health',
  pdpTemplate: 'health-1',
  model: 'marketplace',
  language: 'es',
  pdpFeatures: {
    liveViewers: true,
    recentSales: true,
    scarcityTimer: true,
    stickyButton: true,
  },
  products: [
    // --- SALUD (Health) ---
    {
      id: 'h1',
      title: 'Corrector de Postura Magnético Pro',
      description: 'Alivia el dolor de espalda y mejora tu postura al instante con soporte magnético.',
      price: '$499',
      originalPrice: '$999',
      imageUrl: 'https://picsum.photos/seed/posture/800/800',
      category: 'Salud',
      rating: 4.8,
      reviews: 1245
    },
    {
      id: 'h2',
      title: 'Masajeador Cervical Shiatsu Térmico',
      description: 'Relaja la tensión muscular del cuello y hombros con calor infrarrojo.',
      price: '$899',
      originalPrice: '$1,500',
      imageUrl: 'https://picsum.photos/seed/massage/800/800',
      category: 'Salud',
      rating: 4.9,
      reviews: 3420
    },
    {
      id: 'h3',
      title: 'Rodillera de Compresión Articular 360°',
      description: 'Protección y alivio para rodillas con desgaste o lesiones deportivas.',
      price: '$350',
      originalPrice: '$700',
      imageUrl: 'https://picsum.photos/seed/knee/800/800',
      category: 'Salud',
      rating: 4.7,
      reviews: 890
    },
    {
      id: 'h4',
      title: 'Faja Reductora Térmica de Neopreno',
      description: 'Acelera la quema de grasa abdominal durante tus entrenamientos.',
      price: '$299',
      originalPrice: '$600',
      imageUrl: 'https://picsum.photos/seed/belt/800/800',
      category: 'Salud',
      rating: 4.6,
      reviews: 2100
    },
    {
      id: 'h5',
      title: 'Plantillas Ortopédicas de Gel Activo',
      description: 'Absorción de impactos para pies cansados, fascitis plantar y espolones.',
      price: '$250',
      originalPrice: '$500',
      imageUrl: 'https://picsum.photos/seed/insole/800/800',
      category: 'Salud',
      rating: 4.8,
      reviews: 1560
    },
    {
      id: 'h6',
      title: 'Oxímetro de Pulso Digital Médico',
      description: 'Mide tu saturación de oxígeno y ritmo cardíaco en segundos.',
      price: '$199',
      originalPrice: '$450',
      imageUrl: 'https://picsum.photos/seed/oximeter/800/800',
      category: 'Salud',
      rating: 4.9,
      reviews: 4500
    },
    {
      id: 'h7',
      title: 'Tensiómetro de Brazo Automático',
      description: 'Control preciso de la presión arterial en casa con memoria de lecturas.',
      price: '$650',
      originalPrice: '$1,200',
      imageUrl: 'https://picsum.photos/seed/bloodpressure/800/800',
      category: 'Salud',
      rating: 4.7,
      reviews: 830
    },
    {
      id: 'h8',
      title: 'Almohada Cervical Ergonómica Memory Foam',
      description: 'Alinea tu columna mientras duermes para un descanso profundo sin dolores.',
      price: '$599',
      originalPrice: '$1,100',
      imageUrl: 'https://picsum.photos/seed/pillow/800/800',
      category: 'Salud',
      rating: 4.9,
      reviews: 2750
    },
    {
      id: 'h9',
      title: 'Estimulador Muscular EMS Portátil',
      description: 'Tonifica músculos y alivia dolores mediante impulsos eléctricos.',
      price: '$399',
      originalPrice: '$800',
      imageUrl: 'https://picsum.photos/seed/ems/800/800',
      category: 'Salud',
      rating: 4.5,
      reviews: 620
    },
    {
      id: 'h10',
      title: 'Corrector de Juanetes Nocturno Pro',
      description: 'Alineación progresiva y alivio del dolor sin cirugía.',
      price: '$180',
      originalPrice: '$400',
      imageUrl: 'https://picsum.photos/seed/bunion/800/800',
      category: 'Salud',
      rating: 4.6,
      reviews: 1120
    },

    // --- ELECTRÓNICA (Electronics) ---
    {
      id: 'e1',
      title: 'Smartwatch Deportivo Pro Series X',
      description: 'Monitor de salud 24/7, llamadas Bluetooth y batería de 10 días.',
      price: '$899',
      originalPrice: '$1,800',
      imageUrl: 'https://picsum.photos/seed/smartwatch/800/800',
      category: 'Electrónica',
      rating: 4.8,
      reviews: 5420
    },
    {
      id: 'e2',
      title: 'Auriculares Inalámbricos TWS Noise Cancelling',
      description: 'Sonido inmersivo con cancelación activa de ruido y bajos profundos.',
      price: '$599',
      originalPrice: '$1,200',
      imageUrl: 'https://picsum.photos/seed/earbuds/800/800',
      category: 'Electrónica',
      rating: 4.9,
      reviews: 8900
    },
    {
      id: 'e3',
      title: 'Cámara de Seguridad WiFi 360° HD',
      description: 'Vigila tu hogar desde el celular con visión nocturna y audio bidireccional.',
      price: '$450',
      originalPrice: '$900',
      imageUrl: 'https://picsum.photos/seed/camera/800/800',
      category: 'Electrónica',
      rating: 4.7,
      reviews: 3200
    },
    {
      id: 'e4',
      title: 'Mini Proyector Portátil Full HD 1080p',
      description: 'Cine en casa en cualquier pared con conexión WiFi para celular.',
      price: '$1,299',
      originalPrice: '$2,500',
      imageUrl: 'https://picsum.photos/seed/projector/800/800',
      category: 'Electrónica',
      rating: 4.6,
      reviews: 1450
    },
    {
      id: 'e5',
      title: 'Batería Externa PowerBank 20000mAh',
      description: 'Carga rápida para hasta 4 dispositivos simultáneamente.',
      price: '$399',
      originalPrice: '$800',
      imageUrl: 'https://picsum.photos/seed/powerbank/800/800',
      category: 'Electrónica',
      rating: 4.8,
      reviews: 2100
    },
    {
      id: 'e6',
      title: 'Aro de Luz LED 10" con Trípode',
      description: 'Iluminación profesional para TikTok, YouTube y videollamadas.',
      price: '$299',
      originalPrice: '$600',
      imageUrl: 'https://picsum.photos/seed/ringlight/800/800',
      category: 'Electrónica',
      rating: 4.5,
      reviews: 4300
    },
    {
      id: 'e7',
      title: 'Altavoz Bluetooth Impermeable IPX7',
      description: 'Sonido potente de 20W, ideal para la ducha, playa o piscina.',
      price: '$499',
      originalPrice: '$1,000',
      imageUrl: 'https://picsum.photos/seed/speaker/800/800',
      category: 'Electrónica',
      rating: 4.8,
      reviews: 1890
    },
    {
      id: 'e8',
      title: 'Repetidor Amplificador WiFi 1200Mbps',
      description: 'Elimina las zonas sin internet en tu casa con señal de doble banda.',
      price: '$350',
      originalPrice: '$700',
      imageUrl: 'https://picsum.photos/seed/wifi/800/800',
      category: 'Electrónica',
      rating: 4.6,
      reviews: 2750
    },
    {
      id: 'e9',
      title: 'Teclado Inalámbrico Plegable Multi-dispositivo',
      description: 'Escribe cómodamente en tu tablet o celular en cualquier lugar.',
      price: '$450',
      originalPrice: '$900',
      imageUrl: 'https://picsum.photos/seed/keyboard/800/800',
      category: 'Electrónica',
      rating: 4.7,
      reviews: 840
    },
    {
      id: 'e10',
      title: 'Lámpara de Escritorio LED con Cargador Inalámbrico',
      description: 'Iluminación ajustable que carga tu celular mientras trabajas.',
      price: '$550',
      originalPrice: '$1,100',
      imageUrl: 'https://picsum.photos/seed/lamp/800/800',
      category: 'Electrónica',
      rating: 4.9,
      reviews: 1120
    },

    // --- HERRAMIENTAS (Tools) ---
    {
      id: 't1',
      title: 'Taladro Percutor Inalámbrico 20V Brushless',
      description: 'Potencia industrial sin cables. Incluye 2 baterías y maletín.',
      price: '$1,499',
      originalPrice: '$3,000',
      imageUrl: 'https://picsum.photos/seed/drill/800/800',
      category: 'Herramientas',
      rating: 4.9,
      reviews: 3400
    },
    {
      id: 't2',
      title: 'Set de Llaves de Vaso Profesionales (108 Piezas)',
      description: 'Acero al cromo vanadio de alta resistencia para mecánica.',
      price: '$999',
      originalPrice: '$2,000',
      imageUrl: 'https://picsum.photos/seed/socketset/800/800',
      category: 'Herramientas',
      rating: 4.8,
      reviews: 2150
    },
    {
      id: 't3',
      title: 'Medidor Láser de Distancia Digital 50m',
      description: 'Cálculo de área y volumen instantáneo con precisión milimétrica.',
      price: '$450',
      originalPrice: '$900',
      imageUrl: 'https://picsum.photos/seed/laser/800/800',
      category: 'Herramientas',
      rating: 4.7,
      reviews: 1200
    },
    {
      id: 't4',
      title: 'Amoladora Angular Profesional 850W',
      description: 'Corte y desbaste rápido con sistema de protección contra polvo.',
      price: '$799',
      originalPrice: '$1,600',
      imageUrl: 'https://picsum.photos/seed/grinder/800/800',
      category: 'Herramientas',
      rating: 4.8,
      reviews: 1890
    },
    {
      id: 't5',
      title: 'Soldador Inverter Portátil 200A',
      description: 'Soldadura profesional en un equipo compacto y ligero.',
      price: '$1,899',
      originalPrice: '$3,800',
      imageUrl: 'https://picsum.photos/seed/welder/800/800',
      category: 'Herramientas',
      rating: 4.9,
      reviews: 850
    },
    {
      id: 't6',
      title: 'Linterna Táctica LED Militar Recargable',
      description: '10,000 lúmenes de potencia con zoom ajustable y cuerpo de aluminio.',
      price: '$299',
      originalPrice: '$600',
      imageUrl: 'https://picsum.photos/seed/flashlight/800/800',
      category: 'Herramientas',
      rating: 4.6,
      reviews: 4200
    },
    {
      id: 't7',
      title: 'Nivel Láser Autonivelante 3D 12 Líneas',
      description: 'Líneas verdes de alta visibilidad para alineación perfecta en construcción.',
      price: '$1,299',
      originalPrice: '$2,600',
      imageUrl: 'https://picsum.photos/seed/level/800/800',
      category: 'Herramientas',
      rating: 4.8,
      reviews: 940
    },
    {
      id: 't8',
      title: 'Kit de Herramientas Manuales para Hogar (150pcs)',
      description: 'Todo lo necesario para reparaciones domésticas en un solo maletín.',
      price: '$699',
      originalPrice: '$1,400',
      imageUrl: 'https://picsum.photos/seed/toolkit/800/800',
      category: 'Herramientas',
      rating: 4.7,
      reviews: 3100
    },
    {
      id: 't9',
      title: 'Sierra Circular de Mano 1200W',
      description: 'Cortes precisos en madera con guía láser integrada.',
      price: '$899',
      originalPrice: '$1,800',
      imageUrl: 'https://picsum.photos/seed/saw/800/800',
      category: 'Herramientas',
      rating: 4.8,
      reviews: 1150
    },
    {
      id: 't10',
      title: 'Compresor de Aire Portátil Digital para Auto',
      description: 'Infla neumáticos en minutos con apagado automático.',
      price: '$499',
      originalPrice: '$1,000',
      imageUrl: 'https://picsum.photos/seed/compressor/800/800',
      category: 'Herramientas',
      rating: 4.9,
      reviews: 5600
    },

    // --- BELLEZA (Beauty) ---
    {
      id: 'b1',
      title: 'Depiladora Láser IPL Definitiva en Casa',
      description: 'Piel suave y sin vello permanente sin dolor ni visitas al salón.',
      price: '$1,499',
      originalPrice: '$3,000',
      imageUrl: 'https://picsum.photos/seed/ipl/800/800',
      category: 'Belleza',
      rating: 4.8,
      reviews: 4200
    },
    {
      id: 'b2',
      title: 'Cepillo Secador Voluminizador 3 en 1',
      description: 'Seca, peina y da volumen en un solo paso. Efecto de salón.',
      price: '$450',
      originalPrice: '$900',
      imageUrl: 'https://picsum.photos/seed/hairbrush/800/800',
      category: 'Belleza',
      rating: 4.9,
      reviews: 8900
    },
    {
      id: 'b3',
      title: 'Masajeador Facial Ultrasónico Peeling',
      description: 'Limpieza profunda de poros y eliminación de puntos negros.',
      price: '$399',
      originalPrice: '$800',
      imageUrl: 'https://picsum.photos/seed/peeling/800/800',
      category: 'Belleza',
      rating: 4.7,
      reviews: 2150
    },
    {
      id: 'b4',
      title: 'Kit de Sueros Faciales (Vitamina C + Hialurónico)',
      description: 'Tratamiento anti-edad intensivo para una piel luminosa e hidratada.',
      price: '$599',
      originalPrice: '$1,200',
      imageUrl: 'https://picsum.photos/seed/serum/800/800',
      category: 'Belleza',
      rating: 4.9,
      reviews: 5400
    },
    {
      id: 'b5',
      title: 'Rizador de Pelo Automático Inalámbrico',
      description: 'Rizos perfectos en segundos sin enredos ni quemaduras.',
      price: '$699',
      originalPrice: '$1,400',
      imageUrl: 'https://picsum.photos/seed/curler/800/800',
      category: 'Belleza',
      rating: 4.6,
      reviews: 1800
    },
    {
      id: 'b6',
      title: 'Limpiador de Poros por Succión al Vacío',
      description: 'Extrae impurezas y grasa para una piel libre de acné.',
      price: '$299',
      originalPrice: '$600',
      imageUrl: 'https://picsum.photos/seed/pore/800/800',
      category: 'Belleza',
      rating: 4.5,
      reviews: 3200
    },
    {
      id: 'b7',
      title: 'Espejo de Maquillaje con Luz LED Regulable',
      description: 'Iluminación natural perfecta para un maquillaje impecable.',
      price: '$350',
      originalPrice: '$700',
      imageUrl: 'https://picsum.photos/seed/mirror/800/800',
      category: 'Belleza',
      rating: 4.8,
      reviews: 2700
    },
    {
      id: 'b8',
      title: 'Rodillo de Jade Auténtico y Gua Sha',
      description: 'Reduce la hinchazón facial y estimula el drenaje linfático.',
      price: '$199',
      originalPrice: '$400',
      imageUrl: 'https://picsum.photos/seed/jade/800/800',
      category: 'Belleza',
      rating: 4.7,
      reviews: 4100
    },
    {
      id: 'b9',
      title: 'Plancha de Pelo Profesional de Titanio',
      description: 'Alisado perfecto en una pasada sin dañar la fibra capilar.',
      price: '$799',
      originalPrice: '$1,600',
      imageUrl: 'https://picsum.photos/seed/flatiron/800/800',
      category: 'Belleza',
      rating: 4.9,
      reviews: 3600
    },
    {
      id: 'b10',
      title: 'Máscara de Luz LED Terapéutica 7 Colores',
      description: 'Tratamiento dermatológico en casa para acné, arrugas y manchas.',
      price: '$899',
      originalPrice: '$1,800',
      imageUrl: 'https://picsum.photos/seed/ledmask/800/800',
      category: 'Belleza',
      rating: 4.8,
      reviews: 1250
    },

    // --- HOGAR (Home) ---
    {
      id: 'ho1',
      title: 'Robot Aspirador Inteligente con Mopa',
      description: 'Limpia tu casa automáticamente mientras tú descansas. Control por App.',
      price: '$2,499',
      originalPrice: '$5,000',
      imageUrl: 'https://picsum.photos/seed/robotvac/800/800',
      category: 'Hogar',
      rating: 4.9,
      reviews: 6200
    },
    {
      id: 'ho2',
      title: 'Purificador de Aire con Filtro HEPA Verdadero',
      description: 'Elimina el 99.9% de virus, bacterias, polvo y alérgenos del aire.',
      price: '$1,299',
      originalPrice: '$2,600',
      imageUrl: 'https://picsum.photos/seed/purifier/800/800',
      category: 'Hogar',
      rating: 4.8,
      reviews: 3100
    },
    {
      id: 'ho3',
      title: 'Humidificador Ultrasónico Aromaterapia 3L',
      description: 'Mejora la calidad del aire y relaja el ambiente con aceites esenciales.',
      price: '$450',
      originalPrice: '$900',
      imageUrl: 'https://picsum.photos/seed/humidifier/800/800',
      category: 'Hogar',
      rating: 4.7,
      reviews: 4500
    },
    {
      id: 'ho4',
      title: 'Set de Cuchillos de Chef Japonés Acero Damasco',
      description: 'Corte profesional y extrema durabilidad para tu cocina.',
      price: '$899',
      originalPrice: '$1,800',
      imageUrl: 'https://picsum.photos/seed/knives/800/800',
      category: 'Hogar',
      rating: 4.9,
      reviews: 1850
    },
    {
      id: 'ho5',
      title: 'Organizador de Zapatos Apilable Transparente (12 Cajas)',
      description: 'Mantén tu calzado protegido del polvo y fácil de encontrar.',
      price: '$599',
      originalPrice: '$1,200',
      imageUrl: 'https://picsum.photos/seed/shoebox/800/800',
      category: 'Hogar',
      rating: 4.6,
      reviews: 2400
    },
    {
      id: 'ho6',
      title: 'Foco Inteligente WiFi RGB (Pack de 4)',
      description: 'Controla la iluminación con tu voz (Alexa/Google) o celular.',
      price: '$399',
      originalPrice: '$800',
      imageUrl: 'https://picsum.photos/seed/smartbulb/800/800',
      category: 'Hogar',
      rating: 4.8,
      reviews: 5100
    },
    {
      id: 'ho7',
      title: 'Mopa Giratoria 360° con Cubeta Escurridora',
      description: 'Limpieza de pisos sin esfuerzo y sin mojarte las manos.',
      price: '$499',
      originalPrice: '$1,000',
      imageUrl: 'https://picsum.photos/seed/mop/800/800',
      category: 'Hogar',
      rating: 4.7,
      reviews: 3800
    },
    {
      id: 'ho8',
      title: 'Dispensador de Agua Automático Recargable',
      description: 'Sirve agua del garrafón con un solo toque. Batería de larga duración.',
      price: '$199',
      originalPrice: '$400',
      imageUrl: 'https://picsum.photos/seed/waterdispenser/800/800',
      category: 'Hogar',
      rating: 4.5,
      reviews: 8900
    },
    {
      id: 'ho9',
      title: 'Funda de Sofá Elástica Impermeable',
      description: 'Renueva y protege tu sofá de manchas, mascotas y desgaste.',
      price: '$550',
      originalPrice: '$1,100',
      imageUrl: 'https://picsum.photos/seed/sofacover/800/800',
      category: 'Hogar',
      rating: 4.6,
      reviews: 2150
    },
    {
      id: 'ho10',
      title: 'Estante Organizador de Baño sobre Inodoro',
      description: 'Aprovecha el espacio vertical y mantén tu baño ordenado.',
      price: '$650',
      originalPrice: '$1,300',
      imageUrl: 'https://picsum.photos/seed/bathshelf/800/800',
      category: 'Hogar',
      rating: 4.7,
      reviews: 1420
    }
  ]
};
