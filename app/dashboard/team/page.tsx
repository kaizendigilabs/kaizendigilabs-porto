import { createServerClient } from '@/lib/supabase/server';
import { DataTable } from '@/components/data-table';
import { columns, TeamMember } from './columns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const revalidate = 0;

export default async function TeamPage() {
    const supabase = await createServerClient();
    const { data: teamMembers } = await supabase
        .from('profiles')
        .select('*')
        .order('display_order', { ascending: true });

    return (
        <DataTable
            columns={columns}
            data={(teamMembers?.map(m => ({ ...m, id: m.user_id })) as unknown as TeamMember[]) || []}
            searchKey="full_name"
            title="Team Members"
            description="Manage your team members and their profiles."
            createButton={
                <Button asChild>
                    <Link href="/dashboard/team/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Team Member
                    </Link>
                </Button>
            }
        />
    );
}
