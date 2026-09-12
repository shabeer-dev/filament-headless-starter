import Button from '@/components/ui/Button';
import * as routes from '@/routes';

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

    if (!hasPrimary && !hasSecondary) return null;

    const resolveHref = (action: ActionItem) => {
        let url = action.href || '#';
        if (action.route) {
            url = (routes as any)[action.route]?.url() || '#';
        }

        const finalParams = action.params;
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
