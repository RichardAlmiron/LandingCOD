-- ============================================================
-- Migración: Agregar columna 'verified' a Tiendas_Reutilizables
-- Fecha: 2025-03-15
-- Propósito: Sistema de verificación de plantillas por admin
-- ============================================================

-- Agregar columna verified (boolean, default false) a Tiendas_Reutilizables
ALTER TABLE "Tiendas_Reutilizables" 
ADD COLUMN IF NOT EXISTS verified BOOLEAN NOT NULL DEFAULT false;

-- Agregar columna verified a Paginas_de_Productos_Reutilizables también
ALTER TABLE "Paginas_de_Productos_Reutilizables" 
ADD COLUMN IF NOT EXISTS verified BOOLEAN NOT NULL DEFAULT false;

-- Crear índices para consultas rápidas por estado de verificación
CREATE INDEX IF NOT EXISTS idx_tiendas_reutilizables_verified 
ON "Tiendas_Reutilizables"(verified);

CREATE INDEX IF NOT EXISTS idx_paginas_productos_verified 
ON "Paginas_de_Productos_Reutilizables"(verified);

-- Actualizar todas las plantillas existentes a no verificadas (false)
UPDATE "Tiendas_Reutilizables" 
SET verified = false 
WHERE verified IS NULL;

UPDATE "Paginas_de_Productos_Reutilizables" 
SET verified = false 
WHERE verified IS NULL;

-- Comentarios de documentación
COMMENT ON COLUMN "Tiendas_Reutilizables".verified IS 'Indica si la plantilla fue verificada por el admin y está lista para mostrarse a los clientes';
COMMENT ON COLUMN "Paginas_de_Productos_Reutilizables".verified IS 'Indica si la plantilla PDP fue verificada por el admin y está lista para mostrarse a los clientes';
