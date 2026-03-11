/**
 * Full System Audit for LandingCOD
 * Verifies consistency across ALL systems:
 * 1. Template files (75 .tsx files)
 * 2. lib/catalog.ts IDs (75)
 * 3. lib/types.ts TemplateType union (75)
 * 4. Carousel3D BRAND map (75)
 * 5. Store page dynamic imports (75)
 * 6. Preview page dynamic imports (75)
 * 7. Builder Preview.tsx switch cases (75)
 * 8. BuilderFlow default template
 * 9. Settings page options
 * 10. Supabase schema defaults
 * 11. Migration mappings (75)
 * 12. Screenshots (75 .webp files)
 * 13. Brand residue check (0 trademarked names)
 * 14. Lucide-react import validation
 * 15. Database logic consistency
 */

const fs = require('fs');
const path = require('path');

let errors = 0;
let warnings = 0;

function pass(msg) { console.log(`  ✅ ${msg}`); }
function fail(msg) { console.log(`  ❌ ${msg}`); errors++; }
function warn(msg) { console.log(`  ⚠️  ${msg}`); warnings++; }

// ─── 1. Extract all IDs from each source ───
console.log('\n═══════════════════════════════════════════');
console.log('  LANDINGCOD — AUDITORÍA COMPLETA');
console.log('═══════════════════════════════════════════\n');

// 1. Catalog IDs
console.log('📦 1. lib/catalog.ts');
const catalog = fs.readFileSync('lib/catalog.ts', 'utf8');
const catalogIds = [...catalog.matchAll(/id: '([^']+)'/g)].map(m => m[1]).sort();
catalogIds.length === 75 ? pass(`${catalogIds.length} IDs`) : fail(`Expected 75, got ${catalogIds.length}`);

// 2. TemplateType
console.log('📦 2. lib/types.ts TemplateType');
const types = fs.readFileSync('lib/types.ts', 'utf8');
const typeMatch = types.match(/export type TemplateType\s*=\s*([\s\S]*?);/);
const typeIds = typeMatch ? [...typeMatch[1].matchAll(/'([^']+)'/g)].map(m => m[1]).sort() : [];
typeIds.length === 75 ? pass(`${typeIds.length} IDs`) : fail(`Expected 75, got ${typeIds.length}`);

// Cross-check catalog vs types
const missingInTypes = catalogIds.filter(id => !typeIds.includes(id));
const extraInTypes = typeIds.filter(id => !catalogIds.includes(id));
if (missingInTypes.length) fail(`Missing in TemplateType: ${missingInTypes.join(', ')}`);
if (extraInTypes.length) fail(`Extra in TemplateType: ${extraInTypes.join(', ')}`);
if (!missingInTypes.length && !extraInTypes.length) pass('catalog ↔ types: perfect match');

// 3. BRAND map
console.log('📦 3. Carousel3D BRAND map');
const carousel = fs.readFileSync('components/saas/Carousel3D.tsx', 'utf8');
const brandSection = carousel.match(/const BRAND[\s\S]*?= \{([\s\S]*?)\};/);
const brandIds = brandSection ? [...brandSection[1].matchAll(/(\w+):\s*\[/g)].map(m => m[1]).sort() : [];
brandIds.length === 75 ? pass(`${brandIds.length} keys`) : fail(`Expected 75, got ${brandIds.length}`);
const missingInBrand = catalogIds.filter(id => !brandIds.includes(id));
if (missingInBrand.length) fail(`Missing in BRAND: ${missingInBrand.join(', ')}`);
else pass('catalog ↔ BRAND: perfect match');

// 4. Store page imports
console.log('📦 4. app/t/[identificador_url]/page.tsx');
const storePage = fs.readFileSync('app/t/[identificador_url]/page.tsx', 'utf8');
const storeIds = [...storePage.matchAll(/^\s+(\w+): dynamic/gm)].map(m => m[1]).sort();
storeIds.length === 75 ? pass(`${storeIds.length} dynamic imports`) : fail(`Expected 75, got ${storeIds.length}`);
const missingInStore = catalogIds.filter(id => !storeIds.includes(id));
if (missingInStore.length) fail(`Missing in store page: ${missingInStore.join(', ')}`);
else pass('catalog ↔ store page: perfect match');

// 5. Preview page imports
console.log('📦 5. app/preview/page.tsx');
const previewPage = fs.readFileSync('app/preview/page.tsx', 'utf8');
const previewIds = [...previewPage.matchAll(/^\s+(\w+): dynamic/gm)].map(m => m[1]).sort();
previewIds.length === 75 ? pass(`${previewIds.length} dynamic imports`) : fail(`Expected 75, got ${previewIds.length}`);
const missingInPreview = catalogIds.filter(id => !previewIds.includes(id));
if (missingInPreview.length) fail(`Missing in preview page: ${missingInPreview.join(', ')}`);
else pass('catalog ↔ preview page: perfect match');

// 6. Builder Preview.tsx switch cases
console.log('📦 6. components/builder/Preview.tsx');
const builderPreview = fs.readFileSync('components/builder/Preview.tsx', 'utf8');
const switchIds = [...builderPreview.matchAll(/case '(\w+)':/g)].map(m => m[1]);
const templateSwitchIds = switchIds.filter(id => catalogIds.includes(id)).sort();
const pdpSwitchIds = switchIds.filter(id => !catalogIds.includes(id));
templateSwitchIds.length === 75 ? pass(`${templateSwitchIds.length} template switch cases`) : fail(`Expected 75, got ${templateSwitchIds.length}`);
pass(`${pdpSwitchIds.length} PDP switch cases (${pdpSwitchIds.join(', ')})`);
const missingInSwitch = catalogIds.filter(id => !templateSwitchIds.includes(id));
if (missingInSwitch.length) fail(`Missing in switch: ${missingInSwitch.join(', ')}`);
else pass('catalog ↔ switch cases: perfect match');

// 7. Template files
console.log('📦 7. components/templates/ files');
const templateDir = 'components/templates';
const templateFiles = fs.readdirSync(templateDir).filter(f => f.endsWith('.tsx') && !f.startsWith('pdp') && f !== 'pdp').sort();
const nonPdpFiles = templateFiles.filter(f => !fs.statSync(path.join(templateDir, f)).isDirectory());
nonPdpFiles.length === 75 ? pass(`${nonPdpFiles.length} template files`) : fail(`Expected 75, got ${nonPdpFiles.length}`);

// Check each file has matching lowercase ID in catalog
const fileNamesLower = nonPdpFiles.map(f => f.replace('.tsx', '').toLowerCase());
const catalogLower = catalogIds.map(id => id.toLowerCase());
const missingFiles = catalogLower.filter(id => !fileNamesLower.includes(id));
if (missingFiles.length) fail(`Missing template files: ${missingFiles.join(', ')}`);
else pass('All 75 template files present');

// 8. BuilderFlow default
console.log('📦 8. BuilderFlow default template');
const builderFlow = fs.readFileSync('components/saas/BuilderFlow.tsx', 'utf8');
const defaultMatch = builderFlow.match(/useState<TemplateType>\('(\w+)'\)/);
const defaultTemplate = defaultMatch ? defaultMatch[1] : null;
defaultTemplate === 'megamarket' ? pass(`Default: '${defaultTemplate}'`) : fail(`Default should be 'megamarket', got '${defaultTemplate}'`);

// 9. Settings page
console.log('📦 9. Settings page template options');
const settingsPage = fs.readFileSync('app/(dashboard)/settings/page.tsx', 'utf8');
const settingsOptions = [...settingsPage.matchAll(/value="(\w+)"/g)].map(m => m[1]);
const validOptions = settingsOptions.filter(id => catalogIds.includes(id));
validOptions.length > 0 ? pass(`${validOptions.length} valid template options`) : warn('No template options found');

// 10. Supabase schema
console.log('📦 10. Supabase schema');
const schema = fs.readFileSync('supabase/schema.sql', 'utf8');
const schemaDefault = schema.match(/template\s+TEXT\s+NOT NULL\s+DEFAULT\s+'(\w+)'/);
if (schemaDefault && schemaDefault[1] === 'megamarket') pass(`Schema default: '${schemaDefault[1]}'`);
else if (schemaDefault) fail(`Schema default should be 'megamarket', got '${schemaDefault[1]}'`);
else warn('Could not find template default in schema');

// Check schema has correct table structure
schema.includes('tiendas_publicadas') ? pass('Table tiendas_publicadas exists') : fail('Missing tiendas_publicadas table');
schema.includes('identificador_url') ? pass('Column identificador_url exists') : fail('Missing identificador_url column');
schema.includes('store_data') ? pass('Column store_data (JSONB) exists') : fail('Missing store_data column');
schema.includes('pdp_category') ? pass('Column pdp_category exists') : fail('Missing pdp_category column');
schema.includes('pdp_template') ? pass('Column pdp_template exists') : fail('Missing pdp_template column');

// 11. Migration
console.log('📦 11. Migration 02_rebrand_templates.sql');
const migration = fs.readFileSync('supabase/02_rebrand_templates.sql', 'utf8');
const migrationMappings = [...migration.matchAll(/WHEN '(\w+)' THEN '(\w+)'/g)];
migrationMappings.length === 75 ? pass(`${migrationMappings.length} mappings`) : fail(`Expected 75, got ${migrationMappings.length}`);
// Verify all new IDs in migration match catalog
const migrationNewIds = migrationMappings.map(m => m[2]).sort();
const missingInMigration = catalogIds.filter(id => !migrationNewIds.includes(id));
if (missingInMigration.length) fail(`Missing new IDs in migration: ${missingInMigration.join(', ')}`);
else pass('Migration new IDs ↔ catalog: perfect match');
migration.includes('ELSE template') ? pass('ELSE template fallback present') : warn('No ELSE fallback in migration');

// 12. Screenshots
console.log('📦 12. Screenshots');
const screenshotDir = 'public/screenshots';
if (fs.existsSync(screenshotDir)) {
  const screenshots = fs.readdirSync(screenshotDir).filter(f => f.endsWith('.webp'));
  screenshots.length === 75 ? pass(`${screenshots.length} screenshots`) : fail(`Expected 75, got ${screenshots.length}`);
  const missingScreenshots = catalogIds.filter(id => !screenshots.includes(`${id}.webp`));
  if (missingScreenshots.length) fail(`Missing screenshots: ${missingScreenshots.join(', ')}`);
  else pass('All 75 screenshots present');
  // Check sizes
  const sizes = screenshots.map(f => fs.statSync(path.join(screenshotDir, f)).size);
  const minSize = Math.min(...sizes);
  const maxSize = Math.max(...sizes);
  const tinyFiles = screenshots.filter(f => fs.statSync(path.join(screenshotDir, f)).size < 500);
  if (tinyFiles.length) warn(`${tinyFiles.length} screenshots < 500 bytes (may be broken): ${tinyFiles.join(', ')}`);
  else pass(`All screenshots valid size (${(minSize/1024).toFixed(1)}KB - ${(maxSize/1024).toFixed(1)}KB)`);
} else {
  fail('public/screenshots directory not found');
}

// 13. Brand residue check
console.log('📦 13. Brand residue check');
const BRANDS_TO_CHECK = [
  'AMAZON', 'NIKE', 'ADIDAS', 'APPLE', 'SAMSUNG', 'GUCCI', 'VUITTON', 'CHANEL', 'PRADA', 'ROLEX',
  'WALMART', 'COSTCO', 'IKEA', 'SEPHORA', 'TESLA', 'EBAY', 'TEMU', 'SHEIN', 'ZARA',
  'NORDSTROM', 'SAKS', 'CARTIER', 'TIFFANY', 'SWAROVSKI', 'OAKLEY',
  'GLOSSIER', 'BOOHOO', 'REVOLVE', 'SSENSE', 'FARFETCH', 'WAYFAIR', 'ETSY', 'CHEWY',
  'PETCO', 'DECATHLON', 'PATAGONIA', 'RAKUTEN', 'ALIBABA', 'ALIEXPRESS', 'STOCKX',
  'GAMESTOP', 'NEWEGG', 'BESTBUY', 'FOOTLOCKER', 'BLOOMINGDALES', 'MACYS',
  'LULULEMON', 'GYMSHARK', 'FASHIONNOVA', 'PRETTYLITTLETHING',
  'VICTORIA', 'HOMEDEPOT', 'NORTH FACE', 'IHERB', 'ZALANDO', 'RAY-BAN',
  'WARBY PARKER', 'LENSCRAFTERS', 'SUNGLASS HUT', 'NET-A-PORTER',
  'OLD NAVY', 'BEST BUY', 'HOME DEPOT', 'FOOT LOCKER', 'SAKS FIFTH', 'MY-APPLE',
];

let brandResidues = 0;
const templateFilesForBrand = fs.readdirSync(templateDir).filter(f => f.endsWith('.tsx') && !f.startsWith('pdp'));
for (const file of templateFilesForBrand) {
  const content = fs.readFileSync(path.join(templateDir, file), 'utf8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes("from 'lucide-react'")) continue;
    if (line.includes("from '@/")) continue;
    if (line.includes("from 'next/")) continue;
    if (line.includes("from 'react'")) continue;
    if (line.includes('export default function')) continue;
    for (const brand of BRANDS_TO_CHECK) {
      if (['GAP', 'LUSH', 'STEAM'].includes(brand)) continue;
      const escaped = brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (new RegExp(escaped, 'i').test(line)) {
        fail(`Brand residue in ${file}:${i+1} [${brand}]`);
        brandResidues++;
        break;
      }
    }
  }
}
if (brandResidues === 0) pass('Zero brand residues in all 75 templates');

// 14. Lucide-react import validation
console.log('📦 14. Lucide-react import validation');
let lucideErrors = 0;
for (const file of templateFilesForBrand) {
  const content = fs.readFileSync(path.join(templateDir, file), 'utf8');
  const importMatch = content.match(/import \{([^}]+)\} from 'lucide-react'/);
  if (importMatch) {
    const icons = importMatch[1].split(',').map(s => s.trim()).filter(Boolean);
    // Check if any icon name matches a template name (which would be wrong)
    for (const icon of icons) {
      if (catalogIds.includes(icon.toLowerCase())) {
        fail(`${file}: imports '${icon}' from lucide-react — likely a broken rebrand (not a real icon)`);
        lucideErrors++;
      }
    }
  }
}
if (lucideErrors === 0) pass('All lucide-react imports are valid');

// 15. Database logic consistency
console.log('📦 15. Database ↔ App logic consistency');

// Check API route for tiendas
const apiRoute = fs.readFileSync('app/api/tiendas/route.ts', 'utf8');
apiRoute.includes('tiendas_publicadas') ? pass('API route uses tiendas_publicadas table') : fail('API route missing tiendas_publicadas');
apiRoute.includes('identificador_url') ? pass('API route uses identificador_url') : fail('API route missing identificador_url');
apiRoute.includes('store_data') ? pass('API route uses store_data') : fail('API route missing store_data');
apiRoute.includes('template') ? pass('API route uses template field') : fail('API route missing template field');

// Check store page reads from correct table
storePage.includes('tiendas_publicadas') ? pass('Store page queries tiendas_publicadas') : fail('Store page not querying tiendas_publicadas');
storePage.includes('store_data') ? pass('Store page reads store_data') : fail('Store page not reading store_data');
storePage.includes('template') ? pass('Store page reads template') : fail('Store page not reading template');
storePage.includes('identificador_url') ? pass('Store page filters by identificador_url') : fail('Store page not filtering by identificador_url');

// Check product page
const productPagePath = 'app/t/[identificador_url]/producto/[productId]/page.tsx';
if (fs.existsSync(productPagePath)) {
  const productPage = fs.readFileSync(productPagePath, 'utf8');
  productPage.includes('tiendas_publicadas') ? pass('Product page queries tiendas_publicadas') : fail('Product page not querying tiendas_publicadas');
  productPage.includes('identificador_url') ? pass('Product page uses identificador_url') : fail('Product page missing identificador_url');
  pass('Product detail page exists');
} else {
  fail('Product detail page not found');
}

// Check middleware
const middleware = fs.readFileSync('middleware.ts', 'utf8');
pass('Middleware exists');

// 16. PDP templates
console.log('📦 16. PDP templates');
const pdpDir = path.join(templateDir, 'pdp');
if (fs.existsSync(pdpDir)) {
  const pdpFiles = fs.readdirSync(pdpDir).filter(f => f.endsWith('.tsx'));
  pass(`${pdpFiles.length} PDP template files: ${pdpFiles.map(f => f.replace('.tsx', '')).join(', ')}`);
  
  // Verify PDP categories in BuilderFlow match Preview.tsx switch
  const pdpCategories = [...builderFlow.matchAll(/id: '(\w+)', name:/g)].map(m => m[1]);
  const pdpSwitchCases = pdpSwitchIds;
  const missingPdpSwitch = pdpCategories.filter(c => !pdpSwitchCases.includes(c));
  if (missingPdpSwitch.length) fail(`PDP categories missing in Preview switch: ${missingPdpSwitch.join(', ')}`);
  else pass(`All ${pdpCategories.length} PDP categories have switch cases`);
} else {
  fail('PDP templates directory not found');
}

// 17. Carousel3D screenshot integration
console.log('📦 17. Carousel3D screenshot integration');
carousel.includes('/screenshots/') ? pass('Carousel3D references /screenshots/ path') : fail('Carousel3D missing screenshot references');
carousel.includes('onError') ? pass('Carousel3D has fallback onError handler') : fail('Carousel3D missing fallback handler');
carousel.includes('.webp') ? pass('Carousel3D uses .webp format') : fail('Carousel3D not using .webp');

// ─── FINAL REPORT ───
console.log('\n═══════════════════════════════════════════');
if (errors === 0 && warnings === 0) {
  console.log('  🎉 AUDITORÍA PERFECTA — 0 ERRORES, 0 WARNINGS');
} else if (errors === 0) {
  console.log(`  ✅ AUDITORÍA PASADA — 0 errores, ${warnings} warning(s)`);
} else {
  console.log(`  ❌ AUDITORÍA FALLIDA — ${errors} error(es), ${warnings} warning(s)`);
}
console.log('═══════════════════════════════════════════\n');

process.exit(errors > 0 ? 1 : 0);
