import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function main() {
    // Tiendas
    const { data: stores } = await supabase.from('Tiendas_Reutilizables').select('*').limit(1);
    console.log('\n=== Tiendas_Reutilizables (columnas) ===');
    if (stores?.[0]) console.log(Object.keys(stores[0]).join(' | '));
    if (stores?.[0]) console.log(JSON.stringify(stores[0], null, 2));

    // PDPs
    const { data: pdps } = await supabase.from('Paginas_de_Productos_Reutilizables').select('*').limit(2);
    console.log('\n=== Paginas_de_Productos_Reutilizables (columnas) ===');
    if (pdps?.[0]) console.log(Object.keys(pdps[0]).join(' | '));
    pdps?.forEach((r, i) => console.log(`[${i+1}]`, JSON.stringify(r, null, 2)));
}
main();
