import SeoMeta from '@/components/SeoMeta';
import FooterCta from '@/components/ui/FooterCta';
import HeroSection from '@/components/ui/HeroSection';
import AppLayout from '@/layouts/AppLayout';
import type { PageHome } from '@/types/content';

export default function Home({ content }: { content?: PageHome }) {
    const pageContent = content || ({} as PageHome);

    return (
        <>
            <SeoMeta />

            {/* Hero Section */}
            <HeroSection
                content={pageContent}
                size="large"
                media={pageContent.media || []}
                showWatermark={true}
            />

            {/* Stats Band */}
            {pageContent.stats && pageContent.stats.length > 0 && (
                <section className="py-12 bg-surface-alt border-y border-border">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {pageContent.stats.map((stat, idx) => (
                                <div key={idx} className="p-4">
                                    <div className="text-3xl sm:text-4xl font-extrabold text-heading">
                                        {stat.value}{stat.suffix || ''}
                                    </div>
                                    <div className="mt-1 text-sm font-medium text-body">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Key Features / Offerings */}
            {pageContent.features && pageContent.features.length > 0 && (
                <section className="py-20 md:py-28 bg-surface">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="text-primary text-xs uppercase tracking-widest font-bold">Capabilities</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-heading mt-2">
                                Engineered for Scalability & Speed
                            </h2>
                            <p className="mt-4 text-body text-lg">
                                Discover how our architecture combines headless flexibility with native ease-of-use.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {pageContent.features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="p-8 rounded-xl border border-border bg-background hover:border-primary transition-all duration-200 shadow-xs"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mb-6">
                                        {idx + 1}
                                    </div>
                                    <h3 className="text-xl font-bold text-heading mb-3">{feature.title}</h3>
                                    <p className="text-body leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

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
