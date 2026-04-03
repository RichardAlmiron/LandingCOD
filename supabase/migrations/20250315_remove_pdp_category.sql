-- Eliminar columna pdp_category de builder_configurations
-- La categoría ahora se deriva del ID del template (ej: "urgency-1" -> categoría "urgency")

ALTER TABLE builder_configurations DROP COLUMN IF EXISTS pdp_category;

-- Comentario para documentar el cambio
COMMENT ON TABLE builder_configurations IS 'Configuraciones del builder - pdp_category eliminado, la categoría se deriva de pdpTemplate en el frontend';
