import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

type Order = {
    id: number;
    status: string;
    customer_name: string;
    customer_phone: string;
    shipping_address: string;
    grand_total: number;
    items: Array<{
        id: number;
        quantity: number;
        product_variant: {
            name: string;
        };
    }>;
    latest_receipt?: {
        id: number;
        original_name: string;
        review_note?: string | null;
    } | null;
    invoice?: {
        invoice_number: string;
    } | null;
};

type Props = {
    orders: Order[];
    stats: Record<string, number>;
};

const formatMoney = (amount: number) =>
    new Intl.NumberFormat('ms-MY', { style: 'currency', currency: 'MYR' }).format(amount / 100);

export default function AdminOrdersIndex({ orders, stats }: Props) {
    const approveForm = useForm({ review_note: 'Bayaran diterima.' });
    const rejectForm = useForm({ review_note: '' });

    return (
        <>
            <Head title="Semakan Pesanan Admin" />

            <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
                <section className="rounded-[28px] bg-white p-6 shadow-sm">
                    <h1 className="text-3xl font-bold tracking-tight">Panel semakan pesanan</h1>
                    <p className="mt-2 text-sm text-[#717171]">
                        Trace customer yang belum bayar, semak resit, dan keluarkan invoice selepas approve.
                    </p>
                </section>

                <section className="grid gap-4 md:grid-cols-4">
                    {[
                        ['Belum bayar', stats.awaiting_payment],
                        ['Menunggu semakan', stats.payment_submitted],
                        ['Sudah bayar', stats.paid],
                        ['Ditolak', stats.payment_rejected],
                    ].map(([label, value]) => (
                        <div key={label} className="rounded-[24px] bg-white p-5 shadow-sm">
                            <p className="text-sm text-[#717171]">{label}</p>
                            <p className="mt-2 text-3xl font-bold">{value}</p>
                        </div>
                    ))}
                </section>

                <section className="grid gap-4">
                    {orders.map((order) => (
                        <article key={order.id} className="rounded-[24px] bg-white p-6 shadow-sm">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                <div className="space-y-3">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h2 className="text-xl font-semibold">Pesanan #{order.id}</h2>
                                        <span className="rounded-full bg-[#fff1f3] px-3 py-1 text-xs font-semibold text-[#FF385C]">
                                            {order.status}
                                        </span>
                                        {order.invoice && (
                                            <span className="rounded-full bg-[#f2f5f1] px-3 py-1 text-xs font-semibold text-[#2f6b3a]">
                                                {order.invoice.invoice_number}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-[#717171]">{order.customer_name}</p>
                                    <p className="text-sm font-semibold text-[#222222]">{order.customer_phone}</p>
                                    <p className="text-sm text-[#717171]">{order.shipping_address}</p>
                                    <p className="text-sm text-[#717171]">
                                        {order.items.map((item) => `${item.product_variant.name} x${item.quantity}`).join(', ')}
                                    </p>
                                </div>

                                <div className="w-full max-w-md space-y-4">
                                    <div className="rounded-[20px] bg-[#f7f7f7] p-4">
                                        <p className="text-sm text-[#717171]">Jumlah order</p>
                                        <p className="mt-2 text-2xl font-bold text-[#222222]">{formatMoney(order.grand_total)}</p>
                                        {order.latest_receipt ? (
                                            <p className="mt-2 text-sm text-[#717171]">
                                                Resit: {order.latest_receipt.original_name}
                                            </p>
                                        ) : (
                                            <p className="mt-2 text-sm text-[#717171]">Belum ada resit dimuat naik.</p>
                                        )}
                                    </div>

                                    <div className="grid gap-3 md:grid-cols-2">
                                        <Button
                                            type="button"
                                            className="rounded-2xl bg-[#FF385C] text-white hover:bg-[#e93052]"
                                            onClick={() => approveForm.patch(`/admin/orders/${order.id}/approve`)}
                                            disabled={approveForm.processing}
                                        >
                                            Approve bayaran
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="rounded-2xl"
                                            onClick={() => rejectForm.patch(`/admin/orders/${order.id}/reject`)}
                                            disabled={rejectForm.processing}
                                        >
                                            Tolak resit
                                        </Button>
                                    </div>

                                    <a
                                        href={`https://wa.me/${order.customer_phone.replace(/[^0-9]/g, '')}`}
                                        className="inline-flex text-sm font-semibold text-[#FF385C]"
                                    >
                                        WhatsApp customer
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </>
    );
}
