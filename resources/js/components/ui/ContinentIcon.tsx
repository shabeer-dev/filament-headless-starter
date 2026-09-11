export type Continent = 'Middle East' | 'Africa' | 'Europe' | 'Asia' | 'Oceania' | 'South America';

interface ContinentIconProps {
    continent: Continent;
    className?: string;
}

export default function ContinentIcon({ continent, className = "w-24 h-16" }: ContinentIconProps) {
    
    // A helper to style the target continent versus the rest of the world
    const getStyles = (region: Continent | 'North America') => {
        if (continent === region) {
            return "fill-primary stroke-primary/20 stroke-2 drop-shadow-md transition-all duration-500 scale-105 origin-center";
        }
        return "fill-white/10 stroke-white/5 stroke-1 transition-all duration-500";
    };

    return (
        <svg 
            viewBox="0 0 120 85" 
            className={className} 
            xmlns="http://www.w3.org/2000/svg"
            strokeLinejoin="round"
        >
            {/* North America */}
            <path 
                d="M 15 10 L 45 10 L 50 25 L 35 40 L 20 40 L 10 25 Z" 
                className={getStyles('North America')} 
                style={{ transformOrigin: '30px 25px' }}
            />
            
            {/* South America */}
            <path 
                d="M 25 45 L 35 45 L 45 55 L 35 80 L 25 60 Z" 
                className={getStyles('South America')} 
                style={{ transformOrigin: '35px 60px' }}
            />
            
            {/* Europe */}
            <path 
                d="M 50 15 L 65 15 L 70 25 L 55 30 L 45 20 Z" 
                className={getStyles('Europe')} 
                style={{ transformOrigin: '57px 22px' }}
            />
            
            {/* Africa */}
            <path 
                d="M 45 35 L 60 30 L 70 45 L 60 70 L 45 55 Z" 
                className={getStyles('Africa')} 
                style={{ transformOrigin: '57px 50px' }}
            />
            
            {/* Middle East */}
            <path 
                d="M 65 35 L 75 35 L 80 45 L 70 50 Z" 
                className={getStyles('Middle East')} 
                style={{ transformOrigin: '72px 40px' }}
            />
            
            {/* Asia */}
            <path 
                d="M 65 10 L 100 10 L 110 30 L 100 50 L 75 40 L 70 25 Z" 
                className={getStyles('Asia')} 
                style={{ transformOrigin: '87px 30px' }}
            />
            
            {/* Oceania */}
            <path 
                d="M 90 60 L 110 60 L 115 75 L 100 80 L 85 70 Z" 
                className={getStyles('Oceania')} 
                style={{ transformOrigin: '100px 70px' }}
            />
        </svg>
    );
}
