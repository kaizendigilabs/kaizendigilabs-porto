import { PageHero } from '@/components/shared/page-hero';
import { FeaturedArticle } from './_components/FeaturedArticle';
import { ArticleFeed } from './_components/ArticleFeed';
import { ArticlesSidebar } from '@/components/shared/articles-sidebar';
import { EmptyState } from '@/components/shared/empty-state';
import { createServerClient } from '@/lib/supabase/server';
import { FileText } from 'lucide-react';

export const revalidate = 0;

export default async function Articles({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const params = await searchParams;
  const tagSlug = params.tag;

  const supabase = await createServerClient();

  let query = supabase
    .from('articles')
    .select('*')
    .eq('published', true);

  // If tag filter is applied, join with article_tags
  if (tagSlug) {
    // First get the tag ID
    const { data: tag } = await supabase
      .from('tags')
      .select('id')
      .eq('slug', tagSlug)
      .single();

    if (tag) {
      // Get article IDs that have this tag
      const { data: articleTags } = await supabase
        .from('article_tags')
        .select('article_id')
        .eq('tag_id', tag.id);

      const articleIds = articleTags?.map(at => at.article_id) || [];

      if (articleIds.length > 0) {
        query = query.in('id', articleIds);
      } else {
        // No articles with this tag
        query = query.eq('id', 'none'); // Force empty result
      }
    }
  }

  const { data: articles } = await query.order('created_at', { ascending: false });

  const allArticles = articles || [];
  // Get the most recent article as featured
  const featuredArticle = allArticles[0];

  return (
    <main className="min-h-screen pt-(--header-h)">
      <PageHero
        title="OUR INSIGHTS"
        description="A collection of essays and perspectives on design, technology, and digital strategy. Curated for the modern web."
        kanji="記事"
      />

      <div className="mx-auto w-full max-w-7xl px-8 py-16 lg:py-24">
        {allArticles.length === 0 ? (
          <EmptyState
            icon={<FileText className="w-16 h-16" />}
            title="No Articles Yet"
            description="We're working on creating insightful content for you. Check back soon for our latest articles on design, technology, and digital strategy."
          />
        ) : (
          <>
            {/* FEATURED ARTICLE */}
            {featuredArticle && (
              <FeaturedArticle
                slug={featuredArticle.slug}
                title={featuredArticle.title}
                excerpt={featuredArticle.excerpt || ''}
                category="Article"
                date={new Date(featuredArticle.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                author="Kaizen Digital Labs"
                imageURL={featuredArticle.image_url || '/images/placeholder.svg'}
              />
            )}

            {/* HYBRID LAYOUT */}
            <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-24 items-start">

              {/* LEFT SIDEBAR (Sticky) */}
              <div className="hidden lg:block sticky top-32">
                <ArticlesSidebar articles={allArticles} />
              </div>

              {/* MAIN FEED */}
              <ArticleFeed articles={allArticles} />

            </div>
          </>
        )}
      </div>
    </main>
  );
}
