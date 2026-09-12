import { H3 } from '@/components/ui/Typography';
import { Link } from '@inertiajs/react';
import React from 'react';
import Icon from '@/components/ui/Icon';
import FormattedText from '@/components/ui/FormattedText';

interface CardProps {
    link?: string;
    onClick?: () => void;
    icon?: React.ReactNode | string;
    title: React.ReactNode;
    description: React.ReactNode;
    theme?: 'light' | 'steel' | 'slate' | 'dark' | 'primary' | 'transparent' | 'banner';
    centered?: boolean;
    variant?: 'regular' | 'featured';
    featuredBadge?: string;
    backgroundImage?: string;
    direction?: 'vertical' | 'horizontal';
    badge?: string;
    actionText?: string;
    size?: 'small' | 'default';
    className?: string;
}

export default function Card({
    link,
    onClick,
    icon,
    title,
    description,
    theme = 'steel',
    centered = false,
    variant = 'regular',
    featuredBadge,
    backgroundImage,
    direction = 'vertical',
    badge,
    actionText = 'Explore',
    size = 'default',
    className = ''
}: CardProps) {
    const isHorizontal = direction === 'horizontal';
    const hasBackgroundImage = !!backgroundImage;
    const isSmall = size === 'small';
    const cardPadding = isSmall ? 'p-6' : 'p-8';
    const effectiveBadge = featuredBadge || badge;

    const themeStyles = {
        'light': 'bg-white border-border text-heading',
        'steel': 'bg-white border-border text-heading',
        'slate': 'bg-white border-border text-heading',
        'dark': 'bg-surface-alt border-border text-heading',
        'primary': 'bg-primary border-primary text-heading',
        'transparent': 'bg-transparent border-border text-heading',
        'banner': 'bg-white border-border text-heading',
    };

    const baseClasses = `
        group relative overflow-hidden rounded-lg border border-border transition-all duration-200 ease-in-out hover:-translate-y-[3px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:border-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
        ${themeStyles[theme]}
        ${centered ? 'text-center' : 'text-start'}
        ${onClick && !link ? 'cursor-pointer' : ''}
        ${className}
    `.trim().replace(/\s+/g, ' ');

    const wrapperClasses = isHorizontal
        ? `flex flex-col md:flex-row items-stretch ${baseClasses}`
        : `flex flex-col h-full ${hasBackgroundImage ? '' : cardPadding} ${baseClasses}`;

    const isExternalOrAnchor = link ? (link.startsWith('http') || link.startsWith('#') || link.startsWith('mailto:')) : false;

    // Reusable Icon component helper
    const renderIcon = () => {
        if (!icon) return null;
        if (typeof icon === 'string') {
            return (
                <Icon name={icon} className={`${isSmall ? 'text-3xl' : 'text-4xl'} transition-colors ${theme === 'primary' ? 'text-surface' : 'text-primary'}`} />
            );
        }
        return (
            <div className={`text-primary transition-colors ${theme === 'primary' ? 'text-surface' : 'text-primary'}`}>
                {icon}
            </div>
        );
    };

    // Render action button / link
    const renderAction = () => {
        if (!((link || onClick) && actionText)) return null;
        return (
            <span className={`inline-flex items-center gap-2 font-bold text-[13px] uppercase tracking-wider text-primary transition-colors group-hover:text-primary-dark mt-auto ${centered ? 'justify-center' : ''}`}>
                {actionText}
                <Icon name="arrow_forward" aria-hidden="true" className="text-body-md transition-transform group-hover:translate-x-1 rtl:rotate-180" />
            </span>
        );
    };

    // 1. HORIZONTAL BANNER CARD
    if (isHorizontal) {
        const horizontalElement = (
            <>
                <div className="flex w-full flex-col justify-between p-8 md:w-3/5 md:p-12 order-2 md:order-1">
                    <div>
                        {(effectiveBadge || icon) && (
                            <div className="mb-4 flex items-center gap-3">
                                {renderIcon()}
                                {effectiveBadge && (
                                    <span className="rounded-sm border border-primary/40 bg-surface-tint/60 px-3 py-1 font-label-sm text-label-sm uppercase tracking-widest text-primary">
                                        {effectiveBadge}
                                    </span>
                                )}
                            </div>
                        )}
                        <H3 className="mb-3 font-semibold text-[22px] md:text-[24px] text-heading transition-colors group-hover:text-primary">
                            <FormattedText text={title} className="inline" />
                        </H3>
                        {description && (
                            <div className="mb-8 max-w-xl font-normal text-[15px] leading-relaxed text-body">
                                <FormattedText text={description} as="div" />
                            </div>
                        )}
                    </div>
                    {renderAction()}
                </div>

                {hasBackgroundImage && (
                    <div className="relative h-56 w-full overflow-hidden bg-surface-alt md:h-auto md:w-2/5 md:min-h-full border-b md:border-b-0 md:border-s border-border order-1 md:order-2">
                        <img
                            src={backgroundImage}
                            alt=""
                            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                )}
            </>
        );

        if (!link) return <div onClick={onClick} className={wrapperClasses}>{horizontalElement}</div>;
        return isExternalOrAnchor
            ? <a href={link} className={wrapperClasses}>{horizontalElement}</a>
            : <Link prefetch href={link} className={wrapperClasses}>{horizontalElement}</Link>;
    }

    // 2. VERTICAL CARD WITH IMAGE (e.g. Fun Plates, Embossing Tools)
    if (hasBackgroundImage) {
        const imageCardElement = (
            <>
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-surface-alt border-b border-border shrink-0">
                    <img
                        src={backgroundImage}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                    />
                    {effectiveBadge && (
                        <span className="absolute top-3 inset-e-3 rounded-md border border-border bg-white/95 px-3 py-1 font-medium text-[12px] uppercase tracking-wider text-primary shadow-xs backdrop-blur-xs">
                            {effectiveBadge}
                        </span>
                    )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                    <div>
                        {icon && !effectiveBadge && (
                            <div className="mb-4">
                                {renderIcon()}
                            </div>
                        )}
                        <H3 className="mb-3 font-semibold text-[18px] md:text-[20px] text-heading transition-colors group-hover:text-primary">
                            <FormattedText text={title} className="inline" />
                        </H3>
                        {description && (
                            <div className="mb-6 font-normal text-[15px] leading-relaxed text-body">
                                <FormattedText text={description} as="div" />
                            </div>
                        )}
                    </div>
                    {renderAction()}
                </div>
            </>
        );

        if (!link) return <div onClick={onClick} className={wrapperClasses}>{imageCardElement}</div>;
        return isExternalOrAnchor
            ? <a href={link} className={wrapperClasses}>{imageCardElement}</a>
            : <Link prefetch href={link} className={wrapperClasses}>{imageCardElement}</Link>;
    }

    // 3. STANDARD ICON CARD WITHOUT IMAGE (e.g. Features, Specs, Deliveries, Strengths)
    const standardElement = (
        <div className="flex h-full flex-col justify-between">
            <div>
                {(icon || effectiveBadge) && (
                    <div className={`flex items-center justify-between ${isSmall ? 'mb-4' : 'mb-6'}`}>
                        {renderIcon()}
                        {effectiveBadge && (
                            <span className="ml-auto rounded-md border border-border bg-surface-alt px-3 py-1 font-medium text-[12px] uppercase tracking-wider text-primary">
                                {effectiveBadge}
                            </span>
                        )}
                    </div>
                )}

                <H3 className={`font-semibold ${isSmall ? 'text-[16px]' : 'text-[18px] md:text-[20px]'} ${isSmall ? 'mb-2' : 'mb-3'} text-heading transition-colors group-hover:text-primary`}>
                    <FormattedText text={title} className="inline" />
                </H3>

                {description && (
                    <div className={`font-normal text-[15px] leading-relaxed ${isSmall ? 'mb-4' : 'mb-6'} text-body`}>
                        <FormattedText text={description} as="div" />
                    </div>
                )}
            </div>

            {renderAction()}
        </div>
    );

    if (!link) return <div onClick={onClick} className={wrapperClasses}>{standardElement}</div>;
    return isExternalOrAnchor
        ? <a href={link} className={wrapperClasses}>{standardElement}</a>
        : <Link prefetch href={link} className={wrapperClasses}>{standardElement}</Link>;
}
