const http = require('http');

http.get('http://localhost:3000/api/categorias-pdp', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(data);
      console.log(`Total plantillas: ${parsedData.plantillas ? parsedData.plantillas.length : 0}`);
      if (parsedData.plantillas && parsedData.plantillas.length > 0) {
        console.log('Sample of first 5 plantillas:');
        console.log(JSON.stringify(parsedData.plantillas.slice(0, 5), null, 2));
        
        const nonStandard = parsedData.plantillas.filter(p => !p.codigo.startsWith('standard-') && !p.codigo.startsWith('premium-'));
        console.log(`\nNon-standard templates: ${nonStandard.length}`);
        if(nonStandard.length > 0) {
           console.log(JSON.stringify(nonStandard.slice(0, 5), null, 2));
        }
      }
    } catch (e) {
      console.error('Error parsing JSON', e.message);
    }
  });
}).on('error', (err) => {
  console.error('Error fetching data:', err.message);
});
