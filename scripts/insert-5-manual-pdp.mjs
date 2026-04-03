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

const loteManual = [
  { codigo: 'PDP-DRONE-PRO', nombre: 'Dron Táctico Pro', descripcion: 'Vuelo inteligente, óptica de élite', componente: 'PdpDronePro' },
  { codigo: 'PDP-VR-STATION', nombre: 'Estación VR Mixta', descripcion: 'Inmersión virtual sin límites', componente: 'PdpVRStation' },
  { codigo: 'PDP-PARTY-AUDIO', nombre: 'Audio Bestial 800W', descripcion: 'Sonido estruendoso nivel club', componente: 'PdpPartyAudio' },
  { codigo: 'PDP-GAMING-LAPTOP', nombre: 'Terminal CoreSystems', descripcion: 'Fuerza bruta de procesamiento', componente: 'PdpGamingLaptop' },
  { codigo: 'PDP-SMART-VACUUM', nombre: 'AuraClean Robot', descripcion: 'Aseo autónomo con LiDAR', componente: 'PdpSmartVacuum' }
];

async function run() {
  const { data: catData, error: catErr } = await supabase.from('Categorias_PDP').select('*');
  if (catErr) return;
  const targetCat = catData.find(c => c.nombre.toLowerCase().includes('electr'));

  const templates = loteManual.map((prod, i) => ({
      codigo: prod.codigo, 
      nombre: prod.nombre, 
      descripcion: prod.descripcion, 
      componente: prod.componente, 
      categoria_id: targetCat?.id || null, 
      premium: true, 
      verificada: false, 
      activa: false, 
      variante: 80 + i, 
      orden: 80 + i
  }));

  const { error: upsertErr } = await supabase.from('Plantillas_PDP').upsert(templates, { onConflict: 'codigo' });
  if (upsertErr) console.error("Error al insertar lote en SB:", upsertErr);
  else console.log("Lote de 5 insertado en Supabase.");
}

run();
