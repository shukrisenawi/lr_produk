import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';

type OrderItem = {
    id: number;
    quantity: number;
    product_variant: {
        name: string;
    };
};

type Order = {
    id: number;
    status: string;
    grand_total: number;
    customer_name: string;
    customer_phone: string;
    created_at: string;
    latest_receipt?: { id: number } | null;
    invoice?: { id: number; invoice_number: string } | null;
    items: OrderItem[];
};

type Props = {
    orders: Order[];
};

const formatMoney = (amount: number) =>
    new Intl.NumberFormat('ms-MY', { style: 'currency', currency: 'MYR' }).format(amount / 100);

const statusLabel: Record<string, string> = {
    awaiting_payment: 'Menunggu bayaran',
    payment_submitted: 'Resit sedang disemak',
    paid: 'Selesai dibayar',
    payment_rejected: 'Resit perlu dibetulkan',
    cancelled: 'Dibatalkan',
};

export default function CustomerDashboard({ orders }: Props) {
    return (
        <>
            <Head title="Dashboard Customer" />

            <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
                <section className="rounded-[28px] bg-white p-6 shadow-sm">
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard pesanan anda</h1>
                    <p className="mt-2 text-sm text-[#717171]">
                        Lihat status terkini, upload resit jika belum bayar, dan buka invoice selepas disahkan.
                    </p>
                </section>

                <section className="grid gap-4">
                    {orders.map((order) => (
                        <article key={order.id} className="rounded-[24px] bg-white p-6 shadow-sm">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div className="space-y-2">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h2 className="text-xl font-semibold">Pesanan #{order.id}</h2>
                                        <Badge className="rounded-full bg-[#fff1f3] text-[#FF385C] hover:bg-[#fff1f3]">
                                            {statusLabel[order.status] ?? order.status}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-[#717171]">
                                        {order.items.map((item) => `${item.product_variant.name} x${item.quantity}`).join(', ')}
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <p className="text-lg font-bold text-[#222222]">{formatMoney(order.grand_total)}</p>
                                    <Link
                                        href={`/pesanan/${order.id}`}
                                        className="rounded-xl bg-[#FF385C] px-4 py-2 text-sm font-semibold text-white"
                                    >
                                        Lihat detail
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}

                    {orders.length === 0 && (
                        <div className="rounded-[24px] bg-white p-10 text-center text-sm text-[#717171] shadow-sm">
                            Anda belum ada pesanan lagi. Pergi ke checkout untuk mula buat pesanan pertama.
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}
