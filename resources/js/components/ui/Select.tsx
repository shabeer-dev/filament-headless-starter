import React, { SelectHTMLAttributes, forwardRef } from 'react';
import Icon from '@/components/ui/Icon';

const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
    ({ className = '', children, ...props }, ref) => {
        return (
            <div className={`relative ${className}`}>
                <select
                    {...props}
                    ref={ref}
                    className="w-full cursor-pointer appearance-none rounded-md border border-border bg-white p-3 font-normal text-[15px] text-heading transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                    {children}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-heading">
                    <Icon name="expand_more" className="text-headline-md" />
                </div>
            </div>
        );
    }
);

Select.displayName = 'Select';
export default Select;
