import Icon from '@/components/ui/Icon';

interface IconContactBlockProps {
    icon: string;
    label: string;
    value: string;
    href?: string;
    className?: string;
}

export default function IconContactBlock({ icon, label, value, href, className = '' }: IconContactBlockProps) {
    const ValueWrapper = href ? 'a' : 'p';
    
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <Icon name={icon} className="text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }} />
            <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                    {label}
                </p>
                <ValueWrapper
                    href={href}
                    className={`block font-bold text-base md:text-lg text-heading ${href ? 'transition-colors hover:text-primary' : ''}`}
                >
                    {value}
                </ValueWrapper>
            </div>
        </div>
    );
}
