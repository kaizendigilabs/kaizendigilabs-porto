import { ArticleContent } from './_components/ArticleContent';
import { ArticleTOC } from './_components/ArticleTOC';
import { ReadNextSection } from './_components/ReadNextSection';
import { ArticleViewTracker } from '@/components/analytics/article-view-tracker';
import { createServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { OptimizedImage } from '@/components/shared/optimized-image';
import Link from 'next/link';
import { ArrowLeft, Share2, Bookmark } from 'lucide-react';
import type { Metadata } from 'next';
import { slugify, calculateReadTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createServerClient();

  const { data: article } = await supabase
    .from('articles')
    .select('*, author:profiles(full_name, avatar)')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | Kaizen Digital Labs`,
    description: article.excerpt || `Read ${article.title} on Kaizen Digital Labs`,
    openGraph: {
      title: article.title,
      description: article.excerpt || '',
      type: 'article',
      publishedTime: article.created_at,
      authors: article.author?.full_name ? [article.author.full_name] : [],
      tags: [],
      images: [
        {
          url: article.image_url || '/images/placeholder.svg',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || '',
      images: [article.image_url || '/images/placeholder.svg'],
    },
  };
}

// Helper to extract outline from Tiptap content
function extractOutline(content: any) {
  const outline: { id: string; title: string; level: 1 | 2 }[] = [];

  if (!content || !content.content || !Array.isArray(content.content)) {
    return outline;
  }

  content.content.forEach((block: any) => {
    if (block.type === 'heading') {
      const text = block.content?.map((n: any) => n.text).join('') || '';
      if (text) {
        const level = block.attrs?.level;
        outline.push({
          id: slugify(text),
          title: text,
          level: (level === 1 || level === 2) ? level : 2
        });
      }
    }
  });

  return outline;
}

export default async function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createServerClient();

  const { data: article } = await supabase
    .from('articles')
    .select('*, author:profiles(full_name, avatar, job_title)')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!article) {
    notFound();
  }

  // Fetch tags for this article
  const { data: articleTags } = await supabase
    .from('article_tags')
    .select(`
      tag_id,
      tags (
        id,
        name,
        slug
      )
    `)
    .eq('article_id', article.id);

  const tags = articleTags?.map(at => (at.tags as any)).filter(Boolean) || [];

  // Generate outline from content
  const outline = extractOutline(article.content);
  const readTime = calculateReadTime(article.content);

  // Get related articles (excluding current article)
  const { data: relatedArticlesData } = await supabase
    .from('articles')
    .select('*, profiles(full_name, avatar)')
    .neq('slug', slug)
    .eq('published', true)
    .limit(2);

  const relatedArticles = relatedArticlesData || [];

  return (
    <>
      <ArticleViewTracker
        articleId={article.id}
        slug={article.slug}
        title={article.title}
      />
      <main className="min-h-screen pt-(--header-h) pb-24">
        {/* HEADER SECTION */}
        <div className="w-full bg-zinc-950 text-zinc-50 pt-32 pb-16 lg:pt-40 lg:pb-24 px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors text-sm font-mono uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Articles
            </Link>

            <div className="mb-4">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                {readTime}
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-balance">
              {article.title}
            </h1>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="w-full max-w-6xl mx-auto -mt-12 lg:-mt-20 px-4 lg:px-8 relative z-10">
          <div className="relative aspect-21/9 w-full overflow-hidden shadow-lg bg-zinc-200">
            <OptimizedImage
              src={article.image_url || '/images/placeholder.svg'}
              alt={article.title}
              fill
              className="object-cover"
              preload
            />
          </div>
        </div>

        {/* CONTENT LAYOUT */}
        <div className="mx-auto max-w-7xl px-8 mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-[1fr_minmax(auto,768px)_1fr] gap-12">

          {/* LEFT SIDEBAR (Share) */}
          <div className="hidden lg:flex flex-col items-end gap-4 sticky top-32 h-fit">
            <Link
              href="/articles"
              className="p-3 rounded-full bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-900 transition-all shadow-sm"
              aria-label="Back to Articles"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <button className="p-3 rounded-full bg-white border border-zinc-200 text-zinc-500 hover:text-red-600 hover:border-red-600 transition-all shadow-sm">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-full bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-900 transition-all shadow-sm">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>

          {/* MAIN CONTENT */}
          <div className="w-full">
            <ArticleContent content={article.content as any} />

            {/* TAGS */}
            {tags.length > 0 && (
              <div className="mt-12">
                <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-400 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: any) => (
                    <Button
                      key={tag.id}
                      asChild
                      size="sm"
                      className="text-xs font-mono font-medium bg-zinc-100 text-muted-foreground hover:text-primary-foreground"
                    >
                      <Link href={`/articles?tag=${tag.slug}`}>
                        {tag.name}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <hr className="my-12 border-zinc-200" />

            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full bg-zinc-200 overflow-hidden">
                <OptimizedImage
                  src={article.author?.avatar || '/images/placeholder.svg'}
                  alt={article.author?.full_name || 'Author'}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900">{article.author?.full_name || ''}</p>
                {article.author?.job_title && (
                  <p className="text-xs text-zinc-500">{article.author.job_title}</p>
                )}
              </div>
            </div>

            <p className="text-sm text-zinc-500 italic mt-6">
              Published on {new Date(article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* RIGHT SIDEBAR (TOC) */}
          <ArticleTOC outline={outline} />

        </div>

        {/* READ NEXT SECTION */}
        {relatedArticles.length > 0 && (
          <ReadNextSection articles={relatedArticles} />
        )}

      </main >
    </>
  );
}
