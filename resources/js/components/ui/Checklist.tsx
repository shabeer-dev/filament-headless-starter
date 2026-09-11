import Icon from '@/components/ui/Icon';
import FormattedText from '@/components/ui/FormattedText';

interface ChecklistProps {
    items: string[];
    icon?: string;
    variant?: 'dark' | 'light';
}

export default function Checklist({ items, icon = 'check_circle', variant = 'light' }: ChecklistProps) {
    const itemClasses = "border border-border bg-white rounded-lg shadow-xs hover:border-primary/50 hover:shadow-sm";
    const iconClasses = "text-primary shrink-0";
    const textClasses = "text-heading font-medium text-[15px]";

    return (
        <div className="mx-auto max-w-4xl">
            <ul className="flex flex-col gap-3">
                {items.map((item, i) => (
                    <li
                        key={i}
                        className={`group flex items-center gap-4 rounded-lg border px-4 py-3 sm:px-6 sm:py-4 transition-colors duration-300 ${itemClasses}`}
                    >
                        <Icon name={icon} className={`text-xl transition-colors duration-300 shrink-0 ${iconClasses}`} />
                        <FormattedText
                            as="span"
                            text={item}
                            className={`font-body-lg text-body-lg ${textClasses}`}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
