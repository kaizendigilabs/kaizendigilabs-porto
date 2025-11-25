import { createServerClient } from '@/lib/supabase/server';
import { DataTable } from '@/components/data-table';
import { columns, FAQ } from './columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export const revalidate = 0;

export default async function FAQPage() {
    const supabase = await createServerClient();

    const { data: faqs } = await supabase
        .from('faqs')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="flex flex-col gap-8 p-8">
            <DataTable
                columns={columns}
                data={(faqs as unknown as FAQ[]) || []}
                searchKey="question"
                title="FAQs"
                description="Manage frequently asked questions."
                createButton={
                    <Button asChild>
                        <Link href="/dashboard/faq/new">
                            <Plus className="mr-2 h-4 w-4" /> New FAQ
                        </Link>
                    </Button>
                }
            />
        </div>
    );
}
