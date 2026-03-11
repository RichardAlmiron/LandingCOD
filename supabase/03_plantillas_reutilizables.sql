-- ============================================================
-- Migración: Tablas Independientes para Plantillas (Tiendas y PDP)
-- ============================================================

-- 1. Crear tabla para las tiendas reutilizables (Store Templates)
CREATE TABLE IF NOT EXISTS "Tiendas_Reutilizables" (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  premium BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Crear tabla para las páginas de producto reutilizables (PDP Templates)
CREATE TABLE IF NOT EXISTS "Paginas_de_Productos_Reutilizables" (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Habilitar Seguridad a Nivel de Fila (RLS)
ALTER TABLE "Tiendas_Reutilizables" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Paginas_de_Productos_Reutilizables" ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de Acceso: 
-- Todo el mundo puede leer las plantillas (necesario para el carrusel y clientes)
-- La escritura y eliminación la controlará el Admin a través del API (Service Role Key bypasses RLS)
CREATE POLICY "Lectura pública de tiendas" 
  ON "Tiendas_Reutilizables" FOR SELECT USING (true);

CREATE POLICY "Lectura pública de pdps" 
  ON "Paginas_de_Productos_Reutilizables" FOR SELECT USING (true);
