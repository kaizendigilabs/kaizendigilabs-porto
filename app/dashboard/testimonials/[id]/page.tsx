import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { updateTestimonial } from '../actions';
import { createServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 0;

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createServerClient();

    const { data: testimonial } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single();

    if (!testimonial) {
        notFound();
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
                    <h1 className="text-3xl font-bold tracking-tight">Edit Testimonial</h1>
                    <p className="text-muted-foreground">Update testimonial details</p>
                </div>
            </div>

            <form action={updateTestimonial.bind(null, id)} className="max-w-2xl space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                        id="name"
                        name="name"
                        defaultValue={testimonial.name}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="role">Role *</Label>
                        <Input
                            id="role"
                            name="role"
                            defaultValue={testimonial.role || ''}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="company">Company *</Label>
                        <Input
                            id="company"
                            name="company"
                            defaultValue={testimonial.company || ''}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="content">Testimonial *</Label>
                    <Textarea
                        id="content"
                        name="content"
                        defaultValue={testimonial.content}
                        rows={6}
                        required
                    />
                </div>



                <div className="flex items-center space-x-2">
                    <Switch id="published" name="published" defaultChecked={testimonial.published ?? false} />
                    <Label htmlFor="published">Published</Label>
                </div>

                <div className="flex gap-4">
                    <Button type="submit">Update Testimonial</Button>
                    <Button type="button" variant="outline" asChild>
                        <Link href="/dashboard/testimonials">Cancel</Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}
