import { createClient } from '@supabase/supabase-js';

const url = 'https://bakmisrdgjpnrwohjcyn.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJha21pc3JkZ2pwbnJ3b2hqY3luIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTYzNjkwNCwiZXhwIjoyMDg1MjEyOTA0fQ.QA3c2yLIt9QtvPEbLRaEvZoG4ptEFkH-TmKSCe2w25g';

const supabase = createClient(url, key);

async function bruteCount() {
    const tables = [
        'users', 'catalogo_de_los_productos_del_master', 'mis_productos_de_la_bodega',
        'orders', 'transactions', 'pedidos_de_la_bodega_al_master', 'items_del_pedido_de_la_bodega',
        'master_partner_wallets', 'wallet_recharges', 'withdrawals', 'cancellation_requests',
        'compensaciones_por_cancelacion', 'identity_verifications', 'categories', 'banners',
        'login_attempts', 'daily_closings', 'monthly_closings', 'user_daily_summaries',
        'ai_user_memory', 'ai_brain_chats', 'solicitudes_stock', 'favorites', 'comunidades'
    ];

    console.log('=== BRUTE FORCE COUNTS ===\n');
    for (const t of tables) {
        try {
            const { count, error } = await supabase.from(t).select('*', { count: 'exact', head: true });
            if (error) {
                console.log(`[ERR] ${t}: ${error.message}`);
            } else {
                console.log(`- ${t}: ${count}`);
            }
        } catch (e) {
            console.log(`[ERR] ${t}: Exception`);
        }
    }
}

bruteCount();
