import SeoMeta from '@/components/SeoMeta';
import AppLayout from '@/layouts/AppLayout';
import ContactSection from '@/pages/Contact/partials/ContactSection';
import HeroSection from '@/components/ui/HeroSection';
import type { PageContact } from '@/types/content';

export default function Contact({ content }: { content: PageContact }) {
    return (
        <>
            <SeoMeta />

            <HeroSection
                content={content}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Contact Us' },
                ]}
            />

            <ContactSection content={content} />
        </>
    );
}

Contact.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
