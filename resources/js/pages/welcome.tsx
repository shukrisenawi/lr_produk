import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
    },
    {
        title: 'Kalau Anda Jenis Selalu Perlu Minyak Panas, Ini Memang Wajib Ada',
        body: 'Sesuai untuk orang bekerja pejabat, pemandu jarak jauh, ibu ayah di rumah, pelajar, orang yang selalu travel, warga emas, dan wanita berpantang yang mahu rasa hangat dan selesa.',
        image: '/images/aurora/sesuai-untuk-siapa.png',
    },
    {
        title: 'Bila Boleh Guna?',
        body: 'Guna bila leher dan bahu tegang, kaki penat, pinggang lenguh, perut rasa sebu, kepala berat, mabuk perjalanan, atau bila badan rasa kurang selesa.',
        image: '/images/aurora/kegunaan-harian.png',
    },
];

export default function Welcome({ variants }: Props) {
    return (
        <>
            <Head title="Aurora Terapi" />

            <div className="aurora-shell min-h-screen text-[#222222]">
                <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#717171]">
                            Aurora Terapi
                        </p>
                        <h1 className="text-lg font-semibold">Minyak panas roll-on yang tak leceh</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/login" className="text-sm font-medium text-[#717171]">
                            Log masuk
                        </Link>
                        <Button asChild className="rounded-xl bg-[#FF385C] px-5 text-white hover:bg-[#e93052]">
                            <Link href="/checkout">Order sekarang</Link>
                        </Button>
                    </div>
                </header>

                <main className="mx-auto flex max-w-7xl flex-col gap-16 px-4 pb-16 sm:px-6 lg:px-8">
                    <section className="grid gap-8 overflow-hidden rounded-[28px] bg-white p-6 shadow-sm lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
                        <div className="flex flex-col justify-center gap-6">
                            <Badge className="w-fit rounded-full bg-[#fff1f3] px-3 py-1 text-[#FF385C] hover:bg-[#fff1f3]">
                                Sapu. Urut sikit. Rasa selesa.
                            </Badge>
                            <div className="space-y-4">
                                <h2 className="max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
                                    Minyak Aurora Terapi yang senang bawa ke mana-mana
                                </h2>
                                <p className="max-w-2xl text-base leading-7 text-[#717171]">
                                    Badan rasa lenguh? Perut tak selesa? Kepala rasa berat?
                                    Ambil je Aurora Terapi, sapu terus dan rasa kehangatannya.
                                    Kecil, mudah dibawa, tak leceh dan sesuai simpan dalam beg, kereta,
                                    poket atau atas meja kerja.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Button asChild className="rounded-xl bg-[#FF385C] px-6 text-white hover:bg-[#e93052]">
                                    <Link href="/checkout">Beli sekarang</Link>
                                </Button>
                                <Button asChild variant="outline" className="rounded-xl border-[#d7d2d2] bg-white px-6">
                                    <Link href="/register">Daftar ringkas</Link>
                                </Button>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-3">
                                <div className="rounded-2xl bg-[#f7f7f7] p-4">
                                    <p className="text-sm font-semibold">1 botol</p>
                                    <p className="text-sm text-[#717171]">RM10</p>
                                </div>
                                <div className="rounded-2xl bg-[#f7f7f7] p-4">
                                    <p className="text-sm font-semibold">5 botol</p>
                                    <p className="text-sm text-[#717171]">RM45</p>
                                </div>
                                <div className="rounded-2xl bg-[#f7f7f7] p-4">
                                    <p className="text-sm font-semibold">10 botol</p>
                                    <p className="text-sm text-[#717171]">RM80</p>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-hidden rounded-[24px] bg-[#fff1f3]">
                            <img
                                src="/images/aurora/hero.png"
                                alt="Produk Aurora Terapi"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </section>

                    <section className="grid gap-6 lg:grid-cols-3">
                        {sections.map((section) => (
                            <article key={section.title} className="overflow-hidden rounded-[24px] bg-white shadow-sm">
                                <img
                                    src={section.image}
                                    alt={section.title}
                                    className="aspect-[16/10] w-full object-cover"
                                />
                                <div className="flex flex-col gap-3 p-6">
                                    <h3 className="text-xl font-semibold leading-tight">{section.title}</h3>
                                    <p className="text-sm leading-7 text-[#717171]">{section.body}</p>
                                </div>
                            </article>
                        ))}
                    </section>

                    <section className="grid gap-8 rounded-[28px] bg-white p-6 shadow-sm lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
                        <div className="overflow-hidden rounded-[24px]">
                            <img
                                src="/images/aurora/harga.png"
                                alt="Pakej harga Aurora Terapi"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#717171]">
                                    Pilihan wangian
                                </p>
                                <h3 className="text-3xl font-bold tracking-tight">
                                    Pilih wangian ikut selera anda
                                </h3>
                                <p className="text-base leading-7 text-[#717171]">
                                    Semua pilihan mempunyai fungsi yang sama. Yang beza cuma wangian.
                                    Pilih je bau yang paling ngam dengan hidung anda.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {variants.map((variant) => (
                                    <div key={variant.id} className="rounded-[20px] border border-[#ece7e7] bg-[#fcfcfc] p-4">
                                        <div className="mb-3 aspect-[4/5] overflow-hidden rounded-[18px] bg-[#f5f5f5]">
                                            <img
                                                src={`/images/aurora/${variant.slug}.png`}
                                                alt={variant.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <p className="font-semibold">{variant.name}</p>
                                                <p className="text-sm text-[#717171]">Fungsi sama, beza aroma</p>
                                            </div>
                                            {variant.is_best_seller && (
                                                <Badge className="rounded-full bg-[#FF385C] text-white hover:bg-[#FF385C]">
                                                    Paling Laris
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-8 rounded-[28px] bg-white p-6 shadow-sm lg:grid-cols-[1fr_0.95fr] lg:p-10">
                        <div className="space-y-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#717171]">
                                Wanita berpantang
                            </p>
                            <h3 className="text-3xl font-bold tracking-tight">Teman kecil untuk ibu dalam pantang</h3>
                            <p className="text-base leading-7 text-[#717171]">
                                Aurora Terapi boleh dijadikan pilihan praktikal untuk membantu memberi rasa hangat dan
                                nyaman, terutama ketika berada di rumah, dalam beg bayi atau ketika keluar ke klinik.
                                Untuk kegunaan luaran sahaja.
                            </p>
                            <div className="rounded-[24px] bg-[#fff1f3] p-5">
                                <p className="text-sm leading-7 text-[#4b4b4b]">
                                    Minyak panas ni barang kecil, tapi bila perlu memang tercari-cari. Sebab tu elok
                                    simpan lebih dari satu: satu dalam beg, satu dalam kereta, satu dekat rumah.
                                </p>
                            </div>
                            <Button asChild className="rounded-xl bg-[#FF385C] px-6 text-white hover:bg-[#e93052]">
                                <Link href="/checkout">Pilih wangian & order</Link>
                            </Button>
                        </div>
                        <div className="overflow-hidden rounded-[24px]">
                            <img
                                src="/images/aurora/wanita-berpantang.png"
                                alt="Aurora Terapi untuk wanita berpantang"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </section>

                    <section className="grid gap-8 rounded-[28px] bg-[#222222] p-6 text-white lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
                        <div className="overflow-hidden rounded-[24px]">
                            <img
                                src="/images/aurora/cta-akhir.png"
                                alt="Aurora Terapi semua varian"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-center gap-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                                Call to action akhir
                            </p>
                            <h3 className="text-3xl font-bold tracking-tight">Simpan satu sebelum betul-betul perlu</h3>
                            <p className="max-w-xl text-base leading-7 text-white/75">
                                Jangan tunggu badan dah lenguh teruk baru nak cari minyak. Sediakan awal-awal dalam
                                beg, kereta atau rumah. Aurora Terapi kecil, mudah guna dan sesuai dibawa ke mana
                                sahaja.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Button asChild className="rounded-xl bg-[#FF385C] px-6 text-white hover:bg-[#e93052]">
                                    <Link href="/checkout">Dapatkan sekarang</Link>
                                </Button>
                                <Button asChild variant="outline" className="rounded-xl border-white/20 bg-transparent px-6 text-white hover:bg-white/10">
                                    <Link href="/login">Semak pesanan</Link>
                                </Button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
