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
        <header className="sticky top-0 z-40 bg-surface/85 backdrop-blur-md border-b border-border transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Brand Logo / Text */}
                <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
                    <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-black text-lg shadow-xs group-hover:scale-105 transition-transform">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 2 7 12 12 22 7 12 2" />
                            <polyline points="2 17 12 22 22 17" />
                            <polyline points="2 12 12 17 22 12" />
                        </svg>
                    </div>
                    <span className="font-bold text-lg tracking-tight text-heading">
                        {appName}
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
                    {navLinks.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`px-3.5 py-1.5 rounded-md transition-all ${
                                isActive(item.href)
                                    ? 'bg-primary-subtle text-primary font-semibold'
                                    : 'text-body hover:text-heading hover:bg-surface-subtle'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Right actions */}
                <div className="hidden md:flex items-center gap-3">
                    <LanguageSwitcher />

                    <a
                        href="/admin"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-surface hover:border-border-strong text-muted hover:text-heading transition-colors"
                    >
                        CMS Admin ↗
                    </a>

                    <Link
                        href={`/${locale}/contact`}
                        className="text-xs font-semibold px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover shadow-xs transition-all"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex md:hidden items-center gap-2">
                    <LanguageSwitcher />
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle Menu"
                        className="p-2 rounded-lg border border-border text-heading hover:bg-surface-subtle transition-colors"
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

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="md:hidden border-b border-border bg-surface px-4 pt-2 pb-6 space-y-3">
                    <div className="flex flex-col space-y-1">
                        {navLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    isActive(item.href)
                                        ? 'bg-primary-subtle text-primary font-semibold'
                                        : 'text-body hover:bg-surface-subtle'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                    <div className="pt-3 border-t border-border flex flex-col gap-2">
                        <a
                            href="/admin"
                            target="_blank"
                            rel="noreferrer"
                            className="text-center text-xs font-semibold py-2.5 rounded-lg border border-border bg-surface text-heading"
                        >
                            CMS Admin Portal ↗
                        </a>
                        <Link
                            href={`/${locale}/contact`}
                            onClick={() => setMobileOpen(false)}
                            className="text-center text-xs font-semibold py-2.5 rounded-lg bg-primary text-white"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
