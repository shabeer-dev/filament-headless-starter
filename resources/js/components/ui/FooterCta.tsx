import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import * as routes from '@/routes';

import { usePage } from '@inertiajs/react';
import { getSegmentFromUrl } from '@/lib/utils';
import type { MediaItem } from '@/types/content';

interface FooterCtaProps {
    route?: string | null;
    title?: string | null;
    buttonText?: string | null;
    href?: string;
    params?: Record<string, string>;
    media?: MediaItem[];
}

export default function FooterCta({
    title,
    buttonText,
    href = routes.contact.url(),
    route,
    params,
    media,
}: FooterCtaProps) {
    const { url: currentUrl } = usePage();
    const finalTitle = title || 'Looking for a globally certified partner in security and identification?';
    const finalButtonText = buttonText || 'Start a Conversation';

    let finalHref = route ? (routes as any)[route]?.url() || href : href;
    
    let finalParams = params;
    if (!finalParams && finalHref.includes('/contact')) {
        const segment = getSegmentFromUrl(currentUrl);
        if (segment) finalParams = { segment };
    }

    if (finalParams && finalHref !== '#') {
        const separator = finalHref.includes('?') ? '&' : '?';
        const queryStr = new URLSearchParams(finalParams).toString();
        finalHref = `${finalHref}${separator}${queryStr}`;
    }

    const backgroundMedia = media?.find(
        (m: MediaItem) => m.collection_name === 'footer_cta_bg',
    );
    const isVideo = backgroundMedia?.mime_type?.startsWith('video/') || backgroundMedia?.file_name?.match(/\.(mp4|webm|ogg|mov)$/i);

    return (
        <Section 
            hasBorders={false}
            theme={backgroundMedia ? 'dark' : 'slate'} 
            className="relative overflow-hidden"
            innerClassName="text-center flex flex-col items-center"
        >
            {backgroundMedia && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden">
                        {isVideo ? (
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 opacity-60"
                                src={backgroundMedia.original_url}
                            ></video>
                        ) : (
                            <img
                                src={backgroundMedia.original_url}
                                alt="Footer Background"
                                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 opacity-80"
                            />
                        )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40"></div>
                </div>
            )}
            
            <div className="relative z-10 flex flex-col items-center w-full">
                <SectionHeader 
                    title={finalTitle} 
                    variant="light" 
                    className="!mb-8 max-w-4xl"
                />
                <Button href={finalHref} size="large">
                    {finalButtonText}
                </Button>
            </div>
        </Section>
    );
}

