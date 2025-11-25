'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { inviteUser } from '../actions';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NewTeamMemberPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        try {
            const result = await inviteUser(formData);
            if (result?.error) {
                alert(result.error);
                setIsSubmitting(false);
                return;
            }
            router.push('/dashboard/team');
        } catch (error) {
            console.error('Failed to invite team member:', error);
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/team">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Invite Team Member</h1>
                    <p className="text-muted-foreground">Invite a new member to the team via email</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" placeholder="colleague@example.com" required disabled={isSubmitting} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input id="fullName" name="fullName" placeholder="John Doe" required disabled={isSubmitting} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title *</Label>
                        <Input id="jobTitle" name="jobTitle" placeholder="CEO" required disabled={isSubmitting} />
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Inviting...' : 'Invite Member'}</Button>
                    <Button type="button" variant="outline" asChild disabled={isSubmitting}>
                        <Link href="/dashboard/team">Cancel</Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}
