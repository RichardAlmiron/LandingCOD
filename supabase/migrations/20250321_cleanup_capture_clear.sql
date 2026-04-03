-- ============================================================
-- Migración: Limpieza de funcionalidades obsoletas (Capturar + Analizar y Vaciar)
-- Fecha: 2025-03-21
-- Propósito: Eliminar tabla audit_logs que solo era usada por las funcionalidades
--            de captura automática y limpieza de imágenes (ahora eliminadas).
-- ============================================================

-- 1. Eliminar tabla audit_logs (solo era usada por capture y clear)
DROP TABLE IF EXISTS audit_logs CASCADE;

-- NOTA: El bucket pdp-previews NO se elimina porque sigue siendo usado
-- por /api/templates/pdp/upload para subir imágenes de plantillas manualmente.
