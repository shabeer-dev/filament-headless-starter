import React, { useState, useRef, useEffect } from 'react';
import { worldMapPath } from '@/components/ui/WorldMapPath';
import Icon from '@/components/ui/Icon';

type MapRegion = 'North America' | 'South America' | 'Europe' | 'Africa' | 'Middle East' | 'Asia' | 'Oceania';

interface RegionData {
    name: string;
    desc: string | null;
    top: string;
    left: string;
    isActive: boolean;
}

const regionData: Record<MapRegion, RegionData> = {
    'North America': {
        name: 'North America', desc: null, top: '31%', left: '25%',
        isActive: false // Not in the active footprint list
    },
    'South America': {
        name: 'South America', desc: null, top: '76%', left: '37%',
        isActive: true
    },
    'Europe': {
        name: 'Europe', desc: null, top: '32%', left: '55%',
        isActive: true
    },
    'Africa': {
        name: 'Africa', desc: null, top: '54%', left: '53%',
        isActive: true
    },
    'Middle East': {
        name: 'Middle East', desc: null, top: '48%', left: '61%',
        isActive: true
    },
    'Asia': {
        name: 'Asia', desc: null, top: '27%', left: '71%',
        isActive: true
    },
    'Oceania': {
        name: 'Oceania', desc: null, top: '78%', left: '83%',
        isActive: true
    }
};

interface InteractiveWorldMapProps {
    variant?: 'blended' | 'framed';
    className?: string;
}

export default function InteractiveWorldMap({ 
    variant = 'blended', 
    className = 'w-full max-w-6xl mx-auto aspect-1000/400' 
}: InteractiveWorldMapProps) {
    const [hoveredRegion, setHoveredRegion] = useState<MapRegion | null>(null);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            const el = scrollRef.current;
            el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
        }
    }, []);

    const variantClasses = variant === 'blended'
        ? '[mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_85%)]'
        : 'overflow-hidden rounded-xl border border-border bg-white shadow-xs';

    return (
        <div ref={scrollRef} className="w-full overflow-x-auto pb-4 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className={`relative min-w-200 md:min-w-0 ${className} ${variantClasses}`}>
            {/* The Real World Map SVG Background */}
            <svg 
                viewBox="-100 150 1200 480" 
                className="absolute inset-0 w-full h-full pointer-events-none" 
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
            >
                {/* Unified path of all countries */}
                <path 
                    d={worldMapPath} 
                    fill="currentColor" 
                    className="text-heading opacity-[0.12]"
                />
            </svg>

            {/* Interactive Pins & Labels */}
            {(Object.keys(regionData) as MapRegion[]).map((key) => {
                const data = regionData[key];
                const isHovered = hoveredRegion === key;
                
                // Only render interactive elements for active footprint regions
                if (!data.isActive) return null;
                
                return (
                    <div 
                        key={key}
                        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer z-10"
                        style={{ top: data.top, left: data.left }}
                        onMouseEnter={() => setHoveredRegion(key)}
                        onMouseLeave={() => setHoveredRegion(null)}
                    >
                        {/* Tooltip & Region Name */}
                        <div className="flex flex-col items-center mb-1">
                            <div className={`px-2.5 py-1 rounded text-xs font-bold whitespace-nowrap shadow-md transition-all duration-300 border ${
                                isHovered 
                                    ? "bg-primary text-white border-primary shadow-lg" 
                                    : "bg-white text-heading border-border"
                            }`}>
                                {data.name}
                            </div>
                            
                            {data.desc ? (
                                <div className={`mt-2 px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap shadow-xl transition-all duration-300 ${
                                    isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                                } bg-white border border-border text-body`}>
                                    {data.desc}
                                </div>
                            ) : null}
                            
                            {/* Pointer triangle */}
                            <div className={`w-2.5 h-2.5 rotate-45 border-r border-b transition-colors duration-300 ${
                                data.desc && isHovered
                                    ? "hidden"
                                    : "-mt-1.25"
                            } ${
                                isHovered 
                                    ? "bg-primary border-primary" 
                                    : "bg-white border-border"
                            }`} />
                        </div>

                        {/* Map Pin Icon */}
                        <div className="relative flex items-center justify-center">
                            <img 
                                src="/images/orbiz-flag.svg"
                                alt="Orbiz Map Pin"
                                className={`object-contain transition-all duration-300 drop-shadow-[0_0_10px_rgba(var(--color-primary),0.6)] ${
                                    isHovered ? "w-12 h-12 -translate-y-2 drop-shadow-[0_0_15px_rgba(var(--color-primary),0.9)] opacity-100" : "w-10 h-10 opacity-90"
                                }`} 
                            />
                        </div>
                    </div>
                );
            })}
            </div>
        </div>
    );
}
