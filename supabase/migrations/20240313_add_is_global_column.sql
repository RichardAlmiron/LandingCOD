-- Migration: Add is_global column to ui_preferences for global display mode
-- Date: 2024-03-13

-- Add is_global column
ALTER TABLE ui_preferences 
ADD COLUMN IF NOT EXISTS is_global BOOLEAN DEFAULT FALSE;

-- Add partial unique index for global preferences
CREATE UNIQUE INDEX IF NOT EXISTS idx_ui_preferences_global_unique 
ON ui_preferences(entity_type) 
WHERE is_global = TRUE;

-- Update existing policies to allow viewing global preferences
DROP POLICY IF EXISTS "Users can view own preferences" ON ui_preferences;
DROP POLICY IF EXISTS "Users can view own and global preferences" ON ui_preferences;

CREATE POLICY "Users can view own and global preferences" 
ON ui_preferences FOR SELECT 
USING (auth.uid() = user_id OR is_global = TRUE);

-- Add policy for inserting global preferences (for admin)
DROP POLICY IF EXISTS "Admins can insert global preferences" ON ui_preferences;

CREATE POLICY "Admins can insert global preferences"
ON ui_preferences FOR INSERT
WITH CHECK (is_global = TRUE OR auth.uid() = user_id);

-- Add policy for updating global preferences (for admin)
DROP POLICY IF EXISTS "Admins can update global preferences" ON ui_preferences;

CREATE POLICY "Admins can update global preferences"
ON ui_preferences FOR UPDATE
USING (is_global = TRUE OR auth.uid() = user_id);

-- Insert default global preference if not exists
INSERT INTO ui_preferences (user_id, is_global, entity_type, selected_mode)
VALUES (NULL, TRUE, 'pdp_display_mode', 'filmstrip')
ON CONFLICT DO NOTHING;
