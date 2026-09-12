import SeoMeta from '@/components/SeoMeta';
import AppLayout from '@/layouts/AppLayout';
import ContactForm from '@/pages/Contact/partials/ContactForm';
import DirectContact from '@/pages/Contact/partials/DirectContact';
import { useTranslation } from '@/hooks/useTranslation';
import type { PageContact } from '@/types/content';

export default function Contact({ content }: { content?: PageContact }) {
    const { t } = useTranslation();
    const pageContent = content || ({} as PageContact);

    return (
        <>
            <SeoMeta />

            <section className="relative overflow-hidden py-16 md:py-24 bg-background">
                <div className="radial-glow top-0 left-1/2 -translate-x-1/2" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Page Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 pill-badge mb-4">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span>{pageContent.hero_label || t('Reach Out')}</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-heading tracking-tight">
                            {pageContent.hero_title || t('We’d Love to Hear From You')}
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-body max-w-2xl mx-auto leading-relaxed">
                            {pageContent.hero_description ||
                                t('Have an inquiry, project proposal, or need technical support? Send us a message and our team will get back to you promptly.')}
                        </p>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Direct Channels & SLA */}
                        <div className="lg:col-span-5">
                            <DirectContact content={pageContent} />
                        </div>

                        {/* Interactive Form */}
                        <div className="lg:col-span-7">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

Contact.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
