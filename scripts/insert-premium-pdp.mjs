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
    {codigo: 'PDP-AUDIO-STUDIO', nombre: 'Audio Studio', descripcion: 'Estética de estudio de grabación (Tonos crema / dorados) para productos de audio.', componente: 'PdpAudioStudio', categoria_id: targetCat.id, premium: true, verificada: false, variante: 1, orden: 1, activa: true},
    {codigo: 'PDP-CAMERA-PRO', nombre: 'Camera Pro', descripcion: 'Estética editorial/fotográfica (Blanco puro / rojo) para cámaras electrónicas.', componente: 'PdpCameraPro', categoria_id: targetCat.id, premium: true, verificada: false, variante: 2, orden: 2, activa: true},
    {codigo: 'PDP-GAMING-ELITE', nombre: 'Gaming Elite', descripcion: 'Estética dark gamer (Oscuridad / Detalles neón) para periféricos de gaming.', componente: 'PdpGamingElite', categoria_id: targetCat.id, premium: true, verificada: false, variante: 3, orden: 3, activa: true},
    {codigo: 'PDP-TABLET-EXEC', nombre: 'Tablet Exec', descripcion: 'Estética Apple (Plateado / Azul profundo) ultra limpia para tablets.', componente: 'PdpTabletExec', categoria_id: targetCat.id, premium: true, verificada: false, variante: 4, orden: 4, activa: true},
    {codigo: 'PDP-WATCH-LUMEN', nombre: 'Watch Lumen', descripcion: 'Estética relojería de lujo (Negro absoluto / Dorado Rosa) para wearables.', componente: 'PdpWatchLumen', categoria_id: targetCat.id, premium: true, verificada: false, variante: 5, orden: 5, activa: true}
  ];

  console.log("Upserting templates...");
  const { data: upsertData, error: upsertErr } = await supabase
    .from('Plantillas_PDP')
    .upsert(templates, { onConflict: 'codigo' });

  if (upsertErr) {
    console.error("Failed to upsert:", upsertErr);
  } else {
    console.log("SUCCESS! The 5 Ultra-Premium templates have been inserted into Supabase with verificada=false");
  }
}

run();
