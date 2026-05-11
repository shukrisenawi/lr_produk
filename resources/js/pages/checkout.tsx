import { Head, Link, useForm } from '@inertiajs/react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Variant = {
    id: number;
    name: string;
    slug: string;
    is_best_seller: boolean;
};

type Pricing = {
    single_bottle_price: number;
    five_bottle_price: number;
    ten_bottle_price: number;
    shipping_fee: number;
};

type Props = {
    variants: Variant[];
    pricing: Pricing;
};

const formatMoney = (amount: number) =>
    new Intl.NumberFormat('ms-MY', {
        style: 'currency',
        currency: 'MYR',
    }).format(amount / 100);

const calculatePricing = (quantity: number, pricing: Pricing) => {
    const tenBottleSets = Math.floor(quantity / 10);
    const afterTen = quantity % 10;
    const fiveBottleSets = Math.floor(afterTen / 5);
    const singleBottles = afterTen % 5;
    const subtotal =
        tenBottleSets * pricing.ten_bottle_price +
        fiveBottleSets * pricing.five_bottle_price +
        singleBottles * pricing.single_bottle_price;

    return {
        quantity,
        subtotal,
        shippingFee: pricing.shipping_fee,
        grandTotal: subtotal + pricing.shipping_fee,
    };
};

export default function Checkout({ variants, pricing }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        phone: '',
        password: '',
        password_confirmation: '',
        shipping_address: '',
        notes: '',
        items: variants.map((variant) => ({
            variant_id: variant.id,
            quantity: 0,
        })),
    });

    const totalQuantity = data.items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    const totals = calculatePricing(totalQuantity, pricing);

    const updateQuantity = (variantId: number, nextQuantity: number) => {
        setData(
            'items',
            data.items.map((item) =>
                item.variant_id === variantId
                    ? { ...item, quantity: Math.max(0, nextQuantity) }
                    : item,
            ),
        );
    };

    return (
        <>
            <Head title="Checkout" />

            <div className="aurora-shell min-h-screen px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-7xl flex-col gap-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-[#717171]">Checkout Aurora Terapi</p>
                            <h1 className="text-3xl font-bold tracking-tight">Pilih produk dan lengkapkan pesanan</h1>
                        </div>
                        <Link href="/" className="text-sm font-medium text-[#717171]">
                            Kembali ke landing page
                        </Link>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="space-y-6">
                            <section className="rounded-[28px] bg-white p-6 shadow-sm">
                                <div className="mb-5">
                                    <h2 className="text-xl font-semibold">1. Pilih jenis produk dan bilangan</h2>
                                    <p className="mt-1 text-sm text-[#717171]">
                                        Anda boleh campur wangian ikut kesukaan sendiri.
                                    </p>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    {variants.map((variant) => {
                                        const item = data.items.find((entry) => entry.variant_id === variant.id)!;

                                        return (
                                            <article key={variant.id} className="rounded-[22px] border border-[#ece7e7] p-4">
                                                <div className="mb-4 aspect-[4/5] overflow-hidden rounded-[18px] bg-[#f3f3f3]">
                                                    <img
                                                        src={`/images/aurora/${variant.slug}.png`}
                                                        alt={variant.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div>
                                                            <h3 className="font-semibold">{variant.name}</h3>
                                                            <p className="text-sm text-[#717171]">RM10 sebotol</p>
                                                        </div>
                                                        {variant.is_best_seller && (
                                                            <span className="rounded-full bg-[#fff1f3] px-3 py-1 text-xs font-semibold text-[#FF385C]">
                                                                Paling Laris
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            className="size-10 rounded-full"
                                                            onClick={() => updateQuantity(variant.id, item.quantity - 1)}
                                                        >
                                                            <Minus />
                                                        </Button>
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            value={item.quantity}
                                                            onChange={(event) =>
                                                                updateQuantity(variant.id, Number(event.target.value))
                                                            }
                                                            className="h-10 text-center"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            className="size-10 rounded-full"
                                                            onClick={() => updateQuantity(variant.id, item.quantity + 1)}
                                                        >
                                                            <Plus />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                                {errors.items && <p className="mt-4 text-sm text-red-600">{errors.items}</p>}
                            </section>

                            <section className="rounded-[28px] bg-white p-6 shadow-sm">
                                <div className="mb-5">
                                    <h2 className="text-xl font-semibold">2. Daftar ringkas untuk teruskan</h2>
                                    <p className="mt-1 text-sm text-[#717171]">
                                        Hanya nama, WhatsApp, kata laluan, dan alamat penghantaran.
                                    </p>
                                </div>

                                <form
                                    className="grid gap-4"
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        post('/checkout');
                                    }}
                                >
                                    <Input
                                        placeholder="Nama penuh"
                                        value={data.name}
                                        onChange={(event) => setData('name', event.target.value)}
                                    />
                                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}

                                    <Input
                                        placeholder="Nombor WhatsApp"
                                        value={data.phone}
                                        onChange={(event) => setData('phone', event.target.value)}
                                    />
                                    {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Input
                                                type="password"
                                                placeholder="Kata laluan"
                                                value={data.password}
                                                onChange={(event) => setData('password', event.target.value)}
                                            />
                                            {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Input
                                                type="password"
                                                placeholder="Ulang kata laluan"
                                                value={data.password_confirmation}
                                                onChange={(event) =>
                                                    setData('password_confirmation', event.target.value)
                                                }
                                            />
                                        </div>
                                    </div>

                                    <textarea
                                        value={data.shipping_address}
                                        onChange={(event) => setData('shipping_address', event.target.value)}
                                        placeholder="Alamat penghantaran penuh"
                                        className="min-h-28 rounded-2xl border border-[#e6e3e3] px-4 py-3 text-sm outline-none ring-0 transition focus:border-[#FF385C]"
                                    />
                                    {errors.shipping_address && (
                                        <p className="text-sm text-red-600">{errors.shipping_address}</p>
                                    )}

                                    <textarea
                                        value={data.notes}
                                        onChange={(event) => setData('notes', event.target.value)}
                                        placeholder="Nota tambahan jika ada"
                                        className="min-h-24 rounded-2xl border border-[#e6e3e3] px-4 py-3 text-sm outline-none ring-0 transition focus:border-[#FF385C]"
                                    />
                                    {errors.notes && <p className="text-sm text-red-600">{errors.notes}</p>}

                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="h-12 rounded-2xl bg-[#FF385C] text-white hover:bg-[#e93052]"
                                    >
                                        {processing ? 'Sedang hantar...' : 'Hantar pesanan & pergi ke bayaran'}
                                    </Button>
                                </form>
                            </section>
                        </div>

                        <aside className="space-y-6">
                            <section className="rounded-[28px] bg-white p-6 shadow-sm">
                                <h2 className="text-xl font-semibold">Ringkasan bayaran</h2>
                                <div className="mt-5 space-y-4 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#717171]">Jumlah botol</span>
                                        <span className="font-semibold">{totals.quantity}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#717171]">Subtotal produk</span>
                                        <span className="font-semibold">{formatMoney(totals.subtotal)}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#717171]">Caj penghantaran tetap</span>
                                        <span className="font-semibold">{formatMoney(totals.shippingFee)}</span>
                                    </div>
                                    <div className="h-px bg-[#ece7e7]" />
                                    <div className="flex items-center justify-between text-base">
                                        <span className="font-semibold">Jumlah perlu dibayar</span>
                                        <span className="font-bold text-[#FF385C]">
                                            {formatMoney(totals.grandTotal)}
                                        </span>
                                    </div>
                                </div>
                            </section>

                            <section className="overflow-hidden rounded-[28px] bg-white shadow-sm">
                                <img
                                    src="/images/aurora/harga.png"
                                    alt="Pakej harga"
                                    className="aspect-[4/3] w-full object-cover"
                                />
                                <div className="space-y-3 p-6 text-sm text-[#717171]">
                                    <p>5 botol akan auto jadi RM45.</p>
                                    <p>10 botol akan auto jadi RM80.</p>
                                    <p>Sistem akan kira kombinasi paling jimat untuk jumlah botol anda.</p>
                                </div>
                            </section>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}
