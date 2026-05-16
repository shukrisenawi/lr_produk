import { Head, Link, usePage } from '@inertiajs/react';
import {
    ClipboardList,
    LayoutGrid,
    Sparkles,
    ArrowRight,
    ShoppingBag,
    ShieldCheck,
    PackageCheck,
    TrendingUp,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';
import { index as checkoutIndex } from '@/routes/checkout';

type Auth = {
    user: {
        name: string;
        role: string;
    };
};

export default function Dashboard() {
    const { auth } = usePage<{ auth: Auth }>().props;
    const isAdmin = auth.user.role === 'admin';

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-8 p-4 lg:p-6">
                {/* Welcome Banner */}
                <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#FF385C] to-[#e93052] p-8 shadow-xl shadow-[#FF385C]/10 lg:p-10">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_50%)]" />

                    <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-3">
                            <Badge className="w-fit rounded-full bg-white/20 px-4 py-1 text-xs font-bold text-white shadow-none hover:bg-white/20">
                                {isAdmin ? 'Panel Pentadbir' : 'Dashboard Pelanggan'}
                            </Badge>
                            <h1 className="text-3xl font-extrabold tracking-tight text-white lg:text-4xl">
                                Hai, {auth.user.name}! 👋
                            </h1>
                            <p className="max-w-lg text-base leading-relaxed text-white/80">
                                {isAdmin
                                    ? 'Urus pesanan pelanggan, semak resit bayaran, dan keluarkan invoice dari satu panel.'
                                    : 'Selamat datang ke Aurora Terapi. Urus pesanan anda, buat bayaran, dan semak status penghantaran dari sini.'}
                            </p>
                        </div>
                        <div className="flex shrink-0 items-center justify-center">
                            <div className="flex size-20 items-center justify-center rounded-3xl bg-white/15 backdrop-blur-sm lg:size-24">
                                {isAdmin ? (
                                    <ShieldCheck className="size-10 text-white lg:size-12" />
                                ) : (
                                    <Sparkles className="size-10 text-white lg:size-12" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions Grid */}
                {isAdmin ? (
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="group relative overflow-hidden rounded-[28px] border border-border/50 bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/10">
                            <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-[#FF385C]/[0.04] blur-2xl transition-all group-hover:bg-[#FF385C]/[0.08]" />
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-[#FF385C]/20">
                                <ShieldCheck className="size-7" />
                            </div>
                            <h2 className="mt-6 text-xl font-bold tracking-tight">Semakan Pesanan</h2>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                Lihat senarai semua pesanan pelanggan, semak resit, approve atau tolak bayaran.
                            </p>
                            <Button asChild className="mt-6 rounded-xl bg-brand-gradient text-white shadow-md shadow-[#FF385C]/20 transition-all hover:shadow-lg">
                                <Link href="/admin/orders">
                                    Buka Semakan Pesanan
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="group relative overflow-hidden rounded-[28px] border border-border/50 bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/10">
                            <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-[#FF385C]/[0.04] blur-2xl transition-all group-hover:bg-[#FF385C]/[0.08]" />
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
                                <TrendingUp className="size-7" />
                            </div>
                            <h2 className="mt-6 text-xl font-bold tracking-tight">Statistik Ringkas</h2>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                Akses statistik pesanan terkini dan prestasi jualan produk Aurora Terapi.
                            </p>
                            <Button asChild variant="outline" className="mt-6 rounded-xl">
                                <Link href="/admin/orders">
                                    Lihat Statistik
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="group relative overflow-hidden rounded-[28px] border border-border/50 bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/10">
                            <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-[#FF385C]/[0.04] blur-2xl transition-all group-hover:bg-[#FF385C]/[0.08]" />
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-[#FF385C]/20">
                                <ShoppingBag className="size-7" />
                            </div>
                            <h2 className="mt-6 text-xl font-bold tracking-tight">Buat Pesanan Baru</h2>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                Pilih varian minyak panas kegemaran anda, isi maklumat penghantaran, dan proceed ke bayaran.
                            </p>
                            <Button asChild className="mt-6 rounded-xl bg-brand-gradient text-white shadow-md shadow-[#FF385C]/20 transition-all hover:shadow-lg">
                                <Link href={checkoutIndex.url()}>
                                    <Sparkles className="size-4" />
                                    Pesan Sekarang
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="group relative overflow-hidden rounded-[28px] border border-border/50 bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/10">
                            <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-[#FF385C]/[0.04] blur-2xl transition-all group-hover:bg-[#FF385C]/[0.08]" />
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
                                <ClipboardList className="size-7" />
                            </div>
                            <h2 className="mt-6 text-xl font-bold tracking-tight">Pesanan Saya</h2>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                Semak status pesanan sedia ada, upload resit bayaran, dan muat turun invoice anda.
                            </p>
                            <Button asChild variant="outline" className="mt-6 rounded-xl">
                                <Link href={dashboard()}>
                                    Lihat Pesanan
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}

                {/* Info Cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="flex items-center gap-4 rounded-2xl border border-border/40 bg-card p-5 shadow-sm">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                            <PackageCheck className="size-5" />
                        </div>
                        <div>
                            <p className="text-sm font-bold">Penghantaran Pantas</p>
                            <p className="text-xs text-muted-foreground">Dihantar dalam 1-3 hari bekerja</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-2xl border border-border/40 bg-card p-5 shadow-sm">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                            <ShieldCheck className="size-5" />
                        </div>
                        <div>
                            <p className="text-sm font-bold">Pembayaran Selamat</p>
                            <p className="text-xs text-muted-foreground">Transfer bank &amp; WhatsApp verifikasi</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-2xl border border-border/40 bg-card p-5 shadow-sm">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                            <Sparkles className="size-5" />
                        </div>
                        <div>
                            <p className="text-sm font-bold">Pelbagai Wangian</p>
                            <p className="text-xs text-muted-foreground">Pilih aroma kegemaran anda</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
