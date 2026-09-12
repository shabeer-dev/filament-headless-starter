// ─── Base Interfaces ─────────────────────────────────────────────────────────

export interface MediaItem {
    id: number;
    collection_name: string;
    name: string;
    file_name: string;
    mime_type: string;
    size: number;
    original_url: string;
    preview_url?: string;
}

export interface SeoMetadata {
    title?: string | null;
    description?: string | null;
    keywords?: string[] | null;
    og_image?: string | null;
}

export interface HeroFields {
    hero_label?: string | null;
    hero_title: string;
    hero_highlighted?: string | null;
    hero_description?: string | null;
    hero_cta_primary?: string | null;
    hero_cta_primary_route?: string | null;
    hero_cta_secondary?: string | null;
    hero_cta_secondary_route?: string | null;
}

export interface OverviewFields {
    overview_title?: string | null;
    overview_subtitle?: string | null;
    overview_description?: string | null;
}

export interface FooterCtaFields {
    footer_cta_title?: string | null;
    footer_cta_button?: string | null;
    footer_cta_route?: string | null;
    seo?: SeoMetadata;
}

// ─── Singleton Page Models ───────────────────────────────────────────────────

export interface PageHome extends HeroFields, OverviewFields, FooterCtaFields {
    id: number;
    stats?: Array<{
        label: string;
        value: string;
        target?: number;
        suffix?: string;
    }>;
    features?: Array<{
        title: string;
        description: string;
        icon?: string;
    }>;
    media?: MediaItem[];
}

export interface PageAbout extends HeroFields, FooterCtaFields {
    id: number;
    story_title?: string | null;
    story_description?: string | null;
    core_values?: Array<{
        title: string;
        description: string;
    }>;
    milestones?: Array<{
        year: string;
        title: string;
        description: string;
    }>;
    media?: MediaItem[];
}

export interface PageContact extends HeroFields, FooterCtaFields {
    id: number;
    contact_email?: string | null;
    contact_phone?: string | null;
    contact_address?: string | null;
    business_hours?: string | null;
    form_headline?: string | null;
    media?: MediaItem[];
}

// ─── Collection Models ───────────────────────────────────────────────────────

export interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    content?: string | null;
    status: 'draft' | 'published';
    published_at?: string | null;
    media?: MediaItem[];
    seo?: SeoMetadata;
}