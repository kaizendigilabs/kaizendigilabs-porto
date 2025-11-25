'use server';

import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Admin client for invite/reset/delete
// Note: We need SUPABASE_SERVICE_ROLE_KEY in env
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
);

export async function inviteUser(formData: FormData) {
    const email = formData.get('email') as string;
    const fullName = formData.get('fullName') as string;
    const jobTitle = formData.get('jobTitle') as string;

    if (!email || !fullName) {
        return { error: 'Email and Full Name are required' };
    }

    // 1. Invite User via Email
    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
        data: {
            full_name: fullName,
            avatar: '',
        }
    });

    if (error) {
        console.error('Error inviting user:', error);
        return { error: error.message };
    }

    // 2. Update Profile with Job Title
    if (data.user) {
        const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .update({ job_title: jobTitle, status: 'active' })
            .eq('user_id', data.user.id);

        if (profileError) {
            console.error('Error updating profile:', profileError);
        }
    }

    revalidatePath('/dashboard/team');
    return { success: true };
}

export async function resetPassword(email: string) {
    // Generate link to send manually or display
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
        type: 'recovery',
        email,
    });

    if (error) {
        return { error: error.message };
    }

    return { success: true, link: data.properties?.action_link };
}

export async function deleteTeamMember(userId: string) {
    // Delete from auth.users, cascades to profiles
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) {
        return { error: error.message };
    }
    revalidatePath('/dashboard/team');
}

export async function toggleTeamMemberPublished(userId: string, status: 'active' | 'inactive') {
    // We can use standard client here as long as RLS allows update
    // But RLS says "Profiles are updateable by owner or admin".
    // If current user is admin, they can update.
    const supabase = await createServerClient();

    const { error } = await supabase
        .from('profiles')
        .update({ status })
        .eq('user_id', userId);

    if (error) {
        return { error: error.message };
    }
    revalidatePath('/dashboard/team');
}

export async function updateTeamMember(userId: string, formData: FormData) {
    const supabase = await createServerClient();

    const full_name = formData.get('full_name') as string;
    const job_title = formData.get('job_title') as string;
    const bio = formData.get('bio') as string;
    const avatar = formData.get('avatar') as string;
    const display_order = parseInt(formData.get('display_order') as string) || 0;
    const status = formData.get('status') === 'on' ? 'active' : 'inactive';

    // Social links
    const social_links = {
        instagram: formData.get('instagram_url') as string || null,
        twitter: formData.get('twitter_url') as string || null,
        facebook: formData.get('facebook_url') as string || null,
        github: formData.get('github_url') as string || null,
        linkedin: formData.get('linkedin_url') as string || null,
        website: formData.get('website_url') as string || null,
    };

    const { error } = await supabase
        .from('profiles')
        .update({
            full_name,
            job_title,
            bio,
            avatar,
            display_order,
            status,
            social_links
        })
        .eq('user_id', userId);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/team');
    redirect('/dashboard/team');
}

export async function updateTeamOrder(items: { user_id: string; display_order: number }[]) {
    const supabase = await createServerClient();

    for (const item of items) {
        const { error } = await supabase
            .from('profiles')
            .update({ display_order: item.display_order })
            .eq('user_id', item.user_id);

        if (error) {
            console.error('Error updating team order:', error);
            return { error: error.message };
        }
    }

    revalidatePath('/dashboard/team');
    return { success: true };
}
