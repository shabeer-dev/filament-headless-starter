import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation';
import Icon from '@/components/ui/Icon';
import type { HeroFields, MediaItem } from '@/types/content';

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

export interface HeroSectionProps {
    content?: Partial<HeroFields> | null;
    breadcrumbs?: BreadcrumbItem[];
    newLine?: boolean;
    size?: 'standard' | 'large';
    media?: MediaItem[];
    showBadge?: boolean;
    badgeText?: string;
    primaryCtaText?: string;
    primaryCtaHref?: string;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
    children?: React.ReactNode;
}

export default function HeroSection({
    content,
    breadcrumbs,
    size = 'standard',
    media,
    showBadge = true,
    badgeText,
    primaryCtaText,
    primaryCtaHref,
    secondaryCtaText,
    secondaryCtaHref,
    children,
}: HeroSectionProps) {
    const { t, locale } = useTranslation();
    const { appName } = usePage<any>().props;

    const isLarge = size === 'large';
    const mediaItems = media || (content as any)?.media || [];
    const backgroundMedia = mediaItems?.find(
        (m: MediaItem) => m.collection_name === 'hero',
    );

    const title = content?.hero_title || 'Architected for Scale, Speed, and Autonomy';
    const highlight = content?.hero_highlighted || '';
    const description =
        content?.hero_description ||
        'A decoupled enterprise architecture combining the effortless admin controls of Filament v5 with the blistering client performance of Inertia.js and React 19.';

    return (
        <section
            className={`relative w-full overflow-hidden bento-grid-pattern ${
                isLarge
                    ? 'pt-28 md:pt-40 pb-20 md:pb-32'
                    : 'pt-24 md:pt-32 pb-16 md:pb-24'
            }`}
        >
            {/* Subtle radial glow matching active theme */}
            <div className="absolute inset-0 radial-glow pointer-events-none" />

            {/* Optional CMS Uploaded Media */}
            {backgroundMedia && (
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
                    {backgroundMedia.mime_type?.startsWith('video/') ? (
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                            src={backgroundMedia.original_url}
                        />
                    ) : (
                        <img
                            src={backgroundMedia.original_url}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-background/80" />
                </div>
            )}

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <nav className="mb-6" aria-label="Breadcrumb">
                        <ol className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted font-medium">
                            {breadcrumbs.map((crumb, idx) => (
                                <React.Fragment key={idx}>
                                    {idx > 0 && (
                                        <span className="opacity-40">/</span>
                                    )}
                                    <li>
                                        {crumb.href ? (
                                            <Link
                                                href={crumb.href}
                                                className="hover:text-primary transition-colors"
                                            >
                                                {crumb.label}
                                            </Link>
                                        ) : (
                                            <span className="text-heading font-semibold">
                                                {crumb.label}
                                            </span>
                                        )}
                                    </li>
                                </React.Fragment>
                            ))}
                        </ol>
                    </nav>
                )}

                <div className="max-w-3xl">
                    {/* Modern Pill Status Badge */}
                    {showBadge && (
                        <div className="mb-6 animate-fade-up">
                            <span className="pill-badge">
                                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                                <span>{badgeText || t('Modern Headless Architecture')}</span>
                            </span>
                        </div>
                    )}

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-heading leading-[1.1] animate-fade-up">
                        {title}{' '}
                        {highlight && (
                            <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                                {highlight}
                            </span>
                        )}
                    </h1>

                    {/* Subtitle */}
                    {description && (
                        <p className="mt-6 text-lg sm:text-xl text-body leading-relaxed max-w-2xl animate-fade-up">
                            {description}
                        </p>
                    )}

                    {/* CTA Actions */}
                    <div className="mt-8 flex flex-wrap items-center gap-4 animate-fade-up">
                        <Link
                            href={primaryCtaHref || `/${locale}/contact`}
                            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-semibold text-sm shadow-sm hover:bg-primary-hover transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            {primaryCtaText || t('Get Started')}
                            <Icon name="arrow_forward" className="ml-2 text-base" />
                        </Link>

                        <Link
                            href={secondaryCtaHref || `/${locale}/about`}
                            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border bg-surface text-heading font-semibold text-sm hover:border-border-strong hover:bg-surface-subtle transition-all duration-150"
                        >
                            {secondaryCtaText || t('Learn More')}
                        </Link>
                    </div>

                    {children}
                </div>
            </div>
        </section>
    );
}
