import { Head, useForm } from '@inertiajs/react';
import {
    ShieldCheck,
    Clock,
    CheckCircle2,
    XCircle,
    TrendingUp,
    AlertCircle,
    Check,
    X,
    ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

const statusStyles: Record<string, { label: string; color: string }> = {
    awaiting_payment: { label: 'Menunggu Bayaran', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
    payment_submitted: { label: 'Resit Dihantar', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    paid: { label: 'Selesai', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    payment_rejected: { label: 'Ditolak', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
    cancelled: { label: 'Dibatalkan', color: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400' },
};

export default function AdminOrdersIndex({ orders, stats }: Props) {
    const approveForm = useForm({ review_note: 'Bayaran diterima.' });
    const rejectForm = useForm({ review_note: '' });

    const statCards = [
        { label: 'Belum bayar', value: stats.awaiting_payment, icon: Clock, color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400' },
        { label: 'Menunggu semakan', value: stats.payment_submitted, icon: AlertCircle, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400' },
        { label: 'Sudah bayar', value: stats.paid, icon: CheckCircle2, color: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400' },
        { label: 'Ditolak', value: stats.payment_rejected, icon: XCircle, color: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400' },
    ];

    return (
        <>
            <Head title="Semakan Pesanan Admin" />

            <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Panel semakan pesanan</h1>
                    <p className="text-sm text-muted-foreground">
                        Trace customer yang belum bayar, semak resit, dan keluarkan invoice selepas approve.
                    </p>
                </div>

                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((card) => (
                        <div
                            key={card.label}
                            className="rounded-2xl border border-border/50 bg-card p-5 shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
                                <div className={`flex size-9 items-center justify-center rounded-xl ${card.color}`}>
                                    <card.icon className="size-4" />
                                </div>
                            </div>
                            <p className="mt-3 text-3xl font-black">{card.value}</p>
                        </div>
                    ))}
                </section>

                <section className="grid gap-4">
                    {orders.map((order) => {
                        const status = statusStyles[order.status] ?? { label: order.status, color: 'bg-muted text-muted-foreground' };
                        return (
                            <article
                                key={order.id}
                                className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:shadow-md"
                            >
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                    <div className="space-y-3 flex-1">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h2 className="text-xl font-bold tracking-tight">Pesanan #{order.id}</h2>
                                            <Badge className={`rounded-full px-3 py-0.5 text-xs font-semibold ${status.color}`}>
                                                {status.label}
                                            </Badge>
                                            {order.invoice && (
                                                <Badge variant="outline" className="rounded-full px-3 py-0.5 text-xs font-semibold">
                                                    {order.invoice.invoice_number}
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="grid gap-2 text-sm sm:grid-cols-2">
                                            <div className="rounded-xl bg-muted/50 p-3">
                                                <p className="text-xs text-muted-foreground">Customer</p>
                                                <p className="font-semibold">{order.customer_name}</p>
                                            </div>
                                            <div className="rounded-xl bg-muted/50 p-3">
                                                <p className="text-xs text-muted-foreground">WhatsApp</p>
                                                <a
                                                    href={`https://wa.me/${order.customer_phone.replace(/[^0-9]/g, '')}`}
                                                    className="font-semibold text-primary"
                                                >
                                                    {order.customer_phone}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="rounded-xl bg-muted/50 p-3">
                                            <p className="text-xs text-muted-foreground">Alamat</p>
                                            <p className="font-medium text-sm">{order.shipping_address}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground bg-muted/30 rounded-xl p-3">
                                            {order.items.map((item) => `${item.product_variant.name} x${item.quantity}`).join(', ')}
                                        </p>
                                    </div>

                                    <div className="w-full max-w-sm space-y-4">
                                        <div className="rounded-2xl bg-muted/30 p-5">
                                            <p className="text-xs text-muted-foreground">Jumlah order</p>
                                            <p className="mt-1 text-2xl font-black text-primary">{formatMoney(order.grand_total)}</p>
                                            {order.latest_receipt ? (
                                                <p className="mt-2 text-xs text-muted-foreground">
                                                    Resit: {order.latest_receipt.original_name}
                                                </p>
                                            ) : (
                                                <p className="mt-2 text-xs text-muted-foreground">Belum ada resit dimuat naik.</p>
                                            )}
                                        </div>

                                        {(order.status === 'awaiting_payment' || order.status === 'payment_rejected') && (
                                            <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 text-xs text-amber-700 dark:text-amber-400 flex items-start gap-2">
                                                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                                                <span>Customer belum hantar resit atau resit perlu dibetulkan.</span>
                                            </div>
                                        )}

                                        {order.status === 'payment_submitted' && (
                                            <div className="grid gap-2">
                                                <Button
                                                    type="button"
                                                    className="w-full rounded-xl"
                                                    onClick={() => approveForm.patch(`/admin/orders/${order.id}/approve`)}
                                                    disabled={approveForm.processing}
                                                >
                                                    <Check className="size-4" />
                                                    Approve bayaran
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="w-full rounded-xl"
                                                    onClick={() => rejectForm.patch(`/admin/orders/${order.id}/reject`)}
                                                    disabled={rejectForm.processing}
                                                >
                                                    <X className="size-4" />
                                                    Tolak resit
                                                </Button>
                                            </div>
                                        )}

                                        <a
                                            href={`https://wa.me/${order.customer_phone.replace(/[^0-9]/g, '')}`}
                                            className="flex items-center justify-center gap-1.5 rounded-xl border border-border py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
                                        >
                                            <ExternalLink className="size-4" />
                                            WhatsApp customer
                                        </a>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </section>
            </div>
        </>
    );
}
