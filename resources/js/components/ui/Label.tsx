import React, { LabelHTMLAttributes } from 'react';

export default function Label({ className = '', children, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label
            {...props}
            className={`block font-label-sm text-label-sm text-primary uppercase ${className}`}
        >
            {children}
        </label>
    );
}
