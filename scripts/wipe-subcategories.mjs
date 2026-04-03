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
  process.exit(1);
}

const supabase = createClient(url, key);

async function run() {
  const { error } = await supabase.from('Plantillas_PDP').update({ subcategoria_id: null }).neq('codigo', 'none');
  if (error) {
    console.error("Error wiping subcategories:", error);
  } else {
    console.log("Subcategorías limpiadas exitosamente. Todas las plantillas volvieron a su categoría general.");
  }
}

run();
