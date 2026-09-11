import FormattedText from '@/components/ui/FormattedText';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';

interface StatItem {
    value: string;
    label: string;
    suffix?: string;
    target?: number;
}

interface StatsBandProps {
    stats: StatItem[];
    className?: string;
}

export default function StatsBand({ stats, className = '' }: StatsBandProps) {
    useCounterAnimation();

    const gridCols = {
        1: 'md:grid-cols-1',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
    }[Math.min(stats.length, 4)] || 'md:grid-cols-4';

    return (
        <section className={`relative z-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop ${className}`}>
            <div className={`glass-panel rounded-lg p-6 md:p-8 grid grid-cols-2 ${gridCols} gap-y-8 md:gap-y-0 gap-x-8 md:divide-x divide-white/10`}>
                {stats.map((stat, index) => (
                    <div key={index} className={`text-center px-4 ${index % 2 !== 0 ? 'border-s border-white/10 md:border-s-0' : ''}`}>
                        <div className="font-display-lg text-headline-md md:text-[64px] text-primary mb-2 leading-none">
                            {stat.target ? (
                                <>
                                    <span className="stat-counter" data-target={stat.target}>0</span>
                                    {stat.suffix}
                                </>
                            ) : (
                                <>
                                    {stat.value}
                                    {stat.suffix}
                                </>
                            )}
                        </div>
                        <FormattedText 
                            as="div" 
                            className="font-label-sm text-label-sm text-[#CCCCCC] uppercase tracking-widest"
                            text={stat.label} 
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
