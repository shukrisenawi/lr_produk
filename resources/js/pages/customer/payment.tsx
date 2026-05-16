import { Head, useForm } from '@inertiajs/react';
import { Building2, CreditCard, Upload, Info, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
    order: {
        id: number;
        status: string;
        grand_total: number;
        latest_receipt?: {
            id: number;
            original_name: string;
            review_note?: string | null;
        } | null;
    };
    bankDetails: {
        bank_name: string;
        account_number: string;
        account_holder: string;
        whatsapp: string;
    };
};

const formatMoney = (amount: number) =>
    new Intl.NumberFormat('ms-MY', { style: 'currency', currency: 'MYR' }).format(amount / 100);

export default function Payment({ order, bankDetails }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        receipt: null as File | null,
    });

    return (
        <>
            <Head title={`Bayaran Pesanan #${order.id}`} />

            <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Bayaran pesanan #{order.id}</h1>
                    <p className="text-sm text-muted-foreground">
                        Buat bayaran manual ke akaun bank di bawah, kemudian upload resit.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                    <section className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                                <Building2 className="size-5" />
                            </div>
                            <h2 className="text-xl font-bold tracking-tight">Maklumat akaun penjual</h2>
                        </div>
                        <div className="space-y-4 text-sm">
                            <div className="rounded-xl bg-muted/50 p-4">
                                <p className="text-muted-foreground text-xs">Bank</p>
                                <p className="mt-1 font-bold">{bankDetails.bank_name}</p>
                            </div>
                            <div className="rounded-xl bg-muted/50 p-4">
                                <p className="text-muted-foreground text-xs">Nombor akaun</p>
                                <p className="mt-1 font-bold text-lg tracking-wider">{bankDetails.account_number}</p>
                            </div>
                            <div className="rounded-xl bg-muted/50 p-4">
                                <p className="text-muted-foreground text-xs">Nama penerima</p>
                                <p className="mt-1 font-semibold">{bankDetails.account_holder}</p>
                            </div>
                            <div className="rounded-xl bg-muted/50 p-4">
                                <p className="text-muted-foreground text-xs">WhatsApp follow-up</p>
                                <a
                                    href={`https://wa.me/${bankDetails.whatsapp.replace(/[^0-9]/g, '')}`}
                                    className="mt-1 block font-semibold text-primary"
                                >
                                    {bankDetails.whatsapp}
                                </a>
                            </div>
                            <div className="rounded-2xl bg-secondary p-5">
                                <p className="text-muted-foreground text-xs">Jumlah perlu dibayar</p>
                                <p className="mt-1 text-3xl font-black text-primary">{formatMoney(order.grand_total)}</p>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                                <Upload className="size-5" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold tracking-tight">Upload resit bayaran</h2>
                                <p className="text-sm text-muted-foreground">
                                    Terima fail JPG, PNG, WEBP, atau PDF sehingga 5MB.
                                </p>
                            </div>
                        </div>

                        <form
                            className="mt-6 space-y-4"
                            onSubmit={(event) => {
                                event.preventDefault();
                                post(`/pesanan/${order.id}/resit`, {
                                    forceFormData: true,
                                });
                            }}
                        >
                            <div className="rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 text-center transition-all hover:border-primary/30 hover:bg-secondary/30">
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.webp,.pdf"
                                    onChange={(event) => setData('receipt', event.target.files?.[0] ?? null)}
                                    className="w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90"
                                />
                            </div>
                            {errors.receipt && <p className="text-sm text-destructive">{errors.receipt}</p>}

                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl"
                            >
                                {processing ? 'Sedang upload...' : 'Upload resit sekarang'}
                                <ArrowRight className="size-4" />
                            </Button>
                        </form>

                        {order.latest_receipt && (
                            <div className="mt-6 rounded-xl bg-muted/50 p-4">
                                <div className="flex items-start gap-3">
                                    <Info className="size-4 text-muted-foreground mt-0.5" />
                                    <div className="text-sm">
                                        <p className="font-semibold">Resit terkini: {order.latest_receipt.original_name}</p>
                                        {order.latest_receipt.review_note && (
                                            <p className="mt-1 text-muted-foreground">
                                                {order.latest_receipt.review_note}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </>
    );
}
