import { createClient } from '@supabase/supabase-js';

const url = 'https://bakmisrdgjpnrwohjcyn.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJha21pc3JkZ2pwbnJ3b2hqY3luIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTYzNjkwNCwiZXhwIjoyMDg1MjEyOTA0fQ.QA3c2yLIt9QtvPEbLRaEvZoG4ptEFkH-TmKSCe2w25g';

const supabase = createClient(url, key);

async function findDeactivated() {
    const { data: all } = await supabase.from('catalogo_de_los_productos_del_master').select('name, is_active, disabled_by_stock');
    
    if (!all) return;

    const inactive = all.filter(p => !p.is_active);
    const disabledByStock = all.filter(p => p.disabled_by_stock === true);

    console.log(`- Total registros en Master: ${all.length}`);
    console.log(`- Activos: ${all.filter(p => p.is_active).length}`);
    console.log(`- Inactivos: ${inactive.length}`);
    console.log(`- Deshabilitados por stock: ${disabledByStock.length}`);

    if (inactive.length > 0) {
        console.log('\n--- Productos Inactivos: ---');
        inactive.slice(0, 10).forEach(p => console.log(`  * ${p.name} (Stock Disabled: ${p.disabled_by_stock})`));
    }
}

findDeactivated();
