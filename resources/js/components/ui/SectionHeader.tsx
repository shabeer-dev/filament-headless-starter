import { H2 } from '@/components/ui/Typography';
import React from 'react';
import HeadingLabel from '@/components/ui/HeadingLabel';
import FormattedText from '@/components/ui/FormattedText';

interface SectionHeaderProps {
    title: React.ReactNode;
    label?: string;
    description?: React.ReactNode;
    centered?: boolean;
    className?: string;
    variant?: 'light' | 'dark' | 'primary' | 'secondary' | 'inverted';
    action?: React.ReactNode;
    hasBorder?: boolean;
}

export default function SectionHeader({
    title,
    label,
    description,
    centered = true,
    className = '',
    variant = 'light',
    action,
    hasBorder = false,
    showUnderline = true,
}: SectionHeaderProps & { showUnderline?: boolean }) {
    const alignClass = centered ? 'text-center mx-auto' : '';
    
    const variantColors = {
        light: {
            title: '!text-heading',
            desc: 'text-body',
            border: 'border-border',
        },
        dark: {
            title: '!text-heading',
            desc: 'text-body',
            border: 'border-border',
        },
        primary: {
            title: '!text-primary',
            desc: 'text-body',
            border: 'border-primary/20',
        },
        secondary: {
            title: '!text-heading',
            desc: 'text-body',
            border: 'border-border',
        },
        inverted: {
            title: '!text-white',
            desc: 'text-white/80',
            border: 'border-white/10',
        },
    };

    const selectedColors = variantColors[variant] || variantColors.light;
    const textColor = selectedColors.title;
    const descColor = selectedColors.desc;
    const borderColor = selectedColors.border;
    
    const content = (
        <div className={centered ? 'text-center' : ''}>
            {label ? (
                <HeadingLabel text={label} centered={centered} variant="primary" />
            ) : null}
            
            <H2 className={`${textColor} mb-2 max-w-4xl ${alignClass}`}>
                <FormattedText text={title} className="inline" />
            </H2>

            {showUnderline ? (
                <div className={`h-0.75 w-12 bg-primary mt-2.5 mb-4 ${centered ? 'mx-auto' : ''}`} />
            ) : null}
            
            {description ? (
                <div className={`font-normal text-[16px] leading-[1.7] ${descColor} max-w-3xl ${alignClass}`}>
                    <FormattedText text={description} as="div" />
                </div>
            ) : null}
        </div>
    );

    const borderClass = hasBorder ? `border-b ${borderColor} pb-6` : '';

    if (action) {
        return (
            <div className={`mb-10 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 ${borderClass} ${className}`.trim()}>
                {content}
                <div className="shrink-0">
                    {action}
                </div>
            </div>
        );
    }

    return (
        <div className={`mb-10 md:mb-16 ${centered ? 'flex flex-col items-center' : ''} ${borderClass} ${className}`.trim()}>
            {content}
        </div>
    );
}
