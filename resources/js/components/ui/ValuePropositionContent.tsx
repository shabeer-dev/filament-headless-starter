import { H2, H3, H4 } from '@/components/ui/Typography';
import React from 'react';
import { Link } from '@inertiajs/react';
import Icon from '@/components/ui/Icon';
import FormattedText from '@/components/ui/FormattedText';

export interface Reason {
    title: string;
    desc?: string;
    icon?: string;
}

interface ValuePropositionContentProps {
    title?: string;
    description?: React.ReactNode;
    icon?: string;
    alignCenter?: boolean;
    
    featureTitle?: string;
    featureDescription?: React.ReactNode;
    featureIcon?: string;
    featureAction?: {
        label: string;
        href: string;
        icon?: string;
    };

    reasons: Reason[];
    reasonIcon?: string;
}

export default function ValuePropositionContent({ 
    title, 
    description,
    icon,
    alignCenter = true,

    featureTitle, 
    featureDescription,
    featureAction,
    featureIcon, 

    reasons, 
    reasonIcon = 'check_circle' 
}: ValuePropositionContentProps) {
    const hasFeatureColumn = !!featureTitle || !!featureDescription || !!featureAction;

    const renderCard = () => (
        <div className="h-full rounded-lg border border-border bg-white p-8 shadow-sm">
            {(title || description) ? (
                <div className={`mb-8 ${alignCenter ? 'text-center' : ''}`}>
                    {title ? (
                        <H2 className={`flex items-center gap-3 ${alignCenter ? 'justify-center' : ''} text-heading`}>
                            {icon ? (
                                <Icon name={icon} className="text-primary" />
                            ) : null}
                            <FormattedText text={title} className="inline" />
                        </H2>
                    ) : null}
                    {description ? (
                        <div className={`font-normal text-[15px] leading-relaxed text-body ${title ? 'mt-2' : ''}`}>
                            <FormattedText as="div" text={description} />
                        </div>
                    ) : null}
                </div>
            ) : null}
            <ul className="space-y-4">
                {reasons.map((reason, i) => (
                    <li
                        key={i}
                        className="flex items-start gap-4 rounded-md border border-border bg-surface-alt p-4"
                    >
                        <Icon name={reason.icon || reasonIcon} className="mt-1 text-primary" style={{ fontVariationSettings: "'FILL' 1" }} />
                        <div>
                            <H4 className="font-semibold text-[16px] text-heading">
                                <FormattedText text={reason.title} className="inline" />
                            </H4>
                            {reason.desc ? (
                                <FormattedText 
                                    as="p" 
                                    className="mt-1 font-normal text-[14px] leading-relaxed text-body" 
                                    text={reason.desc} 
                                />
                            ) : null}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

    if (hasFeatureColumn) {
        return (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                <div className="flex flex-col lg:col-span-5">
                    <div className="flex h-full flex-col gap-6 rounded-lg border border-border bg-white p-8 shadow-sm transition duration-200 hover:border-primary/50">
                        {featureIcon ? (
                            <div className="flex h-14 w-14 items-center justify-center rounded-md border border-primary/20 bg-surface-tint">
                                <Icon name={featureIcon} className="text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }} />
                            </div>
                        ) : null}
                        <div>
                            {featureTitle ? (
                                <H3 className="text-heading">
                                    <FormattedText text={featureTitle} className="inline" />
                                </H3>
                            ) : null}
                            {featureDescription ? (
                                <div className="font-normal text-[15px] leading-relaxed text-body">
                                    <FormattedText as="div" text={featureDescription} />
                                </div>
                            ) : null}
                        </div>
                        {featureAction ? (
                            <Link
                                href={featureAction.href}
                                className="mt-2 flex w-fit items-center justify-center gap-2 rounded-md border-[1.5px] border-heading bg-transparent px-6 py-3 font-bold text-[13px] uppercase tracking-wider text-heading transition-colors hover:bg-heading hover:text-white"
                            >
                                {featureAction.label}
                                {featureAction.icon ? (
                                    <Icon name={featureAction.icon} className="text-body-md" />
                                ) : null}
                            </Link>
                        ) : null}
                    </div>
                </div>
                <div className="lg:col-span-7">
                    {renderCard()}
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl">
            {renderCard()}
        </div>
    );
}
