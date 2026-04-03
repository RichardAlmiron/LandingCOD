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
        } else if (file.endsWith('tsx') && file.includes('pdp')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('./components/pdp');
files.forEach(f => {
    const code = fs.readFileSync(f, 'utf8');
    // Look for "// 1.", "// 15.", etc.
    const sections = code.match(/\/\/\s*\w+\d*\.?\s+/g) || [];
    // Or let's count actual section markers that look like: {/* X. SECT */} or // X.
    const markers = code.match(/(\/\/\s*\d+\.|{\/\*\s*\d+\.)/g) || [];
    if (markers.length < 12 && !f.includes('EnhancedProductGallery') && !f.includes('Video') && !f.includes('index.tsx')) {
        console.log(`${f} -> Sections found: ${markers.length}`);
    }
});
