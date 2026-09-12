import { useEffect, useState } from 'react';
import SeoMeta from '@/components/SeoMeta';
import { useTranslation } from '@/hooks/useTranslation';
import AppLayout from '@/layouts/AppLayout';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import ContactForm from '@/pages/Contact/partials/ContactForm';

interface ErrorProps {
    status: number;
    support?: { phone: string; email: string };
}

export default function Error({ status, support }: ErrorProps) {
    const { t } = useTranslation();
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    useEffect(() => {
        if (status === 503) {
            const interval = setInterval(() => {
                fetch(window.location.href, { method: 'HEAD', headers: { 'X-Requested-With': 'XMLHttpRequest' } })
                    .then(response => {
                        if (response.status !== 503) {
                            window.location.reload();
                        }
                    })
                    .catch(() => {});
            }, 30000); // Check every 30 seconds
            return () => clearInterval(interval);
        }
    }, [status]);
    
    const title = {
        503: t("We'll be right back!"),
        500: t('Server Error'),
        404: t('Page Not Found'),
        403: t('Forbidden'),
    }[status] || t('Error');

    const description = {
        503: t('We are currently upgrading our systems to serve you better. Please check back shortly.'),
        500: t('Whoops, something went wrong on our servers.'),
        404: t('Sorry, the page you are looking for could not be found.'),
        403: t('Sorry, you are forbidden from accessing this page.'),
    }[status] || t('An unexpected error occurred.');

    return (
        <AppLayout hideNav={status === 503}>
            <SeoMeta title={`${status} - ${title}`} description={description} noindex={true} />
            
            <main className="flex-1 w-full bg-background flex items-center justify-center relative overflow-hidden min-h-screen py-12">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-luminosity"
                            src="/images/hero-video.mp4"
                        ></video>
                    </div>
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-background)_100%)]"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-2xl mx-auto flex flex-col items-center mt-26">
                    {status === 503 ? (
                        <div className="mb-12 flex items-center justify-center gap-2">
                            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-black text-2xl">
                                H
                            </div>
                        </div>
                    ) : (
                        <div className="text-[120px] md:text-[180px] font-display font-black leading-none text-transparent bg-clip-text bg-linear-to-b from-primary to-primary/20 my-4 drop-shadow-[0_0_30px_rgba(var(--color-primary),0.3)]">
                            {status}
                        </div>
                    )}
                    
                    <h1 className="text-3xl md:text-5xl font-display font-bold text-heading mb-6">
                        {title}
                    </h1>
                    
                    <p className="text-lg text-body mb-8 max-w-md mx-auto">
                        {description}
                    </p>

                    {status === 503 ? (
                        <>
                            <Button onClick={() => setIsContactModalOpen(true)} variant="primary">
                                {t('Contact Us')}
                            </Button>
                            <p className="mt-8 text-sm text-caption">
                                {t('Or reach us at:')} <br className="sm:hidden" />
                                <a href={`https://wa.me/${support?.phone?.replace(/\D/g, '')}`} className="text-primary hover:underline transition-colors font-medium" target="_blank" rel="noopener noreferrer">{support?.phone}</a>
                                <span className="mx-2 opacity-50">|</span>
                                <a href={`mailto:${support?.email}`} className="text-primary hover:underline transition-colors font-medium">{support?.email}</a>
                            </p>
                        </>
                    ) : (
                        <Button href="/" variant="primary">
                            {t('Return to Homepage')}
                        </Button>
                    )}
                </div>
            </main>

            <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)}>
                <ContactForm />
            </Modal>
        </AppLayout>
    );
}
