#!/usr/bin/env node
/**
 * Script para corregir TODOS los problemas de las templates de forma sistémica
 * Este script arregla:
 * 1. Variables sin definir (hotDeals, products, etc.)
 * 2. Keys duplicadas usando prefijos únicos
 * 3. Inconsistencias en paginación
 */

const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../components/templates');
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.tsx') && !f.includes('shared') && !f.includes('pdp'));

console.log(`🔍 Procesando ${files.length} templates...\n`);

let fixedFiles = [];
let errors = [];

files.forEach(file => {
  const filePath = path.join(templatesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let fileModified = false;
  
  // ==================== FIX 1: Variables sin definir ====================
  
  // Buscar patrones como {products.map o {hotDeals.map sin definición previa
  const undefinedPatterns = [
    { pattern: /\{products\.map/g, replace: '{data.products.map', var: 'products' },
    { pattern: /\{hotDeals\.map/g, replace: '{data.products.slice(0, 4).map', var: 'hotDeals' },
    { pattern: /\{featuredProducts\.map/g, replace: '{paginatedItems.slice(0, 6).map', var: 'featuredProducts' },
    { pattern: /\{trendingProducts\.map/g, replace: '{paginatedItems.slice(0, 4).map', var: 'trendingProducts' },
    { pattern: /\{recommendedProducts\.map/g, replace: '{paginatedItems.slice(1, 7).map', var: 'recommendedProducts' },
    { pattern: /\{newArrivals\.map/g, replace: '{paginatedItems.slice(0, 6).map', var: 'newArrivals' },
  ];
  
  undefinedPatterns.forEach(({ pattern, replace, var: varName }) => {
    if (pattern.test(content)) {
      // Verificar que la variable no esté definida en el archivo
      const varDeclarationPattern = new RegExp(`(const|let|var)\\s+${varName}\\s*=`);
      if (!varDeclarationPattern.test(content)) {
        content = content.replace(pattern, replace);
        fileModified = true;
        console.log(`  ✓ ${file}: Fixed undefined variable '${varName}'`);
      }
    }
  });
  
  // ==================== FIX 2: Keys duplicadas ====================
  
  // Buscar key={product.id} y reemplazar con keys únicas
  // Usar el nombre del archivo como prefijo + índice + id
  const templateName = file.replace('.tsx', '');
  
  // Patrones de keys que causan duplicados
  const keyPatterns = [
    { 
      pattern: /key=\{(\w+)\.id\}/g, 
      replace: (match, p1, offset, string) => {
        // Encontrar el índice de iteración
        const beforeMatch = string.substring(0, offset);
        const mapMatch = beforeMatch.match(/\.map\((\w+)[,:\s]*\w*\)\s*=>\s*\([^)]*$/);
        if (mapMatch) {
          const indexVar = mapMatch[1];
          return `key={\`${templateName}-\${${indexVar}}-\${${p1}.id}\`}`;
        }
        return match;
      }
    },
    { 
      pattern: /key=\{(\w+)\.id\|\|idx\}/g,
      replace: `key={\`${templateName}-\${idx}-\${$1.id ?? idx}\`}`
    }
  ];
  
  // Aplicar correcciones de keys
  keyPatterns.forEach(({ pattern, replace }) => {
    if (typeof replace === 'function') {
      content = content.replace(pattern, replace);
    } else {
      content = content.replace(pattern, replace);
    }
    fileModified = true;
  });
  
  // Guardar cambios
  if (fileModified && content !== originalContent) {
    fs.writeFileSync(filePath, content);
    fixedFiles.push(file);
  }
});

console.log(`\n✅ Completado! ${fixedFiles.length} archivos modificados:`);
fixedFiles.forEach(f => console.log(`   - ${f}`));

if (errors.length > 0) {
  console.log(`\n❌ Errores encontrados:`);
  errors.forEach(e => console.log(`   - ${e}`));
}
