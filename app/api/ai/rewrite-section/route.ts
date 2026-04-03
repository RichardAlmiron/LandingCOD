import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const COST_PER_REWRITE = 1000; // Gs. 1.000 por reescritura

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Servicio no disponible' }, { status: 500 });
    }

    const body = await request.json();
    const { productTitle, productDescription, productCategory, sectionType, currentText, aiContext, surroundingText } = body;

    if (!productTitle || !sectionType || !currentText) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    // Construir contexto del copy general que la IA principal ya generó
    let fullPageContext = '';
    if (aiContext) {
      const sec = aiContext.sections || {};
      fullPageContext = `
COPY COMPLETO DE LA PÁGINA (generado por la IA principal — mantén coherencia con este tono y estilo):
- Título de la página: ${aiContext.enhancedTitle || ''}
- Tagline: ${aiContext.tagline || ''}
- Descripción: ${aiContext.enhancedDescription || ''}
- Headline hero: ${sec.heroHeadline || ''}
- Subheadline hero: ${sec.heroSubheadline || ''}
- Beneficios: ${(sec.benefitsBullets || []).join(' | ')}
- Texto de urgencia: ${sec.urgencyText || ''}
- Prueba social: ${sec.socialProofText || ''}
- Garantía: ${sec.guaranteeText || ''}
- CTA principal: ${sec.ctaPrimary || ''}
- CTA secundario: ${sec.ctaSecondary || ''}
- Argumento de cierre: ${sec.closingArgument || ''}
- Hook storytelling: ${aiContext.storytelling?.hook || ''}
- Pain point: ${aiContext.storytelling?.painPoint || ''}
- Reveal: ${aiContext.storytelling?.reveal || ''}
- Badge autoridad: ${aiContext.authority?.badgeText || ''}
- Nicho detectado: ${aiContext.niche || ''}`;
    }

    let surroundingContext = '';
    if (surroundingText) {
      surroundingContext = `\nTEXTO ALREDEDOR (para que entiendas la zona de la página):\n${surroundingText}`;
    }

    const systemPrompt = `Eres un copywriter de élite para e-commerce COD (Cash on Delivery / Cobro Contra Entrega) en Latinoamérica. Tu trabajo es REESCRIBIR una sección específica de una página de producto.

CONTEXTO DEL PRODUCTO:
- Producto: ${productTitle}
- Descripción: ${productDescription || 'No disponible'}
- Categoría: ${productCategory || 'General'}
${fullPageContext}
${surroundingContext}

MODELO DE NEGOCIO: Cash on Delivery. El cliente paga en efectivo al recibir.

SECCIÓN A REESCRIBIR: ${sectionType}

REGLA CRÍTICA DE COHERENCIA:
Ya existe un copy completo para toda la página (arriba). Tu reescritura DEBE mantener el mismo tono, estilo y nivel de agresividad. No contradigas lo que dice el resto de la página. Si el copy general es urgente y directo, tu reescritura también. Si usa cierto vocabulario, mantén esa línea.

REGLA CRÍTICA DE LONGITUD:
El texto original tiene ${currentText.length} caracteres y ${currentText.split(/\s+/).length} palabras.
Tu reescritura DEBE tener una longitud SIMILAR. No más del doble ni menos de la mitad.
- Si el original tiene 2-5 palabras (botón CTA, badge): responde con 2-5 palabras máximo
- Si el original tiene 5-15 palabras (título, subtítulo): responde con 5-15 palabras
- Si el original tiene 15-40 palabras (párrafo corto): responde con 15-40 palabras
- Si el original tiene 40+ palabras (descripción larga): responde con longitud similar
NUNCA excedas el doble de palabras del original. NUNCA.

REGLAS:
1. Español latinoamericano natural (Paraguay/Colombia). Tuteo. Directo
2. RECREA el texto desde cero. Inventa algo nuevo y mejor
3. Técnicas CRO: escasez, urgencia, FOMO, prueba social, autoridad
4. CERO emojis, íconos ni símbolos decorativos
5. Precios en Guaraníes: "Gs. XXX.XXX"
6. NUNCA menciones devolución de dinero ni reembolso
7. Texto puro, sin HTML ni markdown
8. Específico a este producto y esta sección

Responde SOLO con el texto nuevo. Nada más. Sin comillas, sin explicaciones.`;

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'LandingCOD Section Rewriter',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Sección "${sectionType}" de la página de producto.

El texto actual en esta zona es GENÉRICO de la plantilla y NO tiene relación con el producto real. IGNÓRALO como contenido. Solo úsalo para entender la LONGITUD y el FORMATO que necesitas:

Texto actual (${currentText.split(/\s+/).length} palabras): "${currentText}"

Tu trabajo: GENERA texto NUEVO desde cero para esta sección, 100% basado en el producto "${productTitle}". No copies ni parafrasees el texto actual. Escribe algo completamente nuevo que venda este producto específico.

Responde SOLO con el texto nuevo. Misma longitud aproximada. Texto puro.` },
        ],
        temperature: 0.9,
        max_tokens: 500,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || res.statusText);
    }

    const data = await res.json();
    const newText = data.choices?.[0]?.message?.content?.trim();
    if (!newText) throw new Error('Respuesta vacía');

    return NextResponse.json({
      success: true,
      newText,
      cost: COST_PER_REWRITE,
    });
  } catch (error: any) {
    console.error('[AI Rewrite Section] Error:', error);
    return NextResponse.json({ error: 'No se pudo reescribir la sección' }, { status: 500 });
  }
}
