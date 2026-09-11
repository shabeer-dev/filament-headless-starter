import { H3 } from '@/components/ui/Typography';
import React from 'react';
import { cn } from '@/lib/utils';
import Flag from '@/components/ui/Flag';

interface AddressCardProps {
    country: 'IN' | 'GB' | 'AE' | 'in' | 'gb' | 'ae';
    subheading?: React.ReactNode;
    address: string[] | string;
    centered?: boolean;
    className?: string;
}

const COUNTRY_NAMES: Record<string, string> = {
    IN: 'India',
    GB: 'United Kingdom',
    AE: 'United Arab Emirates',
};

import FormattedText from '@/components/ui/FormattedText';

export default function AddressCard({
    country,
    subheading,
    address,
    centered = true,
    className = '',
}: AddressCardProps) {
    const code = country.toUpperCase() as 'IN' | 'GB' | 'AE';
    const title = COUNTRY_NAMES[code] || code;

    return (
        <div
            className={cn(
                'group relative overflow-hidden border border-border bg-white rounded-lg p-8 text-heading shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md',
                centered ? 'text-center' : 'text-start',
                className
            )}
        >
            <div className="flex h-full flex-col justify-between">
                <div>
                    {/* Automatically Assigned Flag Icon */}
                    <div className={cn('mb-6', centered ? 'flex justify-center' : '')}>
                        <Flag country={code} />
                    </div>

                    {/* Title derived from Country */}
                    <H3 className="text-heading! font-bold text-xl mb-1">
                        <FormattedText text={title} className="inline" />
                    </H3>

                    {/* Subheading */}
                    {subheading ? (
                        <FormattedText 
                            as="div" 
                            className="mb-3 font-label-md text-label-md uppercase tracking-wider text-primary font-semibold text-xs"
                            text={subheading} 
                        />
                    ) : null}

                    {/* Address Lines */}
                    <div className="grow font-normal text-[14px] leading-relaxed text-body space-y-1">
                        {(Array.isArray(address) ? address : [address]).map((line, index) => (
                            <FormattedText key={index} as="div" text={line} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
