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

export async function replyInquiry(inquiryId: string, message: string, userEmail: string, originalSubject: string) {
    const supabase = await createServerClient()

    // 1. Get current admin session for audit log
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || !user.email) {
        return { error: 'Unauthorized' }
    }

    // 2. Send Email via AWS SES
    const emailResult = await import('@/lib/aws-ses').then(mod => 
        mod.sendReplyEmail(userEmail, message, originalSubject)
    )

    if (!emailResult.success) {
        return { error: 'Failed to send email. Check AWS credentials.' }
    }

    // 3. Insert Reply Log
    const { error: replyError } = await supabase
        .from('inquiry_replies')
        .insert({
            inquiry_id: inquiryId,
            message: message,
            sender: user.email // Audit: who actually sent this
        })

    if (replyError) {
        console.error('Error logging reply:', replyError)
        // We continue because email was sent successfully
    }

    // 4. Update Inquiry Status
    const { error: updateError } = await supabase
        .from('inquiries')
        .update({ status: 'replied' })
        .eq('id', inquiryId)

    if (updateError) {
       console.error('Error updating status:', updateError)
    }

    revalidatePath('/dashboard/inquiries')
    return { success: true }
}
