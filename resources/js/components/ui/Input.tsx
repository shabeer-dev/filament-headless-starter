import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: 'default' | 'dark';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', type = 'text', variant = 'default', ...props }, ref) => {
        const variantClasses =
            variant === 'dark'
                ? 'border-border bg-surface-alt text-heading placeholder:text-caption'
                : 'border-border bg-white text-heading placeholder:text-caption';

        return (
            <input
                {...props}
                type={type}
                ref={ref}
                className={`w-full rounded-md border p-3 font-normal text-[15px] transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary ${variantClasses} ${className}`}
            />
        );
    }
);

Input.displayName = 'Input';
export default Input;

