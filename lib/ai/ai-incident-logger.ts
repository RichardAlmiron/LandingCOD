/**
 * Responsabilidad única: registrar incidentes de IA en la base de datos.
 */

export interface AIIncident {
  model: string;
  event_type: 'failure' | 'recovery';
  fallback_level: number;
  replaced_by?: string;
  error_message?: string;
  product_title?: string;
  product_id?: string;
  copy_generated?: boolean;
}

export async function logAIIncident(incident: AIIncident): Promise<void> {
  try {
    const { supabase } = await import('../supabase');
    await supabase.from('ai_engine_incidents').insert({
      model: incident.model,
      event_type: incident.event_type,
      fallback_level: incident.fallback_level,
      replaced_by: incident.replaced_by || null,
      error_message: incident.error_message || null,
      product_title: incident.product_title || null,
      product_id: incident.product_id || null,
      copy_generated: incident.copy_generated ?? false,
      read: false,
    });
  } catch (err) {
    console.error('[AI Incidents] Error registrando incidente:', err);
  }
}
