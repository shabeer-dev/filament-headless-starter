import { Link, usePage } from '@inertiajs/react';

export default function Footer() {
    const { locale, appName, support } = usePage<any>().props;
    const l = locale || 'en';
    const name = appName || 'Headless Starter';
    const email = support?.email || 'support@example.com';
    const phone = support?.phone || '+1 (555) 000-0000';

    return (
        <footer className="w-full bg-surface border-t border-border pt-16 pb-12 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-border">
                    {/* Brand column */}
                    <div className="md:col-span-1">
                        <Link href={`/${l}`} className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-black text-sm">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                                    <polyline points="2 17 12 22 22 17" />
                                    <polyline points="2 12 12 17 22 12" />
                                </svg>
                            </div>
                            <span className="font-bold text-lg text-heading">{name}</span>
                        </Link>
                        <p className="text-muted text-sm leading-relaxed">
                            Decoupled headless CMS architecture powered by Filament v5, Inertia.js v3, and React 19.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-xs uppercase tracking-wider text-heading font-bold mb-4">Navigation</h4>
                        <ul className="space-y-2.5 text-sm text-body">
                            <li><Link href={`/${l}`} className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href={`/${l}/about`} className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href={`/${l}/articles`} className="hover:text-primary transition-colors">Articles & Insights</Link></li>
                            <li><Link href={`/${l}/contact`} className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Legal / Compliance */}
                    <div>
                        <h4 className="text-xs uppercase tracking-wider text-heading font-bold mb-4">Platform</h4>
                        <ul className="space-y-2.5 text-sm text-body">
                            <li><Link href={`/${l}/privacy-policy`} className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href={`/${l}/terms-of-service`} className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href={`/${l}/compliance`} className="hover:text-primary transition-colors">Compliance & Security</Link></li>
                            <li><Link href={`/${l}/sitemap`} className="hover:text-primary transition-colors">HTML Sitemap</Link></li>
                        </ul>
                    </div>

                    {/* Get in Touch */}
                    <div>
                        <h4 className="text-xs uppercase tracking-wider text-heading font-bold mb-4">Get in Touch</h4>
                        <div className="space-y-2 text-sm text-body">
                            <p>Email: <a href={`mailto:${email}`} className="text-heading font-medium hover:text-primary hover:underline">{email}</a></p>
                            <p>Phone: <span className="text-heading font-medium">{phone}</span></p>
                            <div className="pt-3">
                                <a
                                    href="/admin"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-surface-subtle text-heading hover:border-primary hover:text-primary transition-colors"
                                >
                                    Admin CMS Portal ↗
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-4">
                    <p>© {new Date().getFullYear()} {name}. Open-source MIT License. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link href={`/en`} className={`hover:text-heading ${l === 'en' ? 'font-bold text-heading' : ''}`}>English</Link>
                        <span>•</span>
                        <Link href={`/ar`} className={`hover:text-heading ${l === 'ar' ? 'font-bold text-heading' : ''}`}>العربية</Link>
                        <span>•</span>
                        <Link href={`/es`} className={`hover:text-heading ${l === 'es' ? 'font-bold text-heading' : ''}`}>Español</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
