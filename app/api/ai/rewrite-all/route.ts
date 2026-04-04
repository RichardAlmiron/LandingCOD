import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Servicio no disponible' }, { status: 500 });
    }

    const body = await request.json();
    const { flowType, productTitle, productDescription, productCategory, productPrice, productOriginalPrice, aiContext, storeName, elements } = body;

    if (!elements || !Array.isArray(elements) || elements.length === 0) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    const isStore = flowType === 'store';
    const fmtPrice = (n: number) => `Gs. ${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
    const priceInfo = productPrice > 0 ? `
PRECIOS REALES DEL PRODUCTO (OBLIGATORIO usar estos exactos):
- Precio con descuento: ${fmtPrice(productPrice)}
- Precio original (tachado): ${fmtPrice(productOriginalPrice || productPrice)}
- NUNCA inventes precios. Usa EXACTAMENTE estos valores cuando el texto mencione precio.
- Si el texto original tiene un precio, reemplázalo con el precio real de arriba.` : '';

    const elementsList = elements.map((el: any, i: number) =>
      `[${i}] tipo="${el.sectionType}" palabras=${el.wordCount} texto_actual="${el.currentText.slice(0, 100)}${el.currentText.length > 100 ? '...' : ''}"`
    ).join('\n');

    let systemPrompt: string;

    if (isStore) {
      // ── STORE PROMPT ──
      systemPrompt = `Eres un experto en e-commerce COD (Cash on Delivery / Cobro Contra Entrega) para el mercado paraguayo. Vas a adaptar TODOS los textos de una tienda online completa.

TIENDA: ${storeName || 'Tienda Online'}

MERCADO: Paraguay. Todo el contenido debe estar en español latinoamericano natural (Paraguay). Tuteo. Directo. Sin rodeos.

MODELO DE NEGOCIO — COBRO CONTRA ENTREGA:
- El cliente pide el producto online y PAGA EN EFECTIVO cuando lo recibe en su puerta
- Esto es la MAYOR ventaja competitiva. Explotala en cada oportunidad
- Frases clave: "Pedí ahora, pagá al recibir", "Sin riesgo", "Cero pago adelantado", "Tu dinero seguro hasta que lo tengas en tus manos"
- NUNCA digas "compra online", "paga con tarjeta", "transferencia bancaria"

REGLAS DE GARANTÍA (ESTRICTAS):
- SÍ mencionar: "Garantía de Satisfacción", "Compra 100% Segura", "Calidad Garantizada", "Respaldamos tu compra"
- NUNCA mencionar: devolución de dinero, reembolso, cancelación, días de garantía, "30 días", "7 días"
- La garantía se expresa como confianza y seguridad, NUNCA como política de devolución

REGLAS DE CONTENIDO:
1. TODO en español. Si el texto original está en inglés, traducilo y adaptalo al mercado paraguayo
2. Cada texto nuevo debe tener la MISMA longitud aproximada que el original (±30% de palabras)
3. Un botón de 3 palabras = respuesta de 2-4 palabras. NUNCA más
4. Un título de 8 palabras = respuesta de 6-10 palabras
5. CERO emojis ni símbolos decorativos
6. Precios siempre en Guaraníes: "Gs. XXX.XXX"
7. Tono profesional, confiable, cercano. Como una tienda real paraguaya
8. NO toques nada relacionado con productos individuales (nombres, precios, descripciones de productos)
9. Solo adaptá textos de la tienda: headers, banners, secciones informativas, garantía, envío, footer, CTAs generales
10. Cada sección debe ser coherente — es UNA tienda, no textos sueltos
11. NUMERACIÓN: si el texto original tiene un número (1, 2, 3, etc.), tu texto nuevo debe empezar con ESE MISMO número. NO agregues un número extra. Si el original dice "1", tu respuesta debe empezar con "1". NUNCA pongas "11" ni "22".
12. Si el texto original es SOLO un número, devolvé ESE MISMO número sin cambios.

Responde ÚNICAMENTE con un JSON array: [{"i":0,"t":"texto nuevo"},{"i":1,"t":"otro texto"}]
Sin markdown, sin explicaciones. Solo el JSON array.`;
    } else {
      // ── PDP PROMPT ──
      let fullPageContext = '';
      if (aiContext) {
        const sec = aiContext.sections || {};
        fullPageContext = `
COPY YA GENERADO POR LA IA PRINCIPAL (mantén coherencia):
- Título: ${aiContext.enhancedTitle || ''}
- Tagline: ${aiContext.tagline || ''}
- Descripción: ${aiContext.enhancedDescription || ''}
- Headline: ${sec.heroHeadline || ''}
- Beneficios: ${(sec.benefitsBullets || []).join(' | ')}
- Urgencia: ${sec.urgencyText || ''}
- CTA: ${sec.ctaPrimary || ''}
- Cierre: ${sec.closingArgument || ''}
- Nicho: ${aiContext.niche || ''}`;
      }

      systemPrompt = `Eres un copywriter de élite para e-commerce COD (Cash on Delivery) en Latinoamérica. Vas a reescribir TODOS los textos de una página de producto de una sola vez.

PRODUCTO:
- Nombre: ${productTitle}
- Descripción: ${productDescription || 'No disponible'}
- Categoría: ${productCategory || 'General'}
${priceInfo}
${fullPageContext}

MODELO DE NEGOCIO: Cash on Delivery. El cliente paga en efectivo al recibir. Explota esto como ventaja.

REGLAS CRÍTICAS:
1. Cada texto nuevo debe tener EXACTAMENTE la misma cantidad de palabras (±30%) que el original
2. Un botón CTA de 3 palabras = respuesta de 2-4 palabras. NUNCA más
3. Un título de 8 palabras = respuesta de 6-10 palabras
4. Un párrafo de 30 palabras = respuesta de 20-40 palabras
5. IGNORA el contenido actual — es genérico de plantilla. Genera TODO desde cero basado en el producto
6. Español latinoamericano (Paraguay/Colombia). Tuteo. Directo
7. Técnicas CRO: urgencia, escasez, FOMO, prueba social
8. CERO emojis ni símbolos decorativos
9. Precios en Guaraníes: usa EXACTAMENTE los precios reales del producto indicados arriba
10. NUNCA menciones devolución de dinero
11. Cada sección debe ser coherente con las demás — es UNA página, no textos sueltos
12. NUMERACIÓN: si el texto original tiene un número (1, 2, 3, etc.), tu texto nuevo debe empezar con ESE MISMO número. NO agregues un número extra. Si el original dice "1", tu respuesta debe empezar con "1" seguido del texto nuevo. NUNCA pongas "11" ni "22" ni "33".
13. Si el texto original es SOLO un número (como "1", "2", "3"), devolvé ESE MISMO número sin cambios.

Responde ÚNICAMENTE con un JSON array: [{"i":0,"t":"texto nuevo"},{"i":1,"t":"otro texto"}]
Sin markdown, sin explicaciones. Solo el JSON array.`;
    }

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'LandingCOD Rewrite All',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: isStore
            ? `Adaptá estos ${elements.length} textos de la tienda "${storeName || 'Mi Tienda'}" al mercado paraguayo con modelo COD.\n\n${elementsList}\n\nResponde con JSON array: [{"i":0,"t":"..."},{"i":1,"t":"..."}]`
            : `Reescribe estos ${elements.length} textos de la página. Genera contenido 100% nuevo para el producto "${productTitle}".\n\n${elementsList}\n\nResponde con JSON array: [{"i":0,"t":"..."},{"i":1,"t":"..."}]`
          },
        ],
        temperature: 0.85,
        max_tokens: 4000,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || res.statusText);
    }

    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content?.trim();
    if (!raw) throw new Error('Respuesta vacía');

    // Parse JSON array from response
    let json = raw;
    const m = json.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (m) json = m[1].trim();
    const s = json.indexOf('[');
    const e2 = json.lastIndexOf(']');
    if (s !== -1 && e2 !== -1) json = json.substring(s, e2 + 1);

    const results = JSON.parse(json);

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    console.error('[AI Rewrite All] Error:', error);
    return NextResponse.json({ error: 'No se pudo reescribir la página' }, { status: 500 });
  }
}
