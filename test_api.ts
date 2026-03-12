async function main() {
    try {
        const res = await fetch('http://localhost:3000/api/templates/pdp');
        const data = await res.json();
        console.log("Keys in data:", Object.keys(data));
        if (data.pdps) {
            console.log(`pdps.length = ${data.pdps.length}`);
            console.log("Primer elemento:", JSON.stringify(data.pdps[0], null, 2));
        } else {
            console.log("No existe data.pdps");
        }
    } catch (e) {
        console.error("Error:", e);
    }
}
main();
