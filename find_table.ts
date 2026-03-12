import { createClient } from '@supabase/supabase-js';

const url = 'https://bakmisrdgjpnrwohjcyn.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJha21pc3JkZ2pwbnJ3b2hqY3luIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTYzNjkwNCwiZXhwIjoyMDg1MjEyOTA0fQ.QA3c2yLIt9QtvPEbLRaEvZoG4ptEFkH-TmKSCe2w25g';

const supabase = createClient(url, key);

async function findTable() {
    console.log('=== BUSCANDO TABLA "productos" ===\n');
    try {
        const { count, error } = await supabase.from('productos').select('*', { count: 'exact', head: true });
        if (error) {
            console.log(`- [productos] No existe: ${error.message}`);
        } else {
            console.log(`- [productos] EXISTE! Count: ${count}`);
        }
    } catch (e) {}

    // Probar 'products' (ingles)
    try {
        const { count, error } = await supabase.from('products').select('*', { count: 'exact', head: true });
        if (error) {
            console.log(`- [products] No existe: ${error.message}`);
        } else {
            console.log(`- [products] EXISTE! Count: ${count}`);
        }
    } catch (e) {}
}

findTable();
