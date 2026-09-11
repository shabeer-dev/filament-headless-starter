import React, { useState, useRef, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import Icon from '@/components/ui/Icon';

export default function LanguageSwitcher() {
    const { locale = 'en', supportedLocales = ['en', 'ar', 'es'] } = usePage<any>().props;
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages: Record<string, string> = {
        en: 'English',
        ar: 'العربية',
        es: 'Español'
    };

    const flags: Record<string, string> = {
        en: 'gb',
        ar: 'sa',
        es: 'es'
    };

    const handleSwitch = (newLocale: string) => {
        setIsOpen(false);
        if (newLocale === locale) {
            return;
        }
        const currentPath = window.location.pathname;
        const segments = currentPath.split('/').filter(Boolean);
        
        if (segments.length > 0 && supportedLocales.includes(segments[0])) {
            segments[0] = newLocale;
        } else {
            segments.unshift(newLocale);
        }
        
        const newPath = '/' + segments.join('/') + window.location.search;
        router.visit(newPath);
    };

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close on scroll when open
    useEffect(() => {
        if (!isOpen) return;

        const handleScroll = () => setIsOpen(false);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isOpen]);

    return (
        <div className="relative -my-6 flex items-center py-6" ref={dropdownRef}>
            <button 
                className="flex items-center gap-2 font-medium text-[14px] tracking-wider text-heading uppercase transition-colors duration-200 hover:text-primary"
                aria-label="Change language"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {flags[locale] ? (
                    <img src={`/images/flags/${flags[locale]}.svg`} alt="" className="h-4 w-6 object-cover rounded-[2px]" aria-hidden="true" />
                ) : (
                    <span className="text-lg leading-none" aria-hidden="true">🌐</span>
                )}
                {locale}
            </button>

            <div 
                className={`absolute inset-e-0 top-full z-50 w-40 origin-top rounded-md border border-border bg-white shadow-xl transition duration-200 ${
                    isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
                }`}
            >
                <div className="flex flex-col py-2">
                    {supportedLocales.map((lang: string) => (
                        <button
                            key={lang}
                            onClick={() => handleSwitch(lang)}
                            className={`flex items-center gap-3 px-4 py-2 text-start font-medium text-[13px] tracking-wider transition-colors hover:bg-surface-alt ${
                                locale === lang ? 'text-primary font-semibold' : 'text-heading hover:text-primary'
                            }`}
                        >
                            {flags[lang] ? (
                                <img src={`/images/flags/${flags[lang]}.svg`} alt="" className="h-4 w-6 object-cover rounded-[2px]" aria-hidden="true" />
                            ) : (
                                <span className="text-base leading-none" aria-hidden="true">🌐</span>
                            )}
                            <span className="uppercase">{lang}</span>
                            <span className="ms-auto text-[10px] text-caption">{languages[lang]}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
