-- Migration: Add premium column to pdp_templates table
-- Created: 2024-03-12
-- Purpose: Support premium template indicators in UI

-- Add premium column to pdp_templates
ALTER TABLE pdp_templates 
ADD COLUMN IF NOT EXISTS premium BOOLEAN DEFAULT FALSE;

-- Create index for premium filtering
CREATE INDEX IF NOT EXISTS idx_pdp_templates_premium 
ON pdp_templates(premium) 
WHERE premium = TRUE;

-- Update existing templates to set premium=true for specific templates
-- (optional - can be customized based on business logic)
UPDATE pdp_templates 
SET premium = TRUE 
WHERE id LIKE '%premium%' 
   OR id LIKE '%premium-%'
   OR category LIKE '%premium%';

-- Add comment for documentation
COMMENT ON COLUMN pdp_templates.premium IS 'Indicates if this is a premium template (shows sparkle icon in UI)';

-- Verify migration
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'pdp_templates' 
AND column_name = 'premium';
