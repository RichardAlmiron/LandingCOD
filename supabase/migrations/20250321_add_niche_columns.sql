-- ============================================================
-- Migración: Agregar columnas 'niche' y 'sub_niche' a Paginas_de_Productos_Reutilizables
-- Fecha: 2025-03-21
-- Propósito: Clasificar cada plantilla PDP por nicho y subnicho
-- para facilitar la selección del cliente en el Landing Code Studio
-- ============================================================

-- Agregar columna niche (categoría principal)
ALTER TABLE "Paginas_de_Productos_Reutilizables"
ADD COLUMN IF NOT EXISTS niche TEXT DEFAULT NULL;

-- Agregar columna sub_niche (subcategoría específica)
ALTER TABLE "Paginas_de_Productos_Reutilizables"
ADD COLUMN IF NOT EXISTS sub_niche TEXT DEFAULT NULL;

-- Índice para consultas rápidas por nicho
CREATE INDEX IF NOT EXISTS idx_pdp_reutilizables_niche
ON "Paginas_de_Productos_Reutilizables"(niche);

-- Comentarios de documentación
COMMENT ON COLUMN "Paginas_de_Productos_Reutilizables".niche IS 'Nicho principal de la plantilla PDP (ej: Electrónica, Salud, Belleza, Hogar, etc.)';
COMMENT ON COLUMN "Paginas_de_Productos_Reutilizables".sub_niche IS 'Subnicho específico de la plantilla PDP (ej: Auriculares, Suplementos, Skincare, etc.)';
