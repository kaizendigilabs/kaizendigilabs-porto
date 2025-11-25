'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { updateTeamMember } from '../actions';
import Link from 'next/link';
import { ArrowLeft, Instagram, Twitter, Facebook, Github, Linkedin, Globe } from 'lucide-react';

interface EditTeamMemberFormProps {
    member: any; // Using any to avoid complex type duplication for now, or import Profile type
    id: string;
}

export function EditTeamMemberForm({ member, id }: EditTeamMemberFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const socialLinks = (member.social_links as any) || {};

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        try {
            const result = await updateTeamMember(id, formData);
            if (result?.error) {
                alert(result.error);
                setIsSubmitting(false);
            }
            // Redirect is handled by server action
        } catch (error) {
            console.error('Failed to update team member:', error);
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                        id="full_name"
                        name="full_name"
                        defaultValue={member.full_name || ''}
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="job_title">Job Title *</Label>
                    <Input
                        id="job_title"
                        name="job_title"
                        defaultValue={member.job_title || ''}
                        required
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="bio">Bio (Optional)</Label>
                <Textarea
                    id="bio"
                    name="bio"
                    defaultValue={member.bio || ''}
                    rows={4}
                    disabled={isSubmitting}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="avatar">Avatar URL *</Label>
                <Input
                    id="avatar"
                    name="avatar"
                    type="url"
                    defaultValue={member.avatar || ''}
                    required
                    disabled={isSubmitting}
                />
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Social Media (Optional)</h3>

                <div className="space-y-2">
                    <Label htmlFor="instagram_url" className="flex items-center gap-2">
                        <Instagram className="w-4 h-4" />
                        Instagram
                    </Label>
                    <Input
                        id="instagram_url"
                        name="instagram_url"
                        type="url"
                        defaultValue={socialLinks.instagram || ''}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="twitter_url" className="flex items-center gap-2">
                        <Twitter className="w-4 h-4" />
                        X (Twitter)
                    </Label>
                    <Input
                        id="twitter_url"
                        name="twitter_url"
                        type="url"
                        defaultValue={socialLinks.twitter || ''}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="facebook_url" className="flex items-center gap-2">
                        <Facebook className="w-4 h-4" />
                        Facebook
                    </Label>
                    <Input
                        id="facebook_url"
                        name="facebook_url"
                        type="url"
                        defaultValue={socialLinks.facebook || ''}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="github_url" className="flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        GitHub
                    </Label>
                    <Input
                        id="github_url"
                        name="github_url"
                        type="url"
                        defaultValue={socialLinks.github || ''}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="linkedin_url" className="flex items-center gap-2">
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                    </Label>
                    <Input
                        id="linkedin_url"
                        name="linkedin_url"
                        type="url"
                        defaultValue={socialLinks.linkedin || ''}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="website_url" className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Website
                    </Label>
                    <Input
                        id="website_url"
                        name="website_url"
                        type="url"
                        defaultValue={socialLinks.website || ''}
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                    id="display_order"
                    name="display_order"
                    type="number"
                    defaultValue={member.display_order ?? 0}
                    min="0"
                    disabled={isSubmitting}
                />
                <p className="text-sm text-muted-foreground">
                    Lower numbers appear first
                </p>
            </div>

            <div className="flex items-center space-x-2">
                <Switch id="status" name="status" defaultChecked={member.status === 'active'} disabled={isSubmitting} />
                <Label htmlFor="status">Active</Label>
            </div>

            <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Updating...' : 'Update Team Member'}</Button>
                <Button type="button" variant="outline" asChild disabled={isSubmitting}>
                    <Link href="/dashboard/team">Cancel</Link>
                </Button>
            </div>
        </form>
    );
}
