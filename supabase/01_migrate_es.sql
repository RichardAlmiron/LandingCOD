-- ============================================================
-- LandingCOD — Script de Migración (Fase 7)
-- Ejecuta este script en el Supabase SQL Editor para
-- migrar tu base de datos a los nuevos nombres 100% en español
-- agregando la nueva columna para el slug personalizado.
-- ============================================================

-- 1. Renombrar tabla de Sesiones
ALTER TABLE IF EXISTS sesiones_auth RENAME TO sesiones_activas;
ALTER INDEX IF EXISTS idx_sesiones_auth_user_id RENAME TO idx_sesiones_activas_user_id;
ALTER INDEX IF EXISTS idx_sesiones_auth_token_hash RENAME TO idx_sesiones_activas_token_hash;
ALTER INDEX IF EXISTS idx_sesiones_auth_expires_at RENAME TO idx_sesiones_activas_expires_at;

-- 2. Renombrar tabla de Proyectos (Tiendas)
ALTER TABLE IF EXISTS proyectos RENAME TO tiendas_publicadas;
ALTER INDEX IF EXISTS idx_proyectos_user_id RENAME TO idx_tiendas_publicadas_user_id;
ALTER INDEX IF EXISTS idx_proyectos_status RENAME TO idx_tiendas_publicadas_status;
ALTER TRIGGER proyectos_updated_at ON tiendas_publicadas RENAME TO tiendas_publicadas_updated_at;

-- 3. Añadir columna identificador_url (para el Link Personalizado)
-- Primero lo añadimos permitiendo nulos por si tienes datos viejos
ALTER TABLE tiendas_publicadas ADD COLUMN IF NOT EXISTS identificador_url TEXT;

-- (Opcional) Si tienes proyectos viejos, podrías rellenarlos temporalmente:
-- UPDATE tiendas_publicadas SET identificador_url = 'tienda-' || substring(id::text from 1 for 6) WHERE identificador_url IS NULL;

-- Luego forzamos que sea obligatorio y único de ahora en adelante
ALTER TABLE tiendas_publicadas ALTER COLUMN identificador_url SET NOT NULL;
ALTER TABLE tiendas_publicadas ADD CONSTRAINT tiendas_publicadas_identificador_url_key UNIQUE (identificador_url);
CREATE INDEX IF NOT EXISTS idx_tiendas_publicadas_url ON tiendas_publicadas(identificador_url);
