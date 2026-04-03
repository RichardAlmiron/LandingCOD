const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function captureScreenshots() {
  console.log('Starting screenshot capture V3 (Ultra Stable)...');
  
  const screenshotDir = path.join(process.cwd(), 'public', 'screenshots', 'pdp');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // Delete old small/corrupt files first to ensure fresh capture
  const files = fs.readdirSync(screenshotDir);
  for (const file of files) {
      const fullPath = path.join(screenshotDir, file);
      const stats = fs.statSync(fullPath);
      if (stats.size < 5000) { // Less than 5KB is likely blank
          fs.unlinkSync(fullPath);
      }
  }

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  page.on('console', msg => {
    if (msg.type() === 'error') console.log(`PAGE ERROR:`, msg.text());
  });

  try {
    const response = await fetch('http://localhost:3000/api/templates/pdp');
    const { pdps } = await response.json();

    if (!pdps || pdps.length === 0) {
      console.error('No PDP templates found.');
      await browser.close();
      return;
    }

    const filteredPdps = pdps;
    console.log(`Processing ${filteredPdps.length} templates...`);

    for (const template of filteredPdps) {
      const url = `http://localhost:3000/preview?template=${template.id}&type=pdp`;
      const destPath = path.join(screenshotDir, `${template.id}.webp`);
      
      // Skip if already exists and is valid size (to save time if interrupted)
      if (fs.existsSync(destPath) && fs.statSync(destPath).size > 10000) {
          continue;
      }

      console.log(`Capturing ${template.id}...`);
      
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
        
        // Wait for loader to be GONE and either 'main' or PdpComponent to be PRESENT
        await page.waitForFunction(() => {
            const loader = document.querySelector('.animate-spin');
            const hasContent = document.body.innerText.includes('Pedido') || 
                               document.body.innerText.includes('Producto') || 
                               document.querySelector('button') ||
                               document.querySelector('img[src*="next/image"]');
            return !loader && hasContent;
        }, { timeout: 20000 });

        // Extra generous delay for fonts, images, and animations to stabilize
        await new Promise(r => setTimeout(r, 4000));
        
        // Take the screenshot
        await page.screenshot({
          path: destPath,
          type: 'webp',
          quality: 85,
          clip: { x: 0, y: 0, width: 1280, height: 800 }
        });

        const newSize = fs.statSync(destPath).size;
        if (newSize < 5000) {
            console.warn(`WARNING: Captured ${template.id} but file is suspiciously small (${newSize} bytes)`);
        } else {
            console.log(`Successfully captured ${template.id} (${(newSize/1024).toFixed(1)} KB)`);
        }

      } catch (err) {
        console.error(`Error capturing ${template.id}:`, err.message);
      }
    }

  } catch (err) {
    console.error('Process error:', err);
  } finally {
    await browser.close();
    console.log('Capture V3 finished.');
  }
}

// Polyfill fetch for node < 18 or if it fails
if (typeof fetch === 'undefined') {
  const http = require('http');
  global.fetch = (url) => new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ json: () => JSON.parse(data) }));
    }).on('error', reject);
  });
}

captureScreenshots();
