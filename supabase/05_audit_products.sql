-- ============================================================
-- SQL Script for Auditing Products and Store Data
-- This script helps view and extract product information
-- stored in the JSONB 'store_data' column.
-- ============================================================

-- 1. View all tables in the database (General Audit)
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- 2. View basic information for all published stores
SELECT 
    id, 
    user_id, 
    identificador_url, 
    name, 
    template, 
    status, 
    views 
FROM tiendas_publicadas;

-- 3. Extract and expand products from the JSONB store_data (assuming structure contains a "products" array)
SELECT 
    t.identificador_url AS store_url,
    t.name AS store_name,
    product.value->>'id' AS product_id,
    product.value->>'title' AS product_name,
    product.value->>'price' AS product_price,
    product.value->>'imageUrl' AS product_image
FROM 
    tiendas_publicadas t,
    jsonb_array_elements(t.store_data->'products') AS product
WHERE 
    t.store_data ? 'products';

-- 4. Count products per store
SELECT 
    t.identificador_url AS store_url,
    t.name AS store_name,
    jsonb_array_length(t.store_data->'products') AS product_count
FROM 
    tiendas_publicadas t
WHERE 
    t.store_data ? 'products';
