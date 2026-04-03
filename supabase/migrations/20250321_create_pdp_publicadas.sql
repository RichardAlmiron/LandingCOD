-- ============================================================
-- Migración: Crear tabla pdp_publicadas
-- Fecha: 2025-03-21
-- Propósito: Separar PDPs publicadas de tiendas publicadas
-- ============================================================

CREATE TABLE IF NOT EXISTS pdp_publicadas (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  identificador_url TEXT UNIQUE NOT NULL,
  name              TEXT NOT NULL DEFAULT 'Mi Página de Producto',
  pdp_template      TEXT NOT NULL DEFAULT 'urgency-1',
  store_data        JSONB NOT NULL DEFAULT '{}',
  status            TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  verified          BOOLEAN NOT NULL DEFAULT false,
  views             INTEGER NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER pdp_publicadas_updated_at
  BEFORE UPDATE ON pdp_publicadas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS idx_pdp_publicadas_user_id ON pdp_publicadas(user_id);
CREATE INDEX IF NOT EXISTS idx_pdp_publicadas_url     ON pdp_publicadas(identificador_url);
CREATE INDEX IF NOT EXISTS idx_pdp_publicadas_status  ON pdp_publicadas(status);
CREATE INDEX IF NOT EXISTS idx_pdp_publicadas_verified ON pdp_publicadas(verified);

-- RLS
ALTER TABLE pdp_publicadas ENABLE ROW LEVEL SECURITY;

-- Permisos
GRANT ALL ON pdp_publicadas TO authenticated;
GRANT ALL ON pdp_publicadas TO service_role;
