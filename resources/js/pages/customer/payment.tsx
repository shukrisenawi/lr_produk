import { Head, useForm } from '@inertiajs/react';
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
                <section className="rounded-[28px] bg-white p-6 shadow-sm">
                    <h1 className="text-3xl font-bold tracking-tight">Bayaran pesanan #{order.id}</h1>
                    <p className="mt-2 text-sm text-[#717171]">
                        Buat bayaran manual ke akaun bank di bawah, kemudian upload resit.
                    </p>
                </section>

                <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                    <section className="rounded-[28px] bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold">Maklumat akaun penjual</h2>
                        <div className="mt-5 space-y-4 text-sm">
                            <div>
                                <p className="text-[#717171]">Bank</p>
                                <p className="font-semibold">{bankDetails.bank_name}</p>
                            </div>
                            <div>
                                <p className="text-[#717171]">Nombor akaun</p>
                                <p className="font-semibold">{bankDetails.account_number}</p>
                            </div>
                            <div>
                                <p className="text-[#717171]">Nama penerima</p>
                                <p className="font-semibold">{bankDetails.account_holder}</p>
                            </div>
                            <div>
                                <p className="text-[#717171]">WhatsApp follow-up</p>
                                <a href={`https://wa.me/${bankDetails.whatsapp.replace(/[^0-9]/g, '')}`} className="font-semibold text-[#FF385C]">
                                    {bankDetails.whatsapp}
                                </a>
                            </div>
                            <div className="rounded-[22px] bg-[#fff1f3] p-4">
                                <p className="text-[#717171]">Jumlah perlu dibayar</p>
                                <p className="text-2xl font-bold text-[#FF385C]">{formatMoney(order.grand_total)}</p>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-[28px] bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold">Upload resit bayaran</h2>
                        <p className="mt-2 text-sm text-[#717171]">
                            Terima fail JPG, PNG, WEBP, atau PDF sehingga 5MB.
                        </p>

                        <form
                            className="mt-6 space-y-4"
                            onSubmit={(event) => {
                                event.preventDefault();
                                post(`/pesanan/${order.id}/resit`, {
                                    forceFormData: true,
                                });
                            }}
                        >
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png,.webp,.pdf"
                                onChange={(event) => setData('receipt', event.target.files?.[0] ?? null)}
                                className="w-full rounded-2xl border border-[#e6e3e3] px-4 py-3 text-sm"
                            />
                            {errors.receipt && <p className="text-sm text-red-600">{errors.receipt}</p>}

                            <Button
                                type="submit"
                                disabled={processing}
                                className="h-12 rounded-2xl bg-[#FF385C] text-white hover:bg-[#e93052]"
                            >
                                {processing ? 'Sedang upload...' : 'Upload resit sekarang'}
                            </Button>
                        </form>

                        {order.latest_receipt && (
                            <div className="mt-6 rounded-[22px] bg-[#f7f7f7] p-4 text-sm">
                                <p className="font-semibold">Resit terkini: {order.latest_receipt.original_name}</p>
                                {order.latest_receipt.review_note && (
                                    <p className="mt-2 text-[#717171]">{order.latest_receipt.review_note}</p>
                                )}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </>
    );
}
