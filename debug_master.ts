import { createClient } from '@supabase/supabase-js';

const url = 'https://bakmisrdgjpnrwohjcyn.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJha21pc3JkZ2pwbnJ3b2hqY3luIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTYzNjkwNCwiZXhwIjoyMDg1MjEyOTA0fQ.QA3c2yLIt9QtvPEbLRaEvZoG4ptEFkH-TmKSCe2w25g';

const supabase = createClient(url, key);

async function debugMaster() {
    const { data: master } = await supabase.from('catalogo_de_los_productos_del_master').select('id, name').eq('is_active', true);
    
    if (!master) return;

    const seenNames = new Map<string, string[]>();
    for (const p of master) {
        const norm = (p.name || 'NULL').toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (!seenNames.has(norm)) seenNames.set(norm, []);
        seenNames.get(norm)!.push(p.name);
    }

    console.log(`- Total activos en Master: ${master.length}`);
    console.log(`- Nombres únicos normalizados: ${seenNames.size}`);
    
    console.log('\n--- Colisiones de nombres (mismo nombre normalizado): ---');
    for (const [norm, originals] of seenNames.entries()) {
        if (originals.length > 1) {
            console.log(`  * [${norm}]: ${originals.join(' | ')}`);
        }
    }
}

debugMaster();
