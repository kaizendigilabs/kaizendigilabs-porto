'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProjectForm } from '../project-form';

export default function NewProjectPage() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/projects">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">New Project</h1>
                    <p className="text-muted-foreground">Add a new project to your portfolio</p>
                </div>
            </div>

            <ProjectForm />
        </div>
    );
}
