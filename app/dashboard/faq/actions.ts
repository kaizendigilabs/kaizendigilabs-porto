'use server';

import { createServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createFAQ(formData: FormData) {
    const supabase = await createServerClient();

    const data = {
        question: formData.get('question') as string,
        answer: formData.get('answer') as string,
        display_order: parseInt(formData.get('display_order') as string) || 0,
        published: formData.get('published') === 'true' || formData.get('published') === 'on',
    };

    const { error } = await supabase.from('faqs').insert([data]);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/faq');
    redirect('/dashboard/faq');
}

export async function updateFAQ(id: string, formData: FormData) {
    const supabase = await createServerClient();

    const data = {
        question: formData.get('question') as string,
        answer: formData.get('answer') as string,
        display_order: parseInt(formData.get('display_order') as string) || 0,
        published: formData.get('published') === 'true' || formData.get('published') === 'on',
        updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
        .from('faqs')
        .update(data)
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/faq');
    redirect('/dashboard/faq');
}

export async function deleteFAQ(id: string) {
    const supabase = await createServerClient();

    const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/faq');
}

export async function toggleFAQPublished(id: string, published: boolean) {
    const supabase = await createServerClient();

    const { error } = await supabase
        .from('faqs')
        .update({ published, updated_at: new Date().toISOString() })
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/faq');
}

export async function updateFAQOrder(items: { id: string; display_order: number }[]) {
    const supabase = await createServerClient();

    for (const item of items) {
        const { error } = await supabase
            .from('faqs')
            .update({ display_order: item.display_order })
            .eq('id', item.id);

        if (error) {
            console.error('Error updating FAQ order:', error);
            return { error: error.message };
        }
    }

    revalidatePath('/dashboard/faq');
    return { success: true };
}
