import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Package, MapPin, User, Phone, FileText, CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Props = {
    order: {
        id: number;
        status: string;
        customer_name: string;
        customer_phone: string;
        shipping_address: string;
        notes?: string | null;
        grand_total: number;
        items: Array<{
            id: number;
            quantity: number;
            product_variant: {
                name: string;
            };
        }>;
        invoice?: {
            invoice_number: string;
        } | null;
    };
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

export default function OrderDetail({ order }: Props) {
    return (
        <>
            <Head title={`Pesanan #${order.id}`} />

            <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-0.5">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold tracking-tight">Pesanan #{order.id}</h1>
                            <span className="rounded-full bg-secondary px-3 py-0.5 text-xs font-semibold text-primary">
                                {statusLabel[order.status] ?? order.status}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Semak produk, alamat penghantaran, dan tindakan seterusnya.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button asChild className="rounded-xl">
                            <Link href={`/pesanan/${order.id}/bayaran`}>
                                <CreditCard className="size-4" />
                                Halaman bayaran
                            </Link>
                        </Button>
                        {order.invoice && (
                            <Button asChild variant="outline" className="rounded-xl">
                                <Link href={`/pesanan/${order.id}/invoice`}>
                                    <FileText className="size-4" />
                                    Buka invoice
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                    <article className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                                <Package className="size-5" />
                            </div>
                            <h2 className="text-xl font-bold tracking-tight">Item pesanan</h2>
                        </div>
                        <div className="space-y-3">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
                                    <div>
                                        <p className="font-semibold">{item.product_variant.name}</p>
                                        <p className="text-sm text-muted-foreground">Kuantiti: {item.quantity}</p>
                                    </div>
                                    <p className="font-bold">{formatMoney(item.quantity * 1000)}</p>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
                        <h2 className="text-xl font-bold tracking-tight">Maklumat customer</h2>
                        <div className="mt-5 space-y-4 text-sm">
                            <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
                                <User className="size-4 text-muted-foreground" />
                                <div>
                                    <p className="text-muted-foreground text-xs">Nama</p>
                                    <p className="font-semibold">{order.customer_name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
                                <Phone className="size-4 text-muted-foreground" />
                                <div>
                                    <p className="text-muted-foreground text-xs">WhatsApp</p>
                                    <p className="font-semibold">{order.customer_phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
                                <MapPin className="size-4 text-muted-foreground" />
                                <div>
                                    <p className="text-muted-foreground text-xs">Alamat</p>
                                    <p className="font-semibold">{order.shipping_address}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-xl bg-secondary p-3">
                                <div className="flex size-6 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <span className="text-xs font-bold">RM</span>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs">Jumlah</p>
                                    <p className="font-bold text-primary">{formatMoney(order.grand_total)}</p>
                                </div>
                            </div>
                            {order.notes && (
                                <div className="rounded-xl bg-muted/50 p-3">
                                    <p className="text-muted-foreground text-xs">Nota</p>
                                    <p className="font-semibold mt-1">{order.notes}</p>
                                </div>
                            )}
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
}
