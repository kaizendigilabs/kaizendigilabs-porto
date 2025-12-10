'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { createProject, updateProject } from './actions';
import Link from 'next/link';
import { useState } from 'react';
import { ImageUpload } from '@/components/image-upload';
import { AsyncTagInput } from './_components/async-tag-input';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface ProjectFormProps {
    project?: {
        id: string;
        title: string;
        slug: string;
        description?: string | null;
        year: string | null;
        tech_stack: string[] | null;
        image_url: string | null;
        project_link?: string | null;
        services?: string[] | null;
        published: boolean | null;
        testimonial?: {
            id: string;
            name: string;
            role?: string | null;
            company?: string | null;
            content: string;
            published: boolean | null;
        } | null;
    };
}

export function ProjectForm({ project }: ProjectFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrl, setImageUrl] = useState(project?.image_url || '');
    const [title, setTitle] = useState(project?.title || '');
    const [slug, setSlug] = useState(project?.slug || '');

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
            toast.success(project ? 'Project updated successfully.' : 'Project created successfully.');
            // router.push('/dashboard/projects'); // Handled in action
        } catch (error) {
            console.error('Failed to save project:', error);
            setIsSubmitting(false);
            toast.error('Failed to save project. Please check the fields and try again.');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
            {/* SECTION 1: PROJECT DETAILS */}
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Project Details</h3>
                    <p className="text-sm text-zinc-500">Basic information about the portfolio item.</p>
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                        id="title"
                        name="title"
                        placeholder="Project Title"
                        value={title}
                        required
                        disabled={isSubmitting}
                        onChange={(e) => {
                            const newTitle = e.target.value;
                            setTitle(newTitle);
                            if (!project) {
                                // Auto-generate slug for new projects
                                const newSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                                setSlug(newSlug);
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
                        value={slug}
                        readOnly
                        className="bg-zinc-50 text-zinc-500 cursor-not-allowed" // Visually indicate read-only
                        tabIndex={-1} // Skip tab focus
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
                    <div className="space-y-2">
                        <Label htmlFor="project_link">Project Link</Label>
                        <Input
                            id="project_link"
                            name="project_link"
                            placeholder="https://example.com"
                            type="url"
                            defaultValue={project?.project_link || ''}
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Tech Stack</Label>
                    <AsyncTagInput 
                        initialTags={project?.tech_stack || []}
                        onChange={() => {}} // State managed internally
                        fetchUrl="/api/suggestions/tech-stack"
                        placeholder="Add tech stack (e.g. React, Next.js)"
                        allowCreate={true}
                        inputName="tech_stack"
                    />
                </div>

                 <div className="space-y-2">
                    <Label htmlFor="services">Services</Label>
                    <AsyncTagInput 
                        initialTags={project?.services || []}
                        onChange={() => {}} // State managed internally
                        fetchUrl="/api/suggestions/services"
                        placeholder="Search services (e.g. UI/UX)"
                        allowCreate={false}
                        inputName="services"
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
            </div>

            <Separator />

            {/* SECTION 2: TESTIMONIAL (CLIENT) */}
            <div className="space-y-6">
                 <div>
                    <h3 className="text-lg font-medium">Testimonial & Client</h3>
                    <p className="text-sm text-zinc-500">Client details and their feedback.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="client_name">Client Name *</Label>
                        <Input
                            id="client_name"
                            name="client_name"
                            placeholder="John Doe"
                            defaultValue={project?.testimonial?.name || ''}
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="client_role">Client Role</Label>
                        <Input
                            id="client_role"
                            name="client_role"
                            placeholder="CEO"
                            defaultValue={project?.testimonial?.role || ''}
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                 <div className="space-y-2">
                    <Label htmlFor="client_company">Company</Label>
                    <Input
                        id="client_company"
                        name="client_company"
                        placeholder="Acme Corp"
                        defaultValue={project?.testimonial?.company || ''}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="testimonial_content">Testimonial Content *</Label>
                    <Textarea
                        id="testimonial_content"
                        name="testimonial_content"
                        placeholder="The feedback provided by the client..."
                        defaultValue={project?.testimonial?.content || ''}
                        rows={4}
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <Switch 
                        id="testimonial_published" 
                        name="testimonial_published" 
                        defaultChecked={project?.testimonial?.published ?? true} 
                        disabled={isSubmitting} 
                    />
                    <Label htmlFor="testimonial_published">Publish Testimonial</Label>
                </div>
            </div>

            <div className="flex gap-4 pt-4">
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
