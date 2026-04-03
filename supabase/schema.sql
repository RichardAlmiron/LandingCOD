-- ============================================================
-- LandingCOD — Supabase PostgreSQL Schema (Versión en Español)
-- Run this in Supabase → SQL Editor
-- ============================================================

-- Enable UUID extension (should already be enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Usuarios (Users) ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS usuarios (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email         TEXT UNIQUE NOT NULL,
  name          TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  plan          TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  role          TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER usuarios_updated_at
  BEFORE UPDATE ON usuarios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_role  ON usuarios(role);

-- ─── Sesiones Activas (Refresh token storage) ────────────────────────
CREATE TABLE IF NOT EXISTS sesiones_activas (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id              UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  refresh_token_hash   TEXT NOT NULL UNIQUE,
  expires_at           TIMESTAMPTZ NOT NULL,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sesiones_activas_user_id   ON sesiones_activas(user_id);
CREATE INDEX IF NOT EXISTS idx_sesiones_activas_token_hash ON sesiones_activas(refresh_token_hash);
CREATE INDEX IF NOT EXISTS idx_sesiones_activas_expires_at ON sesiones_activas(expires_at);

-- ─── Tiendas Publicadas (Landing pages) ──────────────────────────
CREATE TABLE IF NOT EXISTS tiendas_publicadas (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  identificador_url TEXT UNIQUE NOT NULL,
  name              TEXT NOT NULL DEFAULT 'Mi Tienda',
  template          TEXT NOT NULL DEFAULT 'megamarket',
  pdp_template      TEXT NOT NULL DEFAULT 'urgency-1',
  store_data        JSONB NOT NULL DEFAULT '{}',
  status            TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  verified          BOOLEAN NOT NULL DEFAULT false,
  views             INTEGER NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER tiendas_publicadas_updated_at
  BEFORE UPDATE ON tiendas_publicadas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS idx_tiendas_publicadas_user_id ON tiendas_publicadas(user_id);
CREATE INDEX IF NOT EXISTS idx_tiendas_publicadas_url     ON tiendas_publicadas(identificador_url);
CREATE INDEX IF NOT EXISTS idx_tiendas_publicadas_status  ON tiendas_publicadas(status);
CREATE INDEX IF NOT EXISTS idx_tiendas_publicadas_verified ON tiendas_publicadas(verified);

-- ─── PDPs Publicadas (Páginas de producto independientes) ──────────────
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

-- ─── Row Level Security ───────────────────────────────────────
-- NOTE: Since we use Service Role Key in our API routes, RLS is
-- enforced at the application layer (middleware + JWT). Enable RLS
-- as an extra safety net but our API key bypasses it for server ops.

ALTER TABLE usuarios            ENABLE ROW LEVEL SECURITY;
ALTER TABLE sesiones_activas    ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiendas_publicadas  ENABLE ROW LEVEL SECURITY;
ALTER TABLE pdp_publicadas     ENABLE ROW LEVEL SECURITY;

-- ─── Cleanup job: auto-delete expired sessions ────────────────
-- Run this periodically or use pg_cron (available in Supabase)
-- SELECT cron.schedule('cleanup-sessions', '0 * * * *',
--   'DELETE FROM sesiones_activas WHERE expires_at < NOW()');

-- ─── Seed: first admin user ───────────────────────────────────
-- Replace with your real email and a bcrypt hash.
-- Generate hash: node -e "const b=require('bcryptjs'); b.hash('yourpassword',12).then(console.log)"
--
-- INSERT INTO usuarios (email, name, password_hash, plan, role)
-- VALUES ('admin@landingcod.com', 'Admin', '<bcrypt_hash_here>', 'enterprise', 'admin');
