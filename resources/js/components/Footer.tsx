import { Link, usePage } from '@inertiajs/react';

export default function Footer() {
    const { locale, appName, support } = usePage<any>().props;
    const l = locale || 'en';
    const name = appName || 'Headless Starter';
    const email = support?.email || 'support@example.com';
    const phone = support?.phone || '+1 (555) 000-0000';

    return (
        <footer className="w-full bg-[#111111] text-white pt-16 pb-12 border-t border-[#222222]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#222222]">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href={`/${l}`} className="flex items-center gap-2 mb-4">
                            <span className="w-7 h-7 rounded bg-primary flex items-center justify-center text-heading font-black text-sm">
                                H
                            </span>
                            <span className="font-bold text-lg text-white">{name}</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Decoupled headless CMS architecture powered by Filament v5, Inertia v3, and React 19.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-xs uppercase tracking-wider text-primary font-semibold mb-4">Navigation</h4>
                        <ul className="space-y-2.5 text-sm text-gray-400">
                            <li><Link href={`/${l}`} className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href={`/${l}/about`} className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href={`/${l}/articles`} className="hover:text-white transition-colors">Articles & News</Link></li>
                            <li><Link href={`/${l}/contact`} className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-xs uppercase tracking-wider text-primary font-semibold mb-4">Compliance</h4>
                        <ul className="space-y-2.5 text-sm text-gray-400">
                            <li><Link href={`/${l}/privacy-policy`} className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href={`/${l}/terms-of-service`} className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href={`/${l}/sitemap`} className="hover:text-white transition-colors">HTML Sitemap</Link></li>
                        </ul>
                    </div>

                    {/* Contact details */}
                    <div>
                        <h4 className="text-xs uppercase tracking-wider text-primary font-semibold mb-4">Get in Touch</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <p>Email: <a href={`mailto:${email}`} className="text-white hover:underline">{email}</a></p>
                            <p>Phone: <span className="text-white">{phone}</span></p>
                            <div className="pt-2">
                                <a
                                    href="/admin"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-block text-xs font-semibold px-3 py-1.5 rounded bg-primary text-heading hover:opacity-90 transition-opacity"
                                >
                                    Admin Login →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
                    <p>© {new Date().getFullYear()} {name}. Built with Filament & Inertia. All rights reserved.</p>
                    <p>English • العربية • Español</p>
                </div>
            </div>
        </footer>
    );
}
