-- Migration: Ensure pdp_templates table exists with correct structure
-- Created: 2024-03-12
-- Purpose: Create table for PDP templates with all required columns

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS "Paginas_de_Productos_Reutilizables" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200),
    description TEXT,
    category VARCHAR(100) DEFAULT 'urgency',
    image_url TEXT,
    premium BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add columns if they don't exist (safe for existing tables)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'Paginas_de_Productos_Reutilizables' 
                   AND column_name = 'name') THEN
        ALTER TABLE "Paginas_de_Productos_Reutilizables" ADD COLUMN name VARCHAR(200);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'Paginas_de_Productos_Reutilizables' 
                   AND column_name = 'description') THEN
        ALTER TABLE "Paginas_de_Productos_Reutilizables" ADD COLUMN description TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'Paginas_de_Productos_Reutilizables' 
                   AND column_name = 'category') THEN
        ALTER TABLE "Paginas_de_Productos_Reutilizables" ADD COLUMN category VARCHAR(100) DEFAULT 'urgency';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'Paginas_de_Productos_Reutilizables' 
                   AND column_name = 'image_url') THEN
        ALTER TABLE "Paginas_de_Productos_Reutilizables" ADD COLUMN image_url TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'Paginas_de_Productos_Reutilizables' 
                   AND column_name = 'premium') THEN
        ALTER TABLE "Paginas_de_Productos_Reutilizables" ADD COLUMN premium BOOLEAN DEFAULT FALSE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'Paginas_de_Productos_Reutilizables' 
                   AND column_name = 'deleted_at') THEN
        ALTER TABLE "Paginas_de_Productos_Reutilizables" ADD COLUMN deleted_at TIMESTAMPTZ;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'Paginas_de_Productos_Reutilizables' 
                   AND column_name = 'created_at') THEN
        ALTER TABLE "Paginas_de_Productos_Reutilizables" ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
END $$;

-- Insert demo data if table is empty
INSERT INTO "Paginas_de_Productos_Reutilizables" (id, name, description, category, premium)
SELECT 
    gen_random_uuid(),
    'Urgencia Premium ' || i,
    'Template de urgencia con contador dinámico y escasez',
    'urgency',
    i = 1
FROM generate_series(1, 5) as i
WHERE NOT EXISTS (SELECT 1 FROM "Paginas_de_Productos_Reutilizables" LIMIT 1);

INSERT INTO "Paginas_de_Productos_Reutilizables" (id, name, description, category, premium)
SELECT 
    gen_random_uuid(),
    'Confianza Premium ' || i,
    'Template con prueba social y reseñas',
    'trust',
    i = 1
FROM generate_series(1, 5) as i
WHERE NOT EXISTS (SELECT 1 FROM "Paginas_de_Productos_Reutilizables" WHERE category = 'trust' LIMIT 1);

INSERT INTO "Paginas_de_Productos_Reutilizables" (id, name, description, category, premium)
SELECT 
    gen_random_uuid(),
    'Bundle Premium ' || i,
    'Template para bundles y ofertas',
    'bundle',
    i = 1
FROM generate_series(1, 5) as i
WHERE NOT EXISTS (SELECT 1 FROM "Paginas_de_Productos_Reutilizables" WHERE category = 'bundle' LIMIT 1);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_paginas_category ON "Paginas_de_Productos_Reutilizables"(category);
CREATE INDEX IF NOT EXISTS idx_paginas_premium ON "Paginas_de_Productos_Reutilizables"(premium) WHERE premium = TRUE;
CREATE INDEX IF NOT EXISTS idx_paginas_deleted ON "Paginas_de_Productos_Reutilizables"(deleted_at);

-- Verify structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'Paginas_de_Productos_Reutilizables'
ORDER BY ordinal_position;
