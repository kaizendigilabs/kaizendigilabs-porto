import { Tables } from './database';

/**
 * Article with author profile relation
 * Used when fetching articles with author information from Supabase
 */
export type ArticleWithAuthor = Tables<'articles'> & {
    profiles: {
        full_name: string | null;
        avatar: string | null;
    } | null;
    tags?: {
        name: string;
        slug: string;
    }[];
};

/**
 * Article interface for ArticleCard component
 * This is the format expected by the ArticleCard component
 */
export interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    imageURL: string;
    readTime: string;
    author: string;
}

import { calculateReadTime } from '@/lib/utils';

/**
 * Convert ArticleWithAuthor to Article format for ArticleCard
 */
export function formatArticleForCard(article: ArticleWithAuthor, readTime?: string): Article {
    return {
        id: article.id,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt || '',
        date: new Date(article.created_at).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }),
        imageURL: article.image_url || '/images/placeholder.svg',
        readTime: readTime || calculateReadTime(article.content),
        author: article.profiles?.full_name || '',
    };
}
