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

const loteSegundo = [
  { codigo: 'PDP-ACTION-CAM', nombre: 'Cámara Acción 5K', descripcion: 'Resistencia extrema', componente: 'PdpActionCam' },
  { codigo: 'PDP-TITANIUM-PHONE', nombre: 'Smartphone Titanio', descripcion: 'Lujo ejecutivo y poder', componente: 'PdpTitaniumPhone' },
  { codigo: 'PDP-ENDURANCE-WATCH', nombre: 'Reloj Supervivencia', descripcion: 'Navegación solar', componente: 'PdpEnduranceWatch' },
  { codigo: 'PDP-NEXTGEN-CONSOLE', nombre: 'Consola NextGen', descripcion: 'Inmersión hiperrealista', componente: 'PdpNextGenConsole' },
  { codigo: 'PDP-POWER-STATION', nombre: 'Estación Litio 1000W', descripcion: 'Energía de reserva', componente: 'PdpPowerStation' }
];

async function run() {
  const { data: catData, error: catErr } = await supabase.from('Categorias_PDP').select('*');
  if (catErr) return;
  const targetCat = catData.find(c => c.nombre.toLowerCase().includes('electr'));

  const templates = loteSegundo.map((prod, i) => ({
      codigo: prod.codigo, 
      nombre: prod.nombre, 
      descripcion: prod.descripcion, 
      componente: prod.componente, 
      categoria_id: targetCat?.id || null, 
      premium: true, 
      verificada: false, 
      activa: false, 
      variante: 85 + i, 
      orden: 85 + i
  }));

  const { error: upsertErr } = await supabase.from('Plantillas_PDP').upsert(templates, { onConflict: 'codigo' });
  if (upsertErr) console.error("Error al insertar segundo lote:", upsertErr);
  else console.log("Lote de 5 (Segundo) insertado en Supabase.");
}

run();
