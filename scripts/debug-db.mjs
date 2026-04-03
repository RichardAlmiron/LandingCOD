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
    // Fallback to anon key if service role is missing
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
  
  console.log("Categories found:");
  catData.forEach(c => console.log(`- ${c.nombre} (ID: ${c.id})`));

  const { data: subData, error: subErr } = await supabase.from('Subcategorias_PDP').select('*');
  if (subErr) { console.error("Error fetching subcategories:", subErr); return; }
  
  console.log("\nSubcategories found:");
  subData.forEach(s => console.log(`- ${s.nombre} (ID: ${s.id}, CatID: ${s.categoria_id})`));

  // Let's attempt to find the right ones
  const targetCat = catData.find(c => c.nombre.toLowerCase().includes('electr'));
  const targetSub = subData.find(s => s.nombre.toLowerCase().includes('celular'));

  if (!targetCat || !targetSub) {
    console.log("\nCOULD NOT FIND MATCHING CATEGORY OR SUBCATEGORY FOR CELULARES/ELECTRONICOS.");
    return;
  }

  console.log(`\nFound Category: ${targetCat.nombre} (${targetCat.id})`);
  console.log(`Found Subcategory: ${targetSub.nombre} (${targetSub.id})`);

  // Now let's just insert the templates directly via API to be 100% sure.
  const templates = [
    {codigo: 'PDP-CEL-BUSINESS', nombre: 'Corporate / Business', descripcion: 'Estilo corporativo, oscuro y formal (B2B, productividad).', componente: 'PdpCelularesBusiness', categoria_id: targetCat.id, subcategoria_id: targetSub.id, premium: false, verificada: false, variante: 4, orden: 4, activa: true},
    {codigo: 'PDP-CEL-OUTDOOR', nombre: 'Outdoor / Táctico', descripcion: 'Estilo militar, rugoso y extremo para teléfonos de trabajo.', componente: 'PdpCelularesOutdoor', categoria_id: targetCat.id, subcategoria_id: targetSub.id, premium: false, verificada: false, variante: 5, orden: 5, activa: true},
    {codigo: 'PDP-CEL-GLASS', nombre: 'Ethereal / Glassmorphism', descripcion: 'Diseño translúcido, limpio, ideal para conceptos limpios.', componente: 'PdpCelularesGlass', categoria_id: targetCat.id, subcategoria_id: targetSub.id, premium: false, verificada: false, variante: 6, orden: 6, activa: true},
    {codigo: 'PDP-CEL-PRESTIGE', nombre: 'Prestige / Haute Couture', descripcion: 'Estilo lujo, alta costura, serifas finas, oro y blanco.', componente: 'PdpCelularesPrestige', categoria_id: targetCat.id, subcategoria_id: targetSub.id, premium: true, verificada: false, variante: 7, orden: 7, activa: true},
    {codigo: 'PDP-CEL-MECHA', nombre: 'Mecha / Sci-Fi Anime', descripcion: 'Estilo robótico/Evangelion, amarillo y negro intenso.', componente: 'PdpCelularesMecha', categoria_id: targetCat.id, subcategoria_id: targetSub.id, premium: false, verificada: false, variante: 8, orden: 8, activa: true},
    {codigo: 'PDP-CEL-SCIFI', nombre: 'Sci-Fi / Space', descripcion: 'Estilo aerospacial y estelar profundo, azules neón y rounded.', componente: 'PdpCelularesSciFi', categoria_id: targetCat.id, subcategoria_id: targetSub.id, premium: true, verificada: false, variante: 9, orden: 9, activa: true},
    {codigo: 'PDP-CEL-NORDIC', nombre: 'Nordic / Minimal Wood', descripcion: 'Minimalismo orgánico y calmado, pasteles cálidos y texturas.', componente: 'PdpCelularesNordic', categoria_id: targetCat.id, subcategoria_id: targetSub.id, premium: false, verificada: false, variante: 10, orden: 10, activa: true},
    {codigo: 'PDP-CEL-TERMINAL', nombre: 'Hacker / Terminal', descripcion: 'Estilo consola de comandos, fuentes monoespaciadas verdes.', componente: 'PdpCelularesTerminal', categoria_id: targetCat.id, subcategoria_id: targetSub.id, premium: false, verificada: false, variante: 11, orden: 11, activa: true},
    {codigo: 'PDP-CEL-VINTAGE', nombre: 'Vintage / Analog', descripcion: 'Estilo dorado de los 80s, sepia y analógico con tipografía serif.', componente: 'PdpCelularesVintage', categoria_id: targetCat.id, subcategoria_id: targetSub.id, premium: false, verificada: false, variante: 12, orden: 12, activa: true},
    {codigo: 'PDP-CEL-STREETWEAR', nombre: 'Streetwear / Hype', descripcion: 'Rojo intenso, letras gigantes "Supreme-style", urban hype.', componente: 'PdpCelularesStreetwear', categoria_id: targetCat.id, subcategoria_id: targetSub.id, premium: true, verificada: false, variante: 13, orden: 13, activa: true}
  ];

  console.log("Upserting templates...");
  const { data: upsertData, error: upsertErr } = await supabase
    .from('Plantillas_PDP')
    .upsert(templates, { onConflict: 'codigo' });

  if (upsertErr) {
    console.error("Failed to upsert:", upsertErr);
  } else {
    console.log("SUCCESS! The 10 templates have been successfully inserted into Supabase with verificada=false");
  }

}

run();
