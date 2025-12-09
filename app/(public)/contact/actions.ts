'use server';

import { createServerClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { sendNotificationEmail } from '@/lib/aws-ses';
import { headers } from 'next/headers';
import { checkRateLimit } from '@/lib/rate-limit';

const inquirySchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email('Invalid email address'),
    phone: z.string().optional(),
    company: z.string().optional(),
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type InquiryState = {
    error?: string;
    success?: boolean;
    fieldErrors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        company?: string[];
        subject?: string[];
        message?: string[];
    };
};

export async function submitInquiry(prevState: InquiryState, formData: FormData): Promise<InquiryState> {
    // 1. Rate Limit Check
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    
    if (!checkRateLimit(ip).success) {
        return {
            error: 'Too many requests. Please try again later.'
        };
    }

    const validatedFields = inquirySchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        subject: formData.get('subject'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        const fieldErrors: Record<string, string[]> = {};
        validatedFields.error.issues.forEach((issue) => {
            const key = issue.path[0] as string;
            if (!fieldErrors[key]) {
                fieldErrors[key] = [];
            }
            fieldErrors[key].push(issue.message);
        });

        return {
            error: 'Validation failed. Please check your inputs.',
            fieldErrors: fieldErrors as InquiryState['fieldErrors'],
        };
    }

    const supabase = await createServerClient();

    try {
        const { error } = await supabase.from('inquiries').insert({
            name: validatedFields.data.name,
            email: validatedFields.data.email,
            phone: validatedFields.data.phone || null,
            company: validatedFields.data.company || null,
            subject: validatedFields.data.subject,
            message: validatedFields.data.message,
            status: 'new',
        });

        if (error) {
            console.error('Supabase error:', error);
            return { error: 'Failed to submit inquiry. Please try again later.' };
        }

        // Send notification email asynchronously (fire and forget)
        const notificationData = {
            name: validatedFields.data.name,
            email: validatedFields.data.email,
            phone: validatedFields.data.phone || null,
            company: validatedFields.data.company || null,
            subject: validatedFields.data.subject,
            message: validatedFields.data.message,
        };
        
        // We import it dynamically or at top level. Let's add import at top level first.
        // But here we just call it.
        await sendNotificationEmail(notificationData);

        return { success: true };
    } catch (error) {
        console.error('Unexpected error:', error);
        return { error: 'An unexpected error occurred. Please try again later.' };
    }
}
