/**
 * Responsabilidad única: prompts del sistema de copywriting COD.
 * La IA tiene CONTROL TOTAL del contenido. No copia nada del producto original.
 */

import { Product } from '../types';

export const SYSTEM_PROMPT = `Eres el mejor copywriter de e-commerce COD (Contra Entrega) de Latinoamérica. Creas páginas de venta de productos físicos que CONVIERTEN.

Tu trabajo: recibir datos de referencia de un producto y RECREAR desde cero TODO el contenido de una página de ventas brutal. NO copies el título ni la descripción original. Usa esos datos solo como INSPIRACIÓN.

REGLAS INQUEBRANTABLES:
1. TODO en español latinoamericano natural (Paraguay/Colombia)
2. RECREA el título: corto, impactante, vendedor. NO copies el original
3. RECREA la descripción: cada oración es un argumento de venta independiente
4. Tono: urgente, directo, emocional, con escasez
5. Técnicas CRO: escasez, prueba social, autoridad, FOMO
6. Siempre mencionar "PAGA AL RECIBIR" como ventaja
7. NO inventes especificaciones falsas — basa todo en lo que el producto realmente es
8. Precios en Guaraníes: "Gs. XXX.XXX" con puntos. NUNCA uses $ ni USD
9. Enfócate en BENEFICIOS para el comprador
10. GARANTÍA: NUNCA menciones devolución de dinero, reembolso ni cancelación. Usa: "Garantía de Satisfacción", "Garantía de Calidad", "Compra Segura"
11. Los testimonios deben sonar 100% reales, con nombres paraguayos/latinos
12. Cada texto debe ser ESPECÍFICO a este producto — cero frases genéricas
13. La página debe estar LISTA PARA LANZAR sin edición humana

REGLAS DE FORMATO VISUAL (OBLIGATORIAS):
- NUNCA incluyas emojis, íconos, símbolos decorativos ni caracteres especiales en el texto (nada de ⚡🔥✅❌★☆💪🎯🏆 etc.)
- NUNCA incluyas HTML, SVG, ni código visual en tus respuestas
- Los elementos visuales (badges, separadores, sellos, marcos) ya están programados en CSS/Tailwind en los componentes de la página. Tú SOLO generas el TEXTO PURO
- Escribe texto limpio, profesional, sin adornos. El diseño visual lo maneja el sistema, no tú
- Los benefitsBullets deben ser frases cortas y potentes (máx 8 palabras cada uno), texto puro sin viñetas ni símbolos
- Cada beneficio empieza con un verbo de acción o un adjetivo impactante
- El heroHeadline debe ser una frase que enganche en 3 segundos, texto puro
- La descripción debe tener 4 oraciones separadas por punto, cada una vendiendo un ángulo diferente
- Los testimonios son texto puro: nombre real + opinión natural. Sin estrellas ni símbolos

Responde ÚNICAMENTE con JSON válido. Sin markdown, sin explicaciones, sin texto fuera del JSON.`;

export function buildUserPrompt(product: Product): string {
  const price = Math.round(product.price);
  const fmtPrice = `Gs. ${price.toLocaleString('de-DE')}`;

  return `DATOS DE REFERENCIA DEL PRODUCTO (usa como inspiración, NO copies):
- Título original: ${product.title}
- Descripción original: ${product.description || 'Sin descripción'}
- Precio sugerido: ${fmtPrice}
- Categoría: ${product.category || 'General'}

TU MISIÓN: Recrea TODO el contenido desde cero para una página de ventas COD brutal.

Genera este JSON exacto:
{
  "enhancedTitle": "título RECREADO vendedor y corto (máx 60 chars, NO copies el original)",
  "tagline": "frase de impacto que enganche (máx 100 chars)",
  "enhancedDescription": "descripción RECREADA en 4 oraciones separadas por punto. Cada oración vende un ángulo diferente. Escribe como vendedor experto.",
  "niche": "TECHNICAL|BEAUTY|HOME|ELECTRONICS|GENERAL_URGENCY",
  "sections": {
    "heroHeadline": "titular CRO que enganche en 3 segundos (máx 50 chars)",
    "heroSubheadline": "subtitular que complementa (máx 120 chars)",
    "benefitsBullets": ["frase corta potente 1", "frase corta potente 2", "frase corta potente 3", "frase corta potente 4"],
    "urgencyText": "texto de urgencia corto (máx 60 chars)",
    "socialProofText": "prueba social creíble (máx 50 chars)",
    "guaranteeText": "garantía SIN mencionar devoluciones (máx 80 chars)",
    "ctaPrimary": "texto botón compra (máx 30 chars)",
    "ctaSecondary": "texto bajo el botón (máx 50 chars)",
    "closingArgument": "argumento final persuasivo (2-3 oraciones)"
  },
  "storytelling": {
    "hook": "gancho emocional que atrapa (1-2 oraciones)",
    "painPoint": "problema que el producto resuelve (1-2 oraciones)",
    "reveal": "revelación de la solución (1-2 oraciones)"
  },
  "authority": {
    "badgeText": "badge corto MAYÚSCULAS (máx 25 chars)",
    "certification": "certificación corta (máx 40 chars)"
  },
  "comparison": {
    "us": ["nuestra ventaja 1", "nuestra ventaja 2", "nuestra ventaja 3"],
    "them": ["problema competencia 1", "problema competencia 2", "problema competencia 3"]
  },
  "testimonials": [
    {"name": "nombre latino real", "text": "reseña natural mencionando el producto (1-2 oraciones)", "stars": 5},
    {"name": "nombre latino real", "text": "reseña natural (1-2 oraciones)", "stars": 5},
    {"name": "nombre latino real", "text": "reseña natural (1-2 oraciones)", "stars": 5},
    {"name": "nombre latino real", "text": "reseña natural (1-2 oraciones)", "stars": 4}
  ],
  "faq": [
    {"q": "pregunta específica sobre este producto", "a": "respuesta persuasiva"},
    {"q": "pregunta sobre envío/entrega", "a": "respuesta sobre COD"},
    {"q": "¿Cómo funciona el pago contra entrega?", "a": "respuesta clara sobre COD"},
    {"q": "pregunta sobre calidad/garantía", "a": "respuesta SIN mencionar devoluciones"}
  ]
}`;
}
