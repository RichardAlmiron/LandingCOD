-- ═══════════════════════════════════════════════════════════════
-- TABLA: ai_engine_incidents
-- Registra fallos y recuperaciones de los motores de IA
-- Ejecutar en la base de datos de LandingCOD (Supabase)
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS ai_engine_incidents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Modelo que falló o se recuperó
    model TEXT NOT NULL,
    
    -- 'failure' = el modelo falló, 'recovery' = el modelo volvió a funcionar
    event_type TEXT NOT NULL CHECK (event_type IN ('failure', 'recovery')),
    
    -- Nivel del modelo: 0 = primario, 1 = fallback 1, 2 = fallback 2
    fallback_level INTEGER NOT NULL DEFAULT 0,
    
    -- Modelo que tomó el relevo (NULL si es recovery o si todos fallaron)
    replaced_by TEXT,
    
    -- Mensaje de error (solo para failures)
    error_message TEXT,
    
    -- Producto que se estaba procesando cuando ocurrió
    product_title TEXT,
    product_id TEXT,
    
    -- Si el sistema logró generar copy a pesar del fallo (via fallback)
    copy_generated BOOLEAN NOT NULL DEFAULT false,
    
    -- Leído por el admin
    read BOOLEAN NOT NULL DEFAULT false,
    
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Índices para consultas rápidas del panel admin
CREATE INDEX IF NOT EXISTS idx_ai_incidents_created ON ai_engine_incidents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_incidents_unread ON ai_engine_incidents(read) WHERE read = false;
CREATE INDEX IF NOT EXISTS idx_ai_incidents_model ON ai_engine_incidents(model, event_type);
