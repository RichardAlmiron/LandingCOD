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

const loteCuartoArtesanal = [
  { codigo: 'PDP-SMART-MIRROR', nombre: 'Espejo Entrenador IA', descripcion: 'Entrenador digital biométrico con resistencia magnética.', componente: 'PdpSmartStudioMirror' },
  { codigo: 'PDP-PRO-ESPRESSO', nombre: 'Máquina Espresso Pro', descripcion: 'Doble caldera térmica de acero inoxidable y PID inteligente.', componente: 'PdpSmartEspressoMaker' },
  { codigo: 'PDP-CINE-GIMBAL', nombre: 'Cardán Estabilizador Pro', descripcion: 'Gimbal de fibra de carbono para estabilización de cámaras de cine.', componente: 'PdpCinematicGimbal' },
  { codigo: 'PDP-RAPID-3D', nombre: 'Impresora 3D Rápida', descripcion: 'Fabricación rápida CoreXY con LiDAR láser.', componente: 'PdpRapid3DPrinter' },
  { codigo: 'PDP-EINK-FOLIO', nombre: 'Folio E-Ink Natural', descripcion: 'Paper-white tablet libre de distracciones y luz azul.', componente: 'PdpEInkFolio' }
];

async function run() {
  const { data: catData, error: catErr } = await supabase.from('Categorias_PDP').select('*');
  if (catErr) return;
  const targetCat = catData.find(c => c.nombre.toLowerCase().includes('electr'));

  const templates = loteCuartoArtesanal.map((prod, i) => ({
      codigo: prod.codigo, 
      nombre: prod.nombre, 
      descripcion: prod.descripcion, 
      componente: prod.componente, 
      categoria_id: targetCat?.id || null, 
      premium: true, 
      verificada: false, 
      activa: false, 
      variante: 95 + i, 
      orden: 95 + i
  }));

  const { error: upsertErr } = await supabase.from('Plantillas_PDP').upsert(templates, { onConflict: 'codigo' });
  if (upsertErr) console.error("Error al insertar cuarto lote:", upsertErr);
  else console.log("Lote Final de 5 (Cuarto Artesanal) insertado en Supabase.");
}

run();
