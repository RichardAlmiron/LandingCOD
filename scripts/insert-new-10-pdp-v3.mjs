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
    {codigo: 'PDP-EREADER-ZEN', nombre: 'E-Reader Zen', descripcion: 'Tinta electrónica, sin reflejos, estética minimalista japonesa, batería 6 meses.', componente: 'PdpEreaderZen', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 16, orden: 16},
    {codigo: 'PDP-SILLA-ERGO', nombre: 'Silla Ergonómica', descripcion: 'Soporte lumbar corporativo, ajuste 8-vías, malla transpirable alemana.', componente: 'PdpSillaErgo', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 17, orden: 17},
    {codigo: 'PDP-ROBOT-VACUUM', nombre: 'Robot Aspiradora', descripcion: 'Navegación láser LiDAR, autovaciado 30 días, mapa 3D domótico.', componente: 'PdpRobotVacuum', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 18, orden: 18},
    {codigo: 'PDP-MONITOR-ULTRA', nombre: 'Monitor Ultrawide', descripcion: 'Lienzo definitivo 49" curvo con estética Dark Mode RGB.', componente: 'PdpMonitorUltrawide', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 19, orden: 19},
    {codigo: 'PDP-COFFEE-MAKER', nombre: 'Máquina Espresso', descripcion: 'Máquina análoga, metales industriales espumador 93°C, estética Barista Elite.', componente: 'PdpCoffeeMaker', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 20, orden: 20},
    {codigo: 'PDP-PURIFICADOR', nombre: 'Purificador Clínico', descripcion: 'Purificador de aire grado médico HEPA H14. Sensor láser y look clínico/atmosférico.', componente: 'PdpPurificadorAire', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 21, orden: 21},
    {codigo: 'PDP-SMART-GUITAR', nombre: 'Smart Guitar', descripcion: 'Guitarra con diapasón LED y amplificador integrado. Rock/Synthwave.', componente: 'PdpSmartGuitar', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 22, orden: 22},
    {codigo: 'PDP-MASCOTA-GPS', nombre: 'Mascota GPS', descripcion: 'Collar táctico de rescate. Geocerca y rastreo celular IP68 outdoors.', componente: 'PdpMascotaGPS', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 23, orden: 23},
    {codigo: 'PDP-LENTES-BT', nombre: 'Lentes Bluetooth', descripcion: 'Fashion Tech Editorial. Gafas inteligentes audio direccional invisible.', componente: 'PdpLentesBluetooth', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 24, orden: 24},
    {codigo: 'PDP-HOME-HUB', nombre: 'Home Hub', descripcion: 'Centro asistencial doméstico minimalista. Frost glass y domótica de comandos.', componente: 'PdpHomeHub', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 25, orden: 25}
  ];

  console.log("Upserting third wave templates...");
  const { data: upsertData, error: upsertErr } = await supabase
    .from('Plantillas_PDP')
    .upsert(templates, { onConflict: 'codigo' });

  if (upsertErr) {
    console.error("Failed to upsert:", upsertErr);
  } else {
    console.log("SUCCESS! The 10 Third Wave CRO templates have been inserted into Supabase with activa=false y verificada=false");
  }
}

run();
