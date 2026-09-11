import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility to combine Tailwind classes */
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** The material icon name (e.g., 'expand_more') */
    name: string;
    /** Optional custom classes */
    className?: string;
    /** If true, uses the filled variant of the material icon */
    filled?: boolean;
}

export default function Icon({ 
    name, 
    className, 
    filled = false, 
    ...props 
}: IconProps) {
    return (
        <span
            aria-hidden="true"
            className={cn(
                filled ? 'material-symbols-rounded' : 'material-symbols-outlined',
                'select-none inline-flex items-center justify-center leading-none',
                className
            )}
            style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
            {...props}
        >
            {name}
        </span>
    );
}
