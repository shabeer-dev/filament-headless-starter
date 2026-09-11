import { usePage } from '@inertiajs/react';

export function useTranslation() {
    const { translations } = usePage<any>().props;

    const t = (key: string, replacements: Record<string, string> = {}) => {
        let translation = translations?.[key] || key;

        // Handle basic string replacements if needed
        Object.keys(replacements).forEach((replaceKey) => {
            translation = translation.replace(
                `:${replaceKey}`,
                replacements[replaceKey],
            );
        });

        return translation;
    };

    return { t };
}
