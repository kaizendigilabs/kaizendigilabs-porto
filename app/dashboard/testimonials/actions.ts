'use server';

import { createServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createTestimonial(formData: FormData) {
    const supabase = await createServerClient();

    const data = {
        project_id: formData.get('project_id') as string, // Required now
        name: formData.get('name') as string,
        role: formData.get('role') as string,
        company: formData.get('company') as string,
        content: formData.get('content') as string,
        published: formData.get('published') === 'true' || formData.get('published') === 'on',
    };

    const { error } = await supabase.from('testimonials').insert([data]);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/testimonials');
    redirect('/dashboard/testimonials');
}

export async function updateTestimonial(id: string, formData: FormData) {
    const supabase = await createServerClient();

    const data = {
        name: formData.get('name') as string,
        role: formData.get('role') as string,
        company: formData.get('company') as string,
        content: formData.get('content') as string,
        published: formData.get('published') === 'true' || formData.get('published') === 'on',
        updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
        .from('testimonials')
        .update(data)
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/testimonials');
    redirect('/dashboard/testimonials');
}

export async function deleteTestimonial(id: string) {
    const supabase = await createServerClient();

    const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/testimonials');
}

export async function toggleTestimonialPublished(id: string, published: boolean) {
    const supabase = await createServerClient();

    const { error } = await supabase
        .from('testimonials')
        .update({ published, updated_at: new Date().toISOString() })
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/testimonials');
}

export async function updateTestimonialOrder(items: { id: string; display_order: number }[]) {
    const supabase = await createServerClient();

    for (const item of items) {
        const { error } = await supabase
            .from('testimonials')
            .update({ display_order: item.display_order })
            .eq('id', item.id);

        if (error) {
            console.error('Error updating testimonial order:', error);
            return { error: error.message };
        }
    }

    revalidatePath('/dashboard/testimonials');
    return { success: true };
}
