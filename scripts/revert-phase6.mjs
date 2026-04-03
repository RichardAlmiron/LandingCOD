import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env.local');

let url = '';
let key = '';

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) url = line.split('=')[1].trim();
    if (line.startsWith('SUPABASE_SERVICE_ROLE_KEY=')) key = line.split('=')[1].trim();
    if (!key && line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) key = line.split('=')[1].trim();
  });
} catch (e) {
  console.error("Could not read .env.local", e);
  process.exit(1);
}

const supabase = createClient(url, key);

const phase6Codes = [
  'PDP-DJI-MAVIC3', 'PDP-MACBOOK-M2', 'PDP-GOPRO-12', 'PDP-PS5-DISC', 
  'PDP-SWITCH-OLED', 'PDP-META-QUEST3', 'PDP-JBL-PARTY710', 'PDP-BOSE-QCULTRA', 
  'PDP-S24-ULTRA', 'PDP-IPHONE-15PM', 'PDP-IPAD-PRO12', 'PDP-GARMIN-F7X', 
  'PDP-ECHO-SHOW15', 'PDP-ROBOROCK-S8', 'PDP-DECO-BE85', 'PDP-GPRO-X2', 
  'PDP-BLACKWIDOW-V4', 'PDP-ODYSSEY-G9', 'PDP-ANKER-767', 'PDP-OSMO-MOB6'
];

const filePaths = [
  'drones/PdpDjiMavic3.tsx', 'laptops/PdpMacBookProM2.tsx', 
  'camaras-accion/PdpGoProHero12.tsx', 'consolas/PdpPs5Disc.tsx', 
  'consolas/PdpSwitchOLED.tsx', 'vr/PdpMetaQuest3.tsx', 
  'audio/PdpJblPartyBox.tsx', 'audio/PdpBoseUltra.tsx', 
  'celulares/PdpGalaxyS24U.tsx', 'celulares/PdpIphone15PM.tsx', 
  'tablets/PdpIpadPro12.tsx', 'wearables/PdpGarminFenix7X.tsx', 
  'hogar-smart/PdpEchoShow15.tsx', 'hogar-smart/PdpRoborockS8.tsx', 
  'redes/PdpDecoBE85.tsx', 'gaming/PdpGProSuperlight.tsx', 
  'gaming/PdpBlackWidowV4.tsx', 'monitores/PdpOdysseyOLED.tsx', 
  'outdoor/PdpAnker767.tsx', 'fotografía/PdpOsmoMobile6.tsx'
];

async function revert() {
  console.log("1. Deleting files...");
  for (const fp of filePaths) {
      const fullPath = path.resolve(__dirname, '../components/pdp/electrónico', fp);
      if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
          console.log(\`Deleted \${fullPath}\`);
      }
  }

  console.log("\\n2. Deleting from Supabase...");
  const { error } = await supabase.from('Plantillas_PDP').delete().in('codigo', phase6Codes);
  if (error) {
      console.error("Supabase Error:", error);
  } else {
      console.log("Successfully wiped 20 records from Supabase DB!");
  }
}

revert();
