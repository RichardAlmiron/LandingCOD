import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function main() {
    const { data } = await supabase.from('Paginas_de_Productos_Reutilizables').select('*').limit(1);
    console.log(data ? Object.keys(data[0]) : "No data");
    
    const { data: stores } = await supabase.from('Tiendas_Reutilizables').select('*').limit(1);
    console.log(stores ? Object.keys(stores[0]) : "No store data");
}
main();
