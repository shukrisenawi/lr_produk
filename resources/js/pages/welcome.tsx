import { Head, Link } from '@inertiajs/react';
import { CheckCircle2, PackageCheck, Sparkles } from 'lucide-react';
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

const benefits = [
    {
        title: 'Mudah dibawa',
        body: 'Saiz kompak, sesuai masuk dalam beg, poket, pouch atau simpan dalam kereta.',
    },
    {
        title: 'Senang digunakan',
        body: 'Roll terus pada bahagian badan yang diperlukan. Tak perlu comot tangan.',
    },
    {
        title: 'Rasa hangat dan selesa',
        body: 'Membantu memberi rasa nyaman pada badan yang penat, lenguh atau kurang selesa.',
    },
    {
        title: 'Sesuai untuk travel',
        body: 'Naik kereta jauh, balik kampung, pergi kerja atau jalan-jalan, elok ada satu.',
    },
    {
        title: 'Pelbagai wangian',
        body: 'Khasiat dan fungsi sama, cuma beza aroma. Pilih ikut bau yang anda suka.',
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
    'Buka penutup',
    'Roll pada bahagian yang diperlukan',
    'Urut perlahan-lahan',
    'Gunakan bila perlu',
];

const pricingPackages = [
    {
        quantity: '1 Botol',
        price: 'RM10',
        body: 'Sesuai untuk cuba satu wangian pilihan.',
    },
    {
        quantity: '5 Botol',
        price: 'RM45 sahaja',
        body: 'Jimat RM5 berbanding beli satu-satu. Boleh campur wangian ikut pilihan.',
    },
    {
        quantity: '10 Botol',
        price: 'RM80 sahaja',
        body: 'Jimat RM20 berbanding beli satu-satu. Sesuai untuk stok rumah, kereta, pejabat atau keluarga.',
    },
];

export default function Welcome({ variants }: Props) {
    return (
        <>
            <Head title="Aurora Terapi" />

            <div className="aurora-shell min-h-screen text-[#222222]">
                <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.2em] text-[#717171] uppercase">
                            Aurora Terapi
                        </p>
                        <h1 className="text-lg font-semibold">
                            Minyak panas roll-on yang tak leceh
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={login.url()}
                            className="text-sm font-medium text-[#717171]"
                        >
                            Log masuk
                        </Link>
                        <Button
                            asChild
                            className="rounded-xl bg-[#FF385C] px-5 text-white hover:bg-[#e93052]"
                        >
                            <Link href={checkoutIndex.url()}>
                                Order sekarang
                            </Link>
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
                                    Minyak Aurora Terapi yang senang bawa ke
                                    mana-mana
                                </h2>
                                <p className="max-w-2xl text-base leading-7 text-[#717171]">
                                    Badan rasa lenguh? Perut tak selesa? Kepala
                                    rasa berat? Ambil je Aurora Terapi, sapu
                                    terus dan rasa kehangatannya. Kecil, mudah
                                    dibawa, tak leceh dan sesuai simpan dalam
                                    beg, kereta, poket atau atas meja kerja.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    asChild
                                    className="rounded-xl bg-[#FF385C] px-6 text-white hover:bg-[#e93052]"
                                >
                                    <Link href={checkoutIndex.url()}>
                                        <PackageCheck />
                                        Beli sekarang
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="rounded-xl border-[#d7d2d2] bg-white px-6"
                                >
                                    <Link href={register.url()}>
                                        Daftar ringkas
                                    </Link>
                                </Button>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-3">
                                <div className="rounded-2xl bg-[#f7f7f7] p-4">
                                    <p className="text-sm font-semibold">
                                        1 botol
                                    </p>
                                    <p className="text-sm text-[#717171]">
                                        RM10
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-[#f7f7f7] p-4">
                                    <p className="text-sm font-semibold">
                                        5 botol
                                    </p>
                                    <p className="text-sm text-[#717171]">
                                        RM45
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-[#f7f7f7] p-4">
                                    <p className="text-sm font-semibold">
                                        10 botol
                                    </p>
                                    <p className="text-sm text-[#717171]">
                                        RM80
                                    </p>
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
                            <article
                                key={section.title}
                                className="overflow-hidden rounded-[24px] bg-white shadow-sm"
                            >
                                <img
                                    src={section.image}
                                    alt={section.title}
                                    className="aspect-[16/10] w-full object-cover"
                                />
                                <div className="flex flex-col gap-3 p-6">
                                    <h3 className="text-xl leading-tight font-semibold">
                                        {section.title}
                                    </h3>
                                    <p className="text-sm leading-7 text-[#717171]">
                                        {section.body}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </section>

                    <section className="grid gap-8 rounded-[28px] bg-white p-6 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
                        <div className="overflow-hidden rounded-[24px] bg-[#fff1f3]">
                            <img
                                src="/images/aurora/kelebihan.png"
                                alt="Botol roll-on Aurora Terapi"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-center gap-6">
                            <div className="space-y-3">
                                <p className="text-xs font-semibold tracking-[0.2em] text-[#717171] uppercase">
                                    Kenapa pilih roll-on?
                                </p>
                                <h3 className="text-3xl font-bold tracking-tight">
                                    Minyak panas biasa kadang leceh, yang ni
                                    lebih praktikal
                                </h3>
                                <p className="text-base leading-7 text-[#717171]">
                                    Dengan botol roller, anda tak perlu tuang
                                    minyak ke tangan. Tak risau tumpah dalam
                                    beg. Tak perlu cari tisu banyak-banyak lepas
                                    sapu. Hanya buka penutup, roll pada tempat
                                    yang diperlukan, dan siap.
                                </p>
                            </div>
                            <div className="rounded-[24px] bg-[#f7f7f7] p-5">
                                <p className="text-sm leading-7 text-[#4b4b4b]">
                                    Senang cerita, minyak panas versi moden,
                                    tapi masih mengekalkan rasa herba
                                    tradisional yang ramai suka.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                        <div className="flex flex-col justify-center gap-3">
                            <p className="text-xs font-semibold tracking-[0.2em] text-[#717171] uppercase">
                                Kelebihan produk
                            </p>
                            <h3 className="text-3xl font-bold tracking-tight">
                                Kecil-kecil tapi banyak gunanya
                            </h3>
                            <p className="text-base leading-7 text-[#717171]">
                                Praktikal untuk kegunaan harian, travel, kerja
                                dan aktiviti luar. Bila badan mula rasa kurang
                                selesa, produk kecil macam ni memang mudah
                                dicapai.
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {benefits.map((benefit) => (
                                <article
                                    key={benefit.title}
                                    className="rounded-[20px] bg-white p-5 shadow-sm"
                                >
                                    <CheckCircle2 className="mb-4 size-5 text-[#FF385C]" />
                                    <h4 className="font-semibold">
                                        {benefit.title}
                                    </h4>
                                    <p className="mt-2 text-sm leading-6 text-[#717171]">
                                        {benefit.body}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="grid gap-6 rounded-[28px] bg-white p-6 shadow-sm lg:grid-cols-2 lg:p-10">
                        <div className="space-y-5">
                            <div className="space-y-3">
                                <p className="text-xs font-semibold tracking-[0.2em] text-[#717171] uppercase">
                                    Sesuai untuk siapa?
                                </p>
                                <h3 className="text-3xl font-bold tracking-tight">
                                    Kalau badan anda bukan robot, memang sesuai
                                    simpan satu
                                </h3>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {suitableUsers.map((user) => (
                                    <div
                                        key={user}
                                        className="flex items-start gap-3 rounded-2xl bg-[#f7f7f7] p-4"
                                    >
                                        <Sparkles className="mt-0.5 size-4 shrink-0 text-[#FF385C]" />
                                        <p className="text-sm leading-6 text-[#4b4b4b]">
                                            {user}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-5">
                            <div className="space-y-3">
                                <p className="text-xs font-semibold tracking-[0.2em] text-[#717171] uppercase">
                                    Kegunaan harian
                                </p>
                                <h3 className="text-3xl font-bold tracking-tight">
                                    Bila boleh guna?
                                </h3>
                                <p className="text-base leading-7 text-[#717171]">
                                    Sapu sedikit pada bahagian yang diperlukan
                                    dan urut perlahan-lahan.
                                </p>
                            </div>
                            <div className="grid gap-3">
                                {dailyUses.map((use) => (
                                    <div
                                        key={use}
                                        className="flex items-start gap-3"
                                    >
                                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#FF385C]" />
                                        <p className="text-sm leading-6 text-[#4b4b4b]">
                                            {use}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section
                        id="pilihan-wangian"
                        className="grid gap-8 rounded-[28px] bg-white p-6 shadow-sm lg:grid-cols-[0.95fr_1.05fr] lg:p-10"
                    >
                        <div className="overflow-hidden rounded-[24px]">
                            <img
                                src="/images/aurora/harga.png"
                                alt="Pakej harga Aurora Terapi"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-xs font-semibold tracking-[0.2em] text-[#717171] uppercase">
                                    Pilihan wangian
                                </p>
                                <h3 className="text-3xl font-bold tracking-tight">
                                    Pilih wangian ikut selera anda
                                </h3>
                                <p className="text-base leading-7 text-[#717171]">
                                    Semua pilihan mempunyai fungsi yang sama.
                                    Yang beza cuma wangian. Pilih je bau yang
                                    paling ngam dengan hidung anda.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {variants.map((variant) => (
                                    <div
                                        key={variant.id}
                                        className="rounded-[20px] border border-[#ece7e7] bg-[#fcfcfc] p-4"
                                    >
                                        <div className="mb-3 aspect-[4/5] overflow-hidden rounded-[18px] bg-[#f5f5f5]">
                                            <img
                                                src={`/images/aurora/${variant.slug}.png`}
                                                alt={variant.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <p className="font-semibold">
                                                    {variant.name}
                                                </p>
                                                <p className="text-sm text-[#717171]">
                                                    Fungsi sama, beza aroma
                                                </p>
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

                    <section className="grid gap-8 rounded-[28px] bg-white p-6 shadow-sm lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
                        <div className="space-y-5">
                            <p className="text-xs font-semibold tracking-[0.2em] text-[#717171] uppercase">
                                Cara guna
                            </p>
                            <h3 className="text-3xl font-bold tracking-tight">
                                Cara guna sangat mudah
                            </h3>
                            <p className="text-base leading-7 text-[#717171]">
                                Tak perlu picit, tak perlu tuang, tak perlu
                                risau tumpah. Senang macam tu saja.
                            </p>
                            <div className="grid gap-3">
                                {usageSteps.map((step, index) => (
                                    <div
                                        key={step}
                                        className="flex items-center gap-4 rounded-2xl bg-[#f7f7f7] p-4"
                                    >
                                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#FF385C] text-sm font-semibold text-white">
                                            {index + 1}
                                        </span>
                                        <p className="font-medium">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-5 rounded-[24px] bg-[#222222] p-6 text-white">
                            <p className="text-xs font-semibold tracking-[0.2em] text-white/65 uppercase">
                                Pakej jimat
                            </p>
                            <h3 className="text-3xl font-bold tracking-tight">
                                Lagi banyak ambil, lagi jimat
                            </h3>
                            <p className="text-base leading-7 text-white/75">
                                Nak cuba dulu boleh. Nak beli untuk satu
                                keluarga pun lagi berbaloi. Boleh campur wangian
                                Serai Wangi, Kayu Putih, Lemon dan Bidara.
                            </p>
                            <div className="grid gap-3">
                                {pricingPackages.map((item) => (
                                    <article
                                        key={item.quantity}
                                        className="rounded-[20px] bg-white/10 p-5"
                                    >
                                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                                            <h4 className="font-semibold">
                                                {item.quantity}
                                            </h4>
                                            <p className="text-2xl font-bold text-white">
                                                {item.price}
                                            </p>
                                        </div>
                                        <p className="mt-2 text-sm leading-6 text-white/70">
                                            {item.body}
                                        </p>
                                    </article>
                                ))}
                            </div>
                            <Button
                                asChild
                                className="rounded-xl bg-[#FF385C] px-6 text-white hover:bg-[#e93052]"
                            >
                                <Link href={checkoutIndex.url()}>
                                    <PackageCheck />
                                    Ambil pakej jimat
                                </Link>
                            </Button>
                        </div>
                    </section>

                    <section className="grid gap-8 rounded-[28px] bg-white p-6 shadow-sm lg:grid-cols-[1fr_0.95fr] lg:p-10">
                        <div className="space-y-5">
                            <p className="text-xs font-semibold tracking-[0.2em] text-[#717171] uppercase">
                                Wanita berpantang
                            </p>
                            <h3 className="text-3xl font-bold tracking-tight">
                                Teman kecil untuk ibu dalam pantang
                            </h3>
                            <p className="text-base leading-7 text-[#717171]">
                                Badan ibu selepas bersalin biasanya mudah rasa
                                lenguh, sejuk, penat dan kurang selesa. Aurora
                                Terapi boleh dijadikan pilihan praktikal untuk
                                membantu memberi rasa hangat dan nyaman,
                                terutama ketika berada di rumah, dalam beg bayi
                                atau ketika keluar ke klinik. Bentuk roll-on
                                lebih mudah digunakan kerana tak perlu tuang
                                minyak dan tak comot tangan.
                            </p>
                            <div className="rounded-[24px] bg-[#fff1f3] p-5">
                                <p className="text-sm leading-7 text-[#4b4b4b]">
                                    Minyak panas ni barang kecil, tapi bila
                                    perlu memang tercari-cari. Sebab tu elok
                                    simpan lebih dari satu: satu dalam beg, satu
                                    dalam kereta, satu dekat rumah.
                                </p>
                            </div>
                            <div className="rounded-[24px] border border-[#ece7e7] p-5">
                                <p className="text-sm leading-7 text-[#717171]">
                                    Untuk kegunaan luaran sahaja. Elakkan sapuan
                                    pada luka, kawasan sensitif atau bahagian
                                    penyusuan. Jika ibu mempunyai masalah
                                    kesihatan tertentu, dapatkan nasihat doktor
                                    terlebih dahulu.
                                </p>
                            </div>
                            <Button
                                asChild
                                className="rounded-xl bg-[#FF385C] px-6 text-white hover:bg-[#e93052]"
                            >
                                <Link href={checkoutIndex.url()}>
                                    <PackageCheck />
                                    Pilih wangian & order
                                </Link>
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
                            <p className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">
                                Call to action akhir
                            </p>
                            <h3 className="text-3xl font-bold tracking-tight">
                                Simpan satu sebelum betul-betul perlu
                            </h3>
                            <p className="max-w-xl text-base leading-7 text-white/75">
                                Jangan tunggu badan dah lenguh teruk baru nak
                                cari minyak. Sediakan awal-awal dalam beg,
                                kereta atau rumah. Aurora Terapi kecil, mudah
                                guna dan sesuai dibawa ke mana sahaja.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    asChild
                                    className="rounded-xl bg-[#FF385C] px-6 text-white hover:bg-[#e93052]"
                                >
                                    <Link href={checkoutIndex.url()}>
                                        <PackageCheck />
                                        Dapatkan sekarang
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="rounded-xl border-white/20 bg-transparent px-6 text-white hover:bg-white/10"
                                >
                                    <Link href={login.url()}>
                                        Semak pesanan
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-6 rounded-[28px] bg-white p-6 shadow-sm lg:grid-cols-[1fr_0.8fr] lg:p-10">
                        <div className="space-y-3">
                            <p className="text-xs font-semibold tracking-[0.2em] text-[#717171] uppercase">
                                Kenapa ramai suka?
                            </p>
                            <h3 className="text-3xl font-bold tracking-tight">
                                Mudah dicapai bila badan mula tak selesa
                            </h3>
                            <p className="max-w-3xl text-base leading-7 text-[#717171]">
                                Sebab ia praktikal. Boleh guna bila-bila masa.
                                Tak ambil ruang. Tak susah nak bawa.
                                Kadang-kadang benda kecil macam ni lah yang
                                paling kita cari waktu perlu.
                            </p>
                        </div>
                        <div className="rounded-[24px] bg-[#f7f7f7] p-5">
                            <p className="text-sm leading-7 text-[#4b4b4b]">
                                Aurora Terapi ialah minyak panas mudah bawa yang
                                sesuai digunakan untuk memberi rasa hangat dan
                                selesa pada badan. Hadir dengan pelbagai pilihan
                                wangian, praktikal untuk kegunaan harian, travel
                                dan simpanan di rumah.
                            </p>
                            <p className="mt-4 text-sm font-semibold text-[#222222]">
                                Untuk kegunaan luaran sahaja.
                            </p>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
