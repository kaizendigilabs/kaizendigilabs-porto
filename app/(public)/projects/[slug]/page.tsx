import { createServerClient } from '@/lib/supabase/server';
import { ProjectViewTracker } from '@/components/analytics/project-view-tracker';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { OptimizedImage } from '@/components/shared/optimized-image';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { CTASection } from '@/components/shared/cta-section';
import type { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createServerClient();

    const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: `${project.title} | Kaizen Digital Labs`,
        description: project.description || `Explore ${project.title} project by Kaizen Digital Labs`,
        openGraph: {
            title: project.title,
            description: project.description || '',
            type: 'website',
            images: [
                {
                    url: project.image_url || '/images/placeholder.svg',
                    width: 1200,
                    height: 630,
                    alt: project.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: project.title,
            description: project.description || '',
            images: [project.image_url || '/images/placeholder.svg'],
        },
    };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const supabase = await createServerClient();

    const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

    // Fetch services for this project via junction table
    const { data: projectServices } = await supabase
        .from('project_services')
        .select(`
            service_id,
            services (
                id,
                title
            )
        `)
        .eq('project_id', project?.id || '');

    const services = projectServices?.map(ps => (ps.services as any)?.title).filter(Boolean) || [];

    if (!project) {
        notFound();
    }

    return (
        <>
            <ProjectViewTracker
                projectId={project.id}
                slug={project.slug}
                title={project.title}
            />
            <main className="min-h-screen pt-(--header-h)">
                {/* HEADER SECTION */}
                <div className="w-full bg-zinc-50 pt-32 pb-16 lg:pt-40 lg:pb-24 px-8">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 mb-8 transition-colors text-sm font-mono uppercase tracking-widest"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Projects
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end">
                        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-zinc-950">
                            {project.title}
                        </h1>

                        <div className="flex flex-col gap-8">
                            <p className="text-lg text-zinc-600 leading-relaxed">
                                {project.description}
                            </p>

                            <div className="grid grid-cols-2 gap-8 border-t border-zinc-200 pt-8">
                                <div>
                                    <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2">Client</h3>
                                    <p className="font-medium text-zinc-900">{project.client || 'Confidential'}</p>
                                </div>
                                <div>
                                    <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2">Year</h3>
                                    <p className="font-medium text-zinc-900">{project.year}</p>
                                </div>
                                <div>
                                    <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2">Services</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {services.length > 0 ? (
                                            services.map((service: string) => (
                                                <span key={service} className="font-medium text-zinc-900">{service}</span>
                                            ))
                                        ) : (
                                            <span className="text-zinc-400">—</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2">Category</h3>
                                    <p className="font-medium text-zinc-900">{project.category}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* HERO IMAGE */}
                <div className="w-full px-4 lg:px-8 mb-24">
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-zinc-200">
                        <OptimizedImage
                            src={project.image_url || '/images/placeholder.svg'}
                            alt={project.title}
                            fill
                            className="object-cover"
                            preload
                        />
                    </div>
                </div>



                {/* NEXT PROJECT NAV (Optional - could be implemented later) */}

                <CTASection />
            </main >
        </>
    );
}
