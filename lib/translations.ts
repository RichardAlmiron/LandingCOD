export type Language = 'es' | 'pt';

interface Translations {
  [key: string]: {
    es: string;
    pt: string;
  };
}

export const translations: Translations = {
  // Footer sections
  'footer.contact': {
    es: 'Contacto',
    pt: 'Contato'
  },
  'footer.helpCenter': {
    es: 'Centro de Ayuda',
    pt: 'Central de Ajuda'
  },
  'footer.reportAbuse': {
    es: 'Reportar Abuso',
    pt: 'Denunciar Abuso'
  },
  'footer.location': {
    es: 'Ubicación',
    pt: 'Localização'
  },
  'footer.socialMedia': {
    es: 'Redes Sociales',
    pt: 'Redes Sociais'
  },
  
  // Common buttons/actions
  'common.buyNow': {
    es: 'Comprar Ahora',
    pt: 'Comprar Agora'
  },
  'common.addToCart': {
    es: 'Agregar al Carrito',
    pt: 'Adicionar ao Carrinho'
  },
  'common.viewProduct': {
    es: 'Ver Producto',
    pt: 'Ver Produto'
  },
  'common.search': {
    es: 'Buscar',
    pt: 'Buscar'
  },
  'common.searchProducts': {
    es: 'Buscar productos, marcas...',
    pt: 'Buscar produtos, marcas...'
  },
  'common.categories': {
    es: 'Categorías',
    pt: 'Categorias'
  },
  'common.offers': {
    es: 'Ofertas',
    pt: 'Ofertas'
  },
  'common.history': {
    es: 'Historial',
    pt: 'Histórico'
  },
  'common.supermarket': {
    es: 'Supermercado',
    pt: 'Supermercado'
  },
  'common.fashion': {
    es: 'Moda',
    pt: 'Moda'
  },
  'common.sell': {
    es: 'Vender',
    pt: 'Vender'
  },
  'common.help': {
    es: 'Ayuda',
    pt: 'Ajuda'
  },
  'common.myAccount': {
    es: 'Mi Cuenta',
    pt: 'Minha Conta'
  },
  'common.myPurchases': {
    es: 'Mis Compras',
    pt: 'Minhas Compras'
  },
  'common.cart': {
    es: 'Carrito',
    pt: 'Carrinho'
  },
  'common.login': {
    es: 'Ingresa',
    pt: 'Entrar'
  },
  'common.createAccount': {
    es: 'Crea tu cuenta',
    pt: 'Crie sua conta'
  },
  'common.subscribe': {
    es: 'Suscríbete',
    pt: 'Assine'
  },
  'common.subscribeBenefits': {
    es: 'beneficios exclusivos',
    pt: 'benefícios exclusivos'
  },
  'common.shipping': {
    es: 'Envíos a',
    pt: 'Envios para'
  },
  
  // Product related
  'product.originalPrice': {
    es: 'Precio original',
    pt: 'Preço original'
  },
  'product.discount': {
    es: 'Descuento',
    pt: 'Desconto'
  },
  'product.freeShipping': {
    es: 'Envío gratis',
    pt: 'Frete grátis'
  },
  'product.inStock': {
    es: 'En stock',
    pt: 'Em estoque'
  },
  'product.outOfStock': {
    es: 'Agotado',
    pt: 'Esgotado'
  },
  'product.rating': {
    es: 'Calificación',
    pt: 'Avaliação'
  },
  'product.reviews': {
    es: 'reseñas',
    pt: 'avaliações'
  },
  'product.quantity': {
    es: 'Cantidad',
    pt: 'Quantidade'
  },
  'product.description': {
    es: 'Descripción',
    pt: 'Descrição'
  },
  'product.specifications': {
    es: 'Especificaciones',
    pt: 'Especificações'
  },
  
  // Store related
  'store.welcome': {
    es: 'Bienvenido',
    pt: 'Bem-vindo'
  },
  'store.allProducts': {
    es: 'Todos los productos',
    pt: 'Todos os produtos'
  },
  'store.featured': {
    es: 'Destacados',
    pt: 'Destaques'
  },
  'store.offers': {
    es: 'Ofertas',
    pt: 'Ofertas'
  },
  'store.newArrivals': {
    es: 'Novedades',
    pt: 'Novidades'
  },
  'store.bestSellers': {
    es: 'Más vendidos',
    pt: 'Mais vendidos'
  },
  
  // Footer legal
  'footer.privacyPolicy': {
    es: 'Política de Privacidad',
    pt: 'Política de Privacidade'
  },
  'footer.termsOfUse': {
    es: 'Términos de Uso',
    pt: 'Termos de Uso'
  },
  'footer.cookiePolicy': {
    es: 'Política de Cookies',
    pt: 'Política de Cookies'
  },
  'footer.allRightsReserved': {
    es: 'Todos los derechos reservados',
    pt: 'Todos os direitos reservados'
  },
  
  // Trust badges
  'trust.securePayment': {
    es: 'Pago Seguro',
    pt: 'Pagamento Seguro'
  },
  'trust.cashOnDelivery': {
    es: 'Pago Contra Entrega',
    pt: 'Pagamento na Entrega'
  },
  'trust.fastShipping': {
    es: 'Envío Rápido',
    pt: 'Envio Rápido'
  },
  'trust.moneyBack': {
    es: 'Garantía de Devolución',
    pt: 'Garantia de Devolução'
  },
  
  // Scarcity/Urgency
  'urgency.limitedStock': {
    es: 'Stock limitado',
    pt: 'Estoque limitado'
  },
  'urgency.onlyLeft': {
    es: '¡Solo quedan',
    pt: 'Apenas'
  },
  'urgency.units': {
    es: 'unidades!',
    pt: 'unidades restantes!'
  },
  'urgency.offerEndsIn': {
    es: 'La oferta termina en:',
    pt: 'A oferta termina em:'
  },
  'urgency.peopleViewing': {
    es: 'personas viendo esto ahora',
    pt: 'pessoas vendo isso agora'
  },
  'urgency.recentPurchase': {
    es: 'Alguien compró esto recientemente',
    pt: 'Alguém comprou isso recentemente'
  },
  
  // BuilderFlow specific
  'builder.step': {
    es: 'Paso',
    pt: 'Passo'
  },
  'builder.of': {
    es: 'de',
    pt: 'de'
  },
  'builder.welcome': {
    es: 'Bienvenido al Builder',
    pt: 'Bem-vindo ao Builder'
  },
  'builder.welcomeDesc': {
    es: '¿Qué deseas crear hoy?',
    pt: 'O que deseja criar hoje?'
  },
  'builder.createStore': {
    es: 'Crear Tienda',
    pt: 'Criar Loja'
  },
  'builder.createStoreDesc': {
    es: 'Catálogo completo con múltiples productos',
    pt: 'Catálogo completo com múltiplos produtos'
  },
  'builder.createProduct': {
    es: 'Producto Individual',
    pt: 'Produto Individual'
  },
  'builder.createProductDesc': {
    es: 'Página de detalle para un solo producto',
    pt: 'Página de detalhe para um único produto'
  },
  'builder.selectTemplate': {
    es: 'Selecciona tu template',
    pt: 'Selecione seu template'
  },
  'builder.selectTemplateDesc': {
    es: 'Elige cómo quieres mostrar tus productos',
    pt: 'Escolha como deseja mostrar seus produtos'
  },
  'builder.premium': {
    es: 'Premium',
    pt: 'Premium'
  },
  'builder.standard': {
    es: 'Standard',
    pt: 'Padrão'
  },
  'builder.filmstrip': {
    es: 'Tira de película',
    pt: 'Tira de filme'
  },
  'builder.filmstripDesc': {
    es: 'Efecto cine con múltiples vistas',
    pt: 'Efeito cinema com múltiplas vistas'
  },
  'builder.coverflow': {
    es: 'Cover Flow',
    pt: 'Cover Flow'
  },
  'builder.coverflowDesc': {
    es: 'Efecto 3D tipo iTunes',
    pt: 'Efeito 3D tipo iTunes'
  },
  'builder.selectProducts': {
    es: 'Selecciona tus productos',
    pt: 'Selecione seus produtos'
  },
  'builder.selectProductsDesc': {
    es: 'Elige los productos para tu tienda',
    pt: 'Escolha os produtos para sua loja'
  },
  'builder.searchProducts': {
    es: 'Buscar productos...',
    pt: 'Buscar produtos...'
  },
  'builder.noProducts': {
    es: 'No se encontraron productos',
    pt: 'Nenhum produto encontrado'
  },
  'builder.productsSelected': {
    es: 'productos seleccionados',
    pt: 'produtos selecionados'
  },
  'builder.continueWith': {
    es: 'Continuar con',
    pt: 'Continuar com'
  },
  'builder.product': {
    es: 'producto',
    pt: 'produto'
  },
  'builder.configure': {
    es: 'Configura y Publica',
    pt: 'Configure e Publique'
  },
  'builder.configureDesc': {
    es: 'Personaliza los detalles de tu tienda',
    pt: 'Personalize os detalhes da sua loja'
  },
  'builder.storeName': {
    es: 'Nombre de la tienda',
    pt: 'Nome da loja'
  },
  'builder.storeDesc': {
    es: 'Descripción de la tienda',
    pt: 'Descrição da loja'
  },
  'builder.logoText': {
    es: 'Texto del Logo',
    pt: 'Texto do Logo'
  },
  'builder.bannerUrl': {
    es: 'URL del Banner',
    pt: 'URL do Banner'
  },
  'builder.language': {
    es: 'Idioma de la Tienda',
    pt: 'Idioma da Loja'
  },
  'builder.spanish': {
    es: 'Español',
    pt: 'Espanhol'
  },
  'builder.portuguese': {
    es: 'Português',
    pt: 'Português'
  },
  'builder.contact': {
    es: 'Contacto',
    pt: 'Contato'
  },
  'builder.contactEnabled': {
    es: 'Activado',
    pt: 'Ativado'
  },
  'builder.contactDisabled': {
    es: 'Desactivado',
    pt: 'Desativado'
  },
  'builder.email': {
    es: 'Email',
    pt: 'Email'
  },
  'builder.phone': {
    es: 'Teléfono',
    pt: 'Telefone'
  },
  'builder.countryCode': {
    es: 'País',
    pt: 'País'
  },
  'builder.save': {
    es: 'Guardar',
    pt: 'Salvar'
  },
  'builder.socialMedia': {
    es: 'Redes Sociales',
    pt: 'Redes Sociais'
  },
  'builder.facebook': {
    es: 'Facebook URL',
    pt: 'URL do Facebook'
  },
  'builder.instagram': {
    es: 'Instagram URL',
    pt: 'URL do Instagram'
  },
  'builder.twitter': {
    es: 'Twitter URL',
    pt: 'URL do Twitter'
  },
  'builder.whatsapp': {
    es: 'WhatsApp (con código de país)',
    pt: 'WhatsApp (com código do país)'
  },
  'builder.croTools': {
    es: 'Herramientas CRO',
    pt: 'Ferramentas CRO'
  },
  'builder.liveViewers': {
    es: 'Espectadores en vivo',
    pt: 'Espectadores ao vivo'
  },
  'builder.recentSales': {
    es: 'Notificaciones de ventas',
    pt: 'Notificações de vendas'
  },
  'builder.scarcityTimer': {
    es: 'Temporizador de escasez',
    pt: 'Timer de escassez'
  },
  'builder.stickyButton': {
    es: 'Botón flotante de compra',
    pt: 'Botão flutuante de compra'
  },
  'builder.back': {
    es: 'Atrás',
    pt: 'Voltar'
  },
  'builder.publishStore': {
    es: 'Publicar Tienda',
    pt: 'Publicar Loja'
  },
  'builder.publishTitle': {
    es: 'Publicar Tienda',
    pt: 'Publicar Loja'
  },
  'builder.publishDesc': {
    es: 'Personaliza el enlace de tu nueva landing page.',
    pt: 'Personalize o link da sua nova landing page.'
  },
  'builder.storeUrl': {
    es: 'URL de la tienda',
    pt: 'URL da loja'
  },
  'builder.urlHint': {
    es: 'Solo usa letras, números y guiones. Ejemplo: tienda-oficial',
    pt: 'Use apenas letras, números e hífens. Exemplo: loja-oficial'
  },
  'builder.publishSuccess': {
    es: '¡Tienda publicada con éxito!',
    pt: 'Loja publicada com sucesso!'
  },
  'builder.generatingUrl': {
    es: 'Generar URL y Publicar',
    pt: 'Gerar URL e Publicar'
  },
  'builder.publishing': {
    es: 'Publicando...',
    pt: 'Publicando...'
  },
  
  // Store Templates
  'templates.megamarket': {
    es: 'MegaMarket',
    pt: 'MegaMarket'
  },
  'templates.megamarketDesc': {
    es: 'El template más completo para grandes catálogos',
    pt: 'O template mais completo para grandes catálogos'
  },
  'templates.flashdeals': {
    es: 'Flash Deals',
    pt: 'Ofertas Relâmpago'
  },
  'templates.flashdealsDesc': {
    es: 'Diseño urgency-driven para conversiones rápidas',
    pt: 'Design urgency-driven para conversões rápidas'
  },
  'templates.tradevault': {
    es: 'Trade Vault',
    pt: 'Trade Vault'
  },
  'templates.tradevaultDesc': {
    es: 'Elegancia profesional para B2B',
    pt: 'Elegância profissional para B2B'
  },
  'templates.mercadocod': {
    es: 'Mercado COD',
    pt: 'Mercado COD'
  },
  'templates.mercadocodDesc': {
    es: 'Estilo marketplace latinoamericano',
    pt: 'Estilo marketplace latino-americano'
  },
  'templates.trendfast': {
    es: 'Trend Fast',
    pt: 'Trend Fast'
  },
  'templates.trendfastDesc': {
    es: 'Para productos virales y tendencias',
    pt: 'Para produtos virais e tendências'
  },
  'templates.minimaltech': {
    es: 'Minimal Tech',
    pt: 'Minimal Tech'
  },
  'templates.minimaltechDesc': {
    es: 'Limpio y moderno para tecnología',
    pt: 'Limpo e moderno para tecnologia'
  },
  'templates.handcraft': {
    es: 'Hand Craft',
    pt: 'Hand Craft'
  },
  'templates.handcraftDesc': {
    es: 'Perfecto para artesanías únicas',
    pt: 'Perfeito para artesanatos únicos'
  },
  'templates.boldathlete': {
    es: 'Bold Athlete',
    pt: 'Bold Athlete'
  },
  'templates.boldathleteDesc': {
    es: 'Energía deportiva de alto impacto',
    pt: 'Energia esportiva de alto impacto'
  },
  'templates.blueretail': {
    es: 'Blue Retail',
    pt: 'Blue Retail'
  },
  'templates.blueretailDesc': {
    es: 'Diseño corporativo confiable',
    pt: 'Design corporativo confiável'
  },
  'templates.deleteAll': {
    es: 'Eliminar Todos',
    pt: 'Eliminar Todos'
  },
  'templates.deleteAllConfirm': {
    es: '¿Estás seguro de eliminar todas las configuraciones?',
    pt: 'Tem certeza que deseja eliminar todas as configurações?'
  },
  'templates.deleteSingle': {
    es: 'Eliminar Configuración',
    pt: 'Eliminar Configuração'
  },
  'templates.noConfigs': {
    es: 'No hay configuraciones guardadas',
    pt: 'Não há configurações salvas'
  },
  'templates.lastAccessed': {
    es: 'Último acceso',
    pt: 'Último acesso'
  }
};

export function t(key: string, lang: Language): string {
  const translation = translations[key];
  if (!translation) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  return translation[lang] || translation['es'] || key;
}

// Hook para usar traducciones
export function useTranslations(lang: Language) {
  return {
    t: (key: string) => t(key, lang),
    lang
  };
}

// Lista de países con códigos telefónicos
export interface CountryCode {
  code: string;
  country: string;
  flag: string;
}

export const countryCodes: CountryCode[] = [
  { code: '+52', country: 'México', flag: '🇲🇽' },
  { code: '+55', country: 'Brasil', flag: '🇧🇷' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷' },
  { code: '+56', country: 'Chile', flag: '🇨🇱' },
  { code: '+57', country: 'Colombia', flag: '🇨🇴' },
  { code: '+51', country: 'Perú', flag: '🇵🇪' },
  { code: '+593', country: 'Ecuador', flag: '🇪🇨' },
  { code: '+58', country: 'Venezuela', flag: '🇻🇪' },
  { code: '+591', country: 'Bolivia', flag: '🇧🇴' },
  { code: '+595', country: 'Paraguay', flag: '🇵🇾' },
  { code: '+598', country: 'Uruguay', flag: '🇺🇾' },
  { code: '+502', country: 'Guatemala', flag: '🇬🇹' },
  { code: '+503', country: 'El Salvador', flag: '🇸🇻' },
  { code: '+504', country: 'Honduras', flag: '🇭🇳' },
  { code: '+505', country: 'Nicaragua', flag: '🇳🇮' },
  { code: '+506', country: 'Costa Rica', flag: '🇨🇷' },
  { code: '+507', country: 'Panamá', flag: '🇵🇦' },
  { code: '+34', country: 'España', flag: '🇪🇸' },
  { code: '+1', country: 'Estados Unidos', flag: '🇺🇸' },
  { code: '+351', country: 'Portugal', flag: '🇵🇹' },
];
