-- ============================================================
-- Migración: Soporte para Papelera (Soft Delete)
-- ============================================================

-- 1. Agregar columna deleted_at a Tiendas_Reutilizables
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Tiendas_Reutilizables' AND column_name='deleted_at') THEN
    ALTER TABLE "Tiendas_Reutilizables" ADD COLUMN "deleted_at" TIMESTAMPTZ DEFAULT NULL;
  END IF;
END $$;

-- 2. Agregar columna deleted_at a Paginas_de_Productos_Reutilizables
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Paginas_de_Productos_Reutilizables' AND column_name='deleted_at') THEN
    ALTER TABLE "Paginas_de_Productos_Reutilizables" ADD COLUMN "deleted_at" TIMESTAMPTZ DEFAULT NULL;
  END IF;
END $$;

-- 3. Actualizar políticas de lectura para filtrar las que NO están eliminadas
-- Nota: Para que el carrusel normal no las vea, pero el admin sí (en la papelera)

DROP POLICY IF EXISTS "Lectura pública de tiendas" ON "Tiendas_Reutilizables";
CREATE POLICY "Lectura pública de tiendas" 
  ON "Tiendas_Reutilizables" FOR SELECT USING (deleted_at IS NULL);

DROP POLICY IF EXISTS "Lectura pública de pdps" ON "Paginas_de_Productos_Reutilizables";
CREATE POLICY "Lectura pública de pdps" 
  ON "Paginas_de_Productos_Reutilizables" FOR SELECT USING (deleted_at IS NULL);

-- 4. Crear políticas específicas para que el ADMIN pueda ver las eliminadas
CREATE POLICY "Admin ve tiendas eliminadas" 
  ON "Tiendas_Reutilizables" FOR SELECT USING (true); -- El Service Role ya tiene bypass, pero esto es por claridad

CREATE POLICY "Admin ve pdps eliminados" 
  ON "Paginas_de_Productos_Reutilizables" FOR SELECT USING (true);
