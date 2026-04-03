-- Migration: Add order form configuration fields to tiendas_publicadas table
-- Created: 2025-03-14
-- Purpose: Support Cash on Delivery (COD) order form with WhatsApp integration

-- Add order_form_config column to store_data JSONB (update existing structure)
-- Since tiendas_publicadas uses store_data JSONB, we update the structure there
-- No need for ALTER TABLE, just update the JSON structure in store_data

-- Add whatsapp_number column for quick access
ALTER TABLE public.tiendas_publicadas 
ADD COLUMN IF NOT EXISTS whatsapp_number TEXT DEFAULT '';

-- Create index for faster JSON queries on store_data
CREATE INDEX IF NOT EXISTS idx_tiendas_publicadas_store_data 
ON public.tiendas_publicadas USING GIN (store_data);

-- Add comment to describe the order_form_config structure in store_data
COMMENT ON COLUMN public.tiendas_publicadas.store_data IS 'JSONB containing store configuration including:
- orderFormConfig: { enabled: boolean, formType: "modern"|"minimal"|"classic", whatsappNumber: string, currency: string }
- whatsappNumber: string (alternative location for WhatsApp number)
- products, pdpFeatures, footerConfig, discountConfig, etc.';

-- Update existing stores to have default order_form_config in store_data if not present
UPDATE public.tiendas_publicadas 
SET store_data = jsonb_set(
  COALESCE(store_data, '{}'::jsonb),
  '{orderFormConfig}',
  '{
    "enabled": false,
    "formType": "modern",
    "whatsappNumber": "",
    "currency": "USD"
  }'::jsonb,
  true
)
WHERE store_data->'orderFormConfig' IS NULL;

-- Grant permissions
GRANT ALL ON public.tiendas_publicadas TO authenticated;
GRANT ALL ON public.tiendas_publicadas TO service_role;
