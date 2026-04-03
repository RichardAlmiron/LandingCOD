import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
    const almidropUrl = process.env.ALMIDROP_SUPABASE_URL || '';
    const almidropKey = process.env.ALMIDROP_SUPABASE_SERVICE_ROLE_KEY || '';
    
    const diagnostics = {
        env: {
            hasUrl: !!almidropUrl,
            hasKey: !!almidropKey,
            urlLength: almidropUrl.length,
            keyLength: almidropKey.length,
            urlPreview: almidropUrl ? `${almidropUrl.substring(0, 30)}...` : 'NO URL',
            keyPreview: almidropKey ? `${almidropKey.substring(0, 20)}...` : 'NO KEY',
        },
        connection: null as any,
        tables: null as any,
        error: null as any
    };
    
    try {
        // Try to create client
        const client = createClient(almidropUrl, almidropKey);
        diagnostics.connection = 'Client created successfully';
        
        // Try a simple query
        const { data, error } = await client
            .from('inventario_bodegas')
            .select('count', { count: 'exact', head: true });
            
        if (error) {
            diagnostics.tables = { error: error.message, code: error.code };
        } else {
            diagnostics.tables = { count: data, success: true };
        }
        
    } catch (err: any) {
        diagnostics.error = err.message;
        diagnostics.connection = 'Failed to create client';
    }
    
    return NextResponse.json(diagnostics);
}
