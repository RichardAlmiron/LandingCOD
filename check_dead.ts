import { createClient } from '@supabase/supabase-js';

const url = 'https://bakmisrdgjpnrwohjcyn.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJha21pc3JkZ2pwbnJ3b2hqY3luIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTYzNjkwNCwiZXhwIjoyMDg1MjEyOTA0fQ.QA3c2yLIt9QtvPEbLRaEvZoG4ptEFkH-TmKSCe2w25g';

const supabase = createClient(url, key);

async function checkDead() {
    console.log('=== CHEQUEO DE PRODUCTOS INACTIVOS ===\n');

    const { count: total } = await supabase.from('catalogo_de_los_productos_del_master').select('*', { count: 'exact', head: true });
    const { count: active } = await supabase.from('catalogo_de_los_productos_del_master').select('*', { count: 'exact', head: true }).eq('is_active', true);
    const { count: inactive } = await supabase.from('catalogo_de_los_productos_del_master').select('*', { count: 'exact', head: true }).eq('is_active', false);
    
    console.log(`- Total en Master: ${total}`);
    console.log(`- Activos: ${active}`);
    console.log(`- Inactivos: ${inactive}`);

    const { data: names } = await supabase.from('catalogo_de_los_productos_del_master').select('name');
    const nameCounts: Record<string, number> = {};
    (names || []).forEach(p => {
        const n = p.name?.toLowerCase().trim();
        nameCounts[n] = (nameCounts[n] || 0) + 1;
    });

    const duplicates = Object.entries(nameCounts).filter(([_, count]) => count > 1);
    console.log(`\n- Nombres duplicados en Master: ${duplicates.length}`);
    if (duplicates.length > 0) {
        console.log('--- Ejemplos de duplicados: ---');
        duplicates.slice(0, 10).forEach(([n, c]) => console.log(`  * ${n} (${c} veces)`));
    }
}

checkDead();
