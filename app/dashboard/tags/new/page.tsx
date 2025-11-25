'use client';

import { createTag } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

export default function NewTagPage() {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await createTag(formData);
            if (result?.error) {
                toast.error(result.error);
            }
        });
    };

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
                <h1 className="text-3xl font-bold tracking-tight">Create New Tag</h1>
                <p className="text-muted-foreground">
                    Add a new tag for organizing articles.
                </p>
            </div>

            <form action={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Next.js"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                        id="slug"
                        name="slug"
                        placeholder="nextjs"
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
                        placeholder="Articles about Next.js framework..."
                        rows={3}
                    />
                </div>

                <div className="flex gap-4">
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Creating...' : 'Create Tag'}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                        <Link href="/dashboard/tags">Cancel</Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}
