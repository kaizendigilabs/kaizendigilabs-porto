'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteArticle(slug: string) {
    const supabase = await createServerClient()

    const { error } = await supabase
        .from('articles')
        .delete()
        .eq('slug', slug)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/articles')
    return { success: true }
}

export async function createArticle(data: any) {
    const supabase = await createServerClient()

    // Basic validation
    if (!data.title || !data.slug) {
        return { error: "Title and Slug are required" }
    }

    const { error } = await supabase
        .from('articles')
        .insert({
            title: data.title,
            slug: data.slug,
            content: data.content,
            excerpt: data.excerpt || null,
            image_url: data.image_url || null,
            published: data.published || false,
        })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/articles')
    return { success: true }
}

export async function updateArticle(oldSlug: string, data: any) {
    const supabase = await createServerClient()

    const { error } = await supabase
        .from('articles')
        .update({
            ...data,
            updated_at: new Date().toISOString(),
        })
        .eq('slug', oldSlug)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/articles')
    return { success: true }
}

export async function updateArticleTags(articleId: string, tagIds: string[]) {
    const supabase = await createServerClient()

    // Delete existing article tags
    await supabase
        .from('article_tags')
        .delete()
        .eq('article_id', articleId)

    // Insert new article tags
    if (tagIds.length > 0) {
        const { error } = await supabase
            .from('article_tags')
            .insert(
                tagIds.map(tagId => ({
                    article_id: articleId,
                    tag_id: tagId,
                }))
            )

        if (error) {
            console.error('Error updating article tags:', error)
            return { error: error.message }
        }
    }

    revalidatePath('/dashboard/articles')
    revalidatePath('/articles')
    return { success: true }
}
