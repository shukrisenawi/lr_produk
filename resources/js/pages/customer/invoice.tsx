import { Head } from '@inertiajs/react';
import { Sparkles, FileText } from 'lucide-react';

type Props = {
    order: {
        id: number;
        customer_name: string;
        customer_phone: string;
        shipping_address: string;
        grand_total: number;
        invoice?: {
            invoice_number: string;
            issued_at: string;
        } | null;
        items: Array<{
            id: number;
            quantity: number;
            unit_price: number;
            product_variant: {
                name: string;
            };
        }>;
    };
};

const formatMoney = (amount: number) =>
    new Intl.NumberFormat('ms-MY', { style: 'currency', currency: 'MYR' }).format(amount / 100);

export default function Invoice({ order }: Props) {
    return (
        <>
            <Head title={`Invoice ${order.invoice?.invoice_number ?? ''}`} />

            <div className="flex flex-1 justify-center p-4 lg:p-8">
                <article className="w-full max-w-4xl rounded-2xl border border-border/50 bg-card p-8 shadow-sm">
                    <div className="flex flex-col gap-6 border-b border-border pb-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient shadow-md shadow-[#FF385C]/20">
                                    <Sparkles className="size-5 text-white" />
                                </div>
                                <span className="text-xl font-extrabold tracking-tight">
                                    Aurora <span className="text-primary">Terapi</span>
                                </span>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                    Invoice
                                </p>
                                <h1 className="mt-1 text-2xl font-bold tracking-tight">
                                    {order.invoice?.invoice_number}
                                </h1>
                            </div>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                            <p><span className="font-medium text-foreground">Customer:</span> {order.customer_name}</p>
                            <p><span className="font-medium text-foreground">WhatsApp:</span> {order.customer_phone}</p>
                            <p><span className="font-medium text-foreground">Alamat:</span> {order.shipping_address}</p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
                                <div>
                                    <p className="font-semibold">{item.product_variant.name}</p>
                                    <p className="text-sm text-muted-foreground">Kuantiti: {item.quantity}</p>
                                </div>
                                <p className="font-bold">{formatMoney(item.unit_price * item.quantity)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                        <p className="text-lg font-bold">Jumlah akhir</p>
                        <p className="text-3xl font-black text-primary">{formatMoney(order.grand_total)}</p>
                    </div>

                    <div className="mt-8 rounded-xl bg-muted/30 p-4 text-center text-xs text-muted-foreground">
                        Invoice ini sah dikeluarkan oleh Aurora Terapi. Untuk sebarang pertanyaan, sila hubungi kami melalui WhatsApp.
                    </div>
                </article>
            </div>
        </>
    );
}
