import { createServerClient } from '@/lib/supabase/server';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

export default async function TagsPage() {
    const supabase = await createServerClient();
    const { data: tags } = await supabase
        .from('tags')
        .select('*')
        .order('name', { ascending: true });

    return (
        <DataTable
            columns={columns}
            data={tags || []}
            searchKey="name"
            title="Tags"
            description="Manage article tags for better organization and SEO."
            createButton={
                <Button asChild>
                    <Link href="/dashboard/tags/new">
                        <Plus className="mr-2 h-4 w-4" /> New Tag
                    </Link>
                </Button>
            }
        />
    );
}
