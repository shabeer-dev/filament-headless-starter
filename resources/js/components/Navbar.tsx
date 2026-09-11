import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function Navbar() {
    const { url, props } = usePage<any>();
    const locale = props.locale || 'en';
    const appName = props.appName || 'Headless Starter';
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { label: 'Home', href: `/${locale}` },
        { label: 'About', href: `/${locale}/about` },
        { label: 'Articles', href: `/${locale}/articles` },
        { label: 'Contact', href: `/${locale}/contact` },
    ];

    const isActive = (path: string) => {
        if (path === `/${locale}`) {
            return url === `/${locale}` || url === `/${locale}/`;
        }
        return url.startsWith(path);
    };

    return (
        <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
                {/* Brand Logo / Text */}
                <Link href={`/${locale}`} className="flex items-center gap-2 group">
                    <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-heading font-black text-lg shadow-xs group-hover:scale-105 transition-transform">
                        H
                    </span>
                    <span className="font-bold text-xl tracking-tight text-heading">
                        {appName}
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    {navLinks.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`transition-colors py-1 ${
                                isActive(item.href)
                                    ? 'text-primary font-semibold border-b-2 border-primary'
                                    : 'text-body hover:text-heading'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Right actions: Language Switcher & Admin Portal */}
                <div className="hidden md:flex items-center gap-4">
                    <LanguageSwitcher />

                    <a
                        href="/admin"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold px-3 py-1.5 rounded-md border border-border bg-surface-alt hover:border-primary text-heading transition-colors"
                    >
                        CMS Admin ↗
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center gap-3">
                    <LanguageSwitcher />
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle Menu"
                        className="p-2 rounded-md border border-border text-heading hover:bg-surface-alt"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {mobileOpen && (
                <div className="md:hidden border-b border-border bg-surface px-4 pt-2 pb-6 space-y-3">
                    {navLinks.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`block py-2 text-base font-medium ${
                                isActive(item.href) ? 'text-primary font-bold' : 'text-body hover:text-heading'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="pt-4 border-t border-border">
                        <a
                            href="/admin"
                            target="_blank"
                            rel="noreferrer"
                            className="block text-center text-sm font-semibold py-2 px-4 rounded-md bg-primary text-heading"
                        >
                            Open Admin Panel
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
