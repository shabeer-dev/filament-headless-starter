import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: 'default' | 'dark';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', type = 'text', variant = 'default', ...props }, ref) => {
        const variantClasses =
            variant === 'dark'
                ? 'border-border bg-surface-subtle text-heading placeholder:text-muted'
                : 'border-border bg-surface text-heading placeholder:text-muted';

        return (
            <input
                {...props}
                type={type}
                ref={ref}
                className={`w-full rounded-xl border p-3.5 text-sm font-normal text-heading transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${variantClasses} ${className}`}
            />
        );
    }
);

Input.displayName = 'Input';
export default Input;

