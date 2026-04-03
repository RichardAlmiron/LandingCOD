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

if (!url || !key) {
  console.error("Missing SUPABASE URL or KEY");
  process.exit(1);
}

const supabase = createClient(url, key);

const nuevasPlantillasFase6 = [
  { codigo: 'PDP-DJI-MAVIC3', nombre: 'DJI Mavic 3 Classic', descripcion: 'Frontera de drones. 15 secciones.', componente: 'PdpDjiMavic3', premio: true},
  { codigo: 'PDP-MACBOOK-M2', nombre: 'MacBook Pro M2 Max 16"', descripcion: 'Estación nómada.', componente: 'PdpMacBookProM2', premio: true },
  { codigo: 'PDP-GOPRO-12', nombre: 'GoPro HERO12 Black', descripcion: 'Acción capturada.', componente: 'PdpGoProHero12', premio: true },
  { codigo: 'PDP-PS5-DISC', nombre: 'Sony PlayStation 5', descripcion: 'Gaming puro.', componente: 'PdpPs5Disc', premio: true },
  { codigo: 'PDP-SWITCH-OLED', nombre: 'Nintendo Switch OLED', descripcion: 'Consola Premium', componente: 'PdpSwitchOLED', premio: true },
  { codigo: 'PDP-META-QUEST3', nombre: 'Oculus Meta Quest 3', descripcion: 'VR Mixta', componente: 'PdpMetaQuest3', premio: true },
  { codigo: 'PDP-JBL-PARTY710', nombre: 'JBL PartyBox 710', descripcion: 'Audio bestial', componente: 'PdpJblPartyBox', premio: true },
  { codigo: 'PDP-BOSE-QCULTRA', nombre: 'Bose QC Ultra', descripcion: 'Silencio acústico', componente: 'PdpBoseUltra', premio: true },
  { codigo: 'PDP-S24-ULTRA', nombre: 'Samsung S24 Ultra', descripcion: 'Comando IA', componente: 'PdpGalaxyS24U', premio: true },
  { codigo: 'PDP-IPHONE-15PM', nombre: 'iPhone 15 Pro Max', descripcion: 'Titanio', componente: 'PdpIphone15PM', premio: true },
  { codigo: 'PDP-IPAD-PRO12', nombre: 'iPad Pro 12.9" M2', descripcion: 'Boceto Pro', componente: 'PdpIpadPro12', premio: true },
  { codigo: 'PDP-GARMIN-F7X', nombre: 'Garmin Fenix 7X Pro', descripcion: 'Topográfico táctico', componente: 'PdpGarminFenix7X', premio: true },
  { codigo: 'PDP-ECHO-SHOW15', nombre: 'Amazon Echo Show 15', descripcion: 'Marco domótico', componente: 'PdpEchoShow15', premio: true },
  { codigo: 'PDP-ROBOROCK-S8', nombre: 'Roborock S8 Pro Ultra', descripcion: 'Aseo autónomo', componente: 'PdpRoborockS8', premio: true },
  { codigo: 'PDP-DECO-BE85', nombre: 'TP-Link Deco BE85', descripcion: 'Malla Wi-Fi 7', componente: 'PdpDecoBE85', premio: true },
  { codigo: 'PDP-GPRO-X2', nombre: 'Logitech G Pro X 2', descripcion: 'Precisión Esports', componente: 'PdpGProSuperlight', premio: true },
  { codigo: 'PDP-BLACKWIDOW-V4', nombre: 'Razer BlackWidow V4', descripcion: 'Teclado Mecánico', componente: 'PdpBlackWidowV4', premio: true },
  { codigo: 'PDP-ODYSSEY-G9', nombre: 'Samsung Odyssey G9', descripcion: 'Monitor Ultrawide 49"', componente: 'PdpOdysseyOLED', premio: true },
  { codigo: 'PDP-ANKER-767', nombre: 'Anker PowerHouse 767', descripcion: 'Energía remota', componente: 'PdpAnker767', premio: true },
  { codigo: 'PDP-OSMO-MOB6', nombre: 'DJI Osmo Mobile 6', descripcion: 'Tracking IA.', componente: 'PdpOsmoMobile6', premio: true },
];

async function run() {
  console.log("Fetching Categories...");
  const { data: catData, error: catErr } = await supabase.from('Categorias_PDP').select('*');
  if (catErr) { console.error("Error fetching categories:", JSON.stringify(catErr)); return; }
  
  const targetCat = catData.find(c => c.nombre.toLowerCase().includes('electr'));

  if (!targetCat) {
    console.log("\\nCOULD NOT FIND MATCHING CATEGORY FOR ELECTRONICOS.");
    return;
  }

  const templates = nuevasPlantillasFase6.map((prod, i) => ({
      codigo: prod.codigo, 
      nombre: prod.nombre, 
      descripcion: prod.descripcion, 
      componente: prod.componente, 
      categoria_id: targetCat.id, 
      premium: true, 
      verificada: false, 
      activa: false, 
      variante: 66 + i, 
      orden: 66 + i
  }));

  console.log("Upserting Fase 6 templates...");
  const { data: upsertData, error: upsertErr } = await supabase
    .from('Plantillas_PDP')
    .upsert(templates, { onConflict: 'codigo' });

  if (upsertErr) {
    console.error("Failed to upsert:", upsertErr);
  } else {
    console.log("SUCCESS! The 20 Fase 6 CRO templates have been inserted into Supabase with activa=false y verificada=false");
  }
}

run();
