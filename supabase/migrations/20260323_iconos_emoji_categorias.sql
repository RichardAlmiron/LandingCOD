-- ════════════════════════════════════════════════════════════
-- MIGRACIÓN: Cambiar iconos de Lucide (inglés) a Emojis (español)
-- Fecha: 2026-03-23
-- Motivo: Los nombres de componentes Lucide se mostraban en inglés
--         en los selects del builder. Se reemplazan por emojis.
-- ════════════════════════════════════════════════════════════

-- ── CATEGORÍAS ──
UPDATE "Categorias_PDP" SET icono = '📱' WHERE nombre = 'Electrónica';
UPDATE "Categorias_PDP" SET icono = '💊' WHERE nombre = 'Salud';
UPDATE "Categorias_PDP" SET icono = '💄' WHERE nombre = 'Belleza';
UPDATE "Categorias_PDP" SET icono = '🔧' WHERE nombre = 'Herramientas';
UPDATE "Categorias_PDP" SET icono = '🏠' WHERE nombre = 'Hogar';
UPDATE "Categorias_PDP" SET icono = '👗' WHERE nombre = 'Moda';
UPDATE "Categorias_PDP" SET icono = '⚽' WHERE nombre = 'Deportes';
UPDATE "Categorias_PDP" SET icono = '🐾' WHERE nombre = 'Mascotas';
UPDATE "Categorias_PDP" SET icono = '🚗' WHERE nombre = 'Automotriz';
UPDATE "Categorias_PDP" SET icono = '🍎' WHERE nombre = 'Alimentos';
UPDATE "Categorias_PDP" SET icono = '🎮' WHERE nombre = 'Juguetes';

-- ── SUBCATEGORÍAS: Electrónica ──
UPDATE "Subcategorias_PDP" SET icono = '📱' WHERE nombre = 'Celulares';
UPDATE "Subcategorias_PDP" SET icono = '💻' WHERE nombre = 'Computadoras';
UPDATE "Subcategorias_PDP" SET icono = '🎧' WHERE nombre = 'Audio';
UPDATE "Subcategorias_PDP" SET icono = '📷' WHERE nombre = 'Cámaras';
UPDATE "Subcategorias_PDP" SET icono = '🎮' WHERE nombre = 'Gaming';
UPDATE "Subcategorias_PDP" SET icono = '📋' WHERE nombre = 'Tablets';
UPDATE "Subcategorias_PDP" SET icono = '⌚' WHERE nombre = 'Wearables';
UPDATE "Subcategorias_PDP" SET icono = '🔌' WHERE nombre = 'Accesorios Tech';
UPDATE "Subcategorias_PDP" SET icono = '📺' WHERE nombre = 'Televisores';
UPDATE "Subcategorias_PDP" SET icono = '📡' WHERE nombre = 'Redes';

-- ── SUBCATEGORÍAS: Salud ──
UPDATE "Subcategorias_PDP" SET icono = '💊' WHERE nombre = 'Suplementos';
UPDATE "Subcategorias_PDP" SET icono = '🩺' WHERE nombre = 'Equipos Médicos';
UPDATE "Subcategorias_PDP" SET icono = '🏋️' WHERE nombre = 'Fitness';
UPDATE "Subcategorias_PDP" SET icono = '🧴' WHERE nombre = 'Cuidado Personal';
UPDATE "Subcategorias_PDP" SET icono = '🧘' WHERE nombre = 'Bienestar';
UPDATE "Subcategorias_PDP" SET icono = '🥗' WHERE nombre = 'Nutrición';

-- ── SUBCATEGORÍAS: Belleza ──
UPDATE "Subcategorias_PDP" SET icono = '🧴' WHERE nombre = 'Skincare';
UPDATE "Subcategorias_PDP" SET icono = '💋' WHERE nombre = 'Maquillaje';
UPDATE "Subcategorias_PDP" SET icono = '✂️' WHERE nombre = 'Cuidado Capilar';
UPDATE "Subcategorias_PDP" SET icono = '🌸' WHERE nombre = 'Fragancias';
UPDATE "Subcategorias_PDP" SET icono = '💅' WHERE nombre = 'Uñas';
UPDATE "Subcategorias_PDP" SET icono = '✨' WHERE nombre = 'Corporal';

-- ── SUBCATEGORÍAS: Herramientas ──
UPDATE "Subcategorias_PDP" SET icono = '🔨' WHERE nombre = 'Manuales';
UPDATE "Subcategorias_PDP" SET icono = '⚡' WHERE nombre = 'Eléctricas';
UPDATE "Subcategorias_PDP" SET icono = '🌿' WHERE nombre = 'Jardinería';
UPDATE "Subcategorias_PDP" SET icono = '📏' WHERE nombre = 'Medición';
UPDATE "Subcategorias_PDP" SET icono = '🔩' WHERE nombre = 'Ferretería';
UPDATE "Subcategorias_PDP" SET icono = '🏭' WHERE nombre = 'Industriales';

-- ── SUBCATEGORÍAS: Hogar ──
UPDATE "Subcategorias_PDP" SET icono = '🍳' WHERE nombre = 'Cocina';
UPDATE "Subcategorias_PDP" SET icono = '🖼️' WHERE nombre = 'Decoración';
UPDATE "Subcategorias_PDP" SET icono = '📦' WHERE nombre = 'Organización';
UPDATE "Subcategorias_PDP" SET icono = '💡' WHERE nombre = 'Iluminación';
UPDATE "Subcategorias_PDP" SET icono = '🧹' WHERE nombre = 'Limpieza';
UPDATE "Subcategorias_PDP" SET icono = '🪑' WHERE nombre = 'Muebles';

-- ── SUBCATEGORÍAS: Moda ──
UPDATE "Subcategorias_PDP" SET icono = '👗' WHERE nombre = 'Ropa Mujer';
UPDATE "Subcategorias_PDP" SET icono = '👔' WHERE nombre = 'Ropa Hombre';
UPDATE "Subcategorias_PDP" SET icono = '👟' WHERE nombre = 'Calzado';
UPDATE "Subcategorias_PDP" SET icono = '⌚' WHERE nombre = 'Accesorios';
UPDATE "Subcategorias_PDP" SET icono = '💎' WHERE nombre = 'Joyería';
UPDATE "Subcategorias_PDP" SET icono = '👜' WHERE nombre = 'Bolsos';

-- ── SUBCATEGORÍAS: Deportes ──
UPDATE "Subcategorias_PDP" SET icono = '🏋️' WHERE nombre = 'Equipamiento';
UPDATE "Subcategorias_PDP" SET icono = '👕' WHERE nombre = 'Ropa Deportiva';
UPDATE "Subcategorias_PDP" SET icono = '⛰️' WHERE nombre = 'Outdoor';
UPDATE "Subcategorias_PDP" SET icono = '🚴' WHERE nombre = 'Ciclismo';
UPDATE "Subcategorias_PDP" SET icono = '🏊' WHERE nombre = 'Acuáticos';
UPDATE "Subcategorias_PDP" SET icono = '💪' WHERE nombre = 'Suplementos Dep.';

-- ── SUBCATEGORÍAS: Mascotas ──
UPDATE "Subcategorias_PDP" SET icono = '🐕' WHERE nombre = 'Perros';
UPDATE "Subcategorias_PDP" SET icono = '🐈' WHERE nombre = 'Gatos';
UPDATE "Subcategorias_PDP" SET icono = '🦴' WHERE nombre = 'Accesorios Pet';
UPDATE "Subcategorias_PDP" SET icono = '🛁' WHERE nombre = 'Higiene Animal';

-- ── SUBCATEGORÍAS: Automotriz ──
UPDATE "Subcategorias_PDP" SET icono = '⚙️' WHERE nombre = 'Repuestos';
UPDATE "Subcategorias_PDP" SET icono = '🚗' WHERE nombre = 'Accesorios Auto';
UPDATE "Subcategorias_PDP" SET icono = '📻' WHERE nombre = 'Electrónica Auto';
UPDATE "Subcategorias_PDP" SET icono = '🧽' WHERE nombre = 'Limpieza Auto';
