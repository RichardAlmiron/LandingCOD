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
  const saludCat = catData.find(c => c.nombre.toLowerCase().includes('salud')) || targetCat;
  const bellezaCat = catData.find(c => c.nombre.toLowerCase().includes('belleza')) || targetCat;
  const hogarCat = catData.find(c => c.nombre.toLowerCase().includes('hogar')) || targetCat;

  if (!targetCat) {
    console.log("\nCOULD NOT FIND MATCHING CATEGORY FOR ELECTRONICOS.");
    return;
  }

  console.log(`\nFound Category: ${targetCat.nombre} (${targetCat.id})`);

  const templates = [
    {codigo: 'PDP-HOLOGRAM-FAN', nombre: 'Ventilador Holográfico 3D', descripcion: 'Display holográfico publicitario LED con estética Cyberpunk.', componente: 'PdpHologramFan', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 26, orden: 26},
    {codigo: 'PDP-SMART-TELESCOPE', nombre: 'Telescopio Inteligente', descripcion: 'Óptica conectada a smartphone. Explora el cielo profundo fácilmente.', componente: 'PdpSmartTelescope', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 27, orden: 27},
    {codigo: 'PDP-BONE-COND', nombre: 'Auriculares Conducción Ósea', descripcion: 'Tecnología acústica sin bloqueo de oído. Estética deportiva avanzada.', componente: 'PdpBoneConduction', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 28, orden: 28},
    {codigo: 'PDP-EBIKE-KIT', nombre: 'Kit Motor de E-Bike', descripcion: 'Conversor de bicicleta estándar a eléctrica (E-Bike) urbano.', componente: 'PdpEbikeKit', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 29, orden: 29},
    {codigo: 'PDP-LASER-ENGRAVER', nombre: 'Grabadora Láser Pro', descripcion: 'Grabadora CNC de escritorio para metal y madera. Estilo industrial.', componente: 'PdpLaserEngraver', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 30, orden: 30},
    {codigo: 'PDP-SMART-MIRROR', nombre: 'Espejo Inteligente LED', descripcion: 'Espejo baño/habitación con display métrico de salud e iluminación.', componente: 'PdpSmartMirror', categoria_id: hogarCat.id, premium: true, verificada: false, activa: false, variante: 31, orden: 31},
    {codigo: 'PDP-PORTABLE-ESPRESSO', nombre: 'Máquina Espresso Portátil', descripcion: 'Extractor de café espresso a presión manual para campismo táctico.', componente: 'PdpPortableEspresso', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 32, orden: 32},
    {codigo: 'PDP-DASHCAM', nombre: 'Dashcam Espejo Retrovisor', descripcion: 'Cámara DVR de seguridad automotriz 4K. Visión nocturna premium.', componente: 'PdpDashCam', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 33, orden: 33},
    {codigo: 'PDP-RETRO-CONSOLE', nombre: 'Consola Retro Arcade', descripcion: 'Emulador Handheld estética Vaporwave/90s. Miles de juegos incluidos.', componente: 'PdpRetroConsole', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 34, orden: 34},
    {codigo: 'PDP-TRANSLATOR', nombre: 'Traductor AI Earbuds', descripcion: 'Auriculares con traducción instantánea. Minimalismo tipo Airport.', componente: 'PdpTranslatorEarbuds', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 35, orden: 35},
    {codigo: 'PDP-SMART-PLANTER', nombre: 'Maceta Inteligente Biótica', descripcion: 'Hidroponía desktop de autorriego LED. Estética biophilic y Zen.', componente: 'PdpSmartPlanter', categoria_id: hogarCat.id, premium: true, verificada: false, activa: false, variante: 36, orden: 36},
    {codigo: 'PDP-BIO-SAFE', nombre: 'Caja Fuerte Biométrica', descripcion: 'Almacenamiento de valores portátil de acceso dactilar 360 grados.', componente: 'PdpBiometricSafe', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 37, orden: 37},
    {codigo: 'PDP-GIMBAL-PRO', nombre: 'Gimbal Cinematográfico', descripcion: 'Estabilizador de 3 ejes para smartphones formato cine noir.', componente: 'PdpGimbalPro', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 38, orden: 38},
    {codigo: 'PDP-SKI-AR', nombre: 'Gafas Ski AR', descripcion: 'Antivaho reflectante polarizado con visualización HUD en la nieve.', componente: 'PdpSmartSkiGoggles', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 39, orden: 39},
    {codigo: 'PDP-THERAGUN', nombre: 'Pistola Masaje Celular', descripcion: 'Recuperación muscular atlética de 16mm de amplitud.', componente: 'PdpTheragun', categoria_id: saludCat.id, premium: true, verificada: false, activa: false, variante: 40, orden: 40},
    {codigo: 'PDP-STAR-PROJECTOR', nombre: 'Proyector Galaxia Nebula', descripcion: 'Cielo estrellado animado para techo. Proyección envolvente de sueño.', componente: 'PdpStarProjector', categoria_id: hogarCat.id, premium: true, verificada: false, activa: false, variante: 41, orden: 41},
    {codigo: 'PDP-SMART-RING', nombre: 'Anillo Biomédico Titanio', descripcion: 'Seguimiento invisible de HRV y sueño estilo Oura Ring.', componente: 'PdpSmartRingOura', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 42, orden: 42},
    {codigo: 'PDP-MINI-FRIDGE', nombre: 'Mini Nevera Skincare', descripcion: 'Conservación fría en espejo polarizado para productos belleza.', componente: 'PdpMiniFridge', categoria_id: bellezaCat.id, premium: true, verificada: false, activa: false, variante: 43, orden: 43},
    {codigo: 'PDP-KEYFINDER', nombre: 'Rastreador GPS Minimal', descripcion: 'Llavero magnético sin chips vía red MFi.', componente: 'PdpKeyFinder', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 44, orden: 44},
    {codigo: 'PDP-NUMPAD', nombre: 'Teclado Mecánico Numpad', descripcion: 'Panel numérico hot-swappable RGB formato Hacker Terminal.', componente: 'PdpMechanicalNumeric', categoria_id: targetCat.id, premium: true, verificada: false, activa: false, variante: 45, orden: 45}
  ];

  console.log("Upserting 20 Fourth Wave templates...");
  const { data: upsertData, error: upsertErr } = await supabase
    .from('Plantillas_PDP')
    .upsert(templates, { onConflict: 'codigo' });

  if (upsertErr) {
    console.error("Failed to upsert:", upsertErr);
  } else {
    console.log("SUCCESS! The 20 Fourth Wave CRO templates have been inserted into Supabase with activa=false y verificada=false");
  }
}

run();
