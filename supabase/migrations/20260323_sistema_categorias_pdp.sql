-- ============================================================
-- MIGRACIÓN: Sistema de Categorías para Páginas de Producto
-- Fecha: 2026-03-23
-- Propósito: Crear tablas nuevas para el sistema de categorías
--            por nicho y sub-nicho del Landing Code Studio.
--            Renombrar todas las páginas de producto existentes
--            a nomenclatura "Standard".
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- TABLA 1: Categorias_PDP
-- Catálogo maestro de categorías (nichos principales)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "Categorias_PDP" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    icono VARCHAR(50) DEFAULT 'Layers',
    color VARCHAR(20) DEFAULT '#6366f1',
    orden INT DEFAULT 0,
    activa BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_categorias_pdp_nombre ON "Categorias_PDP"(nombre);
CREATE INDEX IF NOT EXISTS idx_categorias_pdp_orden ON "Categorias_PDP"(orden);
CREATE INDEX IF NOT EXISTS idx_categorias_pdp_activa ON "Categorias_PDP"(activa) WHERE activa = TRUE;

-- RLS
ALTER TABLE "Categorias_PDP" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura pública de categorías" ON "Categorias_PDP" FOR SELECT USING (true);
CREATE POLICY "Admin inserta categorías" ON "Categorias_PDP" FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin actualiza categorías" ON "Categorias_PDP" FOR UPDATE USING (true);
CREATE POLICY "Admin elimina categorías" ON "Categorias_PDP" FOR DELETE USING (true);

-- Trigger updated_at
CREATE OR REPLACE FUNCTION actualizar_timestamp_categorias_pdp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_actualizar_categorias_pdp ON "Categorias_PDP";
CREATE TRIGGER trigger_actualizar_categorias_pdp
    BEFORE UPDATE ON "Categorias_PDP"
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_timestamp_categorias_pdp();

-- ────────────────────────────────────────────────────────────
-- TABLA 2: Subcategorias_PDP
-- Sub-nichos dentro de cada categoría
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "Subcategorias_PDP" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    categoria_id UUID NOT NULL REFERENCES "Categorias_PDP"(id) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    icono VARCHAR(50) DEFAULT 'Tag',
    orden INT DEFAULT 0,
    activa BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(categoria_id, nombre)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_subcategorias_pdp_categoria ON "Subcategorias_PDP"(categoria_id);
CREATE INDEX IF NOT EXISTS idx_subcategorias_pdp_nombre ON "Subcategorias_PDP"(nombre);
CREATE INDEX IF NOT EXISTS idx_subcategorias_pdp_activa ON "Subcategorias_PDP"(activa) WHERE activa = TRUE;

-- RLS
ALTER TABLE "Subcategorias_PDP" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura pública de subcategorías" ON "Subcategorias_PDP" FOR SELECT USING (true);
CREATE POLICY "Admin inserta subcategorías" ON "Subcategorias_PDP" FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin actualiza subcategorías" ON "Subcategorias_PDP" FOR UPDATE USING (true);
CREATE POLICY "Admin elimina subcategorías" ON "Subcategorias_PDP" FOR DELETE USING (true);

-- Trigger updated_at
CREATE OR REPLACE FUNCTION actualizar_timestamp_subcategorias_pdp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_actualizar_subcategorias_pdp ON "Subcategorias_PDP";
CREATE TRIGGER trigger_actualizar_subcategorias_pdp
    BEFORE UPDATE ON "Subcategorias_PDP"
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_timestamp_subcategorias_pdp();

-- ────────────────────────────────────────────────────────────
-- TABLA 3: Plantillas_PDP
-- Tabla nueva que reemplaza Paginas_de_Productos_Reutilizables
-- con nomenclatura Standard y relación a categorías
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "Plantillas_PDP" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo VARCHAR(50) NOT NULL UNIQUE,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    componente VARCHAR(100) NOT NULL,
    categoria_id UUID REFERENCES "Categorias_PDP"(id) ON DELETE SET NULL,
    subcategoria_id UUID REFERENCES "Subcategorias_PDP"(id) ON DELETE SET NULL,
    imagen_url TEXT,
    premium BOOLEAN DEFAULT FALSE,
    verificada BOOLEAN DEFAULT FALSE,
    variante INT DEFAULT 1,
    orden INT DEFAULT 0,
    activa BOOLEAN DEFAULT TRUE,
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_plantillas_pdp_codigo ON "Plantillas_PDP"(codigo);
CREATE INDEX IF NOT EXISTS idx_plantillas_pdp_categoria ON "Plantillas_PDP"(categoria_id);
CREATE INDEX IF NOT EXISTS idx_plantillas_pdp_subcategoria ON "Plantillas_PDP"(subcategoria_id);
CREATE INDEX IF NOT EXISTS idx_plantillas_pdp_verificada ON "Plantillas_PDP"(verificada) WHERE verificada = TRUE;
CREATE INDEX IF NOT EXISTS idx_plantillas_pdp_activa ON "Plantillas_PDP"(activa) WHERE activa = TRUE;
CREATE INDEX IF NOT EXISTS idx_plantillas_pdp_premium ON "Plantillas_PDP"(premium) WHERE premium = TRUE;

-- RLS
ALTER TABLE "Plantillas_PDP" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura pública de plantillas" ON "Plantillas_PDP" FOR SELECT USING (true);
CREATE POLICY "Admin inserta plantillas" ON "Plantillas_PDP" FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin actualiza plantillas" ON "Plantillas_PDP" FOR UPDATE USING (true);
CREATE POLICY "Admin elimina plantillas" ON "Plantillas_PDP" FOR DELETE USING (true);

-- Trigger updated_at
CREATE OR REPLACE FUNCTION actualizar_timestamp_plantillas_pdp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_actualizar_plantillas_pdp ON "Plantillas_PDP";
CREATE TRIGGER trigger_actualizar_plantillas_pdp
    BEFORE UPDATE ON "Plantillas_PDP"
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_timestamp_plantillas_pdp();

-- ────────────────────────────────────────────────────────────
-- DATOS INICIALES: Categorías
-- ────────────────────────────────────────────────────────────
INSERT INTO "Categorias_PDP" (nombre, descripcion, icono, color, orden) VALUES
('Standard',      'Plantillas estándar multipropósito, aptas para cualquier nicho',                'LayoutTemplate', '#6366f1', 0),
('Electrónica',   'Productos tecnológicos: celulares, computadoras, gadgets, audio, gaming',       'Cpu',            '#3b82f6', 1),
('Salud',         'Suplementos, equipos médicos, bienestar, fitness, cuidado personal',            'Heart',          '#10b981', 2),
('Belleza',       'Cosméticos, skincare, maquillaje, cuidado capilar, fragancias',                 'Sparkles',       '#ec4899', 3),
('Herramientas',  'Herramientas manuales, eléctricas, industriales, jardinería, ferretería',       'Wrench',         '#f59e0b', 4),
('Hogar',         'Muebles, decoración, cocina, organización, electrodomésticos',                  'Home',           '#8b5cf6', 5),
('Moda',          'Ropa, calzado, accesorios, joyería, bolsos',                                   'Shirt',          '#ef4444', 6),
('Deportes',      'Equipamiento deportivo, ropa deportiva, suplementos, outdoor',                  'Dumbbell',       '#06b6d4', 7),
('Mascotas',      'Alimentos, accesorios, juguetes, salud animal, higiene',                        'PawPrint',       '#a855f7', 8),
('Automotriz',    'Repuestos, accesorios, herramientas automotrices, electrónica vehicular',       'Car',            '#64748b', 9),
('Alimentos',     'Productos alimenticios, gourmet, orgánicos, bebidas, snacks',                  'UtensilsCrossed','#84cc16', 10),
('Juguetes',      'Juguetes infantiles, educativos, coleccionables, juegos de mesa',              'Gamepad2',       '#f97316', 11)
ON CONFLICT (nombre) DO NOTHING;

-- ────────────────────────────────────────────────────────────
-- DATOS INICIALES: Subcategorías
-- ────────────────────────────────────────────────────────────

-- Electrónica
INSERT INTO "Subcategorias_PDP" (categoria_id, nombre, descripcion, icono, orden)
SELECT c.id, s.nombre, s.descripcion, s.icono, s.orden
FROM "Categorias_PDP" c,
(VALUES
    ('Celulares',       'Smartphones, fundas, protectores de pantalla',    'Smartphone',   1),
    ('Computadoras',    'Laptops, PCs, monitores, periféricos',            'Monitor',      2),
    ('Audio',           'Audífonos, parlantes, micrófonos, soundbars',     'Headphones',   3),
    ('Cámaras',         'Cámaras fotográficas, drones, accesorios',        'Camera',       4),
    ('Gaming',          'Consolas, controles, accesorios gaming',          'Gamepad2',     5),
    ('Tablets',         'Tablets, e-readers, accesorios',                   'Tablet',       6),
    ('Wearables',       'Smartwatches, bandas fitness, lentes VR',         'Watch',        7),
    ('Accesorios Tech', 'Cargadores, cables, hubs, adaptadores',          'Cable',        8),
    ('Televisores',     'Smart TVs, proyectores, streaming devices',       'Tv',           9),
    ('Redes',           'Routers, extensores WiFi, switches',              'Wifi',         10)
) AS s(nombre, descripcion, icono, orden)
WHERE c.nombre = 'Electrónica'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Salud
INSERT INTO "Subcategorias_PDP" (categoria_id, nombre, descripcion, icono, orden)
SELECT c.id, s.nombre, s.descripcion, s.icono, s.orden
FROM "Categorias_PDP" c,
(VALUES
    ('Suplementos',       'Vitaminas, proteínas, minerales, colágeno',       'Pill',         1),
    ('Equipos Médicos',   'Tensiómetros, oxímetros, termómetros',            'Stethoscope',  2),
    ('Fitness',           'Bandas elásticas, pesas, yoga, pilates',          'Dumbbell',     3),
    ('Cuidado Personal',  'Masajeadores, terapia, relajación',               'HandHeart',    4),
    ('Bienestar',         'Aromaterapia, meditación, sueño',                 'Leaf',         5),
    ('Nutrición',         'Alimentos funcionales, superfoods, dietas',       'Apple',        6)
) AS s(nombre, descripcion, icono, orden)
WHERE c.nombre = 'Salud'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Belleza
INSERT INTO "Subcategorias_PDP" (categoria_id, nombre, descripcion, icono, orden)
SELECT c.id, s.nombre, s.descripcion, s.icono, s.orden
FROM "Categorias_PDP" c,
(VALUES
    ('Skincare',          'Cremas, serums, limpiadores, mascarillas',        'Droplets',     1),
    ('Maquillaje',        'Base, labiales, sombras, brochas',                'Palette',      2),
    ('Cuidado Capilar',   'Shampoo, tratamientos, herramientas de peinado',  'Scissors',     3),
    ('Fragancias',        'Perfumes, colonias, body mists',                  'Flower2',      4),
    ('Uñas',              'Esmaltes, herramientas, nail art',                'Paintbrush',   5),
    ('Corporal',          'Cremas corporales, exfoliantes, aceites',         'Sparkles',     6)
) AS s(nombre, descripcion, icono, orden)
WHERE c.nombre = 'Belleza'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Herramientas
INSERT INTO "Subcategorias_PDP" (categoria_id, nombre, descripcion, icono, orden)
SELECT c.id, s.nombre, s.descripcion, s.icono, s.orden
FROM "Categorias_PDP" c,
(VALUES
    ('Manuales',          'Destornilladores, llaves, alicates, martillos',   'Hammer',       1),
    ('Eléctricas',        'Taladros, sierras, lijadoras, pulidoras',         'Zap',          2),
    ('Jardinería',        'Podadoras, mangueras, herramientas de jardín',    'TreePine',     3),
    ('Medición',          'Metros, niveles, detectores, multímetros',        'Ruler',        4),
    ('Ferretería',        'Tornillos, clavos, adhesivos, cintas',            'Wrench',       5),
    ('Industriales',      'Soldadoras, compresores, generadores',            'Factory',      6)
) AS s(nombre, descripcion, icono, orden)
WHERE c.nombre = 'Herramientas'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Hogar
INSERT INTO "Subcategorias_PDP" (categoria_id, nombre, descripcion, icono, orden)
SELECT c.id, s.nombre, s.descripcion, s.icono, s.orden
FROM "Categorias_PDP" c,
(VALUES
    ('Cocina',            'Utensilios, electrodomésticos, organización',     'ChefHat',      1),
    ('Decoración',        'Cuadros, velas, plantas artificiales, espejos',   'Frame',        2),
    ('Organización',      'Cajas, estantes, organizadores, ganchos',         'LayoutGrid',   3),
    ('Iluminación',       'Lámparas, luces LED, velas, focos',              'Lightbulb',    4),
    ('Limpieza',          'Aspiradoras, mopas, productos de limpieza',       'SprayCan',     5),
    ('Muebles',           'Sillas, mesas, estantes, escritorios',            'Armchair',     6)
) AS s(nombre, descripcion, icono, orden)
WHERE c.nombre = 'Hogar'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Moda
INSERT INTO "Subcategorias_PDP" (categoria_id, nombre, descripcion, icono, orden)
SELECT c.id, s.nombre, s.descripcion, s.icono, s.orden
FROM "Categorias_PDP" c,
(VALUES
    ('Ropa Mujer',        'Vestidos, blusas, pantalones, faldas',            'Shirt',        1),
    ('Ropa Hombre',       'Camisas, pantalones, chaquetas, trajes',          'Shirt',        2),
    ('Calzado',           'Zapatos, tenis, botas, sandalias',                'Footprints',   3),
    ('Accesorios',        'Relojes, gafas, cinturones, carteras',            'Watch',        4),
    ('Joyería',           'Anillos, collares, pulseras, aretes',             'Gem',          5),
    ('Bolsos',            'Mochilas, bolsos, maletas, carteras',             'Briefcase',    6)
) AS s(nombre, descripcion, icono, orden)
WHERE c.nombre = 'Moda'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Deportes
INSERT INTO "Subcategorias_PDP" (categoria_id, nombre, descripcion, icono, orden)
SELECT c.id, s.nombre, s.descripcion, s.icono, s.orden
FROM "Categorias_PDP" c,
(VALUES
    ('Equipamiento',      'Pesas, máquinas, bandas, colchonetas',            'Dumbbell',     1),
    ('Ropa Deportiva',    'Camisetas, shorts, leggings, zapatillas',         'Shirt',        2),
    ('Outdoor',           'Camping, senderismo, escalada, pesca',            'Mountain',     3),
    ('Ciclismo',          'Bicicletas, cascos, accesorios, ropa',            'Bike',         4),
    ('Acuáticos',         'Natación, surf, kayak, snorkel',                  'Waves',        5),
    ('Suplementos Dep.',  'Proteínas, creatina, pre-workout, BCAA',          'Pill',         6)
) AS s(nombre, descripcion, icono, orden)
WHERE c.nombre = 'Deportes'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Mascotas
INSERT INTO "Subcategorias_PDP" (categoria_id, nombre, descripcion, icono, orden)
SELECT c.id, s.nombre, s.descripcion, s.icono, s.orden
FROM "Categorias_PDP" c,
(VALUES
    ('Perros',            'Alimento, juguetes, camas, correas, ropa',        'Dog',          1),
    ('Gatos',             'Alimento, rascadores, areneros, juguetes',        'Cat',          2),
    ('Accesorios Pet',    'Transportadoras, comederos, bebederos',           'PawPrint',     3),
    ('Higiene Animal',    'Shampoo, cepillos, cortaúñas, toallitas',         'Droplets',     4)
) AS s(nombre, descripcion, icono, orden)
WHERE c.nombre = 'Mascotas'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Automotriz
INSERT INTO "Subcategorias_PDP" (categoria_id, nombre, descripcion, icono, orden)
SELECT c.id, s.nombre, s.descripcion, s.icono, s.orden
FROM "Categorias_PDP" c,
(VALUES
    ('Repuestos',         'Filtros, bujías, frenos, suspensión',             'Cog',          1),
    ('Accesorios Auto',   'Fundas, organizadores, cargadores, luces',        'Car',          2),
    ('Electrónica Auto',  'Cámaras, GPS, alarmas, audio',                    'Radio',        3),
    ('Limpieza Auto',     'Ceras, shampoo, microfibras, aspiradoras',        'SprayCan',     4)
) AS s(nombre, descripcion, icono, orden)
WHERE c.nombre = 'Automotriz'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- ────────────────────────────────────────────────────────────
-- DATOS INICIALES: Plantillas Standard (las 14 existentes renombradas)
-- ────────────────────────────────────────────────────────────
INSERT INTO "Plantillas_PDP" (codigo, nombre, descripcion, componente, premium, verificada, variante, orden)
VALUES
-- Standard (categoría Standard - multipropósito)
('standard-urgencia',         'Standard Urgencia',          'Página con psicología de urgencia: contador regresivo, escasez de stock, presión social. Ideal para ofertas flash y liquidaciones.',                                'PdpUrgenciaMaxima',        FALSE, TRUE, 1, 1),
('standard-prueba-social',    'Standard Prueba Social',     'Página centrada en validación social: reseñas destacadas, UGC, testimonios, contadores de compradores. Genera confianza masiva.',                                 'PdpPruebaSocial',          FALSE, TRUE, 1, 2),
('standard-bundle',           'Standard Bundle',            'Página optimizada para ofertas de paquetes: selección de cantidad, descuentos por volumen, comparativa de precios. Maximiza ticket promedio.',                    'PdpOfertaBundle',          FALSE, TRUE, 1, 3),
('standard-historia',         'Standard Historia',          'Página con storytelling: narrativa problema-solución, conexión emocional, revelación del producto. Para productos que necesitan contexto.',                       'PdpHistoriaProducto',      FALSE, TRUE, 1, 4),
('standard-checkout-directo', 'Standard Checkout Directo',  'Página con formulario de compra integrado: checkout sin redirección, pago contra entrega, mínima fricción. Máxima conversión directa.',                          'PdpCheckoutDirecto',       FALSE, TRUE, 1, 5),
('standard-salud',            'Standard Salud',             'Página especializada en productos de salud y bienestar: beneficios clínicos, ingredientes, modo de uso, testimonios de resultados.',                             'PdpSaludEstandar',         FALSE, TRUE, 1, 6),
('standard-electronico',      'Standard Electrónico',       'Página para productos tecnológicos: especificaciones técnicas, comparativas, galería HD, compatibilidad. Diseño tech-forward.',                                 'PdpElectronicoEstandar',   FALSE, TRUE, 1, 7),
('standard-herramientas',     'Standard Herramientas',      'Página para herramientas y ferretería: durabilidad, materiales, tutorial de uso, aplicaciones prácticas. Diseño robusto y funcional.',                           'PdpHerramientasEstandar',  FALSE, TRUE, 1, 8),
('standard-belleza',          'Standard Belleza',           'Página para cosméticos y belleza: ingredientes, antes/después, rutina de aplicación, resultados. Diseño elegante y femenino.',                                   'PdpBellezaEstandar',       FALSE, TRUE, 1, 9),
('standard-hogar',            'Standard Hogar',             'Página para productos del hogar: ambientación, dimensiones, materiales, estilo de vida. Diseño cálido y acogedor.',                                              'PdpHogarEstandar',         FALSE, TRUE, 1, 10),
-- Premium
('premium-urgencia',          'Premium Urgencia',           'Versión premium de urgencia: animaciones avanzadas, micro-interacciones, diseño de alto impacto visual. Para campañas de máxima conversión.',                    'PdpUrgenciaPremium',       TRUE,  TRUE, 1, 11),
('premium-bundle',            'Premium Bundle',             'Versión premium de bundles: selector 3D, animaciones de ahorro, diseño luxury. Para productos de alto valor.',                                                   'PdpOfertaBundlePremium',   TRUE,  TRUE, 1, 12),
('premium-electronico',       'Premium Electrónico',        'Versión premium para tech: galería interactiva, specs animadas, comparador integrado. Para gadgets y electrónica de gama alta.',                                 'PdpElectronicoPremium',    TRUE,  TRUE, 1, 13),
('premium-salud',             'Premium Salud',              'Versión premium para salud: visualización de ingredientes, timeline de resultados, testimonios con video. Para suplementos premium.',                             'PdpSaludPremium',          TRUE,  TRUE, 1, 14)
ON CONFLICT (codigo) DO NOTHING;

-- ────────────────────────────────────────────────────────────
-- Asignar categoría "Standard" a todas las plantillas iniciales
-- ────────────────────────────────────────────────────────────
UPDATE "Plantillas_PDP" p
SET categoria_id = c.id
FROM "Categorias_PDP" c
WHERE c.nombre = 'Standard'
AND p.categoria_id IS NULL;

-- ────────────────────────────────────────────────────────────
-- Comentarios de documentación
-- ────────────────────────────────────────────────────────────
COMMENT ON TABLE "Categorias_PDP" IS 'Catálogo maestro de categorías (nichos) para páginas de producto del Landing Code Studio';
COMMENT ON TABLE "Subcategorias_PDP" IS 'Sub-nichos dentro de cada categoría principal para clasificación granular de plantillas PDP';
COMMENT ON TABLE "Plantillas_PDP" IS 'Plantillas de páginas de producto con nomenclatura Standard, vinculadas a categorías y subcategorías';

COMMENT ON COLUMN "Plantillas_PDP".codigo IS 'Identificador único legible (ej: standard-urgencia, premium-bundle). Se usa en el frontend para mapear al componente React.';
COMMENT ON COLUMN "Plantillas_PDP".componente IS 'Nombre del componente React que renderiza esta plantilla (ej: PdpUrgenciaMaxima)';
COMMENT ON COLUMN "Plantillas_PDP".variante IS 'Número de variante visual del componente (1, 2, 3...)';
