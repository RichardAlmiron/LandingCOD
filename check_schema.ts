import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function main() {
    const { data: pdpCols } = await supabase.from('Paginas_de_Productos_Reutilizables').select('*').limit(1);
    console.log("PDP cols:", pdpCols ? Object.keys(pdpCols[0]) : 'None');

    const { data: storeCols } = await supabase.from('Tiendas_Reutilizables').select('*').limit(1);
    console.log("Store cols:", storeCols ? Object.keys(storeCols[0]) : 'None');
    
    // Check if there is another table with PDP in name
    const { data: dbTables, error } = await supabase.rpc('get_tables'); // Or just using postgrest to query information_schema if possible...
    // We'll do a raw postgres query if needed, but let's just see Store cols first.
}
main();
