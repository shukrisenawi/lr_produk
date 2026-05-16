import { Head, Link } from '@inertiajs/react';
import { ClipboardList, Eye, CircleDollarSign, FileText, ShoppingBag, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';
import { index as checkoutIndex } from '@/routes/checkout';

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

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
    awaiting_payment: {
        label: 'Menunggu bayaran',
        color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800',
        dot: 'bg-amber-500',
    },
    payment_submitted: {
        label: 'Resit sedang disemak',
        color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800',
        dot: 'bg-blue-500',
    },
    paid: {
        label: 'Selesai dibayar',
        color: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800',
        dot: 'bg-green-500',
    },
    payment_rejected: {
        label: 'Resit perlu dibetulkan',
        color: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800',
        dot: 'bg-red-500',
    },
    cancelled: {
        label: 'Dibatalkan',
        color: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950/30 dark:text-gray-400 dark:border-gray-800',
        dot: 'bg-gray-400',
    },
};

export default function CustomerDashboard({ orders }: Props) {
    return (
        <>
            <Head title="Dashboard Customer" />

            <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard pesanan anda</h1>
                    <p className="text-sm text-muted-foreground">
                        Lihat status terkini, upload resit jika belum bayar, dan buka invoice selepas disahkan.
                    </p>
                </div>

                <section className="grid gap-4">
                    {orders.map((order) => {
                        const status = statusConfig[order.status] ?? {
                            label: order.status,
                            color: 'bg-muted text-muted-foreground border-border',
                            dot: 'bg-muted-foreground',
                        };
                        return (
                            <article
                                key={order.id}
                                className="group rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/10"
                            >
                                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="space-y-3">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h2 className="text-xl font-bold tracking-tight">
                                                Pesanan #{order.id}
                                            </h2>
                                            <Badge className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${status.color}`}>
                                                <span className={`mr-1.5 inline-block size-1.5 rounded-full ${status.dot}`} />
                                                {status.label}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {order.items.map((item) => `${item.product_variant.name} x${item.quantity}`).join(', ')}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <p className="text-xl font-black text-primary">{formatMoney(order.grand_total)}</p>
                                        <div className="flex gap-2">
                                            <Button asChild variant="outline" className="rounded-xl" size="sm">
                                                <Link href={`/pesanan/${order.id}`}>
                                                    <Eye className="size-4" />
                                                    Lihat detail
                                                </Link>
                                            </Button>
                                            {!order.invoice && (
                                                <Button asChild className="rounded-xl" size="sm">
                                                    <Link href={`/pesanan/${order.id}/bayaran`}>
                                                        <CircleDollarSign className="size-4" />
                                                        Bayar
                                                    </Link>
                                                </Button>
                                            )}
                                            {order.invoice && (
                                                <Button asChild variant="secondary" className="rounded-xl" size="sm">
                                                    <Link href={`/pesanan/${order.id}/invoice`}>
                                                        <FileText className="size-4" />
                                                        Invoice
                                                    </Link>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}

                    {orders.length === 0 && (
                        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-12 text-center shadow-sm">
                            <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-[#FF385C]/[0.04] blur-2xl" />
                            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-secondary text-primary">
                                <ClipboardList className="size-8" />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight">Belum ada pesanan</h3>
                            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                                Anda belum membuat sebarang pesanan lagi. Nak cuba kehangatan Aurora Terapi?
                            </p>
                            <Button asChild className="mt-6 rounded-xl bg-brand-gradient text-white shadow-md shadow-[#FF385C]/20 hover:shadow-lg">
                                <Link href={checkoutIndex.url()}>
                                    <Sparkles className="size-4" />
                                    Buat Pesanan Sekarang
                                </Link>
                            </Button>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}

CustomerDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
