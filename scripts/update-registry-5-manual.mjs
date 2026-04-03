import fs from 'fs';
const file = 'lib/plantilla-registry.ts';
let code = fs.readFileSync(file, 'utf8');

const imports = `// -- Lote Manual Artesanal (5 Plantillas) --
import PdpDronePro from '@/components/pdp/electrónico/drones/PdpDronePro';
import PdpVRStation from '@/components/pdp/electrónico/vr/PdpVRStation';
import PdpPartyAudio from '@/components/pdp/electrónico/audio/PdpPartyAudio';
import PdpGamingLaptop from '@/components/pdp/electrónico/laptops/PdpGamingLaptop';
import PdpSmartVacuum from '@/components/pdp/electrónico/hogar-smart/PdpSmartVacuum';

// ────────────────────────────────────────────────────────────`;

const registryEntries = `  // Lote Artesanal (5 Plantillas)
  'PDP-DRONE-PRO':       { componente: PdpDronePro, nicho: 'electronico' },
  'PDP-VR-STATION':      { componente: PdpVRStation, nicho: 'electronico' },
  'PDP-PARTY-AUDIO':     { componente: PdpPartyAudio, nicho: 'electronico' },
  'PDP-GAMING-LAPTOP':   { componente: PdpGamingLaptop, nicho: 'electronico' },
  'PDP-SMART-VACUUM':    { componente: PdpSmartVacuum, nicho: 'electronico' },
};`;

if (!code.includes('PDP-DRONE-PRO')) {
    code = code.replace('// ────────────────────────────────────────────────────────────\n// REGISTRO ÚNICO:', imports + '\n// REGISTRO ÚNICO:');
    code = code.replace('};\n\n// Componente', registryEntries + '\n\n// Componente');
    fs.writeFileSync(file, code, 'utf8');
    console.log('Registry updated with manual batch.');
} else {
    console.log('Registry already updated.');
}
