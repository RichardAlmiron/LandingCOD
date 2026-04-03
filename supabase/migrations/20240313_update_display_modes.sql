-- Update ui_preferences table for new display modes
-- Date: 2024-03-13

-- Update default value for new records
ALTER TABLE ui_preferences 
    ALTER COLUMN selected_mode SET DEFAULT 'filmstrip';

-- Update existing records that use deleted modes
UPDATE ui_preferences 
    SET selected_mode = 'filmstrip' 
    WHERE selected_mode IN ('fullscreenslider', 'cardstack');

-- Update the comment
COMMENT ON TABLE ui_preferences IS 'Stores user UI preferences - Film Strip and Cover Flow modes only';
