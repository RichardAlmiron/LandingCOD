-- MIGRACIÓN: Crear tabla para descuentos de productos
-- Fecha: 2024-03-14
-- Descripción: Tabla independiente para guardar descuentos por producto y global

-- 1. Crear tabla de descuentos por producto
CREATE TABLE IF NOT EXISTS product_discounts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    discount_percent INTEGER NOT NULL CHECK (discount_percent >= 0 AND discount_percent <= 100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- 2. Crear índices para búsqueda rápida
CREATE INDEX IF NOT EXISTS idx_product_discounts_user_id ON product_discounts(user_id);
CREATE INDEX IF NOT EXISTS idx_product_discounts_product_id ON product_discounts(product_id);
CREATE INDEX IF NOT EXISTS idx_product_discounts_active ON product_discounts(is_active);

-- 3. Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_product_discounts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_product_discounts ON product_discounts;

CREATE TRIGGER trigger_update_product_discounts
    BEFORE UPDATE ON product_discounts
    FOR EACH ROW
    EXECUTE FUNCTION update_product_discounts_updated_at();

-- 4. Políticas RLS (Row Level Security)
ALTER TABLE product_discounts ENABLE ROW LEVEL SECURITY;

-- Política: Usuarios solo ven sus propios descuentos
CREATE POLICY "Users can view own discounts"
    ON product_discounts
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Política: Usuarios solo insertan sus propios descuentos
CREATE POLICY "Users can insert own discounts"
    ON product_discounts
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Política: Usuarios solo actualizan sus propios descuentos
CREATE POLICY "Users can update own discounts"
    ON product_discounts
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Política: Usuarios solo eliminan sus propios descuentos
CREATE POLICY "Users can delete own discounts"
    ON product_discounts
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- 5. Log de migración
DO $$
BEGIN
    RAISE NOTICE 'Migración de tabla product_discounts completada:';
    RAISE NOTICE '- Tabla product_discounts creada';
    RAISE NOTICE '- Índices creados';
    RAISE NOTICE '- Trigger de updated_at configurado';
    RAISE NOTICE '- Políticas RLS aplicadas';
END $$;
