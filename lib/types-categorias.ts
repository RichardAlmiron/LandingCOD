// ============================================================
// TIPOS: Sistema de Categorías PDP — Landing Code Studio
// ============================================================

/** Categoría principal (nicho) */
export interface CategoriaPDP {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  color: string;
  orden: number;
  activa: boolean;
  created_at: string;
  updated_at: string;
}

/** Plantilla PDP con nomenclatura Standard */
export interface PlantillaPDP {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  componente: string;
  categoria_id: string | null;
  imagen_url: string | null;
  premium: boolean;
  verificada: boolean;
  variante: number;
  orden: number;
  activa: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

/** Plantilla con datos de categoría expandidos (para UI) */
export interface PlantillaConCategoria extends PlantillaPDP {
  categoria_nombre?: string;
  categoria_color?: string;
}

// ────────────────────────────────────────────────────────────
// Mapeo: codigo de plantilla → componente React
// ────────────────────────────────────────────────────────────
export const MAPA_COMPONENTES_PDP: Record<string, string> = {
  'standard-urgencia':         'PdpUrgenciaMaxima',
  'standard-prueba-social':    'PdpPruebaSocial',
  'standard-bundle':           'PdpOfertaBundle',
  'standard-historia':         'PdpHistoriaProducto',
  'standard-checkout-directo': 'PdpCheckoutDirecto',
  'standard-salud':            'PdpSaludEstandar',
  'standard-electronico':      'PdpElectronicoEstandar',
  'standard-herramientas':     'PdpHerramientasEstandar',
  'standard-belleza':          'PdpBellezaEstandar',
  'standard-hogar':            'PdpHogarEstandar',
  'premium-urgencia':          'PdpUrgenciaPremium',
  'premium-bundle':            'PdpOfertaBundlePremium',
  'premium-electronico':       'PdpElectronicoPremium',
  'premium-salud':             'PdpSaludPremium',
  'standard-celulares':        'PdpCelulares',
  'PDP-CEL-MINIMAL':           'PdpCelularesMinimal',
  'PDP-CEL-LUXURY':            'PdpCelularesLuxury',
  'PDP-CEL-GAMER':             'PdpCelularesGamer',
  'PDP-CEL-ECO':               'PdpCelularesEco',
  'PDP-CEL-CREATOR':           'PdpCelularesCreator',
  'PDP-CEL-BUSINESS':          'PdpCelularesBusiness',
  'PDP-CEL-OUTDOOR':           'PdpCelularesOutdoor',
  'PDP-CEL-GLASS':             'PdpCelularesGlass',
  'PDP-CEL-PRESTIGE':          'PdpCelularesPrestige',
  'PDP-CEL-MECHA':             'PdpCelularesMecha',
  'PDP-CEL-SCIFI':             'PdpCelularesSciFi',
  'PDP-CEL-NORDIC':            'PdpCelularesNordic',
  'PDP-CEL-TERMINAL':          'PdpCelularesTerminal',
  'PDP-CEL-VINTAGE':           'PdpCelularesVintage',
  'PDP-CEL-STREETWEAR':        'PdpCelularesStreetwear',

  // Plantillas CRO (Conversion Rate Optimization)
  'pdp-cro-bold':        'PdpCroBold',
  'pdp-cro-elegant':     'PdpCroElegant',
  'pdp-cro-futurista':   'PdpCroFuturista',
  'pdp-cro-minimal':     'PdpCroMinimal',
  'pdp-cro-visual':      'PdpCroVisual',
};

// ────────────────────────────────────────────────────────────
// Mapeo inverso: ID legacy → codigo nuevo Standard
// Para migración y compatibilidad con datos existentes en DB
// ────────────────────────────────────────────────────────────
export const MAPA_LEGACY_A_STANDARD: Record<string, string> = {
  // Urgencia
  'urgency-1': 'standard-urgencia',
  'urgency-2': 'standard-urgencia',
  'urgency-3': 'standard-urgencia',
  // Prueba Social
  'trust-1': 'standard-prueba-social',
  'trust-2': 'standard-prueba-social',
  'trust-3': 'standard-prueba-social',
  // Bundle
  'bundle-1': 'standard-bundle',
  'bundle-2': 'standard-bundle',
  'bundle-3': 'standard-bundle',
  // Historia
  'story-1': 'standard-historia',
  'story-2': 'standard-historia',
  'story-3': 'standard-historia',
  // Checkout Directo
  'direct-1': 'standard-checkout-directo',
  'direct-2': 'standard-checkout-directo',
  'direct-3': 'standard-checkout-directo',
  // Salud
  'health-1': 'standard-salud',
  'health-2': 'standard-salud',
  'health-3': 'standard-salud',
  // Electrónico
  'electronics-1': 'standard-electronico',
  'electronics-2': 'standard-electronico',
  'electronics-3': 'standard-electronico',
  // Herramientas
  'tools-1': 'standard-herramientas',
  'tools-2': 'standard-herramientas',
  'tools-3': 'standard-herramientas',
  // Belleza
  'beauty-1': 'standard-belleza',
  'beauty-2': 'standard-belleza',
  'beauty-3': 'standard-belleza',
  // Hogar
  'home-1': 'standard-hogar',
  'home-2': 'standard-hogar',
  'home-3': 'standard-hogar',
  // Premium
  'premium-urgency-1': 'premium-urgencia',
  'premium-bundle-1': 'premium-bundle',
  'premium-electronics-1': 'premium-electronico',
  'premium-health-1': 'premium-salud',
};

/**
 * Resuelve un template ID (legacy o nuevo) al código Standard.
 * Soporta IDs legacy (urgency-1) y nuevos (standard-urgencia).
 */
export function resolverCodigoPlantilla(templateId: string): string {
  // Si ya es un código Standard, retornarlo
  if (MAPA_COMPONENTES_PDP[templateId]) return templateId;
  // Si es un ID legacy, convertirlo
  if (MAPA_LEGACY_A_STANDARD[templateId]) return MAPA_LEGACY_A_STANDARD[templateId];
  // Fallback
  return 'standard-urgencia';
}
