import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';

export default function Security() {
    return (
        <>
            <Head title="Tetapan keselamatan" />

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Tetapan keselamatan"
                    description="Modul keselamatan tambahan starter kit dikekalkan sebagai paparan ringkas."
                />

                <div className="rounded-[24px] bg-white p-6 shadow-sm">
                    <p className="text-sm leading-7 text-[#717171]">
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
