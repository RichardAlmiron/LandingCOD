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

/** Plantilla PDP */
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
  'standard-salud':            'PdpSaludEstandar',
  'standard-herramientas':     'PdpHerramientasEstandar',
  'standard-belleza':          'PdpBellezaEstandar',
  'standard-hogar':            'PdpHogarEstandar',
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
};

// ────────────────────────────────────────────────────────────
// Mapeo inverso: ID legacy → codigo nuevo Standard
/**
 * Resuelve un template ID al código de plantilla.
 */
export function resolverCodigoPlantilla(templateId: string): string {
  // Si ya es un código conocido, retornarlo
  if (MAPA_COMPONENTES_PDP[templateId]) return templateId;
  return templateId;
}
