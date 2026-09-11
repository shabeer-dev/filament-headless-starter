import { H2, H3 } from '@/components/ui/Typography';
import React from 'react';
import Section from '@/components/ui/Section';
import Icon from '@/components/ui/Icon';
import FormattedText from '@/components/ui/FormattedText';

export interface OverviewRightBlock {
    type: 'image' | 'content';
    // For type = 'image'
    imageSrc?: string;
    imageAlt?: string;
    // For type = 'content'
    icon?: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
}

interface OverviewSectionProps {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    description: React.ReactNode;
    theme?: 'light' | 'dark' | 'slate';
    rightBlock?: OverviewRightBlock;
}

export default function OverviewSection({
    title,
    subtitle,
    description,
    theme = 'light',
    rightBlock
}: OverviewSectionProps) {
    const isDark = theme === 'dark';
    const textColor = isDark ? 'text-white' : 'text-heading';
    const descColor = isDark ? 'text-white/80' : 'text-body';

    return (
        <Section theme={theme} hasBorders={true}>
            {rightBlock ? (
                <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-5">
                    <div className="space-y-8 md:col-span-3">
                        <div className="border-s-2 border-primary ps-6">
                            <H2 className={`${textColor}`}>
                                <FormattedText text={title} className="inline" />
                            </H2>
                            {subtitle ? (
                                <H3 className="text-primary!">
                                    <FormattedText text={subtitle} className="inline" />
                                </H3>
                            ) : null}
                        </div>
                        <div className={`font-normal text-[15px] md:text-[16px] leading-[1.7] text-justify ${descColor}`}>
                            <FormattedText as="div" text={description} />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        {rightBlock.type === 'image' ? (
                            <div className={`w-full flex items-center justify-center overflow-hidden rounded-lg border border-border bg-white shadow-sm ${!rightBlock.imageSrc ? 'aspect-4/3' : ''}`}>
                                {rightBlock.imageSrc ? (
                                    <img 
                                        src={rightBlock.imageSrc} 
                                        alt={rightBlock.imageAlt || "Overview Image"} 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-caption">No Image Available</span>
                                )}
                            </div>
                        ) : null}
                        {rightBlock.type === 'content' ? (
                            <div className="relative h-full rounded-lg border border-border bg-white p-8 shadow-sm">
                                {rightBlock.icon ? (
                                    <Icon name={rightBlock.icon} className="absolute -top-5 -inset-e-5 rounded-md border border-border bg-white p-2 text-4xl text-primary shadow-sm" style={{ fontVariationSettings: "'FILL' 1" }} />
                                ) : null}
                                <div className={`${rightBlock.icon ? 'border-s-2 border-primary ps-4 pt-4' : ''}`}>
                                    {rightBlock.title ? (
                                        <H3 className={`mb-2 font-semibold text-[18px] ${textColor}`}>
                                            <FormattedText text={rightBlock.title} className="inline" />
                                        </H3>
                                    ) : null}
                                    {rightBlock.description ? (
                                        <div className={`font-normal text-[15px] leading-relaxed ${isDark ? 'text-white/80' : 'text-body'}`}>
                                            <FormattedText as="div" text={rightBlock.description} />
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-3">
                    <div className="md:col-span-1">
                        <div className="border-s-2 border-primary ps-6">
                            <H2 className={`font-headline-lg text-headline-lg-mobile uppercase md:text-headline-lg ${textColor}`}>
                                <FormattedText text={title} className="inline" />
                            </H2>
                            {subtitle ? (
                                <H3 className="text-primary!">
                                    <FormattedText text={subtitle} className="inline" />
                                </H3>
                            ) : null}
                        </div>
                    </div>
                    <div className={`font-body-lg text-body-lg leading-relaxed text-justify md:col-span-2 ${descColor}`}>
                        <FormattedText as="div" text={description} />
                    </div>
                </div>
            )}
        </Section>
    );
}
