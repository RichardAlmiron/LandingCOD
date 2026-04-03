/**
 * Auditoría de integridad de base de datos
 * Verifica que todas las plantillas, categorías y subcategorías estén correctamente vinculadas
 */
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  console.log('═══ AUDITORÍA DE INTEGRIDAD DB ═══\n');

  // 1. Categorías
  const { data: cats, error: catErr } = await supabase.from('Categorias_PDP').select('*').order('orden');
  if (catErr) { console.error('ERROR categorías:', catErr); return; }
  console.log(`✓ Categorias_PDP: ${cats.length} registros`);

  // 2. Subcategorías
  const { data: subs, error: subErr } = await supabase.from('Subcategorias_PDP').select('*, Categorias_PDP(nombre)').order('orden');
  if (subErr) { console.error('ERROR subcategorías:', subErr); return; }
  console.log(`✓ Subcategorias_PDP: ${subs.length} registros`);

  // 3. Plantillas
  const { data: plantillas, error: pErr } = await supabase
    .from('Plantillas_PDP')
    .select('*, Categorias_PDP(nombre), Subcategorias_PDP(nombre)')
    .is('deleted_at', null)
    .order('orden');
  if (pErr) { console.error('ERROR plantillas:', pErr); return; }
  console.log(`✓ Plantillas_PDP: ${plantillas.length} registros (activas)\n`);

  // 4. Verificar standard-celulares
  const celulares = plantillas.find(p => p.codigo === 'standard-celulares');
  if (celulares) {
    console.log('═══ PLANTILLA CELULARES ═══');
    console.log(`  Código: ${celulares.codigo}`);
    console.log(`  Nombre: ${celulares.nombre}`);
    console.log(`  Componente: ${celulares.componente}`);
    console.log(`  Categoría: ${celulares.Categorias_PDP?.nombre || 'SIN ASIGNAR'}`);
    console.log(`  Subcategoría: ${celulares.Subcategorias_PDP?.nombre || 'SIN ASIGNAR'}`);
    console.log(`  Verificada: ${celulares.verificada}`);
    console.log(`  Activa: ${celulares.activa}`);
  } else {
    console.log('⚠ standard-celulares NO ENCONTRADA');
  }

  // 5. Verificar integridad de FK
  console.log('\n═══ INTEGRIDAD FK ═══');
  let fkErrors = 0;
  for (const p of plantillas) {
    if (p.categoria_id && !cats.find(c => c.id === p.categoria_id)) {
      console.log(`  ✗ Plantilla "${p.codigo}" tiene categoria_id huérfano: ${p.categoria_id}`);
      fkErrors++;
    }
    if (p.subcategoria_id && !subs.find(s => s.id === p.subcategoria_id)) {
      console.log(`  ✗ Plantilla "${p.codigo}" tiene subcategoria_id huérfano: ${p.subcategoria_id}`);
      fkErrors++;
    }
  }
  if (fkErrors === 0) console.log('  ✓ Todas las FK son válidas');

  // 6. Plantillas sin categoría
  const sinCat = plantillas.filter(p => !p.categoria_id);
  if (sinCat.length > 0) {
    console.log(`\n⚠ ${sinCat.length} plantillas sin categoría asignada:`);
    sinCat.forEach(p => console.log(`  - ${p.codigo}: ${p.nombre}`));
  }

  // 7. Resumen
  console.log('\n═══ RESUMEN ═══');
  console.log(`  Categorías: ${cats.length}`);
  console.log(`  Subcategorías: ${subs.length}`);
  console.log(`  Plantillas activas: ${plantillas.length}`);
  console.log(`  Verificadas: ${plantillas.filter(p => p.verificada).length}`);
  console.log(`  Pendientes: ${plantillas.filter(p => !p.verificada).length}`);
  console.log(`  Errores FK: ${fkErrors}`);
  console.log(`\n✓ Auditoría completada`);
}

main();
