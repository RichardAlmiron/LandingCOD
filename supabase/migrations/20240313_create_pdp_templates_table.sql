-- Migration: Create pdp_templates table with premium support
-- Created: 2024-03-12
-- Purpose: Create PDP templates table if it doesn't exist

-- Create pdp_templates table if it doesn't exist
CREATE TABLE IF NOT EXISTS pdp_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(100) NOT NULL DEFAULT 'urgency',
    name VARCHAR(200) NOT NULL,
    description TEXT,
    image_url TEXT,
    premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for category filtering (used by BuilderFlow)
CREATE INDEX IF NOT EXISTS idx_pdp_templates_category 
ON pdp_templates(category);

-- Create index for premium filtering
CREATE INDEX IF NOT EXISTS idx_pdp_templates_premium 
ON pdp_templates(premium) 
WHERE premium = TRUE;

-- Enable RLS
ALTER TABLE pdp_templates ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY IF NOT EXISTS "Allow public read access to PDP templates" 
ON pdp_templates FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Allow admin insert to PDP templates" 
ON pdp_templates FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow admin update to PDP templates" 
ON pdp_templates FOR UPDATE USING (true);

CREATE POLICY IF NOT EXISTS "Allow admin delete to PDP templates" 
ON pdp_templates FOR DELETE USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_pdp_templates_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_pdp_templates_timestamp ON pdp_templates;

CREATE TRIGGER update_pdp_templates_timestamp
    BEFORE UPDATE ON pdp_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_pdp_templates_timestamp();

-- Insert default PDP templates if table is empty
INSERT INTO pdp_templates (id, category, name, description, premium)
SELECT 
    gen_random_uuid(),
    'urgency',
    'Urgencia Básica',
    'Template de urgencia básica con contador y escasez',
    false
WHERE NOT EXISTS (SELECT 1 FROM pdp_templates LIMIT 1);

-- Update existing templates to set premium=true for specific templates
UPDATE pdp_templates 
SET premium = TRUE 
WHERE id LIKE '%premium%' 
   OR name ILIKE '%premium%'
   OR category ILIKE '%premium%';

-- Add comment for documentation
COMMENT ON TABLE pdp_templates IS 'Product Detail Page templates for visualization modes';
COMMENT ON COLUMN pdp_templates.premium IS 'Indicates if this is a premium template (shows sparkle icon in UI)';

-- Verify table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'pdp_templates' 
ORDER BY ordinal_position;
