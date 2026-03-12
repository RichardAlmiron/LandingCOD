import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Service Role Key in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Templates without schema-incompatible fields (premium, image_url)
const storeTemplates = [
  { id: 'megamarket', name: 'MegaMarket', description: 'Marketplace global. Ideal para catálogos grandes.', category: 'Marketplace' },
  { id: 'flashdeals', name: 'FlashDeals', description: 'Ofertas relámpago. Enfocado en descuentos.', category: 'Marketplace' },
  { id: 'tradevault', name: 'TradeVault', description: 'Comercio B2B. Para ventas al por mayor.', category: 'Marketplace' },
  { id: 'mercadocod', name: 'MercadoCOD', description: 'Comercio LatAm. Envíos rápidos y confianza.', category: 'Marketplace' },
  { id: 'trendfast', name: 'TrendFast', description: 'Moda rápida. Ideal para ropa y tendencias.', category: 'Moda' },
  { id: 'minimaltech', name: 'MinimalTech', description: 'Tech premium. Minimalista, enfocado en el producto.', category: 'Tech' },
  { id: 'handcraft', name: 'HandCraft', description: 'Artesanía. Para productos artesanales y únicos.', category: 'Hogar' },
  { id: 'boldathlete', name: 'BoldAthlete', description: 'Atlético audaz. Imágenes grandes y tipografía fuerte.', category: 'Moda' },
  { id: 'blueretail', name: 'BlueRetail', description: 'Retail azul. Limpio y enfocado en retail.', category: 'Retail' },
  { id: 'bidzone', name: 'BidZone', description: 'Subastas online. Ofertas diarias y descuentos.', category: 'Marketplace' },
  { id: 'editorialchic', name: 'EditorialChic', description: 'Editorial chic. Minimalista y elegante.', category: 'Moda' },
  { id: 'nordichome', name: 'NordicHome', description: 'Hogar nórdico. Azul y amarillo, tipografía gruesa.', category: 'Hogar' },
  { id: 'bullseye', name: 'Bullseye', description: 'Diana roja. Rojo vibrante, limpio y amigable.', category: 'Retail' },
  { id: 'beautybox', name: 'BeautyBox', description: 'Belleza premium. Negro y blanco con acentos rojos.', category: 'Belleza' },
  { id: 'techretail', name: 'TechRetail', description: 'Retail tech. Azul y amarillo, enfocado en tecnología.', category: 'Tech' },
  { id: 'stylepress', name: 'StylePress', description: 'Moda editorial. Blanco y negro, diseño de revista.', category: 'Moda' },
  { id: 'homedecor', name: 'HomeDecor', description: 'Decoración. Púrpura, amigable y para el hogar.', category: 'Hogar' },
  { id: 'builderzone', name: 'BuilderZone', description: 'Zona constructor. Naranja, robusto y profesional.', category: 'Hogar' },
  { id: 'bulkzone', name: 'BulkZone', description: 'Mayoreo. Rojo y azul, enfocado en volumen.', category: 'Retail' },
  { id: 'sportstripe', name: 'SportStripe', description: 'Rayas deportivas. Icónico y audaz.', category: 'Moda' },
  { id: 'futuretech', name: 'FutureTech', description: 'Tech moderno. Limpio, futurista y premium.', category: 'Tech' },
  { id: 'yogapremium', name: 'YogaPremium', description: 'Yoga premium. Atlético, limpio y zen.', category: 'Moda' },
  { id: 'redstyle', name: 'RedStyle', description: 'Moda accesible. Moderno y vibrante.', category: 'Moda' },
  { id: 'zenbasic', name: 'ZenBasic', description: 'Minimalismo japonés. Funcional y limpio.', category: 'Moda' },
  { id: 'classicwear', name: 'ClassicWear', description: 'Clásico americano. Atemporal y familiar.', category: 'Moda' },
  { id: 'familyfun', name: 'FamilyFun', description: 'Moda familiar. Alegre, colorido y económico.', category: 'Moda' },
  { id: 'starstore', name: 'StarStore', description: 'Tienda estrella. Tradicional y confiable.', category: 'Retail' },
  { id: 'luxservice', name: 'LuxService', description: 'Servicio lujoso. Elegante, premium y refinado.', category: 'Retail' },
  { id: 'chicstore', name: 'ChicStore', description: 'Tienda chic. Sofisticado, icónico y audaz.', category: 'Retail' },
  { id: 'elitestore', name: 'EliteStore', description: 'Lujo exclusivo. Elegante y sobrio.', category: 'Lujo' },
  { id: 'designerhub', name: 'DesignerHub', description: 'Hub de diseñadores. Vanguardista y de lujo.', category: 'Lujo' },
  { id: 'luxedit', name: 'LuxEdit', description: 'Editorial de lujo. Sofisticado y editorial.', category: 'Lujo' },
  { id: 'influencestyle', name: 'InfluenceStyle', description: 'Estilo influencer. Moderno y aspiracional.', category: 'Moda' },
  { id: 'boldyouth', name: 'BoldYouth', description: 'Moda juvenil. Atrevido y de tendencia.', category: 'Moda' },
  { id: 'pinkglam', name: 'PinkGlam', description: 'Glamour rosa. Femenino y glamuroso.', category: 'Moda' },
  { id: 'novatrend', name: 'NovaTrend', description: 'Estética impactante. Audaz y de alto impacto.', category: 'Moda' },
  { id: 'softglow', name: 'SoftGlow', description: 'Brillo suave. Minimalista y estético.', category: 'Belleza' },
  { id: 'beautyhaven', name: 'BeautyHaven', description: 'Paraíso de belleza. Colorido y profesional.', category: 'Belleza' },
  { id: 'freshcraft', name: 'FreshCraft', description: 'Artesanal fresco. Orgánico y audaz.', category: 'Belleza' },
  { id: 'progamer', name: 'ProGamer', description: 'Gaming pro. Dinámico y enfocado en juegos.', category: 'Tech' },
  { id: 'gamevault', name: 'GameVault', description: 'Biblioteca digital. Oscuro y funcional.', category: 'Tech' },
  { id: 'keymarket', name: 'KeyMarket', description: 'Marketplace de keys. Vibrante y de ofertas.', category: 'Tech' },
  { id: 'verifymarket', name: 'VerifyMarket', description: 'Reventa verificada. Limpio y basado en datos.', category: 'Tech' },
  { id: 'techparts', name: 'TechParts', description: 'Componentes tech. Azul, técnico y detallado.', category: 'Tech' },
  { id: 'cashflow', name: 'CashFlow', description: 'Cashback hub. Amigable y enfocado en ahorros.', category: 'Marketplace' },
  { id: 'primegoods', name: 'PrimeGoods', description: 'Calidad global. Profesional y de alta calidad.', category: 'Marketplace' },
  { id: 'pricedrop', name: 'PriceDrop', description: 'Precios ultra bajos. Divertido y económico.', category: 'Marketplace' },
  { id: 'eurostyle', name: 'EuroStyle', description: 'Moda europea. Moderno, limpio y elegante.', category: 'Moda' },
  { id: 'sneakerzone', name: 'SneakerZone', description: 'Sneaker head. Deportivo, audaz y urbano.', category: 'Moda' },
  { id: 'glamangel', name: 'GlamAngel', description: 'Glamour angelical. Femenino, elegante y rosa.', category: 'Belleza' },
  { id: 'ecooutdoor', name: 'EcoOutdoor', description: 'Outdoor ecológico. Natural y limpio.', category: 'Deporte' },
  { id: 'extremeexplorer', name: 'ExtremeExplorer', description: 'Explorador extremo. Rojo, negro y audaz.', category: 'Deporte' },
  { id: 'fitmodern', name: 'FitModern', description: 'Fitness moderno. Atlético y de alto contraste.', category: 'Moda' },
  { id: 'hypedrop', name: 'HypeDrop', description: 'Hype brutal. Minimalista, rojo y brutalista.', category: 'Moda' },
  { id: 'streetboutique', name: 'StreetBoutique', description: 'Street boutique. Premium, editorial y limpio.', category: 'Moda' },
  { id: 'avantgarde', name: 'AvantGarde', description: 'Avant-garde. Monocromático y vanguardista.', category: 'Moda' },
  { id: 'petfriend', name: 'PetFriend', description: 'Amigo de mascotas. Azul, amarillo y accesible.', category: 'Hogar' },
  { id: 'petworld', name: 'PetWorld', description: 'Mundo de mascotas. Limpio y estructurado.', category: 'Hogar' },
  { id: 'sportzone', name: 'SportZone', description: 'Zona deportiva. Azul, denso y funcional.', category: 'Deporte' },
  { id: 'greenhealth', name: 'GreenHealth', description: 'Salud natural. Verde y enfocado en salud.', category: 'Deporte' },
  { id: 'timecraft', name: 'TimeCraft', description: 'Relojería de lujo. Verde oscuro y prestigioso.', category: 'Lujo' },
  { id: 'maisonelegance', name: 'MaisonElegance', description: 'Elegancia maison. Rojo, itálicas y elegante.', category: 'Lujo' },
  { id: 'blueclassic', name: 'BlueClassic', description: 'Clásico azul. Limpio y clásico.', category: 'Lujo' },
  { id: 'charmboutique', name: 'CharmBoutique', description: 'Boutique de charms. Rosa suave y amigable.', category: 'Lujo' },
  { id: 'crystalshine', name: 'CrystalShine', description: 'Brillo cristalino. Azul oscuro y premium.', category: 'Lujo' },
  { id: 'iconshades', name: 'IconShades', description: 'Lentes icónicos. Rojo, negro y audaz.', category: 'Accesorios' },
  { id: 'sportoptics', name: 'SportOptics', description: 'Óptica deportiva. Negro, gris y técnico.', category: 'Accesorios' },
  { id: 'modernlens', name: 'ModernLens', description: 'Lentes modernos. Azul claro y limpio.', category: 'Accesorios' },
  { id: 'opticalretail', name: 'OpticalRetail', description: 'Óptica retail. Azul corporativo y estructurado.', category: 'Accesorios' },
  { id: 'shadeshub', name: 'ShadesHub', description: 'Hub de lentes. Blanco y negro, audaz.', category: 'Accesorios' },
  { id: 'italiancraft', name: 'ItalianCraft', description: 'Artesanía italiana. Tipografía serif y espacios amplios.', category: 'Lujo' },
  { id: 'heritagelux', name: 'HeritageLux', description: 'Herencia premium. Tonos tierra y cuadrícula elegante.', category: 'Lujo' },
  { id: 'parisianchic', name: 'ParisianChic', description: 'Chic parisino. Blanco y negro, minimalista y atemporal.', category: 'Lujo' },
  { id: 'milanomodern', name: 'MilanoModern', description: 'Milán moderno. Vanguardista y con acentos sutiles.', category: 'Lujo' },
  { id: 'futureauto', name: 'FutureAuto', description: 'Auto futurista. Modo oscuro y alto contraste.', category: 'Tech' }
];

const pdpTemplatesList = [
  // Premium First
  { id: 'premium-bundle', category: 'premium-bundle', name: 'VITALIFE BUNDLE', description: 'Máxima conversión con bundles y upsells.' },
  { id: 'premium-electronics', category: 'premium-electronics', name: 'NEXUS NOVA X', description: 'Futurista dark mode para tecnología.' },
  { id: 'premium-health', category: 'premium-health', name: 'NURO-BALANCE', description: 'Limpio y clínico para suplementos.' },
  { id: 'premium-urgency', category: 'premium-urgency', name: 'AURA AUDIO', description: 'Agresivo con contadores y escasez.' },
  
  // Urgency
  { id: 'urgency-1', category: 'urgency', name: 'Flash Relámpago', description: 'Rojo intenso, máximo contraste.' },
  { id: 'urgency-2', category: 'urgency', name: 'Black Friday', description: 'Oscuro con acentos neón.' },
  { id: 'urgency-3', category: 'urgency', name: 'Liquidación Total', description: 'Amarillo y negro, estilo advertencia.' },
  { id: 'urgency-4', category: 'urgency', name: 'Cuenta Regresiva', description: 'Naranja vibrante, enfoque en el tiempo.' },
  { id: 'urgency-5', category: 'urgency', name: 'Últimas Unidades', description: 'Rojo y blanco, minimalista pero agresivo.' },
  { id: 'urgency-6', category: 'urgency', name: 'Oferta de Medianoche', description: 'Azul oscuro y rojo.' },
  { id: 'urgency-7', category: 'urgency', name: 'Cyber Monday', description: 'Estilo tech, azul y magenta.' },
  { id: 'urgency-8', category: 'urgency', name: 'Venta de Cierre', description: 'Rojo sangre y negro absoluto.' },
  { id: 'urgency-9', category: 'urgency', name: 'Escasez Artificial', description: 'Blanco puro con rojo agresivo.' },
  { id: 'urgency-10', category: 'urgency', name: 'Drop Exclusivo', description: 'Negro y dorado, escasez premium.' },
  { id: 'urgency-11', category: 'urgency', name: 'Alerta Roja', description: 'Diseño de emergencia, alta conversión.' },
  { id: 'urgency-12', category: 'urgency', name: 'Oferta Fugaz', description: 'Temporizador gigante, colores neón.' },
  { id: 'urgency-13', category: 'urgency', name: 'Liquidación de Almacén', description: 'Estilo industrial, cajas y stock.' },
  { id: 'urgency-14', category: 'urgency', name: 'Venta Flash Nocturna', description: 'Modo oscuro profundo con acentos.' },
  { id: 'urgency-15', category: 'urgency', name: 'Última Oportunidad', description: 'Minimalista con contador agresivo.' },
  { id: 'urgency-16', category: 'urgency', name: 'Descuento por Tiempo', description: 'El precio sube cada hora.' },
  { id: 'urgency-17', category: 'urgency', name: 'Venta de Pánico', description: 'Rojo y negro, tipografía gigante.' },
  { id: 'urgency-18', category: 'urgency', name: 'Oferta Exclusiva VIP', description: 'Dorado y negro con escasez.' },
  { id: 'urgency-19', category: 'urgency', name: 'Cierre de Temporada', description: 'Colores cálidos, urgencia moderada.' },
  { id: 'urgency-20', category: 'urgency', name: 'Stock Crítico', description: 'Barra de inventario parpadeante.' },
  
  // Trust
  { id: 'trust-1', category: 'trust', name: 'Médico/Clínico', description: 'Azul claro y blanco, máxima pulcritud.' },
  { id: 'trust-2', category: 'trust', name: 'Premium/Lujo', description: 'Negro y plata, sofisticado.' },
  { id: 'trust-3', category: 'trust', name: 'Eco/Natural', description: 'Verde y tonos tierra.' },
  { id: 'trust-4', category: 'trust', name: 'Autoridad Institucional', description: 'Azul marino y gris.' },
  { id: 'trust-5', category: 'trust', name: 'Reseñas Verificadas', description: 'Blanco y amarillo oro.' },
  { id: 'trust-6', category: 'trust', name: 'Garantía Blindada', description: 'Verde escudo y blanco.' },
  { id: 'trust-7', category: 'trust', name: 'Transparencia Total', description: 'Minimalista, gris claro.' },
  { id: 'trust-8', category: 'trust', name: 'Sello de Calidad', description: 'Azul cobalto y blanco.' },
  { id: 'trust-9', category: 'trust', name: 'Testimonios en Video', description: 'Oscuro, enfoque multimedia.' },
  { id: 'trust-10', category: 'trust', name: 'Recomendación Experta', description: 'Blanco y azul profesional.' },
  { id: 'trust-11', category: 'trust', name: 'Certificación Oficial', description: 'Tonos esmeralda y sellos.' },
  { id: 'trust-12', category: 'trust', name: 'Prueba Social Masiva', description: 'Contadores de compras en vivo.' },
  { id: 'trust-13', category: 'trust', name: 'Avalado por Expertos', description: 'Citas de profesionales.' },
  { id: 'trust-14', category: 'trust', name: 'Seguridad Bancaria', description: 'Candados y encriptación visual.' },
  { id: 'trust-15', category: 'trust', name: 'Comunidad Activa', description: 'Fotos de clientes reales.' },
  { id: 'trust-16', category: 'trust', name: 'Transparencia de Fábrica', description: 'Proceso de fabricación visible.' },
  { id: 'trust-17', category: 'trust', name: 'Garantía de Devolución', description: 'Promesa de reembolso destacada.' },
  { id: 'trust-18', category: 'trust', name: 'Prensa y Medios', description: 'Logos de revistas y TV.' },
  { id: 'trust-19', category: 'trust', name: 'Auditoría Externa', description: 'Reportes de calidad visibles.' },
  { id: 'trust-20', category: 'trust', name: 'Soporte 24/7', description: 'Chat en vivo y atención humana.' },
  
  // Bundle
  { id: 'bundle-1', category: 'bundle', name: 'BOGO Clásico', description: 'Verde esmeralda, enfoque en ahorro.' },
  { id: 'bundle-2', category: 'bundle', name: 'Escalera de Valor', description: 'Azul y verde.' },
  { id: 'bundle-3', category: 'bundle', name: 'Kit Completo', description: 'Naranja y blanco.' },
  { id: 'bundle-4', category: 'bundle', name: 'Suscripción Simulada', description: 'Morado y blanco.' },
  { id: 'bundle-5', category: 'bundle', name: 'Regalo Sorpresa', description: 'Magenta y amarillo.' },
  { id: 'bundle-6', category: 'bundle', name: 'Mayorista Directo', description: 'Gris industrial y verde.' },
  { id: 'bundle-7', category: 'bundle', name: 'Pack Familiar', description: 'Azul cielo y blanco.' },
  { id: 'bundle-8', category: 'bundle', name: 'Combo Ahorro', description: 'Rojo y amarillo.' },
  { id: 'bundle-9', category: 'bundle', name: 'Desbloqueo de Niveles', description: 'Negro y verde neón.' },
  { id: 'bundle-10', category: 'bundle', name: 'Oferta Irresistible', description: 'Dorado y negro.' },
  { id: 'bundle-11', category: 'bundle', name: 'Compra por Volumen', description: 'Descuentos escalonados.' },
  { id: 'bundle-12', category: 'bundle', name: 'Caja Misteriosa', description: 'Productos sorpresa añadidos.' },
  { id: 'bundle-13', category: 'bundle', name: 'Arma tu Pack', description: 'Selección personalizada.' },
  { id: 'bundle-14', category: 'bundle', name: 'Complementos Perfectos', description: 'Cross-selling agresivo.' },
  { id: 'bundle-15', category: 'bundle', name: 'Suscripción Mensual', description: 'Ahorro recurrente.' },
  { id: 'bundle-16', category: 'bundle', name: 'Pack de Regalo', description: 'Envoltorio premium incluido.' },
  { id: 'bundle-17', category: 'bundle', name: 'Edición Limitada', description: 'Bundle exclusivo temporal.' },
  { id: 'bundle-18', category: 'bundle', name: 'Starter Kit', description: 'Todo lo necesario para empezar.' },
  { id: 'bundle-19', category: 'bundle', name: 'Upgrade Automático', description: 'Mejora por poco dinero.' },
  { id: 'bundle-20', category: 'bundle', name: 'Liquidación de Lote', description: 'Llevate todo el stock.' },
  
  // Story
  { id: 'story-1', category: 'story', name: 'El Viaje del Héroe', description: 'Editorial, tipografía serif.' },
  { id: 'story-2', category: 'story', name: 'Antes y Después', description: 'Contraste alto, visual.' },
  { id: 'story-3', category: 'story', name: 'Carta del Fundador', description: 'Minimalista, firma personal.' },
  { id: 'story-4', category: 'story', name: 'El Secreto Revelado', description: 'Oscuro y misterioso.' },
  { id: 'story-5', category: 'story', name: 'Cambio de Vida', description: 'Luminoso e inspirador.' },
  { id: 'story-6', category: 'story', name: 'Detrás de Escena', description: 'Crudo y auténtico.' },
  { id: 'story-7', category: 'story', name: 'La Ciencia Lo Respalda', description: 'Tech y limpio.' },
  { id: 'story-8', category: 'story', name: 'Manifiesto de Marca', description: 'Tipografía gigante.' },
  { id: 'story-9', category: 'story', name: 'Conexión Íntima', description: 'Tonos pastel y suaves.' },
  { id: 'story-10', category: 'story', name: 'Rompiendo Mitos', description: 'Audaz y desafiante.' },
  { id: 'story-11', category: 'story', name: 'Entrevista Exclusiva', description: 'Formato Q&A.' },
  { id: 'story-12', category: 'story', name: 'Diario de Desarrollo', description: 'El proceso de creación.' },
  { id: 'story-13', category: 'story', name: 'Caso de Éxito', description: 'Historia de un cliente real.' },
  { id: 'story-14', category: 'story', name: 'El Problema Oculto', description: 'Agitación del dolor.' },
  { id: 'story-15', category: 'story', name: 'Visión del Futuro', description: 'Cómo cambiará tu vida.' },
  { id: 'story-16', category: 'story', name: 'Tradición Familiar', description: 'Herencia y artesanía.' },
  { id: 'story-17', category: 'story', name: 'Revolución en la Industria', description: 'Cambiando las reglas.' },
  { id: 'story-18', category: 'story', name: 'El Ingrediente Mágico', description: 'Enfoque en un componente.' },
  { id: 'story-19', category: 'story', name: 'Superando la Adversidad', description: 'Historia de resiliencia.' },
  { id: 'story-20', category: 'story', name: 'Manifiesto Rebelde', description: 'Contra el status quo.' },
  
  // Direct
  { id: 'direct-1', category: 'direct', name: 'Fricción Cero', description: 'Blanco absoluto, botón gigante.' },
  { id: 'direct-2', category: 'direct', name: 'Checkout Integrado', description: 'Gris claro, formulario destacado.' },
  { id: 'direct-3', category: 'direct', name: 'Compra en 1 Clic', description: 'Verde conversión.' },
  { id: 'direct-4', category: 'direct', name: 'Minimalismo Extremo', description: 'Blanco y negro puro.' },
  { id: 'direct-5', category: 'direct', name: 'Enfocado en Móvil', description: 'Diseño estilo App.' },
  { id: 'direct-6', category: 'direct', name: 'Acción Inmediata', description: 'Rojo urgencia, muy limpio.' },
  { id: 'direct-7', category: 'direct', name: 'Sin Distracciones', description: 'Oculta elementos innecesarios.' },
  { id: 'direct-8', category: 'direct', name: 'Bala de Plata', description: 'Un solo argumento fuerte.' },
  { id: 'direct-9', category: 'direct', name: 'Formulario Adhesivo', description: 'Split screen en desktop.' },
  { id: 'direct-10', category: 'direct', name: 'Compra Rápida', description: 'Estilo terminal/tech.' },
  { id: 'direct-11', category: 'direct', name: 'Checkout Flotante', description: 'Siempre visible al hacer scroll.' },
  { id: 'direct-12', category: 'direct', name: 'Pasos Simplificados', description: 'Proceso guiado y claro.' },
  { id: 'direct-13', category: 'direct', name: 'Botón de Pánico', description: 'Llamado a la acción gigante.' },
  { id: 'direct-14', category: 'direct', name: 'Diseño de Recibo', description: 'Estilo ticket de compra.' },
  { id: 'direct-15', category: 'direct', name: 'Solo Formulario', description: 'El producto es secundario.' },
  { id: 'direct-16', category: 'direct', name: 'Compra Express', description: 'Sin carrito, directo al pago.' },
  { id: 'direct-17', category: 'direct', name: 'Diseño de Cajero', description: 'Estilo punto de venta.' },
  { id: 'direct-18', category: 'direct', name: 'Foco en el Precio', description: 'El valor es lo más importante.' },
  { id: 'direct-19', category: 'direct', name: 'Checkout a Pantalla Completa', description: 'Inmersión total.' },
  { id: 'direct-20', category: 'direct', name: 'Compra por Chat', description: 'Estilo conversacional.' },
  
  // Health
  { id: 'health-1', category: 'health', name: 'Clínica Pura', description: 'Blanco y azul médico, máxima confianza.' },
  { id: 'health-2', category: 'health', name: 'Naturaleza Orgánica', description: 'Tonos verdes y tierra, estilo herbolario.' },
  { id: 'health-3', category: 'health', name: 'Laboratorio Tech', description: 'Gris y cian, enfoque científico.' },
  { id: 'health-4', category: 'health', name: 'Bienestar Holístico', description: 'Colores pastel, diseño relajante.' },
  { id: 'health-5', category: 'health', name: 'Rendimiento Deportivo', description: 'Rojo y negro, energía y vitalidad.' },
  { id: 'health-6', category: 'health', name: 'Cuidado Premium', description: 'Dorado y blanco, salud de lujo.' },
  { id: 'health-7', category: 'health', name: 'Alivio Inmediato', description: 'Azul profundo, sensación de calma.' },
  { id: 'health-8', category: 'health', name: 'Fórmula Transparente', description: 'Minimalista, foco en ingredientes.' },
  { id: 'health-9', category: 'health', name: 'Vitalidad Diaria', description: 'Naranja y amarillo, vibrante.' },
  { id: 'health-10', category: 'health', name: 'Respaldo Médico', description: 'Diseño institucional, sellos de autoridad.' },
  
  // Electronics
  { id: 'electronics-1', category: 'electronics', name: 'Modo Oscuro Tech', description: 'Fondo negro, acentos neón azul.' },
  { id: 'electronics-2', category: 'electronics', name: 'Minimalismo Tech', description: 'Blanco absoluto, tipografía fina.' },
  { id: 'electronics-3', category: 'electronics', name: 'Gamer RGB', description: 'Oscuro con acentos magenta y verde.' },
  { id: 'electronics-4', category: 'electronics', name: 'Cyberpunk', description: 'Amarillo y negro, estilo futurista.' },
  { id: 'electronics-5', category: 'electronics', name: 'Especificaciones Pro', description: 'Gris espacial, tablas de datos.' },
  { id: 'electronics-6', category: 'electronics', name: 'Lanzamiento Exclusivo', description: 'Oscuro con destellos plateados.' },
  { id: 'electronics-7', category: 'electronics', name: 'Smart Home', description: 'Limpio, azul claro y blanco.' },
  { id: 'electronics-8', category: 'electronics', name: 'Audio Hi-Fi', description: 'Tonos cálidos oscuros, elegante.' },
  { id: 'electronics-9', category: 'electronics', name: 'Gadget Viral', description: 'Alto contraste, rojo y blanco.' },
  { id: 'electronics-10', category: 'electronics', name: 'Innovación Pura', description: 'Degradados morados y azules.' },
  
  // Tools
  { id: 'tools-1', category: 'tools', name: 'Constructor Pro', description: 'Amarillo y negro, estilo Caterpillar.' },
  { id: 'tools-2', category: 'tools', name: 'Taller Industrial', description: 'Gris metálico y naranja.' },
  { id: 'tools-3', category: 'tools', name: 'Fuerza Bruta', description: 'Rojo oscuro y negro, muy robusto.' },
  { id: 'tools-4', category: 'tools', name: 'Precisión Alemana', description: 'Verde oscuro y blanco.' },
  { id: 'tools-5', category: 'tools', name: 'Bricolaje Casero', description: 'Azul y amarillo, amigable.' },
  { id: 'tools-6', category: 'tools', name: 'Alta Resistencia', description: 'Texturas de carbono y acero.' },
  { id: 'tools-7', category: 'tools', name: 'Kit Completo', description: 'Enfoque en múltiples piezas.' },
  { id: 'tools-8', category: 'tools', name: 'Garantía de por Vida', description: 'Sellos gigantes, máxima confianza.' },
  { id: 'tools-9', category: 'tools', name: 'Trabajo Pesado', description: 'Negro absoluto con acentos amarillos.' },
  { id: 'tools-10', category: 'tools', name: 'Innovación Táctica', description: 'Diseño militar, verde oliva.' },
  
  // Beauty
  { id: 'beauty-1', category: 'beauty', name: 'Elegancia Pura', description: 'Tonos nude y tipografía serif.' },
  { id: 'beauty-2', category: 'beauty', name: 'Glow Up', description: 'Rosa pastel y acentos dorados.' },
  { id: 'beauty-3', category: 'beauty', name: 'Dermatología', description: 'Blanco clínico y azul suave.' },
  { id: 'beauty-4', category: 'beauty', name: 'Lujo Nocturno', description: 'Negro y oro rosa.' },
  { id: 'beauty-5', category: 'beauty', name: 'Fresco y Natural', description: 'Verde menta y blanco.' },
  { id: 'beauty-6', category: 'beauty', name: 'Juventud Vibrante', description: 'Lila y coral.' },
  { id: 'beauty-7', category: 'beauty', name: 'Minimalismo Coreano', description: 'Ultra limpio, mucho espacio en blanco.' },
  { id: 'beauty-8', category: 'beauty', name: 'Resultados Visibles', description: 'Enfoque en fotos antes/después.' },
  { id: 'beauty-9', category: 'beauty', name: 'Aroma y Textura', description: 'Diseño sensorial, colores cálidos.' },
  { id: 'beauty-10', category: 'beauty', name: 'Secreto de Belleza', description: 'Tonos burdeos y tipografía cursiva.' },
  
  // Home
  { id: 'home-1', category: 'home', name: 'Hogar Cálido', description: 'Tonos terracota y beige.' },
  { id: 'home-2', category: 'home', name: 'Minimalismo Nórdico', description: 'Blanco, gris claro y madera.' },
  { id: 'home-3', category: 'home', name: 'Lujo Moderno', description: 'Negro, mármol y acentos dorados.' },
  { id: 'home-4', category: 'home', name: 'Oasis Verde', description: 'Verde salvia y texturas naturales.' },
  { id: 'home-5', category: 'home', name: 'Confort Total', description: 'Colores suaves, diseño acogedor.' },
  { id: 'home-6', category: 'home', name: 'Estilo Industrial', description: 'Ladrillo, metal y tonos oscuros.' },
  { id: 'home-7', category: 'home', name: 'Espacios Inteligentes', description: 'Limpio, azul tech y blanco.' },
  { id: 'home-8', category: 'home', name: 'Vida Familiar', description: 'Colorido, alegre y resistente.' },
  { id: 'home-9', category: 'home', name: 'Descanso Perfecto', description: 'Tonos lavanda y azul noche.' },
  { id: 'home-10', category: 'home', name: 'Elegancia Clásica', description: 'Azul marino y blanco roto.' },
];

async function seed() {
  console.log('Vacía e inicializa tablas en progreso...');

  // Delete all existing to avoid duplicate IDs
  await supabase.from('Tiendas_Reutilizables').delete().neq('id', 'dummy');
  await supabase.from('Paginas_de_Productos_Reutilizables').delete().neq('id', 'dummy');

  console.log('Insertando tiendas reutilizables...');
  const { error: err1 } = await supabase.from('Tiendas_Reutilizables').insert(storeTemplates);
  if (err1) {
    console.error('Error insertando tiendas:', err1.message);
  } else {
    console.log(`Insertadas ${storeTemplates.length} tiendas exitosamente.`);
  }

  console.log('Insertando plantillas PDP...');
  const { error: err2 } = await supabase.from('Paginas_de_Productos_Reutilizables').insert(pdpTemplatesList);
  if (err2) {
    console.error('Error insertando pdps:', err2.message);
  } else {
    console.log(`Insertados ${pdpTemplatesList.length} pdps exitosamente.`);
  }

  console.log('Seed completado.');
}

seed();
