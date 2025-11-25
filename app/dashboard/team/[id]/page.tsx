import { Button } from '@/components/ui/button';
import { createServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { EditTeamMemberForm } from './edit-form';

export const revalidate = 0;

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createServerClient();

    const { data: member } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', id)
        .single();

    if (!member) {
        notFound();
    }

    const socialLinks = (member.social_links as any) || {};

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/team">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Team Member</h1>
                    <p className="text-muted-foreground">Update team member details</p>
                </div>
            </div>

            <EditTeamMemberForm member={member} id={id} />
        </div>
    );
}
