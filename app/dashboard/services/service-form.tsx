'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createService, updateService } from './actions';
import Link from 'next/link';

interface ServiceFormProps {
    service?: {
        id: string;
        title: string;
        slug: string;
        description: string | null;
        icon?: string | null;
        features?: string[] | null;
    };
}

export function ServiceForm({ service }: ServiceFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        try {
            if (service) {
                await updateService(service.id, formData);
            } else {
                await createService(formData);
            }
        } catch (error) {
            console.error('Failed to save service:', error);
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
            <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                    id="title"
                    name="title"
                    placeholder="Service Title"
                    defaultValue={service?.title}
                    required
                    disabled={isSubmitting}
                    onChange={(e) => {
                        if (!service) {
                            // Auto-generate slug only for new services
                            const slugInput = document.getElementById('slug') as HTMLInputElement;
                            if (slugInput && !slugInput.value) {
                                slugInput.value = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                            }
                        }
                    }}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                    id="slug"
                    name="slug"
                    placeholder="service-slug"
                    defaultValue={service?.slug}
                    required
                    disabled={isSubmitting}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Service description..."
                    defaultValue={service?.description || ''}
                    rows={4}
                    required
                    disabled={isSubmitting}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="icon">Icon (Lucide Icon Name)</Label>
                <Input
                    id="icon"
                    name="icon"
                    placeholder="e.g. Smartphone, Globe, Code"
                    defaultValue={service?.icon || ''}
                    disabled={isSubmitting}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="features">Features (comma separated)</Label>
                <Input
                    id="features"
                    name="features"
                    placeholder="iOS, Android, React Native"
                    defaultValue={service?.features?.join(', ') || ''}
                    disabled={isSubmitting}
                />
            </div>

            <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : (service ? 'Update Service' : 'Create Service')}
                </Button>
                <Button type="button" variant="outline" asChild disabled={isSubmitting}>
                    <Link href="/dashboard/services">Cancel</Link>
                </Button>
            </div>
        </form>
    );
}
