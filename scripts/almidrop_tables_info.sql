-- ============================================================================
-- SCRIPT DE SOLO LECTURA - NO MODIFICA DATOS
-- Propósito: Obtener nombres de tablas y estructura para corregir API
-- ============================================================================
-- Este script SOLO hace SELECT (consultas), NUNCA modifica datos
-- Ejecutar en: https://bakmisrdgjpnrwohjcyn.supabase.co/project/default/sql
-- ============================================================================

-- 1. Listar todas las tablas (SOLO LECTURA)
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- 2. Ver estructura de tablas que podrían contener inventario/stock
-- (descomenta la que quieras ver)

-- Tabla: mis_productos_de_la_bodega (productos de bodegas)
-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'mis_productos_de_la_bodega';

-- Tabla: users (usuarios/bodegas)
-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'users';

-- Tabla: catalogo_de_los_productos_del_master
-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'catalogo_de_los_productos_del_master';

-- 3. Contar registros en tablas principales
-- SELECT 'mis_productos_de_la_bodega' as tabla, COUNT(*) as total FROM mis_productos_de_la_bodega;
-- SELECT 'users' as tabla, COUNT(*) as total FROM users WHERE is_bodega = true;
-- SELECT 'catalogo_de_los_productos_del_master' as tabla, COUNT(*) as total FROM catalogo_de_los_productos_del_master;

-- 4. Ver ciudades únicas en users (bodegas)
-- SELECT DISTINCT company_city, COUNT(*) as bodegas_count
-- FROM users 
-- WHERE is_bodega = true AND company_city IS NOT NULL
-- GROUP BY company_city
-- ORDER BY bodegas_count DESC;
