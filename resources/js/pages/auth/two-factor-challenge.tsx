import { Form, Head } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useMemo, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';

const OTP_MAX_LENGTH = 6;

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState(false);
    const [code, setCode] = useState('');

    const copy = useMemo(() => {
        if (showRecoveryInput) {
            return {
                title: 'Kod pemulihan',
                description: 'Masukkan salah satu kod pemulihan anda.',
                toggleText: 'guna kod autentikasi',
            };
        }

        return {
            title: 'Kod autentikasi',
            description: 'Masukkan kod dari aplikasi authenticator anda.',
            toggleText: 'guna kod pemulihan',
        };
    }, [showRecoveryInput]);

    return (
        <>
            <Head title="Pengesahan dua faktor" />

            <div className="space-y-6">
                <Form action="/two-factor-challenge" method="post" className="space-y-4" resetOnError>
                    {({ errors, processing, clearErrors }) => (
                        <>
                            {showRecoveryInput ? (
                                <>
                                    <Input
                                        name="recovery_code"
                                        type="text"
                                        placeholder="Masukkan kod pemulihan"
                                        autoFocus
                                        required
                                    />
                                    <InputError message={errors.recovery_code} />
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-3 text-center">
                                    <InputOTP
                                        name="code"
                                        maxLength={OTP_MAX_LENGTH}
                                        value={code}
                                        onChange={setCode}
                                        disabled={processing}
                                        pattern={REGEXP_ONLY_DIGITS}
                                        autoFocus
                                    >
                                        <InputOTPGroup>
                                            {Array.from({ length: OTP_MAX_LENGTH }, (_, index) => (
                                                <InputOTPSlot key={index} index={index} />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                    <InputError message={errors.code} />
                                </div>
                            )}

                            <Button type="submit" className="w-full" disabled={processing}>
                                Teruskan
                            </Button>

                            <div className="text-center text-sm text-muted-foreground">
                                <span>Atau </span>
                                <button
                                    type="button"
                                    className="cursor-pointer text-foreground underline underline-offset-4"
                                    onClick={() => {
                                        setShowRecoveryInput(!showRecoveryInput);
                                        clearErrors();
                                        setCode('');
                                    }}
                                >
                                    {copy.toggleText}
                                </button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

TwoFactorChallenge.layout = {
    title: 'Pengesahan dua faktor',
    description: 'Halaman ini hanya digunakan jika ciri 2FA diaktifkan.',
};
