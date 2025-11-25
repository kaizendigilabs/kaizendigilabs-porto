'use server';

import { createServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProject(formData: FormData) {
    const supabase = await createServerClient();

    const services = formData.get('services') as string;
    const servicesArray = services ? services.split(',').map(s => s.trim()) : [];

    const data = {
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
        description: formData.get('description') as string,
        client: formData.get('client') as string,
        year: formData.get('year') as string,
        category: formData.get('category') as string,
        image_url: formData.get('image_url') as string,
        link: formData.get('link') as string,
        services: servicesArray,
        published: formData.get('published') === 'true' || formData.get('published') === 'on',
    };

    const { error } = await supabase.from('projects').insert([data]);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/projects');
    redirect('/dashboard/projects');
}

export async function updateProject(id: string, formData: FormData) {
    const supabase = await createServerClient();

    const services = formData.get('services') as string;
    const servicesArray = services ? services.split(',').map(s => s.trim()) : [];

    const data = {
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
        description: formData.get('description') as string,
        client: formData.get('client') as string,
        year: formData.get('year') as string,
        category: formData.get('category') as string,
        image_url: formData.get('image_url') as string,
        link: formData.get('link') as string,
        services: servicesArray,
        published: formData.get('published') === 'true' || formData.get('published') === 'on',
        updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
        .from('projects')
        .update(data)
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/projects');
    redirect('/dashboard/projects');
}

export async function deleteProject(id: string) {
    const supabase = await createServerClient();

    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/projects');
    return { success: true };
}

export async function toggleProjectPublished(id: string, published: boolean) {
    const supabase = await createServerClient();

    const { error } = await supabase
        .from('projects')
        .update({ published, updated_at: new Date().toISOString() })
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/projects');
    revalidatePath('/dashboard/projects');
    return { success: true };
}
