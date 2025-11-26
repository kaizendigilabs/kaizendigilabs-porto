import { PageHero } from '@/components/shared/page-hero';
import { FeaturedArticle } from './_components/FeaturedArticle';
import { ArticleFeed } from './_components/ArticleFeed';
import { ArticlesSidebar } from '@/app/(public)/articles/_components/ArticlesSidebar';
import { EmptyState } from '@/components/shared/empty-state';
import { createServerClient } from '@/lib/supabase/server';
import { ArticleWithAuthor } from '@/lib/types/articles';
import { FileText } from 'lucide-react';

export const revalidate = 0;

export default async function Articles({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const params = await searchParams;
  const tagSlug = params.tag;

  const supabase = await createServerClient();

  // Fetch all tags and article_tags for merging
  const [tagsResult, articleTagsResult] = await Promise.all([
    supabase.from('tags').select('id, name, slug'),
    supabase.from('article_tags').select('article_id, tag_id'),
  ]);

  const allTags = tagsResult.data || [];
  const allArticleTags = articleTagsResult.data || [];

  let query = supabase
    .from('articles')
    .select('*, profiles(full_name, avatar)')
    .eq('published', true);

  // If tag filter is applied, filter by article_tags
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

  // Merge tags into articles
  const filteredArticles: ArticleWithAuthor[] = (articles || []).map(article => {
    const articleTagIds = allArticleTags
      .filter(at => at.article_id === article.id)
      .map(at => at.tag_id);

    const articleTags = allTags
      .filter(tag => articleTagIds.includes(tag.id))
      .map(tag => ({ name: tag.name, slug: tag.slug }));

    return {
      ...article,
      tags: articleTags,
    };
  });

  // Fetch ALL articles for sidebar (unfiltered)
  const { data: allArticlesData } = await supabase
    .from('articles')
    .select('*, profiles(full_name, avatar)')
    .eq('published', true)
    .order('created_at', { ascending: false });

  const allArticles: ArticleWithAuthor[] = (allArticlesData || []).map(article => {
    const articleTagIds = allArticleTags
      .filter(at => at.article_id === article.id)
      .map(at => at.tag_id);

    const articleTags = allTags
      .filter(tag => articleTagIds.includes(tag.id))
      .map(tag => ({ name: tag.name, slug: tag.slug }));

    return {
      ...article,
      tags: articleTags,
    };
  });

  // Get the most recent article as featured
  const featuredArticle = filteredArticles[0];

  return (
    <main className="min-h-screen pt-(--header-h)">
      <PageHero
        title="OUR INSIGHTS"
        description="Thoughts, guides, and lessons on design, technology, and digital strategy. All written to help you make better decisions in your next digital project."
        kanji="記事"
      />

      <div className="mx-auto w-full max-w-7xl px-8 py-16 lg:py-24">
        {filteredArticles.length === 0 ? (
          <EmptyState
            icon={<FileText className="w-16 h-16" />}
            title="No Articles Yet"
            description="We're working on creating insightful content for you. Check back soon for our latest articles on design, technology, and digital strategy."
          />
        ) : (
          <>
            {/* FEATURED ARTICLE */}
            {featuredArticle && (
              <FeaturedArticle article={featuredArticle} />
            )}

            {/* HYBRID LAYOUT */}
            <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-24 items-start">

              {/* LEFT SIDEBAR (Sticky) - Always show all articles */}
              <div className="hidden lg:block sticky top-32">
                <ArticlesSidebar articles={allArticles} />
              </div>

              {/* MAIN FEED - Show filtered articles */}
              <ArticleFeed articles={filteredArticles} />

            </div>
          </>
        )}
      </div>
    </main>
  );
}
