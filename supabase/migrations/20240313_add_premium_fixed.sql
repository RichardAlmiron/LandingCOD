-- Migration: Add premium column to Paginas_de_Productos_Reutilizables table
-- Created: 2024-03-12
-- Purpose: Support premium template indicators in UI

-- Add premium column to the correct table
ALTER TABLE "Paginas_de_Productos_Reutilizables" 
ADD COLUMN IF NOT EXISTS premium BOOLEAN DEFAULT FALSE;

-- Create index for premium filtering
CREATE INDEX IF NOT EXISTS idx_paginas_premium 
ON "Paginas_de_Productos_Reutilizables"(premium) 
WHERE premium = TRUE;

-- Add comment for documentation
COMMENT ON COLUMN "Paginas_de_Productos_Reutilizables".premium IS 'Indicates if this is a premium template (shows sparkle icon in UI)';

-- Verify column was added
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'Paginas_de_Productos_Reutilizables' 
AND column_name = 'premium';
