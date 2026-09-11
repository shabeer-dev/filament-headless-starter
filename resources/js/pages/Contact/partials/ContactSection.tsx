import ContactForm from '@/pages/Contact/partials/ContactForm';
import DirectContact from '@/pages/Contact/partials/DirectContact';
import type { PageContact } from '@/types/content';

export default function ContactSection({ content }: { content: PageContact }) {
    return (
        <div className="relative z-20 mx-auto -mt-10 md:-mt-16 mb-16 md:mb-24 max-w-container-max px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 items-stretch gap-gutter lg:grid-cols-12">
                {/* Contact Form Container */}
                <div className="flex flex-col gap-4 lg:col-span-8">
                    <ContactForm />
                </div>

                {/* Direct Contact Info */}
                <div className="h-full lg:col-span-4">
                    <DirectContact content={content} />
                </div>
            </div>
        </div>
    );
}
