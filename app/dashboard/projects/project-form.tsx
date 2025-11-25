'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { createProject, updateProject } from './actions';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageUpload } from '@/components/image-upload';

interface ProjectFormProps {
    project?: {
        id: string;
        title: string;
        slug: string;
        description?: string | null;
        client?: string | null;
        year: string | null;
        category: string | null;
        image_url: string | null;
        link?: string | null;
        services?: string[] | null;
        published: boolean | null;
    };
}

export function ProjectForm({ project }: ProjectFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrl, setImageUrl] = useState(project?.image_url || '');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        try {
            if (project) {
                await updateProject(project.id, formData);
            } else {
                await createProject(formData);
            }
            router.push('/dashboard/projects');
        } catch (error) {
            console.error('Failed to save project:', error);
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
                    placeholder="Project Title"
                    defaultValue={project?.title}
                    required
                    disabled={isSubmitting}
                    onChange={(e) => {
                        if (!project) {
                            // Auto-generate slug only for new projects
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
                    placeholder="project-slug"
                    defaultValue={project?.slug}
                    required
                    disabled={isSubmitting}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Project description..."
                    defaultValue={project?.description || ''}
                    rows={4}
                    disabled={isSubmitting}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Input
                        id="client"
                        name="client"
                        placeholder="Client Name"
                        defaultValue={project?.client || ''}
                        disabled={isSubmitting}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="year">Year *</Label>
                    <Input
                        id="year"
                        name="year"
                        placeholder="2024"
                        defaultValue={project?.year || ''}
                        required
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Input
                        id="category"
                        name="category"
                        placeholder="e.g. Branding, Web Design"
                        defaultValue={project?.category || ''}
                        required
                        disabled={isSubmitting}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="services">Services (comma separated)</Label>
                    <Input
                        id="services"
                        name="services"
                        placeholder="UI/UX, Development, Strategy"
                        defaultValue={project?.services?.join(', ') || ''}
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="link">Project Link</Label>
                <Input
                    id="link"
                    name="link"
                    placeholder="https://example.com"
                    type="url"
                    defaultValue={project?.link || ''}
                    disabled={isSubmitting}
                />
            </div>

            <div className="space-y-2">
                <Label>Cover Image *</Label>
                <ImageUpload
                    value={imageUrl}
                    onChange={(url) => setImageUrl(url || '')}
                    bucket="project-images"
                    disabled={isSubmitting}
                />
                <input type="hidden" name="image_url" value={imageUrl} required />
            </div>

            <div className="flex items-center space-x-2">
                <Switch id="published" name="published" defaultChecked={project?.published ?? true} disabled={isSubmitting} />
                <Label htmlFor="published">Published</Label>
            </div>

            <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting || !imageUrl}>
                    {isSubmitting ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
                </Button>
                <Button type="button" variant="outline" asChild disabled={isSubmitting}>
                    <Link href="/dashboard/projects">Cancel</Link>
                </Button>
            </div>
        </form>
    );
}
