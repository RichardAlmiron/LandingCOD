import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('⚠️ Missing Supabase environment variables. Database connections will fail at runtime.');
}

/**
 * Server-side Supabase client using Service Role Key.
 * Has full database access — only use in API routes / server components.
 * Never expose to the client.
 */
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});

// ─── Type helpers ────────────────────────────────────────────────────────────

export interface DbUser {
    id: string;
    email: string;
    name: string;
    password_hash: string;
    plan: 'free' | 'pro' | 'enterprise';
    role: 'user' | 'admin';
    created_at: string;
    updated_at: string;
}

export interface DbSesionActiva {
    id: string;
    user_id: string;
    refresh_token_hash: string;
    expires_at: string;
    created_at: string;
}

export interface DbTiendaPublicada {
    id: string;
    user_id: string;
    identificador_url: string;
    name: string;
    template: string;
    pdp_template: string;
    store_data: Record<string, unknown>;
    status: 'draft' | 'published';
    views: number;
    created_at: string;
    updated_at: string;
}

export interface DbPdpPublicada {
    id: string;
    user_id: string;
    identificador_url: string;
    name: string;
    pdp_template: string;
    store_data: Record<string, unknown>;
    status: 'draft' | 'published';
    views: number;
    created_at: string;
    updated_at: string;
}
