import { Head, Link } from '@inertiajs/react';

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

export default function OrderDetail({ order }: Props) {
    return (
        <>
            <Head title={`Pesanan #${order.id}`} />

            <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
                <section className="rounded-[28px] bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Pesanan #{order.id}</h1>
                            <p className="mt-2 text-sm text-[#717171]">
                                Semak produk, alamat penghantaran, dan tindakan seterusnya.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link href={`/pesanan/${order.id}/bayaran`} className="rounded-xl bg-[#FF385C] px-4 py-2 text-sm font-semibold text-white">
                                Halaman bayaran
                            </Link>
                            {order.invoice && (
                                <Link href={`/pesanan/${order.id}/invoice`} className="rounded-xl border border-[#ece7e7] px-4 py-2 text-sm font-semibold">
                                    Buka invoice
                                </Link>
                            )}
                        </div>
                    </div>
                </section>

                <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                    <article className="rounded-[28px] bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold">Item pesanan</h2>
                        <div className="mt-5 space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between rounded-[20px] bg-[#f7f7f7] p-4">
                                    <div>
                                        <p className="font-semibold">{item.product_variant.name}</p>
                                        <p className="text-sm text-[#717171]">Kuantiti: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold">{formatMoney(item.quantity * 1000)}</p>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="rounded-[28px] bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold">Maklumat customer</h2>
                        <div className="mt-5 space-y-4 text-sm">
                            <div>
                                <p className="text-[#717171]">Nama</p>
                                <p className="font-semibold">{order.customer_name}</p>
                            </div>
                            <div>
                                <p className="text-[#717171]">WhatsApp</p>
                                <p className="font-semibold">{order.customer_phone}</p>
                            </div>
                            <div>
                                <p className="text-[#717171]">Alamat</p>
                                <p className="font-semibold">{order.shipping_address}</p>
                            </div>
                            <div>
                                <p className="text-[#717171]">Jumlah</p>
                                <p className="font-semibold text-[#FF385C]">{formatMoney(order.grand_total)}</p>
                            </div>
                            {order.notes && (
                                <div>
                                    <p className="text-[#717171]">Nota</p>
                                    <p className="font-semibold">{order.notes}</p>
                                </div>
                            )}
                        </div>
                    </article>
                </section>
            </div>
        </>
    );
}
