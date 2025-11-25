import { ArticleCard } from '@/app/(public)/articles/_components/ArticleCard';
import { formatArticleForCard, ArticleWithAuthor } from '@/lib/types/articles';

interface ReadNextSectionProps {
    articles: ArticleWithAuthor[];
}

export function ReadNextSection({ articles }: ReadNextSectionProps) {
    const formattedArticles = articles.map(article => formatArticleForCard(article));

    return (
        <div className="mx-auto max-w-4xl px-8 mt-24 pt-16 border-t border-zinc-200">
            <h3 className="font-heading text-2xl font-bold mb-8">Read Next</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {formattedArticles.map((article) => (
                    <ArticleCard
                        key={article.slug}
                        article={article}
                        variant="grid"
                    />
                ))}
            </div>
        </div>
    );
}
