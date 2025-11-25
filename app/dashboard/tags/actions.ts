'use server';

import { createServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createTag(formData: FormData) {
    const supabase = await createServerClient();

    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;

    if (!name || !slug) {
        return { error: 'Name and slug are required' };
    }

    const { error } = await supabase.from('tags').insert({
        name,
        slug,
        description: description || null,
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/tags');
    redirect('/dashboard/tags');
}

export async function updateTag(id: string, formData: FormData) {
    const supabase = await createServerClient();

    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;

    if (!name || !slug) {
        return { error: 'Name and slug are required' };
    }

    const { error } = await supabase
        .from('tags')
        .update({
            name,
            slug,
            description: description || null,
            updated_at: new Date().toISOString(),
        })
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/tags');
    redirect('/dashboard/tags');
}

export async function deleteTag(id: string) {
    const supabase = await createServerClient();

    const { error } = await supabase
        .from('tags')
        .delete()
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/tags');
    return { success: true };
}
