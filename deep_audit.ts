import { createClient } from '@supabase/supabase-js';

const url = 'https://bakmisrdgjpnrwohjcyn.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJha21pc3JkZ2pwbnJ3b2hqY3luIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTYzNjkwNCwiZXhwIjoyMDg1MjEyOTA0fQ.QA3c2yLIt9QtvPEbLRaEvZoG4ptEFkH-TmKSCe2w25g';

const supabase = createClient(url, key);

async function deepAudit() {
    console.log('=== AUDITORÍA PROFUNDA DE PRODUCTOS ===\n');

    // 1. Conteo en Master
    const { count: masterCount } = await supabase.from('catalogo_de_los_productos_del_master').select('*', { count: 'exact', head: true });
    console.log(`- Master (catalogo_de_los_productos_del_master): ${masterCount}`);

    // 2. Conteo en Bodega (Total)
    const { count: bodegaCount } = await supabase.from('mis_productos_de_la_bodega').select('*', { count: 'exact', head: true });
    console.log(`- Bodega (mis_productos_de_la_bodega) Total: ${bodegaCount}`);

    // 3. Conteo en Bodega CON origen en Master
    const { count: withOrigin } = await supabase.from('mis_productos_de_la_bodega').select('*', { count: 'exact', head: true }).not('producto_origen_del_master', 'is', null);
    console.log(`- Bodega CON origen en Master: ${withOrigin}`);

    // 4. Conteo en Bodega SIN origen en Master
    const { count: withoutOrigin } = await supabase.from('mis_productos_de_la_bodega').select('*', { count: 'exact', head: true }).is('producto_origen_del_master', 'null');
    console.log(`- Bodega SIN origen en Master: ${withoutOrigin}`);

    // 5. Nombres únicos en Master
    const { data: masterNames } = await supabase.from('catalogo_de_los_productos_del_master').select('name');
    const uniqueMasterNames = new Set((masterNames || []).map(p => p.name?.toLowerCase().trim()));
    console.log(`- Nombres únicos en Master: ${uniqueMasterNames.size}`);

    // 6. Nombres únicos en Bodega
    const { data: bodegaNames } = await supabase.from('mis_productos_de_la_bodega').select('name');
    const uniqueBodegaNames = new Set((bodegaNames || []).map(p => p.name?.toLowerCase().trim()));
    console.log(`- Nombres únicos en Bodega: ${uniqueBodegaNames.size}`);

    // 7. Unión de nombres (Catalog Total)
    const allNames = new Set([...uniqueMasterNames, ...uniqueBodegaNames]);
    console.log(`\n- TOTAL PRODUCTOS ÚNICOS (Unión Master y Bodega por nombre): ${allNames.size}`);

    // 8. ¿Hay otra tabla?
    const { count: itemsCount } = await supabase.from('items_del_pedido_de_la_bodega').select('*', { count: 'exact', head: true });
    console.log(`- Items historicos (items_del_pedido_de_la_bodega): ${itemsCount}`);
}

deepAudit();
