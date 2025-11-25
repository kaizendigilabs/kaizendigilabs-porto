import { createServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ServiceForm } from '../service-form';
import { Button } from '@/components/ui/button';

export const revalidate = 0;

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createServerClient();
    const { data: service } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();

    if (!service) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/services">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold">Edit Service</h1>
            </div>

            <ServiceForm service={service} />
        </div>
    );
}
