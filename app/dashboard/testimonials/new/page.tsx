'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ImageUpload } from '@/components/image-upload';
import { createTestimonial } from '../actions';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NewTestimonialPage() {
    const router = useRouter();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        // Add image URL to form data if exists
        if (imageUrl) {
            formData.set('image_url', imageUrl);
        }

        try {
            await createTestimonial(formData);
            router.push('/dashboard/testimonials');
        } catch (error) {
            console.error('Failed to create testimonial:', error);
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/testimonials">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">New Testimonial</h1>
                    <p className="text-muted-foreground">Add a new client testimonial</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Jane Smith"
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="role">Role *</Label>
                        <Input
                            id="role"
                            name="role"
                            placeholder="Founder"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="company">Company *</Label>
                        <Input
                            id="company"
                            name="company"
                            placeholder="Acme Inc."
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="text">Testimonial *</Label>
                    <Textarea
                        id="text"
                        name="text"
                        placeholder="Working with this team was amazing..."
                        rows={6}
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Profile Image (Optional)</Label>
                    <ImageUpload
                        value={imageUrl}
                        onChange={setImageUrl}
                        bucket="testimonial-images"
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
                        {isSubmitting ? 'Creating...' : 'Create Testimonial'}
                    </Button>
                    <Button type="button" variant="outline" asChild disabled={isSubmitting}>
                        <Link href="/dashboard/testimonials">Cancel</Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}
