-- MIGRACIÓN: Eliminación completa de funcionalidad de traducción de idioma
-- Fecha: 2024-03-14
-- Descripción: Elimina todas las referencias a idioma de la base de datos

-- 1. Eliminar función de limpieza de configuraciones antiguas (si existe)
DROP FUNCTION IF EXISTS cleanup_old_builder_configs();

-- 2. Eliminar vista de preview de limpieza (si existe)
DROP VIEW IF EXISTS v_builder_configs_cleanup_preview;

-- 3. Eliminar índice de limpieza (si existe)
DROP INDEX IF EXISTS idx_builder_config_cleanup;

-- 4. Actualizar registros existentes: eliminar campo language del JSON store_data
-- Esto remueve la propiedad "language" de todos los registros JSON existentes
UPDATE builder_configurations 
SET store_data = store_data - 'language'
WHERE store_data ? 'language';

-- Nota: No eliminamos la tabla builder_configurations, solo limpiamos el campo language
-- La tabla sigue siendo necesaria para guardar el progreso del builder

-- 5. Eliminar trigger de actualización (se recreará sin dependencias de idioma si es necesario)
-- Por ahora lo mantenemos porque solo actualiza updated_at

-- Log de la migración
DO $$
BEGIN
    RAISE NOTICE 'Migración de eliminación de idioma completada:';
    RAISE NOTICE '- Función cleanup_old_builder_configs eliminada';
    RAISE NOTICE '- Vista v_builder_configs_cleanup_preview eliminada';
    RAISE NOTICE '- Índice idx_builder_config_cleanup eliminado';
    RAISE NOTICE '- Campo language removido de todos los registros store_data';
END $$;
