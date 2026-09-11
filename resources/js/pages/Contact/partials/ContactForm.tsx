import { Form, usePage } from '@inertiajs/react';
import { Turnstile } from '@marsidev/react-turnstile';
import { submit } from '@/actions/App/Http/Controllers/ContactController';
import Button from '@/components/ui/Button';
import FormGroup from '@/components/ui/FormGroup';
import GlassCard from '@/components/ui/GlassCard';
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
        <GlassCard>
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
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {wasSuccessful ? (
                                <div className="text-md col-span-full rounded border border-green-500/20 bg-green-500/10 px-4 py-3 text-center text-green-500">
                                    {t(
                                        'Your inquiry has been submitted successfully. We will get back to you shortly!',
                                    )}
                                </div>
                            ) : null}
                            <FormGroup>
                                <Label htmlFor="name">{t('Full Name')}</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder={t('ENTER FULL NAME')}
                                />
                                {errors.name ? (
                                    <div className="mt-1 text-sm text-red-500">
                                        {errors.name}
                                    </div>
                                ) : null}
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
                                {errors.company ? (
                                    <div className="mt-1 text-sm text-red-500">
                                        {errors.company}
                                    </div>
                                ) : null}
                            </FormGroup>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                                {errors.email ? (
                                    <div className="mt-1 text-sm text-red-500">
                                        {errors.email}
                                    </div>
                                ) : null}
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
                                {errors.phone ? (
                                    <div className="mt-1 text-sm text-red-500">
                                        {errors.phone}
                                    </div>
                                ) : null}
                            </FormGroup>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormGroup>
                                <Label htmlFor="country">{t('Country')}</Label>
                                <Input
                                    id="country"
                                    name="country"
                                    placeholder={t('ENTER COUNTRY')}
                                />
                                {errors.country ? (
                                    <div className="mt-1 text-sm text-red-500">
                                        {errors.country}
                                    </div>
                                ) : null}
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="segment">
                                    {t('Product / Segment of Interest')}
                                </Label>
                                <Select
                                    id="segment"
                                    name="segment"
                                    defaultValue={defaultSegment}
                                >
                                    <option value="">
                                        {t('SELECT SEGMENT…')}
                                    </option>
                                    <option value="hsrp">
                                        {t(
                                            'High Security Registration Plates (HSRP)',
                                        )}
                                    </option>
                                    <option value="hsrp-safeguards">
                                        {t('HSRP Safeguards')}
                                    </option>
                                    <option value="international-plates">
                                        {t('International License Plates')}
                                    </option>
                                    <option value="signages">
                                        {t('Signages (Orbiz Signz)')}
                                    </option>
                                    <option value="vltd">
                                        {t('Vehicle Location Tracking Devices')}
                                    </option>
                                    <option value="fun-plates">
                                        {t('Fun Plates — Custom / Decorative')}
                                    </option>
                                    <option value="embossing-tools">
                                        {t('Embossing Tools & Foils')}
                                    </option>
                                    <option value="production-machinery">
                                        {t(
                                            'Production Line Machines & Accessories',
                                        )}
                                    </option>
                                    <option value="rfid-technology">
                                        {t('RFID Technology')}
                                    </option>
                                    <option value="general-enquiry">
                                        {t('General Enquiry')}
                                    </option>
                                </Select>
                                {errors.segment ? (
                                    <div className="mt-1 text-sm text-red-500">
                                        {errors.segment}
                                    </div>
                                ) : null}
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
                            {errors.message ? (
                                <div className="mt-1 text-sm text-red-500">
                                    {errors.message}
                                </div>
                            ) : null}
                        </FormGroup>

                        {props.turnstileSiteKey && (
                            <FormGroup>
                                <Turnstile siteKey={props.turnstileSiteKey} />
                                {errors['cf-turnstile-response'] ? (
                                    <div className="mt-1 text-sm text-red-500">
                                        {errors['cf-turnstile-response']}
                                    </div>
                                ) : null}
                            </FormGroup>
                        )}

                        <div className="flex flex-col gap-4 pt-4">
                            <Button
                                type="submit"
                                variant="outline"
                                className="w-full justify-center"
                                disabled={processing}
                            >
                                {processing
                                    ? t('SUBMITTING...')
                                    : t('SUBMIT INQUIRY')}
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </GlassCard>
    );
}
