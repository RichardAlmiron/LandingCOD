-- Migración: Limpieza automática de configuraciones antiguas del BuilderFlow
-- Fecha: 2024-03-14
-- Descripción: Elimina configuraciones no accedidas en los últimos 30 días

-- Función para limpiar configuraciones antiguas
CREATE OR REPLACE FUNCTION cleanup_old_builder_configs()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    -- Eliminar configuraciones no accedidas en los últimos 30 días
    -- y que no están vinculadas a una tienda publicada (tienda_id IS NULL)
    DELETE FROM builder_configurations
    WHERE tienda_id IS NULL
      AND last_accessed_at < NOW() - INTERVAL '30 days';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Crear extensión pg_cron si no existe (para scheduled jobs)
-- Nota: Esto requiere que la extensión pg_cron esté disponible en Supabase

-- Programar limpieza diaria a las 3 AM (opcional - si pg_cron está disponible)
-- SELECT cron.schedule('cleanup-builder-configs', '0 3 * * *', 'SELECT cleanup_old_builder_configs()');

-- Comentario de documentación
COMMENT ON FUNCTION cleanup_old_builder_configs() IS 
    'Elimina configuraciones del builder no accedidas en 30+ días y no publicadas';

-- Vista para monitorear configuraciones que serán eliminadas pronto
CREATE OR REPLACE VIEW v_builder_configs_cleanup_preview AS
SELECT 
    id,
    user_id,
    flow_type,
    template,
    current_step,
    last_accessed_at,
    EXTRACT(DAY FROM (NOW() - last_accessed_at)) as days_since_accessed,
    CASE 
        WHEN last_accessed_at < NOW() - INTERVAL '30 days' THEN 'Will be deleted'
        WHEN last_accessed_at < NOW() - INTERVAL '25 days' THEN 'Delete soon (5 days)'
        WHEN last_accessed_at < NOW() - INTERVAL '20 days' THEN 'Delete warning (10 days)'
        ELSE 'Safe'
    END as cleanup_status
FROM builder_configurations
WHERE tienda_id IS NULL
ORDER BY last_accessed_at ASC;

COMMENT ON VIEW v_builder_configs_cleanup_preview IS 
    'Vista para previsualizar qué configuraciones serán eliminadas por la limpieza automática';

-- Índice adicional para optimizar la limpieza
CREATE INDEX IF NOT EXISTS idx_builder_config_cleanup 
ON builder_configurations(last_accessed_at) 
WHERE tienda_id IS NULL;

-- Log de la migración
DO $$
BEGIN
    RAISE NOTICE 'Migración de limpieza de configs antiguas completada exitosamente';
    RAISE NOTICE 'Función cleanup_old_builder_configs() creada';
    RAISE NOTICE 'Vista v_builder_configs_cleanup_preview creada';
    RAISE NOTICE 'Índice idx_builder_config_cleanup creado';
END $$;
