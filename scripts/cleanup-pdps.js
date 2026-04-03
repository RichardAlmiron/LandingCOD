import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Service Role Key in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Las 17 PDPs verificadas originales (solo campos que existen en la tabla)
const pdpTemplatesVerificadas = [
  { id: 'premium-bundle', category: 'premium-bundle', name: 'VITALIFE BUNDLE', description: 'Máxima conversión con bundles y upsells.', premium: true, verified: true },
  { id: 'premium-electronics', category: 'premium-electronics', name: 'NEXUS NOVA X', description: 'Futurista dark mode para tecnología.', premium: true, verified: true },
  { id: 'premium-health', category: 'premium-health', name: 'NURO-BALANCE', description: 'Limpio y clínico para suplementos.', premium: true, verified: true },
  { id: 'premium-urgency', category: 'premium-urgency', name: 'AURA AUDIO', description: 'Agresivo con contadores y escasez.', premium: true, verified: true },
  { id: 'urgency-1', category: 'urgency', name: 'Flash Relámpago', description: 'Rojo intenso, máximo contraste.', verified: true },
  { id: 'trust-1', category: 'trust', name: 'Médico/Clínico', description: 'Azul claro y blanco, máxima pulcritud.', verified: true },
  { id: 'bundle-1', category: 'bundle', name: 'BOGO Clásico', description: 'Verde esmeralda, enfoque en ahorro.', verified: true },
  { id: 'story-1', category: 'story', name: 'El Viaje del Héroe', description: 'Editorial, tipografía serif.', verified: true },
  { id: 'direct-1', category: 'direct', name: 'Fricción Cero', description: 'Blanco absoluto, botón gigante.', verified: true },
  { id: 'health-1', category: 'health', name: 'Clínica Pura', description: 'Blanco y azul médico, máxima confianza.', verified: true },
  { id: 'health-2', category: 'health', name: 'Naturaleza Orgánica', description: 'Tonos verdes y tierra, estilo herbolario.', verified: true },
  { id: 'electronics-1', category: 'electronics', name: 'Modo Oscuro Tech', description: 'Fondo negro, acentos neón azul.', verified: true },
  { id: 'tools-1', category: 'tools', name: 'Constructor Pro', description: 'Amarillo y negro, estilo Caterpillar.', verified: true },
  { id: 'beauty-1', category: 'beauty', name: 'Elegancia Pura', description: 'Tonos nude y tipografía serif.', verified: true },
  { id: 'home-1', category: 'home', name: 'Hogar Cálido', description: 'Tonos terracota y beige.', verified: true },
  { id: 'garantia-1', category: 'trust', name: 'Garantía Total', description: 'Enfocada en eliminar objeciones de COD - garantía de satisfacción, testimonios Paraguay.', premium: true, verified: false },
];

async function cleanup() {
  console.log('🧹 LIMPIEZA DE PDPs...\n');

  // 1. Eliminar TODAS las PDPs existentes
  console.log('1. Eliminando todas las PDPs existentes...');
  await supabase.from('Paginas_de_Productos_Reutilizables').delete().neq('id', 'dummy');
  console.log('   ✓ Todas las PDPs eliminadas\n');

  // 2. Insertar solo las 17 PDPs verificadas + la nueva garantia-1
  console.log('2. Insertando las 17 PDPs verificadas + nueva PDP...');
  const { error } = await supabase.from('Paginas_de_Productos_Reutilizables').insert(pdpTemplatesVerificadas);
  if (error) {
    console.error('   ✗ Error:', error.message);
  } else {
    console.log(`   ✓ Insertadas ${pdpTemplatesVerificadas.length} PDPs exitosamente\n`);
  }

  // 3. Verificar cuántas hay ahora
  console.log('3. Verificando estado final...');
  const { data: todas } = await supabase.from('Paginas_de_Productos_Reutilizables').select('id, name, verified');
  const verificadas = todas?.filter(p => p.verified) || [];
  const noVerificadas = todas?.filter(p => !p.verified) || [];
  
  console.log(`   Total: ${todas?.length || 0}`);
  console.log(`   Verificadas: ${verificadas.length}`);
  console.log(`   No verificadas: ${noVerificadas.length}\n`);

  if (noVerificadas.length > 0) {
    console.log('   PDPs no verificadas:');
    noVerificadas.forEach(p => console.log(`   - ${p.id}: ${p.name}`));
  }

  console.log('\n✅ LIMPIEZA COMPLETADA');
}

cleanup();
