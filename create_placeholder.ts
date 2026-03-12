import * as fs from 'fs';
import * as path from 'path';

const publicDir = path.join(process.cwd(), 'public', 'screenshots');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Crear un placeholder webp mínimo (1x1 transparente)
const webpData = Buffer.from('UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==', 'base64');
fs.writeFileSync(path.join(publicDir, 'placeholder-pdp.webp'), webpData);
fs.writeFileSync(path.join(publicDir, 'placeholder.webp'), webpData);

console.log('Placeholders mínimos creados en public/screenshots/');
