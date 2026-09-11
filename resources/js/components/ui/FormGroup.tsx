import React, { ReactNode } from 'react';

interface FormGroupProps {
    children: ReactNode;
    className?: string;
}

export default function FormGroup({ children, className = '' }: FormGroupProps) {
    return (
        <div className={`space-y-2 ${className}`}>
            {children}
        </div>
    );
}
