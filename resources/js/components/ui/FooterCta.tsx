import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation';
import Icon from '@/components/ui/Icon';
import type { MediaItem } from '@/types/content';

interface FooterCtaProps {
    route?: string | null;
    title?: string | null;
    buttonText?: string | null;
    href?: string;
    description?: string | null;
    media?: MediaItem[];
}

export default function FooterCta({
    title,
    buttonText,
    href,
    route,
    description,
    media,
}: FooterCtaProps) {
    const { t, locale } = useTranslation();
    const finalHref = href || `/${locale}/contact`;
    const finalTitle = title || t('Ready to Build Something Exceptional?');
    const finalButtonText = buttonText || t('Start a Project');
    const finalDesc =
        description ||
        t('Connect with our engineering team to explore headless CMS flexibility, enterprise scalability, and tailored solutions.');

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-surface to-surface-subtle p-8 sm:p-12 md:p-16 text-center shadow-xs">
                    {/* Radial glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-glow rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-subtle text-primary mb-4">
                            <span>🚀</span> {t('Next-Generation Platform')}
                        </span>

                        <h2 className="text-3xl sm:text-4xl font-extrabold text-heading tracking-tight">
                            {finalTitle}
                        </h2>

                        <p className="mt-4 text-base sm:text-lg text-body leading-relaxed">
                            {finalDesc}
                        </p>

                        <div className="mt-8 flex justify-center">
                            <Link
                                href={finalHref}
                                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm shadow-sm hover:bg-primary-hover transition-all duration-150 group"
                            >
                                {finalButtonText}
                                <Icon
                                    name="arrow_forward"
                                    className="ml-2 text-base group-hover:translate-x-1 transition-transform"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
