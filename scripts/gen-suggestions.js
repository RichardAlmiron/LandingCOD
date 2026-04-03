const fs = require('fs');
const path = require('path');

const registryPath = path.join(__dirname, '../lib/plantilla-registry.ts');
const registryCode = fs.readFileSync(registryPath, 'utf-8');

// 1. Map component names to folder paths
const importRegex = /import\s+([A-Za-z0-9_]+)\s+from\s+['"]@\/components\/pdp\/([^'"]+)['"]/g;
const compToPath = {};
let match;
while ((match = importRegex.exec(registryCode)) !== null) {
  const compName = match[1];
  const fullPath = match[2]; // e.g. "electrónico/audio/PdpTranslatorEarbuds"
  const parts = fullPath.split('/');
  if (parts.length >= 3) {
    compToPath[compName] = { cat: parts[0], subcat: parts[1] };
  } else if (parts.length === 2) {
    compToPath[compName] = { cat: parts[0], subcat: 'general' };
  }
}

// 2. Map codes to component names
const registryObjectRegex = /'([^']+)'\s*:\s*{\s*componente:\s*([A-Za-z0-9_]+)/g;
const codeToSuggestion = {};
while ((match = registryObjectRegex.exec(registryCode)) !== null) {
  const code = match[1];
  const compName = match[2];
  if (compToPath[compName]) {
    codeToSuggestion[code] = compToPath[compName];
  }
}

const outputPath = path.join(__dirname, '../lib/template-suggestions.ts');
fs.writeFileSync(outputPath, `export const TEMPLATE_SUGGESTIONS: Record<string, { cat: string, subcat: string }> = ${JSON.stringify(codeToSuggestion, null, 2)};`);

console.log("Suggestions map created successfully.");
