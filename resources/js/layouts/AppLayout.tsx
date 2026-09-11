import { usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SeoMeta from '@/components/SeoMeta';
import { setUrlDefaults } from '@/wayfinder';

export default function AppLayout({
    children,
    hideNav = false,
}: PropsWithChildren<{ hideNav?: boolean }>) {
    const { locale } = usePage<{ locale?: string }>().props;

    // Dynamically update Wayfinder URL generator defaults synchronously during render
    if (locale) {
        setUrlDefaults({ locale });
    }

    return (
        <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <SeoMeta />
            <div
                className={`min-h-screen flex flex-col overflow-x-hidden bg-background font-sans text-body antialiased selection:bg-primary selection:text-heading ${
                    locale === 'ar' ? 'text-right' : 'text-left'
                }`}
            >
                {!hideNav && <Navbar />}

                <main className="flex-1">{children}</main>

                {!hideNav && <Footer />}
            </div>
        </div>
    );
}
