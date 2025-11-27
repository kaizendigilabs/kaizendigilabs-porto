import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

/**
 * Health check endpoint to keep Supabase project active.
 * This endpoint is called by Vercel Cron every 8 hours.
 */
export async function GET(req: Request) {
    const auth = req.headers.get("Authorization");
    
    if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const supabase = await createServerClient();

        // Simple query to keep the database connection active
        const { error } = await supabase
            .from('roles')
            .select('id')
            .limit(1);

        if (error) {
            console.error('Health check failed:', error);
            return NextResponse.json(
                { status: 'error', message: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            message: 'Health check successful'
        });
    } catch (error) {
        console.error('Health check exception:', error);
        return NextResponse.json(
            { status: 'error', message: 'Internal server error' },
            { status: 500 }
        );
    }
}
