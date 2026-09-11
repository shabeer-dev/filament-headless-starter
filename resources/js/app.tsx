import { createInertiaApp } from '@inertiajs/react';
import { setUrlDefaults } from '@/wayfinder';

// Extract locale from the current URL path to initialize Wayfinder correctly before React mounts
const currentPath =
    typeof window !== 'undefined' ? window.location.pathname : '';
const segments = currentPath.split('/').filter(Boolean);
const initialLocale = segments.length > 0 ? segments[0] : 'en';

setUrlDefaults({ locale: initialLocale });

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    progress: {
        color: '#4B5563',
    },
});
