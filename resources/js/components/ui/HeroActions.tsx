import Button from '@/components/ui/Button';
import * as routes from '@/routes';
import { usePage } from '@inertiajs/react';
import { getSegmentFromUrl } from '@/lib/utils';

export interface ActionItem {
    label?: string | null;
    route?: string | null;
    href?: string | null;
    params?: Record<string, string>;
}

export interface HeroActionsProps {
    primary?: ActionItem | null;
    secondary?: ActionItem | null;
    className?: string;
}

export default function HeroActions({
    primary,
    secondary,
    className = '',
}: HeroActionsProps) {
    const hasPrimary = Boolean(primary?.label);
    const hasSecondary = Boolean(secondary?.label);
    const { url: currentUrl } = usePage();

    if (!hasPrimary && !hasSecondary) return null;

    const resolveHref = (action: ActionItem) => {
        let url = action.href || '#';
        if (action.route) {
            url = (routes as any)[action.route]?.url() || '#';
        }
        
        let finalParams = action.params;
        if (!finalParams && url.includes('/contact')) {
            const segment = getSegmentFromUrl(currentUrl);
            if (segment) finalParams = { segment };
        }

        if (action.route === 'careers' && currentUrl.includes('/careers')) {
            return '#openings';
        }

        if (finalParams && url !== '#') {
            const separator = url.includes('?') ? '&' : '?';
            const queryStr = new URLSearchParams(finalParams).toString();
            return `${url}${separator}${queryStr}`;
        }
        return url;
    };

    return (
        <div className={`flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up [animation-delay:600ms] ${className}`.trim()}>
            {hasPrimary ? (
                <Button href={resolveHref(primary!)} variant="primary">
                    {primary!.label}
                </Button>
            ) : null}
            {hasSecondary ? (
                <Button
                    href={resolveHref(secondary!)}
                    variant="outline"
                    className="border-white/60 text-white hover:bg-white hover:text-heading hover:border-white"
                >
                    {secondary!.label}
                </Button>
            ) : null}
        </div>
    );
}
