const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../components/templates');
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.tsx') && !f.includes('shared'));

console.log(`Found ${files.length} template files to process`);

let fixedKeys = 0;
let fixedVars = 0;

files.forEach(file => {
  const filePath = path.join(templatesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix 1: Replace key={product.id} with key={`${file}-${idx}-${product.id}`} to ensure uniqueness
  // This pattern finds map functions with key={product.id} and adds file prefix + index
  const keyProductIdPattern = /\{([\w\.]+)\.map\((\w+)[,:\s]*\w*\)\s*=>\s*\([^)]*key=\{(\w+)\.id\}/g;
  
  // Fix 2: Find undefined variables like hotDeals, products being used without declaration
  // Replace with data.products.slice()
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${file}`);
  }
});

console.log(`Fixed ${fixedKeys} duplicate keys and ${fixedVars} undefined variables`);
