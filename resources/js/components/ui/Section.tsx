import React from 'react';

interface SectionProps {
    id?: string;
    theme?: 'dark' | 'slate' | 'light' | 'alt' | 'white' | 'tint';
    padding?: 'regular' | 'large' | 'none';
    className?: string;
    innerClassName?: string;
    hasBorders?: boolean;
    children: React.ReactNode;
}

export default function Section({
    id,
    theme = 'light',
    padding = 'regular',
    className = '',
    innerClassName = '',
    hasBorders = false,
    children,
}: SectionProps) {
    const themeClasses = {
        'light': 'bg-background text-body',
        'alt': 'bg-surface-alt text-body',
        'slate': 'bg-surface-alt text-body',
        'white': 'bg-white text-body',
        'tint': 'bg-surface-tint text-heading',
        'dark': 'bg-surface-alt text-body',
    };

    const paddingClasses = {
        'regular': 'py-12 md:py-20', // 48px mobile, 80px desktop per PDF
        'large': 'pt-20 md:pt-28 pb-16 md:pb-24',
        'none': '',
    };

    const borderClasses = hasBorders ? 'border-y border-border' : '';

    return (
        <section id={id} className={`w-full ${themeClasses[theme]} ${paddingClasses[padding]} ${borderClasses} ${className}`.trim()}>
            <div className={`max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop ${innerClassName}`.trim()}>
                {children}
            </div>
        </section>
    );
}
