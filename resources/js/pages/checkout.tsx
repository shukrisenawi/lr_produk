import { Head, Link, useForm } from '@inertiajs/react';
import { Minus, Plus, Sparkles, ShoppingCart, ChevronLeft, ArrowRight } from 'lucide-react';
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
        breakdown: [
            tenBottleSets > 0 && { label: 'Set 10 botol', qty: tenBottleSets, price: pricing.ten_bottle_price },
            fiveBottleSets > 0 && { label: 'Set 5 botol', qty: fiveBottleSets, price: pricing.five_bottle_price },
            singleBottles > 0 && { label: 'Botol biasa', qty: singleBottles, price: pricing.single_bottle_price },
        ].filter(Boolean),
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

    const step = (variantId: number, delta: number) => {
        const item = data.items.find((entry) => entry.variant_id === variantId);
        if (item) updateQuantity(variantId, item.quantity + delta);
    };

    return (
        <>
            <Head title="Checkout" />

            <div className="aurora-shell min-h-screen px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-7xl flex-col gap-8">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Aurora Terapi</p>
                            <h1 className="text-3xl font-bold tracking-tight">Pilih & Pesan</h1>
                        </div>
                        <Link href="/" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                            <ChevronLeft className="size-4" />
                            Kembali
                        </Link>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="space-y-6">
                            <section className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                                        <ShoppingCart className="size-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold tracking-tight">1. Pilih varian & bilangan</h2>
                                        <p className="text-sm text-muted-foreground">
                                            Anda boleh campur wangian ikut kesukaan sendiri.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    {variants.map((variant) => {
                                        const item = data.items.find((entry) => entry.variant_id === variant.id)!;

                                        return (
                                            <article key={variant.id} className="group rounded-xl border border-border/60 bg-background/50 p-4 transition-all hover:border-primary/20 hover:bg-secondary/50">
                                                <div className="mb-4 aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                                                    <img
                                                        src={`/images/aurora/${variant.slug}.png`}
                                                        alt={variant.name}
                                                        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div>
                                                            <h3 className="font-bold">{variant.name}</h3>
                                                            <p className="text-sm text-muted-foreground">RM10 sebotol</p>
                                                        </div>
                                                        {variant.is_best_seller && (
                                                            <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                                                                Paling Laris
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            className="size-9 rounded-xl"
                                                            onClick={() => step(variant.id, -1)}
                                                        >
                                                            <Minus className="size-4" />
                                                        </Button>
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            value={item.quantity}
                                                            onChange={(event) =>
                                                                updateQuantity(variant.id, Number(event.target.value))
                                                            }
                                                            className="h-9 text-center"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            className="size-9 rounded-xl"
                                                            onClick={() => step(variant.id, 1)}
                                                        >
                                                            <Plus className="size-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                                {errors.items && <p className="mt-4 text-sm text-destructive">{errors.items}</p>}
                            </section>

                            <section className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                                        <Sparkles className="size-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold tracking-tight">2. Daftar ringkas untuk teruskan</h2>
                                        <p className="text-sm text-muted-foreground">
                                            Hanya nama, WhatsApp, kata laluan, dan alamat penghantaran.
                                        </p>
                                    </div>
                                </div>

                                <form
                                    className="grid gap-5"
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        post('/checkout');
                                    }}
                                >
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Nama penuh</label>
                                            <Input
                                                placeholder="Nama penuh"
                                                value={data.name}
                                                onChange={(event) => setData('name', event.target.value)}
                                            />
                                            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Nombor WhatsApp</label>
                                            <Input
                                                placeholder="Contoh: 0195168839"
                                                value={data.phone}
                                                onChange={(event) => setData('phone', event.target.value)}
                                            />
                                            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                                        </div>
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Kata laluan</label>
                                            <Input
                                                type="password"
                                                placeholder="Minimum 8 aksara"
                                                value={data.password}
                                                onChange={(event) => setData('password', event.target.value)}
                                            />
                                            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Ulang kata laluan</label>
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

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Alamat penghantaran</label>
                                        <textarea
                                            value={data.shipping_address}
                                            onChange={(event) => setData('shipping_address', event.target.value)}
                                            placeholder="Alamat penghantaran penuh"
                                            className="min-h-28 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                                        />
                                        {errors.shipping_address && (
                                            <p className="text-sm text-destructive">{errors.shipping_address}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Nota tambahan (pilihan)</label>
                                        <textarea
                                            value={data.notes}
                                            onChange={(event) => setData('notes', event.target.value)}
                                            placeholder="Nota tambahan jika ada"
                                            className="min-h-24 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                                        />
                                        {errors.notes && <p className="text-sm text-destructive">{errors.notes}</p>}
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="h-12 rounded-xl bg-brand-gradient text-white shadow-md shadow-[#FF385C]/20 transition-all hover:shadow-lg"
                                    >
                                        {processing ? 'Sedang hantar...' : 'Hantar pesanan & pergi ke bayaran'}
                                        <ArrowRight className="size-4" />
                                    </Button>
                                </form>
                            </section>
                        </div>

                        <aside className="space-y-6">
                            <section className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
                                <h2 className="text-xl font-bold tracking-tight">Ringkasan bayaran</h2>
                                <div className="mt-5 space-y-4 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Jumlah botol</span>
                                        <span className="font-bold">{totals.quantity}</span>
                                    </div>
                                    {totals.breakdown.map((item: any) => item && (
                                        <div key={item.label} className="flex items-center justify-between pl-4">
                                            <span className="text-muted-foreground">{item.label}</span>
                                            <span className="font-medium">{formatMoney(item.qty * item.price)}</span>
                                        </div>
                                    ))}
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-semibold">{formatMoney(totals.subtotal)}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Caj penghantaran tetap</span>
                                        <span className="font-semibold">{formatMoney(totals.shippingFee)}</span>
                                    </div>
                                    <div className="h-px bg-border" />
                                    <div className="flex items-center justify-between text-base">
                                        <span className="font-bold">Jumlah perlu dibayar</span>
                                        <span className="text-xl font-black text-primary">
                                            {formatMoney(totals.grandTotal)}
                                        </span>
                                    </div>
                                </div>
                            </section>

                            <section className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm">
                                <img
                                    src="/images/aurora/harga.png"
                                    alt="Pakej harga"
                                    className="aspect-[4/3] w-full object-cover"
                                />
                                <div className="space-y-3 p-6 text-sm text-muted-foreground">
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
