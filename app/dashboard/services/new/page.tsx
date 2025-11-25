import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ServiceForm } from '../service-form';

export default function NewServicePage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/services">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold">New Service</h1>
            </div>

            <ServiceForm />
        </div>
    );
}

import { Button } from '@/components/ui/button';
