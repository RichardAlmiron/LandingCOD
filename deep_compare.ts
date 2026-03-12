import { createClient } from '@supabase/supabase-js';

const url = 'https://bakmisrdgjpnrwohjcyn.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJha21pc3JkZ2pwbnJ3b2hqY3luIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTYzNjkwNCwiZXhwIjoyMDg1MjEyOTA0fQ.QA3c2yLIt9QtvPEbLRaEvZoG4ptEFkH-TmKSCe2w25g';

const supabase = createClient(url, key);

const normalize = (val: string) => (val || '').toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

async function deepCompare() {
    const { data: m } = await supabase.from('catalogo_de_los_productos_del_master').select('name').eq('is_active', true);
    const { data: b } = await supabase.from('mis_productos_de_la_bodega').select('name, is_active');

    const mKeys = new Set((m || []).map(p => normalize(p.name)));
    const bItems = (b || []).map(p => ({
        orig: p.name,
        key: normalize(p.name)
    }));

    console.log(`- Master Activo (Keys): ${mKeys.size}`);
    
    console.log('\n--- Buscando los 8 de Bodega en el Set de Master: ---');
    let foundExtras = 0;
    for (const bi of bItems) {
        if (!mKeys.has(bi.key)) {
            console.log(`  MISSING IN MASTER: "${bi.orig}" (Key: "${bi.key}")`);
            mKeys.add(bi.key); // Para no contar duplicados de bodega
            foundExtras++;
        }
    }
    
    console.log(`\n- Total Únicos Final (M + B): ${mKeys.size}`);
    console.log(`- Extras de bodega integrados: ${foundExtras}`);
}

deepCompare();
