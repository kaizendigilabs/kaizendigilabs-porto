'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteInquiry(id: string) {
    const supabase = await createServerClient()

    const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/inquiries')
    return { success: true }
}

export async function updateInquiryStatus(id: string, status: string) {
    const supabase = await createServerClient()

    const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/inquiries')
    return { success: true }
}
