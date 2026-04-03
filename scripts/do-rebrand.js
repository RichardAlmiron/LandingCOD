const fs = require('fs');
const path = require('path');

// old file name (without .tsx) -> new file name
const FILE_RENAME = {
  'Amazon': 'MegaMarket', 'AliExpress': 'FlashDeals', 'Alibaba': 'TradeVault',
  'MercadoLibre': 'MercadoCOD', 'Ebay': 'BidZone', 'Temu': 'PriceDrop',
  'Rakuten': 'CashFlow', 'JD': 'PrimeGoods', 'Apple': 'MinimalTech',
  'Samsung': 'FutureTech', 'BestBuy': 'TechRetail', 'Newegg': 'TechParts',
  'Steam': 'GameVault', 'GameStop': 'ProGamer', 'G2A': 'KeyMarket',
  'StockX': 'VerifyMarket', 'Tesla': 'FutureAuto', 'Nike': 'BoldAthlete',
  'Adidas': 'SportStripe', 'Zara': 'EditorialChic', 'Shein': 'TrendFast',
  'HM': 'RedStyle', 'Uniqlo': 'ZenBasic', 'Asos': 'StylePress',
  'Gap': 'ClassicWear', 'OldNavy': 'FamilyFun', 'Lululemon': 'YogaPremium',
  'Gymshark': 'FitModern', 'Supreme': 'HypeDrop', 'Kith': 'StreetBoutique',
  'Boohoo': 'BoldYouth', 'PLT': 'PinkGlam', 'FashionNova': 'NovaTrend',
  'Revolve': 'InfluenceStyle', 'SSENSE': 'AvantGarde', 'FootLocker': 'SneakerZone',
  'Sephora': 'BeautyBox', 'Ulta': 'BeautyHaven', 'Glossier': 'SoftGlow',
  'Lush': 'FreshCraft', 'VictoriasSecret': 'GlamAngel', 'Walmart': 'BlueRetail',
  'Target': 'Bullseye', 'Costco': 'BulkZone', 'Macys': 'StarStore',
  'Nordstrom': 'LuxService', 'Bloomingdales': 'ChicStore', 'Saks': 'EliteStore',
  'Farfetch': 'DesignerHub', 'NetAPorter': 'LuxEdit', 'Gucci': 'ItalianCraft',
  'LouisVuitton': 'HeritageLux', 'Chanel': 'ParisianChic', 'Prada': 'MilanoModern',
  'Rolex': 'TimeCraft', 'Cartier': 'MaisonElegance', 'Tiffany': 'BlueClassic',
  'Pandora': 'CharmBoutique', 'Swarovski': 'CrystalShine', 'Ikea': 'NordicHome',
  'Wayfair': 'HomeDecor', 'HomeDepot': 'BuilderZone', 'Etsy': 'HandCraft',
  'Chewy': 'PetFriend', 'Petco': 'PetWorld', 'Decathlon': 'SportZone',
  'Patagonia': 'EcoOutdoor', 'TheNorthFace': 'ExtremeExplorer', 'Iherb': 'GreenHealth',
  'Zalando': 'EuroStyle', 'RayBan': 'IconShades', 'Oakley': 'SportOptics',
  'WarbyParker': 'ModernLens', 'LensCrafters': 'OpticalRetail', 'SunglassHut': 'ShadesHub',
};

// old template id -> new template id
const ID_RENAME = {
  'amazon': 'megamarket', 'aliexpress': 'flashdeals', 'alibaba': 'tradevault',
  'mercadolibre': 'mercadocod', 'ebay': 'bidzone', 'temu': 'pricedrop',
  'rakuten': 'cashflow', 'jd': 'primegoods', 'apple': 'minimaltech',
  'samsung': 'futuretech', 'bestbuy': 'techretail', 'newegg': 'techparts',
  'steam': 'gamevault', 'gamestop': 'progamer', 'g2a': 'keymarket',
  'stockx': 'verifymarket', 'tesla': 'futureauto', 'nike': 'boldathlete',
  'adidas': 'sportstripe', 'zara': 'editorialchic', 'shein': 'trendfast',
  'hm': 'redstyle', 'uniqlo': 'zenbasic', 'asos': 'stylepress',
  'gap': 'classicwear', 'oldnavy': 'familyfun', 'lululemon': 'yogapremium',
  'gymshark': 'fitmodern', 'supreme': 'hypedrop', 'kith': 'streetboutique',
  'boohoo': 'boldyouth', 'plt': 'pinkglam', 'fashionnova': 'novatrend',
  'revolve': 'influencestyle', 'ssense': 'avantgarde', 'footlocker': 'sneakerzone',
  'sephora': 'beautybox', 'ulta': 'beautyhaven', 'glossier': 'softglow',
  'lush': 'freshcraft', 'victoriassecret': 'glamangel', 'walmart': 'blueretail',
  'target': 'bullseye', 'costco': 'bulkzone', 'macys': 'starstore',
  'nordstrom': 'luxservice', 'bloomingdales': 'chicstore', 'saks': 'elitestore',
  'farfetch': 'designerhub', 'netaporter': 'luxedit', 'gucci': 'italiancraft',
  'louisvuitton': 'heritagelux', 'chanel': 'parisianchic', 'prada': 'milanomodern',
  'rolex': 'timecraft', 'cartier': 'maisonelegance', 'tiffany': 'blueclassic',
  'pandora': 'charmboutique', 'swarovski': 'crystalshine', 'ikea': 'nordichome',
  'wayfair': 'homedecor', 'homedepot': 'builderzone', 'etsy': 'handcraft',
  'chewy': 'petfriend', 'petco': 'petworld', 'decathlon': 'sportzone',
  'patagonia': 'ecooutdoor', 'thenorthface': 'extremeexplorer', 'iherb': 'greenhealth',
  'zalando': 'eurostyle', 'rayban': 'iconshades', 'oakley': 'sportoptics',
  'warbyparker': 'modernlens', 'lenscrafters': 'opticalretail', 'sunglasshut': 'shadeshub',
};

const TEMPLATES_DIR = path.join(__dirname, '..', 'components', 'templates');

// Step 1: Rename template files
console.log('=== STEP 1: Renaming template files ===');
for (const [oldName, newName] of Object.entries(FILE_RENAME)) {
  const oldPath = path.join(TEMPLATES_DIR, `${oldName}.tsx`);
  const newPath = path.join(TEMPLATES_DIR, `${newName}.tsx`);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`  ${oldName}.tsx -> ${newName}.tsx`);
  } else {
    console.log(`  SKIP (not found): ${oldName}.tsx`);
  }
}

// Step 2: Update content inside each renamed template file
// Replace brand name references inside the template components
console.log('\n=== STEP 2: Updating template file contents ===');
// Build display name map: oldFile -> { oldDisplayNames, newDisplayName }
const DISPLAY_NAMES = {
  'MegaMarket': { old: ['Amazon'], new: 'MegaMarket' },
  'FlashDeals': { old: ['AliExpress'], new: 'FlashDeals' },
  'TradeVault': { old: ['Alibaba'], new: 'TradeVault' },
  'MercadoCOD': { old: ['MercadoLibre', 'Mercado Libre'], new: 'MercadoCOD' },
  'BidZone': { old: ['eBay', 'Ebay'], new: 'BidZone' },
  'PriceDrop': { old: ['Temu'], new: 'PriceDrop' },
  'CashFlow': { old: ['Rakuten'], new: 'CashFlow' },
  'PrimeGoods': { old: ['JD.com', 'JD'], new: 'PrimeGoods' },
  'MinimalTech': { old: ['Apple'], new: 'MinimalTech' },
  'FutureTech': { old: ['Samsung'], new: 'FutureTech' },
  'TechRetail': { old: ['Best Buy', 'BestBuy'], new: 'TechRetail' },
  'TechParts': { old: ['Newegg'], new: 'TechParts' },
  'GameVault': { old: ['Steam'], new: 'GameVault' },
  'ProGamer': { old: ['GameStop'], new: 'ProGamer' },
  'KeyMarket': { old: ['G2A'], new: 'KeyMarket' },
  'VerifyMarket': { old: ['StockX'], new: 'VerifyMarket' },
  'FutureAuto': { old: ['Tesla'], new: 'FutureAuto' },
  'BoldAthlete': { old: ['Nike'], new: 'BoldAthlete' },
  'SportStripe': { old: ['Adidas', 'adidas'], new: 'SportStripe' },
  'EditorialChic': { old: ['Zara', 'ZARA'], new: 'EditorialChic' },
  'TrendFast': { old: ['SHEIN', 'Shein'], new: 'TrendFast' },
  'RedStyle': { old: ['H&M', 'HM', 'H & M'], new: 'RedStyle' },
  'ZenBasic': { old: ['UNIQLO', 'Uniqlo'], new: 'ZenBasic' },
  'StylePress': { old: ['ASOS', 'Asos'], new: 'StylePress' },
  'ClassicWear': { old: ['Gap', 'GAP'], new: 'ClassicWear' },
  'FamilyFun': { old: ['Old Navy', 'OldNavy'], new: 'FamilyFun' },
  'YogaPremium': { old: ['Lululemon', 'lululemon'], new: 'YogaPremium' },
  'FitModern': { old: ['Gymshark', 'GYMSHARK'], new: 'FitModern' },
  'HypeDrop': { old: ['Supreme', 'SUPREME'], new: 'HypeDrop' },
  'StreetBoutique': { old: ['Kith', 'KITH'], new: 'StreetBoutique' },
  'BoldYouth': { old: ['Boohoo', 'boohoo'], new: 'BoldYouth' },
  'PinkGlam': { old: ['PrettyLittleThing', 'PLT'], new: 'PinkGlam' },
  'NovaTrend': { old: ['Fashion Nova', 'FashionNova'], new: 'NovaTrend' },
  'InfluenceStyle': { old: ['Revolve', 'REVOLVE'], new: 'InfluenceStyle' },
  'AvantGarde': { old: ['SSENSE', 'Ssense'], new: 'AvantGarde' },
  'SneakerZone': { old: ['Foot Locker', 'FootLocker'], new: 'SneakerZone' },
  'BeautyBox': { old: ['Sephora', 'SEPHORA'], new: 'BeautyBox' },
  'BeautyHaven': { old: ['Ulta', 'ULTA'], new: 'BeautyHaven' },
  'SoftGlow': { old: ['Glossier'], new: 'SoftGlow' },
  'FreshCraft': { old: ['Lush', 'LUSH'], new: 'FreshCraft' },
  'GlamAngel': { old: ["Victoria's Secret", 'VictoriasSecret', "Victoria\\'s Secret"], new: 'GlamAngel' },
  'BlueRetail': { old: ['Walmart'], new: 'BlueRetail' },
  'Bullseye': { old: ['Target'], new: 'Bullseye' },
  'BulkZone': { old: ['Costco'], new: 'BulkZone' },
  'StarStore': { old: ["Macy's", 'Macys', "Macy\\'s"], new: 'StarStore' },
  'LuxService': { old: ['Nordstrom'], new: 'LuxService' },
  'ChicStore': { old: ["Bloomingdale's", 'Bloomingdales', "Bloomingdale\\'s"], new: 'ChicStore' },
  'EliteStore': { old: ['Saks Fifth Avenue', 'Saks'], new: 'EliteStore' },
  'DesignerHub': { old: ['Farfetch', 'FARFETCH'], new: 'DesignerHub' },
  'LuxEdit': { old: ['Net-A-Porter', 'NetAPorter', 'NET-A-PORTER'], new: 'LuxEdit' },
  'ItalianCraft': { old: ['Gucci', 'GUCCI'], new: 'ItalianCraft' },
  'HeritageLux': { old: ['Louis Vuitton', 'LouisVuitton', 'LOUIS VUITTON'], new: 'HeritageLux' },
  'ParisianChic': { old: ['Chanel', 'CHANEL'], new: 'ParisianChic' },
  'MilanoModern': { old: ['Prada', 'PRADA'], new: 'MilanoModern' },
  'TimeCraft': { old: ['Rolex', 'ROLEX'], new: 'TimeCraft' },
  'MaisonElegance': { old: ['Cartier', 'CARTIER'], new: 'MaisonElegance' },
  'BlueClassic': { old: ['Tiffany & Co', 'Tiffany', 'TIFFANY'], new: 'BlueClassic' },
  'CharmBoutique': { old: ['Pandora', 'PANDORA'], new: 'CharmBoutique' },
  'CrystalShine': { old: ['Swarovski', 'SWAROVSKI'], new: 'CrystalShine' },
  'NordicHome': { old: ['IKEA', 'Ikea'], new: 'NordicHome' },
  'HomeDecor': { old: ['Wayfair'], new: 'HomeDecor' },
  'BuilderZone': { old: ['Home Depot', 'HomeDepot', 'HOME DEPOT'], new: 'BuilderZone' },
  'HandCraft': { old: ['Etsy'], new: 'HandCraft' },
  'PetFriend': { old: ['Chewy'], new: 'PetFriend' },
  'PetWorld': { old: ['Petco', 'PETCO'], new: 'PetWorld' },
  'SportZone': { old: ['Decathlon', 'DECATHLON'], new: 'SportZone' },
  'EcoOutdoor': { old: ['Patagonia'], new: 'EcoOutdoor' },
  'ExtremeExplorer': { old: ['The North Face', 'TheNorthFace', 'THE NORTH FACE'], new: 'ExtremeExplorer' },
  'GreenHealth': { old: ['iHerb', 'Iherb', 'iherb'], new: 'GreenHealth' },
  'EuroStyle': { old: ['Zalando'], new: 'EuroStyle' },
  'IconShades': { old: ['Ray-Ban', 'RayBan', 'RAY-BAN'], new: 'IconShades' },
  'SportOptics': { old: ['Oakley', 'OAKLEY'], new: 'SportOptics' },
  'ModernLens': { old: ['Warby Parker', 'WarbyParker'], new: 'ModernLens' },
  'OpticalRetail': { old: ['LensCrafters'], new: 'OpticalRetail' },
  'ShadesHub': { old: ['Sunglass Hut', 'SunglassHut'], new: 'ShadesHub' },
};

for (const [newFile, names] of Object.entries(DISPLAY_NAMES)) {
  const filePath = path.join(TEMPLATES_DIR, `${newFile}.tsx`);
  if (!fs.existsSync(filePath)) { console.log(`  SKIP: ${newFile}.tsx not found`); continue; }
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace old brand names with new name (case-sensitive, longest first)
  const sorted = [...names.old].sort((a, b) => b.length - a.length);
  for (const oldName of sorted) {
    // Don't replace inside import paths or component names - only in strings/JSX text
    const escaped = oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    content = content.replace(new RegExp(escaped, 'g'), names.new);
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  Updated ${newFile}.tsx`);
}

// Step 3: Update files that reference templates
console.log('\n=== STEP 3: Updating reference files ===');
const REF_FILES = [
  'components/builder/Preview.tsx',
  'app/t/[identificador_url]/page.tsx',
  'app/t/[identificador_url]/producto/[productId]/page.tsx',
  'app/preview/page.tsx',
  'components/saas/Carousel3D.tsx',
  'components/saas/BuilderFlow.tsx',
];

const ROOT = path.join(__dirname, '..');

for (const relPath of REF_FILES) {
  const filePath = path.join(ROOT, relPath);
  if (!fs.existsSync(filePath)) { console.log(`  SKIP: ${relPath}`); continue; }
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace import paths: /templates/OldName' -> /templates/NewName'
  for (const [oldFile, newFile] of Object.entries(FILE_RENAME)) {
    content = content.replace(
      new RegExp(`/templates/${oldFile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g'),
      `/templates/${newFile}`
    );
    // Replace import variable names: OldNameTemplate -> NewNameTemplate
    content = content.replace(
      new RegExp(`${oldFile}Template`, 'g'),
      `${newFile}Template`
    );
  }

  // Replace template IDs in switch cases, dynamic import keys, etc.
  // We need to be careful to only replace IDs that are used as string literals
  for (const [oldId, newId] of Object.entries(ID_RENAME)) {
    // case 'oldid': -> case 'newid':
    content = content.replace(new RegExp(`case '${oldId}'`, 'g'), `case '${newId}'`);
    // key in object: oldid: dynamic(... or oldid: <Component
    content = content.replace(new RegExp(`^(\\s+)${oldId}:`, 'gm'), `$1${newId}:`);
    // useState<TemplateType>('oldid')
    content = content.replace(new RegExp(`'${oldId}'`, 'g'), `'${newId}'`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  Updated ${relPath}`);
}

console.log('\n=== STEP 4: Updating Carousel3D brand colors ===');
const carouselPath = path.join(ROOT, 'components', 'saas', 'Carousel3D.tsx');
if (fs.existsSync(carouselPath)) {
  let content = fs.readFileSync(carouselPath, 'utf8');
  for (const [oldId, newId] of Object.entries(ID_RENAME)) {
    // Replace keys in BRAND object: oldid: [...] -> newid: [...]
    content = content.replace(new RegExp(`  ${oldId}: \\[`, 'g'), `  ${newId}: [`);
  }
  fs.writeFileSync(carouselPath, content, 'utf8');
  console.log('  Updated Carousel3D.tsx brand colors');
}

console.log('\nDone! All brand references have been replaced.');
