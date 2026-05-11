import { Form, Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <>
            <Head title="Pengesahan e-mel" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    Pautan pengesahan telah dihantar semula.
                </div>
            )}

            <Form action="/email/verification-notification" method="post" className="space-y-6 text-center">
                {({ processing }) => (
                    <>
                        <Button disabled={processing} variant="secondary">
                            {processing && <Spinner />}
                            Hantar semula pautan pengesahan
                        </Button>

                        <TextLink href={logout()} className="mx-auto block text-sm">
                            Log keluar
                        </TextLink>
                    </>
                )}
            </Form>
        </>
    );
}

VerifyEmail.layout = {
    title: 'Pengesahan e-mel',
    description: 'Sila semak e-mel anda jika ciri ini diaktifkan.',
};
