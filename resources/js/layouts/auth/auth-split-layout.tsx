import { Link, usePage } from '@inertiajs/react';
import { Sparkles, ShieldCheck, Zap, Star } from 'lucide-react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

const features = [
    { icon: Zap, text: 'Pendaftaran ringkas' },
    { icon: ShieldCheck, text: 'Pembayaran selamat' },
    { icon: Star, text: 'Penghantaran pantas' },
];

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;

    return (
        <div className="relative grid min-h-dvh flex-col items-center justify-center px-4 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col justify-between bg-[#121212] p-12 text-white lg:flex">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,56,92,0.15),transparent_50%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,56,92,0.08),transparent_50%)]" />

                <div className="relative z-10">
                    <Link
                        href={home()}
                        className="flex items-center gap-3 text-lg font-medium"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient shadow-lg shadow-[#FF385C]/20">
                            <Sparkles className="size-5 text-white" />
                        </div>
                        <span className="text-lg font-extrabold tracking-tight">
                            Aurora <span className="text-[#FF385C]">Terapi</span>
                        </span>
                    </Link>
                </div>

                <div className="relative z-10 space-y-8">
                    <div className="space-y-3">
                        <h2 className="text-3xl font-extrabold tracking-tight">
                            {name}
                        </h2>
                        <p className="max-w-md text-base leading-relaxed text-white/60">
                            Sistem tempahan minyak panas roll-on. Mudah, cepat, dan boleh dipercayai.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {features.map((feature) => (
                            <div
                                key={feature.text}
                                className="flex items-center gap-4 rounded-xl bg-white/[0.06] px-5 py-3 backdrop-blur-sm"
                            >
                                <div className="flex size-8 items-center justify-center rounded-lg bg-white/10">
                                    <feature.icon className="size-4 text-[#FF385C]" />
                                </div>
                                <span className="text-sm font-medium text-white/80">
                                    {feature.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 text-xs text-white/30">
                    &copy; {new Date().getFullYear()} Aurora Terapi. Hak Cipta Terpelihara.
                </div>
            </div>

            <div className="flex w-full items-center justify-center lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                    <Link
                        href={home()}
                        className="flex items-center justify-center gap-2 lg:hidden"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient shadow-lg shadow-[#FF385C]/20">
                            <Sparkles className="size-5 text-white" />
                        </div>
                        <span className="text-lg font-extrabold tracking-tight">
                            Aurora <span className="text-primary">Terapi</span>
                        </span>
                    </Link>

                    <div className="flex flex-col items-start gap-1.5 text-left sm:items-center sm:text-center">
                        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                        <p className="text-sm text-balance text-muted-foreground">
                            {description}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
