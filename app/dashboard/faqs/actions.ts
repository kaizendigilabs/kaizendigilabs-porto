'use server';

import { createServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createFaq(formData: FormData) {
    const supabase = await createServerClient();

    const data = {
        question: formData.get('question') as string,
        answer: formData.get('answer') as string,
        published: formData.get('published') === 'true',
    };

    const { error } = await supabase.from('faqs').insert([data]);
    if (error) throw new Error(error.message);

    revalidatePath('/dashboard/faqs');
    redirect('/dashboard/faqs');
}

export async function updateFaq(id: string, formData: FormData) {
    const supabase = await createServerClient();

    const data = {
        question: formData.get('question') as string,
        answer: formData.get('answer') as string,
        published: formData.get('published') === 'true',
        updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('faqs').update(data).eq('id', id);
    if (error) throw new Error(error.message);

    revalidatePath('/dashboard/faqs');
    redirect('/dashboard/faqs');
}

export async function deleteFaq(id: string) {
    const supabase = await createServerClient();
    const { error } = await supabase.from('faqs').delete().eq('id', id);
    if (error) throw new Error(error.message);
    revalidatePath('/dashboard/faqs');
}

export async function toggleFaqPublished(id: string, published: boolean) {
    const supabase = await createServerClient();
    const { error } = await supabase
        .from('faqs')
        .update({ published, updated_at: new Date().toISOString() })
        .eq('id', id);
    if (error) throw new Error(error.message);
    revalidatePath('/dashboard/faqs');
}
