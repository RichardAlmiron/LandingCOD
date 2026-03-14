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
