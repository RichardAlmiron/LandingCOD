-- ============================================================
-- Migración: Rebrand de template IDs en tiendas_publicadas
-- Actualiza los IDs de templates viejos (marcas registradas)
-- a los nuevos IDs originales de LandingCOD
-- ============================================================

UPDATE tiendas_publicadas SET template = CASE template
    WHEN 'amazon' THEN 'megamarket'
    WHEN 'aliexpress' THEN 'flashdeals'
    WHEN 'alibaba' THEN 'tradevault'
    WHEN 'mercadolibre' THEN 'mercadocod'
    WHEN 'ebay' THEN 'bidzone'
    WHEN 'temu' THEN 'pricedrop'
    WHEN 'rakuten' THEN 'cashflow'
    WHEN 'jd' THEN 'primegoods'
    WHEN 'apple' THEN 'minimaltech'
    WHEN 'samsung' THEN 'futuretech'
    WHEN 'bestbuy' THEN 'techretail'
    WHEN 'newegg' THEN 'techparts'
    WHEN 'steam' THEN 'gamevault'
    WHEN 'gamestop' THEN 'progamer'
    WHEN 'g2a' THEN 'keymarket'
    WHEN 'stockx' THEN 'verifymarket'
    WHEN 'tesla' THEN 'futureauto'
    WHEN 'nike' THEN 'boldathlete'
    WHEN 'adidas' THEN 'sportstripe'
    WHEN 'zara' THEN 'editorialchic'
    WHEN 'shein' THEN 'trendfast'
    WHEN 'hm' THEN 'redstyle'
    WHEN 'uniqlo' THEN 'zenbasic'
    WHEN 'asos' THEN 'stylepress'
    WHEN 'gap' THEN 'classicwear'
    WHEN 'oldnavy' THEN 'familyfun'
    WHEN 'lululemon' THEN 'yogapremium'
    WHEN 'gymshark' THEN 'fitmodern'
    WHEN 'supreme' THEN 'hypedrop'
    WHEN 'kith' THEN 'streetboutique'
    WHEN 'boohoo' THEN 'boldyouth'
    WHEN 'plt' THEN 'pinkglam'
    WHEN 'fashionnova' THEN 'novatrend'
    WHEN 'revolve' THEN 'influencestyle'
    WHEN 'ssense' THEN 'avantgarde'
    WHEN 'footlocker' THEN 'sneakerzone'
    WHEN 'zalando' THEN 'eurostyle'
    WHEN 'sephora' THEN 'beautybox'
    WHEN 'ulta' THEN 'beautyhaven'
    WHEN 'glossier' THEN 'softglow'
    WHEN 'lush' THEN 'freshcraft'
    WHEN 'victoriassecret' THEN 'glamangel'
    WHEN 'walmart' THEN 'blueretail'
    WHEN 'target' THEN 'bullseye'
    WHEN 'costco' THEN 'bulkzone'
    WHEN 'macys' THEN 'starstore'
    WHEN 'nordstrom' THEN 'luxservice'
    WHEN 'bloomingdales' THEN 'chicstore'
    WHEN 'saks' THEN 'elitestore'
    WHEN 'farfetch' THEN 'designerhub'
    WHEN 'netaporter' THEN 'luxedit'
    WHEN 'gucci' THEN 'italiancraft'
    WHEN 'louisvuitton' THEN 'heritagelux'
    WHEN 'chanel' THEN 'parisianchic'
    WHEN 'prada' THEN 'milanomodern'
    WHEN 'rolex' THEN 'timecraft'
    WHEN 'cartier' THEN 'maisonelegance'
    WHEN 'tiffany' THEN 'blueclassic'
    WHEN 'pandora' THEN 'charmboutique'
    WHEN 'swarovski' THEN 'crystalshine'
    WHEN 'ikea' THEN 'nordichome'
    WHEN 'wayfair' THEN 'homedecor'
    WHEN 'homedepot' THEN 'builderzone'
    WHEN 'etsy' THEN 'handcraft'
    WHEN 'chewy' THEN 'petfriend'
    WHEN 'petco' THEN 'petworld'
    WHEN 'decathlon' THEN 'sportzone'
    WHEN 'patagonia' THEN 'ecooutdoor'
    WHEN 'thenorthface' THEN 'extremeexplorer'
    WHEN 'iherb' THEN 'greenhealth'
    WHEN 'rayban' THEN 'iconshades'
    WHEN 'oakley' THEN 'sportoptics'
    WHEN 'warbyparker' THEN 'modernlens'
    WHEN 'lenscrafters' THEN 'opticalretail'
    WHEN 'sunglasshut' THEN 'shadeshub'
    ELSE template
END
WHERE template IN (
    'amazon','aliexpress','alibaba','mercadolibre','ebay','temu','rakuten','jd',
    'apple','samsung','bestbuy','newegg','steam','gamestop','g2a','stockx','tesla',
    'nike','adidas','zara','shein','hm','uniqlo','asos','gap','oldnavy',
    'lululemon','gymshark','supreme','kith','boohoo','plt','fashionnova','revolve',
    'ssense','footlocker','zalando','sephora','ulta','glossier','lush','victoriassecret',
    'walmart','target','costco','macys','nordstrom','bloomingdales','saks','farfetch',
    'netaporter','gucci','louisvuitton','chanel','prada','rolex','cartier','tiffany',
    'pandora','swarovski','ikea','wayfair','homedepot','etsy','chewy','petco',
    'decathlon','patagonia','thenorthface','iherb','rayban','oakley','warbyparker',
    'lenscrafters','sunglasshut'
);
