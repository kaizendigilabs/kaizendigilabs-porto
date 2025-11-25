'use server';

import { createServerClient } from '@/lib/supabase/server';

/**
 * Increment article views counter in database
 * Called from ArticleViewTracker after 3 second delay (anti-bot)
 * 
 * This is for PUBLIC display (Top Insights sidebar, article cards)
 * Vercel Analytics handles admin insights separately
 */
export async function incrementArticleViews(articleId: string) {
    try {
        const supabase = await createServerClient();

        const { error } = await supabase.rpc('increment_article_views', {
            article_id: articleId
        });

        if (error) {
            console.error('Failed to increment article views:', error);
        }
    } catch (error) {
        console.error('Error incrementing article views:', error);
    }
}

/**
 * Increment project views counter in database
 * Called from ProjectViewTracker after 3 second delay
 */
export async function incrementProjectViews(projectId: string) {
    try {
        const supabase = await createServerClient();

        const { error } = await supabase.rpc('increment_project_views', {
            project_id: projectId
        });

        if (error) {
            console.error('Failed to increment project views:', error);
        }
    } catch (error) {
        console.error('Error incrementing project views:', error);
    }
}

/**
 * Increment service views counter in database
 * Called from ServiceViewTracker after 3 second delay
 */
export async function incrementServiceViews(serviceId: string) {
    try {
        const supabase = await createServerClient();

        const { error } = await supabase.rpc('increment_service_views', {
            service_id: serviceId
        });

        if (error) {
            console.error('Failed to increment service views:', error);
        }
    } catch (error) {
        console.error('Error incrementing service views:', error);
    }
}
