import type { LabelHTMLAttributes } from 'react';

export default function Label({ className = '', children, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label
            {...props}
            className={`block text-xs font-semibold text-heading tracking-wider uppercase mb-2 ${className}`}
        >
            {children}
        </label>
    );
}
