'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteService(id: string) {
    const supabase = await createServerClient()

    const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/services')
    return { success: true }
}

export async function createService(formData: FormData) {
    const supabase = await createServerClient()

    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const description = formData.get('description') as string
    const capabilities = formData.get('capabilities') as string

    if (!title || !slug || !description) {
        return { error: 'Missing required fields' }
    }

    const capabilitiesArray = capabilities ? capabilities.split(',').map(f => f.trim()).filter(Boolean) : []

    const { error } = await supabase
        .from('services')
        .insert({
            title,
            slug,
            description,
            capabilities: capabilitiesArray,
        })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/services')
    redirect('/dashboard/services')
}

export async function updateService(id: string, formData: FormData) {
    const supabase = await createServerClient()

    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const description = formData.get('description') as string
    const capabilities = formData.get('capabilities') as string

    if (!title || !slug || !description) {
        return { error: 'Missing required fields' }
    }

    const capabilitiesArray = capabilities ? capabilities.split(',').map(f => f.trim()).filter(Boolean) : []

    const { error } = await supabase
        .from('services')
        .update({
            title,
            slug,
            description,
            capabilities: capabilitiesArray,
            updated_at: new Date().toISOString(),
        })
        .eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/services')
    redirect('/dashboard/services')
}

export async function updateServiceOrder(items: { id: string; display_order: number }[]) {
    const supabase = await createServerClient();

    for (const item of items) {
        const { error } = await supabase
            .from('services')
            .update({ display_order: item.display_order })
            .eq('id', item.id);

        if (error) {
            console.error('Error updating service order:', error);
            return { error: error.message };
        }
    }

    revalidatePath('/dashboard/services');
    return { success: true };
}
