import SeoMeta from '@/components/SeoMeta';
import AppLayout from '@/layouts/AppLayout';
import ContactSection from '@/pages/Contact/partials/ContactSection';
import HeroSection from '@/components/ui/HeroSection';
import type { PageContact } from '@/types/content';

export default function Contact({ content }: { content?: PageContact }) {
    const pageContent = content || ({} as PageContact);

    return (
        <>
            <SeoMeta />

            <HeroSection
                content={pageContent}
                media={pageContent.media || []}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Contact Us' },
                ]}
            />

            <ContactSection content={pageContent} />
        </>
    );
}

Contact.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
