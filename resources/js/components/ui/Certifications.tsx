export interface CertificationItem {
    title: string;
    subtitle: string;
    isPrimary?: boolean;
    logo?: string;
}

interface CertificationsProps {
    items?: CertificationItem[];
    theme?: 'dark' | 'light' | 'steel';
    className?: string;
}

const defaultItems: CertificationItem[] = [
    { title: 'ISO 9001', subtitle: 'Quality Management' },
    { title: 'ISO 7591', subtitle: 'ICAT Certified' },
    { title: 'ISO 40001', subtitle: 'Environmental Management' },
    { title: 'CE', subtitle: 'International Compliance', isPrimary: true },
    { title: 'RvA', subtitle: 'RvA Accredited' }
];

export default function Certifications({
    items = defaultItems,
    theme = 'dark',
    className = ''
}: CertificationsProps) {
    const themeClasses = {
        dark: {
            item: 'bg-white border border-border rounded-lg shadow-sm hover:border-primary/50 hover:shadow-md',
            title: 'text-heading font-bold',
            primaryTitle: 'text-primary font-bold',
            subtitle: 'text-body text-xs mt-1'
        },
        light: {
            item: 'bg-white border border-border rounded-lg shadow-sm hover:border-primary/50 hover:shadow-md',
            title: 'text-heading font-bold',
            primaryTitle: 'text-primary font-bold',
            subtitle: 'text-body text-xs mt-1'
        },
        steel: {
            item: 'bg-white border border-border rounded-lg shadow-sm hover:border-primary/50 hover:shadow-md',
            title: 'text-heading font-bold',
            primaryTitle: 'text-primary font-bold',
            subtitle: 'text-body text-xs mt-1'
        }
    };

    const currentTheme = themeClasses[theme] || themeClasses.dark;

    return (
        <div className={`flex flex-wrap justify-center items-stretch gap-gutter ${className}`.trim()}>
            {items.map((cert, index) => (
                <div 
                    key={index} 
                    className={`flex h-45 md:h-55 items-center justify-center border p-4 md:p-6 group transition-all duration-300 
                    w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(16.666%-20px)] 
                    ${currentTheme.item}`}
                >
                    <div className="text-center transition-colors duration-300 w-full">
                        {cert.logo ? (
                            <img 
                                src={cert.logo.startsWith('http') || cert.logo.startsWith('/') ? cert.logo : `/storage/${cert.logo}`} 
                                alt={cert.title} 
                                className={`mx-auto mb-4 h-20 w-auto object-contain opacity-80 transition-opacity duration-300 md:h-28 group-hover:opacity-100 ${(theme === 'dark' || theme === 'steel') ? 'rounded-lg bg-white p-2 md:p-3' : ''}`} 
                                loading="lazy"
                            />
                        ) : null}
                        {cert.title && !cert.logo ? (
                            <div className={`font-headline-md text-headline-md font-bold transition-colors duration-300 ${
                                cert.isPrimary ? currentTheme.primaryTitle : currentTheme.title
                            }`}>
                                {cert.title}
                            </div>
                        ) : null}
                        <div className={`transition-colors duration-300 ${
                            cert.logo 
                                ? 'mt-3 font-label-sm text-xs md:text-sm font-medium tracking-wide leading-tight' 
                                : 'mt-2 font-label-sm text-xs md:text-sm font-medium tracking-wide leading-tight'
                        } ${currentTheme.subtitle}`}>
                            {cert.subtitle}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
