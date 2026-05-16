import { Head, Link } from '@inertiajs/react';
import {
    CheckCircle2,
    PackageCheck,
    Sparkles,
    ArrowRight,
    Star,
    ShieldCheck,
    Zap,
    Heart,
    Quote,
    ChevronRight,
    Menu,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { login, register } from '@/routes';
import { index as checkoutIndex } from '@/routes/checkout';

type Variant = {
    id: number;
    name: string;
    slug: string;
    is_best_seller: boolean;
};

type Props = {
    variants: Variant[];
};

const sections = [
    {
        title: 'Kadang-Kadang Badan Bagi Signal, Cuma Kita Buat-Buat Tak Faham',
        body: 'Lepas kerja badan rasa penat. Duduk lama-lama bahu mula tegang. Naik kereta jauh, kepala mula pening. Masa macam ni, memang sedap kalau ada minyak panas yang mudah capai dan terus boleh guna.',
        image: '/images/aurora/kelebihan.png',
        tag: 'Pentingnya Rehat',
    },
    {
        title: 'Kalau Anda Jenis Selalu Perlu Minyak Panas, Ini Memang Wajib Ada',
        body: 'Sesuai untuk orang bekerja pejabat, pemandu jarak jauh, ibu ayah di rumah, pelajar, orang yang selalu travel, warga emas, dan wanita berpantang yang mahu rasa hangat dan selesa.',
        image: '/images/aurora/sesuai-untuk-siapa.png',
        tag: 'Untuk Semua',
    },
    {
        title: 'Bila Boleh Guna?',
        body: 'Guna bila leher dan bahu tegang, kaki penat, pinggang lenguh, perut rasa sebu, kepala berat, mabuk perjalanan, atau bila badan rasa kurang selesa.',
        image: '/images/aurora/kegunaan-harian.png',
        tag: 'Kegunaan',
    },
];

const benefits = [
    {
        title: 'Mudah dibawa',
        body: 'Saiz kompak, sesuai masuk dalam beg, poket, pouch atau simpan dalam kereta.',
        icon: Zap,
    },
    {
        title: 'Senang digunakan',
        body: 'Roll terus pada bahagian badan yang diperlukan. Tak perlu comot tangan.',
        icon: Sparkles,
    },
    {
        title: 'Rasa hangat dan selesa',
        body: 'Membantu memberi rasa nyaman pada badan yang penat, lenguh atau kurang selesa.',
        icon: Star,
    },
    {
        title: 'Sesuai untuk travel',
        body: 'Naik kereta jauh, balik kampung, pergi kerja atau jalan-jalan, elok ada satu.',
        icon: PackageCheck,
    },
    {
        title: 'Pelbagai wangian',
        body: 'Khasiat dan fungsi sama, cuma beza aroma. Pilih ikut bau yang anda suka.',
        icon: ShieldCheck,
    },
];

const suitableUsers = [
    'Orang yang selalu lenguh badan',
    'Pemandu jarak jauh',
    'Pelajar asrama',
    'Ibu ayah di rumah',
    'Orang bekerja pejabat',
    'Orang yang selalu travel',
    'Warga emas',
    'Wanita baru berpantang',
    'Peminat minyak panas yang tak suka rasa melekit',
];

const dailyUses = [
    'Bahu dan leher terasa tegang',
    'Pinggang rasa lenguh',
    'Kaki penat selepas berjalan',
    'Perut rasa sebu atau kembung',
    'Kepala rasa berat',
    'Mabuk perjalanan',
    'Sendi rasa kurang selesa',
    'Badan terasa masuk angin',
    'Rasa kurang selesa selepas bersalin atau dalam tempoh berpantang',
];

const usageSteps = [
    { number: 1, text: 'Buka penutup' },
    { number: 2, text: 'Roll pada bahagian yang diperlukan' },
    { number: 3, text: 'Urut perlahan-lahan' },
    { number: 4, text: 'Gunakan bila perlu' },
];

const pricingPackages = [
    {
        quantity: '1 Botol',
        price: 'RM10',
        body: 'Sesuai untuk cuba satu wangian pilihan.',
        popular: false,
        savings: null,
    },
    {
        quantity: '5 Botol',
        price: 'RM45',
        body: 'Boleh campur wangian ikut pilihan.',
        popular: true,
        savings: 'Jimat RM5',
    },
    {
        quantity: '10 Botol',
        price: 'RM80',
        body: 'Stok rumah, kereta, pejabat atau keluarga.',
        popular: false,
        savings: 'Jimat RM20',
    },
];

const testimonials = [
    {
        name: 'Aminah',
        text: 'Beli 5 botol untuk全家. Wangian sedap, rasa panasnya selesa. Anak pun suka.',
        rating: 5,
    },
    {
        name: 'Faris',
        text: 'Ni minyak panas pertama yang saya betul-betul suka. Tak melekit, bau pun sedap.',
        rating: 5,
    },
    {
        name: 'Siti',
        text: 'Dah repeat order 3 kali. Sekarang simpan dalam kereta dan beg tangan. Memudahkan.',
        rating: 5,
    },
];

const navLinks = [
    { label: 'Manfaat', href: '#manfaat' },
    { label: 'Wangian', href: '#pilihan-wangian' },
    { label: 'Harga', href: '#harga' },
];

export default function Welcome({ variants }: Props) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <Head title="Aurora Terapi - Minyak Panas Roll-On" />

            <div className="relative min-h-screen overflow-x-hidden bg-background selection:bg-[#FF385C]/20 selection:text-[#FF385C]">
                <div className="pointer-events-none fixed inset-0 -z-10">
                    <div className="absolute top-[-5%] left-[-5%] h-[600px] w-[600px] rounded-full bg-[#FF385C]/[0.06] blur-[150px]" />
                    <div className="absolute top-[30%] right-[-8%] h-[500px] w-[500px] rounded-full bg-[#FF385C]/[0.04] blur-[120px]" />
                    <div className="absolute bottom-[-5%] left-[15%] h-[700px] w-[700px] rounded-full bg-[#FF385C]/[0.05] blur-[180px]" />
                </div>

                <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
                    <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-border/30 bg-card/80 px-6 py-3 shadow-lg shadow-black/[0.02] backdrop-blur-2xl">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient shadow-md shadow-[#FF385C]/20">
                                <Sparkles className="size-5 text-white" />
                            </div>
                            <span className="text-lg font-extrabold tracking-tight">
                                Aurora <span className="text-primary">Terapi</span>
                            </span>
                        </Link>

                        <div className="hidden items-center gap-8 md:flex">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href={login.url()}
                                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
                            >
                                Log masuk
                            </Link>
                            <Button
                                asChild
                                className="h-10 rounded-xl bg-brand-gradient px-5 text-sm font-bold text-white shadow-md shadow-[#FF385C]/20 transition-all hover:shadow-lg hover:shadow-[#FF385C]/30 active:scale-95"
                            >
                                <Link href={checkoutIndex.url()} className="flex items-center gap-2">
                                    Beli Sekarang
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                            <button
                                className="flex items-center justify-center md:hidden"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                            </button>
                        </div>
                    </nav>

                    {mobileMenuOpen && (
                        <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-border/30 bg-card/95 p-4 shadow-xl backdrop-blur-2xl md:hidden">
                            <div className="flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <Link
                                    href={login.url()}
                                    className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Log masuk
                                </Link>
                            </div>
                        </div>
                    )}
                </header>

                <main className="mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8">
                    <section className="relative grid min-h-[75vh] items-center gap-12 overflow-hidden rounded-[48px] bg-card p-8 shadow-2xl shadow-black/[0.02] lg:grid-cols-[1.1fr_0.9fr] lg:p-16">
                        <div className="absolute top-0 right-0 -z-10 h-full w-1/2 bg-gradient-to-l from-secondary to-transparent" />

                        <div className="flex flex-col gap-8">
                            <div className="space-y-5">
                                <Badge className="w-fit animate-fade-up rounded-full border border-primary/10 bg-secondary px-4 py-1.5 text-sm font-bold text-primary shadow-none">
                                    Sapu. Urut. Rasa selesa.
                                </Badge>
                                <h2 className="animate-fade-up text-balance text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl" style={{ animationDelay: '100ms' }}>
                                    Minyak panas{' '}
                                    <span className="text-brand-gradient">
                                        roll-on
                                    </span>{' '}
                                    yang tak leceh
                                </h2>
                                <p className="animate-fade-up max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl" style={{ animationDelay: '200ms' }}>
                                    Badan rasa lenguh? Perut tak selesa? Kepala rasa berat? Ambil je Aurora Terapi, sapu terus dan rasa kehangatannya.
                                    <span className="hidden sm:inline"> Kecil, mudah dibawa, tak leceh dan sesuai simpan di mana-mana.</span>
                                </p>
                            </div>

                            <div className="animate-fade-up flex flex-wrap items-center gap-4" style={{ animationDelay: '300ms' }}>
                                <Button
                                    asChild
                                    size="lg"
                                    className="h-14 rounded-2xl bg-brand-gradient px-8 text-base font-bold text-white shadow-xl shadow-[#FF385C]/20 transition-all hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-[#FF385C]/30 active:scale-95"
                                >
                                    <Link href={checkoutIndex.url()} className="flex items-center gap-2">
                                        <PackageCheck className="size-5" />
                                        Order Sekarang
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="h-14 rounded-2xl border-2 border-border bg-card px-8 text-base font-semibold transition-all hover:bg-secondary hover:border-primary/20 active:scale-95"
                                >
                                    <Link href={register.url()} className="flex items-center gap-2">
                                        Daftar Ringkas
                                        <ChevronRight className="size-4" />
                                    </Link>
                                </Button>
                            </div>

                            <div className="animate-fade-up flex items-center gap-6 pt-2" style={{ animationDelay: '400ms' }}>
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="size-10 overflow-hidden rounded-full border-2 border-card bg-muted shadow-sm">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="" className="size-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm">
                                    <div className="flex items-center gap-0.5 text-amber-400">
                                        {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="size-4 fill-current" />)}
                                    </div>
                                    <p className="font-medium text-muted-foreground">Dipercayai 2,000+ pengguna</p>
                                </div>
                            </div>
                        </div>

                        <div className="animate-fade-in relative aspect-square lg:aspect-auto lg:h-full" style={{ animationDelay: '200ms' }}>
                            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-secondary via-card to-card shadow-inner" />
                            <img
                                src="/images/aurora/hero.png"
                                alt="Aurora Terapi"
                                className="h-full w-full object-contain drop-shadow-[0_30px_80px_rgba(255,56,92,0.2)] transition-all duration-700 hover:scale-105"
                            />
                            <div className="absolute right-6 top-6 sm:right-10 sm:top-10">
                                <div className="animate-bounce rounded-2xl bg-card/80 p-4 shadow-xl shadow-black/[0.04] backdrop-blur-md">
                                    <p className="text-xs font-bold uppercase tracking-wider text-primary">Harga Serendah</p>
                                    <p className="text-2xl font-black italic tracking-tight">RM10</p>
                                </div>
                            </div>
                            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10">
                                <div className="animate-bounce rounded-2xl bg-card/80 p-4 shadow-xl shadow-black/[0.04] backdrop-blur-md" style={{ animationDelay: '1s' }}>
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-10 items-center justify-center rounded-full bg-green-100">
                                            <ShieldCheck className="size-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Kualiti</p>
                                            <p className="text-sm font-bold">Terjamin</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="manfaat" className="py-28">
                        <div className="mb-14 space-y-4 text-center">
                            <Badge className="rounded-full border border-primary/10 bg-secondary px-4 py-1 text-sm font-bold text-primary shadow-none">
                                Kenapa Aurora Terapi?
                            </Badge>
                            <h3 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
                                Kenapa pilih kami?
                            </h3>
                            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                                Kami mementingkan kemudahan dan keberkesanan untuk membantu anda rasa lebih selesa setiap hari.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {benefits.map((benefit, idx) => (
                                <article
                                    key={benefit.title}
                                    className="group animate-fade-up card-hover relative flex flex-col rounded-[32px] bg-card p-8 shadow-sm shadow-black/[0.02] ring-1 ring-black/[0.02]"
                                    style={{ animationDelay: `${idx * 80}ms` }}
                                >
                                    <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-gradient group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#FF385C]/20">
                                        <benefit.icon className="size-7" />
                                    </div>
                                    <h4 className="text-xl font-bold">{benefit.title}</h4>
                                    <p className="mt-3 leading-relaxed text-muted-foreground">{benefit.body}</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="relative overflow-hidden rounded-[48px] bg-gradient-to-br from-[#FF385C] to-[#e93052] px-8 py-20 shadow-2xl lg:px-16 lg:py-24">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_50%)]" />

                        <div className="relative z-10 grid gap-12 lg:grid-cols-[0.45fr_0.55fr] lg:items-center">
                            <div className="space-y-6">
                                <Badge className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold text-white shadow-none hover:bg-white/20">
                                    Sesuai Untuk
                                </Badge>
                                <h3 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                                    Siapa yang sesuai guna?
                                </h3>
                                <p className="text-lg leading-relaxed text-white/80">
                                    Dari pekerja pejabat hingga warga emas — sesiapa saja yang nak rasa selesa setiap hari.
                                </p>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {suitableUsers.map((user) => (
                                    <div
                                        key={user}
                                        className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20"
                                    >
                                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20">
                                            <CheckCircle2 className="size-4 text-white" />
                                        </div>
                                        <p className="text-sm font-medium text-white/90">{user}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <div className="space-y-28 py-28">
                        {sections.map((section, idx) => (
                            <section
                                key={section.title}
                                className={`grid items-center gap-12 lg:grid-cols-2 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                            >
                                <div className={`animate-fade-up space-y-6 ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                                    <Badge
                                        variant="outline"
                                        className="rounded-full border-primary/20 px-4 py-1 text-sm font-bold text-primary shadow-none"
                                    >
                                        {section.tag}
                                    </Badge>
                                    <h3 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
                                        {section.title}
                                    </h3>
                                    <p className="text-lg leading-relaxed text-muted-foreground">{section.body}</p>
                                    <div className="flex items-center gap-4 rounded-3xl bg-secondary p-6">
                                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-card text-primary shadow-sm">
                                            <CheckCircle2 className="size-6" />
                                        </div>
                                        <p className="font-medium">Membantu memberi rasa nyaman pada badan yang penat atau lenguh.</p>
                                    </div>
                                </div>
                                <div
                                    className={`animate-fade-in relative aspect-[4/3] overflow-hidden rounded-[40px] shadow-2xl ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}
                                    style={{ animationDelay: '150ms' }}
                                >
                                    <img
                                        src={section.image}
                                        alt={section.title}
                                        className="h-full w-full object-cover transition-all duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                                </div>
                            </section>
                        ))}
                    </div>

                    <section className="grid gap-8 py-16 lg:grid-cols-2">
                        <div className="animate-fade-up rounded-[40px] bg-card p-8 shadow-xl shadow-black/[0.02] ring-1 ring-black/[0.02] lg:p-12">
                            <div className="mb-8 space-y-4">
                                <Badge className="rounded-full border border-primary/10 bg-secondary px-4 py-1 text-sm font-bold text-primary shadow-none">
                                    Cara Guna
                                </Badge>
                                <h3 className="text-4xl font-extrabold tracking-tight">Semudah 1, 2, 3...</h3>
                                <p className="text-lg text-muted-foreground">Tak perlu picit, tak perlu tuang. Hanya roll dan rasa keajaibannya.</p>
                            </div>
                            <div className="grid gap-4">
                                {usageSteps.map((step) => (
                                    <div
                                        key={step.text}
                                        className="group flex items-center gap-6 rounded-2xl bg-muted/50 p-5 transition-all hover:bg-secondary hover:shadow-sm"
                                    >
                                        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-lg font-black text-white shadow-md shadow-[#FF385C]/20">
                                            {step.number}
                                        </span>
                                        <p className="text-lg font-bold transition-colors group-hover:text-primary">{step.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="animate-fade-up rounded-[40px] bg-card p-8 shadow-xl shadow-black/[0.02] ring-1 ring-black/[0.02] lg:p-12" style={{ animationDelay: '150ms' }}>
                            <div className="mb-8 space-y-4">
                                <Badge className="rounded-full border border-primary/10 bg-secondary px-4 py-1 text-sm font-bold text-primary shadow-none">
                                    Bila Nak Guna?
                                </Badge>
                                <h3 className="text-4xl font-extrabold tracking-tight">Kegunaan Harian</h3>
                                <p className="text-lg text-muted-foreground">Sesuai untuk pelbagai situasi kecemasan harian anda.</p>
                            </div>
                            <div className="grid gap-2">
                                {dailyUses.map((use) => (
                                    <div
                                        key={use}
                                        className="flex items-start gap-4 rounded-xl p-3 transition-all hover:bg-secondary"
                                    >
                                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <CheckCircle2 className="size-3.5" />
                                        </div>
                                        <p className="text-sm font-medium leading-relaxed text-muted-foreground">{use}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="pilihan-wangian" className="py-28">
                        <div className="mb-14 space-y-4 text-center">
                            <Badge className="rounded-full border border-primary/10 bg-secondary px-4 py-1 text-sm font-bold text-primary shadow-none">
                                Pilihan Wangian
                            </Badge>
                            <h3 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
                                Pilih aroma kegemaran anda
                            </h3>
                            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                                Semua varian mempunyai fungsi yang sama, cuma aromanya berbeza. Pilih yang paling ngam dengan anda!
                            </p>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {variants.map((variant, idx) => (
                                <div
                                    key={variant.id}
                                    className="group animate-fade-up card-hover relative flex flex-col overflow-hidden rounded-[32px] bg-card shadow-sm shadow-black/[0.02] ring-1 ring-black/[0.02]"
                                    style={{ animationDelay: `${idx * 80}ms` }}
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                                        <img
                                            src={`/images/aurora/${variant.slug}.png`}
                                            alt={variant.name}
                                            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                                        />
                                        {variant.is_best_seller && (
                                            <div className="absolute right-3 top-3">
                                                <Badge className="rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold text-white shadow-lg shadow-[#FF385C]/30">
                                                    Paling Laris
                                                </Badge>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between p-5">
                                        <div>
                                            <h4 className="text-xl font-bold">{variant.name}</h4>
                                            <p className="mt-1 text-sm text-muted-foreground">Fungsi sama, beza aroma</p>
                                        </div>
                                        <Button
                                            asChild
                                            className="mt-5 w-full rounded-xl border border-primary/10 bg-transparent font-semibold text-foreground shadow-none transition-all hover:bg-primary hover:text-white"
                                        >
                                            <Link href={checkoutIndex.url()}>Pilih Varian</Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="py-16">
                        <div className="mb-14 space-y-4 text-center">
                            <Badge className="rounded-full border border-primary/10 bg-secondary px-4 py-1 text-sm font-bold text-primary shadow-none">
                                Testimonial
                            </Badge>
                            <h3 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
                                Apa kata pelanggan?
                            </h3>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {testimonials.map((t, idx) => (
                                <div
                                    key={t.name}
                                    className="animate-fade-up card-hover rounded-[32px] bg-card p-8 shadow-sm shadow-black/[0.02] ring-1 ring-black/[0.02]"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <Quote className="mb-4 size-8 text-primary/20" />
                                    <p className="leading-relaxed text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
                                    <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                                        <div className="flex size-10 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                                            {t.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">{t.name}</p>
                                            <div className="flex items-center gap-0.5 text-amber-400">
                                                {Array.from({ length: t.rating }).map((_, i) => (
                                                    <Star key={i} className="size-3.5 fill-current" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="harga" className="py-16">
                        <div className="relative overflow-hidden rounded-[48px] bg-[#121212] px-8 py-16 shadow-2xl lg:px-16 lg:py-20">
                            <div className="pointer-events-none absolute top-0 right-0 h-full w-full bg-[radial-gradient(circle_at_top_right,rgba(255,56,92,0.12),transparent_50%)]" />
                            <div className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-1/2 bg-[radial-gradient(circle_at_bottom_left,rgba(255,56,92,0.08),transparent_50%)]" />

                            <div className="relative z-10 space-y-16">
                                <div className="mx-auto max-w-2xl space-y-4 text-center">
                                    <Badge className="rounded-full bg-primary px-4 py-1 text-sm font-bold text-white shadow-none hover:bg-primary">
                                        Pakej Jimat
                                    </Badge>
                                    <h3 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                                        Lagi banyak ambil, lagi jimat
                                    </h3>
                                    <p className="text-lg text-white/60">
                                        Nak cuba dulu boleh. Nak beli untuk satu keluarga pun lagi berbaloi. Boleh campur semua wangian pilihan.
                                    </p>
                                </div>

                                <div className="grid gap-6 md:grid-cols-3">
                                    {pricingPackages.map((item, idx) => (
                                        <article
                                            key={item.quantity}
                                            className={`animate-fade-up group relative flex flex-col rounded-[32px] p-8 transition-all hover:scale-[1.02] ${
                                                item.popular
                                                    ? 'bg-brand-gradient shadow-2xl shadow-[#FF385C]/30'
                                                    : 'border border-white/[0.06] bg-white/[0.04] backdrop-blur-sm hover:bg-white/[0.08]'
                                            }`}
                                            style={{ animationDelay: `${idx * 100}ms` }}
                                        >
                                            {item.popular && (
                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                                    <span className="whitespace-nowrap rounded-full bg-white px-5 py-1.5 text-[11px] font-black uppercase tracking-[0.15em] text-primary shadow-xl">
                                                        Paling Berbaloi
                                                    </span>
                                                </div>
                                            )}
                                            <div className="mb-6">
                                                <h4 className="text-xl font-bold text-white">{item.quantity}</h4>
                                                <div className="mt-2 flex items-baseline gap-1">
                                                    <span className="text-4xl font-black tracking-tighter text-white">{item.price}</span>
                                                </div>
                                                <p className={`mt-2 text-sm leading-relaxed ${item.popular ? 'text-white/80' : 'text-white/50'}`}>
                                                    {item.body}
                                                </p>
                                            </div>
                                            <div className="mt-auto flex flex-col gap-3">
                                                {item.savings && (
                                                    <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur-sm">
                                                        <Zap className="size-4 text-amber-400" />
                                                        <span className="text-sm font-bold text-amber-400">{item.savings}</span>
                                                    </div>
                                                )}
                                                <Button
                                                    asChild
                                                    className={`w-full rounded-2xl font-bold shadow-lg transition-all ${
                                                        item.popular
                                                            ? 'bg-white text-primary hover:bg-white/90 hover:shadow-xl'
                                                            : 'bg-white/[0.08] text-white hover:bg-white/20'
                                                    }`}
                                                >
                                                    <Link href={checkoutIndex.url()}>Pilih Pakej</Link>
                                                </Button>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="py-24">
                        <div className="relative overflow-hidden rounded-[48px] bg-gradient-to-br from-[#FF385C] via-[#e93052] to-[#d42a48] px-8 py-20 text-center text-white shadow-2xl lg:px-20 lg:py-28">
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />

                            <div className="relative z-10 mx-auto max-w-3xl space-y-8">
                                <h3 className="animate-fade-up text-balance text-4xl font-extrabold tracking-tight sm:text-6xl">
                                    Sedia untuk rasa kehangatan Aurora?
                                </h3>
                                <p className="animate-fade-up text-lg text-white/80 sm:text-xl" style={{ animationDelay: '100ms' }}>
                                    Jangan tunggu badan dah lenguh teruk baru nak cari minyak. Sediakan awal-awal dalam beg, kereta atau rumah.
                                </p>
                                <div className="animate-fade-up flex flex-wrap justify-center gap-4 pt-4" style={{ animationDelay: '200ms' }}>
                                    <Button
                                        asChild
                                        size="lg"
                                        className="h-16 rounded-2xl bg-white px-10 text-lg font-bold text-primary shadow-2xl transition-all hover:bg-white/95 hover:translate-y-[-2px] active:scale-95"
                                    >
                                        <Link href={checkoutIndex.url()} className="flex items-center gap-2">
                                            <PackageCheck className="size-6" />
                                            Dapatkan Sekarang
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="lg"
                                        className="h-16 rounded-2xl border-2 border-white/20 bg-transparent px-10 text-lg font-bold text-white shadow-none transition-all hover:bg-white/10 active:scale-95"
                                    >
                                        <Link href={login.url()}>Semak Pesanan</Link>
                                    </Button>
                                </div>
                                <div className="animate-fade-up flex flex-wrap justify-center gap-8 pt-8" style={{ animationDelay: '300ms' }}>
                                    {[
                                        { icon: PackageCheck, text: 'Penghantaran Pantas' },
                                        { icon: ShieldCheck, text: 'Pembayaran Selamat' },
                                        { icon: Heart, text: 'Pilihan Pelbagai Aroma' },
                                    ].map((item) => (
                                        <div key={item.text} className="flex items-center gap-3">
                                            <div className="flex size-8 items-center justify-center rounded-full bg-white/15">
                                                <item.icon className="size-4" />
                                            </div>
                                            <span className="text-sm font-medium text-white/70">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-border bg-card">
                    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr]">
                            <div className="space-y-5">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient shadow-md">
                                        <Sparkles className="size-6 text-white" />
                                    </div>
                                    <span className="text-xl font-extrabold tracking-tight">
                                        Aurora <span className="text-primary">Terapi</span>
                                    </span>
                                </div>
                                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                                    Aurora Terapi ialah minyak panas mudah bawa yang sesuai digunakan untuk memberi rasa hangat dan selesa pada badan.
                                    Hadir dengan pelbagai pilihan wangian, praktikal untuk kegunaan harian, travel dan simpanan di rumah.
                                </p>
                            </div>
                            <div>
                                <h5 className="mb-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">Navigasi</h5>
                                <ul className="space-y-3 text-sm">
                                    <li><Link href="/" className="font-medium text-foreground transition-colors hover:text-primary">Laman Utama</Link></li>
                                    <li><a href="#manfaat" className="font-medium text-muted-foreground transition-colors hover:text-primary">Manfaat</a></li>
                                    <li><a href="#pilihan-wangian" className="font-medium text-muted-foreground transition-colors hover:text-primary">Wangian</a></li>
                                    <li><a href="#harga" className="font-medium text-muted-foreground transition-colors hover:text-primary">Harga</a></li>
                                    <li><Link href={checkoutIndex.url()} className="font-medium text-muted-foreground transition-colors hover:text-primary">Beli Sekarang</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="mb-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">Pelanggan</h5>
                                <ul className="space-y-3 text-sm">
                                    <li><Link href={login.url()} className="font-medium text-muted-foreground transition-colors hover:text-primary">Log Masuk</Link></li>
                                    <li><Link href={register.url()} className="font-medium text-muted-foreground transition-colors hover:text-primary">Daftar Akaun</Link></li>
                                    <li><Link href={checkoutIndex.url()} className="font-medium text-muted-foreground transition-colors hover:text-primary">Semak Pesanan</Link></li>
                                    <li><Link href="#" className="font-medium text-muted-foreground transition-colors hover:text-primary">Terma & Syarat</Link></li>
                                    <li><Link href="#" className="font-medium text-muted-foreground transition-colors hover:text-primary">Polisi Privasi</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-12 border-t border-border pt-8 text-center">
                            <p className="text-xs text-muted-foreground">
                                &copy; {new Date().getFullYear()} Aurora Terapi. Hak Cipta Terpelihara. Untuk kegunaan luaran sahaja.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
