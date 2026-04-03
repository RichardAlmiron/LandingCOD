/**
 * Responsabilidad única: definición de la cadena de modelos de IA.
 */

export interface AIModelConfig {
  id: string;
  name: string;
  level: number;
}

export const AI_MODELS: AIModelConfig[] = [
  { id: 'google/gemini-3.1-flash-lite-preview', name: 'Gemini 3.1 Flash Lite', level: 0 },
  { id: 'anthropic/claude-haiku-4.5', name: 'Claude Haiku 4.5', level: 1 },
  { id: 'anthropic/claude-3.5-haiku', name: 'Claude 3.5 Haiku', level: 2 },
];

/** Mapa nombre legible por model id — usado por el panel admin */
export const MODEL_NAMES: Record<string, string> = Object.fromEntries(
  AI_MODELS.map(m => [m.id, m.name])
);
