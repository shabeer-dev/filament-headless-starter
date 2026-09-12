import SeoMeta from '@/components/SeoMeta';
import FooterCta from '@/components/ui/FooterCta';
import HeroSection from '@/components/ui/HeroSection';
import Icon from '@/components/ui/Icon';
import AppLayout from '@/layouts/AppLayout';
import { useTranslation } from '@/hooks/useTranslation';
import type { PageHome } from '@/types/content';

export default function Home({ content }: { content?: PageHome }) {
    const pageContent = content || ({} as PageHome);
    const { t, locale } = useTranslation();

    const defaultFeatures = [
        {
            icon: 'widgets',
            badge: 'Headless CMS',
            title: 'Filament v5 Singleton CMS',
            description: 'Bypasses confusing multi-row CRUD for landing pages. Direct single-record editing with native media library and translatable schemas.',
        },
        {
            icon: 'bolt',
            badge: 'SPA Engine',
            title: 'Inertia.js v3 + React 19',
            description: 'Instant client-side transitions without API boilerplate. Built-in prefetching, deferred props, and automatic optimistic updates.',
        },
        {
            icon: 'language',
            badge: 'Localization',
            title: 'JSON Multi-Lingual Architecture',
            description: 'English, Arabic (RTL), and Spanish ready out of the box with zero database schema proliferation.',
        },
        {
            icon: 'tune',
            badge: 'Styling',
            title: 'Tailwind v4 Theme Presets',
            description: 'Switch between Indigo, Emerald, Violet, Amber, and Slate themes simply by changing one CSS variable in theme.css.',
        },
        {
            icon: 'terminal',
            badge: 'CLI Generators',
            title: 'Autonomous Scaffolding',
            description: 'Generate vertical slices (migration, seeder, model, Filament resource, controller, React page, types, routes) in one Artisan command.',
        },
        {
            icon: 'shield',
            badge: 'Security',
            title: 'Turnstile & Spam Shield',
            description: 'Cloudflare Turnstile captcha and Spatie Honeypot pre-configured for bulletproof inquiry protection.',
        },
    ];

    const displayFeatures =
        pageContent.features && pageContent.features.length > 0
            ? pageContent.features
            : defaultFeatures;

    return (
        <>
            <SeoMeta />

            {/* Hero Section */}
            <HeroSection
                content={pageContent}
                size="large"
                media={pageContent.media || []}
                badgeText={t('Filament v5 + React 19 Architecture')}
                primaryCtaText={t('Explore Platform')}
                primaryCtaHref={`/${locale}/about`}
                secondaryCtaText={t('Contact Team')}
                secondaryCtaHref={`/${locale}/contact`}
            />

            {/* Stats Band */}
            {pageContent.stats && pageContent.stats.length > 0 ? (
                <section className="py-12 border-y border-border bg-surface">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            {pageContent.stats.map((stat, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-surface-subtle border border-border-subtle">
                                    <div className="text-3xl sm:text-4xl font-extrabold text-primary">
                                        {stat.value}{stat.suffix || ''}
                                    </div>
                                    <div className="mt-1 text-xs sm:text-sm font-medium text-body">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : (
                <section className="py-12 border-y border-border bg-surface">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div className="p-5 rounded-xl bg-surface-subtle border border-border-subtle">
                                <div className="text-3xl sm:text-4xl font-extrabold text-primary">99.9%</div>
                                <div className="mt-1 text-xs sm:text-sm font-medium text-body">Uptime & Availability</div>
                            </div>
                            <div className="p-5 rounded-xl bg-surface-subtle border border-border-subtle">
                                <div className="text-3xl sm:text-4xl font-extrabold text-primary">&lt;50ms</div>
                                <div className="mt-1 text-xs sm:text-sm font-medium text-body">Instant Inertia Visits</div>
                            </div>
                            <div className="p-5 rounded-xl bg-surface-subtle border border-border-subtle">
                                <div className="text-3xl sm:text-4xl font-extrabold text-primary">100%</div>
                                <div className="mt-1 text-xs sm:text-sm font-medium text-body">Decoupled Headless CMS</div>
                            </div>
                            <div className="p-5 rounded-xl bg-surface-subtle border border-border-subtle">
                                <div className="text-3xl sm:text-4xl font-extrabold text-primary">3+</div>
                                <div className="mt-1 text-xs sm:text-sm font-medium text-body">Languages (LTR & RTL)</div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Bento Grid Feature Showcase */}
            <section className="py-20 md:py-32 bg-background relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="pill-badge mb-4">
                            <Icon name="bolt" className="text-primary text-sm" />
                            <span>{t('Core Capabilities')}</span>
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-heading tracking-tight mt-2">
                            {pageContent.overview_title || t('Engineered for Speed, Precision & Autonomy')}
                        </h2>
                        <p className="mt-4 text-base sm:text-lg text-body max-w-2xl mx-auto">
                            {pageContent.overview_description ||
                                t('Combining modern Laravel backend capabilities with reactive React 19 components and custom CLI generators.')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayFeatures.map((feat: any, idx: number) => (
                            <div key={idx} className="bento-card group">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary-subtle text-primary flex items-center justify-center font-bold">
                                        <Icon name={feat.icon || 'star'} className="text-xl" />
                                    </div>
                                    {feat.badge && (
                                        <span className="text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-surface-subtle text-muted border border-border-subtle">
                                            {feat.badge}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-lg font-bold text-heading mb-2 group-hover:text-primary transition-colors">
                                    {feat.title}
                                </h3>
                                <p className="text-sm text-body leading-relaxed">
                                    {feat.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <FooterCta
                route={pageContent.footer_cta_route}
                title={pageContent.footer_cta_title}
                buttonText={pageContent.footer_cta_button}
                media={pageContent.media || []}
            />
        </>
    );
}

Home.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
