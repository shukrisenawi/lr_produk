import { Head } from '@inertiajs/react';

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
                <article className="w-full max-w-4xl rounded-[28px] bg-white p-8 shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-[#ece7e7] pb-6 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#717171]">
                                Invoice Aurora Terapi
                            </p>
                            <h1 className="mt-2 text-3xl font-bold">{order.invoice?.invoice_number}</h1>
                        </div>
                        <div className="text-sm text-[#717171]">
                            <p>Customer: {order.customer_name}</p>
                            <p>WhatsApp: {order.customer_phone}</p>
                            <p>Alamat: {order.shipping_address}</p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between rounded-[20px] bg-[#f7f7f7] p-4">
                                <div>
                                    <p className="font-semibold">{item.product_variant.name}</p>
                                    <p className="text-sm text-[#717171]">Kuantiti: {item.quantity}</p>
                                </div>
                                <p className="font-semibold">{formatMoney(item.unit_price * item.quantity)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-[#ece7e7] pt-6">
                        <p className="text-lg font-semibold">Jumlah akhir</p>
                        <p className="text-2xl font-bold text-[#FF385C]">{formatMoney(order.grand_total)}</p>
                    </div>
                </article>
            </div>
        </>
    );
}
