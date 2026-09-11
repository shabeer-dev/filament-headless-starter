import { Head, usePage } from '@inertiajs/react';

interface SeoMetaProps {
    noindex?: boolean;
    title?: string;
    description?: string;
}

export default function SeoMeta({ noindex = false, title: propTitle, description: propDesc }: SeoMetaProps) {
    const { content, appName, appUrl, currentUrl, currentPath, alternateUrls, locale } = usePage<any>().props;

    // Use SEO fields if provided, otherwise fallback to page content or default strings
    const title = propTitle || content?.seo?.title || content?.hero_title || 'Welcome';
    const description =
        propDesc ||
        content?.seo?.description ||
        content?.hero_description ||
        'Orbiz Automotivez - Engineering Precision.';
    const keywords =
        content?.seo?.keywords?.join(', ') ||
        'HSRP, License Plates, Orbiz, Automotive';

    // Determine the OpenGraph image
    let ogImage = content?.seo?.og_image
        ? `/storage/${content.seo.og_image}`
        : null;

    if (!ogImage && content?.media?.length > 0) {
        ogImage = content.media[0].original_url;
    }

    if (!ogImage) {
        ogImage = '/images/og-default.jpg'; // Fallback
    }

    // Ensure OG image is absolute URL if appUrl is available and ogImage is relative
    if (ogImage && appUrl && ogImage.startsWith('/')) {
        ogImage = `${appUrl}${ogImage}`;
    }

    const fullTitle = `${title} | ${appName || 'Orbiz Automotivez'}`;

    // Structured Data (JSON-LD) - Organization
    const organizationJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: appName || 'Orbiz Automotivez',
        url: appUrl || 'https://orbiz.in',
        logo: appUrl ? `${appUrl}/images/logo.png` : '',
        description: 'Orbiz Automotivez - Engineering Precision. Leading manufacturer of High Security Registration Plates (HSRP) and number plate manufacturing machines.',
    };

    // Structured Data (JSON-LD) - Breadcrumbs
    let breadcrumbJsonLd = null;
    if (currentPath) {
        const pathSegments = currentPath.split('/').filter(Boolean);
        const isLocaleFirst = pathSegments.length > 0 && pathSegments[0].length === 2;
        const breadcrumbSegments = isLocaleFirst ? pathSegments.slice(1) : pathSegments;

        if (breadcrumbSegments.length > 0) {
            let currentPathAccumulator = isLocaleFirst ? `/${pathSegments[0]}` : '';
            const breadcrumbListItems = breadcrumbSegments.map((segment: string, index: number) => {
                currentPathAccumulator += `/${segment}`;
                return {
                    '@type': 'ListItem',
                    position: index + 1,
                    name: segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
                    item: `${appUrl}${currentPathAccumulator}`
                };
            });

            breadcrumbJsonLd = {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: breadcrumbListItems
            };
        }
    }

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            {currentUrl && <link rel="canonical" href={currentUrl} />}
            
            {alternateUrls && Object.entries(alternateUrls).map(([locale, url]) => (
                <link key={locale} rel="alternate" hrefLang={locale} href={url as string} />
            ))}
            {appUrl && <link rel="alternate" hrefLang="x-default" href={appUrl} />}

            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            {ogImage ? <meta property="og:image" content={ogImage} /> : null}
            <meta property="og:type" content="website" />
            {locale && <meta property="og:locale" content={locale} />}
            {currentUrl && <meta property="og:url" content={currentUrl} />}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}

            <script type="application/ld+json">
                {JSON.stringify(organizationJsonLd)}
            </script>
            {breadcrumbJsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbJsonLd)}
                </script>
            )}
        </Head>
    );
}
