import React from 'react';
import FormattedText from '@/components/ui/FormattedText';

interface DisplayHeadingProps {
    text: React.ReactNode;
    highlighted?: React.ReactNode | string[];
    newLine?: boolean;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4';
    animate?: boolean;
}

export default function DisplayHeading({ 
    text, 
    highlighted, 
    newLine = true, 
    className = '',
    as: Tag = 'h1',
    animate = true
}: DisplayHeadingProps) {
    const animationClass = animate ? 'opacity-0 animate-fade-up [animation-delay:200ms]' : '';
    
    const renderHighlighted = () => {
        if (Array.isArray(highlighted)) {
            return highlighted.map((item, index) => (
                <React.Fragment key={index}>
                    {index > 0 ? <br /> : null}
                    <FormattedText text={item} className="inline" />
                </React.Fragment>
            ));
        }
        return <FormattedText text={highlighted} className="inline" />;
    };

    return (
        <Tag className={`font-display-lg text-headline-lg-mobile md:text-display-lg text-text-white mb-6 uppercase leading-tight ${animationClass} ${className}`.trim()}>
            <FormattedText text={text} className="inline" />
            {highlighted ? (
                newLine ? (
                    <>
                        <br />
                        <span className="inline text-transparent bg-clip-text bg-gradient-to-r from-primary to-surface-tint">
                            {renderHighlighted()}
                        </span>
                    </>
                ) : (
                    <>
                        {' '}
                        <span className="inline text-transparent bg-clip-text bg-gradient-to-r from-primary to-surface-tint">
                            {renderHighlighted()}
                        </span>
                    </>
                )
            ) : null}
        </Tag>
    );
}
