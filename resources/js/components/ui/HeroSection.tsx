import React from 'react';
import { Link } from '@inertiajs/react';
import HeadingLabel from '@/components/ui/HeadingLabel';
import DisplayHeading from '@/components/ui/DisplayHeading';
import HeroDescription from '@/components/ui/HeroDescription';
import HeroActions from '@/components/ui/HeroActions';
import Icon from '@/components/ui/Icon';
import { useTranslation } from '@/hooks/useTranslation';
import type { HeroFields, MediaItem } from '@/types/content';

interface Breadcrumb {
    label: string;
    href?: string;
}

interface HeroSectionProps {
    content: HeroFields;
    breadcrumbs?: Breadcrumb[];
    newLine?: boolean;
    size?: 'standard' | 'large';
    media?: MediaItem[];
    showWatermark?: boolean;
    fallbackImage?: string;
    fallbackVideo?: string;
    children?: React.ReactNode;
}

export default function HeroSection({
    content,
    breadcrumbs,
    newLine = true,
    size = 'standard',
    media,
    showWatermark = false,
    fallbackImage,
    fallbackVideo,
    children
}: HeroSectionProps) {
    const { t } = useTranslation();

    const mediaItems = media || (content as any)?.media || [];
    const backgroundMedia = mediaItems?.find(
        (m: MediaItem) => m.collection_name === 'hero',
    );
    
    // Determine the container classes based on size
    const isLarge = size === 'large';

    // Determine effective media (CMS background media or high-resolution fallbacks)
    const getEffectiveMedia = () => {
        if (backgroundMedia) {
            const isVid = backgroundMedia.mime_type?.startsWith('video/') || backgroundMedia.file_name?.match(/\.(mp4|webm|ogg|mov)$/i);
            return {
                type: isVid ? 'video' : 'image',
                url: backgroundMedia.original_url,
                alt: backgroundMedia.name ? backgroundMedia.name.replace(/[-_]/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) : 'Hero Background',
            };
        }

        if (fallbackVideo) {
            return { type: 'video', url: fallbackVideo, alt: 'Hero Video' };
        }
        if (fallbackImage) {
            return { type: 'image', url: fallbackImage, alt: 'Hero Background' };
        }

        if (isLarge) {
            return { type: 'video', url: '/images/hero-video.mp4', alt: 'Orbiz Automotivez Global Video' };
        }

        // Automatic fallback based on breadcrumb labels and title
        const crumbLabels = (breadcrumbs || []).map((b) => b.label.toLowerCase()).join(' ');
        const titleStr = `${content.hero_title || ''} ${content.hero_highlighted || ''}`.toLowerCase();

        if (crumbLabels.includes('hsrp') || titleStr.includes('hsrp')) {
            return { type: 'image', url: '/storage/content/hsrp-2876e.png', alt: 'HSRP Solutions' };
        }
        if (crumbLabels.includes('safeguard') || titleStr.includes('safeguard')) {
            return { type: 'image', url: '/storage/content/hsrp-safeguards-a4c7c.png', alt: 'HSRP Safeguards' };
        }
        if (crumbLabels.includes('international') || titleStr.includes('international')) {
            return { type: 'image', url: '/storage/content/international-license-plates-4fb7b.webp', alt: 'International License Plates' };
        }
        if (crumbLabels.includes('machine') || titleStr.includes('machine')) {
            return { type: 'image', url: '/storage/content/production-line-machines-e3b86.jpeg', alt: 'Production Line Machines' };
        }
        if (crumbLabels.includes('fun') || titleStr.includes('fun')) {
            return { type: 'image', url: '/storage/content/fun-plates-e6482.jpeg', alt: 'Fun Plates' };
        }
        if (crumbLabels.includes('emboss') || titleStr.includes('emboss')) {
            return { type: 'image', url: '/storage/content/embossing-tools-foils-ca009.png', alt: 'Embossing Tools & Foils' };
        }
        if (crumbLabels.includes('sign') || titleStr.includes('sign')) {
            return { type: 'image', url: '/storage/content/orbiz-signz-signages-60748.webp', alt: 'Orbiz Signz Signages' };
        }
        if (crumbLabels.includes('global') || titleStr.includes('global')) {
            return { type: 'image', url: '/images/global-reach-map.png', alt: 'Global Reach' };
        }
        if (crumbLabels.includes('technology') || titleStr.includes('technology') || titleStr.includes('rfid')) {
            return { type: 'image', url: '/images/rfid-feature-image.png', alt: 'RFID Technology' };
        }

        return { type: 'image', url: '/images/about-us-hero.png', alt: 'Orbiz Automotivez' };
    };

    const effectiveMedia = getEffectiveMedia();
    
    return (
        <section
            className={
                isLarge
                    ? "relative flex min-h-[85vh] items-center overflow-hidden bg-[#1A1A1A] text-white pt-24 md:pt-32 pb-16 md:pb-24"
                    : "relative w-full overflow-hidden bg-[#1A1A1A] text-white pt-20 md:pt-28 pb-16 md:pb-24"
            }
        >
            <div className="absolute inset-0 z-0 pointer-events-none">
                {effectiveMedia ? (
                    <>
                        <div className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden">
                            {effectiveMedia.type === 'video' ? (
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
                                    src={effectiveMedia.url}
                                ></video>
                            ) : (
                                <img
                                    src={effectiveMedia.url}
                                    alt={effectiveMedia.alt}
                                    loading="eager"
                                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
                                />
                            )}
                        </div>
                        {/* 35% Opacity #1A1A1A overlay per brand PDF direction */}
                        <div className="absolute inset-0 bg-[#1A1A1A]/35"></div>
                        <div className="absolute inset-0 bg-linear-to-t from-[#1A1A1A]/75 via-[#1A1A1A]/20 to-transparent"></div>
                    </>
                ) : (
                    <div className="absolute inset-0 bg-[#1A1A1A] z-0"></div>
                )}
                
                {/* Huge Typographic Watermark */}
                {showWatermark && (
                    <div className="pointer-events-none absolute top-1/2 -right-20 hidden -translate-y-1/2 rotate-90 font-display-lg text-display-lg tracking-tighter whitespace-nowrap text-white/5 mix-blend-overlay select-none lg:block">
                        ORBIZ AUTOMOTIVEZ
                    </div>
                )}
            </div>
            
            <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div className={isLarge ? "grid grid-cols-1 gap-gutter lg:grid-cols-12" : ""}>
                    <div className={isLarge ? "flex flex-col justify-center lg:col-span-10" : ""}>
                        {breadcrumbs && breadcrumbs.length > 0 && (
                            <nav className="mb-6">
                                <ol className="flex font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant gap-2 items-center">
                                    {breadcrumbs.map((crumb, index) => (
                                        <React.Fragment key={index}>
                                            <li>
                                                {crumb.href ? (
                                                    <Link prefetch href={crumb.href} className="hover:text-primary transition-colors">
                                                        {t(crumb.label)}
                                                    </Link>
                                                ) : (
                                                    <span className="text-primary">{t(crumb.label)}</span>
                                                )}
                                            </li>
                                            {index < breadcrumbs.length - 1 ? (
                                                <li>
                                                    <Icon name="chevron_right" className="text-label-sm align-middle rtl:rotate-180" />
                                                </li>
                                            ) : null}
                                        </React.Fragment>
                                    ))}
                                </ol>
                            </nav>
                        )}
                        
                        <div className={isLarge ? "" : "mb-10 md:mb-16"}>
                            {content.hero_label ? <HeadingLabel text={content.hero_label} /> : null}
                            
                            <DisplayHeading
                                as="h1"
                                text={content.hero_title}
                                highlighted={content.hero_highlighted}
                                newLine={newLine}
                                className="max-w-2xl"
                            />
                            
                            {content.hero_description ? (
                                <HeroDescription text={content.hero_description} />
                            ) : null}
                            
                            {(content.hero_cta_primary || content.hero_cta_secondary) && (
                                <HeroActions
                                    primary={{
                                        label: content.hero_cta_primary,
                                        route: content.hero_cta_primary_route,
                                    }}
                                    secondary={{
                                        label: content.hero_cta_secondary,
                                        route: content.hero_cta_secondary_route,
                                    }}
                                />
                            )}
                            
                            {children ? (
                                <div className="mt-10">
                                    {children}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

