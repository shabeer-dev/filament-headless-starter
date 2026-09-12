import SeoMeta from '@/components/SeoMeta';
import AppLayout from '@/layouts/AppLayout';
import { Link, usePage } from '@inertiajs/react';
import type { Article } from '@/types/content';

export default function ArticleShow({ article }: { article: Article }) {
    const { props } = usePage<any>();
    const locale = props.locale || 'en';

    return (
        <>
            <SeoMeta />

            <article className="py-16 md:py-24 bg-background relative overflow-hidden">
                <div className="radial-glow top-0 left-1/2 -translate-x-1/2" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="mb-8">
                        <Link
                            href={`/${locale}/articles`}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Articles
                        </Link>
                    </div>

                    <header className="mb-10">
                        <h1 className="text-3xl sm:text-5xl font-extrabold text-heading tracking-tight leading-tight">
                            {article.title}
                        </h1>
                        {article.published_at && (
                            <p className="mt-4 text-sm text-caption">
                                Published on {new Date(article.published_at).toLocaleDateString()}
                            </p>
                        )}
                    </header>

                    {article.media && article.media.length > 0 && (
                        <div className="mb-10 rounded-2xl overflow-hidden border border-border shadow-sm max-h-[480px]">
                            <img src={article.media[0].original_url} alt={article.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    {article.content && (
                        <div
                            className="prose prose-lg max-w-none text-body leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    )}
                </div>
            </article>
        </>
    );
}

ArticleShow.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
