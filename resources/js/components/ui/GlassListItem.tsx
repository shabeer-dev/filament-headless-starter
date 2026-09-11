import React, { HTMLAttributes } from 'react';

interface GlassListItemProps extends HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
}

export default function GlassListItem({ disabled = false, className = '', children, ...props }: GlassListItemProps) {
    return (
        <div
            {...props}
            className={`flex flex-col items-start justify-between gap-4 rounded-lg border border-border bg-white p-6 shadow-sm text-heading transition-all duration-200 hover:border-primary/50 sm:flex-row sm:items-center ${disabled ? 'opacity-60' : ''} ${className}`}
        >
            {children}
        </div>
    );
}
