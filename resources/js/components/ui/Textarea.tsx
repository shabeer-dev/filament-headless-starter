import React, { TextareaHTMLAttributes, forwardRef } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    variant?: 'default' | 'dark';
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className = '', variant = 'default', ...props }, ref) => {
        const variantClasses =
            variant === 'dark'
                ? 'border-border bg-surface-subtle text-heading placeholder:text-muted'
                : 'border-border bg-surface text-heading placeholder:text-muted';

        return (
            <textarea
                {...props}
                ref={ref}
                className={`w-full resize-none rounded-xl border p-3.5 text-sm font-normal text-heading transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${variantClasses} ${className}`}
            />
        );
    }
);

Textarea.displayName = 'Textarea';
export default Textarea;

