import { Head } from '@inertiajs/react';
import { Shield } from 'lucide-react';

export default function Security() {
    return (
        <>
            <Head title="Tetapan keselamatan" />

            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                        <Shield className="size-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight">Tetapan keselamatan</h2>
                        <p className="text-sm text-muted-foreground">Modul keselamatan tambahan starter kit dikekalkan sebagai paparan ringkas.</p>
                    </div>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
                    <p className="text-sm leading-7 text-muted-foreground">
                        Fokus sistem ini ialah pesanan, bayaran resit, dan semakan admin.
                        Jika perlu, ciri keselamatan tambahan seperti kemas kini kata laluan dan 2FA boleh diaktifkan semula.
                    </p>
                </div>
            </div>
        </>
    );
}

Security.layout = {
    breadcrumbs: [
        {
            title: 'Tetapan keselamatan',
            href: '/settings/security',
        },
    ],
};
