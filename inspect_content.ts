import { createClient } from '@supabase/supabase-js';

const url = 'https://bakmisrdgjpnrwohjcyn.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJha21pc3JkZ2pwbnJ3b2hqY3luIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTYzNjkwNCwiZXhwIjoyMDg1MjEyOTA0fQ.QA3c2yLIt9QtvPEbLRaEvZoG4ptEFkH-TmKSCe2w25g';

const supabase = createClient(url, key);

async function inspectContent() {
    console.log('=== INSPECCIONANDO CONTENIDO DE "productos" ===\n');
    
    const { data: productos, error: err1 } = await supabase.from('productos').select('*').limit(5);
    if (err1) {
        console.log(`- [productos] Error al leer: ${err1.message}`);
    } else {
        console.log(`- [productos] Filas obtenidas: ${productos?.length}`);
        console.log(JSON.stringify(productos, null, 2));
    }

    const { data: products, error: err2 } = await supabase.from('products').select('*').limit(5);
    if (err2) {
        console.log(`- [products] Error al leer: ${err2.message}`);
    } else {
        console.log(`- [products] Filas obtenidas: ${products?.length}`);
        console.log(JSON.stringify(products, null, 2));
    }
}

inspectContent();
