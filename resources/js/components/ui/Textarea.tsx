import React, { TextareaHTMLAttributes, forwardRef } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    variant?: 'default' | 'dark';
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className = '', variant = 'default', ...props }, ref) => {
        const variantClasses =
            variant === 'dark'
                ? 'border-border bg-surface-alt text-heading placeholder:text-caption'
                : 'border-border bg-white text-heading placeholder:text-caption';

        return (
            <textarea
                {...props}
                ref={ref}
                className={`w-full resize-none rounded-md border p-3 font-normal text-[15px] transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary ${variantClasses} ${className}`}
            />
        );
    }
);

Textarea.displayName = 'Textarea';
export default Textarea;

