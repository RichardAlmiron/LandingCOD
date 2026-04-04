-- ============================================================
-- MIGRACIÓN: Tabla de Usuarios Externos para LandingCOD
-- Fecha: 2026-04-04
-- Propósito: Usuarios que NO son de Almidrop y se registran
--            directamente en LandingCOD.
-- ============================================================

CREATE TABLE IF NOT EXISTS "usuarios_externos" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(200) NOT NULL,
    phone VARCHAR(50),
    city VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_usuarios_externos_email ON "usuarios_externos"(email);

ALTER TABLE "usuarios_externos" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura propia" ON "usuarios_externos" FOR SELECT USING (true);
CREATE POLICY "Inserción pública" ON "usuarios_externos" FOR INSERT WITH CHECK (true);
CREATE POLICY "Actualización propia" ON "usuarios_externos" FOR UPDATE USING (true);

CREATE OR REPLACE FUNCTION actualizar_timestamp_usuarios_externos()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_actualizar_usuarios_externos ON "usuarios_externos";
CREATE TRIGGER trigger_actualizar_usuarios_externos
    BEFORE UPDATE ON "usuarios_externos"
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_timestamp_usuarios_externos();

COMMENT ON TABLE "usuarios_externos" IS 'Usuarios que se registran directamente en LandingCOD sin ser de Almidrop';
