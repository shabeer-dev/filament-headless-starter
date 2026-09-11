import SeoMeta from '@/components/SeoMeta';
import FooterCta from '@/components/ui/FooterCta';
import HeroSection from '@/components/ui/HeroSection';
import AppLayout from '@/layouts/AppLayout';
import type { PageAbout } from '@/types/content';

export default function About({ content }: { content: PageAbout }) {
    return (
        <>
            <SeoMeta />

            <HeroSection
                content={content}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'About Us' },
                ]}
            />

            {/* Story Section */}
            {(content.story_title || content.story_description) && (
                <section className="py-20 md:py-28 bg-surface border-b border-border">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-primary text-xs uppercase tracking-widest font-bold">Our Foundation</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-heading mt-2 mb-6">
                            {content.story_title || 'Our Mission & Vision'}
                        </h2>
                        {content.story_description && (
                            <p className="text-body text-lg leading-relaxed whitespace-pre-line">
                                {content.story_description}
                            </p>
                        )}
                    </div>
                </section>
            )}

            {/* Core Values */}
            {content.core_values && content.core_values.length > 0 && (
                <section className="py-20 bg-background border-b border-border">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="text-primary text-xs uppercase tracking-widest font-bold">Principles</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-heading mt-2">What We Stand For</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {content.core_values.map((val, idx) => (
                                <div key={idx} className="p-8 rounded-xl bg-surface border border-border">
                                    <h3 className="text-xl font-bold text-heading mb-3">{val.title}</h3>
                                    <p className="text-body leading-relaxed">{val.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Milestones */}
            {content.milestones && content.milestones.length > 0 && (
                <section className="py-20 bg-surface">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-primary text-xs uppercase tracking-widest font-bold">Timeline</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-heading mt-2">Key Milestones</h2>
                        </div>

                        <div className="space-y-8">
                            {content.milestones.map((item, idx) => (
                                <div key={idx} className="flex gap-6 items-start">
                                    <div className="px-4 py-2 rounded-md bg-primary text-heading font-black text-lg">
                                        {item.year}
                                    </div>
                                    <div className="flex-1 pt-1">
                                        <h3 className="text-xl font-bold text-heading mb-1">{item.title}</h3>
                                        <p className="text-body leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <FooterCta
                media={content.media}
                route={content.footer_cta_route}
                title={content.footer_cta_title}
                buttonText={content.footer_cta_button}
            />
        </>
    );
}

About.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
