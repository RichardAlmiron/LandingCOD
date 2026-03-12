import { createClient } from '@supabase/supabase-js';

const url = 'https://bakmisrdgjpnrwohjcyn.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJha21pc3JkZ2pwbnJ3b2hqY3luIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTYzNjkwNCwiZXhwIjoyMDg1MjEyOTA0fQ.QA3c2yLIt9QtvPEbLRaEvZoG4ptEFkH-TmKSCe2w25g';

const supabase = createClient(url, key);

async function findTheThree() {
    const { data: master } = await supabase.from('catalogo_de_los_productos_del_master').select('name');
    const { data: bodega } = await supabase.from('mis_productos_de_la_bodega').select('name');

    const mNames = new Set((master || []).map(p => p.name?.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "")));
    const bNames = (bodega || []).map(p => p.name?.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));

    const missing = [...new Set(bNames.filter(n => !mNames.has(n)))];
    
    console.log(`- Nombres en Master: ${mNames.size}`);
    console.log(`- Nombres en Bodega no en Master: ${missing.length}`);
    console.log('--- Productos de Bodega faltantes: ---');
    missing.forEach(n => console.log(`  * ${n}`));
}

findTheThree();
