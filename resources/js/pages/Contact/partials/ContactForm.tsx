import { Form, usePage } from '@inertiajs/react';
import { Turnstile } from '@marsidev/react-turnstile';
import { submit } from '@/actions/App/Http/Controllers/ContactController';
import FormGroup from '@/components/ui/FormGroup';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { useTranslation } from '@/hooks/useTranslation';

export default function ContactForm() {
    const { t } = useTranslation();
    const { props, url } = usePage<any>();
    const { honeypot } = props;
    const params = new URLSearchParams(url.split('?')[1] || '');
    const defaultSegment = params.get('segment') || '';

    return (
        <div className="bento-card p-6 sm:p-10">
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-heading">
                    {t('Send an Inquiry')}
                </h3>
                <p className="mt-1 text-sm text-body">
                    {t('Fill out the form below and our team will get in touch with you shortly.')}
                </p>
            </div>

            <Form
                action={submit.url()}
                method="post"
                resetOnSuccess
                className="space-y-6"
                noValidate
            >
                {({ errors, processing, wasSuccessful }) => (
                    <>
                        {honeypot?.enabled && (
                            <div style={{ display: 'none' }}>
                                <input
                                    type="text"
                                    name={honeypot.nameFieldName}
                                    id={honeypot.nameFieldName}
                                />
                                <input
                                    type="text"
                                    name={honeypot.validFromFieldName}
                                    defaultValue={honeypot.encryptedValidFrom}
                                />
                            </div>
                        )}

                        {wasSuccessful && (
                            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                                <svg className="w-5 h-5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>
                                    {t('Your inquiry has been submitted successfully. We will get back to you shortly!')}
                                </span>
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <FormGroup>
                                <Label htmlFor="name">{t('Full Name')}</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder={t('ENTER FULL NAME')}
                                />
                                {errors.name && (
                                    <div className="mt-1.5 text-xs font-medium text-red-500">
                                        {errors.name}
                                    </div>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="company">
                                    {t('Company Name')}
                                </Label>
                                <Input
                                    id="company"
                                    name="company"
                                    placeholder={t('ENTER COMPANY NAME')}
                                />
                                {errors.company && (
                                    <div className="mt-1.5 text-xs font-medium text-red-500">
                                        {errors.company}
                                    </div>
                                )}
                            </FormGroup>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <FormGroup>
                                <Label htmlFor="email">
                                    {t('Email Address')}
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder={t('EMAIL@COMPANY.COM')}
                                />
                                {errors.email && (
                                    <div className="mt-1.5 text-xs font-medium text-red-500">
                                        {errors.email}
                                    </div>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="phone">
                                    {t('Phone / Mobile')}
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    placeholder={t('ENTER PHONE NUMBER')}
                                />
                                {errors.phone && (
                                    <div className="mt-1.5 text-xs font-medium text-red-500">
                                        {errors.phone}
                                    </div>
                                )}
                            </FormGroup>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <FormGroup>
                                <Label htmlFor="country">{t('Country')}</Label>
                                <Input
                                    id="country"
                                    name="country"
                                    placeholder={t('ENTER COUNTRY')}
                                />
                                {errors.country && (
                                    <div className="mt-1.5 text-xs font-medium text-red-500">
                                        {errors.country}
                                    </div>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="segment">
                                    {t('Topic of Interest')}
                                </Label>
                                <Select
                                    id="segment"
                                    name="segment"
                                    defaultValue={defaultSegment}
                                >
                                    <option value="">
                                        {t('Select Inquiry Topic…')}
                                    </option>
                                    <option value="general">
                                        {t('General Inquiry')}
                                    </option>
                                    <option value="enterprise">
                                        {t('Enterprise Solutions')}
                                    </option>
                                    <option value="technical">
                                        {t('Technical Architecture & API')}
                                    </option>
                                    <option value="partnership">
                                        {t('Partnership & Integration')}
                                    </option>
                                    <option value="consulting">
                                        {t('Support & Consulting')}
                                    </option>
                                </Select>
                                {errors.segment && (
                                    <div className="mt-1.5 text-xs font-medium text-red-500">
                                        {errors.segment}
                                    </div>
                                )}
                            </FormGroup>
                        </div>

                        <FormGroup>
                            <Label htmlFor="message">{t('Message')}</Label>
                            <Textarea
                                id="message"
                                name="message"
                                autoComplete="off"
                                placeholder={t('PROVIDE INQUIRY DETAILS…')}
                                rows={4}
                            />
                            {errors.message && (
                                <div className="mt-1.5 text-xs font-medium text-red-500">
                                    {errors.message}
                                </div>
                            )}
                        </FormGroup>

                        {props.turnstileSiteKey && (
                            <FormGroup>
                                <Turnstile siteKey={props.turnstileSiteKey} />
                                {errors['cf-turnstile-response'] && (
                                    <div className="mt-1.5 text-xs font-medium text-red-500">
                                        {errors['cf-turnstile-response']}
                                    </div>
                                )}
                            </FormGroup>
                        )}

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3.5 px-6 rounded-xl bg-primary text-white hover:bg-primary-hover font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                                {processing ? (
                                    <>
                                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        <span>{t('SUBMITTING...')}</span>
                                    </>
                                ) : (
                                    <>
                                        <span>{t('SUBMIT INQUIRY')}</span>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </>
                )}
            </Form>
        </div>
    );
}
