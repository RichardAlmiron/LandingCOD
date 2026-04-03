import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase env vars');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function check() {
    const { data, error } = await supabase
        .from('Paginas_de_Productos_Reutilizables')
        .select('*');

    if (error) {
        console.error('Error:', error);
    } else {
        console.log(`Total PDP templates: ${data.length}`);
        console.log('Templates:', data.map(d => ({ id: d.id, name: d.name, verified: d.verified })));
    }
}

check();
