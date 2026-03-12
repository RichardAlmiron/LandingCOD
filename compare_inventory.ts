import { createClient } from '@supabase/supabase-js';

const url = 'https://bakmisrdgjpnrwohjcyn.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJha21pc3JkZ2pwbnJ3b2hqY3luIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTYzNjkwNCwiZXhwIjoyMDg1MjEyOTA0fQ.QA3c2yLIt9QtvPEbLRaEvZoG4ptEFkH-TmKSCe2w25g';

const supabase = createClient(url, key);

async function compareInventories() {
    console.log('=== COMPARACIÓN DE INVENTARIOS ===\n');

    // 1. Obtener todos del Master
    const { data: masterData } = await supabase.from('catalogo_de_los_productos_del_master').select('id, name');
    const masterNames = new Set((masterData || []).map(p => p.name?.toLowerCase().trim()));
    console.log(`- Master: ${masterData?.length} productos únicos.`);

    // 2. Obtener todos de Bodega
    const { data: bodegaData } = await supabase.from('mis_productos_de_la_bodega').select('id, name, producto_origen_del_master');
    const bodegaUniqueNames = new Set((bodegaData || []).map(p => p.name?.toLowerCase().trim()));
    console.log(`- Bodega: ${bodegaData?.length} filas totales.`);
    console.log(`- Bodega: ${bodegaUniqueNames.size} nombres de productos únicos.`);

    // 3. Productos en Bodega que NO están en el Master (por nombre)
    const missingInMaster = Array.from(bodegaUniqueNames).filter(name => !masterNames.has(name));
    console.log(`- Productos en Bodega que NO están en el Master: ${missingInMaster.length}`);

    if (missingInMaster.length > 0) {
        console.log('\n--- Ejemplos de productos "faltantes" en Master: ---');
        missingInMaster.slice(0, 10).forEach(n => console.log(`  * ${n}`));
    }

    // 4. Unión de ambos (Catálogo Total Real)
    const totalInventoryNames = new Set([...masterNames, ...bodegaUniqueNames]);
    console.log(`\n- INVENTARIO TOTAL CONSOLIDADO (Nombres únicos): ${totalInventoryNames.size}`);
}

compareInventories();
