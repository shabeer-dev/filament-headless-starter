import SeoMeta from '@/components/SeoMeta';
import FooterCta from '@/components/ui/FooterCta';
import HeroSection from '@/components/ui/HeroSection';
import Icon from '@/components/ui/Icon';
import AppLayout from '@/layouts/AppLayout';
import { useTranslation } from '@/hooks/useTranslation';
import type { PageAbout } from '@/types/content';

export default function About({ content }: { content?: PageAbout }) {
    const pageContent = content || ({} as PageAbout);
    const { t, locale } = useTranslation();

    const defaultValues = [
        {
            icon: 'rocket_launch',
            title: t('Engineering Precision'),
            description: t('We prioritize architectural clarity, test coverage, and high-performance patterns in every component.'),
        },
        {
            icon: 'verified_user',
            title: t('Autonomy & Security'),
            description: t('Built-in spam protection, cryptographic security standards, and self-documenting agent guidelines.'),
        },
        {
            icon: 'public',
            title: t('Universal Accessibility'),
            description: t('Designed from day one to operate globally across multiple languages, regions, and responsive screens.'),
        },
    ];

    const displayValues =
        pageContent.core_values && pageContent.core_values.length > 0
            ? pageContent.core_values
            : defaultValues;

    return (
        <>
            <SeoMeta />

            <HeroSection
                content={pageContent}
                media={pageContent.media || []}
                badgeText={t('About Our Platform')}
                breadcrumbs={[
                    { label: t('Home'), href: `/${locale}` },
                    { label: t('About Us') },
                ]}
            />

            {/* Story / Mission Section */}
            <section className="py-20 md:py-28 bg-surface border-b border-border">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="pill-badge mb-4">
                        <Icon name="flag" className="text-primary text-sm" />
                        <span>{t('Our Foundation')}</span>
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-heading mt-2 mb-6">
                        {pageContent.story_title || t('Built for Teams Who Demand Speed and Control')}
                    </h2>
                    <p className="text-body text-base sm:text-lg leading-relaxed whitespace-pre-line max-w-3xl mx-auto">
                        {pageContent.story_description ||
                            t('We engineered this starter kit to eliminate the friction between backend CMS control and modern reactive frontend engineering. With Filament managing rich schema data and Inertia delivering instant SPA interactions, teams can launch enterprise-grade web applications in days instead of months.')}
                    </p>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 md:py-28 bg-background border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="pill-badge mb-4">
                            <Icon name="workspace_premium" className="text-primary text-sm" />
                            <span>{t('Guiding Principles')}</span>
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-heading mt-2">
                            {t('What We Stand For')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {displayValues.map((val: any, idx: number) => (
                            <div key={idx} className="bento-card">
                                <div className="w-10 h-10 rounded-lg bg-primary-subtle text-primary flex items-center justify-center font-bold mb-4">
                                    <Icon name={val.icon || 'star'} className="text-xl" />
                                </div>
                                <h3 className="text-lg font-bold text-heading mb-2">{val.title}</h3>
                                <p className="text-sm text-body leading-relaxed">{val.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Milestones / Timeline */}
            {pageContent.milestones && pageContent.milestones.length > 0 && (
                <section className="py-20 md:py-28 bg-surface">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="pill-badge mb-4">
                                <Icon name="timeline" className="text-primary text-sm" />
                                <span>{t('Evolution')}</span>
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-heading mt-2">
                                {t('Key Milestones')}
                            </h2>
                        </div>

                        <div className="space-y-6">
                            {pageContent.milestones.map((item, idx) => (
                                <div key={idx} className="flex gap-6 items-start p-6 rounded-xl border border-border bg-surface-subtle">
                                    <div className="px-3.5 py-1.5 rounded-lg bg-primary text-white font-bold text-sm shrink-0">
                                        {item.year}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-heading mb-1">{item.title}</h3>
                                        <p className="text-sm text-body leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <FooterCta
                media={pageContent.media || []}
                route={pageContent.footer_cta_route}
                title={pageContent.footer_cta_title}
                buttonText={pageContent.footer_cta_button}
            />
        </>
    );
}

About.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
