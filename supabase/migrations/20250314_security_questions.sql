-- Migration: Security Questions for Admin Registration
-- Created: 2025-03-14
-- Purpose: Store security questions to restrict admin registration

-- Table for security questions
CREATE TABLE IF NOT EXISTS public.security_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer_hash TEXT NOT NULL, -- Hashed answer for security
    answer_plaintext TEXT, -- Optional: for easy management (consider removing in production)
    is_active BOOLEAN DEFAULT TRUE,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.security_questions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to read active questions (needed for registration)
CREATE POLICY "Allow read active security questions" ON public.security_questions
    FOR SELECT
    USING (is_active = TRUE);

-- Policy: Only admins can manage security questions
CREATE POLICY "Only admins can manage security questions" ON public.security_questions
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.usuarios 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_security_questions_active ON public.security_questions(is_active);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_security_questions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_security_questions_updated_at ON public.security_questions;
CREATE TRIGGER update_security_questions_updated_at
    BEFORE UPDATE ON public.security_questions
    FOR EACH ROW
    EXECUTE FUNCTION update_security_questions_updated_at();

-- Insert the 3 initial security questions
-- Note: In production, you should hash the answers properly
INSERT INTO public.security_questions (question, answer_plaintext, answer_hash, order_index, is_active)
VALUES 
    ('¿Cuál es el nombre de tu mejor amigo de la infancia?', 'eri', encode(digest('eri', 'sha256'), 'hex'), 1, TRUE),
    ('¿En qué escuela primaria estudiaste? (Nombre completo)', 'liceo adela speratti', encode(digest('liceo adela speratti', 'sha256'), 'hex'), 2, TRUE),
    ('¿Cuántos años tiene mi hijo mayor?', '18', encode(digest('18', 'sha256'), 'hex'), 3, TRUE)
ON CONFLICT DO NOTHING;
