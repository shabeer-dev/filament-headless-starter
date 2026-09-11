import FormattedText from '@/components/ui/FormattedText';
import GlassCard from '@/components/ui/GlassCard';
import IconContactBlock from '@/components/ui/IconContactBlock';
import { H3 } from '@/components/ui/Typography';
import type { PageContact } from '@/types/content';

export default function DirectContact({ content }: { content: PageContact }) {
    return (
        <GlassCard>
            <H3>
                <FormattedText
                    text={content.form_headline || 'Direct Inquiries'}
                    className="inline"
                />
            </H3>
            <p className="mb-8 font-body-md text-body-md tracking-wide text-on-surface-variant">
                We typically respond within 1 business day. Reach out directly through any of the channels below.
            </p>
            <div className="flex flex-col gap-6">
                {content.contact_phone && (
                    <IconContactBlock
                        icon="phone"
                        label="Direct Telephone"
                        value={content.contact_phone}
                        href={`tel:${content.contact_phone.replace(/[^0-9+]/g, '')}`}
                    />
                )}

                {content.contact_email && (
                    <IconContactBlock
                        icon="mail"
                        label="Email Address"
                        value={content.contact_email}
                        href={`mailto:${content.contact_email}`}
                        className={content.contact_phone ? 'border-t border-border pt-6' : ''}
                    />
                )}

                {content.business_hours && (
                    <div className="border-t border-border pt-6">
                        <div className="text-xs uppercase tracking-wider text-caption font-semibold">Operating Hours</div>
                        <div className="mt-1 text-sm font-medium text-heading">{content.business_hours}</div>
                    </div>
                )}
            </div>
        </GlassCard>
    );
}
