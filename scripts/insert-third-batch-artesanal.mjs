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

const loteTerceroArtesanal = [
  { codigo: 'PDP-VINTAGE-TURN', nombre: 'Tocadiscos Vintage Hi-Fi', descripcion: 'Fidelidad sonora analógica con tracción directa', componente: 'PdpVintageTurntable' },
  { codigo: 'PDP-URBAN-SCOOTER', nombre: 'E-Scooter Urbano Stealth', descripcion: 'Movilidad ágil y cero emisiones para commuting', componente: 'PdpUrbanScooter' },
  { codigo: 'PDP-CINEMA-OLED', nombre: 'Televisor OLED 8K', descripcion: 'Contraste OLED puro y píxeles auto-luminiscentes', componente: 'PdpCinemaOLED' },
  { codigo: 'PDP-MECH-BOARD-PRO', nombre: 'Teclado Custom Aluminio', descripcion: 'Hot-swappable gasket mount táctil y RGB', componente: 'PdpMechKeyboardPro' },
  { codigo: 'PDP-ANC-EARPHONES', nombre: 'Audífonos ANC Serene', descripcion: 'Cancelación de sonido y total desconexión', componente: 'PdpNoiseCancellingEar' }
];

async function run() {
  const { data: catData, error: catErr } = await supabase.from('Categorias_PDP').select('*');
  if (catErr) return;
  const targetCat = catData.find(c => c.nombre.toLowerCase().includes('electr'));

  const templates = loteTerceroArtesanal.map((prod, i) => ({
      codigo: prod.codigo, 
      nombre: prod.nombre, 
      descripcion: prod.descripcion, 
      componente: prod.componente, 
      categoria_id: targetCat?.id || null, 
      premium: true, 
      verificada: false, 
      activa: false, 
      variante: 90 + i, 
      orden: 90 + i
  }));

  const { error: upsertErr } = await supabase.from('Plantillas_PDP').upsert(templates, { onConflict: 'codigo' });
  if (upsertErr) console.error("Error al insertar tercer lote artesanal:", upsertErr);
  else console.log("Lote de 5 (Tercero Artesanal) insertado en Supabase.");
}

run();
