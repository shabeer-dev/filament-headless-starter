import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { usePage, useHttp } from '@inertiajs/react';

interface WhatsappAgent {
    id: number;
    name: string;
    role: string | null;
    phone: string;
}

export default function WhatsAppWidget() {
    const { t } = useTranslation();
    const { whatsapp, support } = usePage<any>().props;
    const agents: WhatsappAgent[] = whatsapp?.agents || [];
    const [isOpen, setIsOpen] = useState(false);

    const {
        data,
        setData,
        post,
        processing: isSubmitting,
    } = useHttp<Record<string, any>>({
        name: '',
        phone: '',
        agent_id: agents.length > 0 ? agents[0].id : '',
        page_url: '',
        ...(usePage<any>().props.honeypot
            ? {
                  [usePage<any>().props.honeypot.nameFieldName]:
                      usePage<any>().props.honeypot.nameFieldValue,
                  [usePage<any>().props.honeypot.validFromFieldName]:
                      usePage<any>().props.honeypot.validFromFieldValue,
              }
            : {}),
    });

    // Fallback if no agents are configured
    const defaultPhone = support?.phone?.replace(/\D/g, '');

    const settings = whatsapp?.settings || {
        widget_version: 'v2',
        require_lead_details: false,
    };

    // Update page_url whenever widget is opened or URL changes
    useEffect(() => {
        if (isOpen) {
            setData('page_url', window.location.href);
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (settings.require_lead_details && (!data.name || !data.phone)) {
            alert(t('Please provide your name and phone number.'));
            return;
        }

        const pageUrl = window.location.href;
        const pageTitle = document.title;

        try {
            await post('/api/whatsapp-leads');
        } catch (error) {
            console.error('Failed to submit lead', error);
            // We still proceed to WhatsApp even if tracking fails so the user experience isn't blocked
        }

        // Find selected agent
        const selectedAgent = agents.find(
            (a) => a.id === Number(data.agent_id),
        );
        const targetPhone = selectedAgent
            ? selectedAgent.phone.replace(/\D/g, '')
            : defaultPhone;
        const agentName = selectedAgent ? selectedAgent.name : 'Team';

        const textMessage = `Hello ${agentName}, I am looking at ${pageTitle} (${pageUrl}) and have a question.`;
        const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(textMessage)}`;

        window.open(whatsappUrl, '_blank');
        setIsOpen(false);
    };

    return (
        <div className="fixed inset-e-8 bottom-8 z-30 md:z-100">
            {/* The Popup Window */}
            {isOpen && (
                <div className="absolute inset-e-0 bottom-16 mb-4 w-[320px] origin-bottom-right overflow-hidden rounded-xl bg-white border border-border shadow-2xl transition-all sm:w-87.5">
                    <div className="bg-[#25D366] p-4 text-white">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold">
                                {t('Chat with Us')} 👋
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-full p-1 hover:bg-black/20 focus:outline-none text-white"
                                aria-label="Close chat"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <p className="mt-1 text-sm opacity-90">
                            {t('We typically reply within a few minutes.')}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 p-5">
                        {agents.length > 1 && (
                            <div>
                                <label className="text-body mb-1 block text-sm font-medium">
                                    {t('Department')}
                                </label>
                                <select
                                    className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-heading focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                                    value={data.agent_id}
                                    onChange={(e) =>
                                        setData(
                                            'agent_id',
                                            Number(e.target.value),
                                        )
                                    }
                                >
                                    {agents.map((agent) => (
                                        <option key={agent.id} value={agent.id}>
                                            {agent.name}{' '}
                                            {agent.role
                                                ? `- ${agent.role}`
                                                : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div>
                            <label className="text-body mb-1 block text-sm font-medium">
                                {t('Name')}{' '}
                                {settings.require_lead_details && (
                                    <span className="text-red-500">*</span>
                                )}
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-heading placeholder:text-caption focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                                placeholder="John Doe"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                required={settings.require_lead_details}
                            />
                        </div>

                        <div>
                            <label className="text-body mb-1 block text-sm font-medium">
                                {t('Phone Number')}{' '}
                                {settings.require_lead_details && (
                                    <span className="text-red-500">*</span>
                                )}
                            </label>
                            <input
                                type="tel"
                                className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-heading placeholder:text-caption focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                                placeholder="+91..."
                                value={data.phone}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                                required={settings.require_lead_details}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] py-2.5 font-bold text-white transition-colors hover:bg-[#25D366]/90 focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:outline-none disabled:opacity-70"
                        >
                            <svg
                                className="h-5 w-5 fill-current text-white"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            {isSubmitting ? t('Starting...') : t('Start Chat')}
                        </button>
                    </form>
                </div>
            )}

            {/* The FAB itself */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition-transform duration-150 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 active:scale-90"
                aria-label={t('Open WhatsApp Chat')}
            >
                {/* Ping Animation Ring (only when closed) */}
                {!isOpen && (
                    <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 opacity-75 duration-1000"></span>
                )}

                {/* WhatsApp SVG Icon */}
                <svg
                    className={`h-6 w-6 fill-current text-white transition-transform duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>

                {/* Close Icon */}
                <svg
                    className={`absolute inset-0 m-auto h-6 w-6 text-white transition-transform duration-300 ${isOpen ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>

                {/* Tooltip (only when closed) */}
                {!isOpen && (
                    <div className="invisible absolute inset-e-full top-1/2 me-4 translate-x-2 -translate-y-1/2 rounded-md border border-border bg-white px-4 py-2 font-medium text-[13px] whitespace-nowrap text-heading opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 rtl:-translate-x-2 rtl:group-hover:translate-x-0">
                        {t('Chat on WhatsApp')}
                    </div>
                )}
            </button>
        </div>
    );
}
