/**
 * PLANTILLA REGISTRY - UNICA FUENTE DE VERDAD
 * 
 * Este archivo es el ÚNICO lugar donde se registran las plantillas PDP.
 * Todo el sistema lee de aquí: identidad, mapeo a componente, nicho.
 * 
 * FLUJO SIMPLIFICADO:
 * 1. Crear componente en components/pdp/[categoria]/
 * 2. Registrar aquí en PLANTILLAS_REGISTRY
 * 3. Insertar en Supabase (se hace automáticamente o manual)
 * 4. Aparece en admin como "pendiente"
 * 5. Al verificar → disponible para clientes
 */

import PdpSaludEstandar from '@/components/pdp/salud/general/PdpSaludEstandar';
import PdpHerramientasEstandar from '@/components/pdp/herramientas/general/PdpHerramientasEstandar';
import PdpBellezaEstandar from '@/components/pdp/belleza/general/PdpBellezaEstandar';
import PdpHogarEstandar from '@/components/pdp/hogar/general/PdpHogarEstandar';
import PdpSaludPremium from '@/components/pdp/salud/general/PdpSaludPremium';
import PdpCelulares from '@/components/pdp/electrónico/celulares/PdpCelulares';
import PdpCelularesMinimal from '@/components/pdp/electrónico/celulares/PdpCelularesMinimal';
import PdpCelularesLuxury from '@/components/pdp/electrónico/celulares/PdpCelularesLuxury';
import PdpCelularesGamer from '@/components/pdp/electrónico/celulares/PdpCelularesGamer';
import PdpCelularesEco from '@/components/pdp/electrónico/celulares/PdpCelularesEco';
import PdpCelularesCreator from '@/components/pdp/electrónico/celulares/PdpCelularesCreator';
import PdpCelularesBusiness from '@/components/pdp/electrónico/celulares/PdpCelularesBusiness';
import PdpCelularesOutdoor from '@/components/pdp/electrónico/celulares/PdpCelularesOutdoor';
import PdpCelularesGlass from '@/components/pdp/electrónico/celulares/PdpCelularesGlass';
import PdpCelularesPrestige from '@/components/pdp/electrónico/celulares/PdpCelularesPrestige';
import PdpCelularesMecha from '@/components/pdp/electrónico/celulares/PdpCelularesMecha';
import PdpCelularesSciFi from '@/components/pdp/electrónico/celulares/PdpCelularesSciFi';
import PdpCelularesNordic from '@/components/pdp/electrónico/celulares/PdpCelularesNordic';
import PdpCelularesTerminal from '@/components/pdp/electrónico/celulares/PdpCelularesTerminal';
import PdpCelularesVintage from '@/components/pdp/electrónico/celulares/PdpCelularesVintage';
import PdpCelularesStreetwear from '@/components/pdp/electrónico/celulares/PdpCelularesStreetwear';
import PdpAudioStudio from '@/components/pdp/electrónico/audio/PdpAudioStudio';
import PdpCameraPro from '@/components/pdp/electrónico/camaras/PdpCameraPro';
import PdpGamingElite from '@/components/pdp/electrónico/gaming/PdpGamingElite';
import PdpTabletExec from '@/components/pdp/electrónico/tablets/PdpTabletExec';
import PdpWatchLumen from '@/components/pdp/electrónico/wearables/PdpWatchLumen';

// -- New 10 Templates (15 Sections / 7 Cifras) --
import PdpDroneAero from '@/components/pdp/electrónico/drones/PdpDroneAero';
import PdpSmartLock from '@/components/pdp/electrónico/smart-home/PdpSmartLock';
import PdpScooterUrban from '@/components/pdp/electrónico/movilidad/PdpScooterUrban';
import PdpVirtualReality from '@/components/pdp/electrónico/vr/PdpVirtualReality';
import PdpMechKeyboard from '@/components/pdp/electrónico/perifericos/PdpMechKeyboard';
import PdpCinemaBeam from '@/components/pdp/electrónico/proyectores/PdpCinemaBeam';
import PdpPodcasterPro from '@/components/pdp/electrónico/audio/PdpPodcasterPro';
import PdpBioRing from '@/components/pdp/electrónico/wearables/PdpBioRing';
import PdpActionCamOld from '@/components/pdp/electrónico/camaras/PdpActionCam';
import PdpPowerStationOld from '@/components/pdp/electrónico/energia/PdpPowerStation';

// -- Tercera Oleada (15 Secciones / 7 Cifras) --
import PdpEreaderZen from '@/components/pdp/electrónico/ereaders/PdpEreaderZen';
import PdpSillaErgo from '@/components/pdp/electrónico/ergonomia/PdpSillaErgo';
import PdpRobotVacuum from '@/components/pdp/electrónico/smart-home/PdpRobotVacuum';
import PdpMonitorUltrawide from '@/components/pdp/electrónico/monitores/PdpMonitorUltrawide';
import PdpCoffeeMaker from '@/components/pdp/electrónico/electrodomesticos/PdpCoffeeMaker';
import PdpPurificadorAire from '@/components/pdp/electrónico/smart-home/PdpPurificadorAire';
import PdpSmartGuitar from '@/components/pdp/electrónico/audio/PdpSmartGuitar';
import PdpMascotaGPS from '@/components/pdp/electrónico/mascotas/PdpMascotaGPS';
import PdpLentesBluetooth from '@/components/pdp/electrónico/wearables/PdpLentesBluetooth';
import PdpHomeHub from '@/components/pdp/electrónico/smart-home/PdpHomeHub';

// -- Cuarta Oleada (20 Plantillas / Fase 4) --
import PdpHologramFan from '@/components/pdp/electrónico/displays/PdpHologramFan';
import PdpSmartTelescope from '@/components/pdp/electrónico/optica/PdpSmartTelescope';
import PdpBoneConduction from '@/components/pdp/electrónico/audio/PdpBoneConduction';
import PdpEbikeKit from '@/components/pdp/electrónico/movilidad/PdpEbikeKit';
import PdpLaserEngraver from '@/components/pdp/electrónico/herramientas/PdpLaserEngraver';
import PdpSmartMirror from '@/components/pdp/electrónico/hogar-smart/PdpSmartMirror';
import PdpPortableEspresso from '@/components/pdp/electrónico/outdoor/PdpPortableEspresso';
import PdpDashCam from '@/components/pdp/electrónico/automotriz/PdpDashCam';
import PdpRetroConsole from '@/components/pdp/electrónico/gaming/PdpRetroConsole';
import PdpTranslatorEarbuds from '@/components/pdp/electrónico/audio/PdpTranslatorEarbuds';
import PdpSmartPlanter from '@/components/pdp/electrónico/hogar-smart/PdpSmartPlanter';
import PdpBiometricSafe from '@/components/pdp/electrónico/seguridad/PdpBiometricSafe';
import PdpGimbalPro from '@/components/pdp/electrónico/fotografía/PdpGimbalPro';
import PdpSmartSkiGoggles from '@/components/pdp/electrónico/outdoor/PdpSmartSkiGoggles';
import PdpTheragun from '@/components/pdp/electrónico/salud-belleza/PdpTheragun';
import PdpStarProjector from '@/components/pdp/electrónico/hogar-smart/PdpStarProjector';
import PdpSmartRingOura from '@/components/pdp/electrónico/wearables/PdpSmartRingOura';
import PdpMiniFridge from '@/components/pdp/electrónico/salud-belleza/PdpMiniFridge';
import PdpKeyFinder from '@/components/pdp/electrónico/seguridad/PdpKeyFinder';
import PdpMechanicalNumeric from '@/components/pdp/electrónico/periféricos/PdpMechanicalNumeric';

// -- Lote Manual Artesanal (5 Plantillas) --
import PdpDronePro from '@/components/pdp/electrónico/drones/PdpDronePro';
import PdpVRStation from '@/components/pdp/electrónico/vr/PdpVRStation';
import PdpPartyAudio from '@/components/pdp/electrónico/audio/PdpPartyAudio';
import PdpGamingLaptop from '@/components/pdp/electrónico/laptops/PdpGamingLaptop';
import PdpSmartVacuum from '@/components/pdp/electrónico/hogar-smart/PdpSmartVacuum';

// -- Lote Segundo Artesanal (5 Plantillas) --
import PdpActionCam from '@/components/pdp/electrónico/camaras-accion/PdpActionCam';
import PdpTitaniumPhone from '@/components/pdp/electrónico/celulares/PdpTitaniumPhone';
import PdpEnduranceWatch from '@/components/pdp/electrónico/wearables/PdpEnduranceWatch';
import PdpNextGenConsole from '@/components/pdp/electrónico/consolas/PdpNextGenConsole';
import PdpPowerStation from '@/components/pdp/electrónico/outdoor/PdpPowerStation';

// -- Lote Tercer Artesanal (5 Plantillas) --
import PdpVintageTurntable from '@/components/pdp/electrónico/audio/PdpVintageTurntable';
import PdpUrbanScooter from '@/components/pdp/electrónico/movilidad/PdpUrbanScooter';
import PdpCinemaOLED from '@/components/pdp/electrónico/displays/PdpCinemaOLED';
import PdpMechKeyboardPro from '@/components/pdp/electrónico/perifericos/PdpMechKeyboardPro';
import PdpNoiseCancellingEar from '@/components/pdp/electrónico/audio/PdpNoiseCancellingEar';

// -- Lote Cuarto Artesanal Final (5 Plantillas) --
import PdpSmartStudioMirror from '@/components/pdp/electrónico/hogar-smart/PdpSmartStudioMirror';
import PdpSmartEspressoMaker from '@/components/pdp/electrónico/electrodomesticos/PdpSmartEspressoMaker';
import PdpCinematicGimbal from '@/components/pdp/electrónico/fotografía/PdpCinematicGimbal';
import PdpRapid3DPrinter from '@/components/pdp/electrónico/herramientas/PdpRapid3DPrinter';
import PdpEInkFolio from '@/components/pdp/electrónico/tablets/PdpEInkFolio';

// ────────────────────────────────────────────────────────────
// REGISTRO ÚNICO: código → { componente, nicho }
// ────────────────────────────────────────────────────────────
const PLANTILLAS_REGISTRY: Record<string, { componente: React.ComponentType<any>; nicho: string }> = {
  // Otros nichos estándar
  'standard-salud':            { componente: PdpSaludEstandar, nicho: 'salud' },
  'standard-belleza':          { componente: PdpBellezaEstandar, nicho: 'belleza' },
  'standard-hogar':            { componente: PdpHogarEstandar, nicho: 'hogar' },
  'standard-herramientas':     { componente: PdpHerramientasEstandar, nicho: 'herramientas' },
  
  // Premium otros nichos
  'premium-salud':             { componente: PdpSaludPremium, nicho: 'salud' },
  
  // Celulares
  'standard-celulares':        { componente: PdpCelulares, nicho: 'celulares' },
  'PDP-CEL-MINIMAL':           { componente: PdpCelularesMinimal, nicho: 'celulares' },
  'PDP-CEL-LUXURY':            { componente: PdpCelularesLuxury, nicho: 'celulares' },
  'PDP-CEL-GAMER':             { componente: PdpCelularesGamer, nicho: 'celulares' },
  'PDP-CEL-ECO':               { componente: PdpCelularesEco, nicho: 'celulares' },
  'PDP-CEL-CREATOR':           { componente: PdpCelularesCreator, nicho: 'celulares' },
  'PDP-CEL-BUSINESS':          { componente: PdpCelularesBusiness, nicho: 'celulares' },
  'PDP-CEL-OUTDOOR':           { componente: PdpCelularesOutdoor, nicho: 'celulares' },
  'PDP-CEL-GLASS':             { componente: PdpCelularesGlass, nicho: 'celulares' },
  'PDP-CEL-PRESTIGE':          { componente: PdpCelularesPrestige, nicho: 'celulares' },
  'PDP-CEL-MECHA':             { componente: PdpCelularesMecha, nicho: 'celulares' },
  'PDP-CEL-SCIFI':             { componente: PdpCelularesSciFi, nicho: 'celulares' },
  'PDP-CEL-NORDIC':            { componente: PdpCelularesNordic, nicho: 'celulares' },
  'PDP-CEL-TERMINAL':          { componente: PdpCelularesTerminal, nicho: 'celulares' },
  'PDP-CEL-VINTAGE':           { componente: PdpCelularesVintage, nicho: 'celulares' },
  'PDP-CEL-STREETWEAR':        { componente: PdpCelularesStreetwear, nicho: 'celulares' },

  // Subcategorías Electrónica — Premium PDP
  'PDP-AUDIO-STUDIO':    { componente: PdpAudioStudio, nicho: 'electronico' },
  'PDP-CAMERA-PRO':      { componente: PdpCameraPro, nicho: 'electronico' },
  'PDP-GAMING-ELITE':    { componente: PdpGamingElite, nicho: 'electronico' },
  'PDP-TABLET-EXEC':     { componente: PdpTabletExec, nicho: 'electronico' },
  'PDP-WATCH-LUMEN':     { componente: PdpWatchLumen, nicho: 'electronico' },

  // Lote 10 Plantillas CRO 15-Secciones
  'PDP-DRONE-AERO':      { componente: PdpDroneAero, nicho: 'electronico' },
  'PDP-SMART-LOCK':      { componente: PdpSmartLock, nicho: 'electronico' },
  'PDP-SCOOTER-URBAN':   { componente: PdpScooterUrban, nicho: 'electronico' },
  'PDP-VR-OASIS':        { componente: PdpVirtualReality, nicho: 'electronico' },
  'PDP-MECH-BOARD':      { componente: PdpMechKeyboard, nicho: 'electronico' },
  'PDP-CINEMA-BEAM':     { componente: PdpCinemaBeam, nicho: 'electronico' },
  'PDP-PODCAST-PRO':     { componente: PdpPodcasterPro, nicho: 'electronico' },
  'PDP-BIO-RING':        { componente: PdpBioRing, nicho: 'electronico' },
  'PDP-ACTION-CAM-OLD':      { componente: PdpActionCamOld, nicho: 'electronico' },
  'PDP-POWER-STATION-OLD':   { componente: PdpPowerStationOld, nicho: 'electronico' },

  // Tercera Oleada 10 Plantillas CRO 15-Secciones
  'PDP-EREADER-ZEN':     { componente: PdpEreaderZen, nicho: 'electronico' },
  'PDP-SILLA-ERGO':      { componente: PdpSillaErgo, nicho: 'electronico' },
  'PDP-ROBOT-VACUUM':    { componente: PdpRobotVacuum, nicho: 'electronico' },
  'PDP-MONITOR-ULTRA':   { componente: PdpMonitorUltrawide, nicho: 'electronico' },
  'PDP-COFFEE-MAKER':    { componente: PdpCoffeeMaker, nicho: 'electronico' },
  'PDP-PURIFICADOR':     { componente: PdpPurificadorAire, nicho: 'electronico' },
  'PDP-SMART-GUITAR':    { componente: PdpSmartGuitar, nicho: 'electronico' },
  'PDP-MASCOTA-GPS':     { componente: PdpMascotaGPS, nicho: 'electronico' },
  'PDP-LENTES-BT':       { componente: PdpLentesBluetooth, nicho: 'electronico' },
  'PDP-HOME-HUB':        { componente: PdpHomeHub, nicho: 'electronico' },

  // Cuarta Oleada 20 Plantillas CRO 15-Secciones
  'PDP-HOLOGRAM-FAN':    { componente: PdpHologramFan, nicho: 'electronico' },
  'PDP-SMART-TELESCOPE': { componente: PdpSmartTelescope, nicho: 'electronico' },
  'PDP-BONE-COND':       { componente: PdpBoneConduction, nicho: 'electronico' },
  'PDP-EBIKE-KIT':       { componente: PdpEbikeKit, nicho: 'electronico' },
  'PDP-LASER-ENGRAVER':  { componente: PdpLaserEngraver, nicho: 'electronico' },
  // 'PDP-SMART-MIRROR':    { componente: PdpSmartMirror, nicho: 'electronico' }, // Overridden by Lote 4
  'PDP-PORTABLE-ESPRESSO':{ componente: PdpPortableEspresso, nicho: 'electronico' },
  'PDP-DASHCAM':         { componente: PdpDashCam, nicho: 'electronico' },
  'PDP-RETRO-CONSOLE':   { componente: PdpRetroConsole, nicho: 'electronico' },
  'PDP-TRANSLATOR':      { componente: PdpTranslatorEarbuds, nicho: 'electronico' },
  'PDP-SMART-PLANTER':   { componente: PdpSmartPlanter, nicho: 'electronico' },
  'PDP-BIO-SAFE':        { componente: PdpBiometricSafe, nicho: 'electronico' },
  'PDP-GIMBAL-PRO':      { componente: PdpGimbalPro, nicho: 'electronico' },
  'PDP-SKI-AR':          { componente: PdpSmartSkiGoggles, nicho: 'electronico' },
  'PDP-THERAGUN':        { componente: PdpTheragun, nicho: 'salud' },
  'PDP-STAR-PROJECTOR':  { componente: PdpStarProjector, nicho: 'hogar' },
  'PDP-SMART-RING':      { componente: PdpSmartRingOura, nicho: 'electronico' },
  'PDP-MINI-FRIDGE':     { componente: PdpMiniFridge, nicho: 'belleza' },
  'PDP-KEYFINDER':       { componente: PdpKeyFinder, nicho: 'electronico' },
  'PDP-NUMPAD':          { componente: PdpMechanicalNumeric, nicho: 'electronico' },
  // Lote Artesanal (5 Plantillas)
  'PDP-DRONE-PRO':       { componente: PdpDronePro, nicho: 'electronico' },
  'PDP-VR-STATION':      { componente: PdpVRStation, nicho: 'electronico' },
  'PDP-PARTY-AUDIO':     { componente: PdpPartyAudio, nicho: 'electronico' },
  'PDP-GAMING-LAPTOP':   { componente: PdpGamingLaptop, nicho: 'electronico' },
  'PDP-SMART-VACUUM':    { componente: PdpSmartVacuum, nicho: 'electronico' },
  // Segundo Lote Artesanal (5 Plantillas)
  'PDP-ACTION-CAM':      { componente: PdpActionCam, nicho: 'electronico' },
  'PDP-TITANIUM-PHONE':  { componente: PdpTitaniumPhone, nicho: 'electronico' },
  'PDP-ENDURANCE-WATCH': { componente: PdpEnduranceWatch, nicho: 'electronico' },
  'PDP-NEXTGEN-CONSOLE': { componente: PdpNextGenConsole, nicho: 'electronico' },
  'PDP-POWER-STATION':   { componente: PdpPowerStation, nicho: 'electronico' },
  // Tercer Lote Artesanal (5 Plantillas)
  'PDP-VINTAGE-TURN':    { componente: PdpVintageTurntable, nicho: 'electronico' },
  'PDP-URBAN-SCOOTER':   { componente: PdpUrbanScooter, nicho: 'electronico' },
  'PDP-CINEMA-OLED':     { componente: PdpCinemaOLED, nicho: 'electronico' },
  'PDP-MECH-BOARD-PRO':  { componente: PdpMechKeyboardPro, nicho: 'electronico' },
  'PDP-ANC-EARPHONES':   { componente: PdpNoiseCancellingEar, nicho: 'electronico' },
  // Cuarto Lote Artesanal Final (5 Plantillas)
  'PDP-SMART-MIRROR':    { componente: PdpSmartStudioMirror, nicho: 'electronico' },
  'PDP-PRO-ESPRESSO':    { componente: PdpSmartEspressoMaker, nicho: 'electronico' },
  'PDP-CINE-GIMBAL':     { componente: PdpCinematicGimbal, nicho: 'electronico' },
  'PDP-RAPID-3D':        { componente: PdpRapid3DPrinter, nicho: 'electronico' },
  'PDP-EINK-FOLIO':      { componente: PdpEInkFolio, nicho: 'electronico' },
};

// Componente cuando no se encuentra - ERROR en vez de fallback
const COMPONENTE_ERROR = () => {
  throw new Error(
    '[PlantillaRegistry] ERROR: Plantilla no encontrada. ' +
    'Agregar a lib/plantilla-registry.ts → PLANTILLAS_REGISTRY'
  );
};

// ────────────────────────────────────────────────────────────
// API PÚBLICA - Funciones simples y predecibles
// ────────────────────────────────────────────────────────────

/** Obtiene el componente React para un código de plantilla */
export function resolverComponentePDP(codigo: string): React.ComponentType<any> {
  const registro = PLANTILLAS_REGISTRY[codigo];
  if (!registro) {
    throw new Error(
      `[PlantillaRegistry] Código "${codigo}" no registrado. ` +
      `Agregar a lib/plantilla-registry.ts → PLANTILLAS_REGISTRY`
    );
  }
  return registro.componente;
}

/** Obtiene el nicho de una plantilla */
export function obtenerNicho(codigo: string): string {
  const registro = PLANTILLAS_REGISTRY[codigo];
  if (!registro) {
    throw new Error(`[PlantillaRegistry] Código "${codigo}" no registrado`);
  }
  return registro.nicho;
}

/** Lista todos los códigos de plantillas registrados */
export function getCodigosRegistrados(): string[] {
  return Object.keys(PLANTILLAS_REGISTRY);
}

/** Valida si un código existe */
export function existePlantilla(codigo: string): boolean {
  return codigo in PLANTILLAS_REGISTRY;
}

/** Extrae variante del código (para templates con variantes) */
export function extraerVariante(codigo: string): number {
  const parts = codigo.split('-');
  const last = parseInt(parts[parts.length - 1], 10);
  return isNaN(last) ? 1 : last;
}

// Re-export para compatibilidad
export { PLANTILLAS_REGISTRY };
