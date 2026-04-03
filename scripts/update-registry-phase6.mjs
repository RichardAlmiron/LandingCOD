import fs from 'fs';
const file = 'lib/plantilla-registry.ts';
let code = fs.readFileSync(file, 'utf8');

const imports = `// -- Quinta Oleada (20 Plantillas / Fase 6 - Shopping China) --
import PdpDjiMavic3 from '@/components/pdp/electrónico/drones/PdpDjiMavic3';
import PdpMacBookProM2 from '@/components/pdp/electrónico/laptops/PdpMacBookProM2';
import PdpGoProHero12 from '@/components/pdp/electrónico/camaras-accion/PdpGoProHero12';
import PdpPs5Disc from '@/components/pdp/electrónico/consolas/PdpPs5Disc';
import PdpSwitchOLED from '@/components/pdp/electrónico/consolas/PdpSwitchOLED';
import PdpMetaQuest3 from '@/components/pdp/electrónico/vr/PdpMetaQuest3';
import PdpJblPartyBox from '@/components/pdp/electrónico/audio/PdpJblPartyBox';
import PdpBoseUltra from '@/components/pdp/electrónico/audio/PdpBoseUltra';
import PdpGalaxyS24U from '@/components/pdp/electrónico/celulares/PdpGalaxyS24U';
import PdpIphone15PM from '@/components/pdp/electrónico/celulares/PdpIphone15PM';
import PdpIpadPro12 from '@/components/pdp/electrónico/tablets/PdpIpadPro12';
import PdpGarminFenix7X from '@/components/pdp/electrónico/wearables/PdpGarminFenix7X';
import PdpEchoShow15 from '@/components/pdp/electrónico/hogar-smart/PdpEchoShow15';
import PdpRoborockS8 from '@/components/pdp/electrónico/hogar-smart/PdpRoborockS8';
import PdpDecoBE85 from '@/components/pdp/electrónico/redes/PdpDecoBE85';
import PdpGProSuperlight from '@/components/pdp/electrónico/gaming/PdpGProSuperlight';
import PdpBlackWidowV4 from '@/components/pdp/electrónico/gaming/PdpBlackWidowV4';
import PdpOdysseyOLED from '@/components/pdp/electrónico/monitores/PdpOdysseyOLED';
import PdpAnker767 from '@/components/pdp/electrónico/outdoor/PdpAnker767';
import PdpOsmoMobile6 from '@/components/pdp/electrónico/fotografía/PdpOsmoMobile6';

// ────────────────────────────────────────────────────────────`;

const registryEntries = `  // Quinta Oleada 20 Plantillas CRO 15-Secciones (Fase 6)
  'PDP-DJI-MAVIC3':      { componente: PdpDjiMavic3, nicho: 'electronico' },
  'PDP-MACBOOK-M2':      { componente: PdpMacBookProM2, nicho: 'electronico' },
  'PDP-GOPRO-12':        { componente: PdpGoProHero12, nicho: 'electronico' },
  'PDP-PS5-DISC':        { componente: PdpPs5Disc, nicho: 'electronico' },
  'PDP-SWITCH-OLED':     { componente: PdpSwitchOLED, nicho: 'electronico' },
  'PDP-META-QUEST3':     { componente: PdpMetaQuest3, nicho: 'electronico' },
  'PDP-JBL-PARTY710':    { componente: PdpJblPartyBox, nicho: 'electronico' },
  'PDP-BOSE-QCULTRA':    { componente: PdpBoseUltra, nicho: 'electronico' },
  'PDP-S24-ULTRA':       { componente: PdpGalaxyS24U, nicho: 'electronico' },
  'PDP-IPHONE-15PM':     { componente: PdpIphone15PM, nicho: 'electronico' },
  'PDP-IPAD-PRO12':      { componente: PdpIpadPro12, nicho: 'electronico' },
  'PDP-GARMIN-F7X':      { componente: PdpGarminFenix7X, nicho: 'electronico' },
  'PDP-ECHO-SHOW15':     { componente: PdpEchoShow15, nicho: 'electronico' },
  'PDP-ROBOROCK-S8':     { componente: PdpRoborockS8, nicho: 'electronico' },
  'PDP-DECO-BE85':       { componente: PdpDecoBE85, nicho: 'electronico' },
  'PDP-GPRO-X2':         { componente: PdpGProSuperlight, nicho: 'electronico' },
  'PDP-BLACKWIDOW-V4':   { componente: PdpBlackWidowV4, nicho: 'electronico' },
  'PDP-ODYSSEY-G9':      { componente: PdpOdysseyOLED, nicho: 'electronico' },
  'PDP-ANKER-767':       { componente: PdpAnker767, nicho: 'electronico' },
  'PDP-OSMO-MOB6':       { componente: PdpOsmoMobile6, nicho: 'electronico' },
};`;

if (!code.includes('PDP-DJI-MAVIC3')) {
    code = code.replace('// ────────────────────────────────────────────────────────────\n// REGISTRO ÚNICO:', imports + '\n// REGISTRO ÚNICO:');
    code = code.replace('};\n\n// Componente', registryEntries + '\n\n// Componente');
    fs.writeFileSync(file, code, 'utf8');
    console.log('Registry updated with Phase 6 components.');
} else {
    console.log('Registry already updated.');
}
