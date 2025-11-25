'use server';

import { createServerClient } from '@/lib/supabase/server';

export async function trackPageView(path: string, device: string) {
    const supabase = await createServerClient();

    // We don't await this to avoid blocking the UI
    supabase.from('analytics').insert({
        path,
        device,
    }).then(({ error }) => {
        if (error) console.error('Analytics error:', error);
    });
}

export async function getTrafficData(days: number = 30) {
    const supabase = await createServerClient();

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
        .from('analytics')
        .select('created_at, device')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching traffic data:', error);
        return [];
    }

    // Process data for the chart
    // We need to group by date and count desktop/mobile
    const groupedData = new Map<string, { date: string, desktop: number, mobile: number }>();

    // Initialize all days in the range with 0
    for (let i = 0; i <= days; i++) {
        const d = new Date(startDate);
        d.setDate(d.getDate() + i);
        const dateStr = d.toISOString().split('T')[0];
        groupedData.set(dateStr, { date: dateStr, desktop: 0, mobile: 0 });
    }

    data.forEach(record => {
        const dateStr = new Date(record.created_at).toISOString().split('T')[0];
        const entry = groupedData.get(dateStr);
        if (entry) {
            if (record.device === 'desktop') {
                entry.desktop++;
            } else {
                entry.mobile++;
            }
        }
    });

    return Array.from(groupedData.values());
}
