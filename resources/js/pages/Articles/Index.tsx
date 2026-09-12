import SeoMeta from '@/components/SeoMeta';
import AppLayout from '@/layouts/AppLayout';
import { Link, usePage } from '@inertiajs/react';
import type { Article } from '@/types/content';

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
}

export default function ArticlesIndex({ articles }: { articles: PaginatedData<Article> }) {
    const { props } = usePage<any>();
    const locale = props.locale || 'en';

    return (
        <>
            <SeoMeta />

            <section className="py-20 bg-background relative overflow-hidden">
                <div className="radial-glow top-0 left-1/2 -translate-x-1/2" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 pill-badge mb-4">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span>Insights & Engineering</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-heading tracking-tight">
                            Latest Publications
                        </h1>
                        <p className="mt-4 text-body text-lg">
                            Explore perspectives on modern architecture, digital solutions, and developer ergonomics.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.data.map((article) => (
                            <article
                                key={article.id}
                                className="bento-card group flex flex-col overflow-hidden hover:border-primary/40 transition-all duration-300"
                            >
                                {article.media && article.media.length > 0 ? (
                                    <div className="h-48 w-full overflow-hidden bg-surface-subtle relative">
                                        <img
                                            src={article.media[0].original_url}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-32 w-full bg-surface-subtle flex items-center justify-center border-b border-border text-caption">
                                        <svg className="w-8 h-8 text-caption/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                        </svg>
                                    </div>
                                )}
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 text-xs text-caption mb-3">
                                            <span>
                                                {article.published_at ? new Date(article.published_at).toLocaleDateString() : 'Draft'}
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-bold text-heading group-hover:text-primary transition-colors leading-snug mb-3">
                                            <Link href={`/${locale}/articles/${article.slug}`}>
                                                {article.title}
                                            </Link>
                                        </h2>
                                        {article.excerpt && (
                                            <p className="text-body text-sm line-clamp-3 leading-relaxed mb-4">
                                                {article.excerpt}
                                            </p>
                                        )}
                                    </div>
                                    <div className="pt-4 border-t border-border/80 flex items-center justify-between text-xs">
                                        <Link
                                            href={`/${locale}/articles/${article.slug}`}
                                            className="text-primary font-semibold hover:underline inline-flex items-center gap-1.5"
                                        >
                                            Read article
                                            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {articles.last_page > 1 && (
                        <div className="mt-12 flex justify-center gap-3">
                            {articles.prev_page_url && (
                                <Link
                                    href={articles.prev_page_url}
                                    className="px-4 py-2 rounded-lg border border-border bg-surface text-heading hover:bg-surface-subtle text-sm font-medium transition-colors"
                                >
                                    Previous
                                </Link>
                            )}
                            {articles.next_page_url && (
                                <Link
                                    href={articles.next_page_url}
                                    className="px-4 py-2 rounded-lg border border-border bg-surface text-heading hover:bg-surface-subtle text-sm font-medium transition-colors"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

ArticlesIndex.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
