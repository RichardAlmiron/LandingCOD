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

async function run() {
  console.log("Fetching Categories...");
  const { data: catData, error: catErr } = await supabase.from('Categorias_PDP').select('*');
  if (catErr) { console.error("Error fetching categories:", JSON.stringify(catErr)); return; }
  
  const targetCat = catData.find(c => c.nombre.toLowerCase().includes('electr'));

  if (!targetCat) {
    console.log("\nCOULD NOT FIND MATCHING CATEGORY FOR ELECTRONICOS.");
    return;
  }

  console.log(`\nFound Category: ${targetCat.nombre} (${targetCat.id})`);

  const templates = [
    {codigo: 'PDP-DRONE-AERO', nombre: 'Drone Aeroespacial', descripcion: 'Estética HUD Aeronáutico (Negro / Verde Neón) para drones.', componente: 'PdpDroneAero', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 6, orden: 6},
    {codigo: 'PDP-SMART-LOCK', nombre: 'Seguridad Smart Lock', descripcion: 'Estética Bóveda Bancaria (Zinc / Gris) para seguridad doméstica.', componente: 'PdpSmartLock', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 7, orden: 7},
    {codigo: 'PDP-SCOOTER-URBAN', nombre: 'Scooter Urbano', descripcion: 'Estética Streetwear (Asfalto / Amarillo Itálico) para eco-movilidad.', componente: 'PdpScooterUrban', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 8, orden: 8},
    {codigo: 'PDP-VR-OASIS', nombre: 'VR Oasis', descripcion: 'Metaverso puro. Aberración cromática y neones cyan/magenta.', componente: 'PdpVirtualReality', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 9, orden: 9},
    {codigo: 'PDP-MECH-BOARD', nombre: 'Teclado Mecánico', descripcion: 'Brutalismo Hacker (Blanco/Negro con rosa ultra fuerte) dev setup.', componente: 'PdpMechKeyboard', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 10, orden: 10},
    {codigo: 'PDP-CINEMA-BEAM', nombre: 'Cinema Beam', descripcion: 'Proyector portátil de cine en casa con gradientes cálidos como rayos de luz.', componente: 'PdpCinemaBeam', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 11, orden: 11},
    {codigo: 'PDP-PODCAST-PRO', nombre: 'Podcaster Studio', descripcion: 'Micrófonos broadcasting. Foams negros y luces rojas de grabación "ON AIR".', componente: 'PdpPodcasterPro', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 12, orden: 12},
    {codigo: 'PDP-BIO-RING', nombre: 'Bio Ring', descripcion: 'Anillos inteligentes. Alta clínica quirúrgica (Titanio claro, escaneos celestes).', componente: 'PdpBioRing', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 13, orden: 13},
    {codigo: 'PDP-ACTION-CAM', nombre: 'Action Camera', descripcion: 'Kevlar y polvo. Extreme sports action con marcos de peligro y diseño "destruido".', componente: 'PdpActionCam', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 14, orden: 14},
    {codigo: 'PDP-POWER-STATION', nombre: 'Power Station', descripcion: 'Estación EPS (Azul industrial, luces esmeralda) con look de ingeniería pesada.', componente: 'PdpPowerStation', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 15, orden: 15}
  ];

  console.log("Upserting templates...");
  const { data: upsertData, error: upsertErr } = await supabase
    .from('Plantillas_PDP')
    .upsert(templates, { onConflict: 'codigo' });

  if (upsertErr) {
    console.error("Failed to upsert:", upsertErr);
  } else {
    console.log("SUCCESS! The 10 Ultra-Premium CRO templates have been inserted into Supabase with activa=false y verificada=false");
  }
}

run();
