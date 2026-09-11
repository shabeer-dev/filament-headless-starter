import FormattedText from '@/components/ui/FormattedText';

interface HeroDescriptionProps {
    text: React.ReactNode;
    className?: string;
}

export default function HeroDescription({ text, className = '' }: HeroDescriptionProps) {
    return (
        <div className={`font-normal text-[16px] md:text-[18px] leading-relaxed text-white/85 max-w-2xl mb-10 border-s-2 border-primary ps-6 opacity-0 animate-fade-up [animation-delay:400ms] ${className}`.trim()}>
            <FormattedText text={text} as="div" />
        </div>
    );
}
