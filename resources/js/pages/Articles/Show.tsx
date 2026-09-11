import SeoMeta from '@/components/SeoMeta';
import AppLayout from '@/layouts/AppLayout';
import { Link } from '@inertiajs/react';
import type { Article } from '@/types/content';

export default function ArticleShow({ article }: { article: Article }) {
    return (
        <>
            <SeoMeta />

            <article className="py-16 md:py-24 bg-background">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <Link href="/articles" className="text-sm font-medium text-primary hover:underline">
                            ← Back to Articles
                        </Link>
                    </div>

                    <header className="mb-10">
                        <h1 className="text-3xl sm:text-5xl font-bold text-heading leading-tight">{article.title}</h1>
                        {article.published_at && (
                            <p className="mt-4 text-sm text-caption">Published on {new Date(article.published_at).toLocaleDateString()}</p>
                        )}
                    </header>

                    {article.media && article.media.length > 0 && (
                        <div className="mb-10 rounded-2xl overflow-hidden border border-border max-h-[480px]">
                            <img src={article.media[0].original_url} alt={article.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    {article.content && (
                        <div
                            className="prose prose-lg max-w-none text-body"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    )}
                </div>
            </article>
        </>
    );
}

ArticleShow.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
