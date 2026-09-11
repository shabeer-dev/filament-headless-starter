import AppLayout from '@/layouts/AppLayout';
import SeoMeta from '@/components/SeoMeta';

interface LegalPageLayoutProps {
    title: string;
    lastUpdated: string;
    children: React.ReactNode;
}

export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
    return (
        <AppLayout>
            <SeoMeta />
            
            <main className="flex-1 w-full bg-background pt-24 md:pt-32 pb-24">
                <div className="mx-auto max-w-4xl px-margin-mobile md:px-margin-desktop">
                    <div className="mb-12 border-b border-border pb-8 text-center md:text-left">
                        <h1 className="font-display text-display-md text-heading mb-4 font-bold">{title}</h1>
                        <p className="font-label-md text-caption uppercase tracking-wider">
                            Last Updated: {lastUpdated}
                        </p>
                    </div>

                    <div className="space-y-6 text-body font-body-lg leading-relaxed">
                        {children}
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
