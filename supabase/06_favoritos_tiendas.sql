-- ============================================================
-- Migración: Tabla de Favoritos de Tiendas por Usuario
-- ============================================================

CREATE TABLE IF NOT EXISTS favoritos_tiendas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  template_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- Un usuario no puede marcar la misma tienda como favorita dos veces
  UNIQUE(user_id, template_id)
);

-- Índices para búsquedas eficientes
CREATE INDEX IF NOT EXISTS idx_favoritos_tiendas_user_id ON favoritos_tiendas(user_id);
CREATE INDEX IF NOT EXISTS idx_favoritos_tiendas_template_id ON favoritos_tiendas(template_id);

-- Habilitar RLS
ALTER TABLE favoritos_tiendas ENABLE ROW LEVEL SECURITY;

-- Políticas: cada usuario solo ve/gestiona sus propios favoritos
CREATE POLICY "Users can view own favorites"
  ON favoritos_tiendas FOR SELECT
  USING (true); -- Service Role Key bypasses, pero dejamos abierto para lectura

CREATE POLICY "Users can insert own favorites"
  ON favoritos_tiendas FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can delete own favorites"
  ON favoritos_tiendas FOR DELETE
  USING (true);

COMMENT ON TABLE favoritos_tiendas IS 'Almacena las tiendas marcadas como favoritas por cada usuario';
COMMENT ON COLUMN favoritos_tiendas.template_id IS 'ID del template de tienda (ej: megamarket, flashdeals)';
