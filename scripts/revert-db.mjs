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

async function revert() {
  const { error } = await supabase.from('Plantillas_PDP').delete().in('codigo', phase6Codes);
  if (error) {
      console.error("Supabase Error:", error);
  } else {
      console.log("Successfully wiped 20 records from Supabase DB!");
  }
}

revert();
