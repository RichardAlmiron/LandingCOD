import fetch from 'node-fetch';

async function testApi() {
    console.log('=== TEST LANDINGCOD API (v2) ===\n');
    try {
        const res = await fetch('http://localhost:3000/api/almidrop/products');
        const data: any = await res.json();
        
        console.log(`- Status: ${res.status}`);
        console.log(`- success: ${data.success}`);
        console.log(`- totalCount: ${data.totalCount}`);
        
        if (data.stats) {
            console.log(`- Stats -> Unique: ${data.stats.unique}`);
            console.log(`- Stats -> Master: ${data.stats.master}`);
            console.log(`- Stats -> Bodega: ${data.stats.bodega}`);
            console.log(`- Stats -> Total Raw: ${data.stats.total_raw}`);
        }

        if (data.products?.length > 0) {
            console.log('\n--- Últimos 5 productos encontrados: ---');
            data.products.slice(-5).forEach((p: any) => console.log(`  * [${p.id}] ${p.title} (Source: ${p.source})`));
        }
    } catch (e: any) {
        console.error('Error connecting to API:', e.message);
    }
}

testApi();
