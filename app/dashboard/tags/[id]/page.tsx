'use client';

import { useEffect, useState, useTransition } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import { updateTag } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { toast } from 'sonner';

export default function EditTagPage({ params }: { params: Promise<{ id: string }> }) {
    const [id, setId] = useState<string>('');
    const [tag, setTag] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        params.then(p => setId(p.id));
    }, [params]);

    useEffect(() => {
        if (!id) return;

        const supabase = createBrowserClient();
        supabase
            .from('tags')
            .select('*')
            .eq('id', id)
            .single()
            .then(({ data }) => {
                if (!data) {
                    notFound();
                }
                setTag(data);
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await updateTag(id, formData);
            if (result?.error) {
                toast.error(result.error);
            }
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!tag) {
        return notFound();
    }

    return (
        <div className="flex flex-col gap-8 max-w-2xl">
            <div>
                <Link
                    href="/dashboard/tags"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Tags
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Edit Tag</h1>
                <p className="text-muted-foreground">
                    Update tag information.
                </p>
            </div>

            <form action={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                        id="name"
                        name="name"
                        defaultValue={tag.name}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                        id="slug"
                        name="slug"
                        defaultValue={tag.slug}
                        required
                    />
                    <p className="text-xs text-muted-foreground">
                        URL-friendly version (lowercase, no spaces)
                    </p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        defaultValue={tag.description || ''}
                        rows={3}
                    />
                </div>

                <div className="flex gap-4">
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Updating...' : 'Update Tag'}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                        <Link href="/dashboard/tags">Cancel</Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}
