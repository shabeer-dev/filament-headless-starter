import { useEffect } from 'react';

export function useCounterAnimation() {
    useEffect(() => {
        const counters = document.querySelectorAll('.stat-counter');

        const animateCounter = (counter: Element) => {
            const target = parseInt(
                counter.getAttribute('data-target') || '0',
                10,
            );
            const duration = 1500;
            const startTime = performance.now();

            const updateCount = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const ease = progress * (2 - progress);
                const currentVal = Math.floor(ease * target);

                counter.textContent = currentVal.toString();

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target.toString();
                }
            };

            requestAnimationFrame(updateCount);
        };

        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 },
        );

        counters.forEach((counter) => observer.observe(counter));

        return () => observer.disconnect();
    }, []);
}
