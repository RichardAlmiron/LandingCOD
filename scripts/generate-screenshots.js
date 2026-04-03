import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const screenshotsDir = path.join(__dirname, '..', 'public', 'screenshots');

// Ensure the screenshots directory exists
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// List of all 75 templates from catalog.ts
const templates = [
  'megamarket', 'flashdeals', 'tradevault', 'mercadocod', 'bidzone', 'pricedrop', 'cashflow', 'primegoods',
  'minimaltech', 'futuretech', 'techretail', 'techparts', 'gamevault', 'progamer', 'keymarket', 'verifymarket', 'futureauto',
  'boldathlete', 'sportstripe', 'editorialchic', 'trendfast', 'redstyle', 'zenbasic', 'stylepress', 'classicwear', 'familyfun', 'yogapremium', 'fitmodern', 'hypedrop', 'streetboutique', 'boldyouth', 'pinkglam', 'novatrend', 'influencestyle', 'avantgarde', 'sneakerzone', 'eurostyle',
  'beautybox', 'beautyhaven', 'softglow', 'freshcraft', 'glamangel',
  'blueretail', 'bullseye', 'bulkzone', 'starstore', 'luxservice', 'chicstore',
  'elitestore', 'designerhub', 'luxedit', 'italiancraft', 'heritagelux', 'parisianchic', 'milanomodern', 'timecraft', 'maisonelegance', 'blueclassic', 'charmboutique', 'crystalshine',
  'nordichome', 'homedecor', 'builderzone', 'handcraft', 'petfriend', 'petworld',
  'sportzone', 'ecooutdoor', 'extremeexplorer', 'greenhealth',
  'iconshades', 'sportoptics', 'modernlens', 'opticalretail', 'shadeshub'
];

const TARGET_URL = 'http://localhost:3000/preview?template=';

async function generateScreenshots() {
  console.log(`Starting screenshot generation for ${templates.length} templates...`);
  
  // Launch Puppeteer
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] 
  });
  
  const page = await browser.newPage();
  
  // Set viewport to exact 400x600 size for cards
  await page.setViewport({ width: 400, height: 600, deviceScaleFactor: 2 });

  let successCount = 0;
  let failCount = 0;

  for (const template of templates) {
    console.log(`[${successCount + failCount + 1}/${templates.length}] Capturing ${template}...`);
    try {
      // Go to the specific template and wait for network to be idle
      await page.goto(`${TARGET_URL}${template}`, { 
        waitUntil: 'networkidle0',
        timeout: 15000 
      });

      // Inject a script to hide the generic loader or hide scroll/ui if needed
      await page.evaluate(() => {
        // Hiding scrollbars globally just in case
        const style = document.createElement('style');
        style.innerHTML = `
          ::-webkit-scrollbar { display: none !important; }
          body { -ms-overflow-style: none; scrollbar-width: none; overflow: hidden; }
        `;
        document.head.appendChild(style);
        
        // Wait an extra gentle 300ms for internal react mounts/animations (framer motion hooks, etc)
        return new Promise(resolve => setTimeout(resolve, 300));
      });

      // Save as WEBP directly
      const destPath = path.join(screenshotsDir, `${template}.webp`);
      await page.screenshot({ 
        path: destPath,
        type: 'webp',
        quality: 90,
        clip: { x: 0, y: 0, width: 400, height: 600 } // Ensures absolute strict 400x600
      });

      console.log(`  -> Saved ${template}.webp`);
      successCount++;
    } catch (err) {
      console.error(`  -> Failed to capture ${template}:`, err.message);
      failCount++;
    }
  }

  await browser.close();
  console.log(`\nDone! Successfully generated ${successCount} screenshots. Failed: ${failCount}`);
}

generateScreenshots();
