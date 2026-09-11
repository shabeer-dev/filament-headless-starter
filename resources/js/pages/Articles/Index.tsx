import SeoMeta from '@/components/SeoMeta';
import AppLayout from '@/layouts/AppLayout';
import { Link } from '@inertiajs/react';
import type { Article } from '@/types/content';

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
}

export default function ArticlesIndex({ articles }: { articles: PaginatedData<Article> }) {
    return (
        <>
            <SeoMeta />

            <section className="py-20 bg-background border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-primary text-sm font-semibold tracking-wider uppercase">Insights</span>
                        <h1 className="text-4xl sm:text-5xl font-bold text-heading mt-2">Latest Articles</h1>
                        <p className="mt-4 text-body text-lg">Browse our publications, industry insights, and engineering updates.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.data.map((article) => (
                            <article key={article.id} className="bg-surface rounded-xl border border-border overflow-hidden hover:shadow-lg transition duration-200 flex flex-col">
                                {article.media && article.media.length > 0 && (
                                    <div className="h-48 w-full overflow-hidden bg-surface-alt">
                                        <img
                                            src={article.media[0].original_url}
                                            alt={article.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h2 className="text-xl font-bold text-heading hover:text-primary transition-colors mb-2">
                                        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                                    </h2>
                                    {article.excerpt && <p className="text-body text-sm line-clamp-3 mb-4">{article.excerpt}</p>}
                                    <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-xs text-caption">
                                        <span>{article.published_at ? new Date(article.published_at).toLocaleDateString() : ''}</span>
                                        <Link href={`/articles/${article.slug}`} className="text-primary font-medium hover:underline">Read more →</Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {articles.last_page > 1 && (
                        <div className="mt-12 flex justify-center gap-4">
                            {articles.prev_page_url && (
                                <Link href={articles.prev_page_url} className="px-4 py-2 rounded-md border border-border bg-surface text-heading hover:bg-surface-alt text-sm">Previous</Link>
                            )}
                            {articles.next_page_url && (
                                <Link href={articles.next_page_url} className="px-4 py-2 rounded-md border border-border bg-surface text-heading hover:bg-surface-alt text-sm">Next</Link>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

ArticlesIndex.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
