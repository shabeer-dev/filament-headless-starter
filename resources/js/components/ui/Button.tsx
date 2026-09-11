import React from 'react';
import { Link } from '@inertiajs/react';

interface ButtonProps {
    href?: string;
    variant?: 'primary' | 'outline';
    size?: 'normal' | 'large';
    download?: string | boolean;
    className?: string;
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
}

export default function Button({
    href,
    variant = 'primary',
    size = 'normal',
    download,
    className = '',
    children,
    type = 'button',
    onClick,
    disabled = false,
}: ButtonProps) {
    const sizeClasses = size === 'large' ? 'px-[36px] py-[18px]' : 'px-[28px] py-[14px]';
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
    const baseClasses = `inline-flex items-center justify-center font-bold text-[14px] uppercase tracking-[0.06em] rounded-[4px] transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${sizeClasses} ${disabledClasses}`;
    
    const variants = {
        primary: "bg-primary text-heading hover:bg-primary-dark hover:text-primary shadow-sm",
        outline: "bg-transparent border-[1.5px] border-heading text-heading hover:bg-primary-dark hover:text-white hover:border-primary-dark",
    };

    const combinedClasses = `${baseClasses} ${variants[variant]} ${className}`;

    if (href) {
        if (download || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
            return (
                <a href={href} download={download === true ? "" : download} className={combinedClasses}>
                    {children}
                </a>
            );
        }
        
        return (
            <Link prefetch href={href} className={combinedClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} className={combinedClasses} disabled={disabled}>
            {children}
        </button>
    );
}
