import React, { SelectHTMLAttributes, forwardRef } from 'react';
import Icon from '@/components/ui/Icon';

const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
    ({ className = '', children, ...props }, ref) => {
        return (
            <div className={`relative ${className}`}>
                <select
                    {...props}
                    ref={ref}
                    className="w-full cursor-pointer appearance-none rounded-xl border border-border bg-surface p-3.5 pr-10 text-sm font-normal text-heading transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                    {children}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-muted">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        );
    }
);

Select.displayName = 'Select';
export default Select;
