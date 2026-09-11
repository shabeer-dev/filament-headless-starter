import React, { ReactNode } from 'react';

interface FormattedTextProps {
    text?: string | ReactNode;
    className?: string;
    as?: React.ElementType;
}

// Helper function to recursively parse formatting tags
function parseFormatting(text: string): ReactNode {
    const parseRegex = /(?:\*\*|\*)(.*?)(?:\*\*|\*)|#([^#]+)#/g;
    const parts: ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let found = false;

    while ((match = parseRegex.exec(text)) !== null) {
        found = true;
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }
        
        if (match[1]) {
            parts.push(<strong key={lastIndex} className="font-bold">{parseFormatting(match[1])}</strong>);
        } else if (match[2]) {
            parts.push(<span key={lastIndex} className="text-primary">{parseFormatting(match[2])}</span>);
        }
        
        lastIndex = parseRegex.lastIndex;
    }
    
    if (!found) return text;
    
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    return parts;
}

export default function FormattedText({ text, className, as: Component = 'span' }: FormattedTextProps) {
    if (!text || typeof text !== 'string') {
        return <Component className={className}>{text}</Component>;
    }

    // Replace literal "\n" or "\r\n" or actual newlines or "##" with actual newlines to standardize
    // Then split by newline
    const lines = text.replace(/\\r\\n|\\n|\r\n|\n|##/g, '\n').split('\n');

    return (
        <Component className={className}>
            {lines.map((line, lineIndex) => {
                const parsedLine = parseFormatting(line);

                return (
                    <React.Fragment key={lineIndex}>
                        {parsedLine}
                        {lineIndex < lines.length - 1 && <br />}
                    </React.Fragment>
                );
            })}
        </Component>
    );
}
