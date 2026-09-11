import React, { HTMLAttributes } from 'react';

export default function GlassCard({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={`h-full border border-border bg-white rounded-lg p-8 shadow-sm text-body ${className}`}
        >
            {children}
        </div>
    );
}
