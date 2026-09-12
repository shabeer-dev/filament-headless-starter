import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getImageUrl(path?: string | null): string | undefined {
    if (!path) {
        return undefined;
    }

    if (path.startsWith('http') || path.startsWith('/')) {
        return path;
    }

    return '/storage/' + path;
}

const COL_SPAN_MAP: Record<number, string> = {
    12: 'md:col-span-12',
    11: 'md:col-span-12 lg:col-span-11',
    10: 'md:col-span-12 lg:col-span-10',
    9: 'md:col-span-12 lg:col-span-9',
    8: 'md:col-span-12 lg:col-span-8',
    7: 'md:col-span-12 lg:col-span-7',
    6: 'md:col-span-6',
    5: 'md:col-span-6 lg:col-span-5',
    4: 'md:col-span-6 lg:col-span-4',
    3: 'md:col-span-6 lg:col-span-3',
    2: 'md:col-span-6 lg:col-span-2',
    1: 'md:col-span-6 lg:col-span-1',
};

export function getColSpanClass(
    colSpan?: string | number | null,
    fallback = 'md:col-span-6',
): string {
    if (!colSpan) {
        return fallback;
    }

    const span = Number(colSpan);

    if (isNaN(span)) {
        return String(colSpan);
    }

    return COL_SPAN_MAP[span] ?? `md:col-span-${span}`;
}

export function normalizeStringArray(
    items: any[] | null | undefined,
): string[] {
    if (!Array.isArray(items)) {
return [];
}

    return items
        .map((item: any) => {
            if (typeof item === 'string') {
return item;
}

            if (typeof item === 'object' && item !== null) {
                const text =
                    item.label || item.feature || item.item || item.line;

                return typeof text === 'string' ? text : null;
            }

            return null;
        })
        .filter(Boolean) as string[];
}
