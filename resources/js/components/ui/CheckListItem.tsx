import React from 'react';
import Icon from '@/components/ui/Icon';

interface CheckListItemProps {
    children: React.ReactNode;
    icon?: string;
    className?: string;
}

export default function CheckListItem({
    children,
    icon = 'check_circle',
    className = '',
}: CheckListItemProps) {
    return (
        <li className={`flex items-center gap-3 ${className}`.trim()}>
            <Icon name={icon} aria-hidden="true" className="text-headline-md text-primary select-none" />
            {children}
        </li>
    );
}
