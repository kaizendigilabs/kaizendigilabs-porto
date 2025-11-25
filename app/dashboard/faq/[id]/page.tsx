import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { updateFAQ } from '../actions';
import { createServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 0;

export default async function EditFAQPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createServerClient();

    const { data: faq } = await supabase
        .from('faqs')
        .select('*')
        .eq('id', id)
        .single();

    if (!faq) {
        notFound();
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
                    <h1 className="text-3xl font-bold tracking-tight">Edit FAQ</h1>
                    <p className="text-muted-foreground">Update FAQ details</p>
                </div>
            </div>

            <form action={updateFAQ.bind(null, id)} className="max-w-2xl space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="question">Question *</Label>
                    <Input
                        id="question"
                        name="question"
                        defaultValue={faq.question}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="answer">Answer *</Label>
                    <Textarea
                        id="answer"
                        name="answer"
                        defaultValue={faq.answer}
                        rows={6}
                        required
                    />
                </div>



                <div className="flex items-center space-x-2">
                    <Switch id="published" name="published" defaultChecked={faq.published ?? false} />
                    <Label htmlFor="published">Published</Label>
                </div>

                <div className="flex gap-4">
                    <Button type="submit">Update FAQ</Button>
                    <Button type="button" variant="outline" asChild>
                        <Link href="/dashboard/faq">Cancel</Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}
