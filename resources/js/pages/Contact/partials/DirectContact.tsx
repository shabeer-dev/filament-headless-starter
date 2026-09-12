import FormattedText from '@/components/ui/FormattedText';
import type { PageContact } from '@/types/content';

export default function DirectContact({ content }: { content: PageContact }) {
    return (
        <div className="space-y-6">
            {/* Primary Contact Info Bento Card */}
            <div className="bento-card p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-subtle text-primary flex items-center justify-center font-bold">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-heading">
                            <FormattedText
                                text={content.form_headline || 'Direct Channels'}
                                className="inline"
                            />
                        </h3>
                        <p className="text-xs text-muted">We typically respond within 1 business day.</p>
                    </div>
                </div>

                <div className="divide-y divide-border/60 mt-6">
                    {content.contact_email && (
                        <div className="py-4 first:pt-0">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1">
                                Email Inquiries
                            </span>
                            <a
                                href={`mailto:${content.contact_email}`}
                                className="text-base font-semibold text-heading hover:text-primary transition-colors inline-flex items-center gap-2 group"
                            >
                                <span>{content.contact_email}</span>
                                <svg className="w-4 h-4 text-muted group-hover:translate-x-1 group-hover:text-primary transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    )}

                    {content.contact_phone && (
                        <div className="py-4">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1">
                                Phone & Hotline
                            </span>
                            <a
                                href={`tel:${content.contact_phone.replace(/[^0-9+]/g, '')}`}
                                className="text-base font-semibold text-heading hover:text-primary transition-colors inline-flex items-center gap-2 group"
                            >
                                <span>{content.contact_phone}</span>
                                <svg className="w-4 h-4 text-muted group-hover:translate-x-1 group-hover:text-primary transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    )}

                    {content.contact_address && (
                        <div className="py-4">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1">
                                Headquarters / Office
                            </span>
                            <p className="text-sm text-body leading-relaxed">
                                {content.contact_address}
                            </p>
                        </div>
                    )}

                    {content.business_hours && (
                        <div className="py-4 last:pb-0">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-1">
                                Operating Hours
                            </span>
                            <p className="text-sm font-medium text-heading">
                                {content.business_hours}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* SLA / Commitment Bento Card */}
            <div className="bento-card p-6 bg-surface-subtle/60 border border-border">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-heading">Rapid Dispatch Guarantee</h4>
                        <p className="text-xs text-muted mt-1 leading-relaxed">
                            Messages submitted through our encrypted contact portal are directly routed to project maintainers with an average SLA under 24 hours.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
