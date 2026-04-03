import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        if (file === 'node_modules' || file === '.next' || file === '.git') return;
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('tsx') && file.includes('pdp') && !file.includes('Enhanced')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('components/pdp');
let fixedCount = 0;

files.forEach(f => {
    let code = fs.readFileSync(f, 'utf8');
    let original = code;
    
    // Safely remove "aspect-square" and "overflow-hidden" from the container wrapping EnhancedProductGallery
    // Typically it's: className="... aspect-square ... overflow-hidden" 
    // But ONLY if EnhancedProductGallery is inside it or near it. Actually, just targeting that specific div is fine.
    
    // Let's do a regex that finds a className string containing both, right before EnhancedProductGallery
    // Regex: className="([^"]*aspect-square[^"]*overflow-hidden[^"]*)"
    // Or simpler: just replace "aspect-square " with "" and "overflow-hidden" with "" around the hero gallery area.
    
    if (code.includes('EnhancedProductGallery')) {
        // Look for the specific motion.div or div that wraps it
        // We will replace "aspect-square" and "overflow-hidden" from lines near EnhancedProductGallery
        
        let lines = code.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('EnhancedProductGallery')) {
                // Look up to 10 lines backwards for the wrapper div
                for (let j = Math.max(0, i - 10); j <= i; j++) {
                    if (lines[j].includes('aspect-square') && lines[j].includes('overflow-hidden') && lines[j].includes('className')) {
                        lines[j] = lines[j].replace('aspect-square', '').replace('overflow-hidden', '');
                        // clean up extra spaces
                        lines[j] = lines[j].replace(/\s+/g, ' ');
                    }
                }
            }
        }
        
        const newCode = lines.join('\n');
        if (newCode !== original) {
            fs.writeFileSync(f, newCode, 'utf8');
            fixedCount++;
            console.log(`Fixed gallery clipping in: ${f}`);
        }
    }
});

console.log(`\nOperation complete. Fixed ${fixedCount} files.`);
