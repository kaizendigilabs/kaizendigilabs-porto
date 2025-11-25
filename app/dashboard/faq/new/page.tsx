'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { createFAQ } from '../actions';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewFAQPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        try {
            await createFAQ(formData);
            router.push('/dashboard/faq');
        } catch (error) {
            console.error('Failed to create FAQ:', error);
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/faq">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">New FAQ</h1>
                    <p className="text-muted-foreground">Add a new frequently asked question</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="question">Question *</Label>
                    <Input
                        id="question"
                        name="question"
                        placeholder="What services do you offer?"
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="answer">Answer *</Label>
                    <Textarea
                        id="answer"
                        name="answer"
                        placeholder="We offer a wide range of services..."
                        rows={6}
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="display_order">Display Order</Label>
                    <Input
                        id="display_order"
                        name="display_order"
                        type="number"
                        defaultValue="0"
                        min="0"
                        disabled={isSubmitting}
                    />
                    <p className="text-sm text-muted-foreground">
                        Lower numbers appear first
                    </p>
                </div>

                <div className="flex items-center space-x-2">
                    <Switch id="published" name="published" defaultChecked disabled={isSubmitting} />
                    <Label htmlFor="published">Published</Label>
                </div>

                <div className="flex gap-4">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create FAQ'}
                    </Button>
                    <Button type="button" variant="outline" asChild disabled={isSubmitting}>
                        <Link href="/dashboard/faq">Cancel</Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}
