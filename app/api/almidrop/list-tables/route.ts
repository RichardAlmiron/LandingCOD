import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
    const almidropUrl = process.env.ALMIDROP_SUPABASE_URL || '';
    const almidropKey = process.env.ALMIDROP_SUPABASE_SERVICE_ROLE_KEY || '';
    
    try {
        const client = createClient(almidropUrl, almidropKey);
        
        // Listar todas las tablas del esquema public
        const { data: tables, error } = await client
            .from('pg_tables')
            .select('tablename')
            .eq('schemaname', 'public')
            .not('tablename', 'like', 'pg_%')
            .not('tablename', 'like', '_pg%');
            
        if (error) throw error;
        
        return NextResponse.json({
            success: true,
            tables: tables?.map(t => t.tablename) || [],
            count: tables?.length || 0
        });
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            error: err.message
        }, { status: 500 });
    }
}
