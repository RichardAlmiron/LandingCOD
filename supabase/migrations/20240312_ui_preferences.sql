-- Migration: Create ui_preferences table for PDP visualization modes
-- Date: 2024-03-12

CREATE TABLE IF NOT EXISTS ui_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    entity_type VARCHAR(50) NOT NULL DEFAULT 'pdp_display_mode', -- tipo de preferencia
    selected_mode VARCHAR(50) NOT NULL DEFAULT 'fullscreenslider', -- modo seleccionado
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, entity_type)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_ui_preferences_user_entity 
    ON ui_preferences(user_id, entity_type);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_ui_preferences_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_ui_preferences
    BEFORE UPDATE ON ui_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_ui_preferences_timestamp();

-- RLS policies
ALTER TABLE ui_preferences ENABLE ROW LEVEL SECURITY;

-- Users can only see their own preferences
CREATE POLICY "Users can view own preferences" 
    ON ui_preferences FOR SELECT 
    USING (auth.uid() = user_id);

-- Users can only insert their own preferences  
CREATE POLICY "Users can insert own preferences"
    ON ui_preferences FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can only update their own preferences
CREATE POLICY "Users can update own preferences"
    ON ui_preferences FOR UPDATE
    USING (auth.uid() = user_id);

-- Admins can see all preferences
CREATE POLICY "Admins can view all preferences"
    ON ui_preferences FOR SELECT
    USING (auth.jwt() ->> 'role' = 'admin');

COMMENT ON TABLE ui_preferences IS 'Stores user UI preferences like PDP display modes';
