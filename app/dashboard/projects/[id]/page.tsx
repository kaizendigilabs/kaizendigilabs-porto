import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { updateProject } from '../actions';
import { createServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProjectForm } from '../project-form';

export const revalidate = 0;

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createServerClient();

    const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

    if (!project) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/projects">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
                    <p className="text-muted-foreground">Update project details</p>
                </div>
            </div>

            <ProjectForm project={project} />
        </div>
    );
}
