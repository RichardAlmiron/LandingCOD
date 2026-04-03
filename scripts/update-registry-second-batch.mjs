import fs from 'fs';
const file = 'lib/plantilla-registry.ts';
let code = fs.readFileSync(file, 'utf8');

const imports = `// -- Lote Segundo Artesanal (5 Plantillas) --
import PdpActionCam from '@/components/pdp/electrónico/camaras-accion/PdpActionCam';
import PdpTitaniumPhone from '@/components/pdp/electrónico/celulares/PdpTitaniumPhone';
import PdpEnduranceWatch from '@/components/pdp/electrónico/wearables/PdpEnduranceWatch';
import PdpNextGenConsole from '@/components/pdp/electrónico/consolas/PdpNextGenConsole';
import PdpPowerStation from '@/components/pdp/electrónico/outdoor/PdpPowerStation';

// ────────────────────────────────────────────────────────────`;

const registryEntries = `  // Segundo Lote Artesanal
  'PDP-ACTION-CAM':      { componente: PdpActionCam, nicho: 'electronico' },
  'PDP-TITANIUM-PHONE':  { componente: PdpTitaniumPhone, nicho: 'electronico' },
  'PDP-ENDURANCE-WATCH': { componente: PdpEnduranceWatch, nicho: 'electronico' },
  'PDP-NEXTGEN-CONSOLE': { componente: PdpNextGenConsole, nicho: 'electronico' },
  'PDP-POWER-STATION':   { componente: PdpPowerStation, nicho: 'electronico' },
};`;

if (!code.includes('PDP-ACTION-CAM')) {
    code = code.replace('// ────────────────────────────────────────────────────────────\n// REGISTRO ÚNICO:', imports + '\n// REGISTRO ÚNICO:');
    code = code.replace('};\n\n// Componente', registryEntries + '\n\n// Componente');
    fs.writeFileSync(file, code, 'utf8');
    console.log('Registry updated with second batch.');
} else {
    console.log('Registry already updated.');
}
