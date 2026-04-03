-- ============================================================
-- Migración: Crear bucket store-images en Supabase Storage
-- Fecha: 2025-03-21
-- Propósito: Almacenar imágenes subidas desde el editor visual
-- ============================================================

-- 1. Crear el bucket (público para que las imágenes sean accesibles en las tiendas/PDPs)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'store-images',
  'store-images',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Política: Cualquier usuario autenticado puede SUBIR imágenes
CREATE POLICY "Usuarios autenticados pueden subir imágenes"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'store-images');

-- 3. Política: Cualquier persona puede VER las imágenes (público)
CREATE POLICY "Acceso público de lectura a store-images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'store-images');

-- 4. Política: El usuario solo puede ELIMINAR sus propias imágenes
CREATE POLICY "Usuarios pueden eliminar sus propias imágenes"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'store-images'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- 5. Política: El service_role tiene acceso total (para operaciones del API)
CREATE POLICY "Service role acceso total a store-images"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'store-images')
WITH CHECK (bucket_id = 'store-images');
