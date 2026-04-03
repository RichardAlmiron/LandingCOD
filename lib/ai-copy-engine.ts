/**
 * AI Copy Engine V3 — Orquestador de Copywriting con Fallback Multi-Modelo
 * 
 * Responsabilidad única: orquestar la cadena de modelos de IA.
 * Siempre intenta el modelo primario primero. Si falla, baja al siguiente.
 * Registra fallos y recuperaciones para el panel admin.
 * 
 * Delega a módulos SRP:
 *   - ai/ai-models.ts      → definición de modelos
 *   - ai/ai-prompts.ts     → prompts del sistema
 *   - ai/ai-media-strategy.ts → distribución de medios
 *   - ai/ai-incident-logger.ts → registro de incidentes
 */

import { Product } from './types';
import { CopyNiche } from './copy-engine';
import { AI_MODELS } from './ai/ai-models';
import { SYSTEM_PROMPT, buildUserPrompt } from './ai/ai-prompts';
import { buildMediaStrategy, MediaStrategy } from './ai/ai-media-strategy';
import { logAIIncident } from './ai/ai-incident-logger';

// Estado en memoria: último nivel que funcionó (para detectar recuperaciones)
let lastWorkingLevel = 0;

// ── Tipo exportado ──

export interface AIGeneratedContent {
  enhancedDescription: string;
  enhancedTitle: string;
  tagline: string;
  niche: CopyNiche;
  storytelling: { hook: string; painPoint: string; reveal: string };
  authority: { badgeText: string; certification: string };
  comparison: { us: string[]; them: string[] };
  faq: { q: string; a: string }[];
  testimonials: { name: string; text: string; stars: number }[];
  sections: {
    heroHeadline: string;
    heroSubheadline: string;
    benefitsBullets: string[];
    urgencyText: string;
    socialProofText: string;
    guaranteeText: string;
    ctaPrimary: string;
    ctaSecondary: string;
    closingArgument: string;
  };
  mediaStrategy: MediaStrategy;
  _meta: { model: string; modelName: string; fallbackLevel: number; generatedAt: string };
}

// ── Llamada HTTP a OpenRouter ──

async function callModel(product: Product, apiKey: string, model: string): Promise<any> {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      'X-Title': 'LandingCOD AI Copywriter',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildUserPrompt(product) },
      ],
      temperature: 0.8,
      max_tokens: 2500,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`HTTP ${res.status}: ${err?.error?.message || res.statusText}`);
  }

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content;
  if (!raw) throw new Error('Respuesta vacía');

  let json = raw.trim();
  const m = json.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (m) json = m[1].trim();
  const s = json.indexOf('{');
  const e = json.lastIndexOf('}');
  if (s !== -1 && e !== -1) json = json.substring(s, e + 1);

  return JSON.parse(json);
}

// ── Función principal — siempre intenta modelo 1 primero ──

export async function generateAICopy(
  product: Product,
  apiKey: string
): Promise<AIGeneratedContent> {
  const errors: string[] = [];

  for (let level = 0; level < AI_MODELS.length; level++) {
    const { id: model, name: modelName } = AI_MODELS[level];

    try {
      console.log(`[AI Copy] Nivel ${level} (${modelName}): intentando...`);
      const aiResponse = await callModel(product, apiKey, model);
      const mediaStrategy = buildMediaStrategy(product, aiResponse);

      // Detectar recuperación del primario
      if (level === 0 && lastWorkingLevel > 0) {
        console.log(`[AI Copy] RECUPERACIÓN: ${modelName} volvió a funcionar`);
        await logAIIncident({
          model, event_type: 'recovery', fallback_level: 0,
          product_title: product.title, product_id: product.id, copy_generated: true,
        });
      }

      lastWorkingLevel = level;

      // Registrar fallos de los modelos anteriores que no funcionaron
      if (level > 0) {
        for (let f = 0; f < level; f++) {
          await logAIIncident({
            model: AI_MODELS[f].id, event_type: 'failure', fallback_level: f,
            replaced_by: model, error_message: errors[f] || 'Error desconocido',
            product_title: product.title, product_id: product.id, copy_generated: true,
          });
        }
      }

      console.log(`[AI Copy] Éxito con ${modelName} (nivel ${level})`);

      return {
        enhancedDescription: aiResponse.enhancedDescription || product.description,
        enhancedTitle: aiResponse.enhancedTitle || product.title,
        tagline: aiResponse.tagline || '',
        niche: (aiResponse.niche || 'GENERAL_URGENCY') as CopyNiche,
        storytelling: aiResponse.storytelling || { hook: '', painPoint: '', reveal: '' },
        authority: aiResponse.authority || { badgeText: 'CALIDAD VERIFICADA', certification: '' },
        comparison: aiResponse.comparison || { us: [], them: [] },
        faq: aiResponse.faq || [],
        testimonials: aiResponse.testimonials || [],
        sections: aiResponse.sections || {
          heroHeadline: product.title, heroSubheadline: '', benefitsBullets: [],
          urgencyText: '', socialProofText: '', guaranteeText: '',
          ctaPrimary: '¡PEDIR AHORA!', ctaSecondary: 'Paga al recibir', closingArgument: '',
        },
        mediaStrategy,
        _meta: { model, modelName, fallbackLevel: level, generatedAt: new Date().toISOString() },
      };
    } catch (err: any) {
      errors.push(err.message);
      console.error(`[AI Copy] Fallo nivel ${level} (${modelName}):`, err.message);
    }
  }

  // Todos fallaron — registrar fallo total
  for (let f = 0; f < AI_MODELS.length; f++) {
    await logAIIncident({
      model: AI_MODELS[f].id, event_type: 'failure', fallback_level: f,
      error_message: errors[f] || 'Error desconocido',
      product_title: product.title, product_id: product.id, copy_generated: false,
    });
  }

  throw new Error(
    `CRÍTICO: Todos los motores de IA fallaron.\n${errors.map((e, i) => `  Motor ${i} (${AI_MODELS[i].name}): ${e}`).join('\n')}`
  );
}
