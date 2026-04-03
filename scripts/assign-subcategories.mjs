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

const mappings = {
  // Primer Lote
  'PDP-DRONE-PRO': { cat: 'Electrónica', subcat: 'Cámaras' },
  'PDP-VR-STATION': { cat: 'Electrónica', subcat: 'Wearables' },
  'PDP-PARTY-AUDIO': { cat: 'Electrónica', subcat: 'Audio' },
  'PDP-GAMING-LAPTOP': { cat: 'Electrónica', subcat: 'Computadoras' },
  'PDP-SMART-VACUUM': { cat: 'Hogar', subcat: 'Limpieza' },

  // Segundo Lote
  'PDP-ACTION-CAM': { cat: 'Electrónica', subcat: 'Cámaras' },
  'PDP-TITANIUM-PHONE': { cat: 'Electrónica', subcat: 'Celulares' },
  'PDP-ENDURANCE-WATCH': { cat: 'Electrónica', subcat: 'Wearables' },
  'PDP-NEXTGEN-CONSOLE': { cat: 'Electrónica', subcat: 'Gaming' },
  'PDP-POWER-STATION': { cat: 'Herramientas', subcat: 'Industriales' },

  // Tercer Lote
  'PDP-VINTAGE-TURN': { cat: 'Electrónica', subcat: 'Audio' },
  'PDP-URBAN-SCOOTER': { cat: 'Deportes', subcat: 'Ciclismo' },
  'PDP-CINEMA-OLED': { cat: 'Electrónica', subcat: 'Televisores' },
  'PDP-MECH-BOARD-PRO': { cat: 'Electrónica', subcat: 'Computadoras' },
  'PDP-ANC-EARPHONES': { cat: 'Electrónica', subcat: 'Audio' },

  // Cuarto Lote
  'PDP-SMART-MIRROR': { cat: 'Salud', subcat: 'Fitness' },
  'PDP-PRO-ESPRESSO': { cat: 'Hogar', subcat: 'Cocina' },
  'PDP-CINE-GIMBAL': { cat: 'Electrónica', subcat: 'Cámaras' },
  'PDP-RAPID-3D': { cat: 'Herramientas', subcat: 'Eléctricas' },
  'PDP-EINK-FOLIO': { cat: 'Electrónica', subcat: 'Tablets' }
};

async function run() {
  console.log("Fetching Categories and Subcategories...");
  
  // 1. Fetch categories
  const { data: cats, error: catErr } = await supabase.from('Categorias_PDP').select('*');
  if (catErr) {
    console.error("Error fetching categories:", catErr);
    return;
  }

  // 2. Fetch subcategories
  const { data: subcats, error: subcatErr } = await supabase.from('Subcategorias_PDP').select('*');
  if (subcatErr) {
    console.error("Error fetching subcategories:", subcatErr);
    return;
  }

  const catMap = {}; // name -> id
  cats.forEach(c => catMap[c.nombre] = c.id);

  const subcatMap = {}; // catId_nombre -> id
  subcats.forEach(s => subcatMap[`${s.categoria_id}_${s.nombre}`] = s.id);

  console.log("Updating templates...");

  for (const [codigo, target] of Object.entries(mappings)) {
    const cid = catMap[target.cat];
    if (!cid) {
      console.warn(`Category not found: ${target.cat} for ${codigo}`);
      continue;
    }

    const sid = subcatMap[`${cid}_${target.subcat}`];
    if (!sid) {
      console.warn(`Subcategory not found: ${target.subcat} (in cat ${target.cat}) for ${codigo}`);
      continue;
    }

    const { error: updErr } = await supabase
      .from('Plantillas_PDP')
      .update({ categoria_id: cid, subcategoria_id: sid })
      .eq('codigo', codigo);

    if (updErr) {
      console.error(`Error updating ${codigo}:`, updErr);
    } else {
      console.log(`✓ updated ${codigo} -> ${target.cat} / ${target.subcat}`);
    }
  }

  console.log("Update complete!");
}

run();
