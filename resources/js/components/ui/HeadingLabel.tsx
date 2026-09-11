interface HeadingLabelProps {
    text: string;
    className?: string;
    centered?: boolean;
    variant?: 'light' | 'dark' | 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
}

export default function HeadingLabel({ 
    text, 
    className = 'opacity-0 animate-fade-up [animation-delay:0ms]', 
    centered = false,
    variant = 'primary',
    size = 'sm'
}: HeadingLabelProps) {
    const variantMap = {
        primary: { text: 'text-primary', bg: 'bg-primary' },
        light: { text: 'text-white', bg: 'bg-white' },
        dark: { text: 'text-heading', bg: 'bg-heading' },
        secondary: { text: 'text-caption', bg: 'bg-caption' },
    };

    const sizeMap = {
        sm: 'font-medium text-[12px] tracking-[0.08em]',
        md: 'font-medium text-[13px] tracking-[0.08em]',
        lg: 'font-medium text-[14px] tracking-[0.08em]',
    };

    const selectedVariant = variantMap[variant] || variantMap.primary;
    const selectedSize = sizeMap[size] || sizeMap.sm;

    return (
        <span className={`${selectedSize} ${selectedVariant.text} mb-4 tracking-[0.2em] uppercase flex items-center gap-2 ${centered ? 'justify-center' : ''} ${className}`.trim()}>
            <span className={`w-8 h-px ${selectedVariant.bg}`}></span>
            {text}
            {centered ? <span className={`w-8 h-px ${selectedVariant.bg}`}></span> : null}
        </span>
    );
}
