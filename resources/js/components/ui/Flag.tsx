import { cn } from '@/lib/utils';

interface FlagProps {
    country: 'IN' | 'GB' | 'AE' | 'in' | 'gb' | 'ae';
    className?: string;
}

export default function Flag({ country, className }: FlagProps) {
    const code = country.toUpperCase();

    const wrapperClass = cn(
        'inline-block h-12 w-12 overflow-hidden rounded-full border border-black/10 align-middle shadow-md',
        className
    );

    if (code === 'IN') {
        return (
            <span className={wrapperClass}>
                <svg
                    viewBox="0 0 900 600"
                    className="h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <rect width="900" height="200" fill="#FF9933" />
                    <rect y="200" width="900" height="200" fill="#FFFFFF" />
                    <rect y="400" width="900" height="200" fill="#138808" />
                    <g transform="translate(450,300)">
                        <circle r="92" fill="none" stroke="#000080" strokeWidth="6.5" />
                        <circle r="16" fill="#000080" />
                        {Array.from({ length: 24 }).map((_, i) => {
                            const angle = (i * 360) / 24;
                            return (
                                <line
                                    key={i}
                                    x1="0"
                                    y1="0"
                                    x2={92 * Math.cos((angle * Math.PI) / 180)}
                                    y2={92 * Math.sin((angle * Math.PI) / 180)}
                                    stroke="#000080"
                                    strokeWidth="5"
                                />
                            );
                        })}
                    </g>
                </svg>
            </span>
        );
    }

    if (code === 'GB') {
        return (
            <span className={wrapperClass}>
                <svg
                    viewBox="0 0 60 30"
                    className="h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <rect width="60" height="30" fill="#012169" />
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
                    <path
                        d="M0,0 L60,30 M60,0 L0,30"
                        stroke="#C8102E"
                        strokeWidth="4"
                    />
                    <path
                        d="M30,0 L30,30 M0,15 L60,15"
                        stroke="#fff"
                        strokeWidth="10"
                    />
                    <path
                        d="M30,0 L30,30 M0,15 L60,15"
                        stroke="#C8102E"
                        strokeWidth="6"
                    />
                </svg>
            </span>
        );
    }

    if (code === 'AE') {
        return (
            <span className={wrapperClass}>
                <svg
                    viewBox="0 0 600 300"
                    className="h-full w-full"
                    preserveAspectRatio="xMinYMid slice"
                >
                    <rect x="150" y="0" width="450" height="100" fill="#00732F" />
                    <rect x="150" y="100" width="450" height="100" fill="#FFFFFF" />
                    <rect x="150" y="200" width="450" height="100" fill="#000000" />
                    <rect x="0" y="0" width="150" height="300" fill="#FF0000" />
                </svg>
            </span>
        );
    }

    return null;
}
