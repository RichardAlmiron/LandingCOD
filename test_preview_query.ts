import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// USAR CLAVE ANONIMA para simular al cliente real
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

async function main() {
    const testId = 'beauty-1';
    console.log(`Buscando PDP con ID: ${testId} usando ANON_KEY...`);
    
    // Probar query original
    const { data: pdpTemplate1, error: err1 } = await supabase
      .from('Paginas_de_Productos_Reutilizables')
      .select('category, name, description')
      .or(`id.eq.${testId},template_key.eq.${testId}`)
      .is('deleted_at', null)
      .single();
      
    console.log("Query con OR + template_key:", pdpTemplate1 ? "Exito" : "Fallo", err1?.message);
    
    // Probar query simplificada
    const { data: pdpTemplate2, error: err2 } = await supabase
      .from('Paginas_de_Productos_Reutilizables')
      .select('category, name, description')
      .eq('id', testId)
      .is('deleted_at', null)
      .single();
      
    console.log("Query directa por ID:", pdpTemplate2 ? "Exito" : "Fallo", err2?.message);
}
main();
