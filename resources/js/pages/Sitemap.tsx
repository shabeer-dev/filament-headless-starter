import { Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import SeoMeta from '@/components/SeoMeta';

export default function Sitemap() {
    const { locale } = usePage<any>().props;
    const l = locale || 'en';

    const sections = [
        {
            title: 'Core Pages',
            links: [
                { label: 'Home Page', href: `/${l}` },
                { label: 'About Us', href: `/${l}/about` },
                { label: 'Articles & News', href: `/${l}/articles` },
                { label: 'Contact Us', href: `/${l}/contact` },
            ],
        },
        {
            title: 'Legal & Compliance',
            links: [
                { label: 'Privacy Policy', href: `/${l}/privacy-policy` },
                { label: 'Terms of Service', href: `/${l}/terms-of-service` },
                { label: 'Raw XML Sitemap', href: '/sitemap.xml' },
            ],
        },
    ];

    return (
        <>
            <SeoMeta />

            <div className="py-16 md:py-24 bg-background">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <header className="mb-12">
                        <span className="text-primary text-xs uppercase tracking-widest font-bold">Directory</span>
                        <h1 className="text-3xl sm:text-4xl font-bold text-heading mt-2">Website Sitemap</h1>
                        <p className="mt-3 text-body text-base">Quick reference index of all published application URLs.</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {sections.map((section, idx) => (
                            <div key={idx} className="p-8 rounded-xl bg-surface border border-border">
                                <h2 className="text-xl font-bold text-heading mb-6 pb-2 border-b border-border">
                                    {section.title}
                                </h2>
                                <ul className="space-y-3">
                                    {section.links.map((link, linkIdx) => (
                                        <li key={linkIdx}>
                                            <Link
                                                href={link.href}
                                                className="text-body hover:text-primary font-medium transition-colors flex items-center gap-2"
                                            >
                                                <span className="text-primary">→</span>
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

Sitemap.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
