import fs from 'fs';
const file = 'lib/plantilla-registry.ts';
let code = fs.readFileSync(file, 'utf8');

// The imports block started with "// -- Quinta Oleada (20 Plantillas / Fase 6 - Shopping China) --"
// And ended before "// ────────────────────────────────────────────────────────────\n// REGISTRO ÚNICO:"

const startIndex = code.indexOf('// -- Quinta Oleada (20 Plantillas / Fase 6 - Shopping China) --');
if (startIndex !== -1) {
    const endIndex = code.indexOf('// ────────────────────────────────────────────────────────────', startIndex);
    if (endIndex !== -1) {
        // we keep the divider
        code = code.substring(0, startIndex) + code.substring(endIndex);
    }
}

// The registry entries started with "  // Quinta Oleada 20 Plantillas CRO 15-Secciones (Fase 6)"
const regStart = code.indexOf('  // Quinta Oleada 20 Plantillas CRO 15-Secciones (Fase 6)');
if (regStart !== -1) {
    const regEnd = code.indexOf('};', regStart);
    if (regEnd !== -1) {
        code = code.substring(0, regStart) + '};' + code.substring(regEnd + 2);
    }
}

fs.writeFileSync(file, code, 'utf8');
console.log('Registry purged of Phase 6.');
