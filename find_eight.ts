import { createClient } from '@supabase/supabase-js';

const url = 'https://bakmisrdgjpnrwohjcyn.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJha21pc3JkZ2pwbnJ3b2hqY3luIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTYzNjkwNCwiZXhwIjoyMDg1MjEyOTA0fQ.QA3c2yLIt9QtvPEbLRaEvZoG4ptEFkH-TmKSCe2w25g';

const supabase = createClient(url, key);

async function findTheEight() {
    const { data: b } = await supabase.from('mis_productos_de_la_bodega').select('name, is_active, producto_origen_del_master');
    const { data: m } = await supabase.from('catalogo_de_los_productos_del_master').select('name').eq('is_active', true);

    const mNames = new Set((m || []).map(p => p.name?.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "")));
    
    if (!b) return;

    console.log(`--- Análisis de los 8 "Especiales" de Bodega ---`);
    for (const p of b) {
        const norm = (p.name || '').toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (!mNames.has(norm)) {
             console.log(`* [B] "${p.name}" | Active: ${p.is_active} | Link: ${p.producto_origen_del_master}`);
        }
    }
}

findTheEight();
