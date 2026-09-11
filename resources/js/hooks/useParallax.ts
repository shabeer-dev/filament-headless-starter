import { useEffect } from 'react';

export function useParallax() {
    useEffect(() => {
        const handleScroll = () => {
            // Use requestAnimationFrame for smoother performance
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                const elements = document.querySelectorAll<HTMLElement>(
                    'main img, .grid-bg-pattern',
                );

                elements.forEach((el) => {
                    const speed = 0.05;
                    // Apply translation using 3d for hardware acceleration
                    el.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
                });
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initial position
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
}
