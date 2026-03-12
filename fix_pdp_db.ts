import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function main() {
    const { data, error } = await supabase.from('Paginas_de_Productos_Reutilizables').select('id, name, deleted_at, category');
    if (error) { console.error('Error:', error.message); return; }
    console.log(`Total PDPs: ${data?.length}`);
    const deleted = data?.filter(d => d.deleted_at !== null) || [];
    console.log(`Borrados (deleted_at no es null): ${deleted.length}`);
    const active = data?.filter(d => d.deleted_at === null) || [];
    console.log(`Activos (deleted_at es null): ${active.length}`);
    
    if (active.length === 0 && deleted.length > 0) {
        console.log('Restaurando todos los PDPs...');
        const { error: updateError } = await supabase.from('Paginas_de_Productos_Reutilizables').update({ deleted_at: null }).neq('id', 'null');
        console.log('Update result:', updateError || 'Success');
    }
}
main();
