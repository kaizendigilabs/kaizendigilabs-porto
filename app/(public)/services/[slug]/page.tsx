import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { ServiceViewTracker } from '@/components/analytics/service-view-tracker';
import { PageHero } from '@/components/shared/page-hero';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Metadata } from 'next';

interface ServiceDetailPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createServerClient();
    const { data: service } = await supabase
        .from('services')
        .select('title, description')
        .eq('slug', slug)
        .single();

    if (!service) {
        return {
            title: 'Service Not Found',
        };
    }

    return {
        title: `${service.title} | Kaizen Digital Labs`,
        description: service.description,
    };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
    const { slug } = await params;
    const supabase = await createServerClient();

    // Fetch service data
    const { data: service } = await supabase
        .from('services')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!service) {
        notFound();
    }

    return (
        <>
            <ServiceViewTracker
                serviceId={service.id}
                slug={service.slug}
                title={service.title}
            />
            <main className="min-h-screen pt-(--header-h) bg-zinc-50 relative overflow-hidden">
                {/* DECORATIVE KANJI WATERMARK */}
                <div className="absolute top-0 right-0 pointer-events-none select-none z-0 opacity-5">
                    <span className="font-body font-bold text-[20rem] leading-none text-zinc-900 [writing-mode:vertical-rl]">
                        奉仕
                    </span>
                </div>

                <PageHero
                    title={service.title}
                    description={service.description || ''}
                />

                <div className="mx-auto max-w-7xl px-8 py-24 relative z-10">
                    <div className="mb-16">
                        <Button variant="ghost" asChild className="pl-0 hover:pl-2 transition-all font-mono tracking-widest uppercase text-xs text-zinc-500 hover:text-zinc-900">
                            <Link href="/services">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Services
                            </Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                        {/* LEFT COLUMN: Overview */}
                        <div className="lg:col-span-7 space-y-12">
                            <div className="prose prose-zinc max-w-none">
                                <h2 className="font-heading text-3xl font-semibold mb-6 text-zinc-900">Overview</h2>
                                <p className="text-lg text-zinc-600 leading-relaxed">
                                    {service.description}
                                </p>
                                <p className="text-lg text-zinc-600 leading-relaxed">
                                    We approach {service.title.toLowerCase()} with a focus on precision, scalability, and user experience. Our team leverages the latest technologies to deliver solutions that not only meet your current needs but also position you for future growth.
                                </p>
                            </div>

                            {/* CTA Section (Embedded) */}
                            <div className="mt-12 p-8 lg:p-12 bg-zinc-900 text-zinc-50 rounded-none relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none transition-transform duration-700 group-hover:scale-110">
                                    <ArrowUpRight className="w-32 h-32" />
                                </div>
                                <h3 className="font-heading text-2xl lg:text-3xl font-semibold mb-4 relative z-10">
                                    Ready to start?
                                </h3>
                                <p className="text-zinc-400 mb-8 max-w-md relative z-10">
                                    Let&apos;s discuss how we can help you achieve your goals with our {service.title} services.
                                </p>
                                <Button size="lg" asChild className="bg-white text-zinc-900 hover:bg-zinc-200 rounded-none font-mono tracking-widest relative z-10">
                                    <Link href="/contact">GET IN TOUCH</Link>
                                </Button>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Capabilities */}
                        <div className="lg:col-span-5">
                            {service.capabilities && service.capabilities.length > 0 && (
                                <div className="bg-white border border-zinc-200 p-8 lg:p-10 shadow-sm">
                                    <h2 className="font-heading text-xl font-semibold mb-8 text-zinc-900 flex items-center gap-3">
                                        <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                                        Capabilities
                                    </h2>
                                    <ul className="space-y-4">
                                        {service.capabilities.map((capability: string, index: number) => (
                                            <li
                                                key={index}
                                                className="flex items-start group"
                                            >
                                                <span className="font-mono text-xs text-zinc-400 mr-4 mt-1 group-hover:text-indigo-600 transition-colors">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                                <span className="font-medium text-zinc-700 group-hover:text-zinc-900 transition-colors">
                                                    {capability}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
