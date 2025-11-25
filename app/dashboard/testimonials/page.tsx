import { createServerClient } from '@/lib/supabase/server';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const revalidate = 0;

export default async function TestimonialsPage() {
    const supabase = await createServerClient();
    const { data: testimonials } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });

    return (
        <DataTable
            columns={columns}
            data={testimonials || []}
            searchKey="name"
            title="Testimonials"
            description="Manage client testimonials and reviews."
            createButton={
                <Button asChild>
                    <Link href="/dashboard/testimonials/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Testimonial
                    </Link>
                </Button>
            }
        />
    );
}
