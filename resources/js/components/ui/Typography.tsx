import React, { ReactNode } from 'react';

interface TypographyProps {
    children: ReactNode;
    className?: string;
}

export function H2({ children, className = '' }: TypographyProps) {
    return (
        <h2 className={`mb-3 font-bold text-[32px] md:text-[36px] leading-tight text-heading ${className}`}>
            {children}
        </h2>
    );
}

export function H3({ children, className = '' }: TypographyProps) {
    return (
        <h3 className={`mb-3 font-semibold text-[22px] md:text-[24px] leading-snug text-heading ${className}`}>
            {children}
        </h3>
    );
}

export function H4({ children, className = '' }: TypographyProps) {
    return (
        <h4 className={`font-semibold text-[16px] md:text-[18px] leading-normal text-heading ${className}`}>
            {children}
        </h4>
    );
}
