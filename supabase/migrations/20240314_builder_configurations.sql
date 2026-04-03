-- Tabla para almacenar configuración del BuilderFlow (progreso de creación)
CREATE TABLE IF NOT EXISTS builder_configurations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    -- Cuando se publica, se vincula con la tienda
    tienda_id UUID REFERENCES tiendas_publicadas(id) ON DELETE SET NULL,
    -- Tipo de flujo: 'store' o 'pdp'
    flow_type VARCHAR(20) NOT NULL,
    -- Datos completos del storeData (JSONB)
    store_data JSONB NOT NULL,
    -- Template seleccionado
    template VARCHAR(100) NOT NULL,
    -- Estado del flujo (step actual)
    current_step INTEGER DEFAULT 1,
    -- Productos seleccionados (para tienda)
    selected_products JSONB DEFAULT '[]'::jsonb,
    -- Categoría PDP (para PDP)
    pdp_category VARCHAR(50),
    -- Timestamp de creación y actualización
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    -- Último acceso para limpieza de configuraciones antiguas
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Índices para búsquedas eficientes
CREATE INDEX IF NOT EXISTS idx_builder_config_user_id ON builder_configurations(user_id);
CREATE INDEX IF NOT EXISTS idx_builder_config_tienda_id ON builder_configurations(tienda_id);
CREATE INDEX IF NOT EXISTS idx_builder_config_updated ON builder_configurations(updated_at);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_builder_config_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_builder_config_updated ON builder_configurations;
CREATE TRIGGER trigger_builder_config_updated
    BEFORE UPDATE ON builder_configurations
    FOR EACH ROW
    EXECUTE FUNCTION update_builder_config_updated_at();

-- Políticas de seguridad RLS
ALTER TABLE builder_configurations ENABLE ROW LEVEL SECURITY;

-- Usuarios solo pueden ver sus propias configuraciones
CREATE POLICY "Users can view own builder configs"
    ON builder_configurations
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- Usuarios solo pueden crear sus propias configuraciones
CREATE POLICY "Users can create own builder configs"
    ON builder_configurations
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Usuarios solo pueden actualizar sus propias configuraciones
CREATE POLICY "Users can update own builder configs"
    ON builder_configurations
    FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Usuarios solo pueden eliminar sus propias configuraciones
CREATE POLICY "Users can delete own builder configs"
    ON builder_configurations
    FOR DELETE
    TO authenticated
    USING (user_id = auth.uid());

-- Comentarios para documentación
COMMENT ON TABLE builder_configurations IS 'Almacena el progreso de configuración del BuilderFlow para cada usuario';
COMMENT ON COLUMN builder_configurations.store_data IS 'JSON con todos los datos: nombre, descripción, footerConfig, language, etc.';
COMMENT ON COLUMN builder_configurations.selected_products IS 'Array de IDs de productos seleccionados del catálogo';
