-- Add image_url and premium columns to Paginas_de_Productos_Reutilizables
ALTER TABLE "Paginas_de_Productos_Reutilizables" 
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS premium BOOLEAN DEFAULT FALSE;

-- Add image_url and premium columns to Tiendas_Reutilizables
ALTER TABLE "Tiendas_Reutilizables" 
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS premium BOOLEAN DEFAULT FALSE;
